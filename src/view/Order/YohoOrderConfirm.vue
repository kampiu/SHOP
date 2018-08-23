<template>
    <div class="order-confirm-view">
        <tielt-bar title="确认下单" :back="true"></tielt-bar>
        <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
            <div class="order-address">
                <!--<router-link to="/address" class="address-box-not" v-if="!notAdr">+ 添加收货地址</router-link>-->
                <div class="address-box">
                    <div class="adr-location">收货地址</div>
                    <div class="adr-consignee">收货人: <span></span></div>
                    <div class="adr-btn" @click="toSelectAdr"></div>
                </div>
                <div class="orderinfo-time">立即送出</div>
            </div>
            <ul class="order-menu">
                <li>支付方式
                    <div>在线支付(推荐)</div>
                </li>
                <li>配送方式
                    <div>顺丰速运:运费￥15</div>
                </li>
                <li>送货时间
                    <div>送货时间不限</div>
                </li>
            </ul>
            <div class="order-goods-list">
                <div class="order-goods" v-for="(item, index) in goods" :key="item.pro_code_bar + 'sku_' + item.pro_sku">
                    <div class="order-goods-icon">
                        <img v-lazy="item.pro_thumb + '!_400x400'" />
                    </div>
                    <div class="order-goods-info">
                        <div class="order-goods-name font-break">{{item.pro_name}}</div>
                        <div class="order-goods-attr">{{item.pro_brand}}</div>
                        <div class="order-goods-price">￥{{item.pro_price}}<span class="search-collect">x1</span></div>
                    </div>
                </div>
            </div>
            <div class="order-confirm-bar"></div>
        </vue-put-to>
    </div>
</template>
<style>
    .order-goods-list {
        padding: 6px 16px;
    }
    
    .order-goods {
        width: 100%;
        height: 81px;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .order-goods-icon {
        width: 70px;
        height: 80px;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center center;
        flex: 0 0 auto;
        margin-right:12px;
    }
    
    .order-goods-icon img {
        width: auto;
        margin-left: 50%;
        transform: translateX(-50%);
        height: 100%;
    }
    
    .order-goods-info {
        height: 80px;
        flex: 1 1 auto;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        border-bottom: 1px solid #F0F0F0;
        padding:2px 0;
    }
    
    .order-goods .order-goods-info {
        border-bottom: none
    }
    .order-goods-info div{
        width:100%;
    }
    .order-goods-name{
        font-weight: 550;
        height:36px;
        line-height: 18px;
        color:#333;
    }
    .order-goods-attr{
        line-height: 20px;
        color:#666;
    }
    .order-goods-price{
        color:#D0021B;
        font-weight: 550;
        display:flex;
        align-items: center;
        justify-content: space-between;
    }
    .order-goods-price span{
        color:#666;
        font-weight: 500;
    }
</style>
<script>
    import { Lazyload, Indicator, Toast } from 'mint-ui'
    import CollectItem from "@/components/CollectItem"
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore,
                goods: [{
                    pro_brand: "mogao",
                    pro_code_bar: 51885354,
                    pro_name:"mogao 磨白破洞牛仔裤",
                    pro_num: 1,
                    pro_price: 369,
                    pro_sku: "3311126",
                    pro_thumb: "https://billson.oss-cn-shenzhen.aliyuncs.com/yoho/201805241201a354a1e70424ccf9a62925d27030168b.jpg"
                }],
                info: {},
                address: {}
            }
        },
        components: {
            CollectItem,
            vuePutTo,
            TieltBar
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                //              Indicator.open('加载中...')
                vm.initData()
            })
        },
        created() {

        },
        methods: {
            initData() {
                //              Indicator.close()
                let {
                    order,
                    ...info
                } = this.createOrder
                console.log(order)
//              this.goods = order
                this.info = info
            },
            refresh(loaded) {
                loaded('done')
            },
            loadmore(loaded) {
                loaded('done')
            },
            toHome() {
                window.history.go(-1)
            },
            toSelectAdr() {

            }
        },
        computed: {
            ...mapGetters([
                'createOrder',
                'userAddress'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .order-confirm-view {
        width: 100vw;
        height: 100vh;
        padding-top: 50px;
    }
    
    .order-confirm-view .order-view-scroll {
        height: 100vh !important;
        background: #F0F0F0;
    }
    
    .order-confirm-view .scroll-container>div,
    .order-confirm-view .scroll-container>ul {
        margin-bottom: 10px;
        background: #FFF;
        width: 100vw;
        overflow: hidden;
    }
    
    .order-address {
        height: 116px;
        display: flex;
        flex-direction: column;
    }
    
    .address-box {
        width: 100%;
        height: 78px;
        display: flex;
        padding: 5px 16px 5px 0;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-around;
        position: relative;
    }
    
    .adr-btn {
        width: 26px;
        height: 78px;
        position: absolute;
        right: 0;
        top: 0;
        background-size: 20px auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url("../../assets/right_icon.png");
    }
    
    .adr-location {
        width: 100%;
        max-height: 40px;
        line-height: 20px;
        padding: 0 16px;
        overflow: hidden;
        font-size: 14px;
        color: #363636;
        font-weight: 550;
    }
    
    .adr-consignee,
    .adr-tell {
        line-height: 22px;
        padding: 0 16px;
        color: #363636;
        font-weight: 550;
    }
    
    .address-box-not {
        width: 80vw;
        height: 38px;
        color: #FFF;
        font-weight: 550;
        display: flex;
        align-items: center;
        justify-content: center;
        margin: 20px auto;
        background: #007AFF;
    }
    
    .orderinfo-time {
        width: 100%;
        height: 38px;
        border-top: 1px solid #F0F0F0;
        display: flex;
        align-items: center;
        padding: 0 16px;
        justify-content: space-between;
        font-weight: 550;
        color: #333;
    }
    /*menu*/
    
    .order-menu {
        padding-left: 16px;
    }
    
    .order-confirm-view .order-menu li {
        width: 100%;
        border-bottom: 1px solid #DFDFDF;
        height: 41px !important;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-right: 16px;
    }
    
    .order-confirm-view .order-menu li:last-child {
        border-bottom: none;
    }
    
    .order-menu li div {
        position: relative;
        min-width: 12vw;
        height: 40px;
        max-width: 58vw;
        padding-right: 16px;
        line-height: 40px;
    }
    
    .order-menu li div::before {
        content: "";
        position: absolute;
        right: 0;
        top: 13px;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-bottom: 1px solid #A4A4A4;
        border-left: 1px solid #A4A4A4;
        -webkit-transform: rotate(-45deg);
        transform: rotate(-45deg);
        z-index: 200;
    }
</style>