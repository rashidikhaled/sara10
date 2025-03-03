<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="result" />
      </template>
      <fit>
        <safa-splitter v-model="splitterModel" vertical :limits="[15, 30]">
          <template v-slot:before>
            <fit>
              <div class="row q-col-gutter-sm q-pa-sm">
                    <safa-combo
                      ciName="CI_Region"
                      domainName="Estate"
                      label="منطقه"
                      v-model="selectCI_Region"
                      label-width="50px"
                      class="col-12"
                      cdcName="CI_Region"
                      :m="isEditable ? 'e' : 'r'"
                    />
                    <div class="col-12">
                  <btn-search label="جستجو" @click="loadObj" />
                </div>
              </div>
              <q-separator class="q-mb-sm" />
              <q-list v-scroll class="fit scroll">
                <q-item
                  v-for="(item, index) in treeView"
                  :key="index"
                  class="flex items-center"
                  clickable
                  @click="selectItem(item, index)"
                >
                  <q-icon color="primary" size="sm" name="list" />&nbsp;{{
                    `${item?.SupplySourcesCode ?? ""} - ${
                      item?.SupplySourcesTitle ?? ""
                    }`
                  }}
                </q-item>
              </q-list>
            </fit>
          </template>
          <template v-slot:after>
            <safa-tabs v-show="activeTab" v-model="activeTab" ref="SafaTabs">
              <template v-slot:tabs>
                <tab-menu
                  name="SupplySourceSpecific"
                  label="مشخصات منبع تامین"
                />
                <tab-menu
                  name="SupplySourceClasses"
                  label="کلاسه های نوسازی مرتبط با اجزاء منبع تامین"
                />
              </template>

              <tab-content name="SupplySourceSpecific">
                <USupplySourceSpecific
                  :name="name"
                  :title="title"
                  :formKey="formKey"
                  :baseNosaziCode="baseNosaziCode"
                  v-model="model"
                  :m="mode"
                />
              </tab-content>
              <tab-content name="SupplySourceClasses">
                <USupplySourceClasses
                  :name="name"
                  :title="title"
                  :formKey="formKey"
                  :m="mode"
                  v-model="model"
                />
              </tab-content>
            </safa-tabs>
          </template>
        </safa-splitter>
      </fit>

      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <btn-default label="حذف" @click="deleteHandler" />
          <btn-default label="گزارش" @click="ReportClick" />
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

// Partials
import USupplySourceSpecific from "./partials/USupplySourceSpecific.vue"
import USupplySourceClasses from "./partials/USupplySourceClasses.vue"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"
export default {
  mixins: [baseFormMixin],

  components: {
    USupplySourceSpecific,
    USupplySourceClasses
  },

  data () {
    return {
      title: "منابع تامین",
      formKey: "9FBE8528-0ACF-40F4-8756-091575EBCBB4",
      name: "USupplySourcesList",
      main: true,
      result: null,
      selectCI_Region: 0,
      activeTab: "SupplySourceSpecific",
      treeView: [],

      // Splitters
      splitterModel: 18,

      // values
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        SupplySources_Contract: [],
        SupplySources_DetailsCode: [],
        SupplySources_Info: {
          Apartment: 0,
          AssessmentDate: "",
          Block: 0,
          Building: 0,
          CI_GettingKind: 0,
          CI_GettingOwner: 0,
          CI_MunicipalityOwner: 0,
          CI_Region: 0,
          CessionDate: "",
          CodeString: "",
          Description: "",
          District: 0,
          DocDate: "",
          DocNo: "",
          EndowmentName: "",
          House: 0,
          IsMunicipalityOwner: false,
          IsOutOfBound: false,
          MapNo: "",
          MunicipalityArea: "",
          NIdSupplySources: this.NIdSupplySources,
          NIdSupplySources_tmp: 0,
          OverallRating: "",
          Region: 0,
          Shop: 0,
          SupplySourcesCode: 0,
          SupplySourcesTitle: "",
          TotalCostShareMunicipalUnits: "",
          TotalLandCost: "",
          TotalValuePartsTransferredMunicipalities: ""
        },
        SupplySources_Other: [],
        SupplySources_RelatedClasse: [],
        _NIdSupplySources: this.NIdSupplySources
      },

      NIdSupplySources: "00000000-0000-0000-0000-000000000000",
      SupplySourcesTitle: "",
      List: [],

      // services
      SaveObjRes: null,
      LoadObjRes: null
    }
  },
  mounted () {
    this.loadObj()
    this.getSupplySourcesInfo()
  },
  methods: {
    selectItem (item) {
      this.NIdSupplySources = item.NIdSupplySources
      this.SupplySourcesTitle = item.SupplySourcesTitle
      this.getSupplySourcesInfo()
    },
    getName (item) {
      return `${item.SupplySourcesCode} - ${item.SupplySourcesTitle}`
    },
    loadObj () {
      this.showLoading()
      const payload = {
        PIsNewRow: true,
        PCI_Region: this.selectCI_Region
      }
      this.$services.ES.getSupplySourcesInfoMessage(payload)
        .then(({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            const res = this.result.data.GetSupplySources_Info_MessageResult
            if (res && res.length > 0) {
              this.treeView = res
                .filter(
                  (f) =>
                    f.NIdSupplySources !==
                    "00000000-0000-0000-0000-000000000000"
                )
                .orderBy((f) => f.SupplySourcesCode)
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              nidWorkItem: "",
              saveDesc: ""
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
    getSupplySourcesInfo () {
      const payload = {
        PNidSupplySources: this.NIdSupplySources
      }
      this.showLoading()
      this.$services.ES.getSupplySourcesInfo(payload)
        .then(({ data }) => {
          this.LoadObjRes = this.getResponse(data)
          if (this.LoadObjRes.success) {
            this.model = this.LoadObjRes.data.GetSupplySources_InfoResult

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              nidWorkItem: "",
              saveDesc: ""
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        PObj: this.model
      }
      this.$services.ES.saveSupplySourcesInfo(payload)
        .then(({ data }) => {
          this.SaveObjRes = this.getResponse(data)
          if (this.SaveObjRes.success) {
            this.isEditable = false
            this.loadObj()
            this.getSupplySourcesInfo()

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode,
              nidWorkItem: "",
              saveDesc: ""
            })
          }
        })
        .catch((ex) => {
          console.error(ex)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    ReportClick () {
      const reportPath =
        "/Estate/Rpt_SupplySources"
      const queryParams = {
        NIdSupplySources: this.NIdSupplySources
      }
      this.showReport(reportPath, queryParams)
      this.log({
        action: "",
        bizCode: "",
        bizCodeTitle: ""
      })
    },
    deleteHandler () {
      if (
        this.NIdSupplySources === "00000000-0000-0000-0000-000000000000" ||
        !this.NIdSupplySources ||
        this.SupplySourcesTitle === "" ||
        this.SupplySourcesTitle === null
      ) {
        return
      }
      this.showConfirm("آیا اطلاعات مورد نظر  حذف شود؟").onOk(async () => {
        this.showLoading()
        const payload = {
          PNIdSupplySources: this.NIdSupplySources
        }
        this.$services.ES.delSupplySourcesInfo(payload)
          .then(({ data }) => {
            this.result = this.getResponse(data)
            if (this.result.success) {
              debugger
              this.loadObj()
              this.getSupplySourcesInfo()

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              this.log({
                action: this.logActions.delete,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode,
                nidWorkItem: "",
                saveDesc: ""
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
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.txt-message {
  color: #975625;
  font-size: 13px;
  font-weight: 600;
  margin: 0 auto !important;
  // animation: ripple 1.5s infinite linear;
}

@keyframes ripple {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
