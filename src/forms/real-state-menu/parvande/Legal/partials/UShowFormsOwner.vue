<template>
  <form-wrapper :title="title" :padding="false" :hideTitle="hideTitle">
    <safa-status :result="saveLegalOwnerAttorneyRes" />
    <fit>
      <!-- v-model="GrdOwnerAttorney" -->
      <safa-grid
        v-model="value.Legal_Owner_Attorney"
        title="مشخصات وکیل / وکلا"
        ID="319B89D6-1C75-4265-B1D1-497223A1998F"
        fit
        paginate
        max-height="100%"
        height="100%"
        minHeight="100%"
        :addRow="true"
        :deleteRow="false"
        :allowCopy="false"
        :columns="OwnerAttorneycolumn"
        :m="mode"
      />
    </fit>
    <template v-slot:footer>
      <form-actions
        :m="mode"
        @edit="isEditable = true"
        @cancel="closePopUp"
        @save="saveObj"
      >
      </form-actions>
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  props: {
    formKey: String,
    title: String,
    m: String,
    value: Object,
    selectedRow: Object
  },
  mounted () {
    this.isEditable = true
  },
  data () {
    return {
      name: "UShowFormsOwner",
      Title: "ثبت اطلاعات وکیل/ وکلا",

      // grid
      legalOwnerAttorneyList: [],
      OwnerAttorneycolumn: [
        {
          field: "AttorneyLetterNo",
          title: "شماره وکالت"
        },
        {
          field: "AttorneyLetterDate",
          title: "تاریخ وکالت",
          editor: "date"
        },
        {
          field: "AttorneyBureauNo",
          title: "شماره دفترخانه تنظیم وکالت"
        },
        {
          field: "AttorneyName",
          title: "نام و نام خانوادگی"
        },
        {
          field: "NationalCode",
          title: "کد ملی",
          editor: "numeric"
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه",
          editor: "numeric"
        },
        {
          field: "AttorneyFatherName",
          title: "نام پدر"
        },
        {
          field: "Telephone",
          title: "تلفن"
        },
        {
          field: "MobileNo",
          title: "شماره موبایل",
          width: "150px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "150px"
        },
        {
          field: "PostCode",
          title: "کدپستی",
          width: "150px"
        },
        {
          field: "Description",
          title: "توضیحات",
          width: "150px"
        }
      ],

      // res
      saveLegalOwnerAttorneyRes: null
    }
  },
  methods: {
    closePopUp () {
      this.$emit("closePopUp")
    },
    async saveObj () {
      this.showLoading()
      const payload = {
        PNIdLegal: this.selectedRow.NIdLegal,
        PNIdOwner: this.selectedRow.NIdOwner,
        PObj: this.value.Legal_Owner_Attorney
      }
      try {
        debugger
        const { data } = await this.$services.ES.saveLegalOwnerAttorney(
          payload
        )
        this.saveLegalOwnerAttorneyRes = this.getResponse(data)
        if (this.saveLegalOwnerAttorneyRes.success) {
          this.showSuccess("عملیات با موفقیت انجام شد")
          this.closePopUp()
          this.log({
            action: this.logActions.save,
            bizCode: this.selectedRow.NIdOwner_tmp,
            bizCodeTitle: "NIdOwner_tmp",
            nosaziCode: "",
            nidWorkItem: "",
            saveDesc: `ذخیره اطلاعات فرم مشخصات وکیل / وکلا با شماره مالک ${this.selectedRow.NIdOwner_tmp} انجام گردید.`
          })
        }
      } catch (error) {
        console.error(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  }
}
</script>
