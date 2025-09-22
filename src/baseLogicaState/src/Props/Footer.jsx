import { useState } from "react";

export default function Footer() {
  const [opened, setOpened] = useState(false);

  const SOCIALS = [
    {
      name: "Instagram",
      href: "https://www.instagram.com/mauricio.yepes203/", // ⬅️ cambia por tu URL real
      src: "https://img.icons8.com/?size=100&id=118467&format=png&color=ffffff",
    },
    {
      name: "Facebook",
      href: "https://www.facebook.com/mauricio.yepes.9693", // ⬅️ cambia por tu URL real
      src: "https://img.icons8.com/?size=100&id=fJp7hepMryiw&format=png&color=ffffff",
    },
    {
      name: "X (Twitter)",
      href: "https://www.instagram.com/mauricio.yepes203/", // ⬅️ cambia por tu URL real
      src: "https://img.icons8.com/?size=100&id=59813&format=png&color=ffffff",
    },
    {
      name: "YouTube",
      href: "https://www.instagram.com/mauricio.yepes203/", // ⬅️ cambia por tu URL real
      src: "https://img.icons8.com/?size=100&id=123922&format=png&color=ffffff",
    },
    // {
    //   name: "TikTok",
    //   href: "https://www.tiktok.com/@tu_usuario",
    //   src: "https://img.icons8.com/?size=100&id=r7idV2LZ3rLk&format=png&color=ffffff",
    // },
    // {
    //   name: "WhatsApp",
    //   href: "https://wa.me/573001112233", // sin + ni espacios
    //   src: "https://img.icons8.com/?size=100&id=16713&format=png&color=ffffff",
    // },
    // {
    //   name: "Email",
    //   href: "mailto:hola@mytinerary.com",
    //   src: "https://img.icons8.com/?size=100&id=53461&format=png&color=ffffff",
    // },
  ];

  return (
    <footer className="mt-10">
      <div className="mx-auto max-w-7xl container-px">
        <div className="card p-5">
          <div className="flex items-center justify-between gap-4">
            {/* 2) Render con <a> y atributos de accesibilidad/seguridad */}
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/10 grid place-items-center hover:bg-white/20 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/40"
                >
                  <img className="w-5 h-5" src={s.src} alt={s.name} />
                </a>
              ))}
            </div>

            <p className="text-sm text-slate-300 text-center flex-1">
              Thanks for visiting. Follow us and get in touch anytime.
            </p>

            <div className="relative">
              <button className="btn btn-muted" onClick={() => setOpened(!opened)}>
                Contact
              </button>
              <div
                className={`absolute right-0 mt-3 w-64 rounded-xl border border-white/10 bg-slate-900/90 backdrop-blur-md p-4 shadow-xl transition origin-top-right ${
                  opened ? "scale-100 opacity-100" : "scale-95 opacity-0 pointer-events-none"
                }`}
              >
                <h3 className="text-lg font-semibold mb-1">Contact Us</h3>
                <p className="text-sm text-slate-300">Phone: 3227682475</p>
                <p className="text-sm text-slate-300">Email: devmauricioy@gmail.com</p>
                <p className="text-sm text-slate-300">NIT: 7777777</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
