(function(){
	var loadingTimeout = null;
	var Tip = function(paramData){
		
		var cfg = null;
		paramData = getParamObj(paramData);
		var $wrap = paramData.$wrap || $("#globalTip");
		if($wrap.length<1){
			var wrap = document.createElement("div");
			wrap.id = "globalTip";
			wrap.innerHTML = "<div><i class='waitIcon'></i><p></p></div>";
			document.body.appendChild(wrap);
			$wrap = $("#globalTip");
		}
		cfg = {
			$wrap:$wrap,
			$tipContent:$wrap.find("p"),
			content:"请求正在加载中...",
			showTime:2000, //tip显示的时间,过了这个时间后如果hide没有设置为false,tip元素就自动隐藏
			hide:true,//提示显示后是否主动消失
			isWait:false,
		};
		this.cfg = $.extend(cfg,paramData);
			
	};
	/**
	 * [getParam 获得new对象的时候传过来的参数]
	 * @return {param} [description]
	 */
	var getParamObj = function(paramData){
		var paramObj = {};
		var paramType = typeof paramData;
		if(paramType == "object"){
			paramObj = paramData;
		}else if(paramType = "string"){
			paramData = {
				content:paramData
			}
		}
		return paramObj;
	};
	Tip.prototype.show = function(cfg){
		
		if(typeof cfg == "string"){
			this.cfg.content = cfg;
		}else{
			$.extend(this.cfg,cfg);
		}
		
		this.cfg.$tipContent.html(this.cfg.content);
		this.cfg.$wrap.hide();
		var marginLeft = 0;marginTop = 0;
		var $waitCon = this.cfg.$wrap.find(".waitIcon");//loading的时候显示的图标
		this.cfg.isWait?$waitCon.show():$waitCon.hide();
		this.cfg.$tipContent.html(this.cfg.content);
		this.cfg.$wrap.show();

		this.cfg.width = this.cfg.$wrap.width();
		this.cfg.height = this.cfg.$wrap.height();
		marginTop = -(this.cfg.height / 2);
		marginLeft = -(this.cfg.width / 2);
		this.cfg.$wrap.css("marginLeft", marginLeft + "px");

		
		if(this.cfg.hide){
			//debugger;
			window.my = this;
			clearTimeout(loadingTimeout);
			//使用function防止内存泄露
			
			loadingTimeout = setTimeout(function(){
				//debugger;
				my.cfg.$wrap.hide();
				console.log("hide了哦");
				if(my.cfg.callBack){
					my.cfg.callBack();
				}

			}, this.cfg.showTime);
			
		}
		}
		Tip.prototype.setTipInfo = function(paramData){

			this.cfg.$tipContent.html(paramData.content);
		}
		Tip.prototype.hide = function(paramData){
			this.cfg.$wrap.hide();
			if(paramData&&paramData.callBack){
				paramData.callBack();

			}
		};
	window.Tip = Tip;
})();