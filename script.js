document.addEventListener('DOMContentLoaded', function() {
    // Audio setup
    const bgMusic = document.getElementById('bgMusic');
    const successSound = document.getElementById('successSound');
    bgMusic.volume = 0.3;
    successSound.volume = 0.7;

    // Gallery variables
    const imagePaths = Array.from({length: 16}, (_, i) => `img/image${i+1}.jpg`);
    const imageTexts = [
        "Text for image 1", "Text for image 2", "Text for image 3", "Text for image 4",
        "Text for image 5", "Text for image 6", "Text for image 7", "Text for image 8",
        "Text for image 9", "Text for image 10", "Text for image 11", "Text for image 12",
        "Text for image 13", "Text for image 14", "Text for image 15", "Text for image 16"
    ];
    let currentIndex = 0;
    const galleryContainer = document.getElementById('galleryContainer');
    const currentImage = document.getElementById('currentImage');
    const imageText = document.getElementById('imageText');
    const loginContainer = document.getElementById('loginContainer');

    // Start music on first interaction
    document.addEventListener('click', function initAudio() {
        bgMusic.play().catch(e => console.log("Audio error:", e));
        document.removeEventListener('click', initAudio);
    }, { once: true });

    // Canvas setup
    const canvas = document.getElementById('birthdayRain');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Rain elements
    const letters = "ッ".split('');
    const flowers = ['🌹', '🌷', '💮', '🪷', '🏵️', '🌺', '🥀', '🌼', '🌸'];
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    const drops = [];
    
    // Initialize drops
    for (let i = 0; i < columns; i++) {
        drops[i] = {
            y: Math.random() * -100,
            char: Math.random() > 0.3 ? 
                letters[Math.floor(Math.random() * letters.length)] : 
                flowers[Math.floor(Math.random() * flowers.length)],
            speed: 1 + Math.random() * 2
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
    
    function showImage(index) {
        const imgPath = imagePaths[index];
        const img = new Image();
        img.onload = function() {
            currentImage.src = imgPath;
            imageText.textContent = imageTexts[index];
        };
        img.onerror = function() {
            currentImage.src = 'img/notfound.jpg';
            imageText.textContent = "Image not found - " + imageTexts[index];
        };
        img.src = imgPath;
    }

    function startGallery() {
        loginContainer.style.display = 'none';
        galleryContainer.style.display = 'flex';
        showImage(0);
        
        setInterval(() => {
            currentIndex = (currentIndex + 1) % imagePaths.length;
            showImage(currentIndex);
            
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }, 4000); 
    }
    
    document.getElementById('passwordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const input = document.getElementById('passwordInput');
        const status = document.getElementById('statusMessage');
        
        if (input.value === 'ZD412') {
            status.textContent = "Access granted! Loading gallery...";
            status.style.color = "#0f0";
            successSound.play();
            setTimeout(startGallery, 4000);
        } else {
            status.textContent = "Invalid password! Try again";
            status.style.color = "#f00";
            input.style.animation = "shake 0.5s";
            setTimeout(() => input.style.animation = "", 500);
        }
    });
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
});
