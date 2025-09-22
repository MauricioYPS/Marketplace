import { useEffect, useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router-dom'

export default function CallToAction() {
  const [once, setOnce] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (!sessionStorage.getItem('cta_once')) {
      setOnce(true)
      sessionStorage.setItem('cta_once', '1')
    }
  }, [])

  return (
    <section className="relative overflow-hidden">

      <div className="relative hero-h overflow-hidden rounded-b-[2rem]">
        <img
          src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2000&auto=format&fit=crop"
          alt="Hero background"
          className={`absolute inset-0 h-full w-full object-cover ${once ? 'animate-kenburns' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/40 via-slate-900/30 to-slate-950/90" />

        <div className="pointer-events-none absolute -top-10 -right-10 w-[26rem] h-[26rem] rounded-full bg-gradient-to-tr from-cyan-500/20 to-fuchsia-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-10 -left-10 w-[22rem] h-[22rem] rounded-full bg-gradient-to-tr from-indigo-500/20 to-cyan-500/10 blur-3xl" />

        <div className="relative h-full container-px max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div className="animate-fade-in-up">
            <div className="flex flex-wrap items-center gap-3">
              <span className="badge-soft">Curated by locals</span>
              <span className="badge-soft">200+ itineraries</span>
              <span className="badge-soft">Real-time tips</span>
            </div>
            <h2 className="mt-4 text-4xl md:text-6xl font-extrabold leading-tight">
              Design your <span className="text-gradient">next adventure</span>
            </h2>
            <p className="mt-3 text-slate-200/90 max-w-xl">
              Ready-made itineraries, must-see places, and hidden gems. All in one place.            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button onClick={() => navigate('/cities')} className="btn btn-cta btn-lg btn-pill">
                Explore cities
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 4.5 21 12l-7.5 7.5-1.06-1.06L17.88 12l-5.44-6.44L13.5 4.5Z" />
                </svg>
              </button>
              <a href="#destacados" className="btn btn-glass btn-lg btn-pill">
                See highlights
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              <div className="flex -space-x-2">
                {['/images/image_2.jpg', '/images/image_4.jpg', '/images/image_6.jpg'].map((src, i) => (
                  <img key={i} src={src} alt="" className="h-8 w-8 rounded-full border border-white/40 object-cover" />
                ))}
              </div>
              <p className="text-white/85 text-sm md:text-base">With the confidence of<strong>20k+</strong> travelers</p>
            </div>
          </div>


          <div className="hidden md:grid grid-cols-2 gap-4">
            {[
              { src: 'https://images.unsplash.com/photo-1521295121783-8a321d551ad2?q=80&w=1600&auto=format&fit=crop', title: 'Tokyo' },
              { src: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?q=80&w=1600&auto=format&fit=crop', title: 'Paris' },
              { src: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=1600&auto=format&fit=crop', title: 'New York' },
              { src: 'https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?q=80&w=1600&auto=format&fit=crop', title: 'Sydney' }
            ].map((item, i) => (
              <div key={i} className="card card-hover overflow-hidden group">
                <img src={item.src} alt={item.title} className="w-full h-40 object-cover transition-transform duration-[1800ms] group-hover:scale-110" />
                <div className="p-3">
                  <p className="text-sm text-slate-300">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>


      <div id="destacados" className="relative -mt-8 container-px max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {([
            { title: 'Kyoto', subtitle: 'Templos y cerezos', img: 'https://boutiquejapan.com/wp-content/uploads/2019/07/yasaka-pagoda-higashiyama-kyoto-japan.jpg' },
            { title: 'Santorini', subtitle: 'Atardeceres de postal', img: 'https://images.unsplash.com/photo-1504270997636-07ddfbd48945?q=80&w=2000&auto=format&fit=crop' },
            { title: 'New York', subtitle: 'Energía sin fin', img: 'https://images.unsplash.com/photo-1488747279002-c8523379faaa?q=80&w=2000&auto=format&fit=crop' }
          ]).map((d, idx) => (
            <article key={idx} className={`relative h-[260px] md:h-[320px] overflow-hidden rounded-3xl shadow-xl bg-black/50 animate-fade-in-up ${idx === 1 ? 'delay-150' : idx === 2 ? 'delay-300' : ''}`}>
              <img src={d.img} alt={d.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-[3500ms] hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="absolute bottom-0 p-6 text-white">
                <h3 className="text-2xl font-semibold drop-shadow-[0_1px_1px_rgba(0,0,0,.6)]">{d.title}</h3>
                <p className="text-white/80">{d.subtitle}</p>
                <div className="mt-3 flex items-center gap-3">
                  <a href="/cities" className="btn btn-glass btn-sm">See itineraries</a>
                  <span className="pill-soft">Trending</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="w-full flex justify-center my-12 container-px">
        <p className="text-white/90 text-xl md:text-2xl font-light italic max-w-3xl text-center leading-relaxed">
          “Find your perfect trip, designed by insiders who know and love their cities.”
        </p>
      </div>
    </section>
  )
}
