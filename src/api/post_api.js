import { your_ip } from './your_ip'
const api_posts = `${your_ip}:3000/posts`;


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
async function getPostsFromServer2() {
    try {
        let response = await fetch(api_posts);
        let responseJson = await response.json();
        return responseJson;
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


export { getPostsFromServer };
export { getPostsFromServer2 };
export { getPost };
export { getPostsFromServerByType };
export { getPostsFromServerWithPage };
export { add_post };
export {post_post};
export {searchByAddress};


