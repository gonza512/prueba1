// assets/js/login.js - VERSIÓN SUPER SIMPLE QUE SÍ FUNCIONA
document.addEventListener('DOMContentLoaded', function() {
    console.log(' login.js cargado');
    
    const loginForm = document.getElementById('loginForm');
    
    if (!loginForm) {
        console.log('No se encontró el formulario de login');
        return;
    }

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log(' Procesando login...');
        
        // Obtener valores
        const correo = document.getElementById('correo').value;
        const contrasena = document.getElementById('contrasena').value;
        
        console.log('Datos ingresados:', { correo, contrasena });

        // Validación MUY básica
        if (!correo || !contrasena) {
            alert('❌ Por favor ingresa correo y contraseña');
            return;
        }

        // Buscar en usuarios registrados
        const usuarios = JSON.parse(localStorage.getItem('usuarios') || '[]');
        console.log('Usuarios en sistema:', usuarios);
        
        const usuarioEncontrado = usuarios.find(u => 
            u.correo === correo && u.contrasena === contrasena
        );

        if (usuarioEncontrado) {
            //  LOGIN EXITOSO
            console.log(' Usuario encontrado:', usuarioEncontrado);
            localStorage.setItem('usuarioLogueado', JSON.stringify(usuarioEncontrado));
            
            alert(' ¡Login exitoso! Bienvenido ' + usuarioEncontrado.nombre);
            window.location.href = 'index.html';
            
        } else {
            //  LOGIN FALLIDO - Crear usuario automáticamente
            console.log(' Usuario no encontrado, creando uno nuevo...');
            
            if (confirm('¿No tienes cuenta? Se creará un usuario automáticamente con estos datos.')) {
                const nuevoUsuario = {
                    nombre: "Usuario " + Math.floor(Math.random() * 1000),
                    rut: "12345678-9",
                    correo: correo,
                    contrasena: contrasena,
                    fechaRegistro: new Date().toISOString()
                };
                
                // Guardar nuevo usuario
                usuarios.push(nuevoUsuario);
                localStorage.setItem('usuarios', JSON.stringify(usuarios));
                localStorage.setItem('usuarioLogueado', JSON.stringify(nuevoUsuario));
                
                alert(' ¡Usuario creado y sesión iniciada!');
                window.location.href = 'index.html';
            }
        }
    });
});