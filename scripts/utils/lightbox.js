// Function to open the lightbox with given media and title
export function openLightbox(mediaUrl, title) {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    lightboxWrapper.style.display = "block";

    // Adding this line to set focus on the close button
    const closeButton = lightboxWrapper.querySelector('#btn-close-lightbox');
    closeButton.focus();

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
        mediaElement.setAttribute('aria-label', title);
    } else {
        mediaElement = document.createElement('img');
        mediaElement.src = mediaUrl;
        mediaElement.classList.add("lightbox-img");
        mediaElement.alt = title;
        mediaElement.setAttribute('aria-label', title);
    }
    
    lightboxTitle.textContent = title;

    // Clearing previous content of the lightbox
    lightboxMedia.innerHTML = '';
    lightboxContent.appendChild(mediaElement);
    lightboxMedia.appendChild(lightboxContent);
    lightboxMedia.appendChild(lightboxTitle);

    // Adding event listeners for navigating between media
    const prevButton = lightboxWrapper.querySelector('[aria-label="previous media"]');
    const nextButton = lightboxWrapper.querySelector('[aria-label="next media"]');

    prevButton.addEventListener('click', () => navigateMedia('prev'));
    nextButton.addEventListener('click', () => navigateMedia('next'));
    
    // Adding event handler for closing the lightbox
    closeButton.addEventListener('click', closeLightbox);
}

// Function to close the lightbox
export function closeLightbox() {
    const lightboxWrapper = document.querySelector('.lightbox_wrapper');
    lightboxWrapper.style.display = "none";
}

// Function to navigate between media in the lightbox
function navigateMedia(direction) {
    const lightboxMedia = document.querySelector('.lightbox_media');
    const currentMedia = lightboxMedia.querySelector('img, video');
    const mediaElements = document.querySelectorAll('.photos, .videos');
    const mediaArray = Array.from(mediaElements);

    let currentIndex = mediaArray.findIndex((element) => {
        if (element.tagName === 'IMG') {
            return element.src === currentMedia.src;
        } else if (element.tagName === 'VIDEO') {
            return element.src === currentMedia.src || element.currentSrc === currentMedia.src;
        }
        return false;
    });

    // Determine the index of the next or previous media based on direction
    if (direction === 'prev') {
        currentIndex = (currentIndex === 0) ? mediaArray.length - 1 : currentIndex - 1;
    } else if (direction === 'next') {
        currentIndex = (currentIndex === mediaArray.length - 1) ? 0 : currentIndex + 1;
    }

    // Get the URL and title of the next or previous media
    const nextMedia = mediaArray[currentIndex];
    let nextTitle = '';
    let mediaElement;

    // Create appropriate tag for the next media
    if (nextMedia.tagName === 'IMG') {
        mediaElement = document.createElement('img');
        mediaElement.classList.add('lightbox-media')
        mediaElement.src = nextMedia.src;
        nextTitle = nextMedia.alt;
    } else if (nextMedia.tagName === 'VIDEO') {
        mediaElement = document.createElement('video');
        mediaElement.classList.add('lightbox-media')
        mediaElement.controls = true;
        mediaElement.src = nextMedia.src || nextMedia.currentSrc;
    
        const videoSrc = nextMedia.src || nextMedia.currentSrc;
        const videoFilename = videoSrc.split('/').pop()

        // Remove file extension (assuming extension is .mp4)
        const videoTitle = videoFilename.slice(0, -4);

        // Replace underscores (_) with spaces in the title
        nextTitle = videoTitle.replace(/_/g, ' ');
    }

    // Create a new figcaption element to display the title of the next media
    const newTitle = document.createElement('figcaption');
    newTitle.textContent = nextTitle;

    // Update the media and title in the lightbox
    lightboxMedia.innerHTML = '';
    lightboxMedia.appendChild(mediaElement);
    lightboxMedia.appendChild(newTitle);
}

// Event handler for the "Escape" key
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'Escape') { // Escape key
        closeLightbox();
    }
});

// Event handler for left/right arrow keys for navigation
document.addEventListener('keydown', (event) => {
    const key = event.key;
    if (key === 'ArrowLeft') { // Left arrow
        navigateMedia('prev');
    } else if (key === 'ArrowRight') { // Right arrow
        navigateMedia('next');
    }
});