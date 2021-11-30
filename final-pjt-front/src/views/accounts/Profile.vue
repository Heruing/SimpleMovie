<template>
  <div class="profile white inner-y" style="height:96vh; overflow-y:scroll">
    <br><br><br><br><br>
    <h1 class="shdo" style="font-weight: bold;">My Profile</h1>
    <hr>

    <div class="container">
      <span v-if="myMovies.length==0">
          My List is Empty
      </span>
      <span v-else>
        <h1 class="itr">My Favorites</h1>
        <carousel-3d style="height: 90vh;">
        <slide v-for="(slide, i) in myMovieDetail" :index="i" :key="i" style="height: 80vh; width: 45vw;" >
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <img @dblclick="movieDetail(slide.id)" :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="getPoster(slide.poster_path)" style="height:100%; width: 100%;">
            </template>
        </slide>
      </carousel-3d>
      
        <!-- 영화 목록 -->
        <h1 class="itr shdo">My Movies</h1>
        <div class="inner-y" style="height: 40vh; overflow-y: scroll;">
          <div
            v-for="myMovie in myMovieDetail"
            :key="myMovie.id"
          >
            <div class="d-flex justify-content-end">
              <div class="align-self-center" @click="movieDetail(myMovie.id)">{{myMovie['title']}}</div>
              <button @click="goToForum(myMovie.id)" type="button" class="btn btn-light m-1" style="height:40px; width: 40px;">
                ↗
              </button>
              <button @click="movieDetail(myMovie.id)" type="button" class="btn btn-secondary m-1" style="height:40px; width: 40px;">
                +
              </button>
              <div>
                <span v-if="myMovies.includes(myMovie.id)">
                  <button @click="updateMyMovie(myMovie.id)" class="btn btn-danger m-1" style="height:40px; width: 40px;">♥</button>
                </span>
                <span v-else>
                  <button @click="updateMyMovie(myMovie.id)" class="btn btn-outline-danger m-1" style="height:40px; width: 40px;">♡</button>
                </span>
              </div>
            </div>
          </div>
        </div>
      </span>
      
     

     <!-- 내 리뷰 -->
     <h1 class="itr shdo">My Reviews</h1>
     <p class="white">{{reviews.length}}review(s) loaded</p>
     <div class="inner-y" style="height: 70vh; overflow-y: scroll;">
       <div class="d-flex justify-content-center">
          <table class="table-dark" style="width:80vw; outline-style: solid;">
            <thead class="table-dark" style="outline-style: solid;">
              <tr>
                <th style="width:100px;" scope="col">영화</th>
                <th style="width:100vw;" scope="col">내용</th>
                <th style="width:100px;" scope="col">평점</th>
              </tr>
            </thead>
            <tbody
              v-for="review in reviews"
              :key="review.id"
              :review="review"
            >
            <tr>
              <th style="outline-style: solid; outline-width: 0.1px" @click="movieDetail(review.movie_id)" scope="row"> <button class="btn btn-light">+</button> </th>
              <td style="outline-style: solid; outline-width: 0.1px" @click="reviewDetail(review.id)"><div class="textbox" style="text-align: left;">◎ {{review.title}}</div> <div class="textbox" style="text-align: right;">{{review.content}}</div></td>
              <td style="outline-style: solid; outline-width: 0.1px">{{review.rank}}</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
      <br><br>

      <div class="d-flex justify-content-center">
        <button type="button" class="btn btn-danger m-2" style="width:100px" data-bs-toggle="modal" data-bs-target="#delModal">
          Leave
        </button>
        <button onclick="history.back()" class="btn btn-dark m-2" style="width:100px">Back</button>
      </div>

      <!-- Modal -->
      <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="delModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content  bg-dark">
            <div class="modal-header">
              <h5 class="modal-title" id="delModalLabel">LEAVE</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <p>정말로 삭제하시겠습니까?</p>
              <p>삭제한 데이터는 복구되지 않습니다.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-danger" @click="leave" data-bs-dismiss="modal">Leave</button>
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
      <br><br>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name:'Profile',
  components: {
    Carousel3d,
    Slide,
  },
  data: function () {
    return {
      reviews: null,
    }
  },
  methods: {
    setToken: function () {
      const token = localStorage.getItem('jwt')
      const config = {
        Authorization: `JWT ${token}`
      }
      return config
    },
    updateMyMovie: function (id) {
      const MyMovie = {id: id}
      this.$store.dispatch('updateMyMovie', MyMovie)
    },
    movieDetail: function (id) {
      this.$router.push({ name: 'Detail', params: {movieId: id }})
    },
    goToForum: function (id) {
      this.$router.push({ name: 'Forum', params: {movieId: id}})
    },
    getReview: function () {
      axios({
        method:'get',
        url: `https://simplemovie-server.link/accounts/profile/${localStorage.username}`,
        headers: this.setToken(),
      })
        .then(res => {
          //console.log(res)
          this.reviews = res.data
        })
        .catch(err => {
          console.log(err)
        })
    },
    leave: function () {
      this.$store.dispatch('delMyMovie')
      this.$store.dispatch('DelRecommendations')
      this.$store.dispatch('DelSimilar')
      axios({
        method:'POST',
        url: "https://simplemovie-server.link/accounts/leave/",
        headers: this.setToken(),
      })
        .then(res => {
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
      
      localStorage.removeItem('jwt')
      localStorage.setItem('username', 'Anonymous')
      this.$router.push({ name: 'Login' })
      history.go()
    },


    reviewDetail: function (reviewId) {
      this.$router.push({ name:'Review', params: {reviewId: reviewId}})
    },
    isBlocked: function(id) {
      return (this.blockcodes.includes(id))
    },
    isAdded: function(id) {
      return (this.myMovies.includes(id))
    },
    getPoster: function (poster_path) {
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
  },
  created: function () {
    this.$store.dispatch('updateMyMovie')
    this.getReview()
  },
  computed: {
    ...mapState(['myMovies']),
    ...mapState(['myMovieDetail']),
    ...mapState(['blockcodes']),
  },

}
</script>

<style>

</style>