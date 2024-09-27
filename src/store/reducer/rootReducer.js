import appReducer from "./appReducer";
import music_defaut from "./music_defaut";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel1";
//combineReducers: Gom reducer thành 1 
// applyMiddleware: Xử dung middeleware cho reduce

const commonConfig = {
    storage : storage,
    stateReconciler: autoMergeLevel2
}

const musicConfig = {
    ...commonConfig,
    key : 'music',
    whitelist : ['curIdSong', 'curSongData', 'curAlbumId', 'recentSongs']
}

const rootReducer = combineReducers({
    app: appReducer,
    music: persistReducer(musicConfig ,music_defaut),
})
export default rootReducer