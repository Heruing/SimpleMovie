<template>
  <div>
    <br><br><br><br><br>
    <div class="d-flex justify-content-center" style="height: 85vh">
      <div class="box" style="width:250px;">
        <h1 class="white">Login</h1>
        <div style="padding-left: 20px">
          <label for="username" class="white form-label"></label>
          <input
            type="text"
            id="username"
            placeholder="ID"
            v-model="credentials.username"
            @keyup.enter="login"
            style="
              background-color:rgba(0,0,0,0);
              border: none;
              border-bottom: 2px solid Blue;
              color: white;
            "
          >
        </div>
        <p></p>
        <div style="padding-left: 20px">
          <label for="password" class="white"></label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            v-model="credentials.password" @keyup.enter="login"
            style="
              background-color:rgba(0,0,0,0);
              border: none;
              border-bottom: 2px solid Blue;
              color: white;
            "
          >
        </div>
        <br>
        <div class="d-flex justify-content-evenly">
          <div></div>
          <router-link to="/accounts/signup"><button class="btn btn-light" style="width:80px">Signup</button></router-link>
          <button @click="login" class="btn btn-light" style="width:80px">Login</button>
        </div>
        <br>
        <span  style="color: rgb(250, 125, 100)">{{error}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'Login',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
      },
    }
  },
  created: function () {
    this.error = null
  },
  methods: {
    login: function () {
      axios({
        method: 'post',
        url: 'http://simplemovie-server.link/accounts/api-token-auth/',
        data: this.credentials,
      })
        .then(res => {
          localStorage.removeItem('username')
          localStorage.setItem('username', this.credentials.username)
          localStorage.setItem('jwt', res.data.token)
          this.$store.dispatch('updateMyMovie')
          this.$store.dispatch('GetRecommendations')
          this.$emit('login')
          this.$router.push('/')
          history.go()
        })
        .catch(err => {
          console.log(err)
          console.log(this.error)
          this.error='로그인 정보를 확인해주세요.'
        })
    }
  }
}
</script>