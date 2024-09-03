import { Connection, PublicKey } from '@solana/web3.js';
import axios from 'axios';
import mintAddresses from "./mintaddress.json"

// Define the connection to the Solana network
const connection = new Connection('https://api.mainnet-beta.solana.com');

// console.log(`${mintAddresses['SDOGE']}`);
// Function to get the live price of a token given its mint address
export async function getTokenLivePrice(symbol:string, mintAddress: string) {
  try {
    const response = await axios.get(`https://api-v3.raydium.io/mint/price?mints=${mintAddress}`, {
      headers: {
        'accept': 'application/json'
      }
    });
    const priceData = response.data.data[mintAddress];
    if (!priceData) {
      console.error('Price data not found for the token mint address:', symbol);
      return null;
    }

    const price = priceData;
    console.log(`${symbol} live price: $${priceData}`);
    return price;
  } catch (error) {
    console.error('Error fetching token price:', error);
    return null;
  }
}

const sdoge = getTokenLivePrice("123", mintAddresses['SDOGE']);

console.log(sdoge);


// Optional: Set an interval to fetch the price continuously
setInterval(() => {
  console.log("\n")
  console.log(new Date().toLocaleString(), ": Fetching Token Prices...")
  Object.keys(mintAddresses).map(async (key) => {
    await getTokenLivePrice(key, mintAddresses[key]);
  })
  console.log("=====================================================")
}, 3000);
