document.getElementById('submitBtn').addEventListener('click', async () => {
    const textInput = document.getElementById('inputText').value.trim();
    const languageSelect = document.getElementById('targetLanguage').value;
    const outputDiv = document.getElementById('outputResult');
    const submitBtn = document.getElementById('submitBtn');

    // Validation
    if (!textInput) {
        outputDiv.textContent = "Please input some technical text to evaluate.";
        outputDiv.style.borderLeftColor = "#ef4444"; 
        return;
    }

    // Update UI status to Loading state
    outputDiv.innerHTML = '<span class="loading">Processing text through Hugging Face neural networks...</span>';
    outputDiv.style.borderLeftColor = "#1e3a8a";
    submitBtn.disabled = true;

    try {
        // Send async POST request to Flask backend endpoint /translate
        const response = await fetch('/translate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                text: textInput,
                language: languageSelect
            })
        });

        const data = await response.json();

        if (response.ok) {
            // Display successful AI translation output
            outputDiv.textContent = data.translation;
        } else {
            // Handle server-side logic exceptions
            outputDiv.textContent = `Server Error: ${data.error || 'Something went wrong.'}`;
            outputDiv.style.borderLeftColor = "#ef4444";
        }

    } catch (error) {
        // Handle client network offline failures
        outputDiv.textContent = "Network error. Make sure your Python Flask server is running.";
        outputDiv.style.borderLeftColor = "#ef4444";
    } finally {
        // Re-enable interactive trigger element
        submitBtn.disabled = false;
    }
});