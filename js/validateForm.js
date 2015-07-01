(function(){
	var CFG = null;
	var validateForm = {
		
	}
	/**
	 * [checkRule 对表单元素的语法检测]
	 * @param  {dom结构} elem [要检测语法的js dom节点]
	 * @return {boolean}      为 true则表示该dom节点语法都ok,否则表示没有通过语法检测
	 */
	var checkRule = function(elem){
		elem = $(this);
		if(!this.nodeName){
			return true;
		}
		//this = elem;
			var thisSelect = null,
				$parent = $(this).parent(),
				$tip = $parent.children('.tip'),//这个输入项的错误提示元素
				validateRule = $(this).data("validate"),//这里面不同的验证规则应该是用逗号分隔的
				isVisible = $(this).is(":visible"),//如果页面有用户隐藏的表单元素,那么不对它进行表单校验.
				validateTip = $(this).data("vtip"),
				isValidatePass = true;
			if(!validateRule || !isVisible){
				return true;
			}
			var validateItemName = validateRule.split(":")[0],//验证项的名称
				validateItemValue = validateRule.split(":")[1],
				nodeName = $(this)[0].nodeName,
				minLength = 0,
				value = "", //填写项的内容
				tipContent = "", //错误提示的内容
				isThisValidate = true, //该输入项是否通过验证,默认为是
				isNull = false; //当必填项用户没有填写时,此项为false.
			if($tip.length<1){//如果该元素下没有错误提示元素，就创建一个
				$tip = $("<p class='tip'><span></span></p>");
				$parent.append($tip);
			}
			
			if(validateRule){//该元素有验证的规则
				
				value = $.trim($(this).prop("value"));
				if(!value){
					value = $(this).val();
				}
				if(this.nodeName=="SELECT"){
					thisSelect = $(this).children('option:selected')[0];
					if(thisSelect.hasAttribute("value")&&thisSelect.value!=-1){
						value = 1;
					}else{
						value = "";
					}
					//value = $(this).children('option:selected').attr("value");
				}
				//各种不同类型的验证
				var validateList = validateItemValue.split(",");
				for(var i =0;i<validateList.length;i++){
					var validate = validateList[i];
					var length = 0;
					var maxLength = 0;
					var firstWord = validate.substr(0,1);
					var secondWord = validate.substr(1,validate.length);
					var splitPosition = 0;
					var secondWordFirst = "";
					var secondWordLast = "";
					var strType = "";
					if($(this).attr("id") == "extractAmount"){
						// debugger;
					}

					if(validate=="required"){

						if(!$.trim(value)){ //该元素为空
							isNull = true;
							if(nodeName=="SELECT"){
								tipContent = "请选择" + validateItemName;
							}else{
								tipContent = "请输入"+validateItemName;
							}
							
							isValidatePass = false;
							isThisValidate = false;
							
							console.log(elem.attr('data-empty-msg')||tipContent);
							
							return false;
						}
					}else{
						if(!value){
							break;
						}
					}
					
					
					if(validate.indexOf("n")==0){
						//debugger;
						strType = "数字"
						if(isNaN(value)){
							isThisValidate = false;
							isValidatePass = false;
							break;
						}
					}
						//if(isThisValidate){
						
							if(secondWord.indexOf("-")>-1){
								//debugger;
								splitPosition = secondWord.indexOf("-");
								secondWordFirst = secondWord.split("-")[0];
								secondWordLast = secondWord.split("-")[1];
								if(secondWordFirst!="*"){
									if(value<secondWordFirst){
										tipContent = "请输入>"+secondWordFirst;
										if(strType){
											tipContent += "的数字";
										}
										isThisValidate = false;
										isValidatePass = false;
										break;
										
									}else{
										
									}
								}
							}
						
							
						//}
						
						
						
					
					if(validate == "passwordOther"){ //密码验证
						if(!self.isPasswordOther(value)){ //手机格式不正确
							isThisValidate = false;
						}
					}else if(validate.indexOf("password")>-1){
						if(!self.isPassword(value)){

							isThisValidate = false;
						}
					}else if(validate.indexOf("phone")>-1){ //验证手机格式
						if(!self.checkCellPhone(value)){ //手机格式不正确
							isThisValidate = false;
						}
					}else if(validate=="inviteNum"){ //判断是否是邀请码
						
						value = value.toString();
						if(value.length!=8 && value.length!=11){
							isThisValidate = false;
						}else if (value.length == 11) {
							if(!self.checkCellPhone(value)){ //手机格式不正确
								isThisValidate = false;
							}
						}
						/*else if(/(?!^\d+$)(?!^[a-zA-Z]+$)[0-9a-zA-Z]{8}/.test(value)) { //是8位的数字和字母的组合
							
						}else{
							 isThisValidate = false;
						}*/
					}else if(validate.indexOf("telarea")>-1){
						if(!self.checkTelarea(value)){ //固定电话区号不正确
							isThisValidate = false;

							isTelarea=false;
						}
					}else if(validate.indexOf("telnum")>-1){
						if(!self.checkTelnum(value)){ //固定电话号码不正确
							isThisValidate = false;
						}
						if(!isTelarea){
							isThisValidate = false;
						}
					}else if(validate.indexOf("number")>-1){ //验证数字格式
						if(isNaN(value)){
							isThisValidate = false;
						}
					}else if(validate.indexOf("qq")>-1){ //验证QQ
						if(!self.checkQQ(value)){
							isThisValidate = false;
						}
					}else if(validate.indexOf("cardId")>-1){ //验证身份证格式
						
						if(self.checkcardId(value)!=true){ 
							isThisValidate = false;
						}
					}else if(validate.indexOf("chinese")>-1||validate.indexOf("zh")>-1){
						if(!self.isChinese(value)){ //有非中文字符的东西
							isThisValidate = false;
						}
					}else if(validate.indexOf("email")>-1){
						if(!self.isEmail(value)){ //不是邮件
							isThisValidate = false;
						}
					}else if(validate.indexOf("bankNumber")>-1){ //银行卡号
						try{
							if(!self.isBankNumber(value)){ //不是邮件
								isThisValidate = false;
							}
						}catch(ex){
							
						}
						
					}else if(validate.indexOf("beiyinBankNumber")>-1){
						if(value.length==16||value.length==19){ //不是邮件
							
						}else{
							isThisValidate = false;
						}
					}
					if(validate.indexOf("interger")>-1){
						//不是整数
						if(!/^\d+$/.test(this.value)){
							isThisValidate = false;
						}
					}
					if(validate.indexOf("company")>-1){
						if(!self.isCompanyName(value)){ //不是公司名称
							isThisValidate = false;
						}
					}else if(validate.indexOf("trueName")>-1){
						if(!self.isUserName(value)){ //不是公司名称
							isThisValidate = false;
						}
					//增加数字范围判断
					}
					if(validate.indexOf("range")>-1){
						if(isNaN(value)){
							isThisValidate = false;
						}else{
							value = Number(value);
							if(value<Number(elem.attr('data-start')) || value > Number(elem.attr('data-end'))){
								isThisValidate = false
							}
						}
					}
					tipContent = "请输入正确的" + validateItemName;
					//长度的验证
					if(validate.toLowerCase().indexOf("length")>-1){
						if(validate.indexOf("minLength")>-1){
							minLength = validate.substr(validate.indexOf("h")+1);
							if(self.strLen(value) < minLength){ //有非中文字符的东西
								isThisValidate = false;
							}
						}else if(validate.indexOf("maxLength")>-1){
							maxLength = validate.substr(validate.indexOf("h")+1);
							if(self.strLen(value) > maxLength){ //有非中文字符的东西
								isThisValidate = false;
							}
						}else{
							length = validate.substr(validate.indexOf("h")+1);
							if(value.length != length){ //有非中文字符的东西
								isThisValidate = false;
							}
						}
						tipContent = "请输入正确的" + validateItemName;
					}
					
				}
				
				//如果该项是复选框
				
				if(!isThisValidate){
					isValidatePass = false;
					
				}
				
			}
			if(isThisValidate){
				$tip.hide();
				$(this).removeClass('validateNoPass');
			}else{
				
				$(this).addClass('validateNoPass');
				if(validateTip){
					tipContent = validateItemName+validateTip;
				}
				//增加自定义msg浮框消息
				loadingTip.show({
					content: elem.attr('data-msg')||tipContent
				});
				//$tip.show().find("span").html(tipContent);
			}
			
			return isValidatePass;

		
	}
	$(document).on("blur","[data-validate]",function(event){
		debugger;
		if(!validate($(this))){
			return false;
		}
		var val = $(this).val(),target = event.target,relatedTarget = event.relatedTarget;

		if(val){ 
			if(relatedTarget){
				//如果点击的目标元素是提交按钮,那么就不做当钱元素失去焦点的语法判断
				if($(relatedTarget).hasClass("submit")){
					return;
				}else if($(relatedTarget).hasClass("clearBtn")&&$(relatedTarget).parent()==$(this).parent()){
					return;
				}
			}
			if(target.nodeName == "SELECT"){
				if(this.firstElementChild){
					if(this.firstElementChild.value != this.value){
						checkRule.call(this);
					}
				}else{
					checkRule.call(this);
				}
				
			}else{
				checkRule.call(this);
			}
			
		}
		
	});
	/*$(document).on("focus keyup","[data-validate]",function(event){
		//if(!$(this).val()){
			console.log("removeClass");
			$(this).removeClass("validateNoPass");
		//}
		
	});*/

	/**
	 * 验证该jQuery表单元素里的input,textarea,select
	 * 调用方式:$formElem.validateForm();
	 * 			表单元素里的表单控件得写验证规则,比如<input data-validate="用户名:required" />
	 * @param  Object paramData 参数对象
	 * @return boolean           验证通过返回true,否则返回false
	 */
	
	$.fn.validateForm = function(paramData){
		
		var form = this;
		CFG = $.extend(CFG,paramData);
		var isValidatePass = true;//该表单是否验证通过，true为通过
		var isTelarea = true;//固话区号是否通过验证,默认为是
		//var $validateELemList = $(this).find("input,textarea,select:visible");
		$(this).addClass('validateForm');//添加这个类,以便控制该form下的提示的样式
		var registerStepOne = document.forms.registerStepOne;
		var $validateELemList = $(this).find("[data-validate]");

		$validateELemList.removeClass("validateNoPass")
		$(this).find("[data-validate]").each(function(index, el) {
			$(el).removeClass('validateNoPass');
			if(!validate($(el))){
				return false;
			}
			var a =  checkRule.call(el);
			if(!a){
				isValidatePass = false;
				return false;
			}
		});
		return isValidatePass;
	}
	
	/*
	 * 
	 */
	
	function validate(elem){
		var args = elem.attr('data-args'),
			value = elem.val(),
			i=0, arg, len,
			pattern, rule;
		if(/^{.+?}$|^\[.+?\]$/g.test(args)){
			try{
				args = JSON.parse(args);
			}catch(e){
				throw new SyntaxError('Badly formed JSON string: ' + args);
			}
		}else{
			args = [];
		}
		if(!$.isArray(args)){
			args = [args];
		}
		len=args.length;
		for(; i<len; i++){
			arg = args[i];
			rule = arg.rule;
			//simple pattern converter
			pattern = !arg.pattern ? regs_cache[rule] : (Function("return "+ arg.pattern))();
			//pattern = regs_cache[rule] ? regs_cache[rule] : (Function("return "+ arg.pattern))();
			//make sure that pattern has given
			pattern = pattern || /.*?/g;
			//save it as cache
			if(rule){
				regs_cache[rule] = pattern;
			}
			if(!pattern.test(value)){
				loadingTip.show({
					content: arg.msg
				});
				return false;
			}
			return true;
		}
		return true;
	}
	
	var regs_cache = {
		'phone': /^1[358](\d+){9}$/g,
		'test': /\s+/g
	};
})();
