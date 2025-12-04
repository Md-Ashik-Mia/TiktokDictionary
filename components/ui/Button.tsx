"use client";

import React, { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const sizeClasses: Record<Size, string> = {
  sm: "px-4 py-1.5 text-sm",
  md: "px-5 py-2 text-sm",
  lg: "px-6 py-3 text-base",
};

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-dark text-white hover:opacity-90 active:scale-[0.98] shadow-sm",
  outline:
    "border border-brand-dark text-brand-dark bg-white hover:bg-brand-dark hover:text-white",
  ghost: "text-brand-dark hover:bg-black/5",
};

export function Button({
  className = "",
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center rounded-full font-medium interactive";

  const classes = [
    base,
    sizeClasses[size],
    variantClasses[variant],
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <button className={classes} {...props} />;
}
