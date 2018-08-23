<template>
    <transition name="all-view-overlay">
        <div class="address-view">
            <div class="title-bar">
                <span class="title-nav-back" @click="toBack"></span> 收货地址
                <div class="address-add" @click="toAdd">新增地址</div>
            </div>
            <vue-put-to class="address-view-scroll" :top-load-method="refresh" :top-config="scrollConfigTop">
                <cell-swipe :right="adrSetItem" v-for="(item, index) in addressList" :key="item.adr_id + 'adr-item'" :data-id="item.adr_id">
                    <div class="address-item">
                        <div class="address-location font-break">{{item.adr_location}} {{item.adr_info}}</div>
                        <div class="address-consignee font-break">
                            <div>{{item.adr_consignee}}<span>{{item.adr_caller | call}}</span></div>
                            <div>{{item.adr_tell}}</div>
                        </div>
                        <router-link :to="'/address/edit/' + item.adr_id" class="address-edit"></router-link>
                    </div>
                </cell-swipe>
            </vue-put-to>
        </div>
    </transition>
</template>
<style>

</style>

<script>
    import config from '@/util/config'
    import vuePutTo from 'vue-pull-to'
    import { Toast, CellSwipe, MessageBox } from 'mint-ui'
    import API from '@/util/api'
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                scrollConfigTop: config.refresh,
                addressList: [],
                History: "",
                adrSetItem: [{
                    content: '删除',
                    style: {
                        background: 'red',
                        color: '#fff',
                        width: "66px",
                        textAlign: "center",
                        lineHeight: "66px"
                    },
                    handler: this.remove
                }]
            }
        },
        components: {
            MessageBox,
            CellSwipe,
            vuePutTo
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                if(from.name !== 'addressEdit' && from.name !== 'addressAdd') {
                    vm.History = from.path
                }
                if(vm.userAddress.length === 0) {
                    vm.getAddress()
                }
            })
        },
        created() {

        },
        methods: {
            getAddress(callback) {
                this.$ajax.get(API.getAddress()).then(res => {
                    this.addressList = res.data
                    res.code === 200 && this.$store.commit("address/initAdrList", res.data)
                    res.code === 200 && Toast({
                        message: '获取收货地址成功!',
                        duration: 1000
                    })
                    callback && callback()
                }).catch(err => {
                    Toast({
                        message: '获取地址列表失败!',
                        duration: 1000
                    })
                })
            },
            refresh(loaded) {
                this.getAddress(() => {
                    loaded('done')
                })
            },
            toBack() {
                this.$router.replace(this.History)
            },
            toAdd() {
                this.$router.push({
                    path: '/address/add'
                })
            },
            remove() {
                let id = event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
                MessageBox.confirm('确定移除该收货地址?').then((action) => {
                    this.$ajax.post(API.removeAddress(), {
                        id: id
                    }).then(res => {
                        if(res.code === 200) {
                            this.$store.commit("address/removeAddress", id)
                        }
                        Toast({
                            message: res.msg,
                            duration: 1000
                        })
                    })
                }).catch(err => {})
            }
        },
        computed: {
            ...mapGetters([
                'userAddress'
            ])
        },
        activated() {
            this.addressList = this.userAddress
        },
        filters: {
            call(caller) {
                return caller == 1 ? '先生' : '小姐'
            }
        }
    }
</script>

<style>
    .title-bar,
    .slicebar-title {
        width: 100%;
        height: 50px;
        background: #252A2F;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        left: 0;
        top: 0;
        color: #FFF;
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
        background-image: url('../../assets/menu.png');
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
    
    .address-view {
        padding-top: 50px;
        width: 100vw;
        height: 100vh;
    }
    
    .address-add {
        width: 70px;
        height: 50px;
        position: absolute;
        right: 0;
        top: 0;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    .address-view-scroll {
        background: #FFF;
    }
    
    .mint-cell-value {
        width: 100vw;
    }
    
    .address-item {
        width: 100%;
        height: 66px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 5px 60px 5px 4px;
        position: relative;
        border-bottom: 1px solid #F0F0F0;
        background: #FFF;
    }
    
    .address-location,
    .address-consignee {
        line-height: 28px;
        width: 100%;
        height: 28px;
        overflow: hidden;
        color: #333;
    }
    
    .address-location {
        font-weight: 550;
        font-size: 14px;
    }
    
    .address-consignee>div {
        display: inline-block;
        margin-right: 12px;
    }
    
    .address-consignee>div span {
        margin-left: 12px;
    }
    
    .address-edit {
        position: absolute;
        right: 0;
        top: 0;
        width: 60px;
        height: 66px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-size: 16px auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('../../assets/edit.png');
    }
</style>