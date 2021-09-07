
// 分割图片url
function isImgHash(imgHash){
    // 7d8a867c870b22bc74c87c348b75528djpeg
    // https://cube.elemecdn.com/7/d8/a867c870b22bc74c87c348b75528djpeg.jpeg
    if(!imgHash) return "";
    var s1 = imgHash.substring(0,1);
    var s2 = imgHash.substring(1,3);
    var s3 = imgHash.substring(3);
    var s4 = imgHash.substring(32);//图片后缀名
    return 'https://cube.elemecdn.com'+'/'+s1+'/'+s2+'/'+s3+'.'+s4;
}
// 添加前缀
function addPrefix(imgurl){
	if(!imgurl){return ""}
	return "http://fuss10.elemecdn.com"+imgurl;
}

// 距离的处理
function fixedDistance(value=0) {
    if(value < 1000){
        return value + 'm';
    }else{
        return (value/1000).toFixed(2) + 'km';
    }
}

// 手机号验证
function isPhoneReg(phone="") {
    if((/^1[3456789]\d{9}$/.test(phone))){ 
        return true; 
    }
    return false;
}

// 调试模式
const debug = process.env.NODE_ENV !== 'production';

export {
    isImgHash,
    addPrefix,
    fixedDistance,
    isPhoneReg,
    debug,
}