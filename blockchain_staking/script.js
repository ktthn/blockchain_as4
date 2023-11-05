// Set the contract address and ABI
const contractAddress = '0xd9145CCE52D386f254917e481eB44e9943F39138'; 
const contractABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_stakingPeriod",
				"type": "uint256"
			}
		],
		"stateMutability": "payable",
		"type": "constructor"
	},
	{
		"inputs": [],
		"name": "calculateRewards",
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
		"name": "distributeRewards",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getBalance",
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
		"name": "getStakedBalance",
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
		"name": "minValue",
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
		"name": "owner",
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
		"inputs": [],
		"name": "stake",
		"outputs": [],
		"stateMutability": "payable",
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
		"name": "stakedBalances",
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
		"name": "stakingPeriod",
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
		"name": "stakingStartTimes",
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
		"name": "timeLeft",
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
		"name": "totalRewards",
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
		"name": "totalStakers",
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
		"name": "userBalances",
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
		"name": "withdraw",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let web3;
let contract;

window.addEventListener('load', async () => {
    if (window.ethereum) {
        web3 = new Web3(window.ethereum);
        contract = new web3.eth.Contract(contractABI, contractAddress);
    } else {
        console.log("Please install MetaMask");
    }
});

async function connectToMetaMask() {
    if (typeof window != "undefined" && typeof window.ethereum != "undefined") {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            console.log(accounts[0]);
        } catch (err) {
            console.error(err.message);
        }
    } else {
        console.log("Please install MetaMask");
    }
}

async function deposit() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const amount = document.getElementById('depositAmount').value;

        if (!amount || isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        const transaction = await contract.methods.deposit(amount).send({ from: account });
        console.log('Transaction: ', transaction);
    } catch (error) {
        console.error(error.message);
    }
}

async function stake() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        const amount = document.getElementById('stakeAmount').value;

        if (!amount || isNaN(amount)) {
            alert('Please enter a valid amount.');
            return;
        }

        const transaction = await contract.methods.stake(amount).send({ from: account });
        console.log('Transaction: ', transaction);
    } catch (error) {
        console.error(error.message);
    }
}

async function withdraw() {
    try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];

        const transaction = await contract.methods.withdraw().send({ from: account });
        console.log('Transaction: ', transaction);
    } catch (error) {
        console.error(error.message);
    }
}