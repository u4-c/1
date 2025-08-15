// Binary rain effect
document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('binaryRain');
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Binary characters - mix of 1 and 0
    const binary = '01';
    const columns = canvas.width / 20; // 20px per column
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = Math.floor(Math.random() * canvas.height);
    }
    
    // Draw function
    function draw() {
        // Semi-transparent black background for trail effect
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#0f0'; // Green text
        ctx.font = '15px monospace';
        
        for (let i = 0; i < drops.length; i++) {
            const text = binary.charAt(Math.floor(Math.random() * binary.length));
            ctx.fillText(text, i * 20, drops[i] * 20);
            
            // Reset drop to top when it reaches bottom
            if (drops[i] * 20 > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    // Animation loop
    setInterval(draw, 33);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Login form handling
    const loginForm = document.getElementById('loginForm');
    const statusMessage = document.getElementById('status');
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        statusMessage.textContent = "ACCESS DENIED... INITIATING SECURITY PROTOCOL";
        statusMessage.classList.add('blink');
        
        // Simulate hacking effect
        setTimeout(() => {
            statusMessage.textContent = "BRUTE FORCE ATTEMPT DETECTED";
        }, 1500);
        
        setTimeout(() => {
            statusMessage.textContent = "SYSTEM LOCKDOWN IN PROGRESS...";
        }, 3000);
    });
});
