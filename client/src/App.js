// import logo from './logo.svg';
import logo from './assets/smritilogo.png';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { NavBar } from "./components/NavBar";
import { Banner } from "./components/Banner";
import { Skills } from "./components/Skills";
import { Projects } from "./components/Projects";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
// import { Certifications } from "./components/Certifications";
import Certifications from './components/Certifications';
import ChatBot from './components/ChatBot';


function App() {
  return (
    <div className="App">
      <NavBar />
      <Banner />
         <Skills />

   
      <Projects />
      <Certifications/>
      
      <Contact />
      {/* <ChatBot/> */}
      <Footer />
    </div>
  );
}

export default App;
