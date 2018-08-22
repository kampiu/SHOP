<template>
    <div class="goods-item">
        <router-link :to="{name:'YohoGoods',params: {id:data.pro_code_bar}}" class="tabbar-item">
            <div class="goods-icon">
                <img v-lazy="data.pro_thumb + '!_400x400'" alt="" />
            </div>
            <div class="goods-name font-break">{{data.pro_name}}</div>
        </router-link>
        <div class="goods-price">￥{{data.pro_price}}<span class="goods-add-cart"></span></div>
    </div>
</template>

<script>
    import { Lazyload } from 'mint-ui'

    export default {
        name: "GoodsItem",
        props: {
            data: {
                type: Object,
                default: {}
            }
        },
        components: {
            Lazyload
        }
    }
</script>

<style>
    .goods-item {
        width: 47vw;
        height: 84vw;
        float: left;
        margin-left: 2vw;
        background: #FFF;
        margin-bottom: 2vw;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
    
    .goods-icon {
        width: 47vw;
        height: 64.6vw;
        overflow: hidden;
    }
    .goods-icon img{
        width:auto;
        height:100%;
        margin-left:50%;
        transform: translateX(-50%);
    }
    
    .goods-name,
    .goods-price {
        width: 100%;
        height: 22px;
        line-height: 22px;
        padding: 0 10px;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        color: #333;
        font-weight: bold;
    }
    
    .goods-name {
        height: 44px;
        line-height: 19px;
        padding: 3px 10px;
    }
    
    .goods-price {
        color: #D0021B;
        display:flex;
        align-items: center;
        justify-content: space-between;
        margin:4px 0;
    }
    
    .goods-add-cart {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-image: url('../assets/collect.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
    }
    
    .goods-add-cart-active {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-image: url('../assets/collect_active.png');
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
    }
</style>