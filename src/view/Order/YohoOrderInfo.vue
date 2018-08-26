<template>
    <transition name="slide-left">
        <div class="order-confirm-view">
            <tielt-bar title="订单详情" :back="true"></tielt-bar>
            <vue-put-to class="orderinfo-view-scroll" :top-load-method="refresh" :top-config="scrollConfigTop">
                <div class="order-address">
                    <div class="address-box" v-if="address.adr_consignee">
                        <div class="adr-location">收货地址:{{address.adr_location}} {{address.adr_info}}</div>
                        <div class="adr-consignee">收货人: {{address.adr_consignee}} <span> {{address.adr_caller === 1 ? '先生' : '小姐'}}</span></div>
                    </div>
                    <div class="orderinfo-time">订单状态<span>{{orderType}}</span></div>
                </div>
                <ul class="order-menu">
                    <li>支付方式
                        <div>{{payType}}</div>
                    </li>
                    <li>配送方式
                        <div>顺丰速运</div>
                    </li>
                    <li>活动优惠
                        <div>￥-14.50</div>
                    </li>
                    <li>配送时间
                        <div>送货时间不限</div>
                    </li>
                    <li>VIP优惠
                        <div>-￥12.50</div>
                    </li>
                </ul>
                <div class="order-goods-list">
                    <div class="order-goods" v-for="(item, index) in goodsList" :key="item.pro_code_bar + 'sku_' + item.pro_sku">
                        <router-link :to="{name: 'YohoGoods',params:{id:item.pro_code_bar}}" class="order-goods-icon">
                            <img v-lazy="item.pro_thumb + '!_400x400'" />
                        </router-link>
                        <div class="order-goods-info">
                            <div class="order-goods-name font-break">{{item.pro_name}}</div>
                            <div class="order-goods-attr"><span v-for="(_item, _index) in item.pro_attr" :key="_item">{{_item}}</span></div>
                            <div class="order-goods-price">￥{{item.pro_price}}<span class="search-collect">x{{item.pro_num}}</span></div>
                        </div>
                    </div>
                </div>
                <div class="nav-list">
                    <div class="orderconfirm-nav-item">
                        <div>
                            订单编号:
                            <div class="coupon-tip">{{info.orderCode}}</div>
                        </div>
                    </div>
                    <div class="orderconfirm-nav-item">
                        <div>
                            下单时间:
                            <div class="coupon-tip">{{info.orderAddtime | timeForm}}</div>
                        </div>
                    </div>
                    <div class="orderconfirm-nav-item">
                        <div>
                            支付方式:
                            <div class="coupon-tip">微信支付</div>
                        </div>
                    </div>
                    <div class="orderconfirm-nav-item">
                        <div>
                            配送费:
                            <div class="coupon-tip">￥15.00</div>
                        </div>
                    </div>
                </div>
            </vue-put-to>
        </div>
    </transition>
</template>
<style>

</style>
<script>
    import { Lazyload, Indicator, Toast } from 'mint-ui'
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
                scrollConfigTop: config.loadmore,
                goodsList: [],
                info: {},
                address: {}
            }
        },
        components: {
            vuePutTo,
            TieltBar
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                console.log(to)
                vm.goodsList = []
                vm.info = {}
                vm.address = {}
                vm.initData(to.params.id)
            })
        },
        created() {

        },
        methods: {
            initData(id) {
                console.log(this.orderList, this.orderList.length)
                if(this.orderList.length > 0) {
                    try {
                        for(let i = 0, len = this.orderList.length; i < len; i++) {
                            if(parseInt(this.orderList[i].orderCode) === parseInt(id)) {
                                const {
                                    orderList,
                                    address,
                                    ...info
                                } = this.orderList[i]
                                this.goodsList = orderList
                                this.address = address
                                this.info = info
                                return
                            }
                        }
                    } catch(e) {
                        this.loadInfo(id)
                    }
                } else {
                    this.loadInfo(id)
                }
            },
            loadInfo(id, callback) {
                this.$ajax.post(API.getOrderInfo(), {
                    id: id
                }).then(res => {
                    if(res.code === 200) {
                        const {
                            orderList,
                            address,
                            ...info
                        } = res.result
                        this.goodsList = orderList
                        this.address = address
                        this.info = info
                    } else {
                        Toast({
                            message: res.msg,
                            duration: 1000
                        })
                    }
                    callback && callback()
                }).catch(err => {
                    Toast({
                        message: "获取订单详细信息出错",
                        duration: 1000
                    })
                })
            },
            refresh(loaded) {
                this.loadInfo(this.$route.params.id, () => {
                    loaded('done')
                })
            },
            toHome() {
                window.history.go(-1)
            }
        },
        computed: {
            ...mapGetters([
                'orderList'
            ]),
            orderType() {
                let str = ""
                switch(this.info.orderState) {
                    case "1":
                        str = "待付款"
                        break
                    case "2":
                        str = "待发货"
                        break
                    case "3":
                        str = "待收货"
                        break
                    case "4":
                        str = "待评价"
                        break
                    case "5":
                        str = "退/换货"
                        break
                    default:
                        str = "已发货"
                        break
                }
                return str
            },
            payType() {
                let str = ""
                switch(this.info.orderIsPay) {
                    case "1":
                        str = "在线付款"
                        break
                    case "2":
                        str = "货到付款"
                        break
                    default:
                        str = "在线付款"
                        break
                }
                return str
            }
        },
        filters: {
            timeForm(val) {
                let time = new Date(val)
                let y = time.getFullYear()
                let m = time.getMonth() + 1 < 10 ? "0" + (time.getMonth() + 1) : time.getMonth() + 1
                let d = time.getDate() < 10 ? "0" + time.getDate() : time.getDate()
                let h = time.getHours() < 10 ? "0" + time.getHours() : time.getHours()
                let mm = time.getMinutes() < 10 ? "0" + time.getMinutes() : time.getMinutes()
                let s = time.getSeconds() < 10 ? "0" + time.getSeconds() : time.getSeconds()
                return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + s
            }
        }
    }
</script>

<style>
    .order-confirm-view .orderinfo-view-scroll {
        height: 100vh !important;
        background: #F8F8F8;
        padding-top: 50px;
    }
    
    .order-confirm-view .order-goods-info {
        height: 91px;
        flex: 1 1 auto;
        overflow: hidden;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        border-bottom: 1px solid #F0F0F0;
        padding: 5px 0;
    }
    
    .order-confirm-view .order-goods-info {
        text-align: left;
    }
    
    .order-confirm-view .order-goods-name {
        max-height: 36px;
    }
    
    .order-confirm-view .order-view-scroll {
        height: 100vh !important;
        padding-top: 50px;
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
    
    .adr-consignee span {
        margin-left: 4px;
        color: #999;
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
        height: 45px;
        padding-top: 5px;
        display: flex;
        align-items: center;
        padding: 0 16px;
        justify-content: space-between;
        font-weight: 550;
        color: #333;
        position: relative;
    }
    
    .orderinfo-time::before {
        position: absolute;
        left: -6px;
        top: 0px;
        z-index: 200;
        content: "";
        width: 110vw;
        height: 4px;
        background-size: 20px 4px;
        background-image: linear-gradient(45deg, rgba(68, 68, 68, 0) 30%, transparent 30%, rgba(68, 68, 68, .8) 30%, rgba(68, 68, 68, .8) 75%, transparent 75%, transparent);
    }
    
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
    
    .order-menu div {
        position: relative;
        min-width: 12vw;
        height: 40px;
        max-width: 58vw;
        padding-right: 16px;
        line-height: 40px;
    }
    
    .order-confirm-view .order-menu div::before {
        content: "";
        position: absolute;
        right: 0;
        top: 13px;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-bottom: 1px solid #A4A4A4;
        border-left: 1px solid #A4A4A4;
        transform: rotate(225deg);
        z-index: 200;
    }
    
    .order-goods-list {
        padding: 6px 16px;
        border-top: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;
    }
    
    .order-confirm-view .order-goods {
        width: 100%;
        height: 91px;
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
        margin-right: 12px;
    }
    
    .order-goods-icon img {
        width: auto;
        margin-left: 50%;
        transform: translateX(-50%);
        height: 100%;
    }
    
    .order-goods:last-child .order-goods-info {
        border-bottom: none
    }
    
    .order-goods-info div {
        width: 100%;
    }
    
    .order-goods-name {
        font-weight: 550;
        height: 36px;
        line-height: 18px;
        color: #333;
    }
    
    .order-goods-attr {
        line-height: 20px;
        color: #666;
    }
    
    .order-goods-price {
        color: #D0021B;
        font-weight: 550;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .order-goods-price span {
        color: #666;
        font-weight: 500;
    }
    
    #order-confirm-bar {
        width: 100vw;
        height: 50px;
        position: fixed;
        left: 0;
        bottom: 0;
        background: #FFF;
        margin: 0;
        font-size: 14px;
        color: #444;
        padding-left: 20px;
        line-height: 50px;
        font-weight: 550;
        border-top: 1px solid #EDEDED;
    }
    
    #order-confirm-bar span {
        color: #D0021B;
        font-size: 14px;
    }
    
    #order-confirm-bar div {
        width: 30vw;
        height: 50px;
        float: right;
        background: #D0021B;
        color: #FFF;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
    }
    
    .payment-item .adr-selput-location,
    .payment-item .adr-selput-location {
        font-size: 12px;
        display: flex;
        align-items: center;
    }
    
    .coupon-tip {
        padding-right: 26px;
        font-weight: 500;
        position: relative;
    }
    
    .coupon-tip::before {
        content: "";
        position: absolute;
        right: 12px;
        top: 4px;
        width: 8px;
        height: 8px;
        display: inline-block;
        border-bottom: 1px solid #A4A4A4;
        border-left: 1px solid #A4A4A4;
        transform: rotate(225deg);
        z-index: 200;
    }
</style>