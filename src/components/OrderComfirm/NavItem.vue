<template>
    <div class="orderconfirm-nav-item">
        <div>
            {{data.title}}  <span class="orderconfirm-tip">{{data.describe}}</span>
            <mint-switch v-model="data.checked" :id="data.id + 'order-nav'"></mint-switch>
        </div>
    </div>
</template>

<script>
    import { Switch } from 'mint-ui'

    export default {
        name: "NavItem",
        props: {
            data: {
                type: Object
            }
        },
        data() {
            return {

            }
        },
        components: {
            "mint-switch": Switch
        },
        created() {

        },
        methods: {

        },
        activated() {

        },
        filters: {

        }
    }
</script>

<style>
    .orderconfirm-nav-item{
        width:100%;
        height:36px;
        padding-left:16px;
        display:flex;
        align-items: center;
    }
    .orderconfirm-nav-item > div{
        flex:1 1 auto;
        display:flex;
        height:36px;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        color:#444;
        font-weight: 550;
        border-bottom:1px solid #DFDFDF;
    }
    .orderconfirm-nav-item:last-child > div{
        border:none
    }
    .mint-switch {
        transform: scale(.8);
        display: inline-block;
    }
    .mint-switch-input:checked + .mint-switch-core{
        background-color:#D0021B;
        border-color:#D0021B;
    }
    .orderconfirm-tip{
        margin-right:auto;
        color:#8E8E8E;
        font-weight: 500;
        font-size: 12px;
        margin-left:10px;
    }
</style>