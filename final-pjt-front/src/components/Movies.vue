<template>
  <div class="col-sm-12 col-xs-12 col-md-6 col-lg-4 col-xl-3 col-xxl-2 m-2 p-4" style="height: 100%; width: 100%;">
    <span v-if="isBlocked" class="white">
      <h1>OOPS!,</h1>
      <h3>※It's Blocked <br> by administrator</h3>
    </span>
    <span class="card" style="height:100%;" v-else>
      <img :src="poster" class="card-img-top" style="height:100%" @click="movieDetail">
      <div class="m-1">
        <button @click="goToForum(movie.id)" class="btn btn-secondary m-1"> ↗ </button>
        <button @click="goMovieDetail(movie.id)" class="btn btn-dark m-1"> + </button>
        <span v-if="isAdded">
          <button @click="updateMyMovie(movie.id)" class="btn btn-danger m-1"> ♥ </button>
        </span>
        <span v-else>
          <button @click="updateMyMovie(movie.id)" class="btn btn-outline-danger m-1"> ♡ </button>
        </span>
      </div>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'movie',
  props: {
    movie: Object,
  },
  data: function () {
    return {
      myMovieTitle: null,
      detailMovie: null,
      isLogin: false,
      username: null,
    }
  },
  created: function () { 
    const Token = localStorage.getItem('jwt')
    if (Token) {
      this.isLogin = true
    }
    this.username = localStorage.username
  },
  methods: {
    updateMyMovie: function () {
      const MyMovie = this.movie
      this.$store.dispatch('updateMyMovie', MyMovie)
    },
    movieDetail: function () {
      this.$router.push({ name: 'Detail', params: {movieId: this.movie.id }})
    },
    goToForum: function (movieId) {
      this.$router.push({ name: 'Forum', params: {movieId: movieId}})
    },
  },
  computed: {
    poster: function () {
      const poster_path = this.movie.poster_path
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
    isAdded: function () {
      return (this.myMovies.includes(this.movie.id))
    },
    isBlocked: function () {
      return (this.blockcodes.includes(this.movie.id))
    },
    ...mapState(['usercode']),
    ...mapState(['myMovies']),
    ...mapState(['blockcodes']),
  },

}
</script>

<style>

</style>