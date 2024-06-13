document.addEventListener("DOMContentLoaded", (event) => {
  const displayRamens = function() {
    const menu = document.getElementById('ramen-menu');
    console.log(menu); // Log the menu element to see if it's correctly selected

    menu.innerHTML = '';

    fetch("http://localhost:3000/ramens")
      .then(response => response.json()) // Make sure to call response.json()
      .then((data) => {
        console.log(data); // Log the data received from the API
        data.forEach((ramen) => {
          const newElement = document.createElement('img');
          newElement.src = ramen.image;
          menu.appendChild(newElement);

          const detailImage = document.querySelector('.detail-image');
          const name = document.querySelector('.name');          
          const info = document.getElementById('comment-display');
          const restaurant = document.querySelector('.restaurant');          
          const rating = document.getElementById('rating-display');

          newElement.addEventListener('click', function handleClick() {
            detailImage.src = ramen.image;
            name.textContent = ramen.name;
            restaurant.textContent = ramen.restaurant;
            info.textContent = ramen.comment; // Assuming comment is a string
            rating.textContent = ramen.rating; // Assuming rating is a string or number
          });
        });
      })
      .catch((error) => {
        console.error('Error fetching data:', error); // Log any errors that occur during fetch
      });
  };

  function addSubmitListener() {
    const submit = document.getElementById('new-ramen');
    submit.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the default form submission

      const name = document.getElementById('new-name').value;
      const restaurant = document.getElementById('new-restaurant').value;
      const img = document.getElementById('new-image').value;
      const rating = document.getElementById('new-rating').value;
      const comment = document.getElementById('new-comment').value;

      const newRamen = document.createElement('img');
      newRamen.src = img;
      newRamen.alt = `Image of ${name}`;

      const menu = document.getElementById('ramen-menu');
      menu.appendChild(newRamen);
    });
  }

  function main() {
    displayRamens();
    addSubmitListener();
  }

  // Call the main function to start the program logic
  main();
});