https://blog.csdn.net/qq_41387882/article/details/99707813


GET请求
根据经纬度获取地址信息
https://h5.ele.me/restapi/bgs/poi/reverse_geo_coding?latitude=32.0583&longitude=118.7964
{
    address: "江苏省南京市玄武区玄武门街道北京东路南京市人民政府"
    city: "南京市"
    city_id: 6
    district_id: 5267
    geohash: "wtsqrk0chu20"
    latitude: 32.058437
    longitude: 118.796538
    name: "北京东路南京市人民政府"
}

轮播图
https://h5.ele.me/restapi/shopping/v2/entries?latitude=32.059352&longitude=118.796623&templates[]=main_template&templates[]=favourable_template&templates[]=svip_template&terminal=h5

商家列表
https://h5.ele.me/restapi/shopping/v3/restaurants?latitude=31.934154&longitude=118.642775&offset=0&limit=8&extras[]=activities&extras[]=tags&extra_filters=home&rank_id=&terminal=h5


短信验证码获取接口 POST
地址:   https://h5.ele.me/restapi/eus/login/mobile_send_code
参数    captcha_hash:           图形验证码的hash值，可选
        captcha_value:          图形验证码的值，可选
        mobile:15093251310      手机号
        scf:ms                  
成功返回结果，有一个验证令牌，登录的时候需要
{"validate_token":"b122627cbc68678bf2d6875373f5019adb7e1ddbef8520b324d267c788dea99e"}
失败的返回结果
1、没有图形验证码，判断账户可能存在风险，这时需要获取图形验证码，验证图形验证码
{message: "账户存在风险,需要图形验证码", name: "NEED_CAPTCHA"}
{"message":"账户存在风险,需要滑动验证码","name":"NEED_SLIDE"}
2、有图形验证码，但是输入的图形验证码错误时返回结果
{message: "图形验证码错误", name: "CAPTCHA_CODE_ERROR"}
频繁操作可能会导致下面的错误
{"message":"您的操作太快了，请明天再来吧","name":"HERMES_CLIENT_ERROR"}

----------------------------------------------------------------
图形验证码 POST
https://h5.ele.me/restapi/eus/v3/captchas
参数    captcha_str: "15093251310"
返回结果
{captcha_hash: "32c367355390abf2a6038566e7086e9c-5d59290a", captcha_image: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD…CWIIv+fWtDSNIt9GtDb25YqW3Esec0UVN2dcaMIy50te/qf/Z"}


-------------------------------------------------------

登录接口 POST
地址  https://h5.ele.me/restapi/eus/login/login_by_mobile
参数：
    mobile:15093251310      手机号
    scf:ms                  
    validate_code:272154    手机验证码
    validate_token:b122627cbc68678bf2d6875373f5019adb7e1ddbef8520b324d267c788dea99e  验证令牌

登录成功返回结果
{"need_bind_mobile":false,"user_id":120236070}
登录失败返回结果
{message: "验证码错误", name: "WRONG_VALIDATE_CODE"}

---------------------------------------------------------

判断是否已经登录和获取用户信息 get
https://h5.ele.me/restapi/eus/v3/users/{user_id}?

未登录返回信息
{message: "未登录", name: "UNAUTHORIZED"}
登录后返回信息
{
    avatar: "e1b27a2635ba8ce477f44e54a863b391png"
    balance: 0
    brand_member_new: 0
    columns: [{badge_color: "ff3618", badge_name: "HOT", description: "低门槛极速放款", device: 0, end_time: 0,…},…]
    delivery_card_expire_days: 0
    email: ""
    gift_amount: 0
    is_email_valid: false
    is_mobile_valid: true
    mobile: "15093251310"
    point: 28
    real_point: 0
    supervip_status: 2
    user_id: 120236070
    username: "Jxz0522"
}

是否是新用户 get
https://h5.ele.me/restapi/eus/v2/new_user_check

获取user_id
https://h5.ele.me/restapi/eus/v2/current_user?info_raw={}
返回值
120236070

退出登录 post
https://h5.ele.me/restapi/eus/login/logout
参数 user

获取用户的收货地址列表
https://h5.ele.me/restapi/member/v1/users/120236070/addresses
[{
    address: "郑州市智游职业培训学校"
    address_detail: "河南省郑州市管城回族区通信产业园六楼西南四(爱加密前台)"
    city_id: 32
    city_name: ""
    created_at: 1553142888000
    district_id: 5498
    entry_id: 3
    geohash: null
    id: 1250068410903491
    is_valid: 1
    name: "金先生"
    phone: "15093251310"
    phone_bk: null
    poi_type: 0
    sex: 1
    st_geohash: "ww0vs6puw191"
    tag: "公司"
    tag_type: 3
    user_id: 120236070
}]

https://h5.ele.me/restapi/member/v1/users/120236070/supervip?latitude=31.996&longitude=118.782&source=3

根据关键字搜索附近地址：不带经纬度
https://h5.ele.me/restapi/bgs/poi/search_poi_nearby_alipay?keyword=南京offset=0&limit=20

根据经纬度搜索附近地址：带经纬度
https://h5.ele.me/restapi/bgs/poi/search_poi_nearby_alipay?keyword=南京&offset=0&limit=20&latitude=34.728564&longitude=113.752357
[{
    address: "江苏省南京市江宁区安居街与栖凤路交叉口西50米"
    city: "江苏省南京市江宁区"
    city_id: 6
    distance: "8.5km"
    district_id: 5274
    geohash: "wtsm4wmtf2cf"
    id: "B0FFJ49PFW"
    latitude: 31.85173
    longitude: 118.594078
    name: "老鸭粉丝汤"
    request_id: "9200031270782822242"
    short_address: "安居街与栖凤路交叉口西50米"
}]


百度地图，根据地址信息获取经纬度
ak: rV9yecSa55Q1g5thM2jlpSxzHmffNPxR
http://api.map.baidu.com/geocoding/v3/?address=北京市海淀区上地十街10号&output=json&ak=您的ak