document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('binaryRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const binary = '01';
    const columns = canvas.width / 20;
    const drops = [];
    
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = '#0f0';
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = binary.charAt(Math.floor(Math.random() * binary.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }
    setInterval(draw, 33);
    
    const loginForm = document.getElementById('loginForm');
    const statusMessage = document.getElementById('status');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        if (username === 'orignal.trk' && password === 'ZD412') {
            statusMessage.textContent = "ACCESS GRANTED... WELCOME AGENT";
            statusMessage.style.color = "#0f0";
            statusMessage.classList.remove('blink');
            
            document.body.style.animation = "glitch 0.5s infinite";
            setTimeout(() => {
                document.body.style.animation = "none";
                window.location.href = "https://github.com"; 
            }, 2000);
        } 
        else {
            statusMessage.textContent = "ACCESS DENIED: INVALID CREDENTIALS";
            statusMessage.style.color = "#f00";
            statusMessage.classList.add('blink');
            
            document.body.style.animation = "glitch 0.2s infinite";
            setTimeout(() => {
                document.body.style.animation = "none";
            }, 1000);
        }
    });
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
