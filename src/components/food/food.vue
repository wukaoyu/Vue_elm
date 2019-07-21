<template>
    <transition name="move">
        <div class="food" v-show="showFlag" >
            <div class="image-header">
                <img src="http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750">
                <div class="back" @click="hide">
                    <i class="icon-arrow_lift"></i>
                </div>
            </div>
            <div class="content">
                <h1 class="title">皮蛋瘦肉粥</h1>
                <div class="detail">
                    <span class="sell-count">月售229份</span>
                    <span class="rating">好评率100%</span>
                </div>
                <div class="price">
                    <span class="now">￥10</span>
                    <span class="old">￥</span>
                </div>
                <div class="buy">加入购物车</div>
            </div>
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
    .image-header
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img 
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        .back
            position: absolute;
            top: 10px;
            left: 0;
            .icon-arrow_lift
                display: block;
                padding: 10px;
                font-size: 20px;
                color: #fff;
    .content
        position: relative
        padding: 18px
        .title
            line-height: 14px
            margin-bottom: 8px
            font-size: 14px
            font-weight: 700
            color: rgb(7, 17, 27)
        .detail
            margin-bottom: 18px
            line-height: 10px
            height: 10px
            font-size: 0
            .sell-count, .rating
                font-size: 10px
                color: rgb(147, 153, 159)
            .sell-count
                margin-right: 12px
    .price
        font-weight: 700
        line-height: 24px
        .now
            margin-right: 8px
            font-size: 14px
            color: rgb(240, 20, 20)
        .old
            text-decoration: line-through
            font-size: 10px
            color: rgb(147, 153, 159)
    
    .cartcontrol-wrapper
        position: absolute
        right: 12px
        bottom: 12px
    .buy
        position: absolute
        right: 18px
        bottom: 18px
        z-index: 10
        height: 24px
        line-height: 24px
        padding: 0 12px
        box-sizing: border-box
        border-radius: 12px
        font-size: 10px
        color: #fff
        background: rgb(0, 160, 220)
        opacity: 1
</style>
