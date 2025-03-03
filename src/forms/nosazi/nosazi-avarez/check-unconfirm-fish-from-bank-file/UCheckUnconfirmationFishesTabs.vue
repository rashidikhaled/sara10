<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="5159EC42-40B3-4A97-A3C4-653D3BA204AB"
  >
    <form-wrapper
      :padding="false"
      title="بررسی فیش های تایید نشده از فایل بانکی"
    >
      <!-- <div class="form-title">بررسی فیش های تایید نشده از فایل بانکی//</div> -->
      <safa-status :result="requestResult" />
      <!-- Grid -->
      <safa-splitter
        v-model="splitterModel"
        horizontal
        style="min-height: 450px"
      >
        <template #before>
          <safa-datatable
            ref="grid"
            v-model="items"
            :allowCopy="false"
            :allowNewRow="false"
            :allowRemoveRow="false"
            :allowSelect="true"
            :bordered="false"
            cdcName="unconfirmationBankFile"
            class="q-mb-sm"
            height="150px"
            helper="nosazi.unconfirmationBankFile"
            maxHeight="100%"
            minHeight="100%"
            name="grid"
            title=" فایل بانکی انتخاب شده"
          ></safa-datatable>
        </template>
        <template #after>
          <fit>
            <safa-tabs
              v-model="activeTab"
              :bordered="false"
              class="fit"
              height="100%"
              style="min-height: 300px"
            >
              <template v-slot:tabs>
                <tab-menu label="اطلاعات فیش ها" name="fishesInfo" />
              </template>
              <!-- <q-tab-panels v-model="activeTab"> -->
              <tab-content :padding="false" name="fishesInfo">
                <UFishesInfo
                  :formKey="formKey"
                  :name="name"
                  :task-info="taskInfo"
                  :title="title"
                />
              </tab-content>
              <tab-content name="fishSearch">
                <UFishSearch :formKey="formKey" :name="name" :title="title" />
              </tab-content>
            </safa-tabs>
          </fit>
        </template>
      </safa-splitter>
      <!-- </q-tab-panels> -->
    </form-wrapper>
  </safa-form>
</template>

<script>
import UFishesInfo from "./partials/UFishesInfo.vue"
import UFishSearch from "./partials/UFishSearch.vue"
import baseFormMixin from "src/mixins/baseFormMixin.js"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  route: "/nosazi-avarez/check-uncorfirmation-fishes",

  components: {
    UFishesInfo,
    UFishSearch
  },
  mixins: [baseFormMixin],
  data () {
    return {
      title: "بررسی فیش های تایید نشده از فایل بانکی",
      formKey: "9c2fa62f-1ddc-40bf-b58a-22459631dcef",
      name: "UCheckUnconfirmationFishesTabs",
      main: true,
      dist: 1,
      splitterModel: 40,
      activeTab: "fishesInfo",
      items: [],
      ShowModal: false,
      loadIncomeListPrequest: {
        pNidProc: "d4b57d19-35d6-41a3-8339-4bf16a3f0f93"
      },
      results: {
        calculateRow: {},
        allFichesList: {},
        details: {},
        mode: "r"
      },
      loadAllFichesPrequest: {
        pNidProc: "ad1878e5-d528-492c-a11b-52cd8f9b1a87"
      },
      loadDetailsPreqsuest: {
        pNidIncome: "8fc98967-7d59-484b-942b-2f1271604875",
        PLoadFun:
          "Income_LogMethod,Income,Income_Calculation_ForChange,Income_PrePayment,Income_OddmentAccount,Income_Discount,NidBase"
      },
      loadDataPrequest: {
        pEumObjOnPrice: "2"
      },
      requestResult: {}
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.dist = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      ).District
    }
  },
  methods: {
    showModal () {
      this.isShowModal = true
    },
    closeModal (e) {
      this.isShowModal = e
    },
    loadIncomelist () {
      this.$q.loading.show()
      this.$services.SD.getIncomeList(this.loadIncomeListPrequest, {
        config: {
          District: this.dist
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.results.calculateRow = this.getResponse(
            response.data
          ).data.IncomeList
        })
        .catch((ex) => {
          this.$q.dialog({
            title: "خطا در سرور",
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },
    getAllFicheByIncomeList () {
      this.$q.loading.show()
      this.$services.SD.getAllFicheByIncomeList(this.loadAllFichesPrequest, {
        config: {
          District: this.dist
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          // this.results.allFichesList = this.getResponse(response.data).data.allFichesList[0].Income_Fiche

          this.results.allFichesList = [
            this.getResponse(response.data).data.All_FicheByIncomeList[0]
              .Income_Fiche
          ]

          this.results.allFichesList[0].IncomeCreateDate = this.getResponse(
            response.data
          ).data.All_FicheByIncomeList[0].IncomeCreateDate
          this.results.allFichesList[0].IncomeCreateTime = this.getResponse(
            response.data
          ).data.All_FicheByIncomeList[0].IncomeCreateTime
        })
        .catch((ex) => {
          this.$q.dialog({
            title: "خطا در سرور",
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    },
    selectedChange (e) {
      // console.log('selectedChange', e)
      this.loadDetailsPreqsuest.pNidIncome = e.dataItem.NidIncome

      this.$q.loading.show()
      this.$services.SD.getIncomeDetails(this.loadDetailsPreqsuest, {
        config: {
          District: this.dist
        }
      })
        .then((response) => {
          this.$q.loading.hide()

          this.results.details = this.getResponse(response.data).data

          // console.log('this.results.details', this.results.details)
        })
        .catch((ex) => {
          this.$q.dialog({
            title: "خطا در سرور",
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: ex.message
          })
        })
    }
  }
}
</script>
