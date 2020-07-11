import { combineReducers} from "redux"
import TopListReducer from './pages/top/reducer'

const rootReducer = combineReducers({
  topList: TopListReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer
