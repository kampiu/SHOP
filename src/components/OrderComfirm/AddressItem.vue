<template>
    <label class="adr-selput-item">
        <div class="adr-selput-checkbox">
            <input :checked="data.adr_id === adrId" name="addressId" class="address-put-item-select" type="radio" :data-id="data.adr_id" :data-index="index" @change="setAtrs" />
        </div>
        <div class="adr-selput-context">
            <div class="adr-selput-location font-break">{{data.adr_location}} {{data.adr_info}}</div>
            <div class="adr-selput-name font-break">{{data.adr_consignee}} <span>{{data.adr_tell}}</span></div>
        </div>
        <router-link :to="'/address/edit/' + data.adr_id" class="address-edit"></router-link>
    </label>
</template>

<script>
    export default {
        name: "AddressSheet",
        props: {
            data: {
                type: Object
            },
            index: {
                type: Number
            },
            adrId: {
                type: Number
            }
        },
        data() {
            return {

            }
        },
        components: {

        },
        created() {

        },
        methods: {
            setAtrs(e) {
                this.$emit("selectAddress", {
                    index: e.target.dataset.index,
                    id: e.target.dataset.id
                })
            }
        },
        activated() {

        },
        filters: {

        }
    }
</script>

<style>
    /*.adr-selput-scroll-view {
        width: 100%;
        height: 286px;
        overflow: hidden;
        background: #FFF;
    }
    
    .adr-selput-scroll {
        width: 100%;
    }*/
    
    .to-add-adr-view {
        width: 100%;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #FBFCFD;
    }
    
    .to-add-adr-view a {
        display: inline-block;
        width: 90vw;
        height: 36px;
        text-align: center;
        line-height: 36px;
        font-weight: 550;
        font-size: 14px;
        color: #333;
    }
    
    .adr-selput-item {
        width: 100%;
        padding: 2px 0 2px 2px;
        height: 50px;
        display: flex;
        align-items: center;
        position: relative;
        background: #FFF;
    }
    
    .adr-selput-item .address-edit {
        height: 46px;
        width: 40px;
        background-size: 50% auto;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url("../../assets/edit.png");
        flex: 0 0 auto;
        margin-right: 4px;
        border-bottom: 1px solid #F6F6F6;
    }
    
    .adr-selput-checkbox {
        width: 46px;
        height: 46px;
        flex: 0 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    
    .adr-selput-checkbox input[type=radio] {
        width: 20px;
        height: 20px;
        -webkit-appearance: none;
        border: 1px solid #666;
        background: #FFF;
        transition: all linear .1s;
        border-radius: 50%;
        outline: none;
    }
    
    .adr-selput-checkbox input[type=radio]:checked {
        background-size: 100% auto;
        border: none;
        background-position: center center;
        background-repeat: no-repeat;
        background-image: url('../../assets/checked.png');
    }
    
    .adr-selput-context {
        flex: 1 1 auto;
        height: 46px;
        display: flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        padding: 3px 20px 3px 6px;
        border-bottom: 1px solid #F6F6F6;
    }
    
    .adr-selput-context>div {
        flex: 1 1 auto;
        height: 20px;
        color: #333;
        font-weight: 550;
    }
    
    .adr-selput-location {
        font-size: 13px;
    }
    
    .adr-selput-name span {
        margin-left: 12px;
    }
</style>