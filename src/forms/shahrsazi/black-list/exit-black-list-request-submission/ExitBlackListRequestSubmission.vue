<template>
<safa-form
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    :id="formKey"
    :caption="title"
  >
  <form-wrapper title="خروج از لیست سیاه ثبت درخواست">
    <template #header>
      <safa-status :result="blackedUserResult" />
      <safa-status :result="exitResult" />
    </template>
    <fit>
      <FormRow class="q-mb-sm">
        <FormControl>
          <safa-text
            label="نام کاربری"
            label-width="80px"
            v-model="userName"
            cdcName="userName"
            @keyup.enter="load"
          >
            <template v-slot:append>
              <q-icon
                style="position: relative; right: 5px; font-size: 18px"
                @click="load"
                color="primary"
                name="search"
                class="cursor-pointer"
                title="جستجو"
              />
            </template>
          </safa-text>
        </FormControl>
        <text-template
          label="توضیحات"
          label-width="80px"
          v-model="comments"
          cdcName="comments"
          formKey="5C94C341-61FC-4674-AF03-13C74E959E8D"
          class="col-12"
          :rows="1"
        />
      </FormRow>
      <safa-grid
        ref="grid2"
        v-model="blackedUserResults.UserBlackList"
        :allowCopy="false"
        cdcName="agExitBlackListRequest"
        fit
        helper="agExitBlackListRequest"
        title="لیست کاربران بلاک شده"
        :getRowClass="getRowClass"
        @row:click="selectedChange"
        paginate
        :take="20"
        :pageSize="20"
      />
    </fit>
    <template v-slot:footer>
      <btn-default label="خروج از لیست سیاه" @click="exitFromBlacklist" />
    </template>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import { currentDate } from "src/utils/index"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "خروج از لیست سیاه ثبت درخواست",
      formKey: "5C94C341-61FC-4674-AF03-13C74E959E8D",
      name: "ExitBlackListRequestSubmission",
      main: true,
      sidebarCompatible: true,
      nidNosaziCode: '00000000-0000-0000-0000-000000000000',
      isView: false,
      blackedUserResult: null,
      blackedUserResults: { UserBlackList: [] },
      comments: "",
      userName: null,
      exitResult: null,
      selecedRow: {},
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadRequest()
    } else {
      this.load()
    }
  },
  methods: {
    load () {
      this.showLoading()
      this.$services.SA.searchShUserBlackList({ pBlackUserName: this.userName })
        .then(async ({ data }) => {
          this.blackedUserResult = this.getResponse(data)
          if (this.blackedUserResult.success) {
            this.blackedUserResults = this.blackedUserResult.data
            this.blackedUserResults.UserBlackList.map((x) => {
              if (x.EumBlackListStatus === 0) {
                x.class = "enter-black-list"
              }
              if (x.EumBlackListStatus === 1) {
                x.class = "exit-black-list"
              }
            })
            let logInsert =
              this.getUserDisplayName() + " search : " + this.userName
            await this.log({
              action: this.logActions.view,
              bizCode: logInsert,
              bizCodeTitle: "UserName  & userName searched",
              saveDesc: `نمایش لیست کاربران بلاک شده`
            })
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getRowClass (params) {
      let row = params.data
      if (row.EumBlackListStatus === 0) return "bg-pink-2"
      if (row.EumBlackListStatus === 1) return "bg-green-2"
      return { background: "transparent" }
    },
    loadRequest () {
      let data = { pBlackUserName: this.userName }
      this.showLoading()
      this.$services.SA.searchShUserBlackList(data, {
        config: {
          District:
            this.baseNosaziCode.District !== 0
              ? this.baseNosaziCode.District
              : 1
        }
      })
        .then(async ({ data }) => {
          this.blackedUserResult = this.getResponse(data)
          if (this.blackedUserResult.success) {
            this.blackedUserResults = this.blackedUserResult.data
            this.blackedUserResults.UserBlackList.map((x) => {
              if (x.EumBlackListStatus === 0) {
                x.class = "enter-black-list"
              }
              if (x.EumBlackListStatus === 1) {
                x.class = "exit-black-list"
              }
            })
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.BizCode,
                bizCodeTitle: "UserName & userName searched",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `نمایش لیست کاربران بلاک شده`
              })
            }
            this.isView = true
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.selecedRow = e.data
    },
    exitFromBlacklist () {
      let UserBlackList = {}
      if (
        this.selecedRow.NidUserBlackList !==
        "00000000-0000-0000-0000-000000000000"
      ) {
        if (this.currentUser === null) {
          UserBlackList.UserExit = ""
          UserBlackList.NidUserExit = "00000000-0000-0000-0000-000000000000"
        } else {
          UserBlackList.UserExit = this.getUserDisplayName()
          UserBlackList.NidUserExit = this.getNidUser()
        }
        UserBlackList.ExitComments = this.comments
        UserBlackList.NidUserBlackList = this.selecedRow.NidUserBlackList
        UserBlackList.BlackNiduser = this.selecedRow.BlackNiduser
      } else {
        this.showError("لطفا یکی از کاربران را انتخاب کنید")
        return
      }
      let data = { pBlackListUser: UserBlackList }
      this.showLoading()
      this.$services.SA.exitFromBlacklistWithNidBlackUser(data, {
        config: { District: "1" } //  داخل زمل هم هارد کد 1 بود
      })
        .then(async ({ data }) => {
          this.exitResult = this.getResponse(data)
          if (this.exitResult.success) {
            this.showSuccess("خروج از لیست سیاه با موفقیت انجام شد.")
            await this.sendSMS()
            await this.log({
              action: this.logActions.save,
              bizCode: this.selecedRow.NidUserBlackList,
              bizCodeTitle: "NidUserBlackList",
              saveDesc: `خروج از لیست سیاه کاربر ${
                this.selecedRow.BlackUserName
              } انجام شد. کاربر خارج کننده از لیست سیاه ${this.getUserDisplayName()} می باشد.`
            })
            if (this.selectedRequest) {
              this.loadRequest()
            } else {
              this.load()
            }
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async sendSMS () {
      let mobileNumber = null
      if (this.selecedRow.MobileNumber) {
        mobileNumber = this.selecedRow.MobileNumber
      } else {
        const payload = {
          pUserName: this.selecedRow.BlackUserName
        }
        try {
          this.showLoading()
          const { data } = await this.$services.SC.getMobileNumber(payload)
          this.GetMobileNumberResult = this.getResponse(data)
          if (this.GetMobileNumberResult.success) {
            mobileNumber = this.GetMobileNumberResult.data ?? null
          }
        } catch (e) {
          console.error(e)
        } finally {
        }
      }
      try {
        const payLoad = {
          pParameter: {
            Text: `کاربر محترم با توجه به خروج نام کاربری شما از لیست سیاه ،اجازه ثبت درخواست فراهم گردید
(امور نظارت بر ارائه دهندگان خدمات شهرسازی)`,
            Number: mobileNumber,
            AppName: "sara10",
            BizCode: this.nidNosaziCode,
            SMSType: "ارسال پیامک خروج از لیست سیاه کاربران",
            ScheduleSendDate: currentDate(),
            UserID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        await this.$services.sendSMS.SendSMS(payLoad)
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    }
  }
}
</script>
