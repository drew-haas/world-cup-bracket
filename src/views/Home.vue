<template>
  <div class="home">
    <!-- <img class="logo" alt="Fifa World Cup Qatar 2022 Logo" src="../assets/wc-logo.png"> -->
    <h1>Make Your Selections</h1>
    <GroupStage/>
    <KnockoutStage/>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupStage from '@/components/GroupStage.vue'
import KnockoutStage from '@/components/KnockoutStage.vue'

export default {
  name: 'Home',
  components: {
    GroupStage,
    KnockoutStage
  }
}
</script>

<style scoped lang="scss">
.logo {
  max-width: 200px;
}

h1 {
  color: $red;
}
</style>
