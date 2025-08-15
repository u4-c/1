document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const typingSound = document.getElementById('typingSound');
    const accessGranted = document.getElementById('accessGranted');
    const accessDenied = document.getElementById('accessDenied');
    const birthdaySound = document.getElementById('birthdaySound');
    
    // Canvas setup
    const canvas = document.getElementById('heartsRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Characters to rain (individual letters)
    const letters = "HAPPYBIRTHDAY".split('');
    
    // Flower emojis
    const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '💐', '🏵️'];
    
    // Smaller font size (changed from 24 to 16)
    const fontSize = 16;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = {
            y: Math.random() * -100,
            char: Math.random() > 0.3 
                ? letters[Math.floor(Math.random() * letters.length)]
                : flowers[Math.floor(Math.random() * flowers.length)],
            speed: 1 + Math.random() * 2 // Random speed between 1-3
        };
    }
    
    // Play birthday music
    birthdaySound.volume = 0.3;
    birthdaySound.play();
    
    // Drawing function
    function draw() {
        // Clear with fade effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Set pink color with glow
        ctx.fillStyle = '#ffb6c1';
        ctx.font = fontSize + 'px Arial';
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = 5;
        
        // Draw each character
        for (let i = 0; i < drops.length; i++) {
            const char = drops[i].char;
            ctx.fillText(char, i * fontSize, drops[i].y);
            
            // Move down
            drops[i].y += drops[i].speed;
            
            // Reset when off screen
            if (drops[i].y > canvas.height) {
                drops[i].y = 0;
                drops[i].char = Math.random() > 0.3 
                    ? letters[Math.floor(Math.random() * letters.length)]
                    : flowers[Math.floor(Math.random() * flowers.length)];
            }
        }
    }
    
    // Animation loop (60fps)
    setInterval(draw, 1000/60);
    
    // Form handling (keep your existing code)
    const birthdayForm = document.getElementById('birthdayForm');
    const statusMessage = document.getElementById('status');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const input = document.getElementById('birthdayCode');

    input.addEventListener('keydown', () => {
        typingSound.currentTime = 0;
        typingSound.volume = 0.2;
        typingSound.play();
    });
    
    birthdayForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const code = input.value;
        
        if (code === 'BIRTHDAY') {
            birthdayForm.style.display = 'none';
            statusMessage.style.display = 'none';
            birthdayMessage.classList.remove('hidden');
            
            accessGranted.currentTime = 0;
            accessGranted.play();
            
            setTimeout(() => {
                window.location.href = "https://discord.gg/Lands";
            }, 3000);
        } else {
            statusMessage.textContent = "Incorrect code! Try again";
            statusMessage.style.color = "#ff0000";
            
            accessDenied.currentTime = 0;
            accessDenied.volume = 0.3;
            accessDenied.play();
            
            input.style.animation = "shake 0.5s";
            setTimeout(() => {
                input.style.animation = "none";
            }, 500);
            input.value = '';
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
