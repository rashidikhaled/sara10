/* eslint-disable no-tabs */
<template>
  <div>
    <h1 class="form-title text-h6 q-pt-xl q-pl-xl">
      <span>مهندسین هماهنگ کننده</span>
    </h1>
    <div class="row">
      <safa-text
        class="col-12 col-md-2 col-sm-4 q-pl-md"
        outlined
        m="e"
        :dense="true"
        v-model="engName"
        label="نام"
      >
      </safa-text>
      <safa-text
        class="col-12 col-md-2 col-sm-4 q-pl-md"
        outlined
        m="e"
        :dense="true"
        v-model="engFamily"
        label="نام خانوادگی"
      >
      </safa-text>
      <safa-text
        class="col-12 col-md-2 col-sm-4 q-pl-md"
        outlined
        m="e"
        :dense="true"
        v-model="engCode"
        label=" کدمهندس"
      >
      </safa-text>
    </div>
    <div class="row q-ma-md q-col-gutter-md items-center">
      <div class="col-12 col-md-auto q-gutter-md">
        <q-btn
          @click="search"
          label="جستجو"
          icon="search"
          class="full-width"
          color="primary"
        ></q-btn>
      </div>
      <div class="col-12 col-md-auto q-gutter-md">
        <q-btn
          @click="clear"
          label="پاک کردن"
          icon="edit"
          color="amber-8"
        ></q-btn>
      </div>
    </div>
    <!-- <p>{{searchGridResults.length}}</p> -->
    <!-- <p>{{searchGridResults}}</p> -->

    <safa-datatable
      v-if="searchGridResults.length===0"
      class="q-px-md"
      v-model="results"
      ref="grid2"
      helper="supervisorEng.coordinatorList"
      :paginate="false"
      @AcceptClick="acceptClick"
      @RevokeClick="revokeClick"
    />
    <safa-datatable
      v-if="searchGridResults.length>0"
      class="q-px-md"
      v-model="searchGridResults"
      ref="grid2"
      helper="supervisorEng.coordinatorList"
      :paginate="false"
      @AcceptClick="acceptClick"
      @RevokeClick="revokeClick"
    />
    <!-- @row-click="rowClick" -->
  </div>
</template>
<script>
import userInfo from 'src/components/json/userInfo'
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  name: 'ucoordinator-list',
  route: '/coordinatorList/UCoordinatorList',
  title: 'مهندسین هماهنگ کننده',
  mixins: [baseFormMixin],
  data: function () {
    return {
      searchGridResults: [],
      from: 0,
      to: 20,
      results: [],
      serchResults: [],
      acceptResults: [],
      revokeResults: [],
      editID: null, // current editable row id
      engCode: '',
      engName: '',
      engFamily: '',
      isSearch: false
    }
  },
  methods: {
    load () {
      this.showLoading()
      // let this = this
      let data = {}
      if (this.isSearch === true) {
        data = {
          pIdentityCode: this.engCode,
          pFromRow: this.from,
          pToRow: this.to,
          pEngName: this.engName,
          pEngFamily: this.engFamily
        }
      } else {
        data = { pFromRow: this.from, pToRow: this.to }
      }

      this.$services.engineers
        .GetRefEngineerCoordinatorList(data)
        .then((response) => {
          this.results =
            response.data.GetRefEngineerCoordinator_ListResult.RefEngineerCoordinator_List
          this.hideLoading()
        })
        .catch(() => {
          this.hideLoading()
          this.serverError()
        })
    },
    search () {
      // this.isSearch = true
      // this.load()

      if (this.engName !== '' || this.engFamily !== '' || this.engCode !== '') {
        this.searchGridResults = []
        // debugger

        this.results.forEach((itm) => {
          // debugger

          if (this.engName !== '' && itm.EngName.search(this.engName) !== -1) {
            // debugger
            this.searchGridResults.push(itm)
            console.log(this.engName)
            // eslint-disable-next-line no-useless-return
            return
          }
          if (this.engFamily !== '' && itm.EngFamily.search(this.engFamily) !== -1) {
            // debugger
            this.searchGridResults.push(itm)
            console.log(this.engFamily)
            // eslint-disable-next-line no-useless-return
            return
          }
          if (this.engCode !== '' && itm.IdentityCode.search(this.engCode) !== -1) {
            // debugger
            this.searchGridResults.push(itm)
            console.log(itm.IdentityCode)
            // eslint-disable-next-line no-useless-return
            return
          }
        })
      }
    },
    clear () {
      this.searchGridResults = []
      // this.isSearch = false
      this.engCode = ''
      this.engName = ''
      this.engFamily = ''
      // this.load()
    },
    acceptClick ({ e, field, dataItem }) {
      this.showLoading()
      // let this = this
      let stringError = ''
      let data = { pNidRef: dataItem.NidRef, pUser: userInfo.pUser }
      this.$services.engineers
        .ConfirmCoordinator(data)
        .then((response) => {
          this.acceptResults =
            response.data.ConfirmCoordinatorResult.ErrorResult.BizErrors
          this.hideLoading()
          if (this.acceptResults.length > 0) {
            for (var i = 0; i < this.acceptResults.length; i++) {
              if (this.acceptResults[i] !== null) {
                stringError += this.acceptResults[i].ErrorTitel
              }
            }

            this.$q.dialog({
              message: stringError
            })
          } else {
            this.$q.dialog({
              message: 'تغییرات با موفقیت ذخیره شد.'
            })
            this.editForm = true
            this.showBtn = true
            this.load()
          }
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.dialog({
            title: 'خطا در سرور',
            message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          })
        })
    },
    revokeClick ({ e, field, dataItem }) {
      this.$q.loading.show({ message: 'در حال بارگذاری' })
      // let this = this
      let stringError = ''
      let data = { pNidRef: dataItem.NidRef, pUser: userInfo.pUser }
      this.$services.engineers
        .RevokeCoordinator(data)
        .then((response) => {
          this.revokeResults =
            response.data.RevokeCoordinatorResult.ErrorResult.BizErrors
          this.$q.loading.hide()
          if (this.revokeResults.length > 0) {
            for (var i = 0; i < this.revokeResults.length; i++) {
              if (this.revokeResults[i] !== null) {
                stringError += this.revokeResults[i].ErrorTitel
              }
            }

            this.$q.dialog({
              message: stringError
            })
          } else {
            this.$q.dialog({
              message: 'عدم تأیید هماهنگ کننده با موفقیت انجام شد.'
            })
            this.editForm = true
            this.showBtn = true
            this.load()
          }
        })
        .catch(() => {
          this.$q.loading.hide()
          this.$q.dialog({
            title: 'خطا در سرور',
            message: 'متاسفانه مشکلی در سیستم رخ داده است.'
          })
        })
    }
  },
  mounted () {
    this.load()
  }
}
</script>
