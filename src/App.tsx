import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createGlobalStyle } from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import persistedReducer from './reducers'
import { Header } from './components'
import TopList from './pages/top/components/TopList.component'
import Gallery from './pages/gallery/components/Gallery.component'
import NotFound from './pages/notFound/components/NotFound.component'

const GlobalStyle = createGlobalStyle`
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, button, cite, code, del, dfn, em, img, input, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
      font-family: 'IBM Plex Sans',sans-serif !important;
      margin: 0;
      padding: 0;
      border: 0;
      font-size: 100%;
      font: inherit;
      vertical-align: baseline;
    }
    
    body {
      background-color: #DAE0E6
    }
    
    a {
      text-decoration: none;
    }
`

function App() {
  const store = createStore(persistedReducer, undefined, applyMiddleware(thunk))
  const persistor = persistStore(store)

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyle />
        <Router>
          <div className="App">
            <Header />
            <Switch path="/gallery">
              <Route exact path="/">
                <TopList />
              </Route>
              <Route path="/gallery">
                <Gallery />
              </Route>
              <Route path="*">
                <NotFound />
              </Route>
            </Switch>
          </div>
        </Router>
      </PersistGate>
    </Provider>
  )
}

export default App
