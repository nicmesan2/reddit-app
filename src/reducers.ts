import { combineReducers} from "redux"
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import TopListReducer from './pages/top/reducer'

const topListPersistConfig = {
  key: 'topList',
  storage,
  whitelist: ['readPosts', 'removedPosts']
}

const rootReducer = combineReducers({
  topList: persistReducer(topListPersistConfig, TopListReducer)
})

export type RootState = ReturnType<typeof rootReducer>

export default persistReducer(topListPersistConfig, rootReducer)
