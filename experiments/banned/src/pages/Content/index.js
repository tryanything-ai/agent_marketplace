import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './components/app';
import { supabase } from '../../../utils/supabase';

export let _global_page = 0;
export const setPage = (page) => {
  _global_page = page;
  console.log('page set ==> ', page);
};

// Wait for the DOM to be ready
window.addEventListener('load', function () {
  console.log('loaded');

  if (window.location.origin === 'https://chat.openai.com') {
    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      const dialog = document.querySelectorAll('[role="dialog"]');
      const ourButton = document.querySelector('#unlisted');

      if (dialog && !ourButton) {
        //only check if we are not on the plug page.
        for (const div of document.querySelectorAll('button')) {
          if (div.textContent.includes('All plugins')) {
            console.log('We See "All Plugins" button');
            setDom(div.parentNode);
          }
        }
      }
    };

    // Create an observer instance linked to the callback function
    const observer = new MutationObserver(callback);

    // Start observing the target node for configured mutations
    observer.observe(document.body, { childList: true, subtree: true });
  } else {
    console.log('Not on correct site to add buttons');
  }
});

function setDom(parent) {
  console.log('Setting Marketplace Dom');
  let div = parent;

  let outer = div.parentNode;
  console.log('outer');
  console.log(outer);
  let marketplace = outer.children[1];

  let paginationAnd = outer.children[2];
  let pagination = paginationAnd.children[0];

  let afterPagination = paginationAnd.children[1];

  // pagination.style.backgroundColor = 'pink';

  const button = document.createElement('button');

  button.classList.add(
    'btn',
    'relative',
    'btn-neutral',
    'focus:ring-0',
    'text-black/50'
  );
  button.textContent = 'Unlisted Plugins ✨';
  button.style.border = 'none';
  button.style.outline = 'none';
  button.style.color = 'white';
  button.style.fontSize = '16px';
  button.style.cursor = 'pointer';
  button.style.background = 'linear-gradient(to right, #ec4899, #9333ea)';

  button.id = 'unlisted';
  button.classList.add('closed');

  //replace
  let container = document.createElement('div');
  container.id = 'marketplace-container';
  //replace
  let pagination_container = document.createElement('div');
  pagination_container.id = 'pagination-container';

  button.onclick = async function () {
    if (button.classList.contains('closed')) {
      //modify other buttons to look the same
      let buttons = div.querySelectorAll('button');

      for (const button of buttons) {
        //add onclick handlers that will "un-remove the marketplace
        if (button.textContent.includes('Unlisted Plugins ✨')) {
          //leave this button alone
        } else {
          button.style.display = 'none';
        }
      }

      //change button to say "go-back"
      button.textContent = 'Go Back';
      button.classList.remove('closed');
      button.classList.add('open');

      let count = await fetchCount();
      let listings = await fetchListings();
      let pages = Math.ceil(count / 8); //8 per page
      console.log('Count in index', count);
      console.log('Pages in index', pages);
      console.log('Listings in index', listings);

      ReactDOM.render(
        React.createElement(
          App,
          { count, pages, listings, page: _global_page },
          null
        ),
        container
      );

      outer.insertBefore(container, paginationAnd);
      marketplace.style.display = 'none';

      //Hide Native Pagination
      pagination.style.visibility = 'hidden';
    } else {
      //we are open so we need to close
      //Marketplace
      marketplace.style.display = 'grid';
      container.remove();
      //Pagination
      pagination.style.display = 'block';
      pagination.style.visibility = 'visible';
      pagination_container.remove();

      //Top Buttons
      let buttons = div.querySelectorAll('button');
      for (const button of buttons) {
        if (button.textContent.includes('Go Back')) {
          //leave this button alone
          button.textContent = 'Unlisted Plugins ✨';
          button.classList.remove('open');
          button.classList.add('closed');
        } else {
          button.style.display = 'block';
        }
      }
    }
  };

  div.appendChild(button);
}

const fetchCount = async () => {
  try {
    const { count, error } = await supabase
      .from('item_tags')
      .select('*, items (*)', { count: 'exact', head: true })
      .eq('tag_id', 'unlisted');

    if (error) {
      throw error;
    }

    return count;
  } catch (e) {
    console.log(e);
  }
};

const fetchListings = async () => {
  try {
    const { data, error } = await supabase
      .from('item_tags')
      .select('*, items (*)')
      .eq('tag_id', 'unlisted');

    if (error) {
      throw error;
    }

    return data;
  } catch (e) {
    console.log(e);
  }
};
