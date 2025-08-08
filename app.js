let universityData = [];

async function countryList() {
  try {
    const res = await fetch("http://universities.hipolabs.com/search");
    const data = await res.json();
    universityData = data;

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
    searchUniversityByName("karachi");
  } catch (error) {
    console.log("Failed to fetch data:", error);
  }
}

countryList();

function searchUniversityByName(keyword) {
  if (!universityData.length) return;

  const result = universityData.filter((uni) =>
    uni.name.toLowerCase().includes(keyword.toLowerCase())
  );

  console.log(result);
}
