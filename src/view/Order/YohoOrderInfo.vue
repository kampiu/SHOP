<template>
    <div class="personal-view">
        <tielt-bar title="订单详情" :back="true"></tielt-bar>
        <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
            
        </vue-put-to>
    </div>
</template>
<style>

</style>
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
                window.history.go(-1)
            }
        },
        filters: {

        }
    }
</script>

<style>
    .personal-view .order-view-scroll {
        height: 100vh !important;
        padding: 0 2vw;
        background: #F8F8F8;
    }
    
</style>