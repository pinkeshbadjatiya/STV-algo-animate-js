## STV algo

1. `result.js` -> Simple implementation of STV algo with poor precision, but works :)
2. `result_precise.js`  -> Precise calculation of floats upto 40 decimal places.

### Convention
`N` - No of delegations  
`S` - Size of Electorate (in attendance)  
`B` - Ballots  
`B[i]` = [𝕔1, 𝕔2, ...]  -  Candidate Roll, with priority c1 > c2 > ..  
`t` - Threshold  
`Winners` - Stores the winner candidates in the order of votes.  
`Loosers` - Stores the sure loosing candidates in the order of votes. After all the iterations, the remaining candidates too loose.  


### Assumption
1. Ballot Design is such that all voters order all candidates.
2. More candidates than Delegation size. Strictly followed.
3. Droop Quota.
4. Floating Point Calculations are `Big.js` <i>Bharose</i>. (though, they r upto 40dp)

### Features
- Randomly choose among the people with same votes to ensure fairness.
- Fraction precision upto 40 decimal places  
- Check if re-election is needed. (This possibility won't e there bcoz of Droop quota, but still)

### Algorithm & Proof
[Google Docs](https://docs.google.com/document/d/1G2qwbsjXX_-1gop6H3xsHkQaoUvn9gRdyS0dKxYQZNo/edit?usp=sharing)
