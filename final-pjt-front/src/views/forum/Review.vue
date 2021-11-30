<template>
  <div class="review white left container">
    <br>
    <h1>{{review.title}}</h1>
    <hr>
    <p>작성자: {{username}}</p>
    <p>평점: {{review.rank}}</p>
    <p>작성일자: {{review.created_at.slice(0,10)}} {{review.created_at.slice(12,19)}}</p>
    <hr>
    <p>{{review.content}}</p>
    <br><br>
    <hr>
    <!-- Button trigger modal -->
    <div class="d-flex justify-content-end">
      <button type="button" class="btn btn-danger m-2" style="width:100px" data-bs-toggle="modal" data-bs-target="#delModal" v-if="isVerified">
        Del
      </button>
      <button onclick="history.back()" class="btn btn-dark m-2" style="width:100px">Back</button>
    </div>
    <!-- Modal -->
    <div class="modal fade" id="delModal" tabindex="-1" aria-labelledby="delModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content  bg-dark">
          <div class="modal-header">
            <h5 class="modal-title" id="delModalLabel">DELETION</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <p>정말로 삭제하시겠습니까?</p>
            <p>삭제한 데이터는 복구되지 않습니다.</p>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-danger" @click="delReview" data-bs-dismiss="modal">Delete</button>
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>



    <br><br>


  </div> 
</template>

<script>
import axios from 'axios'
import { mapState } from 'vuex'
export default {
  name: 'Review',
  data: function () {
    return {
      review: null,
      reviewId: this.$route.params.reviewId,
      username: null,
      comments: null,
      isVerified: false,

      //comments POST
      title: null,
      content: null,
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
    writeComment: function () {
      axios ({
        method:'POST',
        url: `https://simplemovie-server.link/${this.movieDetail.id}/`,
        headers: this.setToken(),
        data: {
          title: this.title,
          content: this.content,
          rank: this.rank,
          movie_id: this.movieId
        }
      })
        .then(res => {
          console.log(res)
          this.rank=10
          this.title=null
          this.content=null
        })
        .catch(err => {
          console.log(err)
        })
    },
    getReview: function () {
      axios({
        method:'get',
        url: `https://simplemovie-server.link/review/${this.reviewId}/`,
        headers: this.setToken(),
        data:{
          review_id: this.reviewId
        }
      })
        .then(res => {
          console.log(res)
          this.review = res.data
          this.username = this.$store.state.usercode[this.review.user].username
          this.verify()
        })
        .catch(err => {
          console.log(err)
        })
    },
    delReview: function () {
      axios({
        method:'delete',
        url: `https://simplemovie-server.link/review/${this.reviewId}/`,
        headers: this.setToken(),
        data:{
          review_id: this.reviewId
        }
      })
        .then(res => {
          console.log(res)
          history.back()
        })
        .catch(err => {
          console.log(err)
        })
    },
    verify: function () {
      if (localStorage.username==this.username) {
        this.isVerified=true
      }else if (localStorage.username=='admin') {
        this.isVerified=true
      }
    }
  },
  created : function (){
    this.getReview()
    this.verify()
  },
  computed: {
    ...mapState(['usercode'])
  }
}
</script>

<style>

</style>