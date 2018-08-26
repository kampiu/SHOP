<template>
    <li class="coupons-item">
        <div class="coupon-nav">
            <span class="coupon-price">{{data.price}}</span>
            <span>{{data.condition}}</span>
        </div>
        <div class="coupon-context">
            <div class="coupon-context-info"><span>{{data.brand}}</span>{{data.info}}</div>
            <div class="coupon-context-time">{{data.time}} <span @click="useCoupon">立即使用</span></div>
            <div class="coupon-context-msg">相信信息 <span></span></div>
        </div>
    </li>
</template>

<script>
    export default {
        name: "CouponItem",
        props: {
            data: {
                type: Object
            },
            index: {
                type: Number
            },
            couponId: {
                type: Number
            }
        },
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {
            useCoupon(e) {
                this.$emit("selectCoupon", {
                    index: this.index,
                    id: this.data.id
                })
            }
        },
        activated() {

        },
        filters: {

        }
    }
</script>

<style>
    .coupons-item {
        list-style: none;
        height: 1.82rem;
        display: flex;
        align-items: center;
        overflow: hidden;
        margin: 8px 2vw 0 2vw;
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
        position: relative;
    }
    .coupon-nav::before,.coupon-nav::after{
        content: "";
        background:#FFF;
        border:1px solid #E6E6E6;
        width:16px;
        height:16px;
        border-radius: 50%;
        position:absolute;
        left:28vw;
        z-index: 100;
    }
    .coupon-nav::before{
        top:-8px;
    }
    .coupon-nav::after{
        bottom:-8px;
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
        border-top: 1px solid #EFEFEF;
        border-right: 1px solid #EFEFEF;
        border-bottom: 1px solid #EFEFEF;
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