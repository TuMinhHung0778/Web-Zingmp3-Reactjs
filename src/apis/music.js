import axios from "../axios";
export const apiGetSong = (sid) => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/song',
            method : 'get',
            params :{id: sid}
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
});
export const apiGetDetailSong = (sid) => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/infosong',
            method : 'get',
            params :{id: sid}
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
});
export const apiGetDetailPlaylist = (pid) => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/detailplaylist',
            method : 'get',
            params :{id: pid}
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
})

export const apiSearch = (keyword) => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/search',
            method : 'get',
            params :{ keyword : keyword}
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
})
export const apiGetArtist = (alias) => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/artist',
            method : 'get',
            params :{ name : alias}
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
})
export const apiGetArtistSongs = (singerId) => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/artistsong',
            method : 'get',
            params :{
                 id : singerId,
                 page : 1,
                 count : 50
                }
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
})
export const apiGetChartHome = () => new Promise(async(resolve, reject) => {
    try {
        const respon = await axios({
            url: '/charthome',
            method : 'get',
        })
        resolve(respon);
    } catch (error) {
        reject(error);
    }
})