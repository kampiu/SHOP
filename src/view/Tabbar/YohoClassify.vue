<template>
    <div class="cate-view">
        <tielt-bar title="分类"></tielt-bar>
        <vue-put-to class="home-scroll-view" :top-load-method="refresh" :top-config="reduction">
            <div class="cate-menu" v-for="(item, index) in cate" :key="item.class_level_id + item.title">
                <span>{{item.title}}</span>
                <div class="nav-item" v-for="(_item, _index) in item.cate" :key="_item.class_yoho_id + 'cate'" :style="{backgroundImage:'url(' + _item.class_icon + ')'}" @click="toList" :data-type="_item.class_yoho_id">{{_item.class_name}}</div>
            </div>
        </vue-put-to>
    </div>
</template>

<script>
    import TieltBar from '@/components/TitleBar'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from "@/util/api"
    import {
        mapGetters
    } from 'vuex'
    
    export default {
        name: "CareView",
        data() {
            return {
                reduction: config.refresh
            }
        },
        components: {
            TieltBar,
            vuePutTo
        },
        created() {
            this.initData()
        },
        methods: {
            refresh(loaded) {
                this.initData(() => {
                    loaded('done')
                })
            },
            initData(callback){
                this.$ajax.get(API.getCate()).then(res => {
                    if(res.code === 200){
                        this.$store.commit("common/initCate",res.result)
                    }
                    callback && callback()
                }).catch(err => {
                    console.log("获取分类错误",err)
                })
            },
            toList(e){
                this.$store.commit("goods/setType",e.target.dataset.type)
                this.$router.push({ name: 'YohoGoodsList', params: { refresh: true }})
            }
        },
        computed: {
            ...mapGetters([
                'cate'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .cate-view{
        width:100vw;
        height:100vh;
        padding:50px 0;
        background:#F7F7F7;
    }
    .cate-menu{
        width:100vw;
        overflow: hidden;
        padding:36px 0 12px 3vw;
        position:relative;
        margin-top:12px;
    }
    .cate-menu::after,.cate-menu::before{
        content: "";
        width:6vw;
        height:1px;
        background:#DEDEDE;
        position:absolute;
        top:8px;
    }
    .cate-menu::before{
        left:35vw;
    }
    .cate-menu::after{
        right:35vw;
    }
    .cate-menu span{
        position:absolute;
        display:inline-block;
        top:0;
        left:43vw;
        width:14vw;
        height:16px;
        text-align: center;
        line-height: 16px;
        font-size: 14px;
    }
    .nav-item{
        width:22vw;
        height:32vw;
        background-size:88% auto;
        background-position: center 20%;
        background-repeat: no-repeat;
        padding-top:28vw;
        background-color:#FFF;
        font-weight: 550;
        color:#333;
        text-align: center;
        margin-bottom:12px;
        float:left;
        margin-right:2vw;
        padding-bottom:30px;
        border-bottom:1px solid #DEDEDE;
    }
</style>