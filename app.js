let universityData = [];

async function countryList() {
  try {
    const res = await fetch(
      "http://universities.hipolabs.com/search?country=pakistan"
    );
    const data = await res.json();
    universityData = data;

    console.log("Data-->", data);

    const addedCountries = new Set();

    for (const uni of data) {
      const country = uni.country?.trim();
      if (country && !addedCountries.has(country)) {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;
        if (country === "Pakistan") option.selected = true;
        dropDown.appendChild(option);
        addedCountries.add(country);
      }
    }
    uniCard();
  } catch (error) {
    console.log("Failed to fetch data:", error);
  }
}

countryList();

let resultCard = document.querySelector("#results");
let resultNum = document.querySelector("#result-count");

let uniCard = () => {
  resultCard.innerHTML = "";
  resultNum.innerHTML= `Showing ${universityData?.length} results`
  for (const data of universityData) {
    resultCard.innerHTML += `
      <article class="uni-card">
        <h3 class="uni-name">${data?.name}</h3>
        <div class="meta-row">
          <span class="badge">${data?.country}, ${data?.alpha_two_code}</span>
          <span class="badge"> ${data?.["state-province"] || "—"}</span>
        </div>
        <div class="links">
          <a
            href="${data?.web_pages[0]}"
            target="_blank"
            rel="noopener noreferrer"
          >
            ${data?.web_pages[0].replace(/^https?:\/\//, "")}
          </a>
        </div>
      </article>
    `;
  }
};
