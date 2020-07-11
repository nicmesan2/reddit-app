import React, {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import * as actions from '../actions'
import { getPostData } from '../selectors'
import { Post } from "../../../components"

const TopList = () => {
  const isLoading = useSelector(state => state.topList.isLoading)
  const topList = useSelector(getPostData)
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(actions.fetchTopPosts())
  }, [])
  
  return (
    <div style={{ padding: 40, marginTop: 48 }}>
      {isLoading
        ? Array(5)
          .fill({ isLoading: true })
          .map((placeholder, i) => <Post key={i} isLoading />)
        : topList.map((post) => <Post key={post.id} {...post} />)}
    </div>
  )
}

export default TopList
