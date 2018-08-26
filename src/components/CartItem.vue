<template>
    <div class="cart-item">
        <label>
            <input type="checkbox" class="cart-checkbox" @change="change" :checked="data.pro_check" />
            <div class="cart-icon">
                <img v-lazy="data.pro_thumb + '!_400x400'" alt="" />
            </div>
            <div class="cart-context">
                <div class="cart-name font-break">{{data.pro_name}}</div>
                <div class="cart-attr"><span v-for="(item, index) in data.pro_attr" :key="item">{{item}}</span></div>
                <div class="cart-price">￥{{data.pro_price}}</div>
            </div>
        </label>
        <div class="cart-count">
            <div class="cart-remove" @click="removeCount">-</div>
            <div class="cart-review">{{data.pro_num}}</div>
            <div class="cart-add" @click="addCount">+</div>
        </div>
    </div>
</template>
<style>

</style>

<script>
    export default {
        name: "CartItem",
        props: {
            data: {
                type: Object
            },
            index: {
                type: Number
            }
        },
        methods: {
            change() {
                this.$emit("checked", this.index)
            },
            removeCount() {
                this.$emit("removeCount", {
                    id: this.data.pro_code_bar,
                    sku: this.data.pro_sku,
                    num: this.data.pro_num
                })
            },
            addCount() {
                this.$emit("addCount", {
                    id: this.data.pro_code_bar,
                    sku: this.data.pro_sku
                })
            }
        }
    }
</script>

<style>
    .cart-item {
        width: 100vw;
        height: 118px;
        display: flex;
        align-items: center;
        overflow: hidden;
        position: relative;
        padding-left: 32px;
        justify-content: flex-start;
        margin-top: 10px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
        background-color: #FFF;
    }
    
    .cart-icon {
        width: 90px;
        height: 118px;
        padding:10px;
        flex: 0 0 auto;
        overflow: hidden;
    }
    .cart-icon > img{
        height:100%;
        width:auto;
        margin-left:50%;
        transform: translateX(-50%);
    }
    
    .cart-context {
        flex: 1 1 auto;
        height: 118px;
        padding: 10px 20px 10px 12px;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        justify-content: space-between;
    }
    
    .cart-context>div {
        width: 100%;
    }
    
    .cart-checkbox {
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        outline: none;
        border: 1px solid #999;
        color: #333;
        transition: all linear .2s;
        position: absolute;
        left: 5px;
        top: 49px;
        border-radius: 50%;
    }
    
    .cart-item label {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .cart-checkbox:checked {
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url(../assets/checked.png);
        border: none;
        background-color: #FFF;
    }
    
    .cart-context .cart-name {
        width: 100%;
        height: 40px;
        line-height: 20px;
        font-weight: 550;
        font-size: 14px;
        overflow: hidden;
        color: #333;
        -webkit-line-clamp: 2;
    }
    
    .cart-attr {
        color: #666;
        height: 24px;
        line-height: 24px;
    }
    
    .cart-attr span {
        margin-right: 6px;
    }
    
    .cart-price {
        color: #D0021B;
        font-weight: 550;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
    }
    
    .cart-count {
        width: 72px;
        height: 22px;
        display: flex;
        overflow: hidden;
        justify-content: space-between;
        align-items: center;
        font-weight: 550;
        position: absolute;
        right: 20px;
        bottom: 10px;
    }
    
    .cart-remove,
    .cart-add {
        width: 22px;
        height: 22px;
        background: #5179F1;
        color: #FFF;
        text-align: center;
        line-height: 22px;
        border-radius: 50%;
        font-size: 16px;
    }
    
    .cart-review {
        color: #333;
    }
</style>