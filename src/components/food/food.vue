<template>
    <transition name="move">
        <div class="food" v-show="showFlag" @click="hide">

        </div>
    </transition>
</template>
<script>
export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag:false
        }
    },
    methods: {
        show() {
            this.showFlag = true
        },
        hide() {
            this.showFlag = false
        }
    }
}
</script>
<style lang="stylus">
@import "../../common/stylus/mixin";
@import "../../common/stylus/icon.styl";
@import "../../common/stylus/base.styl";
.food
    position fixed
    height calc(100vh - 48px)
    width 100%
    background-color #fff
    top 0px
    left 0px
    z-index 5
    transform: translate3d(0, 0, 0)
    &.move-enter-active, &.move-leave-active
      transition: all .3s linear
    &.move-enter, &.move-leave-active
      transform: translate3d(100%, 0, 0)

</style>
