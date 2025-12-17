// Filtrado de proyectos
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    const categories = card.getAttribute('data-categories');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 300);
                    }
                }
            });
        });
    });
    
    // Modal para detalles de proyectos
    const projectDetailButtons = document.querySelectorAll('.project-detail-btn');
    
    projectDetailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });
});

function showProjectDetails(projectId) {
    // Aquí puedes implementar un modal con detalles extendidos del proyecto
    // Por ahora mostraremos una alerta como placeholder
    const projectTitles = {
        1: "Sistema de Servicio Social",
        2: "Sistema de Conducta Estudiantil", 
        3: "Sitio Web de Matemáticas"
    };
    
    alert(`Detalles del proyecto: ${projectTitles[projectId]}\n\nEsta funcionalidad puede expandirse para mostrar:\n- Capturas de pantalla\n- Descripción técnica detallada\n- Desafíos superados\n- Tecnologías específicas utilizadas`);
}
