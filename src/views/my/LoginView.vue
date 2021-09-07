<template>
    <div class="login-box">
        <div class="logo">
            <van-image :src="logo" height="6rem" fit="contain"></van-image>
        </div>
        <div class="login">
            <van-cell-group>
                <van-field v-model="phone" placeholder="手机号" maxlength="11">
                    <van-button 
                        class="sms-btn" 
                        :class="{active:btnOn}"
                        :disabled="!btnOn"
                        slot="button" 
                        size="small" 
                        type="default"
                        @click="getSmsCodeClick"
                    >
                        {{btnTitle}}
                    </van-button>
                </van-field>
                <van-field v-model="smsCode" placeholder="验证码" />
            </van-cell-group>
            <section class="login-message">
                新用户登录即自动注册，并表示已同意
                <a href="//h5.ele.me/service/agreement/#initTitle=%E7%94%A8%E6%88%B7%E6%9C%8D%E5%8A%A1%E5%8D%8F%E8%AE%AE&amp;key=ruleQue18">《用户服务协议》</a>
                和
                <a href="http://terms.alicdn.com/legal-agreement/terms/suit_bu1_other/suit_bu1_other201903051859_43484.html">《隐私权政策》</a>
            </section>
            <van-button class="login-btn" type="primary" size="large" @click="loginClick">登录</van-button>
            <div class="about">关于我们</div>
        </div>
        
        <!-- 弹窗 -->
        <van-dialog
            v-model="dialogShow"
            title="请填写图形验证码"
            show-cancel-button
            :before-close="beforeClose"
        >   
            <van-cell-group>
                <van-field v-model="picCode" placeholder="验证码" maxlength="4">
                    <img 
                        slot="button" 
                        style="height:3rem" 
                        :src="picCaptcha ? picCaptcha.captcha_image : ''" 
                        @click="getPicCodeClick"
                    >
                </van-field>
                <div class="pic-error">
                    <van-icon v-show="picError" name=warning-o>图形验证码错误，请重新输入</van-icon>
                </div>
            </van-cell-group>
        </van-dialog>
        
    </div>
</template>

<script>
import {mapState, mapActions} from 'vuex';
export default {
    name:'LoginView',
    data() {
        return {
            dialogShow:false,//显示弹窗
            picCode:'',//图形验证码的值
            picError:false,//图片验证码错误提示信息
            phone:'15093251310',//手机号
            smsCode:'',//短信验证码
            btnTitle:'获取验证码',
            time:30,
            timer:null,
            btnOn:true,
            logo:require('@/assets/images/logo.png'),
        }
    },
    computed: {
        ...mapState({
            picCaptcha:state=>state.login.picCaptcha,
        }),
    },
    methods: {
        ...mapActions(['getPicCaptcha','getSmsCaptcha','login','getUserInfo']),
        // 点击获取短信验证码
        async getSmsCodeClick(){
            if (!this.isPhoneReg(this.phone)) {
                this.$toast('手机号校验未通过');
                return;
            }
            // 先获取短信验证码
            let [err] = await this.$to(this.getSmsCaptcha({phone:this.phone,}));
            if (err) {
                if (err.response.data.name == "NEED_SLIDE") {
                    console.log('需要滑动验证');
                }
                if (err.response.data.name == "NEED_CAPTCHA") {
                    await this.getPicCaptcha(this.phone);
                    // 显示图形验证码弹窗
                    this.dialogShow = true;
                }
                
            }else{
                // 倒计时30秒
                this.timer = setInterval(() => {
                    this.btnTitle = `已发送(${this.time}s)`;
                    this.btnOn = false;
                    if (this.time <= 0) {
                        this.btnOn = true;
                        this.btnTitle = `重新获取`;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                    this.time --;
                }, 1000);
            }
        },
        // 点击图片获取图形验证码
        async getPicCodeClick(){
            await this.$to(this.getPicCaptcha(this.phone));
        },
        // 弹窗关闭之前的操作
        async beforeClose(action, done){
            if(action === 'confirm') {
                if (this.picCode.length == 0) {
                    await this.getPicCaptcha(this.phone);
                    done(false);//不关闭弹窗
                    return;
                }
                // 根据图形验证码再次获取短信验证码
                let [err] = await this.$to(this.getSmsCaptcha({
                    phone:this.phone,
                    code:this.picCode
                }));
                if (err) {
                    this.picError = true;
                    this.picCode = '';
                    // 图形验证码输入失败，重新获取新的图形验证码
                    await this.getPicCaptcha(this.phone);
                    done(false);//不关闭弹窗
                }else{
                    done(); //关闭弹窗
                    this.picError = false;
                }
            } else if(action === 'cancel') {
                done(); //关闭弹窗
                this.picError = false;
            }
        },
        // 点击登录
        async loginClick(){
            let [err] = await this.$to(this.login({
                phone:this.phone,
                code:this.smsCode
            }));
            if (err) {
                this.$toast('短信验证码错误');
            }else{
                // 登录成功
                await this.getUserInfo();
                this.$router.push('/my');
            }

        },
    },
    watch: {
        phone(newVal){
            this.btnOn = newVal.length==11;
        }
    },
}
</script>

<style scoped>
.logo{
    text-align: center;
    width: 100%;
    height: 6rem;
    margin-top: 40px;
}
.login{
    padding: 2rem 1rem;
}
.sms-btn{
    color: #999;
    border: none;
    font-size: 1.4rem;
}
.active{
    color: #2395ff;
}
.login-message{
    margin: 2rem 0;
    font-size: 1.4rem;
    color: #999;
}
.login-message>a{
    color: #2395ff;
}
.about{
    font-size: 1.2rem;
    color: #999;
    text-align: center;
    margin-top: 2rem;
}
.pic-error{
    width: 100%;
    height: 2rem;
    color: #ff6000;
    font-size: 1.2rem;
    padding: 0 1rem;
}

</style>
