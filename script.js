document.addEventListener('DOMContentLoaded', function() {
    // Audio elements
    const typingSound = document.getElementById('typingSound');
    const accessGranted = document.getElementById('accessGranted');
    const accessDenied = document.getElementById('accessDenied');
    const birthdaySound = document.getElementById('birthdaySound');
    
    // Hearts Rain Effect
    const canvas = document.getElementById('heartsRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Birthday elements
    const hearts = ['❤️', '🧡', '💛', '💚', '💙', '💜', '🤎', '🖤', '🤍', '💖', '💗', '💘', '💝', '🎂', '🎁', '🎉'];
    const messages = ['Happy Birthday!', 'HBD!', 'Best Wishes!', 'Party Time!'];
    
    const fontSize = 24;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = Math.floor(Math.random() * canvas.height);
    }
    
    // Play birthday music
    birthdaySound.volume = 0.3;
    birthdaySound.play();
    
    const draw = () => {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0000';
        ctx.font = fontSize + 'px Arial';
        
        for (let i = 0; i < drops.length; i++) {
            // Alternate between hearts and messages
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
    
    // Birthday form handling
    const birthdayForm = document.getElementById('birthdayForm');
    const statusMessage = document.getElementById('status');
    const birthdayMessage = document.getElementById('birthdayMessage');
    const input = document.getElementById('birthdayCode');
    
    // Add typing sound to input
    input.addEventListener('keydown', () => {
        typingSound.currentTime = 0;
        typingSound.volume = 0.2;
        typingSound.play();
    });
    
    birthdayForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const code = input.value;
        
        // Change this to your desired code
        if (code === 'ZD412') {
            // Hide form and show message
            birthdayForm.style.display = 'none';
            statusMessage.style.display = 'none';
            birthdayMessage.classList.remove('hidden');
            
            // Play success sound
            accessGranted.currentTime = 0;
            accessGranted.play();
            
            // Redirect after delay
            setTimeout(() => {
                window.location.href = "https://discord.gg/Lands";
            }, 3000);
        } else {
            statusMessage.textContent = "Incorrect code! Try again";
            statusMessage.style.color = "#ff0000";
            
            // Play error sound
            accessDenied.currentTime = 0;
            accessDenied.volume = 0.3;
            accessDenied.play();
            
            // Shake animation
            input.style.animation = "shake 0.5s";
            setTimeout(() => {
                input.style.animation = "none";
            }, 500);
        }
    });
    
    // Window resize handler
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Touch screen support
    document.addEventListener('touchstart', function() {
        // Ensure audio plays on mobile
        birthdaySound.play().catch(e => console.log("Audio play failed:", e));
    });
});
