let url = "http://universities.hipolabs.com/search";
let dropDown = document.querySelector("#dropDown");
let defaultCountry = "Pakistan";

let getUniListForDropDown = async () => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    let addedCountries = new Set();

    for (const uni of data) {
      const country = uni.country?.trim();
      if (country && !addedCountries.has(country)) {
        const option = document.createElement("option");
        option.value = country;
        option.textContent = country;

        if (country === defaultCountry) {
          option.selected = true;
        }

        dropDown.appendChild(option);
        addedCountries.add(country);
      }
    }
  } catch (error) {
    console.log("Filed to Fetch the data", error);
  }
};

getUniListForDropDown();
