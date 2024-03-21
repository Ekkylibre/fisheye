import { openLightbox } from '/scripts/utils/lightbox.js';
import { updateLikes, updateTotalLikes } from '../utils/likes.js';

// Function to fetch media data based on photographer ID
export async function getMedia(photographerId) {
    const response = await fetch("data/photographers.json");
    const data = await response.json();
    const media = data.media.filter(
        (media) => media.photographerId == photographerId
    );
    return media;
}

// Function to display media data on the webpage
export async function displayData(media) {
    const photographersSection = document.querySelector(".media");

    media.forEach((mediaItem) => {
        // Creating <a> tag for each media
        const mediaElement = document.createElement('a');
        mediaElement.setAttribute('href','#');
        mediaElement.setAttribute('aria-label', `View ${mediaItem.title} in the lightbox`);
        mediaElement.classList.add('media-link');

        // Adding click event handler to open the lightbox
        mediaElement.addEventListener('click', (event) => {
            event.preventDefault();
            openLightbox(`assets/medias/${mediaItem.image || mediaItem.video}`, mediaItem.title);
        });
        
        // Displaying image or video within the link
        if (mediaItem.image) {
            const imageElement = document.createElement('img');
            imageElement.src = `assets/medias/${mediaItem.image}`;
            imageElement.alt = mediaItem.title;
            imageElement.classList.add("photos");
            mediaElement.appendChild(imageElement);
        } else if (mediaItem.video) {
            const videoElement = document.createElement('video');
            videoElement.classList.add('videos');
            videoElement.setAttribute('aria-label', `View ${mediaItem.title} in the lightbox`);
            const sourceElement = document.createElement('source');
            sourceElement.src = `assets/medias/${mediaItem.video}`;
            sourceElement.type = 'video/mp4';
            videoElement.appendChild(sourceElement);
            mediaElement.appendChild(videoElement);
        }

        // Creating <figcaption> tag for each media
        const mediaDescript = document.createElement('div');
        mediaDescript.classList.add("media-description");

        // Displaying the title
        const titleElement = document.createElement('h3');
        titleElement.textContent = mediaItem.title;
        mediaDescript.appendChild(titleElement);

        // Creating parent div for likes
        const likesContainer = document.createElement('div');
        likesContainer.classList.add("likesContainer");

        // Displaying likes count
        const likesElement = document.createElement('p');
        likesElement.textContent = `${mediaItem.likes}`;
        likesContainer.appendChild(likesElement);

        // Displaying like icon
        const likeIcon = document.createElement('button');
        likeIcon.innerHTML = '<em class="fa fa-heart"></em>';
        likeIcon.classList.add("likeIcon");
        likeIcon.setAttribute("aria-label", "like");
        likeIcon.setAttribute("type","button");
        likesContainer.appendChild(likeIcon);

        mediaDescript.appendChild(likesContainer);

        // Creating parent div for each media
        const mediaContainer = document.createElement('div');
        mediaContainer.classList.add("media-container");

        mediaContainer.appendChild(mediaElement);
        mediaContainer.appendChild(mediaDescript);
        photographersSection.appendChild(mediaContainer);

        // Click event handler for like button
        likeIcon.addEventListener('click', () => {
            updateLikes(mediaItem, likeIcon, likesElement, media);
        });
    });

    updateTotalLikes(media);
}

async function init() {
    // Retrieving photographer ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const photographerId = urlParams.get('id');
    const media = await getMedia(photographerId);
    displayData(media);
}

init();