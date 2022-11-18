const socket = io();

socket.on('connect', () => {
  console.log('On');
});

socket.on('msg', (data) => {
  console.log(data);
});

function enviarMsg() {
  const email = document.getElementById('input-email').value;
  const msgParaEnvio = document.getElementById('input-msg').value;
  socket.emit('msg', { email: email, mensaje: msgParaEnvio });
}

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
