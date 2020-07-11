import { combineReducers} from "redux"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import TopListReducer from './pages/top/reducer'

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['topList']
}

const topListPersistConfig = {
  key: 'topList',
  storage,
  whitelist: ['readPosts', 'removedPosts', 'bookmarkedImages']
}

const rootReducer = combineReducers({
  topList: persistReducer(topListPersistConfig, TopListReducer)
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(rootPersistConfig, rootReducer)
