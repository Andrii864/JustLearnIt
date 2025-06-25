const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
const slides = document.querySelectorAll('.review-slide');
let currentReview = 0;

// Створення крапок
slides.forEach((_, i) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => {
        currentReview = i;
        updateReviewSlider();
    });
    reviewsDots.appendChild(dot);
});

function updateReviewSlider() {
    reviewsTrack.style.transform = `translateX(-${currentReview * 100}%)`;
    document.querySelectorAll('.dot').forEach(dot => dot.classList.remove('active'));
    reviewsDots.children[currentReview].classList.add('active');
}

// Swipe
let startX = 0;

reviewsTrack.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
}, { passive: true });

reviewsTrack.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 50) {
        currentReview = (currentReview + 1) % slides.length;
    } else if (diff < -50) {
        currentReview = (currentReview - 1 + slides.length) % slides.length;
    }

    updateReviewSlider();
}, { passive: true });

// Початкове оновлення
updateReviewSlider();
