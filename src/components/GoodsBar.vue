<template>
    <div class="goods-bar">
        <router-link to="/cart" class="goods-bar-cart">购物车</router-link>
        <div class="goods-bar-brand">牌子</div>
        <div :class="isCollect ? 'goods-bar-collect-active' : 'goods-bar-collect'" @click="addCollect">收藏</div>
        <div class="goods-bar-buy" @click="addCart">立即购买</div>
        <div class="goods-bar-addCart" @click="addCart">加入购物车</div>
    </div>
</template>

<script>
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'
    
    export default {
        name: "goods-bar",
        props:{
            data:{
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

        },
        methods: {
            actionSheet(){
                this.$emit("toggleSheet")
            },
            addCart(){
                this.$emit("toggleSheet")
            },
            addCollect(){
                this.$ajax.post((this.isCollect ? API.removeCollect : API.addCollect)(),{id: this.data.pro_code_bar}).then(res => {
                    if(res.code === 200){
                        this.$store.commit("cart/initCollect", res.result)
                    }else{
                        Toast({
                            message: res.msg,
                            duration: 800
                        })
                    }
                }).catch(err => {
                    console.log("添加收藏失败",err)
                })
            }
        },
        computed: {
            ...mapGetters([
                'collect'
            ]),
            isCollect(){
                for(let i = 0,len = this.collect.length;i < len;i++){
                    if(this.data.pro_code_bar === this.collect[i].pro_code_bar){
                        return true
                    }
                }
                return false
            }
        },
        filters: {

        }
    }
</script>

<style>
    .goods-bar{
        width:100vw;
        height:50px;
        position:fixed;
        left:0;
        bottom:0;
        background:#505052;
        color:#FFF;
        display:flex;
        align-items: center;
        justify-content: space-between;
        padding:0 12px;
    }
    .goods-bar-cart,.goods-bar-brand,.goods-bar-collect,.goods-bar-collect-active{
        width:36px;
        height:40px;
        background-size:78% auto;
        background-position: top center;
        background-repeat: no-repeat;
        padding-top:26px;
        text-align: center;
        transform: scale(0.9);
        color:#B0B0B0;
    }
    .goods-bar-cart{
        background-size:72% auto;
        background-image: url("../assets/cart.png");
    }
    .goods-bar-brand{
        background-size:70% auto;
        background-image: url("../assets/brand.png");
    }
    .goods-bar-collect{
        background-size:60% auto;
        background-position: center 12%;
        background-image: url("../assets/collect.png");
    }
    .goods-bar-collect-active{
        background-size:60% auto;
        background-position: center 12%;
        background-image: url("../assets/collect_active.png");
    }
    
    .goods-bar-buy,.goods-bar-addCart{
        width:110px;
        height:40px;
        border-radius: 20px;
        font-weight: 550;
        display:flex;
        align-items: center;
        justify-content: center;
    }
    .goods-bar-buy{
        background-color:#039EE6;
    }
    .goods-bar-addCart{
        background-color:#D0021B;
    }
</style>