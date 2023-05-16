import React, { useState, useEffect } from 'react';
import Card from './card';
import { Session } from '@supabase/supabase-js';
import { supabase } from '../../../../utils/supabase';

import Auth from './auth';

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

export const Marketplace = () => {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  if (!session) {
    // return
    //TODO:
    return (
      <Auth />
      // <AuthForm />
      // <div className="p-4 sm:p-6 sm:pt-4">
      //   <div className="mt-4 flex flex-col gap-4">
      //     <div>Anyything Unverified Plugins Store</div>
      //     <div className="rounded-md border border-gray-300 px-3 py-2 shadow-sm focus-within:border-indigo-600 focus-within:ring-1 focus-within:ring-indigo-600 dark:bg-gray-700">
      //       <label className="block text-xs font-medium text-gray-900 dark:text-gray-100"></label>
      //       <div className="relative">
      //         <input
      //           name="url"
      //           id="url"
      //           className="block w-full border-0 p-0 text-gray-900 placeholder-gray-500 outline-none focus:ring-0 dark:bg-gray-700 dark:text-gray-100 sm:text-sm"
      //           placeholder="openai.com"
      //           value=""
      //         />
      //       </div>
      //     </div>
      //   </div>
      //   <div className="flex flex-col gap-3 sm:flex-row-reverse mt-5 sm:mt-4">
      //     <button className="btn relative btn-primary">
      //       <div className="flex w-full gap-2 items-center justify-center">
      //         Find plugin
      //       </div>
      //     </button>
      //     <button className="btn relative btn-neutral">
      //       <div className="flex w-full gap-2 items-center justify-center">
      //         Cancel
      //       </div>
      //     </button>
      //   </div>
      // </div>
    );
  } else {
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
  }
};
