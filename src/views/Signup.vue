<template>
  <div class="signup">
    <h1>Create an Account</h1>
    <form id="signupForm">
        <label for="fname">Email</label><br>
        <input type="email" id="email" name="email"><br>
        <label for="password">Password</label><br>
        <input type="password" id="password" name="password"><br>
        <button class="button" @onclick="submitForm">Submit</button>
    </form>
  </div>
</template>

<script>
// @ is an alias to /src
// import GroupStage from '@/components/GroupStage.vue'
// import KnockoutStage from '@/components/KnockoutStage.vue'
import firebase from 'firebase'

// Email and Password
let email, password;

export default {
    name: 'Home',
    components: {
    // GroupStage,
    // KnockoutStage
    },
    mounted() {
        // Form Setup
        const form = document.getElementById("signupForm");
        form.addEventListener('submit', this.handleForm);
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
    },
    methods: {
        handleForm(event) {
            event.preventDefault();
            email = document.getElementById("email").value;
            password = document.getElementById("password").value;

            // [START auth_signup_password]
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage)
                // ..
            });
            // [END auth_signup_password]
        },
        signUpWithEmailPassword() {
            var email = "test@example.com";
            var password = "hunter2";
            // [START auth_signup_password]
            firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in
                var user = userCredential.user;
                // ...
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                // ..
            });
            // [END auth_signup_password]
        }
    }
}
</script>

<style scoped lang="scss">
h1 {
  color: $red;
}
</style>
