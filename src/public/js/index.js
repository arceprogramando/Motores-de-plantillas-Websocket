// Cliente

// eslint-disable-next-line no-undef
const socket = io();

socket.emit('message', '!Hola, me estoy conectando desde un el cliente');

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  try {
    const formData = new FormData(form);
    const jsonData = Object.fromEntries(formData);

    const response = await fetch('http://localhost:8080/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jsonData),
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
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-undef
    Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
  }
});
