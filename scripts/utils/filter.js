import { getMedia, displayData } from '../templates/media.js'

// Function to sort media based on selected option
function sortMedia(media, option) {
    switch (option) {
        case 'popularite':
            media.sort((a, b) => b.likes - a.likes); // Sort by popularity (number of likes)
            break;
        case 'date':
            media.sort((a, b) => new Date(b.date) - new Date(a.date)); // Sort by date
            break;
        case 'titre':
            media.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
            break;
        default:
            break;
    }
}

// Function to update media display after sorting
async function updateMediaDisplay(photographerId, option) {
    const media = await getMedia(photographerId);
    sortMedia(media, option);

    const photographersSection = document.querySelector(".media");
    photographersSection.innerHTML = '';

    displayData(media);
}

// Event listener for change event on sort dropdown
const triSelect = document.getElementById('tri');
triSelect.addEventListener('change', (event) => {
    const selectedOption = event.target.value;
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');

    updateMediaDisplay(photographerId, selectedOption);
});
