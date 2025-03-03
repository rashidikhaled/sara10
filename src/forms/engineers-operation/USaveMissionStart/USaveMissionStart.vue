<template>
  <safa-form :id="formKey" :caption="title" appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1">
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-datepicker
              label="تاریخ شروع"
              v-model="OperationStartDate"
              cdcName="OperationStartDate"
              :m="mode"
              validations="dateFa"
               required
            />
          </FormControl>
        </FormRow>
        <safa-grid
          title="لیست شروع عملیات"
          v-model="model.Base_ShahrsaziArchive"
          cdcName="Base_ShahrsaziArchive"
          helper="USaveMissionStartArchive"
          m="r"
          sortable
          paginate
          :paginationPageSize="50"
          :allowMultipleSelection="false"
        />
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="confirm"
          @cancel="loadObj"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  mixins: [kartableReferencesMixin, baseFormMixin],
  data () {
    return {
      formKey: "289AC10A-1EF6-46D3-B297-EC6CFFCE4CDF",
      title: "ثبت تاریخ شروع عملیات",
      name: "USaveMissionStart",
      main: true,

      // #region variables
      isView: false,
      OperationStartDate: "",
      model: {},
      // #endregion

      // #region services
      loadObjRes: null,
      saveObjRes: null
      // #endregion
    }
  },

  mounted () {
    const isNIdFilNullOrEmpty = this.selectedExecRep && (this.selectedExecRep.NIdFil === null ||
    this.selectedExecRep.NIdFil === '00000000-0000-0000-0000-000000000000')
    if (this.selectedExecRep) {
      if (isNIdFilNullOrEmpty) {
        this.loadObj()
      } else {
        this.showError(
          `برای این پرونده تاریخ شروع عملیات ثبت شده است.`
        )
        this.hideSidebar(this.name)
      }
    } else {
      this.showError("لطفا از کارتابل ارجاعات عملکرد مهندسین یک درخواست انتخاب نمایید.")
      this.hideSidebar(this.name)
    }
  },
  props: {
    pNidFil: {
      type: String,
      default: '00000000-0000-0000-0000-000000000000'
    }
  },
  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const pNosaziCode = convertStringToNosaziCodeObject(
          this.selectedExecRep.CodeString
        )
        pNosaziCode.CI_City = 0 //  this.$conf.city.ciCity,
        pNosaziCode.Building = 0
        pNosaziCode.Apartment = 0
        pNosaziCode.Shop = 0
        pNosaziCode.EumBaseInfoGroup = 0
        pNosaziCode.EumNosaziCodeGroup = 0
        pNosaziCode.EumNosaziCodeObjType = 0
        pNosaziCode.EumRevisitGroup = 0

        const { data } = await this.$services.SC.getBaseParvandehInfo(
          {
            pLoadFunc: "Base_ShahrsaziArchive",
            pNosaziCode
          },
          { config: { District: pNosaziCode.District } }
        )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.model = this.loadObjRes.data?.Base_ParvandehInfo ?? {}
          if (this.model === {}) {
            this.model.Base_ShahrsaziArchive = []
          }
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
          this.isView = true
        }
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    confirm () {
      this.showConfirm("از تایید شروع به کار خود مطمئن هستید ؟").onOk(() =>
        this.saveObj()
      )
    },

    async saveObj () {
      try {
        if (!this.isValidForm()) return
        this.showLoading()
        const { data } = await this.$services.eng.saveFilOperation({
          pRequest: {
            Fil_Operation: {
              Fil_Operation: {
                NIdEng: this.selectedExecRep.NIdEng,
                NIdFil: (this.selectedExecRep.NIdFil !== null && this.selectedExecRep.NIdFil !== '00000000-0000-0000-0000-000000000000') ? this.selectedExecRep.NIdFil : this.pNidFil,
                OperationStartDate: this.OperationStartDate,
                StrTime: null
              },
              NIdEng: this.selectedExecRep.NIdEng,
              NIdFil: (this.selectedExecRep.NIdFil !== null && this.selectedExecRep.NIdFil !== '00000000-0000-0000-0000-000000000000') ? this.selectedExecRep.NIdFil : this.pNidFil
            }
          }
        })
        this.saveObjRes = this.getResponse(data)
        if (this.saveObjRes.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedExecRep.NIdFil,
            bizCodeTitle: "NIdFil"
          })
          await this.loadObj()
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
