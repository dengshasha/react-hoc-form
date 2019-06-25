### BaseInput组件
```angular2html
validator = {
    trigger | string: 触发类型，支持blur,change, 默认值：blur
    rules: [
    {
        required | boolean: 是否为必填项
        message | string: 错误提示文本
    }，
    {
        [method] | func: 自定义校验方法
        message | string: 错误提示文本
    }
    ]
}
```
