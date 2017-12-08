var canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var context = canvas.getContext('2d');
var fireworks = [], particles = [];
var mouseX, mouseY;
var isMouseDown = false;
var hue = 120;
var ticksSinceFireworkAutomated = 0;
var ticksSinceFirework = 0;
var r = 255, g = 0, b = 0;
var dr = 1, dg = -1, db = 1;


function random(min, max) {
    return Math.random() * (max - min) + min;
}


function calculateDistance(aX, aY, bX, bY) {
    return Math.sqrt(Math.pow(aX - bX, 2) + Math.pow(aY - bY, 2));
}


function cleanCanvas() {
    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = "rgba(0, 0, 0, " + CANVAS_CLEANUP_ALPHA + ")";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.globalCompositeOperation = 'lighter';
    context.font = "30px Comic Sans MS";
    if (r == 0 || r == 255)
        dr = -dr;
    if (g == 0 || g == 255)
        dg = -dg;
    if (b == 0 || b == 255)
        db = -db;
    r += dr;
    g += dg;
    b += db;
    context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
    context.textAlign = "center";
    context.fillText("新婚快乐", canvas.width/2, canvas.height/2 - 40);
    context.fillText("百年好合", canvas.width/2, canvas.height/2 + 40);
}


function createParticles(x, y) {
    var particleCount = PARTICLE_COUNT;
    while (particleCount--) {
        particles.push(new Particle(x, y));
    }
}


function launchAutomatedFirework() {
    if (ticksSinceFireworkAutomated >= random(TICKS_PER_FIREWORK_AUTOMATED_MIN, TICKS_PER_FIREWORK_AUTOMATED_MAX)) {
        if(!isMouseDown) {
            fireworks.push(
                new Firework(canvas.width / 2, canvas.height, random(0, canvas.width), random(0, canvas.height / 2)));
            ticksSinceFireworkAutomated = 0;
        }
    } else {
        ticksSinceFireworkAutomated++;
    }
}


function launchManualFirework() {
    if(ticksSinceFirework >= TICKS_PER_FIREWORK_MIN) {
        if(isMouseDown) {
            fireworks.push(new Firework(canvas.width / 2, canvas.height, mouseX, mouseY));
            ticksSinceFirework = 0;
        }
    } else {
        ticksSinceFirework++;
    }
}


function updateFireworks() {
    for (var i = fireworks.length - 1; i >= 0; i--) {
        fireworks[i].draw();
        fireworks[i].update(i);
    }
}


function updateParticles() {
    for (var i = particles.length - 1; i >= 0; i--) {
        particles[i].draw();
        particles[i].update(i);
    }
}


window.requestAnimFrame = (function() {
    return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
        function(callback) {  // fall back for old browsers
            window.setTimeout(callback, 1000 / 60);
        };
})();


function loop() {
    requestAnimFrame(loop);
    hue += HUE_STEP_INCREASE;
    cleanCanvas();
    updateFireworks();
    updateParticles();
    launchAutomatedFirework();
    launchManualFirework();
}

window.onload = loop;


function Firework(startX, startY, endX, endY) {
    this.x = startX;
    this.y = startY;
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    this.distanceToEnd = calculateDistance(startX, startY, endX, endY);
    this.distanceTraveled = 0;
    this.trail = [];
    this.trailLength = FIREWORK_TRAIL_LENGTH;
    while(this.trailLength--) {
        this.trail.push([this.x, this.y]);
    }
    this.angle = Math.atan2(endY - startY, endX - startX);
    this.speed = FIREWORK_SPEED;
    this.acceleration = FIREWORK_ACCELERATION;
    this.brightness = random(FIREWORK_BRIGHTNESS_MIN, FIREWORK_BRIGHTNESS_MAX);
    this.targetRadius = 2.5;

    this.update = function(index) {
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        if (FIREWORK_TARGET_INDICATOR_ENABLED) {
            if(this.targetRadius < 8) {
                this.targetRadius += 0.3;
            } else {
                this.targetRadius = 1;
            }
        }
        this.speed *= this.acceleration;
        var xVelocity = Math.cos(this.angle) * this.speed;
        var yVelocity = Math.sin(this.angle) * this.speed;
        this.distanceTraveled = calculateDistance(this.startX, this.startY, this.x + xVelocity, this.y + yVelocity);
        if (this.distanceTraveled >= this.distanceToEnd) {
            fireworks.splice(index, 1);
            createParticles(this.endX, this.endY);
        } else {
            this.x += xVelocity;
            this.y += yVelocity;
        }
    };

    this.draw = function() {
        context.beginPath();
        var trailEndX = this.trail[this.trail.length - 1][0];
        var trailEndY = this.trail[this.trail.length - 1][1];
        context.moveTo(trailEndX, trailEndY);
        context.lineTo(this.x, this.y);
        context.strokeStyle = "hsl(" + hue + ", 100%, " + this.brightness + "%)";
        context.stroke();
        if (FIREWORK_TARGET_INDICATOR_ENABLED) {
            context.beginPath();
            context.arc(this.endX, this.endY, this.targetRadius, 0, Math.PI * 2);
            context.stroke();
        }
    };
}


function Particle(x, y) {
    this.x = x;
    this.y = y;
    this.angle = random(0, Math.PI * 2);
    this.friction = PARTICLE_FRICTION;
    this.gravity = PARTICLE_GRAVITY;
    this.hue = random(hue - PARTICLE_HUE_VARIANCE, hue + PARTICLE_HUE_VARIANCE);
    this.brightness = random(PARTICLE_BRIGHTNESS_MIN, PARTICLE_BRIGHTNESS_MAX);
    this.decay = random(PARTICLE_DECAY_MIN, PARTICLE_DECAY_MAX);
    this.speed = random(PARTICLE_SPEED_MIN, PARTICLE_SPEED_MAX);
    this.trail = [];
    this.trailLength = PARTICLE_TRAIL_LENGTH;
    while(this.trailLength--) {
        this.trail.push([this.x, this.y]);
    }
    this.transparency = PARTICLE_TRANSPARENCY;

    this.update = function(index) {
        this.trail.pop();
        this.trail.unshift([this.x, this.y]);
        this.speed *= this.friction;
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed + this.gravity;
        this.transparency -= this.decay;
        if(this.transparency <= this.decay) {
            particles.splice(index, 1);
        }
    };

    this.draw = function() {
        context.beginPath();
        var trailEndX = this.trail[this.trail.length - 1][0];
        var trailEndY = this.trail[this.trail.length - 1][1];
        context.moveTo(trailEndX, trailEndY);
        context.lineTo(this.x, this.y);
        context.strokeStyle = "hsla(" + this.hue + ", 100%, " + this.brightness + "%, " + this.transparency + ")";
        context.stroke();
    };
}