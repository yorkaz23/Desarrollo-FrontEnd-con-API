const API_URL = "http://localhost:3000/api";

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // 1. Evita que la página recargue
    console.log("🟢 Paso 1: Botón presionado y recarga evitada.");

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-msg');
    
    console.log(`🟢 Paso 2: Datos capturados -> Email: ${email} | Pass: ${password}`);

    try {
        console.log("🟢 Paso 3: Intentando conectar con el backend...");
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: password })
        });

        console.log("🟢 Paso 4: El servidor respondió con estado:", response.status);
        const result = await response.json();
        console.log("🟢 Paso 5: Lo que dice el backend es:", result);

        if (result.ok) {
            console.log("🎉 ¡ÉXITO! Guardando token...");
            localStorage.setItem('token', result.data.token);
            localStorage.setItem('role', result.data.user.role);
            
            errorDiv.className = "text-success small mb-3 text-center";
            errorDiv.textContent = "¡Conectado! Redirigiendo...";
            
            // Esperamos 1 segundo para que veas el mensaje antes de cambiar de página
            setTimeout(() => {
                if (result.data.user.role === 'admin') window.location.href = 'admin.html';
                else window.location.href = 'perfil.html';
            }, 1000);

        } else {
            console.warn("⚠️ Error del backend:", result.message);
            errorDiv.textContent = result.message;
        }
    } catch (err) {
        console.error("❌ Paso 6: ERROR CRÍTICO DE CONEXIÓN:", err);
        errorDiv.textContent = "Error: El backend está apagado o la ruta está mal.";
    }
});
