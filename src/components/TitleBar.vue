<template>
    <div class="title-bar">
        <span v-if="back" class="title-nav-back" @click="toBack"></span>
        {{title}}
        <div class="title-toggle" @click="toggleBar" v-if="slice"></div>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: [String],
                default: "BillsonShop"
            },
            back: {
                type: [Boolean],
                default: false
            },
            slice:{
                type:[Boolean],
                default: false
            }
        },
        methods: {
            toggleBar() {
                this.$emit("toggleBar")
            },
            toBack(){
                window.history.go(-1)
            }
        }
    }
</script>

<style>
    .title-bar,.slicebar-title{
        width: 100%;
        height: 50px;
        background: #252A2F;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left:0;
        top:0;
        color:#FFF;
        font-size: 14px;
        font-weight: bold;
        z-index: 500;
    }
    
    .title-toggle {
        width: 24px;
        height: 24px;
        position: fixed;
        right: 20px;
        top: 13px;
        background-image: url('../assets/menu.png');
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
    }
    .title-nav-back {
        position: absolute;
        left: 20px;
        top: 14px;
        margin-top: 1.333333vw;
        margin-left: 1.333333vw;
        width: 12px;
        height: 12px;
        display: inline-block;
        border-bottom: .533333vw solid #fff;
        border-left: .533333vw solid #fff;
        -webkit-transform: rotate(45deg);
        transform: rotate(45deg);
        z-index: 300;
    }
</style>