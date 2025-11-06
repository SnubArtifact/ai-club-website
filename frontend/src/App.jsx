import './App.css'
import Landing from './pages/Landing/Landing'
import AboutUs from './pages/AboutUs/AboutUs'
import Team from './pages/Team/Team'
import Projects from './pages/Projects/Projects'
import Resources from './pages/Resources/Resources'
import ContactUs from './pages/Contact/ContactUs'
import Blogs from './pages/Blogs/Blogs'
import Footer from './components/Footer/Footer'
import Gallery from './pages/Gallery/Gallery'


function App() {
  return (
    <>
    <main className="w-full overflow-x-hidden">
      <Landing />
      <AboutUs />
      <Team />
      <Projects />
      <Resources />
      <Gallery />
     
      {/* <Blogs />*/} {/* Blogs section is currently commented out due to unavailability of blogs */}
       <ContactUs />
    </main>
    <Footer />
    </>
  )
}

export default App
