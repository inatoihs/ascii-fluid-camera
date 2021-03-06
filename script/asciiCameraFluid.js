// Original code : davidedc (https://github.com/davidedc/Ascii-fluid-simulation-deobfuscated)
var CONSOLE_HEIGHT,
    CONSOLE_WIDTH,
    Particle,
    calculateDensities,
    calculateForces,
    gravity,
    particles,
    pressure,
    loadCamera,
    simulationNext,
    totalOfParticles,
    viscosity;

CONSOLE_WIDTH = 130;

CONSOLE_HEIGHT = 85;

particles = [];

totalOfParticles = 0;

gravity = 1;

pressure = 4;

viscosity = 13;

Particle = (function () {
    function Particle() {}

    Particle.prototype.density = 0.0;

    Particle.prototype.xForce = 0.0;

    Particle.prototype.xVelocity = 0.0;

    Particle.prototype.yForce = 0.0;

    Particle.prototype.yVelocity = 0.0;

    Particle.prototype.wallflag = 0;

    Particle.prototype.dead = false;

    Particle.prototype.xPos = 0.0;

    Particle.prototype.yPos = 0.0;

    return Particle;
})();

loadCamera = function () {
    var i,
        len,
        particlesCounter,
        ref,
        results,
        x,
        xSandboxAreaScan,
        ySandboxAreaScan;

    // TODO: load

    particles = [];
    totalOfParticles = 0;
    xSandboxAreaScan = 0;
    ySandboxAreaScan = 0;
    particlesCounter = 0;
    ref = simulateAscii;
    ref += "\n###\n####\n#######\n########\n##########\n###########\n#############\n###############\n#################\n###################\n#####################\n#########################\n###############################\n################################";
    ref += "\n##########################################";
    ref += "\n################################################                                      ";
    ref += "\n#######################################################                             ##";
    ref += "\n############################################################                    ####";
    ref += "\n################################################################################";
    ref += "\n\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ##                         ##";
    ref += "\n                                                                                               ############      ###########";
    ref += "\n                                                                                               #############    ############";
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
        x = ref[i];
        if (x === '\n') {
            ySandboxAreaScan += 2;
            xSandboxAreaScan = -1;
        } else if (x !== ' ') {
            particles.push(new Particle());
            particles.push(new Particle());
            if (x === '#') {
                particles[particlesCounter].wallflag = particles[
                    particlesCounter + 1
                ].wallflag = 1;
            }
            particles[particlesCounter].xPos = xSandboxAreaScan;
            particles[particlesCounter].yPos = ySandboxAreaScan;
            particles[particlesCounter + 1].xPos = xSandboxAreaScan;
            particles[particlesCounter + 1].yPos = ySandboxAreaScan + 1;
            particlesCounter += 2;
            totalOfParticles = particlesCounter;
        }
        results.push((xSandboxAreaScan += 1));
    }
    return results;
};

calculateDensities = function (particles, totalOfParticles) {
    var i,
        j,
        particlesCursor,
        particlesCursor2,
        particlesDistance,
        particlesInteraction,
        ref,
        ref1,
        xParticleDistance,
        yParticleDistance;
    particlesCursor = 0;
    particlesCursor2 = 0;
    for (
        particlesCursor = i = 0, ref = totalOfParticles;
        0 <= ref ? i < ref : i > ref;
        particlesCursor = 0 <= ref ? ++i : --i
    ) {
        if (particles[particlesCursor].dead) {
            continue;
        }
        particles[particlesCursor].density =
            particles[particlesCursor].wallflag * 9;
        for (
            particlesCursor2 = j = 0, ref1 = totalOfParticles;
            0 <= ref1 ? j < ref1 : j > ref1;
            particlesCursor2 = 0 <= ref1 ? ++j : --j
        ) {
            if (particles[particlesCursor2].dead) {
                continue;
            }
            xParticleDistance =
                particles[particlesCursor].xPos -
                particles[particlesCursor2].xPos;
            yParticleDistance =
                particles[particlesCursor].yPos -
                particles[particlesCursor2].yPos;
            particlesDistance = Math.sqrt(
                xParticleDistance * xParticleDistance +
                    yParticleDistance * yParticleDistance
            );
            particlesInteraction = particlesDistance / 2.0 - 1.0;
            if (Math.floor(1.0 - particlesInteraction) > 0) {
                particles[particlesCursor].density +=
                    particlesInteraction * particlesInteraction;
            }
        }
    }
};

calculateForces = function (particles, totalOfParticles) {
    var i,
        j,
        particlesCursor,
        particlesCursor2,
        particlesDistance,
        particlesInteraction,
        ref,
        ref1,
        xParticleDistance,
        yParticleDistance;
    particlesCursor = 0;
    particlesCursor2 = 0;
    for (
        particlesCursor = i = 0, ref = totalOfParticles;
        0 <= ref ? i < ref : i > ref;
        particlesCursor = 0 <= ref ? ++i : --i
    ) {
        if (
            particles[particlesCursor].wallflag === 1 ||
            particles[particlesCursor].dead
        ) {
            continue;
        }
        particles[particlesCursor].yForce = gravity;
        particles[particlesCursor].xForce = 0;
        for (
            particlesCursor2 = j = 0, ref1 = totalOfParticles;
            0 <= ref1 ? j < ref1 : j > ref1;
            particlesCursor2 = 0 <= ref1 ? ++j : --j
        ) {
            if (particles[particlesCursor2].dead) {
                continue;
            }
            xParticleDistance =
                particles[particlesCursor].xPos -
                particles[particlesCursor2].xPos;
            yParticleDistance =
                particles[particlesCursor].yPos -
                particles[particlesCursor2].yPos;
            particlesDistance = Math.sqrt(
                xParticleDistance * xParticleDistance +
                    yParticleDistance * yParticleDistance
            );
            particlesInteraction = particlesDistance / 2.0 - 1.0;
            if (Math.floor(1.0 - particlesInteraction) > 0) {
                particles[particlesCursor].xForce +=
                    (particlesInteraction *
                        (xParticleDistance *
                            (3 -
                                particles[particlesCursor].density -
                                particles[particlesCursor2].density) *
                            pressure +
                            particles[particlesCursor].xVelocity * viscosity -
                            particles[particlesCursor2].xVelocity *
                                viscosity)) /
                    particles[particlesCursor].density;
                particles[particlesCursor].yForce +=
                    (particlesInteraction *
                        (yParticleDistance *
                            (3 -
                                particles[particlesCursor].density -
                                particles[particlesCursor2].density) *
                            pressure +
                            particles[particlesCursor].yVelocity * viscosity -
                            particles[particlesCursor2].yVelocity *
                                viscosity)) /
                    particles[particlesCursor].density;
            }
        }
    }
};

simulationNext = function () {
    var i,
        j,
        k,
        particlesCursor,
        ref,
        ref1,
        ref2,
        screenBuffer,
        screenBufferIndex,
        screenBufferString,
        x,
        y;
    if (notSimulating) {
        return;
    }
    calculateDensities(particles, totalOfParticles);
    calculateForces(particles, totalOfParticles);
    screenBuffer = [];
    screenBufferIndex = 0;
    for (
        screenBufferIndex = i = 0, ref = CONSOLE_WIDTH * CONSOLE_HEIGHT;
        0 <= ref ? i < ref : i > ref;
        screenBufferIndex = 0 <= ref ? ++i : --i
    ) {
        screenBuffer[screenBufferIndex] = 0;
    }
    for (
        particlesCursor = j = 0, ref1 = totalOfParticles;
        0 <= ref1 ? j < ref1 : j > ref1;
        particlesCursor = 0 <= ref1 ? ++j : --j
    ) {
        if (particles[particlesCursor].wallflag === 0) {
            if (
                Math.sqrt(
                    particles[particlesCursor].xForce *
                        particles[particlesCursor].xForce +
                        particles[particlesCursor].yForce *
                            particles[particlesCursor].yForce
                ) < 4.2
            ) {
                particles[particlesCursor].xVelocity +=
                    particles[particlesCursor].xForce / 10;
                particles[particlesCursor].yVelocity +=
                    particles[particlesCursor].yForce / 10;
            } else {
                particles[particlesCursor].xVelocity +=
                    particles[particlesCursor].xForce / 11;
                particles[particlesCursor].yVelocity +=
                    particles[particlesCursor].yForce / 11;
            }
            particles[particlesCursor].xPos +=
                particles[particlesCursor].xVelocity;
            particles[particlesCursor].yPos +=
                particles[particlesCursor].yVelocity;
        }
        x = Math.round(particles[particlesCursor].xPos);
        y = Math.round(particles[particlesCursor].yPos / 2);
        screenBufferIndex = Math.round(x + CONSOLE_WIDTH * y);
        if (
            y >= 0 &&
            y < CONSOLE_HEIGHT - 1 &&
            x >= 0 &&
            x < CONSOLE_WIDTH - 1
        ) {
            screenBuffer[screenBufferIndex] |= 8;
            screenBuffer[screenBufferIndex + 1] |= 4;
            screenBuffer[screenBufferIndex + CONSOLE_WIDTH] |= 2;
            screenBuffer[screenBufferIndex + CONSOLE_WIDTH + 1] |= 1;
        } else {
            particles[particlesCursor].dead = true;
        }
    }
    screenBufferString = '';
    for (
        screenBufferIndex = k = 0, ref2 = CONSOLE_WIDTH * CONSOLE_HEIGHT;
        0 <= ref2 ? k < ref2 : k > ref2;
        screenBufferIndex = 0 <= ref2 ? ++k : --k
    ) {
        if (screenBufferIndex % CONSOLE_WIDTH === CONSOLE_WIDTH - 1) {
            screenBufferString += '<br>';
        } else {
            screenBufferString += " '`-.|//,\\|\\_\\/#"[
                screenBuffer[screenBufferIndex]
            ];
        }
    }
    document.getElementById('ascii').innerHTML = screenBufferString.replace(
        / /g,
        '&nbsp;'
    );
    return window.requestAnimationFrame(simulationNext);
};

//# sourceMappingURL=asciiFluidSimulation.js.map
