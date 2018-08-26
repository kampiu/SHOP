<template>
    <div class="order-item">
        <router-link class="order-item-header" :to="{name: 'YohoOrderInfo',params:{id:data.orderCode}}">订单编号: {{data.orderCode}} <span>{{data.orderState | stateForm}}</span></router-link>
        <div class="order-item-list">
            <div class="order-goods" v-for="(item, index) in data.orderList" :key="'orderlist' + data.orderCode + '_' + item.pro_code_bar + '_' + item.pro_sku" v-if="index < 3">
                <router-link :to="{name: 'YohoGoods',params:{id:item.pro_code_bar}}" class="order-goods-icon">
                    <img v-lazy="item.pro_thumb + '!_140X140'" alt="" />
                </router-link>
                <router-link :to="{name: 'YohoOrderInfo',params:{id:data.orderCode}}" class="order-goods-context">
                    <div class="order-goods-name">{{item.pro_name}}</div>
                    <div class="order-goods-price">￥{{item.pro_price | moneyForm}}</div>
                    <div class="order-goods-info"><span v-for="(_item, _index) in item.pro_attr" :key="_item">{{_item}}</span>x{{item.pro_num}}</div>
                </router-link>
            </div>
        </div>
        <router-link :to="{name: 'YohoOrderInfo',params:{id:data.orderCode}}" class="order-item-bar">共 {{data.orderCount}} 件商品，实付<span>￥{{data.orderPrice | moneyForm}}</span>（包含运费）</router-link>
        <div class="order-item-menu"><span>晒单评价</span></div>
    </div>
</template>
<style>

</style>
<script>
    import { Lazyload } from 'mint-ui'
    
    export default {
        name: "OrderItem",
        props: {
            data: {
                type: Object
            }
        },
        data() {
            return {

            }
        },
        components: {

        },
        created() {
            this.init()
        },
        methods: {
            init(){
                console.log(this.data)
            }
        },
        filters: {
            stateForm(val){
                let state = parseInt(val),result = ""
                switch(state){
                    case 1: result = "待支付"
                        break
                    case 2: result = "待发货"
                        break
                    case 3: result = "待收货"
                        break
                    case 4: result = "待评价"
                        break
                    case 5: result = "退/换货"
                        break 
                    default: result = "待收货"
                        break
                }
                return result
            },
            moneyForm(val){
                return parseFloat(val).toFixed(2)
            }
        }
    }
</script>

<style>
    .order-item {
        width: 100vw;
        background: #FFF;
        margin: 12px 0;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
    
    .order-item-header {
        width: 100vw;
        height: 40px;
        display: flex;
        padding: 0 16px;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #DDDDDD;
        font-weight: 550;
    }
    .order-item-header span{
        font-weight: 500;
    }
    .order-item-bar,
    .order-item-menu {
        height: 38px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        border-top: 1px solid #EBEBEB;
        padding: 0 10px;
        color:#333;
    }
    
    .order-item-menu span {
        padding: 2px 8px;
        border: 1px solid #444;
        color: #444;
        border-radius: 4px;
        text-align: center;
    }
    
    .order-item-bar span {
        color: #D1071F;
        font-weight: 550;
    }
    
    .order-item-list {
        width: 100vw;
        padding-left: 24px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        background: #FFF;
    }
    
    .order-goods {
        height: 90px;
        width: 100%;
        display: flex;
        align-items: center;
        overflow: hidden;
    }
    
    .order-goods:last-child .order-goods-context {
        border-bottom: none;
    }
    
    .order-goods-icon {
        width: 72px;
        height: 80px;
        margin-right: 12px;
        padding-bottom:10px;
        overflow: hidden;
    }
    .order-goods-icon img{
        height:100%;
        width:auto;
        margin-left:50%;
        transform: translateX(-50%);
    }
    .order-goods-context {
        flex: 1 1 auto;
        height: 81px;
        padding: 0 20px 10px 2px;
        display: flex;
        flex-direction: column;
        border-bottom: 1px solid #EBEBEB;
    }
    
    .order-goods-context>div {
        flex: 0 0 auto;
    }
    
    .order-goods-name,
    .order-goods-price {
        font-weight: 550;
    }
    
    .order-goods-name {
        color: #333;
        line-height: 20px;
        min-height: 20px;
        max-height: 40px;
    }
    
    .order-goods-price,
    .order-goods-info {
        height: 20px;
        line-height: 20px;
    }
    
    .order-goods-price {
        color: #D1071F;
    }
    
    .order-goods-info {
        color: #999;
        text-align: right;
    }
    .order-goods-info span{
        float:left;
        margin-right:6px;
    }
</style>