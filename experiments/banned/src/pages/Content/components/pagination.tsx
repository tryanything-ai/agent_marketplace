import React from 'react';

const Pagination = () => {
  return (
    <div className="flex flex-1 flex-grow justify-start max-lg:justify-center">
      <div className="flex flex-wrap gap-2 text-sm text-black/60 dark:text-white/70">
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap cursor-default flex items-center opacity-50">
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Prev
        </button>
        <button className="text-sm whitespace-nowrap flex h-5 w-5 items-center justify-center text-blue-600 hover:text-blue-600 dark:text-blue-600 dark:hover:text-blue-600">
          1
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          2
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          3
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          4
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          5
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          6
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          7
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          8
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          9
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          10
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          11
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          12
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex h-5 w-5 items-center justify-center">
          13
        </button>
        <button className="text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex items-center">
          Next
          <svg
            stroke="currentColor"
            fill="none"
            stroke-width="2"
            viewBox="0 0 24 24"
            stroke-linecap="round"
            stroke-linejoin="round"
            className="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
