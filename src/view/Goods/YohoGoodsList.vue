<template>
    <div class="goodslist-view">
        <drawer-layout ref="drawer" :drawer-width="280" :enable="true" :reverse="true" :animatable="true" :z-index="1200" :content-drawable="true" :backdrop="true" :backdrop-opacity-range="[0,0.4]" @mask-click="toggleBar">
            <div class="drawer-content" slot="drawer">
                <div class="slicebar-title">选择品类</div>
                <ul class="slicebar-content">
                    <li v-for="(item, index) in cate" :key="item.class_yoho_id + item.class_name" @click="setType" :data-type="item.class_yoho_id"><span :style="{backgroundImage: 'url(' + item.class_icon + '!_140X140)'}"></span>{{item.class_name}}</li>
                </ul>
            </div>
            <div slot="content">
                <tielt-bar title="商品列表" :back="true" @toggleBar="toggleBar" :slice="true"></tielt-bar>
                <div class="goodslist-menu">
                    <div class="goodslist-nav">综合</div>
                    <div class="goodslist-nav">销量</div>
                    <div class="goodslist-nav">价格</div>
                    <div class="goodslist-nav">{{cateType}}</div>
                </div>
                <vue-put-to :class="noData ? 'title-scroll-view nodata-icon' : 'title-scroll-view'" :bottom-load-method="loadmore" :bottom-config="load" :top-load-method="refresh" :top-config="reduction">
                    <goods-item v-for="(item, index) in goods" :data="item" :key="item.pro_code_bar + 'goodslist'"></goods-item>
                </vue-put-to>
            </div>
        </drawer-layout>
    </div>
</template>

<script>
    import { DrawerLayout } from 'vue-drawer-layout'
    import GoodsItem from "@/components/GoodsItem"
    import TieltBar from '@/components/TitleBar'
    import { Lazyload, Indicator, Toast } from 'mint-ui'
    import vuePutTo from 'vue-pull-to'
    import config from '@/util/config'
    import API from '@/util/api'
    import {
        mapGetters
    } from 'vuex'

    export default {
        name: "GoodsList",
        data() {
            return {
                load: config.loadmore,
                reduction: config.refresh,
                cate: [],
                cateType: "全部",
                noData: false,
                noMore: false
            }
        },
        components: {
            DrawerLayout,
            GoodsItem,
            TieltBar,
            Lazyload,
            vuePutTo
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                if(vm.refresh) {
                    vm.initData()
                }
            })
        },
        created() {
            this.getCate()
        },
        methods: {
            toggleBar() {
                this.$refs.drawer && this.$refs.drawer.toggle()
            },
            loadData(callback) {
                if(this.noMore) return
                this.$ajax.get(API.getGoods(this.pages, 20, this.type)).then(res => {
                    if(res.code === 200) {
                        this.$store.commit("goods/loadMore", res.result)
                        if(res.result.length < 20) {
                            this.noMore = true
                        }
                    }
                    callback && callback()
                })
            },
            initData(callback) {
                if(this.noData) return
                Indicator.open('加载中...')
                this.$store.commit("goods/setpages", 1)
                this.$ajax.get(API.getGoods(1, 20, this.type)).then(res => {
                    if(res.code === 200) {
                        this.$store.commit("goods/initGoods", res.result)
                        if(res.result.length === 0) {
                            this.noData = true
                            Toast({
                                message: '暂无更多数据',
                                duration: 800
                            })
                        }
                    }
                    Indicator.close()
                    callback && callback()
                })
            },
            getCate() {
                this.$ajax.get(API.getCate("all")).then(res => {
                    if(res.code === 200) {
                        this.cate = res.result
                    }
                })
            },
            refresh(loaded) {
                this.initData(() => {
                    loaded('done')
                })
            },
            setType(e) {
                this.noData = false
                this.noMore = false
                this.$store.commit("goods/setType", e.target.dataset.type)
                this.initData()
                this.$refs.drawer && this.$refs.drawer.toggle()
            },
            loadmore(loaded) {
                let page = parseInt(this.pages) + 1
                this.$store.commit("goods/setpages", parseInt(this.pages) + 1)
                this.loadData(() => {
                    loaded('done')
                })
            }
        },
        activated() {

        },
        beforeRouteLeave(to, from, next) {
            this.noData = false
            this.noMore = false
            next()
        },
        computed: {
            ...mapGetters([
                'router',
                'goods',
                'type',
                'brand',
                'pages'
            ])
        },
        filters: {

        }
    }
</script>

<style>
    .goodslist-view {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
    }
    
    .content-wrap>div {
        height: 100vh
    }
    
    .title-scroll-view {
        width: 100vw;
        height: 100vh;
        background: #FBFCFD;
        padding-top: 90px;
    }
    
    .nodata-icon {
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 200px auto;
        background-image: url("../../assets/nodata.png");
    }
    
    .slicebar-content {
        width: 100%;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        padding: 50px 6px 10px 16px;
    }
    
    .slicebar-content li {
        width: 100%;
        height: 53px;
        line-height: 52px;
        border-bottom: 1px solid #FAFAFA;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        padding-left: 65px;
        position: relative;
        font-weight: 550;
    }
    
    .slicebar-content li span {
        position: absolute;
        left: 8px;
        top: 6px;
        width: 40px;
        height: 40px;
        background-size: 100% auto;
        background-position: center center;
        background-repeat: no-repeat;
    }
    
    .goodslist-menu {
        width: 100vw;
        height: 36px;
        position: absolute;
        left: 0;
        top: 50px;
        display: flex;
        align-items: center;
    }
    
    .goodslist-nav {
        width: 25vw;
        height: 36px;
        border-right: 1px solid #EFEFEF;
        border-bottom: 1px solid #EFEFEF;
        display: flex;
        justify-content: center;
        align-items: center;
        background: #FFF;
        position: relative;
        z-index: 200;
    }
</style>