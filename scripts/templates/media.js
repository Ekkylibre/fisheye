import { openLightbox } from '/scripts/utils/lightbox.js';

async function getMedia(photographerId) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    // Cherche les médias correspondant à l'ID du photographe fourni
    const media = data.media.filter(
        (media) => media.photographerId == photographerId
    );
    return media;
}

async function displayData(media) {
    const photographersSection = document.querySelector(".media");

    media.forEach((mediaItem) => {
        const mediaElement = document.createElement('div');

        // Affichage de l'image
        if (mediaItem.image) {
            const imageElement = document.createElement('img');
            imageElement.src = `assets/medias/${mediaItem.image}`;
            imageElement.alt = mediaItem.title;
            imageElement.classList.add("photos");
            // Ajout d'un gestionnaire d'événements clic pour ouvrir la lightbox
            imageElement.addEventListener('click', () => openLightbox(`assets/medias/${mediaItem.image}`, mediaItem.title));
            mediaElement.appendChild(imageElement);
        }

        // Affichage de la vidéo
        if (mediaItem.video) {
            const videoElement = document.createElement('video');
            videoElement.controls = true; // Ajout des contrôles de lecture
            videoElement.classList.add('videos'); // Ajout de la classe pour le style CSS
            const sourceElement = document.createElement('source');
            sourceElement.src = `assets/medias/${mediaItem.video}`;
            sourceElement.type = 'video/mp4'; // Spécification du type de fichier vidéo
            videoElement.appendChild(sourceElement);
            mediaElement.appendChild(videoElement);
        }
        

        const mediaDescript = document.createElement('div');
        mediaDescript.classList.add("media-description");

        // Affichage du titre
        const titleElement = document.createElement('h3');
        titleElement.textContent = mediaItem.title;
        mediaDescript.appendChild(titleElement);

        // Création de la div parent pour les likes
        const likesContainer = document.createElement('div');
        likesContainer.classList.add("likesContainer")

        // Affichage des likes
        const likesElement = document.createElement('p');
        likesElement.textContent = `${mediaItem.likes}`;
        likesContainer.appendChild(likesElement);

        // Affiche icon
        const likeIcon = document.createElement('div');
        likeIcon.innerHTML = '<i class="fa fa-heart"></i>'; // Vous devrez ajuster la classe de l'icône en fonction de votre bibliothèque d'icônes
        likeIcon.classList.add("likeIcon")
        
        likesContainer.appendChild(likeIcon);

        mediaDescript.appendChild(likesContainer);

        mediaElement.appendChild(mediaDescript);

        photographersSection.appendChild(mediaElement);
    });
}

async function init() {
    // Récupérer l'ID du photographe à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id'); // Supposons que l'ID soit passé comme paramètre dans l'URL sous le nom 'id'

    const media = await getMedia(photographerId);
    displayData(media);
}

init();
