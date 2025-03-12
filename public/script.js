document.getElementById('surveyForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const fullName = document.getElementById('fullName').value;
    const age = document.getElementById('age').value;

    try {
        const response = await fetch('http://localhost:3000/api/submit', { // Fixed URL
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fullName, age })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
        document.getElementById('responseMessage').innerText = result.message;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('responseMessage').innerText = "Error submitting form.";
    }
});
