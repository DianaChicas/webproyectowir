/*************************VARIABLES*****************************/

let navbar = document.querySelector('.navbar');
let nav = document.querySelectorAll('.link');
let carritoCompra = document.querySelector('.shopping-card')
let vistaProducto = document.querySelectorAll('.vista-producto');

/*************************BOTON MENU*****************************/

document.querySelector('.menu-icon').addEventListener('click', () => {
    navbar.classList.toggle('active');

    for (let i = 0; i < nav.length; i++) {
        nav[i].classList.toggle('active')     
    }

   
})


/*************************BOTON CARRITO*****************************/

document.querySelector('.carrito-compra').addEventListener('click', () => {
    carritoCompra.classList.toggle('active');
})


/*************************BOTON CERRAR PRODUCTO*****************************/


let botonCerrar = () => {
    for (let i = 0; i < vistaProducto.length; i++) {
       
                
        document.querySelectorAll('.boton-cerrar')[i].addEventListener('click', () => {
            vistaProducto[i].classList.remove('active');
        })
    }
}

botonCerrar()

/*************************EVENTO WINDOW*****************************/

window.addEventListener('scroll', () => {
    navbar.classList.remove('active');
    carritoCompra.classList.remove('active');
})

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});
