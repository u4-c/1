document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const successSound = document.getElementById('successSound');
    bgMusic.volume = 0.3;
    successSound.volume = 0.7;

    document.addEventListener('DOMContentLoaded', function() {
    const bgMusic = document.getElementById('bgMusic');
    const successSound = document.getElementById('successSound');
    bgMusic.volume = 0.3;
    successSound.volume = 0.7;

    document.addEventListener('click', function() {
      bgMusic.play().catch(e => console.log("Audio play failed:", e));
    }, { once: true });

        
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const letters = "ッ".split('');
    const flowers = ['🌹', '🌷', '💮', '🪷', '🏵️', '🌺', '🥀', '🌼', '🌸'];
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = {
            y: Math.random() * -100,
            char: Math.random() > 0.3 ? 
                letters[Math.floor(Math.random() * letters.length)] : 
                flowers[Math.floor(Math.random() * flowers.length)],
            speed: 1 + Math.random() * 2
        };
    }
    
    function animate() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff69b4';
        ctx.font = `${fontSize}px Arial`;
        ctx.shadowColor = '#ff69b4';
        ctx.shadowBlur = 5;
        
        for (let i = 0; i < drops.length; i++) {
            ctx.fillText(drops[i].char, i * fontSize, drops[i].y);
            drops[i].y += drops[i].speed;
            
            if (drops[i].y > canvas.height) {
                drops[i].y = 0;
                drops[i].char = Math.random() > 0.3 ? 
                    letters[Math.floor(Math.random() * letters.length)] : 
                    flowers[Math.floor(Math.random() * flowers.length)];
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    animate();
    
    document.getElementById('submitBtn').addEventListener('click', function(e) {
        e.preventDefault();
        const input = document.getElementById('passwordInput');
        const status = document.getElementById('statusMessage');
        
    if (input.value === 'ZD412') {
        status.textContent = "Access granted! Redirecting...";
        status.style.color = "#ff69b4";
        successSound.play(); 
        setTimeout(() => {
            window.location.href = "https://discord.gg/Lands";
        }, 2000);
    }
        } else {
            status.textContent = "Invalid password! Try again";
            status.style.color = "#ff0000";
            input.style.animation = "shake 0.5s";
            setTimeout(() => input.style.animation = "", 500);
        }
    });
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
