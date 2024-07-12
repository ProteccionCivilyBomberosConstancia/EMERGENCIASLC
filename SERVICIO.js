const toggleButton = document.querySelector('.toggle-button');
const mobileMenu = document.querySelector('.navbar-links');

toggleButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});
