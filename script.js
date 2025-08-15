document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // The letters we want to rain in order
    const message = "Happy Birthday";
    let letterIndex = 0;
    const letters = [];
    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Initialize drops
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.random() * -100; // Start above the screen
    }
    
    function draw() {
        // Semi-transparent background for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';
        
        // Draw the letters
        for (let i = 0; i < drops.length; i++) {
            // Cycle through "Happy Birthday" letters
            const text = message[letterIndex % message.length];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            // Move the letter down
            drops[i]++;
            
            // Reset letter to top when it reaches bottom
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.95) {
                drops[i] = 0;
                letterIndex++;
            }
        }
    }
    
    // Animation loop
    setInterval(draw, 33);
    
    // Password form handling
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === 'ZD412') {
            // Correct password
            form.style.display = 'none';
            messageDiv.classList.remove('hidden');
            
            // Redirect after 3 seconds
            setTimeout(() => {
                window.location.href = "https://discord.gg/Lands";
            }, 3000);
        } else {
            // Wrong password - shake effect
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            passwordInput.value = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
