<template>
    <div class="personal-view">
        <tielt-bar title="个人"></tielt-bar>
        <vue-put-to class="home-scroll-view" :top-load-method="refresh" :top-config="reduction">
            <div class="personal-item-header">
                <div class="personal-icon" @click="toSetIcon" :style="{backgroundImage: 'url(' + picurl + ')'}"></div>
                <div class="personal-context">
                    <div class="personal-name">{{nickname}}</div>
                    <div class="personal-acount">{{acount}}</div>
                </div>
            </div>
            <div class="personal-menu">我的订单
                <router-link to="/order">全部订单</router-link>
            </div>
            <div class="personal-order">
                <div class="personal-nav pendding-pay">待付款</div>
                <div class="personal-nav pendding-send">待发货</div>
                <div class="personal-nav pendding-copy">待收货</div>
                <div class="personal-nav pendding-comment">待评价</div>
                <div class="personal-nav pendding-appeal">退/换货</div>
            </div>
            <div class="personal-list">
                <div class="personal-item wall_icon">钱包</div>
                <router-link to="/collect" class="personal-item collect_icon">收藏</router-link>
                <router-link to="/coupon" class="personal-item coupons_icon">优惠券</router-link>
                <router-link to="/address" class="personal-item location_icon">收货地址</router-link>
            </div>
            <div class="personal-list">
                <router-link to="/setting" class="personal-item set_icon">设置</router-link>
            </div>
        </vue-put-to>
    </div>
</template>

<script>
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "CareView",
        data() {
            return {
                reduction: config.refresh
            }
        },
        components: {
            TieltBar,
            vuePutTo
        },
        created() {

        },
        methods: {
            toSetIcon() {

            },
            refresh(loaded) {
                loaded('done')
            },
        },
        computed: {
            ...mapGetters([
                "email",
                "picurl",
                "nickname",
                "sex",
                "waller",
                "birth",
                "acount"
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .personal-view {
        width: 100vw;
        height: 100vh;
        padding: 50px 0;
        background: #F7F7F7;
    }
    
    .personal-item-header {
        margin-top: 12px;
        width: 100%;
        height: 82px;
        padding: 6px 20px;
        display: flex;
        background: #FFF;
        align-items: center;
        justify-content: space-between;
    }
    
    .personal-icon {
        width: 62px;
        height: 62px;
        border-radius: 50%;
        border: 1px solid #FBFCFD;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
    }
    
    .personal-context {
        flex: 1 1 auto;
        padding: 10px 0 10px 20px;
    }
    
    .personal-name {
        line-height: 36px;
        font-size: 16px;
        font-weight: 700;
    }
    
    .personal-acount {
        line-height: 36px;
    }
    
    .personal-list {
        width: 100%;
        overflow: hidden;
        margin-top: 10px;
        padding-left: 20px;
        background: #FFF;
    }
    
    .personal-item {
        width: 100%;
        min-height: 42px;
        background: #FFF;
        position: relative;
        padding: 0 20px 0 40px;
        border-bottom: 1px solid #EDEDED;
        display: flex;
        align-items: center;
    }
    
    .personal-item:last-child {
        border-bottom: none;
    }
    
    .personal-item::before {
        content: "";
        width: 24px;
        height: 24px;
        position: absolute;
        top: 50%;
        left: 4px;
        transform: translateY(-50%);
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
    }
    
    .wall_icon::before {
        background-image: url(../../assets/waller.png);
    }
    
    .set_icon::before {
        background-image: url(../../assets/setting.png);
    }
    
    .location_icon::before {
        background-image: url(../../assets/address.png);
    }
    
    .collect_icon::before {
        background-image: url(../../assets/box.png);
    }
    
    .coupons_icon::before {
        background-image: url(../../assets/coupon.png);
    }
    
    .personal-item::after {
        content: "";
        width: 10px;
        height: 10px;
        position: absolute;
        right: 18px;
        top: 16px;
        border-bottom: 2px solid #E0E0E0;
        border-left: 2px solid #E0E0E0;
        -webkit-transform: rotate(225deg);
        transform: rotate(225deg);
    }
    
    .personal-menu {
        width: 100vw;
        height: 36px;
        margin-top: 10px;
        background: #FFF;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 2.5vw;
        font-weight: 550;
        border-bottom: 1px solid #EDEDED;
    }
    
    .personal-menu a {
        display: inline-block;
        width: auto;
        height: 20px;
        padding-right: 14px;
        position: relative;
        font-weight: 500;
    }
    
    .personal-menu a::before {
        content: "";
        position: absolute;
        right: 0px;
        top: 4px;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-bottom: .533333vw solid #DDDDDD;
        border-left: .533333vw solid #DDDDDD;
        transform: rotate(-135deg);
    }
    
    .personal-order {
        width: 100vw;
        background: #FFF;
        display: flex;
        align-items: center;
        padding: 2px 2.5vw;
    }
    
    .personal-nav {
        width: 19vw;
        height: 16vw;
        display: flex;
        font-size: 0.22rem;
        font-weight: 550;
        color: #333;
        justify-content: center;
        padding-top: 8vw;
        align-items: center;
        position: relative;
    }
    
    .personal-nav::before {
        content: "";
        width: 26px;
        height: 26px;
        position: absolute;
        left: 50%;
        top: 50%;
        display: inline-block;
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
        transform: translate(-50%, -80%);
    }
    
    .pendding-pay::before {
        background-image: url("../../assets/pendingPay.png");
    }
    
    .pendding-send::before {
        background-image: url("../../assets/pendingSend.png");
    }
    
    .pendding-copy::before {
        background-image: url("../../assets/pendingCopy.png");
    }
    
    .pendding-comment::before {
        background-image: url("../../assets/pendingComment.png");
    }
    
    .pendding-appeal::before {
        background-image: url("../../assets/pendingAppeal.png");
    }
</style>