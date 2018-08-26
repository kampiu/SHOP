<template>
    <div class="home-view">
        <search-bar :flag="searchColor"></search-bar>
        <vue-put-to class="home-scroll-view" :top-load-method="refresh" :top-config="reduction">
            <div class="swiper-box">
                <Swipe :auto="4000" :speed="600">
                    <SwipeItem v-for="(item, index) in banner" :key="item.ban_id">
                        <div class="swiper-adv" :style="{backgroundImage: 'url(' + item.ban_thumb + ')' }"></div>
                    </SwipeItem>
                </Swipe>
            </div>
            <div class="context-box">
                <div class="content-box-header">热门分类
                    <router-link to="/cate">More</router-link>
                </div>
                <div class="hot-tab-box" v-for="(item, index) in cate" :key="item.class_yoho_id" :style="{backgroundImage: 'url(' + item.class_icon + '!_140X140)' }" :data-type="item.class_yoho_id" @click="toGoodsList">{{item.class_name}}</div>
            </div>
            <div class="context-box" v-for="(item, index) in brand" :key="item.brand_code">
                <div class="content-box-header">{{item.brand_name}}</div>
                <div class="brand-icon">
                    <img v-lazy="item.brand_bg + '!_X.220'" alt="" />
                </div>
                <div class="brand-goods-list">
                    <router-link :to="{name:'YohoGoods',params: { id:_item.id}}" class="brand-goods" v-for="(_item, _index) in item.brand_goods" :key="_item.id + 'brand-goods'">
                        <div class="brand-goods-icon">
                            <img v-lazy="_item.thumb + '!_140X140'" alt="" />
                        </div>
                        <div class="brand-goods-name font-break">{{_item.name}}</div>
                    </router-link>
                </div>
            </div>
        </vue-put-to>
    </div>
</template>
<script>
    import SearchBar from '@/components/SearchBar'
    import { Swipe, SwipeItem, Lazyload } from 'mint-ui'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from '@/util/api'
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                reduction: config.refresh,
                banner: [],
                cate: [],
                brand: [],
                page: 1,
                searchColor: false
            }
        },
        components: {
            SearchBar,
            SwipeItem,
            vuePutTo,
            Swipe
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                if(to.meta.isScroll && to.meta.isScroll > 0 && (from.name === "YohoGoods" || from.name === "YohoGoodsList")){
                    document.getElementsByClassName("home-view")[0].getElementsByClassName("scroll-container")[0].scrollTop = to.meta.isScroll
                }else{
                    document.getElementsByClassName("search-bar")[0].style.backgroundColor = `rgba(0,0,0,0)`
                }
            })
        },
        created() {
            this.initData()
            this.initWX()
        },
        methods: {
            initData(callback) {
                this.$ajax.get(API.getHome()).then(res => {
                    if(res.code === 200) {
                        this.banner = res.result.banner
                        this.cate = res.result.cate
                        this.brand = res.result.brand
                    }
                    callback && callback()
                })
            },
            initWX() {
                this.$ajax.get(API.getWxInfo()).then(res => {
                    if(res.code === 200) {
                        wx.config({
                            debug: false,
                            appId: 'wxc4bba222e1d9cbe3',
                            timestamp: parseInt(res.result.timestamp),
                            nonceStr: res.result.noncestr,
                            signature: res.result.signature,
                            jsApiList: [
                                'onMenuShareAppMessage',
                                'onMenuShareTimeline',
                                'getLocation',
                                'scanQRCode',
                                'openLocation',
                                'previewImage'
                            ]
                        })
                    }
                }).catch(err => {
                    console.log("获取微信出错")
                })
            },
            refresh(loaded) {
                this.initData(() => {
                    loaded('done')
                })
            },
            Scroll(e) {
                let s = document.getElementsByClassName("swiper-box")[0],
                    opction = Math.abs(s.getBoundingClientRect().top) / s.getBoundingClientRect().height * 100
                document.getElementsByClassName("search-bar")[0].style.backgroundColor = s.getBoundingClientRect().top < -s.getBoundingClientRect().height ? "rgba(32,32,32,0.9)" : "rgba(58,58,58," + (opction) + "%)"
                this.searchColor = s.getBoundingClientRect().top < -s.getBoundingClientRect().height ? true : false
            },
            toGoodsList(e) {
                this.$store.commit("goods/setType", e.target.dataset.type)
                this.$router.push({
                    name: 'YohoGoodsList',
                    params: {
                        refresh: true
                    }
                })
            }
        },
        activated() {
            document.getElementsByClassName("home-view")[0].getElementsByClassName("scroll-container")[0].addEventListener("scroll", this.Scroll)
        },
        beforeRouteLeave(to, from, next) {
            document.getElementsByClassName("home-view")[0].getElementsByClassName("scroll-container")[0].removeEventListener("scroll", this.Scroll)
            if(to.name === "YohoGoods" || to.name === "YohoGoodsList") {
                this.$route.meta.isScroll = document.getElementsByClassName("home-view")[0].getElementsByClassName("scroll-container")[0].scrollTop
            }
            next()
        },
        computed: {
            ...mapGetters([
                'router'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .vue-pull-to-wrapper {
        background: #EFEFEF;
    }
    
    .home-view {
        height: 100vh;
    }
    
    .home-scroll-view {
        width: 100vw;
        height: 100%;
    }
    
    .swiper-box {
        width: 100vw;
        height: 60vw;
        position: relative;
        overflow: hidden;
    }
    
    .swiper-adv {
        width: 100vw;
        height: 100%;
        background-size: auto 100%;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .context-box {
        margin-top: 15px;
        border-bottom: 1px solid #e0e0e0;
        overflow: hidden;
        background: #FFF;
    }
    
    .context-box:last-child {
        margin-bottom: 15px;
    }
    
    .content-box-header {
        width: 100vw;
        height: 0.74rem;
        max-height: 36px;
        padding: 0 25px;
        position: relative;
        display: flex;
        align-items: center;
        font-weight: 550;
    }
    
    .content-box-header::before {
        content: "";
        width: 2px;
        height: .68rem;
        max-height: 14px;
        background: #363636;
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
    }
    
    .content-box-header a {
        margin-left: auto;
        margin-right: -12px;
        color: #666
    }
    
    .hot-tab-box {
        width: 25vw;
        height: 27.5vw;
        float: left;
        border-top: 1px solid #e0e0e0;
        border-left: 1px solid #e0e0e0;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        background-size: 66% auto;
        background-position: center 18%;
        background-repeat: no-repeat;
        padding-top: 18vw;
        color: #6A6A6A;
    }
    
    .hot-tab-box:nth-child(4n - 2) {
        border-left: none;
    }
    
    .brand-icon {
        width: 94vw;
        height: 44vw;
        margin: 0 3vw 10px 3vw;
        overflow: hidden;
        background:#F5F7F6;
    }
    
    .brand-icon img {
        width: auto;
        transform: translateX(-40%);
    }
    
    .brand-goods-list {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin: 10px 3vw;
    }
    
    .brand-goods-icon {
        width: 30vw;
        height: 40vw;
        background:#F5F7F6;
    }
    
    .brand-goods-name {
        width: 30vw;
        height: 40px;
        line-height: 20px;
        display: flex;
        align-items: flex-start;
        font-weight: bold;
        justify-content: flex-start;
        overflow: hidden;
        color: #333;
    }
</style>