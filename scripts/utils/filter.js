import { getMedia, displayData } from '../templates/media.js'

function sortMedia(media, option) {
    switch (option) {
        case 'popularite':
            media.sort((a, b) => b.likes - a.likes); // Tri par popularité (nombre de likes)
            break;
        case 'date':
            media.sort((a, b) => new Date(b.date) - new Date(a.date)); // Tri par date
            break;
        case 'titre':
            media.sort((a, b) => a.title.localeCompare(b.title)); // Tri par titre
            break;
        default:
            break;
    }
}

// Fonction pour mettre à jour l'affichage des médias après le tri
async function updateMediaDisplay(photographerId, option) {
    const media = await getMedia(photographerId);
    sortMedia(media, option);

    // Effacer l'affichage actuel des médias
    const photographersSection = document.querySelector(".media");
    photographersSection.innerHTML = '';

    // Afficher les médias triés
    displayData(media);
}

// Événement de changement pour la liste déroulante de tri
const triSelect = document.getElementById('tri');
triSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    updateMediaDisplay(photographerId, selectedOption);
});