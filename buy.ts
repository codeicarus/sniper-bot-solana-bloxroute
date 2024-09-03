import axios from "axios";
import mintAddress from "./mintaddress.json";
import { getTokenLivePrice } from "./liveprice";

export async function buyToken(amount: Number) {
    const AUTH_HEADER = "YWQyZGRmZjktN2M5MC00NDA0LWEwNmEtMWIyZjFlYjkzYzQ4OjQyMzYyNTZlMzNiMDYxMzZjOTQ4OWNlZjYyMzNhNTM2";

    const swapPrams = {
        ownerAddress: "YOUR_WALLET_ADDRESS",
        inToken: `${mintAddress['']}`,//Token you want to pay for
        outToken: `${mintAddress['']}`,//Token address to buy
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
            console.log('Buy successuful:', response.data);
        } catch (error) {
            console.error('Error buying:', error.response ? error.response.data : error.message);

        }
    }
}