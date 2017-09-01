var timmer;
var currentTime = 0;
var videoSrc = '';
var checkDurationTimmer;
var canplay = false;
var warn = false



window.onload = function() {

    var videoEle = document.getElementsByTagName('video')[0];
    setTimeout(function() {
        videoEle.play()
    }, 3000)
    checkDurationTimmer = setInterval(function() {
        if (stopTime < videoEle.currentTime && !canplay) {
            // alert('can play'+canplay);
            videoEle.pause();

            if (!warn) {
                alert('返回广告页面,分享后才能继续观看哦😄');
                warn = true
            }
            window.parent.cover();

            // pauseVideo();
        }
    }, 500);
    window.scrollTo(0, 0)

};

function pauseVideo() {
    var videoEle = document.getElementsByTagName('video')[0];
    timmer = setInterval(function() {
        videoEle.pause();
    }, 500);
}

function playVideo() {

    var videoEle = document.getElementsByTagName('video')[0];
    window.parent.noCover();
    // document.getElementById('cover').style.display = "none";
    // document.getElementByTagName('video')[0].style.display="block";
    canplay = true;
    // alert('继续播放咯'); 
    clearInterval(checkDurationTimmer);

    // videoEle.play();

}


function exitFull() {

    window.parent.exitFullscreen()
}