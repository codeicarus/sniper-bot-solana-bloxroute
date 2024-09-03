import { getTokenLivePrice } from "./liveprice";
import { buyToken } from "./buy";
import { sellToken } from "./sell";
import mintAddress from "./mintaddress.json"
import { Connection, Keypair } from "@solana/web3.js";

const connection = new Connection('https://api.mainnet-beta.solana.com');

const wallet = Keypair.fromSecretKey(new Uint8Array([])); //Your secret key here

console.log("The bot is starting now");


const BUY_PRICE_MIN = 1; //Can customize
const BUY_PRICE_MAX = 1.01; //Can customize
const LIMIT_ORDER = 1.1; //Can customize

let tokenOwned = 0;

async function limitorder() {
    const tokenPrice = await getTokenLivePrice('', mintAddress['TOKENNAME_YOU_ARE_INTERESTED_IN']); //The price of token you are interested in
    if (tokenPrice) {
        if (tokenPrice >= BUY_PRICE_MIN && tokenPrice <= BUY_PRICE_MAX && tokenOwned === 0) {
            await buyToken(10, mintAddress['TOKENNAME_YOU_WANT_TO_PAY'], mintAddress['TOKENNAME_YOU_ARE_INTERESTED_IN'], tokenOwned);
        } else if (tokenPrice > LIMIT_ORDER && tokenOwned > 0) {
            await sellToken(tokenOwned, mintAddress['TOKENNAME_YOU_ARE_INTERESTED_IN'], mintAddress['TOKENNAME_YOU_WANT_TO_PAY'], tokenOwned);
        }
    }
}

setImmediate(async () => {
    limitorder();
}, 1000);