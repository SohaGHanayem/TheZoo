document.addEventListener("DOMContentLoaded", function () {
  generateDashboard();
});

function generateDashboard() {
  const visitedAnimals =
    JSON.parse(localStorage.getItem("visitedAnimals")) || [];
  const fedAnimals = JSON.parse(localStorage.getItem("fedAnimals")) || [];

  displayVisitedAnimalsTable(visitedAnimals);
  displayFedAnimalsTable(fedAnimals);
  displayFavoriteAnimal(fedAnimals);
}

function displayVisitedAnimalsTable(visitedAnimals) {
  const visitedAnimalsTable = document.getElementById("visitedAnimalsTable");
  visitedAnimalsTable.innerHTML = "<h2>Visited Animals</h2>";

  if (visitedAnimals.length === 0) {
    visitedAnimalsTable.innerHTML += "<p>No animals visited yet.</p>";
    return;
  }

  visitedAnimalsTable.innerHTML += "<table border='1'>";

  visitedAnimals.forEach((animal) => {
    visitedAnimalsTable.innerHTML += `<tr><img class="animal-image" src="images/${animal}.jpg"/><td><div class="animalCard">${animal}</div></td></td></tr>`;
  }); /*images/${animal.name.toLowerCase()}.jpg*/

  visitedAnimalsTable.innerHTML += "</table>";
}

function displayFedAnimalsTable(fedAnimals) {
  const fedAnimalsTable = document.getElementById("fedAnimalsTable");
  fedAnimalsTable.innerHTML = "<h2>Fed Animals</h2>";

  if (fedAnimals.length === 0) {
    fedAnimalsTable.innerHTML += "<p>No animals fed yet.</p>";
    return;
  }

  fedAnimalsTable.innerHTML += "<table border='1'>";

  const fedAnimalCounts = getAnimalCounts(fedAnimals);

  for (const [animal, count] of Object.entries(fedAnimalCounts)) {
    fedAnimalsTable.innerHTML += `<tr><img class="animal-image" src="images/${animal}.jpg"/><div class="animalCard"><td>${animal}</td></div></tr>`;
  }

  fedAnimalsTable.innerHTML += "</table>";
}

function displayFavoriteAnimal(fedAnimals) {
  const favoriteAnimalContainer = document.getElementById("favoriteAnimal");
  favoriteAnimalContainer.innerHTML = "<h2>Favorite Animal</h2>";

  if (fedAnimals.length === 0) {
    favoriteAnimalContainer.innerHTML += "<p>No animals fed yet.</p>";
    return;
  }

  const fedAnimalCounts = getAnimalCounts(fedAnimals);
  const favoriteAnimal = getFavoriteAnimal(fedAnimalCounts);

  if (favoriteAnimal) {
    favoriteAnimalContainer.innerHTML += `<div><img class="fav-animal-image" src="images/${favoriteAnimal}.jpg"/><p>${favoriteAnimal} is the favorite animal with ${fedAnimalCounts[favoriteAnimal]} feeds.</p></div>`;
  } else {
    favoriteAnimalContainer.innerHTML += "<p>No favorite animal found.</p>";
  }
}

function getAnimalCounts(fedAnimals) {
  const fedAnimalCounts = {};

  fedAnimals.forEach((animal) => {
    fedAnimalCounts[animal] = (fedAnimalCounts[animal] || 0) + 1;
  });

  return fedAnimalCounts;
}

function getFavoriteAnimal(fedAnimalCounts) {
  let maxCount = 0;
  let favoriteAnimal = "";

  for (const [animal, count] of Object.entries(fedAnimalCounts)) {
    if (count >= maxCount) {
      maxCount = count;
      favoriteAnimal = animal;
    }
  }

  return favoriteAnimal;
}
console.log(favoriteAnimal);
