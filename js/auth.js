const API_URL = "http://localhost:3000/api";

// Manejo de Login
document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('error-msg');

    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const result = await response.json();

        if (result.ok) {
            localStorage.setItem('token', result.data.token); // Guardar JWT [cite: 103]
            localStorage.setItem('userRole', result.data.user.role);
            
            // Redirección según rol [cite: 60]
            if (result.data.user.role === 'admin') window.location.href = 'admin.html';
            else window.location.href = 'perfil.html';
        } else {
            errorDiv.textContent = result.message; // Validación sin alert 
        }
    } catch (err) {
        errorDiv.textContent = "Error al conectar con el servidor.";
    }
});
