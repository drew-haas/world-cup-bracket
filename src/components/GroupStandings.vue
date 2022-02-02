<template>
    <!-- Always Pulling the current group Standings from the API -->
    <div class="current-standings">
        <div class="title">Current Standings</div>

        <div class="groups">
            <div class="group">
                <TeamRow/>
            </div>
        </div>
    </div>
</template>

<script>
import TeamRow from '@/components/TeamRow.vue';

export default {
    name: CurrentStandings,
    components: {
        TeamRow
    }
}
</script>