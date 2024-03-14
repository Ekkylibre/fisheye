export function openLightbox(mediaUrl, title) {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    lightboxWrapper.style.display = "block";

    const lightboxMedia = lightboxWrapper.querySelector('.lightbox_media');
    const lightboxTitle = document.createElement('figcaption');
    const lightboxContent = document.createElement('div');
    lightboxContent.classList.add('lightbox_content');

    let mediaElement;
    if (mediaUrl.endsWith('.mp4')) {
        mediaElement = document.createElement('video');
        mediaElement.src = mediaUrl;
        mediaElement.controls = true;
        mediaElement.classList.add("lightbox-video");
    } else {
        mediaElement = document.createElement('img');
        mediaElement.src = mediaUrl;
        mediaElement.classList.add("lightbox-img");
    }

    lightboxTitle.textContent = title;

    // Nettoyer le contenu précédent de la lightbox
    lightboxMedia.innerHTML = '';
    lightboxContent.appendChild(mediaElement);
    lightboxMedia.appendChild(lightboxContent);
    lightboxMedia.appendChild(lightboxTitle);

    // Ajouter les écouteurs d'événements pour la navigation entre médias
    const prevButton = lightboxWrapper.querySelector('.fa-chevron-left');
    const nextButton = lightboxWrapper.querySelector('.fa-chevron-right');

    prevButton.addEventListener('click', navigateMedia.bind(null, 'prev'));
    nextButton.addEventListener('click', navigateMedia.bind(null, 'next'));
}

export function closeLightbox() {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    lightboxWrapper.style.display = "none";
}

function navigateMedia(direction) {
    const lightboxMedia = document.querySelector('.lightbox_media');
    const currentMedia = lightboxMedia.querySelector('img, video');
    const currentTitle = lightboxMedia.querySelector('figcaption');
    const mediaElements = document.querySelectorAll('.photos, .videos'); // Sélectionne toutes les images et vidéos
    const mediaArray = Array.from(mediaElements); // Convertit NodeList en tableau

    let currentIndex = mediaArray.findIndex((element) => {
        if (element.tagName === 'IMG') {
            return element.src === currentMedia.src;
        } else if (element.tagName === 'VIDEO') {
            return element.src === currentMedia.src || element.currentSrc === currentMedia.src; // Vérifiez également la source actuelle pour les vidéos
        }
        return false; // Retourne false pour les éléments non pris en charge
    });

    // Déterminer l'index du média suivant ou précédent en fonction de la direction
    if (direction === 'prev') {
        currentIndex = (currentIndex === 0) ? mediaArray.length - 1 : currentIndex - 1;
    } else if (direction === 'next') {
        currentIndex = (currentIndex === mediaArray.length - 1) ? 0 : currentIndex + 1;
    }

    // Récupérer l'URL et le titre du média suivant ou précédent
    const nextMedia = mediaArray[currentIndex];
    console.log(nextMedia)
    let nextTitle = '';
    let mediaElement;

    // Créer la balise appropriée pour le média suivant
    if (nextMedia.tagName === 'IMG') {
        mediaElement = document.createElement('img');
        mediaElement.classList.add('lightbox-media')
        mediaElement.src = nextMedia.src;
        nextTitle = nextMedia.alt; // Utilisez alt pour les images
    } else if (nextMedia.tagName === 'VIDEO') {
        mediaElement = document.createElement('video');
        mediaElement.classList.add('lightbox-media')
        mediaElement.controls = true;
        mediaElement.src = nextMedia.src || nextMedia.currentSrc; // Utilisez la source actuelle si disponible
        
        // Récupérer le nom du fichier de la source de la vidéo
        const videoSrc = nextMedia.src || nextMedia.currentSrc;
        const videoFilename = videoSrc.split('/').pop(); // Récupérer le nom du fichier

        // Enlever l'extension du fichier (assumant que l'extension est .mp4)
        const videoTitle = videoFilename.slice(0, -4); // Enlever les 4 derniers caractères (l'extension .mp4)

        // Remplacer les underscores (_) par des espaces dans le titre
        nextTitle = videoTitle.replace(/_/g, ' ');
    }

    // Créer un nouvel élément figcaption pour afficher le titre du média suivant
    const newTitle = document.createElement('figcaption');
    newTitle.textContent = nextTitle;

    // Mettre à jour le média et le titre dans la lightbox
    lightboxMedia.innerHTML = ''; // Supprimer le contenu précédent
    lightboxMedia.appendChild(mediaElement);
    lightboxMedia.appendChild(newTitle); // Ajouter le nouveau titre à la lightbox
}

document.querySelector('.fa-x').addEventListener('click', closeLightbox);

document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowLeft') { // Flèche gauche
        navigateMedia('prev');
    } else if (key === 'ArrowRight') { // Flèche droite
        navigateMedia('next');
    }
});
