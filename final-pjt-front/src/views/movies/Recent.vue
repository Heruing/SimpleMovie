<template>
  <div class="inner-y" style="height:96vh; overflow-y:scroll;">
    <div class="container">
      <br><br><br><br><br><br>
      <div class="d-flex justify-content-between">
        <h1 class="itr shdo"> POPULAR </h1>
        <div class="d-flex">
          <div>
            <button type="button" class="btn btn-dark dropdown-toggle m-1" data-bs-toggle="dropdown" aria-expanded="false" style="width:80px; height:50px;">
              Page
            </button>
            <ul class="dropdown-menu dropdown-menu-dark overflow-auto inner-y" style="height: 30vh;" aria-labelledby="dropdownMenuButton2">
              <li
                v-for="page_num in (1, 100)" :key="page_num"
              >
                <div class="dropdown-item" @click="change_page(page_num), reload()">{{ page_num }}</div>
              </li>
            </ul>
          </div>
          <button onclick="history.back()" class="btn btn-dark m-1" style="width:80px; height:50px">Back</button>
        </div>
      </div>
      <pre class="inner-x" style="height:100%">
        <div class = "d-flex flex-nowrap row">
          <recent-movie
            v-for="recentMovie in recentMovies"
            :key="recentMovie.id"
            :recentMovie="recentMovie"
            style="height:55vh; width:41vh;"
          >
          </recent-movie>
        </div>
      </pre>
      <div class="d-flex justify-content-around">
        <div>
          <nav>
              <ul class="pagination d-flex justify-content-center">
                <li class="page-item"><div class="page-link bg-dark" style="width:42px" @click="change_page(1), reload()">&#60;&#60;</div></li>
                <li class="page-item" v-if="page > 1"><div class="page-link bg-dark" style="width:42px" @click="change_page(page-1), reload()">&#60;</div></li>
                <li class="page-item" v-else><div class="page-link bg-dark" style="width:42px"> - </div></li>
                <li class="page-item"><div class="page-link" style="width:70px">{{page}}</div></li>
                <li class="page-item" v-if="page < 10"><div class="page-link bg-dark" style="width:42px" @click="change_page(page+1), reload()">&#62;</div></li>
                <li class="page-item" v-else><div class="page-link bg-dark" style="width:42px">  -  </div></li>
                <li class="page-item"><div class="page-link bg-dark" style="width:42px" @click="change_page(10), reload()">&#62;&#62;</div></li>
              </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import recentMovie from '@/components/RecentMovies.vue'
import {mapState} from 'vuex'

export default {
  name:"Recent",
  
  components: {
    recentMovie,
  },
  data: function () {
    return {
      page:1,
    }
  },
  methods:{
    reload: function () {
      this.$store.dispatch('LoadRecentMovies', this.page)
    },
    change_page: function(num) {
      this.page = num
    },
  },
  created: function () {
    this.$store.dispatch('LoadRecentMovies', this.page)
  },
  computed: {
    ...mapState(['recentMovies']),
  }

}
</script>

<style>

</style>