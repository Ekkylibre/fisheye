import { photographerTemplate } from "../templates/photographer.js";

// Asynchronous function to retrieve photographer data from JSON file
async function getPhotographers() {
    try {
        const response = await fetch('../../data/photographers.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching data:', error);
    }
}

// Asynchronous function to display photographer data in the user interface
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerTemplate(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
}

async function init() {
    const { photographers } = await getPhotographers();
    displayData(photographers);
}

init();
