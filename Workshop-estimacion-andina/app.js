/* =====================================================
   WORKSHOP PRESENTATION ENGINE
   Navigation · Fullscreen · BroadcastChannel · Touch
   ===================================================== */

(function () {
  'use strict';

  // ─── Slide Notes Data ─────────────────────────────
  // Full facilitator notes for each slide (1-indexed)
  const SLIDE_NOTES = [
    '', // index 0 — unused
    // Slide 1
    `¡Bienvenidos a todos! Me alegra verlos por aquí. Como profesionales del desarrollo y la gestión de productos, estoy seguro de que todos en esta sala hemos sentido alguna vez la frustración de las estimaciones. Ya conocen la escena: discusiones interminables sobre si una tarea toma seis u ocho horas, la ansiedad de los desarrolladores por comprometerse a un tiempo exacto, y la presión de negocio cuando un 'estimado' se convierte mágicamente en una fecha de entrega inamovible.

Hoy vamos a hablar de frente sobre este problema. Vamos a entender por qué estimar el trabajo de ingeniería en horas nos hace daño a todos: genera fricción, nos empuja a mentirnos a nosotros mismos y rompe la previsibilidad. En esta sesión vamos a sintonizar nuestro canal de comunicación. Les voy a mostrar cómo los Puntos de Historia no son un capricho ágil, sino una herramienta técnica y de negocio que nos va a devolver la cordura, la precisión empírica y, sobre todo, la paz mental a la hora de planificar nuestros Sprints.`,
    // Slide 2
    `Antes de meternos en la teoría, quiero que construyamos este espacio juntos. No vengo a darles un monólogo corporativo. Por favor, abran todos el chat de Teams.

Quiero que lean la pregunta en pantalla: ¿Para qué estimamos en nuestro equipo? Piénsenlo desde su rol, ya sean Devs, POs o diseño. Escriban su respuesta de forma muy directa, pero por favor, no le den a enviar todavía. Mantengan el dedo sobre la tecla 'Enter'. Hacemos esto para evitar lo que en psicología se llama 'sesgo de anclaje'; si alguien lee la respuesta del líder técnico primero, inconscientemente adaptará la suya. Quiero sus opiniones reales y sin filtros. ¿Listos? Cuento tres. Uno... dos... tres... ¡Envíen!`,
    // Slide 3
    `¡Excelente! Miren la cascada de respuestas en el chat. Si las analizamos, se dan cuenta de que casi todas caen en tres grandes cubetas.

Por un lado, tenemos al Negocio, representado por nuestros Product Owners: ellos necesitan visibilidad. No pueden armar una estrategia de Go-To-Market o un Release Plan si no tienen una idea de cuándo tendremos listas ciertas funcionalidades. Por otro lado, tenemos al Equipo Técnico: ustedes necesitan estimar para construir un escudo. Es la única forma de proteger su capacidad real, evitar el burnout y no sobrecomprometerse. Y finalmente, desde la perspectiva del Proceso y la Mejora Continua: necesitamos medir para saber cuál es nuestra velocidad base. Si no medimos cómo trabajamos, no podemos aplicar metodologías Lean para optimizar nuestros flujos. En resumen: estimar no es un mecanismo de control de recursos humanos; es una herramienta de comunicación para tomar decisiones de negocio inteligentes.`,
    // Slide 4
    `Aquí es donde la industria del software suele tropezar más fuerte: la confusión total entre Objetivo, Estimación y Compromiso.

Imaginemos que Negocio llega y dice: 'Necesitamos integrar la nueva pasarela de pagos antes del Black Friday'. Eso es un Objetivo. Es un deseo comercial válido e importante. Luego, el equipo técnico analiza la tarea y da una Estimación: 'Creemos que esto es muy complejo por las APIs de terceros'. Es un cálculo probabilístico, un pronóstico del clima. El desastre ocurre cuando alguien toma esa estimación técnica y la convierte automáticamente en un Compromiso inamovible para cumplir el objetivo del negocio. Un compromiso es un pacto serio, basado en datos reales de nuestra capacidad, que el equipo hace al final de una Planning. Hoy vamos a aprender a separar el deseo comercial del tamaño real del trabajo, para que nuestros compromisos sean blindados.`,
    // Slide 5
    `Vamos a hacer un ejercicio rápido para demostrar por qué el tiempo es engañoso. Escriban en el chat cuántos minutos exactos les toma preparar una taza de té. Igual que antes, envíenlo a la cuenta de tres. Uno, dos, tres...

Miren esto. Tenemos respuestas que van desde los 2 minutos hasta los 15 minutos. Si esto fuera una Planning, estaríamos discutiendo a los gritos. ¿El de 15 minutos es un ineficiente? ¿El de 2 minutos hace un té de mala calidad? No. La diferencia radica en los supuestos no declarados. El de 2 minutos asumió que el agua ya estaba hirviendo y el saquito en la taza. El de 15 minutos asumió que tenía que ir a la cocina, lavar la taza, llenar la pava y esperar. En el código pasa exactamente igual. Cuando alguien dice 'esto me toma 4 horas', está asumiendo que la base de datos está lista y no hay deuda técnica. Las discrepancias en estimación rara vez son por falta de habilidad, son por falta de alineación en los criterios de aceptación y los supuestos.`,
    // Slide 6
    `Esta es la trampa mortal de las horas absolutas. Imaginen que refinamos una historia y le preguntamos a nuestro Dev más Senior cuánto le toma. Dirá: '2 horas'. Le preguntamos al Dev Junior y dirá: '8 horas'. ¿Qué número ponemos en el plan? Si usamos horas, la planificación se vuelve dependiente de quién agarre el ticket, lo cual rompe la agilidad del equipo.

Además, el cerebro humano se defiende. Si te pido horas, vas a agregar un 'colchón' de tiempo por si algo falla. Y para empeorar las cosas, estimar en horas asume un vacío perfecto donde no hay reuniones, no se cae el servidor y nadie te interrumpe por Slack. Finalmente, piensen en esto como un embudo: las horas de un día son finitas. Si medimos nuestro éxito en horas invertidas, nuestro límite físico es de 8 horas diarias. Sin embargo, si medimos nuestro rendimiento en valor entregado (complejidad resuelta), podemos duplicar nuestra velocidad optimizando la arquitectura y automatizando tareas, sin necesidad de trabajar horas extras.`,
    // Slide 7
    `Entonces, si desechamos las horas, ¿qué usamos? Presentamos los Puntos de Historia. Es vital que entiendan esto: un punto de historia no mide tiempo. Mide el tamaño relativo del problema.

Está compuesto de tres ingredientes indisolubles. Primero, el Esfuerzo: ¿Hay que escribir 10 líneas de código o 1000? Es trabajo transaccional. Segundo, la Complejidad: ¿Estamos haciendo un CRUD simple o estamos diseñando un algoritmo de encriptación asíncrono? Tercero, y el más importante, la Incertidumbre o Riesgo: ¿Es una tecnología que dominamos o estamos integrando una librería beta que nadie del equipo ha tocado jamás? Volviendo al ejemplo del Senior y el Junior. Quizás el Junior tarde más tiempo, pero ambos estarán de acuerdo en que mover un botón (baja complejidad, bajo riesgo) es un tamaño '1', y refactorizar el core de pagos (alta complejidad, alto riesgo) es un tamaño '8'. El tamaño del problema es el mismo para los dos.`,
    // Slide 8
    `No les pido que usen Puntos de Historia por moda, se los pido porque así funciona la neurociencia. Nuestro cerebro, cognitivamente hablando, es pésimo para predecir valores absolutos en el futuro, pero es una máquina brillante para realizar comparaciones relativas.

Existe algo llamado la Ley de Weber-Fechner que explica cómo percibimos las diferencias. Si les muestro un perro Gran Danés y un Chihuahua, en una fracción de segundo todos en esta sala me pueden decir cuál es más grande. Eso es estimación relativa, requiere muy baja carga cognitiva. Pero si les pido que me adivinen exactamente cuántos gramos pesa cada perro, su cerebro colapsa, empiezan a dudar y probablemente se equivoquen por mucho. Cuando les exigimos a los ingenieros que estimen en horas absolutas, les estamos pidiendo que adivinen los gramos. Cuando estimamos en puntos, les estamos pidiendo que comparen tamaños.`,
    // Slide 9
    `Para materializar esto usamos la secuencia de Fibonacci: 1, 2, 3, 5, 8, 13, 21. Muchos preguntan por qué no usamos números lineales como 1, 2, 3, 4, 5, 6.

La respuesta vuelve a la psicología que acabamos de ver. A medida que un problema se vuelve más grande, nuestra precisión disminuye drásticamente. Debatir en una Planning si una tarea compleja es un 6 o un 7 es quemar dinero de la empresa en discusiones inútiles de falsa precisión. Por eso la escala da saltos más amplios (de 5 pasamos a 8, de 8 a 13). Ese salto representa la oscuridad y la incertidumbre. Una regla de oro para nuestro equipo: si analizamos una historia y creemos que es un 13 o más, es una señal de alarma. Significa que es demasiado grande, tiene demasiado riesgo y tenemos que hacer slicing: cortarla en historias más pequeñas que podamos dominar.`,
    // Slide 10
    `Vamos a poner la teoría a prueba. Los voy a dividir automáticamente en pequeñas salas de Teams durante 10 minutos.

En cada sala tendrán un documento con 5 tareas cotidianas: lavar una taza, cambiar un foco de luz, pintar una habitación entera, construirle una casa de madera a un perro, y redactar un correo delicado al CEO. Su única misión es ordenarlas de menor a mayor complejidad (por ejemplo, 1, 3, 2, 5, 4). No piensen en horas, no piensen en si tienen las herramientas. Solo comparen los tamaños relativos entre ellas usando su instinto colectivo. Elijan a un vocero que anotará el resultado final. Nos vemos en 10 minutos. ¡A trabajar! (Al volver): Miren el chat. Todas las salas llegaron prácticamente a la misma secuencia en muy pocos minutos. Nadie discutió sobre cronómetros, simplemente usaron la memoria comparativa. Eso es exactamente lo que haremos con nuestro Backlog.`,
    // Slide 11
    `Ahora, ¿cómo llevamos esto al código? Con el Planning Poker. Esta es nuestra herramienta de calibración y alineación técnica.

La mecánica es sencilla pero estricta: leemos la historia de usuario, aclaramos dudas y todos votamos con nuestra escala de Fibonacci al mismo tiempo. Esto destruye el sesgo de autoridad; el Junior vota con la misma libertad que el Arquitecto de Software. Si todos sacamos un 3 o un 5, hay consenso rápido y avanzamos. Pero si la votación se abre y vemos un 1 y un 8 en la mesa... paren todo. ¡Ese es el momento de mayor valor de la reunión! No promediamos (no ponemos un 4 para ser diplomáticos). El promedio es barrer el problema bajo la alfombra. Le damos la palabra al del 1 y al del 8. Quizás el del 1 conoce una API que lo resuelve fácil, o quizás el del 8 detectó un agujero de seguridad brutal que los demás ignoramos. El objetivo del póker no es el número, es la conversación que nos alinea antes de tocar el código.`,
    // Slide 12
    `Llegamos al momento de la verdad para el Negocio. Nuestros Product Owners suelen preguntarse: 'Muy lindos los puntos abstractos, pero ¿cómo le digo a los Stakeholders en qué fecha salimos a producción?' La respuesta es empírica: mediante la Velocidad. La velocidad no es una promesa, es la sumatoria matemática de los puntos de historia que el equipo ha logrado terminar (cumpliendo el Definition of Done) en los Sprints anteriores. Si después de 3 o 4 Sprints vemos que el equipo liquida de forma estable unos 25 puntos por Sprint, ya tenemos nuestro motor de predicción. Si el PO tiene una iniciativa en el Backlog que suma 100 puntos, dividimos 100 sobre 25. Sabemos, basados en datos reales de este equipo y no en promesas estresantes, que nos tomará aproximadamente 4 Sprints. Es matemática pura y baja drásticamente el riesgo del proyecto.`,
    // Slide 13
    `Para mantener esa velocidad estable a lo largo de los meses sin quemar al equipo, tenemos que planificar con madurez. Y eso implica incluir el Slack o la Holgura Planificada.

Un error de novatos es tener una velocidad de 20 puntos y meter 20 puntos de historias de negocio en el Sprint. Si un servidor falla, el Sprint fracasa. En la gestión tradicional, la gente infla sus horas en secreto (el colchón individual) lo que lleva a la Ley de Parkinson (el trabajo se estira para llenar el tiempo disponible). Nosotros eliminaremos los colchones ocultos. Seremos agresivos en nuestras estimaciones de puntos, pero a nivel Sprint planificaremos con holgura. Si nuestra capacidad es 20, nos comprometemos con 18 puntos de producto. Los 2 puntos restantes son nuestro amortiguador colectivo: los usamos para pagar deuda técnica, refactorizar o hacer pruebas de concepto (Spikes). Si ocurre un incendio, lo absorbemos con ese Slack y protegemos el compromiso con Negocio.`,
    // Slide 14
    `Para cerrar la teoría y pasar al acuerdo, quiero que todos graben a fuego estas Tres Reglas Sagradas. Si rompemos alguna, todo este sistema colapsa y volvemos al caos de las horas.

Regla número 1: Jamás conviertan puntos a horas fijas. Si alguna vez un manager dice 'un punto equivale a 8 horas', el cerebro de los desarrolladores volverá automáticamente a estimar en horas y perderemos la agilidad y el foco en la complejidad. Regla número 2: No comparen velocidades entre equipos. Un punto de historia es una calibración íntima y local. Un tamaño '5' para el equipo Alpha no significa lo mismo que un '5' para el equipo Beta. Si nos comparan, la respuesta natural del equipo será inflar los puntos artificialmente para 'ganar'. Regla número 3: Estimar es para planificar entregas de valor, no para auditar personas. No medimos cuántos puntos hizo Juan vs. cuántos hizo María. Medimos el éxito del equipo entregando un incremento funcional al final de la iteración.`,
    // Slide 15
    `¡Gran trabajo hoy! Para que este cambio de mindset sea accionable desde mañana mismo, vamos a establecer nuestra 'Piedra Rosetta'.

Necesitamos un ancla, un punto de referencia contra el cual comparar todo nuestro trabajo futuro. Tómense un par de minutos, abran los micrófonos o usen el chat. Busquemos en nuestro historial reciente una historia de usuario que hayamos completado con éxito, que haya sido moderadamente compleja y que todos aquí entiendan perfectamente de qué se trató. A esa historia específica la vamos a bautizar oficialmente como nuestro estándar de 3 Puntos de Historia. En nuestro próximo refinamiento, cuando veamos un ticket nuevo, simplemente nos preguntaremos: ¿Esto es igual, es el doble de complejo, o es más fácil que nuestra historia de referencia? Escucho sus propuestas para elegirla ahora mismo.`,
    // Slide 16
    `Llegamos al final del taller. Como ticket de salida y para consolidar el aprendizaje de hoy, les pido que escriban en una sola frase en el chat de Teams: ¿Cuál es el cambio de mentalidad más importante que se llevan hoy de esta sesión? Recuerden la gran verdad que nos guía: "Estimar es un acto de colaboración, no de administración". ¡Los leo!`,
    // Slide 17
    `¡Muchas gracias a todos por su tiempo, energía y participación activa hoy! Cerramos la sesión oficial de estimación y abrimos espacio para cualquier pregunta, duda o feedback que tengan para el día de hoy. ¡Nos vemos en el próximo refinamiento!`,
  ];

  // Slide titles (for speaker notes window)
  const SLIDE_TITLES = [
    '',
    'Estimación Ágil: ¿Por qué dejamos de medir en horas?',
    'Bienvenidos al Desafío de la Planificación',
    'El Propósito de la Estimación',
    'El gran malentendido: Estimación vs. Compromiso vs. Objetivo',
    'Ejercicio 1 – El Desafío de la Taza de Té',
    'La trampa de las horas absolutas',
    '¿Qué es un «Punto de Historia»?',
    'Comparar es fácil, predecir es imposible',
    'La Escala Fibonacci (1, 2, 3, 5, 8, 13...)',
    'Ejercicio 2 – El Juego del Ordenamiento Relativo',
    'Planning Poker: El juego de la alineación',
    'De puntos abstractos a fechas reales: La Velocidad',
    'El «Slack» (La holgura planificada)',
    'Las Tres Reglas Sagradas',
    'Próximos Pasos: Definamos la «Piedra Rosetta»',
    'Conclusiones y Aprendizaje Colectivo',
    '¡Muchas gracias!',
  ];


  // ─── Presentation Engine ─────────────────────────
  class SlideEngine {
    constructor() {
      this.slides = document.querySelectorAll('.slide');
      this.totalSlides = this.slides.length;
      this.currentIndex = 0;

      // DOM refs
      this.progressFill = document.getElementById('progressFill');
      this.currentSlideEl = document.getElementById('currentSlide');
      this.totalSlidesEl = document.getElementById('totalSlides');
      this.btnPrev = document.getElementById('btnPrev');
      this.btnNext = document.getElementById('btnNext');
      this.btnFullscreen = document.getElementById('btnFullscreen');
      this.btnNotes = document.getElementById('btnNotes');

      // Speaker notes window
      this.notesWindow = null;
      this.channel = new BroadcastChannel('workshop-slides');

      // Touch state
      this.touchStartX = 0;
      this.touchEndX = 0;

      this.init();
    }

    init() {
      // Set total
      this.totalSlidesEl.textContent = String(this.totalSlides).padStart(2, '0');

      // Initial state
      this.goTo(0, false);

      // Keyboard
      document.addEventListener('keydown', (e) => this.onKeyDown(e));

      // Buttons
      this.btnPrev.addEventListener('click', () => this.prev());
      this.btnNext.addEventListener('click', () => this.next());
      this.btnFullscreen.addEventListener('click', () => this.toggleFullscreen());
      this.btnNotes.addEventListener('click', () => this.openNotes());

      // Touch
      document.addEventListener('touchstart', (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      }, { passive: true });
      document.addEventListener('touchend', (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      }, { passive: true });

      // Listen for messages from speaker notes window
      this.channel.addEventListener('message', (e) => {
        if (e.data.type === 'navigate') {
          const dir = e.data.index > this.currentIndex ? 'forward' : 'backward';
          this.goTo(e.data.index, true, dir);
        }
        if (e.data.type === 'request-state') {
          this.broadcastState();
        }
      });

      // Fullscreen change event
      document.addEventListener('fullscreenchange', () => {
        this.btnFullscreen.classList.toggle('controls__btn--active', !!document.fullscreenElement);
      });
    }

    onKeyDown(e) {
      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          this.next();
          break;
        case 'ArrowLeft':
        case 'PageUp':
          e.preventDefault();
          this.prev();
          break;
        case 'Home':
          e.preventDefault();
          this.goTo(0, true, 'forward');
          break;
        case 'End':
          e.preventDefault();
          this.goTo(this.totalSlides - 1, true, 'backward');
          break;
        case 'f':
        case 'F':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            this.toggleFullscreen();
          }
          break;
        case 'n':
        case 'N':
          if (!e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            this.openNotes();
          }
          break;
        case 'Escape':
          if (document.fullscreenElement) {
            document.exitFullscreen();
          }
          break;
      }
    }

    handleSwipe() {
      const diff = this.touchStartX - this.touchEndX;
      const threshold = 60;
      if (diff > threshold) this.next();
      else if (diff < -threshold) this.prev();
    }

    goTo(index, animate = true, direction = 'forward') {
      if (index < 0 || index >= this.totalSlides) return;

      // Remove active from all
      this.slides.forEach((s) => {
        s.classList.remove('active');
        this.resetAnimations(s);
      });

      this.currentIndex = index;

      // Activate target
      const targetSlide = this.slides[index];

      // Handle reveal items in target slide based on navigation direction
      const revealItems = targetSlide.querySelectorAll('.reveal-item');
      if (direction === 'forward') {
        revealItems.forEach(item => item.classList.remove('revealed'));
      } else {
        revealItems.forEach(item => item.classList.add('revealed'));
      }

      if (animate) {
        // Small delay for CSS re-trigger
        requestAnimationFrame(() => {
          targetSlide.classList.add('active');
        });
      } else {
        targetSlide.classList.add('active');
      }

      // Update UI
      this.updateProgress();
      this.updateCounter();
      this.broadcastState();
    }

    resetAnimations(slide) {
      // Force animation re-trigger by toggling a class
      const animated = slide.querySelectorAll(
        '.slide__eyebrow, .slide__title, .slide__accent-line, .slide__subtitle, .slide__point, .slide__col-item, .slide__exercise-card, .slide__prompt, .slide__prompt-sub, .slide__example, .slide__rule, .slide__task-item, .fibonacci-visual, .slide__keyfact'
      );
      animated.forEach((el) => {
        el.style.animation = 'none';
        // Force reflow
        void el.offsetHeight;
        el.style.animation = '';
      });
    }

    next() {
      const activeSlide = this.slides[this.currentIndex];
      const unrevealed = activeSlide.querySelectorAll('.reveal-item:not(.revealed)');
      if (unrevealed.length > 0) {
        unrevealed[0].classList.add('revealed');
        this.broadcastState();
        return;
      }
      if (this.currentIndex < this.totalSlides - 1) {
        this.goTo(this.currentIndex + 1, true, 'forward');
      }
    }

    prev() {
      const activeSlide = this.slides[this.currentIndex];
      const revealed = activeSlide.querySelectorAll('.reveal-item.revealed');
      if (revealed.length > 0) {
        revealed[revealed.length - 1].classList.remove('revealed');
        this.broadcastState();
        return;
      }
      if (this.currentIndex > 0) {
        this.goTo(this.currentIndex - 1, true, 'backward');
      }
    }

    updateProgress() {
      const pct = ((this.currentIndex + 1) / this.totalSlides) * 100;
      this.progressFill.style.width = pct + '%';
    }

    updateCounter() {
      this.currentSlideEl.textContent = String(this.currentIndex + 1).padStart(2, '0');
    }

    toggleFullscreen() {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(() => {});
      } else {
        document.exitFullscreen();
      }
    }

    openNotes() {
      // If window is already open and valid, just focus
      if (this.notesWindow && !this.notesWindow.closed) {
        this.notesWindow.focus();
        return;
      }

      // Calculate secondary screen position
      const w = 700;
      const h = 600;
      const left = window.screenX + window.outerWidth;
      const top = window.screenY;

      this.notesWindow = window.open(
        'speaker-notes.html',
        'SpeakerNotes',
        `width=${w},height=${h},left=${left},top=${top},resizable=yes,scrollbars=yes`
      );

      this.btnNotes.classList.add('controls__btn--active');

      // Broadcast current state after notes window loads
      setTimeout(() => this.broadcastState(), 500);
    }

    broadcastState() {
      const slideNum = this.currentIndex + 1;
      const nextTitle = (slideNum < this.totalSlides)
        ? SLIDE_TITLES[slideNum + 1] || ''
        : '';

      this.channel.postMessage({
        type: 'slide-change',
        index: this.currentIndex,
        slideNumber: slideNum,
        totalSlides: this.totalSlides,
        title: SLIDE_TITLES[slideNum] || '',
        notes: SLIDE_NOTES[slideNum] || '',
        nextTitle: nextTitle,
      });
    }
  }


  // ─── Initialize ───────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    new SlideEngine();
  });

})();
