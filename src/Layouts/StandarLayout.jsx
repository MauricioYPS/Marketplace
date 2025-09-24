import Footer from "../Props/Footer";
import Header from "../Props/Header";
import { Outlet } from "react-router-dom";

export default function StandarLayout() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen justify-center">
        <Outlet />
      </main>
      <footer className="bg-primary text-white">
        <Footer />
      </footer>
    </>
  );
}
