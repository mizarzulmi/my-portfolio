import { PortableText } from "@portabletext/react";
import Image from "next/image";
import { urlFor } from "@/app/_utils/sanity.client";
import { apiClient } from "@/app/_utils/api-client";
import ViewTracker from "@/app/_components/ui/ViewTracker";
import Link from "next/link";
import { PortableTextComponents } from "@/app/_components/ui/PortableText";

async function getPost(slug) {
  try {
    const response = await apiClient(`/api/blog/${slug}`);

    return response.data;
  } catch (error) {
    console.error("Error fetching post:", error);
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const response = await apiClient("/api/blog");
    return response.data?.map((post) => ({ slug: post.slug.current })) || [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function BlogPostPage({ params }) {
  const awaitedParams = await params;
  const { slug } = awaitedParams;

  let post;

  try {
    post = await getPost(slug);
  } catch (error) {
    console.error("Error in page component:", error);
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-600 dark:text-gray-400">
            The requested blog post could not be loaded: {error.message}
          </p>
          <Link
            href="/blog"
            className="mt-4 inline-block text-blue-600 dark:text-blue-400 hover:underline"
          >
            Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  // Render the post content...
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <ViewTracker postId={post._id} />

      <article className="prose prose-lg dark:prose-invert max-w-none">
        <h1 className="text-4xl font-bold mb-2">{post.title}</h1>

        <div className="flex items-center gap-4 mb-8 text-sm text-gray-600 dark:text-gray-400 flex-wrap">
          <time dateTime={post.publishedAt} className="flex items-center gap-1">
            {new Date(post.publishedAt).toLocaleDateString("id-ID", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          {post.views && (
            <>
              <span>|</span>
              <span className="flex items-center gap-1">
                {post.views} views
              </span>
            </>
          )}

          {post.categories?.length > 0 && (
            <>
              <span>|</span>
              <div className="flex flex-wrap gap-2">
                {post.categories.map((category) => (
                  <span
                    key={category._id}
                    className="px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full text-xs"
                  >
                    {category.title}
                  </span>
                ))}
              </div>
            </>
          )}
        </div>

        {post.mainImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlFor(post.mainImage).url()}
              alt={post.mainImage.alt || post.title}
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

        {/* <div className="prose dark:prose-invert max-w-none">
          {post.body ? (
            <PortableText
              value={post.body}
              components={PortableTextComponents}
            />
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No detailed content available for this post.
            </p>
          )}
        </div> */}

        <PortableText
          value={post.body}
          components={PortableTextComponents}
          onMissingComponent={(message, options) => {
            console.warn(message, options);
            return <div>Missing component</div>;
          }}
        />

        {post.tags?.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-200 dark:border-gray-700">
            <h4 className="text-sm font-medium mb-2 text-gray-500 dark:text-gray-400">
              Tags:
            </h4>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Link
                  key={tag._id}
                  href={`/tags/${tag.slug.current}`}
                  className="inline-flex items-center rounded border border-gray-200 dark:border-gray-700 px-2 py-1 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                >
                  #{tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
}
