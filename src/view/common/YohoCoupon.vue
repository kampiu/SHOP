<template>
    <div class="personal-view">
        <tielt-bar title="优惠券" :back="true"></tielt-bar>
        <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
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
</template>
<style>

</style>
<script>
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'

    export default {
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore,
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
    
    .stamp {
        min-width: 300px;
        max-width: 96vw;
        height: auto;
        padding: 0 10px;
        margin: 10px auto;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        background: #F39B00;
        background: radial-gradient(rgba(0, 0, 0, 0) 0, rgba(0, 0, 0, 0) 4px, #50ADD3 4px);
        background-size: 15px 15px;
        background-position: 9px 3px;
    }
    
    .stamp:before {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left: 10px;
        right: 10px;
        z-index: -1;
        background-color: #50ADD3;
    }
    
    .stamp:after {
        content: '';
        position: absolute;
        left: 10px;
        top: 10px;
        right: 10px;
        bottom: 10px;
        z-index: -2;
    }
    
    .stamp i {
        position: absolute;
        left: 20%;
        top: 45px;
        height: 190px;
        width: 390px;
        background-color: rgba(255, 255, 255, .15);
        transform: rotate(-30deg);
    }
    
    .stamp .par {
        float: left;
        padding: 6px 15px;
        width: 220px;
        border-right: 2px dashed rgba(255, 255, 255, .3);
        text-align: left;
        flex: 0 0 auto;
    }
    
    .stamp .par p {
        color: #fff;
        font-size: 14px;
        line-height: 30px;
    }
    
    .stamp .par span {
        font-size: 40px;
        color: #fff;
        margin-right: 5px;
        line-height: 48px;
    }
    
    .stamp .par .sign {
        font-size: 34px;
    }
    
    .stamp .par sub {
        position: relative;
        top: -5px;
        color: rgba(255, 255, 255, .8);
    }
    
    .stamp .copy {
        display: inline-block;
        padding: 10px 2px;
        width: 100px;
        flex: 1 1 auto;
        vertical-align: text-bottom;
        font-size: 26px;
        color: rgb(255, 255, 255);
        text-align: center;
        line-height: initial;
    }
    
    .stamp .copy p {
        font-size: 12px;
        margin-top: 15px;
    }
    
    .goods-coupon-context li,
    .order-view-scroll li {
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