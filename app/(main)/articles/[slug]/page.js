import { sanityClient, urlFor } from "@/app/_utils/sanity.client";
import ViewTracker from "@/app/_components/ui/ViewTracker";
import { PortableText } from "@portabletext/react";
import Image from "next/image";

async function getPost(slug) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    publishedAt,
    body,
    views,
    "categories": categories[]->{
      _id,
      title,
      slug
    }
  }`;

  return await sanityClient.fetch(query, { slug });
}

export async function generateStaticParams() {
  const query = `*[_type == "post"] { slug }`;
  const posts = await sanityClient.fetch(query);
  return posts.map((post) => ({ slug: post.slug.current }));
}

export default async function BlogPostPage({ params }) {
  const { slug } = params;
  const post = await getPost(slug);

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      {/* <ViewTracker postId={post._id} /> */}
      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

        <div className="flex items-center space-x-4 mb-8 text-sm text-gray-600 dark:text-gray-400">
          <time dateTime={post.publishedAt}>
            {new Date(post.publishedAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {post.categories && (
            <span className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs">
              {post.categories.join(", ")}
            </span>
          )}
        </div>

        {post.mainImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.mainImage.alt || ""}
              width={800}
              height={450}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {post.excerpt && (
          <p className="text-xl text-gray-700 dark:text-gray-300 mb-8">
            {post.excerpt}
          </p>
        )}

        <div className="[&>p]:mb-4 [&>h2]:mt-8 [&>h2]:mb-4 [&>h2]:text-2xl [&>h2]:font-bold">
          <PortableText value={post.body} />
        </div>
      </article>
    </div>
  );
}
