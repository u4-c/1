document.addEventListener('DOMContentLoaded', function() {
    // Audio setup
    const sounds = {
        typing: document.getElementById('typingSound'),
        accessGranted: document.getElementById('accessGranted'),
        accessDenied: document.getElementById('accessDenied'),
        birthday: document.getElementById('birthdaySound')
    };
    
    // Canvas setup
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Animation elements
    const letters = "HAPPYBIRTHDAY".split('');
    const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '💐', '🏵️'];
    const fontSize = 16;
    let columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialize
    function init() {
        sounds.birthday.volume = 0.3;
        sounds.birthday.play().catch(e => console.log("Audio error:", e));
        
        // Create drops
        for (let i = 0; i < columns; i++) {
            drops[i] = {
                y: Math.random() * -100,
                char: Math.random() > 0.3 
                    ? letters[Math.floor(Math.random() * letters.length)]
                    : flowers[Math.floor(Math.random() * flowers.length)],
                speed: 1 + Math.random() * 2
            };
        }
        
        animate();
    }
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffb6c1';
        ctx.font = `${fontSize}px Arial`;
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = 5;
        
        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(drops[i].char, i * fontSize, drops[i].y);
            drops[i].y += drops[i].speed;
            
            if (drops[i].y > canvas.height) {
                drops[i].y = 0;
                drops[i].char = Math.random() > 0.3 
                    ? letters[Math.floor(Math.random() * letters.length)]
                    : flowers[Math.floor(Math.random() * flowers.length)];
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    // Form handling
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('passwordInput');
        const status = document.getElementById('statusMessage');
        
        if (input.value === 'IMUSC6') { // Your password
            sounds.accessGranted.currentTime = 0;
            sounds.accessGranted.play();
            
            status.textContent = "Access granted! Redirecting...";
            status.style.color = "#0f0";
            
            setTimeout(() => {
                window.location.href = "https://discord.gg/Lands";
            }, 2000);
        } else {
            sounds.accessDenied.currentTime = 0;
            sounds.accessDenied.play();
            
            status.textContent = "Invalid password! Try again";
            status.style.color = "#f00";
            input.style.animation = "shake 0.5s";
            setTimeout(() => input.style.animation = "", 500);
        }
    });
    
    // Resize handler
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
    }
    
    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('load', init);
});
