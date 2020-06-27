import {your_ip} from './your_ip';
const api_districts = `${your_ip}/districts`;

async function get_one_district(districtCode) {
  try {
    let res = await fetch(`${api_districts}/one/${districtCode}`);
    let resJson = await res.json();
    return resJson.districts; //tat ca mang province
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

export {get_district_with_province};
export {get_district_with_province2};
export {get_one_district};
