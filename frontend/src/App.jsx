import { useEffect } from "react";
import Landing from "./pages/Landing/Landing";
import AboutUs from "./pages/AboutUs/AboutUs";
import Team from "./pages/Team/Team";
import Projects from "./pages/Projects/Projects";
import Resources from "./pages/Resources/Resources";
import Gallery from "./pages/Gallery/Gallery";
import ContactUs from "./pages/Contact/ContactUs";
import Footer from "./components/Footer/Footer";

function App() {
  useEffect(() => {
    // Forcefully go to the top of the page (Home section)
    document.getElementById("home")?.scrollIntoView({ behavior: "instant" });
  }, []);

  return (
    <>
      <main className="w-full overflow-x-hidden">
        <Landing />
        <AboutUs />
        <Team />
        <Projects />
        <Resources />
        <Gallery />
        <ContactUs />
      </main>
      <Footer />
    </>
  );
}

export default App;
