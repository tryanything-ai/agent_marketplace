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

let onPluginPage = false;

// Wait for the DOM to be ready
window.addEventListener('load', function () {
  console.log('loaded');
  if (window.location.href === 'https://chat.openai.com/?model=gpt-4-plugins') {
    const dialog = document.querySelectorAll('[role="dialog"]');

    // Callback function to execute when mutations are observed
    const callback = function (mutationsList, observer) {
      if (dialog) {
        //only check if we are not on the plug page.
        for (const div of document.querySelectorAll('button')) {
          if (div.textContent.includes('Install an unverified plugin')) {
            onPluginPage = true;
            console.log('On PluginPage');
            setDom();
          }
        }
      } else {
        //TODO: figure out how to mark we are not on page maybe
        console.log('NOT on plugin page');
        onPluginPage = false;
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

function setDom() {
  console.log('Update Dom Here');
  const dialog = document.querySelector('div[role="dialog"]');
  // dialog.classList.add('bg-pink-200');
  // dialog.classList.add('dark:bg-gray-50');
  // dialog.style.boer = '#ffb6c1';
  dialog.style.border = '2px solid purple';
  dialog.style.backgroundImage =
    'linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)';
  return null;
}
