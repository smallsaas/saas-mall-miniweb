// pages/personal/feedback/index.js
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:"",
    imgList: [
      { url: 'https://img.yzcdn.cn/vant/leaf.jpg', name: '图片1' },
      // Uploader 根据文件后缀来判断是否为图片文件
      // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      {
        url: 'http://iph.href.lu/60x60?text=default',
        name: '图片2',
        isImage: true
      }
    ],
    feedBackSub:{
      content:"",
      image_list:[]
    }
  },

  //提交意见反馈信息 
  subForm: function(){
    var that = this
    var feedBackSub = that.data.feedBackSub

    console.log("提交数据 == ", feedBackSub)
    if (!feedBackSub.content){
      wx.showToast({
        title: "请输入反馈内容",
        icon: "none"
      })
      return;
    }

    app.webapi.postFeedBackInfo(feedBackSub)
      .then(res => {
        wx.hideLoading()
        var data = res.data
        if (data.status_code === 0) {
          console.log("提交成功 == ", data)
          feedBackSub.content = ""
          feedBackSub.image_list = []
          that.setData({
            feedBackSub: feedBackSub
          })
        }
      })
      .catch(res => {
        console.log("postFeedBackInfo--catch--res==", res)
        wx.hideLoading()
      })

  },

  // 评价内容；
  contentTextInput: function (event) {
    console.log('contentTextInput---event', event)
    var that = this
    var value = event.detail
    console.log('contentTextInput---value', value)
    var feedBackSub = that.data.feedBackSub
    feedBackSub.content = value
    that.setData({
      feedBackSub: feedBackSub
    })
  },

  // 删除图片；
  delImg: function (event) {
    var that = this
    var imgIndex = event.currentTarget.dataset.imgIndex
    var feedBackSub = that.data.feedBackSub
    feedBackSub.image_list.splice(imgIndex, 1)
    // console.log('删除图片 == ', feedBackSub)
    that.setData({
      feedBackSub: feedBackSub
    })
  },

  // 上传图片；
  chooseImage: function (event) {
    var that = this
    var feedBackSub = that.data.feedBackSub
    var formatHeader = "";
    wx.chooseImage({
      success: function (res) {
        // console.log('wx.chooseImage----success---res', res)
        var tempFilePaths = res.tempFilePaths
        if (tempFilePaths.length >= 1) {

          for (var i = 0; i < tempFilePaths.length; i++) {
            var filePath = tempFilePaths[i]
            var imgFormat = filePath.substring(filePath.lastIndexOf(".")+1, filePath.length)
            if(imgFormat == "jpg"){
              formatHeader = "data:image/jpeg;base64,"
            } else if (imgFormat == "png") {
              formatHeader = "data:image/png;base64,"
            }else{
              console.log("上传格式只支出jpg和png");
              return;
            }
            var imgBase64 = formatHeader + wx.getFileSystemManager().readFileSync(filePath, 'base64')
            // console.log("imgBase64 === ", imgBase64)
            app.webapi.uploadImage(imgBase64)
              .then(res => {
                wx.hideLoading()
                var data = res.data
                if (data.status_code === 0) {
                  feedBackSub.image_list.push(data.data)
                  that.setData({
                    feedBackSub: feedBackSub
                  })
                }
              })
              .catch(res => {
                console.log("uploadImage--catch--res==", res)
                wx.hideLoading()
              })

          }
        }
        that.setData({
          feedBackSub: feedBackSub
        })
      }
    })
  },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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