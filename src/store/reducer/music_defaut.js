import actionTypes from "../action/actionType";
const initState = {
    curIdSong : null,
    curSongData: null,
    isPlay : false,
    atAlbum : false,
    songs : null,
    curAlbumId: null,
    recentSongs: [],
    searchData : {},
    keyword :''
};
const music_defaut = (state = initState,action) => {
    switch(action.type) {
        case actionTypes.SET_CUR_SONG_ID:
            return {
                ...state,
                curIdSong: action.sid || null
            };
        case actionTypes.PLAY:
            return {
                ...state,
                isPlay: action.flag
            };
        case actionTypes.SET_ALBUMS:
            return {
                ...state,
                atAlbum: action.flag
            };
        case actionTypes.PLAYLIST:
            return {
                ...state,
                songs: action.songs || null
            };
        case actionTypes.SET_CUR_SONG_DATA:
            return {
                ...state,
                curSongData: action.data || null
            };
        case actionTypes.SET_CUR_ALBUM_ID:
            return {
                ...state,
                curAlbumId: action.pid || null
            };
        case actionTypes.SET_RECENT:
            let songs = state.recentSongs;
            if(action.data){
                if(state.recentSongs?.some(i => i.encodeId === action.data.encodeId)){
                    songs = songs.filter((i) => i.encodeId !== action.data.encodeId)
                }
                if(songs.length > 10){
                    songs = songs.filter((i, index, self) => index !== self.length - 1)
                }
                songs = [action.data, ...songs]
            }
            return {
                ...state,
                recentSongs: songs
            };
            case actionTypes.SEARCH:
                return {
                    ...state,
                    searchData : action.data || {},
                    keyword : action.keyword || ''
                }
            // songs.filter((i, index, self) => index !== self.length - 1)
        default:
            return state;
    }
};
export default music_defaut;