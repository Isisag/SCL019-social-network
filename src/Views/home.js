export const home = () => {
  window.location.hash = '/home';
  const divHome = document.createElement('div');
  divHome.className = 'div';
  const pageHome = ` 
<h1 class ="home-title">¡Bienvenido!</h1>
 <section class="home-container">
  <div class ="home-btn">
  <a class="btn" href="#/login">Iniciar Sesión</a>
  <a  href="#" class="btn"> Iniciar Sesión con Google <img alt="google"class= "google"src="./assets/image/google.png"></a>
  <a class="btn" href="#/register">Registrarse</a>
 </div>
 </section>
 `;

  divHome.innerHTML = pageHome;

  return divHome;
};
