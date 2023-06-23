/* eslint-disable no-console */
// eslint-disable-next-line no-undef, no-unused-vars
const socket = io();

socket.emit('message', '!Hola, me estoy conectando desde un el cliente');

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  console.log(formData);
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      socket.emit('nuevoProducto', data);

      form.reset();

      // eslint-disable-next-line no-undef
      Swal.fire('Éxito', 'El producto se agregó correctamente', 'success');
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    console.log(error);
    // eslint-disable-next-line no-undef
    Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
  }
});
