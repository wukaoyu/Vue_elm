<template>
    <div class="shopcart">
        <div class="shopcart-left">
            <div class="icon-box" :class="{'have-food':selectContent.length>0}" @click="togglehide">
                <i class="icon-shopping_cart" ></i>
                <span class="food-count" v-show="selectContent.length>0">{{foodCount}}</span>
            </div>
            <p class="shop-price" :class="{'shop-pay':foodButton ==='去结算'}">￥ {{toatalPrice}}</p>
            <p class="shop-desc">另需配送费￥{{descPrice}}元</p>
        </div>
        <div class="ball-container">
            <div v-for="(ball,index) in balls" :key="index" >
                <transition name="drop" @before-enter="beforeDrop" @enter="dropping" @after-enter="afterDrop">
                    <div class="ball" v-show="ball.show">
                        <div class="inner inner-hook"></div>
                    </div>
                </transition>
            </div>
        </div>
        <input type="button" :value="foodButton" :class="{'shopcart-right':toatalPrice<mainPrice,'shopcart-pay':toatalPrice>=mainPrice}">
        <div class="food-select-list" v-show="listShow">
            <div class="list-head">
                <h1 class="title">购物车</h1>
                <span class="empty">清空</span>
            </div>
            <div class="title-content" ref="listContent">
                <ul class="content-ul">
                   <li v-for="(food,index) in selectContent" :key="index">
                        <span class="content-name">{{food.name}}</span>
                        <div class="content-price">
                            <p>￥{{food.count*food.price}}</p>
                            <cartcontrol :food="food" @add="addFood"></cartcontrol>
                        </div>   
                    </li> 
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
import cartcontrol from '../cartcontrol/cartconrtol'
import BScroll from '@better-scroll/core'

export default {
    props:{
        descPrice:{
            type:Number,
            default:0
        },
        mainPrice:{
            type:Number,
            default:0
        },
        selectContent:{
            type:Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            balls:[
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
                {
                    show:false
                },
            ],
            dropBalls:[],
            fold:true
        }
    },
    methods:{
        drop(el) {
            for(let i = 0; i<this.balls.length; i++){
                let ball = this.balls[i];
                if(!ball.show){
                    ball.show=true;
                    ball.el = el;
                    this.dropBalls.push(ball);
                    return
                }
            }
        },
        addFood(target) {
            this.drop(target);
        },
        togglehide() {
            if(!this.foodCount){
                this.fold=true
                return
            }
            this.fold = !this.fold
        },
        hidelist() {
            this.fold = true
        },
        beforeDrop(el) { 
            let count = this.balls.length
            while(count--){
                let ball = this.balls[count];
                if(ball.show){
                    let rect = ball.el.getBoundingClientRect();
                    let x = rect.left - 32;
                    let y = -(window.innerHeight - rect.top - 22);
                    el.style.display = '';
                    el.style.webkitTransform = `translate3d(0,${y}px,0)`;
                    el.style.transform = `translate3d(0,${y}px,0)`;
                    let inner = el.getElementsByClassName('inner-hook')[0];
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`;
                    inner.style.transform = `translate3d(${x}px,0,0)]`;
                }
            }
        },
        dropping(el, down){
            let rf = el.offsetHeight;
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)';
                el.style.transform = 'translate3d(0,0,0)';
                let inner = el.getElementsByClassName('inner-hook')[0];
                inner.style.webkitTransform = 'translate3d(0,0,0)';
                inner.style.transform = 'translate3d(0,0,0)';
                el.addEventListener('transitionend', down);
            });
        },
        afterDrop(el){
            let ball = this.dropBalls.shift();
            if (ball) {
                ball.show = false;
                el.style.display = 'none';
            }
        }
    },
    computed:{
        toatalPrice() {
            let total = 0;
            this.selectContent.forEach((food) => {
                total += food.price * food.count;
            });
            return total
        },
        foodCount() {
            let count=0
            this.selectContent.forEach((food) => {
                count += food.count;
            });
            return count
        },
        listShow() {
            if (!this.foodCount) {
                this.fold = true;
                return false;
            }
            let show = !this.fold
            if(show){
                this.$nextTick(() =>{
                    if(!this.scroll){
                        this.scroll = new BScroll(this.$refs.listContent, {
                            click: true
                        });
                    }else{
                        this.scroll.refresh();
                    }
                })
            }
            return show
        },
        foodButton() {
            if(this.selectContent.length === 0){
                return '￥'+this.mainPrice+'起送'
            }else if(this.toatalPrice<this.mainPrice){
                let xiangcha=this.mainPrice-this.toatalPrice
                return '还差￥'+xiangcha+'起送'
            }else{
                return '去结算'
            }
        }
    },
    components: {
        cartcontrol
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

    .shopcart
        display flex
        position fixed
        bottom 0px
        left 0px
        width 100%
        height 52px
        background-color #141d27
        justify-content space-between
        .food-select-list
            position absolute
            width 100%
            top 0px
            left 0px
            transform translate3d(0, -100%, 0)
            .list-head 
                height: 40px;
                line-height: 40px;
                padding: 0 18px;
                background: #f3f5f7;
                border-bottom: 1px solid rgba(7,17,27,0.1);
                .title
                    float: left;
                    font-size: 14px;
                    color: #07111b;
                .empty 
                    float: right;
                    font-size: 12px;
                    color: #00a0dc;
            .title-content
                padding: 0 18px;
                max-height: 217px;
                overflow: hidden;
                background: #fff;
                .content-ul>li
                    display flex
                    justify-content space-between
                    border-1px(rgba(7, 17, 27, 0.1))
                    height 24px
                    padding 12px
                    align-items center
                    .content-name
                        font-size: 14px;
                        color: #07111b;
                        font-weight 700
                    .content-price
                        display flex
                        &>p
                            color #f01414
                            height 20px
                            line-height 27px
                            margin-right 15px
        .ball-container
            .ball
                position: fixed
                left: 32px
                bottom: 22px
                z-index: 200
                transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41)
                .inner
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: rgb(0, 160, 220)
                    transition: all 0.4s linear
        .shopcart-left
            display flex
            height 100%
            align-content center
            position relative
            z-index 10
            .icon-box
                position relative
                width 44px
                height 44px
                background-color #2b343c
                border-radius 100%
                border 6px solid #141d27
                margin-left 12px
                margin-top -10px
                text-align center
                line-height 50px
                .food-count
                    position absolute
                    width 26px
                    height 14px
                    border-radius 15px
                    background-color rgb(240,20,20)
                    color #fff
                    font-size 9px
                    font-weight 700
                    line-height 15px
                    top -5px
                    right -10px
                .icon-shopping_cart
                    font-size 24px
                    color #80858a
                &.have-food
                    background-color rgb(0,160,220)
                    .icon-shopping_cart
                        color #fff
            .shop-price
                position relative
                line-height 52px
                margin-left 12px
                font-weight 700
                color :#80858a
                &::after
                    display block
                    position absolute
                    content ""
                    height 24px
                    width 1px
                    border-left 0.5px solid #80858a   
                    top 50%   
                    right -12px
                    margin-top -12px
            .shop-pay
                color #fff
            .shop-desc
                margin-left 24px
                color :#80858a
                font-weight 500
                font-size 10px
                line-height 52px
        .shopcart-right
            width 105px
            border none 
            background-color #2b343c
            color :#80858a
            font-weight 700
            outline none
        .shopcart-pay
            width 105px
            border none 
            background-color rgb(0,160,220)
            color :#fff
            font-weight 700
            outline none
</style>