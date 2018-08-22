<template>
    <transition name="all-view-overlay">
        <div class="login-view">
            <div class="title-nav-back" @click="backTo"></div>
            <img class="login-logo" src="../../assets/login-logo.png" alt="" />
            <div class="login-item">
                <i class="user-icon"></i>
                <input v-model="admin.acount" @keyup="checkData" placeholder="Acount" value="" type="text" />
            </div>
            <div class="login-item">
                <i class="pwd-icon"></i>
                <input v-model="admin.code" @keyup="checkData" placeholder="Password" value="" type="password" />
            </div>
            <div class="login-item">
                <i class="phone-icon"></i>
                <input v-model="admin.phone" @keyup="checkData" placeholder="Phone" value="" type="number" />
            </div>
            <div class="sms-item">
                <i class="sms-icon"></i>
                <input @keyup="checkData" autocomplete="off" v-model="admin.sms" placeholder="Code" value="" type="number" />
                <div class="sms-btn" :style="{color: smsFlag ? '#3B83C4' : '#D0D0D0'}" @click="toSendSms">{{countDown === null ? 'Send' : countDown}}</div>
            </div>
            <div class="login-btn" :style="{color: regFlag ? '#3B83C4' : '#D0D0D0'}" @click="toRegister">注册</div>
        </div>
    </transition>
</template>
<style>

</style>
<script>
    import CryptoJS from 'crypto-js'
    import API from '@/util/api'
    import { Toast } from 'mint-ui'

    export default {
        data() {
            return {
                admin: {
                    acount: "",
                    code: "",
                    phone: "",
                    sms: ""
                },
                smsFlag: false,
                regFlag: false,
                countDown: null,
                time: null
            }
        },
        components: {

        },
        mounted() {

        },
        methods: {
            backTo() {
                this.$router.replace("/login")
            },
            checkData() {
                this.smsFlag = /^1[3|5|7|8|]\d{9}$/.test(this.admin.phone) ? true : false
                if(/^[_A-Za-z0-9]{6,}$/gi.test(this.admin.acount) && /^\d{6,16}$/gi.test(this.admin.code) && /^1[3|5|7|8|]\d{9}$/.test(this.admin.phone)) {
                    if(/^[0-9]{6}$/.test(this.admin.sms)) {
                        this.regFlag = true
                    } else {
                        this.regFlag = false
                    }
                } else {
                    this.regFlag = false
                }
            },
            toSendSms() {
                if(!this.smsFlag) return
                this.$ajax.post(API.getPhoneCode(), {
                    phone: this.admin.phone
                }).then(res => {
                    if(res.code === 200) {
                        Toast({
                            message: '验证码发送成功!',
                            duration: 1000
                        })
                        this.countDown = 60
                        this.time = setInterval(() => {
                            this.countDown--
                        }, 1000)
                    }
                }).catch(err => {
                    Toast({
                        message: '获取验证码失败!',
                        duration: 1000
                    })
                })
            },
            toRegister() {
                if(!this.regFlag) return
                let data = {
                    pwd: CryptoJS.MD5(this.admin.code).toString(),
                    acount: this.admin.acount,
                    phone: this.admin.phone,
                    code: this.admin.sms
                }
                this.$ajax.post(API.register(), data).then(res => {
                    if(res.code === 200) {
                        Toast({
                            message: '注册成功!',
                            duration: 1000
                        })
                        let {
                            token: token,
                            ...info
                        } = res.result
                        localStorage.setItem("yoho_billson_token", token)
                        this.$store.commit("user/getToken", token)
                        this.$store.commit("user/initInfo", info)
                        this.$router.go(-1)
                    } else {
                        Toast({
                            message: res.msg,
                            duration: 1000
                        })
                    }
                }).catch(err => {
                    console.log("注册失败!", err)
                })
            }
        },
        beforeRouteLeave(to, from, next) {
            this.time = null
            this.countDown = null
            this.admin = {
                acount: "",
                code: "",
                phone: "",
                sms: ""
            }
            this.smsFlag = false
            this.regFlag = false
        },
        watch: {
            'countDown' (to, from) {
                console.log(to, from)
            }
        }
    }
</script>

<style>
    .login-view {
        overflow: hidden;
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20vh 0 0 0;
        position: relative;
    }
    
    .login-view::before {
        content: "";
        width: 100vw;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        background: -webkit-linear-gradient(-45deg, #B5E5E9 20%, #2F3152);
        transform: scale(1.2);
        filter: blur(40px);
        z-index: -1;
    }
    
    .login-logo {
        width: 180px;
        margin: 20px auto 30px auto;
    }
    
    .login-item,
    .sms-item {
        width: 300px;
        height: 44px;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        margin: 4px auto;
    }
    
    .login-item {
        background: #FFF;
    }
    
    .login-item>i,
    .sms-item>i {
        background-repeat: no-repeat;
        background-size: 20px auto;
        background-position: center center;
        width: 50px;
        height: 44px;
        background-color: #FFF;
    }
    
    i.user-icon {
        background-image: url('../../assets/user.png');
    }
    
    i.pwd-icon {
        background-image: url('../../assets/pwd.png');
    }
    
    i.sms-icon {
        background-image: url('../../assets/sms.png');
    }
    
    i.phone-icon {
        background-image: url('../../assets/phone.png');
    }
    
    .login-item input {
        flex: 1 1 auto;
        line-height: 44px;
        -webkit-appearance: none;
        border: none;
        font-size: 13px;
        outline: none;
    }
    
    .sms-item>input {
        flex: 0 0 auto;
        line-height: 44px;
        -webkit-appearance: none;
        border: none;
        font-size: 13px;
        outline: none;
        width: 130px;
        margin-right: 10px;
    }
    
    .sms-btn {
        flex: 1 1 auto;
        background: #FFF;
        text-align: center;
        color: #3B83C4;
        line-height: 44px;
        font-size: 14px;
        font-weight: 550;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
    
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
    }
    
    input[type="number"] {
        -moz-appearance: textfield;
    }
    
    .login-btn {
        width: 300px;
        height: 44px;
        text-align: center;
        line-height: 42px;
        background: #FFF;
        color: #3B83C4;
        font-size: 14px;
        font-weight: 900;
        margin-top: 20px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
</style>