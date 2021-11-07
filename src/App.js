import "./styles/App.css";
import twitterLogo from "./assets/twitter-logo.svg";
import React from "react";
import useWallet from "./hooks/useWallet";
import { connectWallet, askContractToMintNft } from "./utils/index";

// Constants
const TWITTER_HANDLE = "_buildspace";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const OPENSEA_LINK = "";
const TOTAL_MINT_COUNT = 50;

const App = () => {
	const [wallet, setWallet] = useWallet();
	const [mintedNFT, setMintedNFT] = React.useState({});
	const [loading, setLoading] = React.useState(false);

	const handleConnectWallet = async () => {
		try {
			const connectedWallet = await connectWallet(wallet);
			console.log({ connectedWallet });
			setWallet(connectedWallet);
		} catch (error) {
			console.error(error);
		}
	};

	const handleMintNft = async () => {
		try {
			setLoading(true);
			const mintedNft = await askContractToMintNft();
			console.log({ mintedNft });
			setMintedNFT(mintedNft);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	console.log({ wallet });

	return (
		<div className="App">
			<div className="app-container">
				<div className="header-container">
					<p className="header gradient-text">My NFT Collection</p>
					<p className="sub-text">
						Each unique. Each beautiful. Discover your NFT today.
					</p>
					{wallet ? (
						<div className="flex flex-col justify-center items-center my-4">
							<div className="text-black bg-white py-1 px-2 rounded-sm font-semibold mb-4 text-sm">
								{wallet}
							</div>
							<button
								onClick={() => handleMintNft()}
								className={`cta-button  ${
									loading
										? " pointer-events-none cursor-disabled bg-gray-300 "
										: " connect-wallet-button "
								}`}
								disabled={loading}
							>
								{loading ? "Minting NFT..." : "Mint NFT"}
							</button>

							{wallet && wallet === "0x4" && (
								<div>
									Hey !! you aren't connect to Rinkeby Test
									Network
								</div>
							)}
							{loading && (
								<div className="">
									<div className="gradient-text font-semibold my-4">
										Hold your horses !!!, minting is in
										process...
									</div>
									<iframe
										src="https://giphy.com/embed/upPkKMK5Z7FIY"
										width="480"
										height="302"
										frameBorder="0"
										class="giphy-embed"
										title="minting NFT"
									></iframe>
									<p>
										<a href="https://giphy.com/gifs/running-horse-upPkKMK5Z7FIY">
											via GIPHY
										</a>
									</p>
								</div>
							)}
						</div>
					) : (
						<button
							onClick={() => handleConnectWallet()}
							className="cta-button connect-wallet-button"
						>
							Connect to Wallet
						</button>
					)}
				</div>
				<div className="footer-container">
					<img
						alt="Twitter Logo"
						className="twitter-logo"
						src={twitterLogo}
					/>
					<a
						className="footer-text"
						href={TWITTER_LINK}
						target="_blank"
						rel="noreferrer"
					>{`built on @${TWITTER_HANDLE}`}</a>
				</div>
			</div>
		</div>
	);
};

export default App;
