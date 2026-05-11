"use client";

import Link, { type LinkProps } from "next/link";
import { usePathname } from "next/navigation";
import { forwardRef } from "react";
import { cn } from "../lib/utils";

type NavLinkProps = LinkProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & {
    activeClassName?: string;
    pendingClassName?: string;
  };

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, href, ...props }, ref) => {
    const pathname = usePathname();
    const hrefString = typeof href === "string" ? href : (href as unknown as { pathname?: string }).pathname || "/";
    const isActive =
      pathname === hrefString || (hrefString !== "/" && pathname?.startsWith(hrefString));

    return (
      <Link
        ref={ref}
        href={href}
        className={cn(className, isActive && activeClassName)}
        {...props}
      />
    );
  },
);

NavLink.displayName = "NavLink";

export { NavLink };
