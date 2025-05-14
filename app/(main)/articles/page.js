import { sanityClient } from "@/app/_utils/sanity.client";
import BlogList from "@/app/_components/sections/BlogList";

export const revalidate = 60; // Revalidate every 60 seconds

async function getPosts() {
  const query = `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    mainImage,
    tags,
    publishedAt,
    "categories": categories[]->title
  }`;

  return await sanityClient.fetch(query);
}

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Blog Articles</h1>
      <BlogList posts={posts} />
    </div>
  );
}
