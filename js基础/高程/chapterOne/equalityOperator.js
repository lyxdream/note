    // 该函数形式如下：
    // toPrimitive(input,preferedType?)
    // input是输入的值，preferedType是期望转换的类型，他可以是字符串，也可以是数字。

    // 如果转换的类型是number，会执行以下步骤：
    //  1. 如果input是原始值，直接返回这个值；
    //  2. 否则，如果input是对象，调用input.valueOf()，如果结果是原始值，返回结果；
    //  3. 否则，调用input.toString()。如果结果是原始值，返回结果；
    //  4. 否则，抛出错误。

    //  如果转换的类型是String，2和3会交换执行，即先执行toString()方法。
    // 你也可以省略preferedType，此时，日期会被认为是字符串，而其他的值会被当做Number。

    console.log({}.valueOf().toString())
    
    console.log([].valueOf().toString())
    console.log({}.toString())