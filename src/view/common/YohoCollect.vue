<template>
    <transition name="slide-left">
        <div class="collect-view">
            <tielt-bar title="收藏" :back="true"></tielt-bar>
            <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
                <collect-item v-for="(item, index) in collect" :key="'collect' + item.pro_code_bar" :data="item"></collect-item>
            </vue-put-to>
        </div>
    </transition>
</template>

<script>
    import CollectItem from "@/components/CollectItem"
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
            CollectItem,
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
    .collect-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding-top: 50px;
    }
</style>