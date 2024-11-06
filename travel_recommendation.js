const clearButton = document.getElementById("clear-button");
const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("searchInput");
const resultsContainer = document.getElementById("results");

function clearSearch() {
  searchInput.value = "";
  document.getElementById("results").innerHTML = ""; // Clears previous search results
  resultsContainer.style.display = "none";
}

function search() {
  const searchValue = searchInput.value.toLowerCase(); // Convert search input to lowercase
  let count = 0;

  // Load JSON data
  fetch("travel_recommendation_api.json")
    .then((response) => response.json())
    .then((data) => {
      let results = [];

      // Search in countries
      if (
        searchValue.includes("country") ||
        searchValue.includes("countries")
      ) {
        data.countries.forEach((country) => {
          // Add country if it matches

          //   results.push(country);

          // Search within cities of the country
          country.cities.forEach((city) => {
            if (count < 3) {
              results.push(city);
            }
            count += 1;
          });
        });
      }

      // Search in temples
      if (searchValue.includes("temple") || searchValue.includes("temples")) {
        data.temples.forEach((temple) => {
          results.push(temple);
        });
      }

      // Search in beaches
      if (searchValue.includes("beach") || searchValue.includes("beaches")) {
        data.beaches.forEach((beach) => {
          results.push(beach);
        });
      }

      // Display search results
      displayResults(results);
    })
    .catch((error) => console.error("Error during fetch:", error));
}

function displayResults(results) {
  resultsContainer.innerHTML = ""; // Clear previous results
  resultsContainer.style.display = "none";

  if (results.length === 0) {
    resultsContainer.style.display = "flex";
    resultsContainer.innerHTML = "<p>No results found.</p>";
    return;
  }
  resultsContainer.style.display = "flex";

  results.forEach((result) => {
    const resultItem = document.createElement("div");
    resultItem.classList.add("result-item");

    // Display different properties based on whether the result is a city, temple, or beach
    resultItem.innerHTML = `
      <h3>${result.name}</h3>
      <img src="${result.imageUrl}" alt="${result.name}" />
      <p>${result.description}</p>
    `;

    resultsContainer.appendChild(resultItem);
  });
}

clearButton.addEventListener("click", clearSearch);
searchButton.addEventListener("click", search);
