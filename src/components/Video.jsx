import { Link, useParams } from "react-router-dom";
import Time from "../loader/Time";
import { BsFillCheckCircleFill } from "react-icons/bs";
import { abbreviateNumber } from "js-abbreviation-number";
import moment from "moment";
import axios from "axios";
import { useEffect, useState } from "react";


const Video = ({ isSidebarOpen, item }) => {
  const [channelData, setChannelData] = useState([]);
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const { id } = useParams();
  const itemsData = item?.snippet?.channelId;
  const [videoDetailss, setVideoDetailss] = useState();


  const isVerified = channelData?.statistics?.subscriberCount >= 100000;


  const channelDetails = async () => {
    try {
      const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${itemsData}&key=${API_KEY}`)
      setChannelData(channelResponse.data.items[0])
      console.log("channelDetails-data", channelResponse.data);
    } catch (error) {
      console.log(error);
    }

  }

  const videoDetails = async () => {
    try {
      const videoResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics,contentDetails&id=${item.id}&key=${API_KEY}`);
      // Update state with video details
      setVideoDetailss(videoResponse.data.items[0]);
      console.log("derteriisdafihdshdidsishsdidsfdsds", videoResponse.data);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    videoDetails();
    channelDetails();
  }, [id, API_KEY]);


  return (
    <div className={`${isSidebarOpen ? "hidden md:block" : " w-full "}`}>
      <Link to={`/video/${item?.snippet?.categoryId}/${item.id}`}>
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
                <img className="h-full w-full rounded-full overflow-hidden" src={channelData?.snippet?.thumbnails?.default?.url} alt="" />
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
                  {`${abbreviateNumber(item?.statistics?.viewCount, 2).replace('G', 'B')}views`}
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
  )
}

export default Video;