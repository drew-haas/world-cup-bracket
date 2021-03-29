<template>
    <footer class="footer">
        <!-- <h2>Footer</h2> -->
        <img class="dru-logo" alt="Fifa World Cup Qatar 2022 Logo" src="../assets/dru-logo.svg">
        <!-- <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/about">About</router-link></li>
        </ul> -->
    </footer>
</template>

<script>
export default {
  name: 'TeamRow',
  props: {
    team: Object,
    group: String
  }
}
</script>

<style scoped lang="scss">
.footer {
  margin-top: 50px;
  background-color: $bg-light;
  text-align: left;
  padding: 50px;
}
.dru-logo {
  max-width: 60px;
}
</style>
