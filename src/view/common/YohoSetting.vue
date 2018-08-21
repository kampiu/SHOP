<template>
    <div class="setting-view">
        <tielt-bar title="设置" :back="true"></tielt-bar>
        <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
            
        </vue-put-to>
    </div>
</template>

<script>
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import {
        mapGetters
    } from 'vuex'
    
    export default {
        name: "CollectView",
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore
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
        computed: {
            ...mapGetters([
                'collect'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .setting-view{
        width:100vw;
        height:100vh;
        overflow: hidden;
        padding-top:50px;
    }
</style>