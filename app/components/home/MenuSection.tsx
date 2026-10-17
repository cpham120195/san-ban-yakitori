"use client";

import Image from "next/image";
import { menuA, menuB, type MenuItem } from "@/app/data/menu";
import Reveal from "../Reveal";

type MenuCardProps = {
  item: MenuItem;
  classic: boolean;
};

function MenuCard({ item, classic }: MenuCardProps) {
  return (
    <div className="group flex h-full w-full flex-col overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] transition duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/[0.06]">
      <div className="relative aspect-[4/3] overflow-hidden bg-black sm:aspect-[16/11] lg:aspect-auto lg:h-[220px]">
        {item.image ? (
          <Image
            src={item.image}
            alt={item.name}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes={classic
              ? "(min-width: 1152px) 357px, (min-width: 1024px) 33vw, 50vw"
              : "(min-width: 1152px) 264px, (min-width: 1024px) 25vw, 50vw"}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-stone-500">
            No image
          </div>
        )}
      </div>

      <div className="flex min-h-[88px] flex-1 flex-col justify-center p-3 sm:min-h-24 sm:p-4">
        <h3 className="text-[0.86rem] font-semibold leading-snug text-white sm:text-base">
          {item.name}
        </h3>
        {item.subtitle ? (
          <p className="mt-1 text-xs leading-snug text-stone-400 sm:text-[0.82rem]">
            {item.subtitle}
          </p>
        ) : null}
      </div>
    </div>
  );
}

function MenuGrid({ items, classic = false }: { items: MenuItem[]; classic?: boolean }) {
  return (
    <div className={`grid grid-cols-4 gap-3 sm:gap-4 ${classic ? "lg:grid-cols-6" : "lg:grid-cols-8"}`}>
      {items.map((item, index) => (
        <Reveal
          key={item.name}
          delay={index * 45}
          className="col-span-2 h-full"
        >
          <MenuCard item={item} classic={classic} />
        </Reveal>
      ))}
    </div>
  );
}

export default function MenuSection() {
  return (
    <section
      id="menu"
      className="scroll-mt-20 bg-[#050505]"
    >
      <div className="mx-auto max-w-6xl px-5 pb-14 pt-16 sm:px-6 sm:pb-20 sm:pt-20">
        <Reveal className="mb-9 text-center sm:mb-12">
          <h2 className="text-2xl font-semibold text-white sm:text-4xl">Menu</h2>
          <div className="mx-auto mt-4 h-px w-16 bg-white/25" />
        </Reveal>

        <div className="space-y-12 lg:space-y-16">
          <Reveal>
            <div className="mb-4 border-b border-white/10 pb-3">
              <h3 className="text-lg font-semibold text-white">
                Classic Yakitori
              </h3>
              <p className="mt-2 text-[0.95rem] leading-6 text-stone-400">
                Our signature yakitori offerings available across every experience.
              </p>
            </div>
            <MenuGrid items={menuA} classic />
          </Reveal>

          <Reveal>
            <div className="mb-4 border-b border-white/10 pb-3">
              <h3 className="text-lg font-semibold text-white">
                Premium Yakitori
              </h3>
              <p className="mt-2 text-[0.95rem] leading-6 text-stone-400">
                Our specialty skewers are available across every experience, with
                Premium and Signature featuring a larger selection.
              </p>
            </div>
            <MenuGrid items={menuB} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
