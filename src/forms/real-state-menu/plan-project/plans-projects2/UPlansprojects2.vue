<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <FormWrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="getPlansprojectsInfoRes" />
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="deleteRes" />
      </template>
      <fit>
        <safa-splitter v-model="splitterModel" vertical :limits="[15, 30]">
          <template v-slot:before>
            <fit>
              <div class="row q-col-gutter-sm q-pa-sm">
                <safa-combo
                  label="سال"
                  label-width="50px"
                  v-model="filter.Plansprojects_Year"
                  cdcName="Plansprojects_Year"
                  ciName="CI_Year"
                  domainName="Estate"
                  class="col-12"
                  :sortFunc="sortCombo"
                  :m="isEditable ? 'r' : 'e'"
                />
                <safa-combo
                  label="منطقه"
                  label-width="50px"
                  v-model="filter.CI_Region"
                  cdcName="CI_Region"
                  ciName="CI_Region"
                  domainName="Estate"
                  class="col-12"
                  :m="isEditable ? 'r' : 'e'"
                />
                <div class="col-12">
                  <btn-search
                    label="جستجو"
                    @click="loadObj"
                    :disable="isEditable"
                  />
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
                    `${item?.PlansprojectsCode ?? ""} - ${
                      item?.PlansprojectsName ?? ""
                    }`
                  }}
                </q-item>
              </q-list>
            </fit>
          </template>
          <template v-slot:after>
            <safa-tabs v-show="activeTab" v-model="activeTab" ref="SafaTabs">
              <template v-slot:tabs>
                <tab-menu name="DesignSpecific" label="مشخصات طرح" />
                <tab-menu name="EstateLocatePlan" label="املاک واقع در طرح" />
                <tab-menu
                  name="EstateMap"
                  label=" املاک واقع در طرح براساس نقشه"
                />
              </template>
              <tab-content name="DesignSpecific">
                <UDesignSpecific v-model="model" :m="mode" />
              </tab-content>
              <tab-content name="EstateLocatePlan">
                <UEstateLocatePlan v-model="model" />
              </tab-content>
              <tab-content name="EstateMap">
                <UEstateMap v-model="model" />
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
          <btn-default label="حذف" @click="btnDelete" v-if="!isEditable" />
          <btn-default label="گزارش" @click="btnReport" v-if="!isEditable" />
        </form-actions>
      </template>
    </FormWrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// Partials
import UDesignSpecific from "./partials/UDesignSpecific.vue"
import UEstateLocatePlan from "./partials/UEstateLocatePlan.vue"
import UEstateMap from "./partials/UEstateMap.vue"
export default {
  mixins: [baseFormMixin],
  components: {
    UDesignSpecific,
    UEstateLocatePlan,
    UEstateMap
  },
  data () {
    return {
      title: "طرح و پروژه - مصوب",
      formKey: "90A963DC-1256-4DDC-9325-D2BF0D81A08C",
      name: "UPlansprojects2",
      main: true,
      activeTab: "DesignSpecific",
      splitterModel: 18,

      // #region services
      getPlansprojectsInfoRes: null,
      loadObjRes: null,
      saveObjRes: null,
      deleteRes: null,

      // #region variabels
      treeView: [],
      filter: {
        Plansprojects_Year: 0,
        CI_Region: 0
      },
      model: {
        HouseInPlansProjects: [],
        HouseInPlansProjectsMap: [],
        Plansprojects_Info: {
          ActualArea: "",
          AssessmentDate: "",
          CI_MapNo: 0,
          CI_PlanLicenseType: 0,
          CI_PlanPriority: 0,
          CI_Region: 0,
          CntPlansprojectsRow: "",
          ContourFromFrom: "",
          ContourFromTo: "",
          CrossingAreaInPlan: "",
          Description: "",
          EstimateCost: "",
          EstimateStartDate: "",
          ExecutiveArea: "",
          MapNo: "",
          NIdPlansprojects: "00000000-0000-0000-0000-000000000000",
          NIdPlansprojects_tmp: null,
          OrderRunningDate: "",
          OrderRunningNo: "",
          PlansprojectsCode: null,
          PlansprojectsName: null,
          Plansprojects_Year: 0,
          RunningDate: "",
          WidthOfNewCrossing: ""
        },
        Plansprojects_Other: [],
        _NIdPlansprojects: "00000000-0000-0000-0000-000000000000"
      }
    }
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const { data } = await this.$services.ES.getPlansprojectsInfoList({
          PCI_Region: this.filter.CI_Region,
          PPlansprojects_Year: this.filter.Plansprojects_Year
        })
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          const res =
            this.loadObjRes?.data?.GetPlansprojects_Info_ListResult ?? []
          if (res.length > 0) {
            this.treeView = res.orderBy((f) => f.SupplySourcesCode)
            await this.getPlansprojectsInfo(this.treeView[0].NIdPlansprojects)
          } else {
            this.model = {
              HouseInPlansProjects: [],
              HouseInPlansProjectsMap: [],
              Plansprojects_Info: {
                ActualArea: "",
                AssessmentDate: "",
                CI_MapNo: 0,
                CI_PlanLicenseType: 0,
                CI_PlanPriority: 0,
                CI_Region: 0,
                CntPlansprojectsRow: "",
                ContourFromFrom: "",
                ContourFromTo: "",
                CrossingAreaInPlan: "",
                Description: "",
                EstimateCost: "",
                EstimateStartDate: "",
                ExecutiveArea: "",
                MapNo: "",
                NIdPlansprojects: "00000000-0000-0000-0000-000000000000",
                NIdPlansprojects_tmp: null,
                OrderRunningDate: "",
                OrderRunningNo: "",
                PlansprojectsCode: null,
                PlansprojectsName: null,
                Plansprojects_Year: 0,
                RunningDate: "",
                WidthOfNewCrossing: ""
              },
              Plansprojects_Other: [],
              _NIdPlansprojects: "00000000-0000-0000-0000-000000000000"
            }
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getPlansprojectsInfo (PNidPlansprojects) {
      try {
        if (PNidPlansprojects === null) return
        this.showLoading()
        const { data } = await this.$services.ES.getPlansprojectsInfo({
          PNidPlansprojects
        })
        this.getPlansprojectsInfoRes = this.getResponse(data)
        if (this.getPlansprojectsInfoRes.success) {
          this.model =
            this.getPlansprojectsInfoRes.data.GetPlansprojects_InfoResult
          await this.log({
            action: this.logActions.view,
            bizCode: PNidPlansprojects,
            bizCodeTitle: "NIdPlansprojects",
            saveDesc: `بارگذاری اطلاعات کد طرح ${
              this.model?.Plansprojects_Info?.PlansprojectsCode ?? "-"
            } انجام گردید.`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    saveObj () {
      if (!this.isValidForm()) return
      this.showLoading()
      const payload = {
        PObj: {
          ...this.model,
          Plansprojects_Info: {
            ...this.model.Plansprojects_Info,
            Plansprojects_Year: this.filter.Plansprojects_Year,
            CI_Region: this.filter.CI_Region
          }
        }
      }
      this.$services.ES.savePlansprojectsInfo(payload)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.model.Plansprojects_Info.NIdPlansprojects,
              bizCodeTitle: "NIdPlansprojects",
              saveDesc: `ذخیره اطلاعات کد طرح ${
                this.model?.Plansprojects_Info?.PlansprojectsCode ?? "-"
              } انجام گردید.`
            })
            this.loadObj()
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
    btnDelete () {
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.showLoading()
        this.$services.ES.delPlansprojectsInfo({
          PNIdPlansprojects: this.model.Plansprojects_Info.NIdPlansprojects
        })
          .then(async ({ data }) => {
            this.deleteRes = this.getResponse(data)
            if (this.deleteRes.success) {
              this.showSuccess("حذف اطلاعات با موفقیت انجام شد.")
              await this.log({
                action: this.logActions.delete,
                bizCode: this.model.Plansprojects_Info.NIdPlansprojects,
                bizCodeTitle: "NIdPlansprojects",
                saveDesc: `حذف اطلاعات کد طرح ${
                  this.model?.Plansprojects_Info?.PlansprojectsCode ?? "-"
                } انجام گردید.`
              })
              this.loadObj()
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
    },
    async btnReport () {
      const reportPath = "/Estate/Rpt_Plansprojects"
      const queryParams = {
        NIdPlansprojects: this.model._NIdPlansprojects
      }
      this.showReport(reportPath, queryParams)
      await this.log({
        action: this.logActions.printReport,
        bizCode: this.model.Plansprojects_Info.NIdPlansprojects,
        bizCodeTitle: "NIdPlansprojects",
        saveDesc: `نمایش گزارش اطلاعات کد طرح ${
          this.model?.Plansprojects_Info?.PlansprojectsCode ?? "-"
        } انجام گردید.`
      })
    },
    selectItem (item, index) {
      this.getPlansprojectsInfo(item.NIdPlansprojects)
      // this.getPlansprojectsInfo(
      //   index === 0
      //     ? "00000000-0000-0000-0000-000000000000"
      //     : item.NIdPlansprojects
      // )
    },
    sortCombo (a, b) {
      return b.Title - a.Title
    }
  },

  created () {
    this.loadObj()
  }
}
</script>
