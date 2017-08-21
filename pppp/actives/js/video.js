var timmer;
var currentTime = 0;
function getVideoInfo(videoElement) {
    videoElement.play();
    timmer = setInterval(function () {
        if (currentTime >= stopTime) {
            videoElement.pause();
            //弹出遮罩层,停止视频
            document.getElementById('cover').style.display = "block";
            clearInterval(timmer);
        }
        else {
            currentTime++;
        }
        console.log(currentTime);
    }, 1000);
}
window.onload = function () {
    var videoEle = document.getElementsByTagName('video')[0];
    getVideoInfo(videoEle);
};
function playVideo() {
    var videoEle = document.getElementsByTagName('video')[0];
    document.getElementById('cover').style.display = "none";
    videoEle.play();
    console.log(currentTime);
}
playVideo();
