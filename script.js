const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
const totalReviews = reviewsTrack.children.length;
let currentReview = 0;

// Створюємо крапки
for (let i = 0; i < totalReviews; i++) {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentReview = i;
        updateReviewSlider();
    });
    reviewsDots.appendChild(dot);
}

function updateReviewSlider() {
    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;
    [...reviewsDots.children].forEach(dot => dot.classList.remove('active'));
    reviewsDots.children[currentReview].classList.add('active');
}

// Swipe-підтримка
let startX = 0;

reviewsTrack.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

reviewsTrack.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (endX < startX - 50 && currentReview < totalReviews - 1) {
        currentReview++;
    } else if (endX > startX + 50 && currentReview > 0) {
        currentReview--;
    }
    updateReviewSlider();
});
