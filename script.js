const reviewsSlider = document.querySelector('.reviews-slider');
const reviewsTrack = document.getElementById('reviewsTrack');
const reviewsDots = document.getElementById('reviewsDots');
const totalReviews = reviewsTrack.children.length;
let currentReview = 0;

// Динамічні крапки
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

// Центрування слайда
function updateReviewSlider() {
    const slideWidth = reviewsTrack.children[0].offsetWidth;
    const containerWidth = reviewsSlider.offsetWidth;
    const offset = (slideWidth + 20) * currentReview - (containerWidth - slideWidth) / 2;

    reviewsTrack.style.transform = `translateX(-${offset}px)`;

    // Активна крапка
    [...reviewsDots.children].forEach(dot => dot.classList.remove('active'));
    reviewsDots.children[currentReview].classList.add('active');
}

// Swipe
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
        if (diff > 0) {
            currentReview = (currentReview + 1) % totalReviews; // вперед, з циклом
        } else {
            currentReview = (currentReview - 1 + totalReviews) % totalReviews; // назад, з циклом
        }
        updateReviewSlider();
        isDragging = false;
    }
}, { passive: true });

reviewsSlider.addEventListener('touchend', () => {
    isDragging = false;
});

// Запуск початкового слайду
updateReviewSlider();
