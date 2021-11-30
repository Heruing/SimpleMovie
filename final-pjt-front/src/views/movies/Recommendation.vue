<template>
  <div id="recmdWindow" class="white inner-y" style="height:96vh; overflow-y:scroll">
    <br><br><br><br><br>
    <hr>
    <div class="container white">
    
      <div style="position:fixed; z-index:1; top:15vh; right: 2vw;">
        <h5 class="itr">Change Related</h5>
        <div class="dropdown" >
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton2"  data-bs-toggle="dropdown" aria-expanded="false">
            This Movie
          </button>
          <ul class="dropdown-menu dropdown-menu-dark inner-y" aria-labelledby="dropdownMenuButton2" style="height:50vh; overflow-y:scroll;">
              <li
              v-for="(n, index) in myMovieDetail" :key="index"
            >
              <div class="dropdown-item" @click="getRecommendations(myMovies[index]), getSimilar(myMovies[index])">{{ n.title }}</div>
            </li>
          </ul>
        </div>
      </div>
    
      <div class="white">
        <!-- My Movie List start -->
        <p >
          <button class="btn btn-dark" type="button" data-bs-toggle="collapse" data-bs-target="#multiCollapseExample2" aria-expanded="false" aria-controls="multiCollapseExample2">My List</button>
        </p>
        <div class="row">
          <div class="col">
            <div class="collapse multi-collapse" id="multiCollapseExample2">
              <div class="card card-body bg-dark">
                <span v-if="myMovies.length==0">
                  My List is Empty
                </span>
                <span class="inner-y inner-y" v-else style="height:50vh; overflow-y:scroll;">
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
                </span>
              </div>
            </div>
          </div>
        </div>
        <!-- My Movie List end-->
        <!-- recommendations start-->
        <h1 class="itr shdo"> Recommendations</h1>
        <div class="white inner-y inner-x" style="height: 680px; overflow-x:scroll;">
            <span v-if="myMovies.length==0">
              For recommendations, shold make your own list
            </span>
            <span v-else style="height: 100%">
    
              <br>
              <!-- 추천 영화 알고리즘 -->
                <span v-if="recommendations.length==0">
                  <h1>Oops, Some Movie can't make recommendations <br> Please select other movie or watch below similars</h1>
                  <button @click="pullDown" class="btn btn-light">get Similar</button>
                </span>
                <span v-else>
                  <span class="d-flex flex-nowrap row">
                    <div
                      class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
                      style="height:100%;"
                      v-for="r in recommendations"
                      :key="r.id"
                    >
                      <div class="card bg-dark m-2" style="height: 100%;">
                        <img :src="getPoster(r.poster_path)" @click="movieDetail(r.id)" class="card-img-top" style="height:100%;" alt="movie_poster is null">
                        <div class="card-body bg-black" style="height:100%;">
                          <button @click="goToForum(r.id)" type="button" class="btn btn-light m-1" style="height:40px; width: 40px;">
                            ↗
                          </button>
                          <button @click="movieDetail(r.id)" type="button" class="btn btn-secondary m-1" style="height:40px; width: 40px;">
                            +
                          </button>
                          <span v-if="myMovies.includes(r.id)">
                            <button @click="updateMyMovie(r.id)" class="btn btn-danger m-1" style="height:40px; width: 40px;">♥</button>
                          </span>
                          <span v-else>
                            <button @click="updateMyMovie(r.id)" class="btn btn-outline-danger m-1" style="height:40px; width: 40px;">♡</button>
                          </span>
                        </div>
                      </div>
                    </div>
                  </span>
                </span>
                
            </span>
        </div>
        <div> <br><br> <h1 class="itr shdo">similar movies</h1></div>
        <div class="white inner-y inner-x" style="height: 680px; overflow-x:scroll;">
          <br>
          <span v-if="myMovies.length==0">
            For get similar, shold make your own list
          </span>
          <span v-else class="d-flex flex-nowrap row">
            <div
              class="col-sm-12 col-md-6 col-lg-4 col-xl-3"
              style="height:100%;"
              v-for="s in similar"
              :key="s.id"
            >
              <div class="card bg-dark" style="height:100%;">
                <img :src="getPoster(s.poster_path)" @click="movieDetail(s.id)" class="card-img-top" style="height:100%" alt="movie_poster is null">
                <div class="card-body bg-black" style="height:100%">
                  <button @click="goToForum(s.id)" type="button" class="btn btn-light m-1" style="height:40px; width: 40px;">
                    ↗
                  </button>
                  <button @click="movieDetail(s.id)" type="button" class="btn btn-secondary m-1" style="height:40px; width: 40px;">
                    +
                  </button>
                  <span v-if="myMovies.includes(s.id)">
                    <button @click="updateMyMovie(s.id)" class="btn btn-danger m-1" style="height:40px; width: 40px;">♥</button>
                  </span>
                  <span v-else>
                    <button @click="updateMyMovie(s.id)" class="btn btn-outline-danger m-1" style="height:40px; width: 40px;">♡</button>
                  </span>
                </div>
              </div>
            </div>
          </span>
        </div>
    
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Recommendation',
  data: function () {
    return {
      username: localStorage.username
    }
  },
  created: function () {
    this.$store.dispatch('updateMyMovie')
    this.$store.dispatch('GetRecommendations', this.myMovies[Math.floor(Math.random() *(this.myMovies.length))])
    this.$store.dispatch('GetSimilar', this.myMovies[Math.floor(Math.random() *(this.myMovies.length))])
    this.$store.dispatch('myMovieDetail')
  },
  methods: {
    updateMyMovie: function (myMovie) {
      const MyMovie = {id: myMovie}
      this.$store.dispatch('updateMyMovie', MyMovie)
    },
    movieDetail: function (myMovie) {
      this.$router.push({ name: 'Detail', params: {movieId: myMovie }})
    },
    goToForum: function (movieId) {
      this.$router.push({ name: 'Forum', params: {movieId: movieId}})
    },
    getPoster: function(poster_path) {
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
    getRecommendations: function (idx) {
      this.$store.dispatch('GetRecommendations', idx)
    },
    getSimilar: function (idx) {
      this.$store.dispatch('GetSimilar', idx)
    },
    pullDown: function () {
      const box = document.getElementById('recmdWindow')
      box.scrollTo({top:800, behavior:'smooth'})
    }
  },
  computed: {
    isBlocked: function (id) {
      return (this.blockcodes.includes(id))
    },
    ...mapState(['myMovies']),
    ...mapState(['usercode']),
    ...mapState(['myMovieDetail']),
    ...mapState(['recommendations']),
    ...mapState(['similar']),
    ...mapState(['blockcodes']),
  }
}
</script>

<style>
.box {
  outline: 1px;
  outline-color: white;
}
</style>