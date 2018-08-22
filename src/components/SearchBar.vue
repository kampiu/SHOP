<template>
    <div class="search-bar" :style="{backgroundColor: flag ? 'rgba(32,32,32,0.9)' : isFocus ? 'rgba(59,59,59,0.8)' : 'rgba(0,0,0,0)'}">
        <div :class="isFocus ? 'search-bar-nav search-bar-hide' : 'search-bar-nav'">
            <div class="search-slide-menu" @click="toggleBar"></div>
        </div>
        <div class="search-bar-input" :style="{width:isFocus ? '7.2rem' : '5.78rem'}">
            <div class="search-view">
                <div :class="isFocus ? 'search-icon search-icon-active' : 'search-icon'">
                    <span></span> {{isFocus ? '' : 'Search'}}
                </div>
                <input id="search" @keyup="write" @focus="focus" @blur="cancel" :blur="isFocus" type="text" class="search" />
            </div>
            <div :class="isFocus ? 'search-cancel search-cancel-active' : 'search-cancel'" @click="cancelBybtn">取消</div>
        </div>
        <div :class="isFocus ? 'search-bar-nav search-bar-hide' : 'search-bar-nav'">
            <router-link to="/city" class="location"></router-link>
        </div>
        <div :class="isFocus ? 'search-list search-list-active' : 'search-list'">
            <div class="search-tip">
                {{word == "" ? "" : '搜索：' + word}}
            </div>
            <div class="search-result-content" @click="cancel">
                <collect-item v-for="(item, index) in result" :key="'searchItem' + item.pro_code_bar" :data="item"></collect-item>
            </div>
        </div>
    </div>
</template>

<script>
    import CollectItem from "@/components/CollectItem"
    import { debounce, throttle } from "@/util/common"
    import { Lazyload } from 'mint-ui'
    import API from '@/util/api'

    export default {
        props: {
            flag: {
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                isFocus: false,
                isShowList: false,
                word: "",
                result: [],
                time:null
            }
        },
        components: {
            CollectItem
        },
        created() {

        },
        methods: {
            toggleBar() {
                this.$parent.$parent.$parent.$refs.drawer.toggle()
            },
            focus(e) {
                this.isFocus = true
                this.isShowList = true
            },
            cancel() {
                this.isFocus = (this.word !== "") ? true : false
            },
            cancelBybtn() {
                this.isFocus = false
                this.result = []
                this.word = ""
                document.getElementById("search").value = ""
            },
            write(e) {
                this.word = (event.target.value).replace(" ", "")
                if(this.word !== "" && !this.time) {
                    this.time = setTimeout(() => {
                        this.getResult()
                        clearTimeout(this.time)
                        this.time = null
                    },600)
                } else {
                    this.result = []
                }
            },
            getResult() {
                this.$ajax(API.getSearch(this.word)).then(e => {
                    if(e.code === 200) {
                        this.result = e.result
                    }
                }).catch(err => {
                    console.log("搜索出错", err)
                })
            }
        },
        activated() {
            this.time = null
            this.isFocus = false
            this.isShowList = false
            this.word = ""
            this.result = []
        },
        filters: {

        }
    }
</script>

<style>
    .search-bar {
        width: 100%;
        height: 44px;
        position: fixed;
        left: 0;
        top: 0;
        z-index: 2000;
        background: rgba(0, 0, 0, 0);
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #FFF;
    }
    
    .search-bar-nav {
        width: 40px;
        height: 44px;
        display: flex;
        justify-content: center;
        align-items: center;
        transition: ease-in-out all .2s;
        opacity: 1;
    }
    
    .search-bar-nav>div,
    .search-bar-nav>a {
        height: 44px;
        max-height: 46px;
        width: 40px;
        background-position: center center;
        background-repeat: no-repeat;
        background-size: 20px auto;
    }
    
    .search-bar-hide {
        width: 0;
        opacity: 0;
    }
    
    .search-slide-menu {
        background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAE0AAABACAYAAABfl/puAAAEZElEQVR4Xu2cXaimUxTHf3/f+Zh8zAgpI4lJp2nExJCEjI/JBcWYSKgJSXHBTESGC8rnzTBRJi7QcOEr4yNRNDM3ZtJgCMMQKSVEvpf+x/PynuN5n/fZ2828z7vXxTmnztr7POt31n7etfdaa4s+iYjTgOuAk4A9gJ+B9cCDkp7s1x3nn2XjI2IXYCVweQOMF4Alkr4fZ2C2vQdtNXBJCxivAqdLimG6EXEgcBiw0zDd7fz3tvVzYGvPbkXEUcDmhAc/R9Jzg/Qj4gDgceDkhDlHQfUj4AJJbxvaPcC1CU+9RtL5DdDWAgsT5hsl1S+BQw3NXrMo4ck3Sjq6Tj8idgR+Afy9qzLb0N4ETkiwcJukQwZA89L8KmGuUVSdMLSngXMTnn6DpOMalufvHfe0gw3tRuD2BGiO2a5sgPYYcFHCfKOk+iFwpKE5NPgUcKzWRuZJ2tQAbX/gFsCBskOOLrzfHHKsA26TtLkXpy0FVrUgtkKSgYy1TEKzRMTF3i4Bu9cQ+RVYJunesaZVGf8PtArcLOB64Ng+OO8Cd0raVoD9TWAKtAKlHYECrR2nKVoFWoGWQSBjSPG0Ai2DQMaQ4mkFWgaBjCHF0wq0DAIZQ4qnFWgZBDKG/MfTImJf4FQnEIAvgNclOaFQZPopR0TsCtwKXF1l13uQfgMe8emHpO8KuX+TxT69fQVwDnSQ+PRyoaT3xx2cj7t3qI5y57eA8TEwV9KPTboRMdOZ+I4cdzvD7rNEv6a22m5Dc85zYMa8Bs5SSQ8NghYRxwPPAgbXNblU0mpDe3hI4ct0w9dKOrMBmkscmpb5qIOcYWh+lzlz1Fbek1QLJSL2Br5tO9GI6h2eA22LpDl1Bo8JtDk5y/MlSWc0LE9X1zjf2VWZXJ5nAS7YayvDPghcUdTVqsk7JC03NO8KXASzoAW1T4AJST8NCTkOqurTupBh7xX1vSXpg8mQw18iwka+BhzRAMPBrasgt7SA22mV/gz7bsAK4KqyjWr+n9dt2PcDTqk27PauN8qGfSrEcp6W8SIp0Aq0DAIZQ4qnFWgZBDKGFE8r0DIIZAwpnlagZRDIGFI8rUDLIJAxpHja/4UWETOqjjw3mPUy7BuAZyR9kzF/J4f0Hw25n+kBYM8aS918cYOk+zpJIdGo1DYf9wbdnPg3Oqfu4273aDqDvHML63z0e4xbkgfpRoR71t3Zt6RDGfaNwBPAXe5jN7Sb3F3WAlhPZZWkKxqg3Q9ckzDfKKlOtm0a2lPAeQlPvl6SSw9qJSJ8l4crkLoqe+W0Y38maXYdkYhwr+fXXaVV2TXX0J4Hzk4wdJOkeWPsaTMN7e7qqpy23IZdMfEo4N7RLso6SQsMbQJ4J8HCRZIGZuSrJeru4wuBfRLm3Z5V/wBeBhb72qBenOZWbLdkD5MXvZRbXpvj0MPNtqP+ofAn4LtIfujB6b+gybuByxqolQuaKjjT27Fd8ukrdE6stlO+zcW3BKyUtGaYG47L7/8CCPJeTDQCuQYAAAAASUVORK5CYII=');
    }
    
    .location {
        background-image: url("../assets/scan.png");
    }
    
    .search-bar-input {
        /*width: 5.78rem;*/
        height: 30px;
        max-height: 30px;
        border-radius: 15px;
        position: relative;
        overflow: hidden;
        display: flex;
        align-items: center;
        transition: all linear .2s;
    }
    
    .search-view {
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
        background: #FFF;
        border-radius: 15px;
    }
    
    .search-icon {
        width: 100%;
        height: 30px;
        max-height: 30px;
        font-size: 16px;
        position: absolute;
        justify-content: center;
        display: flex;
        align-items: center;
        left: 0;
        top: 0;
        transition: all linear .2s;
        background: #FFF;
        z-index: 20;
        color: #9C9C9C;
    }
    
    .search-icon-active {
        width: 60px
    }
    
    .search-cancel {
        width: 0;
        height: 30px;
        text-align: center;
        font-size: 14px;
        color: #FFF;
        line-height: 30px;
        transition: all linear .2s;
        opacity: 0;
    }
    
    .search-cancel-active {
        width: 1.2rem;
        max-width: 50px;
        opacity: 1;
    }
    
    .search-icon>span {
        content: "";
        width: 16px;
        height: 16px;
        background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAAe1BMVEUAAACbm5urq6ucnJycnJybm5ubm5uenp6cnJybm5ubm5ucnJybm5ucnJycnJybm5ubm5ucnJybm5ucnJycnJycnJycnJyenp6cnJybm5ucnJydnZ2cnJybm5udnZ2bm5ucnJycnJycnJycnJycnJycnJybm5ucnJycnJyNQ/xxAAAAKHRSTlMA5AQe8emHIQyPuRLMsZdo+fbRxZ5eShnXwHU9M3pyRaeCVS1uKU/eYPFfdwAAAhJJREFUWMPdVtmSgjAQ5Ea55AZFEDzz/1+4VRnWqMkwsdyq3dp+I5npzHQ6CcZfRHjtxzxlqdsW5TF8N3tVxSl7RLRZvbN4mTEJTnLRTLfODlOj1KqiaxkKs6bzN0ygiEvPS8bAeSjC0s6PhubeVF3eOWJLL7/tXoSpIx2G7lvxQY6yEpqhceZG1b6pZmtM6P7NVe6wgL3J51PMELt5fQOFDyUWiH1hNlgS6co4KuWkx+fyZbeBkjelguD/PeFz8KnKkWtowCBwQMNA4Rf/oHG+NH6Z9SUx8cAe2cOaJvDBjtL4lluESBaRrjTMTdDqEFS8BPt1e0RhFECto7Izj0oWa52lg4xaVN3tpPTHQYvAVRW7F42RUJ75RjRGAUI3kjKEiFSx0NhWfFMX7+l1OODDOk9PzK9dhLfSsEGmPs8Ng3ESNbZSTl9IIi5T9DowISMp4ai6lF0dM4YOHnWGFzzUuJUjtbwuNGEZOE5MmADTlyUL+eZyxBoYRqyGOmOwBdTrGjXY2wlIyPfd6eVF9jG7Y4036TKAs3vejQ7OCs1gt+InaTrYBuAKvWkxrIrHuLQt8psrvrPBJRmsPmUYCtvwaQbD36rTs4HPCgYcx0JOzweQlWQA2Lv8KdsT55xgEAi7zTrYBmPiVbC2zOAZ2vhxBvNTBvt/MUwfM/S/z2CuPmMwbTyCZqDyaQYin4TP/7u/AGcGhnLfQXhvAAAAAElFTkSuQmCC");
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 100% auto;
        display: inline-block;
        margin-right: 4px;
    }
    
    .search {
        height: 100%;
        width: 100%;
        border-radius: 15px;
        -webkit-appearance: none;
        border: none;
        outline: none;
        background: none;
        color: #333;
        padding: 0 28px 0 60px;
        z-index: 30;
        font-size: 14px;
    }
    
    .search-list {
        width: 100%;
        height: 100vh;
        position: absolute;
        left: 0;
        top: 0;
        z-index: 1200;
        background: #FFF;
        opacity: 0;
        display: none;
        transition: all linear .2s;
    }
    
    .search-list-active {
        width: 100%;
        height: calc(100vh - 44px);
        position: absolute;
        left: 0;
        top: 44px;
        background: #FFF;
        opacity: 1;
        display: block;
        z-index: 200;
    }
    
    .search-tip {
        height: .6rem;
        max-height: 50px;
        padding: 0 16px;
        display: -ms-flexbox;
        display: flex;
        -ms-flex-align: center;
        align-items: center;
        font-size: 12px;
        font-weight: 700;
        color: #5179f1;
    }
    /*result*/
    
    .search-result {
        flex: 1 1 auto;
        width: 100%;
        background: #FBFCFD;
        margin-bottom: 0.6rem;
    }
    
    .search-result-content {
        width: 100%;
        height: 100%;
        padding-bottom: 0.8rem;
        overflow: scroll;
    }
</style>