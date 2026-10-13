const API_URL = "http://localhost:8080/api/tickets";

// Handle Submit Ticket Form
document.getElementById('ticketForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const userId = document.getElementById('userId').value;
    const title = document.getElementById('ticketTitle').value;
    const description = document.getElementById('problemDescription').value;

    const ticketData = {
        userId: userId,
        title: title,
        description: description
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(ticketData)
        });

        if (response.ok) {
            alert("Ticket submitted successfully!");
            document.getElementById('ticketForm').reset();
            loadTickets(); // Refresh tickets list after submission
        } else {
            alert("Failed to submit ticket.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Backend Server is not running on localhost:8080!");
    }
});

// Fetch and display tickets under My Tickets section
async function loadTickets() {
    try {
        const response = await fetch(API_URL);
        const tickets = await response.json();
        
        const container = document.getElementById('ticketsContainer');
        container.innerHTML = '';

        if (tickets.length === 0) {
            container.innerHTML = '<p>No tickets available.</p>';
            return;
        }

        tickets.forEach(ticket => {
            container.innerHTML += `
                <div style="border: 1px solid #ddd; padding: 12px; margin-bottom: 10px; border-radius: 6px; background-color: #f9f9f9; text-align: left;">
                    <p style="margin: 3px 0;"><strong>Ticket ID:</strong> #${ticket.id}</p>
                    <p style="margin: 3px 0;"><strong>Title:</strong> ${ticket.title}</p>
                    <p style="margin: 3px 0;"><strong>Description:</strong> ${ticket.description}</p>
                    <p style="margin: 3px 0;"><strong>Status:</strong> <span style="color: green; font-weight: bold;">${ticket.status || 'OPEN'}</span></p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading tickets:", error);
        alert("Failed to load tickets!");
    }
}