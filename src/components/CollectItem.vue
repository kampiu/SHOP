<template>
    <div class="search-item">
        <div class="search-item-icon">
            <img v-lazy="data.pro_thumb + '!_400x400'" />
        </div>
        <div class="search-item-context">
            <div class="search-item-name font-break">{{data.pro_name}}</div>
            <div class="search-item-brand">{{data.pro_brand}}</div>
            <div class="search-item-price">￥{{data.pro_price}}<span class="goods-add-collect-active" @click="toggleCollect"></span></div>
        </div>
    </div>
</template>

<script>
    import { MessageBox } from 'mint-ui'
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from "@/util/api"

    export default {
        name: "CollectItem",
        props: {
            data: {
                type: [Object]
            }
        },
        components: {
            MessageBox
        },
        methods: {
            toggleCollect() {
                MessageBox.confirm('确定取消收藏该商品?').then((action) => {
                    this.$ajax.post(API.removeCollect(), {
                        id: this.data.pro_code_bar
                    }).then(res => {
                        console.log("收藏", res)
                        if(res.code === 200) {
                            this.$store.commit("cart/initCollect", res.result)
                        } else {
                            Toast({
                                message: res.msg,
                                duration: 800
                            })
                        }
                    }).catch(err => {
                        console.log("添加收藏失败", err)
                    })
                }).catch(err => {})
            }
        }
    }
</script>

<style>
    .search-item {
        width: 96vw;
        margin: 6px 2vw;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: space-between;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
    
    .search-item-icon {
        width: 20vw;
        height: 26vw;
        overflow: hidden;
    }
    
    .search-item-icon img {
        height: 100%;
        width: auto;
        margin-left: 50%;
        transform: translateX(-50%);
    }
    
    .search-item-context {
        width: 76vw;
        padding: 10px;
        height: 26vw;
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        flex-direction: column;
        background: #F8F8F8;
    }
    
    .search-item-context>div {
        width: 100%;
        display: flex;
        align-items: center;
    }
    
    .search-item-name {
        font-weight: 550;
        line-height: 4vw;
        font-size: .24rem;
        color: #333;
    }
    
    .search-item-brand {
        color: #666;
        font-size: .24rem;
    }
    
    .search-item-price {
        color: #D0021B;
        font-size: .24rem;
        font-weight: 550;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    
    .goods-add-collect,
    .goods-add-collect-active {
        width: 16px;
        height: 16px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
    }
    
    .goods-add-collect {
        background-image: url('../assets/collect.png');
    }
    
    .goods-add-collect-active {
        background-image: url('../assets/collect_active.png');
    }
</style>