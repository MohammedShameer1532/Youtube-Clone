import Sidebar from './Sidebar';
import Video from './Video';
import ListItems from './ListItems';
import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import axios from 'axios';
import Loading from "../loader/Loading";


const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState(0);
  const [data, setData] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [isLoading, setIsLoading] = useState(false);


  const fetchData = async (categoryId) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=20&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`)
      setData(response.data.items)
      console.log("Home-data", response.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }


  useEffect(() => {
    fetchData(category);
  }, [category])


  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className='flex mt-20 mb-0'>
      <Navbar handleSidebarToggle={handleSidebarToggle} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        category={category}
        setCategory={setCategory}
        fetchData={fetchData} />
      <div className={`${isSidebarOpen ? "h-[calc(100vh-6.625rem)] overflow-y-auto  overflow-hidden" : "overflow-hidden"}`}>
        <ListItems isSidebarOpen={isSidebarOpen} />
        {isLoading ? (
          <Loading />
        ) : (
          <div className={`${isSidebarOpen ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-5" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5  gap-4 p-4 ml-1  mobile-s:ml-6 mobile-l:ml-10 Tablet-768px:ml-0"}`}>
            {data.map((item, index) => {
              return <Video isSidebarOpen={isSidebarOpen} category={category} key={index} item={item} />;
            })
            }
          </div>
        )}
      </div>
    </div>

  )
}

export default Home;