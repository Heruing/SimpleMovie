<template>
  <div id="tem" class="home inner-y shdo" style="height:96vh; overflow-y:scroll; overflow-x:hidden;">
    <br><br><br><br><br>
    

    <div class="TB" style="height:82vh;" ondragstart="return false" onselectstart="return false">
      <div class="perspective-text" >
        <div class="perspective-line">
          <p class="homeText"></p>
          <p class="homeText">Simple</p>
        </div>
        <div class="perspective-line">
          <p class="homeText">Simple</p>
          <p class="homeText">Is The BEST</p>
        </div>
        <div class="perspective-line">
          <p class="homeText">Is The BEST</p>
          <p class="homeText">Methods to</p>
        </div>
        <div class="perspective-line">
          <p class="homeText">Methods to</p>
          <p class="homeText">Find Yours</p>
        </div>
        <div class="perspective-line">
          <p class="homeText">Find Yours</p>
          <p class="homeText"></p>
        </div>
      </div>
    </div>
    <br>

    <div>
      <carousel-3d  :width="550" :height="780">
        <slide-3d v-for="(slide, i) in dailyHot" :index="i" :key="i">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <img @dblclick="goMovieDetail(slide.id)" :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="getPoster(slide.poster_path)">
            </template>
        </slide-3d>
      </carousel-3d>
    </div>

    <hr>
    <div class="container">




      <div class="d-flex justify-content-between">
        <h2 class="itr">POPULAR</h2>
        <router-link to="/recent" class="text-decoration-none">
          <h4 class="itr"> more+</h4>
        </router-link>
      </div>
      
      <carousel>
        <slide
          v-for="recentMovie in recentMovies"
          :key="recentMovie.id"
        >
          <span v-if="isBlocked(recentMovie.id)">
            <h1>OOPS!,</h1>
            <h3>※It's Blocked <br> by administrator</h3>
          </span>
          <span v-else>
            <img @dblclick="goMovieDetail(recentMovie.id)" :src="getPoster(recentMovie.poster_path)" class="d-block" style="width: 100%">
            <div v-if="isLogin">
              <button @click="goToForum(recentMovie.id)" class="btn btn-light m-2" style="width: 40px; height:40px;"> ↗ </button>
              <button @click="goMovieDetail(recentMovie.id)" class="btn btn-secondary m-2" style="width: 40px; height:40px;"> + </button>
              <span v-if="isAdded(recentMovie.id)">
                <button @click="updateMyMovie(recentMovie.id)" class="btn btn-danger m-2" style="width: 40px; height:40px;"> ♥ </button>
              </span>
              <span v-else>
                <button @click="updateMyMovie(recentMovie.id)" class="btn btn-outline-danger m-2" style="width: 40px; height:40px;"> ♡ </button>
              </span>
            </div>
          </span>
        </slide>
      </carousel>
      
      <hr>
      <div class="d-flex justify-content-between">
        <h2 class="itr"> HOLE OF FAME</h2>
        <router-link to="/honor" class="text-decoration-none">
          <h4 class="itr"> more+</h4>
        </router-link>
      </div>

      <carousel>
        <slide
          v-for="movie in movies"
          :key="movie.id"
        >
          <span v-if="isBlocked(movie.id)">
            <h1>OOPS!,</h1>
            <h3>※It's Blocked <br> by administrator</h3>
          </span>
          <span v-else>
            <img @dblclick="goMovieDetail(movie.id)" :src="getPoster(movie.poster_path)"  class="d-block" style="width: 100%">
            <div v-if="isLogin">
              <button @click="goToForum(movie.id)" class="btn btn-light m-2" style="width: 40px; height:40px;"> ↗ </button>
              <button @click="goMovieDetail(movie.id)" class="btn btn-secondary m-2" style="width: 40px; height:40px;"> + </button>
              <span v-if="isAdded(movie.id)">
                <button @click="updateMyMovie(movie.id)" class="btn btn-danger m-2" style="width: 40px; height:40px;"> ♥ </button>
              </span>
              <span v-else>
                <button @click="updateMyMovie(movie.id)" class="btn btn-outline-danger m-2" style="width: 40px; height:40px;"> ♡ </button>
              </span>
            </div>
          </span>
        </slide>
      </carousel>
      <hr>
        <div class="d-flex justify-content-between">
          <h2 class="itr">UPCOMING</h2>
          <router-link to="/upcoming"  class="text-decoration-none">
            <h4 class="itr"> +more</h4>
          </router-link>
        </div>
      <carousel>
        <slide
          v-for="upcomingMovie in upcomingMovies"
          :key="upcomingMovie.id"
        >
          <span v-if="isBlocked(upcomingMovie.id)">
            <h1>OOPS!,</h1>
            <h3>※It's Blocked <br> by administrator</h3>
          </span>
          <span v-else>
            <img @dblclick="goMovieDetail(upcomingMovie.id)" :src="getPoster(upcomingMovie.poster_path)" class="d-block" style="width: 100%">
            <div v-if="isLogin">
              <button @click="goToForum(upcomingMovie.id)" class="btn btn-light m-2" style="width: 40px; height:40px;"> ↗ </button>
              <button @click="goMovieDetail(upcomingMovie.id)" class="btn btn-secondary m-2" style="width: 40px; height:40px;"> + </button>
              <span v-if="isAdded(upcomingMovie.id)">
                <button @click="updateMyMovie(upcomingMovie.id)" class="btn btn-danger m-2" style="width: 40px; height:40px;"> ♥ </button>
              </span>
              <span v-else>
                <button @click="updateMyMovie(upcomingMovie.id)" class="btn btn-outline-danger m-2" style="width: 40px; height:40px;"> ♡ </button>
              </span>
            </div>
          </span>
        </slide>
      </carousel>
    </div>


    <br><br><br>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { Carousel, Slide } from 'vue-carousel';
import { Carousel3d, Slide as Slide3d } from 'vue-carousel-3d'


export default {
  name: 'Home',
  components: {
    Carousel,
    Carousel3d,
    Slide3d,
    Slide,
  },
  created: function () {
    this.$store.dispatch('LoadRecentMovies'),
    this.$store.dispatch('LoadMovies', 1),
    this.$store.dispatch('LoadUpcomingMovies'),
    this.$store.dispatch('getDailyHot')
  },
  computed: {
    ...mapState(['recentMovies']),
    ...mapState(['movies']),
    ...mapState(['upcomingMovies']),
    ...mapState(['dailyHot']),
    ...mapState(['blockcodes']),
    ...mapState(['myMovies']),
    isLogin: function () {
      return (localStorage.username != 'Anonymous')
    }
  },
  methods: {
    getPoster: function (poster_path) {
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
    goMovieDetail: function (id) {
      this.$router.push({ name: 'Detail', params: {movieId: id}})
    },
    isBlocked: function(id) {
      return (this.blockcodes.includes(id))
    },
    isAdded: function(id) {
      return (this.myMovies.includes(id))
    },
    updateMyMovie: function (id) {
      const MyMovie = {id: id}
      this.$store.dispatch('updateMyMovie', MyMovie)
    },
    goToForum: function (movieId) {
      this.$router.push({ name: 'Forum', params: {movieId: movieId}})
    },
  }
}


</script>

<style>
.TB {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-left: auto;
  margin-right: auto;
}

.perspective-text {
  color: white;
  font-family: Arial;
  font-size: 58px;
  font-weight: 900;
  letter-spacing: -2px;
  text-transform: uppercase;
}

.perspective-line {
  height: 50px;
  overflow: hidden;
  position: relative;
}

.homeText {
  margin: 0;
  height: 50px;
  line-height: 50px;
  transition: all 0.5s ease-in-out;
}

.perspective-line:nth-child(odd) {
  transform: skew(60deg, -30deg) scaleY(0.667);
}

.perspective-line:nth-child(even) {
  transform: skew(0deg, -30deg) scaleY(1.337);
}

.perspective-text:hover p {
  transform: translate(0, -50px);
}

.perspective-line:nth-child(1) {
  left: 29px;
}

.perspective-line:nth-child(2) {
  left: 58px;
  background: #f07e6e;
}

.perspective-line:nth-child(3) {
  left: 87px;
  background: #84cdfa;
}

.perspective-line:nth-child(4) {
  left: 116px;
  background: #5ad1cd;
}

.perspective-line:nth-child(5) {
  left: 145px;
}



</style>
