<template>
  <safa-form
   :id="formKey"
   :caption="title"
   appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
   >
    <form-wrapper
     :title="title"
     vertical>
      <div class="row q-mb-sm flex items-center">
        <OfficeActoins
          v-model="identityCode"
          :disable="!identityCode"
          class="col-12"
        />
      </div>
      <safa-datatable
        :columns="OfficePerformance"
        :m="mode"
        fit
        height="100%"
        max-height="100%"
        paginate
        @select-row="selectedRow"
        :allowMultipleSelection="false"
        v-model="GetOfficesResult.AllOffices"
        :take="20"
        :deleteRow="false"
        :addRow="false"
      />
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],

  components: {},

  data () {
    return {
      title: "عملکرد دفتر",
      formKey: "9feb1921-aac5-4359-8e97-947548a9c3b4",
      name: "UOfficePerformance",
      main: true,
      identityCode: null,
      sidebarCompatible: true,
      OfficePerformance: [
        {
          field: "OfficeCode",
          title: "کد دفتر",
          width: 100
        },
        {
          field: "OfficeName",
          title: "نام دفتر",
          width: 100
        },
        {
          field: "CI_OfficeType",
          title: "نوع دفتر",
          width: 200,
          editor: "combo",
          domain: "engineer"
        },
        {
          field: "RegisterDate",
          title: "تاریخ ثبت",
          width: 100,
          editor: "date"
        },
        {
          field: "ExpireDate",
          title: "تاریخ انقضاء دفتر",
          width: 100,
          editor: "date"
        },
        {
          field: "Tel",
          title: "شماره تلفن",
          width: 100
        },
        {
          field: "Email",
          title: "پست الکترونیکی",
          width: 100
        }
      ],
      GetOfficesResult: {
        AllOffices: []
      },
      model: {
        CI_RequestType: 0,
        CI_Years: 0,
        NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
        NidEng: "00000000-0000-0000-0000-000000000000",
        NidFil: "00000000-0000-0000-0000-000000000000",
        NidWorkitem: 0,
        CI_CancelType: 0,
        CI_ExecFloor: 0,
        CI_SazeType: 0,
        CI_Year: 0,
        Floor: 0,
        Height: 0,
        Infrastructure: 0,
        IsConfirm: false,
        IsRefreshOnly: false,
        IsSendToSaraRequest: false,
        NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
        NIdDetail: "00000000-0000-0000-0000-000000000000",
        NIdRealPerson: "00000000-0000-0000-0000-000000000000",
        NidBlackList: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidRefer: "00000000-0000-0000-0000-000000000000",
        NidTask: "00000000-0000-0000-0000-000000000000",
        NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
        OtherFileType: 0,
        PredicateCondition: "",
        Sara_WorkflowID: 0,
        SecretariatNo: 0,
        Skip: 0,
        StudyFiled: 0,
        SysCI_RequestStatus: 0,
        Take: 100,
        UserGUID: "00000000-0000-0000-0000-000000000000"
      }
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    async loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: this.model
      }
      await this.$services.engineers
        .getOffices(payLoad)
        .then(({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.GetOfficesResult = response.data.GetOfficesResult
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedRow (val) {
      this.identityCode = val[0].IdentityCode
    }
  }
}
</script>
