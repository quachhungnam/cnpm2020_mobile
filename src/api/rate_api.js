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

async function getRateOfPost2(postId) {
    try {
        let response = await fetch(`${api_rates}/rateofpost/${postId}`);
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(`Error is: ${error}`);
    }
}


async function addRate(user_token, post_id, newRate) {
    try {
        let response = await fetch(api_rates, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                Authorization: user_token,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name: newRate.name,
                post_id: post_id,
                description: newRate.description,
                star: newRate.star,
            }),
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (err) {
        console.log(`err is: ${err}`);
    }
}

export { addRate };
export { getRateOfPost };
export { getRateOfPost2 };