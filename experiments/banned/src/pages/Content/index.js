import React from 'react';
import ReactDOM from 'react-dom';
import { Marketplace } from './components/marketplace';

let updatingDom = false;
console.log('in the scripts');

// Wait for the DOM to be ready
window.addEventListener('load', function () {
  console.log('loaded');
  console.log('updating dom ?=> ', updatingDom);
  if (window.location.href === 'https://chat.openai.com/?model=gpt-4-plugins') {
    const dialog = document.querySelectorAll('[role="dialog"]');

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      if (dialog && !updatingDom) {
        //only check if we are not on the plug page.
        for (const div of document.querySelectorAll('button')) {
          if (div.textContent.includes('All plugins')) {
            console.log('On Plugin Page');
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
  updatingDom = true;
  let div = parent;

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
    //modify other buttons
    let buttons = div.querySelectorAll('button');

    for (const button of buttons) {
      console.log(button);
      if (button.textContent.includes('Unverified Plugins ✨')) {
        //leave this button alone
      } else {
        button.classList.remove('btn-light', 'hover:bg-gray-200');
        button.classList.add('btn-neutral', 'text-black/50'); //make the previous button neutral
      }
    }

    //add marketplace when clicked

    let outer = div.parentNode;
    console.log('outer');
    console.log(outer);
    let marketplace = outer.children[1];
    // marketplace.style.backgroundColor = 'orange';

    let paginationAnd = outer.children[2];
    console.log(paginationAnd);
    // paginationAnd.style.backgroundColor = 'pink';
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
