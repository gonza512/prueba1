// assets/js/mascotas.js - CÓDIGO COMPLETO CORREGIDO
document.addEventListener('DOMContentLoaded', function() {
    const formMascota = document.getElementById('formMascota');
    const nombreInput = document.getElementById('nombreMascota');
    const tipoSelect = document.getElementById('tipo');
    const edadInput = document.getElementById('edad');
    const listaMascotas = document.getElementById('listaMascotas');

    console.log('Sistema de mascotas inicializado');

    // Cargar mascotas existentes al iniciar
    cargarMascotasExistentes();

    // Event listener para el formulario
    formMascota.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Formulario de mascota enviado');
        
        if (validarFormularioMascota()) {
            registrarMascota();
        }
    });

    // Validación en tiempo real para edad
    edadInput.addEventListener('input', function() {
        if (this.value < 0) {
            this.value = 0;
        }
    });

    function validarFormularioMascota() {
        let esValido = true;

        // Resetear clases de validación
        nombreInput.classList.remove('is-invalid', 'is-valid');
        tipoSelect.classList.remove('is-invalid', 'is-valid');
        edadInput.classList.remove('is-invalid', 'is-valid');

        // Validar nombre (mínimo 2 caracteres)
        const nombre = nombreInput.value.trim();
        if (nombre.length < 2) {
            nombreInput.classList.add('is-invalid');
            esValido = false;
        } else {
            nombreInput.classList.add('is-valid');
        }

        // Validar tipo (debe estar seleccionado)
        const tipo = tipoSelect.value;
        if (!tipo) {
            tipoSelect.classList.add('is-invalid');
            esValido = false;
        } else {
            tipoSelect.classList.add('is-valid');
        }

        // Validar edad (número positivo)
        const edad = parseInt(edadInput.value);
        if (isNaN(edad) || edad < 0 || edad > 30) {
            edadInput.classList.add('is-invalid');
            esValido = false;
        } else {
            edadInput.classList.add('is-valid');
        }

        return esValido;
    }

    function registrarMascota() {
        console.log('Registrando nueva mascota...');
        
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        
        if (!usuario) {
            alert(' Debes iniciar sesión para registrar mascotas');
            window.location.href = 'login.html';
            return;
        }

        const mascota = {
            id: Date.now(),
            nombre: nombreInput.value.trim(),
            tipo: tipoSelect.value,
            edad: parseInt(edadInput.value),
            propietario: usuario.rut,
            propietarioNombre: usuario.nombre,
            fechaRegistro: new Date().toISOString()
        };

        console.log('Mascota a registrar:', mascota);

        // Obtener mascotas existentes
        let mascotas = [];
        try {
            const mascotasStorage = localStorage.getItem('mascotas');
            if (mascotasStorage) {
                mascotas = JSON.parse(mascotasStorage);
            }
        } catch (error) {
            console.error('Error al leer mascotas:', error);
            mascotas = [];
        }

        // Agregar nueva mascota
        mascotas.push(mascota);
        
        // Guardar en localStorage
        try {
            localStorage.setItem('mascotas', JSON.stringify(mascotas));
            console.log('Mascota guardada exitosamente');
        } catch (error) {
            console.error('Error al guardar mascota:', error);
            alert('Error al guardar la mascota. Intenta nuevamente.');
            return;
        }

        // Actualizar lista en la interfaz
        agregarMascotaALista(mascota);

        // Limpiar formulario
        formMascota.reset();
        
        // Limpiar clases de validación
        nombreInput.classList.remove('is-valid');
        tipoSelect.classList.remove('is-valid');
        edadInput.classList.remove('is-valid');
        
        alert(` ¡${mascota.nombre} registrado(a) correctamente!`);
    }

    function cargarMascotasExistentes() {
        console.log('Cargando mascotas existentes...');
        
        const usuario = JSON.parse(localStorage.getItem('usuarioLogueado'));
        if (!usuario) {
            console.log('No hay usuario logueado');
            listaMascotas.innerHTML = '<li class="list-group-item text-warning">Inicia sesión para ver tus mascotas</li>';
            return;
        }

        let mascotas = [];
        try {
            const mascotasStorage = localStorage.getItem('mascotas');
            if (mascotasStorage) {
                mascotas = JSON.parse(mascotasStorage);
            }
        } catch (error) {
            console.error('Error al cargar mascotas:', error);
            return;
        }

        // Filtrar mascotas del usuario actual
        const mascotasUsuario = mascotas.filter(m => m.propietario === usuario.rut);

        // Limpiar lista
        listaMascotas.innerHTML = '';

        if (mascotasUsuario.length === 0) {
            listaMascotas.innerHTML = '<li class="list-group-item text-muted">No hay mascotas registradas</li>';
            return;
        }

        // Agregar cada mascota a la lista
        mascotasUsuario.forEach(mascota => {
            agregarMascotaALista(mascota);
        });
    }

    function agregarMascotaALista(mascota) {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center fade-in';
        li.innerHTML = `
            <div>
                <strong>${mascota.nombre}</strong> - ${mascota.tipo}
                <br>
                <small class="text-muted">Edad: ${mascota.edad} años</small>
            </div>
            <button class="btn btn-sm btn-outline-danger" onclick="eliminarMascota(${mascota.id})">
                🗑️ Eliminar
            </button>
        `;
        listaMascotas.appendChild(li);
    }
});

// Función global para eliminar mascotas
window.eliminarMascota = function(id) {
    if (!confirm('¿Estás seguro de eliminar esta mascota?')) {
        return;
    }

    let mascotas = [];
    try {
        const mascotasStorage = localStorage.getItem('mascotas');
        if (mascotasStorage) {
            mascotas = JSON.parse(mascotasStorage);
        }
    } catch (error) {
        console.error('Error al leer mascotas:', error);
        return;
    }

    // Filtrar la mascota a eliminar
    const nuevasMascotas = mascotas.filter(m => m.id !== id);
    
    // Guardar cambios
    localStorage.setItem('mascotas', JSON.stringify(nuevasMascotas));
    
    // Recargar la página para ver los cambios
    location.reload();
};