/*
 * ASCII Camera
 * http://idevelop.github.com/ascii-camera/
 *
 * Copyright 2013, Andrei Gheorghe (http://github.com/idevelop)
 * Released under the MIT license
 */

var simulateAscii = '';
var notSimulating = false;

(function () {
    var asciiContainer = document.getElementById('ascii');
    var capturing = false;

    camera.init({
        width: 80,
        height: 60,
        fps: 30,
        mirror: true,

        onFrame: function (canvas) {
            ascii.fromCanvas(canvas, {
                callback: function (asciiString) {
                    asciiContainer.innerHTML = asciiString;
                    simulateAscii = asciiString;
                },
            });
        },

        onSuccess: function () {
            document.getElementById('info').style.display = 'none';

            const button = document.getElementById('button');
            button.style.display = 'block';
            const button2 = document.getElementById('button2');
            button2.style.display = 'none';
            button.onclick = function () {
                if (capturing) {
                    camera.pause();
                    button.innerText = 'resume';
                    button2.style.display = 'block';
                    notSimulating = false;
                } else {
                    camera.start();
                    button.innerText = 'pause';
                    button2.style.display = 'none';
                    notSimulating = true;
                }
                capturing = !capturing;
            };

            button2.onclick = function () {
                //load
                loadCamera();
                window.requestAnimationFrame(simulationNext);
                button2.style.display = 'None';
                button.innerText = 'restart';
            };
        },

        onError: function (error) {},

        onNotSupported: function () {
            document.getElementById('info').style.display = 'none';
            asciiContainer.style.display = 'none';
            document.getElementById('notSupported').style.display = 'block';
        },
    });
})();
