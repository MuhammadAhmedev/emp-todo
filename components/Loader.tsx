import React from "react";

export default function Loader() {
  return (
    <div className="bg-black/90 min-h-screen absolute top-0 z-50 w-full flex justify-center items-center">
      <div
        className="animate-spin size-6 border-[3px] border-current border-t-transparent text-primary rounded-full "
        role="status"
        aria-label="loading"
      ></div>
    </div>
  );
}
