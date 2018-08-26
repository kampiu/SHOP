<template>
    <transition name="slide-left">
        <div class="personal-view">
            <tielt-bar title="优惠券" :back="true"></tielt-bar>
            <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
                <coupon-item v-for="(item, index) in coupons" :key="item.id" :data="item"></coupon-item>
                <!--<li v-for="(item, index) in coupons" :key="item.id">
                    <div class="coupon-nav">
                        <span class="coupon-price">{{item.price}}</span>
                        <span>{{item.condition}}</span>
                    </div>
                    <div class="coupon-context">
                        <div class="coupon-context-info"><span>{{item.brand}}</span>{{item.info}}</div>
                        <div class="coupon-context-time">{{item.time}} <span>立即使用</span></div>
                        <div class="coupon-context-msg">相信信息 <span></span></div>
                    </div>
                </li>-->
            </vue-put-to>
        </div>
    </transition>
</template>
<style>

</style>
<script>
    import TieltBar from '@/components/TitleBar'
    import CouponItem from '@/components/Common/CouponItem'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore
            }
        },
        components: {
            CouponItem,
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
                'coupons'
            ])
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