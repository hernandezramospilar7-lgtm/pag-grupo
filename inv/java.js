class EfectosFreeFire {
    constructor() {
        this.efectosActivos = true;
        this.init();
    }
    
    init() {
        console.log('🎮 Efectos Free Fire Premium iniciados');
        
        // Efectos de carga inicial
        this.iniciarEfectosCarga();
        
        // Efectos de scroll
        this.iniciarEfectosScroll();
        
        // Efectos hover avanzados
        this.iniciarEfectosHover();
        
        // Animaciones de elementos
        this.iniciarAnimaciones();
        
        // Sistema de sonidos
        this.iniciarSistemaSonidos();
        
        // Efectos especiales
        this.iniciarEfectosEspeciales();
    }
    
    // Efectos durante la carga
    iniciarEfectosCarga() {
        // Secuencia de aparición
        const elementos = document.querySelectorAll('.main-container > *');
        elementos.forEach((el, index) => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }, 200 + (index * 100));
        });
        
        // Efecto de bienvenida
        setTimeout(() => {
            this.crearEfectoBienvenida();
        }, 1000);
    }
    
    // Efectos al hacer scroll
    iniciarEfectosScroll() {
        let ultimaPosicion = 0;
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.animarElementosScroll();
                    this.efectoParallax();
                    ticking = false;
                });
                ticking = true;
            }
            
            // Efecto de navbar
            const scrollActual = window.pageYOffset;
            const diferencia = scrollActual - ultimaPosicion;
            ultimaPosicion = scrollActual;
            
            if (Math.abs(diferencia) > 5) {
                this.efectoScrollVelocity(diferencia);
            }
        });
        
        // Revelar elementos al scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                }
            });
        }, { threshold: 0.1 });
        
        document.querySelectorAll('.stat-card, .feature-card, .testimonial-card').forEach(el => {
            observer.observe(el);
        });
    }
    
    // Animaciones de scroll
    animarElementosScroll() {
        const scrollY = window.pageYOffset;
        const velocidad = 0.5;
        
        document.querySelectorAll('.stat-card').forEach((card, index) => {
            const offset = scrollY * velocidad - (index * 100);
            card.style.transform = `translateY(${Math.sin(offset * 0.01) * 10}px)`;
        });
    }
    
    // Efecto parallax
    efectoParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        document.querySelectorAll('.feature-icon').forEach(icon => {
            icon.style.transform = `rotate(${rate * 0.1}deg)`;
        });
    }
    
    // Efecto de velocidad de scroll
    efectoScrollVelocity(velocidad) {
        const elementos = document.querySelectorAll('.logo, .stat-card');
        const intensidad = Math.min(Math.abs(velocidad) * 0.1, 10);
        
        elementos.forEach(el => {
            el.style.transform = `translateY(${velocidad > 0 ? intensidad : -intensidad}px)`;
            setTimeout(() => {
                el.style.transform = 'translateY(0)';
            }, 300);
        });
    }
    
    // Efectos hover avanzados
    iniciarEfectosHover() {
        // Efecto magnético en botones
        document.querySelectorAll('.btn-control, .cta-button').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const moveX = (x - centerX) / 20;
                const moveY = (y - centerY) / 20;
                
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
        
        // Efecto de seguimiento en cards
        document.querySelectorAll('.stat-card, .feature-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const rotateY = (x - centerX) / 25;
                const rotateX = (centerY - y) / 25;
                
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            });
            
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
            });
        });
        
        // Efecto de partículas en hover
        document.querySelectorAll('.feature-icon').forEach(icon => {
            icon.addEventListener('mouseenter', (e) => {
                this.crearParticulasIcono(e, icon);
            });
        });
    }
    
    // Animaciones automáticas
    iniciarAnimaciones() {
        // Contador animado
        this.animarContadores();
        
        // Efecto de pulso en elementos importantes
        setInterval(() => {
            document.querySelectorAll('.badge-ultra, .feature-badge').forEach(badge => {
                badge.style.animation = 'none';
                setTimeout(() => {
                    badge.style.animation = 'badgePulse 1.5s infinite';
                }, 10);
            });
        }, 5000);
        
        // Rotación de testimonios
        this.iniciarSliderTestimonios();
        
        // Efecto de texto que escribe
        this.efectoTextoEscribiendose();
    }
    
    // Animación de contadores
    animarContadores() {
        const contadores = document.querySelectorAll('.stat-number');
        
        contadores.forEach(contador => {
            const valorFinal = parseInt(contador.textContent.replace(/,/g, ''));
            let valorActual = 0;
            const incremento = Math.ceil(valorFinal / 100);
            const duracion = 2000;
            const paso = duracion / (valorFinal / incremento);
            
            const timer = setInterval(() => {
                valorActual += incremento;
                if (valorActual >= valorFinal) {
                    valorActual = valorFinal;
                    clearInterval(timer);
                }
                contador.textContent = valorActual.toLocaleString('es-ES');
            }, paso);
        });
    }
    
    // Slider de testimonios automático
    iniciarSliderTestimonios() {
        const testimonios = document.querySelectorAll('.testimonial-card');
        let indiceActual = 0;
        
        setInterval(() => {
            testimonios.forEach((testimonio, index) => {
                testimonio.style.opacity = index === indiceActual ? '1' : '0.5';
                testimonio.style.transform = index === indiceActual ? 'scale(1.05)' : 'scale(0.95)';
            });
            
            indiceActual = (indiceActual + 1) % testimonios.length;
        }, 5000);
    }
    
    // Efecto de texto que se escribe
    efectoTextoEscribiendose() {
        const textos = [
            "Únete a la comunidad más activa de Free Fire",
            "Torneos semanales con grandes premios",
            "Sorteos de diamantes y skins exclusivas",
            "Encuentra compañeros para ranked y casual"
        ];
        
        const elemento = document.querySelector('.cta-subtitle');
        if (!elemento) return;
        
        let textoIndex = 0;
        let charIndex = 0;
        let escribiendo = true;
        
        function escribir() {
            const textoActual = textos[textoIndex];
            
            if (escribiendo) {
                elemento.textContent = textoActual.substring(0, charIndex + 1);
                charIndex++;
                
                if (charIndex === textoActual.length) {
                    escribiendo = false;
                    setTimeout(escribir, 2000);
                } else {
                    setTimeout(escribir, 50);
                }
            } else {
                elemento.textContent = textoActual.substring(0, charIndex - 1);
                charIndex--;
                
                if (charIndex === 0) {
                    escribiendo = true;
                    textoIndex = (textoIndex + 1) % textos.length;
                    setTimeout(escribir, 500);
                } else {
                    setTimeout(escribir, 30);
                }
            }
        }
        
        escribir();
    }
    
    // Sistema de sonidos
    iniciarSistemaSonidos() {
        // Crear contexto de audio
        this.audioContext = null;
        
        // Inicializar solo después de interacción del usuario
        document.addEventListener('click', () => {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
        }, { once: true });
    }
    
    // Reproducir sonido
    reproducirSonido(tipo, frecuencia = 440, duracion = 0.3) {
        if (!this.audioContext || !this.efectosActivos) return;
        
        try {
            const oscillator = this.audioContext.createOscillator();
            const gainNode = this.audioContext.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(this.audioContext.destination);
            
            // Configurar según el tipo
            switch(tipo) {
                case 'click':
                    oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // Do
                    oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1); // Mi
                    break;
                case 'hover':
                    oscillator.frequency.setValueAtTime(frequencia, this.audioContext.currentTime);
                    oscillator.frequency.setValueAtTime(frequencia * 1.2, this.audioContext.currentTime + 0.05);
                    break;
                case 'success':
                    oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime); // Mi
                    oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.1); // Sol
                    oscillator.frequency.setValueAtTime(1046.50, this.audioContext.currentTime + 0.2); // Do alto
                    break;
            }
            
            gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duracion);
            
            oscillator.start();
            oscillator.stop(this.audioContext.currentTime + duracion);
        } catch (error) {
            console.log('🔇 Error de audio:', error);
        }
    }
    
    // Efectos especiales
    iniciarEfectosEspeciales() {
        // Efecto de bienvenida
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                this.reproducirSonido('success');
            }, 1500);
        });
        
        // Efecto al hacer clic en botones
        document.querySelectorAll('button, .btn-control').forEach(btn => {
            btn.addEventListener('click', () => {
                this.reproducirSonido('click');
                this.crearOndaClic(btn);
            });
        });
        
        // Efecto al pasar sobre elementos interactivos
        document.querySelectorAll('.feature-card, .stat-card').forEach(card => {
            card.addEventListener('mouseenter', () => {
                this.reproducirSonido('hover', 440 + Math.random() * 100);
            });
        });
        
        // Efecto de notificación periódica
        setInterval(() => {
            if (Math.random() > 0.7) {
                this.mostrarNotificacionSistema();
            }
        }, 30000);
    }
    
    // Crear onda de clic
    crearOndaClic(elemento) {
        const onda = document.createElement('div');
        onda.className = 'onda-clic';
        
        const rect = elemento.getBoundingClientRect();
        onda.style.cssText = `
            position: fixed;
            width: 100px;
            height: 100px;
            border: 3px solid var(--ff-gold);
            border-radius: 50%;
            top: ${rect.top + rect.height/2 - 50}px;
            left: ${rect.left + rect.width/2 - 50}px;
            pointer-events: none;
            z-index: 10000;
            animation: ondaExpand 0.6s ease-out forwards;
        `;
        
        document.body.appendChild(onda);
        
        setTimeout(() => onda.remove(), 600);
    }
    
    // Crear partículas para iconos
    crearParticulasIcono(event, icono) {
        for (let i = 0; i < 8; i++) {
            setTimeout(() => {
                const particula = document.createElement('div');
                const rect = icono.getBoundingClientRect();
                const colores = ['#FF0000', '#FFD700', '#00FF00', '#1E90FF'];
                
                particula.style.cssText = `
                    position: fixed;
                    width: 6px;
                    height: 6px;
                    background: ${colores[Math.floor(Math.random() * colores.length)]};
                    border-radius: 50%;
                    top: ${rect.top + rect.height/2}px;
                    left: ${rect.left + rect.width/2}px;
                    pointer-events: none;
                    z-index: 1000;
                `;
                
                document.body.appendChild(particula);
                
                // Animación
                const angulo = Math.random() * Math.PI * 2;
                const velocidad = 1 + Math.random() * 2;
                const dx = Math.cos(angulo) * velocidad;
                const dy = Math.sin(angulo) * velocidad;
                
                let posX = rect.left + rect.width/2;
                let posY = rect.top + rect.height/2;
                let opacidad = 1;
                
                function animar() {
                    posX += dx;
                    posY += dy;
                    opacidad -= 0.02;
                    
                    particula.style.left = posX + 'px';
                    particula.style.top = posY + 'px';
                    particula.style.opacity = opacidad;
                    
                    if (opacidad > 0) {
                        requestAnimationFrame(animar);
                    } else {
                        particula.remove();
                    }
                }
                
                animar();
            }, i * 50);
        }
    }
    
    // Crear efecto de bienvenida
    crearEfectoBienvenida() {
        // Texto de bienvenida
        const bienvenida = document.createElement('div');
        bienvenida.innerHTML = `
            <div style="
                position: fixed;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 30px 50px;
                border-radius: 20px;
                border: 3px solid var(--ff-gold);
                text-align: center;
                z-index: 10001;
                font-family: 'Orbitron', sans-serif;
                box-shadow: 0 0 50px rgba(255, 215, 0, 0.5);
                animation: aparecer 0.5s ease-out;
            ">
                <h2 style="color: var(--ff-gold); margin-bottom: 15px;">🎮 BIENVENIDO</h2>
                <p>¡Prepárate para la mejor experiencia Free Fire!</p>
                <button style="
                    background: linear-gradient(135deg, var(--ff-red), var(--ff-orange));
                    border: none;
                    color: white;
                    padding: 10px 30px;
                    border-radius: 25px;
                    margin-top: 20px;
                    cursor: pointer;
                    font-family: 'Orbitron', sans-serif;
                    font-weight: 600;
                " onclick="this.parentElement.remove()">
                    ¡ENTRAR!
                </button>
            </div>
        `;
        
        document.body.appendChild(bienvenida);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            if (bienvenida.parentNode) {
                bienvenida.style.animation = 'desaparecer 0.5s ease-out forwards';
                setTimeout(() => bienvenida.remove(), 500);
            }
        }, 3000);
    }
    
    // Mostrar notificación del sistema
    mostrarNotificacionSistema() {
        const notificaciones = [
            "🔥 Nuevo torneo iniciado",
            "🎉 ¡Nuevo jugador se unió!",
            "🏆 Torneo terminado - Revisa ganadores",
            "💎 Sorteo de diamantes en 1 hora",
            "👥 5 jugadores buscando equipo"
        ];
        
        const notificacion = document.createElement('div');
        notificacion.className = 'notificacion-sistema';
        notificacion.innerHTML = `
            <i class="fas fa-bell"></i>
            <span>${notificaciones[Math.floor(Math.random() * notificaciones.length)]}</span>
        `;
        
        document.body.appendChild(notificacion);
        
        // Animación
        setTimeout(() => {
            notificacion.style.right = '20px';
        }, 10);
        
        // Remover
        setTimeout(() => {
            notificacion.style.right = '-300px';
            setTimeout(() => notificacion.remove(), 500);
        }, 5000);
    }
    
    // API pública para otros scripts
    mostrarEfectoPersonalizado(tipo, opciones = {}) {
        switch(tipo) {
            case 'confeti':
                this.crearConfeti(opciones.x || window.innerWidth/2, opciones.y || window.innerHeight/2);
                break;
            case 'explosion':
                this.crearExplosion(opciones.x, opciones.y);
                break;
            case 'textoFlotante':
                this.crearTextoFlotante(opciones.texto, opciones.x, opciones.y);
                break;
        }
    }
    
    crearConfeti(x, y) {
        for(let i = 0; i < 30; i++) {
            setTimeout(() => this.crearParticulaConfeti(x, y), i * 30);
        }
    }
    
    crearParticulaConfeti(x, y) {
        const particula = document.createElement('div');
        const colores = ['#FF0000', '#FFD700', '#00FF00', '#1E90FF', '#8A2BE2'];
        const formas = ['circle', 'square', 'triangle'];
        const forma = formas[Math.floor(Math.random() * formas.length)];
        
        particula.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colores[Math.floor(Math.random() * colores.length)]};
            ${forma === 'circle' ? 'border-radius: 50%;' : ''}
            ${forma === 'triangle' ? `
                background: transparent;
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-bottom: 10px solid ${colores[Math.floor(Math.random() * colores.length)]};
            ` : ''}
            top: ${y}px;
            left: ${x}px;
            pointer-events: none;
            z-index: 10000;
            transform: rotate(${Math.random() * 360}deg);
        `;
        
        document.body.appendChild(particula);
        
        // Animación
        const angulo = Math.random() * Math.PI * 2;
        const velocidad = 2 + Math.random() * 3;
        const dx = Math.cos(angulo) * velocidad;
        const dy = Math.sin(angulo) * velocidad;
        const rotacion = (Math.random() - 0.5) * 10;
        
        let posX = x;
        let posY = y;
        let rot = 0;
        let opacidad = 1;
        
        function animar() {
            posX += dx;
            posY += dy;
            rot += rotacion;
            opacidad -= 0.01;
            
            particula.style.left = posX + 'px';
            particula.style.top = posY + 'px';
            particula.style.transform = `rotate(${rot}deg)`;
            particula.style.opacity = opacidad;
            
            if (opacidad > 0) {
                requestAnimationFrame(animar);
            } else {
                particula.remove();
            }
        }
        
        animar();
    }
}

// Inicializar efectos cuando cargue la página
document.addEventListener('DOMContentLoaded', () => {
    window.efectosFF = new EfectosFreeFire();
    console.log('✨ Efectos premium activados');
});

// Agregar estilos CSS para animaciones
const estilosEfectos = document.createElement('style');
estilosEfectos.textContent = `
    @keyframes ondaExpand {
        0% {
            transform: scale(0.1);
            opacity: 1;
            border-width: 3px;
        }
        100% {
            transform: scale(3);
            opacity: 0;
            border-width: 1px;
        }
    }
    
    @keyframes aparecer {
        from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
        to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
    }
    
    @keyframes desaparecer {
        from {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
        }
        to {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
        }
    }
    
    .notificacion-sistema {
        position: fixed;
        top: 20px;
        right: -300px;
        background: linear-gradient(135deg, var(--ff-red), var(--ff-orange));
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 15px;
        z-index: 10000;
        transition: right 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        border-left: 5px solid var(--ff-gold);
    }
    
    .notificacion-sistema i {
        font-size: 1.2rem;
    }
    
    .reveal {
        animation: revealUp 0.8s ease forwards;
    }
    
    @keyframes revealUp {
        from {
            opacity: 0;
            transform: translateY(50px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .onda-clic {
        pointer-events: none;
    }
`;
document.head.appendChild(estilosEfectos);

