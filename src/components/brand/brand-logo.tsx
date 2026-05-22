import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type BrandLogoProps = {
  href?: string;
  className?: string;
  imageClassName?: string;
  showTagline?: boolean;
  priority?: boolean;
};

export function BrandLogo({
  href = "/",
  className,
  imageClassName,
  showTagline = false,
  priority = false,
}: BrandLogoProps) {
  const content = (
    <div className={cn("flex flex-col items-start gap-1", className)}>
      <div className="bg-white p-2 rounded">
        <Image
          src="/logo.png"
          alt="BUMITELESHOP — Gadget, Accessories, Supplies"
          width={280}
          height={120}
          priority={priority}
          className={cn("h-auto w-40 sm:w-52 object-contain", imageClassName)}
        />
      </div>
      {showTagline && (
        <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Gadget · Accessories · Supplies
        </p>
      )}
    </div>
  );

  if (!href) {
    return content;
  }

  return (
    <Link href={href} className="inline-flex transition-opacity hover:opacity-90">
      {content}
    </Link>
  );
}
