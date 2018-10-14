 window.onload = function () {

        const minBrightness = 0;
        const maxBrightness = 100;
        const brightnessStep = 10;

        let brightness = 100;

        Math.toDegrees = (radians) => radians * 180.0 / Math.PI;

        const container = document.querySelector('.card_corpus');
        const image = document.querySelector('.camera');
        const brightness_now = document.querySelector('.brightness_value');


        const setBrightness = (angle) => {
            if (angle > 0) {
                brightness = Math.max(brightness - brightnessStep, minBrightness);
            } else if (angle < 0) {
                brightness = Math.min(brightness + brightnessStep, maxBrightness);
            }
            image.style.filter = `brightness(${brightness}%)`;
            brightness_now.innerHTML = `${brightness}%`;
        };

        const minScale = container.clientWidth / image.clientWidth;
        const maxScale = 1.0;
        const scaleStep = (maxScale - minScale) / 10.0;
        let scale = minScale;

        const scale_now = document.querySelector('.zoom_value');

        image.style.transform = `scale(${scale})`;

        const setScale = (delta) => {
            if (delta > 1.0) {
                scale = Math.min(scale * delta, maxScale);
            } else if (delta < 1.0) {
                scale = Math.max(scale * delta, minScale);
            }
            image.style.transform = `scale(${scale})`;
            scale_now.innerHTML = `${scale}`;
        };

        let left = 0;

        const translate = (delta) => {
            left += delta;
            console.log(left);
            image.style.left = `${left}px`;
        };

        const getDistance = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
        const getAngle = (t) => Math.toDegrees(Math.atan2(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY));

        let initialAngle = null;
        let initialDistance = null;

        let startX = null;

        const onTouchStart = (event) => {
            event.preventDefault();
            
            if (event.touches.length == 2) {
                initialAngle = getAngle(event.touches);
                initialDistance = getDistance(event.touches);
            } else if (event.touches.length == 1) {
                startX = event.touches[0].clientX;
            }
        };

        const onTouchMove = (event) => {
            event.preventDefault();

            if (event.touches.length == 2 && initialAngle && initialDistance) {
                let angle = getAngle(event.touches) - initialAngle;
                let distance = getDistance(event.touches);
                let delta = distance / initialDistance;
                initialDistance = distance;
                setBrightness(angle);
                setScale(delta);
            } else if (event.touches.length == 1 && startX) {
                let x = event.touches[0].clientX;
                let delta = x - startX;
                startX = x;
                translate(delta);
            }
        };

        const onTouchEnd = (event) => {
            event.preventDefault();
            
            if (event.touches.length < 2) {
                initialAngle = null;
                initialDistance = null;
            }
        };

        image.addEventListener("touchstart", onTouchStart);
        image.addEventListener("touchmove", onTouchMove);
        image.addEventListener("touchend", onTouchEnd);
        image.addEventListener("touchcancel", onTouchEnd);

};