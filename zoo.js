function renderAvailableAnimals() {
  let filters = JSON.parse(localStorage.getItem("filters")) || {};
  let filteredAnimals = getFilteredAnimals(filters);

  const animalCardsContainer = document.getElementById("animal-cards");
  animalCardsContainer.innerHTML = "";

  filteredAnimals.forEach((animal) => {
    const card = createAnimalCard(animal);
    animalCardsContainer.appendChild(card);
  });
}

// Function to set filter in local storage
function setFilter(filterKey, filterValue) {
  let filters = JSON.parse(localStorage.getItem("filters")) || {};
  filters[filterKey] = filterValue;
  localStorage.setItem("filters", JSON.stringify(filters));

  renderAvailableAnimals();
}

// Function to get filtered animals based on filters
function getFilteredAnimals(filters) {
  let animals = JSON.parse(localStorage.getItem("animals")) || [];

  // Apply filters
  if (filters.isPredator !== "all") {
    animals = animals.filter(
      (animal) => animal.isPredator === (filters.isPredator === "true")
    );
  }
  if (filters.habitat && filters.habitat !== "all") {
    animals = animals.filter((animal) => animal.habitat === filters.habitat);
  }
  if (filters.weight) {
    animals = animals.filter(
      (animal) => animal.weight > parseInt(filters.weight)
    );
  }
  if (filters.height) {
    animals = animals.filter(
      (animal) => animal.height > parseInt(filters.height)
    );
  }
  if (filters.color && filters.color !== "all") {
    animals = animals.filter((animal) => animal.color === filters.color);
  }
  if (filters.name) {
    animals = animals.filter((animal) =>
      animal.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  return animals;
}

// Function to visit an animal
function visitAnimal(animalName) {
  localStorage.setItem("selectedAnimal", animalName);
  // Implement the logic to navigate to the animal page
}

// Function to create an animal card
function createAnimalCard(animal) {
  const card = document.createElement("div");
  card.className = "animal-card";

  // Add image element
  const image = document.createElement("img");
  image.src = `images/${animal.name.toLowerCase()}.jpg`;
  image.alt = animal.name;
  card.appendChild(image);

  // Add other details (name, habitat, etc.) to the card
  const details = document.createElement("div");
  details.className = "animal-details";
  details.innerHTML = `
          <h2>${animal.name}</h2>
          <p>Weight: ${animal.weight} kg</p>
          <p>Height: ${animal.height} cm</p>
          <p>Color: ${animal.color}</p>
          <p>Habitat: ${animal.habitat}</p>
          <button onclick="visitAnimal('${animal.name}')">Visit</button>
        `;
  card.appendChild(details);

  return card;
}

// Event listener for initial rendering
document.addEventListener("DOMContentLoaded", function () {
  renderAvailableAnimals();

  // Add event listener for the apply filter button
  document
    .getElementById("apply-filter")
    .addEventListener("click", function () {
      // Update all filters based on input values
      setFilter(
        "isPredator",
        document.getElementById("filter-is-predator").value
      );
      setFilter("habitat", document.getElementById("filter-habitat").value);
      setFilter("weight", document.getElementById("filter-weight").value);
      setFilter("height", document.getElementById("filter-height").value);
      setFilter("color", document.getElementById("filter-color").value);
      setFilter("name", document.getElementById("search-animal").value);
    });
});

function visitAnimal(animalName) {
  // Save the selected animal in local storage
  localStorage.setItem("selectedAnimal", animalName);

  // Redirect to the animal page
  window.location.href = "animal.html";
}

function animalEscaped() {
  alert("The animal escaped! Make sure to bring enough coins next time.");

  // Remove the animal card from the page
  const animalCard = document.getElementById("animal-card");
  if (animalCard) {
    animalCard.remove();
  }

  window.location.href = "zoo.html";
}
function renderAvailableAnimals() {
  let filters = JSON.parse(localStorage.getItem("filters")) || {};
  let filteredAnimals = getFilteredAnimals(filters);

  const animalCardsContainer = document.getElementById("animal-cards");
  animalCardsContainer.innerHTML = "";

  filteredAnimals.forEach((animal) => {
    const card = createAnimalCard(animal);
    animalCardsContainer.appendChild(card);
  });
}

// Function to set filter in local storage
function setFilter(filterKey, filterValue) {
  let filters = JSON.parse(localStorage.getItem("filters")) || {};
  filters[filterKey] = filterValue;
  localStorage.setItem("filters", JSON.stringify(filters));

  renderAvailableAnimals();
}

// Function to get filtered animals based on filters
function getFilteredAnimals(filters) {
  let animals = JSON.parse(localStorage.getItem("animals")) || [];

  // Apply filters
  if (filters.isPredator !== "all") {
    animals = animals.filter(
      (animal) => animal.isPredator === (filters.isPredator === "true")
    );
  }
  if (filters.habitat && filters.habitat !== "all") {
    animals = animals.filter((animal) => animal.habitat === filters.habitat);
  }
  if (filters.weight) {
    animals = animals.filter(
      (animal) => animal.weight > parseInt(filters.weight)
    );
  }
  if (filters.height) {
    animals = animals.filter(
      (animal) => animal.height > parseInt(filters.height)
    );
  }
  if (filters.color && filters.color !== "all") {
    animals = animals.filter((animal) => animal.color === filters.color);
  }
  if (filters.name) {
    animals = animals.filter((animal) =>
      animal.name.toLowerCase().includes(filters.name.toLowerCase())
    );
  }

  return animals;
}

// Function to visit an animal
function visitAnimal(animalName) {
  localStorage.setItem("selectedAnimal", animalName);
  // Implement the logic to navigate to the animal page
}

// Function to create an animal card
function createAnimalCard(animal) {
  const card = document.createElement("div");
  card.className = "animal-card";

  // Add image element
  const image = document.createElement("img");
  image.src = `images/${animal.name.toLowerCase()}.jpg`;
  image.alt = animal.name;
  card.appendChild(image);

  // Add other details (name, habitat, etc.) to the card
  const details = document.createElement("div");
  details.className = "animal-details";
  details.innerHTML = `
          <h2>${animal.name}</h2>
          <p>Weight: ${animal.weight} kg</p>
          <p>Height: ${animal.height} cm</p>
          <p>Color: ${animal.color}</p>
          <p>Habitat: ${animal.habitat}</p>
          <button onclick="visitAnimal('${animal.name}')">Visit</button>
        `;
  card.appendChild(details);

  return card;
}

// Event listener for initial rendering
document.addEventListener("DOMContentLoaded", function () {
  renderAvailableAnimals();

  // Add event listener for the apply filter button
  document
    .getElementById("apply-filter")
    .addEventListener("click", function () {
      // Update all filters based on input values
      setFilter(
        "isPredator",
        document.getElementById("filter-is-predator").value
      );
      setFilter("habitat", document.getElementById("filter-habitat").value);
      setFilter("weight", document.getElementById("filter-weight").value);
      setFilter("height", document.getElementById("filter-height").value);
      setFilter("color", document.getElementById("filter-color").value);
      setFilter("name", document.getElementById("search-animal").value);
    });
});

function visitAnimal(animalName) {
  // Save the selected animal in local storage
  localStorage.setItem("selectedAnimal", animalName);

  // Redirect to the animal page
  window.location.href = "animal.html";
}

function animalEscaped() {
  alert("The animal escaped! Make sure to bring enough coins next time.");

  // Remove the animal card from the page
  const animalCard = document.getElementById("animal-card");
  if (animalCard) {
    animalCard.remove();
  }

  window.location.href = "zoo.html";
}
