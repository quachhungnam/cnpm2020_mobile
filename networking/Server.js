const axios = require('axios');

const apiGetAllPosts = 'http://192.168.1.8:3000/posts';
const apiGetAllRates = 'http://192.168.1.8:3000/rates';

async function getPostsFromServer() {
  try {
    const response = await axios.get(apiGetAllPosts);
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
  // try {
  //   let response = await fetch(apiGetAllPosts);
  //   let responseJson = await response.json();
  //   return responseJson.posts;
  // } catch (error) {
  //   console.error(`Error is: ${error}`);
  // }
}

async function getPost(postId) {
  try {
    const response = await axios.get(`${apiGetAllPosts}/${postId}`);
    return response.data.posts;
  } catch (error) {
    console.error(error);
  }
}

async function getRateOfPost(postId) {
  try {
    const response = await axios.get(`${apiGetAllRates}/rateofpost/${postId}`);
    return response.data.rate;
  } catch (error) {
    console.error(error);
  }
}

export {getPostsFromServer};
export {getPost};
export {getRateOfPost};
