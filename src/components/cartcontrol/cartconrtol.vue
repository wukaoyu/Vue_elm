<template>
    <div class="cartbox">
        <transition name="move">
            <div class="inner" v-if="food.count>0" @click.stop.prevent="decreaseCart">
                <i class="icon-remove_circle_outline" ></i>
            </div>
        </transition>
        <p v-if="food.count>0">{{food.count}}</p>
        <i class="icon-add_circle"  @click.stop.prevent="addCars($event)"></i>
    </div>
</template>
<script>
import Vue from 'vue';

export default {
    props:{
        food:{
            type:Object
        }
    },
    created() {

    },
    methods:{
        addCars(event){
            if(!this.food.count){
                Vue.set(this.food, 'count', 1);
            }else{
                this.food.count++
            }
            this.$emit('add', event.target);
        },
        decreaseCart(){
            if(this.food.count){
                this.food.count--
            }
        }
    }
}
</script>
<style lang="stylus">
.cartbox
    display flex
    .inner 
        transform: rotate(180deg)
        &.move-enter-active, &.move-leave-active
            transition: all 0.4s linear
        &.move-enter, &.move-leave-active
            opacity: 0
            transform: translate3d(24px, 0, 0)
    i 
        color rgb(0,160,220)
        font-size 24px
    p 
        display block
        width 24px
        height 24px
        text-align center
        line-height 24px 
        font-size 10px
        color rgb(147,153,159)
</style>
