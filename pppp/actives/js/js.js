function getThumbsUp() {
    $.ajax({
        url: 'http://wq8.youqulexiang.com/share.thumbsup.go?url=' + location.href,
        success: function(rtn) {
            $('#number').text(rtn.data);
        }
    })


}


$(function() {
    getThumbsUp();
})


function postThumbsUp() {
    if (!isThumbsedPage(location.href)) {
        storageThumbsUpPage(location.href);


        $.ajax({
            url: 'http://wq8.youqulexiang.com/share.thumbsup.go',
            method: 'post',
            data: { url: location.href },
            success: function(rtn) {

                getThumbsUp();

            }
        })
    }
}

function storageThumbsUpPage(url) {
    var pagesStr = localStorage.getItem('pages');
    var pages = JSON.parse(pagesStr ? pagesStr : '[]');


    pages.push(url);
    localStorage.setItem('pages', JSON.stringify(pages));
}

/**
 * 是否已经点过赞
 * @param {*} url 
 */
function isThumbsedPage(url) {
    var pagesStr = localStorage.getItem('pages');
    var pages = JSON.parse(pagesStr ? pagesStr : '[]');
    let result = false;
    pages.forEach(function(page) {
        if (page == url) {
            result = true
        }
    });
    console.log(result);
    // debugger;
    return result;
}