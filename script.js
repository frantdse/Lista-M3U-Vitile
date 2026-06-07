/**
 * Función que copia el contenido del elemento con el ID especificado al portapapeles.
 * @param {string} elementId - El ID del elemento que contiene el texto a copiar.
 * @param {HTMLElement} button - El botón que fue clickeado (para cambiar su ícono).
 */
function copyLink(elementId, button) {
    // 1. Obtener el texto (la URL)
    const linkElement = document.getElementById(elementId);
    if (!linkElement) {
        console.error("Elemento no encontrado con ID:", elementId);
        return;
    }
    const linkText = linkElement.textContent.trim();

    // 2. Usar la API del portapapeles (navigator.clipboard)
    navigator.clipboard.writeText(linkText).then(() => {
        
        // 3. Obtener los íconos de la copiadora
        const copyIcon = button.querySelector('.icon-copy');
        const checkIcon = button.querySelector('.icon-check');

        // 4. Mostrar el ícono de "copiado"
        if (copyIcon && checkIcon) {
            copyIcon.style.display = 'none';
            checkIcon.style.display = 'inline-block';
        }
        
        // 5. Revertir al ícono de "copiar" después de 1.5 segundos
        setTimeout(() => {
            if (copyIcon && checkIcon) {
                checkIcon.style.display = 'none';
                copyIcon.style.display = 'inline-block';
            }
        }, 1500);

    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
        alert("Error al copiar. Intenta copiar la URL manualmente.");
    });
}

// Cuenta regresiva del Mundial FIFA 2026 integrada nativamente
(function(){
  // Fecha objetivo: 11 de junio de 2026 - 16:00 hora Buenos Aires (UTC-3)
  const targetDate = new Date(Date.UTC(2026, 5, 11, 19, 0, 0)).getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    // Controlamos la existencia de los elementos antes de procesar
    const titleEl = document.querySelector(".title-countdown");
    if (!titleEl) return;

    if (diff < 0) {
      titleEl.innerText = "¡El Mundial FIFA 2026 ya comenzó!";
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    const daysEl = document.getElementById("days");
    const hoursEl = document.getElementById("hours");
    const minutesEl = document.getElementById("minutes");
    const secondsEl = document.getElementById("seconds");

    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = mins;
    if (secondsEl) secondsEl.textContent = secs;
  }

  // Ejecución y ciclo continuo
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();
