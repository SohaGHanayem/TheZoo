document.addEventListener("DOMContentLoaded", function () {
  updateHeader();
  displayVisitors();
  generateDataset();
});

function updateHeader() {
  // Implement header update logic if needed
}

function generateDataset() {
  // Implement dataset generation logic if needed
}

function displayVisitors(filteredVisitors) {
  const visitorDisplay = document.getElementById("visitorDisplay");
  const selectedVisitorMessage = document.getElementById(
    "selectedVisitorMessage"
  );

  visitorDisplay.innerHTML = "";
  selectedVisitorMessage.innerHTML = "";

  const selectedVisitor = getSelectedVisitor();
  if (selectedVisitor) {
    selectedVisitorMessage.innerHTML = `You are logged in as ${selectedVisitor.name}. <button onclick="logout()">Logout</button>`;
  }

  const displayFormat = "cards";
  switch (displayFormat) {
    case "table":
      visitorDisplay.innerHTML = createTableHTML(filteredVisitors || visitors);
      break;
    case "cards":
      visitorDisplay.innerHTML = createCardHTML(
        filteredVisitors || getVisitorsFromStorage()
      );
      break;
    default:
      console.error("Invalid display format");
  }
}

function createCardHTML(visitors) {
  let cardHTML = "";
  visitors.forEach((visitor) => {
    cardHTML += `<div class="card"><h3>${visitor.name}</h3><p>Coins: ${visitor.coins}</p><button onclick="loginAsVisitor('${visitor.name}')">Login</button></div>`;
  });
  return cardHTML;
}

function getVisitorsFromStorage() {
  return JSON.parse(localStorage.getItem("visitors")) || [];
}

function loginAsVisitor(visitorName) {
  localStorage.setItem("selectedVisitor", visitorName);
  updateHeader();
  displayVisitors();
}

function logout() {
  localStorage.removeItem("selectedVisitor");
  localStorage.removeItem("currentVisitor");
  updateHeader();
  displayVisitors();
}

function getSelectedVisitor() {
  const selectedVisitorName = localStorage.getItem("selectedVisitor");
  return getVisitorsFromStorage().find(
    (visitor) => visitor.name === selectedVisitorName
  );
}

function filterVisitors() {
  const searchInput = document.getElementById("searchVisitor");
  const searchTerm = searchInput.value.toLowerCase();

  const filteredVisitors = getVisitorsFromStorage().filter((visitor) =>
    visitor.name.toLowerCase().includes(searchTerm)
  );
  displayVisitors(filteredVisitors);
}
