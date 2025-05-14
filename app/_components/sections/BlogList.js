import Link from "next/link";
import Image from "next/image";
import { urlFor } from "@/app/_utils/sanity.client";

export default function BlogList({ posts }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article
          key={post._id}
          className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
        >
          <Link href={`/articles/${post.slug.current}`} className="block">
            {post.mainImage && (
              <div className="relative h-48 w-full">
                <Image
                  src={urlFor(post.mainImage).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <div className="flex items-center space-x-2 mb-2">
                {post.categories &&
                  post.categories.map((category) => (
                    <span
                      key={category}
                      className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
              </div>
              <h2 className="text-xl font-bold mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              <time
                dateTime={post.publishedAt}
                className="text-sm text-gray-500 dark:text-gray-400"
              >
                {new Date(post.publishedAt).toLocaleDateString("id-ID", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
            </div>
          </Link>
        </article>
      ))}
    </div>
  );
}
