import { useEffect, useState } from "react";
import { fetchVideos } from "../services/api.js";
import { categories } from "../constants/categories.js";
import Categories from "../components/Categories.jsx";
import Filters from "../components/Filters.jsx";
import VideoCard from "../components/VideoCard.jsx";
import { LuTvMinimalPlay } from "react-icons/lu";
import { FaYoutube } from "react-icons/fa";

function HomePage() {
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState([]);
  const [category, setCategory] = useState(null);
  const [language, setLanguage] = useState(null);
  const [orderBy, setOrderBy] = useState("3");
  const [publishedAtYear, setPublishedAtYear] = useState(null);
  const [channels, setChannels] = useState([
    "UCkuZJIhMYCnOa0dnWeHuN2w",
    "UCMgapddJymOC6MBOiOqia1A",
  ]);
  const languagesButton = [
    { label: "ALL", value: null },
    { label: "ENG", value: 2 },
    { label: "हिन्दी", value: 1 },
  ];

  // Fetch Videos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const videos = await fetchVideos({
          categoryId: category,
          channels: channels,
          language: language,
          orderBy: orderBy,
          publishedAtYear: publishedAtYear,
        });

        setVideos(videos);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category, language, orderBy, publishedAtYear, channels]);
  return (
    <div className="page w-full max-w-384 flex flex-col mt-8 px-3 lg:px-17 mx-auto min-h-screen gap-1">
      {/* Header */}
      <div className="flex items-center justify-between ">
        {/* Left Title */}
        <h1 className="text-2xl flex gap-1 sm:gap-2 items-center fotn-semibold leading-none tracking-normal lg:text-3xl lg:font-bold font-bold text-gray-800">
          <FaYoutube className="text-red-600 text-4xl"/> On YouTube
        </h1>

        {/* Right Language Filters */}
        <div className="flex border-[#a3a3a3] border-[.5px] rounded overflow-hidden h-7 lg:h-7.25 relative items-center ">
          {languagesButton.map((lang, i) => (
            <button
              key={i}
              onClick={() => setLanguage(lang.value)}
              className={`px-2 py-1 lg:px-4 lg:py-2 text-sm font-medium cursor-pointer ${
                i !== 0 ? "border-l" : ""
              } ${
                language === lang.value
                  ? "bg-gray-800 text-white"
                  : "bg-white text-gray-700"
              }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-0  z-50 bg-white">
        <Categories
          categories={categories}
          category={category}
          setCategory={setCategory}
        />
      </div>

      {/* Filters */}
      <div className="sticky top-13.5 z-50 bg-white ">
        <Filters
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          setChannel={setChannels}
          channels={channels}
          setYear={setPublishedAtYear}
          year={publishedAtYear}
        />
      </div>

      {/* Video Grid */}
      {loading ? (
        <div className="flex justify-center items-center h-96">
          <div className="w-10 h-10 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 md:gap-x-4 md:gap-y-6">
          {videos.length === 0 && !loading ? (
            <div className="col-span-full flex flex-col items-center justify-center py-20 text-gray-500 text-center">
              <LuTvMinimalPlay size={40} strokeWidth={2.75} />

              <p className="text-lg font-medium mt-3">No videos found</p>

              <button
                onClick={() => {
                  setCategory(null);
                  setLanguage(null);
                  setOrderBy("3");
                  setPublishedAtYear(null);
                  setChannels([
                    "UCkuZJIhMYCnOa0dnWeHuN2w",
                    "UCMgapddJymOC6MBOiOqia1A",
                  ]);
                }}
                className="mt-4 text-[16px] text-gray-700 font-bold uppercase tracking-wide border-b-2 border-black pb-0.5 transition-all duration-300 hover:text-white hover:bg-black px-2 py-1"
              >
                Remove Filters
              </button>
            </div>
          ) : (
            videos.map((video) => <VideoCard key={video.url} video={video} />)
          )}
        </div>
      )}
    </div>
  );
}

export default HomePage;
