import { formatDuration, formatViews, timeAgo } from "../helpers/dataFormat.js";

export const fetchVideos = async (params = {}) => {
  try {
    const query = new URLSearchParams();

    if (params.categoryId) query.append("categoryId", params.categoryId);
    if (params.language) query.append("language", params.language);
    if (params.orderBy) query.append("orderBy", params.orderBy);
    if (params.publishedAtYear) query.append("publishedAtYear", params.publishedAtYear);

    params.channels?.forEach((ch) => query.append("channels", ch));

    const url = `https://acharyaprashant.org/api/v2/uni/yt?limit=50&offset=0&${query.toString()}`;

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`API Error: ${res.status}`);
    }

    const data = await res.json();

    if (!data?.data || !Array.isArray(data.data)) {
      throw new Error("API data format is not valid");
    }

    const videoData = data.data.map((v) => ({
      title: v?.title || "Untitled",
      thumbnail: v?.video?.thumbnailURL || "",
      url: v?.video?.videoURL || "",
      views: formatViews(v?.viewCount || 0),
      duration: formatDuration(v?.video?.durationInSeconds || 0),
      publishedAt: timeAgo(v?.publishedAt),
      channel: v?.channel?.title || "Unknown",
      tags: v?.tags || [],
    }));

    return videoData;

  } catch (error) {
    console.error("fetchVideos error:", error);
    return [];
  }
};