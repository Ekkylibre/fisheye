import { photographerTemplate } from "../templates/photographer.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

// Asynchronous function to fetch photographer data from JSON file
async function getPhotographer(id) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const photographer = data.photographers.find(
        (photographer) => photographer.id == id
    );
    return photographer;
}

// Asynchronous function to display photographer information in the header
async function displayDataPhotographer(photographer) {
    const photographText = document.querySelector(".photograph-text");
    const photographImg = document.querySelector(".photographer-img");

    const photographerModel = photographerTemplate(photographer);
    
    const photographerDom = photographerModel.getUserCardDOM();
    
    const img = photographerDom.querySelector('img');
    img.classList.add("photographer-img")

    const h2 = photographerDom.querySelector('h2');
    const locationWrapper = photographerDom.querySelector('.location');
    const tagline = photographerDom.querySelector('.tagline');
    const formName = document.querySelector(".photographer-name");
    formName.innerText = photographerModel.name;
    const photographerPriceElement = document.querySelector('.photographer-price');
    photographerPriceElement.textContent = photographerModel.price + " € / jour";
    
    photographText.appendChild(h2);
    photographText.appendChild(locationWrapper);
    photographText.appendChild(tagline);
    
    photographImg.appendChild(img);
}

async function init() {
    const photographer = await getPhotographer(id);
    displayDataPhotographer(photographer);
}

init();
