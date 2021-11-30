import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    movies: [],
    recentMovies: [],
    upcomingMovies: [],
    randomMovie: null,
    myMovies: [],
    movieDetail: null,
    usercode: null,
    myMovieDetail: null,
    recommendations: [],
    blockcodes: [],
    similar: [],
    search: [],
    dailyHot: [],
  },
  mutations: {
    LOAD_MOVIES: function (state, results) {
      state.movies = results
    },
    LOAD_RECENT_MOVIES: function (state, results) {
      state.recentMovies = results
    },
    LOAD_UPCOMING_MOVIES: function (state, response) {
      state.upcomingMovies = response
    },
    RANDOM_MOVIE: function (state, results) {
      state.randomMovie = results
    },
    ADD_MY_MOVIE: function (state, MyMovie) {
      state.myMovies.push(MyMovie)
    },
    MOVIE_DETAIL: function (state, results) {
      state.movieDetail = results
    },
    GET_USER_CODE: function (state, results) {
      state.usercode = results
    },
    UPDATE_MY_MOVIE: function (state, results) {
      state.myMovies = results
    },
    DEL_MY_MOVIE: function (state) {
      state.myMovies = []
    },
    MY_MOVIE_DETAIL: function (state, results) {
      state.myMovieDetail = results
    },
    GET_RECOMMENDATIONS: function (state, results) {
      state.recommendations = results
    },
    DEL_RECOMMENDATIONS: function (state) {
      state.recommendations = []
    },
    GET_SIMILAR: function (state, results) {
      state.similar = results
    },
    DEL_SIMILAR: function (state) {
      state.similar = []
    },
    UPDATE_BLOCK: function (state, results) {
      state.blockcodes = results
    },
    SEARCH: function (state, results) {
      state.search = results
    },
    GET_DAILY_HOT: function (state, results) {
      state.dailyHot = results
    },
  },
  actions: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },

    // Movie Load Start//
    LoadMovies: function ({commit}, page=1) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/top_rated',
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
          page: page
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('LOAD_MOVIES', res.data.results)
      })
    },
    LoadRecentMovies: function ({commit}, page=1) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/popular',
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
          page: page,
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('LOAD_RECENT_MOVIES', res.data.results)
      })
    },
    LoadUpcomingMovies: function ({commit}, page=1) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/movie/upcoming',
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
          page: page,
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('LOAD_UPCOMING_MOVIES', res.data.results)
      })
    },
    // Movie Load End//


    //RandomMovie
    RandomMovie: function ({dispatch, commit}) {
      const idx = Math.floor(Math.random() * (999998)+1)
      console.log(idx)
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${idx}`,
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
        }
      })
          .then((res) => {
            commit('RANDOM_MOVIE', res.data)
          })
          .catch(() => {
            dispatch('RandomMovie')
          })
    },

    //My Movie List Detail Info
    myMovieDetail: function ({commit}) {
      console.log('doit')
      let results = []
      console.log(this.state.myMovies)
      if (this.state.myMovies == []) { return commit('MY_MOVIE_DETAIL', [])}
      for (let index = 0; index < this.state.myMovies.length; index++) {
        const myMovie = this.state.myMovies[index];
        console.log(myMovie)
        axios({
          method: 'get',
          url: `https://api.themoviedb.org/3/movie/${myMovie}`,
          params: {
            api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
            language: 'ko-KR',
          }
        })
          .then((res) => {
            results.push(res.data)
            commit('MY_MOVIE_DETAIL', results)
          })
      }
    },

    // 영화 리스트에 넣고 빼기
    updateMyMovie: function ({commit}, MyMovie={id: 0}) {
      const token = { Authorization : `JWT ${window.localStorage.getItem('jwt')}` }
      axios({
        method: 'post',
        url: `http://simplemovie-server.link/forum/${MyMovie.id}/likes/`,
        headers: token
      })
        .then(res => {
          console.log(res.data)
          commit('UPDATE_MY_MOVIE', res.data)
        })
        .catch(err => {
          console.log(err)
        })
    },

    // 로그아웃용
    delMyMovie: function ({commit}) {
      commit('DEL_MY_MOVIE')
    },

    // 영화 상세정보 로드
    MovieDetail: function ({commit}, MovieId) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${MovieId}`,
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
        }
      })
          .then((res) => {
            console.log(res.data)
            commit('MOVIE_DETAIL', res.data)
        })
          .catch((err) => {
            console.log(err)
          })
    },

    // 유저 정보 처리용 데이터
    GetUserCode: function ({commit}, Token) {
      console.log('Get User Code processing..')
      axios({
        method: 'get',
        url: 'http://simplemovie-server.link/accounts/profile/',
        headers: Token,
      })
        .then((res) => {
          console.log(res.data)

          let results = {}
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            results[element['pk']] ={'username': element['username'], 'is_superuser': element['is_superuser']}
            results[element['username']]=element['pk']
          }
          commit('GET_USER_CODE', results)
      })
    },

    // 추천 영화 알고리즘
    GetRecommendations: function ({commit}, idx) {
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${idx}/recommendations`,
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
          page: 1
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('GET_RECOMMENDATIONS', res.data.results)
      })
      .catch((err) => {
        console.log(err)
      })
    },

    DelRecommendations: function ({commit}) {
      commit('DEL_RECOMMENDATIONS')
    },


    // 유사 영화 알고리즘
    GetSimilar: function ({commit}, idx) {
      const page = Math.floor(Math.random() * (99)+1)
      axios({
        method: 'get',
        url: `https://api.themoviedb.org/3/movie/${idx}/similar`,
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
          page: page
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('GET_SIMILAR', res.data.results)
      })
      .catch((err) => {
        commit('GET_SIMILAR', err)
      })
    },

    DelSimilar: function ({commit}) {
      commit('DEL_SIMILAR')
    },
    // admin makes block
    updateBlock: function ({commit}, blockcode=0) {
      const token = { Authorization : `JWT ${window.localStorage.getItem('jwt')}` }
      axios({
        method: 'post',
        url: `http://simplemovie-server.link/forum/block/${blockcode}/`,
        headers: token
      })
        .then(res => {
          console.log(res.data)
          let results = []
          for (let index = 0; index < res.data.length; index++) {
            const element = res.data[index];
            results.push(element['movie_id'])
          }
          commit('UPDATE_BLOCK', results)
        })
        .catch(err => {
          console.log(err)
        })
    },
    //search
    Search: function ({commit}, context) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/search/movie',
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
          page: context.page,
          query: context.query,
          include_adult: context.include_adult
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('SEARCH', res.data.results)
      })
      .catch(() => {
        commit('SEARCH', [])
      })
    },

    // daily
    getDailyHot: function ({commit}) {
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/trending/movie/day',
        params: {
          api_key: 'cb095b3f2f2dba67fbb3e3b60f957b28',
          language: 'ko-KR',
        }
      })
      .then((res) => {
        console.log(res.data.results)
        commit('GET_DAILY_HOT', res.data.results)
      })
      .catch(() => {
        commit('GET_DAILY_HOT', [])
      })
    },







  },

})