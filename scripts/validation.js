const heading = document.querySelector('h1');

const makeAlert= (event) => {
  const element = event.target;
  alert(`${element} was clicked`);
}

heading.addEventListener('click', makeAlert);