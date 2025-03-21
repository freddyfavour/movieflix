import React from "react";

const Skeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="bg-light-100/5 p-5 rounded-2xl shadow-inner shadow-light-100/10"
        >
          <div className="w-full h-[300px] bg-gray-100/75 rounded-lg animate-pulse duration-75"></div>
          <div className="mt-4 space-y-2">
            <div className="h-4 bg-gray-100/75 rounded-full w-3/4 animate-pulse"></div>
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-100/75 rounded-full w-6 animate-pulse"></div>
              <div className="h-4 bg-gray-100/75 rounded-full w-12 animate-pulse"></div>
              <span className="text-gray-100">•</span>
              <div className="h-4 bg-gray-100/75 rounded-full w-8 animate-pulse"></div>
              <span className="text-gray-100">•</span>
              <div className="h-4 bg-gray-100/75 rounded-full w-10 animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Skeleton;
