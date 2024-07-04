const accordionItems = document.querySelectorAll('.accordion-item');

accordionItems.forEach((item) => {
  const button = item.querySelector('.accordion-button');
  const content = item.querySelector('.accordion-content');

  button.addEventListener('click', () => {
    accordionItems.forEach((otherItem) => {
      if (otherItem !== item) {
        otherItem.classList.remove('active');
      }
    });

    item.classList.toggle('active');
  });
});
function toggleMenu() {
    const menu = document.getElementById('menu');
    menu.classList.toggle('active');
}