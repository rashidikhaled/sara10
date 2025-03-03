<template>
  <fit>
    <div class="q-pa-sm">
      <FormRow :lg="1" :md="1" :sm="1" :xs="1">
        <FormControl>
          <safa-text
            label="نام کاربری"
            v-model="model.username"
            cdcName="username"
            required
            label-width="100px"
            autocomplete="off"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کلمه عبور"
            v-model="model.password"
            cdcName="password"
            required
            type="password"
            label-width="100px"
            autocomplete="off"
            @keyup.enter="login"
          />
        </FormControl>
      </FormRow>
      <div class="row q-col-gutter-x-md q-col-gutter-y-sm">
        <div class="col-2">
            <q-btn
              label="ورود"
              @click="login"
              color="primary"
              size="sm"
              type="submit"
            />
          </div>
          <div class="col-10">
            <ui-captcha v-model="captcha.val" @update:key="($event)=>{captcha.key=$event}" ref="captchaRef"/>
          </div>
      </div>
      <!-- <div>
                <label>نام کاربری</label>
                <div >
                  <q-icon color="grey" name="person"/>
                  <input placeholder="نام کاربری"  required
                        v-model="model.username"/>
                        cdcName=""/"
                </div>
                <label>کلمه عبور</label>
                <div >
                  <q-icon color="grey" name="password"/>
                  <input placeholder="کلمه عبور"  required type="password"
                        v-model="model.password"/>
                        cdcName=""/"
                </div>
              </div> -->
      <!-- <div >
                <q-btn label="ورود"  color="primary" size="sm" type="submit"/>
              </div> -->
    </div>
    <safa-datatable
      title="تاریخچه"
      m="r"
      v-model="getLoginHistoryUser"
      cdcName="history"
      :columns="columns"
      height="100%"
      max-height="100%"
      min-height="300px"
      :show-selected-checkbox="true"
      :allowMultipleSelection="false"
      :show-row-number="false"
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      paginate
      @logoutClick="handleLogoutHistory"
      fit
    />
  </fit>
</template>
<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

const defaultModel = {
  username: '',
  password: ''
}

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      model: { ...defaultModel },
      userInfo: null,
      captcha: {
        key: null,
        val: null
      },
      token: null,
      history: [],
      columns: [
        {
          field: 'UserName',
          title: 'نام کاربری',
          width: 150
        },
        {
          field: 'FirstName',
          title: 'نام',
          width: 150
        },
        {
          field: 'LastName',
          title: 'نام خانوادگی',
          width: 150
        },
        {
          field: 'logout',
          title: 'خروج',
          editor: 'action',
          width: '100px'
        }
      ]
    }
  },

  created () {
    // console.log(this.value)
    this.model = { ...defaultModel }
    this.initiateLogin()
  },
  computed: {
    getLoginHistoryUser () {
      return this.$store.getters['commission/getLoginHistoryUser'] || []
    }
  },
  props: {
    value: Array
  },
  methods: {
    initiateLogin () {
      this.history = this.getLoginHistoryUser
      let userInfo = {
        UserName: this.currentUser.username,
        FirstName: this.currentUser.FirstName,
        LastName: this.currentUser.LastName,
        NidUser: this.getNidUser()
      }
      if (!this.isUserExist(this.currentUser.username))
      {
        this.history.push(userInfo)
      }
      this.$store.dispatch("commission/setloginHistoryUser", this.history)
    },
    handleLogoutHistory ({ dataItem }) {
      let username = dataItem.UserName
      this.history = this.history.filter(x => x.UserName !== username)
      this.$store.dispatch("commission/setloginHistoryUser", this.history)
    },
    isUserExist (username) {
      return this.history.some((x) => x.UserName.toUpperCase() === username.toUpperCase())
    },
    async login () {
      try {
        if (this.isUserExist(this.model.username)) {
          this.showError('کاربر مورد نظر از قبل وجود دارد.')
          return
        }
        this.showLoading()
        const payload = {
          username: this.model.username,
          password: this.model.password,
          subSystem: this.$stSecurity.getters['config/appName'] || '',
          storeData: false, // this option not related to login service, its say not save result in security store (for current user)
          captcha: this.captcha
        }
        // TODO: use security original method
        const data = await this.$stSecurity.dispatch('authorize/login', { ...payload, storeData: false })
        console.log('login', data)
        if (!data.success) {
          switch (data.type) {
            case 'change_password':
              this.showError('شما میبایست کلمه عبور خود را تغییر دهید.')
              return
            case 'two_factor':
              this.showError('ورود دو مرحله ای روی حساب کاربری شما فعال است.')
              return
            case 'webcam_required':
              this.showError('ورود از طریق وب کم روی حساب کاربری شما فعال است.')
              return
            default:
              this.showError(data.msg)
              return
          }
        } else {
          const { user, token } = data.data
          this.token = token
          this.userInfo = user
          this.loginSuccessfully({ user })
        }
      } catch (ex) {
        console.error(ex)
        this.showError('خطایی در سرویس رخ داد.')
      } finally {
        this.resetCaptcha()
        this.hideLoading()
      }
    },
    resetCaptcha () {
      this.$refs?.captchaRef?.reloadCaptcha()
      this.captcha.val = ""
    },
    loginSuccessfully ({ user }) {
      this.history.push({
        UserName: user.username,
        FirstName: user.firstName,
        LastName: user.lastName,
        NidUser: user.NidUser
      })

      // eslint-disable-next-line eqeqeq
      if (!this.history.some((a) => a.FirstName == 'همه')) {
        this.history.unshift({
          UserName: '',
          FirstName: 'همه',
          LastName: ''
        })
      }
      this.$store.dispatch("commission/setloginHistoryUser", this.history)
      this.model = { ...defaultModel }
    }
  },
  watch: {
    history: {
      handler (newVal) {
        this.$emit('input', newVal)
      },
      deep: true
    }
  }
}
</script>
