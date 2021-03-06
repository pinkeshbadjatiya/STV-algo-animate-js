var N = 3;      // No of delegations
var B = [
        [1,2,3,4,5],
        [1,3,2,4,5],
        [1,2,3,4,5],
        [4,1,2,3,5],
        [4,2,3,1,5],
        [2,4,1,5,3],
        [2,4,1,3,5],
        [2,3,1,4,5],
        [2,1,3,4,5],
        [2,1,3,4,5]
];
var CandidateMap = {
    1: "Suhas",
    2: "Mukul Hase",
    3: "Jerin Philip",
    4: "Pinkesh",
    5: "Vinay"
};
var S = B.length;
var t = Math.floor(S/(N+1)) + 1;
var count = {};


function initDS() {
    for(i in CandidateMap) {          // Init count to zero
        count[i] = 0.0;
        createCandidate(i,CandidateMap[i]);
    }
    for (var i=0;i<B.length;i++) {      //Initial Counting
        count[B[i][0]] += 1.0;
    }
}


function NextTopCand(dict) {
    var key,val=-1;
    for(i in dict) {
       if (dict[i] >= val) {
           val = dict[i];
           key = i;
       }
    }
    return key;
}

function NextBottomCand(dict) {
    var key,val=9999999;
    for(i in dict) {
       if (dict[i] < val) {
           val = dict[i];
           key = i;
       }
    }
    return key;
}


//Function to Transfer votes from Ci, who got k >= t votes, and was qualified to the delegation.
function TransferDown(c, k) {
    var f = (k - t)/k;      // Fraction to transfer - The higher the precision, the better it is :)
    for(var i=0; i<B.length;i++) {
        if(B[i][0] == c) {
            B[i].shift();
            count[B[i][0]] += f;
        }
    }
}


//Function to Transfer votes from 𝕔i, who got least votes in a stage, and was eliminated.
function TransferUp(c) {
    for(var i=0; i<B.length;i++) {
        if(B[i][0] == c) {
            B[i].shift();
            count[B[i][0]] += 1.0;
        }
    }
}

function removeTrace(cand) {
    delete(count[cand]);        // Just Remove from count dict
}

function Qualify(TopCand) {
    console.log('Winner:',TopCand);
}

function Looser(LastCand) {
    console.log('Looser:',LastCand);
    frontRemove(LastCand);
}

var n=0;

function calcResult() {         // Delegation Determination
    if (n>=N) {
        // clearInterval(mainLoop);
        return;
    }
    if (Object.keys(count).length <=0) {
        alert('Re-election needed !!!!');
        return;
    }

    var TopCand = NextTopCand(count);
    var MaxVotes = count[TopCand];
    updateStatus('Next Candidate is: ' + CandidateMap[TopCand] + ' with ' + MaxVotes.toString() + ' votes.');
    if( MaxVotes >= t) {
        Qualify(TopCand);
        removeTrace(TopCand);
        TransferDown(TopCand, MaxVotes);
        n += 1;
    } else {
        // Get the bottom candidate as Top :P
        TopCand = NextBottomCand(count);
        Looser(TopCand);
        removeTrace(TopCand);
        TransferUp(TopCand);
    }
    $(":animated").promise().done(function() {
        document.body.innerHTML += '|-|';
        calcResult();
    });
}

// var mainLoop = setInterval(function(){ calcResult(); }, animDuration*3);
