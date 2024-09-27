import axios from "../axios";
export const getHome = () => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/home',
            method : 'get',
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
})