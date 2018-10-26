window.onload = function () {
    const minBrightness = 0;
    const maxBrightness = 100;
    const brightnessStep = 1;

    let brightness = 100;

    const toDegrees = (radians: number) => (radians * 180.0) / Math.PI;

    const container = document.querySelector('.container_image')!;
    const image = document.querySelector<HTMLElement>('.camera')!;
    const brightness_now = document.getElementById('brightness_feedback')!;

    const setBrightness = (angle: number) => {
        if (angle > 0) {
            brightness = Math.max(brightness - brightnessStep, minBrightness);
        } else if (angle < 0) {
            brightness = Math.min(brightness + brightnessStep, maxBrightness);
        }
        image.style.filter = `brightness(${brightness}%)`;
        brightness_now.textContent = `Яркость: ${brightness} %`;
    };

    const minScale = Math.max(
        container.clientWidth / image.clientWidth,
        container.clientHeight / image.clientHeight
    );
    const maxScale = minScale * 3;
    let scale = minScale;

    const scale_now = document.getElementById('zoom_feedback')!;

    image.style.transform = `scale(${scale})`;

    const setScale = (delta: number) => {
        if (delta > 1.0) {
            scale = Math.min(scale * delta, maxScale);
        } else if (delta < 1.0) {
            scale = Math.max(scale * delta, minScale);
        }
        image.style.transform = `scale(${scale})`;
        scale_now.textContent = `Масштаб: ${scale}`;
    };

    let left = 0;

    const translate = (delta: number) => {
        left += delta;
        console.log(left);
        image.style.left = `${left}px`;
    };

    const hypot = (x: number, y: number) => {
        return Math.sqrt(x * x + y * y);
    }

    const getDistance = (t: TouchList) =>
        hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
    const getAngle = (t: TouchList) =>
        toDegrees(
            Math.atan2(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY)
        );

    let initialAngle: number;
    let initialDistance: number;

    let startX: number;

    const onTouchStart = (event: TouchEvent) => {
        event.preventDefault();

        if (event.touches.length == 2) {
            initialAngle = getAngle(event.touches);
            initialDistance = getDistance(event.touches);
        } else if (event.touches.length == 1) {
            startX = event.touches[0].clientX;
        }
    };

    const onTouchMove = (event: TouchEvent) => {
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

    const onTouchEnd = (event: TouchEvent) => {
        event.preventDefault();
    };

    image.addEventListener('touchstart', onTouchStart);
    image.addEventListener('touchmove', onTouchMove);
    image.addEventListener('touchend', onTouchEnd);
    image.addEventListener('touchcancel', onTouchEnd);

};
