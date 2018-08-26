<template>
    <label class="payment-item">
        <div class="adr-selput-checkbox">
            <input :checked="data.id === payId" name="addressId" class="address-put-item-select" type="radio" :data-id="data.id" :data-index="index" @change="setPay" />
        </div>
        <div class="adr-selput-context">
            <div class="adr-selput-location font-break">{{data.title}}</div>
        </div>
    </label>
</template>

<script>
    export default {
        name: "PaymentSheet",
        props: {
            data: {
                type: Object
            },
            index: {
                type: Number
            },
            payId: {
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
            setPay(e){
                this.$emit("selectPay", {
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
    .payment-item{
        width:100%;
        padding:2px;
        height:50px;
        display:flex;
        align-items: center;
        justify-content: center;
        border-top: 1px solid #FBFCFD;
    }
</style>