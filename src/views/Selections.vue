<template>
	<div class="view selections">

		<div class="content-wrapper headline">
			<h1 class="typography-headline">Your Selections</h1>
		</div>

		<div class="content-wrapper tab-nav">
			<ul>
				<li class="typography-headline-reduced tab-nav-item tab-nav-active" data-tab-content="group-stage-container">
					<h2><a href="#group-stage">Group Stage</a></h2>
				</li>
				<li class="typography-headline-reduced tab-nav-item" data-tab-content="knockout-stage-container">
					<h2><a href="#knockout-stage">Knockout Stage</a></h2>
				</li>
			</ul>
		</div>

		<div class="tab-area content-wrapper">
			<GroupStage />
			<KnockoutStage />
		</div>
	</div>
</template>

<script>
// @ is an alias to /src
import GroupStage from "@/components/GroupStage.vue";
import KnockoutStage from "@/components/KnockoutStage.vue";

export default {
  name: "Selections",
  components: {
    GroupStage,
    KnockoutStage,
  },
  mounted() {
    window.scrollTo(0, 0);
  },
};
</script>

<style scoped lang="scss">
.view.selections {
	@include viewport(medium) {
		overflow: hidden;
	}
}

.tab-nav {
	position: sticky;
	top: 0;
	background-color: white;
	border-bottom: 1px solid var(--gray);
	margin: 50px auto 0;
	padding: 0;
	z-index: 2;

	@include viewport(small) {
		margin-top: 25px;
	}

	ul {
		display: flex;
	}

	h2 {
		padding: 30px 0;
		line-height: 0.8;

		@include viewport(medium) {
			font-size: 22px;
			line-height: 1;
			padding: 14px 0;
		}
	}

	a {
		text-decoration: none;
	}

	&-item {
		cursor: pointer;
		margin-right: 80px;

		@include viewport(medium) {
			margin-right: 40px;
		}

		@include viewport(small) {
			margin-right: 30px;
		}
	}
}

.tab-nav-active {
	h2 {
		background-position: 0px 0px;
	}
}

.tab-area {
	padding: 0;
}
</style>