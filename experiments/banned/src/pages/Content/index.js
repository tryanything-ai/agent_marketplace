import React from 'react';
import ReactDOM from 'react-dom';
import { Marketplace } from './components/marketplace';

// Wait for the DOM to be ready
window.addEventListener('load', function () {
  console.log('loaded');

  if (window.location.origin === 'https://chat.openai.com') {
    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      const dialog = document.querySelectorAll('[role="dialog"]');
      const ourButton = document.querySelector('#unverified');

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

  // const originalMarketplace = marketplace.cloneNode(true);
  // const originalButtons = div.cloneNode(true);

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
  button.classList.add('closed');

  //replace
  let container = document.createElement('div');
  container.id = 'marketplace-container';

  button.onclick = function () {
    if (button.classList.contains('closed')) {
      //modify other buttons to look the same
      let buttons = div.querySelectorAll('button');

      for (const button of buttons) {
        //add onclick handlers that will "un-remove the marketplace"

        if (button.textContent.includes('Unverified Plugins ✨')) {
          //leave this button alone
        } else {
          button.style.display = 'none';
        }
      }

      //change button to say "go-back"
      button.textContent = 'Go Back';
      button.classList.remove('closed');
      button.classList.add('open');

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

      // marketplace.replaceWith(container);
      // marketplace.appendChild(container);
      outer.insertBefore(container, paginationAnd);
      marketplace.style.display = 'none';
    } else {
      //we are open so we need to close
      // container.replaceWith(originalMarketplace);
      marketplace.style.display = 'grid';
      let buttons = div.querySelectorAll('button');
      container.remove();

      for (const button of buttons) {
        //add onclick handlers that will "un-remove the marketplace"

        if (button.textContent.includes('Go Back')) {
          //leave this button alone
          button.textContent = 'Unverified Plugins ✨';
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
