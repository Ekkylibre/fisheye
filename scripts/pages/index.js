import { photographerTemplate } from "../templates/photographer.js";

async function getPhotographers() {
    try {
        const response = await fetch('../../data/photographers.json');
        const data = await response.json();
        
        // Faire quelque chose avec les données JSON récupérées
        console.log(data); // TODO retirer
        return data;
    } catch (error) {
        console.error('Une erreur s\'est produite lors de la récupération des données :', error);
    }
}

async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();