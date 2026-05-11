const API_URL = "http://localhost:3000/api";

async function cargarUsuarios() {
    const token = localStorage.getItem("token"); // Requisito: Uso de token [cite: 103]
    
    try {
        const response = await fetch(`${API_URL}/users`, {
            headers: { "Authorization": `Bearer ${token}` }
        });
        const result = await response.json();

        if (result.ok) {
            const tbody = document.getElementById("usersTableBody");
            tbody.innerHTML = "";

            result.data.forEach(user => {
                // Formato de fecha estandarizado [cite: 241]
                const fecha = new Date(user.createdAt).toLocaleDateString('es-CL');
                
                // Color de badge según rol [cite: 342]
                const badgeClass = user.role === 'admin' ? 'bg-danger' : 
                                   user.role === 'coach' ? 'bg-primary' : 'bg-success';

                tbody.innerHTML += `
                    <tr>
                        <td class="ps-3 text-muted">#${user.id}</td>
                        <td class="fw-bold">${user.full_name}</td>
                        <td>${user.email}</td>
                        <td><span class="badge ${badgeClass}">${user.role}</span></td>
                        <td>${fecha}</td>
                        <td class="text-end pe-3">
                            <button class="btn btn-outline-warning btn-sm me-2"><i class="bi bi-pencil"></i></button>
                            <button class="btn btn-outline-danger btn-sm" onclick="eliminarUsuario(${user.id})"><i class="bi bi-trash"></i></button>
                        </td>
                    </tr>`;
            });
        }
    } catch (error) {
        console.error("Error al conectar con la API", error);
    }
}

// Ejecutar al cargar si es admin
document.addEventListener("DOMContentLoaded", cargarUsuarios);
