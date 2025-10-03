// assets/js/registro.js
document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registroForm');
    const nombreInput = document.getElementById('nombre');
    const rutInput = document.getElementById('rut');
    const correoInput = document.getElementById('correo');
    const contrasenaInput = document.getElementById('contrasena');

    // Función para validar RUT chileno
    function validarRUT(rut) {
        if (!/^[0-9]+-[0-9kK]{1}$/.test(rut)) return false;
        
        const [numeros, digitoVerificador] = rut.split('-');
        if (numeros.length < 7 || numeros.length > 8) return false;
        
        // Algoritmo de validación de RUT
        let suma = 0;
        let multiplicador = 2;
        
        for (let i = numeros.length - 1; i >= 0; i--) {
            suma += parseInt(numeros.charAt(i)) * multiplicador;
            multiplicador = multiplicador === 7 ? 2 : multiplicador + 1;
        }
        
        const resto = suma % 11;
        const dvEsperado = resto === 0 ? '0' : resto === 1 ? 'k' : String(11 - resto);
        
        return dvEsperado === digitoVerificador.toLowerCase();
    }

    // Función para validar correo con dominios específicos
    function validarCorreo(correo) {
        const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return regex.test(correo);
    }

    // Validación en tiempo real para RUT
    rutInput.addEventListener('input', function() {
        if (rutInput.value.trim() === '') {
            rutInput.classList.remove('is-invalid');
            rutInput.classList.remove('is-valid');
        } else if (!validarRUT(rutInput.value.trim())) {
            rutInput.classList.add('is-invalid');
            rutInput.classList.remove('is-valid');
        } else {
            rutInput.classList.remove('is-invalid');
            rutInput.classList.add('is-valid');
        }
    });

    // Validación en tiempo real para correo
    correoInput.addEventListener('input', function() {
        if (correoInput.value.trim() === '') {
            correoInput.classList.remove('is-invalid');
            correoInput.classList.remove('is-valid');
        } else if (!validarCorreo(correoInput.value.trim())) {
            correoInput.classList.add('is-invalid');
            correoInput.classList.remove('is-valid');
        } else {
            correoInput.classList.remove('is-invalid');
            correoInput.classList.add('is-valid');
        }
    });

    // Validación en tiempo real para nombre
    nombreInput.addEventListener('input', function() {
        if (nombreInput.value.trim() === '') {
            nombreInput.classList.add('is-invalid');
            nombreInput.classList.remove('is-valid');
        } else {
            nombreInput.classList.remove('is-invalid');
            nombreInput.classList.add('is-valid');
        }
    });

    contrasenaInput.addEventListener('input', function() {
        if (contrasenaInput.value.trim() === '') {
            contrasenaInput.classList.add('is-invalid');
            contrasenaInput.classList.remove('is-valid');
        } else {
            contrasenaInput.classList.remove('is-invalid');
            contrasenaInput.classList.add('is-valid');
        }
    });

    registroForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let esValido = true;

        // Validar nombre
        if (nombreInput.value.trim() === '') {
            nombreInput.classList.add('is-invalid');
            esValido = false;
        } else {
            nombreInput.classList.remove('is-invalid');
        }

        // Validar RUT
        if (!validarRUT(rutInput.value.trim())) {
            rutInput.classList.add('is-invalid');
            esValido = false;
        } else {
            rutInput.classList.remove('is-invalid');
        }

        // Validar correo
        if (!validarCorreo(correoInput.value.trim())) {
            correoInput.classList.add('is-invalid');
            esValido = false;
        } else {
            correoInput.classList.remove('is-invalid');
        }

        // Validar contraseña
        if (contrasenaInput.value.trim() === '') {
            contrasenaInput.classList.add('is-invalid');
            esValido = false;
        } else {
            contrasenaInput.classList.remove('is-invalid');
        }


        //guardamos el usuario
        if (esValido) {
            const usuario = {
                nombre: nombreInput.value.trim(),
                rut: rutInput.value.trim(),
                correo: correoInput.value.trim(),
                contrasena: contrasenaInput.value
            };
            
            localStorage.setItem('usuarioRegistrado', JSON.stringify(usuario));
            
            alert('Registro exitoso! Ahora puedes iniciar sesión.');
            window.location.href = 'login.html';
        }
    });
});