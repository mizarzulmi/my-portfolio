// app/components/layout/ProjectDetailLayout.js
import Link from "next/link";
import Image from "next/image";

export default function ProjectDetailLayout({ project }) {
  return (
    <section className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb Navigation */}
      <div className="my-6">
        <nav aria-label="breadcrumb">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-gray-600 dark:text-gray-400 sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <Link
                href="/"
                className="transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                🏠︎ Home
              </Link>
            </li>
            <li aria-hidden="true" className="[&>svg]:w-3.5 [&>svg]:h-3.5">
              /
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Link
                href="/projects"
                className="transition-colors hover:text-gray-900 dark:hover:text-white"
              >
                📰 Projects
              </Link>
            </li>
            <li aria-hidden="true" className="[&>svg]:w-3.5 [&>svg]:h-3.5">
              /
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span
                aria-current="page"
                className="font-normal text-gray-900 dark:text-white"
              >
                🔗 {project.title}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      {/* Project Header Image */}
      <header className="relative mx-auto mb-5 h-72 w-full sm:h-[400px] rounded-lg overflow-hidden">
        <Image
          alt={project.title}
          src={project.imageUrl}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
        />
      </header>

      {/* Project Title and Metadata */}
      <header className="mb-6 pb-4 border-b border-gray-200 dark:border-gray-800">
        <h1 className="mb-2 text-3xl font-semibold tracking-wider opacity-90">
          {project.title}
        </h1>
        <nav className="flex items-center gap-2">
          <time className="text-sm opacity-70">
            {new Date(project.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          {project.githubUrl && (
            <span className="flex gap-2 px-2 text-sm opacity-70">
              ⭐️ {project.stars || "0"} stars on
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 16 16"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="size-4"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7.976 0A7.977 7.977 0 0 0 0 7.976c0 3.522 2.3 6.507 5.431 7.584c.392.049.538-.196.538-.392v-1.37c-2.201.49-2.69-1.076-2.69-1.076c-.343-.93-.881-1.175-.881-1.175c-.734-.489.048-.489.048-.489c.783.049 1.224.832 1.224.832c.734 1.223 1.859.88 2.3.685c.048-.538.293-.88.489-1.076c-1.762-.196-3.621-.881-3.621-3.964c0-.88.293-1.566.832-2.153c-.05-.147-.343-.978.098-2.055c0 0 .685-.196 2.201.832c.636-.196 1.322-.245 2.007-.245s1.37.098 2.006.245c1.517-1.027 2.202-.832 2.202-.832c.44 1.077.146 1.908.097 2.104a3.16 3.16 0 0 1 .832 2.153c0 3.083-1.86 3.719-3.62 3.915c.293.244.538.733.538 1.467v2.202c0 .196.146.44.538.392A7.98 7.98 0 0 0 16 7.976C15.951 3.572 12.38 0 7.976 0"
                    clipRule="evenodd"
                  />
                </svg>
                Github
              </a>
            </span>
          )}
        </nav>
      </header>

      {/* Project Content */}
      <div className="flex w-full gap-2">
        <article className="mx-auto w-full">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div dangerouslySetInnerHTML={{ __html: project.content }} />

            {project.techStack && (
              <>
                <h3>Tech Stack:</h3>
                <ul>
                  {project.techStack.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </article>
      </div>
    </section>
  );
}
