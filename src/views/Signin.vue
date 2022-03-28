<template>
  <div class="view view-centered signin">
    <div class="signin-container content-wrapper" v-if="!signedin">
        <h1>Sign In</h1>
        <p>Don't have an account? Click here to Sign Up.</p>
        <form id="signinForm">
            <label for="email">Email</label>
            <input type="email" id="email" name="email">
            <label for="password">Password</label>
            <input type="password" id="password" name="password">
            <button class="button button-submit" type="submit">Submit</button>
        </form>
        <div class="form-information">
            <div class="status-message"></div>
            <div class="forgot-password-reset" @click="sendResetEmail">Forgot Password? Click here to get an email reset.</div>
        </div>
    </div>
    <div class="redirect-container" v-if="signedin">
        <h2>You're signed in! Get outta here!</h2>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase';
// import { auth } from '../firebase';

// Email and Password
let email, password;

export default {
    name: 'Home',
    computed: {
        signedin() {
            return this.$store.state.signedin
        }
    },
    mounted() {
        // Form Setup
        const form = document.getElementById("signinForm");
        form.addEventListener('submit', this.handleForm);
        email = document.getElementById("email").value;
        password = document.getElementById("password").value;
        this.statusDiv = document.querySelector('.status-message');
    },
    methods: {
        handleForm(event) {
            event.preventDefault(); // stop form from reloading page
            email = document.getElementById("email").value;
            password = document.getElementById("password").value;

            firebase.auth().signInWithEmailAndPassword(email, password).then((userCredential) => {
                // SIGNED IN SUCCESS
                // update status
                this.updateStatusDiv('Sign in Successful!', 'success');

                // update store
                this.$store.commit('updateSignin', true);

                // TODO: make animation THEN redirect
                // redirect to home page
                this.$router.push('/');

            }).catch((error) => {
                console.log(error);

                // show status
                this.updateStatusDiv(error.message, 'error');

                // add forgot password reset button
                if (error.code == 'auth/wrong-password') {
                    this.showResetEmail();
                }
            });
        },

        updateStatusDiv(message, className) {
            this.statusDiv.classList.remove('success', 'error');
            this.statusDiv.classList.add(className);
            this.statusDiv.textContent = message;
        },

        clearStatusDiv() {
            this.statusDiv.classList.remove('success', 'error');
            this.statusDiv.textContent = '';
        },

        // add forgot password reset button
        showResetEmail() {
            const resetDiv = document.querySelector('.forgot-password-reset');
            resetDiv.classList.add('active');
        },

        hideResetEmail() {
            const resetDiv = document.querySelector('.forgot-password-reset');
            resetDiv.classList.remove('active');
        },

        sendResetEmail() {
            console.log('send reset email');
            // var auth = firebase.auth();
            // var emailAddress = "user@example.com";

            // auth.sendPasswordResetEmail(emailAddress).then(function() {
            //     // Email sent.
            // }).catch(function(error) {
            //     // An error happened.
            // });
        }
    }
}
</script>

<style scoped lang="scss">
p {
    max-width: 700px;
    margin: 20px 0 44px;
}

.content-wrapper {
    position: relative;
}

.form-information {
    margin-top: 20px;
    position: absolute;
}

.forgot-password-reset {
    display: none;
    cursor: pointer;

    &:hover {
        color: black;
        text-decoration: underline;
    }

    &.active {
        display: inline-block;
    }
}
</style>
