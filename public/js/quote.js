
// Decorative emojis

    const container = document.body;
    const emojis = ['🧹', '🧼', '🧽', '🪣', '🧴', '🧻', '🪟', '🛁', '✨'];

    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.position = 'absolute';
        span.style.top = Math.random() * 90 + '%';
        span.style.left = Math.random() * 90 + '%';
        span.style.fontSize = (Math.random() * 24 + 16) + 'px';
        span.style.opacity = 0.25;
        span.style.pointerEvents = 'none';
        span.style.zIndex = 0;
        container.appendChild(span);
    }
    