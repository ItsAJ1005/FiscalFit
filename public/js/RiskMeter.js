var canvas = document.getElementById('risk-meter-canvas'); // Changed 'meter' to 'risk-meter-canvas'
    var ctx = canvas.getContext('2d');

    function drawMeter(value, minValue, maxValue) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        var color;
        if (value <= 3) {
            color = 'green';
        } else if (value < 7) {
            color = 'yellow';
        } else {
            color = 'red';
        }
        //meter value
        ctx.fillStyle = color;
        var width = (value - minValue) / (maxValue - minValue) * canvas.width;
        var height = canvas.height;
        var borderRadius = 10;
        ctx.beginPath();
        ctx.moveTo(borderRadius, 0);
        ctx.lineTo(width - borderRadius, 0);
        ctx.quadraticCurveTo(width, 0, width, borderRadius);
        ctx.lineTo(width, height - borderRadius);
        ctx.quadraticCurveTo(width, height, width - borderRadius, height);
        ctx.lineTo(borderRadius, height);
        ctx.quadraticCurveTo(0, height, 0, height - borderRadius);
        ctx.lineTo(0, borderRadius);
        ctx.quadraticCurveTo(0, 0, borderRadius, 0);
        ctx.closePath();
        ctx.fill();

        // Draw meter outline
        ctx.strokeStyle = '#000';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        document.getElementById('meter-value').textContent = value;
    }

    var minValue = 1;
    var maxValue = 10;
    var meterValue = 6; // Set the meter value (between 1 and 10)
    drawMeter(meterValue, minValue, maxValue);
