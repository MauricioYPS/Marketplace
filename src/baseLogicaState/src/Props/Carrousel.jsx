import { useState, useEffect } from "react";

export default function Carousel() {
  const cities = [
    {"image": 'image_1.jpg', "city": 'Tokyo', "country": 'Japan', "department": 'Kanto'},
    {"image": 'image_2.jpg', "city": 'Paris', "country": 'France', "department": 'Île-de-France'},
    {"image": 'image_3.jpg', "city": 'New York', "country": 'USA', "department": 'New York'},
    {"image": 'image_4.jpg', "city": 'Sydney', "country": 'Australia', "department": 'New South Wales'},
    {"image": 'image_5.jpg', "city": 'Berlin', "country": 'Germany', "department": 'Berlin'},
    {"image": 'image_6.jpg', "city": 'Rio de Janeiro', "country": 'Brazil', "department": 'Rio de Janeiro'},
    {"image": 'image_7.jpg', "city": 'Cairo', "country": 'Egypt', "department": 'Cairo Governorate'},
    {"image": 'image_8.jpg', "city": 'Moscow', "country": 'Russia', "department": 'Moscow'},
    {"image": 'image_9.jpg', "city": 'Toronto', "country": 'Canada', "department": 'Ontario'},
    {"image": 'image_10.jpg', "city": 'Mexico City', "country": 'Mexico', "department": 'Mexico City'},
    {"image": 'image_11.jpg', "city": 'Mumbai', "country": 'India', "department": 'Maharashtra'},
    {"image": 'image_12.jpg', "city": 'Cape Town', "country": 'South Africa', "department": 'Western Cape'}
  ];

  const slides = cities.reduce((acc, cur, idx) => {
    const i = Math.floor(idx / 4);
    (acc[i] ||= []).push(cur);
    return acc;
  }, []);

  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), 6000);
    return () => clearInterval(t);
  }, [paused, slides.length]);

  return (
    <section className="mt-14">
      <div className="max-w-7xl mx-auto container-px">
        <div className="card p-6 card-hover" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {slides[index].map((item, idx) => (
              <article key={idx} className="rounded-2xl overflow-hidden group bg-slate-900/40 border border-white/10 hover:border-cyan-500/40 transition relative">
                <div className="relative">
                  <img src={`/images/${item.image}`} alt={item.city} className="h-44 w-full object-cover transition-transform duration-500 group-hover:scale-105"/>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>
                <div className="p-4">
                  <p className="text-sm text-slate-300">{item.country}</p>
                  <h3 className="text-lg font-semibold">{item.city}</h3>
                  <p className="text-xs text-slate-400 mt-1">{item.department}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="flex items-center justify-between mt-5">
            <div className="flex gap-2">
              {slides.map((_, i) => (
                <button key={i} onClick={() => setIndex(i)} className={`h-2 rounded-full transition-all ${i === index ? "w-8 bg-cyan-400" : "w-3 bg-white/20"}`} aria-label={`Go to slide ${i+1}`}/>
              ))}
            </div>
            <div className="flex gap-2">
              <button onClick={() => setIndex((i) => (i - 1 + slides.length) % slides.length)} className="btn btn-muted btn-sm" aria-label="Previous">‹</button>
              <button onClick={() => setIndex((i) => (i + 1) % slides.length)} className="btn btn-muted btn-sm" aria-label="Next">›</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
