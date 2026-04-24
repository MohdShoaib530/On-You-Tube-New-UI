import { useState } from "react";
import {
  ORDER_OPTIONS,
  CHANNEL_OPTIONS,
  YEAR_OPTIONS,
} from "../constants/filters.js";
import { Check, ChevronDown } from "lucide-react";
import { useRef, useEffect } from "react";

const groupedChannels = {
  hindi: CHANNEL_OPTIONS.filter((c) => c.language === "hindi"),
  english: CHANNEL_OPTIONS.filter((c) => c.language === "english"),
  other: CHANNEL_OPTIONS.filter((c) => c.language === "other"),
};

const Filters = ({
  orderBy,
  setOrderBy,
  setChannel,
  channels,
  year,
  setYear,
}) => {
  const [isYearOpen, setIsYearOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const yearRef = useRef(null);

  const [tempChannels, setTempChannels] = useState(channels);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (yearRef.current && !yearRef.current.contains(e.target)) {
        setIsYearOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <div className="flex gap-3 py-4 flex-wrap">
        {/*  Order */}
        <div className="flex gap-2">
          {ORDER_OPTIONS.map((item) => {
            const isActive = orderBy === item.value;

            return (
              <button
                key={item.label}
                onClick={() => setOrderBy(item.value)}
                className={`px-4 py-2 border rounded-[5px] text-sm font-medium ${
                  isActive
                    ? "bg-black text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Channel Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setTempChannels(channels); //  syncing
              setIsOpen(true);
            }}
            className="px-4 py-2 rounded-[5px] border bg-white text-sm font-medium flex items-center gap-2"
          >
            Channel ({channels.length})
            <ChevronDown size={16} />
          </button>

          {/* Drawer */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 flex justify-center items-end z-50"
              onClick={() => setIsOpen(false)}
            >
              <div
                className="bg-white w-full max-w-md max-h-[80vh] rounded-t-lg p-4 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Hindi */}
                <h3 className="text-xs font-semibold text-gray-500 mb-2">
                  HINDI CHANNELS
                </h3>
                {groupedChannels.hindi.map((item) => {
                  const isSelected = tempChannels.includes(item.value);

                  return (
                    <div
                      key={item.value}
                      onClick={() => {
                        if (isSelected) {
                          setTempChannels(
                            tempChannels.filter((c) => c !== item.value),
                          );
                        } else {
                          setTempChannels([...tempChannels, item.value]);
                        }
                      }}
                      className="flex justify-between py-3 border-b cursor-pointer"
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check size={16} />}
                    </div>
                  );
                })}

                {/* English */}
                <h3 className="text-xs font-semibold text-gray-500 mt-4 mb-2">
                  ENGLISH CHANNELS
                </h3>
                {groupedChannels.english.map((item) => {
                  const isSelected = tempChannels.includes(item.value);

                  return (
                    <div
                      key={item.value}
                      onClick={() => {
                        if (isSelected) {
                          setTempChannels(
                            tempChannels.filter((c) => c !== item.value),
                          );
                        } else {
                          setTempChannels([...tempChannels, item.value]);
                        }
                      }}
                      className="flex justify-between py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check size={16} />}
                    </div>
                  );
                })}

                {/* Other */}
                <h3 className="text-xs font-semibold text-gray-500 mt-4 mb-2">
                  OTHER CHANNELS
                </h3>
                {groupedChannels.other.map((item) => {
                  const isSelected = tempChannels.includes(item.value);

                  return (
                    <div
                      key={item.value}
                      onClick={() => {
                        if (isSelected) {
                          setTempChannels(
                            tempChannels.filter((c) => c !== item.value),
                          );
                        } else {
                          setTempChannels([...tempChannels, item.value]);
                        }
                      }}
                      className="flex justify-between py-3 border-b cursor-pointer hover:bg-gray-100 px-2"
                    >
                      <span>{item.label}</span>
                      {isSelected && <Check size={16} />}
                    </div>
                  );
                })}

                {/* Actions */}
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => setTempChannels([])}
                    className="flex-1 border py-2"
                  >
                    Clear
                  </button>

                  <button
                    onClick={() => {
                      setChannel(tempChannels); //
                      setIsOpen(false);
                    }}
                    className="flex-1 bg-gray-700 text-white py-2"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Year */}
        <div ref={yearRef} className="relative">
          <button
            onClick={() => setIsYearOpen(!isYearOpen)}
            className="px-4 rounded-[5px] py-2 border text-sm bg-white flex items-center gap-2 font-medium"
          >
            {year || "Year"}
            <ChevronDown size={16} />
          </button>

          {isYearOpen && (
            <div className="absolute mt-2 w-40 max-h-60 overflow-y-auto bg-[#1F2022] text-white shadow-lg z-50">
              {YEAR_OPTIONS.map((item) => (
                <div
                  key={item.value}
                  onClick={() => {
                    setYear(item.value);
                    setIsYearOpen(false);
                  }}
                  className="px-4 py-3 border-b cursor-pointer flex justify-between"
                >
                  {item.label}
                  {year === item.value && <Check size={16} />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;
