// import React from 'react'

// export default function passAbiAddress() {
//   return (
//     <div>passAbiAddress</div>
//   )
// }

import React, { createContext, useState } from 'react';
import Web3 from 'web3';
import { useEffect } from 'react';
// Create the context
export const AppContext = createContext();
// Create the context provider component
export const AppProvider = ({ children }) => {
    const [MyFinalweb3, setMyFinalweb3] = useState(null);
	const [MyFinalContract, setMyFinalContract] = useState(null);
	// Define your variables and their initial values
	const [MyABI, setMyABI] = useState([
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "dataItem",
                    "type": "string"
                }
            ],
            "name": "addDataHash",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "password",
                    "type": "string"
                }
            ],
            "name": "registerUser",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                }
            ],
            "name": "getDataHash",
            "outputs": [
                {
                    "internalType": "string[]",
                    "name": "",
                    "type": "string[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                }
            ],
            "name": "isUserPresent",
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
            "inputs": [
                {
                    "internalType": "string",
                    "name": "username",
                    "type": "string"
                },
                {
                    "internalType": "string",
                    "name": "password",
                    "type": "string"
                }
            ],
            "name": "login",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        }
    ]);
    
	const [MyAddress, setMyAddress] = useState('0x71d205Ad97a62CCd447B8DBDb6F8e9EE6460F76d');
	const [MyCurrAccount, setMyCurrAccount] = useState('');
	useEffect(() => {
		const onload23 = async () => {

			try {
				if (window.ethereum !== 'undefined') {
					const { ethereum } = window;
					console.log('connected');
					const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
					let account = accounts[0];
					setMyCurrAccount(account);
					window.web3 = await new Web3(window.ethereum);
					window.contract = await new window.web3.eth.Contract(MyABI, MyAddress);
					// Continue with the rest of your code
                    setMyFinalweb3(await new Web3(window.ethereum));
					setMyFinalContract(await new window.web3.eth.Contract(MyABI, MyAddress));
				} else {
					console.log('not connected');
				}

			}
			catch (error) {
				console.log(error);
			}

		};

		onload23();
	}, []);

	// Create an object with the variables and their setter functions
	const contextValues = {
        MyFinalweb3,MyFinalContract, MyCurrAccount
	};

	return (
	<AppContext.Provider value={contextValues}>{children}</AppContext.Provider>
	);
};
