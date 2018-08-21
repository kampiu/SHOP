<template>
    <div class="goods-sheet" v-if="show">
        <div class="goods-sheet-mask" @click="acionSheet"></div>
        <div :class="show ? 'putShow goods-sheet-view' : 'goods-sheet-view'" style="display:flex;flex-direction: column;padding:40px 2vw;background-color:#F8F8F8">
            <div class="goods-coupon-title">优惠券</div>
            <div class="goods-coupon-context">
                <vue-put-to :top-load-method="refresh" :top-config="reduction" style="height:calc(60vh - 80px)">
                    <li v-for="(item, index) in coupons" :key="item.id">
                        <div class="coupon-nav">
                            <span class="coupon-price">{{item.price}}</span>
                            <span>{{item.condition}}</span>
                        </div>
                        <div class="coupon-context">
                            <div class="coupon-context-info"><span>{{item.brand}}</span>{{item.info}}</div>
                            <div class="coupon-context-time">{{item.time}} <span>立即使用</span></div>
                            <div class="coupon-context-msg">相信信息 <span></span></div>
                        </div>
                    </li>
                </vue-put-to>
            </div>
            <div class="goods-coupon-footer" @click="closeView">关闭</div>
        </div>
    </div>
</template>

<script>
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'

    export default {
        name: "CouponSheet",
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                reduction: config.refresh,
                coupons: [{
                    id: 1002661514377,
                    price: 80,
                    condition: "满600可使用",
                    brand: "adidas",
                    info: "仅购买adidas产品可用",
                    time: "2018.05.08 - 2018.08.08",
                    tip: "快过期"
                }, {
                    id: 1002546814377,
                    price: 199,
                    condition: "满500可使用",
                    brand: "全部",
                    info: "所有产品可使用",
                    time: "2018.12.12 - 2018.12.12",
                    tip: "未开始"
                }, {
                    id: 1002015604377,
                    price: 288,
                    condition: "满1999可使用",
                    brand: "全部",
                    info: "所有产品可使用",
                    time: "2018.09.01 - 2018.10.07",
                    tip: "快过期"
                }, {
                    id: 1001546877,
                    price: 128,
                    condition: "满两件可使用",
                    brand: "全部",
                    info: "所有产品可使用",
                    time: "2018.10.01 - 2019.3.01",
                    tip: "未开始"
                }]
            }
        },
        components: {
            vuePutTo
        },
        created() {

        },
        methods: {
            acionSheet() {
                this.$emit("toggleCoupon")
            },
            refresh(loaded) {
                loaded('done')
            },
            closeView(){
                this.$emit("toggleCoupon")
            }
        },
        filters: {

        }
    }
</script>

<style>
    .goods-sheet {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2000;
    }
    
    .goods-sheet-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        animation-name: maskShow;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    }
    
    @keyframes maskShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    
    .putShow {
        animation-name: putInfo;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    
    @keyframes putInfo {
        from {
            bottom: -60vw;
        }
        to {
            bottom: 0px;
        }
    }
    
    .goods-sheet-view {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 60vh;
        background: #FFF;
        padding:4vw;
    }
    
    .goods-coupon-title,
    .goods-coupon-footer {
        width: 100vw;
        position: absolute;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 550;
        color: #666;
        left: 0;
        flex: 0 0 auto;
        background: #FFF;
    }
    
    .goods-coupon-title {
        top: 0;
        border-bottom: 1px solid #F8F8F8;
    }
    
    .goods-coupon-footer {
        bottom: 0;
        border-top: 1px solid #F8F8F8;
    }
    
    .goods-coupon-context {
        width: 96vw;
        flex: 1 1 auto;
        overflow: hidden;
    }
    
    .goods-coupon-context li,.order-view-scroll li{
        list-style: none;
        height: 1.82rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin-top: 8px;
    }
    
    .coupon-nav {
        width: 30vw;
        flex: 0 0 auto;
        height: 1.82rem;
        background: -webkit-linear-gradient(45deg, #5394D5, #637CDA);
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        color: #FFF;
    }
    
    .coupon-price {
        font-size: .66rem;
        color: #FFF;
        position: relative;
    }
    
    .coupon-price::before {
        content: "￥";
        font-size: .32rem;
        position: absolute;
        left: -.32rem;
        top: .34rem;
    }
    
    .coupon-context {
        flex: 1 1 auto;
        height: 1.82rem;
        background: #FFF;
        padding: 0 12px;
        overflow: hidden;
        position: relative;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
    }
    
    .coupon-context::before {
        content: "快过期";
        position: absolute;
        right: -28px;
        top: 5px;
        background: #F15352;
        color: #FFF;
        transform: rotate(34deg);
        width: 100px;
        height: 20px;
        text-align: center;
        line-height: 20px;
        display: inline-block;
    }
    
    .coupon-context>div {
        width: 100%;
        height: .6rem;
        line-height: .6rem;
    }
    
    .coupon-context-info span {
        padding: 2px 8px;
        background: #5394D5;
        color: #FFF;
        margin-right: 10px;
        border-radius: 4px;
    }
    
    .coupon-context-info {
        font-size: 0.22rem;
        color: #666;
    }
    
    .coupon-context .coupon-context-time {
        height: .8rem;
        padding-bottom: .2rem;
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px dashed #DDDDDD;
    }
    
    .coupon-context-time span {
        border: 1px solid #0387FF;
        padding: 0 12px;
        height: 22px;
        border-radius: 14px;
        color: #0387FF;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .coupon-context-msg {
        color: #999;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .coupon-context-msg span {
        background: #A4A4A4;
        border-radius: 50%;
        display: inline-block;
        position: relative;
        width: 18px;
        height: 18px;
    }
    
    .coupon-context-msg span::before {
        content: "";
        position: absolute;
        left: 5px;
        top: 3px;
        width: 6px;
        height: 6px;
        display: inline-block;
        border-bottom: .533333vw solid #fff;
        border-left: .533333vw solid #fff;
        transform: rotate(-45deg);
        z-index: 300;
    }
</style>