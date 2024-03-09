export function openLightbox(imageUrl, title) {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    lightboxWrapper.style.display = "block";

    const lightboxMedia = lightboxWrapper.querySelector('.lightbox_media');
    const lightboxTitle = document.createElement('figcaption');
    const lightboxImage = new Image();
    lightboxImage.classList.add("lightbox-img");

    lightboxImage.src = imageUrl;
    lightboxImage.alt = title;
    lightboxTitle.textContent = title;

    // Nettoyer le contenu précédent de la lightbox
    lightboxMedia.innerHTML = '';
    lightboxMedia.appendChild(lightboxImage);
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
    const currentImage = lightboxMedia.querySelector('img');
    const currentTitle = lightboxMedia.querySelector('figcaption');
    const mediaElements = document.querySelectorAll('.photos'); // Sélectionne toutes les images
    const mediaArray = Array.from(mediaElements); // Convertit NodeList en tableau

    let currentIndex = mediaArray.findIndex((element) => element.src === currentImage.src);

    // Déterminer l'index de l'image suivante ou précédente en fonction de la direction
    if (direction === 'prev') {
        currentIndex = (currentIndex === 0) ? mediaArray.length - 1 : currentIndex - 1;
    } else if (direction === 'next') {
        currentIndex = (currentIndex === mediaArray.length - 1) ? 0 : currentIndex + 1;
    }

    // Récupérer l'URL et le titre de l'image suivante ou précédente
    const nextImage = mediaArray[currentIndex];
    const nextTitle = nextImage.alt;

    // Mettre à jour l'image et le titre dans la lightbox
    currentImage.src = nextImage.src;
    currentTitle.textContent = nextTitle;
}


document.querySelector('.fa-x').addEventListener('click', closeLightbox);