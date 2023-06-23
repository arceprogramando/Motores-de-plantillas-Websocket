/* eslint-disable no-console */
// eslint-disable-next-line no-undef, no-unused-vars
const socket = io();

socket.emit('message', '!Hola , me estoy conectando desde un websocket');

socket.on('evento_para_socket_invidividual', (data) => {
  console.log(data);
});

socket.on('evento_para_todos_menos_el_socket_actual', (data) => {
  console.log(data);
});

socket.on('evento_para_todos', (data) => {
  console.log(data);
});

// eslint-disable-next-line no-undef
Swal.fire({
  title: 'Hola,Coders',
  text: 'Alerta Basica con sweetalert2',
  icon: 'success',
});
