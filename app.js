let universityData = [];

// Function to fetch universities for a given country
async function countryList(country) {
  try {
    const res = await fetch(
      `http://universities.hipolabs.com/search?country=${encodeURIComponent(
        country
      )}`
    );
    const data = await res.json();
    universityData = data;

    populateCountryState(data);
    renderUniCards();
  } catch (error) {
    console.error("Failed to fetch data:", error);
    showEmptyMessage("Unable to fetch data. Please try again.");
  }
}

// Populate dropdown without duplicates
function populateCountryState(data) {
  const addedCountries = new Set();
  const badges = document.querySelector(".badges");
  console.log(data);

  badges.innerHTML = "";

  for (const uni of data) {
    const stateProvince = uni?.["state-province"];
    if (stateProvince && !addedCountries.has(stateProvince)) {
      const stateBadge = document.createElement("span");
      stateBadge.textContent = stateProvince;
      stateBadge.setAttribute("class", "badge");
      badges.appendChild(stateBadge);
      addedCountries.add(stateProvince);
    }
  }
}

// Handle search input
const searchIcon = document.querySelector(".icon");
const userInput = document.querySelector("#userInput");

// Function to handle search
function handleSearch() {
  const value = userInput.value.trim();
  if (value) {
    countryList(value);
  } else {
    showEmptyMessage("Please enter a country name.");
  }
}

//  Click on search icon
searchIcon.addEventListener("click", handleSearch);

//  Press Enter in input field
userInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    handleSearch();
  }
});

// Render university cards
const resultCard = document.querySelector("#results");
const resultNum = document.querySelector("#result-count");
const emptyDiv = document.querySelector(".empty");

function renderUniCards() {
  if (!universityData.length) {
    showEmptyMessage("No universities found for the selected country.");
    return;
  }

  emptyDiv.style.display = "none";
  resultCard.innerHTML = "";
  resultNum.textContent = `Showing ${universityData.length} results`;

  const fragment = document.createDocumentFragment();

  for (const uni of universityData) {
    const article = document.createElement("article");
    article.className = "uni-card";

    const title = document.createElement("h3");
    title.className = "uni-name";
    title.textContent = uni?.name || "Unnamed University";
    article.appendChild(title);

    const metaRow = document.createElement("div");
    metaRow.className = "meta-row";

    const badgeCountry = document.createElement("span");
    badgeCountry.className = "badge";
    badgeCountry.textContent = `${uni?.country}, ${uni?.alpha_two_code}`;

    const badgeState = document.createElement("span");
    badgeState.className = "badge";
    badgeState.textContent = uni?.["state-province"] || "—";

    metaRow.append(badgeCountry, badgeState);
    article.appendChild(metaRow);

    const linksDiv = document.createElement("div");
    linksDiv.className = "links";

    if (uni?.web_pages?.[0]) {
      const link = document.createElement("a");
      link.href = uni.web_pages[0];
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = uni.web_pages[0].replace(/^https?:\/\/|\/$/g, "");
      linksDiv.appendChild(link);
    }

    article.appendChild(linksDiv);
    fragment.appendChild(article);
  }

  resultCard.appendChild(fragment);
}

// Show message when no results or errors
function showEmptyMessage(message) {
  resultCard.innerHTML = "";
  resultNum.textContent = "";
  emptyDiv.style.display = "block";
  emptyDiv.textContent = message;
}
