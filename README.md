# Tailwind/Nodemailer Contact Form

Formulario de contactos con protección del SPAM y CSRF. Se desarrolla con las siguientes fantasticas tecnologías:

* Node/Express
* Nodemailer
* Handlebars
* Tailwind

#### De la caja

* Validación de formularios del lado del cliente y del servidor
* Protección del SPAM
* Protección del CSRF
* Mensajes flash

#### Como arrancar

<pre><code>
  yarn
  yarn run app
</code></pre>

Para recibir los correos a su cuenta de Google hay que permitir el acceso de aplicaciones poco seguras:

<a href="https://myaccount.google.com/lesssecureapps" target="_blank">
  https://myaccount.google.com/lesssecureapps
</a>

También es necesario crear el fichero <code>credentials.js</code> con el siguiente contenido:

<pre><code>
  module.exports = {
    cookieSecret: 'frase secreta',
    gmail: {
      user: 'su correo de Gmail',
      password: 'su contraseña de Gmail'
    }
  }
</code></pre>

#### Licensia:

Eres libre y tienes derecho de hacer todo lo que quieres.

#### Pantallas:

Formulario de contacto ->
![Formulario de contacto](screenshots/contact-form.png "Formulario de contacto")

Mensaje flash ->
![Mensaje flash](screenshots/flash-message.png "Mensaje flash")