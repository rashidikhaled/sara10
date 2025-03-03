<template>
  <safa-form
    :id="formKey"
    :caption="`شهرسازی- لیست ${title}`"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper vertical :title="title" :padding="false">
      <safa-tabs ref="peaceTab" v-model="activeTab" class="fit">
        <template v-slot:tabs>
          <tab-menu label="لیست" name="showListTab" @click="handleClickList"/>
          <tab-menu label="تاریخچه صلح نامه" name="showHistoryPeaceTab"/>
          <tab-menu
            v-show="showDetails"
            label="جزئیات صلح نامه"
            name="detailsTab"
          />
        </template>
        <tab-content name="showListTab" title=" لیست">
          <PeaceList
            :results="results"
            @datatableDbclick="datatableDbclick"
            :selectedRequestFromParent="selectedRequest"
            :forceReadonly="forceReadonly"
          />
        </tab-content>
        <tab-content
          name="showHistoryPeaceTab"
          title="تاریخچه صلح نامه"
          :padding="false"
        >
          <PeaceHistory
            :results="results"
            @datatableDbclick="datatableDbclick"
          />
        </tab-content>
        <tab-content
          v-if="showDetails"
          name="detailsTab"
          title="جزئیات صلح نامه"
          :padding="false"
        >
          <PeaceDetails
            v-if="showDetails"
            :copyLastRow="copyLastRow"
            :passedResult="results"
            @emitData="emitData"
            @reload="reload"
            :selectedNidBase="selectedNidBase"
            :historyResult="results"
            :isNewDetails="isNewDetails"
            ref="peaceDetailsTabRef"
            :m="mode"
            :task-info="taskInfo"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          height="40px"
          :buttons="tabActions"
          :value="activeTab"
          :showEditButton="activeTab === 'detailsTab'"
          :showSaveButton="activeTab === 'detailsTab'"
          :showCancelButton="activeTab === 'detailsTab'"
          :m="mode"
          @edit="isEditable = true"
          editSPId="8e7f0104-9202-423a-8188-763184f261a7"
          editSPCaption="ویرایش"
          editFormId="2c1fd63b-42ed-4af3-98da-d443f44fe837"
          @save="save"
          @cancel="isEditable = false"
        ></form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
import PeaceList from "./partials/PeaceList.vue"
import PeaceHistory from "./partials/PeaceHistory.vue"
import PeaceDetails from "./partials/PeaceDetails.vue"
import baseFormMixin from "src/mixins/baseFormMixin.js"

export default {
  route: "/peace/UPeace",

  mixins: [baseFormMixin],
  data: function () {
    return {
      formKey: "7145CB3E-42D7-4DDA-AF7F-3C24117A4CFB",
      name: "UPeace",
      title: "صلحنامه",
      main: true,
      workflowCompatible: true,
      showDetails: false,
      // tabs
      activeTab: "showListTab",
      result: null,
      selectedRow: null,
      results: { Sh_Peace_List: [], Sh_Peace_List_PreRevisit: [] },
      requestSecResults: {},
      requestSecResult: null,
      copyLastRow: false,
      newBtn: true,
      isNewDetails: false,
      isShowFooter: true,
      loadOneAgreementPrequest: {
        pNidBase: "db928d57-7f1b-4946-a2ff-767c4061f8c9",
        pNidProc: "bf9e25af-1881-4481-9b90-4d12535649a1",
        pIsLoadDeletedNosaziCode: "false"
      },
      loadOneAgreementResult: null,
      loadOnePeaceResult: null,
      tabActions: {
        showListTab: [
          {
            label: "جدید",
            type: "new",
            click: (e, btn) => this.newPeaceDetailes(),
            spId: "7745099a-1e26-4b6f-ad62-0371a42eed4b",
            spCaption: "جدید"
          }
        ],
        detailsTab: [
          {
            label: "محاسبه",
            type: "default",
            click: (e, btn) => this.$refs.peaceDetailsTabRef.calculate(),
            spId: "08e6bb61-0435-4f5b-b95e-11277fcef761",
            spCaption: "محاسبه",
            formId: "2c1fd63b-42ed-4af3-98da-d443f44fe837"
          },
          {
            label: "کپی به چیدمان مجاز",
            type: "default",
            click: (e, btn) => this.$refs.peaceDetailsTabRef.copyInfo(),
            spId: "7d2a57e9-d24d-40f3-bab8-a8032f05546d",
            spCaption: "کپی به موافقت اصولی",
            formId: "2c1fd63b-42ed-4af3-98da-d443f44fe837"
          },
          {
            label: "گزارش",
            type: "default",
            click: (e, btn) => this.$refs.peaceDetailsTabRef.print()
          }
        ]
      },
      selectedNidBase: "00000000-0000-0000-0000-000000000000"
    }
  },
  components: {
    PeaceList,
    PeaceHistory,
    PeaceDetails
  },
  mounted () {
    this.load()
  },
  methods: {
    save () {
      this.$refs.peaceDetailsTabRef.save()
    },
    async datatableDbclick (e) {
      this.selectedNidBase = e.NidBase
      this.showPeaceDetails()
    },
    async loadOneAgreementFromList () {
      try {
        this.showLoading()

        const { data } = await this.$services.SC.loadOneAgreementFromList(
          this.loadOneAgreementPrequest
        )
        this.loadOneAgreementResult = this.getResponse(data)

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode
        })
      } catch (err) {
        this.serverError()
        console.error(err)
      } finally {
        this.hideLoading()
      }
    },
    async loadOnePeaceFromList () {
      try {
        this.showLoading()

        const { data } = await this.$services.SC.loadOnePeaceFromList(
          this.loadOneAgreementPrequest
        )
        this.loadOnePeaceResult = this.getResponse(data)

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode
        })
      } catch (err) {
        this.serverError()
        console.error(err)
      } finally {
        this.hideLoading()
      }
    },
    handleClickList () {
      this.load()
    },
    load () {
      if (this.selectedRequest) {
        this.showLoading()
        let payload = {
          pNidProc: this.selectedRequest.NidProc
        }
        this.$services.SC.getShPeaceListWithHistory(payload)
          .then(async ({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              this.results = this.result.data

              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode
              })
            }
          })
          .catch((err) => {
            this.serverError()
            console.error(err)
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
      }
    },
    loadRequestSec () {
      this.showLoading()
      let data = { pNidProc: this.selectedRequest.NidProc, pEumSecNoGroup: 13 }
      this.$services.SI.loadRequestSec(data)
        .then(async ({ data }) => {
          this.requestSecResult = this.getResponse(data)
          if (this.requestSecResult.success) {
            this.requestSecResults = this.requestSecResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.BizCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((err) => {
          this.serverError()
          console.error(err)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    showPeaceDetails () {
      this.$refs.peaceTab.changeTab("detailsTab")
      this.showDetails = true
      this.newBtn = false
      this.isShowFooter = false
      if (this.isNewDetails) {
        this.isEditable = true
      } else {
        this.isEditable = false
      }
    },
    newPeaceDetailes () {
      if (!this.results.Sh_Peace_List) this.results.Sh_Peace_List = []
      if (this.results.Sh_Peace_List.length > 0) {
        this.showConfirm(
          "آیا میخواهید اطلاعات کاربری و پیش آمدگی را از ردیف آخر کپی نمایید؟"
        )
          .onOk(() => {
            this.copyLastRow = true
            this.isNewDetails = true
            this.selectedNidBase = this.results.Sh_Peace_List[0].NidBase
            this.showPeaceDetails()
          })
          .onCancel(() => {
            this.selectedNidBase = "00000000-0000-0000-0000-000000000000"
            this.showPeaceDetails()
            this.isNewDetails = true
          })
      } else {
        // this.selectedRow = {
        //   NidBase: '00000000-0000-0000-0000-000000000000'
        // }
        this.selectedNidBase = "00000000-0000-0000-0000-000000000000"
        this.showPeaceDetails()
      }
    },
    emitData (value) {
      this.load()
      this.results.Sh_Peace_List.push(value.Sh_Peace)
    },
    reload () {
      this.isEditable = false
      this.isNewDetails = false
      this.load()
    }
  }
}
</script>
