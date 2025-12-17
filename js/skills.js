// Animaciones para la sección de habilidades
document.addEventListener('DOMContentLoaded', function() {
    // Animación de barras de progreso al hacer scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target.style.width;
                entry.target.style.width = '0%';
                setTimeout(() => {
                    entry.target.style.width = progress;
                }, 300);
            }
        });
    }, { threshold: 0.5 });
    
    skillBars.forEach(bar => {
        observer.observe(bar);
    });

    // Animación para círculos de progreso
    const progressCircles = document.querySelectorAll('.progress-circle');
    
    const circleObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'progressFill 1.5s ease-out forwards';
            }
        });
    }, { threshold: 0.5 });
    
    progressCircles.forEach(circle => {
        circleObserver.observe(circle);
    });
});
