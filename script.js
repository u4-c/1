document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const typingSound = document.getElementById('typingSound');
    const accessGranted = document.getElementById('accessGranted');
    const accessDenied = document.getElementById('accessDenied');
    const birthdaySound = document.getElementById('birthdaySound');
    
    // Canvas setup
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    resizeCanvas();
    
    // Characters to rain (individual letters)
    const letters = "HAPPYBIRTHDAY".split('');
    const flowers = ['🌸', '🌺', '🌻', '🌹', '🌷', '💐', '🏵️'];
    const fontSize = 16; // Smaller text size
    let columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    initializeDrops();
    birthdaySound.volume = 0.3;
    birthdaySound.play().catch(e => console.log("Audio play failed:", e));
    
    // Animation loop
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ffb6c1'; // Light pink
        ctx.font = `${fontSize}px Arial`;
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = 5;
        
        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(drops[i].char, i * fontSize, drops[i].y);
            drops[i].y += drops[i].speed;
            
            if (drops[i].y > canvas.height) {
                resetDrop(i);
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    function initializeDrops() {
        for (let i = 0; i < columns; i++) {
            resetDrop(i);
            drops[i].y = Math.random() * canvas.height;
        }
    }
    
    function resetDrop(i) {
        drops[i] = {
            y: Math.random() * -100,
            char: Math.random() > 0.3 
                ? letters[Math.floor(Math.random() * letters.length)]
                : flowers[Math.floor(Math.random() * flowers.length)],
            speed: 1 + Math.random() * 2
        };
    }
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        columns = Math.floor(canvas.width / fontSize);
    }
    
    // Form handling
    const form = document.getElementById('birthdayForm');
    const input = document.getElementById('birthdayCode');
    
    input.addEventListener('keydown', () => {
        typingSound.currentTime = 0;
        typingSound.volume = 0.2;
        typingSound.play();
    });
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (input.value === 'BIRTHDAY') {
            form.style.display = 'none';
            document.getElementById('status').style.display = 'none';
            document.getElementById('birthdayMessage').classList.remove('hidden');
            accessGranted.currentTime = 0;
            accessGranted.play();
            setTimeout(() => window.location.href = "https://discord.gg/Lands", 3000);
        } else {
            document.getElementById('status').textContent = "Incorrect code! Try again";
            document.getElementById('status').style.color = "#ff0000";
            accessDenied.currentTime = 0;
            accessDenied.play();
            input.style.animation = "shake 0.5s";
            setTimeout(() => input.style.animation = "none", 500);
            input.value = '';
        }
    });
    
    window.addEventListener('resize', function() {
        resizeCanvas();
        initializeDrops();
    });
    
    // Start animation
    animate();
});
