const navbar = document.querySelector(".navbar");

window.addEventListener('scroll', () =>{
   const windowPosition = window.scrollY > 0;
   navbar.classList.toggle("scrolling-active", windowPosition);
});