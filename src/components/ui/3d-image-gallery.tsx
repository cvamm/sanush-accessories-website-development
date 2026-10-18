"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Html, OrbitControls, Plane, Sphere } from "@react-three/drei";
import { Heart, MoveHorizontal, Sparkles, X } from "lucide-react";
import React, {
  Suspense,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as THREE from "three";

type JewelryCard = {
  id: string;
  imageUrl: string;
  alt: string;
  title: string;
  collection: string;
};

type GalleryContextValue = {
  selectedCard: JewelryCard | null;
  setSelectedCard: (card: JewelryCard | null) => void;
  favorites: string[];
  toggleFavorite: (id: string) => void;
  cards: JewelryCard[];
};

const GalleryContext = createContext<GalleryContextValue | undefined>(undefined);

const instagramUrl = "https://www.instagram.com/sanush_accessories?dlrf=MXJka2JzcGd3Y25lNg==";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.25" cy="6.75" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

const cards: JewelryCard[] = [
  {
    id: "1",
    imageUrl: "https://images.pexels.com/photos/29193427/pexels-photo-29193427.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Dainty gold charm necklace",
    title: "Celeste Charms",
    collection: "Necklaces",
  },
  {
    id: "2",
    imageUrl: "https://images.pexels.com/photos/28389455/pexels-photo-28389455.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Gold toned stud earrings",
    title: "Everyday Studs",
    collection: "Earrings",
  },
  {
    id: "3",
    imageUrl: "https://images.pexels.com/photos/30746010/pexels-photo-30746010.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Elegant bracelet on a romantic card",
    title: "Mira Chain",
    collection: "Bracelets",
  },
  {
    id: "4",
    imageUrl: "https://images.pexels.com/photos/30746011/pexels-photo-30746011.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Stacked gold rings on an editorial card",
    title: "Halo Stack",
    collection: "Rings",
  },
  {
    id: "5",
    imageUrl: "https://images.pexels.com/photos/8306527/pexels-photo-8306527.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Gold pendant and earring jewelry set",
    title: "Aurora Set",
    collection: "Sets",
  },
  {
    id: "6",
    imageUrl: "https://images.pexels.com/photos/4155246/pexels-photo-4155246.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Gold accessories arranged on a tray",
    title: "Golden Hour",
    collection: "New arrivals",
  },
  {
    id: "7",
    imageUrl: "https://images.pexels.com/photos/16255113/pexels-photo-16255113.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Rings styled on a fashion magazine",
    title: "Muse Signet",
    collection: "Rings",
  },
  {
    id: "8",
    imageUrl: "https://images.pexels.com/photos/17568000/pexels-photo-17568000.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Jewelry and perfume arranged on fabric",
    title: "Soft Glow",
    collection: "Best sellers",
  },
  {
    id: "9",
    imageUrl: "https://images.pexels.com/photos/9634675/pexels-photo-9634675.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Jewelry styled with soft yellow flowers",
    title: "Petal Edit",
    collection: "New arrivals",
  },
  {
    id: "10",
    imageUrl: "https://images.pexels.com/photos/28436705/pexels-photo-28436705.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Delicate pearl necklace and rings on fabric",
    title: "Pearl Poise",
    collection: "Necklaces",
  },
  {
    id: "11",
    imageUrl: "https://images.pexels.com/photos/30746014/pexels-photo-30746014.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Rose gold jewelry styled on a rich background",
    title: "Rosé Radiance",
    collection: "Sets",
  },
  {
    id: "12",
    imageUrl: "https://images.pexels.com/photos/15662507/pexels-photo-15662507.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=900&w=720",
    alt: "Luxury jewelry and perfume still life",
    title: "Lustre Edit",
    collection: "Best sellers",
  },
];

function useGallery() {
  const context = useContext(GalleryContext);
  if (!context) throw new Error("useGallery must be used within GalleryProvider");
  return context;
}

function GalleryProvider({ children }: { children: React.ReactNode }) {
  const [selectedCard, setSelectedCard] = useState<JewelryCard | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  const toggleFavorite = (id: string) => {
    setFavorites((current) =>
      current.includes(id) ? current.filter((favorite) => favorite !== id) : [...current, id],
    );
  };

  return (
    <GalleryContext.Provider value={{ cards, favorites, selectedCard, setSelectedCard, toggleFavorite }}>
      {children}
    </GalleryContext.Provider>
  );
}

function StarfieldBackground() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x100d0a, 1);
    mount.appendChild(renderer.domElement);

    const starGeometry = new THREE.BufferGeometry();
    const starsCount = 2200;
    const positions = new Float32Array(starsCount * 3);
    for (let index = 0; index < starsCount; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 520;
      positions[index * 3 + 1] = (Math.random() - 0.5) * 520;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 420;
    }
    starGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const starMaterial = new THREE.PointsMaterial({ color: 0xeed9a3, size: 0.75, sizeAttenuation: true });
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);
    camera.position.z = 20;

    let frame = 0;
    const render = () => {
      frame = window.requestAnimationFrame(render);
      starField.rotation.y += 0.00005;
      starField.rotation.x += 0.000015;
      renderer.render(scene, camera);
    };
    render();

    const resize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(frame);
      mount.replaceChildren();
      starGeometry.dispose();
      starMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} className="pointer-events-none fixed inset-0 z-0 bg-[#100d0a]" aria-hidden="true" />;
}

type Position = { x: number; y: number; z: number };

function FloatingCard({ card, position }: { card: JewelryCard; position: Position }) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const { favorites, setSelectedCard, toggleFavorite } = useGallery();
  const isFavorite = favorites.includes(card.id);

  useFrame(({ camera, clock }) => {
    if (!groupRef.current) return;
    groupRef.current.lookAt(camera.position);
    groupRef.current.position.y = position.y + Math.sin(clock.elapsedTime * 0.7 + position.x) * 0.13;
  });

  return (
    <group ref={groupRef} position={[position.x, position.y, position.z]}>
      <Plane
        args={[4.6, 6.1]}
        onClick={(event) => {
          event.stopPropagation();
          setSelectedCard(card);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={(event) => {
          event.stopPropagation();
          setHovered(false);
          document.body.style.cursor = "default";
        }}
      >
        <meshBasicMaterial transparent opacity={0} />
      </Plane>
      <Html
        transform
        distanceFactor={10}
        position={[0, 0, 0.02]}
        style={{
          pointerEvents: "none",
          transform: hovered ? "scale(1.1)" : "scale(1)",
          transition: "transform 260ms ease",
        }}
      >
        <article
          className="h-[13.2rem] w-[9.7rem] overflow-hidden rounded-[1.05rem] border bg-[#211911] p-2.5 shadow-2xl"
          style={{
            borderColor: hovered ? "rgba(232, 194, 109, .85)" : "rgba(255, 244, 219, .20)",
            boxShadow: hovered ? "0 18px 38px rgba(236, 190, 85, .34)" : "0 16px 32px rgba(0,0,0,.52)",
          }}
        >
          <div className="relative h-[9.7rem] overflow-hidden rounded-[0.68rem]">
            <img src={card.imageUrl} alt={card.alt} className="h-full w-full object-cover" draggable={false} loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-black/70 to-transparent" />
            <span className="absolute bottom-2 left-2 rounded-full bg-black/45 px-2 py-1 text-[8px] font-medium uppercase tracking-[0.16em] text-[#f7e8c8] backdrop-blur-sm">
              {card.collection}
            </span>
          </div>
          <div className="flex items-center justify-between gap-1 px-0.5 pt-2">
            <p className="truncate text-[11px] font-medium tracking-wide text-[#fff7e8]">{card.title}</p>
            <span className="text-[#e8c26d]">{isFavorite ? "♥" : "♡"}</span>
          </div>
        </article>
      </Html>
      <Html transform distanceFactor={10} position={[1.58, 2.1, 0.03]} style={{ pointerEvents: "auto" }}>
        <button
          type="button"
          aria-label={`Save ${card.title}`}
          onClick={(event) => {
            event.stopPropagation();
            toggleFavorite(card.id);
          }}
          className="grid h-6 w-6 place-items-center rounded-full border border-[#f9e8b8]/30 bg-[#1c140e]/75 text-[#f4d57d] backdrop-blur transition hover:scale-110"
        >
          <Heart className="h-3 w-3" fill={isFavorite ? "currentColor" : "none"} />
        </button>
      </Html>
    </group>
  );
}

function CardGalaxy() {
  const { cards: jewelryCards } = useGallery();
  const positions = useMemo<Position[]>(() => {
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    return jewelryCards.map((_, index) => {
      const y = 1 - (index / (jewelryCards.length - 1)) * 2;
      const ring = Math.sqrt(1 - y * y);
      const theta = goldenAngle * index;
      const radius = 14 + (index % 3) * 3.8;
      return {
        x: Math.cos(theta) * ring * radius,
        y: y * radius * 0.76,
        z: Math.sin(theta) * ring * radius,
      };
    });
  }, [jewelryCards]);

  return (
    <>
      <Sphere args={[4.1, 32, 32]}>
        <meshStandardMaterial color="#b98326" transparent opacity={0.045} wireframe />
      </Sphere>
      {[12, 17, 23].map((radius, index) => (
        <Sphere key={radius} args={[radius, 32, 32]}>
          <meshStandardMaterial color="#e8c26d" transparent opacity={0.015 + index * 0.005} wireframe />
        </Sphere>
      ))}
      {jewelryCards.map((card, index) => (
        <FloatingCard key={card.id} card={card} position={positions[index]} />
      ))}
    </>
  );
}

function JewelryModal() {
  const { favorites, selectedCard, setSelectedCard, toggleFavorite } = useGallery();
  const cardRef = useRef<HTMLDivElement>(null);

  if (!selectedCard) return null;
  const isFavorite = favorites.includes(selectedCard.id);

  const resetTilt = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "perspective(1100px) rotateX(0deg) rotateY(0deg)";
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${selectedCard.title} details`}
      className="fixed inset-0 z-50 grid place-items-center bg-black/75 p-4 backdrop-blur-sm"
      onClick={(event) => {
        if (event.currentTarget === event.target) setSelectedCard(null);
      }}
    >
      <section className="relative w-full max-w-[23.5rem]">
        <button
          type="button"
          aria-label="Close product preview"
          onClick={() => setSelectedCard(null)}
          className="absolute -top-11 right-0 grid h-8 w-8 place-items-center rounded-full border border-white/20 bg-black/25 text-white transition hover:bg-white/15"
        >
          <X className="h-4 w-4" />
        </button>
        <div
          ref={cardRef}
          onMouseMove={(event) => {
            const box = event.currentTarget.getBoundingClientRect();
            const x = event.clientX - box.left - box.width / 2;
            const y = event.clientY - box.top - box.height / 2;
            event.currentTarget.style.transform = `perspective(1100px) rotateX(${-(y / 22)}deg) rotateY(${x / 22}deg)`;
          }}
          onMouseLeave={resetTilt}
          className="rounded-[1.65rem] border border-[#f1d38d]/25 bg-[#1c1510] p-3 shadow-[0_28px_90px_rgba(0,0,0,.65)] transition-transform duration-300"
        >
          <div className="relative aspect-[4/4.65] overflow-hidden rounded-[1.05rem]">
            <img src={selectedCard.imageUrl} alt={selectedCard.alt} className="h-full w-full object-cover" />
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/15 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4 text-[#fff9ed]">
              <div>
                <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#ebc66f]">{selectedCard.collection}</p>
                <h2 className="font-serif text-2xl leading-none">{selectedCard.title}</h2>
              </div>
              <button
                type="button"
                aria-label="Save favorite"
                onClick={() => toggleFavorite(selectedCard.id)}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-white/25 bg-black/30 backdrop-blur transition hover:bg-black/50"
              >
                <Heart className="h-4 w-4 text-[#f2cf75]" fill={isFavorite ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
          <div className="px-2 pb-2 pt-4">
            <p className="text-center text-sm leading-relaxed text-[#decfb6]">Anti-tarnish, 18k gold-plated jewelry made to be part of your every day.</p>
            <a
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-full bg-[#e8c26d] text-sm font-semibold text-[#21170c] transition hover:bg-[#f5d98e] active:scale-[.98]"
            >
              <InstagramIcon className="h-4 w-4" />
              Order on Instagram
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

function GalleryShell() {
  const { favorites } = useGallery();

  return (
    <main className="relative h-[100svh] min-h-[39rem] w-full overflow-hidden bg-[#100d0a] text-[#fff9ed]">
      <StarfieldBackground />
      <Canvas
        className="absolute inset-0 z-10"
        camera={{ position: [0, 0, 22], fov: 56 }}
        dpr={[1, 1.75]}
        onCreated={({ gl }) => {
          gl.domElement.style.pointerEvents = "auto";
        }}
      >
        <Suspense fallback={null}>
          <Environment preset="sunset" />
          <ambientLight intensity={0.76} />
          <pointLight position={[10, 8, 10]} intensity={1.15} color="#f7cf78" />
          <pointLight position={[-12, -8, 0]} intensity={0.35} color="#bf7650" />
          <CardGalaxy />
          <OrbitControls
            enablePan={false}
            enableZoom
            enableRotate
            minDistance={10}
            maxDistance={39}
            rotateSpeed={0.42}
            zoomSpeed={0.7}
            minPolarAngle={Math.PI * 0.25}
            maxPolarAngle={Math.PI * 0.75}
          />
        </Suspense>
      </Canvas>

      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-5 sm:p-7">
        <a href="#story" className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-[#f2da9c]/20 bg-[#211911]/40 px-3 py-2 backdrop-blur-md transition hover:bg-[#211911]/65">
          <span className="grid h-6 w-6 place-items-center rounded-full border border-[#e8c26d]/60 text-[12px] text-[#e8c26d]">S</span>
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-[#fff8e9] sm:block">Sanush Accessories</span>
        </a>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="pointer-events-auto flex items-center gap-2 rounded-full border border-[#f2da9c]/25 bg-[#211911]/45 px-3 py-2 text-xs font-medium text-[#f6df9e] backdrop-blur-md transition hover:border-[#e8c26d]/70 hover:bg-[#211911]/70"
        >
          <InstagramIcon className="h-3.5 w-3.5" />
          <span className="hidden sm:inline">@sanush_accessories</span>
          <span className="text-[#e8c26d]">{favorites.length ? `(${favorites.length})` : ""}</span>
        </a>
      </header>

      <div className="pointer-events-none absolute inset-x-0 top-1/2 z-20 -translate-y-1/2 px-5 text-center sm:px-8">
        <div className="mx-auto max-w-xl">
          <p className="mb-3 flex items-center justify-center gap-2 text-[10px] font-semibold uppercase tracking-[0.3em] text-[#e8c26d]">
            <Sparkles className="h-3 w-3" />
            Golden things, everyday
          </p>
          <h1 className="font-serif text-4xl leading-[0.96] tracking-[-0.045em] text-[#fffaf0] drop-shadow-lg sm:text-6xl lg:text-7xl">
            Jewelry that keeps<br />up with your glow.
          </h1>
          <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-[#e6dbc9]/80 sm:text-base">Explore the orbit to discover anti-tarnish 18k gold-plated pieces, designed for daily wear.</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 flex items-end justify-between p-5 sm:p-7">
        <div className="hidden max-w-[12rem] border-l border-[#e8c26d]/50 pl-3 text-[10px] uppercase leading-relaxed tracking-[0.16em] text-[#e9ddca]/75 sm:block">
          Made for coffee runs, date nights &amp; every little in-between.
        </div>
        <div className="pointer-events-auto ml-auto flex items-center gap-2 rounded-full border border-[#f2da9c]/20 bg-[#211911]/45 px-3 py-2 text-[10px] uppercase tracking-[0.15em] text-[#f5ead7] backdrop-blur-md">
          <MoveHorizontal className="h-3.5 w-3.5 text-[#e8c26d]" />
          Drag to explore · click a piece
        </div>
      </div>

      <JewelryModal />
    </main>
  );
}

export default function SanushAccessoriesGallery() {
  return (
    <GalleryProvider>
      <GalleryShell />
    </GalleryProvider>
  );
}
