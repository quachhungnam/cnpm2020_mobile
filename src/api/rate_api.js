import { your_ip } from './your_ip'
const api_rates = `${your_ip}:3000/rates`;

async function getRateOfPost(postId) {
    try {
        let response = await fetch(`${api_rates}/rateofpost/${postId}`);
        let responseJson = await response.json();
        return responseJson.rate;
    } catch (error) {
        console.error(`Error is: ${error}`);
    }
}

export { getRateOfPost };