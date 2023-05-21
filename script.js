// Background color for Body
let body = document.getElementById('body');
body.style.backgroundColor = '#17202A';


// Div for center aligning
let container = document.createElement('div');
container.style.textAlign = 'center';
container.style.marginTop = '50px';


// create h1 tag for display the purpose
let name = document.createElement('h1');
name.innerHTML = 'Find the Nationality based on the Name';
name.style.color = '#ECF0F1';


// Create input tag for getting input from the user
let search = document.createElement('input');
search.setAttribute('type', 'text');
search.setAttribute('placeholder', 'Enter the name');
search.style.width = '30%';
search.style.height = '40px';
search.style.borderRadius = '4px';
search.style.marginTop = '30px';


// Create search button for the search
let btn = document.createElement('button');
btn.innerHTML = 'Search';
btn.setAttribute('type', 'button');
btn.classList.add('btn', 'btn-primary');
btn.style.marginLeft = '20px';
btn.style.marginBottom = '5px';
btn.addEventListener('click', output);


// List Items for displaying the names
let listDiv = document.createElement('div');
listDiv.style.width = '100vw';
listDiv.style.height = '30vh';
listDiv.style.display = 'flex';
listDiv.style.justifyContent = 'center';
listDiv.style.alignItems = 'center';


let list = document.createElement('ol');
list.style.color = '#ECF0F1';
list.style.width = '200px';
list.style.textAlign = 'center';
list.style.fontSize = '25px';
list.style.marginRight = '20px';


let items1 = document.createElement('li');
items1.setAttribute('class', 'list');
items1.innerHTML = 'michael';
let items2 = document.createElement('li');
items2.setAttribute('class', 'list');
items2.innerHTML = 'matthew';
let items3 = document.createElement('li');
items3.setAttribute('class', 'list');
items3.innerHTML = 'jane';

search.addEventListener('input', filterList);


// Function for filter 
function filterList() {
    let filter = search.value;
    let listItems = document.querySelectorAll('.list')
    listItems.forEach((item) => {
        let text = item.textContent;
        if (text.includes(filter)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
}
list.append(items1, items2, items3);
listDiv.append(list);



// Main Function
async function output() {
    let value = search.value;
    let url = `https://api.nationalize.io/?name[]=michael&name[]=matthew&name[]=jane`;
    let request = await fetch(url);
    let res = await request.json();
    for (let i = 0; i < res.length; i++) {
        if (res[i].name == value) {
            let personName = document.createElement('h5');
            personName.innerHTML = `Name  :  ${res[i].name}`;
            personName.style.color = '#ECF0F1';
            personName.style.marginTop = '15px';


            let division = document.createElement('div');
            division.style.width = '100vw';
            division.style.height = '300xpx';
            division.style.display = 'flex';
            division.style.alignItems = 'center';
            division.style.justifyContent = 'center';
            division.style.marginTop = '20px';
            let div1 = document.createElement('div');
            div1.style.width = '30vw';
            div1.style.textAlign = 'center';
            let div2 = document.createElement('div');
            div2.style.width = '30vw';
            div2.style.textAlign = 'center';


            let countryName = document.createElement('h5');
            countryName.innerHTML = 'Country';
            countryName.style.color = '#ECF0F1'
            let probName = document.createElement('h5');
            probName.innerHTML = 'Probability';
            probName.style.color = '#ECF0F1';


            let firstCountry = document.createElement('h5');
            firstCountry.innerHTML = ` 1 . ${res[i].country[0].country_id}`;
            firstCountry.style.color = '#ECF0F1';
            let secondCountry = document.createElement('h5');
            secondCountry.innerHTML = ` 2 . ${res[i].country[1].country_id}`;
            secondCountry.style.color = '#ECF0F1';
            let prob1 = document.createElement('h5');
            prob1.innerHTML = `${res[i].country[0].probability}`;
            prob1.style.color = '#ECF0F1';
            let prob2 = document.createElement('h5');
            prob2.innerHTML = `${res[i].country[1].probability}`;
            prob2.style.color = '#ECF0F1';



            div1.append(countryName, firstCountry, secondCountry);
            div2.append(probName, prob1, prob2);
            division.append(div1, div2);
            listDiv.innerHTML = '';
            listDiv.style.height = '0vh';
            container.append(personName, division);
        }
    }
}
container.append(name, search, btn, listDiv);
document.body.append(container);