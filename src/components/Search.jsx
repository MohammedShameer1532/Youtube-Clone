import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import ListItems from "./ListItems";
import SearchCard from "./SearchCard"; import axios from "axios";
import Navbar from "./Navbar";
import Loading from "../loader/Loading";



const Search = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [result, setResult] = useState([]);
  const { searchQuery, categoryId } = useParams();
  const [category, setCategory] = useState(0);
  const [data, setData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);


  const fetchSearch = async () => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${searchQuery}&key=${API_KEY}`)
      setResult(response.data.items)
      console.log("search-data", response.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }

  const fetchData = async (categoryId) => {
    if (isLoading) return;
    try {
      setIsLoading(true);
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`)
      setData(response.data.items)
      console.log("Home-data", response.data);
    } catch (error) {
      console.log(error);
    }
    finally {
      setTimeout(() => setIsLoading(false), 1000);
    }
  }
  // Fetch data when category changes
  useEffect(() => {
    if (category !== 0) {
      fetchData(category);
    }
  }, [category]);

  // Fetch search data if search query exists
  useEffect(() => {
    if (searchQuery) {
      fetchSearch();
    }
  }, [searchQuery, categoryId]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  return (
    <div className=''>
      <div className="mt-24 flex flex-row h-[calc(100%-56px)]">
        <Navbar handleSidebarToggle={handleSidebarToggle} />
        <Sidebar
          isSidebarOpen={isSidebarOpen}
          category={category}
          setCategory={setCategory}
          fetchData={fetchData}
        />
        <div className={`${isSidebarOpen ? "h-[calc(100vh-6.625rem)] overflow-y-auto  overflow-hidden" : "overflow-hidden"}`}>
          <ListItems isSidebarOpen={isSidebarOpen} />
          {isLoading ? (
            <Loading />
          ) : (
            <div className={`${isSidebarOpen ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 p-5" : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 4xl:grid-cols-5 gap-4 p-5"}`}>
              {(category !== 0 ? data : result)?.map((item, index) => {
                return (
                  <SearchCard key={index} item={item} fetchSearch={fetchSearch} isSidebarOpen={isSidebarOpen} category={category} />
                )
              })
              }
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Search;