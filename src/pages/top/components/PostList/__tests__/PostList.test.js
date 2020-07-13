import React from 'react'
import 'jest-styled-components'
import { render, cleanup } from '@testing-library/react'
import PostList from '../PostList.component'

afterEach(cleanup)

jest.mock('react-transition-group', () => ({
  TransitionGroup: props => <div>{props.children}</div>,
  CSSTransition: (props) => <div>{props.children}</div>
}))

const MOCK_POST = {
  onSave: () => {},
  id: 'hqb54s',
  createdTime: 1594626450,
  title: 'The music just sounds good',
  author: 'gamerking586',
  thumbnail: 'https://b.thumbs.redditmedia.com/SfeqzrTADvsk0JxxSg9RPQPMMr-0eYNuF6hoMurYerQ.jpg',
  commentsNumber: 1156,
  clicked: false,
  image: {
    src: 'https://preview.redd.it/rc6bq0lmxka51.jpg?auto=webp&s=25e97d99885da17754fdd65b7fcd984f9537eeb4',
    thumbnail: 'https://b.thumbs.redditmedia.com/SfeqzrTADvsk0JxxSg9RPQPMMr-0eYNuF6hoMurYerQ.jpg',
    thumbnailHeight: 140,
    thumbnailWidth: 140
  }
}

test('Renders', () => {
  const { asFragment } = render(<PostList isLoading />)
  expect(asFragment()).toMatchSnapshot()
})

test('Renders placeholders when in loading state', () => {
  const { getAllByTestId } = render(<PostList isLoading />)
  expect(getAllByTestId('Placeholder')).toBeTruthy()
})

test('Renders when posts length is cero', () => {
  const { getByText } = render(<PostList posts={[]} />)

  expect(getByText('No posts found', { exact: false })).toBeTruthy()
})

test('Renders posts', async () => {
  const mockedPosts = Array(3).fill().map((_, i) => ({
    ...MOCK_POST,
    title: `Post ${i}`,
    id: i
  }))
  
  const { getAllByTestId } = render(
    <PostList posts={mockedPosts} />
  )
  
  const postTitles = await getAllByTestId('Post_title').map(titleElement => titleElement.textContent)
  const mockedPostTitles = mockedPosts.map((post) => post.title)
  expect(postTitles).toEqual(mockedPostTitles)
})
