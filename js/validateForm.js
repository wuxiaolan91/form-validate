(function(){


		var CFG = null;
		var validateForm = {
			
		}

		$(document).on("blur","[data-validate]",function(event){
			
			if(!validate($(this))){
				return false;
			}
			var val = $(this).val();
			var target = event.target;
			var relatedTarget = event.relatedTarget;
			console.log("val"+val);
			
			if(val){
				if(relatedTarget){
					//如果点击的目标元素是提交按钮,那么久不做当钱元素失去焦点的语法判断
					if($(relatedTarget).hasClass("submit")){
						return;
					}else if($(relatedTarget).hasClass("clearBtn")&&$(relatedTarget).parent()==$(this).parent()){
						return;
					}
				}
				if(target.nodeName == "SELECT"){
					if(this.firstElementChild){
						if(this.firstElementChild.value != this.value){
							self.checkRule.call(this);
						}
					}else{
						self.checkRule.call(this);
					}
					
				}else{
					self.checkRule.call(this);
				}
				
			}
			
		});
		$(document).on("focus keyup","[data-validate]",function(event){
			//if(!$(this).val()){
				console.log("removeClass");
				$(this).removeClass("validateNoPass");
			//}
			
		});
			/*var CFG = {
				phone:{
					callback:function(paramData){ //可能的接口验证

					}
				},cardId:{
					callback:function(paramData){

					}
				}
			};*/
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
			
			/*for(var i=$validateELemList.length;i>$validateELemList.length;i--){h                                                                                                                                                             
				if(!a){
					isValidatePass = false;
					return false;
				}
			}*/
			
			$validateELemList.removeClass("validateNoPass")
			$(this).find("[data-validate]").each(function(index, el) {
				$(el).removeClass('validateNoPass');
				if(!validate($(el))){
					return false;
				}
				var a =  self.checkRule.call(el);
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
