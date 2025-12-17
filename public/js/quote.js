
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
    
    // check if input are valid

    const quoteForm = document.getElementById("quote-form");

    if(quoteForm){
            quoteForm.addEventListener('submit', e => {
                let isValid = true;
                document.querySelectorAll('.error-text').forEach(e1 => e1.innerText = '');
                document.querySelectorAll('.invalid').forEach( e1 => e1.classList.remove('invalid') );

                const name = document.getElementById('name');
                const email = document.getElementById('email');
                const phone = document.getElementById('phone');
                const zip = document.getElementById('zip');

                if(name.value.trim().length < 2){
                    showError(name, 'nameError', 'Name must be at least 2 characters');
                    isValid = false;
                }

                if(!/^\S+@\S+\.\S+$/.test(email.value)){
                    showError(email, 'emailError', 'Enter a valid email');
                    isValid = false;
                }

                if(!/^\d{10}$/.test(phone.value.replace(/\D/g, ''))){
                    showError(phone, 'phoneError', 'Enter a valid phone number')
                    isValid = false;

                }

                if(!/^\d{5}(-\d{4})?$/.test(zip.value.trim())){
                    showError(zip, 'zipError', 'Enter a valid ZIP code');
                    isValid = false;
                }

                if(!isValid){
                    e.preventDefault();
                }
            })
    }
function showError(input, errorId, message){
    document.getElementById(errorId).innerText = message;
    input.classList.add('invalid');
}