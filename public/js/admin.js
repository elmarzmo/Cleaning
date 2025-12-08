

// login submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/admin-hna46553123/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data);

            if(response.ok) {
               // localStorage.setItem('adminToken', data.token);
                window.location.href = `/admin-hna46553123/dashboard`;
            } else {
                document.getElementById('error-message').innerText = 'Login failed';
            }
        });
    }
});

// logout button
const logoutButton = document.getElementById('logout-button');
if(logoutButton){
    logoutButton.addEventListener('click', async () => {
        window.location.href = '/admin-hna46553123/logout';
});
}
// load dashboard quotes

const quoteTable = document.getElementById('quote-requests-body');
if(quoteTable) {
    loadQuotes();
    loadMessages();
}   

 async function loadMessages() {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/messages', {
        headers: {
            'Authorization': `Bearer ${token}` 
        }
    });

    if (!response.ok) {
        console.error('Failed to fetch messages');
        return;
    }

    const messages = await response.json();
    const messageTable = document.getElementById('messages-body');
    messageTable.innerHTML = '';    
    messages.forEach(message => {
        const row = document.createElement('tr');
        row.innerHTML = `   
            <td>${message.name}</td>
            <td>${message.email}</td>
            <td>${message.message}</td>
            <td>${new Date(message.createdAt).toLocaleString()}</td>

            
            <td>
                <button class="message-star" data-id="${message._id}">  ${message.starred ? '⭐' : '☆'}</button>
                <button class="delete-message" data-id="${message._id}">Delete</button>
            </td>
        `;
        messageTable.appendChild(row);
    });

    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-message').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`/api/messages/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if(response.ok) {
                loadMessages();
                loadQuotes();
            }
        });
    }); 
    // add start off amd on click
    document.querySelectorAll('.message-star').forEach(button => {  
        button.addEventListener('click', async (e) => { 
            const id = e.target.getAttribute('data-id');
            const token = localStorage.getItem('adminToken');   
            const response = await fetch(`/api/messages/${id}/message-star`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }   
            });
            const result = await response.json();
            e.target.innerText = result.starred ? '⭐' : '☆';
        });
    });
}

async function loadQuotes() {
    const token = localStorage.getItem('adminToken');
    const response = await fetch('/api/quotes', {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
    const quotes = await response.json();
    const table = document.getElementById('quote-requests-body');
    table.innerHTML = '';   
    quotes.forEach(quote => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${quote.name}</td>
            <td>${quote.email}</td>
            <td>${quote.phone}</td>
            <td>${quote.zip}</td>
            <td>${quote.service}</td>
            <td>${quote.frequency}</td>
            <td>${quote.notes || ''}</td>
            <td>${new Date(quote.createdAt).toLocaleString()}</td>

            <td>
                <button class="star" data-id="${quote._id}">  ${quote.starred ? '⭐' : '☆'}</button>
                <button class="delete-quote" data-id="${quote._id}">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });



    

    // Add event listeners for delete buttons  

    document.querySelectorAll('.delete-quote').forEach(button => {  
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const token = localStorage.getItem('adminToken');   
            const response = await fetch(`/api/quotes/${id}`, {
                method: 'DELETE',
                headers: {  
                    'Authorization': `Bearer ${token}`
                }   
            });
            if(response.ok) {
                loadQuotes();
                loadMessages();
            }
        });
    });
    // add start off amd on click
    document.querySelectorAll('.star').forEach(button => {  
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            const token = localStorage.getItem('adminToken');   
            const response = await fetch(`/api/quotes/${id}/star`, {
                method: 'PATCH',
                headers: {
                    'Authorization': `Bearer ${token}`, 
                    'Content-Type': 'application/json'
                }   
            });
            const result = await response.json();
            e.target.innerText = result.starred ? '⭐' : '☆';
        });
    });
}   

// Update information button

const updateInfoButton = document.getElementById('update-information');
if(updateInfoButton){
    updateInfoButton.addEventListener('click', () => {
        window.location.href = '/admin-hna46553123/update-contacts';
    });
}
