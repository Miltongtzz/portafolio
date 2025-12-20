// form.js - VERSIÓN SUPER SIMPLE Y FUNCIONAL
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ form.js cargado');
    
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const formStatus = document.getElementById('form-status');
    
    if (!contactForm) {
        console.error('❌ No se encontró el formulario');
        return;
    }
    
    console.log('✅ Formulario encontrado');
    
    // Desactivar validación HTML nativa
    contactForm.setAttribute('novalidate', true);
    
    // Elementos del formulario
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    
    // Verificar que todos los inputs existan
    if (!nameInput || !emailInput || !subjectInput || !messageInput) {
        console.error('❌ Faltan inputs en el formulario');
        return;
    }
    
    console.log('✅ Todos los inputs encontrados');
    
    // Función para mostrar error
    function showError(input, message) {
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.classList.remove('hidden');
            errorDiv.style.display = 'block';
        }
        
        input.classList.add('border-red-500', 'focus:ring-red-500');
        input.classList.remove('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
        
        console.log(`❌ Error en ${input.id}: ${message}`);
    }
    
    // Función para limpiar error
    function clearError(input) {
        const errorDiv = document.getElementById(`${input.id}-error`);
        if (errorDiv) {
            errorDiv.classList.add('hidden');
            errorDiv.style.display = 'none';
        }
        
        input.classList.remove('border-red-500', 'focus:ring-red-500');
        input.classList.add('border-gray-300', 'dark:border-gray-700', 'focus:ring-blue-500');
    }
    
    // Validar email
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Validar campo individual
    function validateField(input) {
        const value = input.value.trim();
        
        // Limpiar error primero
        clearError(input);
        
        // Si está vacío
        if (!value) {
            showError(input, 'Este campo es requerido');
            return false;
        }
        
        // Validaciones específicas por tipo
        if (input.type === 'email') {
            if (!isValidEmail(value)) {
                showError(input, 'Por favor ingresa un email válido');
                return false;
            }
        }
        
        // Validar longitud mínima para asunto y mensaje
        if (input.id === 'subject' && value.length < 5) {
            showError(input, 'Mínimo 5 caracteres');
            return false;
        }
        
        if (input.id === 'message' && value.length < 10) {
            showError(input, 'Mínimo 10 caracteres');
            return false;
        }
        
        // Para NOMBRE: acepta cualquier cosa con al menos 2 caracteres
        if (input.id === 'name' && value.length < 2) {
            showError(input, 'Mínimo 2 caracteres');
            return false;
        }
        
        return true;
    }
    
    // Validar todo el formulario
    function validateForm() {
        console.log('🔍 Validando formulario...');
        
        const fields = [nameInput, emailInput, subjectInput, messageInput];
        let isValid = true;
        let firstInvalidField = null;
        
        // Limpiar todos los errores primero
        fields.forEach(field => clearError(field));
        
        // Validar cada campo
        fields.forEach(field => {
            if (!validateField(field)) {
                isValid = false;
                if (!firstInvalidField) {
                    firstInvalidField = field;
                }
            }
        });
        
        console.log(`✅ Formulario ${isValid ? 'VÁLIDO' : 'INVÁLIDO'}`);
        return { isValid, firstInvalidField };
    }
    
    // Mostrar estado
    function showStatus(message, type) {
        if (!formStatus) return;
        
        formStatus.textContent = message;
        formStatus.className = 'p-4 rounded-lg mt-4';
        
        // Colores
        if (type === 'success') {
            formStatus.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300');
        } else if (type === 'error') {
            formStatus.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300');
        } else if (type === 'info') {
            formStatus.classList.add('bg-blue-100', 'text-blue-700', 'border', 'border-blue-300');
        }
        
        formStatus.classList.remove('hidden');
    }
    
    // Evento de envío
    contactForm.addEventListener('submit', function(e) {
        console.log('🚀 Intentando enviar formulario...');
        e.preventDefault(); // Siempre prevenir para validar primero
        
        const validation = validateForm();
        
        if (!validation.isValid) {
            console.log('❌ Formulario inválido - mostrando errores');
            showStatus('Por favor, corrige los errores en el formulario', 'error');
            
            if (validation.firstInvalidField) {
                validation.firstInvalidField.focus();
            }
            
            return;
        }
        
        console.log('✅ Formulario válido - procediendo con envío');
        
        // Mostrar estado de carga
        submitBtn.disabled = true;
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Enviando...';
        
        showStatus('Enviando tu mensaje...', 'info');
        
        // Preparar datos para FormSubmit
        const formData = new FormData(contactForm);
        
        // Enviar usando FormSubmit
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            console.log('📨 Respuesta recibida:', response.status);
            
            if (response.ok) {
                // Redirigir a la página de gracias
                window.location.href = 'https://miltongtzz.github.io/portafolio/gracias.html';
            } else {
                throw new Error('Error en el servidor');
            }
        })
        .catch(error => {
            console.error('❌ Error en el envío:', error);
            
            // Fallback: enviar el formulario tradicionalmente
            showStatus('Error al enviar. Intentando nuevamente...', 'error');
            
            setTimeout(() => {
                // Quitar el event listener temporalmente para evitar loop
                contactForm.removeEventListener('submit', arguments.callee);
                // Enviar de forma tradicional
                contactForm.submit();
            }, 2000);
        })
        .finally(() => {
            // Restaurar botón después de 5 segundos si hubo error
            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 5000);
        });
    });
    
    // Limpiar errores cuando el usuario escribe
    const allInputs = [nameInput, emailInput, subjectInput, messageInput];
    allInputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this);
        });
        
        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
    
    console.log('✅ Form.js configurado correctamente');
    
    // DEBUG: función para probar
    window.testForm = function(testName) {
        console.log('🧪 Probando formulario...');
        
        // Simular datos
        if (testName === 'bueno') {
            nameInput.value = 'Juan';
            emailInput.value = 'juan@test.com';
            subjectInput.value = 'Consulta de prueba';
            messageInput.value = 'Este es un mensaje de prueba con más de 10 caracteres';
            console.log('✅ Datos de prueba cargados');
        } else if (testName === 'malo') {
            nameInput.value = 'J'; // Solo 1 carácter
            emailInput.value = 'noemail';
            subjectInput.value = 'Hola';
            messageInput.value = 'Corto';
            console.log('❌ Datos inválidos cargados');
        }
        
        // Validar
        validateForm();
    };
});
