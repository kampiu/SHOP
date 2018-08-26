<template>
    <transition name="slide-left">
        <div class="order-view">
            <tielt-bar title="订单" :back="true"></tielt-bar>
            <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop" style="background-color:#F0F0F0">
                <order-item v-for="(item, index) in orderList" :key="item.orderCode" :data="item"></order-item>
            </vue-put-to>
        </div>
    </transition>
</template>

<script>
    import { Lazyload, Indicator, Toast } from 'mint-ui'
    import OrderItem from "@/components/OrderItem"
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "OrderList",
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore,
            }
        },
        components: {
            OrderItem,
            vuePutTo,
            TieltBar
        },
        created() {
            this.initOrder()
        },
        methods: {
            initOrder() {
                Indicator.open('加载中...')
                this.$ajax.post(API.getOrderList()).then(res => {
                    console.log("order", res)
                    if(res.code === 200) {
                        this.$store.commit("order/initOrderList", res.result)
                    }
                    Indicator.close()
                }).catch(err => {
                    console.log("order", err)
                })
            },
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
                'orderList'
            ])
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