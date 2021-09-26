<template>
  <div class="view style-guide">
      <div class="content-wrapper">
        <h1>Style Guide</h1>
        <hr>
        <div class="style-guide-section typography">
            <h2 class="section-title">Typography</h2>
            <h1>H1 Lorum Ipsum</h1>
            <h2>H2 Lorum Ipsum</h2>
            <h3>H3 Lorum Ipsum</h3>
            <h4>H4 Lorum Ipsum</h4>
            <h5>H5 Lorum Ipsum</h5>
            <p>I'm baby ethical cornhole dreamcatcher lomo swag cray. Whatever heirloom banjo, intelligentsia PBR&B man braid truffaut bushwick. Bitters vexillologist fingerstache lyft heirloom waistcoat raclette hell of XOXO. Pok pok cold-pressed waistcoat, viral yuccie organic butcher try-hard. Church-key heirloom yuccie, cloud bread kickstarter live-edge tousled put a bird on it cred. Tote bag 8-bit raclette umami truffaut celiac. Small batch unicorn intelligentsia, humblebrag everyday carry helvetica cold-pressed crucifix distillery art party viral narwhal jianbing.</p>
        </div>
        <div class="style-guide-section buttons">
            <h2 class="section-title">Buttons and Links</h2>
            <button class="button">Button</button>
            <button class="button button-submit">Submit</button>
            <button class="button button-alert">Alert</button>
            <a class="link" href="/">Basic Link</a>
        </div>

        <div class="style-guide-section forms">
            <h2 class="section-title">Forms</h2>
            <form id="signinForm">
                <label for="email">Label Lorum Ipsum</label>
                <input type="email" id="email" name="email">
                <label for="password">Password Lorum Ipsum</label>
                <input type="password" id="password" name="password">
            </form>
        </div>
      </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import GroupStage from '@/components/GroupStage.vue'
// import KnockoutStage from '@/components/KnockoutStage.vue'

export default {
  name: 'Home',
  components: {
    // GroupStage,
    // KnockoutStage
  }
}
</script>

<style scoped lang="scss">

.style-guide-section {
    margin: 50px 0;
}

.section-title {
    color: #000;
    padding: 20px 0;
}

.button {
    display: block;
    margin: 30px 0;
}
</style>
