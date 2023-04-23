import React from "react";
import classnames from "classnames";

const Sparkline = ({ data, color }) => {
  const sparklineClasses = classnames(
    "w-full",
    "h-8",
    // "bg-gray-200",
    "flex-1",
    "rounded",
    "overflow-hidden"
  );

  const sparklineItemClasses = classnames(
    "inline-block",
    "h-full",
    "mr-1",
    `bg-pink-500`,
    "h-12"
  );

  return (
    <div className={sparklineClasses}>
      {data.map((value, index) => (
        <div key={index} className={sparklineItemClasses} />
      ))}
    </div>
  );
};

export default Sparkline;
