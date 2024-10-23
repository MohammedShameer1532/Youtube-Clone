import { abbreviateNumber } from "js-abbreviation-number";
import { BsFillCheckCircleFill } from "react-icons/bs";
import Time from "../loader/Time";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";


function SearchCard({ item, isSidebarOpen }) {
  const [channelData, setChannelData] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [results, setResults] = useState([]);
  const videoId = item?.id?.videoId;
  const [videoDetailss, setVideoDetailss] = useState();
  const { id } = useParams();

  console.log("searchcaritem", item);



  const channelDetails = async () => {
    try {
      const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${item?.snippet?.channelId}&key=${API_KEY}`)
      setChannelData(channelResponse.data.items[0])
      console.log("channelDetails-data", channelResponse.data);
    } catch (error) {
      console.log(error);
    }
  }

  const fetchSearch2 = async () => {
    try {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${item?.id?.videoId}&key=${API_KEY}`)
      setResults(response.data.items[0])
      console.log("search-data22222", response.data);
    } catch (error) {
      console.log(error);
    }
  }

  const videoDetails = async () => {
    try {
      const videoResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${item?.id?.videoId}&key=${API_KEY}`);
      // Update state with video details
      setVideoDetailss(videoResponse.data.items[0]);
      console.log("derteriisdafihdshdidsishsdidsfdsds", videoResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    channelDetails();
    fetchSearch2();
    videoDetails();
  }, [])


  const isVerified = channelData?.statistics?.subscriberCount >= 100000;

  return (
    <div>
      <div className={`${isSidebarOpen ? "hidden md:block" : " w-[100%] "}`}>
        <Link to={`/video/${results?.snippet?.categoryId}/${videoId}`}>
          <div className="flex flex-col">
            {/* channel thubnail & time duration */}
            <div className="relative h-48 md:h-56 md: rounded-xl hover:rounded-none duration-200 overflow-hidden">
              <img className="h-full w-full " src={item?.snippet?.thumbnails?.medium?.url} alt="" />
              {videoDetailss?.contentDetails?.duration && (
                <Time time={videoDetailss.contentDetails.duration} />
              )}
            </div>
            {/* channel logo & title */}
            <div className="flex mt-3 space-x-2 ">
              <div className="flex items-start">
                <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                  <img className="h-full w-full rounded-full overflow-hidden" src={results?.snippet?.thumbnails?.default?.url} alt="" />
                </div>
              </div>
              <div>
                <span className="text-sm font-bold line-clamp-2 ">{item?.snippet?.title}</span>
                <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-600">
                  {item?.snippet?.channelTitle}
                  {isVerified && (
                    <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
                  )}
                </span>
                <div className="flex text-gray-500 text-[12px]">
                  <span>
                    {`${abbreviateNumber(channelData?.statistics?.viewCount, 2).replace('G', 'B')}views`}
                  </span>
                  <span className="flex text-[24px] leading-none font-bold relative top-[-10px] mx-1">.</span>
                  <span>
                    {moment(item?.snippet?.publishedAt).fromNow()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default SearchCard;
