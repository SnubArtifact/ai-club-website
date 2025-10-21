import './App.css'
import Landing from './pages/Landing/Landing'
import AboutUs from './pages/AboutUs/AboutUs'
import Team from './pages/Team/Team'
import Projects from './pages/Projects/Projects'
import Resources from './pages/Resources/Resources'
import ContactUs from './pages/Contact/ContactUs'
import Blogs from './pages/Blogs/Blogs'
import Footer from './components/Footer/Footer'


function App() {
  return (
    <>
    <main className="w-full overflow-x-hidden">
      <Landing />
      <AboutUs />
      <Team />
      <Projects />
      <Resources />
      <ContactUs />
      <Blogs />
    </main>
    <Footer />
    </>
  )
}

export default App
