<template>
    <div class="goods-item">
        <router-link :to="{name:'YohoGoods',params: {id:data.pro_code_bar}}" class="tabbar-item">
            <div class="goods-icon">
                <img v-lazy="data.pro_thumb + '!_400x400'" alt="" />
            </div>
            <div class="goods-name font-break">{{data.pro_name}}</div>
        </router-link>
        <div class="goods-price">￥{{data.pro_price}}<span :class="isCollect ? 'goods-add-collect-active' : 'goods-add-collect'" @click="addCollect"></span></div>
    </div>
</template>

<script>
    import { Lazyload } from 'mint-ui'
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'

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
        },
        methods: {
            addCollect(){
                this.$ajax.post((this.isCollect ? API.removeCollect : API.addCollect)(),{id: this.data.pro_code_bar}).then(res => {
                    console.log("收藏",res)
                    if(res.code === 200){
                        this.$store.commit("cart/initCollect", res.data)
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
    
    .goods-add-collect,.goods-add-collect-active{
        width: 16px;
        height: 16px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
    }
    .goods-add-collect{
        background-image: url('../assets/collect.png');
    }
    .goods-add-collect-active {
        background-image: url('../assets/collect_active.png');
    }
</style>