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
            y: Math.random() * -100, // Start above the screen
            charIndex: i % chars.length // Cycle through message
        };
    }

    function draw() {
        // Semi-transparent black background for trailing effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0'; // Green text
        ctx.font = fontSize + 'px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            // Get the current character for this column
            const char = chars[drops[i].charIndex];
            
            // Draw the character
            ctx.fillText(char, i * fontSize, drops[i].y);
            
            // Move down
            drops[i].y += fontSize;
            
            // Reset to top when reaching bottom with random delay
            if (drops[i].y > canvas.height && Math.random() > 0.95) {
                drops[i].y = 0;
                // Move to next character in sequence
                drops[i].charIndex = (drops[i].charIndex + 1) % chars.length;
            }
        }
    }
    
    // Animation loop (30 frames per second)
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
