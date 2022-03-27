<template>
    <div :class="'notification ' + notification.classList">
        <div class="notification-text">
            <div class="notification-text">{{notification.text}}</div>
            <div class="notification-status">{{notification.status}}</div>
        </div>

        <div class="notification-actions">
            <div class="action action-delete" @click="removeNotification">
                <span class="fi fi-rr-cross-small"></span>
            </div>
        </div>
    </div>
</template>

<script>
const timeoutLength = 10000; // 10 seconds

export default {
    name: "Notification",
    props: {
        notification: Object,
    },
    mounted() {
        // this.notificationTimeout();
    },
    methods: {
        notificationTimeout() {
            setTimeout(() => {
                this.removeNotification();
            }, timeoutLength)
        },
        removeNotification() {
            this.notification.classList = '';
            console.log('removed');
        }
    }
}
</script>

<style lang="scss" scoped>
.notification {
    --height: 60px;
    min-height: var(--height);
    width: calc(100% - 220px);
    padding: 10px 27px;
    bottom: 0;
    right: 0;
    border: 1px solid green;
    background-color: rgba(110,230,0,0.6);
    backdrop-filter: blur(5px);
    position: fixed;
    text-align: left;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transform: translateY(calc(var(--height) + 4px));
    transform-origin: top left;
    transition: transform .4s;
    z-index: 5;

    &.active {
        transform: translateY(0);
        transition: transform .4s;
    }

    &-text {
        font-weight: bold;
    }

    .action {
        cursor: pointer;
    }

    .fi {
        display: flex;
        font-size: 30px;
        line-height: 1;
    }
}
</style>