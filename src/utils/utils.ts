// 接口
interface IndexObj{
    [key: string]: any  // 可索引
}



/**
 * 根据屏幕宽度设置根标签字体大小
 */
export const remInit =  function() {
    document.addEventListener('DOMContentLoaded', function () {
        let html: any = document.querySelector('html')
        let fontSize: (number | string) = window.innerWidth / 23   // 屏幕的23分之一
        fontSize = fontSize > 50 ? '50px' : fontSize + 'px'
        html.style.fontSize = fontSize
    })
}


/**
 * 判断对象有无指定属性
 * @param {Object} obj 判断的对象
 * @param {String} key 判断的属性名(键名)
 * @return {Boolean} true为有属性
 */
export const hasKey = function(obj: object, key: string): boolean {
    let status = obj.hasOwnProperty(key) && (key in obj) ? true : false
    return status
}

/**
 * 字符串去除空格
 * @param {String} str 被处理的字符串
 */
export const noSpace = function(str: string) {
    return str.replace(/\s+/g, '');
}

/**
 * 将url携带的数据，转换为对象
 * @param {String} url url路径
 */
export const parseParams = function(url: string): object {
    let search = new URL(url).search
    let arr = search.replace('?', '').split('&') // 把？去掉，切割为数组
    let obj: IndexObj = {}
    arr.forEach(e => {
        let list = e.split('=')
        obj[list[0]] = list[1]
    });
    return obj
}

/**
 * 深拷贝
 * @param {Object} target "要深拷贝的对象"
 * @param {Object} newObj "拷贝后的一个新的对象"
 */
export const deepClone =function (target: IndexObj, newObj: IndexObj) {
    for (const key in target) {
        if (target.hasOwnProperty(key)) {
            let temp = target[key]
            if (Object.prototype.toString.call(temp) === "[object,Array]") {
                newObj[key] = []
                deepClone(temp, newObj)
            } else if (Object.prototype.toString.call(temp) === "[object,Object]") {
                newObj[key] = {}
                deepClone(temp, newObj)
            } else {
                newObj[key] = temp
            }
        }
    }
}

/**
 * 
 * @param {*} date "转换的日期"
 * @param {string} [spare] "年月日数间隔符"
 * @param {string} [timeSpare] "时分秒间隔符"
 */

export const filterTime =  function(date: (string | number), spare: string = '-', timeSpare: string = ':') {
    // 补零
    function fix(i: number): (string | number) {
        typeof i !== 'number' ? i = parseInt(i) : null
        return i < 10 ? `0${i}` : i
    }
    // 生成时间
    function time(t: (string | number), spare = '-', timeSpare = ':'): string {
        let [y, m, d, h, mi, ms] = [
            new Date(t).getFullYear(),
            new Date(t).getMonth() + 1,
            new Date(t).getDate(),
            new Date(t).getHours(),
            new Date(t).getMinutes(),
            // new Date(t).getMilliseconds().toString().substr(0, 2)  毫秒
            new Date(t).getSeconds()
        ]
        return `${y}${spare}${fix(m)}${spare}${fix(d)} ${fix(h)}${timeSpare}${fix(mi)}${timeSpare}${fix(ms)}`
    }
    // 获取长度
    let len = null
    if (typeof date === 'number') {
        len = date.toString().length
        // date = parseInt(date)
    } else {
        len = date.length
        len == 13 ? date = parseInt(date) : null
    }
    if (len === 10) {
        date = typeof date === 'string' ? parseInt(date) : date
        return time(date * 1000, spare, timeSpare)
    } else if (len === 13) {
        return time(date, spare, timeSpare)
    } else {
        return time(date, spare, timeSpare)
    }
}