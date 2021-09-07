import axios from 'axios';
// import qs from 'qs';



function $get(url,params={}){
    return axios.get(url,{params});
}
function $post(url,params={}){
    return axios.post(url,params);
}

export {
    $get,
    $post,
}