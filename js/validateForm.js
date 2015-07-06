(function(){

	/**
	 * auther:吴晓兰
	 * 这个表单验证组件,我打算写成一个zepto的元素的拓展方法
	 */
	var cfg = null,
		validateTip = "",
		validateObj = {
			isBankNumber:function(str){
				
				if(str.length==16||str.length==19){
					return true;
				}else{
					return false;
				}
			},
			/**
			 * 验证是不是中文字符
			 * @param  {[type]} strChinese [description]
			 * @param  {[type]} showMsg    [description]
			 * @return {[type]}            [description]
			 */
			isChinese:function(strChinese,showMsg){
				var reg=/^[\u4e00-\u9fa5]+$/i;
			   //var reg=/^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;//支持少数民族
			   var str=$.trim(strChinese);
			   if(!reg.test(str)){
			       //if(showMsg==null||showMsg=="") alert("请输入汉字!");
			       return false;
			   }   
			   return true;
			},
			/**是不是银行卡卡号
			 * 
			 * @return {Boolean} [返回true代表是银行卡号,否则为false]
			 */
			isBankNumber:function(str){
				if(str.length==16||str.length==19){
					return true;
				}else{
					return false;
				}
			},
			/**
			 * 是否是密码
			 * @return {Boolean} [description]
			 */
			isPassword:function(str){
				var filter = /^([0-9a-zA-Z]){6,20}$/;
				if (!filter.exec(str)) return false;
					return true;
			},
			/**
			 * 是否是密码Other
			 * @return {Boolean} [description]
			 */
			isPasswordOther:function(str){
				// var filter = /^([0-9a-zA-Z]){6,20}$/;
				var filter = /^[\@A-Za-z0-9\!\#\$\%\^\&\*\.\~]{6,20}$/;
				if (!filter.exec(str)) return false;
					return true;
			},
			isEmail:function(email){
		   		var strEmail=$.trim(email);
		   		//^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$
		   		if (/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(strEmail)){
				    //return true;
				    return true;
				  }else{
				    //if(showMsg==null||showMsg=="") alert("Email格式不正确");
				    //return false;
				    //if(showMsg==null||showMsg=="") reback="Email格式不正确";
				    return false;
				  }
			},
			/**
			 * 字符的长度
			 * @param  {[type]} str [description]
			 * @return {[type]}     [description]
			 */
			strLen:function(str){
				var len = 0;   
				  for(i=0;i<str.length;i++)   
				  {   
					if(str.charCodeAt(i)>256)   
					{   
						len += 2;   
					}   
					else   
					{   
						len++;   
					}   
				  }   
					return len;
			},
			/**
			 * 验证是不是中文字符
			 * @param  {[type]} strChinese [description]
			 * @param  {[type]} showMsg    [description]
			 * @return {[type]}            [description]
			 */
			isChinese:function(strChinese,showMsg){
				var reg=/^[\u4e00-\u9fa5]+$/i;
			   //var reg=/^[\u4E00-\u9FA5]{2,5}(?:·[\u4E00-\u9FA5]{2,5})*/;//支持少数民族
			   var str=$.trim(strChinese);
			   if(!reg.test(str)){
			       //if(showMsg==null||showMsg=="") alert("请输入汉字!");
			       return false;
			   }   
			   return true;
			},
			/**
			 * 验证字符的位数
			 * @return {[boolean]} [description]
			 */
			checkLength:function(str){
				return /[0-9]|[a-z][A-Z]{6,20}/.test(str);
			},
			/**
			* 验证QQ
			*/
			checkQQ:function(str){
				return /^[1-9][0-9]{2,9}$/.test(str);
			},
			/**
			 * 验证用户的手机号
			 * @param  int cellPhone 用户的手机号码
			 * @return boolean           格式正确返回true,否则返回false
			 */
			checkCellPhone:function(cellPhone){
				return  /^0?(13[0-9]|15[012356789]|17[0678]|18[0-9]|14[57])[0-9]{8}$/.test(cellPhone);
			},
			checkPhoneCode:function(str){
				return /[0-9]|[a-z][A-Z]{8}/.test(str);
			},
			/**
			 * 验证用户的固定电话的区号
			 * @param  int telarea 用户的固定电话的区号
			 * @return boolean           格式正确返回true,否则返回false
			 */
			checkTelarea:function(telarea){
				;
				return /^0[0-9]{2,3}$/.test(telarea);
			},
			/**
			 * 验证用户的固定电话的号码
			 * @param  int telnum 用户的固定电话的号码
			 * @return boolean           格式正确返回true,否则返回false
			 */
			checkTelnum:function(telnum){
				return  /^[2-9][0-9]{6,7}$/.test(telnum);
			},
			/**
			 * 检查身份证是否格式正确
			 * @param  string id 身份证号
			 * @return boolean    格式正确返回true,否则返回false
			 */
			checkcardId:function(id){
				return /^(\d{15}$|^\d{18}$|^\d{17}(\d|X|x))$/.test(id);
			},
			/**
			 * 检查用户名是否是真实姓名
			 * @param  string userName 用户名
			 * @return boolean          格式正确返回true,否则返回false
			 */
			isUserName:function(userName){
				return /^[\u4e00-\u9fa5]{1,10}[·.]{0,1}[\u4e00-\u9fa5]{1,10}$/.test(userName);
			},
			isCompanyName:function(Companyname){
				var len=Companyname.length;
				var name=Companyname.split("");
				  for(var i=0;i<len;i++)
				  {
				    if(name[i]=='（'||name[i]=='）'||name[i]=='('||name[i]==')'||name[i]=='.'||name[i]=='-'||name[i]=='&'||(name[i]>='A'&&name[i]<='Z')||(name[i]>='a'&&name[i]<='z')||self.isChinese(name[i]))
				    {}
				    else
				    {
				      return false;
				    }
				  }
				  return true;
			},
			trimAll: function (str) {
				return str.replace(/\s+/g,"");
			}

		};
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
				$tip = $parent.children('.tip'),// 这个输入项的错误提示元素
				validateRule = $(this).data("validate"),// 这里面不同的验证规则应该是用逗号分隔的
				isVisible = $(this).is(":visible"),// 如果页面有用户隐藏的表单元素,那么不对它进行表单校验.
				isValidatePass = true;

			if(!validateRule || !isVisible) return false;
			var validateArray = validateRule.split(":");
			var validateItemName = validateArray[0],//验证项的名称
				validateItemValue = validateArray[1],//验证项的规则
				nodeName = $(this)[0].nodeName,
				minLength = 0,
				value = "", // 填写项的内容
				tipContent = "", // 错误提示的内容
				isThisValidate = true, // 该输入项是否通过验证,默认为是
				isNull = false; // 当必填项用户没有填写时,此项为false.

			if($tip.length<1){ // 如果该元素下没有错误提示元素，就创建一个
				$tip = $("<p class='tip'><span></span></p>");
				$parent.append($tip);
			}
			
			if(validateRule){//该元素有验证的规则
				value = $.trim($(this).prop("value"));
				if(!value) value = $(this).val();
				
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
					var validate = validateList[i],
						length = 0,
						maxLength = 0,
						firstWord = validate.substr(0,1),
						secondWord = validate.substr(1,validate.length),
						splitPosition = 0,
						secondWordFirst = "",
						secondWordLast = "",
						strType = "";

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
						if(!value) break;
					}
					
					if(validate.indexOf("n")==0){
						strType = "数字"
						if(isNaN(value)){
							isThisValidate = false;
							isValidatePass = false;
							break;
						}
					}
						
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

					if(validate == "passwordOther"){ //密码验证
						if(!validateObj.isPasswordOther(value)){ //手机格式不正确
							isThisValidate = false;
						}
					}else if(validate.indexOf("password")>-1){
						if(!validateObj.isPassword(value)){

							isThisValidate = false;
						}
					}else if(validate == "phone"){ //验证手机格式
						if(!validateObj.checkCellPhone(value)){ //手机格式不正确
							isThisValidate = false;
						}
					}else if(validate=="inviteNum"){ //判断是否是邀请码
						
						value = value.toString();
						if(value.length!=8 && value.length!=11){
							isThisValidate = false;
						}else if (value.length == 11) {
							if(!validateObj.checkCellPhone(value)){ //手机格式不正确
								isThisValidate = false;
							}
						}
					}else if(validate.indexOf("telarea")>-1){
						if(!validateObj.checkTelarea(value)){ //固定电话区号不正确
							isThisValidate = false;

							isTelarea=false;
						}
					}else if(validate.indexOf("telnum")>-1){
						if(!validateObj.checkTelnum(value)){ //固定电话号码不正确
							isThisValidate = false;
						}
						if(!isTelarea){
							isThisValidate = false;
						}
					}else if(validate == "number"){ //验证数字格式
						if(isNaN(value)){
							isThisValidate = false;
						}
					}else if(validate == "qq"){ //验证QQ
						if(!validateObj.checkQQ(value)){
							isThisValidate = false;
						}
					}else if(validate == "cardId"){ //验证身份证格式
						
						if(validateObj.checkcardId(value)!=true){ 
							isThisValidate = false;
						}
					}else if(validate.indexOf("chinese")>-1||validate.indexOf("zh")>-1){
						if(!validateObj.isChinese(value)){ //有非中文字符的东西
							isThisValidate = false;
						}
					}else if(validate == "email"){
						if(!validateObj.isEmail(value)){ //不是邮件
							isThisValidate = false;
						}
					}else if(validate == "bankNumber"){ //银行卡号
						try{
							if(!validateObj.isBankNumber(value)){ //不是邮件
								isThisValidate = false;
							}
						}catch(ex){
							
						}
						
					}
					if(validate.indexOf("interger")>-1){
						//不是整数
						if(!/^\d+$/.test(this.value)){
							isThisValidate = false;
						}
					}
					if(validate.indexOf("company")>-1){
						if(!validateObj.isCompanyName(value)){ //不是公司名称
							isThisValidate = false;
						}
					}else if(validate == trueName){
						if(!validateObj.isUserName(value)){ //不是公司名称
							isThisValidate = false;
						}
					//增加数字范围判断
					}
					if(validate == "range"){
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
							if(validateObj.strLen(value) < minLength){ //有非中文字符的东西
								isThisValidate = false;
							}
						}else if(validate.indexOf("maxLength")>-1){
							maxLength = validate.substr(validate.indexOf("h")+1);
							if(validateObj.strLen(value) > maxLength){ //有非中文字符的东西
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
				console.log(tipContent);

				//增加自定义msg浮框消息
				/*loadingTip.show({
					content: elem.attr('data-msg')||tipContent
				});*/
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
		cfg = $.extend(cfg,paramData);
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
