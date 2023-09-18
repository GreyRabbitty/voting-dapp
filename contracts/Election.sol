pragma solidity ^0.8.0;

contract Election {
    // Structure to represent a candidate
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    // Store a list of candidates
    Candidate[] public candidates;

    // Keep track of which address has voted
    mapping(address => bool) public voters;

    // Constructor to add candidates
    constructor() {
        addCandidate("AKP - Adalet ve Kalkinma Parti");
        addCandidate("CHP - Cumhuriyet Halk Partisi");
        addCandidate("IYI - Iyi Parti");
        addCandidate("MHP - Milliyetci Hareket Partisi");
        addCandidate("HDP - Halklarin Demokratik Partisi");
    }

    // Function to add a candidate
    function addCandidate(string memory _name) private {
        candidates.push(Candidate(candidates.length, _name, 0));
    }

    // Function to vote for a candidate
    function vote(uint _candidateId) public {
        // Check if the sender has not voted before
        require(!voters[msg.sender], "You have already voted.");

        // Check if the candidate ID is valid
        require(_candidateId < candidates.length, "Invalid candidate ID.");

        // Record that the sender has voted
        voters[msg.sender] = true;

        // Increment the candidate's vote count
        candidates[_candidateId].voteCount++;

        // Emit an event to indicate the vote
        emit Voted(msg.sender, _candidateId);
    }

    // Function to get the total vote count for a candidate
    function getTotalVotes(uint _candidateId) public view returns (uint) {
        require(_candidateId < candidates.length, "Invalid candidate ID.");
        return candidates[_candidateId].voteCount;
    }

    // Event to log when a user votes
    event Voted(address indexed voter, uint indexed candidateId);
}
