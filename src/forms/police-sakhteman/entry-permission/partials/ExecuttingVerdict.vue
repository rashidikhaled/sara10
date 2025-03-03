<template>
  <fit>
    <safa-splitter v-model="splitterValue" horizontal>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="اجرای حکم"
            v-model="ExecuttingVerdictList"
            helper="ExecuttingVerdict"
            cdcName="ExecuttingVerdictList"
            height="100%"
            min-height="100%"
            max-height="100%"
            fit
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-tabs v-model="activeTab">
            <template v-slot:tabs>
              <tab-menu name="executtingVerdict" label="اجرای حکم" />
              <tab-menu name="prophecy" label="ابلاغ" />
            </template>
            <tab-content name="executtingVerdict">
              <fit>
                <FormRow class="q-mb-sm">
                  <FormControl>
                    <safa-datepicker
                      label="تاریخ صورت جلسه"
                      v-model="model.minutesDate"
                      :m="mode"
                      cdcName="minutesDate"
                    />
                  </FormControl>
                  <FormControl>
                    <safa-text
                      label="ساعت صورت جلسه"
                      v-model="model.minutesTime"
                      cdcName="minutesTime"
                      :m="mode"
                    />
                  </FormControl>
                </FormRow>
                <fit>
                <safa-grid
                  title="جزییات اجرای حکم"
                  v-model="minutesList"
                  helper="minutesColumn"
                  height="100%"
                  min-height="100%"
                  max-height="100%"
                  fit
                  :m="mode"
                  cdcName="minutesList"
                />
                </fit>
              </fit>
            </tab-content>
            <tab-content name="prophecy">
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-text
                    label="عنوان ماده ابلاغ"
                    v-model="model.titleOfArticleProphecy"
                    cdcName="titleOfArticleProphecy"
                    label-width="80px"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="نام و نام خانوادگی تحویل گیرنده"
                    v-model="model.nameOfReceiver"
                    cdcName="nameOfReceiver"
                    label-width="110px"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="سمت"
                    v-model="model.post"
                    cdcName="post"
                    label-width="70px"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    label="مامور ابلاغ"
                    v-model="model.prophecyAgent"
                    cdcName="prophecyAgent"
                    label-width="70px"
                  />
                </FormControl>
              </FormRow>
            </tab-content>
          </safa-tabs>
          <form-actions
            :showEditButton="false"
            :m="mode"
            :showNewButton="true"
            @save="saveObj"
            @newInfo="newObj"
            @cancel="cancel"
          />
        </fit>
      </template>
    </safa-splitter>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  // props: [""],
  props: {
    formKey: String,
    title: String,
    name: String,
    loadHandler: String
  },
  data () {
    return {
      main: true,
      splitterValue: 50,
      activeTab: "executtingVerdict",

      ExecuttingVerdictList: [],
      // ExecuttingVerdictColumn: [
      //   { field: "OperationNo", title: "شماره صورت جلسه اجرا" },
      //   { field: "OperationDate", title: "تاریخ صورت جلسه" },
      //   { field: "OperationTime", title: "ساعت" }
      // ],
      minutesList: [],
      // minutesColumn: [
      //   {
      //     field: "CI_WarrantOrderResult",
      //     editor: "comboّ",
      //     domain: "BuildingPolice",
      //     title: "عنوان عملیات/جزییات",
      //     width: "150px"
      //   },
      //   {
      //     field: "CI_WarrantOrderResultSub",
      //     editor: "combo",
      //     domain: "BuildingPolice",
      //     title: "عنوان عملیات/جزییات",
      //     width: "150px"
      //   },
      //   // {
      //   //   field: "CI_WarrantOrderResult",
      //   //   title: "عنوان عملیات/جزییات",
      //   //   label: "عنوان عملیات/جزییات",
      //   //   cell: "WarrantOrderTemplate",
      //   //   width: "360px",
      //   //   options: {
      //   //     serviceUrl: "GetCI_UsingType_FromCI_UsingGroup",
      //   //     responseKey: "CI_UsingType_FromCI_UsingGroup",
      //   //     paramName: "pCI_UsingGroup",
      //   //     from: {
      //   //       domainName: "BuildingPolice",
      //   //       ciName: "CI_WarrantOrderResult",
      //   //       field: "CI_WarrantOrderResult",
      //   //     },
      //   //     to: {
      //   //       field: "CI_WarrantOrderResultSub",
      //   //     },
      //   //   },
      //   // },
      //   { field: "Comment", title: "توضیحات", width: "150px" },
      //   { field: "Date", title: "تاریخ", editable: false },
      //   { field: "", title: "ساعت", editable: false }
      // ],
      model: {
        titleOfArticleProphecy: "",
        nameOfReceiver: "",
        post: "",
        prophecyAgent: "",
        minutesDate: "",
        minutesTime: ""
      },
      loadResult: [],
      saveResult: {},
      getResult: {}
    }
  },

  watch: {
    loadHandler () {
      this.loadObj()
    }
  },
  methods: {
    loadObj () {
      const payload = {
        pNidProc: "00000000-0000-0000-0000-000000000000",
        pNidOper: "00000000-0000-0000-0000-000000000000",
        EumSealedOperationType: 7
      }
      this.$services.SH.getOperationList(payload).then(({ data }) => {
        this.loadResult = this.getResponse(data)
        if (this.loadResult.success) {
          this.minutesList = this.loadResult.data
        }
      })
    },
    newObj () {
      this.isEditable = true
    },
    cancel () {
      this.isEditable = false
    },
    saveObj () {
      this.showLoading()
      const payload = {
        pClsWarrant: {
          ClsProphecy: {
            NidProphecy: "00000000-0000-0000-0000-000000000000",
            Prophecy: {
              CI_Article: 1,
              NidProphecy: "00000000-0000-0000-0000-000000000000",
              NotificationOfficer: this.model.prophecyAgent,
              Post: this.model.post,
              RecipientName: this.model.nameOfReceiver
            }
          },
          SealedOperation: {
            Comments: "",
            DeviceCode: "",
            EnterDate: "",
            EnterTime: "",
            EumSealedOperationType: 7,
            IsRevoke: "",
            MapWKT: "",
            NidOper: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000",
            NidUser: this.currentUser.NidUser,
            NosaziCode: "",
            OperationDate: this.model.minutesDate,
            OperationNo: "",
            OperationTime: this.model.minutesTime,
            UserName: this.getUserDisplayName()
          },
          SortByValidityDate: false,
          WarningListWarrant: "",
          WarrantList: "",
          WarrantOrderList: "",
          WarrantOrderResultList: []
        }
      }
      const payloadGet = {}
      this.$services.SH.saveWarrantOrderResultList(payload)
        .then(async ({ data }) => {
          this.saveResult = this.getResponse(data)
          if (this.saveResult.success) {
            // await this.log({
            //   action: this.logActions.view,
            //   bizCode: this.selectedRequest.BizCode ?? "",
            //   bizCodeTitle: "کدنوسازی",
            //   nosaziCode: this.selectedRequest.BizCode ?? "",
            //   nidWorkItem: this.selectedRequest.NidWorkItem ?? "",
            //   saveDesc: `ذخیره حکم ورود قضایی برای شماره ${this.selectedRequest.BizCode} انجام گردید.`,
            // });
            this.$services.SH.getOperationList(payloadGet)
              .then(async ({ data }) => {
                this.getResult = this.getResponse(data)
                if (this.getResult.success) {
                }
              })
              .catch((e) => {
                console.error(e)
                this.serverError()
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
    }
  }
}
</script>
