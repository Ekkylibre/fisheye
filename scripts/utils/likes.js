// Function to update the likes of an individual media item
export function updateLikes(mediaItem, likeIcon, likesElement, media) {
    const alreadyLiked = likeIcon.classList.contains('liked');

    if (alreadyLiked) {
        mediaItem.likes--;
        likeIcon.classList.remove('liked');
    } else {
        mediaItem.likes++;
        likeIcon.classList.add('liked');
    }

    likesElement.textContent = `${mediaItem.likes}`;

    updateTotalLikes(media);
}

// Function to update the total number of likes
export function updateTotalLikes(media) {
    let totalLikes = 0;

    media.forEach(mediaItem => {
        totalLikes += mediaItem.likes;
    });

    const likesCountElement = document.querySelector('.photographer_likes_count');
    likesCountElement.textContent = `${totalLikes}`;
}