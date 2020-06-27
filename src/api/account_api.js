import {your_ip} from './your_ip';
const api_accounts = `${your_ip}/accounts`;
import RNFetchBlob from 'rn-fetch-blob';

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

async function update_account_avatar(img, account, token) {
  try {
    let result = await RNFetchBlob.fetch(
      'PATCH',
      `${api_accounts}/${account._id}/avatar`,
      {
        Authorization: token,
      },
      [
        ...img,
        {
          name: 'post',
          data: JSON.stringify(account),
        },
      ],
    );
    let resultJson = await result.json();
    return resultJson;
  } catch (err) {
    console.log(`Error is: ${err}`);
  }
}

export {login};
export {signup};
export {update_account_infor};
export {check_account_password};
export {update_account_password};
export {get_account_infor};
export {update_account_avatar};
