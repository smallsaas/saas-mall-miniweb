// pages/personal/collection/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageURL:"https://img.yzcdn.cn/vant/t-thirt.jpg"
  },

  //删除按钮
  onClose(event) {
    const { position, instance } = event.detail;
    switch (position) {
      case 'left':
      case 'cell':
        instance.close();
        break;
      case 'right':
        Dialog.confirm({
          message: '确定删除吗？'
        }).then(() => {
          instance.close();
        });
        break;
    }
  },


  touchS: function (e) {
    var that = this
    // console.log(e)
    if (e.touches.length == 1) {
      that.setData({
        startX: e.touches[0].clientX     //开始触摸的x位置
      })
    }
  },
  touchM: function (e) {
    var that = this
    // console.log(e)
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX      //移动时的x位置
      var disX = that.data.startX - moveX       //移动的x距离差值
      var delW = that.data.delWidth      //删除按钮宽度
      var style = ''
      if (disX == 0 || disX < 0) {
        style = "left:0px"
      } else if (disX > 0 && disX < delW) {
        style = "left:-" + disX + "px";
      } else if (disX >= delW) {
        style = "left:-" + delW + "px";
      }
    }

    var idx = e.target.dataset.idx;
    var list = that.data.list;
    if (idx >= 0) {
      list[idx].style = style
      // console.log(style)
      that.setData({
        list: list
      })
    }
  },
  touchE: function (e) {
    // console.log(e)
    var that = this
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = that.data.startX - endX;
      var delW = that.data.delWidth;

      var style = disX > delW / 3 ? "left-" + delW + "px" : "left:0";
      var idx = e.target.dataset.idx;
      var list = that.data.list;
      if (idx >= 0) {
        list[idx].style = style
        that.setData({
          list: list
        })
      }
    }
  },
  // 转换单位
  getDelWidth: function (w) {
    var real = 0;
    try {
      var res = wx.getSystemInfoSync().windowWidth;
      var scale = (750 / 2) / (w / 2);
      // console.log(scale);
      real = Math.floor(res / scale);
      return real;
    } catch (e) {
      return false;
    }
  },
  initEleWidth: function () {
    var delWidth = this.getDelWidth(this.data.delWidth);
    this.setData({
      delWidth: delWidth
    })
  },
  delItem: function (e) {
    var that = this
    var idx = e.target.dataset.index;
    var list = that.data.list
    console.log(idx)
    list.splice(idx, 1);
    that.setData({
      list: list
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})