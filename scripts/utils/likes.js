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

export function updateTotalLikes(media) {
    let totalLikes = 0;

    // Calculer le nouveau total des likes
    media.forEach(mediaItem => {
        totalLikes += mediaItem.likes;
    });

    // Afficher le nouveau total des likes
    const likesCountElement = document.querySelector('.photographer_likes_count');
    likesCountElement.textContent = `${totalLikes}`;
}
