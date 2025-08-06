let url = "http://universities.hipolabs.com/search?country=pakistan";

let getUnilist = async () => {
  try {
    let res = await fetch(url);
    let data = await res.json();
    console.log(data);
  } catch (error) {
    console.log("Error -->", error);
  }
};
