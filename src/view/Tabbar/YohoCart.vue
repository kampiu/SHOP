<template>
    <div class="cart-view">
        <div class="title-bar">购物车</div>
        <vue-put-to class="home-scroll-view" :top-load-method="refresh" :top-config="reduction" :bottom-load-method="loadmore" :bottom-config="loadcart">
            <cell-swipe :right="adrSetItem" v-for="(item, index) in cart" :key="item.pro_code_bar + 'sku_' + item.pro_sku" :data-id="item.pro_code_bar" :data-sku="item.pro_sku">
                <cart-item :data="item" @removeCount="removeCount" @addCount="addCount" @checked="checked" :index="index"></cart-item>
            </cell-swipe>
            <!--<cart-item v-for="(item, index) in cart" :key="item.pro_code_bar + 'sku_' + item.pro_sku" :data="item" @removeCount="removeCount" @addCount="addCount" @checked="checked" :index="index"></cart-item>-->
        </vue-put-to>
        <div class="cart-bar">
            <label>
                <input class="cart-checkbox" type="checkbox" @change="handleAllCheck" :checked="allCheck" />
                <div class="cart-all-info">
                    <span>￥{{cartPrice}}</span>
                    <span>已选{{cartCount}}件</span>
                </div>
            </label>
            <div class="cart-bar-pay" @click="handlePay">结 算</div>
        </div>
    </div>
</template>

<script>
    import { Toast, CellSwipe, MessageBox, Indicator } from 'mint-ui'
    import TieltBar from '@/components/TitleBar'
    import CartItem from '@/components/CartItem'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from '@/util/api'
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "CartView",
        data() {
            return {
                reduction: config.refresh,
                loadcart: config.loadmore,
                allPrice: 0,
                adrSetItem: [{
                    content: '移除',
                    handler: this.remove
                }]
            }
        },
        components: {
            TieltBar,
            CartItem,
            vuePutTo,
            MessageBox,
            CellSwipe
        },
        created() {

        },
        methods: {
            handlePay() {
                let data = []
                for(let i = 0, len = this.cart.length; i < len; i++) {
                    if(this.cart[i].pro_check) {
                        data.push(this.cart[i])
                    }
                }
                this.$store.dispatch("order/createNewOrder", {
                    order: data
                })
                this.$router.push({
                    name: "YohoOrderConfirm"
                })
            },
            handleAllCheck() {
                this.$store.commit("cart/allCheck")
            },
            remove() {
                let id = parseInt(event.target.parentNode.parentNode.parentNode.getAttribute("data-id")),
                    sku = event.target.parentNode.parentNode.parentNode.getAttribute("data-sku")
                MessageBox.confirm('确定移除该商品?').then((action) => {
                    for(let i = 0, len = this.cart.length; i < len; i++) {
                        if(this.cart[i].pro_code_bar === id && this.cart[i].pro_sku === sku) {
                            let data = {
                                id: this.cart[i].pro_code_bar,
                                num: this.cart[i].pro_num,
                                sku: this.cart[i].pro_sku,
                                all: true
                            }
                            this.$store.dispatch("cart/removeCartCount", data)
                            break
                        }
                    }
                }).catch(err => {})
            },
            refresh(loaded) {
                this.initCart(() => {
                    loaded('done')
                })
            },
            loadmore(loaded) {
                loaded('done')
            },
            checked(index) {
                this.$store.commit("cart/checkedCart", index)
            },
            removeCount(data) {
                if(data.num === 1) {
                    MessageBox.confirm('确定移除该商品?').then((action) => {
                        this.$store.dispatch("cart/removeCartCount", data)
                    }).catch(err => {})
                } else {
                    this.$store.dispatch("cart/removeCartCount", data)
                }
            },
            addCount(data) {
                this.$store.dispatch("cart/addCartCount", data)
            },
            initCart(callback) {
                this.$ajax.post(API.getCartList()).then(res => {
                    if(res.code === 200) {
                        this.$store.commit("cart/initCart", res.data)
                    }
                    callback && callback()
                })
            }
        },
        activated() {
            if(this.cartRefresh) {
                Indicator.open('加载中...')
                this.$ajax.post(API.getCartList()).then(res => {
                    if(res.code === 200) {
                        this.$store.commit("cart/initCart", res.data)
                        this.$store.commit("order/cartHandleRefresh")
                    }
                    Indicator.close()
                })
            }
        },
        computed: {
            ...mapGetters([
                'cartRefresh',
                'cartPrice',
                'cartCount',
                'allCheck',
                'cart'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .title-bar,
    .slicebar-title {
        width: 100%;
        height: 50px;
        background: #252A2F;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 0;
        color: #FFF;
        font-size: 14px;
        font-weight: bold;
        z-index: 500;
    }
    
    .cart-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding: 50px 0 100px 0;
    }
    
    .cart-view .mint-cell-wrapper {
        padding: 0;
        background: #F7F7F7;
    }
    
    .cart-view .mint-cell-swipe-buttongroup {
        height: 118px;
        overflow: hidden;
        margin-top: 10px;
        background: #D0021B;
        text-align: center;
        color: #FFF;
        line-height: 118px;
    }
    
    .cart-bar {
        width: 100vw;
        height: 50px;
        background: #FFF;
        position: fixed;
        left: 0;
        bottom: 50px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-top: 1px solid #EDEDED;
        border-bottom: 1px solid #EDEDED;
        color: #D0021B;
        font-weight: 550;
        font-size: 14px;
        padding-left: 38px;
    }
    
    .cart-bar .cart-checkbox {
        top: 14px;
    }
    
    .cart-bar-pay {
        width: 30vw;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #FFF;
        font-weight: 550;
        background: #D0021B;
        font-size: 14px;
        margin-left: auto;
    }
    
    .cart-all-info {
        min-width: 20vw;
        height: 50px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
    }
    
    .cart-all-info span {
        line-height: 20px;
    }
    
    .cart-all-info span:nth-child(1) {
        font-size: 14px;
    }
    
    .cart-all-info span:nth-child(2) {
        color: #666;
    }
</style>