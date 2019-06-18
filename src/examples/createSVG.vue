<template>
    <div>
        请上传Excel文件：<input type="file" ref="upload" accept=".xls,.xlsx">    <Button type="primary" @click="toExcel">excel模板下载</Button>
        <div class="pre-data">
        	<div v-for="(item, index) in outputs" :key="index">
        		学生姓名：{{item.stuName}}, 老师姓名: {{item.teaName}}, 学校名字: {{item.schName}}
        	</div>
        </div>
        <div>
        	<Button type="primary" @click="clearSvg">SVG预览</Button>
        	<Button type="primary" @click="toIMG">导出图片</Button>
            <Button type="primary" @click="toSVG">导出SVG</Button>
        	<vue-fabric ref="canvas" :width="canvasWidth" :height="canvasHeight"></vue-fabric>
        </div>
    </div>
</template>
<script>
import XLSX from 'xlsx'
import bg from './bg01.json'
import template from '@/assets/template.xlsx'
export default {
    data() {
        return {
            outputs: [],
            canvasWidth: 1278,
            canvasHeight: 1242
        }
    },
    mounted() {
        this.$refs.upload.addEventListener('change', e => { //绑定监听表格导入事件
            this.readExcel(e);
        })
        let options = {
            x: 100,
            y: 100,
            x1: 600,
            y1: 600,
            color: '#B2B2B2',
            drawWidth: 2,
            id: 'Triangle'
        };
        // this.$refs.canvas.drawDottedline(options);
        this.handleAdd(bg)
    },
    methods: {
        readExcel(e) { //表格导入
            var that = this;
            const files = e.target.files;
            if (files.length <= 0) { //如果没有文件名
                return false;
            } else if (!/\.(xls|xlsx)$/.test(files[0].name.toLowerCase())) {
                this.$Message.error('上传格式不正确，请上传xls或者xlsx格式');
                return false;
            }
            const fileReader = new FileReader();
            fileReader.onload = (ev) => {
                try {
                    const data = ev.target.result;
                    const workbook = XLSX.read(data, {
                        type: 'binary'
                    });
                    const wsname = workbook.SheetNames[0]; //取第一张表
                    const ws = XLSX.utils.sheet_to_json(workbook.Sheets[wsname]); //生成json表格内容
                    that.outputs = []; //清空接收数据
                    //编辑数据
                    console.log('--->', ws)
                    for (var i = 0; i < ws.length; i++) {
                        var sheetData = {
                            stuName: ws[i].stu_name,
                            teaName: ws[i].tea_name,
                            schName: ws[i].sch_name,
                            picName: ws[i].pic_name
                        }
                        that.outputs.push(sheetData);
                    }
                    this.$refs.upload.value = '';
                } catch (e) {
                    return false;
                }
            };
            fileReader.readAsBinaryString(files[0]);
        },
        handleAdd(item) {
            this.$refs.canvas.createImage(item.url, { 
            	id: item.id,
            	left: 0,
            	top: 0
            });
        },
        clearSvg () {
        	this.outputs.map((item, index)=>{
        		this.$refs.canvas.createTextbox(item.stuName, {
        			fontSize: 12,
	        		top: 438 + Math.floor(index/3)*328, 
	        		left: 136 + index%3*378, 
	        		width: 50 
	        	});
        	})
        	this.outputs.map((item, index)=>{
        		this.$refs.canvas.createTextbox(item.teaName, {
        			fontSize: 12,
	        		top: 438 + Math.floor(index/3)*328, 
	        		left: 340 + index%3*378, 
	        		width: 50 
	        	});
        	})
        	this.outputs.map((item, index)=>{
        		this.$refs.canvas.createTextbox(item.schName, {
        			fontSize: 12,
	        		top: 454 + Math.floor(index/3)*328, 
	        		left: 136 + index%3*378, 
	        		width: 50 
	        	});
        	})
        	this.outputs.map((item, index)=>{
        		this.$refs.canvas.createTextbox(item.picName, {
        			fontSize: 16,
        			fillColor: '#ac4c50',
	        		top: 406 + Math.floor(index/3)*328, 
	        		left: 316 + index%3*378, 
	        		width: 50 
	        	});
        	})
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
            var svgBlob = new Blob([svg], {type:"image/svg+xml;charset=utf-8"});
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "百竹印务"+ new Date().getTime() +".svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        },
        toExcel () {
            // let svg = this.$refs.canvas.toSvg()
            var svgBlob = new Blob([template], {type:"application/xls;charset=utf-8"});
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = "template.xlsx";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    }
}

</script>
