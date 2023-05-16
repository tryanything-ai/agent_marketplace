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
            console.log('On PluginPage');
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
  console.log('Update Dom Here');
  // const dialog = document.querySelector('div[role="dialog"]');
  // dialog.classList.add('bg-pink-200');
  // dialog.classList.add('dark:bg-gray-50');
  // dialog.style.boer = '#ffb6c1';
  // dialog.style.border = '2px solid purple';
  // dialog.style.backgroundImage =
  //   'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)';

  // const secondDiv = dialog.querySelectorAll('div')[2];
  // div.style.backgroundColor = 'orange';

  const button = document.createElement('button');
  button.id = 'custom';
  button.classList.add(
    'btn',
    'relative',
    'btn-neutral',
    'focus:ring-0',
    'text-black/50'
  );
  button.textContent = 'Unverified Plugins ✨';
  button.style.border = '2px solid purple';
  // button.style.backgroundColor = 'pink';
  button.id = 'unverified';

  button.onclick = function () {
    // Code to be executed when the button is clicked
    // alert('Button clicked!');
    let outer = div.parentNode;
    let marketplace = outer.querySelector('div:nth-child(2)');
    marketplace.style.backgroundColor = 'orange';

    //replace
    let container = document.createElement('div');

    ReactDOM.render(
      React.createElement(
        Marketplace,
        null,
        // {
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
