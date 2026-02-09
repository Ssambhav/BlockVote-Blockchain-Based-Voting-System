// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Voting {
    address public admin;
    bool public votingEnded;
    
    struct Candidate {
        uint id;
        string name;
        string party;
        string promises;
        uint voteCount;
    }
    
    struct Voter {
        bool voted;
        uint vote;
    }
    
    mapping(uint => Candidate) public candidates;
    mapping(address => Voter) public voters;
    
    uint public candidatesCount;
    
    event CandidateAdded(uint indexed candidateId, string name);
    event Voted(address indexed voter, uint indexed candidateId);
    event VotingEnded();
    
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can perform this action");
        _;
    }
    
    modifier votingActive() {
        require(!votingEnded, "Voting has ended");
        _;
    }
    
    constructor() {
        admin = msg.sender;
        votingEnded = false;
        
        // Add initial candidates
        addCandidate("Joe Biden", "Democratic Party", "Climate change, Healthcare reform, Education");
        addCandidate("Donald Trump", "Republican Party", "Economy, Immigration, America First");
    }
    
    function addCandidate(string memory _name, string memory _party, string memory _promises) public onlyAdmin {
        candidatesCount++;
        candidates[candidatesCount] = Candidate(candidatesCount, _name, _party, _promises, 0);
        emit CandidateAdded(candidatesCount, _name);
    }
    
    function vote(uint _candidateId) public votingActive {
        require(!voters[msg.sender].voted, "You have already voted");
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        
        voters[msg.sender].voted = true;
        voters[msg.sender].vote = _candidateId;
        candidates[_candidateId].voteCount++;
        
        emit Voted(msg.sender, _candidateId);
    }
    
    function endVoting() public onlyAdmin {
        votingEnded = true;
        emit VotingEnded();
    }
    
    function getCandidate(uint _candidateId) public view returns (
        uint id,
        string memory name,
        string memory party,
        string memory promises,
        uint voteCount
    ) {
        require(_candidateId > 0 && _candidateId <= candidatesCount, "Invalid candidate ID");
        Candidate memory candidate = candidates[_candidateId];
        return (candidate.id, candidate.name, candidate.party, candidate.promises, candidate.voteCount);
    }
    
    function hasVoted(address _voter) public view returns (bool) {
        return voters[_voter].voted;
    }
    
    function getLeadingCandidate() public view returns (string memory leadingName, uint leadingVotes, bool isTie) {
        if (candidatesCount == 0) {
            return ("No candidates", 0, false);
        }
        
        uint maxVotes = 0;
        uint leadingId = 0;
        uint countLeading = 0;
        
        for (uint i = 1; i <= candidatesCount; i++) {
            if (candidates[i].voteCount > maxVotes) {
                maxVotes = candidates[i].voteCount;
                leadingId = i;
                countLeading = 1;
            } else if (candidates[i].voteCount == maxVotes) {
                countLeading++;
            }
        }
        
        if (maxVotes == 0) {
            return ("No votes yet", 0, false);
        } else if (countLeading > 1) {
            return ("", maxVotes, true);
        } else {
            return (candidates[leadingId].name, maxVotes, false);
        }
    }
}