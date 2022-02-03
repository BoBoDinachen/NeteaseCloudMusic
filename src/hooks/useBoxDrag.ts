/**
 * 
 * @param element dom元素
 */
export default function useBoxDrag(element: HTMLDivElement) {
  // 拖拽功能(主要是触发三个事件：onmousedown\onmousemove\onmouseup)
  // 点击某物体时，用element对象即可，move和up是全局区域，也就是整个文档通用，应该使用document对象而不是element对象(否则，采用element对象时物体只能往右方或下方移动)
  element.onmousedown = function (e) {
    var e = e || window.event // 兼容ie浏览器
    var diffX = e.clientX - element.offsetLeft // 鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
    var diffY = e.clientY - element.offsetTop
    /* 低版本ie bug:物体被拖出浏览器可是窗口外部时，还会出现滚动条，
            解决方法是采用ie浏览器独有的2个方法setCapture()\releaseCapture(),这两个方法，
            可以让鼠标滑动到浏览器外部也可以捕获到事件，而我们的bug就是当鼠标移出浏览器的时候，
            限制超过的功能就失效了。用这个方法，即可解决这个问题。注：这两个方法用于onmousedown和onmouseup中 */
    // @ts-ignore
    if (typeof element.setCapture !== 'undefined') {
      // @ts-ignore
      element.setCapture();
    }

    document.onmousemove = function (e) {
      var e = e || window.event // 兼容ie浏览器
      var left = e.clientX - diffX
      var top = e.clientY - diffY
      // 控制拖拽物体的范围只能在浏览器视窗内，不允许出现滚动条
      if (left < 0) {
        left = 0
      } else if (left > window.innerWidth - element.offsetWidth) {
        left = window.innerWidth - element.offsetWidth
      }
      if (top < 0) {
        top = 0
      } else if (top > window.innerHeight - element.offsetHeight) {
        top = window.innerHeight - element.offsetHeight
      }
      // 移动时重新得到物体的距离，解决拖动时出现晃动的现象
      element.style.left = left + 'px'
      element.style.top = top + 'px'
    }
    document.onmouseup = function (e) { // 当鼠标弹起来的时候不再移动
      this.onmousemove = null
      this.onmouseup = null // 预防鼠标弹起来后还会循环（即预防鼠标放上去的时候还会移动）
      // 修复低版本ie bug
      // @ts-ignore
      if (typeof element.releaseCapture !== 'undefined') {
        // @ts-ignore
        element.releaseCapture()
      }
    }
  }

}