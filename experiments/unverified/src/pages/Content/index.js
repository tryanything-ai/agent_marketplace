// import { makeMarketplace } from './modules/make_marketetplace';

console.log('Anything Content Script Running');

const fakeData = [
  {
    avatar_url: 'https://i.pravatar.cc/150?img=1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    url: 'https://www.example.com/1',
    title: 'Example Title 1',
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

let updatingDom = false;

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
          // if (div.textContent.includes('Install an unverified plugin')) {
          //   updatingDom = true;
          //   console.log('On PluginPage');
          //   setDom();
          // }
          // if (div.id !== 'custom') {
          //prevent infinite loop as we add stuff.

          if (div.textContent.includes('All plugins')) {
            console.log('On PluginPage');
            setDom(div.parentNode);
          }
          // }
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
  const dialog = document.querySelector('div[role="dialog"]');
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
  button.textContent = 'Unverified Plugins';
  button.style.border = '2px solid purple';
  div.appendChild(button);
  //TODO: need to make it so when you leave and come back it gets fired again.

  let outer = div.parentNode;
  let marketplace = outer.querySelector('div:nth-child(2)');
  marketplace.style.backgroundColor = 'orange';
  //TODO: replace this div with something else when we select the button

  return null;
}
