import { your_ip } from './your_ip'
const api_posttypes = `${your_ip}:3000/posttypes`;

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

export { get_all_posttypes };
export { get_all_posttypes2 };
export { get_one_posttype };
