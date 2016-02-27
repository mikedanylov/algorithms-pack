
// parse request url and get param value
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// listen on ajaxsend and get url with params
$(document).ajaxSend(function(e, xhr, opt){

    var amount = getParameterByName('amount', opt.url),
        runList = getParameterByName('runList', opt.url),
        track = getParameterByName('track', opt.url),
        trackType = getParameterByName('trackType', opt.url),
        betType = getParameterByName('betType', opt.url);

    if (amount && runList) {
        console.log('amount: ' + amount);
        console.log('runList: ' + runList.split(','));
        console.log('count: ' + runList.split(',').length);
        console.log('totalAmount: ' + amount * runList.split(',').length);
    }
});
