document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // The message to display in order
    const message = "HAPPY BIRTHDAY ";
    const chars = message.split('');
    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize) + 1;
    
    // Each column gets its own position and character index
    const drops = [];
    for (let i = 0; i < columns; i++) {
        drops[i] = {
            y: Math.random() * -100,
            charIndex: i % chars.length,
            speed: 0.6 + Math.random() * 0.2 // Speed control (0.6x with slight variation)
        };
    }

    function draw() {
        // Semi-transparent black background for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Light pink with glow effect
        ctx.shadowColor = '#ffb6c1'; // Light pink glow
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ffb6c1'; // Light pink text
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[drops[i].charIndex];
            ctx.fillText(char, i * fontSize, drops[i].y);
            drops[i].y += drops[i].speed; // Use the custom speed
            
            if (drops[i].y > canvas.height && Math.random() > 0.95) {
                drops[i].y = 0;
                drops[i].charIndex = (drops[i].charIndex + 1) % chars.length;
            }
        }
        
        // Reset shadow for next frame
        ctx.shadowColor = 'transparent';
    }
    
    // Slower animation loop (40ms = ~25fps for slower effect)
    setInterval(draw, 40);
    
    // Password form handling
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === 'ZD412') {
            form.style.display = 'none';
            messageDiv.classList.remove('hidden');
            setTimeout(() => {
                window.location.href = "https://discord.gg/Lands";
            }, 3000);
        } else {
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            passwordInput.value = '';
        }
    });
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
