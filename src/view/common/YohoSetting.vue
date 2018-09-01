<template>
    <transition name="slide-left">
        <div class="setting-view">
            <tielt-bar title="设置" :back="true"></tielt-bar>
            <vue-put-to class="order-view-scroll" :bottom-load-method="loadmore" :bottom-config="scrollConfigBottom" :top-load-method="refresh" :top-config="scrollConfigTop">
                <div class="setting-head setting-item">
                    <div class="setting-icon">
                        <img @click="setImg" :src="picurl" alt="" />
                    </div>
                </div>
                <div class="setting-item-menu">
                    <div class="setting-item">昵称<span>{{nickname}}</span></div>
                    <div class="setting-item">性别<span>{{sex}}</span></div>
                    <div class="setting-item">邮箱<span>{{email}}</span></div>
                </div>
            </vue-put-to>
        </div>
    </transition>
</template>
<style>

</style>
<script>
    import TieltBar from '@/components/TitleBar'
    import vueCropper from 'vue-cropper'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "CollectView",
        data() {
            return {
                scrollConfigBottom: config.refresh,
                scrollConfigTop: config.loadmore
            }
        },
        components: {
            vueCropper,
            vuePutTo,
            TieltBar
        },
        created() {

        },
        methods: {
            setImg() {

            },
            refresh(loaded) {
                loaded('done')
            },
            loadmore(loaded) {
                loaded('done')
            },
            toHome() {
                this.$router.replace("/personal")
            }
        },
        computed: {
            ...mapGetters([
                'nickname',
                'picurl',
                'email',
                'sex'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .setting-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        padding-top: 50px;
    }
    
    .setting-view .scroll-container {
        background: #F5F5F5;
    }
    
    .setting-item {
        width: 100%;
        min-height: 46px;
        display: flex;
        margin-top: 10px;
        align-items: center;
        justify-content: space-between;
        background: #FFF;
        padding: 0 38px 0 16px;
        position: relative;
        font-weight: 550;
        color:#333;
    }
    
    .setting-item::before {
        content: "";
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-50%);
        width: 16px;
        height: 16px;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
        background-image: url("../../assets/right_icon.png");
    }
    
    .setting-item span {
        color: #999;
        font-weight: normal;
    }
    
    .setting-item-menu {
        margin-top: 10px;
        padding-left: 16px;
        background: #FFF;
    }
    
    .setting-item-menu .setting-item {
        margin-top: 0;
        border-bottom: 1px solid #F8F8F8;
    }
    
    .setting-item-menu .setting-item:last-child {
        border: none;
    }
    
    .setting-head {
        height: 78px;
    }
    
    .setting-icon {
        width: 58px;
        margin: 10px;
        height: 58px;
        overflow: hidden;
    }
</style>