import { ethers } from "ethers";
import myEpicNft from "./MyEpicNFT.json";
export const connectWallet = async () => {
	try {
		const { ethereum } = window;

		if (!ethereum) {
			alert("Get MetaMask!");
			return;
		}

		/*
		 * Fancy method to request access to account.
		 */

		let chainId = await ethereum.request({ method: "eth_chainId" });
		console.log(chainId);
		console.log("Connected to chain " + chainId);

		// String, hex code of the chainId of the Rinkebey test network
		const rinkebyChainId = "0x4";
		if (chainId !== rinkebyChainId) {
			alert("You are not connected to the Rinkeby Test Network!");
			throw new Error(
				"You are not connected to the Rinkeby Test Network!"
			);
		}

		const accounts = await ethereum.request({
			method: "eth_requestAccounts",
		});

		/*
		 * Boom! This should print out public address once we authorize Metamask.
		 */
		console.log({ accounts });
		console.log("Connected", accounts[0]);
		return accounts[0];
	} catch (error) {
		console.log(error);
	}
};

export const askContractToMintNft = async () => {
	try {
		const { ethereum } = window;

		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum);
			const signer = provider.getSigner();
			const connectedContract = new ethers.Contract(
				process.env.REACT_APP_CONTRACT_ADDRESS,
				myEpicNft.abi,
				signer
			);

			console.log("Going to pop wallet now to pay gas...");
			let nftTxn = await connectedContract.makeAnEpicNFT();

			console.log("Mining...please wait.");
			const response = await nftTxn.wait();

			console.log({ response, nftTxn });

			console.log(
				`Mined, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
			);
		} else {
			console.log("Ethereum object doesn't exist!");
		}
	} catch (error) {
		console.log(error);
	}
};
