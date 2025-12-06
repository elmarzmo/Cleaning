// Redirect to login if no token
if (window.location.pathname.includes('/admin-hna46553123/dashboard')) {
    const token = localStorage.getItem('adminToken');
    if (!token) {
        window.location.href = '/admin-hna46553123/login';
    }
}

// login submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/api/admin-hna46553123/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            console.log(data);

            if(data.token) {
                localStorage.setItem('adminToken', data.token);
                window.location.href = `/api/admin-hna46553123/dashboard`;
            } else {
                document.getElementById('error-message').innerText = 'Login failed';
            }
        });
    }
});

// logout button
const logoutButton = document.getElementById('logout-button');
if(logoutButton) {
    logoutButton.addEventListener('click', () => {
        localStorage.removeItem('adminToken');
        window.location.href = '/admin-hna46553123/login';
    });
}   


// load dashboard quotes

const quoteTable = document.getElementById('quote-requests-body');
if(quoteTable) {
    loadQuotes();
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