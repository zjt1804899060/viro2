function Scratch() {
    this.canvas=document.querySelector(".myCanvas");
    this.context= this.canvas.getContext('2d');
    this.p1 = document.querySelector(".prize");
    this.Scratchmessage_chance=document.querySelector(".Scratchmessage_chance");
    this.Scratchmessage_message=document.querySelector(".Scratchmessage_message");
    this.winning_information=document.querySelector(".Winning_information");
    this.winning_informationspan=document.querySelector(".Winning_information span");
    this.key=0;//判断是否刮了
}
Scratch.prototype={
    //适配
    Adaptation:function () {
        var screenX=document.body.clientWidth / 20;
        var htmlBox=document.getElementById("htmlBox");
        if (screenX*20>=640) {
            htmlBox.style.fontSize="16px";
        }
        else
        {
            htmlBox.style.fontSize=screenX+"px"
        }
    },
    //画布
    Canvas:function () {
        var canvasW=this.p1.clientWidth;
        var canvasH=this.p1.clientHeight;
        this.canvas.width=canvasW;
        this.canvas.height=canvasH;
        this.context.fillStyle = "#272f44";
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
// 设置字体大小和字体类型
        this.context.font = "1.15rem Courier New";
// 设置字体填充颜色
        this.context.fillStyle = "#333c52";
// 从坐标点(0,21)开始绘制文字
        this.context.fillText(" 刮刮刮 刮刮刮 刮刮刮 刮刮刮 ", 0, 20);
        this.context.fillText(" 刮刮刮 刮刮刮 刮刮刮 刮刮刮 ", 0, 46);
        this.context.fillText(" 刮刮刮 刮刮刮 刮刮刮 刮刮刮 ", 0, 72);
        this.context.fillText(" 刮刮刮 刮刮刮 刮刮刮 刮刮刮 ", 0, 98);
        this.context.fillText(" 刮刮刮 刮刮刮 刮刮刮 刮刮刮 ", 0, 124);
    },
    //中奖几率
    randomNum:function () {
        function randomNum(n) {
            if(Math.floor(Math.random() * n )==n){
                return n-1;
            }else {
                return Math.floor(Math.random() * n );
            }
        }
        var arr = ["特等奖", "一等奖", "二等奖", "二等奖", "谢谢惠顾",
            "谢谢惠顾", "谢谢惠顾", "谢谢惠顾", "谢谢惠顾", "谢谢惠顾", "谢谢惠顾", "谢谢惠顾", "谢谢惠顾", "谢谢惠顾"
        ];
        //随机下标
        var index = randomNum(arr.length);
        var p1 = document.querySelector(".prize");
        //显示奖项
        p1.innerHTML = arr[index];
    },
    //触摸事件
    touchstart:function () {
        var that=this;
        var key= 0;
        var documentscrollTop=null;
        this.canvas.addEventListener('touchstart', function(ev) {
            //获取Scratch的offsetTop
            var Scratchoffset=document.querySelector(".Scratch");
            var canvasoffsetTop=that.canvas.offsetTop;
            var ScratchoffsetTop=Scratchoffset.offsetTop;
            var offsetY=canvasoffsetTop+ScratchoffsetTop;//canvas到屏幕最顶端距离
            var canvasoffsetLeft=that.canvas.offsetLeft;
            var ScratchoffsetLeft=Scratchoffset.offsetLeft;
            var offsetX=canvasoffsetLeft+ScratchoffsetLeft;//canvas到屏幕最左端距离
            //获取页面的scrollTop值
            documentscrollTop=null;//重置值防止有两个或多个值画圆
            documentscrollTop=document.body.scrollTop;
            //当手指触摸canvas是禁止页面滚动
            key=1;
            document.addEventListener("touchmove", function (e) {
                if (key == 1) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, false);
            var Event= ev || window.event;
            var touchmoveX = Event.changedTouches[0].clientX - offsetX ;
            var touchmoveY = Event.changedTouches[0].clientY - (offsetY - documentscrollTop);
            that.context.globalCompositeOperation = "destination-out";
            that.context.beginPath();
            that.context.arc(touchmoveX,touchmoveY, 20, 0, Math.PI * 2, true);
            that.context.fill();
            // console.log(touchmoveX);
            // console.log(touchmoveY);
            // 手指在屏幕上滑动的时候触发
            that.canvas.addEventListener('touchmove', function(ev) {
                var Event= ev || window.event;
                var touchmoveX = Event.changedTouches[0].clientX - offsetX ;

                var touchmoveY = Event.changedTouches[0].clientY - (offsetY - documentscrollTop);
                //设置图形组合方式 保留不重合部分
                that.context.globalCompositeOperation = "destination-out";
                //画圆

                that.context.beginPath();
                that.context.arc(touchmoveX,touchmoveY, 20, 0, Math.PI * 2, true);
                that.context.fill();
                //如果刮过部分超过50%,则全部刮掉
                var imageData = that.context.getImageData(0, 0,  that.canvas.width,  that.canvas.height);
                var colors = imageData.data; //获取图形像素点数组
                var count = 0; //存储透明区向像素点的个数
                for (var i = 0; i < colors.length; i += 4) {
                    //获取透明度的值 colors[i + 3]
                    if (colors[i + 3] == 0) {
                        count++;
                    }
                }
                if (count > colors.length / 4 * 0.5) {
                    //清空整个画布内容
                    that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
                }
            }, false);
        }, false);
        this.canvas.addEventListener('touchend', function(event) {
            key=0;
            that.key=1;//刮了
        }, false);
    },
    //刮奖机会
    Opportunity:function(){
        var opportunity=2;//几次机会
        var that=this;
        var lamp1=document.querySelector(".lamp_1");
        var lamp2=document.querySelector(".lamp_2");
        var lamp3=document.querySelector(".lamp_3");
        var lamp4=document.querySelector(".lamp_4");
        var lamp5=document.querySelector(".lamp_5");
        var arr=["一","二","三","四","五"];
        this.Scratchmessage_chance.innerHTML="你还有"+arr[opportunity-1]+"次机会";
        //触摸按钮事件
        this.Scratchmessage_chance.addEventListener('touchstart', function() {
            //重置灯动效
            lamp1.style.animation="none";
            lamp2.style.animation="none";
            lamp3.style.animation="none";
            lamp4.style.animation="none";
            lamp5.style.animation="none";
            if(that.key==1){
                //清除画布
                that.context.clearRect(0, 0, that.canvas.width, that.canvas.height);
                if(opportunity>0){
                    that.Scratchmessage_chance.className="Scratchmessage_chance click";//改变按钮状态样式
                    that.Canvas();//重新画图
                    that.randomNum();//重新随机奖励
                }
                opportunity--;
            }else {
                if(opportunity>0){
                    that.Scratchmessage_chance.className="Scratchmessage_chance click";//改变按钮状态样式
                    that.Scratchmessage_chance.innerHTML="你还没刮呢！";
                    setTimeout(function () {
                        that.Scratchmessage_chance.innerHTML="你还有"+arr[opportunity-1]+"次机会";
                    },1000)
                }
            }
        }, false);
        //结束触摸按钮事件
        this.Scratchmessage_chance.addEventListener('touchend', function() {
            //重置灯动效
            lamp1.style.animation="lamp_1 2.8s";
            lamp2.style.animation="lamp_2 2s";
            lamp3.style.animation="lamp_3 1.5s";
            lamp4.style.animation="lamp_4 2.2s";
            lamp5.style.animation="lamp_5 2.5s";
            if(that.key==1){
                if(opportunity>0){
                    that.Scratchmessage_chance.className="Scratchmessage_chance chance";//改变按钮状态样式
                    that.Scratchmessage_chance.innerHTML="你还有"+arr[opportunity-1]+"次机会";
                }else {
                    that.Scratchmessage_chance.className="Scratchmessage_chance";//改变按钮状态样式
                    that.Scratchmessage_chance.innerHTML="今天的机会用完了";
                }
            }else {
                if(opportunity>0){
                    that.Scratchmessage_chance.className="Scratchmessage_chance chance";//改变按钮状态样式
                }
            }
            that.key=0;
        }, false);
    },
    //中奖信息
    Winning_information:function () {
        var that=this;
        var informationheight=this.winning_information.clientHeight;
        var spanheight=this.winning_informationspan.clientHeight;
        var div=document.createElement("div");
        div.className="winning_information";
        var winning_information=div;
        this.Scratchmessage_message.appendChild(div);
        winning_information.style.top=informationheight+"px";
        winning_information.innerHTML += that.winning_information.innerHTML;
        setInterval(function () {
            that.winning_information.style.top=that.winning_information.offsetTop - spanheight + "px";
            winning_information.style.top=winning_information.offsetTop - spanheight + "px";
            if(that.winning_information.offsetTop==-informationheight){
                that.winning_information.style.top=informationheight-spanheight+"px";
                that.winning_information.style.display="none"
            }
            if(winning_information.offsetTop==-informationheight){
                winning_information.style.top=informationheight-spanheight+"px";
                winning_information.style.display="none"
            }
            if(winning_information.offsetTop==0){
                that.winning_information.style.display="block"
            }
            if(that.winning_information.offsetTop==0){
                winning_information.style.display="block"
            }
        },2000)
    },
    //绑定事件
    bindEvent:function(){
        this.Adaptation();//适配
        this.Canvas();//画布
        this.randomNum();//中奖几率
        this.touchstart();//触摸事件
        this.Opportunity();//刮奖机会
        this.Winning_information();//中奖信息
    }
};
var obj=new Scratch();
obj.bindEvent();
//音乐
function Music() {
    var bgm=document.querySelector(".bgm");
    var Gegg_Playmusic=document.querySelector(".Gegg_Playmusic");
    var Gegg_Stopmusic=document.querySelector(".Gegg_Stopmusic");
    var $Gegg_header_i=$(".Scratch_header i");
    var arr=['bgm.mp3','bgm1.mp3','bgm2.mp3'];//要播放的音乐列表
    var key=0;
    var Total_duration,new_duration;
    bgm.volume=0.5;//音量
    function showtime() {
        setInterval(function () {
            Total_duration=parseInt(bgm.duration);//音乐总时长
            new_duration=parseInt(bgm.currentTime);//音乐播放时间
            if(Total_duration==new_duration){ //判断是否播放完
                key++;
                var arrlength=arr.length;//存储arr数组的长度
                if(key>=arrlength){//判断是否超出音乐列表长度
                    key=0;
                }
                bgm.src=arr[key];//音乐播放
            }
        },1000);
    }
    showtime();
    bgm.src=arr[key];//音乐播放
    Gegg_Playmusic.onclick=function () {
        $Gegg_header_i.hide();//所有i标签隐藏
        Gegg_Stopmusic.style.display="block";//播放icon隐藏
        bgm.pause();//音乐暂停
    };
    Gegg_Stopmusic.onclick=function () {
        $Gegg_header_i.show();//所有i标签显示
        Gegg_Stopmusic.style.display="none";//暂停icon隐藏
        bgm.play();//音乐播放
    }
}
Music();



