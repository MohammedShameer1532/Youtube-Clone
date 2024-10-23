import { abbreviateNumber } from 'js-abbreviation-number';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import Time from '../loader/Time';
import moment from 'moment';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SuggesionVideo = ({ id, item, isSidebarOpen, SuggestionData }) => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [channelData, setChannelData] = useState([]);
  const itemsData = item?.snippet?.channelId;
  const [videoDetailss, setVideoDetailss] = useState();

  useEffect(() => {

    const channelDetails = async () => {
      try {
        const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${itemsData}&key=${API_KEY}`)
        setChannelData(channelResponse.data.items[0])
        console.log("channelDetails-data", channelResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    // Call suggestionData and then channelDetails once data is available
    const fetchDatas = async () => {
      await SuggestionData();
      if (itemsData) {
        await channelDetails(itemsData)
      }

    };
    fetchDatas();
  }, [id, API_KEY, itemsData])

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
    videoDetails()
  }, [id, API_KEY]);




  const isVerified = channelData?.statistics?.subscriberCount >= 100000;

  return (
    <div className={`${isSidebarOpen ? "hidden" : "h-auto "}`}>
      <Link to={`/video/${item?.snippet?.categoryId}/${item.id}`}>
        <div className="flex  mb-3">
          {/* channel thubnail & time duration */}
          <div className="relative h-24 lg:h-20 xl:h-24 w-40 min-w-[168px] lg:w-32 lg:min-w-[128px] xl:w-40 xl:min-w-[168px] rounded-xl hover:rounded-none duration-200">
            <img className="h-full w-[80%] md:w-full rounded-lg" src={item?.snippet?.thumbnails?.medium?.url} alt="" />
            <div className='ml-[] mt-10'> {videoDetailss?.contentDetails?.duration && (
              <Time time={videoDetailss.contentDetails.duration} />
            )}</div>

          </div>
          {/* channel logo & title */}
          <div className="flex mt-3 ml-[-2rem] md:ml-2 space-x-2 ">
            <div className="flex items-start">
              <div className="flex h-9 w-9 rounded-full overflow-hidden border">
                <img className="h-full w-full rounded-full overflow-hidden" src={channelData?.snippet?.thumbnails?.default?.url} alt="" />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold line-clamp-4  ">{item?.snippet?.title}</span>
              <span className="flex items-center font-semibold mt-2 text-[12px] text-gray-500">
                {item?.snippet?.channelTitle}
                {isVerified && (
                  <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
                )}
              </span>
              <div className="flex  text-gray-500 text-[12px] line-clamp-3">
                <span>
                  {`${abbreviateNumber(item?.statistics?.viewCount)}views`}
                </span>
                <span className="flex text-[24px] leading-none font-bold relative top-[-10px]  mx-1">.</span>
                <span className='mt-4 md:mt-0 ml-[-4.8rem] md:ml-0 text-xs '>
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

export default SuggesionVideo;