# form-validate
表单验证插件.
1.依赖zepto || jQuery.这个是市面上少有的支持zepto的插件哦.
2.支持对表单的输入框和下拉框的语法校验.和点击确定按钮对整个表单的表单元素进行语法校验.
使用方法:
要进行语法校验的表单添加data-validate这个属性.
每个data-validate的属性分为两部分.1.规则项,2.具体的规则.
一规则项的使用.

规则项的使用demo1:

<input id="userName" type="text" data-validate="必填:required">
在点击表单的提交按钮的时候,如果#userName没有填写的话就会自动提示"请输入你的必填项"
demo2:
<input id="userName" type="text" data-validate="用户名:required,chinese">
在点击表单的时候会做两个校验1.是否为空.为空则提示"请输入你的用户名",
而如果输入框不为空,则第一层校验通过,则提示"请输入正确的用户名".
表单根据用户写的规则项,智能提示.

1.必填
<input type="text" data-validate="必填:required">
2.中文
<input type="text" data-validate="中文:chinese">
3.数字
<input type="text" data-validate="数字:number">
4.密码
<input type="password" data-validate="密码:password">
5.qq
<input type="text" data-validate="qq:qq">
6.身份证
<input type="text" data-validate="身份证:cardId">
7.邮箱地址:
<input type="text" data-validate="邮箱地址:email">
8.银行卡号
<input type="text" data-validate="银行卡号:bankNumber">