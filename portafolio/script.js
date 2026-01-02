// ===== CONFIGURACIÓN GLOBAL =====
const CONFIG = {
    // DATOS PERSONALES ACTUALIZADOS
    nombre: "Alain",
    email: "danielalain559@gmail.com",  // ¡NUEVO EMAIL!
    ubicacion: "Santiago de Cuba, Cuba",
    
    // Configuración de animaciones
    animacionesHabilitadas: true,
    modoOscuroPorDefecto: false,
    
    // Textos para el efecto de escritura
    textosTyping: [
        "Frontend Developer",
        "HTML/CSS Specialist",
        "JavaScript Developer",
        "Web Designer"
    ]
};

// ===== VARIABLES GLOBALES =====
let modoOscuro = localStorage.getItem('modoOscuro') === 'true' || CONFIG.modoOscuroPorDefecto;
let menuAbierto = false;
let proyectosCargados = false;
let skillsCargados = false;

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('🚀 Portafolio de Alain cargado');
    console.log('📧 NUEVO EMAIL:', CONFIG.email);  // Confirma el cambio
    
    // Inicializar componentes
    inicializarTema();
    inicializarNavegacion();
    inicializarTypingEffect();
    inicializarProyectos();
    inicializarSkills();
    inicializarContacto();
    inicializarAnimaciones();
    inicializarScrollEffects();
    inicializarContadores();
    
    // Mostrar año actual en footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Mostrar notificación de bienvenida
    setTimeout(() => {
        mostrarNotificacion('¡Bienvenido a mi portafolio! 👨‍💻', 'info');
    }, 1000);
});

// ===== SISTEMA DE TEMA OSCURO/CLARO =====
function inicializarTema() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Aplicar tema guardado o por defecto
    aplicarTema(modoOscuro);
    
    // Evento del botón de tema
    themeToggle.addEventListener('click', toggleTema);
    
    // Efectos visuales
    themeToggle.addEventListener('mouseenter', () => {
        if (CONFIG.animacionesHabilitadas) {
            themeToggle.style.transform = 'rotate(15deg) scale(1.1)';
        }
    });
    
    themeToggle.addEventListener('mouseleave', () => {
        if (CONFIG.animacionesHabilitadas) {
            themeToggle.style.transform = 'rotate(0) scale(1)';
        }
    });
}

function aplicarTema(oscuro) {
    modoOscuro = oscuro;
    
    if (oscuro) {
        document.body.classList.add('dark-mode');
        document.querySelector('#themeToggle i').className = 'fas fa-sun';
        document.querySelector('#themeToggle i').title = 'Cambiar a modo claro';
    } else {
        document.body.classList.remove('dark-mode');
        document.querySelector('#themeToggle i').className = 'fas fa-moon';
        document.querySelector('#themeToggle i').title = 'Cambiar a modo oscuro';
    }
    
    localStorage.setItem('modoOscuro', oscuro);
}

function toggleTema() {
    aplicarTema(!modoOscuro);
    
    // Efecto de transición
    if (CONFIG.animacionesHabilitadas) {
        document.documentElement.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        setTimeout(() => {
            document.documentElement.style.transition = '';
        }, 500);
    }
    
    mostrarNotificacion(`Modo ${modoOscuro ? 'oscuro' : 'claro'} activado`, 'info');
}

// ===== NAVEGACIÓN =====
function inicializarNavegacion() {
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Menú móvil toggle
    menuToggle.addEventListener('click', function() {
        menuAbierto = !menuAbierto;
        navMenu.classList.toggle('active');
        this.classList.toggle('active');
        document.body.style.overflow = menuAbierto ? 'hidden' : '';
    });
    
    // Cerrar menú al hacer clic en enlace
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                
                // Cerrar menú móvil si está abierto
                if (menuAbierto) {
                    menuToggle.click();
                }
                
                // Scroll suave a la sección
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
                
                // Actualizar enlace activo
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Actualizar enlace activo al hacer scroll
    window.addEventListener('scroll', actualizarEnlaceActivo);
}

function actualizarEnlaceActivo() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPosition = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ===== EFECTO DE ESCRITURA (TYPING) =====
function inicializarTypingEffect() {
    const typingElement = document.getElementById('typingText');
    if (!typingElement) return;
    
    const textos = CONFIG.textosTyping;
    let textoIndex = 0;
    let caracterIndex = 0;
    let borrando = false;
    let velocidad = 100;
    
    function escribir() {
        const textoActual = textos[textoIndex];
        
        if (!borrando && caracterIndex <= textoActual.length) {
            typingElement.textContent = textoActual.substring(0, caracterIndex);
            caracterIndex++;
            velocidad = 100;
        } else if (borrando && caracterIndex >= 0) {
            typingElement.textContent = textoActual.substring(0, caracterIndex);
            caracterIndex--;
            velocidad = 50;
        } else {
            borrando = !borrando;
            if (!borrando) {
                textoIndex = (textoIndex + 1) % textos.length;
            }
            velocidad = 500;
        }
        
        setTimeout(escribir, velocidad);
    }
    
    // Iniciar efecto después de 1 segundo
    setTimeout(escribir, 1000);
}

// ===== PROYECTOS =====
function inicializarProyectos() {
    const proyectos = [
        {
            id: 1,
            titulo: "Tienda E-commerce",
            descripcion: "Tienda online responsive con carrito de compras y filtros de productos.",
            imagen: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "Responsive"],
            demo: "#",
            codigo: "#",
            categoria: "full"
        },
        {
            id: 2,
            titulo: "Dashboard Analytics",
            descripcion: "Panel de control con gráficos interactivos y visualización de datos.",
            imagen: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "Chart.js"],
            demo: "#",
            codigo: "#",
            categoria: "js"
        },
        {
            id: 3,
            titulo: "App de Clima",
            descripcion: "Aplicación de clima con geolocalización y pronóstico de 5 días.",
            imagen: "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "API"],
            demo: "#",
            codigo: "#",
            categoria: "js"
        },
        {
            id: 4,
            titulo: "Landing Page Moderna",
            descripcion: "Landing page con diseño moderno, animaciones y formulario de contacto.",
            imagen: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tecnologias: ["HTML5", "CSS3", "Animaciones"],
            demo: "#",
            codigo: "#",
            categoria: "html"
        },
        {
            id: 5,
            titulo: "Juego de Memoria",
            descripcion: "Juego interactivo de memoria con temporizador y sistema de puntuación.",
            imagen: "https://images.unsplash.com/photo-1611224883853-80b023f02d71?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tecnologias: ["HTML5", "CSS3", "JavaScript"],
            demo: "#",
            codigo: "#",
            categoria: "js"
        },
        {
            id: 6,
            titulo: "Portafolio Web",
            descripcion: "Portafolio web responsive con modo oscuro y efectos interactivos.",
            imagen: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
            tecnologias: ["HTML5", "CSS3", "JavaScript", "Responsive"],
            demo: "#",
            codigo: "#",
            categoria: "full"
        }
    ];
    
    const proyectosGrid = document.getElementById('projectsGrid');
    const filtros = document.querySelectorAll('.filter-btn');
    
    // Renderizar proyectos
    function renderizarProyectos(filtro = 'all') {
        proyectosGrid.innerHTML = '';
        
        const proyectosFiltrados = filtro === 'all' 
            ? proyectos 
            : proyectos.filter(p => p.categoria === filtro);
        
        proyectosFiltrados.forEach((proyecto, index) => {
            const proyectoElement = document.createElement('div');
            proyectoElement.className = 'project-card';
            proyectoElement.style.animationDelay = `${index * 0.1}s`;
            
            proyectoElement.innerHTML = `
                <div class="project-image">
                    <img src="${proyecto.imagen}" alt="${proyecto.titulo}" loading="lazy">
                    <div class="project-tags">
                        ${proyecto.tecnologias.map(tech => 
                            `<span class="project-tag">${tech}</span>`
                        ).join('')}
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${proyecto.titulo}</h3>
                    <p class="project-description">${proyecto.descripcion}</p>
                    <div class="project-links">
                        <a href="${proyecto.demo}" class="project-link" target="_blank" rel="noopener">
                            <i class="fas fa-external-link-alt"></i> Demo
                        </a>
                        <a href="${proyecto.codigo}" class="project-link" target="_blank" rel="noopener">
                            <i class="fab fa-github"></i> Código
                        </a>
                    </div>
                </div>
            `;
            
            proyectosGrid.appendChild(proyectoElement);
            
            // Animar cuando sea visible
            setTimeout(() => {
                proyectoElement.classList.add('visible');
            }, 100);
        });
        
        proyectosCargados = true;
    }
    
    // Filtros de proyectos
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Actualizar botón activo
            filtros.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Aplicar filtro
            const categoria = this.getAttribute('data-filter');
            renderizarProyectos(categoria);
            
            // Notificación
            mostrarNotificacion(`Mostrando proyectos: ${this.textContent}`, 'info');
        });
    });
    
    // Cargar proyectos iniciales
    renderizarProyectos();
}

// ===== HABILIDADES =====
function inicializarSkills() {
    const skills = [
        { nombre: "HTML5", nivel: 95, color: "#E34F26", icono: "fab fa-html5" },
        { nombre: "CSS3", nivel: 90, color: "#1572B6", icono: "fab fa-css3-alt" },
        { nombre: "JavaScript", nivel: 85, color: "#F7DF1E", icono: "fab fa-js" },
        { nombre: "Responsive Design", nivel: 92, color: "#2563eb", icono: "fas fa-mobile-alt" },
        { nombre: "UI/UX Design", nivel: 80, color: "#7C3AED", icono: "fas fa-paint-brush" },
        { nombre: "Git & GitHub", nivel: 85, color: "#F1502F", icono: "fab fa-git-alt" },
        { nombre: "Web Performance", nivel: 87, color: "#10B981", icono: "fas fa-tachometer-alt" },
        { nombre: "Accesibilidad", nivel: 88, color: "#3B82F6", icono: "fas fa-universal-access" }
    ];
    
    const skillsGrid = document.getElementById('skillsGrid');
    
    skills.forEach(skill => {
        const skillElement = document.createElement('div');
        skillElement.className = 'skill-item';
        
        skillElement.innerHTML = `
            <div class="skill-header">
                <div style="display: flex; align-items: center; gap: 10px;">
                    <i class="${skill.icono}" style="color: ${skill.color}; font-size: 1.2rem;"></i>
                    <span class="skill-name">${skill.nombre}</span>
                </div>
                <span class="skill-percent">${skill.nivel}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" 
                     data-level="${skill.nivel}"
                     style="background: linear-gradient(90deg, ${skill.color}, ${skill.color}dd)"></div>
            </div>
            <p class="skill-description">Dominio avanzado en ${skill.nombre.toLowerCase()}</p>
        `;
        
        skillsGrid.appendChild(skillElement);
    });
    
    skillsCargados = true;
    
    // Animar barras cuando sean visibles
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBars = entry.target.querySelectorAll('.skill-progress');
                skillBars.forEach(bar => {
                    const nivel = bar.getAttribute('data-level');
                    
                    if (CONFIG.animacionesHabilitadas) {
                        // Animación suave
                        let width = 0;
                        const intervalo = setInterval(() => {
                            if (width >= nivel) {
                                clearInterval(intervalo);
                            } else {
                                width++;
                                bar.style.width = width + '%';
                            }
                        }, 15);
                    } else {
                        bar.style.width = nivel + '%';
                    }
                });
                
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    observer.observe(skillsGrid);
}

// ===== CONTACTO =====
function inicializarContacto() {
    // Botón de copiar email
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        copyBtn.addEventListener('click', copiarEmail);
    }
    
    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', enviarFormulario);
        
        // Validación en tiempo real
        const inputs = contactForm.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', validarCampo);
            input.addEventListener('input', limpiarErrorCampo);
        });
    }
    
    // Botón de email directo
    const emailBtn = document.querySelector('.email-btn');
    if (emailBtn) {
        emailBtn.addEventListener('click', function() {
            mostrarNotificacion('Abriendo tu cliente de correo... ✉️', 'info');
        });
    }
}

function copiarEmail() {
    const email = CONFIG.email;  // Usa el nuevo email
    
    // Usar Clipboard API si está disponible
    if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email)
            .then(() => mostrarExitoCopiado())
            .catch(err => {
                console.error('Error al copiar:', err);
                copiarEmailFallback(email);
            });
    } else {
        copiarEmailFallback(email);
    }
}

function copiarEmailFallback(email) {
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    
    try {
        document.execCommand('copy');
        mostrarExitoCopiado();
    } catch (err) {
        console.error('Error al copiar:', err);
        mostrarNotificacion('Error al copiar email', 'error');
    }
    
    document.body.removeChild(textarea);
}

function mostrarExitoCopiado() {
    // Efecto visual en el botón
    const copyBtn = document.getElementById('copyEmailBtn');
    if (copyBtn) {
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i> ¡Copiado!';
        copyBtn.style.backgroundColor = '#10b981';
        copyBtn.style.borderColor = '#10b981';
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.style.backgroundColor = '';
            copyBtn.style.borderColor = '';
        }, 2000);
    }
    
    mostrarNotificacion('Email copiado al portapapeles 📋', 'success');
    
    // Efecto de confeti
    if (CONFIG.animacionesHabilitadas) {
        crearConfeti();
    }
}

function enviarFormulario(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const datos = Object.fromEntries(formData);
    
    // Validar formulario
    if (!validarFormularioCompleto(form)) {
        return;
    }
    
    // Mostrar estado de carga
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
    submitBtn.disabled = true;
    
    // Simular envío (en una implementación real, aquí harías fetch a un servidor)
    setTimeout(() => {
        // Crear enlace mailto con los datos del formulario
        const subject = `Mensaje de ${datos.name} desde tu portafolio`;
        const body = `Nombre: ${datos.name}%0D%0AEmail: ${datos.email}%0D%0A%0D%0AMensaje:%0D%0A${datos.message}`;
        const mailtoLink = `mailto:${CONFIG.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        // Abrir cliente de correo
        window.open(mailtoLink, '_blank');
        
        // Resetear formulario
        form.reset();
        
        // Restaurar botón
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Mostrar éxito
        mostrarNotificacion('¡Mensaje preparado! Abriendo tu cliente de correo... 🎉', 'success');
        
        // Confeti
        if (CONFIG.animacionesHabilitadas) {
            crearConfeti();
        }
    }, 1500);
}

function validarFormularioCompleto(form) {
    let valido = true;
    const inputs = form.querySelectorAll('[required]');
    
    inputs.forEach(input => {
        if (!validarCampoIndividual(input)) {
            valido = false;
        }
    });
    
    return valido;
}

function validarCampoIndividual(campo) {
    let valido = true;
    let mensaje = '';
    
    // Limpiar error anterior
    limpiarErrorCampo({ target: campo });
    
    // Validaciones
    if (campo.type === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(campo.value.trim())) {
            valido = false;
            mensaje = 'Por favor ingresa un email válido';
        }
    } else if (campo.type === 'text') {
        if (campo.value.trim().length < 2) {
            valido = false;
            mensaje = 'Debe tener al menos 2 caracteres';
        }
    } else if (campo.tagName === 'TEXTAREA') {
        if (campo.value.trim().length < 10) {
            valido = false;
            mensaje = 'El mensaje es muy corto (mínimo 10 caracteres)';
        }
    }
    
    // Mostrar error si existe
    if (!valido) {
        mostrarErrorCampo(campo, mensaje);
    }
    
    return valido;
}

function validarCampo(e) {
    validarCampoIndividual(e.target);
}

function mostrarErrorCampo(campo, mensaje) {
    campo.classList.add('error');
    campo.style.borderColor = '#ef4444';
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-mensaje';
    errorElement.textContent = mensaje;
    errorElement.style.cssText = `
        color: #ef4444;
        font-size: 0.875rem;
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 5px;
    `;
    
    errorElement.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${mensaje}`;
    
    campo.parentNode.appendChild(errorElement);
}

function limpiarErrorCampo(e) {
    const campo = e.target;
    campo.classList.remove('error');
    campo.style.borderColor = '';
    
    const errorElement = campo.parentNode.querySelector('.error-mensaje');
    if (errorElement) {
        errorElement.remove();
    }
}

// ===== ANIMACIONES Y EFECTOS VISUALES =====
function inicializarAnimaciones() {
    if (!CONFIG.animacionesHabilitadas) return;
    
    // Animación de elementos al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    // Observar elementos animables
    document.querySelectorAll('.skill-item, .project-card, .contact-method').forEach(el => {
        observer.observe(el);
    });
}

function inicializarScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    // Mostrar/ocultar botón "volver arriba"
    window.addEventListener('scroll', function() {
        // Botón volver arriba
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Efecto parallax en hero
        const heroContent = document.querySelector('.hero-text');
        if (heroContent && window.scrollY < 500) {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            heroContent.style.transform = `translateY(${rate}px)`;
        }
    });
    
    // Botón "volver arriba"
    backToTop.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

function inicializarContadores() {
    const contadores = document.querySelectorAll('.stat-number');
    
    contadores.forEach(contador => {
        const objetivo = +contador.getAttribute('data-count');
        const duracion = 2000;
        const incremento = objetivo / (duracion / 16);
        
        let actual = 0;
        
        const actualizarContador = () => {
            actual += incremento;
            
            if (actual < objetivo) {
                contador.textContent = Math.floor(actual);
                requestAnimationFrame(actualizarContador);
            } else {
                contador.textContent = objetivo;
            }
        };
        
        // Iniciar cuando sea visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    actualizarContador();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(contador);
    });
}

// ===== NOTIFICACIONES =====
function mostrarNotificacion(mensaje, tipo = 'info') {
    const container = document.getElementById('notificationContainer');
    if (!container) return;
    
    const notificacion = document.createElement('div');
    notificacion.className = `notification ${tipo}`;
    
    // Icono según tipo
    let icono = 'fa-info-circle';
    if (tipo === 'success') icono = 'fa-check-circle';
    if (tipo === 'error') icono = 'fa-exclamation-circle';
    if (tipo === 'warning') icono = 'fa-exclamation-triangle';
    
    notificacion.innerHTML = `
        <i class="fas ${icono}"></i>
        <span>${mensaje}</span>
    `;
    
    container.appendChild(notificacion);
    
    // Remover después de 4 segundos
    setTimeout(() => {
        notificacion.style.animation = 'slideInRight 0.3s ease reverse forwards';
        setTimeout(() => notificacion.remove(), 300);
    }, 4000);
}

// ===== CONFETI =====
function crearConfeti() {
    const confetiContainer = document.createElement('div');
    confetiContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 9998;
    `;
    
    document.body.appendChild(confetiContainer);
    
    // Colores
    const colores = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];
    
    // Crear confeti
    for (let i = 0; i < 100; i++) {
        const confeti = document.createElement('div');
        confeti.style.cssText = `
            position: absolute;
            width: ${Math.random() * 10 + 5}px;
            height: ${Math.random() * 10 + 5}px;
            background: ${colores[Math.floor(Math.random() * colores.length)]};
            top: -20px;
            left: ${Math.random() * 100}%;
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            opacity: ${Math.random() * 0.7 + 0.3};
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        confetiContainer.appendChild(confeti);
        
        // Animación
        const animacion = confeti.animate([
            {
                transform: `translate(0, 0) rotate(0deg)`,
                opacity: 1
            },
            {
                transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 50}px) rotate(${Math.random() * 720}deg)`,
                opacity: 0
            }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
        });
        
        // Remover después de la animación
        animacion.onfinish = () => confeti.remove();
    }
    
    // Remover contenedor
    setTimeout(() => confetiContainer.remove(), 3000);
}

// ===== EXPORTAR FUNCIONES GLOBALES =====
window.PortfolioAlain = {
    copiarEmail,
    toggleTema,
    mostrarNotificacion
};

console.log('✅ Portafolio cargado correctamente');
console.log('💻 Tecnologías: HTML, CSS, JavaScript');
console.log('📧 NUEVO EMAIL DE CONTACTO:', CONFIG.email);