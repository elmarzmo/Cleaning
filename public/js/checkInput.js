const form = document.getElementById("contact-form");

if(form){

    form.addEventListener('submit', (e) => {
        let isValid = true;

        // clear old errors 
        document.querySelectorAll('.error-text').forEach(e1 => e1.innerText = '');
        document.querySelectorAll('.invalid').forEach(e1 => e1.classList.remove('invalid'));

        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const message = document.getElementById('message');

        // name
        if(name.value.trim().length < 2){
            showError(name, 'nameError','Name must be at least 2 charachters' );
            isValid = false;
        }

        // email
        if (!/^\S+@\S+\.\S+$/.test(email.value)) {
            showError(email, 'emailError', 'Enter a valid email');
            isValid = false;
        }

        // message
        if(message.value.trim().length < 5){
            showError(message, 'messageError', 'Message Must be at least 5 characters');
            isValid = false;
        }

        if(!isValid){
            e.preventDefault(); // Bloack from submission
        }

    });
}
function showError(input, errorId, message){
    document.getElementById(errorId).innerText = message;
    input.classList.add('invalid');
}