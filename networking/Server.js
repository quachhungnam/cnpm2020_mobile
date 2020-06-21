const axios = require('axios');
const yourIP = 'http://192.168.1.11';
const api_posts = `${yourIP}:3000/posts`;
const api_rates = `${yourIP}:3000/rates`;
const api_provinces = `${yourIP}:3000/provinces`;
const api_districts = `${yourIP}:3000/districts`;
const api_posttypes = `${yourIP}:3000/posttypes`;
const api_accounts = `${yourIP}:3000/accounts`;
const api_feedbacks = `${yourIP}:3000/feedbacks`;
const api_transactions = `${yourIP}:3000/transactions`;

async function add_post(new_post, token) {
  try {
    let result = await fetch(`${api_posts}/addnewpost`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: new_post.title,
        province_code: new_post.province_code,
        district_code: new_post.district_code,
        post_type_id: new_post.post_type_id,
        address_detail: new_post.address_detail,
        description: new_post.description,
        price: new_post.price,
        square: new_post.square,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}

async function getPostsFromServerByType(typeId) {
  try {
    let response = await fetch(`${api_posts}/type/${typeId}/account`);
    let responseJson = await response.json();
    return responseJson.post;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getPostsFromServer() {
  try {
    let response = await fetch(api_posts);
    let responseJson = await response.json();
    return responseJson.post;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getPostsFromServerWithPage(pageNumber) {
  try {
    let response = await fetch(`${api_posts}/page/${pageNumber}`);
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getPost(postId) {
  try {
    let response = await fetch(`${api_posts}/${postId}`);
    let responseJson = await response.json();
    return responseJson.post;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getRateOfPost(postId) {
  try {
    let response = await fetch(`${api_rates}/rateofpost/${postId}`);
    let responseJson = await response.json();
    return responseJson.rate;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function get_all_province() {
  try {
    let res = await fetch(`${api_provinces}`);
    let resJson = await res.json();
    return resJson.data.provinces; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}
async function get_all_province2() {
  try {
    let res = await fetch(`${api_provinces}`);
    let resJson = await res.json();
    return resJson; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}

async function get_one_province(provinceCode) {
  try {
    let res = await fetch(`${api_provinces}/${provinceCode}`);
    let resJson = await res.json();
    return resJson.province; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}
async function get_one_district(districtCode) {
  try {
    let res = await fetch(`${api_districts}/one/${districtCode}`);
    let resJson = await res.json();
    return resJson.districts; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}
async function get_one_posttype(posttypeId) {
  try {
    let res = await fetch(`${api_posttypes}/${posttypeId}`);
    let resJson = await res.json();
    return resJson.post_type; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}
async function get_all_posttypes() {
  try {
    let res = await fetch(`${api_posttypes}`);
    let resJson = await res.json();
    return resJson.post_type; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}
async function get_all_posttypes2() {
  try {
    let res = await fetch(`${api_posttypes}`);
    let resJson = await res.json();
    return resJson; //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}

async function get_district_with_province(provinceCode) {
  try {
    let res = await fetch(`${api_districts}/${provinceCode}`);
    let resJson = await res.json();
    return resJson.districts; //tat ca distric co privince code =
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}
async function get_district_with_province2(provinceCode) {
  try {
    let res = await fetch(`${api_districts}/${provinceCode}`);
    let resJson = await res.json();
    return resJson; //tat ca distric co privince code =
  } catch (err) {
    console.error(`Error is: ${error}`);
  }
}

async function login(user) {
  try {
    let result = await fetch(`${api_accounts}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.error(`Error is: ${err}`);
    return err;
  }
}

async function signup(user) {
  try {
    let result = await fetch(`${api_accounts}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        address: user.address,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}
//GET INFOR
async function get_account_infor(user_token) {
  try {
    let result = await fetch(`${api_accounts}/usertoken/yes`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.error(`Error is: ${err}`);
    return err;
  }
}

async function post_post(new_post) {
  try {
    let result = await fetch(`${api_posts}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: new_post.title,
        province_id: new_post.province_id,
        district_id: new_post.district_id,
        post_type_id: new_post.post_type_id,
        address_detail: new_post.address_detail,
        description: new_post.description,
        price: new_post.price,
        square: new_post.square,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}

async function update_account_infor(user, user_token) {
  try {
    let result = await fetch(`${api_accounts}/${user._id}`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        mobile: user.mobile,
        address: user.address,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}
async function update_account_password(user, user_token) {
  try {
    let result = await fetch(`${api_accounts}/${user._id}/password`, {
      method: 'PATCH',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: user.password,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}
async function check_account_password(user, user_token) {
  try {
    let result = await fetch(`${api_accounts}/${user._id}/checkpassword`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        password: user.password,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}

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

async function searchByAddress(address) {
  try {
    let result = await fetch(`${api_posts}/finds/address`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        address: address,
      }),
    });
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.error(`Error is: ${err}`);
    return err;
  }
}

async function addTransaction(user, user_token, post_id) {
  try {
    let response = await fetch(api_transactions, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id: user._id,
        post_id: post_id,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function getTransactions() {
  try {
    let response = await fetch(api_transactions);
    let responseJson = await response.json();
    return responseJson.transaction;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function delTransaction(user_token, tranId) {
  try {
    let response = await fetch(`${api_transactions}/${tranId}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

async function addRate(user, user_token, post_id, newRate) {
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
        account_id: user._id,
        post_id: post_id,
        description: newRate.description,
        star: newRate.star,
      }),
    });
    let responseJson = await response.json();
    return responseJson;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

export {getPostsFromServer};
export {getPost};
export {getRateOfPost};
export {get_all_province};
export {get_all_province2};
export {get_district_with_province};
export {get_district_with_province2};
export {get_all_posttypes};
export {get_all_posttypes2};
export {login};
export {signup};
export {get_account_infor};
export {post_post};
export {update_account_infor};
export {check_account_password};
export {update_account_password};
export {send_feed_back};
export {add_post};
//cua khanh
export {getPostsFromServerByType};
export {searchByAddress};
export {get_one_posttype};
export {get_one_district};
export {get_one_province};
export {getPostsFromServerWithPage};
// duyen
export {addTransaction};
export {getTransactions};
export {delTransaction};
export {addRate};
