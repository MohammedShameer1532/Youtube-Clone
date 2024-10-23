
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Search from "./components/Search";
import VideoPlaying from "./components/VideoPlaying";
import { useState } from "react";
import SideBarComponents from "./sidebarcomponent/SideBarComponents";
import CategoryResults from "./sidebarcomponent/CategoryResults";


const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <BrowserRouter>
        <Navbar handleSidebarToggle={handleSidebarToggle} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:searchQuery" element={<Search />} />
          <Route path="/video/:categoryId/:id" element={<VideoPlaying />} />
          <Route path="/sidecomponent" element={<SideBarComponents/>}></Route>
          <Route path="/category/:categoryId" element={<CategoryResults/>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;