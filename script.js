document.addEventListener('DOMContentLoaded', function() {
    // Function to animate counters
    function animateCounters() {
        document.querySelectorAll('.count-number').forEach(function(counter) {
            let startValue = 0;
            const endValue = parseInt(counter.getAttribute('data-to'));
            const duration = parseInt(counter.getAttribute('data-speed'));
            const increment = endValue / (duration / 16); // 60 FPS

            function updateCounter() {
                startValue += increment;
                if(startValue < endValue) {
                    counter.textContent = Math.floor(startValue).toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = endValue.toLocaleString();
                }
            }

            updateCounter();
        });
    }

    // Start animation when page loads
    animateCounters();

    // Restart animation when counter section comes into view
    let animated = false;
    window.addEventListener('scroll', function() {
        const counterSection = document.querySelector('.counter');
        if(!counterSection) return;

        const rect = counterSection.getBoundingClientRect();
        if(rect.top <= window.innerHeight && !animated) {
            animateCounters();
            animated = true;
        } else if(rect.top > window.innerHeight) {
            animated = false;
        }
    });
});