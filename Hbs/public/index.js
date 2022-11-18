const API = 'http://localhost:8000';
const socket = io();

/* ------------------------------- Get Element ------------------------------ */

const containerProducto = document.getElementById('containerProducto');
const sendForm = document.getElementById('sendForm');

/* -------------------------------- Functions ------------------------------- */

function addProduct(e) {
  e.preventDefault();
  const { title, price, thumbnail } = e.target;
  const productToSend = { title: title.value, price: price.value, thumbnail: thumbnail.value };
  socket.emit('productoEnviado', productToSend);
}

function renderProducts(data) {
  console.log(data)
  fetch(`${API}/productsList.handlebars`)
    .then((res) => res.text())
    .then((res) => {
      const template = Handlebars.compile(res);
      containerProducto.innerHTML = template({ products: data });
    });
}

function enviarMsg() {
  const email = document.getElementById('input-email').value;
  const msgParaEnvio = document.getElementById('input-msg').value;
  socket.emit('msg', { email: email, mensaje: msgParaEnvio });
}

/* --------------------------------- Sockets -------------------------------- */

socket.on('connect', () => {
  console.log('On');
});

socket.on('msg', (data) => {
  console.log(data);
});

socket.on('allProducts', renderProducts);

socket.on('msg-list', (data) => {
  console.log('msg-list', data);
  let html = '';
  data.forEach((element) => {
    html += `
    <div>
    <span id="emailForm">${element.email}</span>
    <span id="fecha">${element.hora}</span>
    : <span id="mensajeForm">${element.mensaje}</span>
    </div>
    `;
  });
  document.getElementById('div-list-msgs').innerHTML = html;
});

socket.on('listaProductos', (data) => {
  console.log('Productos' + data);
});

/* --------------------------- Add Event Listener --------------------------- */

sendForm.addEventListener('submit', addProduct);
