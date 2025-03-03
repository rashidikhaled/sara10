<template>
  <safa-form :id="formKey" :caption="title" appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE">
    <form-wrapper :title="title" vertical :padding="false">
      <template #header>
        <safa-status :result="capacityKartablResult" />
        <safa-status :result="saveQtaCapacityKartablResult" />
        <safa-status :result="deleteQtaInfoRes" />
        <div class="q-gutter-x-sm flex" v-if="capacityKartablResult">
          <strong>مهندس:</strong>
          <p class="q-mb-none">
            {{ currentEngName }}
            {{ currentEngFamily }}
          </p>
          <strong>سهمیه 20 درصد </strong>
          <strong>سهمیه باقیمانده 20 درصد</strong>
        </div>
      </template>
      <safa-tabs v-model="currentTab" type="fixed" fit :bordered="false">
        <template v-slot:tabs>
          <tab-menu name="kartabl_tab" label="کارتابل" />
          <tab-menu
            v-if="showEditInfoTab"
            name="editInfo_tab"
            label="ویرایش اطلاعات"
          />
        </template>
        <tab-content name="kartabl_tab">
          <fit>
            <form-row>
              <EngineerInfoBox
                v-model="identityCode"
                labelWidth="60px"
                class="col-md-4"
                @fetched="fetched"
              />
              <safa-combo
                v-model="selectedYear"
                label="سال"
                label-width="30px"
                class="col-md-2"
                ciName="CI_Years"
                domainName="engineer"
                cdcName="selectedYear"
                @input="loadData"
                :sortFunc="sortCombo"
              />
              <engineer-actions
                v-if="!hideEngineerActions"
                class="col"
                v-model="identityCode"
                :disable="!capacityKartablResult"
              />
              <!-- capacityKartabl -->
            </form-row>
            <!-- helper="capacityKartabl" -->
            <safa-grid
              v-model="getCapacityKartablResult.CapacityKartabl"
              cdcName="CapacityKartabl"
              :columns="capacityKartablColumns"
              m="r"
              fit
              height="100%"
              max-height="100%"
              min-height="200px"
              @row:click="selectedRow"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="true"
              :allowCopy="false"
              paginate
            />
          </fit>
        </tab-content>
        <tab-content name="editInfo_tab">
          <fit>
            <CapacityKartablEditInfo v-model="editInfoValue" :m="mode" />
          </fit>
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          class="col-12"
          :showEditButton="true"
          :showNewButton="true"
          @save="saveData"
          @edit="editInfo"
          @newInfo="newInfo"
          @cancel="cancel"
        >
          <template v-slot:after v-if="currentTab === 'kartabl_tab'">
            <btn-default label="چاپ" />
            <btn-default
              label="بازآوری سهمیه اول دوره"
              @click="getQtaFirstSession"
            />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import CapacityKartablEditInfo from "./partials/CapacityKartablEditInfo.vue"

const initialValue = {
  initialNewInfo: {
    CI_Ability: 0,
    CI_Base: 0,
    CI_City: 0,
    CI_StudyField: 0,
    CI_Years: 0,
    ConfirmDate: "",
    CreditValue: 0,
    LetterNo: null,
    NidEng: "00000000-0000-0000-0000-000000000000",
    NidQta: "00000000-0000-0000-0000-000000000000",
    NidRef: "00000000-0000-0000-0000-000000000000",
    QtaComments: ""
  },
  initialEditInfo: {
    CI_Ability: 0,
    CI_Base: 0,
    CI_City: 0,
    CI_StudyField: 0,
    CI_Years: 0,
    ConfirmDate: "",
    CreditValue: 0,
    LetterNo: null,
    NidEng: "00000000-0000-0000-0000-000000000000",
    NidQta: "00000000-0000-0000-0000-000000000000",
    NidRef: "00000000-0000-0000-0000-000000000000",
    QtaComments: "",
    MaxAllowWork: 0,
    FloorOfAbility: 0,
    MeterOfAbility: 0,
    NIdQta_tmp: 0
  }
}

export default {
  components: {
    CapacityKartablEditInfo
  },
  mixins: [baseFormMixin],
  props: {
    value: [Number, String],
    hideEngineerActions: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      title: "کارتابل ظرفیت",
      formKey: "c2abd9b0-9bfc-4d06-b785-69e1f1f621f4",
      name: "CapacityKartabl",
      main: true,

      selectedYear: 1403,
      currentTab: "kartabl_tab",
      sidebarCompatible: true,
      requestResult: null,
      deleteQtaInfoRes: null,
      capacityKartablResult: null,
      saveQtaCapacityKartablResult: null,
      selectRow: false,
      showEngineerInfo: false,
      showActions: true,
      showEditInfoTab: false,
      identityCode: null,

      capacityKartablColumns: [
        {
          field: "delete",
          editor: "action",
          width: "80px",
          pinned: "right",
          cellStyle: {
            padding: 0,
            margin: 0,
            color: "red"
          },
          btnTitle: "حذف",
          btnIcon: "delete",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.handelDeleteCapacity(params)
        },
        {
          field: "CI_Ability",
          title: "صلاحیت",
          editor: "combo",
          domain: "engineer",
          width: "120px"
        },
        {
          field: "CI_Base",
          title: "پایه",
          editor: "combo",
          domain: "engineer",
          width: "120px"
        },
        {
          field: "CI_StudyField",
          title: "فعالیت",
          editor: "combo",
          domain: "engineer",
          width: "120px"
        },
        { field: "QuotaType", title: "نوع سهمیه", width: "150px" },
        {
          field: "IsExecuterQta",
          title: "کسر سهمیه مجری",
          editor: "checkbox",
          width: "170px"
        },
        {
          field: "RequestType",
          title: "نوع درخواست",
          editor: "combo",
          domain: "engineer",
          width: "120px"
        },
        { field: "Years", title: "سال کاری", width: "120px" },
        {
          field: "CI_City",
          title: "شهر",
          editor: "combo",
          domain: "engineer",
          width: "120px"
        },
        {
          field: "CreditValue",
          title: "مقدار سهمیه",
          editor: "numeric",
          width: "150px",
          aggregate: "sum"
        },
        {
          field: "ConfirmDate",
          title: "تاریخ تایید",
          editor: "date",
          width: "150px"
        },
        { field: "LetterNo", title: "شمارنامه", width: "150px" },
        { field: "OwnerName", title: "مالک", width: "150px" },
        { field: "Address", title: "آدرس", width: "120px" },
        { field: "MotherCode", title: "پروانه پدر", width: "160px" },
        { field: "StrNoTownDabir", title: "شماره دبیرخانه", width: "160px" },
        { field: "NidWorkItem", title: "کد ارجاع", width: "160px" },
        {
          field: "MaxAllowWork",
          title: "تعداد کار",
          editor: "numeric",
          width: "150px",
          aggregate: "sum"
        },
        { field: "Infrastructure", title: "زیربنا", width: "150px" },
        { field: "SaghfMojaz", title: "تعداد سقف", width: "160px" },
        {
          field: "DateOfRefrence",
          title: "تاریخ خروج ازسهمیه",
          width: "220px",
          editor: "date"
        },
        { field: "MeterOfAbility", title: "متراژ صلاحیت", width: "150px" },
        { field: "FloorOfAbility", title: "تعداد طبقه", width: "150px" },
        { field: "QtaComments", title: "توضیحات سهمیه", width: "200px" }
      ],
      getCapacityKartablResult: {
        CapacityKartabl: [],
        Eng_Info: {
          EngName: "",
          EngFamily: ""
        }
      },
      editInfoValue: { ...initialValue.initialEditInfo },
      isNewInfo: false,
      engineerPopupInfo: {},
      engineerImg: "",
      engineerMohr: "",
      engineerSigniture: ""
    }
  },
  mounted () {
    if (this.value) {
      this.identityCode = this.value
      this.loadData()
    }
  },
  methods: {
    fetched (val) {
      this.identityCode = val.IdentityCode
      // this.getCapacityKartablResult.CI_Years = 1400;
      this.loadData()
    },
    loadData () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          EngineerCode: this.identityCode,
          CI_Years: this.selectedYear
        }
      }
      this.$services.engineers
        .getCapacityKartabl(payLoad)
        .then(async (response) => {
          this.capacityKartablResult = this.getResponse(response.data)
          if (this.capacityKartablResult.success) {
            this.getCapacityKartablResult = this.capacityKartablResult.data.GetCapacityKartablResult
            await this.log({
              action: this.logActions.view,
              bizCode: this.identityCode,
              bizCodeTitle: "کد عضویت"
            })
          }
        })
        .catch(error => {
          console.error("load error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    handelDeleteCapacity (params) {
      this.showConfirm("آیا از حذف ردیف اطمینان دارید؟").onOk(() => {
        try {
          this.showLoading()
          const payload = { NidQta: params.NidQta }
          this.$services.engineers
            .deleteQtaInfo(payload)
            .then(async ({ data }) => {
              this.deleteQtaInfoRes = this.getResponse(data)
              if (this.deleteQtaInfoRes.success) {
                this.showSuccess("عملیات با موفقیت انجام شد.")
                await this.log({
                  action: this.logActions.delete,
                  bizCode: params.NidQta,
                  bizCodeTitle: "NidQta"
                })
                this.loadData()
              }
            })
        } catch (e) {
          console.error(e)
        } finally {
          this.hideLoading()
        }
      })
    },
    getQtaFirstSession () {
      this.showLoading()
      this.$services.engineers
        .doEngQtaFirstSession({
          pNidEng: this.getCapacityKartablResult.Eng_Info.NIdEng
        })
        .then(response => {
          this.requestResult = this.getResponse(response.data)
          if (this.requestResult.success) {
            this.showSuccess("بازآوری سهمیه اول دوره با موفقیت انجام شد.")
            this.loadData()
          }
        })
        .catch(error => {
          console.error("delete error", error)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async saveData () {
      if (!this.isValidForm()) return
      try {
        this.editInfoValue.engCode = this.identityCode
        // this.editInfoValue.CI_Years = this.selectedYear
        if (this.isNewInfo) {
          this.editInfoValue.NIdQta = "00000000-0000-0000-0000-000000000000"
          this.editInfoValue.NIdEng = this.getCapacityKartablResult.Eng_Info.NIdEng
        }
        this.showLoading()
        const payload = {
          Qtainfo: this.editInfoValue,
          CI_Ability: this.editInfoValue.CI_Ability,
          UserInfo: {
            UserName: this.getUserDisplayName(),
            UserGuid: this.getNidUser()
          }
        }
        const { data } = await this.$services.engineers
          .saveQtaCapacityKartabl(payload)
        this.saveQtaCapacityKartablResult = this.getResponse(data)
        if (this.saveQtaCapacityKartablResult.success) {
          this.cancel()
          this.loadData()
          this.showSuccess("عملیات با موفقیت انجام گردید")
          await this.log({
            action: this.logActions.save,
            bizCode: this.editInfoValue.NidEng,
            bizCodeTitle: "NidEng"
          })
          this.isNewInfo = false
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    editInfo () {
      if (this.selectRow) {
        this.showEditInfoTabHandler()
      } else {
        return this.showError("لطفا ردیف مورد نظر را انتخاب نمایید.")
      }
    },
    selectedRow (params) {
      this.editInfoValue = params.data
      if (params.data) {
        this.editInfoValue.NIdQta = params.data.NidQta
        this.editInfoValue.NIdEng = params.data.NidEng
      }
      this.selectRow = true
    },
    showEditInfoTabHandler () {
      this.currentTab = "editInfo_tab"
      this.isEditable = true
      this.showEditInfoTab = true
      this.showNewButton = false
    },
    newInfo () {
      this.selectRow = true
      if (this.identityCode === null) { return this.showError("لطفا کدعضویت وارد نمایید.") }
      this.showEditInfoTabHandler()
      this.isNewInfo = true
    },
    cancel () {
      this.resetValidation()
      this.showEditInfoTab = false
      this.currentTab = "kartabl_tab"
      this.isEditable = false
      this.showNewButton = true
      this.editInfoValue = initialValue.initialNewInfo
      this.selectRow = false
    },
    sortCombo (a, b) {
      return b.ID - a.ID
    }
  },
  computed: {
    disableActionButtons () {
      if (this.getCapacityKartablResult.Eng_Info.IdentityCode) return false
      return true
    },
    currentEngName () {
      return (
        (this.getCapacityKartablResult.Eng_Info &&
          this.getCapacityKartablResult.Eng_Info.EngName) ||
        ""
      )
    },
    currentEngFamily () {
      return (
        (this.getCapacityKartablResult.Eng_Info &&
          this.getCapacityKartablResult.Eng_Info.EngFamily) ||
        ""
      )
    }
  },
  watch: {
    "editInfoValue.FloorOfAbility": {
      handler () {
        if (this.editInfoValue.FloorOfAbility === "") { this.editInfoValue.FloorOfAbility = 0 }
      },
      deep: true
    },
    "editInfoValue.MeterOfAbility": {
      handler () {
        if (this.editInfoValue.MeterOfAbility === "") { this.editInfoValue.MeterOfAbility = 0 }
      },
      deep: true
    },
    "editInfoValue.MaxAllowWork": {
      handler () {
        if (this.editInfoValue.MaxAllowWork === "") { this.editInfoValue.MaxAllowWork = 0 }
      },
      deep: true
    }
  }
}
</script>
