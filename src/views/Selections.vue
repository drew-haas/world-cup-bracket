<template>
  <div class="view selections">
    <div class="content-wrapper">
        <h1 class="typography-headline">Your Selections</h1>

        <div class="tab-nav">
          <ul>
            <li class="typography-headline-reduced tab-nav-item tab-nav-active" v-on:click="toggleStage('groups', $event)" data-tab-content="group-stage-container">
              <h2>Group Stage</h2>
            </li>
            <li class="typography-headline-reduced tab-nav-item" v-on:click="toggleStage('knockout', $event)" data-tab-content="knockout-stage-container">
              <h2>Knockout Stage</h2>
            </li>
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
  },
  methods: {
    toggleStage: (toggleVal, event) => {
      // handle tab nav
      let tabs = document.querySelectorAll('.tab-nav-item');
      tabs.forEach(tab => {
        tab.classList.remove('tab-nav-active');
      });

      event.srcElement.parentElement.classList.add('tab-nav-active');

      // handle tab items
      let tabContents = document.querySelectorAll('.tab-nav-content');
      tabContents.forEach(el => {
        el.classList.remove('tab-nav-content-active');
      })

      let tabContent = document.querySelector('.' + event.srcElement.parentElement.dataset.tabContent);
      tabContent.classList.add('tab-nav-content-active');

      // handle router
      this.$route.push({ path: 'selections', query: { tab: toggleVal } })
    }
  }
}
</script>

<style scoped lang="scss">
.view.selections {
  padding-left: 0;
}

.tab-nav {
  position: sticky;
  top: 0;
  background-color: white;
  margin: 50px 0;

  ul {
    display: flex;
  }

  li {
    cursor: pointer;
    margin-right: 80px;
  }

  h2 {
    @include text-mask-hover();
    padding-bottom: 32px;
    line-height: .8;
  }
}

.tab-nav-active {
  h2 {
    background-position: 0px 0px;
  }
}

.tab-nav-content {
  display: none;

  &.tab-nav-content-active {
    display: block;
  }
}



</style>