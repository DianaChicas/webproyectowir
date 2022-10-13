/*************************** VARIABLES ****************************/

const botonComprar = document.querySelector('#boton-comprar')
const cards = document.querySelector('#cards');
const items = document.querySelector('#items');
const mensajeCompra = document.querySelector('#mensaje-compra')
const notificacion = document.querySelector('#notificacion')
const noti = document.querySelector('.noti');
const footer = document.querySelector('#footer');
const vistaPrevia = document.querySelectorAll('.vista-producto');
const templateCard = document.querySelector('#template-card').content
const templateCarrito = document.querySelector('#template-carrito').content
const templateFooter = document.querySelector('#template-footer').content 
const fragment = document.createDocumentFragment();
let carrito = {}

/*************************** EVENTOS ****************************/

document.addEventListener('DOMContentLoaded', () => { fetchData() });
cards.addEventListener('click', e => { addCarrito(e) });
items.addEventListener('click', e => {btnAumentarDisminuir(e)})
items.addEventListener('click', e => {quitarProducto(e)} )


/*************************** FETCH DATA ****************************/

const fetchData = async () => {
    try {
        const res = await fetch('api.json');
        const data = await res.json();
        //console.log(data);
        pintarCard(data);
    } catch (error) {
        //console.log(error)
    }
}

/*************************** PINTAR CARD ****************************/
 
const pintarCard = data => {
    data.forEach(items => {
        templateCard.querySelector('h5').textContent = items.nombre
        templateCard.querySelector('span').textContent = items.precio
        templateCard.querySelector('img').setAttribute('src', items.thumbnailUrl)
        templateCard.querySelector('.btn-ver').data = items.ver
        templateCard.querySelector('.btn-comprar').dataset.id = items.id
        
        const clone = templateCard.cloneNode(true)
        fragment.appendChild(clone)   
    })
    cards.appendChild(fragment);
    mostrarProducto();
}

/*************************** ADD CARRITO ****************************/


const addCarrito = e => {
    if(e.target.classList.contains('btn-comprar')) {

        setCarrito(e.target.parentElement)
    }   
    e.stopPropagation()
}

/*************************** SET CARRITO ****************************/

const setCarrito = item => {
    const producto = {
        precio: item.querySelector('span').textContent,
        thumbnailUrl: item.querySelector('img').src,
        id: item.querySelector('.btn-comprar').dataset.id,
        cantidad: 1
    }

    /********cantidad **********/  
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }
        carrito[producto.id] = {...producto}

   

     /********precio total **********/  
     if (carrito.hasOwnProperty(producto.id)) {
        producto.precio = carrito[producto.id].cantidad * carrito[producto.id].precio
     }
        carrito[producto.id] = {...producto}

    //console.log(producto)
    pintarCarrito()
}

/*************************** PINTAR CARRITO ****************************/

const pintarCarrito = () => {
    items.innerHTML = '';

    if (Object.keys(carrito).length === 0) {
        items.innerHTML = `<th scope="row" colspan="4" style="padding-top: 25rem;font-size: 1.5rem">carrito vacio</th>`
        return
    }

    Object.values(carrito).forEach(producto => {
        templateCarrito.querySelector('img').src = producto.thumbnailUrl
        templateCarrito.querySelector('.cantidad').textContent = producto.cantidad
        templateCarrito.querySelector('.total').textContent = producto.precio * producto.cantidad


        //botones
        templateCarrito.querySelector('.btn-mas').dataset.id = producto.id
        templateCarrito.querySelector('.btn-menos').dataset.id = producto.id
        templateCarrito.querySelector('.btn-quitar').dataset.id = producto.id

        

        const clone = templateCarrito.cloneNode(true)
        fragment.appendChild(clone)
        //console.log(producto)
    })
    items.appendChild(fragment)
    pintarFooter()
}

/*************************** FOOTER ****************************/

const pintarFooter = () => {
    footer.innerHTML = '';

    if (Object.keys(carrito).length === 0) {
        footer.innerHTML = `
        <th scope="row" colspan="4"></th>
        `
        return
    } 

    
    const nPrecio = Object.values(carrito).reduce((acc, {cantidad, precio}) => acc + cantidad * precio ,0)
    //console.log("Precio:" + nPrecio)
    
    templateFooter.querySelector('span').textContent = nPrecio

    const clone = templateFooter.cloneNode(true)
    fragment.appendChild(clone)

    footer.appendChild(fragment)

    const boton = document.querySelector('#vaciar-carrito')
    boton.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
        pintarNotificacion()
        pintarFooter()
    })

    
    pintarNotificacion()

    
}

/*************************** NOTIFICACION ****************************/

const pintarNotificacion = () => {
    notificacion.innerHTML = ''

    if(Object.keys(carrito).length === 0) {
        noti.innerHTML = ` `
        return
    } 


    const nCantidad = Object.values(carrito).reduce((acc) => acc + 1 , 0)

    noti.textContent = nCantidad

    const clone = notificacion.cloneNode(true)
    fragment.appendChild(clone)

    noti.appendChild(fragment)
}

/*************************** BOTON QUITAR-PRODUCTO ****************************/

const quitarProducto = e => {
    
    if (e.target.classList.contains('btn-quitar')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad
        if (producto.cantidad >= 0) {
            delete carrito[e.target.dataset.id]
            delete pintarNotificacion()
            delete pintarFooter()
        } 
        pintarCarrito()
    }

    e.stopPropagation()
    
}

/*************************** BOTON MAS/MENOS ****************************/


const btnAumentarDisminuir = e => {
    if (e.target.classList.contains('btn-mas')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad++
        carrito[e.target.dataset.id] = {...producto}
        pintarCarrito()
    }

    if (e.target.classList.contains('btn-menos')) {
        const producto = carrito[e.target.dataset.id]
        producto.cantidad--
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id]
            delete pintarNotificacion()
            delete pintarFooter()
        } else {
            carrito[e.target.dataset.id] = {...producto}
        }
        pintarCarrito()
    }

    e.stopPropagation()
}


/*************************** MOSTRAR PRODUCTOS ****************************/


const mostrarProducto = () => {

    for (let i = 0; i < vistaPrevia.length; i++) {
       
                
        document.querySelectorAll('.btn-ver')[i].addEventListener('click', () => {
            vistaPrevia[i].classList.toggle('active');
        })
    }
   
}

