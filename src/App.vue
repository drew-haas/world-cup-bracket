<template>
  <Nav/>
  <!-- <Notification :notification="notification"/> -->
  <router-view/>
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