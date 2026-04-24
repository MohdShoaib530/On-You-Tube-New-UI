import { FaCircleCheck } from "react-icons/fa6";

export default function VideoCard({ video }) {
  const channelName =
    video.channel === "YTH - Main"
      ? "आचार्य प्रशांत"
      : video.channel === "English-Main"
      ? "Acharya Prashant"
      : video.channel;

  return (
    <div className="group w-full h-full flex flex-col">
      {/* 🔹 MOBILE (< sm) */}
      <div className="sm:hidden border-b border-gray-200 py-4 font-base">
        <div className="flex gap-3">
          {/* Thumbnail */}
          <div className="relative w-36 h-20 shrink-0 overflow-hidden rounded-lg bg-gray-100">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover"
            />

            <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[11px] px-1.5 py-[2px] rounded">
              {video.duration}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-gray-900">
                {video.title}
              </h3>

              <p className="text-xs text-gray-500 mt-0.5 flex gap-1 items-center">
                 {channelName} <FaCircleCheck className="text-blue-700 w-2.5"/>
              </p>

              <p className="text-xs text-gray-400 font-medium">
                {video.views} • {video.publishedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-3">
          {video.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-[11px] bg-blue-50 px-2 py-0.5 rounded-md text-blue-900  font-medium"
            >
              {tag}
            </span>
          ))}

          {video.tags?.length > 2 && (
            <span className="text-[11px] bg-blue-50 px-2 py-0.5 rounded-md text-blue-900 font-medium">
              +{video.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* 🔹 DESKTOP (≥ sm) */}
      <div className="hidden sm:block h-full">
        <div className="rounded-xl overflow-hidden bg-white border border-gray-100 shadow-sm transition-all duration-200 group-hover:shadow-md h-full flex flex-col">
          
          {/* Thumbnail */}
           <div className="relative w-full aspect-video overflow-hidden rounded-lg">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover"
          />

          <span className="text-sm font-semibold absolute bottom-1 right-1 bg-black/80 text-gray-300 px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </div>

          {/* Content */}
          <div className="p-3 flex flex-col flex-grow">
            {/* Title (FIXED HEIGHT) */}
            <h3 className="font-base text-[15px] font-medium leading-snug line-clamp-2 min-h-[42px] text-gray-900">
              {video.title}
            </h3>

            {/* Channel */}
            <p className="text-sm text-gray-500 mt-1 flex items-center gap-1 font-medium font-base">
              {channelName} <FaCircleCheck className="text-blue-700 w-2.5"/>
            </p>

            {/* Views */}
            <p className="text-xs text-gray-400 font-medium">
              {video.views} • {video.publishedAt}
            </p>

            {/* Tags (PUSHED TO BOTTOM) */}
            <div className="mt-auto pt-2 flex flex-wrap gap-1.5">
              {video.tags?.slice(0, 2).map((tag, i) => (
                <span
                  key={i}
                  className="text-[12px] bg-blue-50 px-2 py-0.5 rounded-md text-blue-900 font-medium"
                >
                  {tag}
                </span>
              ))}

              {video.tags?.length > 2 && (
                <span className="text-[12px] bg-blue-100 px-2 py-0.5 rounded-md text-gray-600 font-medium">
                  +{video.tags.length - 2}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}