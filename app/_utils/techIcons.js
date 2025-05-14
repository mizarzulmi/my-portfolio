export const getTechIcon = (techName) => {
  const techMap = {
    // Frontend
    html5:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
    css3: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
    javascript:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
    jquery:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jquery/jquery-original.svg",
    vuejs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vuejs/vuejs-original.svg",
    bootstrap:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg",
    materialize:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materializecss/materializecss-original.svg",
    tailwindcss:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",

    // Backend
    php: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg",
    laravel:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg",
    codeigniter:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/codeigniter/codeigniter-plain.svg",
    golang:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg",
    fiber:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/go/go-original.svg", // Fiber uses Go icon
    nodejs:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
    express:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",

    // Database
    mysql:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg",
    postgresql:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg",
    sqlserver:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg",
    redis:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redis/redis-original.svg",

    // Tools & DevOps
    git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
    docker:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg",
    nginx:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nginx/nginx-original.svg",
    apache:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original.svg",

    // CMS
    wordpress:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/wordpress/wordpress-original.svg",
    moodle:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/moodle/moodle-original.svg",

    // Design Tools
    figma:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
    canva:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/canva/canva-original.svg",

    // Default fallback
    default:
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  };

  const lowerTech = techName.toLowerCase().replace(/\s+/g, "");
  return techMap[lowerTech] || techMap.default;
};
