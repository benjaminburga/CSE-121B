/* LESSON 3 - Programming Tasks */

/* Profile Object  */
let myProfile = {
    name: "Benjamin Burga",
    photo: "images/base-profile.jpeg",
    favoriteFoods: [
        "ceviche",
        "rice with chicken",
        "roasted chicken",
        "shawarma"
    ],
    hobbies: [
        "play soccer",
        "read books",
        "watch movies"
    ],
    placesLived: [
        { place: "Lima, Peru", 
        length: "10 years" },
        
        { place: "Quito, Ecuador", 
        length: "5 years" }
    ]
};

/* Add an item to placesLived array outside the object definition */
myProfile.placesLived.push(
    {
        place: 'Bogota, Colombia',
        length: '1 year'
    }
);

/* DOM Manipulation - Output */

/* Name */
document.querySelector('#name').textContent = myProfile.name;

/* Photo with attributes */
let photoElement = document.getElementById('photo');
photoElement.src = myProfile.photo;
photoElement.alt = myProfile.name;

/* Favorite Foods List */
let favoriteFoodsList = document.querySelector('#favorite-foods');
myProfile.favoriteFoods.forEach(food => {
    let li = document.createElement('li');
    li.textContent = food;
    favoriteFoodsList.appendChild(li);
});

/* Hobbies List */
let hobbiesList = document.querySelector('#hobbies');
myProfile.hobbies.forEach(hobby => {
    let li = document.createElement('li');
    li.textContent = hobby;
    hobbiesList.appendChild(li);
});

/* Places Lived DataList */
let placesLivedDl = document.querySelector('#places-lived');
myProfile.placesLived.forEach(place => {
    let dt = document.createElement('dt');
    dt.textContent = place.place;

    let dd = document.createElement('dd');
    dd.textContent = place.length;

    placesLivedDl.appendChild(dt);
    placesLivedDl.appendChild(dd);
});
