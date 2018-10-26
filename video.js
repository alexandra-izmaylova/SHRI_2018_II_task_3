var brightness = 100;
var contrast = 100;
function expandPlayer(event) {
    var element = event.currentTarget.parentElement;
    var position = element.getBoundingClientRect();
    var size = {
        width: window.getComputedStyle(element).width,
        height: window.getComputedStyle(element).height
    };
    element.style.transition = null;
    element.style.position = 'fixed';
    element.style.top = position.top + 'px';
    element.style.left = position.left + 'px';
    element.style.height = size.height;
    element.style.width = size.width;
    element.style.zIndex = '999';
    setTimeout(function () {
        element.style.transition = 'all 0.5s';
        element.style.left = '0';
        element.style.top = '0';
        element.style.width = '100%';
        element.style.height = '100%';
    }, 100);
    setTimeout(function () { return element.classList.add('active'); }, 600);
}
function collapsePlayer(event) {
    var element = event.currentTarget.parentElement;
    element.classList.remove('active');
    var wrapper = element.parentElement;
    var position = wrapper.getBoundingClientRect();
    var size = {
        width: window.getComputedStyle(wrapper).width,
        height: window.getComputedStyle(wrapper).height
    };
    element.style.top = position.top + 'px';
    element.style.left = position.left + 'px';
    element.style.height = size.height;
    element.style.width = size.width;
    element.style.zIndex = '0';
    setTimeout(function () {
        element.style.position = 'static';
        element.style.transition = null;
        element.style.left = '0';
        element.style.top = '0';
        element.style.width = '100%';
        element.style.height = '100%';
    }, 600);
}
function initVideo(video, url) {
    video.addEventListener('click', expandPlayer);
    if (Hls.isSupported()) {
        var hls = new Hls();
        hls.loadSource(url);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, function () {
            video.play();
        });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8';
        video.addEventListener('loadedmetadata', function () {
            video.play();
        });
    }
}
function initButton(button) {
    button.addEventListener('click', collapsePlayer);
}
function initButtonBrightness(range, video, values) {
    range.addEventListener('input', function () {
        brightness = parseFloat(range.value);
        values.textContent = "\u042F\u0440\u043A\u043E\u0441\u0442\u044C: " + brightness / 2 + " %";
        video.style.filter =
            'brightness(' + brightness + '%) contrast(' + contrast + '%)';
    });
}
function initButtonContrast(range, video, values) {
    range.addEventListener('input', function () {
        contrast = parseFloat(range.value);
        values.textContent = "\u041A\u043E\u043D\u0442\u0440\u0430\u0441\u0442: " + contrast / 5 + " %";
        video.style.filter =
            'contrast(' + contrast + '%) brightness(' + brightness + '%)';
    });
}
var video1 = document.querySelector('#video-1');
var video2 = document.querySelector('#video-2');
var video3 = document.querySelector('#video-3');
var video4 = document.querySelector('#video-4');
initVideo(video1, 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
initVideo(video2, 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
initVideo(video3, 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
initVideo(video4, 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8');
initButton(document.getElementById('button-1'));
initButton(document.getElementById('button-2'));
initButton(document.getElementById('button-3'));
initButton(document.getElementById('button-4'));
initButtonBrightness(document.querySelector('#brightness-1'), video1, document.getElementById('values-brightness-1'));
initButtonBrightness(document.querySelector('#brightness-2'), video2, document.getElementById('values-brightness-2'));
initButtonBrightness(document.querySelector('#brightness-3'), video3, document.getElementById('values-brightness-3'));
initButtonBrightness(document.querySelector('#brightness-4'), video4, document.getElementById('values-brightness-4'));
initButtonContrast(document.querySelector('#contrast-1'), video1, document.getElementById('values-contrast-1'));
initButtonContrast(document.querySelector('#contrast-2'), video2, document.getElementById('values-contrast-2'));
initButtonContrast(document.querySelector('#contrast-3'), video3, document.getElementById('values-contrast-3'));
initButtonContrast(document.querySelector('#contrast-4'), video4, document.getElementById('values-contrast-4'));
