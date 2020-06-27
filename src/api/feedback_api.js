import {your_ip} from './your_ip';
const api_feedbacks = `${your_ip}/feedbacks`;

async function send_feed_back(user, user_token, feedback) {
  try {
    let result = await fetch(`${api_feedbacks}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        accountId: user._id,
        description: feedback,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}

export {send_feed_back};
