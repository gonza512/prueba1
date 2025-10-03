// assets/js/app.js - VERSIÓN MEJORADA CON MEJOR CONTROL DE INTERFAZ
document.addEventListener('DOMContentLoaded', function() {
    console.log(' app.js cargado - Iniciando sistema...');
    
    inicializarSistema();
});

function inicializarSistema() {
    // Verificar autenticación
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    console.log(' Estado de autenticación:', usuario ? 'LOGGED IN' : 'NOT LOGGED');
    console.log(' Datos usuario:', usuario);
    
    // Actualizar interfaz inmediatamente
    actualizarInterfazLogin();
    
    // Configurar eventos
    configurarEventListeners();
    
    // Proteger rutas
    protegerRutas();
}

function actualizarInterfazLogin() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    const loginMenu = document.getElementById('loginMenu');
    const logoutContainer = document.getElementById('logoutContainer');
    const perfilLink = document.getElementById('perfil-link');
    const adminMenu = document.getElementById('adminMenu');

    console.log(' Actualizando elementos de interfaz:');
    console.log('- loginMenu:', loginMenu);
    console.log('- logoutContainer:', logoutContainer);
    console.log('- perfilLink:', perfilLink);

    if (usuario) {
        //  USUARIO LOGUEADO - Mostrar logout, ocultar login
        console.log(' Configurando interfaz para USUARIO LOGUEADO');
        
        if (loginMenu) {
            loginMenu.classList.add('d-none');
            console.log(' Login menu OCULTADO');
        }
        
        if (logoutContainer) {
            logoutContainer.classList.remove('d-none');
            console.log(' Logout container MOSTRADO');
        }
        
        if (perfilLink) {
            perfilLink.style.display = 'block';
            console.log(' Perfil link MOSTRADO');
        }
        
        // Cerrar modal de login requerido si está abierto
        cerrarModalLoginRequerido();
        
    } else {
        //  USUARIO NO LOGUEADO - Mostrar login, ocultar logout
        console.log(' Configurando interfaz para USUARIO NO LOGUEADO');
        
        if (loginMenu) {
            loginMenu.classList.remove('d-none');
            console.log(' Login menu MOSTRADO');
        }
        
        if (logoutContainer) {
            logoutContainer.classList.add('d-none');
            console.log(' Logout container OCULTADO');
        }
        
        if (perfilLink) {
            perfilLink.style.display = 'none';
            console.log(' Perfil link OCULTADO');
        }
    }
}

function configurarEventListeners() {
    console.log(' Configurando event listeners...');
    
    // Botón de logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log(' Cerrando sesión...');
            localStorage.removeItem('usuarioLogueado');
            alert('Sesión cerrada correctamente');
            location.reload();
        });
        console.log(' Logout button configurado');
    } else {
        console.log(' Logout button no encontrado');
    }

    // Enlace de perfil
    const perfilLink = document.getElementById('perfil-link');
    if (perfilLink) {
        perfilLink.addEventListener('click', function(e) {
            e.preventDefault();
            mostrarPerfil();
        });
        console.log(' Perfil link configurado');
    }
}

function protegerRutas() {
    const rutasProtegidas = ['mascotas.html', 'consultas.html', 'resenas.html', 'inventario.html'];
    const paginaActual = window.location.pathname.split('/').pop();
    
    console.log('Protegiendo ruta:', paginaActual);
    
    if (rutasProtegidas.includes(paginaActual)) {
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        
        if (!usuario) {
            console.log(' Acceso denegado - Mostrando modal');
            // El modal se muestra automáticamente por el HTML
            mostrarModalLoginRequerido();
        } else {
            console.log(' Acceso permitido');
        }
    }
}

function mostrarModalLoginRequerido() {
    const modalElement = document.getElementById('loginRequiredModal');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

function cerrarModalLoginRequerido() {
    const modalElement = document.getElementById('loginRequiredModal');
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        if (modal) {
            modal.hide();
        }
    }
}

function mostrarPerfil() {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
    if (!usuario) {
        alert('Debes iniciar sesión para ver tu perfil');
        return;
    }

    console.log(' Mostrando perfil de:', usuario.nombre);

    // Actualizar modal con datos
    const nombreElement = document.getElementById('perfil-modal-nombre');
    const rutElement = document.getElementById('perfil-modal-rut');
    const correoElement = document.getElementById('perfil-modal-correo');
    
    if (nombreElement) nombreElement.textContent = usuario.nombre;
    if (rutElement) rutElement.textContent = usuario.rut;
    if (correoElement) correoElement.textContent = usuario.correo;

    // Mostrar modal
    const modalElement = document.getElementById('modal-perfil');
    if (modalElement) {
        const modal = new bootstrap.Modal(modalElement);
        modal.show();
    }
}

// Función global para debugging
window.debugAuth = function() {
    console.log('=== DEBUG AUTH ===');
    console.log('Usuario logueado:', JSON.parse(localStorage.getItem('usuarioLogueado')));
    console.log('Todos los usuarios:', JSON.parse(localStorage.getItem('usuarios') || '[]'));
    console.log('Login menu:', document.getElementById('loginMenu'));
    console.log('Logout container:', document.getElementById('logoutContainer'));
    console.log('==================');
};