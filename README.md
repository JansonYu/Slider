一个轻量级的 react 轮播组件

# Getting Started

简介：
用react开发的轮播图组件，支持淡入淡出、水平滚动、垂直滚动的无缝轮播效果。可自定义轮播内容。

API
参数	作用	必传	数值	默认值	备注
type	轮播模式	否	opacity淡入淡出，moveHorizontal横向移动，moveVertical纵向移动	moveHorizontal	opacity类型暂不支持自定义轮播内容
data	需要渲染的数据	单标签需要传，双标签不需要传		[ ]	
stepWidth	每屏切换的宽度(px)	否		1200	
showItemNum	每屏显示的个体数量	否		1	
intervalTime	每屏切换的时间间隔(ms)	否		3000	
autoRun	自动播放	否	left向左，right向右，up向上，down向下，不写或者false禁止自动播放	禁止	left、right对应moveHorizontal，up、down对应moveVertical
hoverStop	鼠标悬浮时，是否停止播放	否	true悬浮停止，不写或者false悬浮不停止	悬浮时不停止	
point	底部是否显示轮播进度	否	true显示，false隐藏	true	

组件使用
