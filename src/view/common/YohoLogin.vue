<template>
    <transition name="all-view-overlay">
        <div class="login-view">
            <div class="title-nav-back" @click="backTo"></div>
            <div class="to-regpage" @click="toRegister">注册</div>
            <img class="login-logo" src="../../assets/login-logo.png" alt="" />
            <div class="login-item">
                <i class="user-icon"></i>
                <input v-model="admin.acount" placeholder="Acount" value="" type="text" />
            </div>
            <div class="login-item">
                <i class="pwd-icon"></i>
                <input v-model="admin.code" placeholder="Password" value="" type="password" />
            </div>
            <div class="login-btn" @click="loginBtn">登录</div>
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
        name: "Login",
        data() {
            return {
                admin: {
                    acount: "billson",
                    code: "123456"
                }
            }
        },
        components: {

        },
        mounted() {

        },
        methods: {
            loginBtn() {
                this.admin.acount = this.admin.acount.replace(" ","")
                this.admin.code = this.admin.code.replace(" ","")
                this.admin.acount === "" && Toast({message: '账号不能为空!', duration: 1000})
                this.admin.code === "" && Toast({message: '密码不能为空!', duration: 1000})
                if(this.admin.acount === "" || this.admin.code === ""){
                    return
                }
                let data = {
                    pwd: CryptoJS.MD5(this.admin.code).toString(),
                    acount: this.admin.acount
                }
                this.$ajax.post(API.login(), data).then(res => {
                    if(res.code === 200) {
                        let {
                            token,
                            ...info
                        } = res.result
                        localStorage.setItem("yoho_billson_token", token)
                        document.cookie += ";token=" + token
                        this.$store.commit("user/getToken", token)
                        this.$store.commit("user/initInfo", info)
//                      this.$router.go(-1)
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            backTo() {
                this.$router.replace("/home")
            },
            toRegister() {
                this.$router.replace("/register")
            }
        },
        computed: {
            
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
    .login-view::before{
        content: "";
        width:100vw;
        height:100vh;
        position:absolute;
        left:0;
        top:0;
        background: -webkit-linear-gradient(-45deg, #B5E5E9 20%, #2F3152);
        transform: scale(1.2);
        filter: blur(40px);
        z-index: -1;
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
    .to-regpage {
        position: fixed;
        right: 20px;
        top: 16px;
        width: 40px;
        height: 26px;
        line-height: 26px;
        color: #FFF;
        font-size: 14px;
        font-weight: bold;
    }
    
    .to-regpage::before {
        content: "";
        position: absolute;
        right: -4px;
        top: 0;
        margin-top: 5px;
        margin-left: 5px;
        width: 10px;
        height: 10px;
        display: inline-block;
        border-bottom: .533333vw solid #fff;
        border-left: .533333vw solid #fff;
        transform: rotate(-135deg);
        z-index: 300;
    }
    
    .login-logo {
        width: 180px;
        height:auto;
        margin: 20px auto 30px auto;
    }
    
    .login-item {
        width: 300px;
        height: 44px;
        display: flex;
        align-items: center;
        background: #FFF;
        justify-content: flex-start;
        margin: 4px auto;
    }
    
    .login-item>i {
        background-repeat: no-repeat;
        background-size: 20px auto;
        background-position: center center;
        width: 50px;
        height: 20px;
    }
    
    i.user-icon {
        background-image: url('../../assets/user.png');
    }
    
    i.pwd-icon {
        background-image: url('../../assets/pwd.png');
    }
    
    .login-item input {
        flex: 1 1 auto;
        line-height: 44px;
        -webkit-appearance: none;
        border: none;
        font-size: 13px;
        outline: none;
    }
    
    .login-btn {
        width: 300px;
        height: 44px;
        text-align: center;
        line-height: 42px;
        background: #FFF;
        color: #3B83C4;
        font-size: 14px;
        font-weight: 700;
        margin-top: 20px;
        box-shadow: 0 2px 7px rgba(0, 0, 0, .15);
    }
</style>