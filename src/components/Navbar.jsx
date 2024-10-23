import { CiSearch } from "react-icons/ci";
import { RiVideoAddLine } from "react-icons/ri";
import { AiOutlineBell } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MicOffIcon from '@mui/icons-material/MicOff';
import YoutubeLogo from './YoutubeLogo';
import { useState } from "react";
import VoiceSearch from "../loader/VoiceSearch";


const Navbar = ({ handleSidebarToggle, }) => {

  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { listening, startListening, stopListening, transcript, browserSupportsSpeechRecognition } = VoiceSearch({ setSearchQuery });


  const handleSearch = (event) => {
    if (
      (event?.key === "Enter" || event === "searchButton") &&
      searchQuery?.length > 0
    ) {
      navigate(`/search/${searchQuery}`);
      setSearchQuery("");
    }
  };

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }
  return (
    <div className="flex justify-between fixed top-0 mt-[-3rem] md:mt-0 w-[100%] left-0 right-0 z-10 bg-white px-6 py-2">
      <div className="flex items-center space-x-[-7%] md:space-x-[-5%] lg:space-x-4">
        <MenuIcon className=" cursor-pointer"
          onClick={handleSidebarToggle} />
        <YoutubeLogo className="" />
      </div>
      <div className="flex w-[60%] md:w-[40%] ml-[-12%]  items-center gap-2  mt-20 md:mt-1  ">
        <div className="flex w-[100%] items-center mt-4 md:mt-1 ml-[-6rem] md:ml-[1rem]">
          <div className="w-[100%]  px-4 py-2 border border-gray-400 rounded-l-full ">
            <input type="text" placeholder="Search" className="outline-none "
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyUp={handleSearch}
              value={searchQuery}
            />
          </div>
          <button className="px-4 py-2 bg-gray-100 border border-gray-400 rounded-r-full "
            onClick={() => handleSearch("searchButton")}>
            <CiSearch size={"24px"} />
          </button>
        </div>
        <div>
          <button onClick={() => {
            if (listening) {
              stopListening()
            } else {
              startListening()
            }
          }}>
            {listening ? <MicOffIcon style={{ fontSize: "40px" }} className="ml-16 md:ml-10 mt-4 md:mt-1 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200" /> : <KeyboardVoiceIcon style={{ fontSize: "40px" }} className="ml-16 md:ml-10 mt-4 md:mt-1 border border-gray-600 rounded-full p-2 cursor-pointer hover:bg-gray-200 duration-200" />}
          </button>
        </div>
      </div>
      <div className="flex space-x-5 items-center ml-[-7rem] md:ml-0 ">
        <RiVideoAddLine className="text-2xl" />
        <AiOutlineBell className="text-2xl" />
        <span className="inline-flex items-center justify-center size-[32px] rounded-full bg-blue-600 font-semibold text-white leading-none dark:bg-blue-500">
          MS
        </span>
      </div>
    </div>
  )
}

export default Navbar;
