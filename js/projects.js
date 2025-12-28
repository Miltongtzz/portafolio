// project.js - VERSIÓN CON REDIRECCIÓN
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    const projectDetailButtons = document.querySelectorAll('.project-detail-btn');
    
    // Filtrado de proyectos
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
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
    
    // Redirección a páginas de proyectos
    projectDetailButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const projectId = this.getAttribute('data-project');
            const projectTitle = this.getAttribute('data-title');
            
            // Crear URL amigable
            const projectSlug = projectTitle
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            
            // Redirigir a la página del proyecto
            const projectUrl = `/proyectos/${projectSlug}.html`;
            
            // Mostrar mensaje de carga
            const originalText = this.innerHTML;
            this.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Cargando...';
            this.disabled = true;
            
            // Redirección con delay para mostrar animación
            setTimeout(() => {
                window.location.href = projectUrl;
            }, 500);
            
            // Fallback después de 3 segundos
            setTimeout(() => {
                this.innerHTML = originalText;
                this.disabled = false;
                alert('Error al cargar el proyecto. Por favor, intenta nuevamente.');
            }, 3000);
        });
    });
    
    // Efectos hover mejorados para tarjetas
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Función para crear páginas de proyectos dinámicamente
function createProjectPages() {
    const projects = [
        {
            id: 1,
            title: "Sistema de Servicio Social",
            slug: "sistema-servicio-social",
            description: "Sistema completo para gestión de servicio social",
            technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
            githubUrl: "#",
            liveUrl: "#",
            images: [] // URLs de imágenes
        },
        {
            id: 2,
            title: "Sistema de Conducta Estudiantil", 
            slug: "sistema-conducta-estudiantil",
            description: "Sistema para seguimiento de conducta estudiantil",
            technologies: ["HTML", "CSS", "JavaScript", "PHP"],
            githubUrl: "#",
            liveUrl: "#",
            images: []
        },
        {
            id: 3,
            title: "Sitio Web de Matemáticas",
            slug: "sitio-web-matematicas",
            description: "Plataforma educativa para aprendizaje de matemáticas",
            technologies: ["HTML", "CSS", "JavaScript"],
            githubUrl: "#",
            liveUrl: "#",
            images: []
        }
    ];
    
    // Guardar datos en localStorage para usar en las páginas individuales
    localStorage.setItem('portfolioProjects', JSON.stringify(projects));
}

// Inicializar páginas de proyectos al cargar
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createProjectPages);
} else {
    createProjectPages();
}
