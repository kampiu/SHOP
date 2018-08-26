<template>
    <transition name="slide-left">
        <div class="address-view">
            <div class="title-bar">
                <span class="title-nav-back" @click="toBack"></span> {{templateName === "YohoAddressAdd" ? '添加地址' : '修改地址'}}
            </div>
            <vue-put-to class="address-view-scroll">
                <div class="add-adr-item">
                    <div class="add-adr-item-name">联系人:</div>
                    <input v-model="edit.name" @keyup="checkData" type="text" placeholder="请填写收货人的姓名" />
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-item-name"></div>
                    <div class="add-adr-caller">
                        <label>
                        <input @change="callerSelect" type="radio" :checked="edit.caller == 1 ? true : false" name="caller" id="" value="1" />
                        <span>先生</span>
                    </label>
                        <label>
                        <input @change="callerSelect" type="radio" :checked="edit.caller == 0 ? true : false" name="caller" id="" value="0" />
                        <span>女士</span>
                    </label>
                    </div>
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-item-name">手机号码:</div>
                    <input v-model="edit.phone" @keyup="checkData" type="number" placeholder="请填写手机号码" />
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-item-name">收货地址:</div>
                    <div class="add-adr-map" @click="toMap" :style="{color: edit.location == '' ? '#757575' : '#333'}">
                        {{edit.location == '' ? '点击选择' : edit.location}}
                    </div>
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-item-name">门牌号:</div>
                    <input v-model="edit.msg" @keyup="checkData" type="text" placeholder="列：16号楼5层301室" />
                </div>
                <div class="add-adr-item">
                    <div class="add-adr-btn" :style="{background: canPost ? '#0387FF' : '#8BC6FA'}" @click="saveAdr">保存地址</div>
                </div>
            </vue-put-to>
            <iframe src="https://api.map.baidu.com/res/staticPages/location.html?timeout=5000&maximumAge=600000" width="0" height="0"></iframe>
        </div>
    </transition>
</template>

<script>
    import vuePutTo from 'vue-pull-to'
    import API from '@/util/api'
    import { Toast } from 'mint-ui'
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                edit: {
                    name: "",
                    caller: 1,
                    phone: "",
                    location: "",
                    msg: "",
                    lat: "",
                    lng: ""
                },
                History: "",
                canPost: false,
                templateName: "",
                transitionName:"slide-left"
            }
        },
        components: {
            vuePutTo
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                console.log(to.name)
                if((to.name === "YohoAddressAdd" || to.name === "YohoAddressEdit") && from.name !== "YohoAddressMap") {
                    vm.templateName = to.name
                    vm.initForm()
                }
                if(from.name !== "YohoAddressMap") {
                    vm.History = from.path
                }
            })
        },
        beforeRouteLeave: function(to, from, next) {
            if(to.name !== 'YohoAddressMap') { //此处判断是如果返回上一层，摧毁本层缓存。
                if(this.$vnode && this.$vnode.data.keepAlive) {
                    if(this.$vnode.parent && this.$vnode.parent.componentInstance && this.$vnode.parent.componentInstance.cache) {
                        if(this.$vnode.componentOptions) {
                            let key = this.$vnode.key == null ?
                                this.$vnode.componentOptions.Ctor.cid + (this.$vnode.componentOptions.tag ? `::${this.$vnode.componentOptions.tag}` : '') :
                                this.$vnode.key
                            let cache = this.$vnode.parent.componentInstance.cache
                            let keys = this.$vnode.parent.componentInstance.keys
                            if(cache[key]) {
                                if(keys.length) {
                                    let index = keys.indexOf(key)
                                    if(index > -1) {
                                        keys.splice(index, 1);
                                    }
                                }
                                delete cache[key]
                            }
                        }
                    }
                }
                this.$destroy()
            }
            this.transitionName = (from.name === "YohoAddressMap" ? 'slide-right' : 'slide-left')
            next()
        },
        created() {

        },
        methods: {
            toBack() {
                this.$router.replace(this.History)
            },
            initForm() {
                if(this.$route.params.id) {
                    for(let key of this.userAddress) {
                        if(key.adr_id == this.$route.params.id) {
                            this.edit = {
                                name: key.adr_consignee,
                                caller: key.adr_caller,
                                phone: key.adr_tell,
                                location: key.adr_location,
                                msg: key.adr_info,
                                lat: key.adr_lat,
                                lng: key.adr_lng
                            }
                            break
                        }
                    }
                    this.checkData()
                } else {
                    this.edit = {
                        name: "",
                        caller: 1,
                        phone: "",
                        location: "",
                        msg: ""
                    }
                }
            },
            callerSelect(e) {
                this.edit.caller = parseInt(e.target.value)
            },
            checkData() {
                if(/^[\u4e00-\u9fa5_a-zA-Z.]{2,16}$/.test(this.edit.name) && /^1[3|5|7|8|]\d{9}$/.test(this.edit.phone) && /^[\u4e00-\u9fa5_a-zA-Z0-9()（），。,.]{4,50}$/.test(this.edit.location) && /^[\u4e00-\u9fa5_a-zA-Z0-9()（），。,.]{3,40}$/.test(this.edit.msg)) {
                    this.canPost = true
                } else {
                    this.canPost = false
                }
            },
            selectAdr() {
                if(this.adrSelect.adr !== "") {
                    this.edit.location = this.adrSelect.location
                    this.edit.lat = /^\d{0,3}(\.\d{1,})?$/.test(this.adrSelect.point.lat) && (parseFloat(this.adrSelect.point.lat) >= -90 && parseFloat(this.adrSelect.point.lat) <= 90) ? this.adrSelect.point.lat : ''
                    this.edit.lng = /^\d{0,3}(\.\d{1,})?$/.test(this.adrSelect.point.lng) && (parseFloat(this.adrSelect.point.lng) >= -180 && parseFloat(this.adrSelect.point.lng) <= 180) ? this.adrSelect.point.lng : ''
                }
            },
            saveAdr() {
                if(!this.canPost) return
                let data = {
                    id: this.$route.params.id || '',
                    tell: this.edit.phone,
                    info: this.edit.msg,
                    lat: this.edit.lat,
                    lng: this.edit.lng,
                    address: this.edit.location,
                    consignee: this.edit.name,
                    caller: /^[0|1]{1}$/.test(this.edit.caller) ? this.edit.caller : 2
                }
                this.$ajax.post((this.$route.name === 'YohoAddressAdd' ? API.addAddress : API.modifyAddress)(), data).then(res => {
                    console.log(res)
                    if(res.code === 200) {
                        Toast({
                            message: (this.$route.name === 'YohoAddressAdd' ? '添加成功!' : '修改成功'),
                            duration: 1000
                        })
                        let _d = {
                            adr_caller: data.caller,
                            adr_consignee: data.consignee,
                            adr_default: 0,
                            adr_id: res.result.id,
                            adr_info: data.info,
                            adr_lat: data.lat,
                            adr_lng: data.lng,
                            adr_location: data.address,
                            adr_tell: data.tell
                        }
                        this.$store.commit(this.$route.name === "YohoAddressAdd" ? "address/pushAddress" : "address/updateAddress", _d)
                        this.toBack()
                    } else {
                        Toast({
                            message: (this.$route.name === 'YohoAddressAdd' ? '添加失败222!' : '修改失败'),
                            duration: 1000
                        })
                    }
                }).catch(err => {
                    Toast({
                        message: (this.$route.name === 'YohoAddressAdd' ? '添加失败333!' : '修改失败'),
                        duration: 1000
                    })
                })
            },
            toMap() {
                this.$router.push({
                    path: "/address/map"
                })
            }
        },
        activated() {
            this.selectAdr()
            this.checkData()
        },
        computed: {
            ...mapGetters([
                'userAddress',
                'adrSelect'
            ])
        },
        filters: {

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
    
    .add-adr-scroll {
        width: 100%;
        padding-left: 20px;
        background: #FFF;
    }
    
    .address-view {
        background: #FFF;
    }
    
    .address-view-scroll {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100vh;
        padding: 50px 0 10px 16px;
        background: #FFF;
    }
    
    .add-adr-item {
        width: 100%;
        height: 47px;
        border-bottom: 1px solid #F0F0F0;
        display: flex;
        align-items: center;
        padding: 0 20px 0 2px;
    }
    
    .add-adr-item-name {
        width: 80px;
        flex: 0 0 auto;
        min-height: 46px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        font-weight: 550;
        font-size: 14px;
    }
    
    .add-adr-item input,
    .add-adr-caller,
    .add-adr-map {
        height: 42px;
        -webkit-appearance: none;
        border: none;
        outline: none;
        flex: 1 1 auto;
        color: #333;
    }
    
    .add-adr-map {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        color: #757575;
    }
    
    .add-adr-caller label {
        width: 100px;
        height: 42px;
        display: flex;
        align-items: center;
    }
    
    .add-adr-caller {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }
    
    .add-adr-caller input[type=radio] {
        flex: 0 0 auto;
        -webkit-appearance: none;
        width: 20px;
        height: 20px;
        margin-right: 12px;
        border-radius: 50%;
        border: 1px solid #9B9B9B;
    }
    
    .add-adr-caller input[type=radio]:checked {
        background-color: #FFF;
        background-image: url('../../assets/checked.png');
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 22px auto;
        border: none;
    }
    
    .add-adr-item:last-child {
        border: none;
    }
    
    .add-adr-btn {
        width: 86vw;
        height: 36px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        font-weight: 550;
        color: #FFF;
        background: #0387FF;
        margin: 10px auto;
    }
</style>