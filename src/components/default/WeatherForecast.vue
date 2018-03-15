<template>
    <div class="WeatherForecast">
        <div class="subtitle">
            <div class="sub1">
                <span>大沥</span>
                <div class="pice">
                    <img class='defaultImg' v-if='daliList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in daliList' :src="'/static/img/' + item + '.png'" alt="" />
                    <!-- <img src="./img/A2.png" alt="" /> -->
                </div>
                <div class="line"></div>
            </div>
            <div class="sub1">
                <span>禅城</span>
                <div class="pice">
                    <img class='defaultImg' v-if='chanchengList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in chanchengList' :src="'/static/img/' + item + '.png'" alt="" />
                </div>
                <div class="line"></div>
            </div>
            <div class="sub1">
                <span>狮山</span>
                <div class="pice">
                    <img class='defaultImg' v-if='shishanList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in shishanList' :src="'/static/img/' + item + '.png'" alt="" />
                </div>
                <div class="line"></div>
            </div>
            <div class="sub1">
                <span>桂城</span>
                <div class="pice">
                    <img class='defaultImg' v-if='guichengList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in guichengList' :src="'/static/img/' + item + '.png'" alt="" />
                </div>
                <div class="line"></div>
            </div>
            <div class="sub1">
                <span>西樵</span>
                <div class="pice">
                    <img class='defaultImg' v-if='xiqiaoList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in xiqiaoList' :src="'/static/img/' + item + '.png'" alt="" />
                </div>
                <div class="line"></div>
            </div>
            <div class="sub1">
                <span>里水</span>
                <div class="pice">
                    <img class='defaultImg' v-if='lishuiList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in lishuiList' :src="'/static/img/' + item + '.png'" alt="" />
                </div>
                <div class="line"></div>
            </div>
            <div class="sub1">
                <span>丹灶</span>
                <div class="pice">
                    <img class='defaultImg' v-if='danzaoList.length === 0 ' src="./img/no-alerm.gif" alt="">
                    <img v-for='(item,index) in danzaoList' :src="'/static/img/' + item + '.png'" alt="" />
                </div>
                <div class="line"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import { getWarmingList } from 'api/home'
    import { ERR_OK } from 'api/config'
    export default {
        data() {
            return {
                daliList: [],
                chanchengList: [],
                shishanList: [],
                guichengList: [],
                xiqiaoList: [],
                lishuiList: [],
                danzaoList: [],
            }
        },
        created() {
            this.getWarming()
        },
        methods: {
            // 各地天气预警
            getWarming() {
                getWarmingList().then(res => {
                    if (res.code === ERR_OK) {
                        let list = res.result.result
                        list.map(item => {
                            switch (item.cn) {
                                case '大沥':
                                    this.daliList.push(item.code)
                                    break;
                                case '禅城':
                                    this.chanchengList.push(item.code)
                                    break;
                                case '狮山':
                                    this.shishanList.push(item.code)
                                    break;
                                case '桂城':
                                    this.guichengList.push(item.code)
                                    break;
                                case '西樵':
                                    this.xiqiaoList.push(item.code)
                                    break;
                                case '里水':
                                    this.lishuiList.push(item.code)
                                    break;
                                case '丹灶':
                                    this.danzaoList.push(item.code)
                                    break;
                            }
                        })
                    }
                })
            },
        }
    }
</script>
<style scoped lang="scss">
    .WeatherForecast {
        height: 283px;
        border: 1px solid #ccc;
        .subtitle {
            overflow: auto;
            display: flex;
            font-size: 16px;
            height: 100%;
            .sub1 {
                text-align: center;
                position: relative;
                padding-top: 40px;
                position: relative;
                width: 14.28%;
                >span {
                    position: absolute;
                    top: 0;
                    left: 0;
                    height: 40px;
                    line-height: 40px;
                    border-bottom: 1px solid #d5d5d5;
                    background: #f6f6f6;
                    width: 100%;
                }
                .pice {
                    img {
                        width: 40px;
                        height: 50px;
                    }
                    .defaultImg {
                        height: 45px;
                        padding-top: 5px;
                    }
                }
                .line {
                    width: 1px;
                    height: 100%;
                    position: absolute;
                    right: 0;
                    top: 0px;
                    background: #d5d5d5;
                }
            }
        }
    }
</style>