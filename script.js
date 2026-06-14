/**
 * Función que copia el contenido del enlace al portapapeles.
 */
function copyLink(elementId, button) {
    const linkElement = document.getElementById(elementId);
    if (!linkElement) {
        console.error("Elemento no encontrado con ID:", elementId);
        return;
    }
    const linkText = linkElement.textContent.trim();

    navigator.clipboard.writeText(linkText).then(() => {
        const copyIcon = button.querySelector('.icon-copy');
        const checkIcon = button.querySelector('.icon-check');

        if (copyIcon && checkIcon) {
            copyIcon.style.display = 'none';
            checkIcon.style.display = 'inline-block';
            
            setTimeout(() => {
                checkIcon.style.display = 'none';
                copyIcon.style.display = 'inline-block';
            }, 1500);
        } else {
            // Plan B de respaldo visual
            const originalBg = button.style.backgroundColor;
            button.style.backgroundColor = '#e6f6f0';
            setTimeout(() => {
                button.style.backgroundColor = originalBg;
            }, 1500);
        }
    }).catch(err => {
        console.error('Error al copiar el texto: ', err);
    });
}

/**
 * Filtro/Buscador interactivo de canales en tiempo real
 */
document.getElementById('channelSearch').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const channels = document.querySelectorAll('.channel-item');
    const groups = document.querySelectorAll('.guide-group');
    let hasResults = false;

    channels.forEach(channel => {
        const channelName = channel.textContent.toLowerCase();
        if (channelName.includes(searchTerm)) {
            channel.style.display = '';
            hasResults = true;
        } else {
            channel.style.display = 'none';
        }
    });

    // Controlar la visibilidad de los encabezados de grupo para que no queden vacíos
    groups.forEach(group => {
        const visibleChannels = group.querySelectorAll('.channel-item:not([style="display: none;"])');
        const header = group.querySelector('.header-li');
        if (visibleChannels.length === 0 && searchTerm !== '') {
            header.style.opacity = '0.3'; // Atenúa el título si su bloque no tiene coincidencias
        } else {
            header.style.opacity = '1';
        }
    });

    // Mostrar mensaje si no hay ninguna coincidencia
    const noResultsMsg = document.getElementById('noResultsMessage');
    if (!hasResults && searchTerm !== '') {
        noResultsMsg.style.display = 'block';
    } else {
        noResultsMsg.style.display = 'none';
    }
});

/**
 * Lógica funcional para el botón flotante "Volver Arriba"
 */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});
