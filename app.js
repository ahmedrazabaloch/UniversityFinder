let url = "http://universities.hipolabs.com/search";
let dropDown = document.querySelector("#dropDown");

let getUnilist = async () => {
  try {
    let res = await fetch(url);
    let resData = await res.json();

    let addedCountries = new Set();

    for (let data of resData) {
      if (!addedCountries.has(data.country)) {
        let option = document.createElement("option");
        option.innerText = data.country;
        option.value = data.country;
        dropDown.appendChild(option);
        addedCountries.add(data.country);
      }
    }
  } catch (error) {
    console.log("Error -->", error);
  }
};

// getUnilist();
