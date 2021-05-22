<template>
  <div class="account">
    <h1>Account Page</h1>
    <div class="user-information">
      {{user}}
    </div>
  </div>
</template>

<script>
export default {
    name: 'Account',
    mounted() {
    },
    methods: {
    },
    computed: {
        user() {
            return this.$store.state.user
        }
    },
}
</script>

<style scoped lang="scss">
h1 {
  color: $red;
}
</style>
