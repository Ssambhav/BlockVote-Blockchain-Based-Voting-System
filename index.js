require('dotenv').config();
const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
app.use(
    fileUpload({
        extended:true
    })
)
app.use(express.static(__dirname));
app.use(express.json());
const path = require("path");
const ethers = require('ethers');

var port = 3000;

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const {abi} = require('./artifacts/contracts/Voting.sol/Voting.json');
const provider = new ethers.providers.JsonRpcProvider(API_URL);

const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.get("/index.html", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
})

app.post("/vote", async (req, res) => {
    var vote = req.body.vote;
    console.log(vote)
    async function storeDataInBlockchain(vote) {
        console.log("Adding the candidate in voting contract...");
        const tx = await contractInstance.addCandidate(vote);
        await tx.wait();
    }
    const bool = await contractInstance.getVotingStatus();
    if (bool == true) {
        await storeDataInBlockchain(vote);
        res.send("The candidate has been registered in the smart contract");
    }
    else {
        res.send("Voting is finished");
    }
});

app.listen(port, function () {
    console.log("App is listening on port 3000")
});

main.js

// Contract ABI
const contractABI = [
    {
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            }
        ],
        "name": "CandidateAdded",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": true,
                "internalType": "address",
                "name": "voter",
                "type": "address"
            },
            {
                "indexed": true,
                "internalType": "uint256",
                "name": "candidateId",
                "type": "uint256"
            }
        ],
        "name": "Voted",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [],
        "name": "VotingEnded",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_party",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_promises",
                "type": "string"
            }
        ],
        "name": "addCandidate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "admin",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "candidates",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "party",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "promises",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "candidatesCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "endVoting",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "getCandidate",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "party",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "promises",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "voteCount",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getLeadingCandidate",
        "outputs": [
            {
                "internalType": "string",
                "name": "leadingName",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "leadingVotes",
                "type": "uint256"
            },
            {
                "internalType": "bool",
                "name": "isTie",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "_voter",
                "type": "address"
            }
        ],
        "name": "hasVoted",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "timeRemaining",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_candidateId",
                "type": "uint256"
            }
        ],
        "name": "vote",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votingEnded",
        "outputs": [
            {
                "internalType": "bool",
                "name": "",
                "type": "bool"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "votingEndTime",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "voters",
        "outputs": [
            {
                "internalType": "bool",
                "name": "voted",
                "type": "bool"
            },
            {
                "internalType": "uint256",
                "name": "vote",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
];

const contractAddress = "0x93be202964f48BBf7B3d613100868DFF921a45f5";

let web3;
let contract;
let accounts = [];
let isAdmin = false;
let votingActive = true;

document.addEventListener('DOMContentLoaded', async () => {
    if (typeof window.ethereum !== 'undefined') {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
        
        document.getElementById('connectWallet').addEventListener('click', connectWallet);
        await connectWallet();
        
        // Update timer and status every second
        setInterval(updateVotingStatus, 1000);
    } else {
        showNotification('Please install MetaMask to use this application', 'error');
    }
});

async function connectWallet() {
    try {
        accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        
        window.ethereum.on('chainChanged', () => window.location.reload());
        window.ethereum.on('accountsChanged', (newAccounts) => {
            accounts = newAccounts;
            checkAdminStatus();
            loadCandidates();
        });

        if (accounts.length > 0) {
            document.getElementById('connectWallet').textContent = "Connected";
            document.getElementById('connectWallet').classList.add('connected');
            
            await checkAdminStatus();
            await loadCandidates();
            await updateVotingStatus();
        }
    } catch (error) {
        console.error("Error connecting wallet:", error);
        showNotification("Error connecting wallet", 'error');
    }
}

async function checkAdminStatus() {
    try {
        const adminAddress = await contract.methods.admin().call();
        isAdmin = (accounts[0].toLowerCase() === adminAddress.toLowerCase());
        
        if (isAdmin) {
            document.getElementById('adminLink').style.display = 'inline-block';
        }
    } catch (error) {
        console.error("Error checking admin status:", error);
    }
}

async function updateVotingStatus() {
    try {
        const votingEnded = await contract.methods.votingEnded().call();
        
        // Update leading candidate and total votes
        const leadingInfo = await contract.methods.getLeadingCandidate().call();
        const leadingName = leadingInfo[0];
        const leadingVotes = leadingInfo[1];
        const isTie = leadingInfo[2];
        
        const totalVotes = await getTotalVotes();
        
        document.getElementById('totalVotes').textContent = totalVotes;
        
        if (leadingName === "No candidates") {
            document.getElementById('currentLeader').textContent = "No candidates";
            document.getElementById('currentLeader').className = "status-value";
        } else if (leadingName === "No votes yet") {
            document.getElementById('currentLeader').textContent = "No votes yet";
            document.getElementById('currentLeader').className = "status-value";
        } else if (isTie) {
            document.getElementById('currentLeader').textContent = `Tie with ${leadingVotes} votes`;
            document.getElementById('currentLeader').className = "status-value tie";
        } else {
            document.getElementById('currentLeader').textContent = `${leadingName} (${leadingVotes} votes)`;
            document.getElementById('currentLeader').className = "status-value leading";
        }
        
        return votingEnded;
    } catch (error) {
        console.error("Error updating voting status:", error);
        document.getElementById('currentLeader').textContent = "Error loading";
        document.getElementById('totalVotes').textContent = "Error loading";
        return false;
    }
  }

  async function getTotalVotes() {
    try {
        const count = await contract.methods.candidatesCount().call();
        let total = 0;
        
        for (let i = 1; i <= count; i++) {
            const candidate = await contract.methods.getCandidate(i).call();
            total += parseInt(candidate.voteCount);
        }
        
        return total;
    } catch (error) {
        console.error("Error getting total votes:", error);
        return 0;
    }
  }

async function loadCandidates() {
    try {
        const container = document.getElementById('candidatesContainer');
        container.innerHTML = '<p>Loading candidates...</p>';
        
        const count = await contract.methods.candidatesCount().call();
        
        if (count === 0) {
            container.innerHTML = '<p>No candidates available</p>';
            return;
        }
        
        container.innerHTML = '';
        
        let hasVoted = false;
        if (accounts.length > 0) {
            try {
                const voter = await contract.methods.voters(accounts[0]).call();
                hasVoted = voter.voted;
            } catch (e) {
                console.log("Couldn't check voting status", e);
            }
        }
        
        for (let i = 1; i <= count; i++) {
            try {
                const candidate = await contract.methods.getCandidate(i).call();
                
                // Check for stored photos in localStorage
                const faceBase64 = localStorage.getItem(`candidate_face_${i}`);
                const logoBase64 = localStorage.getItem(`candidate_logo_${i}`);
                
                // For initial candidates (Biden and Trump)
                let faceImg = faceBase64 ? faceBase64 : '';
                let logoImg = logoBase64 ? logoBase64 : '';
                
                if (i === 1 && !faceBase64) {
                    faceImg = 'biden_face.jpg';
                    logoImg = 'democratic_logo.png';
                } else if (i === 2 && !faceBase64) {
                    faceImg = 'trump_face.jpg';
                    logoImg = 'republican_logo.png';
                }
                
                const card = document.createElement('div');
                card.className = `candidate-card fade-in ${candidate.party.includes('Democratic') ? 'democrat-border' : 'republican-border'}`;
                
                card.innerHTML = `
                    <div class="candidate-header">
                        <div class="candidate-photos">
                            ${faceImg.startsWith('data:image') ? 
                                `<img src="${faceImg}" class="candidate-face" alt="${candidate.name}">` : 
                                `<img src="${faceImg}" class="candidate-face" alt="${candidate.name}" onerror="this.onerror=null;this.src='';this.parentNode.innerHTML='<div class=\'no-image\'>No Photo</div>'">`}
                            ${logoImg.startsWith('data:image') ? 
                                `<img src="${logoImg}" class="party-logo" alt="${candidate.party}">` : 
                                `<img src="${logoImg}" class="party-logo" alt="${candidate.party}" onerror="this.onerror=null;this.src='';this.parentNode.innerHTML='<div class=\'no-logo\'>No Logo</div>'">`}
                        </div>
                        <h3 class="candidate-name">${candidate.name}</h3>
                        <div class="candidate-party">${candidate.party}</div>
                        <div class="candidate-id">Candidate #${candidate.id}</div>
                    </div>
                    <div class="candidate-body">
                        <div class="candidate-detail">
                            <span class="detail-label">Promises</span>
                            <div class="candidate-promises">${candidate.promises}</div>
                        </div>
                        <div class="candidate-votes">Votes: ${candidate.voteCount}</div>
                        <button class="vote-btn" onclick="voteForCandidate(${candidate.id})" 
                            ${hasVoted || !votingActive ? 'disabled' : ''}>
                            ${hasVoted ? 'Already Voted' : (votingActive ? 'Vote Now' : 'Voting Ended')}
                        </button>
                    </div>
                `;
                container.appendChild(card);
            } catch (e) {
                console.error(`Error loading candidate ${i}:`, e);
            }
        }
    } catch (error) {
        console.error("Error loading candidates:", error);
        showNotification("Error loading candidates", 'error');
    }
}

async function voteForCandidate(candidateId) {
    try {
        if (!accounts || accounts.length === 0) {
            showNotification("Please connect your wallet first", 'error');
            return;
        }

        showNotification("Processing your vote...", 'info');
        
        const voter = await contract.methods.voters(accounts[0]).call();
        if (voter.voted) {
            showNotification("You have already voted!", 'error');
            return;
        }

        await contract.methods.vote(candidateId).send({ from: accounts[0] });
        
        showNotification('Vote recorded successfully!', 'success');
        loadCandidates();
        updateVotingStatus();
    } catch (error) {
        console.error("Error voting:", error);
        showNotification('Error voting: ' + (error.message || error), 'error');
    }
}

window.voteForCandidate = voteForCandidate;