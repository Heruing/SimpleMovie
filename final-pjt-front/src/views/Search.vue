<template>
  <div id="SC" class="search inner-y" style="height:96vh; overflow-y:scroll; overflow-x:hidden;">
    <br><br><br><br><br><br>

    <div class="white container">
      <div class="col-12">

        <input v-model="context.query" class="form-control" type="text" placeholder="Search..." aria-label="default input example" @keyup.enter="getSearch(context)">
        <div class="form-check" style="width: 120px;">
          <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" v-model="context.include_adult">
          <label class="form-check-label" for="flexCheckDefault">
            Include Adult
          </label>
        </div>
        <button class="btn btn-dark" @click="getSearch(context)">Search</button>
        <br><br><br><br><br><br>
      </div>
    </div>

    <span v-if="isSearched">
      <div>
      <carousel-3d :width="550" :height="780">
        <slide v-for="(slide, i) in search" :index="i" :key="i">
            <template slot-scope="{ index, isCurrent, leftIndex, rightIndex }">
                <img @dblclick="goMovieDetail(slide.id)" :data-index="index" :class="{ current: isCurrent, onLeft: (leftIndex >= 0), onRight: (rightIndex >= 0) }" :src="getPoster(slide.poster_path)">
            </template>
        </slide>
      </carousel-3d>
        
      <div>Search Data <br><br> </div>
      <div class="row">
        <div
          class="col-sm-12 col-md-6 col-lg-4"
          v-for="lst in search"
          :key="lst.id"
        >
          <p>{{lst.title}}</p>
          <div v-if="isLogin">
            <button @click="goToForum(lst.id)" class="btn btn-light m-2" style="width: 40px; height:40px;"> ↗ </button>
            <button @click="goMovieDetail(lst.id)" class="btn btn-secondary m-2" style="width: 40px; height:40px;"> + </button>
            <span v-if="isAdded(lst.id)">
              <button @click="updateMyMovie(lst.id)" class="btn btn-danger m-2" style="width: 40px; height:40px;"> ♥ </button>
            </span>
            <span v-else>
              <button @click="updateMyMovie(lst.id)" class="btn btn-outline-danger m-2" style="width: 40px; height:40px;"> ♡ </button>
            </span>
          </div>

        </div>
      </div>





      </div>
    </span>
    <span v-else>
      <div class="white" style="height:87vh;">
        <br><br><br><br><br><br><br><br><br>
        <div class="spinner-border text-light" role="status">
            <span class="visually-hidden">Loading...</span>
        </div>
        
        <br><br>
        Search Data Not Exist
      </div>
    </span>


  </div>
</template>

<script>
import { mapState } from 'vuex'
import { Carousel3d, Slide } from 'vue-carousel-3d'

export default {
  name: 'search',
  components: {
    Carousel3d,
    Slide,
  },
  methods: {
    getPoster: function (poster_path) {
      return `https://www.themoviedb.org/t/p/original/${poster_path}`
    },
    getSearch: function (context) {
      this.$store.dispatch('Search', context)
      const searchContainer = document.getElementById('SC')
      searchContainer.scrollTo({top:280, behavior:'smooth'});
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
  },
  data() {
    return {
      headerOpt: { isVisible: true, backgroundColor: "black" },
      footerOpt: { isVisible: false },
      context: {
        page: 1,
        query: null,
        include_adult: false,
      }
    }
  },
  computed: {
    ...mapState(['search']),
    ...mapState(['blockcodes']),
    ...mapState(['myMovies']),


    isSearched: function () {
      return (this.search.length > 0)
    },
    
    isLogin: function () {
      return (localStorage.username != 'Anonymous')
    },
    
  }
};
</script>

<style scoped>
  .vcc {
    height: 92vh;
    width: 100%;
  }

</style>