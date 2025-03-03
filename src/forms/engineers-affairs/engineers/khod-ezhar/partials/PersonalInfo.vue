<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="نوع"
          ciName="CI_EngineerType"
          domainName="engineer"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('CI_EngineerType') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.CI_EngineerType"
          cdcName="CI_EngineerType"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 100px">وضعیت تأهل</safa-label>
        <div class="q-gutter-x-md">
          <safa-radio
            :m="m"
            :val="true"
            label="متأهل"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp.IsMarried"
            :color="isModifyField('IsMarried') ? 'green' : ''"
            cdcName="IsMarried"
          />
          <safa-radio
            :m="m"
            label="مجرد"
            :val="false"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp.IsMarried"
            :color="isModifyField('IsMarried') ? 'green' : ''"
            cdcName="IsMarried"
          />
        </div>
      </FormControl>
      <!-- <FormControl class="flex items-center">
        <safa-label style="width: 100px" class="flex items-center"
          >تاهل</safa-label
        >
        <div class="flex items-center q-gutter-x-lg">
          <safa-radio
            label="متاهل"
            :val="true"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp.IsMarried"
            cdcName="IsMarried"
            :m="m"
            :class="{ 'control-highlight': isModifyField('IsMarried') }"
          />
          <safa-radio
            label="مجرد"
            :val="false"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp.IsMarried"
            cdcName="IsMarried"
            :m="m"
            :class="{ 'control-highlight': isModifyField('IsMarried') }"
          />
        </div>
      </FormControl> -->
      <FormControl class="flex items-center">
        <safa-label style="width: 100px" class="flex items-center"
          >جنسیت</safa-label
        >
        <div class="flex items-center q-gutter-x-lg">
          <safa-radio
            label="مرد"
            :val="true"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp.IsMale"
            cdcName="IsMale"
            class="q-mr-md"
            :m="m"
            :color="isModifyField('IsMarried') ? 'green' : ''"
          />
          <safa-radio
            label="زن"
            :val="false"
            v-model="model.ClsEngineerTemp.Eng_Info_Temp.IsMale"
            cdcName="IsMale"
            :m="m"
            :color="isModifyField('IsMarried') ? 'green' : ''"
          />
        </div>
      </FormControl>
    </FormRow>
    <FormRow>
      <FormControl>
        <safa-text
          label="نام"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('EngName') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.EngName"
          cdcName="EngName"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام خانوادگی"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('EngFamily') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.EngFamily"
          cdcName="EngFamily"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="نام پدر"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('FatherName') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.FatherName"
          cdcName="FatherName"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تولد"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('BirthDate') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.BirthDate"
          cdcName="BirthDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل تولد"
          label-width="100px"
          :m="m"
          :class="isModifyField('IsMarried') ? 'control-highlight' : ''"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.BirthPlace"
          cdcName="BirthPlace"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="محل صدور"
          label-width="100px"
          :m="m"
          :class="{ 'control-highlight': isModifyField('IdExportPlace') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.IdExportPlace"
          cdcName="IdExportPlace"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره شناسنامه"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('IdNo') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.IdNo"
          cdcName="IdNo"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد ملی"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('NationalCode') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.NationalCode"
          cdcName="NationalCode"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ثبت"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('CreatedDate') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.CreatedDate"
          cdcName="CreatedDate"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="کد دفتر جاری"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('IdentityCode') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.IdentityCode"
          cdcName="IdentityCode"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره عضویت نظام مهندسی"
          label-width="100px"
          m="r"
          :class="{ 'control-highlight': isModifyField('MunicipalityCode') }"
          v-model="model.ClsEngineerTemp.Eng_Info_Temp.MunicipalityCode"
          cdcName="MunicipalityCode"
        />
      </FormControl>
      <text-template
        class="col-12"
        label="توضیحات فعالیت ثبت شده"
        label-width="100px"
        :m="m"
        :rows="1"
        :class="{ 'control-highlight': isModifyField('EngComments') }"
        v-model="model.ClsEngineerTemp.Eng_Info_Temp.EngComments"
        cdcName="EngComments"
      />
    </FormRow>
    <safa-splitter v-model="gridSplitter" vertical fit class="q-mt-sm">
      <template #before>
        <fit>
          <safa-datatable
            m="r"
            fit
            min-height="100px"
            height="100%"
            max-height="100%"
            helper="Eng_JobAgreement_Temp"
            paginate
            v-model="model.ClsEngineerTemp.Eng_JobAgreement_Temp"
            cdcName="Eng_JobAgreement_Temp"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            :class="{
              'control-highlight': isModifyField('Eng_JobAgreement_Temp'),
            }"
          />
        </fit>
      </template>
      <template #after>
        <fit>
          <safa-datatable
            m="r"
            fit
            height="100%"
            max-height="100%"
            helper="Eng_Competence_Temp"
            paginate
            v-model="model.ClsEngineerTemp.Eng_Competence_Temp"
            cdcName="Eng_Competence_Temp"
            :addRow="false"
            :deleteRow="false"
            :allowCopy="false"
            :class="{
              'control-highlight': isModifyField('Eng_JobAgreement_Temp'),
            }"
          />
        </fit>
      </template>
    </safa-splitter>

    <internal-section title="علت عدم تایید" class="q-mt-sm">
      <div class="flex items-center q-gutter-x-lg">
        <safa-checkbox
          label="نمونه عکس"
          v-model="chck.Pic"
          @click="chckHandler"
        />
        <safa-checkbox
          label="کارت ملی"
          v-model="chck.Id"
          @click="chckHandler"
        />
        <safa-checkbox
          label="پشت پروانه اشتغال"
          v-model="chck.Parvaneh"
          @click="chckHandler"
        />
        <safa-checkbox
          label="نمونه امضا"
          v-model="chck.Sign"
          @click="chckHandler"
        />
        <safa-checkbox
          label="پروانه اشتغال"
          v-model="chck.employmentPermit"
          @change="chckHandler"
        />
        <safa-checkbox
          label="شناسنامه"
          v-model="chck.Certificate"
          @click="chckHandler"
        />
        <safa-checkbox
          label="مهر نظارت"
          v-model="chck.supervisionStamp"
          @click="chckHandler"
        />
        <safa-checkbox
          label="مهر طراحی"
          v-model="chck.drawingStamp"
          @click="chckHandler"
        />
      </div>
      <textarea
        label="توضیحات"
        label-width="80px"
        :rows="6"
        class="full-width q-mt-sm"
        style="min-height: 30px; max-height: 300px"
        v-model="model.ClsEngineerTemp.RejectMessage"
        cdcName="RejectMessage"
      >
      </textarea>
      <div class="flex items-center">
        <safa-checkbox label="نمایش توضیحات پیش فرض" v-model="showInitialMsg" />
      </div>
    </internal-section>
  </fit>
</template>

<script>
export default {
  name: "PersonalInfo",
  data () {
    return {
      gridSplitter: 50,

      rejectReason: null,
      initialMsg: `مهندس گرامی ،
درخواست خوداظهاری شما به دلیل عدم درج صحیح مورد تایید قرار نگرفت.
لطفا نسبت به اصلاح آن اقدام نمایید.
معاونت شهرسازی و معماری شهرداری اصفهان`,
      showInitialMsg: false,

      chck: {
        Pic: false,
        Id: false,
        Parvaneh: false,
        Sign: false,
        employmentPermit: false,
        Certificate: false,
        supervisionStamp: false,
        drawingStamp: false
      }
    }
  },
  computed: {
    engCompareFields () {
      return (
        this.model &&
        this.model.ClsEngCompare &&
        this.model.ClsEngCompare.map((x) => x.Name)
      )
    }
  },
  props: {
    m: String,
    model: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    isModifyField (field) {
      return !this.engCompareFields.includes(field)
    },
    chckHandler () {
      let reason = ""
      if (this.chck.Pic === true) reason += ` نمونه عکس ، `
      if (this.chck.Id === true) reason += `کارت ملی ، `
      if (this.chck.Parvaneh === true) reason += `پشت پروانه اشتغال ، `
      if (this.chck.Sign === true) reason += `نمونه امضا ، `
      if (this.chck.employmentPermit === true) reason += `پروانه اشتغال ، `
      if (this.chck.Certificate === true) reason += `شناسنامه ، `
      if (this.chck.supervisionStamp === true) reason += `مهر نظارت ، `
      if (this.chck.drawingStamp === true) reason += `مهر طراحی `
      if (reason.endsWith(" ، ")) reason = reason.replace(/ ، $/, " ")
      const temp = `مهندس گرامی ،
درخواست خوداظهاری شما به دلیل عدم درج صحیح ${reason} مورد تایید قرار نگرفت.
لطفا نسبت به اصلاح آن اقدام نمایید.
معاونت شهرسازی و معماری شهرداری اصفهان`
      if (this.showInitialMsg === true) {
        this.model.ClsEngineerTemp.RejectMessage = temp
      } else {
        this.initialMsg = temp
      }
    }
  },

  watch: {
    showInitialMsg: {
      handler () {
        this.showInitialMsg === !0
          ? this.chckHandler()
          : (this.model.ClsEngineerTemp.RejectMessage = "")
      },
      deep: true
    },
    "chck.Pic": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.Id": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.Parvaneh": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.Sign": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.employmentPermit": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.Certificate": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.supervisionStamp": {
      handler () {
        this.chckHandler()
      },
      deep: true
    },
    "chck.drawingStamp": {
      handler () {
        this.chckHandler()
      },
      deep: true
    }
  }
}
</script>
<style lang="scss">
.control-highlight {
  .multiselect {
    background: #bcf5bc !important;
  }
  .q-field__control:before {
    background: #d2edd2 !important;
  }
}
.text-template.control-highlight textarea {
  background-color: #d2edd2;
}
</style>
