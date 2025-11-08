document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelector('.slides');
    const slideCount = document.querySelectorAll('.slide').length;
    let currentIndex = 0;

    function nextSlide() {
        currentIndex = (currentIndex + 1) % slideCount;
        updateSlider();
    }

    function updateSlider() {
        const offset = -currentIndex * (100 / slideCount);
        slides.style.transform = `translateX(${offset}%)`;
    }

    // Change slide every 3 seconds (3000 milliseconds)
    setInterval(nextSlide, 3000);
});