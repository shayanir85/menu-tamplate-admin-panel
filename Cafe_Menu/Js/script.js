    document.getElementById('enterBtn').addEventListener('click', function() {
      const body = document.body;
      const card = document.querySelector('.glass-card');
      
      // انیمیشن خروج
      card.style.transition = 'all 0.5s ease-in';
      card.style.transform = 'scale(0.9) translateY(20px)';
      card.style.opacity = '0';
      
      setTimeout(() => {
          body.style.transition = 'opacity 0.5s ease';
          body.style.opacity = '0';
      }, 300);

      setTimeout(() => {
        window.location.href = './Html/home.html'; 
      }, 800);
    });