"use client";

import { FiChevronDown } from "react-icons/fi";

type Timeframe = "today" | "week" | "month";

export const FilterSection = ({
  timeframe,
  onTimeframeChange,
  category,
  onCategoryChange,
  categories,
}: {
  timeframe: Timeframe;
  onTimeframeChange: (value: Timeframe) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}) => {

  return (
    <div className="max-w-6xl mx-auto px-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 flex flex-col gap-1.5 relative">
          <label className="absolute z-50 bg-white -top-1.5 left-1 font-display text-xs font-bold text-[#000000] ml-1 px-1.5">
            Sort by
          </label>
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => onTimeframeChange(e.target.value as Timeframe)}
              className="w-full appearance-none bg-white border border-[#00336E] rounded-[15px] px-4 py-3.5 text-sm text-[#00336E] outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-[#00336E]/10"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00336E]" />
          </div>
        </div>
        <div className="flex-1 flex flex-col gap-1.5 relative">
          <label className="absolute z-50 bg-white -top-1.5 left-1 font-display text-xs font-bold text-[##000000] ml-1 px-1.5">
            Filter by:
          </label>
          <div className="relative">
            <select
              value={category}
              onChange={(e) => onCategoryChange(e.target.value)}
              className="w-full appearance-none bg-white border border-[#00336E] rounded-[15px] px-4 py-3.5 text-sm text-[#00336E] outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-[#00336E]/10"
            >
              {categories.length === 0 ? (
                <option value="" disabled>
                  Loading categories...
                </option>
              ) : (
                categories.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))
              )}
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00336E]" />
          </div>
        </div>
      </div>
    </div>
  );
};
