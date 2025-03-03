<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :hideTitle="hideTitle" :padding="false">
      <safa-status :result="preLoadObjRes" />
      <safa-status :result="getEvaluationInfoRes" />
      <safa-status :result="deleteObjRes" />
      <safa-status :result="saveObjRes" />
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
                      <q-item-section>{{ getName(item) }}</q-item-section>
                    </q-item>
                  </q-list>
                </fit>
              </div>
            </fit>
          </template>
          <template v-slot:after>
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
                          v-model="model.Evaluation_Info.EvaluationID"
                          :m="mode"
                          label-width="100px"
                          cdcName="EvaluationID"
                        />
                      </form-control>
                      <form-control>
                        <safa-datepicker
                          label="تاریخ نامه کارشناسان دادگستری"
                          :m="mode"
                          v-model="model.Evaluation_Info.EvaluationDate"
                          label-width="100px"
                          cdcName="EvaluationDate"
                        />
                      </form-control>
                      <form-control>
                        <safa-text
                          label="شماره نامه ارسالی به کارشناسان"
                          v-model="model.Evaluation_Info.TechnicianSendLetterNo"
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
                            model.Evaluation_Info.TechnicianSendLetterDate
                          "
                          label-width="100px"
                          cdcName="TechnicianSendLetterDate"
                        />
                      </form-control>
                      <form-control>
                        <safa-text
                          label="شماره صورتجلسه انتخاب کارشناسان"
                          v-model="model.Evaluation_Info.TechnicianLetterNo"
                          :m="mode"
                          label-width="100px"
                          cdcName="TechnicianLetterNo"
                        />
                      </form-control>
                      <form-control>
                        <safa-datepicker
                          label="تاریخ صورتجلسه انتخاب کارشناسان"
                          v-model="model.Evaluation_Info.TechnicianLetterDate"
                          :m="mode"
                          label-width="100px"
                          cdcName="TechnicianLetterDate"
                        />
                      </form-control>
                      <form-control>
                        <safa-text
                          label="شماره نامه نظریه کارشناسان"
                          v-model="
                            model.Evaluation_Info.TechnicianTheoryLetterNo
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
                            model.Evaluation_Info.TechnicianTheoryLetterDate
                          "
                          :m="mode"
                          label-width="100px"
                          cdcName="TechnicianTheoryLetterDate"
                        />
                      </form-control>
                      <form-control>
                        <safa-text
                          label="مبلغ کل"
                          v-model="model.Evaluation_Info.Total_Price"
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
                          v-model="model.Evaluation_Info.CI_EvaluationKind"
                          :m="mode"
                          label-width="100px"
                          cdcName="CI_EvaluationKind"
                        />
                      </form-control>
                      <text-template
                        v-model="model.Evaluation_Info.Description"
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
                    v-model="model.Evaluation_Details"
                    cdcName="Evaluation_Details"
                    title="اجزا قیمت گذاری شده"
                    helper="agPricedComponentsColumns"
                    fit
                    :m="mode"
                    paginate
                  />
                </fit>
              </tab-content>
              <!-- second Tab -->
              <tab-content name="Experts" :padding="false">
                <safa-tabs v-model="activeTabExperts">
                  <template v-slot:tabs>
                    <tab-menu name="justice" label="دادگستری" />
                  </template>
                  <!-- justice Tab -->
                  <tab-content name="justice">
                    <fit>
                      <!-- <form-row class="q-mb-sm">// این کمبو در سرا 8 عملکردی ندارد ، و عملکرد ان در کد زمل کامنت شده است
                        <FormControl>
                          <safa-combo
                            label="جستجوی نام کارشناس"
                            v-model="comboSearchName2"
                            cdcName="comboSearchName2"
                            label-width="100px"
                            source-type="local"
                            :options="comboOptionsName2"
                            :m="m"
                          />
                        </FormControl>
                      </form-row> -->
                      <safa-notice>
                        برای جستجو ( نام کارشناس ) میتوانید از فیلتر
                        جدول استفاده کنید
                      </safa-notice>
                      <safa-grid
                        v-model="model.Evaluation_Technician_2"
                        cdcName="Evaluation_Technician_2"
                        title=""
                        helper="agDetailsColumns"
                        :m="mode"
                      />
                    </fit>
                  </tab-content>
                </safa-tabs>
              </tab-content>
            </safa-tabs>
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
              spCaption="حذف"
              @click="delConfirm"
              spId="44c64d4f-f371-4216-a266-ffa44adbc6f0"
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
      title: "قیمت گذاری شیراز- سوابق",
      formKey: "E52D75EE-B1DA-416B-885C-BD310E611482",
      name: "UEvaluationList3",
      main: true,

      // var
      activeTab: "pricingInfo",
      activeTabExperts: "justice",
      splitterModel: 20,
      treeView: [],
      selelectedItemTree: {},
      comboOptionsName1: [],
      comboOptionsName2: [],

      // Nid From Tree
      NIdEvaluation: "",
      NidRequest: "",

      // Res
      preLoadObjRes: null,
      getEvaluationInfoRes: null,
      deleteObjRes: null,
      saveObjRes: null,

      // cond
      workflowCompatible: true,

      // model
      model: {
        Evaluation_Technician_2: "",
        searchingDetails: "",
        Evaluation_Info: {
          EvaluationID: "",
          EvaluationDate: "",
          TechnicianSendLetterNo: "",
          TechnicianSendLetterDate: "",
          TechnicianLetterNo: "",
          CI_EvaluationTechnician_Name: [],
          TechnicianLetterDate: "",
          TechnicianTheoryLetterNo: "",
          TechnicianTheoryLetterDate: "",
          Total_Price: "",
          CI_EvaluationKind: "",
          Description: ""
        }
      }
    }
  },
  mounted () {
    this.preLoadObj()
  },
  methods: {
    async preLoadObj () {
      this.showLoading()
      let payload = {}
      if (this.taskInfo) {
        payload = {
          pNIdProc:
            this.taskInfo.NidProc || "00000000-0000-0000-0000-000000000000"
        }
        this.workflowCompatible = true
      } else {
        debugger
        // this.selectedRequest
        payload = {
          pNIdProc:
            this.currentObj?.NIdProcess ||
            "00000000-0000-0000-0000-000000000000"
        }
        this.workflowCompatible = false
      }

      try {
        const { data } = await this.$services.ES.getEvaluationInfoRequestList(
          payload
        )
        this.preLoadObjRes = this.getResponse(data)
        if (this.preLoadObjRes.success) {
          this.treeView =
            this.preLoadObjRes.data.GetEvaluation_Info_RequestListResult
          if (this.treeView.length > 0) {
            this.selelectedItemTree = this.treeView[this.treeView.length - 1]
            // this.NIdEvaluation = this.selelectedItemTree.NIdEvaluation
            // this.NidRequest = this.selelectedItemTree.NidRequest
            this.getEvaluationInfo()
          }
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async getEvaluationInfo () {
      this.showLoading()
      let payload = {
        PNidEvaluation: this.selelectedItemTree.NIdEvaluation,
        pNIdRequest: this.selelectedItemTree.NidRequest,
        pIsEvaluationForShiraz: true
      }
      try {
        const { data } = await this.$services.ES.getEvaluationInfo(payload)
        this.getEvaluationInfoRes = this.getResponse(data)
        if (this.getEvaluationInfoRes.success) {
          this.model = this.getEvaluationInfoRes.data.GetEvaluation_InfoResult
          this.comboOptionsName1 =
            this.model.CI_EvaluationTechnician_Name.filter(
              // eslint-disable-next-line eqeqeq
              (i) => i.SysCI_TechnicianType == 1
            )
          this.comboOptionsName2 =
            this.model.CI_EvaluationTechnician_Name.filter(
              // eslint-disable-next-line eqeqeq
              (i) => i.SysCI_TechnicianType == 2
            )
          await this.log({
            action: this.logActions.view,
            bizCode: this.selelectedItemTree?.NIdEvaluation,
            bizCodeTitle: "NIdEvaluation",
            saveDesc: `بارگذاری اطلاعات فرم قیمت گذاری با NIdEvaluation ${
              this.selelectedItemTree?.NIdEvaluation ?? ""
            } انجام شد`
          })
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async saveObj () {
      if (this.model.IsConfirmContractBuy) {
        this.ShowError("پس از تایید صلح نامه امکان تغییر اطلاعات نمی باشد")
        return false
      }
      this.showLoading()

      let payload = {
        PObj: { ...this.model }
      }
      console.log("===========================>", payload)

      try {
        const { data } = await this.$services.ES.saveEvaluationInfo(payload)
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          if (this.saveObjRes.data.SaveEvaluation_InfoResult) {
            this.showSuccess("ذخیره اطلاعات باموفقیت انجام شد")
            await this.log({
              action: this.logActions.save,
              bizCode: this.selelectedItemTree?.NIdEvaluation,
              bizCodeTitle: "NIdEvaluation",
              saveDesc: `ذخیره اطلاعات فرم قیمت گذاری با NIdEvaluation ${
                this.selelectedItemTree?.NIdEvaluation ?? ""
              } انجام شد`
            })

            this.preLoadObj()
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
    },
    getName (item) {
      return `قیمت گذاری - ${item.EvaluationDate}`
    },
    selectItem (item) {
      this.selelectedItemTree = item
      this.getEvaluationInfo()
    }
  }
}
</script>
