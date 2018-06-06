<template>
  <div class="container">
    <div class="row">
      <div class="col">Banner
        <img src="" alt="responsive image" class="img-fluid"> 
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h2>The Cure For Your Shopping Needs!</h2>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="row">
          <div v-bind:key="item.title" v-for="item in needs" class="col home-needs">
            {{item.title}} 
            <div class="home-description">
              <p>{{item.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      needs:[
        {title:'Quick!', description: 'Get what you need fast!'}, 
        {title:'Quality!', description: 'Highest quality in the stare area!'}, 
        {title:'Cheap!', description: 'Prices competitive with other marketers!'}
      ]
    }
  }
}
</script>


<style>

</style>
