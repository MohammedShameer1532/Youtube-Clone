import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'
import { abbreviateNumber } from 'js-abbreviation-number';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { AiOutlineLike } from "react-icons/ai";
import SuggesionVideo from './SuggesionVideo';
import Navbar from './Navbar';
import Sidebar2 from './Sidebar2';
import axios from 'axios';
import moment from 'moment';
import Loading from '../loader/Loading';

const VideoPlaying = () => {
  const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
  const [relatedVideo, setRelatedVideo] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState([]);
  const [channelData, setChannelData] = useState([]);
  const [comment, setComment] = useState([]);
  const { id, categoryId } = useParams();
  const [datas, setDatas] = useState([]);
  const [category, setCategory] = useState(0);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);


  const handleSidebarToggle = () => {
    setIsSidebarOpen((prevState) => !prevState);
  };

  console.log("id", id, categoryId);


  useEffect(() => {
    const fetchVideoPlayingData = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${id}&key=${API_KEY}`)
        setData(response.data.items[0])
        console.log("VideoPlaying-data", response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setTimeout(() => setIsLoading(false), 1000);
      }
    }
    const channelDetails = async () => {
      try {
        const channelResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${data?.snippet?.channelId}&key=${API_KEY}`)
        setChannelData(channelResponse.data.items[0])
        console.log("channelDetails-data", channelResponse.data);
      } catch (error) {
        console.log(error);
      }
    }

    // Call fetchVideoPlayingData and then channelDetails once data is available
    const fetchDatas = async () => {
      await fetchVideoPlayingData();
      if (data?.snippet?.channelId) {
        await channelDetails(data.snippet.channelId)
      }

    };
    fetchDatas();
  }, [id, API_KEY, data?.snippet?.channelId,])

  const commentDetails = async () => {
    try {
      const commentResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=10&videoId=${id}&key=${API_KEY}`)
      setComment(commentResponse.data.items)
      console.log("commentDetails", commentResponse.data);
    } catch (error) {
      console.log(error);
    }
  }


  const SuggestionData = async () => {
    try {
      const suggestionResponse = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY} `)
      setRelatedVideo(suggestionResponse.data.items)
      console.log("suggestion-data", suggestionResponse.data);
    } catch (error) {
      console.log(error);
    }
  }


  const fetchData = async (categoryId) => {
    try {
      const response = await axios.get(`https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=IN&videoCategoryId=${categoryId}&key=${API_KEY}`)
      setDatas(response.data.items)
      console.log("Home-data", response.data);
    } catch (error) {
      console.log(error);
    }
  }


  const toggleShowMore = () => {
    setShowMore((prev) => !prev);
  };

  useEffect(() => {
    commentDetails();
    SuggestionData();
    fetchData(category);

  }, [id]);

  const handleCategoryChange = (categoryId) => {
    navigate(`/category/${categoryId}`);
  };

  const isVerified = channelData?.statistics?.subscriberCount >= 100000;


  return (
    <div className='overflow-hidden'>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <nav>
            <Navbar handleSidebarToggle={handleSidebarToggle} />
            <Sidebar2
              isSidebarOpen={isSidebarOpen}
              category={category}
              setCategory={handleCategoryChange}
              fetchData={fetchData}
            />
          </nav>

          <header>
            <div className={`${isSidebarOpen ? "hidden md:flex justify-center  flex-row h-[calc(100%-56px)] w-full md:w-[65%] lg:w-full  relative  mt-14  ml-0 md:ml-[16rem] lg:ml-[12rem] xl:ml-[15rem] overflow-hidden" : "flex justify-center  flex-row h-[calc(100%-56px)] w-full md:w-[100%] lg:w-full mt-[-72rem] md:mt-[-82rem]"}`}>
              <div className='flex justify-center  flex-row h-[calc(100%-56px)] w-full  '>
                <div className='flex flex-col lg:flex-row  w-full max-w-[1580px] '>
                  <div className='flex  flex-col lg:w-[calc(100%-490px)] xl:w-[100%-400px] px-4 py-3 lg:py-6'>
                    <div className='h-[200px] md:h-[500px] ml-[-16px] mr-[-16px] lg:ml-20 lg:mr-0 rounded-md  overflow-hidden'>
                      <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${id}`}
                        height="100%"
                        width="100%"
                        controls
                        style={{
                          backgroundColor: "#000000",
                        }}
                        playing={true}
                      />
                    </div>
                    <div className="flex ml-0 md:ml-0 lg:ml-12 font-bold  text-sm md:text-base xl:text-xl mt-4 lg:px-0 lg:pl-8  line-clamp-2 ">
                      {data?.snippet?.title}
                    </div>
                    <div className="flex justify-between flex-col md:flex-row mt-4 lg:px-0 lg:pl-20">
                      <div className="flex">
                        <div className="flex items-start">
                          <div className="flex h-11 w-11 rounded-full overflow-hidden">
                            <img className="h-full w-full rounded-full overflow-hidden" src={channelData?.snippet?.thumbnails?.default?.url} alt="" />
                          </div>
                        </div>
                        <div className="flex items-center space-x-5">
                          <div className="flex flex-col ml-3">
                            <div className=" text-xs md:text-sm xl:text-base  font-semibold flex items-center  ">
                              {data?.snippet?.channelTitle}
                              {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                            <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                          )} */}
                              {isVerified && (
                                <BsFillCheckCircleFill className="text-gray-600 ml-1 text-[12px]" />
                              )}
                            </div>
                            <div className="text-xs md:text-sm xl:text-base font-semibold">
                              {`${abbreviateNumber(channelData?.statistics?.subscriberCount, 1)} subscribers`}
                            </div>
                          </div>
                          <span className="mt-0 text-center text-xs md:text-sm xl:text-base  bg-red-500 px-4 py-2 rounded-full text-white cursor-pointer hover:bg-red-700 duration-200 ">
                            Subscribe
                          </span>
                        </div>
                      </div>
                      <div className="text-xs md:text-sm xl:text-base flex mt-4 md:mt-0">
                        <div className="flex items-center justify-center h-11 px-4 rounded-3xl bg-white/[0.15] cursor-pointer">
                          <AiOutlineLike className=" text-base md:text-xl xl:text-xl mr-2 " />
                          {`${abbreviateNumber(data?.statistics?.likeCount, 2)} Likes`}
                        </div>
                        <div className="flex items-center justify-center h-11 px-0 rounded-3xl bg-white/[0.15] ml-0">
                          {`${abbreviateNumber(data?.statistics?.viewCount, 2)} Views`}
                        </div>
                      </div>
                    </div>
                    <div className='flex flex-col justify-center items-start sm:ml-0 md:ml-0 lg:ml-20 xl:ml-16 '>
                      <p className="flex  flex-col w-[100%] p-4 bg-gray-100 rounded-xl mt-4 text-sm">
                        <strong className="flex space-x-5 mb-2 text-black  text-sm md:text-base ">
                          <span> {moment(data.snippet?.publishedAt).fromNow()}</span>
                          <span> {`${abbreviateNumber(data?.statistics?.viewCount, 2)} Views`}</span>
                        </strong>
                        {showMore ? data?.snippet?.description : `${data?.snippet?.description?.substring(0, 200)}...`}
                        <strong className="text-black cursor-pointer"
                          onClick={toggleShowMore}>{showMore ? "Show Less" : "...more"}
                        </strong>
                      </p>
                      <div className="flex gap-x-6 font-semibold rounded-xl mt-4 text-base md:text-xl ">
                        {data?.statistics?.commentCount}
                        <p>Comments</p>
                      </div>
                      <div className='w-full'>
                        <input
                          type='text'
                          placeholder="Add a public comment..."
                          className="my-4 w-[100%] border-b-2 border-gray-300 outline-none focus:border-gray-800 transition-colors">
                        </input>
                      </div>
                      {comment?.map((item, index) => {
                        return (
                          <div key={index} className='w-full mt-3'>
                            <div className="flex items-center space-x-2 ">
                              <div className="flex items-start mt-4">
                                <div className="flex h-10 w-10 rounded-full overflow-hidden">
                                  <img className="h-full w-full rounded-full overflow-hidden" src={item?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl || ""} alt="" />
                                </div>
                              </div>
                              <div className="flex flex-col ml-3">
                                <div className="text-md font-semibold flex items-center text-sm md:text-base ">
                                  {item?.snippet?.topLevelComment?.snippet?.authorDisplayName}
                                  {/* {video?.author?.badges[0]?.type === "VERIFIED_CHANNEL" && (
                                <BsFillCheckCircleFill className="text-white/[0.5] text-[12px] ml-1" />
                              )} */}
                                </div>
                              </div>
                              <div className="text-xs md:sm-base font-semibold">
                                <span> {moment(item?.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}</span>
                              </div>
                            </div>
                            <div className='mt-[-1rem] ml-12 line-clamp-6 text-sm md:text-base '>
                              {item?.snippet?.topLevelComment?.snippet?.textDisplay}
                            </div>
                            <div className="flex items-center ml-6  h-11 px-6 rounded-3xl bg-white/[0.15] cursor-pointer">
                              <AiOutlineLike className="text-sm md:text-base mr-2 " />
                              <div className='text-[15px] md:text-sm'>
                                {`${abbreviateNumber(item?.snippet?.topLevelComment?.snippet?.likeCount, 2)} Likes`}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="flex flex-col px-4 py-6 h-auto overflow-x-hidden lg:w-[350px] xl:w-[400px]">
                    {relatedVideo.map((item, index) => {
                      return (
                        <SuggesionVideo key={index} item={item} id={id} isSidebarOpen={isSidebarOpen} categoryId={categoryId} SuggestionData={SuggestionData} />
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </header>
        </div>
      )}
    </div>
  )
}

export default VideoPlaying;