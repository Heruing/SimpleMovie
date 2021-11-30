<template>
  <div class="block inner-y" style=" overflow-y:scroll">
    <div class="container">
      <h1 style="color: red; font-weight:bold;">BLOCK code</h1>
      <div>
        <input type="text" id="blockcode" placeholder="enter the code"  v-model="blockcode" @keyup.enter="updateBlock" style="border:none; background-color:black; border-bottom: 2px dashed red; color:white; text-align: right; width: 120px;">
        <button @click="updateBlock" class="btn btn-outline-danger m-2" style="height:35px">update</button>
      </div>
      <br>
    </div>
    <div style="color: white;">현재 차단 목록</div>
    <div
      style="color: white;"
      v-for="code in blockcodes" 
      :key="code"
    >
      {{code}}   
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name:"Block",
  data: function () {
    return {
      blockcode: null
    }
  },
  methods:{
    updateBlock: function() {
      this.$store.dispatch('updateBlock', this.blockcode)
      //this.blockcode = null
    }
  },
  computed: {
    ...mapState(['blockcodes'])
  },
}
</script>

<style>

</style>