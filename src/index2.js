document.addEventListener("DOMContentLoaded", (event) => {
  function displayRamens() {
    fetch('http://localhost:3000/ramens')
      .then((response) => response.json())
      .then((data) => {
        const menu = document.getElementById('ramen-menu');
        menu.innerHTML = '';

        data.forEach((ramen) => {
          const newElement = document.createElement('img');
          newElement.src = ramen.image;
          menu.appendChild(newElement);

          const ramenDetails = document.getElementById('ramen-detail');
          const info = ramenDetails.querySelector('.name');
          const review = ramenDetails.querySelector('.restaurant');
          const image = ramenDetails.querySelector('.detail-image');
          console.log(info);
          console.log(review);

          newElement.addEventListener('click', function handleClick() {
            info.innerHTML = ramen.name;
            review.innerHTML = ramen.rating;
            image.src = ramen.image;
          });
        });
      })
      .catch(error => console.error('Error fetching data:', error));
  }

  // Move the submit event listener outside of the displayRamens function
  const submit = document.getElementById('new-ramen');
  submit.addEventListener('submit', function addSubmitListener(event) {
    event.preventDefault(); // Prevent the default form submission

    const name = document.getElementById('new-name').value;
    const restaurant = document.getElementById('new-restaurant').value;
    const img = document.getElementById('new-image').value;
    const rating = document.getElementById('new-rating').value;
    const comment = document.getElementById('new-comment').value;

    const newRamen = document.createElement('img');
    newRamen.src = img;
    newRamen.alt = `Image of ${name}`;

    newRamen.addEventListener('click', function handleClick() {
      const ramenDetails = document.getElementById('ramen-detail');
      const info = ramenDetails.querySelector('.name');
      const review = ramenDetails.querySelector('.restaurant');
      const image = ramenDetails.querySelector('.detail-image');
      
      info.innerHTML = name;
      review.innerHTML = rating;
      image.src = img;
    });

    const menu = document.getElementById('ramen-menu');
    menu.appendChild(newRamen);
  });

  displayRamens();
});
