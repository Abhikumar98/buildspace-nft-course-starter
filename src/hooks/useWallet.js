import { useState, useEffect } from "react";
// react hook to detect eth wallet and return connected wallet

const useWallet = () => {
	const [currentAccount, setCurrentAccount] = useState("");

	/*
	 * Gotta make sure this is async.
	 */
	const checkIfWalletIsConnected = async () => {
		const { ethereum } = window;

		if (!ethereum) {
			console.log("Make sure you have metamask!");
			return;
		} else {
			console.log("We have the ethereum object");
		}

		/*
		 * Check if we're authorized to access the user's wallet
		 */

		let chainId = await ethereum.request({ method: "eth_chainId" });
		console.log(chainId);
		console.log("Connected to chain " + chainId);

		// String, hex code of the chainId of the Rinkebey test network
		const rinkebyChainId = "0x4";
		if (chainId !== rinkebyChainId) {
			return;
		}

		const accounts = await ethereum.request({ method: "eth_accounts" });

		/*
		 * User can have multiple authorized accounts, we grab the first one if its there!
		 */
		if (accounts.length !== 0) {
			const account = accounts[0];
			console.log("Found an authorized account:", account);
			setCurrentAccount(account);
		} else {
			console.log("No authorized account found");
		}
	};

	// function to update currentAccount
	const updateCurrentAccount = (value) => {
		setCurrentAccount(value);
	};

	useEffect(() => {
		checkIfWalletIsConnected();
	}, []);

	return [currentAccount, updateCurrentAccount];
};

export default useWallet;
