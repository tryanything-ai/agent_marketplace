export const makeMarketplace = () => {
  const domain = 'https://chat.openai.com/?model=gpt-4-plugins';

  //TODO detect if we are on the right page

  // let location = window.location;
  // console.log('location', location);
  let href = window.location.href;
  console.log('href', href);
  // let hostname = window.location.hostname;
  // console.log('hostname', hostname);

  if (href === domain) {
    console.log('We are on the right page');
    // Create the button element
    const button = document.createElement('button');

    // Add the necessary classes to the button element
    button.classList.add(
      'btn',
      'relative',
      'btn-light',
      'focus:ring-0',
      'hover:bg-gray-200'
    );

    // Create the inner div element
    const innerDiv = document.createElement('div');

    // Add the necessary classes to the inner div element
    innerDiv.classList.add(
      'flex',
      'w-full',
      'gap-2',
      'items-center',
      'justify-center'
    );

    // Set the text content of the inner div element
    innerDiv.textContent = 'Unverified';

    // Append the inner div element to the button element
    button.appendChild(innerDiv);

    // Find the specified selector
    const selector = document.querySelector(
      '#radix-\\:r2i\\: > div.p-4.sm\\:p-6.sm\\:pt-4 > div > div.flex.gap-3'
    );

    selector.appendChild(button);

    //TODO: do things we need to in this page

    //the button we want to create
    // <button class="btn relative btn-light focus:ring-0 hover:bg-gray-200">
    //   <div class="flex w-full gap-2 items-center justify-center">All plugins</div>
    // </button>
  }
};
