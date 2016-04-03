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
var S = Big(B.length);
var t = Big(S).div((N+1)).plus(1).round(0,0);       // equivalent to Math.floor(stuff)..
var count = {};


function printB() {
    for(var i=0; i<B.length;i++) {
        console.log(B[i]);
    }
}

function initDS() {
    Big.DP = 40;        // The maximum number of decimal places of the results of operations involving division.

    for(i in CandidateMap) {          // Init count to zero
        count[i] = Big(0);
        // createCandidate(i,CandidateMap[i]);
    }
    for (var i=0;i<B.length;i++) {      //Initial Counting
        count[B[i][0]] = (count[B[i][0]]).plus(1.0);
    }
}


function NextTopCand(dict) {
    var res = [];
    var val = Big(-1);
    for(i in dict) {
       if ((dict[i]).gte(val)) {
           if (!(dict[i]).eq(val)) {
               res = [];
           }
           val = dict[i];
           res.push(i);                 // Push person with same votes
       }
    }
    return res[Math.floor(Math.random()*res.length)];   // Return random person from those with same no of votes
}

function NextBottomCand(dict) {
    var res = [];
    var val = Big(9999999);
    for(i in dict) {
       if ((dict[i]).lt(val)) {
           res = [];
           res.push(i);
           val = dict[i];
      } else if((dict[i]).eq(val)) {
          res.push(i);                  // Push person with same votes
       }
    }
    return res[Math.floor(Math.random()*res.length)];   // Return random person from those with same no of votes
}


//Function to Transfer votes from Ci, who got k >= t votes, and was qualified to the delegation.
function TransferDown(c, k) {
    var f = (Big(k).sub(t)).div(k);      // Fraction to transfer - The higher the precision, the better it is :)
    for(var i=0; i<B.length;i++) {
        if(B[i][0] == c) {
            B[i].shift();
            if (B[i].length)    // Vote queue becomes empty after last candidate.
                count[B[i][0]] = count[B[i][0]].plus(f);
        }
    }
}


//Function to Transfer votes from 𝕔i, who got least votes in a stage, and was eliminated.
function TransferUp(c) {
    for(var i=0; i<B.length;i++) {
        if(B[i][0] == c) {
            B[i].shift();
            if (B[i].length)    // Vote queue becomes empty after last candidate.
                count[B[i][0]] = count[B[i][0]].plus(1.0);
        }
    }
}

function removeTrace(cand) {
    delete(count[cand]);                    // Remove from count dict
    for(var i=0; i<B.length; i++) {          // Remove his trace from voteQueues
        var ind = B[i].indexOf(parseInt(cand));
        if (ind == -1)
            continue;
        B[i].splice(ind, 1);
    }
}

function Qualify(TopCand) {
    console.log('Winner:', TopCand);
}

function Looser(LastCand) {
    console.log('Looser:', LastCand);
    // frontRemove(LastCand);
}

function reElectionRequired() {
    alert('Papa says. Do it again !!');
}


function calcResult() {         // Delegation Determination
    var n=0, TopCand, MaxVotes;
    while(n < N) {
        TopCand = NextTopCand(count);
        MaxVotes = count[TopCand];
        // updateStatus('Next Candidate is: ', CandidateMap[TopCand], 'with',MaxVotes);
        if( MaxVotes.gte(t)) {
            Qualify(TopCand);
            TransferDown(TopCand, MaxVotes);
            n += 1;
        } else {
            TopCand = NextBottomCand(count);        // Get the bottom candidate as Top :P
            Looser(TopCand);
            TransferUp(TopCand);
        }
        removeTrace(TopCand);
    }
}

initDS();
