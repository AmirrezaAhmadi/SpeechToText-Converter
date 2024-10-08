const startBtn = document.getElementById('start-btn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');
const languageSelect = document.getElementById('language-select');

if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    startBtn.addEventListener('click', () => {
        const selectedLanguage = languageSelect.value;
        recognition.lang = selectedLanguage;

        recognition.start();
        output.textContent = 'Listening...';
    });

    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        output.textContent = transcript;
    };

    recognition.onspeechend = () => {
        recognition.stop();
    };

    recognition.onerror = (event) => {
        output.textContent = `Error: ${event.error}`;
    };
} else {
    output.textContent = 'Your browser does not support Web Speech API.';
}

copyBtn.addEventListener('click', () => {
    const text = output.textContent;
    if (text !== 'Listening...' && text !== 'The converted text will appear here' && text !== '') {
        navigator.clipboard.writeText(text).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            alert('Failed to copy text.');
        });
    }
});
