# [react-isomorphic-video-game-search](http://react-isomorphic-video-game-search.warppi.pe)

An Isomorphic application demo powered by [React](https://facebook.github.io/react/), [reflux](https://github.com/spoike/refluxjs), [react-router-component](https://github.com/STRML/react-router-component), [express](http://expressjs.com/), [superagent](https://visionmedia.github.io/superagent/) and the [Giant Bomb API](http://www.giantbomb.com/api/).

[![screenshot](https://github.com/chadpaulson/react-isomorphic-video-game-search/raw/master/screenshot.png)](http://react-isomorphic-video-game-search.warppi.pe)

Live Demo @ http://react-isomorphic-video-game-search.warppi.pe

## Features

* Server side rendering of all entry points.
* Progressive enhancement. App does not require Javscript on client to function.
* Isomorphic [Flux](https://facebook.github.io/flux/docs/overview.html) implementation powered by [reflux](https://github.com/spoike/refluxjs) and [react-async](https://github.com/andreypopp/react-async).
* Isomorphic routing powered by [react-router-component](https://github.com/STRML/react-router-component).
* CSS animations via React's [CSSTransitionGroup](https://facebook.github.io/react/docs/animation.html).
* Canonical URLs:
  [http://react-isomorphic-video-game-search.warppi.pe/game/21228/do-you-have](http://react-isomorphic-video-game-search.warppi.pe/game/21228/do-you-have)
  redirects to...
  [http://react-isomorphic-video-game-search.warppi.pe/game/21228/battletoads](http://react-isomorphic-video-game-search.warppi.pe/game/21228/battletoads)
  This is only supported on the front end at the moment. I would like to find an elegant way to do this on the server as well.
* Title management via reusable [DocumentTitle](https://github.com/gaearon/react-document-title) component.


[Feedback and contributions are welcome!](https://github.com/chadpaulson/react-isomorphic-video-game-search/issues/new)

## Install

```
sudo npm install gulp browserify react-tools -g
npm install
```

## Build & Run

* `./runserver.sh` - builds from scratch into the `/react/build` directory and runs the server. The app should now be available at `http://localhost:4000`.


## Motivation

An excuse to share my research and get feedback as I prepare to launch a large React-powered app.