<template>
  <div class="detail container inner-y" style="height:95vh; overflow-y:scroll">
    <br><br><br><br><br>
    <span class="white" v-if="isBlocked">
      <h1>OOPS!,</h1>
      <h3>※Your Request Blocked by administrator</h3>
      this movie code is {{movieDetail.id}}
    </span>
    <span v-else>
      <div class="container">
        <p></p>
        <h1 class="white left">DETAIL</h1>
        <div class="row">

          <div class="col-sm-12 col-md-6 col-lg-4 p-2">
            <img :src="poster" style="width:100%;">
          </div>

          <div class="col-sm-12 col-md-6 col-lg-8">
            <h4 class="white left">{{movieDetail.title}}</h4>
            <hr class="white">
            <div class="white left col-12">평점: {{movieDetail.vote_average}} | 개봉일: {{movieDetail.release_date}} <br> 장르:<span v-for="genres in movieDetail.genres" :key="genres.id"> {{genres.name}}</span></div>
            <div class="white left">상태: {{movieDetail.status}}</div>
            <div class="white left">제작비: {{movieDetail.budget}}$</div>
            <div class="white left">수익: {{movieDetail.revenue}}$</div>
            <div class="white left">사이트: {{movieDetail.homepage}}</div>
            <div class="white left">
              <div>제작사</div>
              <li
                v-for="company in movieDetail.production_companies"
                :key="company.id"
              >
                {{company.name}}
              </li>
            </div>

            <p></p>
          </div>
            <p class="white left" style="width: 100%"> {{movieDetail.overview}}</p>
        </div>
        <br>
        <span v-if="isLogin">
          <button class="btn btn-danger m-2" @click="updateMyMovie" v-if="isAdded">Remove On List</button>
          <button class="btn btn-light m-2" @click="updateMyMovie" v-else>Add My List</button>
          <button class="btn btn-secondary m-2" @click="goToForum">Go To Forum</button>
        </span>
        <button onclick="history.back()" class="btn btn-dark m-2">Back</button>
        <br><br><br><br>
      </div>
    </span>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:'Detail',
  data: function () {
    return {
      movieId: null,
      isLogin: false,
      username: null,
    }
  },
  created: function () {
    this.movieId = this.$route.params.movieId
    this.$store.dispatch('MovieDetail', this.$route.params.movieId)
    const Token = localStorage.getItem('jwt')
    if (Token) {
      this.isLogin = true
    }
    this.username = localStorage.username

    if (this.blockcodes.includes(this.$route.params.movieId)) {
      this.$router.push('/Alert')
    }
  },
  methods: {
    updateMyMovie: function () {
      const MyMovie = this.movieDetail
      this.$store.dispatch('updateMyMovie', MyMovie)
    },
    goToForum: function () {
      this.$router.push({ name: 'Forum', params: {movieId: this.movieDetail.id }})
    },
  },
  computed: {
    ...mapState(['movieDetail']),
    poster: function () {
      const poster_path = this.movieDetail.poster_path
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
    isAdded: function () {
      return (this.myMovies.includes(this.$route.params.movieId))
    },
    isBlocked: function () {
      return this.blockcodes.includes(this.movieDetail.id)
    },
    ...mapState(['usercode']),
    ...mapState(['myMovies']),
    ...mapState(['blockcodes']),
  },
}
</script>

<style>

</style>