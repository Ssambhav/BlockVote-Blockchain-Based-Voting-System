Got it. You want **FULL README.md** in **pure Markdown code** (complete, no missing parts).
Copy-paste this whole thing into `README.md`:

````md
# BlockVote - Blockchain Voting System 🗳️🔗

## Project Overview
BlockVote is a decentralized voting system built on the Ethereum blockchain that ensures secure, transparent, and tamper-proof elections.  
This system leverages smart contracts to eliminate fraud and provide immutable voting records.

---

## ✨ Features
- ✅ Secure Voting - Each voter can vote only once using their wallet
- ✅ Transparent Results - Real-time vote counting on blockchain
- ✅ Admin Controls - Only admin can add candidates and end voting
- ✅ Candidate Profiles - Photos, party logos, and promises display
- ✅ Real-time Updates - Live voting status and leader updates
- ✅ Decentralized - No central authority controls the votes

---

## 🚀 Quick Start Guide

### Prerequisites
Make sure you have the following installed:

1. Node.js (v16 or higher)
2. MetaMask browser extension
3. Ganache (local blockchain)
4. Git

---

## Step 1: Clone & Setup
```bash
# Clone the repository
git clone <your-repository-url>
cd blockchain-voting

# Install dependencies
npm install
````

---

## Step 2: Configure Environment

### 1. Start Ganache

1. Open the Ganache application
2. Create a new workspace OR use Quick Start
3. Note the RPC Server URL (usually: `http://127.0.0.1:7545`)
4. Copy a private key from Ganache (click the key icon beside any account)

### 2. Setup `.env` File

Create or edit the `.env` file in your project root:

```env
PRIVATE_KEY=0xYOUR_PRIVATE_KEY_FROM_GANACHE
GANACHE_URL=http://127.0.0.1:7545
CONTRACT_ADDRESS=0x
API_URL=http://127.0.0.1:7545
```

---

## Step 3: Deploy Smart Contract

```bash
# Compile contract
npx hardhat compile

# Deploy to Ganache local blockchain
npx hardhat run scripts/deploy.js --network ganache
```

After deployment, you will get output like:

```txt
Voting contract deployed to: 0x1234...abcd
```

Copy this deployed contract address.

---

## Step 4: Update Contract Address (IMPORTANT)

### 📍 Location 1: Update `frontend/main.js`

Find this line inside `frontend/main.js`:

```js
const contractAddress = "0x...";
```

Replace it with your deployed address:

```js
const contractAddress = "0x1234...abcd";
```

### 📍 Location 2: Update `.env` File

Paste the same deployed address:

```env
CONTRACT_ADDRESS=0x1234...abcd
```

---

## Step 5: Start the Application

```bash
# Start backend server
npm start
```

OR run directly:

```bash
node backend/index.js
```

---

## Step 6: Open the Application

Open your browser and visit:

```txt
http://localhost:3000
```

---

## Step 7: Setup MetaMask (Ganache Connection)

### 1. Add Ganache Network in MetaMask

Go to MetaMask → Networks → Add Network:

* Network Name: Localhost 7545
* RPC URL: [http://127.0.0.1:7545](http://127.0.0.1:7545)
* Chain ID: 1337
* Currency Symbol: ETH

### 2. Import Ganache Account into MetaMask

1. Copy a private key from Ganache account
2. Go to MetaMask → Import Account
3. Paste the private key

Now connect wallet to the website.

---

## 👨‍💼 Admin Access

### How Admin Works

* The wallet address that deploys the smart contract becomes the **Admin**
* Only Admin can add candidates and end voting

### Admin Capabilities

* Add new candidates
* Upload candidate photos / party logos
* End voting
* View all candidates

---

## 📁 Project Structure

```txt
blockchain-voting/
├── contracts/          # Smart contracts (Solidity)
├── scripts/            # Deployment scripts
├── frontend/           # Frontend UI
├── backend/            # Express.js backend server
├── public/             # Images & static assets
├── artifacts/          # Compiled contract output
└── config files
```

---

## 🛠️ Smart Contract Functions

### Voter Functions

* `vote(uint candidateId)` → Cast vote
* `hasVoted(address voter)` → Check if voter already voted
* `getCandidate(uint id)` → Get candidate details

### Admin Functions

* `addCandidate(name, party, promises)` → Add a candidate
* `endVoting()` → End election
* `getLeadingCandidate()` → Check current leading candidate

---

## 🔧 Troubleshooting

### 1. MetaMask Not Detected

* Install MetaMask extension
* Ensure MetaMask is unlocked
* Refresh the browser

### 2. Wrong Network Issue

* Ensure MetaMask is connected to:

  * Localhost 7545
  * RPC URL: `http://127.0.0.1:7545`

### 3. Transaction Failed

* Ensure Ganache is running
* Ensure wallet has ETH (Ganache provides free ETH)
* Ensure voting has not ended

### 4. Admin Panel Not Showing

* Only the deploying wallet is admin
* Deploy using the same wallet account you are logged into

---

## Reset Everything

If you face major issues, reset and redeploy:

```bash
rm -rf artifacts cache

npx hardhat compile
npx hardhat run scripts/deploy.js --network ganache
```

---

## 🔄 Workflow

1. Admin deploys smart contract and becomes admin automatically
2. Admin adds candidates through Admin Panel
3. Voters connect wallet and vote
4. Votes update in real-time on blockchain
5. Admin ends voting when election is complete
6. Results become final and immutable

---

## 🔐 Security Features

* One wallet = one vote
* Votes cannot be changed once cast
* Only admin can end voting
* All votes recorded permanently on blockchain
* Transparent audit trail

---

## 📊 Testing the System

### Test as Voter

* Connect different MetaMask accounts
* Try voting multiple times (should fail)
* Check if vote count updates

### Test as Admin

* Add new candidates
* Upload candidate images/logos
* End voting and verify voting buttons disable

---

## 🎯 Future Enhancements

* [ ] Voting time limits
* [ ] Multiple election types
* [ ] Email verification
* [ ] SMS OTP verification
* [ ] Vote delegation
* [ ] Result analytics dashboard

---

## 📞 Support

If you face issues:

1. Check browser console (`F12`)
2. Confirm contract address is updated in both places
3. Ensure Ganache is running
4. Ensure MetaMask network settings are correct

---

## 📝 License

This project is for educational purposes. Modify and use as needed.

---

🎉 Congratulations! Your blockchain voting system is now running successfully.
This system provides a secure, transparent method to conduct elections with immutable results stored on the blockchain.

⚠️ Always test thoroughly before using in production environments.

```
```
