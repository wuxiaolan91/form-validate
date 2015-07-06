# form-validate
表单验证插件.
#### 1.依赖zepto || jQuery.这个是市面上少有的支持zepto的插件哦.
#### 2.支持对表单的输入框和下拉框的语法校验.和点击确定按钮对整个表单的表单元素进行语法校验.
## 使用方法:
要进行语法校验的表单添加data-validate这个属性.
ps:现在支持的表单控件:输入框和下拉列表
每个data-validate的属性分为两部分.1.规则项,2.具体的规则.
### 规则项的使用.

#### 规则项的使用demo1:

<input id="userName" type="text" data-validate="必填:required">
在点击表单的提交按钮的时候,如果#userName没有填写的话就会自动提示"请输入你的必填项"
#### demo2:
<input id="userName" type="text" data-validate="用户名:required,chinese">
在点击表单的时候会做两个校验1.是否为空.为空则提示"请输入你的用户名",
而如果输入框不为空,则第一层校验通过,则提示"请输入正确的用户名".
表单根据用户写的规则项,智能提示.

1.必填
```html
<input type="text" data-validate="必填:required">
```
2.中文
```html
<input type="text" data-validate="中文:chinese">
```
3.数字
```html
<input type="text" data-validate="数字:number">
```
4.密码
```html
<input type="password" data-validate="密码:password">
```
5.qq
```html
<input type="text" data-validate="qq:qq">
```
6.身份证
```html
<input type="text" data-validate="身份证:cardId">
```
7.邮箱地址:
```html
<input type="text" data-validate="邮箱地址:email">
```
8.银行卡号
```html
<input type="text" data-validate="银行卡号:bankNumber">
```
9.真实姓名(非网络用名)
```html
<input type="text" data-validate="真实姓名:trueName">
```
10.company
```html
<input type="text" data-validate="公司名:company">
```
11.手机号
```html
<input type="text" data-validate="公司名:phone">
```
12.range
```html
<input type="text" data-validate="范围:range">
```
这里
data-start设置最小值,data-end设置最大值

13.最小长度
```html
<input type="text" data-validate="用户名:minLength5">
```
14.最大长度
```html
<input type="text" data-validate="用户名:maxLength15">
```
### 如果一个输入框有多个校验项目,在校验规则里用逗号隔开,比如
```html
<input type="text" data-validate="用户名:minLength5,maxLength15">
```