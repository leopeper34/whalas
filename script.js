document.addEventListener('DOMContentLoaded', function() {
  let currentSlide = 0;
  const slides = document.querySelectorAll('.gallery-slide');
  const totalSlides = slides.length;

  slides[currentSlide].classList.add('active'); // Muestra la primera imagen inicialmente

  document.querySelector('.prev').addEventListener('click', function() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
      slides[currentSlide].classList.add('active');
  });

  document.querySelector('.next').addEventListener('click', function() {
      slides[currentSlide].classList.remove('active');
      currentSlide = (currentSlide + 1) % totalSlides;
      slides[currentSlide].classList.add('active');
  });
});

function toggleMenu() {
  const menu = document.getElementById('menu');
  menu.classList.toggle('active');
}

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

// Obtener los elementos del modal
var modal = document.getElementById('myModal');
var modalImg = document.getElementById('img01');
var captionText = document.getElementById('caption');

// Obtener la imagen principal y agregar el evento de clic
var img = document.querySelector('.product-image img');
img.onclick = function() {
  modal.style.display = 'block';
  modalImg.src = this.src;
  captionText.innerHTML = this.alt;
};

// Obtener el botón de cerrar del modal
var span = document.getElementsByClassName('close')[0];
span.onclick = function() { 
  modal.style.display = 'none';
};
