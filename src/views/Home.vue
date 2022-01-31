<template>
  <div class="view home">
    <div v-if="!signedin" class="signed-out-home content-wrapper">
      <div class="hero-text">
        <h1>Bringing Fantasy Football to the World Cup.</h1>
        <p>Welcome to World Brackets! This was created to capture the same excitement that March Madness brings but for the World Cup. Here you will be able to select your teams from the group stage and then fill out your knockout stage bracket. <router-link to="/signup">Sign up</router-link> or <router-link to="/signin">Sign in</router-link> to create your World Cup Bracket.</p>
      </div>
    </div>

    <div v-if="signedin" class="signed-in-home content-wrapper">
      <div class="hero-text">
        <!-- <h1>Welcome<span v-if="user.displayName"> {{user.displayName}}</span><span v-if="!user.displayName"> to your World Brackets Dashboard.</span></h1> -->
        <h1>Dashboard</h1>
        <p>Thank you for joining! This will be your hub for the World Cup and your World Cup Bracket. Check out your current <router-link class="link" to="/selections">selections</router-link>.</p>
      </div>
    </div>

    <div class="content-wrapper">
      <div class="dashboard-grid">
        <div class="grid-item selections large-span-8">
          <h3 class="grid-item-title">You have made <span>0</span>/48 selections.</h3>
          <p>Go To your <router-link class="link" to="/selections">selections</router-link></p>
          <div class="grid-item-inner">
            <div class="groups">
              <h3>Your Groups</h3>
            </div>
            <div class="winner">
              <h3>Your Winner</h3>
            </div>
          </div>
        </div>

        <div class="grid-item countdown large-span-4">
          <p>The World Cup starts in ### days.</p>
        </div>

        <div class="grid-item matches large-span-4">
          <h3>Upcoming Matches</h3>
          <div class="matches"></div>
          <router-link to="/selections">view all</router-link>
        </div>

        <div class="grid-item links large-span-4">
          <h3 class="typography-headline-reduced">Useful Links</h3>
          <ul>
            <li><a class="link" href="https://www.fifa.com/tournaments/mens/worldcup/qatar2022" target="_blank">FIFA World Cup Website</a></li>
            <li><a class="link" href="https://www.espn.com/soccer/" target="_blank">ESPN Soccer</a></li>
            <li><a class="link" href="https://www.instagram.com/433/" target="_blank">433 Instagram</a></li>
            <li><a class="link" href="https://www.instagram.com/pubitysport/" target="_blank">Pubity Sport Instagram</a></li>
          </ul>
        </div>

        <div class="grid-item account large-span-4">
          <p v-if="user.email">You are signed in as: {{user.email}}</p>
          <p>go to your Account</p>
        </div>
      </div>
    </div>

    <div class="api-test-data">
      {{standingsData}}
    </div>
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
  },
  data() {
    return {
      standingsData: 'null',
      groups: null,
      teams: null
    }
  },
  methods: {
    // getDate() {
    //   var now = new Date().getTime();
    //   var timeleft = countDownDate - now;

    //   var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
    //   var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    //   var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    //   var seconds = Math.floor((timeleft % (1000 * 60)) / 1000);
    // }
    getData() {
      console.log('in getData')

      fetch('api/standings')
      .then(res => res.json())
      .then(res => {
        console.log(res);
        this.standingsData = res;
      });
    }
  },
  mounted() {
    this.getData();
  },
  computed: {
    signedin() {
      return this.$store.state.signedin
    },
    user() {
      return this.$store.state.user
    }
  }
}
</script>

<style scoped lang="scss">
.logo {
  max-width: 200px;
}

.home {
  padding-top: 150px;
}

h1 {
  max-width: 760px;
}

.hero-text {
  max-width: 600px;
}

.dashboard-grid {
  $columns: 12;
  display: grid;
  grid-template-columns: repeat($columns, 1fr);
  grid-gap: 25px;
  margin-top: 100px;

  @for $i from 1 through $columns {
    .large-span-#{$i} {
      grid-column: span #{$i};
    }

    @include viewport(medium) {
      .medium-span-#{$i} {
        grid-column: span #{$i};
      }
    }

    @include viewport(small) {
      .small-span-#{$i} {
        grid-column: span #{$i};
      }
    }
  }
}

.grid-item {
  background-color: $bg-light;
  border-radius: 18px;
  padding: 20px;
  min-height: 300px;
}
</style>
