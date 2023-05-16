import React from 'react';
import ReactDOM from 'react-dom';
import { Marketplace } from './components/marketplace';

// let updatingDom = false;
console.log('in the scripts');

// Wait for the DOM to be ready
window.addEventListener('load', function () {
  console.log('loaded');
  // console.log('updating dom ?=> ', updatingDom);
  if (window.location.origin === 'https://chat.openai.com') {
    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      const dialog = document.querySelectorAll('[role="dialog"]');
      const ourButton = document.querySelector('#unverified');
      // console.log('updating dom ?=> ', updatingDom);
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
  // updatingDom = true;
  let div = parent;

  let outer = div.parentNode;
  console.log('outer');
  console.log(outer);
  let marketplace = outer.children[1];
  // marketplace.style.backgroundColor = 'orange';

  let paginationAnd = outer.children[2];
  // paginationAnd.style.backgroundColor = 'pink';
  // console.log(paginationAnd);

  const originalMarketplace = null;

  console.log('Updating Dom');

  const button = document.createElement('button');

  button.classList.add(
    'btn',
    'relative',
    'btn-neutral',
    'focus:ring-0',
    'text-black/50'
  );
  button.textContent = 'Unverified Plugins ✨';
  button.style.border = '2px solid purple';

  button.id = 'unverified';

  button.onclick = function () {
    //modify other buttons to look the same
    let buttons = div.querySelectorAll('button');

    for (const button of buttons) {
      //add onclick handlers that will "un-remove the marketplace"
      // console.log(button);
      if (button.textContent.includes('Unverified Plugins ✨')) {
        //leave this button alone
      } else {
        // button.style.hidden = true;
        button.classList.remove('btn-light', 'hover:bg-gray-200');
        button.classList.add('btn-neutral', 'text-black/50'); //make the previous button neutral
      }
    }

    //replace
    let container = document.createElement('div');

    ReactDOM.render(
      React.createElement(
        Marketplace,
        null,
        // { //TODO: maybe add pagination?
        //   sentences: sentenceArray,
        //   inputHTML: element,
        //   shouldTranslate,
        // },
        null
      ),
      container
    );

    marketplace.replaceWith(container);
  };

  div.appendChild(button);

  //TODO: need to make it so when you leave and come back it gets fired again.

  //TODO: replace this div with something else when we select the button

  return null;
}
