<template>
  <div class="view selections">
    <div class="content-wrapper">
        <h1 class="typography-headline-reduced">Your Selections</h1>

        <div class="tab-nav">
          <ul>
            <li class="typography-headline tab-active">Group <br>Stage</li>
            <li class="typography-headline">Knockout <br>Stage</li>
          </ul>
        </div>
    </div>

    <div class="tab-area content-wrapper">
        <GroupStage/>
        <KnockoutStage/>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import GroupStage from '@/components/GroupStage.vue'
import KnockoutStage from '@/components/KnockoutStage.vue'

export default {
  name: 'Selections',
  components: {
    GroupStage,
    KnockoutStage
  }
}
</script>

<style scoped lang="scss">
.view.selections {
  padding-left: 0;
}

.tab-nav {
  background-color: white;
  margin: 50px 0;

  ul {
    display: flex;
  }

  li {
    padding: 40px 50px;
    cursor: pointer;
  }
}

.tab-active {
  background-color: black;
  color: white;
}

</style>