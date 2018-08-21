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
            <div class="personal-list">
                <div class="personal-item wall_icon">钱包</div>
                <div class="personal-item collect_icon">收藏</div>
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
        margin-top: 16px;
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
</style>