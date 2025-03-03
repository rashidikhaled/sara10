<template>
  <safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="getCapacityKartablResult" />
        <safa-status :result="resLoadObj" />
        <safa-status :result="resSaveObj" />
        <div class="q-gutter-x-sm flex" v-if="showHeaderDetail">
          <strong>مهندس:</strong>
          <p class="q-mb-none">
            {{ getCapacityKartablResult.Eng_Info.EngName }}
            {{ getCapacityKartablResult.Eng_Info.EngFamily }}
          </p>
          <strong>سهمیه 20 درصد </strong>
          <strong>سهمیه باقیمانده 20 درصد</strong>
        </div>
      </template>
      <form-row>
        <engineer-info-box
          label="کد عضویت"
          label-width="60px"
          class="col-md-4 col-12"
          v-model="identityCode"
          @fetched="loadObj"
          cdcName="identityCode"
        />
        <engineer-actions
          v-model="getCapacityKartablResult.Eng_Info.IdentityCode"
          :disable="!getCapacityKartablResult.Eng_Info.IdentityCode"
          class="col-md-8 col-12"
        />
      </form-row>
      <safa-tabs
        v-model="currentTab"
        type="fixed"
        fit
        :bordered="false"
        :padding="false"
      >
        <template v-slot:tabs>
          <tab-menu name="kartabl_tab" label="کارتابل" />
          <tab-menu
            v-if="showEditInfoTab"
            name="editInfo_tab"
            label="ویرایش اطلاعات"
          />
        </template>
        <tab-content name="kartabl_tab">
          <!--   helper="firstQuotaCapacityKartabl" -->
          <safa-datatable
            :columns="columns"
            v-model="getCapacityKartablResult.CapacityKartabl"
            title="کارتابل"
            m="r"
            fit
            height="100%"
            max-height="100%"
            min-height="200px"
            @row-click="selectedRow"
            :show-selected-checkbox="true"
            :allowMultipleSelection="false"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            paginate
            id="CapacityKartabl"
            cdcName="CapacityKartabl"
          />
        </tab-content>
        <tab-content name="editInfo_tab">
          <first-quota-edit-info v-model="editInfoValue" :m="mode" />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12"
          :showEditButton="true"
          :showNewButton="true"
          @save="saveObj"
          @edit="editInfo"
          @newInfo="newInfo"
          @cancel="cancel"
        >
          <btn-default label="چاپ" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import FirstQuotaEditInfo from "./partials/FirstQuotaEditInfo.vue"
import { controlValidation } from "ui-core"

const initialValue = {
  defaultValue: {
    CI_Ability: 0,
    CI_Base: 0,
    CI_City: 0,
    CI_StudyField: 0,
    CI_Years: 1400,
    ConfirmDate: "",
    CreditValue: 0,
    LetterNo: 0,
    NidEng: "00000000-0000-0000-0000-000000000000",
    NidQta: "00000000-0000-0000-0000-000000000000",
    NidRef: "00000000-0000-0000-0000-000000000000",
    QtaComments: ""
  }
}

export default {
  mixins: [baseFormMixin, controlValidation],
  components: { FirstQuotaEditInfo },
  props: {
    value: [Number, String]
  },
  data () {
    return {
      title: "سهمیه اول دوره",
      formKey: "a99e7644-d071-4b63-8cdb-b9ff9a204416",
      name: "UFirstQuota",
      main: true,
      currentTab: "kartabl_tab",
      sidebarCompatible: true,
      resLoadObj: null,
      resSaveObj: null,
      selectRow: false,
      showEditInfoTab: false,
      showHeaderDetail: false,
      identityCode: null,
      getCapacityKartablResult: {
        CapacityKartabl: [],
        Eng_Info: {
          EngName: "",
          EngFamily: ""
        }
      },
      editInfoValue: { ...initialValue.defaultValue },
      isNewInfo: false,
      engineerPopupInfo: {},
      engineerImg: "",
      engineerMohr: "",
      engineerSigniture: "",
      columns: [
        // {
        //   field: "CI_Ability",
        //   title: "صلاحیت",
        //   editor: "combo",
        //   domain: "engineer"
        // },
        // {
        //   field: "CI_Base",
        //   title: "پایه",
        //   editor: "combo",
        //   domain: "engineer"
        // },
        {
          field: "StudyField",
          title: "فعالیت"
        },
        {
          field: "QuotaType",
          title: "نوع سهمیه"
        },
        {
          field: "RequestType",
          title: "نوع درخواست"
        },
        {
          field: "Years",
          title: "سال کاری"
        },
        // {
        //   field: "CI_City",
        //   title: "شهر",
        //   editor: "combo",
        //   domain: "engineer"
        // },
        {
          field: "CreditValue",
          title: "مقدار سهمیه",
          editor: "numeric",
          calculateFunc: "sum"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید",
          editor: "date"
        },
        {
          field: "QtaComments",
          title: "توضیحات سهمیه"
        },
        {
          field: "LetterNo",
          title: "شمارنامه"
        },
        {
          field: "OwnerName",
          title: "مالک"
        },
        {
          field: "Address",
          title: "آدرس"
        },
        {
          field: "MotherCode",
          title: "پروانه پدر"
        },
        {
          field: "StrNoTownDabir",
          title: "شماره دبیرخانه"
        },
        {
          field: "NidWorkItem",
          title: "کد ارجاع"
        },

        {
          field: "MaxAllowWork",
          title: "تعداد کار"
        },
        {
          field: "Infrastructure",
          title: "زیربنا"
        },
        {
          field: "SaghfMojaz",
          title: "تعداد سقف"
        },
        {
          field: "DateOfRefrence",
          title: "تاریخ خروج ازسهمیه",
          editor: "date"
        }
      ]
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadObj()
    }
  },
  methods: {
    async loadObj () {
      let payLoad = {
        pRequest: {
          EngineerCode: this.identityCode
        }
      }
      await this.$services.engineers
        .getCapacityKartabl(payLoad)
        .then(async (response) => {
          this.resLoadObj = this.getResponse(response.data)
          if (this.resLoadObj.success) {
            this.getCapacityKartablResult =
              this.resLoadObj.data.GetCapacityKartablResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch((error) => {
          console.error("getCapacityKartabl error", error)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      if (!this.isValidForm()) return
      this.editInfoValue.engCode = this.identityCode
      this.showLoading()
      if (this.isNewInfo) {
        this.editInfoValue.NIdQta = "00000000-0000-0000-0000-000000000000"
        this.editInfoValue.NIdEng =
          this.getCapacityKartablResult.Eng_Info.NIdEng
      } else {
        this.editInfoValue.NIdQta = this.editInfoValue.NidQta
        this.editInfoValue.NIdEng = this.editInfoValue.NidEng
      }
      let payLoad = {
        Qtainfo: this.editInfoValue,
        CI_Ability: this.editInfoValue.CI_Ability,
        UserInfo: {
          UserName: this.getUserDisplayName(),
          UserGuid: this.getNidUser(),
          JobLocationGuid: "00000000-0000-0000-0000-000000000000",
          JobLocationName: "",
          UserGroups: ""
        }
      }
      this.$services.engineers
        .saveQtaCapacityKartabl(payLoad)
        .then(async (response) => {
          this.resSaveObj = this.getResponse(response.data)
          if (this.resSaveObj.success) {
            this.cancel()
            this.loadObj()
            this.showSuccess("عملیات با موفقیت انجام گردید")
            await this.log({
              action: this.logActions.view,
              bizCode: this.editInfoValue.NidEng,
              bizCodeTitle: "NidEng"
            })
            this.isNewInfo = false
          }
        })
        .catch((error) => {
          console.error("load error", error)
          // this.serverError();
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    editInfo () {
      if (this.selectRow) {
        this.showEditInfoTabHandler()
      } else {
        return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید.")
      }
    },
    selectedRow (dataItem) {
      if (dataItem) {
        this.editInfoValue = dataItem
        this.selectRow = true
      }
    },
    showEditInfoTabHandler () {
      this.showEditInfoTab = true
      this.currentTab = "editInfo_tab"
      this.isEditable = true
      this.showNewButton = false
    },
    newInfo () {
      this.selectRow = true
      if (this.identityCode === null) {
        return this.showError("لطفا کدعضویت وارد نمایید.")
      }
      this.editInfoValue = initialValue.defaultValue
      this.showEditInfoTabHandler()
      this.isNewInfo = true
    },
    cancel () {
      this.showEditInfoTab = false
      this.currentTab = "kartabl_tab"
      this.isEditable = false
      this.showNewButton = true
      this.editInfoValue = initialValue.defaultValue
    }
  },
  beforeDestroy () {
    this.showEngInfo = false
    this.showEngOrganInfo = false
    this.showCapacityKartabl = false
    this.showBlackList = false
  }
}
</script>
