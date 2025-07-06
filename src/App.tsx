import { Outlet } from "react-router";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="w-[90%] mx-auto">
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
