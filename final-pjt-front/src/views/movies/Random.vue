<template>
  <div class="random inner-y" style="height: 95vh; overflow-y: scroll;">
    <br><br><br><br>
    <button
      class="btn btn-danger m-3"
      @click="RandomMovie()"
    >
      RANDOM PICK!!
    </button>
    <p class="white">※Adult Movie can appear</p>
    <hr>
    <div class="container">
      <div v-if="randomMovie" class="container row">
        <div class="col-12 col-md-7 col-lg-5" v-if="randomMovie.adult">
          <button @click="loadPoster">
            ※ This is Adult Movie <br>
            click this button to load poster
          </button>
        </div>
        <div class="col-12 col-md-7 col-lg-5" v-else>
          <img :src="poster"  class="white" alt="Movie Poster" style="width:100%">
        </div>
        <div class="col-12 col-md-5 col-lg-7">
          <h1 class="m-3 white left">{{randomMovie.title}}</h1>
          <hr class="white">
          <div class="white left col-12">평점: {{randomMovie.vote_average}} | 개봉일: {{randomMovie.release_date}} <br> 장르:<span v-for="genres in randomMovie.genres" :key="genres.id"> {{genres.name}}</span></div>
          <hr class="white">
          <span v-if="overview">
            <p class="white left">줄거리가 등록되지 않았습니다.</p>
          </span>
          <span v-else>
            <p class="white left">{{randomMovie.overview}}</p>
          </span>
        </div>
        <div>
          <br>
          <span v-if="isLogin">
            <button class="btn btn-danger m-2" @click="updateMyMovie" v-if="isAdded">Remove On List</button>
            <button class="btn btn-light m-2" @click="updateMyMovie" v-else>Add My List</button>
            <button class="btn btn-secondary m-2" @click="goToForum">Go To Forum</button>
          </span>
          <button onclick="history.back()" class="btn btn-dark m-2">Back</button>
        </div>
        <br><br><br><br>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'random',
  data: function () {
    return {
      movieId: null,
      isLogin: false,
    }
  },
  created: function () {
    this.$store.dispatch('MovieDetail', this.$route.params.movieId)
    const Token = localStorage.getItem('jwt')
    if (Token) {
      this.isLogin = true
    }
  },
  methods:{
    RandomMovie: function() {
      this.$store.dispatch('RandomMovie')
    },
    updateMyMovie: function () {
      const MyMovie = this.randomMovie
      this.$store.dispatch('updateMyMovie', MyMovie)
    },
    goToForum: function () {
      this.$router.push({ name: 'Forum', params: {movieId: this.randomMovie.id }})
    },
    loadPoster: function () {
      this.randomMovie.adult = false
    },
  },
  computed: {
    ...mapState(['randomMovie']),
    ...mapState(['myMovies']),
    
    poster: function () {
      const poster_path = this.randomMovie.poster_path
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
    overview: function () {
      const ovv = this.randomMovie.overview
      return (ovv == '')
    },
    isAdded: function () {
      return (this.myMovies.includes(this.randomMovie.id))
    },
    isAdult: function() {
      return (this.randomMovie.adult)
    }
  }
}
</script>

<style>

</style>