import type { ReactNode, TextareaHTMLAttributes } from "react";

import { cn } from "@/lib/utils";

export function FormField({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("space-y-1.5", className)}>
      <label className="text-sm font-medium text-slate-700">{label}</label>
      {children}
      {hint && <p className="text-xs text-slate-500">{hint}</p>}
    </div>
  );
}

const inputClass =
  "flex w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 shadow-sm outline-none transition-colors placeholder:text-slate-400 focus:border-[#0056b3] focus:ring-2 focus:ring-[#0056b3]/20 disabled:opacity-50";

export function ClaimInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(inputClass, "h-11", props.type === "date" && "pr-3", className)}
      {...props}
    />
  );
}

export function ClaimTextarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(inputClass, "min-h-[100px] resize-y py-3", className)}
      {...props}
    />
  );
}

export function InputWithIcon({
  icon,
  className,
  ...props
}: React.ComponentProps<"input"> & { icon: ReactNode }) {
  return (
    <div className="relative">
      <ClaimInput className={cn("pr-10", className)} {...props} />
      <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
        {icon}
      </span>
    </div>
  );
}
