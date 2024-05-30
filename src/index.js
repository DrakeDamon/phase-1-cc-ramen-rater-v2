document.addEventListener('DOMContentLoaded', main);

let currentRamen = null;

function main() {
  fetchRamens();
  addSubmitListener();
  addEditListener();
}

function fetchRamens() {
  fetch('http://localhost:3000/ramens')
    .then(response => response.json())
    .then(ramens => {
      console.log('Fetched ramens:', ramens); // Debugging: Check fetched data
      ramens.forEach(ramen => addRamenToMenu(ramen));
      if (ramens.length > 0) {
        console.log('Displaying first ramen:', ramens[0]); // Debugging: Check first ramen
        displayRamenDetails(ramens[0]);
      }
    })
    .catch(error => console.error('Error fetching ramens:', error));
}

function addRamenToMenu(ramen) {
  const ramenMenu = document.getElementById('ramen-menu');
  const img = document.createElement('img');
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener('click', () => displayRamenDetails(ramen));
  
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.addEventListener('click', () => {
    img.remove();
    deleteButton.remove();
    clearRamenDetails();
  });

  const container = document.createElement('div');
  container.appendChild(img);
  container.appendChild(deleteButton);

  ramenMenu.appendChild(container);
}

function displayRamenDetails(ramen) {
  console.log('Displaying ramen details:', ramen); // Debugging: Check ramen details
  document.querySelector('.detail-image').src = ramen.image;
  document.querySelector('.name').textContent = ramen.name;
  document.querySelector('.restaurant').textContent = ramen.restaurant;
  document.getElementById('rating-display').textContent = ramen.rating;
  document.getElementById('comment-display').textContent = ramen.comment;

  // Store the current ramen in a variable
  currentRamen = ramen;
}

function clearRamenDetails() {
  document.querySelector('.detail-image').src = './assets/image-placeholder.jpg';
  document.querySelector('.name').textContent = 'Insert Name Here';
  document.querySelector('.restaurant').textContent = 'Insert Restaurant Here';
  document.getElementById('rating-display').textContent = 'Insert rating here';
  document.getElementById('comment-display').textContent = 'Insert comment here';
}

function addSubmitListener() {
  const form = document.getElementById('new-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const newRamen = {
      name: document.getElementById('new-name').value,
      restaurant: document.getElementById('new-restaurant').value,
      image: document.getElementById('new-image').value,
      rating: document.getElementById('new-rating').value,
      comment: document.getElementById('new-comment').value
    };

    addRamenToMenu(newRamen);
    form.reset();
  });
}

function addEditListener() {
  const form = document.getElementById('edit-ramen');
  form.addEventListener('submit', event => {
    event.preventDefault();

    const rating = document.getElementById('edit-rating').value;
    const comment = document.getElementById('edit-comment').value;

    document.getElementById('rating-display').textContent = rating;
    document.getElementById('comment-display').textContent = comment;

    // Update the current ramen's details
    if (currentRamen) {
      currentRamen.rating = rating;
      currentRamen.comment = comment;
    }
  });
}
