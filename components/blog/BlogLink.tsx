"use client";

import Link from "next/link";
import { useBlogLoading } from "@/contexts/BlogLoadingContext";
import { ComponentProps, MouseEvent } from "react";

type BlogLinkProps = ComponentProps<typeof Link>;

export default function BlogLink({ children, onClick, ...props }: BlogLinkProps) {
  const { startLoading } = useBlogLoading();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    startLoading();
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <Link {...props} onClick={handleClick}>
      {children}
    </Link>
  );
}
