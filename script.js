/**
 * =========================================================================
 * 1. SECCIÓN: GESTIÓN DE PORTAPAPELES Y FUNCIONES DE INTERFAZ GENERAL
 * =========================================================================
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
 * Lógica funcional para el botón flotante "Volver Arriba"
 */
const backToTopBtn = document.getElementById('backToTop');
if (backToTopBtn) {
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
}

/**
 * =========================================================================
 * 2. SECCIÓN: BASE DE DATOS M3U RAW Y GENERADOR DE LISTAS PERSONALIZADAS
 * =========================================================================
 */
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
    if (display) {
        if (queries.length > 0) {
            display.textContent = BASE_GIST_URL + "?" + queries.join("&");
        } else {
            display.textContent = BASE_GIST_URL;
        }
    }
}

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
            if (bloqueActual.length > 0 && grupoValido) {
                contenidoFinal.push(...bloqueActual);
            }
            bloqueActual = [linea];
            
            let lowerLine = linea.toLowerCase();
            if (lowerLine.includes('group-title="noticias"')) {
                grupoValido = noticias;
            } else if (lowerLine.includes('group-title="general/abierta"')) {
                grupoValido = general;
            } else if (lowerLine.includes('group-title="internacional"')) {
                grupoValido = internacional;
            } else {
                grupoValido = tematicos; 
            }
        } else if (bloqueActual.length > 0) {
            bloqueActual.push(linea);
        }
    }
    if (bloqueActual.length > 0 && grupoValido) {
        contenidoFinal.push(...bloqueActual);
    }

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

function copiarUrlGist(button) {
    const display = document.getElementById('m3u-url-display');
    if (!display) return;
    const text = display.textContent;
    navigator.clipboard.writeText(text).then(() => {
        const copyIcon = button.querySelector('.icon-copy');
        const checkIcon = button.querySelector('.icon-check');
        if (copyIcon && checkIcon) {
            copyIcon.style.display = 'none';
            checkIcon.style.display = 'inline-block';
            setTimeout(() => {
                checkIcon.style.display = 'none';
                copyIcon.style.display = 'inline-block';
            }, 1500);
        }
    });
}

/**
 * =========================================================================
 * 3. SECCIÓN: BUSCADOR UNIFICADO Y SISTEMA DE TABS (GUIAS)
 * =========================================================================
 */
const searchInput = document.getElementById('channelSearch');
const tabButtons = document.querySelectorAll('.tab-btn');
const groups = document.querySelectorAll('.guide-group');

function filtrarGuias() {
    if (!searchInput) return;
    const txtBusqueda = searchInput.value.toLowerCase().trim();
    const activeTabEl = document.querySelector('.tab-btn.active');
    const tabActiva = activeTabEl ? activeTabEl.getAttribute('data-filter') : 'all';
    let visibles = 0;

    groups.forEach(grupo => {
        const categoria = grupo.getAttribute('data-category');
        const items = grupo.querySelectorAll('.channel-item');
        const header = grupo.querySelector('.header-li');
        let contadorGrupo = 0;

        items.forEach(item => {
            // Intenta buscar la clase .ch-name, si no usa el texto plano del item
            const nameEl = item.querySelector('.ch-name');
            const nombreCanal = nameEl ? nameEl.textContent.toLowerCase() : item.textContent.toLowerCase();
            
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

        // Manejo elegante de visibilidad de los contenedores/cabeceras de los grupos
        if (contadorGrupo === 0) {
            grupo.style.display = 'none';
        } else {
            grupo.style.display = '';
            if (header) {
                header.style.opacity = (txtBusqueda !== '') ? '0.5' : '1';
            }
        }
    });

    const noResultsMsg = document.getElementById('noResultsMessage');
    if (noResultsMsg) {
        noResultsMsg.style.display = (visibles === 0) ? 'block' : 'none';
    }
}

if (searchInput) {
    searchInput.addEventListener('input', filtrarGuias);
}
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filtrarGuias();
    });
});

/**
 * Control de EPG simulado por franjas horarias
 */
function actualizarEPGInterno() {
    const ahora = new Date();
    const hora = ahora.getHours();
    const minutos = ahora.getMinutes();
    
    const epgData = {
        "0905": { name: "TN Todo Noticias - En Vivo", prog: (minutos * 1.4) },
        "0222": { name: "El Noticiero de A24", prog: (minutos * 1.1) },
        "0909": { name: "Telefe Noticias / Magazine", prog: (minutos * 1.5) },
        "0915": { name: "Telenoche Argentina", prog: (minutos * 1.2) }
    };

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
 * =========================================================================
 * 4. SECCIÓN: MOTOR DE PARSEO Y GESTIÓN EPG XML (PANEL CONFIG)
 * =========================================================================
 */
function toggleConfigPanel() {
    const p = document.getElementById('configPanel'); 
    if (p) {
        p.style.display = p.style.display === 'block' ? 'none' : 'block'; 
    }
    const urlSec = document.getElementById('urlConfigSection');
    if (urlSec) urlSec.style.display = 'none'; 
}

function toggleUrlSection() {
    const sec = document.getElementById('urlConfigSection');
    if (sec) {
        sec.style.display = sec.style.display === 'none' ? 'flex' : 'none';
    }
}

function showLoader() { 
    const loader = document.getElementById('globalLoader');
    if (loader) loader.style.display = 'flex'; 
}

function hideLoader() { 
    const loader = document.getElementById('globalLoader');
    if (loader) loader.style.display = 'none'; 
}

function manualLoadEPG() {
    const urlInput = document.getElementById('urlInput');
    if (!urlInput) return;
    const urlRaw = urlInput.value.trim();
    if(!urlRaw) return;
    localStorage.setItem('epg_url', urlRaw); 
    executeReload();
}

function loadDefaultEPG() {
    const urlInput = document.getElementById('urlInput');
    if (urlInput) {
        urlInput.value = DEFAULT_EPG_URL;
    }
    localStorage.setItem('epg_url', DEFAULT_EPG_URL);
    executeReload();
}

function executeReload() {
    showLoader();
    if (typeof state !== 'undefined') {
        state.visibleIds.clear(); 
        state.allChannels = []; 
        state.displayedRandomIds = []; 
        state.search = ''; 
        state.listSearch = '';
    }
    if (typeof heroState !== 'undefined') {
        heroState.list = [];
    }
    
    const mSearch = document.getElementById('mainSearchInput');
    const lSearch = document.getElementById('listSearchInput');
    const cPanel = document.getElementById('configPanel');
    
    if (mSearch) mSearch.value = '';
    if (lSearch) lSearch.value = '';
    if (cPanel) cPanel.style.display = 'none';
    
    loadEPG();
}

async function loadEPG() {
    const urlInput = document.getElementById('urlInput');
    const urlRaw = urlInput ? urlInput.value.trim() : '';
    
    const grid = document.getElementById('grid');
    const listContainer = document.getElementById('listItemsContainer');

    // Si es la primera carga o está vacío, limpiamos las vistas y mostramos el loader animado
    if (typeof state !== 'undefined' && state.allChannels.length === 0) {
        if (grid) grid.innerHTML = ''; 
        if (listContainer) listContainer.innerHTML = ''; 
        showLoader();
    }
    
    // Array de proxies para saltear bloqueos de CORS (Cross-Origin Resource Sharing)
    const proxies = [ 
        "", 
        "https://api.allorigins.win/raw?url=", 
        "https://corsproxy.io/?url=", 
        "https://api.codetabs.com/v1/proxy?quest=" 
    ];
    let success = false; 
    let xmlText = "";
    
    // Bucle asincrónico que testea uno por uno los proxies hasta que uno devuelva el XML
    for (let proxy of proxies) {
        try {
            const targetUrl = proxy ? proxy + encodeURIComponent(urlRaw) : urlRaw;
            const resp = await fetch(targetUrl);
            if (resp.ok) {
                xmlText = await resp.text();
                // Validamos que la respuesta realmente tenga estructura de XML/Guía de TV
                if (xmlText.includes('<?xml') || xmlText.includes('<tv')) { 
                    success = true; 
                    break; 
                }
            }
        } catch (e) { 
            console.warn("Fallo con proxy: " + proxy); 
        }
    }
    
    // Si logramos obtener el texto del XML, disparamos el mapeo estructural (parseXML)
    if (success && xmlText) {
        try { 
            parseXML(xmlText); 
            hideLoader(); 
            return; 
        } catch(e) { 
            console.error("Error procesando XML:", e); 
        }
    }
    
    // Plan de contingencia: Si todo falla, ocultamos loader y plantamos mensaje de error en pantalla
    hideLoader();
    const errorMsg = `<div id="loading" style="color:var(--accent)">Error al cargar la URL. Asegúrate de que el enlace sea válido y público.</div>`;
    if (grid) grid.innerHTML = errorMsg; 
    if (listContainer) listContainer.innerHTML = errorMsg;
}
