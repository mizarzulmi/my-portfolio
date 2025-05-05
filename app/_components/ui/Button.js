"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const Button = ({
  children,
  href,
  onClick,
  variant = "primary",
  size = "medium",
  className = "",
  disabled = false,
  download = false,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&>svg]:pointer-events-none [&>svg]:size-4 [&>svg]:shrink-0 h-9 px-4 py-2";

  const variantClasses = {
    primary:
      "bg-[rgb(var(--primary))] text-[rgb(var(--primary-foreground))] shadow hover:bg-[rgb(var(--primary)/0.9)]",
    secondary:
      "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
    outline:
      "border border-input bg-transparent hover:bg-accent hover:text-accent-foreground",
    ghost: "bg-transparent hover:bg-accent hover:text-accent-foreground",
    danger:
      "bg-destructive text-destructive-foreground shadow hover:bg-destructive/90",
    adaptive: `
    bg-[rgb(var(--adaptive-button-bg))] 
    text-[rgb(var(--adaptive-button-text))] 
    shadow 
    hover:bg-[rgb(var(--adaptive-button-hover))] 
    hover:text-[rgb(var(--adaptive-button-hover-text))]
    `,
  };

  const buttonClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    const isDownload =
      download || href.endsWith(".pdf") || href.includes("/file/");

    return (
      <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
        {isDownload ? (
          <a
            href={href}
            className={buttonClasses}
            download={download}
            {...props}
          >
            {children}
          </a>
        ) : (
          <Link href={href} className={buttonClasses} {...props}>
            {children}
          </Link>
        )}
      </motion.div>
    );
  }

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
