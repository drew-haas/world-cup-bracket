<template>
  <div class="view selections">
    <div class="content-wrapper">
        <h1>Your Selections</h1>
    </div>

    <!-- <div class="tab-nav">
        <ul>
            <li>Group Stage</li>
            <li>Knockout Stage</li>
        </ul>
    </div> -->

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