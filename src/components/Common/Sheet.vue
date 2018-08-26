<template>
    <div class="sheet-component" v-if="show">
        <div class="sheet-component-mask mask-show" @click="acionSheet"></div>
        <div :class="show ? 'putShow sheet-component-box' : 'putHidden sheet-component-box'">
            <div class="sheet-component-header">{{title}}</div>
            <vue-put-to class="sheet-component-content">
                <slot></slot>
            </vue-put-to>
            <div class="sheet-component-footer">
                <router-link to="/address/add" v-if="title === '收货地址'">+ 添加收货地址</router-link>
                <div @click="acionSheet" v-if="title !== '收货地址'">关闭</div>
            </div>
        </div>
    </div>
</template>
<style>

</style>
<script>
    import vuePutTo from 'vue-pull-to'
    import API from '@/util/api'

    export default {
        name: "Sheet",
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: {
                type: String
            }
        },
        data() {
            return {
                
            }
        },
        components: {
            vuePutTo
        },
        created() {

        },
        methods: {
            acionSheet() {
                this.$emit("toggle")
            }
        },
        activated() {

        },
        filters: {

        }
    }
</script>

<style>
    .sheet-component {
        width: 100vw;
        height: 100vh;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2000;
        overflow: hidden;
    }
    
    .sheet-component-mask {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-in;
    }
    .mask-show{
        animation-name: maskShow;
    }
    .mask-hidden{
        animation-name: maskHidden;
    }
    
    @keyframes maskShow {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
    @keyframes maskHidden {
        from {
            opacity: 1;
        }
        to {
            opacity: 0;
        }
    }
    
    .putShow {
        animation-name: upshow;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    
    .putHidden {
        animation-name: downhidden;
        animation-duration: .2s;
        animation-fill-mode: forwards;
        animation-timing-function: ease-out;
    }
    
    @keyframes upshow {
        from {
            bottom: -60vw;
        }
        to {
            bottom: 0px;
        }
    }
    @keyframes downhidden{
        from {
            bottom: 0px;
        }
        to {
            bottom: -70vh;
        }
    }
    
    .sheet-component-box {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100vw;
        height: 60vh;
        overflow: hidden;
        background: #FFF;
    }
    
    .sheet-component-header {
        width: 100%;
        height: 44px;
        line-height: 43px;
        font-size: 14px;
        font-weight: 700;
        padding: 0 12px;
        border-bottom: 1px solid #EEEFF0;
        background: #444;
        color: #FFF;
        text-align: center;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 20;
    }
    
    .sheet-component-content {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding-top: 44px;
        padding-bottom: 44px;
    }
    
    .sheet-component-footer {
        width: 100%;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #FBFCFD;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 20;
        background:#FFF;
    }
    
    .sheet-component-footer a,.sheet-component-footer div {
        flex: 1 1 auto;
        text-align: center;
        font-weight: 550;
        font-size: 14px;
        color: #333;
    }
</style>