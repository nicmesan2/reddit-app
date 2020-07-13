import React from 'react'
import 'jest-styled-components'
import moment from 'moment'
import { render, cleanup } from '@testing-library/react'
import Post from '../Post.component'

afterEach(cleanup)

const MOCK_POST = {
  onSave: () => {},
  id: 'hqb54s',
  createdTime: moment.utc().subtract(10,"hour").unix(),
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

test('Renders loading Post', () => {
  const { asFragment } = render(<Post isLoading />)
  expect(asFragment()).toMatchSnapshot()
})

test('Renders loaded Post', () => {
  const { asFragment, getByText } = render(<Post {...MOCK_POST} />)
  const timeFromPostCreation = moment.unix(MOCK_POST.createdTime).fromNow()
  // Show time since post's creation
  expect(getByText(timeFromPostCreation, { exact: false })).toBeTruthy();
  // Show post's comments number
  expect(getByText(`${MOCK_POST.commentsNumber} comments`, { exact: false })).toBeTruthy();
  // Show post's author's name
  expect(getByText(`by ${MOCK_POST.author}`, { exact: false })).toBeTruthy();
  
  expect(asFragment()).toMatchSnapshot()
})

test('Renders clicked post', () => {
  const { asFragment } = render(<Post {...MOCK_POST} clicked={true} />)
  expect(asFragment()).toMatchSnapshot()
})

test('Renders bookmarked post', () => {
  const { asFragment, getByText } = render(<Post {...MOCK_POST} imageBookmarked />)
  expect(getByText('Remove from gallery', { exact: false })).toBeTruthy();
  expect(asFragment()).toMatchSnapshot()
})

test('Renders an placeholder image', () => {
  const { getByTestId } = render(<Post {...MOCK_POST} image={{ ...MOCK_POST, thumbnail: 'default' }} />)
  
  expect(getByTestId('Post_defaultThumbnailIcon')).toBeTruthy();
})

test('Click on image opens a new page with the image source', () => {
  const { getByTestId } = render(<Post {...MOCK_POST} />)
  
  expect(getByTestId('Post_thumbnailLink')).toHaveAttribute('href', 'https://preview.redd.it/rc6bq0lmxka51.jpg?auto=webp&s=25e97d99885da17754fdd65b7fcd984f9537eeb4')
  
})
