const axios = require('axios')
const yourIP = 'http://192.168.0.102'
const apiGetAllPosts = `${yourIP}:3000/posts`
const apiGetAllRates = `${yourIP}:3000/rates`
const api_provinces = `${yourIP}:3000/provinces`
const api_districts = `${yourIP}:3000/districts`
const api_posttypes = `${yourIP}:3000/posttypes`
const api_account = `${yourIP}:3000/accounts`

async function getPostsFromServer() {
  try {
    let response = await fetch(apiGetAllPosts)
    let responseJson = await response.json()
    return responseJson.post
  } catch (error) {
    console.error(`Error is: ${error}`)
  }
}

async function getPost(postId) {
  try {
    let response = await fetch(`${apiGetAllPosts}/${postId}`)
    let responseJson = await response.json()
    return responseJson.post
  } catch (error) {
    console.error(`Error is: ${error}`)
  }
}

async function getRateOfPost(postId) {
  try {
    let response = await fetch(`${apiGetAllRates}/rateofpost/${postId}`)
    let responseJson = await response.json()
    return responseJson.rate
  } catch (error) {
    console.error(`Error is: ${error}`)
  }
}

async function get_all_province() {
  try {
    let res = await fetch(`${api_provinces}`)
    let resJson = await res.json()
    return resJson.data.provinces //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`)
  }
}

async function get_all_posttypes() {
  try {
    let res = await fetch(`${api_posttypes}`)
    let resJson = await res.json()
    return resJson.post_type //tat ca mang province
  } catch (err) {
    console.error(`Error is: ${error}`)
  }
}

async function get_district_with_province(provinceCode) {
  try {
    let res = await fetch(`${api_districts}/${provinceCode}`)
    let resJson = await res.json()
    return resJson.districts //tat ca distric co privince code = 
  } catch (err) {
    console.error(`Error is: ${error}`)
  }
}
async function login(user) {
  try {
    let result = await fetch(`${api_account}/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password
      })
    })
    let resultJson = await result.json()
    return resultJson
  } catch (err) {
    console.error(`Error is: ${err}`)
    return err
  }
}

async function signup(user) {
  try {
    let result = await fetch(`${api_account}/signup`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: user.username,
        password: user.password,
        email: user.email,
        name: user.name,
        mobile: user.mobile,
        address: user.address
      })
    })
    let resultJson = await result.json()
    return resultJson
  } catch (err) {
    console.log(`Error is: ${err}`)
  }
}
//GET INFOR
async function get_account_infor(user_token) {
  try {
    let result = await fetch(`${api_account}/usertoken/yes`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: user_token,
        'Content-Type': 'application/json',
      },
   
    })
    let resultJson = await result.json()
    return resultJson
  } catch (err) {
    console.error(`Error is: ${err}`)
    return err
  }
}



export { getPostsFromServer }
export { getPost }
export { getRateOfPost }
export { get_all_province }
export { get_district_with_province }
export { get_all_posttypes }
export { login }
export { signup }
export { get_account_infor }
