// import "dotenv";
import { getTokenLivePrice } from "./liveprice";
import { buyToken } from "./buy";
import { sellToken } from "./sell";
import mintAddress from "./mintaddress.json"
import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";

console.log("The bot is starting now");

async function connectWallet(publicKeyString: string) {
    const connection = new Connection('https://prettiest-alpha-layer.solana-mainnet.quiknode.pro/299c8791dd626fb1352a0fd06e92afe2b95aa3cc');

    const publicKey = new PublicKey(publicKeyString);

    try {
        const balance = await connection.getBalance(publicKey);
        console.log(`Wallet balance: ${balance / 1e9} Sol`);

    } catch (error) {
        console.error('Error fetching balance:', error);
    }
}

const myPublicKey = 'YourWalletAddress';
connectWallet(myPublicKey);

const BUY_PRICE_MIN = 1; //Can customize
const BUY_PRICE_MAX = 1.01; //Can customize
const LIMIT_ORDER = 1.1; //Can customize

let tokenOwned = 0;

async function limitorder() {
    const tokenPrice = await getTokenLivePrice('', mintAddress['TOKENNAME_YOU_ARE_INTERESTED_IN']); //The price of token you are interested in
    if (tokenPrice) {
        if (tokenPrice >= BUY_PRICE_MIN && tokenPrice <= BUY_PRICE_MAX && tokenOwned === 0) {
            const amount = await buyToken(10, mintAddress['TOKENNAME_YOU_WANT_TO_PAY'], mintAddress['TOKENNAME_YOU_ARE_INTERESTED_IN'], tokenOwned);
            tokenOwned += amount;
        } else if (tokenPrice > LIMIT_ORDER && tokenOwned > 0) {
            await sellToken(tokenOwned, mintAddress['TOKENNAME_YOU_ARE_INTERESTED_IN'], mintAddress['TOKENNAME_YOU_WANT_TO_PAY'], tokenOwned);
        }
    }
}

setInterval(async () => {
    limitorder();
}, 1000);