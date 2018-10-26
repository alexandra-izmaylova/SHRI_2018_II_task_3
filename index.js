window.onload = function () {
    var minBrightness = 0;
    var maxBrightness = 100;
    var brightnessStep = 1;
    var brightness = 100;
    var toDegrees = function (radians) { return (radians * 180.0) / Math.PI; };
    var container = document.querySelector('.container_image');
    var image = document.querySelector('.camera');
    var brightness_now = document.getElementById('brightness_feedback');
    var setBrightness = function (angle) {
        if (angle > 0) {
            brightness = Math.max(brightness - brightnessStep, minBrightness);
        }
        else if (angle < 0) {
            brightness = Math.min(brightness + brightnessStep, maxBrightness);
        }
        image.style.filter = "brightness(" + brightness + "%)";
        brightness_now.textContent = "\u042F\u0440\u043A\u043E\u0441\u0442\u044C: " + brightness + " %";
    };
    var minScale = Math.max(container.clientWidth / image.clientWidth, container.clientHeight / image.clientHeight);
    var maxScale = minScale * 3;
    var scale = minScale;
    var scale_now = document.getElementById('zoom_feedback');
    image.style.transform = "scale(" + scale + ")";
    var setScale = function (delta) {
        if (delta > 1.0) {
            scale = Math.min(scale * delta, maxScale);
        }
        else if (delta < 1.0) {
            scale = Math.max(scale * delta, minScale);
        }
        image.style.transform = "scale(" + scale + ")";
        scale_now.textContent = "\u041C\u0430\u0441\u0448\u0442\u0430\u0431: " + scale + " %";
    };
    var left = 0;
    var translate = function (delta) {
        left += delta;
        console.log(left);
        image.style.left = left + "px";
    };
    var hypot = function (x, y) {
        return Math.sqrt(x * x + y * y);
    };
    var getDistance = function (t) {
        return hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    };
    var getAngle = function (t) {
        return toDegrees(Math.atan2(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY));
    };
    var initialAngle;
    var initialDistance;
    var startX;
    var onTouchStart = function (event) {
        event.preventDefault();
        if (event.touches.length == 2) {
            initialAngle = getAngle(event.touches);
            initialDistance = getDistance(event.touches);
        }
        else if (event.touches.length == 1) {
            startX = event.touches[0].clientX;
        }
    };
    var onTouchMove = function (event) {
        event.preventDefault();
        if (event.touches.length == 2 && initialAngle && initialDistance) {
            var angle = getAngle(event.touches) - initialAngle;
            var distance = getDistance(event.touches);
            var delta = distance / initialDistance;
            initialDistance = distance;
            setBrightness(angle);
            setScale(delta);
        }
        else if (event.touches.length == 1 && startX) {
            var x = event.touches[0].clientX;
            var delta = x - startX;
            startX = x;
            translate(delta);
        }
    };
    var onTouchEnd = function (event) {
        event.preventDefault();
    };
    image.addEventListener('touchstart', onTouchStart);
    image.addEventListener('touchmove', onTouchMove);
    image.addEventListener('touchend', onTouchEnd);
    image.addEventListener('touchcancel', onTouchEnd);
};
