import { combineReducers} from "redux"
import TopListReducer from './pages/top/reducer'

const appReducer = combineReducers({
  topList: TopListReducer
})

export default appReducer
