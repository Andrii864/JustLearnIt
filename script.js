const reviewsSlider = document.querySelector('.reviews-slider');
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
const totalReviews = reviewsTrack.children.length;
let currentReview = 0;

// Створення крапок
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

// ====== Swipe gestures ======

let startX = 0;
let isDragging = false;

reviewsSlider.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isDragging = true;
}, { passive: true });

reviewsSlider.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    const currentX = e.touches[0].clientX;
    const diff = startX - currentX;

    if (Math.abs(diff) > 50) {
        if (diff > 0 && currentReview < totalReviews - 1) {
            currentReview++;
        } else if (diff < 0 && currentReview > 0) {
            currentReview--;
        }
        updateReviewSlider();
        isDragging = false; // щоб не кілька разів при одному русі
    }
}, { passive: true });

reviewsSlider.addEventListener('touchend', () => {
    isDragging = false;
});
