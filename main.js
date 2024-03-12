let visitors = [
  {
    name: "John Smith",
    coins: 50,
  },
  {
    name: "Emily Johnson",
    coins: 50,
  },
  {
    name: "Michael Williams",
    coins: 50,
  },
  {
    name: "Jessica Brown",
    coins: 50,
  },
  {
    name: "Christopher Jones",
    coins: 50,
  },
  {
    name: "Ashley Davis",
    coins: 50,
  },
  {
    name: "Matthew Miller",
    coins: 50,
  },
  {
    name: "Amanda Wilson",
    coins: 50,
  },
  {
    name: "David Moore",
    coins: 50,
  },
  {
    name: "Sarah Taylor",
    coins: 50,
  },
  {
    name: "James Anderson",
    coins: 50,
  },
  {
    name: "Jennifer Thomas",
    coins: 50,
  },
  {
    name: "Robert Jackson",
    coins: 50,
  },
  {
    name: "Elizabeth White",
    coins: 50,
  },
  {
    name: "Daniel Harris",
    coins: 50,
  },
  {
    name: "Melissa Martin",
    coins: 50,
  },
  {
    name: "William Thompson",
    coins: 50,
  },
  {
    name: "Linda Garcia",
    coins: 50,
  },
  {
    name: "Joseph Martinez",
    coins: 50,
  },
  {
    name: "Karen Robinson",
    coins: 50,
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
  },

  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
  },
];
function generateDataset() {
  if (!localStorage.getItem("visitors")) {
    localStorage.setItem("visitors", JSON.stringify([...visitors]));
  }

  if (!localStorage.getItem("animals")) {
    localStorage.setItem("animals", JSON.stringify([...animals]));
  }

  if (!localStorage.getItem("visitedAnimals")) {
    localStorage.setItem("visitedAnimals", JSON.stringify([]));
  }

  if (!localStorage.getItem("fedAnimals")) {
    localStorage.setItem("fedAnimals", JSON.stringify([]));
  }

  console.log(visitors);
}

function generateDashboard() {
  const visitedAnimals =
    JSON.parse(localStorage.getItem("visitedAnimals")) || [];
  const fedAnimals = JSON.parse(localStorage.getItem("fedAnimals")) || [];

  displayVisitedAnimalsTable(visitedAnimals);
  displayFedAnimalsTable(fedAnimals);
  displayFavoriteAnimal(fedAnimals);
}

document.addEventListener("DOMContentLoaded", function () {
  initializePage();
});

function initializePage() {
  updateHeader();
}
document.addEventListener("DOMContentLoaded", function () {
  updateHeader();

  const resetButton = document.getElementById("resetButton");
  if (resetButton) {
    resetButton.addEventListener("click", function () {
      resetLocalStorage();
    });
  }
});

function updateHeader() {
  const visitorNameElement = document.getElementById("visitor-name");
  const visitorCoinsElement = document.getElementById("visitor-coins");

  const visitor = getCurrentVisitor();

  visitorNameElement.textContent = `Hello, ${visitor.name}!`;
  visitorCoinsElement.textContent = `Coins: ${visitor.coins}`;
}

function getCurrentVisitor() {
  return (
    JSON.parse(localStorage.getItem("currentVisitor")) || {
      name: "Guest",
      coins: 0,
    }
  );
}

function resetLocalStorage() {
  localStorage.setItem("visitors", JSON.stringify(visitors));
  localStorage.setItem("animals", JSON.stringify(animals));
  localStorage.removeItem("selectedVisitor");
  localStorage.removeItem("currentVisitor");
  localStorage.removeItem("fedAnimals");
  localStorage.removeItem("visitedAnimals");

  location.reload();
}

function startGame() {
  const selectedVisitor = getCurrentVisitor();
  if (!selectedVisitor || selectedVisitor.name === "Guest") {
    alert("Please choose a visitor before starting the game.");
    return;
  }

  window.location.href = "zoo.html";
}

function feedAnimal() {
  const selectedAnimal = localStorage.getItem("selectedAnimal");
  const currentVisitor =
    JSON.parse(localStorage.getItem("currentVisitor")) || {};
  let visitorCoins = currentVisitor.coins || 0;

  const animalDetails = getAnimalDetails(selectedAnimal);
  if (visitorCoins >= 2) {
    visitorCoins -= 2;
    updateVisitorCoins(visitorCoins); // Update visitor coins
    $("#feedingModal").modal("show");
    const visitedAnimals =
      JSON.parse(localStorage.getItem("visitedAnimals")) || [];
    visitedAnimals.push(selectedAnimal);
    localStorage.setItem("visitedAnimals", JSON.stringify(visitedAnimals));

    const fedAnimals = JSON.parse(localStorage.getItem("fedAnimals")) || [];
    fedAnimals.push(selectedAnimal);
    localStorage.setItem("fedAnimals", JSON.stringify(fedAnimals));

    generateDashboard();
  } else {
    // Handle the case where the visitor doesn't have enough coins
    if (animalDetails.isPredator) {
      // Predator scenario: The animal attacks the visitor
      visitorGotEaten();
    } else {
      // Non-predator scenario: The animal escapes
      animalEscaped();
    }
  }
}

function updateVisitorCoins(coins) {
  const visitor = getCurrentVisitor();
  visitor.coins = coins;
  localStorage.setItem("currentVisitor", JSON.stringify(visitor));
  updateHeader();
}

function visitorGotEaten() {
  alert("Oh no! You were attacked by a predator. Better luck next time!");

  // Remove the current visitor from the array
  const currentVisitor =
    JSON.parse(localStorage.getItem("currentVisitor")) || {};
  let visitors = JSON.parse(localStorage.getItem("visitors")) || [];

  // Find the index of the current visitor in the array
  const visitorIndex = visitors.findIndex(
    (visitor) => visitor.name === currentVisitor.name
  );
  if (visitorIndex !== -1) {
    visitors.splice(visitorIndex, 1);
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  localStorage.removeItem("currentVisitor");
  window.location.href = "login.html";
}

function animalEscaped() {
  alert("The animal escaped! Make sure to bring enough coins next time.");
  const animalCard = document.getElementById("animal-card");
  if (animalCard) {
    animalCard.remove();
  }
  const selectedAnimal = localStorage.getItem("selectedAnimal");
  let animals = JSON.parse(localStorage.getItem("animals")) || [];
  animals = animals.filter((animal) => animal.name !== selectedAnimal);
  localStorage.setItem("animals", JSON.stringify(animals));
  window.location.href = "zoo.html";
}

// ... (previous code)

function loginAsVisitor(visitorName) {
  console.log("Login as visitor:", visitorName); // Add this line
  localStorage.setItem("selectedVisitor", visitorName);

  // Save the current visitor information
  const selectedVisitor = getSelectedVisitor();
  localStorage.setItem("currentVisitor", JSON.stringify(selectedVisitor));

  updateHeader();

  displayVisitors();
}

function goToDashboard() {
  window.location.href = "dashboard.html";
}

function goToTheZoo() {
  window.location.href = "zoo.html";
}

function goTologin() {
  window.location.href = "login.html";
}
function goToSignup() {
  window.location.href = "signup.html";
}
