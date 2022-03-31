<template>
    <div class="view view-centered signup">
        <div class="content-wrapper">
            <div class="sign-up-text" v-if="!signedin">
                <h1>Sign Up</h1>
                <p>Sign up to save and submit your selections. <br>Already have an account? Click here to Sign In.</p>
            </div>

            <div class="signed-in-text" v-if="signedin">
                <h1>You're Signed in!</h1>
                <p>Go checkout the other pages to fill out your bracket.</p>
                <router-link to="/">
                <span class="nav-link-text">Home</span>
            </router-link>
            </div>

            <form id="signupForm" v-if="!signedin">
                <label for="email">Email</label>
                <input type="email" id="email" name="email">
                <label for="password">Password</label>
                <input type="password" id="password" name="password">
                <button class="button button-submit" type="submit">Submit</button>
            </form>

            <div class="form-information">
                <div class="status-message"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { db, auth } from '../firebase';

// Email and Password
let email, password;

export default {
    name: 'Home',
    computed: {
        signedin() {
            return this.$store.state.signedin
        },
        games() {
            return this.$store.state.games
        }
    },
    mounted() {
        window.scrollTo(0,0);

        // Form Setup
        const form = document.getElementById("signupForm");
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

            // [START auth_signup_password]
            auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
                // Signed in (and signed up)
                // Write New User to Database
                this.writeNewUser(userCredential.user.uid, email);

                // Show success message
                this.updateStatusDiv('Sign up Successful! You are now signed in.', 'success');

                // Hide form and show additional links!

                // remove any local storage
                localStorage.removeItem('userGroupData');
                localStorage.removeItem('userKnockoutData');

                console.log('Sign Up Success!');
            })
            .catch((error) => {
                console.log('error in signup: ', error)
                var errorMessage = error.message;

                // show sign in message
                if (error.code == 'auth/email-already-in-use') {
                    errorMessage = errorMessage + ' Go to Sign In Page.';
                }

                this.updateStatusDiv(errorMessage, 'error');
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

        writeNewUser(uid, email) {
            let gameData = this.games;

            // new user data
            var userData = {
                uid,
                email,
                gameData,
                points: 0
            };

            // "set" new user to db
            db.ref('users/' + uid).set(userData);
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
    position: absolute;
}
</style>