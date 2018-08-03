// pages/goods_show/goods_show.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '憨豆熊 碧根果208g 坚果零食长寿果干果奶油口味果仁食品',
    imgUrls: [
      'https://gdp.alicdn.com/imgextra/i4/628189716/TB2rUg2ktnJ8KJjSszdXXaxuFXa_!!628189716.jpg'
    ],
    indicatorDots: true,    //是否显示面板指示点
    indicatorColor: '#333',   //指示点颜色	
    indicatorActiveColor: '#999',    //当前选中的指示点颜色
    autoplay: false,
    interval: 5000,
    duration: 1000,
    nowprice: 29.9,
    oldprice: 35.8,
    freight: 12,
    model: '十年红酿',
    type: '10斤',
    num: 1,
    content: '',
    prices: [],
    modellist: ['奶油味','奶盐味','椒盐味'],
    classifylist: ['208g','500g'],
    modelactive: '奶油味',
    typeactive: '500g',
    pricid: 0,
    Tab: 0,
    current: 0,     //商品详情swiper的index
    isShow: false
  },
  // Tab改变事件
  tabChange:function(e){
    // console.log(e.target.dataset.value);
    var that = this,
      index = e.target.dataset.value;
    that.setData({
      current: index,
      Tab: index
    })
  },
  // 商品详情swiper改变
  swiperChange:function(e){
    // console.log(e.detail.current);
    var that = this,
      index = e.detail.current;
    that.setData({
      current: index,
      Tab: index
    })
  },
  // 点击上方已选***
  chooseType:function(e){
    var that = this,
      isShow = that.data.isShow;
    if(!isShow){
      that.setData({
        isShow: true
      })
    }
  },
  // 点击遮罩层 
  markClick:function(e) {
    var that = this,
      isShow = that.data.isShow;
    if (!isShow) {
      that.setData({
        isShow: true
      })
    }else {
      that.setData({
        isShow: false
      })
    }
  },
  // 选择型号，改变价格
  changeModel: function (e) {
    var that = this,
      prices = that.data.prices,
      classifyactive = that.data.typeactive;
    that.setData({
      modelactive: e.target.dataset.value
    });
    for (var i = 0; i < prices.length; i++) {
      if (prices[i].model == e.target.dataset.value && prices[i].classify == classifyactive) {
        that.setData({
          nowprice: prices[i].vipprice,
          oldprice: prices[i].price,
          pricid: prices[i].id
        })
        console.log(prices[i].id)
      }
    }
  },
  // 选择分类，改变价格
  changeType: function (e) {
    var that = this,
      prices = that.data.prices,
      modelactive = that.data.modelactive;
    that.setData({
      typeactive: e.target.dataset.value
    });
    for (var i = 0; i < prices.length; i++) {
      if (prices[i].model == modelactive && prices[i].classify == e.target.dataset.value) {
        that.setData({
          nowprice: prices[i].vipprice,
          oldprice: prices[i].price,
          pricid: prices[i].id
        })
        console.log(prices[i].id)
      }
    }
  },
  // 数量加
  jiaNumber: function (e) {
    var that = this,
      num = Number(that.data.num);
    num = Number(num + 1);
    that.setData({
      num: num
    })
  },
  // 数量减
  jianNumber: function (e) {
    var that = this,
      num = Number(that.data.num);
    if (num <= 1) {
      wx.showToast({
        title: '数量至少为1',
        image: '/images/shibai@2x.png',
        duration: 2000
      })
    } else {
      num = Number(num - 1);
      that.setData({
        num: num
      })
    }
  },
  // 输入数量
  inputNumber: function (e) {
    var that = this,
      num = e.detail.value,
      ex = /^\d+$/;  //判断整数
    if (num < 1) {
      wx.showToast({
        title: '数量至少为1',
        image: '/images/shibai@2x.png',
        duration: 2000
      });
      that.setData({
        num: 1
      })
    } else if (!ex.test(num)) {
      wx.showToast({
        title: '数量为整数',
        image: '/images/shibai@2x.png',
        duration: 2000
      });
      that.setData({
        num: 1
      })
    } else {
      that.setData({
        num: num
      })
    }
  },
  // 确定
  submit:function(){
    var that = this,
      isShow = that.data.isShow;
    if (!isShow) {
      that.setData({
        isShow: true
      })
    }else {
      that.setData({
        isShow: false
      })
    }
  }, 
  // 拨打电话
  call:function(e){
    wx.makePhoneCall({
      phoneNumber: '400-687-8666' //仅为示例，并非真实的电话号码
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