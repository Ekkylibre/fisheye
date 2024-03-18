import { openLightbox } from '/scripts/utils/lightbox.js';
import { updateLikes, updateTotalLikes } from '../utils/likes.js'; // Importer les fonctions de gestion des likes depuis le nouveau fichier

export async function getMedia(photographerId) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();

    // Chercher les médias correspondant à l'ID du photographe fourni
    const media = data.media.filter(
        (media) => media.photographerId == photographerId
    );
    return media;
}

export async function displayData(media) {
    const photographersSection = document.querySelector(".media");
    let totalLikes = 0; // Initialiser le total des likes

    media.forEach((mediaItem) => {
        // Création de la balise <a> pour chaque média
        const mediaElement = document.createElement('a');
        mediaElement.setAttribute('href','#');
        mediaElement.setAttribute('aria-label', `View ${mediaItem.title} in the lightbox`);

        // Ajouter la classe pour le style CSS
        mediaElement.classList.add('media-link');

        // Ajouter un gestionnaire d'événements clic pour ouvrir la lightbox
        mediaElement.addEventListener('click', (event) => {
            event.preventDefault(); // Empêcher le comportement par défaut du lien
            openLightbox(`assets/medias/${mediaItem.image || mediaItem.video}`, mediaItem.title);
        });

        // Affichage de l'image ou de la vidéo dans le lien
        if (mediaItem.image) {
            const imageElement = document.createElement('img');
            imageElement.src = `assets/medias/${mediaItem.image}`;
            imageElement.alt = mediaItem.title;
            imageElement.classList.add("photos");
            mediaElement.appendChild(imageElement);
        } else if (mediaItem.video) {
            const videoElement = document.createElement('video');
            videoElement.classList.add('videos'); // Ajout de la classe pour le style CSS
            videoElement.setAttribute('aria-label', `View ${mediaItem.title} in the lightbox`);
            const sourceElement = document.createElement('source');
            sourceElement.src = `assets/medias/${mediaItem.video}`;
            sourceElement.type = 'video/mp4'; // Spécification du type de fichier vidéo
            videoElement.appendChild(sourceElement);
            mediaElement.appendChild(videoElement);
        }

        // Création de la balise <figcaption> pour chaque média
        const mediaDescript = document.createElement('div');
        mediaDescript.classList.add("media-description");

        // Affichage du titre
        const titleElement = document.createElement('h3');
        titleElement.textContent = mediaItem.title;
        mediaDescript.appendChild(titleElement);

        // Création de la div parente pour les likes
        const likesContainer = document.createElement('div');
        likesContainer.classList.add("likesContainer");

        // Affichage des likes
        const likesElement = document.createElement('p');
        likesElement.textContent = `${mediaItem.likes}`;
        likesContainer.appendChild(likesElement);

        // Affichage de l'icône
        const likeIcon = document.createElement('button');
        likeIcon.innerHTML = '<i class="fa fa-heart"></i>'; // Vous devrez ajuster la classe de l'icône en fonction de votre bibliothèque d'icônes
        likeIcon.classList.add("likeIcon");
        likeIcon.setAttribute("aria-label", "like");
        likeIcon.setAttribute("type","button");
        likesContainer.appendChild(likeIcon);

        mediaDescript.appendChild(likesContainer);

        // Création de la div parente pour chaque média
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add("media-container");

        // Ajout de la balise <a> à la div parente
        mediaContainer.appendChild(mediaElement);

        // Ajout de la balise <figcaption> à la div parente
        mediaContainer.appendChild(mediaDescript);

        // Ajout de la div parente à la section des photographes
        photographersSection.appendChild(mediaContainer);

        // Ajouter les likes de chaque média au total
        totalLikes += mediaItem.likes;

        // Gestionnaire d'événements clic pour le bouton de like
        likeIcon.addEventListener('click', () => {
            updateLikes(mediaItem, likeIcon, likesElement, media);
        });
    });

    updateTotalLikes(media);
}

async function init() {
    // Récupérer l'ID du photographe à partir de l'URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id'); // Supposons que l'ID soit passé comme paramètre dans l'URL sous le nom 'id'

    const media = await getMedia(photographerId);
    displayData(media);
}

init();
