<template>
  <div class="login">
    <div class="loginTop">欢迎登录</div>
    <div class="loginContent">
      <input
        type="text"
        name="phone"
        class="phone"
        v-model="phone"
        placeholder="请输入手机号码"
      />
      <input
        type="password"
        name="password"
        class="password"
        v-model="password"
        placeholder="请输入密码"
      />
      <button class="btn" @click="Login">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-music"></use> 
        </svg>
        登录
      </button>
    </div>
  </div>
</template>

<script>
import { getLoginUser } from '@/request/api/home.js'

export default {
  data() {
    return {
      phone: '',
      password: ''
    }
  },
  methods: {
    async Login() {
      let res = await this.$store.dispatch('getLogin', { phone: this.phone, password: this.password })
      console.log(res)
      if (res.data.code === 200) {
        // 如果返回的code等于200，说明登录成功
        this.$store.commit('updateIsLogin', true)
        this.$store.commit('updateToken', res.data.token)
        let result = await getLoginUser(res.data.account.id)
        console.log(result)
        this.$store.commit('updateUser', result)
        this.$router.push('/infoUser')
      } else {
        alert("手机号码或者密码错误")
        this.password = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
/* 整体背景 */
.login {
  width: 100%;
  height: 600px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: linear-gradient(135deg, #f85757, #ff6d6d); /* 渐变背景色 */
  border-radius: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  justify-content: center;
  position: relative;
  overflow: hidden;
  /* 背景音符动效 */
  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"%3E%3Ccircle cx="25" cy="25" r="10" fill="%23ff6d6d" /%3E%3Ccircle cx="75" cy="75" r="10" fill="%23ff6d6d" /%3E%3Ccircle cx="50" cy="50" r="5" fill="%23ff3d3d" /%3E%3C/svg%3E');
  background-size: 150px 150px;
  background-position: top left;
  animation: moveBackground 10s linear infinite;
}

/* 音符背景动画 */
@keyframes moveBackground {
  0% {
    background-position: top left;
  }
  100% {
    background-position: bottom right;
  }
}

.loginTop {
  font-size: 32px;
  color: white;
  margin-bottom: 30px;
  font-weight: bold;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4); /* 文字阴影效果 */
}

.loginContent {
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}

.phone,
.password {
  width: 100%;
  height: 50px;
  padding: 10px;
  margin-bottom: 20px;
  font-size: 18px;
  border: 1px solid #ddd;
  border-radius: 10px;
  outline: none;
  transition: border-color 0.3s ease;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.phone:focus,
.password:focus {
  border-color: #ff6d6d; /* 获取焦点时，输入框的边框变红 */
}

.btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(45deg, #ff6d6d, #ff3d3d); /* 渐变按钮背景 */
  color: white;
  font-size: 20px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* 按钮阴影 */
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #ff3d3d;
  transform: translateY(-2px); /* 悬浮时按钮上升 */
}

.btn:active {
  transform: translateY(0); /* 按下时按钮恢复 */
}

.btn .icon {
  width: 20px;
  height: 20px;
  fill: white;
  margin-right: 8px;
  transition: transform 0.3s ease;
}

.btn:hover .icon {
  transform: rotate(20deg); /* 鼠标悬浮时，音乐图标旋转 */
}
</style>
