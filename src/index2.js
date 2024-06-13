document.addEventListener("DOMContentLoaded", (event) => {
  let currentRamenImage = null; // Variable to hold the reference to the currently displayed ramen

  function displayRamens() {
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(data => {
        const menu = document.getElementById('ramen-menu');
        menu.innerHTML = '';

        data.forEach((ramen) => {
          const newElement = document.createElement('img');
          newElement.src = ramen.image;
          menu.appendChild(newElement);

          const detailImage = document.querySelector('.detail-image');
          const name = document.querySelector('.name');
          const restaurant = document.querySelector('.restaurant');
          const info = document.getElementById('comment-display');
          const rating = document.getElementById('rating-display');

          newElement.addEventListener('click', function handleClick() {
            detailImage.src = ramen.image;
            name.textContent = ramen.name;
            restaurant.textContent = ramen.restaurant;
            info.textContent = ramen.comment;
            rating.textContent = ramen.rating;

            currentRamenImage = newElement; // Store the reference to the clicked image
          });
        });

        // Display the details of the first ramen
        if (data.length > 0) {
          const firstRamen = data[0];
          const detailImage = document.querySelector('.detail-image');
          const name = document.querySelector('.name');
          const restaurant = document.querySelector('.restaurant');
          const info = document.getElementById('comment-display');
          const rating = document.getElementById('rating-display');

          detailImage.src = firstRamen.image;
          name.textContent = firstRamen.name;
          restaurant.textContent = firstRamen.restaurant;
          info.textContent = firstRamen.comment;
          rating.textContent = firstRamen.rating;

          currentRamenImage = document.querySelector(`#ramen-menu img[src="${firstRamen.image}"]`); // Store the reference to the first ramen image
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  }

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

  function deleteRamen() {
    const deleteBtn = document.getElementById('delete-button');
    deleteBtn.addEventListener("click", (event) => {
      if (currentRamenImage) {
        currentRamenImage.remove(); // Remove the ramen from the menu

        // Clear the details section
        const detailImage = document.querySelector('.detail-image');
        const name = document.querySelector('.name');
        const restaurant = document.querySelector('.restaurant');
        const info = document.getElementById('comment-display');
        const rating = document.getElementById('rating-display');

        detailImage.src = './assets/image-placeholder.jpg';
        name.textContent = 'Insert Name Here';
        restaurant.textContent = 'Insert Restaurant Here';
        info.textContent = 'Insert comment here';
        rating.textContent = 'Insert rating here';

        currentRamenImage = null; // Clear the reference
      }
    });
  }

  function main() {
    displayRamens();
    addSubmitListener();
    deleteRamen();
  }

  main();
});
