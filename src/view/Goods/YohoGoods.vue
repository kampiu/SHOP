<template>
    <transition name="slide-left">
        <div class="goodsinfo-view">
            <div class="goodsinfo-back" @click="toBack"></div>
            <vue-put-to class="home-scroll-view" :top-load-method="refresh" :top-config="reduction">
                <div class="goods-swiper">
                    <Swipe :auto="0" :speed="600">
                        <SwipeItem v-for="(item, index) in info.pro_allImg" :key="item">
                            <div class="goods-swiper-icon" :style="{backgroundImage: 'url(' + item + '!_600x600)' }" v-lazy="item"></div>
                        </SwipeItem>
                    </Swipe>
                    <div class="goods-info-name">{{info.pro_name}}</div>
                </div>
                <div class="giids-info-item goods-info-price">￥{{info.pro_price}}</div>
                <div class="giids-info-item goods-info-coupon" @click="toggleCoupon">领取优惠券</div>
                <div class="giids-info-table">
                    <div class="table-item" v-for="(item, index) in info.pro_realAttr" :key="item.name + item.attr">{{item.name}} :<span>{{item.attr}}</span></div>
                    <div class="goodsinfo-describe" v-if="info.pro_describe !== '' && info.pro_describe !== 'null'">
                        {{info.pro_describe}}
                    </div>
                </div>
                <div class="goodsinfo-plate">
                    <img v-for="(item, index) in info.pro_attrInfo" :key="item" v-lazy="item + '!_400x400'" alt="" />
                </div>
            </vue-put-to>
            <goods-bar @toggleSheet="toggleSheet"></goods-bar>
            <goods-sheet :data="info" @toggleSheet="toggleSheet" :show="sheet"></goods-sheet>
            <goods-coupon @toggleCoupon="toggleCoupon" :show="coupon"></goods-coupon>
        </div>
    </transition>
</template>

<script>
    import { Swipe, SwipeItem, Lazyload, Indicator, Toast } from 'mint-ui'
    import GoodsSheet from "@/components/GoodsSheet"
    import GoodsCoupon from "@/components/GoodsCoupon"
    import TieltBar from '@/components/TitleBar'
    import GoodsBar from "@/components/GoodsBar"
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from '@/util/api'
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "Goods",
        data() {
            return {
                reduction: config.refresh,
                gid: null,
                info: {
                    pro_realAttr: []
                },
                sheet: false,
                coupon: false,
                param: {
                    sku: null,
                    id: null,
                    num: 1,
                    attr: []
                },
                colorIndex: null,
                sizeIndex: null
            }
        },
        components: {
            GoodsCoupon,
            GoodsSheet,
            SwipeItem,
            Indicator,
            TieltBar,
            GoodsBar,
            vuePutTo,
            Lazyload,
            Swipe
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                if(vm.gid !== to.params.id) {
                    vm.getInfo(to.params.id)
                }
            })
        },
        created() {

        },
        methods: {
            toggleSheet() {
                this.sheet = !this.sheet
            },
            toggleCoupon() {
                this.coupon = !this.coupon
            },
            refresh(loaded) {
                this.getInfo(this.$route.params.id, () => {
                    loaded('done')
                })
            },
            getInfo(id, callback) {
                this.$ajax.get(API.GoodsInfo(id)).then(res => {
                    this.info = res.result
                    console.log(res, this)
                    callback && callback()
                }).catch(err => {
                    console.log(err, "获取商品详细信息出错")
                })
            },
            toBack() {
                window.history.go(-1)
            }
        },
        beforeRouteLeave(to, from, next) {
            this.sheet = false,
                this.coupon = false
            next()
        },
        filters: {

        }
    }
</script>

<style>
    .goodsinfo-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding-bottom: 50px;
    }
    
    .goods-swiper,
    .goods-swiper-icon {
        width: 100vw;
        height: 112vw;
        overflow: hidden;
        position: relative;
    }
    
    .goods-swiper-icon {
        background-size: cover;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .goods-info-name {
        width: 100vw;
        height: 32px;
        display: flex;
        align-items: center;
        padding: 0 12px;
        font-weight: 550;
        color: #FFF;
        position: absolute;
        left: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.7);
    }
    
    .goodsinfo-view .mint-swipe-indicators {
        position: absolute;
        bottom: 36px;
        background: #D4D3D5;
        padding: 0 4px;
        border-radius: 8px;
    }
    
    .goodsinfo-view .mint-swipe-indicator {
        background: #808080;
    }
    
    .goodsinfo-view .mint-swipe-indicators .is-active {
        background: #FFF;
    }
    
    .giids-info-item {
        height: 1rem;
        width: 100%;
        padding: 0 16px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #E0E0E0;
        font-size: 14px;
        background: #FFF;
    }
    
    .goods-info-price {
        color: #D0021B;
        font-weight: 550;
    }
    
    .goods-info-coupon {
        font-weight: 550;
        position: relative;
    }
    
    .goods-info-coupon::before {
        position: absolute;
        right: 12px;
        top: 50%;
        margin-top: -6px;
        content: "";
        width: 12px;
        height: 12px;
        display: inline-block;
        border-bottom: 2px solid #E0E0E0;
        border-left: 2px solid #E0E0E0;
        -webkit-transform: rotate(225deg);
        transform: rotate(225deg);
        z-index: 300;
    }
    
    .goodsinfo-back {
        position: absolute;
        left: 12px;
        top: 12px;
        width: 28px;
        height: 28px;
        background: rgba(0, 0, 0, 0.5);
        border-radius: 50%;
        z-index: 1200;
    }
    
    .goodsinfo-back::before {
        content: "";
        position: absolute;
        left: 4px;
        top: 2px;
        margin-top: 1.333333vw;
        margin-left: 1.333333vw;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-bottom: .533333vw solid #fff;
        border-left: .533333vw solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        z-index: 300;
    }
    
    .goodsinfo-describe {
        width: 92vw;
        padding: 12px 10px 12px 10px;
        text-indent: 2em;
        line-height: 20px;
        color: #333;
        position: relative;
        background: #F6F8FA;
        margin-top: 46px;
    }
    
    .goodsinfo-plate {
        width: 100vw;
        padding: 10px 4vw;
    }
    
    .goodsinfo-plate img {
        margin-bottom: 20px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
    
    .giids-info-table {
        min-height: 1rem;
        width: 100%;
        font-size: 14px;
        padding: 56px 4vw 20px 4vw;
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        /*padding-top: 46px;*/
        background: #FFF;
        flex-wrap: wrap;
        position: relative;
    }
    
    .giids-info-table::before,
    .goodsinfo-describe::before {
        content: "商品描述";
        position: absolute;
        text-indent: 0;
        left: 36vw;
        height: 18px;
        width: 20vw;
        font-size: 14px;
        font-weight: 550;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .goodsinfo-describe::before {
        content: "商品描述";
        left: 36vw;
        top: -32px;
    }
    
    .giids-info-table::before {
        content: "商品参数";
        left: 40vw;
        top: 18px;
    }
    
    .table-item {
        width: 45vw;
        height: 32px;
        margin-right: 1vw;
        background: #F6F8FA;
        line-height: 32px;
        margin-bottom: 1vw;
        text-align: left;
        padding-left: 12px;
        overflow: hidden;
        font-weight: 550;
    }
    
    .table-item span {
        margin-left: 12px;
        font-weight: 500;
    }
</style>