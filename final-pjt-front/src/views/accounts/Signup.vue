<template>
  <div>
    <br><br><br><br><br><br>
    <div class="d-flex justify-content-center" style="height: 82vh">
      <div class="box" style="width:250px;">
        <h1 class="white">Signup</h1>
        <div style="padding-left: 20px">
          <input type="text" id="username" placeholder="ID" v-model="credentials.username" @keyup.enter="login" style="color:white; background-color:rgba(0,0,0,0); border: none; border-bottom: 2px solid red;" maxlength="20">
        </div>
        <p></p>
        <div style="padding-left: 20px">
          <input type="password" id="password" placeholder="Password" v-model="credentials.password" @keyup.enter="login" style="color:white; background-color:rgba(0,0,0,0); border: none; border-bottom: 2px solid red;" minlength="8" maxlength="20">
        </div>
        <p></p>
        <div style="padding-left: 20px">
          <input type="password" id="passwordConfirm" placeholder="Password Confirm" v-model="credentials.passwordConfirm" @keyup.enter="signup" style="color:white; background-color:rgba(0,0,0,0); border: none; border-bottom: 2px solid red;" minlength="8" maxlength="20">
        </div>
        <p></p>
        <div class="d-grid gap-2 col-6 mx-auto">
          <button @click="signup" class="btn btn-light">Singup</button>
        </div>
        <br>
        <span style="color: rgb(250, 125, 100)">{{isError()}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Singup',
  data: function () {
    return {
      credentials: {
        username: null,
        password: null,
        passwordConfirm: null,
        errMessage: null,
      },
    }
  },
  computed: {
    IDVal: function () {
      if (this.credentials.username) {
        var nameVal = /^[A-Za-z0-9]\w{1,20}$/;
        if (this.credentials.username.match(nameVal)) {
          return true
        }
      }
      return false
    },
    PWVal: function () {
      if (this.credentials.password) {
        var pwVal = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if (this.credentials.password.match(pwVal)) {
          return true
        }
      }
      return false
    },
    PWCVal: function () {
      if (this.credentials.passwordConfirm) {
        var pwcVal = /^(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-zA-Z])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
        if (this.credentials.passwordConfirm.match(pwcVal)) {
          return true
        }
      }
      return false
    },
    PWequal: function () {
      return (this.credentials.password == this.credentials.passwordConfirm)
    },
  },
  methods: {
    isError: function () {
      if (this.IDVal) {
        if (this.PWVal) {
          if (this.PWCVal) {
            if (this.PWequal){
              return 'All Validated'
            } else {
              return 'Password not equal'
            }
          } else {
            return 'PWC must 8-20 length and include each a-z, A-Z, 0-9'
          }
        } else {
          return 'PW must 8-20 length and include each a-z, A-Z, 0-9'
        }
      } else {
        return 'ID can use a-z, A-Z, 0-9'
      }
    },
    signup: function () {
      if (this.isError()=='All Validated') {
        axios({
          method: 'post',
          url: 'http://simplemovie-server.link/accounts/signup/',
          data: this.credentials
        })
          .then(() => {
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
                this.$router.go()
              })
              .catch(err => {
                console.log(err)
                this.errMessage = 'Check Again'
              })
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        alert('Incorrect Request')
        return
      }
    }
  },
}
</script>