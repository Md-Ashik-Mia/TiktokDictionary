"use client";

import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

type Timeframe = "today" | "week" | "month";

export const FilterSection = () => {
  const [timeframe, setTimeframe] = useState<Timeframe>("today");
  const [filter, setFilter] = useState("Slang");

  return (
    <div className="max-w-6xl mx-auto px-6 -mt-8">
      <div className="flex flex-col md:flex-row gap-6 max-w-4xl mx-auto">
        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#00336E] ml-1">
            Sort by
          </label>
          <div className="relative">
            <select
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value as Timeframe)}
              className="w-full appearance-none bg-white border border-[#00336E] rounded-xl px-4 py-3.5 text-sm text-[#00336E] outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-[#00336E]/10"
            >
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00336E]" />
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-1.5">
          <label className="text-xs font-bold text-[#00336E] ml-1">
            Filter by:
          </label>
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="w-full appearance-none bg-white border border-[#00336E] rounded-xl px-4 py-3.5 text-sm text-[#00336E] outline-none cursor-pointer shadow-sm focus:ring-2 focus:ring-[#00336E]/10"
            >
              <option>Slang</option>
              <option>TikTok Trends</option>
              <option>Memes</option>
              <option>Audio</option>
              <option>Acronyms</option>
            </select>
            <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-[#00336E]" />
          </div>
        </div>
      </div>
    </div>
  );
};
