<template>
    <div class="cart-view">
        <tielt-bar title="Cart"></tielt-bar>
        <vue-put-to class="home-scroll-view" :top-load-method="refresh" :top-config="reduction" :bottom-load-method="loadmore" :bottom-config="loadcart">
            <cart-item v-for="(item, index) in cart" :key="item.pro_code_bar + 'sku_' + item.pro_sku" :data="item" @removeCount="removeCount" @addCount="addCount" @priceForm="priceForm"></cart-item>
        </vue-put-to>
        <div class="cart-bar">
            <label><input class="cart-checkbox" type="checkbox" />￥{{allPrice}}</label>
            <div class="cart-bar-pay">结 算</div>
        </div>
    </div>
</template>

<script>
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
                allPrice: 0
            }
        },
        components: {
            TieltBar,
            CartItem,
            vuePutTo
        },
        created() {

        },
        methods: {
            refresh(loaded) {
                this.initCart(() => {
                    loaded('done')
                })
            },
            loadmore(loaded) {
                loaded('done')
            },
            priceForm(id) {
                for(let i = 0, len = this.cart.length; i < len; i++) {
                    if(this.cart[i].pro_code_bar === id) {
                        this.allPrice += parseFloat(this.cart[i].pro_num) * parseFloat(this.cart[i].pro_price)
                        break
                    }
                }
            },
            removeCount(id) {
                for(let i = 0, len = this.cart.length; i < len; i++) {
                    if(this.cart[i].pro_code_bar === id) {
                        if(this.cart[i].pro_num > 1) {
                            let data = {
                                id: this.cart[i].pro_code_bar,
                                attr: this.cart[i].pro_attr,
                                num: 1
                            }
                            this.$ajax.post(API.removeCart(), {
                                order: [data]
                            }).then(res => {
                                console.log(res)
                            }).catch(err => {
                                console.log("添加购物车失败", err)
                            })
                        }
                        this.allPrice -= this.cart[i].pro_price
                        this.cart[i].pro_num = (this.cart[i].pro_num === 1 ? 1 : this.cart[i].pro_num - 1)
                        break
                    }
                }
            },
            addCount(id) {
                for(let i = 0, len = this.cart.length; i < len; i++) {
                    if(this.cart[i].pro_code_bar === id) {
                        this.allPrice += this.cart[i].pro_price
                        this.cart[i].pro_num++
                            let data = {
                                id: this.cart[i].pro_code_bar,
                                attr: this.cart[i].pro_attr,
                                num: 1
                            }
                        this.$ajax.post(API.addCart(), {
                            order: [data]
                        }).then(res => {
                            console.log(res)
                        }).catch(err => {
                            console.log("添加购物车失败", err)
                        })
                        break
                    }
                }
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
        computed: {
            ...mapGetters([
                'cart'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .cart-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding: 50px 0 100px 0;
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
</style>