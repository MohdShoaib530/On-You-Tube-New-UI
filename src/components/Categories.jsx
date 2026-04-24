import { useRef, useEffect, useState } from "react";

const Categories = ({ categories, category, setCategory }) => {
  const scrollRef = useRef(null);
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      setShowLeft(container.scrollLeft > 0);

      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      setShowRight(container.scrollLeft < maxScrollLeft - 5);
    };

    handleScroll();
    container.addEventListener("scroll", handleScroll);

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);
  const scroll = (direction) => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollAmount = 600;

    container.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="relative group">
        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex overflow-x-scroll no-scrollbar border-b border-gray-300  lg:gap-6 gap-4 whitespace-nowrap pt-4"
        >
          {categories.map((item) => {
            const isActive = category === item.value;

            return (
              <button
                key={item.label}
                onClick={() => setCategory(item.value)}
                className={`
                pb-2  text-base font-medium cursor-pointer transition
                ${
                  isActive
                    ? "text-black border-b-2 text-lg border-black"
                    : "text-gray-700 hover:text-black"
                }
              `}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Left Arrow */}
        {showLeft && (
          <button
            onClick={() => scroll("left")}
            className="hidden sm:block absolute left-0 top-8 px-4 py-2 -translate-y-1/2 bg-white border border-gray-300 shadow-[0px_4px_16px_rgba(17,17,26,0.1)] hover:shadow-lg hover:bg-gray-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            ‹
          </button>
        )}

        {/* Right Arrow */}
        {showRight && (
          <button
            onClick={() => scroll("right")}
            className="hidden sm:block absolute right-0 top-8 px-4 py-2 -translate-y-1/2 bg-white border border-gray-300 shadow-[0px_4px_16px_rgba(17,17,26,0.1)] hover:shadow-lg hover:bg-gray-50 cursor-pointer opacity-0 group-hover:opacity-100 transition-all duration-200"
          >
            ›
          </button>
        )}
      </div>
    </div>
  );
};

export default Categories;
