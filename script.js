document.addEventListener('DOMContentLoaded', function() {
    // Canvas setup
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Rain elements
    const letters = "ッ".split('');
    const flowers = ['🌹', '🌷', '💮', '🪷', '🏵️', '🌺', '🥀', '🌼', '🌸'];
    const fontSize = 20;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = {
            y: Math.random() * -canvas.height,
            char: Math.random() > 0.3 ? 
                letters[Math.floor(Math.random() * letters.length)] : 
                flowers[Math.floor(Math.random() * flowers.length)],
            speed: 1 + Math.random() * 3
        };
    }
    
    // Animation loop
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
    
    // Password system
    const passwordForm = document.getElementById('passwordForm');
    const passwordInput = document.getElementById('passwordInput');
    const statusMessage = document.getElementById('statusMessage');
    const loginContainer = document.getElementById('loginContainer');
    const galleryContainer = document.getElementById('galleryContainer');
    const currentImage = document.getElementById('currentImage');
    const imageText = document.getElementById('imageText');
    
    passwordForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (passwordInput.value === 'ZD412') {
            statusMessage.textContent = 'Access granted! Loading...';
            statusMessage.style.color = '#0f0';
            
            setTimeout(function() {
                loginContainer.style.display = 'none';
                galleryContainer.style.display = 'flex';
                
                // Load content
                currentImage.src = 'img/T1.png';
             imageText.innerHTML = 
                "حبيت اقول لك روح انتحر<br>" +
                "مصدق انه في هدية لك<br>" +
                "ما في الا هاذي الصورة تكفي و توفي<br>" +
                "المتحدث مايكي";
            }, 800);
        } else {
            statusMessage.textContent = 'Wrong password! Try again';
            statusMessage.style.color = '#f00';
            passwordInput.value = '';
            passwordInput.focus();
        }
    });
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
