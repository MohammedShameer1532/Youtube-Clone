import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import SideBarComponents from './SideBarComponents';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import ListItems from '../components/ListItems';


const CategoryResults = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [categoryVideos, setCategoryVideos] = useState([]);
  const { categoryId } = useParams();
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  const fetchCategoryData = async (categoryId) => {
    try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`);
      setCategoryVideos(response.data.items);
    } catch (error) {
      console.error('Error fetching category data:', error);
    }
  };

  useEffect(() => {
    fetchCategoryData(categoryId);
  }, [categoryId]);

  return (
    <div className='flex mt-20 mb-0'>
      <Navbar handleSidebarToggle={handleSidebarToggle} />
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setCategory={(id) => fetchCategoryData(id)}
        fetchData={fetchCategoryData}
      />
      <div className={`${isSidebarOpen ? "h-[calc(100vh-6.625rem)] overflow-y-auto  overflow-hidden" : "overflow-hidden"}`}>
        <ListItems isSidebarOpen={isSidebarOpen} />
        <div className={`${isSidebarOpen ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3  2xl:grid-cols-3  gap-4 p-5" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4  gap-4 p-5 ml-1  mobile-s:ml-6 mobile-l:ml-10 Tablet-768px:ml-0"}`}>
          {categoryVideos.map((video) => (
            <SideBarComponents
              key={video.id}
              item={video}
              isSidebarOpen={isSidebarOpen}
              fetchData={() => fetchCategoryData(categoryId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryResults;
