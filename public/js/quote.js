document.addEventListener("DOMContentLoaded", () => {
document.getElementById("calcBtn").addEventListener("click", function(e) {e.preventDefault();

    // Get input values
    const areaSize = parseFloat(document.getElementById("area-size").value); // in square feet
    const cleaningType = document.getElementById("service-type").value; // type of cleaning
    const frequency = document.getElementById("frequency").value; // frequency of cleaning
    
    if (isNaN(areaSize) || areaSize <= 0) {
        document.getElementById("estimate-result").innerHTML = "<p>Please enter a valid area size.</p>";
        return;
    }
    let baseRate = areaSize * 0.15; // base rate per square foot
     if (cleaningType === "deep")  baseRate += 70; 
     if (cleaningType === "move-out") baseRate += 100;
     if (cleaningType === "commercial") baseRate += areaSize * 0.10;
     if (cleaningType === "custom-cleaning") baseRate += 50;
     if (cleaningType === "airbnb-cleaning") baseRate += 60;

     if (frequency === "one-time") baseRate *= 1.0;
     if (frequency === "weekly") baseRate *= 0.8;
     if (frequency === "bi-weekly") baseRate *= 0.9;
     if (frequency === "monthly") baseRate *= 0.95;

     document.getElementById("estimate-result").innerHTML = `<p>Your estimated cleaning cost is: <strong>$${baseRate.toFixed(2)}</strong></p>`;
});

// Decorative emojis

    const container = document.body;
    const emojis = ['🧹', '🧼', '🧽', '🪣', '🧴', '🧻', '🪟', '🛁', '✨'];

    for (let i = 0; i < 30; i++) {
        const span = document.createElement('span');
        span.textContent = emojis[Math.floor(Math.random() * emojis.length)];
        span.style.position = 'absolute';
        span.style.top = Math.random() * 90 + '%';
        span.style.left = Math.random() * 90 + '%';
        span.style.fontSize = (Math.random() * 24 + 16) + 'px';
        span.style.opacity = 0.25;
        span.style.pointerEvents = 'none';
        span.style.zIndex = 0;
        container.appendChild(span);
    }
});
