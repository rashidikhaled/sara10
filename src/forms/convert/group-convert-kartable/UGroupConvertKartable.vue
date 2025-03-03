<template>
  <safa-form
    :id="formKey"
    appId="0F9623AC-4BC7-42AD-A8E6-52A72187C6B5"
    caption="گردش کار- کانورت گروهی کارتابل کاربر "
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadResult" />
        <safa-status :result="saveResult" />
        <safa-status :result="getTaskRequestsRes" />
        <safa-status :result="getShTemporaryKartablsRes" />
      </template>

      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              v-model="fromUser.username"
              cdcName="username"
              label="کاربر انتقال دهنده"
              label-width="90px"
              m="r"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجوی کاربر انتقال دهنده"
                  @click="searchUserHandler('from')"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              v-model="toUser.username"
              cdcName="username"
              label="کاربر منتقل شونده"
              label-width="90px"
              m="r"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجوی کاربر منتقل شونده"
                  @click="searchUserHandler('to')"
                />
              </template>
            </safa-text>
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="fromDate"
              cdcName="fromDate"
              label="از تاریخ"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              v-model="toDate"
              cdcName="toDate"
              label="تا تاریخ"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="district"
              :options="districts"
              cdcName="toDate"
              label="منطقه"
              label-width="90px"
              source-type="local"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="district"
              cdcName="CI_RequestType"
              ci-name="CI_RequestType"
              domainName="CI_SaraM1"
              label="نوع درخواست"
              label-width="90px"
            />
          </FormControl>
          <div class="row flex justify-end q-mb-sm">
            <btn-search @click="search" />
          </div>
        </FormRow>

        <safa-splitter v-model="splitterModel" class="fit" margin="0" vertical>
          <template v-slot:before>
            <fit>
            <!-- :columns="currentRequestListColumns" -->
              <safa-grid
                v-model="currentRequestList"
                helper="currentRequestList"
                :addRow="false"
                :allowCopy="false"
                :allowMultipleSelection="false"
                :deleteRow="false"
                :show-selected-checkbox="false"
                fit
                height="100%"
                m="r"
                max-height="100%"
                min-height="100px"
                paginate
                title="درخواست های جاری"
                @selection:changed="selectedRequestForUser"
                :suppressRowClickSelection="false"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                v-model="temporaryArchiveList"
                :addRow="false"
                :allowCopy="false"
                :allowMultipleSelection="false"
                helper="currentRequestList"
                :deleteRow="false"
                :show-selected-checkbox="false"
                fit
                height="100%"
                m="r"
                max-height="100%"
                min-height="100px"
                paginate
                title="درخواست های بایگانی موقت"
                :suppressRowClickSelection="false"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <btn-default label="تغییر کاربر" m="r" @click="changeUser" />
      </template>
    </form-wrapper>

    <safa-popup v-model="showSearchUser" height="500px" width="600px">
      <search-user @getUser="getUser" />
    </safa-popup>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate } from "src/utils/index"
import SearchUser from "./partials/SearchUser.vue"
// import { uid } from "quasar"

export default {
  components: { SearchUser },
  mixins: [baseFormMixin],
  data () {
    return {
      name: "UGroupConvertKartable",
      title: "کانورت گروهی کارتابل کاربر",
      formKey: "1978c801-5825-4fc0-bbd2-ec8a4d6e934f",
      main: true,

      expansionState: true,
      splitterModel: 50,
      loadResult: null,
      saveResult: null,
      getTaskRequestsRes: null,
      getShTemporaryKartablsRes: null,
      fromUser: {
        username: "",
        firstName: "",
        lastName: "",
        enabled: false
      },
      toUser: {
        username: "",
        firstName: "",
        lastName: "",
        enabled: false
      },
      fromDate: "",
      toDate: currentDate(),
      district: 1,
      currentRequestList: [],
      temporaryArchiveList: [],
      selectRequest: null,
      showSearchUser: false,
      userTypeSearch: null
    }
  },

  methods: {
    searchUserHandler (userType) {
      this.showSearchUser = true
      this.userTypeSearch = userType
    },
    selectedRequestForUser (params) {
      this.selectRequest = params.api.getSelectedRows()?.[0]
      if (!this.selectRequest) return false
    },
    // selectedRequestForUser (item) {
    //   this.selectRequest = item
    // },
    async search () {
      if (!this.fromUser.NidUser) {
        return this.showError("لطفا کاربر مورد نظر را انتخاب نمایید.")
      } else {
        this.getTaskRequests()
        this.getTemporaryRequests()
      }
      await this.log({
        action: this.logActions.search,
        bizCode: this.fromUser.NidUser,
        bizCodeTitle: "NidUser",
        saveDesc: `جستجوی اطلاعات کاربر ${this.fromUser.NidUser} انجام گردید.`
      })
    },
    async getTaskRequests () {
      this.showLoading()
      try {
        const payload = {
          pProcInitiator: this.fromUser.NidUser,
          pFromDate: this.fromDate,
          pToDate: this.toDate,
          pDistrict: this.district,
          IsFromSara10: false,
          pSelectedWorkFlow: []
        }
        // جهت تست
        // const payload = {
        //   pProcInitiator: "44E11515-5D9E-4DB3-B9B8-E1F282B65466",
        //   pFromDate: "1374/06/01",
        //   pToDate: "1403/06/20",
        //   pDistrict: 1,
        //   pSelectedWorkFlow: [],
        //   IsFromSara10: false
        // }
        const { data } = await this.$services.SX.getWorkflowInstanceListForAsignToUser(payload, this.config)
        this.getTaskRequestsRes = this.getResponse(data)
        if (this.getTaskRequestsRes.success) {
          this.currentRequestList = this.getTaskRequestsRes?.data?.WorkflowInstanceListForAsignToUser ?? []
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    async getTemporaryRequests () {
      this.showLoading()
      try {
        const payload = {
          pProcInitiator: this.fromUser.NidUser,
          pFromDate: this.fromDate,
          pToDate: this.toDate,
          pDistrict: this.district,
          pSelectedWorkFlow: []

        }
        // جهت تست
        // const payload = {
        //   pProcInitiator: "030CA824-C79B-4AEB-8F4A-28783C7DDBC2",
        //   pFromDate: "1401/06/01",
        //   pToDate: "1403/06/20",
        //   pDistrict: 1,
        //   pSelectedWorkFlow: []
        // }
        const { data } = await this.$services.SX.getShTemporaryKartabl(payload, this.config)
        this.getShTemporaryKartablsRes = this.getResponse(data)
        if (this.getShTemporaryKartablsRes.success) {
          if (!this.getShTemporaryKartablsRes.Sh_TemporaryKartabl) {
            this.temporaryArchiveList = this.getShTemporaryKartablsRes?.data?.Sh_TemporaryKartabl ?? []
          }
          else this.showError("اطلاعات در خواست های بایگانی موقت کاربر یافت نشد")
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    changeUser () {
      if (!this.fromUser.NidUser) {
        return this.showError("لطفا کاربر انتقال دهنده را انتخاب نمایید.")
      }
      if (!this.toUser.NidUser) {
        return this.showError("لطفا کاربر منتقل شونده را انتخاب نمایید.")
      }
      if (!this.selectRequest) {
        return this.showError("لطفا درخواست مورد نظر را انتخاب نمایید.")
      }

      // TODO : Nothing happens in Sara 8 (request does not load)
    },
    getUser (user) {
      this.userTypeSearch === "from"
        ? (this.fromUser = user)
        : (this.toUser = user)
      if (this.toUser.IsInBlackList) {
        this.toUser = {
          username: "",
          firstName: "",
          lastName: "",
          enabled: false
        }
        return this.showError(
          "کاربر انتخاب شده در لیست سیاه می باشد. کاربرانی که در لیست سیاه هستند مجاز به دریافت درخواست نمی باشند."
        )
      }
      this.showSearchUser = false
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("districts")
    },
    config () {
      return { config: { District: this.district } }
    }
  }
}
</script>
