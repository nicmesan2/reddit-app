import React from 'react'
import 'jest-styled-components'
import { Provider } from 'react-redux'
import { render as rtlRender, cleanup, fireEvent } from '@testing-library/react'
import TopList from '../TopList.page'
import { applyMiddleware, createStore } from 'redux'
import persistedReducer from '../../../reducers'
import thunk from 'redux-thunk'
import mockAxios from 'axios'

afterEach(cleanup)

// Mock posts fetch request
const mockedResponse = {
  data: {
    children: [
      {
        kind: 't3',
        data: {
          approved_at_utc: null,
          subreddit: 'argentina',
          selftext: '',
          author_fullname: 't2_ox78n',
          saved: true,
          mod_reason_title: null,
          gilded: 0,
          clicked: false,
          title: 'Moraleja: NUNCA AHORREN EN PESOS',
          link_flair_richtext: [],
          subreddit_name_prefixed: 'r/argentina',
          hidden: false,
          pwls: 6,
          link_flair_css_class: 'pendiente',
          downs: 0,
          thumbnail_height: 140,
          top_awarded_type: null,
          hide_score: false,
          name: 't3_ho9777',
          quarantine: false,
          link_flair_text_color: 'dark',
          upvote_ratio: 0.96,
          author_flair_background_color: '',
          subreddit_type: 'public',
          ups: 1957,
          total_awards_received: 0,
          media_embed: {},
          thumbnail_width: 140,
          author_flair_template_id: null,
          is_original_content: false,
          user_reports: [],
          secure_media: {
            reddit_video: {
              fallback_url: 'https://v.redd.it/lpz9350nrv951/DASH_720.mp4?source=fallback',
              height: 960,
              width: 540,
              scrubber_media_url: 'https://v.redd.it/lpz9350nrv951/DASH_96.mp4',
              dash_url:
                'https://v.redd.it/lpz9350nrv951/DASHPlaylist.mpd?a=1596984809%2CYTMzMzQwYjlmZGFiOTQ1OTIzODNiNGE3ODQxZGU5ZWM2M2EyZTQwMWZjMGNkNjliODUwMmE3ODg0OTA1NTFiNA%3D%3D&amp;v=1&amp;f=sd',
              duration: 57,
              hls_url:
                'https://v.redd.it/lpz9350nrv951/HLSPlaylist.m3u8?a=1596984809%2CNTg3MTcyODZjZmYwNGI0OWNlYzc5NmJhY2M5OTA0YmZjNTJmMDJmODFkNTIyMzBmM2YxZGNlZmNmNTZhM2I2Yg%3D%3D&amp;v=1&amp;f=sd',
              is_gif: false,
              transcoding_status: 'completed'
            }
          },
          is_reddit_media_domain: true,
          is_meta: false,
          category: null,
          secure_media_embed: {},
          link_flair_text: 'Pendiente',
          can_mod_post: false,
          score: 1957,
          approved_by: null,
          author_premium: false,
          thumbnail: 'https://b.thumbs.redditmedia.com/rBSAUUU44jhF1O99LW4EfXAJ-3ALms4FGKlyJ2p4YNw.jpg',
          edited: false,
          author_flair_css_class: 'bandera-pba',
          author_flair_richtext: [],
          gildings: {},
          post_hint: 'hosted:video',
          content_categories: null,
          is_self: false,
          mod_note: null,
          created: 1594350586.0,
          link_flair_type: 'text',
          wls: 6,
          removed_by_category: null,
          banned_by: null,
          author_flair_type: 'text',
          domain: 'v.redd.it',
          allow_live_comments: true,
          selftext_html: null,
          likes: null,
          suggested_sort: null,
          banned_at_utc: null,
          url_overridden_by_dest: 'https://v.redd.it/lpz9350nrv951',
          view_count: null,
          archived: false,
          no_follow: false,
          is_crosspostable: true,
          pinned: false,
          over_18: false,
          preview: {
            images: [
              {
                source: {
                  url:
                    'https://external-preview.redd.it/ONz9V6rO0MVNFCIgPK_mZeRutmTKb2_W2yxsuzkTCxg.png?format=pjpg&amp;auto=webp&amp;s=24ffb5f80cd501f8209bb41ed577dd5c0150af2a',
                  width: 540,
                  height: 960
                },
                resolutions: [
                  {
                    url:
                      'https://external-preview.redd.it/ONz9V6rO0MVNFCIgPK_mZeRutmTKb2_W2yxsuzkTCxg.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=9181c4c2c42ff3a8632c1a4aa4576a163faa778f',
                    width: 108,
                    height: 192
                  },
                  {
                    url:
                      'https://external-preview.redd.it/ONz9V6rO0MVNFCIgPK_mZeRutmTKb2_W2yxsuzkTCxg.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=d169ed3602a52dfab71da3895ec8fbfeeff915ac',
                    width: 216,
                    height: 384
                  },
                  {
                    url:
                      'https://external-preview.redd.it/ONz9V6rO0MVNFCIgPK_mZeRutmTKb2_W2yxsuzkTCxg.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=06fa2d9374cc3c151a8dfd8fbc6ed0b64dd95823',
                    width: 320,
                    height: 568
                  }
                ],
                variants: {},
                id: 'EIPj__Z-7qn55simkrVyIc8-cCz74Tg4JMIQRpJ8xsM'
              }
            ],
            enabled: false
          },
          all_awardings: [],
          awarders: [],
          media_only: false,
          can_gild: true,
          spoiler: false,
          locked: false,
          author_flair_text: 'Buenos Aires',
          treatment_tags: [],
          visited: false,
          removed_by: null,
          num_reports: null,
          distinguished: null,
          subreddit_id: 't5_2qlht',
          mod_reason_by: null,
          removal_reason: null,
          link_flair_background_color: '',
          id: 'ho9777',
          is_robot_indexable: true,
          report_reasons: null,
          author: 'ranakermit',
          discussion_type: null,
          num_comments: 250,
          send_replies: true,
          whitelist_status: 'all_ads',
          contest_mode: false,
          mod_reports: [],
          author_patreon_flair: false,
          author_flair_text_color: 'dark',
          permalink: '/r/argentina/comments/ho9777/moraleja_nunca_ahorren_en_pesos/',
          parent_whitelist_status: 'all_ads',
          stickied: false,
          url: 'https://v.redd.it/lpz9350nrv951',
          subreddit_subscribers: 179169,
          created_utc: 1594321786.0,
          num_crossposts: 0,
          media: {
            reddit_video: {
              fallback_url: 'https://v.redd.it/lpz9350nrv951/DASH_720.mp4?source=fallback',
              height: 960,
              width: 540,
              scrubber_media_url: 'https://v.redd.it/lpz9350nrv951/DASH_96.mp4',
              dash_url:
                'https://v.redd.it/lpz9350nrv951/DASHPlaylist.mpd?a=1596984809%2CYTMzMzQwYjlmZGFiOTQ1OTIzODNiNGE3ODQxZGU5ZWM2M2EyZTQwMWZjMGNkNjliODUwMmE3ODg0OTA1NTFiNA%3D%3D&amp;v=1&amp;f=sd',
              duration: 57,
              hls_url:
                'https://v.redd.it/lpz9350nrv951/HLSPlaylist.m3u8?a=1596984809%2CNTg3MTcyODZjZmYwNGI0OWNlYzc5NmJhY2M5OTA0YmZjNTJmMDJmODFkNTIyMzBmM2YxZGNlZmNmNTZhM2I2Yg%3D%3D&amp;v=1&amp;f=sd',
              is_gif: false,
              transcoding_status: 'completed'
            }
          },
          is_video: true
        }
      },
      {
        kind: 't3',
        data: {
          approved_at_utc: null,
          subreddit: 'argentina',
          selftext: '',
          author_fullname: 't2_4emg2up0',
          saved: true,
          mod_reason_title: null,
          gilded: 0,
          clicked: false,
          title: 'Cada año que pasa este chiste mejora',
          link_flair_richtext: [],
          subreddit_name_prefixed: 'r/argentina',
          hidden: false,
          pwls: 6,
          link_flair_css_class: 'humor',
          downs: 0,
          thumbnail_height: 78,
          top_awarded_type: null,
          hide_score: false,
          name: 't3_hoajgq',
          quarantine: false,
          link_flair_text_color: 'dark',
          upvote_ratio: 0.98,
          author_flair_background_color: null,
          subreddit_type: 'public',
          ups: 1326,
          total_awards_received: 0,
          media_embed: {},
          thumbnail_width: 140,
          author_flair_template_id: null,
          is_original_content: false,
          user_reports: [],
          secure_media: {
            reddit_video: {
              fallback_url: 'https://v.redd.it/o6l8ey8i4w951/DASH_720?source=fallback',
              height: 720,
              width: 1280,
              scrubber_media_url: 'https://v.redd.it/o6l8ey8i4w951/DASH_96',
              dash_url:
                'https://v.redd.it/o6l8ey8i4w951/DASHPlaylist.mpd?a=1596984809%2CMzk2MmFjZmM5MDMwOWY1YmRhOGRiODM0NGNiOTJjMDJiYjkwOWIzMjIwNzA5NjhiODA1NTJmNjY5NTkwZWZmYg%3D%3D&amp;v=1&amp;f=sd',
              duration: 25,
              hls_url:
                'https://v.redd.it/o6l8ey8i4w951/HLSPlaylist.m3u8?a=1596984809%2COGE1NWZlYTFkNDZmNmMyZjFmNjM2YTU5OTBmNTA2NDZmYzQ1YzIwM2ZhNmZjMDNlNTY3ZDhmMTEzNWRhZjNiZg%3D%3D&amp;v=1&amp;f=sd',
              is_gif: false,
              transcoding_status: 'completed'
            }
          },
          is_reddit_media_domain: true,
          is_meta: false,
          category: null,
          secure_media_embed: {},
          link_flair_text: 'Humor',
          can_mod_post: false,
          score: 1326,
          approved_by: null,
          author_premium: false,
          thumbnail: 'https://b.thumbs.redditmedia.com/i5c_Yt91r4WcBG0JVOROIDkCjXBPNEKYXqy-sX_sc0s.jpg',
          edited: false,
          author_flair_css_class: null,
          author_flair_richtext: [],
          gildings: {},
          post_hint: 'hosted:video',
          content_categories: null,
          is_self: false,
          mod_note: null,
          created: 1594354920.0,
          link_flair_type: 'text',
          wls: 6,
          removed_by_category: null,
          banned_by: null,
          author_flair_type: 'text',
          domain: 'v.redd.it',
          allow_live_comments: false,
          selftext_html: null,
          likes: null,
          suggested_sort: null,
          banned_at_utc: null,
          url_overridden_by_dest: 'https://v.redd.it/o6l8ey8i4w951',
          view_count: null,
          archived: false,
          no_follow: false,
          is_crosspostable: true,
          pinned: false,
          over_18: false,
          preview: {
            images: [
              {
                source: {
                  url:
                    'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?format=pjpg&amp;auto=webp&amp;s=f19f56ab5289847be86df382cf42d90170b2a0a3',
                  width: 1280,
                  height: 720
                },
                resolutions: [
                  {
                    url:
                      'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?width=108&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=d5202a20b8328a5110d6d02b3d4a8ffacbcc11a9',
                    width: 108,
                    height: 60
                  },
                  {
                    url:
                      'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?width=216&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=1903d2a0872c199318ee8c6121c0a4aa74ba0b9f',
                    width: 216,
                    height: 121
                  },
                  {
                    url:
                      'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?width=320&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=3b03c4cc85bb2312c072aa4325328639f107f12c',
                    width: 320,
                    height: 180
                  },
                  {
                    url:
                      'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?width=640&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=30664f3e53a1090f33abb7744892ad7bc769a298',
                    width: 640,
                    height: 360
                  },
                  {
                    url:
                      'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?width=960&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=6c79fe26fc36a89265c610ac9ee27621df8cb1b0',
                    width: 960,
                    height: 540
                  },
                  {
                    url:
                      'https://external-preview.redd.it/qNTA3gXeHAUQQjfRc5X1qyo07r-pH0TufBeGL4Icl1c.png?width=1080&amp;crop=smart&amp;format=pjpg&amp;auto=webp&amp;s=d27d8233c3058e2aaa3c514db188219fc346e6e4',
                    width: 1080,
                    height: 607
                  }
                ],
                variants: {},
                id: '9p8q3A7YlnDuBsZAW2rZhel0uFMhAUrZJdikGcVOEJg'
              }
            ],
            enabled: false
          },
          all_awardings: [],
          awarders: [],
          media_only: false,
          link_flair_template_id: 'b4271f76-a7c9-11e4-8662-22000b6a0722',
          can_gild: true,
          spoiler: false,
          locked: false,
          author_flair_text: null,
          treatment_tags: [],
          visited: false,
          removed_by: null,
          num_reports: null,
          distinguished: null,
          subreddit_id: 't5_2qlht',
          mod_reason_by: null,
          removal_reason: null,
          link_flair_background_color: '',
          id: 'hoajgq',
          is_robot_indexable: true,
          report_reasons: null,
          author: 'collateral_hazzard',
          discussion_type: null,
          num_comments: 79,
          send_replies: true,
          whitelist_status: 'all_ads',
          contest_mode: false,
          mod_reports: [],
          author_patreon_flair: false,
          author_flair_text_color: null,
          permalink: '/r/argentina/comments/hoajgq/cada_año_que_pasa_este_chiste_mejora/',
          parent_whitelist_status: 'all_ads',
          stickied: false,
          url: 'https://v.redd.it/o6l8ey8i4w951',
          subreddit_subscribers: 179169,
          created_utc: 1594326120.0,
          num_crossposts: 0,
          media: {
            reddit_video: {
              fallback_url: 'https://v.redd.it/o6l8ey8i4w951/DASH_720?source=fallback',
              height: 720,
              width: 1280,
              scrubber_media_url: 'https://v.redd.it/o6l8ey8i4w951/DASH_96',
              dash_url:
                'https://v.redd.it/o6l8ey8i4w951/DASHPlaylist.mpd?a=1596984809%2CMzk2MmFjZmM5MDMwOWY1YmRhOGRiODM0NGNiOTJjMDJiYjkwOWIzMjIwNzA5NjhiODA1NTJmNjY5NTkwZWZmYg%3D%3D&amp;v=1&amp;f=sd',
              duration: 25,
              hls_url:
                'https://v.redd.it/o6l8ey8i4w951/HLSPlaylist.m3u8?a=1596984809%2COGE1NWZlYTFkNDZmNmMyZjFmNjM2YTU5OTBmNTA2NDZmYzQ1YzIwM2ZhNmZjMDNlNTY3ZDhmMTEzNWRhZjNiZg%3D%3D&amp;v=1&amp;f=sd',
              is_gif: false,
              transcoding_status: 'completed'
            }
          },
          is_video: true
        }
      }
    ]
  }
}

jest.mock('react-transition-group', () => ({
  TransitionGroup: (props) => <div>{props.children}</div>,
  CSSTransition: (props) => <div>{props.children}</div>
}))

// Add redux Provider wrapper
function render(
  ui,
  {
    initialState = undefined,
    store = createStore(persistedReducer, undefined, applyMiddleware(thunk)),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return <Provider store={store}>{children}</Provider>
  }
  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

test('Renders', () => {
  const { asFragment } = render(<TopList />)
  expect(asFragment()).toMatchSnapshot()
})

test('Render posts response', async () => {
  mockAxios.get.mockImplementationOnce(() => {
    return Promise.resolve({ data: mockedResponse })
  })

  const { findAllByTestId, getAllByTestId } = render(<TopList />)
  
  expect(getAllByTestId('Placeholder').length).toBeGreaterThan(0)

  const postsTitlesElements = await findAllByTestId('Post_title')
  const postTitles = postsTitlesElements.map((titleElement) => titleElement.textContent)
  const mockedPostTitles = mockedResponse.data.children.map((post) => post.data.title)
  expect(postTitles).toEqual(mockedPostTitles)
})

test('Can remove posts from list', async () => {
  mockAxios.get.mockImplementationOnce(() => {
    return Promise.resolve({ data: mockedResponse })
  })

  const { findAllByTestId, getAllByTestId, queryAllByText } = render(<TopList />)

  const posts = await findAllByTestId('Post_title')
  expect(posts).toHaveLength(2)
  fireEvent.click(queryAllByText('Hide')[0])
  expect(getAllByTestId('Post_title')).toHaveLength(1)
  
})
