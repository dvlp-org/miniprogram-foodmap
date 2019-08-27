const app = getApp();
const db = wx.cloud.database()
const store = db.collection('store');
const config = require('../../config.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '加载中...',
    })
    
    /**
     * @Task 4.5.7.1 开发美食详情页的功能 —— 查询数据
     * 请在下方输入您的代码
     */
  },
  tapImage:function(e){
    wx.previewImage({
      urls: this.data.store.images,
      current: e.currentTarget.dataset.url
    })
  },
  copyPath:function(e){
    let path = this.route + "?id="+ this.data.store._id
    wx.setClipboardData({
      data: path,
      success: res => {
        wx.showToast({
          title: '路径复制成功',
          icon:"success"
        })
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    let path = '/pages/info/info?id=' + this.data.store._id;
    let image = "/images/share.jpg";
    if (this.data.store.images[0]){
      wx.cloud.getTempFileURL({
        fileList: [this.data.store.images[0]],
        success: res =>{
          return {
            title: '我在' + config.appName + '上发现了好吃的，你也看看吧！',
            path: path,
            imageUrl: res.fileList[0].tempFileURL
          }
        },
        fail: error => {
          console.error("出现Bug了",error)
        }
      })
    }else{
      return {
        title: '我在' + config.appName + '上发现了好吃的，你也看看吧！',
        path: path,
        imageUrl: image
      }
    }
    
  },
  callContact:function(event){
    wx.makePhoneCall({
      phoneNumber: this.data.store.contact
    })
  },
  navigate:function(e){
    wx.openLocation({
      latitude: this.data.store.latitude,
      longitude: this.data.store.longitude,
      name: this.data.store.title,
      address: this.data.store.address
    })
  },
  deleteItem:function(e){
    wx.showModal({
      title: '删除确认',
      content: '您真的要删除' + this.data.store.title + "么？",
      success: res => {
        if (res.confirm) {
          /**
           * @Task 4.5.7.2 完成数据删除的功能
           * 请在下方输入你的代码
           */
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})