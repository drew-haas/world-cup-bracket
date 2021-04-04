<template>
  <div class="signin">
    <h1>Sign in to your account</h1>
    <form id="signinForm">
        <label for="email">Email</label>
        <input type="email" id="email" name="email">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button class="button" type="submit">Submit</button>
    </form>
    <div class="status-message"></div>
  </div>
</template>

<script>
import firebase from 'firebase'

// Email and Password
let email, password;

export default {
    name: 'Home',
    mounted() {
        // Form Setup
        const form = document.getElementById("signinForm");
        form.addEventListener('submit', this.handleForm);
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
    },
    methods: {
        handleForm(event) {
            event.preventDefault(); // stop form from reloading page
            email = document.getElementById("email").value;
            password = document.getElementById("password").value;
            const statusDiv = document.querySelector('.status-message');

            firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                statusDiv.classList.remove('error');
                statusDiv.classList.add('success');
                statusDiv.textContent = 'Sign in Successful!';
            }).catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;
                statusDiv.classList.add('error');
                statusDiv.classList.remove('success');
                statusDiv.textContent = errorMessage;

                // TODO: add password reset button
                // var auth = firebase.auth();
                // var emailAddress = "user@example.com";

                // auth.sendPasswordResetEmail(emailAddress).then(function() {
                //     // Email sent.
                // }).catch(function(error) {
                //     // An error happened.
                // });
            });
        }
    }
}
</script>

<style scoped lang="scss">
h1 {
  color: $red;
}
</style>
