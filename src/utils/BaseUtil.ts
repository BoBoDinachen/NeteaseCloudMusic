/**
 * 将秒转换为 分:秒
 * s int 秒数
*/
function secondToMinute(second: number) {
  //计算分钟
  //算法：将秒数除以60，然后下舍入，既得到分钟数
  let h: string;
  let s: string;
  h = Math.floor(second / 60) + '';
  //计算秒
  //算法：取得秒%60的余数，既得到秒数
  s = second % 60 + '';
  //将变量转换为字符串
  //如果只有一位数，前面增加一个0
  h = (h.length == 1) ? '0' + h : h;
  s = (s.length == 1) ? '0' + s : s;
  return h + ':' + s;
}
/**
 * 对数值进行单位转换
 * @param num 数值
 * @returns 
 */
const unitConverter = (num: number) => {
  if (!num || isNaN(num)) {
    return '请传入数值格式的数据'
  }
  // 此处为防止字符串形式的数值进来，因为toFixed方法只能用于数值型数
  num = Number(num)
  if (Math.abs(num) > 100000000) {
    return (num / 100000000).toFixed(0) + '亿'
  } else if (Math.abs(num) > 10000) {
    return (num / 10000).toFixed(0) + '万'
  } else if (Math.abs(num) > 1000) {
    return (num / 1000).toFixed(0) + '千'
  }else if (Math.abs(num) > 100) {
    return num
  }else {
    return num
  }
}
/**
 * 将时间戳转换为日期对象
 * @param timeStamp 时间戳
 * @returns 
 */
function getTsFormatDate(timeStamp: number) {
  let date = new Date(timeStamp);
  //console.log(date); 结果为：Tue Apr 02 2019 07:49:23 GMT+0800 (中国标准时间)
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let month_str: string = '';
  let strDate = date.getDate();
  let date_str: string = '';
  if (month >= 1 && month <= 9) {
    month_str = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    date_str = "0" + strDate;
  }
  var currentdate = month_str + "月" + date_str + "日";
  return currentdate;
}

/**
 * 解析dt毫秒时间
 * @param mss 
 * @returns 
 */
function formatDuring(mss: number) {
  // var days = parseInt(mss / (1000 * 60 * 60 * 24));
  // var hours = parseInt((mss % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = parseInt((mss % (1000 * 60 * 60)) / (1000 * 60) + '');
  var seconds = parseInt((mss % (1000 * 60)) / 1000 + '');
  let minutes_str = '';
  let seconds_str = '';

  if (minutes.toString().length === 1) {
    minutes_str = '0' + minutes;
  } else {
    minutes_str = minutes.toString();
  }
  if (seconds.toString().length === 1) {
    seconds_str = '0' + seconds;
  } else {
    seconds_str = seconds.toString();
  }
  return minutes_str + ":" + seconds_str;
}

export { secondToMinute, unitConverter, getTsFormatDate, formatDuring }