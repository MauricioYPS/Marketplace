import Carousel from "./Carrousel";
import CallToAction from "./CTA";

export default function Body(){
  return (
    <div className="relative">

      <div className="pointer-events-none absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl">
        <div
          className="relative left-[max(50%,25rem)] aspect-[1108/632] w-[72.1875rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-cyan-500 to-blue-600 opacity-20"
          style={{ clipPath: 'polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)' }}
        />
      </div>

      <CallToAction />
      <Carousel />
    </div>
  );
}
