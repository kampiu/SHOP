<template>
    <div id="app">
        <keep-alive>
            <router-view class="index-box"></router-view>
        </keep-alive>
    </div>
</template>

<script>
    export default {
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {

        },
        filters: {

        },
        watch: {

        }
    }
</script>

<style>
    * {
        padding: 0;
        margin: 0;
        font-size: 12px;
        box-sizing: border-box;
        -webkit-user-select: auto;
        -webkit-user-modify: none;
        font-family: PingFangSC-Semibold, sans-serif, Arial, Microsoft YaHei;
        -webkit-tap-highlight-color: transparent;
        -webkit-text-size-adjust: 100%;
        -webkit-font-smoothing: antialiased;
    }
    
    html,
    body {
        width: 100%;
        height: 100%;
    }
    
    img {
        width: 100%;
        height: 100%;
        vertical-align: top;
        -webkit-touch-callout: none;
        border: none;
    }
    
    a {
        text-decoration: none;
        color: inherit;
    }
    
    ul>li {
        list-style: none;
    }
    
    .font-break {
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 1;
    }
    
     ::-webkit-scrollbar {
        width: 0rem;
        height: 0rem;
        -webkit-appearance: none;
    }
    
     ::-webkit-scrollbar-track {
        background-color: transparent;
    }
    
     ::-webkit-scrollbar-thumb {
        border-radius: .3rem;
        background-color: #aaa;
    }
    
    .mint-toast {
        z-index: 8888;
    }
    
    .slide-left-enter-active,
    .slide-left-leave-active,
    .slide-right-enter-active,
    .slide-right-leave-active {
        will-change: transform;
        transition: all .3s;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }
    
    .slide-right-enter,
    .slide-right-leave-active {
        opacity: 0;
        transform: translate3d(-100%, 0, 0)
    }
    
    .slide-left-enter {
        opacity: 0;
        transform: translate3d(100%, 0, 0)
    }
    
    .slide-left-leave-active {
        opacity: 0;
        transform: translate3d(100%, 0, 0)
    }
    
    .nodata-icon {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 200px auto;
        background-image: url("./assets/nodata.png");
    }
</style>