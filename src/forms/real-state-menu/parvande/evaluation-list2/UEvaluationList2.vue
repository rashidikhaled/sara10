<template>
  <safa-form :id="formKey" :caption="title" appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255">
    <form-wrapper :title="title" :hideTitle="hideTitle" :padding="false">
      <template #header>
        <safa-status :result="loadListResult" />
        <safa-status :result="loadResult" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <safa-splitter v-model="splitterModel" vertical margin="0">
          <template v-slot:before>
            <fit>
              <div class="flex column justify-between full-height">
                <fit>
                  <q-list bordered>
                    <q-item
                      clickable
                      v-ripple
                      v-for="(item, index) in treeView"
                      :key="index"
                      @click="selectItem(item)"
                    >
                      <q-item-section avatar>
                        <q-avatar color="primary" icon="mark_chat_read" />
                      </q-item-section>
                      <q-item-section>
                        {{ getName(item) }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </fit>
              </div>
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs v-model="activeTab">
                <template v-slot:tabs>
                  <tab-menu name="pricingInfo" label="مشخصات قیمت گذاری" />
                  <tab-menu name="Experts" label="هیات کارشناسی" />
                </template>

                <tab-content name="pricingInfo">
                  <fit>
                    <internal-section title="جزئیات اطلاعات">
                      <form-row>
                        <form-control>
                          <safa-text
                            label="شماره نامه کارشناسان دادگستری"
                            v-model="Result.Evaluation_Info.EvaluationID"
                            :m="mode"
                            label-width="100px"
                            cdcName="EvaluationID"
                          />
                        </form-control>
                        <form-control>
                          <safa-datepicker
                            label="تاریخ نامه کارشناسان دادگستری"
                            :m="mode"
                            v-model="Result.Evaluation_Info.EvaluationDate"
                            label-width="100px"
                            cdcName="EvaluationDate"
                          />
                        </form-control>
                        <form-control>
                          <safa-text
                            label="شماره نامه ارسالی به کارشناسان"
                            v-model="
                              Result.Evaluation_Info.TechnicianSendLetterNo
                            "
                            :m="mode"
                            label-width="100px"
                            cdcName="TechnicianSendLetterNo"
                          />
                        </form-control>
                        <form-control>
                          <safa-datepicker
                            label="تاریخ نامه ارسالی به کارشناسان"
                            :m="mode"
                            v-model="
                              Result.Evaluation_Info.TechnicianSendLetterDate
                            "
                            label-width="100px"
                            cdcName="TechnicianSendLetterDate"
                          />
                        </form-control>
                        <form-control>
                          <safa-text
                            label="شماره صورتجلسه انتخاب کارشناسان"
                            v-model="Result.Evaluation_Info.TechnicianLetterNo"
                            :m="mode"
                            label-width="100px"
                            cdcName="TechnicianLetterNo"
                          />
                        </form-control>
                        <form-control>
                          <safa-datepicker
                            label="تاریخ صورتجلسه انتخاب کارشناسان"
                            v-model="
                              Result.Evaluation_Info.TechnicianLetterDate
                            "
                            :m="mode"
                            label-width="100px"
                            cdcName="TechnicianLetterDate"
                          />
                        </form-control>
                        <form-control>
                          <safa-text
                            label="شماره نامه نظریه کارشناسان"
                            v-model="
                              Result.Evaluation_Info.TechnicianTheoryLetterNo
                            "
                            :m="mode"
                            label-width="100px"
                            cdcName="TechnicianTheoryLetterNo"
                          />
                        </form-control>
                        <form-control>
                          <safa-datepicker
                            label="تاریخ نامه نظریه کارشناسان"
                            v-model="
                              Result.Evaluation_Info.TechnicianTheoryLetterDate
                            "
                            :m="mode"
                            label-width="100px"
                            cdcName="TechnicianTheoryLetterDate"
                          />
                        </form-control>
                        <form-control>
                          <safa-text
                            label="مبلغ کل"
                            v-model="Result.Evaluation_Info.Total_Price"
                            :m="mode"
                            label-width="100px"
                            cdcName="Total_Price"
                          />
                        </form-control>
                        <form-control>
                          <safa-combo
                            ciName="CI_EvaluationKind"
                            domainName="Estate"
                            label="نحوه قیمت گذاری"
                            v-model="Result.Evaluation_Info.CI_EvaluationKind"
                            :m="mode"
                            label-width="100px"
                            cdcName="CI_EvaluationKind"
                          />
                        </form-control>
                        <text-template
                          v-model="Result.Evaluation_Info.Description"
                          cdcName="Description"
                          formKey="C88DEEF6-3FB9-49B7-B694-D53983B1AC7D"
                          label="توضیحات"
                          label-width="100px"
                          :m="mode"
                          :rows="1"
                          class="col-12"
                        />
                      </form-row>
                    </internal-section>
                    <safa-grid
                      v-model="pricedComponents"
                      cdcName="pricedComponents"
                      title="اجزا قیمت گذاری شده"
                      :columns="pricedComponentsColumns"
                      fit
                      :m="mode"
                      paginate
                    />
                  </fit>
                </tab-content>
                <tab-content name="Experts" :padding="false">
                  <safa-tabs v-model="activeTabExperts">
                    <template v-slot:tabs>
                      <tab-menu name="justice" label="دادگستری" />
                    </template>
                    <tab-content name="justice">
                      <fit>
                        <form-row class="q-mb-sm">
                          <FormControl>
                            <safa-combo
                              label="جستجوی نام کارشناس"
                              :options="AgentOpt"
                              v-model="AgentCode"
                              source-type="local"
                              :m="m"
                              label-width="100px"
                              cdcName="AgentCode"
                              ref="melkRef"
                            />
                          </FormControl>
                        </form-row>
                        <safa-grid
                          v-model="Details"
                          cdcName="Details"
                          title="جزییات"
                          :columns="DetailsColumns"
                          height="100%"
                          max-height="100%"
                          min-height="200px"
                          :suppressRowClickSelection="false"
                          fit
                          m="mode"
                          paginate
                          :addRow="true"
                        />
                      </fit>
                    </tab-content>
                  </safa-tabs>
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template #footer>
        <FormActions
          :showEditButton="workflowCompatible"
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <template>
            <btn-default
              label="حذف"
              @click="delConfirm"
            />
          </template>
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    },
    baseNosaziCode: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      title: "قیمت گذاری مشهد- سوابق",
      formKey: "DD71116E-3AED-40E2-A53F-D5C0440E41A9",
      name: "UEvaluationList2",
      main: true,
      workflowCompatible: true,
      // #services
      loadListResult: null,
      loadResult: null,
      saveObjRes: null,
      Result: {
        Evaluation_Technician_2: "",
        Evaluation_Info: {
          EvaluationID: "",
          EvaluationDate: "",
          TechnicianSendLetterNo: "",
          TechnicianSendLetterDate: "",
          TechnicianLetterNo: "",
          TechnicianLetterDate: "",
          TechnicianTheoryLetterNo: "",
          TechnicianTheoryLetterDate: "",
          Total_Price: "",
          CI_EvaluationKind: "",
          Description: ""
        }
      },
      NIdEvaluation: null,

      // #value
      activeTab: "pricingInfo",
      activeTabExperts: "justice",

      pricedComponents: [],
      Details: [],
      pricedComponentsColumns: [
        {
          field: "CI_EvaluationDetails",
          title: "جز",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "تاریخ",
          editor: "date",
          field: "EvaluationDate"
        },
        {
          title: "قیمت واحد",
          field: "UnitPrice"
        },
        {
          title: "مساحت",
          field: "Area"
        },
        {
          title: "قیمت",
          field: "EvaluationPrice"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ],
      DetailsColumns: [
        {
          field: "CI_EvaluationTechnician_Name",
          title: "نام کارشناس",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "سمت کارشناس",
          field: "CI_EvaluationTechnician_Post",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "دستمزد کارشناس",
          field: "TechnicianPayment"
        },
        {
          title: "تاریخ قیمت گذاری",
          editor: "date",
          field: "EvaluationDate"
        },
        {
          title: "جز",
          field: "CI_EvaluationDetails",
          domain: "Estate",
          editor: "combo"
        },
        {
          title: "قیمت واحد",
          field: "UnitPrice"
        },
        {
          title: "مساحت",
          field: "Area"
        },
        {
          title: "قیمت کارشناس",
          field: "TechnicianPrice"
        },
        {
          title: "توضیحات",
          field: "Description"
        }
      ],
      AgentOpt: [],
      AgentCode: "",
      splitterModel: 20,
      treeView: []
    }
  },
  mounted () {
    this.loalList()
  },
  methods: {
    selectItem (item) {
      this.NIdEvaluation = item.NIdEvaluation
    },
    getName (item) {
      return `${item.CI_EvaluationKind} - ${item.EvaluationDate}`
    },
    loalList () {
      const payload = {
        pNIdProc:
          this.currentObj?.NIdProcess || "00000000-0000-0000-0000-000000000000"
      }
      this.showLoading()
      this.$services.ES.getEvaluationInfoRequestList(payload)
        .then(async ({ data }) => {
          this.loadListResult = this.getResponse(data)
          if (this.loadListResult.success) {
            this.pricedComponents =
              this.loadListResult.data.GetEvaluation_Info_RequestListResult ?? []
            this.loadObj(this.pricedComponents[0])
            const res = this.loadListResult.data.GetEvaluation_Info_RequestListResult
            if (res && res.length > 0) {
              this.treeView = res
                .filter(
                  (f) =>
                    f.NIdEvaluation !== "00000000-0000-0000-0000-000000000000"
                )
                .orderBy((f) => f.SupplySourcesCode)
            }
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: ""
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadObj ({ NIdEvaluation, NidRequest }) {
      const payload = {
        PNidEvaluation: NIdEvaluation,
        pNIdRequest: NidRequest,
        pIsEvaluationForShiraz: false
      }
      this.showLoading()
      this.$services.ES.getEvaluationInfo(payload)
        .then(async ({ data }) => {
          this.loadResult = this.getResponse(data)
          if (this.loadResult.success) {
            this.Result = this.loadResult.data.GetEvaluation_InfoResult
            const tmp =
              this.loadResult.data.GetEvaluation_InfoResult
                .CI_EvaluationTechnician_Name ?? []
            this.AgentOpt = tmp.map((m) => {
              return {
                ID: m.ID,
                Title: `${m.Title} | ${m.ID}`
              }
            })
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async saveObj () {
      this.showLoading()

      let payload = {
        PObj: { ...this.Result }
      }
      console.log("===========================>", payload)

      try {
        const { data } = await this.$services.ES.saveEvaluationInfo(payload)
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          this.showSuccess("ذخیره اطلاعات باموفقیت انجام شد")
          await this.log({
            action: this.logActions.save,
            bizCode: '',
            bizCodeTitle: "NIdEvaluation",
            saveDesc: "ذخیره اطلاعات فرم قیمت گذاری انجام شد"
          })

          this.loadObj()
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    delConfirm () {
      this.showConfirm("آیا اطلاعات مورد نظر حذف شود؟").onOk(() => {
        this.deleteObj()
      })
    },
    async deleteObj () {
      this.showLoading()
      if (!this.selelectedItemTree) {
        return
      }
      if (this.selelectedItemTree.EvaluationDate.includes("جدید")) {
        this.showError(
          "لطفا از لیست نمایش اطلاعات ، موردی که شامل تاریخ میباشد را انتخاب کنید"
        )
        this.hideLoading()
        return false
      }
      let payload = {
        PNIdEvaluation: this.selelectedItemTree.NIdEvaluation
      }

      try {
        const { data } = await this.$services.ES.delEvaluationInfo(payload)
        this.deleteObjRes = this.getResponse(data)
        if (this.deleteObjRes.success) {
          if (this.deleteObjRes.data.DelEvaluation_InfoResult) {
            this.showError("حذف اطلاعات باموفقیت انجام شد")
            await this.log({
              action: this.logActions.delete,
              bizCode: this.selelectedItemTree?.NIdEvaluation,
              bizCodeTitle: "NIdEvaluation",
              saveDesc: `حذف اطلاعات فرم قیمت گذاری با NIdEvaluation ${
                this.selelectedItemTree?.NIdEvaluation ?? ""
              } انجام شد`
            })
          } else {
            this.showError("خطا در حذف اطلاعات")
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
