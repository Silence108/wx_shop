// pages/confirmOrder/confirmOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title:'憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
    imgUrl:'https://img.alicdn.com/imgextra/i1/628189716/TB2KviRo.lnpuFjSZFjXXXTaVXa_!!628189716.jpg_430x430q90.jpg',
    modelactive:'奶油味',
    typeactive:'500g',
    price:'29.9',
    num:'1',
    totalprice:'29.9'
  },
  // 选择地址
  chooseAddress:function(){
    wx.showActionSheet({
      itemList: ['使用微信地址', '添加新增地址'],
      success: function (res) {
        console.log(res.tapIndex);
        if (res.tapIndex == 0){
          wx.chooseAddress({
            success: function (res) {
              console.log(res.userName)
              console.log(res.postalCode)
              console.log(res.provinceName)
              console.log(res.cityName)
              console.log(res.countyName)
              console.log(res.detailInfo)
              console.log(res.nationalCode)
              console.log(res.telNumber)
            }
          })
        }
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
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