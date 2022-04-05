<template>
	<div class="view groups">

		<div v-if="!signedin" class="signed-out-groups content-wrapper">
			<h1>Sign in to see your Groups.</h1>
			<p><router-link to="/signin">Sign In</router-link></p>
		</div>

		<div v-if="signedin" class="signed-in-groups content-wrapper">

			<h1>Groups and Standings</h1>
			<p v-if="!userGroups">You're currently not in a group.</p>
			<p  v-if="!userGroups">Create or Join a group to compete with friends.</p>

			<div v-if="userGroups" class="groups">
				<div v-for="group in userGroups" :key="group" class="group">
					<h3 class="group-name bold">{{group.groupName}}</h3>
					<p class="group-creator">Group Creator: {{group.groupCreatorEmail}}</p>

					<div class="group-table">
						<div class="group-table-header group-table-row">
							<div class="group-table-cell member-rank">Rank</div>
							<div class="group-table-cell member-name">Name</div>
							<div class="group-table-cell member-points">Points</div>
							<div class="group-table-cell member-points-pos">Max</div>
							<div class="group-table-cell member-winner">Winner</div>
						</div>

						<div class="group-member-row group-table-row" v-for="(member, index) in group.members" :key="index">
							<div class="group-table-cell member-rank">{{index + 1}}</div>

							<div class="group-table-cell member-name">{{member.email}}</div>

							<div v-if="member.points" class="group-table-cell member-points">{{member.points}}</div>
							<div v-if="!member.points" class="group-table-cell member-points">N/A</div>

							<div v-if="member.pointsPos" class="group-table-cell member-points-pos">{{member.pointsPos}}</div>
							<div v-if="!member.pointsPos" class="group-table-cell member-points-pos">N/A</div>

							<div v-if="member.winner" class="group-table-cell member-winner">
								<img :src="require('@/assets/flags/' + member.winner + '-32.png')" >
							</div>
							<div v-if="!member.winner" class="group-table-cell member-winner">N/A</div>
						</div>
					</div>
				</div>
			</div>

			<div v-if="allGroups" class="groups groups-list">
				<h2>All Groups:</h2>
				<div v-for="group in allGroups" :key="group.groupUID" class="group-item">{{group.groupName}}</div>
			</div>
		</div>

		<div class="group-options default-grid content-wrapper">
			<div class="tile large-span-6 small-span-12">
				<h2 class="bold">Create a Group</h2>

				<form id="createGroup" autocomplete="off">
					<label for="createGroupName">Group Name</label>
					<input type="text" id="createGroupName" name="createGroupName">

					<label for="createGroupPassword">Group Password</label>
					<input type="password" id="createGroupPassword" class="password-field" name="createGroupPassword" autocomplete="new-password">

					<div class="pw-toggle">
						<input id="pwVisbilityCreate" name="pwVisbilityCreate" type="checkbox" @change="togglePassword($event)">
						<label for="pwVisbilityCreate">Show Password</label>
					</div>

					<button class="button button-submit">Create and Join Group</button>

					<div class="form-information">
						<div class="status-message"></div>
					</div>
				</form>
			</div>

			<div class="tile large-span-6 small-span-12">
				<h2 class="bold">Join a Group</h2>

				<form id="joinGroup">
					<label for="joinGroupName">Group Name</label>
					<input type="text" id="joinGroupName" name="joinGroupName">

					<label for="joinGroupPassword">Group Password</label>
					<input type="password" id="joinGroupPassword" class="password-field" name="joinGroupPassword" autocomplete="new-password">

					<div class="pw-toggle">
						<input id="pwVisbilityJoin" name="pwVisbilityJoin" type="checkbox" @change="togglePassword($event)">
						<label for="pwVisbilityJoin">Show Password</label>
					</div>

					<button class="button">Join Group</button>

					<div class="form-information">
						<div class="status-message"></div>
					</div>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import { db, auth } from '../firebase'

export default {
	name: 'Groups',

	data() {
		return {
			allGroups: null,
			userGroups: null,
			tournamentWinner: 'N/A'
		}
	},

	computed: {
		signedin() {
			return this.$store.state.signedin
		},
		user() {
			return this.$store.state.user
		},
		pointsPos() {
			return this.$store.state.pointsPossible
		}
	},

	mounted() {
		window.scrollTo(0,0);

		// Form Setup
		const joinForm = document.getElementById("joinGroup");
		const createForm = document.getElementById("createGroup");

		if (joinForm && createForm) {
			joinForm.addEventListener('submit', this.handleJoinForm);
			createForm.addEventListener('submit', this.handleCreateForm);
		}
	},

	// Fill out page
	created() {
		// Check for Users Groups
		const dbGroups = db.ref('groups');
		const dbUsers = db.ref('users');

		// Grab All Groups
		dbGroups.on('value', (snapshot) => {
			this.allGroups = snapshot.val();

			if (!this.allGroups) {
				console.warn('All Groups not available!')
			}

		}, (error) => {
			console.log('all groups read failed: ' + error);
		});

		// Update User Groups
		dbUsers.on('value', (snapshot) => {
			// All users
			let users = snapshot.val();
			this.tournamentWinner = this.getWinner();

			// check if user has groups yet
			if (users[this.user.uid].groups) {

				// grab groupUID's for current user
				let usersGroups = users[this.user.uid].groups;
				let userGroupsArr = Object.keys(usersGroups);

				// fill with all group data for current user
				let userGroupFull = [];
				userGroupsArr.forEach((groupId, i) => {
					userGroupFull.push(this.allGroups[groupId]);
					userGroupFull[i].members = Object.values(this.allGroups[groupId].members); // make members just the objects for easier handling
				});

				this.userGroups = userGroupFull; // make available in template

			} else {
				// User does not have a groups object yet
				console.warn('User does not have a groups object!');
				return;
			}

		}, (error) => {
			console.log('user groups read failed: ' + error);
		});
	},

	methods: {
		async handleCreateForm(event) {
			event.preventDefault();

			// Form Settings
			const form = event.srcElement;
			let groupName = document.querySelector('#createGroupName').value;
			let groupUID = groupName.replace(/\s/g, '').toLowerCase().trim(); // make group name all lowercase and remove spaces
			let groupPassword = document.querySelector('#createGroupPassword').value;
			let groupCreatorUID = this.user.uid;
			let groupCreatorEmail = this.user.email;
			let statusMessage = form.querySelector('.status-message');
			this.tournamentWinner = await this.getWinner();

			// Form validation
			// ----------------------------------------
			// TODO:
			// - group name doesn't already exist!
			// - max 50 characters?
			// - password min 8 characters
			// if not show correct error
			// ----------------------------------------
			if (groupUID == '' || groupPassword == '') {
				// Empty Fields
				console.warn('Group Name or Password Empty!');
				this.updateStatusDiv(statusMessage, 'Group Name or Password Empty!', 'error');
				return;
			} else if (!this.isAlphanumeric(groupUID)) {
				// Contains special characters
				console.warn('Group Name can not contain special characters.')
				this.updateStatusDiv(statusMessage, 'Group Name can not contain special characters.', 'error');
				return;
			}

			// Write New Group to Database
			let groupData = {
				groupUID,         // Group UID - unique, toLowerCase
				groupName,        // Group (Display) Name
				groupPassword,    // Group Password - string
				groupCreatorUID,  // Group Creator UID
				groupCreatorEmail // Group Creator Email
			}

			let userGroupData = {
				groupUID
			}

			// Add new group to database
			db.ref('groups/' + groupUID).set(groupData);
			// Add new member to group
			db.ref('groups/' + groupUID + '/members/' + this.user.uid).set({
				uid: this.user.uid,
				email: this.user.email,
				points: 0,
				pointsPos: this.pointsPos,
				winner: this.tournamentWinner.code
			});

			// Add group to user
			db.ref('users/' + groupCreatorUID + '/groups/' + groupUID).set(userGroupData);

			// clear form
			form.reset();

			// show success notification
			this.updateStatusDiv(statusMessage, 'You have successfully created a group named ' + groupName  + '!', 'success'); // TODO: create something bigger for success?
		},

		// look at database for saved winner
		async getWinner() {
			let winner;

			await db.ref('users/' + this.user.uid + '/gameData/14').once('value').then((snapshot) => {
				const data = snapshot.val();
				winner = data.teams.find(team => team.isWinner == true);
				winner = {
					code: winner.code,
					name: winner.name
				}
			});

			return winner;
		},

		async handleJoinForm(event) {
			event.preventDefault();

			const form = event.srcElement;
			let groupName = document.querySelector('#joinGroupName').value;
			let groupUID = groupName.replace(/\s/g, '').toLowerCase(); // make group name all lowercase and remove spaces
			let groupPassword = document.querySelector('#joinGroupPassword').value;
			let statusMessage = form.querySelector('.status-message');
			this.tournamentWinner = await this.getWinner();

			// Form validation
			if (groupUID == '' || groupPassword == '') {
				// Empty Fields
				console.warn('Group Name or Password Empty!');
				this.updateStatusDiv(statusMessage, 'Group Name or Password Empty!', 'error');
				return;
			} else if (!this.isAlphanumeric(groupUID)) {
				// Contains special characters
				console.warn('Group Name can not contain special characters.')
				this.updateStatusDiv(statusMessage, 'Group Name can not contain special characters.', 'error');
				return;
			}

			// Get Group Ref
			let group = db.ref('groups/' + groupUID);

			group.on('value', (snapshot) => {
				let groupData = snapshot.val();

				// Check if groupData exists
				if (groupData) {
					let membersArr = Object.values(groupData.members);

					// Check if user already in group
					if (membersArr.some(member => member.uid === this.user.uid)) {
						console.warn('You are already in this group!');
						this.updateStatusDiv(statusMessage, 'You are already in this group!', 'error');
						return;
					}

					if (groupData.groupUID === groupUID && groupData.groupPassword === groupPassword) {
						// Access Granted - Joining Group!
						// Add new member to group
						db.ref('groups/' + groupUID + '/members/' + this.user.uid).set({
							uid: this.user.uid,
							email: this.user.email,
							points: 0,
							pointsPos: this.pointsPos,
							winner: this.tournamentWinner.code
						});

						// Add group to user
						db.ref('users/' + this.user.uid + '/groups/' + groupUID).set({groupUID});

						// Clear Form
						form.reset();

						// Show success notification

					} else {
						// Password or GroupUID does not match!
						console.warn('Password or Group Name does not match!');
						this.updateStatusDiv(statusMessage, 'Password or Group Name does not match!', 'error');
						return;
					}

				} else {
					// Group Does Not Exist
					console.warn('You are trying to join a group that does not exist.');
					this.updateStatusDiv(statusMessage, 'You are trying to join a group that does not exist.', 'error');
					return;
				}

			}, (error) => {
				console.log('Getting group failed: ' + error);
			});
		},

		updateStatusDiv(statusDiv, message, className) {
            statusDiv.classList.remove('success', 'error');
            statusDiv.classList.add(className);
            statusDiv.textContent = message;
        },

        clearStatusDiv() {
            statusDiv.classList.remove('success', 'error');
            statusDiv.textContent = '';
        },

		isAlphanumeric(str) {
			let regex = new RegExp('^[a-z0-9]+$');
			return regex.test(str);
		},

		togglePassword(event) {
			let pwField = event.target.closest('form').querySelector('.password-field');

			if (pwField.type === 'password') {
				pwField.type = "text";
			} else {
				pwField.type = "password";
			}
		}
	}
}
</script>

<style lang="scss" scoped>
h1 {
	margin-bottom: 100px;

	@include viewport(medium) {
		max-width: 350px;
	}
}

.group-options {
	h2 {
		margin-bottom: 20px;
	}

	input {
		background-color: white;
	}
}

.group {
	padding: 10px;
	margin: 10px 0 50px;
}

.group-name {
	font-size: 23px;
}

.group-creator {
	font-size: 14px;
}

.group-table {
	background-color: var(--gray-bg);
	width: 100%;
	max-width: 900px;
	border: 1px solid #ddd;

	&-cell {
		display: flex;
		justify-content: flex-start;
		align-items: center;
	}
}

.group-table-header {
	border-bottom: 1px solid #ddd;
}

.group-table-row {
	display: grid;
	grid-template-columns: 66px 1fr 68px 44px 66px;
	justify-content: space-evenly;
	padding: 14px;
}

.member-winner {
	justify-content: flex-end;
}

.pw-toggle {
	display: flex;
	justify-content: left;
	align-items: center;
	margin-top: -10px;
	margin-bottom: 20px;

	input {
		width: auto;
		margin: 0;
		cursor: pointer;
	}

	label {
		margin: 0;
		padding-left: 11px;
		cursor: pointer;
	}
}

.groups-list {
	h2 {
		margin-bottom: 15px;
	}

	.group-item {
		padding: 6px 0;
	}
}
</style>