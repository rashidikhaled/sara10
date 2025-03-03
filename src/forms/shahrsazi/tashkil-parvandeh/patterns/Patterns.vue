<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper title="طرح ها" vertical :padding="false">
      <template #header>
        <safa-status :result="result" />
        <safa-status :result="saveResult" />
        <safa-status :result="baseLibResult" />
      </template>
      <!-- <safa-securityPanel
        id="10717c5b-fd6f-42eb-9aff-892b0f3f38ad"
        caption="طرح و کاربری مصوب-فقط خواندنی"
        tag="div"
        class="q-mb-sm"
      > -->

      <safa-splitter
        v-model="gridSplitter1"
        horizontal
        style="min-height: 250px"
      >
        <template v-slot:before>
      <fit>
        <safa-datatable
          fit
          title="طرح و کاربری مصوب "
          v-model="results.Base_PlanMosavab"
          ref="grid2"
          :columns="basePlanMosavab"
          :m="mode"
          height="150px"
          :bordered="false"
          max-height="150px"
        />
      </fit>
      <!-- </safa-securityPanel>
      <safa-securityPanel
        id="3c23f66b-3e0f-41e5-9405-239222907cd5"
        caption="طرح و کاربری مصوب-قابل ویرایش"
        tag="div"
      > -->
      <!-- <safa-datatable
          title="طرح و کاربری مصوب "
          v-model="results.Base_PlanMosavab"
          ref="grid2"
          helper="patternMosavab"
          m="e"
          margin="0"
          height="150px"
          max-height="150px"
          :bordered="false"
        ></safa-datatable> -->
      <!-- </safa-securityPanel> -->
        </template>
        <template #after>
      <safa-splitter
        v-model="gridSplitter"
        horizontal
        style="min-height: 250px"
      >
        <template v-slot:before>
          <!-- <safa-securityPanel
            id="b34baa9f-a3a1-4832-aac0-79f62fdf526a"
            caption="طرح و کاربری مجاز-فقط خواندنی"
            tag="section"
          > -->
          <fit>
            <safa-datatable
              title="طرح و کاربری مجاز "
              :m="mode"
              v-model="results.Base_PlanMojaz"
              ref="grid2"
              :columns="basePlanMojaz"
              class="fit"
              height="100%"
              max-height="100%"
              :bordered="false"
            />
          </fit>
          <!-- </safa-securityPanel> -->
          <!-- <safa-securityPanel
            id="8a3f0e5c-33f2-48f1-b2a2-406bde55674d"
            caption="طرح و کاربری مجاز-قابل ویرایش"
            tag="section"
          > -->
          <!-- <safa-datatable
              title="طرح و کاربری مجاز "
              m="e"
              v-model="results.Base_PlanMojaz"
              ref="grid2"
              helper="patternMojaz"
              class="fit"
              margin="0"
              height="100%"
              max-height="100%"
              :bordered="false"
            ></safa-datatable> -->
          <!-- </safa-securityPanel> -->
        </template>

        <template v-slot:after>
          <!-- <safa-securityPanel
            id="377f6e32-4d69-4c15-8731-eea01b4ab8d7"
            caption="طرح و کاربری ملاک عمل-فقط خواندنی"
            tag="section"
          > -->
          <fit>
            <safa-datatable
              title="طرح و کاربری ملاک عمل"
              v-model="results.Base_PlanForWork"
              ref="grid2"
              :columns="basepatternMelak"
              :m="mode"
              class="fit"
              margin="0"
              height="100%"
              max-height="100%"
              :bordered="false"
            />
          </fit>
          <!-- </safa-securityPanel> -->
          <!-- <safa-securityPanel
            id="ed9d9b59-3ca1-45f3-a67a-69013ad327bf"
            caption="طرح و کاربری ملاک عمل-قابل ویرایش"
            tag="section"
          > -->
          <!-- <safa-datatable
              title=" طرح  کاری ملاک عمل"
              v-model="results.Base_PlanForWork"
              ref="grid2"
              helper="patternMelak"
              m="e"
              class="fit"
              margin="0"
              height="100%"
              max-height="100%"
              :bordered="false"
            ></safa-datatable> -->
          <!-- </safa-securityPanel> -->
        </template>
      </safa-splitter>
        </template>
      </safa-splitter>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12 q-my-m"
          @edit="isEditable = true"
          editSPId="2384f927-5e2f-3998-8baa-c768616287f5"
          editFormId="e38afa70-585e-41c4-9716-feace34d8e6f"
          editSPCaption="ویرایش"
          :force="true"
          @save="savePlan"
          @cancel="cancel"
        >
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  data: function () {
    return {
      gridSplitter1: 30,
      gridSplitter: 50,
      title: "طرح ها",
      formKey: "e38afa70-585e-41c4-9716-feace34d8e6f",
      name: "Patterns",
      main: true,
      workflowCompatible: true,

      nidWorkItem: "",
      requestDate: "",
      workFlowTitle: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {},
        Sh_RequestInfo: {},
        MainObj: {}
      },
      ownerName: "",
      oldNosaziCode: "",
      nosaziCode: "",
      nidBase: "",
      result: null,
      results: {
        Base_PlanForWork: [],
        Base_PlanMojaz: [],
        Base_PlanMosavab: [],
        NidLib: {}
      },
      saveResult: null
    }
  },
  computed: {
    basePlanMosavab () {
      return [
        {
          editable: this.isEditable,
          cell: "three-equipment-combo",
          field: "CI_PlanType",
          label: "نوع طرح /کاربری طرح/استفاده مجاز",
          options: {
            combo1Opts: {
              ciName: "CI_PlanType",
              domainName: "CI_SaraM1",
              field: "CI_PlanType",
              paramName: "pCI_PlanType",
              responseKey: "CI_PlanUsingType_FromCI_PlanType",
              serviceUrl: "GetCI_PlanUsingType_FromCI_PlanType"
            },
            combo2Opts: {
              ciName: "CI_PlanUsingType",
              domainName: "CI_SaraM1",
              field: "CI_PlanUsingType",
              paramName: "pCI_PlanUsingType",
              responseKey: "CI_PlanUsingMojaz_FromCI_PlanUsingType",
              serviceUrl: "GetCI_PlanUsingMojaz_FromCI_PlanUsingType"
            },
            combo3Opts: {
              field: "CI_PlanUsingMojaz",
              title: "نوع طرح /کاربری طرح/استفاده مجاز",
              width: "600px"
            }
          },
          title: "نوع طرح /کاربری طرح/استفاده مجاز",
          width: "800px"
        },
        {
          editor: "numeric",
          field: "DensityPercent",
          title: "درصد تراکم",
          width: "80px"
        },
        {
          editor: "numeric",
          field: "BusyArea",
          title: "سطح اشغال",
          width: "82px"
        },
        {
          domain: "CI_SaraM1",
          editor: "combo",
          field: "CI_BuildingPosition",
          title: "محل استقرار بنا",
          width: "130px"
        },
        {
          domain: "CI_SaraM1",
          editor: "combo",
          field: "CI_BuildingPattern",
          title: "الگوی ساخت",
          width: "130px"
        },
        {
          cell: "grid-area-format",
          field: "Area",
          title: "مساحت",
          width: "117px"
        },
        {
          field: "Comments",
          title: "توصیحات"
        }
      ]
    },
    basePlanMojaz () {
      return [
        {
          editable: this.isEditable,
          cell: "three-equipment-combo",
          field: "CI_PlanType",
          label: "نوع طرح /کاربری طرح/استفاده مجاز",
          options: {
            combo1Opts: {
              ciName: "CI_PlanType",
              domainName: "CI_SaraM1",
              field: "CI_PlanType",
              paramName: "pCI_PlanType",
              responseKey: "CI_PlanUsingType_FromCI_PlanType",
              serviceUrl: "GetCI_PlanUsingType_FromCI_PlanType"
            },
            combo2Opts: {
              ciName: "CI_PlanUsingType",
              domainName: "CI_SaraM1",
              field: "CI_PlanUsingType",
              paramName: "pCI_PlanUsingType",
              responseKey: "CI_PlanUsingMojaz_FromCI_PlanUsingType",
              serviceUrl: "GetCI_PlanUsingMojaz_FromCI_PlanUsingType"
            },
            combo3Opts: {
              field: "CI_PlanUsingMojaz",
              title: "نوع طرح /کاربری طرح/استفاده مجاز",
              width: "600px"
            }
          },
          title: "نوع طرح /کاربری طرح/استفاده مجاز",
          width: "800px"
        },
        {
          editor: "numeric",
          field: "DensityPercent",
          title: "درصد تراکم",
          width: "80px"
        },
        {
          editor: "numeric",
          field: "BusyArea",
          title: "سطح اشغال",
          width: "82px"
        },
        {
          domain: "CI_SaraM1",
          editor: "combo",
          field: "CI_BuildingPosition",
          title: "محل استقرار بنا",
          width: "130px"
        },
        {
          domain: "CI_SaraM1",
          editor: "combo",
          field: "CI_BuildingPattern",
          title: "الگوی ساخت",
          width: "130px"
        },
        {
          cell: "grid-area-format",
          field: "Area",
          title: "مساحت",
          width: "117px"
        },
        {
          field: "Comments",
          title: "توصیحات"
        }
      ]
    },
    basepatternMelak () {
      return [
        {
          editable: this.isEditable,
          field: "CI_PlanType",
          title: "نوع طرح /کاربری طرح/استفاده مجاز",
          label: "نوع طرح /کاربری طرح/استفاده مجاز",
          cell: "three-equipment-combo",
          width: "800px",
          options: {
            combo1Opts: {
              serviceUrl: "GetCI_PlanUsingType_FromCI_PlanType",
              responseKey: "CI_PlanUsingType_FromCI_PlanType",
              paramName: "pCI_PlanType",
              domainName: "CI_SaraM1",
              ciName: "CI_PlanType",
              field: "CI_PlanType"
            },
            combo2Opts: {
              serviceUrl: "GetCI_PlanUsingMojaz_FromCI_PlanUsingType",
              responseKey: "CI_PlanUsingMojaz_FromCI_PlanUsingType",
              field: "CI_PlanUsingType",
              paramName: "pCI_PlanUsingType",
              domainName: "CI_SaraM1",
              ciName: "CI_PlanUsingType"
            },
            combo3Opts: {
              field: "CI_PlanUsingMojaz"
            }
          }
        },
        {
          field: "DensityPercent",
          title: "درصد تراکم",
          width: 100,
          editor: "numeric"
        },
        {
          field: "BusyArea",
          title: "سطح اشغال",
          width: 114,
          editor: "numeric"
        },
        {
          field: "CI_BuildingPosition",
          title: "محل استقرار بنا",
          domain: "CI_SaraM1",
          editor: "combo",
          width: 144
        },
        {
          field: "CI_BuildingPattern",
          title: "الگوی ساخت",
          domain: "CI_SaraM1",
          editor: "combo",
          width: 114
        },
        {
          field: "SystemBusyArea",
          title: "مساحت",
          width: "auto",
          cell: "grid-area-format"
        }
      ]
    }
  },
  mounted () {
    if (this.selectedRequest) {
      this.load()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  },
  methods: {
    async load () {
      debugger
      this.showLoading()
      const payload = {
        pNidProc: this.selectedRequest.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      try {
        const { data } = await this.$services.SC.loadPlan(payload, {
          config: { District: this.selectedDistrict }
        })
        this.result = this.getResponse(data)
        if (this.result.success) {
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })

          this.results = this.result.data
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    normalizeBasePlanMojaz () {
      return this.results.Base_PlanMojaz.map((m) => {
        return {
          ...m,
          Area: m.Area === "" || m.Area === undefined ? null : m.Area,
          CI_BuildingPattern:
            m.CI_BuildingPattern === "" || m.CI_BuildingPattern === undefined
              ? null
              : m.CI_BuildingPattern
        }
      })
    },
    normalizeBasePlanForWork () {
      return this.results.Base_PlanForWork.map((m) => {
        return {
          ...m,
          Area: m.Area === "" || m.Area === undefined ? null : m.Area,
          CI_BuildingPattern:
            m.CI_BuildingPattern === "" || m.CI_BuildingPattern === undefined
              ? null
              : m.CI_BuildingPattern
        }
      })
    },
    normalizeBasePlanMosavab () {
      return this.results.Base_PlanMosavab.map((m) => {
        return {
          ...m,
          Area: m.Area === "" || m.Area === undefined ? null : m.Area,
          CI_BuildingPattern:
            m.CI_BuildingPattern === "" || m.CI_BuildingPattern === undefined
              ? null
              : m.CI_BuildingPattern
        }
      })
    },
    savePlan () {
      let self = this
      this.results.Base_PlanMojaz = this.normalizeBasePlanMojaz()
      this.results.Base_PlanForWork = this.normalizeBasePlanForWork()
      this.results.Base_PlanMosavab = this.normalizeBasePlanMosavab()
      let data = {
        pPlan: {
          Base_PlanForWork: this.results.Base_PlanForWork,
          Base_PlanMojaz: this.results.Base_PlanMojaz,
          Base_PlanMosavab: this.results.Base_PlanMosavab,
          ErrorResult: { BizErrors: [] },
          NidBase_Parvandeh_HouseOrDastgah:
            this.results.NidBase_Parvandeh_HouseOrDastgah,
          NidLib: this.results.NidLib
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
          WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
        },

        pNidProc: this.selectedRequest.NidProc
      }
      this.showLoading()
      this.$services.SC.savePlan(data, {
        config: { District: this.selectedDistrict }
      })
        .then(async ({ data }) => {
          self.saveResult = this.getResponse(data)
          if (self.saveResult.success) {
            // self.results = self.result.data
            this.isEditable = false

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode
            })

            this.showSuccess("ذخیره طرح با موفقیت انجام شد.")
            this.load()
          }
        })
        .catch((response) => {
          self.saveResult = this.getResponse(response)
          // console.log('error', self.result)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    cancel () {
      this.isEditable = false
      this.load()
    }
  }
}
</script>
