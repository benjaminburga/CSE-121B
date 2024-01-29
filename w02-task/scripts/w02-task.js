/* W02-Task - Profile Home Page */
let fullName = 'Benjamin Burga';
let currentYear = new Date().getFullYear();
let profilePicture = 'images/base-profile.jpeg';

// Step 3 - Element Variables
const nameElement = document.getElementById('name');
const foodElement = document.getElementById('food');
const yearElement = document.querySelector('#year');

const imageElement = document.querySelector('img[alt="Placeholder Image"]');

// Step 4 - Adding Content
nameElement.innerHTML = `<strong>${fullName}</strong>`;
yearElement.textContent = currentYear;
imageElement.setAttribute('src', profilePicture);
imageElement.setAttribute('alt', `Profile image of ${fullName}`);

// Step 5 - Array
const favoriteFoods = ['Pizza', 'Sushi', 'Chocolate'];
const newFavoriteFood = 'Ice Cream';

favoriteFoods.push(newFavoriteFood);
foodElement.textContent = favoriteFoods.join(', ');

favoriteFoods.shift();
foodElement.textContent += `\n${favoriteFoods.join(', ')}`;

favoriteFoods.pop();
foodElement.textContent += `\n${favoriteFoods.join(', ')}`;