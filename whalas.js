document.addEventListener('DOMContentLoaded', function() {
  // Slider automático
  let slideIndex = 0;
  const productImages = document.querySelectorAll('.product-thumb');
  const productImage = document.getElementById('product-image').querySelector('img');
  
  function showSlides() {
    productImages.forEach((img) => img.classList.remove('active'));
    productImages[slideIndex].classList.add('active');
    productImage.src = productImages[slideIndex].src;
    slideIndex++;
    if (slideIndex >= productImages.length) {
      slideIndex = 0;
    }
  }
  
  setInterval(showSlides, 3000); // Cambia la imagen cada 3 segundos

  // Funcionalidad para ver las imágenes ampliadas
  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('img01');
  const closeBtn = document.querySelector('.close');
  
  productImage.addEventListener('click', () => {
    modal.style.display = 'block';
    modalImg.src = productImage.src;
  });

  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  productImages.forEach(img => {
    img.addEventListener('click', () => {
      productImages.forEach(i => i.classList.remove('active'));
      img.classList.add('active');
      productImage.src = img.src;
    });
  });

  // Código para el acordeón
  document.querySelectorAll('.accordion-button').forEach(button => {
    button.addEventListener('click', () => {
      button.classList.toggle('active');
      button.nextElementSibling.classList.toggle('active');
    });
  });

  // Funcionalidad para la cantidad de productos
  const minusButton = document.querySelector('.quantity-button.minus');
  const plusButton = document.querySelector('.quantity-button.plus');
  const quantityInput = document.querySelector('#quantity');

  minusButton.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    if (currentValue > 1) {
      quantityInput.value = currentValue - 1;
    }
  });

  plusButton.addEventListener('click', () => {
    const currentValue = parseInt(quantityInput.value);
    quantityInput.value = currentValue + 1;
  });

  // Funcionalidad para los botones de tamaño
  const sizeButtons = document.querySelectorAll('.size-button');
  
  sizeButtons.forEach(button => {
    button.addEventListener('click', function () {
      sizeButtons.forEach(btn => btn.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Funcionalidad del acordeón
  const accordions = document.querySelectorAll('.accordion');

  accordions.forEach((accordion) => {
    const button = accordion.querySelector('.accordion-button');
    const content = accordion.querySelector('.accordion-content');

    button.addEventListener('click', () => {
      // Cerrar todos los acordeones abiertos
      accordions.forEach((otherAccordion) => {
        if (otherAccordion !== accordion) {
          otherAccordion.classList.remove('active');
          otherAccordion.querySelector('.accordion-content').style.display = 'none';
        }
      });

      // Abrir o cerrar el acordeón actual
      if (accordion.classList.contains('active')) {
        accordion.classList.remove('active');
        content.style.display = 'none';
      } else {
        accordion.classList.add('active');
        content.style.display = 'block';
      }
    });
  });
});
