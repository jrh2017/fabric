<template>
    <div class="container">
        <div class="header">
            <div class="logo">LOGO</div>
        </div>
        <div class="content-wrapper">
            <div class="list-wraper">
                <div :key="item.id" v-for="item in list" class="image-wrapper">
                    <img :src="item.url" />
                    <i @click="handleAdd(item)" class="pt-iconfont icon-plus-circle"></i>
                </div>
            </div>
            <vue-fabric ref="canvas" :width="width" :height="height" @selection:created="selected" @selection:updated="selected"></vue-fabric>
            <div class="tool-wrapper">
                <i @click="handleDelete" class="pt-iconfont icon-delete"></i>
                <i @click="rotate" class="pt-iconfont icon-shuaxin"></i>
                <i @click="createImg" class="pt-iconfont icon-crop"></i>
                <!-- <i @click="toSVG" class="pt-iconfont icon-crop"></i> -->
                <button @click="toIMG">导出图片</button>
                <button @click="toSVG" style="margin-top: 10px;">导出SVG</button>
            </div>
        </div>
        <vue-image-model :close="()=>{imgUrl=''}" v-show="imgUrl.length>0" :url="imgUrl"></vue-image-model>
    </div>
</template>
<script>
import VueImageModel from '../components/image-model.vue';
import '@/libs/svg2pdf.js'
import jsPDF from 'jspdf-yworks'
import sticker1 from '../../static/images/sticker1.png'
import sticker2 from '../../static/images/sticker2.png'
import sticker3 from '../../static/images/sticker3.png'
import sticker4 from '../../static/images/sticker4.png'
import sticker5 from '../../static/images/sticker5.png'

export default {
    components: {
        VueImageModel
    },
    data() {
        return {
            imgUrl: '',
            width: 300,
            height: 500,
            list: [{
                id: 1,
                url: sticker1
            }, {
                id: 2,
                url: sticker2
            }, {
                id: 3,
                url: sticker3
            }, {
                id: 4,
                url: sticker4
            }, {
                id: 5,
                url: sticker5
            }]
        };
    },
    created() {
        this.width = document.body.offsetWidth - 200;
        this.height = document.body.offsetHeight - 60;
        console.log(document.body.offsetWidth);
    },
    mounted() {
        this.$refs.canvas.createTriangle({ id: 'Triangle', x: 100, y: 100, x1: 150, y1: 200, x2: 180, y2: 190, fill: 'yellow', left: 80 });
        // this.$refs.canvas.createImage('/static/images/sticker1.png', { id: 'myImage', width: 100, height: 100, left: 110, top: 110 });
        // this.$refs.canvas.createImage('/static/images/sticker2.png');
        // this.$refs.canvas.createImage('/static/images/sticker3.png');
        let options = {
            x: 100,
            y: 100,
            x1: 600,
            y1: 600,
            color: '#B2B2B2',
            drawWidth: 2,
            id: 'Triangle'
        };
        this.$refs.canvas.drawDottedline(options);
        // this.$refs.canvas.createEllipse({ rx: 200, ry: 400, left: 300 });
        this.$refs.canvas.createTextbox('斯诺伐克两三斯诺伐克两三斯诺伐克两三斯诺伐克两三斯诺伐克两三斯诺伐克两三斯诺伐克两三', { top: 100, left: 300, width: 50 });
        // this.$refs.canvas.setCornerIcons({ size: 20, tl: '/static/images/cow.png' });
        this.$refs.canvas.drawByPath([
            [50, 50],
            [120, 120],
            [80, 160]
        ], {});
    },
    methods: {
        handleAdd(item) {
            this.$refs.canvas.createImage(item.url, { id: item.id });
        },
        handleDelete() {
            this.$refs.canvas.removeCurrentObj();
        },
        rotate() {
            this.$refs.canvas.setRotate();
        },
        createImg() {
            let dataUrl = this.$refs.canvas.toDataUrl();
            // console.log(dataUrl);
            this.imgUrl = dataUrl;
        },
        selected(obj, option) {
            // console.log(obj);
            // console.log(option);
        },
        toIMG () {
            // 下载图片
            let ahref = document.createElement('a')
            ahref.href = document.getElementById('canvas').toDataURL('image/png')
            ahref.download = "百竹印务"+ new Date().getTime()
            ahref.click()
        },
        toSVG () {
            let svg = this.$refs.canvas.toSvg()
            // let svg = document.getElementById("canvas")
            // console.log('svg', svg)
            
            // 下载图片
            // let ahref = document.createElement('a')
            // ahref.href = document.getElementById('canvas').toDataURL('image/png')
            // ahref.download = 'exportPng'
            // ahref.click()
            // 
            
            // 下载svg
            var svgBlob = new Blob([svg], {type:"image/svg+xml;charset=utf-8"});
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "百竹印务"+ new Date().getTime() +".svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);

            // const pdf = new jsPDF()
            // svg2pdf(svg, pdf, {
            //     xOffset: 0,
            //     yOffset: 0,
            //     scale: 1
            // });
            // pdf.save('myPDF.pdf')
        }
    }
};

</script>
<style lang='scss' scoped>
.container {
    width: 100%;
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;

    .header {
        height: 60px;

        border-bottom: 1px solid #efefef;
        display: -ms-flexbox;
        display: -moz-box;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        box-sizing: border-box;
        width: 100%;

        .logo {
            width: 200px;
            box-sizing: border-box;
            border-right: 1px solid #efefef;
            height: 60px;
            display: -ms-flexbox;
            display: -moz-box;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;
            box-align: center;
            -moz-box-align: center;
            -webkit-box-align: center;
            -webkit-align-items: center;
            align-items: center;
            box-pack: center;
            -webkit--moz-box-pack: center;
            -moz-box-pack: center;
            -webkit-justify-content: center;
            justify-content: center;
        }
    }

    .content-wrapper {
        position: relative;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: -moz-box;
        display: -webkit-box;
        display: flex;
        -moz-box-flex: 1;
        box-flex: 1;
        -webkit-box-flex: 1;
        -webkit-flex: 1;
        flex: 1;

        .tool-wrapper {
            position: absolute;
            top: 0;
            right: 0;
            display: -ms-flexbox;
            display: -moz-box;
            display: -webkit-box;
            display: -webkit-flex;
            display: flex;

            -webkit-box-orient: vertical;
            -webkit-box-direction: normal;
            -moz-box-direction: normal;
            -moz-box-orient: vertical;
            -webkit-flex-direction: column;
            flex-direction: column;

            .pt-iconfont {
                padding: 20px 30px;
            }
        }

        .list-wraper {
            width: 200px;

            border-right: 1px solid #efefef;
            overflow-y: auto;
            flex-shrink: 0;
            box-sizing: border-box;

            display: -webkit-flex;
            display: -ms-flexbox;
            display: -moz-box;
            display: -webkit-box;
            display: flex;
            -webkit-box-orient: vertical;
            -moz-box-orient: vertical;
            -webkit-flex-direction: column;
            flex-direction: column;

            .image-wrapper {
                padding: 20px;
                display: -ms-flexbox;
                display: -moz-box;
                display: -webkit-box;
                display: -webkit-flex;
                display: flex;

                flex-shrink: 0;
                box-pack: center;
                -webkit-box-pack: center;
                -moz-box-pack: center;
                -webkit-justify-content: center;
                justify-content: center;
                box-align: center;
                -moz-box-align: center;
                -webkit-box-align: center;
                -webkit-align-items: center;
                align-items: center;
                border-bottom: 1px solid #efefef;
                position: relative;

                img {
                    width: 120px;
                }

                .pt-iconfont {
                    position: absolute;
                    top: 0px;
                    right: 0px;
                    font-size: 18px;
                    color: #777;
                    padding: 10px;
                }
            }
        }
    }
}

</style>
