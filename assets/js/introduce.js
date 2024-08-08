document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
const cardContainer = document.querySelector('.card__container');
const cards = document.querySelectorAll('.card__article');
const prevButton = document.querySelector('.prev');
const nextButton = document.querySelector('.next');

const cardWidth = cards[0].offsetWidth; 
const cardMargin = parseFloat(getComputedStyle(cards[0]).marginRight);
const cardCount = cards.length - 1; 


const firstCardClone = cards[0].cloneNode(true);
cardContainer.appendChild(firstCardClone);


cardContainer.style.width = `${(cardWidth + cardMargin) * (cardCount + 6)}px`;

let currentIndex = 0; 

function updateSlider() {
    const translateX = -currentIndex * (cardWidth + cardMargin);
    cardContainer.style.transform = `translateX(${translateX}px)`;


    if (currentIndex === cardCount) {
        cardContainer.style.transition = 'none'; 
        currentIndex = 0;
        cardContainer.style.transform = `translateX(${currentIndex * (cardWidth + cardMargin)}px)`;
        setTimeout(() => {
            cardContainer.style.transition = 'transform 0.3s ease-in-out'; 
        }, 20);
    }


    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex === cardCount;
}


nextButton.addEventListener('click', () => {
    if (currentIndex === cardCount) {
        cardContainer.style.transition = 'none';
        currentIndex = 0;
        updateSlider();
        setTimeout(() => {
            cardContainer.style.transition = 'transform 0.5s ease-in-out';
        }, 20);
    } else {
        currentIndex++;
        updateSlider();
    }
});


prevButton.addEventListener('click', () => {
    if (currentIndex === 0) {

        cardContainer.style.transition = 'none';
        currentIndex = cardCount;
        updateSlider();
        setTimeout(() => {
            cardContainer.style.transition = 'transform 0.3s ease-in-out';
        }, 20);
    } else {
        currentIndex--;
        updateSlider();
    }
});


updateSlider();
