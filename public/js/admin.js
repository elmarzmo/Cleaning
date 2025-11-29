// login submission
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('admin-login-form');

    if(loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const response = await fetch('/admin/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if(data.token) {
                localStorage.setItem('adminToken', data.token);
                window.location.href = '/admin/dashboard';
            } else {
                document.getElementById('error-message').innerText = 'Login failed';
            }
        });
    }
});

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
                <button class="view-quote" data-id="${quote._id}">View</button>
                <button class="delete-quote" data-id="${quote._id}">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });

    // Add event listeners for view and delete buttons  
    document.querySelectorAll('.view-quote').forEach(button => {
        button.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            window.location.href = `/admin/quote/${id}`;
        }); 
    });

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
}
