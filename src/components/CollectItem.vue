<template>
    <div class="search-item">
        <div class="search-item-icon">
            <img v-lazy="data.pro_thumb + '!_400x400'" />
        </div>
        <div class="search-item-context">
            <div class="search-item-name font-break">{{data.pro_name}}</div>
            <div class="search-item-brand">{{data.pro_brand}}</div>
            <div class="search-item-price">￥{{data.pro_price}}<span class="search-collect"></span></div>
        </div>
    </div>
</template>

<script>
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'

    export default {
        name: "CollectItem",
        props: {
            data: {
                type: [Object]
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
        background:#F8F8F8;
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
    }
    
    .search-item-price span {
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
        margin-left: auto;
        margin-right: 12px;
    }
    
    .search-collect {
        background-image: url("../assets/collect.png");
    }
    
    .search-collect-active {
        background-image: url("../assets/collect_active.png");
    }
</style>