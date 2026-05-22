import Image from "next/image";

export function ClaimHero() {
  return (
    <section className="relative w-full bg-white">
      <Image
        src="/claim-hero.png"
        alt="Claim Garansi Bumi Teleshop — Layanan garansi resmi bumiteleshop.com"
        width={1080}
        height={720}
        className="h-auto w-full object-contain object-top"
        priority
        sizes="(max-width: 512px) 100vw, 512px"
      />
    </section>
  );
}
