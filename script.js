document.addEventListener('DOMContentLoaded', function() {
    const typingSound = document.getElementById('typingSound');
    const accessGranted = document.getElementById('accessGranted');
    const accessDenied = document.getElementById('accessDenied');
    const birthdaySound = document.getElementById('birthdaySound');
    
    const canvas = document.getElementById('heartsRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const hearts = ['❤️', '🧡','🎂', '🎁', '🎉'];
    const messages = ['Happy', ' Birthday!'];
    
    const fontSize = 7;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height);
    }
    
    birthdaySound.volume = 0.3;
    birthdaySound.play();
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px Arial';
        
        for (let i = 0; i < drops.length; i++) {
            const text = Math.random() > 0.7 
                ? messages[Math.floor(Math.random() * messages.length)]
                : hearts[Math.floor(Math.random() * hearts.length)];
            
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height || Math.random() > 0.95) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    };
    
    setInterval(draw, 60);
    
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
        }
    });
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    document.addEventListener('touchstart', function() {
        birthdaySound.play().catch(e => console.log("Audio play failed:", e));
    });
});
