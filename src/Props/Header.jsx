import { useNavigate } from "react-router-dom"

export default function Header() {
    const navigate = useNavigate();

    return (<>
        <div className="bg-stone-300 w-full h-16 flex items-center 0">
            <div id="block1" className="h-full w-1/5 border-2 border-amber-600 flex items-center justify-center" onClick={() => navigate("/home")}>logo</div>
            <div id="block2" className="h-full w-3/5 ">
                <nav className=" h-full flex justify-around items-center">
                    <ul className="w-[30%] h-[80%] hover:bg-stone-400  active:bg-stone-300 flex items-center justify-center rounded-md" onClick={() => navigate("/home")}>Home</ul>
                    <ul className="w-[30%] h-[80%] hover:bg-stone-400  active:bg-stone-300  flex items-center justify-center rounded-md"onClick={() => navigate("/marketplace")}>Marketplace</ul>
                    <ul className="w-[30%] h-[80%] hover:bg-stone-400  active:bg-stone-300  flex items-center justify-center rounded-md">News</ul>
                </nav>
            </div>
            <div id="block3" className="h-full w-1/5 border-2 border-pink-500 flex items-center justify-center">
                <h2>Profile</h2>
            </div>
        </div>
    </>)
}