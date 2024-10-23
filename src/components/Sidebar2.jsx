import { GoHome } from "react-icons/go";
import { SiYoutubeshorts } from "react-icons/si";
import { MdHistory, MdOutlineSubscriptions } from "react-icons/md";
import { PiUserSquareThin } from "react-icons/pi";
import { IoShirt } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { FaFire } from "react-icons/fa6";
import { FaYoutube } from "react-icons/fa";
import { SiYoutubestudio } from "react-icons/si";
import { SiYoutubekids } from "react-icons/si";
import { MdOutlineWatchLater } from "react-icons/md";
import { SiYoutubemusic } from "react-icons/si";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { PiFilmSlateLight } from "react-icons/pi";
import { SiYoutubegaming } from "react-icons/si";
import { FaRegNewspaper } from "react-icons/fa";
import { TfiCup } from "react-icons/tfi";
import { MdPodcasts } from "react-icons/md";
import { BiVideo } from "react-icons/bi";
import { GiNotebook } from "react-icons/gi";
import { CiStreamOn } from "react-icons/ci";
import { useNavigate } from "react-router-dom";



const Sidebar2 = ({ isSidebarOpen, setCategory, fetchData }) => {
  const navigate = useNavigate();

  const sidebarItems = [
    {
      groupName: '',
      groupItems: [
        {
          id: 1,
          name: "Home",
          icon: <GoHome />,
          categoryId: 0,

        },
        {
          id: 2,
          name: "Shorts",
          icon: <SiYoutubeshorts />,
          categoryId: 24,
        },
        {
          id: 3,
          name: "Subscription",
          icon: <MdOutlineSubscriptions />,
          categoryId: 0,
        },

      ]
    },
    {
      groupName: 'You',
      groupItems: [
        {
          id: 1,
          name: "Your Channel",
          icon: <PiUserSquareThin />,
          categoryId: 0,
        },
        {
          id: 2,
          name: "History",
          icon: <MdHistory />,
          categoryId: 0,
        },
        {
          id: 3,
          name: "Playlists",
          icon: <MdOutlineSubscriptions />,
          categoryId: 0,
        },
        {
          id: 4,
          name: "Your Videos",
          icon: <BiVideo />,
          categoryId: 0,
        },
        {
          id: 5,
          name: "Watch Later",
          icon: <MdOutlineWatchLater />,
          categoryId: 0,
        },
        {
          id: 6,
          name: "Liked Videos",
          icon: <AiOutlineLike />,
          categoryId: 0,
        }

      ]
    },
    {
      groupName: 'Explore',
      groupItems: [
        {
          id: 1,
          name: "Trending",
          icon: <FaFire />,
          categoryId: 10,
        },
        {
          id: 2,
          name: "Shoping",
          icon: <HiOutlineShoppingBag />,
          categoryId: 22,
        },
        {
          id: 3,
          name: "Music",
          icon: <SiYoutubemusic />,
          categoryId: 10,
        },
        {
          id: 4,
          name: "Flims",
          icon: <PiFilmSlateLight />,
          categoryId: 1,
        },
        {
          id: 5,
          name: "Live",
          icon: <CiStreamOn />,
          categoryId: 25,
        },
        {
          id: 6,
          name: "Gaming",
          icon: < SiYoutubegaming />,
          categoryId: 20,
        },
        {
          id: 7,
          name: "News",
          icon: <FaRegNewspaper />,
          categoryId: 25,
        },
        {
          id: 8,
          name: "Sports",
          icon: <TfiCup />,
          categoryId: 17,
        },
        {
          id: 9,
          name: "Courses",
          icon: <GiNotebook />,
          categoryId: 27,
        },
        {
          id: 10,
          name: "Fashion & beauty",
          icon: <IoShirt />,
          categoryId: 26,
        },
        {
          id: 11,
          name: "Podcasts",
          icon: <MdPodcasts />,
          categoryId: 22,
        },
      ]
    },
    {
      groupName: 'More from YouTube',
      groupItems: [
        {
          id: 1,
          name: "Youtube Premium",
          icon: <FaYoutube />,
          categoryId: 24,
        },
        {
          id: 2,
          name: "Youtube Studio",
          icon: <SiYoutubestudio />,
          categoryId: 22,
        },
        {
          id: 3,
          name: "Youtube Music",
          icon: <SiYoutubemusic />,
          categoryId: 0,
        },
        {
          id: 4,
          name: "Youtube Kids",
          icon: <SiYoutubekids />,
          categoryId: 24,
        },
      ]

    },
  ]
  const handleItemClick = (categoryId, isHome) => {
    console.log('Selected Category ID:', categoryId);
    if (isHome) {
      // Navigate to home without fetching data
      navigate('/');
    } else {
      // Fetch data only if it's not the home button
      fetchData(categoryId);
      setCategory(categoryId);
    }
  };
  return (
    <div className={` ${isSidebarOpen ? "fixed px-6 w-[90rem] sm:w-[40%] md:w-[32%] lg:w-[24%] xl:w-[16%]  h-[calc(100vh-5.625rem)] mt-[5.7rem] md:mt-4 mb-2 overflow-y-scroll overflow-x-hidden  scrollbar-track-slate-600  scrollbar-none hover:scrollbar-thin" : "-translate-x-full ml-[-40%] sm:ml-[-20%]  md:ml-[-17%] lg:ml-[-16%] xl:ml-[-11%] 2xl:ml-[-10%] "} `}>
      <div>
        <div className='space-y-3 items-center'>
          {sidebarItems.map((group, index) => {
            return (
              <div key={index} className=''>
                <h1 className='font-bold  text-sm sm:text-lg md:text-base  lg:text-lg '>{group.groupName}</h1>
                {group.groupItems.map((item, index) => {
                  return (
                    <div key={index} onClick={() => handleItemClick(item.categoryId, item.isHome)} className='flex items-center space-x-6 mb-1 my-2 hover:bg-gray-300 duration-300 rounded-md p-1 text-[10px] lg:text-[15px]' >
                      <div className='text-lg sm:text-xl md:text-xl  lg:text-2xl cursor-pointer text-red-500' >
                        {item.icon}
                      </div>
                      <span className='cursor-pointer font-semibold text-sm sm:text-lg md:text-base  lg:text-base '>{item.name}</span>
                    </div>
                  )
                })}
                <br />
                <hr />
              </div>
            )
          })
          }
        </div>
        <div className='text-xs mt-5 font-semibold text-gray-500'>
          About Press Copyright<br /> Contact us Creator Advertise<br /> Developers<br /><br />
          <div>
            Terms Privacy Policy & Safety<br /> How YouTube works<br /> Test new features<br /><br />
            <p className='bottom-1 text-gray-800'><span className='text-base'>©</span> 2024 Google LLC</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar2;