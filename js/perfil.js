async function cargarPerfil() {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/auth/me`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });
    const result = await response.json();

    if (result.ok) {
        document.getElementById('profileName').value = result.data.full_name;
        document.getElementById('profileEmail').value = result.data.email;
        document.getElementById('profileEmail').disabled = true; // No pueden cambiar correo [cite: 87]
    }
}
