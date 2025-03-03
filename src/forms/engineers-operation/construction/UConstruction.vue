<template>
  <form-wrapper :title="title" :padding="true">
   <template #header>
   <safa-status :result="requestResult" />
   </template>
    <FormRow :xl="4" :lg="4" :md="3">
      <FormControl>
        <safa-text
          label="شماره صورتجلسه کف"
          v-model="model.OperationStartInfo.SuratJalaseNo"
          cdcName="SuratJalaseNo"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ صورتجلسه کف"
          v-model="model.OperationStartInfo.SuratJalaseDate"
          cdcName="SuratJalaseDate"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه معرفی آزمایشگاه بتن"
          v-model="model.OperationStartInfo.LetterNo"
          cdcName="LetterNo"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه معرفی آزمایشگاه بتن"
          v-model="model.OperationStartInfo.LetterDate"
          cdcName="LetterDate"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه مسئول ایمنی"
          v-model="model.OperationStartInfo.SafetyOfficerLetterNo"
          cdcName="SafetyOfficerLetterNo"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه مسئول ایمنی"
          v-model="model.OperationStartInfo.SafetyOfficerLetterDate"
          cdcName="SafetyOfficerLetterDate"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نامه معرفی مجری"
          label-width="150px"
          v-model="model.OperationStartInfo.MojriLetterNo"
          cdcName="MojriLetterNo"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ نامه معرفی مجری"
          v-model="model.OperationStartInfo.MojriLetterDate"
          cdcName="MojriLetterDate"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="** تاریخ بازدید"
          v-model="model.OperationStartInfo.MojriMoarefiDate"
          cdcName="MojriMoarefiDate"
          label-width="150px"
          :m="mode"
        />
      </FormControl>
    </FormRow>
    <div class="q-my-md">
      <div class="q-gutter-x-lg">
        <safa-checkbox
          label="تابلوی مشخصات پروژه نصب شده است"
          v-model="model.OperationStartInfo.IsTablo"
          cdcName="IsTablo"
          style="min-width: 200px"
          :m="mode"
        />
        <safa-checkbox
          label="ساختمان مشمول ضوابط معرفی مجری ذیصلاح توسط سازمان نظام مهندسی می باشد"
          v-model="model.OperationStartInfo.IsMojriZiSalah"
          cdcName="IsMojriZiSalah"
          :m="mode"
        />
      </div>
    </div>
    <div class="q-my-md">
      <div class="q-gutter-x-lg">
        <safa-radio
          style="min-width: 200px"
          v-model="model.OperationStartInfo.IsNotSazeNegahban"
          cdcName="IsNotSazeNegahban"
          val="exportFishDate"
          label="پروژه نیاز به اجرای سازه نگهبان ندارد"
          :m="mode"
        />
        <safa-radio
          v-model="model.OperationStartInfo.IsSazeNegahbanEnough"
          cdcName="IsSazeNegahbanEnough"
          val="exportFishDate"
          label="سازه های نگهبان طراحی شده در نقشه های مصوب کفایت می کند"
          :m="mode"
        />
        <safa-radio
          v-model="model.OperationStartInfo.IsNewSazeNegahban"
          cdcName="IsNewSazeNegahban"
          val="exportFishDate"
          :m="mode"
          label="نیاز به اجرای سازه نگهبان منطبق با شرایط جدید دارد که نقشه مورد تایید و ممهور سازمان نظام مهندسی قم ارائه گردید"
        />
      </div>
    </div>
    <safa-grid
      title="لیست جزئیات شروع عملیات ساختمانی"
      :columns="columns"
      v-model="model.ListOperationStartDetail"
      cdcName="ListOperationStartDetail"
      height="200px"
      :m="mode"
    />
    <FormRow class="q-my-sm">
      <text-template
        label="توضیحات محاسب سازه"
        v-model="model.OperationStartInfo.MohasebDescription"
        cdcName="MohasebDescription"
        class="col-12"
        label-width="150px"
        :rows="1"
        :m="mode"
      />
      <text-template
        label="توضیحات ناظر هماهنگ کننده/سازه"
        v-model="model.OperationStartInfo.NazerDescription"
        cdcName="NazerDescription"
        class="col-12"
        :rows="1"
        label-width="150px"
        :m="mode"
      />
    </FormRow>
    <!-- <text-template
      label="توضیحات محاسب سازه"
      :formKey="formKey"
      v-model="model.OperationStartInfo.MohasebDescription"
      cdcName="MohasebDescription"
      height="100px"
    />
    <text-template
      label="توضیحات ناظر هماهنگ کننده/سازه"
      :formKey="formKey"
      v-model="model.OperationStartInfo.NazerDescription"
      cdcName="NazerDescription"
      :rows="2"
    />-->
    <safa-notice
      >جهت درج اسکن نقشه از فرم آرشیو شهرسازی استفاده نمایید</safa-notice
    >
    <safa-notice
      >موارد فوق فقط در ساختمان های دارای طبقه منفی اجباری است</safa-notice
    >
    <safa-notice
      >لازم به توضیح می باشد در صورت عدم نصب تابلومشخصات پروژه، مهندسین ناظر،
      مجاز به امضای مجوز شروع عملیات ساختمانی نمی باشند</safa-notice
    >
    <safa-notice
      >بیمه مسئولیت مدنی و شخص ثالث کارگاه وهمچنین بیمه اجاری کارگران ساختمانی
      طبق بند 12-1-4-1 مبحث دوازدهم مقررات ملی ساختمان مطابق جدول ذیل از مالک
      اخذ گردید"</safa-notice
    >
    <safa-notice
      >جهت درج تصاویر از فرم آرشیو شهرسازی استفاده نمایید</safa-notice
    >
    <safa-notice
      >با توجه به وضعیت شارع و مجاورین صورتجلسه تحویل کف که به امضای مالک و واحد
      نقشه برداری منطقه رسیده و همچنین به رویت اینجانب مهندس ناظر نقشه بردار/
      معمار نیز رسیده است و به پیوست ارائه می گردد</safa-notice
    >
    <safa-notice
      >با توجه به دستورالعمل گودبرداری و بازدید انجام شده و نظربه شواهد
      **</safa-notice
    >
    <template v-slot:footer>
      <form-actions @edit="isEditable = true" :m="mode" @save="saveData" />
    </template>
  </form-wrapper>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableReferencesMixin from "../mixins/kartableReferencesMixin"

export default {
  mixins: [baseFormMixin, kartableReferencesMixin],
  data () {
    return {
      name: "UConstruction",
      title: "شروع عملیات ساختمانی",
      formKey: "cbc55f04-6f57-40bc-8d5f-6a3c20dea773",
      main: true,
      sidebarCompatible: true,

      columns: [
        { field: "InsuranceNo", title: "شماره بیمه نامه" },
        {
          field: "InsuranceDate",
          title: "تاریخ شروع بیمه نامه",
          editor: "date"
        },
        {
          field: "InsuranceEndDate",
          title: "تاریخ پایان بیمه نامه",
          editor: "date"
        },
        { field: "CompanyName", title: "نام شرکت" },
        { field: "SeparationNo", title: "شماره صورت مجلس تفکیک زمین" },
        {
          field: "SeparationDate",
          title: "تاریخ صورت مجلس تفکیک زمین",
          editor: "date"
        }
      ],
      requestResult: null,
      model: {
        ListOperationStartDetail: [],
        OperationStartInfo: {
          IsMojriZiSalah: null,
          MojriLetterNo: "",
          MojriLetterDate: "",
          MojriMoarefiDate: "",
          IsNotSazeNegahban: false,
          IsSazeNegahbanEnough: false,
          IsNewSazeNegahban: false,
          IsTablo: null,
          MohasebDescription: "",
          SuratJalaseNo: "",
          SuratJalaseDate: "",
          LetterNo: "",
          LetterDate: "",
          SafetyOfficerLetterNo: "",
          SafetyOfficerLetterDate: ""
        }
      }
    }
  },
  methods: {
    async loadData () {
      try {
        this.showLoading()
        let payLoad = {
          pNidFil: this.selectedExecRep.NIdFil,
          pNidEng: this.selectedExecRep.NIdEng
        }
        const { data } = await this.$services.engineers.getOperationStartInfo(
          payLoad
        )
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.model = this.requestResult.data.GetOperationStartInfoResult
          await this.log({
            action: this.logActions.view,
            bizCode:
              this.selectedExecRep.NIdEng ||
              "00000000-0000-0000-0000-000000000000",
            bizCodeTitle: "کد عضویت"
          })
        }
      } catch (error) {
        console.error("load error", error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async saveData () {
      try {
        this.showLoading()
        let payLoad = {
          pClsOperationStart: {
            ...this.model
          }
        }
        const { data } = await this.$services.engineers.saveOperationStart(
          payLoad
        )
        this.requestResult = this.getResponse(data)
        if (this.requestResult.success) {
          this.showSuccess("ذخیره ی اطلاعات با موفقیت انجام شد.")
          await this.loadData()
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode:
              this.selectedExecRep.NIdEng ||
              "00000000-0000-0000-0000-000000000000"
          })
        }
      } catch (error) {
        console.error("save error", error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    if (!this.selectedExecRep) {
      this.showError("لطفا ابتدا یک مورد از کارتابل ارجاعات انتخاب کنید")
      this.hideSidebar(this.name)
    } else {
      this.loadData()
    }
  }
}
</script>
