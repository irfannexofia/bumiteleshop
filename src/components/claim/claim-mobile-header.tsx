import Image from "next/image";

export function ClaimMobileHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-[72px] items-center justify-center border-b border-slate-100 bg-white px-4 shadow-sm">
      <div className="bg-white p-2 rounded">
        <Image
          src="/2logo.png"
          alt="BUMITELESHOP — Gadget, Accessories, Supplies"
          width={240}
          height={90}
          className="h-12 w-auto max-w-[min(100%,240px)] object-contain"
          priority
        />
      </div>
    </header>
  );
}
