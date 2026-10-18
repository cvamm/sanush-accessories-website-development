import SanushAccessoriesGallery from "@/components/ui/3d-image-gallery";

const instagramUrl = "https://www.instagram.com/sanush_accessories?dlrf=MXJka2JzcGd3Y25lNg==";

export default function HomePage() {
  return (
    <>
      <SanushAccessoriesGallery />

      <section id="story" className="relative overflow-hidden bg-[#f8f3eb] px-5 py-20 text-[#241a11] sm:px-8 lg:px-12 lg:py-28">
        <div className="absolute -right-20 -top-24 h-80 w-80 rounded-full border border-[#c3944a]/20" />
        <div className="absolute -right-5 -top-9 h-52 w-52 rounded-full border border-[#c3944a]/20" />
        <div className="relative mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-24">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#a06d22]">The Sanush standard</p>
            <h2 className="mt-4 max-w-xl font-serif text-4xl leading-[1.02] tracking-[-0.04em] sm:text-5xl">The glow you reach for, every single day.</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-[#5d4a39]">Sanush Accessories brings you playful, polished pieces in an anti-tarnish 18k gold-plated finish—because the jewelry you love should be easy to wear, layer, gift, and live in.</p>
            <a href={instagramUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center rounded-full bg-[#281b10] px-6 py-3 text-sm font-semibold text-[#fff8e9] transition hover:-translate-y-0.5 hover:bg-[#4a321c]">Shop the latest drop on Instagram</a>
          </div>

          <dl className="grid gap-px overflow-hidden rounded-[1.6rem] border border-[#d8c7ae] bg-[#d8c7ae] sm:grid-cols-2">
            <div className="bg-[#fbf8f3] p-7">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06d22]">01</dt>
              <dd className="mt-7 font-serif text-2xl">18k gold plated</dd>
              <p className="mt-3 text-sm leading-6 text-[#6c5948]">A warm, high-shine finish that makes the everyday feel elevated.</p>
            </div>
            <div className="bg-[#fbf8f3] p-7">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06d22]">02</dt>
              <dd className="mt-7 font-serif text-2xl">Anti-tarnish</dd>
              <p className="mt-3 text-sm leading-6 text-[#6c5948]">Made for repeat wear and all the plans on your calendar.</p>
            </div>
            <div className="bg-[#fbf8f3] p-7">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06d22]">03</dt>
              <dd className="mt-7 font-serif text-2xl">Easy to layer</dd>
              <p className="mt-3 text-sm leading-6 text-[#6c5948]">Modern staples that work beautifully on their own or together.</p>
            </div>
            <div className="bg-[#fbf8f3] p-7">
              <dt className="text-xs font-bold uppercase tracking-[0.2em] text-[#a06d22]">04</dt>
              <dd className="mt-7 font-serif text-2xl">Order by DM</dd>
              <p className="mt-3 text-sm leading-6 text-[#6c5948]">Find your favorite in the orbit, then say hello on Instagram.</p>
            </div>
          </dl>
        </div>
      </section>

      <footer className="flex flex-col gap-4 bg-[#17110c] px-5 py-8 text-[#eadbc1] sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12">
        <p className="font-serif text-xl tracking-tight">Sanush Accessories</p>
        <p className="text-xs uppercase tracking-[0.18em] text-[#c6ad87]">Anti-tarnish · 18k gold plated · Everyday jewelry</p>
        <a href={instagramUrl} target="_blank" rel="noreferrer" className="text-sm underline decoration-[#d4a850]/70 underline-offset-4 transition hover:text-[#f6d98d]">Follow @sanush_accessories</a>
      </footer>
    </>
  );
}
