import { Navigation } from "./components/Navigation";
import './App.css'
import { ContentBox } from "./components/ContentBox/ContentBox";
import { Footer } from "./components/Footer";
import { useEffect, useState } from "react";


function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [userEnv, setUserEnv] = useState("desktop");
  function handleWindowResize() {
    setWindowWidth(window.innerWidth);
  }

  useEffect(()=>{
    window.addEventListener('resize', handleWindowResize);
  },[])



  return (
    <>
      <Navigation windowWidth={windowWidth} />
      <ContentBox windowWidth={windowWidth} userEnv={userEnv} setUserEnv={setUserEnv}/>
      <Footer windowWidth={windowWidth} />
    </>
  );
}

export default App;
