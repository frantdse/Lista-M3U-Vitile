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

        // Bloque RAW nativo de tu lista M3U (Directo en memoria, sin llamadas JSON)
const M3U_RAW_DATA = `#EXTM3U url-tvg="https://impeditor.com/epg/capanueve/capanueve"

# Noticias
#EXTINF:-1 tvg-id="0222" tvg-name="A24" group-title="Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/A24_%282025%29.svg/3840px-A24_%282025%29.svg.png", A24
https://g1.mc-hor.transport.edge-access.net/a15/ngrp:a24-100056_all/Playlist.m3u8?sense=true
#EXTINF:-1 tvg-id="0917" tvg-name="Canal 26" group-title="Noticias" tvg-logo="https://files.catbox.moe/n6c2ol.png", Canal 26
https://stream-gtlc.telecentro.net.ar/hls/canal26hls/main.m3u8
#EXTINF:-1 tvg-id="0905" tvg-name="TN" group-title="Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/TN_todo_noticias_logo.svg/3840px-TN_todo_noticias_logo.svg.png", TN
#EXTVLCOPT:http-referrer=https://tn.com.ar/envivo/24hs
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36
https://live-01-01-tn.vodgc.net/TN_DAI_Beta/index.m3u8
#EXTINF:-1 tvg-id="0934" tvg-name="Crónica TV" group-title="Noticias" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/f/fb/Cr%C3%B3nica_TV_logotipo_%282016%29.png", Crónica TV
https://g5.vxral-slo.transport.edge-access.net/a09/ngrp:cronicatv_video1-100044_all/Playlist.m3u8?sense=true
#EXTINF:-1 tvg-id="0964" tvg-name="Canal E" group-title="Noticias" tvg-logo="https://files.catbox.moe/h069t6.webp", Canal E
https://unlimited1-saopaulo.dps.live/perfiltv/perfiltv.smil/playlist.m3u8
#EXTINF:-1 tvg-id="0923" tvg-name="24/7 Noticias" group-title="Noticias" tvg-logo="https://files.catbox.moe/supqza.png", 24/7 Noticias Neuquen
https://panel.host-live.com:19360/cn247tv/Source.m3u8
#EXTINF:-1 tvg-id="0932" tvg-name="C5N" group-title="Noticias", tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/C5N_2017_Alternate.svg/3840px-C5N_2017_Alternate.svg.png", C5N
https://full-online.xyz/proxy/ssl/?url=http://45.225.40.206:12080/Live/4381001cf7c4e271491f5484da2d8304/c5n_720.m3u8

# General
#EXTINF:-1 tvg-id="0909" tvg-name="Telefe" group-title="General/Abierta" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/c/cc/Telefe_%28nuevo_logo%29.png", Telefe
https://full-online.xyz/proxy/ssl/?url=http://45.225.40.206:12080/Live/4107b24939e8872f74a7a57a545d71ee/telefe.playlist.m3u8
#EXTINF:-1 tvg-id="0939" tvg-name="Net TV" group-title="General/Abierta" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/a/a5/Net_TV_logo.png", Net TV
https://unlimited1-us.dps.live/nettv/nettv.smil/nettv/livestream1/playlist.m3u8
#EXTINF:-1 tvg-id="0915" group-title="General/Abierta" tvg-name="El Trece" tvg-logo="https://files.catbox.moe/finwuj.png", El Trece
#EXTVLCOPT:http-referrer=https://vodgc.net
#EXTVLCOPT:http-user-agent=Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36
#KODIPROP:inputstream.adaptive.stream_headers=Referer=https://vodgc.net&User-Agent=Mozilla/5.0 (Linux; Android 8.0.0; Pixel 2 XL Build/OPD1.170816.004) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Mobile Safari/537.36
https://livetrx01.vodgc.net/eltrecetv/index.m3u8
#EXTINF:-1 tvg-id="0916" tvg-name="El Nueve" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/5xa4p6.png", Canal 9 
https://nameless-resonance-f644.javimarki.workers.dev/12
#EXTINF:-1 tvg-id="0935" tvg-name="América TV" group-title="General/Abierta" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Logotipo_de_America_TV.svg/3840px-Logotipo_de_America_TV.svg.png", América TV
https://prepublish.f.qaotic.net/a07/americahls-100056/playlist_720p.m3u8
#EXTINF:-1 tvg-id="0903" tvg-name="TV Pública" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/kezveb.png", TV Publica
https://g5.vxral-hor.transport.edge-access.net/b16/ngrp:c7_vivo01_dai_source-20001_all/playlist.m3u8
#EXTINF:-1 tvg-id="0919" tvg-name="Canal de la Ciudad" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/ql9rbg.png", Canal de la Ciudad
https://g4.proy-hor.transport.edge-access.net/a06/ngrp:gcba_video4-100042_all/Playlist.m3u8?sense=true
#EXTINF:-1 tvg-id="0640" tvg-name="Unife TV" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/505e9l.png", Unife TV
https://cdn.mycloudstream.io/hls/live/broadcast/pgv5kerk/index.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Telecreativa" group-title="General/Abierta" tvg-logo="https://files.catbox.moe/rnaxj6.png", Telecreativa 
https://panel.host-live.com:19360/8012/8012.m3u8

# Otros/Tematicos
#EXTINF:-1 tvg-id="0534" tvg-name="Canal de la Música" group-title="Musica", Canal de la Música
https://g1.mc-slo.transport.edge-access.net/b08/ngrp:CM_CanaldelaMusica-100044_all/Playlist.m3u8?sense=true
#EXTINF:-1 tvg-id="" tvg-name="Los Simpsons" group-title="Remodelación", tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/9/98/The_Simpsons_yellow_logo.svg/1920px-The_Simpsons_yellow_logo.svg.png", El Rincón de los Simpsons
http://45.225.40.206:12080/Live/76b678bf3a8a411cb7b2f415a567034d/online-24-7_480.m3u8
#EXTINF:-1 tvg-id="0936" tvg-name="Ciudad Magazine" group-title="Temáticos Argentinos", Ciudad Magazine
https://livetrx01.vodgc.net/live-01-07-ciudad.vodgc.net/tracks-v1a1/mono.m3u8
#EXTINF:-1 tvg-id="0907" tvg-name="Canal 9 Multivisión" group-title="Temáticos Argentinos" tvg-logo="https://files.catbox.moe/iqx1h4.png",Canal 9 Multivisión
https://panel.host-live.com:19360/8250/8250.m3u8
#EXTINF:-1 tvg-id="0937" tvg-name="Telemax" group-title="Otros/Extras y Radios" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/1/13/Telemax_Argentina_%282018%29.png" , Telemax
https://stream-gtlc.telecentro.net.ar/hls/telemaxhls/main.m3u8
#EXTINF:-1 tvg-id="0912" tvg-name="Argentinisima Satelital" group-title="Otros/Extras y Radios" tvg-logo="https://files.catbox.moe/lk049e.png" , Argentinisima Satelital 
https://stream1.sersat.com/hls/argentinisima.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Radio La 100" group-title="Otros/Extras y Radios" tvg-logo="https://i.ibb.co/yFqTXRTC/CZJMM4-BJVRFANO4-VGMMYWSTEVE.webp", Radio La 100
https://mdstrm.com/live-stream-playlist/68b74fd1d6512526f1f7c75a.m3u8
#EXTINF:-1 tvg-id="" tvg-name="Latina TV" group-title="Otros/Extras y Radios" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Canal_Latina.png/800px-Canal_Latina.png", Latina TV
https://stream-gtlc.telecentro.net.ar/hls/latinatvhls/0/playlist.m3u8

# Internacional
#EXTINF:-1 tvg-id="0205" tvg-name="DW" group-title="Internacional" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/7/75/Deutsche_Welle_symbol_2012.svg/2560px-Deutsche_Welle_symbol_2012.svg.png",DW
https://dwamdstream104.akamaized.net/hls/live/2015530/dwstream104/master.m3u8
#EXTINF:-1 tvg-id="0213" tvg-name="Euronews" group-title="Internacional" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Euronews_2016_logo.svg/2560px-Euronews_2016_logo.svg.png",Euronews
https://stitcher-ipv4.pluto.tv/v1/stitch/embed/hls/channel/619d59b7cbef25000728221clivestitch/master.m3u8?deviceType=unknown&deviceMake=unknown&deviceModel=unknown&deviceVersion=unknown&appVersion=unknown&deviceLat=90&deviceLon=0&deviceDNT=TARGETOPT&deviceId=PSID&advertisingId=PSID&us_privacy=1YNY&profileLimit=&profileFloor=&embedPartner=&profilesFromStream=true
#EXTINF:-1 tvg-id="0206" tvg-name="France 24 Español" group-title="Internacional" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/8/8a/France24.png",France 24 Español
https://live.france24.com/hls/live/2037220-b/F24_ES_HI_HLS/master_5000.m3u8
#EXTINF:-1 tvg-id="0209" tvg-name="RT en Español" group-title="Internacional" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Russia-today-logo.svg/2048px-Russia-today-logo.svg.png",RT en Español
https://rt-esp.rttv.com/live/rtesp/playlist.m3u8
#EXTINF:-1 tvg-id="0204" tvg-name="TeleSUR" group-title="Internacional" tvg-logo="https://upload.wikimedia.org/wikipedia/commons/8/82/TeleSUR.png",TeleSUR
https://mblesmain01.telesur.ultrabase.net/mbliveMain/hd/chunklist.m3u8`;

const BASE_GIST_URL = "https://gist.githubusercontent.com/frantdse/f6989518c73826ade6734c63c367af4c/raw/";

/**
 * 1. Cambia dinámicamente el enlace remoto mostrado según filtros
 */
function actualizarEnlaceM3U() {
    const noticias = document.getElementById('gen-noticias').checked;
    const general = document.getElementById('gen-general').checked;
    const tematicos = document.getElementById('gen-tematicos').checked;
    const internacional = document.getElementById('gen-internacional').checked;

    let queries = [];
    if (!noticias) queries.push("exclude=noticias");
    if (!general) queries.push("exclude=general");
    if (!tematicos) queries.push("exclude=tematicos");
    if (!internacional) queries.push("exclude=internacional");

    const display = document.getElementById('m3u-url-display');
    if (queries.length > 0) {
        display.textContent = BASE_GIST_URL + "?" + queries.join("&");
    } else {
        display.textContent = BASE_GIST_URL;
    }
}

/**
 * 2. Compila el M3U crudo en caliente y dispara la descarga nativa en el navegador
 */
function descargarM3UFiltrado() {
    const noticias = document.getElementById('gen-noticias').checked;
    const general = document.getElementById('gen-general').checked;
    const tematicos = document.getElementById('gen-tematicos').checked;
    const internacional = document.getElementById('gen-internacional').checked;

    const lineas = M3U_RAW_DATA.split('\n');
    let contenidoFinal = ['#EXTM3U url-tvg="https://impeditor.com/epg/capanueve/capanueve"'];
    
    let bloqueActual = [];
    let grupoValido = true;

    for (let i = 1; i < lineas.length; i++) {
        let linea = lineas[i].trim();
        if (!linea) continue;

        if (linea.startsWith('#EXTINF')) {
            // Guardar bloque anterior si era válido antes de procesar el nuevo
            if (bloqueActual.length > 0 && grupoValido) {
                contenidoFinal.push(...bloqueActual);
            }
            bloqueActual = [linea];
            
            // Determinar categoría del canal
            let lowerLine = linea.toLowerCase();
            if (lowerLine.includes('group-title="noticias"')) {
                grupoValido = noticias;
            } else if (lowerLine.includes('group-title="general/abierta"')) {
                grupoValido = general;
            } else if (lowerLine.includes('group-title="internacional"')) {
                grupoValido = internacional;
            } else {
                grupoValido = tematicos; // Agrupa música, remodelación, extras y otros
            }
        } else if (bloqueActual.length > 0) {
            bloqueActual.push(linea);
        }
    }
    // Guardar el último canal procesado
    if (bloqueActual.length > 0 && grupoValido) {
        contenidoFinal.push(...bloqueActual);
    }

    // Crear el archivo virtual descargable
    const blob = new Blob([contenidoFinal.join('\n')], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'lista_vitile_personalizada.m3u';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
}

/**
 * 3. Copiar enlace remoto Gist con animación de iconos
 */
function copiarUrlGist(button) {
    const text = document.getElementById('m3u-url-display').textContent;
    navigator.clipboard.writeText(text).then(() => {
        const copyIcon = button.querySelector('.icon-copy');
        const checkIcon = button.querySelector('.icon-check');
        copyIcon.style.display = 'none';
        checkIcon.style.display = 'inline-block';
        setTimeout(() => {
            checkIcon.style.display = 'none';
            copyIcon.style.display = 'inline-block';
        }, 1500);
    });
}

/**
 * 4. Control de EPG en tiempo real por franjas horarias
 */
function actualizarEPGInterno() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    
    // Configuración estructural para canales principales
    const epgData = {
        "0905": { name: "TN Todo Noticias - En Vivo", prog: (minutos * 1.4) },
        "0222": { name: "El Noticiero de A24", prog: (minutos * 1.1) },
        "0909": { name: "Telefe Noticias / Magazine", prog: (minutos * 1.5) },
        "0915": { name: "Telenoche Argentina", prog: (minutos * 1.2) }
    };

    // Variaciones según bloque de horario en el día
    if (hora >= 13 && hora < 19) {
        epgData["0905"].name = "TN Central - Cobertura Especial";
        epgData["0222"].name = "Intrusos en el Espectáculo";
        epgData["0909"].name = "Cortá por Lozano / Novelas";
        epgData["0915"].name = "Mediodía Noticias";
    } else if (hora >= 19 || hora < 6) {
        epgData["0905"].name = "TN Noche / Sólo Una Vuelta Más";
        epgData["0222"].name = "Basta Baby - En Vivo";
        epgData["0909"].name = "Telefe Noticias Central";
        epgData["0915"].name = "El Trece Espectáculos";
    }

    Object.keys(epgData).forEach(id => {
        const item = document.querySelector(`.channel-item[data-id="${id}"]`);
        if (item) {
            const textNode = item.querySelector('.epg-current-text');
            const fillNode = item.querySelector('.epg-fill');
            if (textNode) textNode.textContent = epgData[id].name;
            if (fillNode) {
                let progresoCalculado = Math.min(Math.max(epgData[id].prog, 10), 95);
                fillNode.style.width = `${progresoCalculado}%`;
            }
        }
    });
}

/**
 * 5. Buscador Dinámico Clásico y Sistema de Tabs
 */
const searchInput = document.getElementById('channelSearch');
const tabButtons = document.querySelectorAll('.tab-btn');
const groups = document.querySelectorAll('.guide-group');

function filtrarGuias() {
    const txtBusqueda = searchInput.value.toLowerCase().trim();
    const tabActiva = document.querySelector('.tab-btn.active').getAttribute('data-filter');
    let visibles = 0;

    groups.forEach(grupo => {
        const categoria = grupo.getAttribute('data-category');
        const items = grupo.querySelectorAll('.channel-item');
        let contadorGrupo = 0;

        items.forEach(item => {
            const nombreCanal = item.querySelector('.ch-name').textContent.toLowerCase();
            const cumpleBusqueda = nombreCanal.includes(txtBusqueda);
            const cumpleTab = (tabActiva === 'all' || categoria === tabActiva);

            if (cumpleBusqueda && cumpleTab) {
                item.style.display = '';
                contadorGrupo++;
                visibles++;
            } else {
                item.style.display = 'none';
            }
        });
        grupo.style.display = (contadorGrupo === 0) ? 'none' : '';
    });

    document.getElementById('noResultsMessage').style.display = (visibles === 0) ? 'block' : 'none';
}

searchInput.addEventListener('input', filtrarGuias);
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtrarGuias();
    });
});

