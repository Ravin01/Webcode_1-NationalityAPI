// Background color for Body
let body = document.getElementById("body");
body.style.backgroundColor = "#17202A";

// Div for center aligning
let container = document.createElement("div");
container.style.textAlign = "center";
container.style.marginTop = "50px";

// create h1 tag for display the purpose
let name = document.createElement("h1");
name.innerHTML = "Find the Nationality based on the Name";
name.style.color = "#ECF0F1";

// Create input tag for getting input from the user
let search = document.createElement("input");
search.setAttribute("type", "text");
search.setAttribute("placeholder", "Enter the full name then search");
search.style.width = "30%";
search.style.height = "40px";
search.style.borderRadius = "4px";
search.style.marginTop = "30px";
search.style.borderRadius = "10px";
search.style.border + "none";

// Create search button for the search
let btn = document.createElement("button");
btn.innerHTML = "Search";
btn.setAttribute("type", "button");
btn.classList.add("btn", "btn-primary");
btn.style.marginLeft = "20px";
btn.style.marginBottom = "5px";
btn.addEventListener("click", output);

// List Items for displaying the names
let listDiv = document.createElement("div");
listDiv.style.width = "100vw";
listDiv.style.height = "30vh";
listDiv.style.display = "flex";
listDiv.style.justifyContent = "center";
listDiv.style.alignItems = "center";

// creating a order list
let list = document.createElement("ol");
list.style.color = "#ECF0F1";
list.style.width = "200px";
list.style.textAlign = "center";
list.style.fontSize = "25px";
list.style.marginRight = "20px";

// fetch api for displaying Name
async function getNames() {
  try {
    let urlNames = await fetch(
      "https://api.nationalize.io/?name[]=michael&name[]=matthew&name[]=jane"
    );
    let responseNames = await urlNames.json();
    let items;
    responseNames.forEach((d) => {
      items = document.createElement("li");
      items.setAttribute("class", "list");
      items.style.padding = "5px 0px";
      items.innerHTML = `${d.name}`;

      search.addEventListener("input", filterList);

      // Function for filter
      function filterList() {
        let filter = search.value.toLowerCase();

        let listItems = document.querySelectorAll(".list");
        listItems.forEach((item) => {
          let text = item.textContent.toLowerCase();
          if (text.includes(filter)) {
            item.style.display = "";
          } else {
            item.style.display = "none";
          }
        });
      }
      list.append(items);
      listDiv.append(list);
    });
  } catch (err) {
    console.log(err);
  }
}


// Call the function for getting names from api
getNames();



// Main Function - to implement the filter function and get country name and probability for respective person 
async function output() {
  try {
    let value = search.value;

    let url = `https://api.nationalize.io`;
    let nationalApi = await fetch(`${url}/?name[]=${value}`);
    let response = await nationalApi.json();

    let personName = document.createElement("h5");
    personName.innerHTML = `Name  :  ${response[0].name}`;
    personName.style.color = "#ECF0F1";
    personName.style.marginTop = "15px";

    let division = document.createElement("div");
    division.style.width = "100vw";
    division.style.height = "300xpx";
    division.style.display = "flex";
    division.style.alignItems = "center";
    division.style.justifyContent = "center";
    division.style.marginTop = "20px";
    let div1 = document.createElement("div");
    div1.style.width = "30vw";
    div1.style.textAlign = "center";
    let div2 = document.createElement("div");
    div2.style.width = "30vw";
    div2.style.textAlign = "center";

    let countryName = document.createElement("h5");
    countryName.innerHTML = "Country";
    countryName.style.color = "#ECF0F1";
    let probName = document.createElement("h5");
    probName.innerHTML = "Probability";
    probName.style.color = "#ECF0F1";

    div1.append(countryName);
    div2.append(probName);

    for (let i = 0; i <= response[0].country.length - 1; i++) {
      let firstCountry = document.createElement("h5");
      firstCountry.innerHTML = ` ${i + 1} . ${
        response[0].country[i].country_id
      }`;
      firstCountry.style.color = "#ECF0F1";

      let prob = document.createElement("h5");
      prob.innerHTML = `${response[0].country[i].probability}`;
      prob.style.color = "#ECF0F1";

      div1.append(firstCountry);
      div2.append(prob);
      division.append(div1, div2);
      listDiv.innerHTML = "";
      listDiv.style.height = "0vh";
      container.append(personName, division);
    }
    search.value = "";
  } catch (err) {
    console.log(err);
  }
}


container.append(name, search, btn, listDiv);
document.body.append(container);
