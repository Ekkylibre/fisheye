import { photographerTemplate } from "../templates/photographer.js";

const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

async function getPhotographer(id) {
    const response = await fetch("data/photographers.json");
    //La variable data contiendra les données JSON extraites de la réponse.
    const data = await response.json();
    // Cherche le photographe correspondant à l'ID fourni
    const photographer = data.photographers.find(
        (photographer) => photographer.id == id
    );
    return photographer;
}

//Fonction asynchrone pour afficher les informations du photographe dans le header
async function displayDataPhotographer(photographer) {
    const photographHeader = document.querySelector(".photograph-header");
    
    // Utilise un template pour créer la représentation DOM du photographe
    const photographerModel = photographerTemplate(photographer);
    
    const photographerDom = photographerModel.getUserCardDOM();
    
    const img = photographerDom.querySelector('img');
    img.classList.add("photographer-img")
    const h2 = photographerDom.querySelector('h2');
    const locationWrapper = photographerDom.querySelector('.location');
    const Tagline = photographerDom.querySelector('.tagline');

    const formName = document.querySelector(".photographer-name");
    formName.innerText = photographerModel.name;
    
    const photographerPriceElement = document.querySelector('.photographer-price');
    photographerPriceElement.textContent = photographerModel.price + " € / jour";
    
    // Créer une nouvelle div pour englober h2, location et tagline
    const detailsWrapper = document.createElement('div');
    detailsWrapper.classList.add('details-wrapper');
    
    // Ajouter les éléments sélectionnés à la nouvelle div
    detailsWrapper.appendChild(h2);
    detailsWrapper.appendChild(locationWrapper);
    detailsWrapper.appendChild(Tagline);
    
    // Ajouter les éléments sélectionnés au DOM
    photographHeader.appendChild(img); // Ajoute l'image directement à photographHeader
    photographHeader.appendChild(detailsWrapper);
}

async function init() {
    // Récupère les datas du photographe
    const photographer = await getPhotographer(id);
    displayDataPhotographer(photographer);
}

init();