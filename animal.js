document.addEventListener("DOMContentLoaded", function () {
  renderAnimal();
  renderRelatedAnimals();

  document.getElementById("feed-animal").addEventListener("click", function () {
    feedAnimal();
  });

  document.getElementById("back-to-zoo").addEventListener("click", function () {
    window.location.href = "zoo.html";
  });
});

function renderAnimal() {
  const selectedAnimal = localStorage.getItem("selectedAnimal");
  const currentVisitor =
    JSON.parse(localStorage.getItem("currentVisitor")) || {};
  let visitorCoins = currentVisitor.coins || 0;

  // Fetch animal details from the server or local storage
  const animalDetails = getAnimalDetails(selectedAnimal);

  document.getElementById(
    "image"
  ).innerHTML = `<img src="images/${selectedAnimal.toLowerCase()}.jpg" alt="${selectedAnimal}" />`;
  document.getElementById("name").innerText = `Name: ${selectedAnimal}`;
  document.getElementById("weight").innerText = `Weight: ${
    animalDetails.weight || ""
  } kg`;
  document.getElementById("height").innerText = `Height: ${
    animalDetails.height || ""
  } cm`;
  document.getElementById("color").innerText = `Color: ${
    animalDetails.color || ""
  }`;
  document.getElementById("habitat").innerText = `Habitat: ${
    animalDetails.habitat || ""
  }`;
  document.getElementById("isPredator").innerText = `Is Predator: ${
    animalDetails.isPredator ? "Yes" : "No"
  }`;
}

function renderRelatedAnimals() {
  const selectedAnimal = localStorage.getItem("selectedAnimal");

  // Fetch animal details from the server or local storage
  const animalDetails = getAnimalDetails(selectedAnimal);

  // Get related animals based on habitat
  const relatedAnimals = animals.filter(
    (animal) =>
      animal.habitat === animalDetails.habitat && animal.name !== selectedAnimal
  );

  const relatedAnimalsContainer = document.getElementById("related-animals");
  relatedAnimalsContainer.innerHTML =
    "<section><h1>Related Animals <h1><section>";

  relatedAnimals.forEach((animal) => {
    const card = createAnimalCard(animal);
    relatedAnimalsContainer.appendChild(card);
  });
}

function createAnimalCard(animal) {
  const card = document.createElement("div");
  card.className = "related-animal-card";

  card.innerHTML = `
    <div class="animal-image">
      <img src="images/${animal.name.toLowerCase()}.jpg" alt="${animal.name}" />
    </div>
    <div class="animal-details">
      <h3>${animal.name}</h3>
      <p>Weight: ${animal.weight} kg</p>
      <p>Height: ${animal.height} cm</p>
      <p>Color: ${animal.color}</p>
      <p>Habitat: ${animal.habitat}</p>
      <p>Is Predator: ${animal.isPredator ? "Yes" : "No"}</p>
    </div>
  `;

  card.addEventListener("click", function () {
    localStorage.setItem("selectedAnimal", animal.name);
    // Redirect to the animal.html page
    window.location.href = "animal.html";
  });

  return card;
}

// Fetch animal details based on the selectedAnimal
function getAnimalDetails(selectedAnimal) {
  const animalDetails = animals.find(
    (animal) => animal.name === selectedAnimal
  );
  return animalDetails || {}; // Return empty object if animal is not found
}
