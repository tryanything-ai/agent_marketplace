import React, { useState } from 'react';
import Card from './card';

const fakeData = [
  {
    avatar_url: 'https://oneword.domains/logo.png',
    description:
      'Check the availability of a domain and compare prices across different registrars.',
    url: '"https://oneword.domains"',
    title: 'One Words Domain',
  },
  {
    avatar_url: 'https://i.pravatar.cc/150?img=2',
    description:
      'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    url: 'https://www.example.com/2',
    title: 'Example Title 2',
  },
  {
    avatar_url: 'https://i.pravatar.cc/150?img=3',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    url: 'https://www.example.com/3',
    title: 'Example Title 3',
  },
  {
    avatar_url: 'https://i.pravatar.cc/150?img=4',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    url: 'https://www.example.com/4',
    title: 'Example Title 4',
  },
  {
    avatar_url: 'https://i.pravatar.cc/150?img=5',
    description:
      'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    url: 'https://www.example.com/5',
    title: 'Example Title 5',
  },
  {
    avatar_url: 'https://i.pravatar.cc/150?img=6',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    url: 'https://www.example.com/6',
    title: 'Example Title 6',
  },
  {
    avatar_url: 'https://i.pravatar.cc/150?img=7',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    url: 'https://www.example.com/7',
    title: 'Example Title 7',
  },
];

// interface Props {
//   sentences: string[];
//   inputHTML: HTMLElement;
//   shouldTranslate: boolean;
// }

// interface OriginalProps {
//   inputHTML: HTMLElement;
// }
// const OriginalHTML = ({ inputHTML }: OriginalProps) => {
//   return <div dangerouslySetInnerHTML={{ __html: inputHTML.innerHTML }} />;
// };

export const Marketplace: React.FC = () => {
  let [seeOriginalHTML, setSeeOriginalHTML] = useState(false);
  let [insideParagraph, setInsidParagraph] = useState(false);

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 xl:grid-cols-4">
      {fakeData.map((item, index) => {
        return (
          <Card
            key={index}
            imageUrl={item.avatar_url}
            title={item.title}
            description={item.description}
            url={item.url}
          />
        );
      })}
    </div>
  );
};
