document.addEventListener('DOMContentLoaded', function() {
    // Canvas setup
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Rain configuration
    const message = "HAPPY BIRTHDAY ";
    const chars = message.split('');
    const fontSize = 20;
    let columns = Math.floor(canvas.width / fontSize) + 1;
    
    // Drops array with individual speeds
    const drops = [];
    initializeDrops();
    
    // Animation control
    let animationId;
    const speedFactor = 0.9; // Your requested 0.6x speed
    
    // Start animation
    startAnimation();
    
    // Form handling
    const form = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const messageDiv = document.getElementById('message');
    
    form.addEventListener('submit', handleSubmit);
    window.addEventListener('resize', handleResize);
    
    // Functions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize) + 1;
    }
    
    function initializeDrops() {
        for (let i = 0; i < columns; i++) {
            drops[i] = {
                y: Math.random() * -100,
                charIndex: i % chars.length,
                speed: (0.5 + Math.random() * 0.5) * speedFactor
            };
        }
    }
    
    function draw() {
        // Clear with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set pink text with glow
        ctx.shadowColor = '#ffb6c1';
        ctx.shadowBlur = 15;
        ctx.fillStyle = '#ffb6c1';
        ctx.font = `${fontSize}px monospace`;
        
        // Draw each character
        for (let i = 0; i < drops.length; i++) {
            const char = chars[drops[i].charIndex];
            ctx.fillText(char, i * fontSize, drops[i].y);
            
            // Move at custom speed
            drops[i].y += drops[i].speed;
            
            // Reset when off screen
            if (drops[i].y > canvas.height && Math.random() > 0.95) {
                drops[i].y = 0;
                drops[i].charIndex = (drops[i].charIndex + 1) % chars.length;
            }
        }
        
        // Reset shadow
        ctx.shadowColor = 'transparent';
        
        // Continue animation
        animationId = requestAnimationFrame(draw);
    }
    
    function startAnimation() {
        if (!animationId) {
            draw();
        }
    }
    
    function stopAnimation() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    }
    
    function handleSubmit(e) {
        e.preventDefault();
        
        if (passwordInput.value === 'ZD412') {
            // Success
            form.style.display = 'none';
            messageDiv.classList.remove('hidden');
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = "https://discord.gg/Lands";
            }, 3000);
        } else {
            // Error effect
            passwordInput.style.animation = 'shake 0.5s';
            setTimeout(() => {
                passwordInput.style.animation = '';
            }, 500);
            passwordInput.value = '';
        }
    }
    
    function handleResize() {
        stopAnimation();
        resizeCanvas();
        initializeDrops();
        startAnimation();
    }
});
