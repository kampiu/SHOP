<template>
    <transition name="slide-right">
        <div>
            <drawer-layout ref="drawer" :drawer-width="280" :enable="true" :animatable="true" :z-index="1200" :content-drawable="true" :backdrop="true" :backdrop-opacity-range="[0,0.4]" @mask-click="toggleBar">
                <div class="drawer-content" slot="drawer" style="background-color:#FFF">
                    <div class="slicebar-title">品牌墙</div>
                    <vue-put-to class="slicebar-content" :bottom-load-method="loadmore" :bottom-config="reduction">
                        <li class="brand-nav" v-for="(item, index) in brandList" :key="item.brand_code">
                            <img class="brand-nav-icon" v-lazy="item.brand_icon" />{{item.brand_name}}
                        </li>
                    </vue-put-to>
                </div>
                <div slot="content">
                    <keep-alive>
                        <router-view class="view-box" @toggleBar="toggleBar"></router-view>
                    </keep-alive>
                    <div class="app-tabbar">
                        <router-link to="/home" class="tabbar-item">
                            <div :class="router === 'YohoHome' ? 'tabbar-home-active' : 'tabbar-home'"></div>
                            <span :style="{color: router === 'YohoHome' ? '#414141' : '#B0B0B0'}">首页</span>
                        </router-link>
                        <router-link to="/cate" class="tabbar-item">
                            <div :class="router === 'YohoClassify' ? 'tabbar-cate-active' : 'tabbar-cate'"></div>
                            <span :style="{color: router === 'YohoClassify' ? '#414141' : '#B0B0B0'}">分类</span>
                        </router-link>
                        <router-link to="/cart" class="tabbar-item">
                            <div :class="router === 'YohoCart' ? 'tabbar-cart-active' : 'tabbar-cart'"></div>
                            <span :style="{color: router === 'YohoCart' ? '#414141' : '#B0B0B0'}">购物车</span>
                        </router-link>
                        <router-link to="/personal" class="tabbar-item">
                            <div :class="router === 'YohoPersonal' ? 'tabbar-personal-active' : 'tabbar-personal'"></div>
                            <span :style="{color: router === 'YohoPersonal' ? '#414141' : '#B0B0B0'}">个人</span>
                        </router-link>
                    </div>
                </div>
            </drawer-layout>
        </div>
    </transition>
</template>
<style>

</style>
<script>
    import { DrawerLayout } from 'vue-drawer-layout'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import { Lazyload } from 'mint-ui'
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                reduction: config.loadmore,
                page: 1
            }
        },
        components: {
            DrawerLayout,
            vuePutTo,
            Lazyload
        },
        created() {
            this.getBrand()
        },
        methods: {
            getBrand(callback) {
                this.$ajax.get(API.getBrand(this.page)).then(res => {
                    console.log("获取牌子", res)
                    res.code === 200 && this.$store.commit("common/initBrand", res.result)
                    callback && callback()
                }).catch(err => {
                    console.log("获取牌子错误", err)
                })
            },
            loadmore(loaded) {
                this.page++
                    this.getBrand(() => {
                        loaded('done')
                    })
            },
            toggleBar() {
                this.$refs.drawer && this.$refs.drawer.toggle()
            }
        },
        computed: {
            ...mapGetters([
                'router',
                'brandList'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .slicebar-title {
        width: 100%;
        height: 50px;
        background: #252A2F;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 0;
        color: #FFF;
        font-size: 14px;
        font-weight: bold;
        z-index: 500;
    }
    
    .app-tabbar {
        width: 100vw;
        height: 50px;
        position: fixed;
        z-index: 1000;
        left: 0;
        bottom: 0;
        border-top: 1px solid #FBFCFD;
        background: #FFF;
        display: flex;
        align-items: center;
    }
    
    .app-tabbar a {
        width: 25vw;
        height: 49px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
    
    .app-tabbar div {
        width: 24px;
        height: 24px;
        background-image: url('https://billson.oss-cn-shenzhen.aliyuncs.com/React-Music/tab_nav.png');
        background-size: 48px auto;
        background-repeat: no-repeat;
        margin-bottom: 2px;
    }
    
    .tabbar-home {
        background-position: 0 0px;
    }
    
    .tabbar-cate {
        background-position: 0 -24px;
    }
    
    .tabbar-cart {
        background-position: 0 -72px;
    }
    
    .tabbar-personal {
        background-position: 0 -96px;
    }
    
    .tabbar-home-active {
        background-position: -24px 0px;
    }
    
    .tabbar-cate-active {
        background-position: -24px -24px;
    }
    
    .tabbar-cart-active {
        background-position: -24px -72px;
    }
    
    .tabbar-personal-active {
        background-position: -24px -96px;
    }
    
    .view-box {
        width: 100vw;
        overflow: hidden;
        padding-bottom: 50px;
    }
    
    .drawer-content .slicebar-content {
        width: 100%;
        height: 100vh !important;
        padding-top: 50px;
        background: #FFF;
        padding-bottom:0 !important;
    }
    
    .brand-nav {
        list-style: none;
        width: 100%;
        background: #FFF;
        padding: 0 10px 6px 110px;
        height: 48px;
        position: relative;
        font-weight: 550;
        color: #333;
        line-height: 22px;
        border-bottom: 1px solid #F8F8F8;
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .brand-nav-icon {
        position: absolute;
        left: 20px;
        top: 0px;
        width: 80px;
        height: 40px;
    }
</style>