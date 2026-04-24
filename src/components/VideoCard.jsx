export default function VideoCard({ video }) {
  // console.log('video',video);
  return (
    <div className="w-full">
      {/* screen (< md) */}
      <div className="w-full md:hidden border-b border-gray-300 pb-4">
        <div className="flex gap-3">
          {/* Thumbnail */}
          <div className="relative w-36 h-20 shrink-0 overflow-hidden rounded-md">
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover "
            />

            <span className="font-semibold absolute bottom-1 right-1 bg-black/80 text-gray-300 text-[12px] px-1.5 py-[1px] rounded">
              {video.duration}
            </span>
          </div>

          {/* Content */}
          <div className="flex flex-col justify-between flex-1">
            <div>
              {/* Title */}
              <h3 className="text-sm font-medium leading-snug line-clamp-2 text-gray-900">
                {video.title}
              </h3>

              {/* Channel */}
              <p className="text-sm text-gray-500">
                {video.channel === "YTH - Main"
                  ? "आचार्य प्रशांत"
                  : video.channel === "English-Main"
                    ? "Acharya Prashant"
                    : video.channel}
              </p>

              {/* Views */}
              <p className="text-xs text-gray-500 font-medium">
                {video.views} {video.publishedAt}
              </p>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-2">
          {video.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="text-xs bg-[#eceff1] px-2 py-0.5 rounded text-gray-600 font-medium"
            >
              {tag}
            </span>
          ))}

          {video.tags?.length > 2 && (
            <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-medium">
              +{video.tags.length - 2}
            </span>
          )}
        </div>
      </div>

      {/* Screen (≥ md) */}
      <div className="hidden md:block">
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
        <div className="mt-2 space-y-1">
          <h3 className="text-base font-medium leading-snug line-clamp-2">
            {video.title}
          </h3>

          <p className="text-sm text-gray-500">
            {video.channel === "YTH - Main"
              ? "आचार्य प्रशांत"
              : video.channel === "English-Main"
                ? "Acharya Prashant"
                : video.channel}
          </p>

          <p className="text-[13px] text-gray-500 font-medium">
            {video.views} • {video.publishedAt}
          </p>

          <div className="flex flex-wrap gap-1 mt-1">
            {video.tags?.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="text-xs md:text-sm bg-[#eceff1] px-2 py-0.5 rounded text-[#797677] font-semibold"
              >
                {tag}
              </span>
            ))}

            {video.tags?.length > 2 && (
              <span className="text-xs bg-gray-200 px-2 py-0.5 rounded text-gray-700 font-medium">
                +{video.tags.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
