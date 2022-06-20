<template>
  <Nav/>
  <!-- <Notification :notification="notification"/> -->
  <router-view/>
  <div class="banner" aria-label="Coming Soon.">
    <div class="banner-inner">
      coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon
      coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon
      coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon
      coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon coming soon
    </div>
  </div>
  <!-- <Footer/> -->
</template>

<script>
import Nav from '@/components/Nav.vue'
import Notification from '@/components/Notification.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Notification,
    Footer
  },
  mounted() {
    // this.banner = document.querySelector('.banner');
    // this.updateBannerAngle();

    // window.addEventListener('resize', () => {
    //   this.updateBannerAngle();
    // })
  },
  methods: {
    // updateBannerAngle() {
    //   let c = Math.sqrt(Math.pow(window.innerWidth, 2) + Math.pow(window.innerHeight, 2));
    //   let angle = Math.acos(window.innerWidth / c);
    //   // this.banner.style.width = `${c}px`;
    //   this.banner.style.transform = `rotate(-${angle * 180/Math.PI}deg)`;
    // }
  },
  data() {
    return {
      notification: {
        text: 'This is a success notification!',
        status: '',
        classList: 'active'
      }
    }
  },
}
</script>

<style lang="scss" scoped>

.banner {
  position: absolute;
  display: flex;
  align-items: center;
  padding: 10px 0;
  bottom: 0;
  left: 0;
  background-color: black;
  color: white;
  text-transform: uppercase;
  transform-origin: bottom left;
  width: 300vw;
  z-index: 10;

  .banner-inner {
    text-align: left;
    white-space: nowrap;
    animation: 25s slider forwards infinite linear;
  }
}

@keyframes slider {
  0%{
    transform: translateX(-1500px);
  }
  100%{
    transform: translateX(0);
  }
}
</style>