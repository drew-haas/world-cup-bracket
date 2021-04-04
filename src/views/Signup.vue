<template>
  <div class="signup">
    <h1>Create an Account</h1>
    <form id="signupForm">
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
        const form = document.getElementById("signupForm");
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

            // [START auth_signup_password]
            firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
                // Signed in
                // var user = userCredential.user;
                statusDiv.classList.remove('error');
                statusDiv.classList.add('success');
                statusDiv.textContent = 'Sign up Successful! Signed in.';
            })
            .catch((error) => {
                // var errorCode = error.code;
                var errorMessage = error.message;
                statusDiv.classList.add('error');
                statusDiv.classList.remove('success');
                statusDiv.textContent = errorMessage;
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
