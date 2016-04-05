var animDuration = 1800;

function createCandidate(candID, name){
    var D = document.createElement('div');
    D.setAttribute('class','candidate')
    var H = document.createElement('h3');
    H.innerHTML = name;
    D.setAttribute('id',candID);
    D.appendChild(H);
    var D2 = document.createElement('div');
    D2.setAttribute('id',candID.toString() + '_size');
    D2.setAttribute('class','bar');
    D.appendChild(D2);
    document.getElementById('cand_list').appendChild(D);
}


function frontRemove(candID) {
    // var r = $.Deferred();
    // $('#' + candID.toString()).animate({opacity: "toggle"}, animDuration, "linear", function(){r.resolve();});
    //$().animate({opacity: "toggle"});
    animToQueue(q, '#' + candID.toString(), {opacity: '0'}, 0);
    // return r;
}

function updateStatus(txt) {
    // $('#status').fadeOut(animDuration/2, function() {
    //     $(this).text(txt).fadeIn(animDuration/2);
    // });
    //animToQueue(q, '#status', txt, 1);
}

var q = $({});

function animToQueue(theQueue, selector, animationprops, isUpdateStatus) {
    if (isUpdateStatus === 1){
        // Is text, then the animation properties are not there. It is the text
        var txt = animationprops;
        // theQueue.queue(function(next) {
        //     $(selector).fadeOut(animDuration/2);
        // });
        animToQueue(q, {opacity: '0'}, 0);
        theQueue.queue(function(next) {
            $(selector).text(txt, next);
            // console.log(txt);
        });
        animToQueue(q, selector, {opacity: '100'}, 0);

        // theQueue.queue(function(next) {
        //     $(selector).fadeIn(animDuration/2);
        // });
    } else {
        theQueue.queue(function(next) {
            $(selector).animate(animationprops, animDuration, next);
        });
    }
}

// usage
// animToQueue(q, '#first', {width: '+=100'});
// animToQueue(q, '#second', {height: '+=100'});
// animToQueue(q, '#second', {width: '-=50'});
// animToQueue(q, '#first', {height: '-=50'});
