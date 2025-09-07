import Footer from "../Props/Footer"
import Header from "../Props/Header"
import { Outlet } from "react-router-dom"
export default function StandarLayout() {return (<>
<header className="bg-[#F8F7F2] sticky top-0 z-50 shadow-sm">
<Header></Header>
</header>
<main className="flex min-h-screen justify-center border-2 border-amber-200 "> 
<Outlet></Outlet>
</main>
<footer className="bg-primary text-white">
<Footer></Footer>
</footer>




</>)
}