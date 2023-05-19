import React, { useEffect, useState } from 'react';
import Card from './card';
import Pagination from './pagination';

export const Marketplace = ({ count, pages, listings }: any) => {
  const [page, setPage] = useState(1);
  const offset = (page - 1) * 8;

  useEffect(() => {
    console.log('Page updated', page);
  }, [page]);

  return (
    <div>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:grid-rows-2 lg:grid-cols-3 xl:grid-cols-4">
        {listings.slice(offset, offset + 8).map((item: any, index: number) => {
          return (
            <Card
              key={index}
              imageUrl={item.items.avatar_url}
              title={item.items.name}
              description={item.items.description}
              url={item.items.url}
            />
          );
        })}
      </div>
      {/* Pagination */}
      <Pagination count={count} pages={pages} page={page} setPage={setPage} />
    </div>
  );
};
