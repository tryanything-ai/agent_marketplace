import React from 'react';

const Pagination = ({
  count,
  pages,
  page,
  setPage,
}: {
  count: number;
  pages: number;
  page: number;
  setPage: (page: number) => void;
}) => {
  return (
    <div className="flex flex-1 flex-grow justify-start max-lg:justify-center">
      <div className="flex flex-wrap gap-2 text-sm text-black/60 dark:text-white/70">
        <button
          onClick={() => {
            if (page > 1) {
              setPage(page - 1);
            }
          }}
          className={`text-sm text-black/70 dark:text-white/70 whitespace-nowrap cursor-default flex items-center ${
            page === 1 ? 'opacity-50' : ''
          }`}
        >
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
          Prev
        </button>
        {Array.from({ length: pages }, (_, index) => (
          <button
            key={index}
            onClick={() => setPage(index + 1)}
            className={`text-sm whitespace-nowrap flex h-5 w-5 items-center justify-center ${
              page === index + 1 ? 'text-blue-60 dark:text-blue-600' : ''
            } hover:text-blue-600 dark:hover:text-blue-600`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => {
            if (page < pages) {
              setPage(page + 1);
            }
          }}
          className={`text-sm text-black/70 dark:text-white/70 whitespace-nowrap hover:text-black/50 dark:hover:text-white/50 flex items-center ${
            page === pages ? 'opacity-50' : ''
          }`}
        >
          Next
          <svg
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
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
