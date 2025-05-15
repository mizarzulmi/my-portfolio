import { apiClient } from "@/app/_utils/api-client";
import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/_utils/sanity.client";

async function getTagData(slug) {
  try {
    const response = await apiClient(`/api/tags/${slug}`);

    if (!response.success) {
      throw new Error(response.error || "Failed to load tag data");
    }

    return response.data;
  } catch (error) {
    console.error("Error fetching tag data:", error);
    throw error;
  }
}

export async function generateStaticParams() {
  try {
    const response = await apiClient("/api/tags");
    return response.data?.map((tag) => ({ slug: tag.slug.current })) || [];
  } catch (error) {
    console.error("Error generating static params:", error);
    return [];
  }
}

export default async function TagPage({ params }) {
  const { slug } = params;
  let data;

  try {
    data = await getTagData(slug);
  } catch (error) {
    console.error("Error in page component:", error);
    return (
      <div className="container mx-auto px-4 py-12 max-w-3xl text-center">
        <h1 className="text-2xl font-bold mb-4">Tag Not Found</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          {error.message || "The requested tag could not be loaded."}
        </p>
        <Link
          href="/tags"
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Browse all tags
        </Link>
      </div>
    );
  }

  const { tag, posts } = data;

  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <header className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-gray-800 dark:text-white">
          Posts with tag #{tag.title}
        </h1>
        {tag.description && (
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {tag.description}
          </p>
        )}
        <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          {posts.length} {posts.length === 1 ? "post" : "posts"} found
        </div>
      </header>

      {posts.length === 0 ? (
        <div className="text-center py-8">
          <p>No posts found for this tag.</p>
          <Link
            href="/blog"
            className="text-blue-600 dark:text-blue-400 hover:underline mt-4 inline-block"
          >
            Browse all posts
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {posts.map((post) => (
            <article
              key={post._id}
              className="border-b border-gray-200 dark:border-gray-700 pb-8"
            >
              <Link href={`/blog/${post.slug}`} className="group block">
                {post.mainImage && (
                  <div className="mb-4 rounded-lg overflow-hidden">
                    <Image
                      src={urlFor(post.mainImage).url()}
                      alt={post.mainImage.alt || post.title}
                      width={800}
                      height={450}
                      className="w-full h-auto object-cover group-hover:opacity-90 transition-opacity"
                    />
                  </div>
                )}
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {post.title}
                </h2>
              </Link>

              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
                <time dateTime={post.publishedAt}>
                  {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
                {post.views && (
                  <span className="flex items-center gap-1">
                    {post.views} views
                  </span>
                )}
              </div>

              {post.excerpt && (
                <p className="mt-3 text-gray-600 dark:text-gray-300">
                  {post.excerpt}
                </p>
              )}

              {post.categories?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category.slug}`}
                      className="px-2 py-1 bg-gray-100 dark:bg-gray-800 rounded-full text-xs hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      {category.title}
                    </Link>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
