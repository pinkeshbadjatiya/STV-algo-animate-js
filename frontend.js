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
    var r = $.Deferred();
    $('#' + candID.toString()).animate({opacity: "toggle"}, animDuration, "linear", function(){r.resolve();});
    return r;
}

function updateStatus(txt) {
    $('#status').fadeOut(animDuration/2, function() {
        $(this).text(txt).fadeIn(animDuration/2);
    });
}
