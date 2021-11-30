<template>
  <div id="app" style="height: 100vh; width: 100vw;">
    <!--navbar-->
    <div class="sticky-top bg-black"></div>
    <div id="nav" class="navbar navbar-expand-lg navbar-dark fixed-top" style="background-color: rgba(0,0,0,0);" >
      <div class="container-fluid" style="background-color: rgba(0,0,0,0)">
        <router-link to="/" class="navbar-brand" style="font-weight: bold; color: #ffffff; font-style: ravie;" @click="load" >SIMPLE MOVIE</router-link>
        <div class="music-player">
          <audio
            ref="audio"
            src="@/assets/bgm.mp3"
            preload
            loop
            id="audio"
            audio.volume="0.1"
            autoplay
          ></audio>
          <div @click="toggleSound()" class="toggle-sound"><button style="outline:none; background-color:rgba(0,0,0,0); border: none;">🎧</button></div>
        </div>
        <!--<router-link to="/guide" class="navbar-brand">GUIDE</router-link>-->
        
        
        <!-- navbar 오프캔버스 버튼 -->
        <button class="navbar-toggler align-top" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="offcanvas offcanvas-end" tabindex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style="background-color:rgba(0,0,0,0)">
          <div class="offcanvas-header">
            <h5 class="offcanvas-title itr" id="offcanvasNavbarLabel" >Menu</h5>
            <button type="button" class="btn-close btn-close-white text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div class="offcanvas-body" style="background-color: rgba(0,0,0,0)">
            <ul class="navbar-nav justify-content-end flex-grow-1" style="background-color: rgba(0,0,0,0)">
              <li class="nav-item">
                <router-link to="/" class="navbar-brand"><span data-bs-dismiss="offcanvas" aria-label="Close">HOME</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/Recommendation" class="navbar-brand" v-if="isLogin"><span data-bs-dismiss="offcanvas" aria-label="Close">RECOMMEND</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/search" class="navbar-brand"><span data-bs-dismiss="offcanvas" aria-label="Close">SEARCH</span></router-link>
              </li>
              <li class="nav-item">
                <router-link to="/random" class="navbar-brand"><span data-bs-dismiss="offcanvas" aria-label="Close">Random</span></router-link>
              </li>
              <span v-if="isLogin" class="navbar-nav">
                <li class="nav-item">
                  <router-link to="/accounts/profile/" class="navbar-brand"><span data-bs-dismiss="offcanvas" aria-label="Close">Hi, {{name}}</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link @click.native="logout" to="#" class="navbar-brand" style="color:red; text-shadow: 5px 5px 10px pink;"><span data-bs-dismiss="offcanvas" aria-label="Close">logout</span></router-link>
                </li>
              </span>
              <span v-else class="navbar-nav">
                <li class="nav-item">
                  <router-link :to="{ name: 'Signup' }" class="navbar-brand"><span data-bs-dismiss="offcanvas" aria-label="Close">Signup</span></router-link>
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'Login' }" class="navbar-brand"><span data-bs-dismiss="offcanvas" aria-label="Close">Login</span></router-link>
                </li>
              </span>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- navbar end -->
    <router-view @login="isLogin=true"/>
    <div style="background-color: rgba(30,30,30,0);">PROJECT by Lee & Lee</div>
  </div>
</template>

<script>


import { mapState } from 'vuex'
export default {
  name: 'App',
  data: function () {
    return {
      isLogin: false,
      username: 'Anonymous',
    }
  },
  computed: {
    name: function() {
      return localStorage.getItem('username')
    },
    ...mapState(['usercode']),
  },
  created: function () {
    const token = localStorage.getItem('jwt')
    this.$store.dispatch('GetUserCode')
    this.$store.dispatch('LoadRecentMovies'),
    this.$store.dispatch('LoadMovies')
    if (token) {
      this.isLogin = true
    }
  },
  methods: {
    logout: function () {
      this.isLogin = false
      localStorage.removeItem('jwt')
      localStorage.setItem('username', 'Anonymous')
      this.$router.push({ name: 'Login' })
      this.$store.dispatch('delMyMovie')
      this.$store.dispatch('DelRecommendations')
      this.$store.dispatch('DelSimilar')
      this.$router.push('/')
    },
    load: function () {
      this.$store.dispatch('LoadRecentMovies'),
      this.$store.dispatch('LoadMovies')
      this.$store.dispatch('GetUserCode')
    },
    toggleSound() {
      let audio = this.$refs.audio;
      if (
        audio.paused &&
        document.querySelector(".toggle-sound").classList.contains("paused")
      ) {
        console.log("play it")
        audio.volume=0.1
        audio.play();
        
        document.querySelector(".toggle-sound").classList.remove("paused");
      } else {
        console.log("pause it")
        audio.pause();
        document.querySelector(".toggle-sound").classList.add("paused");
      }
    },
  },
}



</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-image: url(https://i.stack.imgur.com/NEuip.jpg);
  background-position: repeat;
  animation: movebg 100s linear infinite;
}

@keyframes movebg {
  0% {background-position: 0 center;}
  100% {background-position: 1920px center;}
}

#nav {
  padding: 3vh;
}

#nav a {
  font-weight: bold;
  color: #ffffff;
  font-style: ravie;
  text-shadow: 5px 5px 10px lightblue;
}

#nav a.router-link-exact-active {
  color: #0cf8ec;
}

.shdo {
  text-shadow: 2px 2px 5px lightblue;
}



.inner-x::-webkit-scrollbar {
  height: 10px;
  background-color: rgba(0,0,0,0);
}
.inner-x::-webkit-scrollbar-thumb {
  background-color: darkblue;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
.inner-x::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0);
  border-radius: 10px;
  /*box-shadow: inset 0px 0px 2px blue;*/
}

.inner-y::-webkit-scrollbar {
  width: 10px;
  background-color: rgba(0,0,0,0);
}
.inner-y::-webkit-scrollbar-thumb {
  background-color: darkblue;
  border-radius: 10px;
  background-clip: padding-box;
  border: 2px solid transparent;
}
.inner-y::-webkit-scrollbar-track {
  background-color: rgba(0,0,0,0);
  border-radius: 10px;
  /*box-shadow: inset 0px 0px 2px blue;*/
}




</style>

