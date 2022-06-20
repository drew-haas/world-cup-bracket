<template>
  <div class="view">
    <div class="hero-text">
      <h1>Bringing Fantasy Football to the World Cup.</h1>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupStage from '@/components/GroupStage.vue'
import KnockoutStage from '@/components/KnockoutStage.vue'
// import GroupStandings from '@/components/GroupStandings.vue'

export default {
  name: 'Home',
  components: {
    GroupStage,
    KnockoutStage
  },
  mounted() {
    window.scrollTo(0,0);
  }
}
</script>

<style scoped lang="scss">

.view {
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h1 {
	max-width: 760px;
}

.hero-text {
	max-width: 600px;
}

</style>
