<template>
    <div class="order-confirm-view">
        <tielt-bar title="确认下单" :back="true"></tielt-bar>
        <vue-put-to class="order-view-scroll" :top-load-method="refresh" :top-config="scrollConfigTop">
            <div class="order-address">
                <router-link to="/address" class="address-box-not" v-if="!address.adr_consignee">+ 添加收货地址</router-link>
                <div class="address-box" v-if="address.adr_consignee">
                    <div class="adr-location">收货地址:{{address.adr_location}} {{address.adr_info}}</div>
                    <div class="adr-consignee">收货人: {{address.adr_consignee}} <span> {{address.adr_caller === 1 ? '先生' : '小姐'}}</span></div>
                    <div class="adr-btn" @click="toggleSheet" data-sheet="address"></div>
                </div>
                <div class="orderinfo-time">立即送出</div>
            </div>
            <ul class="order-menu">
                <li @click="toggleSheet" data-sheet="payment">支付方式
                    <div data-sheet="payment">{{payment.title}}</div>
                </li>
                <li @click="toggleSheet" data-sheet="freight">配送方式
                    <div data-sheet="freight">{{freight.title}}</div>
                </li>
                <li @click="toggleSheet" data-sheet="time">送货时间
                    <div data-sheet="time">{{time.title}}</div>
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
                        <div class="order-goods-price">￥{{item.pro_price}}<span class="search-collect">x{{item.pro_num}}</span></div>
                    </div>
                </div>
            </div>
            <div class="nav-list">
                <div class="orderconfirm-nav-item">
                    <div @click="toggleSheet" data-sheet="coupons">
                        优惠券
                        <div class="coupon-tip" data-sheet="coupons">-￥{{coupon.price}}</div>
                    </div>
                </div>
                <nav-item :data="item" v-for="(item, index) in navList" :key="item.id"></nav-item>
            </div>
        </vue-put-to>
        <div id="order-confirm-bar">你需要支付：<span>￥{{formPrice}}</span>
            <div @click="payForm">结 算</div>
        </div>
        <sheet :show="showSheet" @toggle="toggleSheet" :title="sheetTitle">
            <coupon-item v-for="(item, index) in coupons" :key="item.id + 'couponput'" :index="index" @selectCoupon="selectCoupon" :couponId="coupon.id" :data="item" v-if="sheetTarget === 'coupons'"></coupon-item>
            <address-item v-for="(item, index) in userAddress" :key="item.adr_id + 'adrput'" :data="item" :index="index" @selectAddress="setAddress" :adrId="address.adr_id" v-if="sheetTarget === 'address'"></address-item>
            <payment-item v-for="(item, index) in paymentList" :key="item.id + 'payput'" :data="item" :index="index" @selectPay="selectPay" :payId="payment.id" v-if="sheetTarget === 'payment'"></payment-item>
            <freight-item v-for="(item, index) in freightList" :key="item.id + 'freightput'" :data="item" :index="index" @selectFreight="selectFreight" :freId="freight.id" v-if="sheetTarget === 'freight'"></freight-item>
            <time-item v-for="(item, index) in timeList" :key="item.id + 'timeput'" :data="item" :index="index" @selectTime="selectTime" :timeId="time.id" v-if="sheetTarget === 'time'"></time-item>
        </sheet>
    </div>
</template>
<style>

</style>
<script>
    import AddressItem from "@/components/OrderComfirm/AddressItem"
    import PaymentItem from "@/components/OrderComfirm/PaymentItem"
    import FreightItem from "@/components/OrderComfirm/FreightItem"
    import TimeItem from "@/components/OrderComfirm/TimeItem"
    import NavItem from "@/components/OrderComfirm/NavItem"
    import CouponItem from "@/components/Common/CouponItem"
    import { Lazyload, Indicator, Toast } from 'mint-ui'
    import CollectItem from "@/components/CollectItem"
    import Sheet from "@/components/Common/Sheet"
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
                goods: [],
                info: {},
                showSheet: false,
                sheetTarget: "address",
                sheetTitle: "",
                address: {},
                payment: {},
                freight: {},
                time: {},
                coupon: {},
                paymentList: [{
                    id: 10008669,
                    title: "在线支付(推荐)"
                }, {
                    id: 10008670,
                    title: "货到付款"
                }],
                freightList: [{
                    id: 1,
                    title: "顺丰速运：运费￥15"
                }, {
                    id: 2,
                    title: "申通速运：运费￥10"
                }, {
                    id: 3,
                    title: "圆通速运：运费￥10"
                }],
                timeList: [{
                    id: 1,
                    title: "送货时间不限"
                }, {
                    id: 2,
                    title: "周末 (星期六、星期日)"
                }, {
                    id: 3,
                    title: "工作日 (星期一 ~ 星期五)"
                }],
                navList: [{
                    id: 1,
                    title: "有货币",
                    describe: "(可低￥2.00)",
                    checked: false
                }, {
                    id: 2,
                    title: "发票",
                    describe: "(只支持纸质发票)",
                    checked: false
                }, {
                    id: 3,
                    title: "不打印价格",
                    describe: "(送朋友可以不打价哦)",
                    checked: false
                }]
            }
        },
        components: {
            CollectItem,
            AddressItem,
            PaymentItem,
            FreightItem,
            CouponItem,
            TimeItem,
            vuePutTo,
            TieltBar,
            NavItem,
            Sheet
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                vm.initData()
            })
        },
        created() {

        },
        methods: {
            toggleCoupon() {
                this.coupon = !this.coupon
            },
            toggleSheet() {
                this.sheetTarget = event.target.dataset.sheet ? event.target.dataset.sheet : ""
                switch(this.sheetTarget) {
                    case "address":
                        this.sheetTitle = "收货地址"
                        break
                    case "payment":
                        this.sheetTitle = "支付方式"
                        break
                    case "freight":
                        this.sheetTitle = "配送方式"
                        break
                    case "time":
                        this.sheetTitle = "送货时间"
                        break
                    case "coupons":
                        this.sheetTitle = "优惠券"
                        break
                    default:
                        this.sheetTitle = "收货地址"
                        break
                }
                if(this.showSheet) {
                    document.getElementsByClassName("sheet-component-box")[0].className = "putHidden sheet-component-box"
                    document.getElementsByClassName("sheet-component-mask")[0].className = "sheet-component-mask mask-hidden"
                    let time = setTimeout(() => {
                        this.showSheet = !this.showSheet
                        clearTimeout(time)
                        time = null
                    }, 200)
                } else {
                    this.showSheet = !this.showSheet
                }
            },
            setAddress(data) {
                this.address = this.userAddress[data.index]
            },
            selectPay(data) {
                this.payment = this.paymentList[data.index]
            },
            selectFreight(data) {
                this.freight = this.freightList[data.index]
            },
            selectTime(data) {
                this.time = this.timeList[data.index]
            },
            selectCoupon(data) {
                this.coupon = this.coupons[data.index]
                this.showSheet = !this.showSheet
            },
            initData() {
                this.address = this.userAddress.length > 1 ? this.userAddress[0] : {}
                this.goods = this.createOrder.order || JSON.parse(localStorage.getItem("yoyo_order_confirm"))
                console.log(this.goods)
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
            payForm(){
                let data = {
                    adrId: this.address.adr_id,
                    order:[]
                }
                for(let i = 0,len = this.goods.length;i < len;i++){
                    data.order.push({
                        id:this.goods[i].pro_code_bar,
                        attr:this.goods[i].pro_attr,
                        num:this.goods[i].pro_num,
                        pro_cart: this.goods[i].pro_cart ? this.goods[i].pro_cart : 0,
                    })
                }
                this.$ajax.post(API.addOrder(),data).then(res => {
                    if(res.code === 200){
                        this.$store.commit("order/cartHandleRefresh")
                        this.$store.commit("order/addOrder",res.data)
                        this.$router.replace({
                            name: "YohoOrderInfo",
                            params:{
                                id:res.data.orderCode
                            }
                        })
                    }else{
                        Toast({
                            message: res.msg,
                            duration: 800
                        })
                    }
                }).catch(err => {
                    console.log("下单失败",err)
                })
            }
        },
        computed: {
            ...mapGetters([
                'createOrder',
                'userAddress',
                'coupons'
            ]),
            formPrice(){
                let price = 0
                for(let i = 0,len = this.goods.length;i < len;i++){
                    price += parseFloat(this.goods[i].pro_price) * parseFloat(this.goods[i].pro_num)
                }
                return price
            }
        },
        activated() {
            this.payment = this.paymentList[0]
            this.freight = this.freightList[0]
            this.time = this.timeList[0]
            this.coupon = this.coupons[0]
        },
        filters: {

        }
    }
</script>

<style>
    .order-confirm-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
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
    
    .order-menu div {
        position: relative;
        min-width: 12vw;
        height: 40px;
        max-width: 58vw;
        padding-right: 16px;
        line-height: 40px;
    }
    
    .order-menu div::before {
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
    
    .order-confirm-view .order-view-scroll {
        height: 100vh !important;
        background: #F8F8F8;
        padding-bottom: 50px;
    }
    
    .order-goods-list {
        padding: 6px 16px;
        border-top: 1px solid #E8E8E8;
        border-bottom: 1px solid #E8E8E8;
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
        margin-right: 12px;
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
        /*border-bottom: 1px solid #F0F0F0;*/
        padding: 2px 0;
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