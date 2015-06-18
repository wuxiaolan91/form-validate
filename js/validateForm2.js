(function(){
	var validateForm = {
	
	};
	var checkRule = function(elem){
		var $elem = $(elem);
		var dataValidate = $elem.data("validate");

	}
	$(document).on("blur","[data-validate]",function(event){
		checkRule(this);
	});
})();

