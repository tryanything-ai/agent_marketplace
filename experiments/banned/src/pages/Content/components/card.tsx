import React, { useState } from 'react';
import posthog from 'posthog-js';

interface CardProps {
  imageUrl: string;
  title: string;
  description: string;
  url: string;
  id: string;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  title,
  description,
  url,
  id,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyUrl = () => {
    posthog.capture('copy_extension_url', { url, id, title });
    let link = new URL(url.replace(/["']/g, ''));
    // console.log(link.hostname);
    navigator.clipboard.writeText(link.hostname);
    setCopied(true);
  };

  return (
    <div className="flex flex-col gap-4 rounded border border-black/10 bg-white p-6 dark:border-white/20 dark:bg-gray-900">
      <div className="flex gap-4">
        <div className="h-[70px] w-[70px] shrink-0">
          <div className="relative w-full h-full">
            <img
              src={imageUrl}
              alt="Logo"
              className="h-full w-full bg-white rounded-[5px]"
            />
            <div className="absolute inset-0 ring-1 ring-inset ring-black/10 rounded-[5px]"></div>
          </div>
        </div>
        <div className="flex min-w-0 flex-col items-start justify-between">
          <div className="max-w-full truncate text-lg leading-5">{title}</div>
          <button className="btn relative btn-primary">
            <div
              onClick={copyUrl}
              className="flex w-full gap-2 items-center justify-center"
            >
              {copied ? 'Copied!' : 'Install'}
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
                <polyline points="8 17 12 21 16 17"></polyline>
                <line x1="12" y1="12" x2="12" y2="21"></line>
                <path d="M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
      <div className="h-[60px] text-sm text-black/70 line-clamp-3 dark:text-white/70">
        {description}
      </div>
    </div>
  );
};

export default Card;
