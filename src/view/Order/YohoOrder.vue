<template>
    <div class="order-view">
        <tielt-bar title="订单" :back="true"></tielt-bar>
        order
    </div>
</template>

<script>
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'

    export default {
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore,
            }
        },
        components: {
            vuePutTo,
            TieltBar
        },
        created() {

        },
        methods: {
            refresh(loaded) {
                loaded('done')
            },
            loadmore(loaded) {
                loaded('done')
            },
            toHome() {
                this.$router.replace("/personal")
            }
        },
        filters: {

        }
    }
</script>

<style>
    .order-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding-top: 50px;
    }
</style>