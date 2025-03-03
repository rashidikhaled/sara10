<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-status :result="loadObjRes" />
      <safa-status :result="saveObjRes" />
      <safa-status :result="getCIRes" />
      <fit>
        <form-row class="q-mb-sm" v-if="isEditable">
          <FormControl>
            <safa-combo
              :options="EumManagerConfirmLicenceAmlak"
              source-type="local"
              label="نوع مجوز"
              label-width="90px"
              v-model="eumManagerConfirmLicenceAmlakVModel"
              :m="mode"
              cdcName="eumManagerConfirmLicenceAmlakVModel"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              ciName="CI_ResourceManagerConfirm"
              domainName="Estate"
              label="منبع تایید"
              label-width="90px"
              v-model="CI_ResourceManagerConfirm"
              :m="mode"
              cdcName="CI_ResourceManagerConfirm"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              :options="ciResourceManagerConfirmDetailOptions"
              source-type="local"
              label="جزییات منبع تایید"
              label-width="90px"
              v-model="CI_ResourceManagerConfirmDetails"
              :m="mode"
              cdcName="CI_ResourceManagerConfirmDetails"
            />
          </FormControl>
          <safa-text
            label="توضیحات"
            label-width="90px"
            v-model="Comments"
            cdcName="Comments"
            class="col-12"
            :rows="1"
            type="Comments"
          />
        </form-row>
        <!-- helper="Sh_ManagerConfirm_ListColumns" -->
        <safa-grid
          title="اطلاعات کاربران"
          min-height="100px"
          height="100%"
          max-height="100%"
          v-model="Sh_ManagerConfirm_List"
          cdcName="Sh_ManagerConfirm_List"
          :columns="userInfoColumns"
          :suppressRowClickSelection="false"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          m="r"
          fit
        />
      </fit>
      <template v-slot:footer>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="preSaveObj"
        >
        </FormActions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { currentDate, currentTime, getEnumComboList } from "src/utils/index"
import { EumManagerConfirmLicenceAmlak } from "../../config/enums.js"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "تایید مدیران",
      formKey: "9B185030-0C56-4368-9F69-C41512147385",
      name: "UManagementConfirm",
      main: true,

      // variables
      CI_ResourceManagerConfirm: null,
      eumManagerConfirmLicenceAmlakVModel: null,
      CI_ResourceManagerConfirmDetails: null,
      ciResourceManagerConfirmDetailOptions: [],
      Comments: "",

      // grid
      Sh_ManagerConfirm_List: [],

      loadObjRes: null,
      saveObjRes: null,
      getCIRes: null
    }
  },
  created () {
    if (!this.selectedRequest) {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمائید")
      this.$nextTick(() => {
        this.hideSidebar(this.name)
      })
    } else {
      this.loadObj()
    }
  },

  methods: {
    loadObj () {
      this.showLoading()
      this.$services.ES.loadManagerConfirm({
        pNidProc: this.selectedRequest.NidProc
      })
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            this.Sh_ManagerConfirm_List =
              this.loadObjRes.data.LoadManagerConfirmResult.Sh_ManagerConfirm_List
            await this.log({
              action: this.logActions.view,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: ` تایید مدیران ${this.selectedRequest.NidProc}`
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getCI () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.ES.getCiResourceManagerConfirmDetailsFromCiResourceManagerConfirm(
            { pCI_ResourceManagerConfirm: this.CI_ResourceManagerConfirm }
          )
        this.getCIRes = this.getResponse(data)
        if (this.getCIRes.success) {
          this.ciResourceManagerConfirmDetailOptions =
            [
              ...this.getCIRes.data?.GetCI_ResourceManagerConfirmDetails_FromCI_ResourceManagerConfirmResult.CI_ResourceManagerConfirmDetails_FromCI_ResourceManagerConfirm?.map(
                ({ ID, Title }) => {
                  return { ID, Title }
                }
              )
            ] ?? []

          this.resourceManageConfirmDetails =
            this.ciResourceManagerConfirmDetailOptions[0]?.ID ?? null
        }
      } catch (e) {
        console.error()
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    preSaveObj () {
      this.showConfirm("آیا از ذخیره اطلاعات اطمینان دارید؟").onOk(() => {
        this.saveObj()
      })
    },
    saveObj () {
      this.showLoading()
      const payLoad = {
        pManagerConfirm: {
          CI_ResourceManagerConfirmDetails_FromCI_ResourceManagerConfirm: this.ciResourceManagerConfirmDetailOptions,
          NidProc: this.selectedRequest.NidProc,
          Sh_ManagerConfirm: {
            CI_ResourceManagerConfirm: this.CI_ResourceManagerConfirm,
            CI_ResourceManagerConfirmDetails:
              this.CI_ResourceManagerConfirmDetails,
            Comments: this.Comments,
            ConfirmationDate: currentDate(),
            ConfirmationTime: currentTime(),
            EumManagerConfirmLicence: this.eumManagerConfirmLicenceAmlakVModel,
            NidManagerConfirm: "00000000-0000-0000-0000-000000000000",
            NidProc: this.selectedRequest.NidProc,
            NidUser: this.getNidUser(),
            UserName: this.getUserDisplayName()
          },
          Sh_ManagerConfirm_List: this.Sh_ManagerConfirm_List,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          }
        }
      }
      debugger
      this.$services.ES.saveManagerConfirm(payLoad)
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.showSuccess("ذخیره با موفقیت انجام شد")
            this.loadObj()
            this.isEditable = false

            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "NidWorkItem",
              saveDesc: `ذخیره تایید مدیران ${this.selectedRequest.NidWorkItem}`
            })
          }
        })
        .catch((e) => {
          this.showError(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    EumManagerConfirmLicenceAmlak () {
      return getEnumComboList(EumManagerConfirmLicenceAmlak)
    },
    userInfoColumns () {
      return [
        {
          field: "EumManagerConfirmLicence",
          title: "نوع مجوز تایید مدیران",
          width: "160px",
          editor: "combo",
          source: this.EumManagerConfirmLicenceAmlak
        },
        {
          field: "UserName",
          title: "کاربر",
          width: "100px"
        },
        {
          field: "ConfirmationDate",
          title: "تاريخ",
          editor: "date",
          width: "100px"
        },
        {
          field: "ConfirmationTime",
          title: "ساعت",
          width: "100px"
        },
        {
          field: "CI_ResourceManagerConfirm",
          title: "منبع تایید",
          width: "100px",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "CI_ResourceManagerConfirmDetails",
          title: "جزییات منبع تایید",
          width: "150px",
          editor: "combo",
          domain: "Estate"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "100px"
        }
      ]
    }
  },
  watch: {
    CI_ResourceManagerConfirm () {
      this.getCI()
    }
  }
}
</script>
