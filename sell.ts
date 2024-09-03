import axios from "axios";
import mintAddress from "./mintaddress.json";
import { buyToken } from "./buy";

export function sellToken(amount: number, inTokenAddress:string, outTokenAddress:string, tokenOwned:number) {
    const AUTH_HEADER = "YWQyZGRmZjktN2M5MC00NDA0LWEwNmEtMWIyZjFlYjkzYzQ4OjQyMzYyNTZlMzNiMDYxMzZjOTQ4OWNlZjYyMzNhNTM2";

    const swapPrams = {
        ownerAddress: "YOUR_WALLET_ADDRESS",
        inToken: inTokenAddress,//Token you want to pay for
        outToken: outTokenAddress,//Token address to buy
        inAmount: amount,
        slippage: 0.001
    }

    async function performSwap() {
        try {
            const response = await axios.post('https://ny.solana.dex.blxrbdn.com/api/v2/raydium/swap', swapPrams, {
                headers: {
                    'Authorization': AUTH_HEADER,
                    'Content-Type': 'application.json'
                }
            });
            console.log('Sell successuful:', response.data);
            tokenOwned -= amount;
        } catch (error) {
            console.error('Error selling:', error.response ? error.response.data : error.message);
        }
    }
}