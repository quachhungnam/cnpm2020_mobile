import {your_ip} from './your_ip';
const api_provinces = `${your_ip}/provinces`;

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

export {get_all_province};
export {get_all_province2};
export {get_one_province};
