document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const typingSound = document.getElementById('typingSound');
    const accessGranted = document.getElementById('accessGranted');
    const accessDenied = document.getElementById('accessDenied');
    const matrixSound = document.getElementById('matrixSound');
    
    // Matrix Rain Effect
    const canvas = document.getElementById('matrixRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const katakana = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const alphabet = katakana + latin + nums;
    
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const rainDrops = [];
    
    for (let x = 0; x < columns; x++) {
        rainDrops[x] = 1;
    }
    
    // Play ambient matrix sound
    matrixSound.volume = 0.2;
    matrixSound.play();
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < rainDrops.length; i++) {
            const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));
            ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);
            
            if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                rainDrops[i] = 0;
            }
            rainDrops[i]++;
        }
    };
    
    setInterval(draw, 30);
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    const statusMessage = document.getElementById('status');
    const inputs = document.querySelectorAll('.terminal-input');
    
    // Add typing sounds to inputs
    inputs.forEach(input => {
        input.addEventListener('keydown', () => {
            typingSound.currentTime = 0;
            typingSound.volume = 0.3;
            typingSound.play();
        });
    });
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Correct credentials
        if (username === 'orignal.trk' && password === 'ZD412') {
            statusMessage.textContent = "ACCESS GRANTED... WELCOME AGENT";
            statusMessage.style.color = "#0f0";
            statusMessage.classList.remove('blink');
            
            // Play success sound
            accessGranted.currentTime = 0;
            accessGranted.play();
            
            // Intense glitch effect
            document.body.style.animation = "glitch 0.1s infinite";
            setTimeout(() => {
                document.body.style.animation = "none";
                // Redirect to "secured" page
                window.location.href = "https://github.com"; // Change this URL
            }, 2000);
        } 
        // Wrong credentials
        else {
            statusMessage.textContent = "ACCESS DENIED: INVALID CREDENTIALS";
            statusMessage.style.color = "#f00";
            statusMessage.classList.add('blink');
            
            // Play error sound
            accessDenied.currentTime = 0;
            accessDenied.play();
            
            // Error glitch effect
            document.body.style.animation = "glitch 0.2s infinite";
            setTimeout(() => {
                document.body.style.animation = "none";
            }, 1000);
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
