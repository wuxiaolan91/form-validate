(function(){
	var self = null;
	var test = {
		init:function(){
			self = this;
			self.bind();
		},bind:function(){
			$("button").click(function(){

				$("#registerForm").validateForm();
			})
		}
	}
	test.init();
});