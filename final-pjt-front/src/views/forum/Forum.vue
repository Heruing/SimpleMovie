<template>
  <div class="forum">
    <br><br><br><br><br><br>
    <span v-if="isBlocked" class="white">
      <h1>OOPS!,</h1>
      <h3>※It's Blocked <br> by administrator</h3>
      this movie code is {{movieDetail.id}}
    </span>
    <span v-else>
      <br>
      <div>
        <h1 class="white">{{movieDetail.title}}</h1>
      </div>
      <!-- Button trigger modal -->
      <div class="sticky-top">
        <button type="button" class="btn btn-light m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="isLogin">
          WRITE REVIEW
        </button>
        <button class="btn btn-light m-2" @click="getReview()">REFRESH</button>
        <button onclick="history.back()" class="btn btn-dark m-2">BACK</button>
      </div>
      <!-- Modal -->
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark">
            <div class="modal-header">
              <h5 class="modal-title white" id="exampleModalLabel">Write Review</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="d-flex justify-content-center">
                <button type="button" class="btn btn-light dropdown-toggle m-1" data-bs-toggle="dropdown" aria-expanded="false" style="width:50px; height:40px;">
                  {{rank}}
                </button>
                <ul class="form-select dropdown-menu dropdown-menu-dark overflow-auto" aria-labelledby="dropdownMenuButton2">
                  <li
                    v-for="rank in (1, 10)" :key="rank"
                  >
                    <div class="dropdown-item" @click="rankChange(rank)">{{ rank }}</div>
                  </li>
                </ul>
              </div>
              <br>
              <input type="text" v-model="title" placeholder="제목" style="width:300px" class="bg-black white">
              <br><br>
              <textarea v-model="content" placeholder="최대 200자까지 내용을 입력하세요." maxlength="200" style="width:300px; height:400px;" class="bg-black white"></textarea>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-light" @click="writeReview()" data-bs-dismiss="modal">POST</button>
            </div>
          </div>
        </div>
      </div>
      <!--modal end-->
      <br>
      <!--게시글  나열 구간-->
      <p class="white">{{reviews.length}}review(s) loaded</p>
      <div class="d-flex justify-content-center">
        <table class="table-dark" style="width:80vw; outline-style: solid;">
          <thead class="table-dark" style="outline-style: solid;">
            <tr>
              <th style="width:50vw;" scope="col">내용</th>
              <th style="width:15vw;" scope="col">작성자</th>
              <th style="width:15vw;" scope="col">평점</th>
              <th style="width:20vw;" scope="col">작성일자</th>
            </tr>
          </thead>
          <tbody
            v-for="review in reviews"
            :key="review.id"
            :review="review"
          >
          <tr>
            <th  scope="row" style="outline-style: solid; outline-width: 0.1px" @click="reviewDetail(review.id)"><div class="textbox" style="text-align: left;">◎ {{review.title}}</div> <div class="textbox" style="text-align: right;">{{review.content}}</div></th>
            <td style="outline-style: solid; outline-width: 0.1px">{{usercode[review.user].username}}</td>
            <td style="outline-style: solid; outline-width: 0.1px">{{review.rank}}</td>
            <td style="outline-style: solid; outline-width: 0.1px">{{review.created_at.slice(5,10)}}</td>
          </tr>
          </tbody>
        </table>
      </div>
      <br>
      <div>
        <button type="button" class="btn btn-light m-2" data-bs-toggle="modal" data-bs-target="#exampleModal" v-if="isLogin">
          WRITE REVIEW
        </button>
        <button class="btn btn-light m-2" @click="getReview()">REFRESH</button>
        <button onclick="history.back()" class="btn btn-dark m-2">BACK</button>
      </div>
      <br><br>
    </span>
  </div>
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'

export default {
  name: 'Forum',
  data: function () {
    return {
      movieId: this.$route.params.movieId,
      isLogin: false,
      reviews: null,

      // review POST
      title: null,
      content: null,
      rank: 10,
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
    getReview: function () {
      axios({
        method:'get',
        url: `http://simplemovie-server.link/forum/${this.movieDetail.id}/`,
        headers: this.setToken(),
        data:{
          movie_id: this.movieId
        }
      })
        .then(res => {
          //console.log(res)
          this.reviews = res.data
          this.$store.dispatch('GetUserCode', this.setToken())
        })
        .catch(err => {
          console.log(err)
        })
    },
    writeReview: function () {
      axios ({
        method:'POST',
        url: `http://simplemovie-server.link/forum/${this.movieDetail.id}/`,
        headers: this.setToken(),
        data: {
          title: this.title,
          content: this.content,
          rank: this.rank,
          movie_id: this.movieId,
        }
      })
        .then(res => {
          console.log(res)
          this.rank=10
          this.title=null
          this.content=null
          this.getReview()
        })
        .catch(err => {
          console.log(err)
        })
    },
    reviewDetail: function (reviewId) {
      this.$router.push({ name:'Review', params: {reviewId: reviewId}})
    },
    rankChange: function(num) {
      this.rank = num
    },
  },
  created: function () {
    this.$store.dispatch('MovieDetail', this.$route.params.movieId)
    this.$store.dispatch('GetUserCode')
    
    const Token = localStorage.getItem('jwt')
    if (Token) {
      this.isLogin = true
    }
    this.getReview()
  },
  computed: {
    isBlocked: function () {
      return (this.blockcodes.includes(this.movieDetail.id))
    },
    ...mapState(['movieDetail']),
    ...mapState(['usercode']),
    ...mapState(['blockcodes']),
  }
}

</script>

<style>
  .textbox {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width:50vw;
  }


  /*
  
  
  */




</style>