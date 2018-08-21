<template>
    <div class="address-map-view">
        <div class="address-map-search">
            <div class="title-nav-back" @click="backTo"></div>
            <input id="search-address" type="text" />
        </div>
        <div class="address-map-marker"></div>
        <div class="address-map">
            <div id="gd-container"></div>
        </div>
        <div class="address-result-scroll-view">
            <div class="map-item" v-for="(item, index) in adrList" :key="item.uid + 'adr-item'" :data-index="index" @click.capture="selectAdr">
                <div class="map-name" :data-index="index">{{item.title}}</div>
                <div class="map-location" :data-index="index">{{item.address}}</div>
            </div>
        </div>
    </div>
</template>
<style>

</style>

<script>
    import vuePutTo from 'vue-pull-to'
    import API from '@/util/api'
    import {
        mapGetters
    } from 'vuex'

    export default {
        data() {
            return {
                Map: null,
                Geolocation: null,
                Mk: null,
                adrList: [],
                search: null,
                word: "",
                History:""
            }
        },
        components: {
            vuePutTo
        },
        beforeRouteEnter: (to, from, next) => {
            next(vm => {
                vm.History = from.path
                vm.init()
            })
        },
        created() {

        },
        methods: {
            init() {
                this.Map = new BMap.Map("gd-container")
                this.Map.enableScrollWheelZoom(true)
                let point = new BMap.Point(116.331398, 39.897445)
                this.Map.centerAndZoom(point, 18)

                this.Geolocation = new BMap.Geolocation()
                this.Geolocation.getCurrentPosition(r => {
                    this.Mk = new BMap.Marker(r.point)
                    console.log(this.Geolocation, this.Geolocation.getStatus())
                    if(this.Geolocation.getStatus() == BMAP_STATUS_SUCCESS) {
                        this.Map.addOverlay(this.Mk)
                        this.Map.panTo(r.point)
                        this.initMove()
                    }
                })
                let that = this
                this.search = new BMap.Autocomplete({
                    "input": "search-address",
                    "location": that.Map
                })
                this.search.addEventListener("onconfirm", this.toDrawMap)
            },
            toDrawMap(e) {
                let _value = e.item.value
                this.word = _value.province + _value.city + _value.district + _value.street + _value.business
                this.Map.clearOverlays()
                let that = this

                function myFun() {
                    let pp = local.getResults().getPoi(0).point
                    that.Map.centerAndZoom(pp, 18)
                    that.Map.addOverlay(new BMap.Marker(pp))
                }
                let local = new BMap.LocalSearch(that.Map, {
                    onSearchComplete: myFun
                })
                document.getElementById("search-address").blur()
                local.search(this.word)
            },
            selectAdr(e) {
                let data = {
                    adr: this.adrList[parseInt(e.target.dataset.index)].title,
                    location: this.adrList[parseInt(e.target.dataset.index)].address,
                    uid: this.adrList[parseInt(e.target.dataset.index)].uid,
                    point: {
                        lat: this.adrList[parseInt(e.target.dataset.index)].point.lat,
                        lng: this.adrList[parseInt(e.target.dataset.index)].point.lng,
                    },
                    city: this.adrList[parseInt(e.target.dataset.index)].city,
                }
                this.$store.commit("address/addAdrSelect", data)
                this.$router.replace(this.History)
            },
            initMove() {
                this.Map.addEventListener('moveend', this.move)
                this.Map.addEventListener("ondragging", this.ondragging)
            },
            ondragging() {
                this.Mk.setPosition(this.Map.getCenter())
            },
            move() {
                let pos = this.Mk.getPosition()
                let geoc = new BMap.Geocoder()
                geoc.getLocation(pos, rs => {
                    this.adrList = rs.surroundingPois
                })
            },
            backTo() {
                this.$router.replace(this.History)
            }
        },
        activated() {
            this.$store.commit("address/initaddAdrSelect")
        },
        deactivated() {
            this.Map.removeEventListener("ondragging", this.ondragging)
            this.Map.removeEventListener('moveend', this.move)
            this.search.removeEventListener("onconfirm", this.toDrawMap)
            this.Mk = null
            this.Map = null
            this.Geolocation = null
            this.search = null
            this.word = ""
        },
        computed: {
            ...mapGetters([
                'router'
            ])
        }
    }
</script>

<style>
    .address-map-view {
        display: flex;
        flex-direction: column;
    }
    
    .address-map-search {
        width: 100%;
        height: 50px;
        background: -webkit-linear-gradient(left, #03AAFF, #0387FF);
        padding: 0 12px 0 60px;
        display: flex;
        align-items: center;
    }
    
    .address-map-search input {
        height: 32px;
        flex: 1 1 auto;
        -webkit-appearance: none;
        padding-left: 30px;
        border: none;
        outline: none;
    }
    
    .address-map-search>.seller-back {
        left: 10px;
    }
    
    .address-city {
        font-size: 14px;
        color: #FFF;
        line-height: 50px;
        font-weight: bold;
        text-align: left;
        padding: 0 6px;
        width: 50px;
        flex: 0 0 auto;
    }
    
    .address-map {
        width: 100%;
        height: 350px;
        overflow: hidden;
        margin: 0;
        position: relative;
    }
    
    #gd-container {
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 200;
    }
    
    .address-map-marker {
        position: fixed;
        left: 50%;
        top: 200px;
        z-index: 2000;
        width: 39px;
        height: 25px;
        transform: translateX(-50%);
        background-repeat: no-repeat;
        background-size: 100% auto;
        background-position: center center;
        background-image: url('../../assets/marker-port.png');
    }
    
    .BMap_noprint,
    .BMap_Marker,
    .BMap_Marker img {
        display: none !important;
    }
    
    .anchorBL {
        display: none !important;
    }
    
    .address-result-scroll-view {
        flex: 0 0 auto;
        height: calc(100vh - 400px);
        width: 100%;
        overflow-y: scroll;
    }
    
    .address-result-scroll {
        height: 100%;
        width: 100%;
    }
    
    .map-item {
        width: 100%;
        height: 49px;
        padding: 4px 0 4px 24px;
        position: relative;
    }
    
    .map-item>div {
        height: 20px;
        line-height: 20px;
    }
    
    .map-item>div:nth-child(2) {
        border-bottom: 1px solid #F0F0F0;
    }
</style>