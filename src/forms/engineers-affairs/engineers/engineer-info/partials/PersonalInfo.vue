<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          ciName="CI_EngineerType"
          domainName="engineer"
          :m="m"
          label="نوع"
          label-width="100px"
          v-model="model.ClsEngineer.Eng_Info.CI_EngineerType"
          cdcName="EngineerType"
        />
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 100px">وضعیت تأهل</safa-label>
        <div class="q-gutter-x-md">
          <safa-radio
            :m="m"
            :val="true"
            label="متأهل"
            v-model="model.ClsEngineer.Eng_Info.IsMarried"
            cdcName="IsMarried"
          />
          <safa-radio
            :m="m"
            label="مجرد"
            :val="false"
            v-model="model.ClsEngineer.Eng_Info.IsMarried"
            cdcName="IsMarried"
          />
        </div>
      </FormControl>
      <FormControl class="flex items-center">
        <safa-label style="width: 100px">جنسیت</safa-label>
        <div class="q-gutter-x-md">
          <safa-radio
            v-model="model.ClsEngineer.Eng_Info.IsMale"
            cdcName="IsMale"
            :m="m"
            :val="true"
            label="مرد"
          />
          <safa-radio
            v-model="model.ClsEngineer.Eng_Info.IsMale"
            cdcName="IsMale"
            :m="m"
            :val="false"
            label="زن"
          />
        </div>
      </FormControl>
    </FormRow>
    <FormRow>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.EngName"
          cdcName="EngName"
          :m="m"
          label="نام/نام شرکت"
          label-width="100px"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.EngFamily"
          cdcName="EngFamily"
          :m="m"
          label="نام خانوادگی"
          label-width="100px"
          required
          validations="required"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.FatherName"
          cdcName="FatherName"
          :m="m"
          label="نام پدر"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="model.ClsEngineer.Eng_Info.BirthDate"
          cdcName="BirthDate"
          :m="m"
          required
          validations="required"
          label="تاریخ تولد"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.BirthPlace"
          cdcName="BirthPlace"
          :m="m"
          label="محل تولد"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.IdExportPlace"
          cdcName="IdExportPlace"
          :m="m"
          label="محل صدور"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.IdNo"
          cdcName="IdNo"
          :m="m"
          label="شماره شناسنامه"
          label-width="100px"
          required
          :validations="['required', 'number']"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.NationalCode"
          cdcName="NationalCode"
          :m="m"
          label="کد ملی/شماره ثبت"
          label-width="100px"
          type="number"
          required
          :validations="['required', 'number']"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          v-model="model.ClsEngineer.Eng_Info.SaveDate"
          cdcName="SaveDate"
          :m="m"
          label="تاریخ ثبت"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.EngineerLastOffice.OfficeCode"
          cdcName="OfficeCode"
          m="r"
          label="کد دفتر جاری"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.MunicipalityCode"
          cdcName="IdentityCode"
          :m="m"
          label="شماره عضویت نظام مهندسی"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.ArchitectureCode"
          cdcName="ArchitectureCode"
          m="r"
          label="کد نظام معماری"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.EngOrgan_OfficeInfo.OfficeCode"
          cdcName="OfficeCode"
          m="r"
          label="دفتر نظام مهندسی"
          label-width="100px"
        >
          <template v-slot:append>
            <q-icon
              style="position: relative; right: 5px"
              @click="showOffices"
              color="primary"
              name="more_horiz"
              class="cursor-pointer"
              size="18px"
              :disabled="m === 'r'"
            />
          </template>
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo
          v-model="model.ClsEngineer.Eng_Info.Eng_OrganOffCity"
          cdcName="Eng_OrganOffCity"
          domainName="engineer"
          ciName="CI_City"
          use-input
          :m="m"
          input-debounce="0"
          label="شهر"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          v-model="model.ClsEngineer.Eng_Info.Password"
          cdcName="Password"
          :m="m"
          label="کلمه عبور"
          label-width="100px"
        />
      </FormControl>
      <text-template
        v-model="model.ClsEngineer.Eng_Info.EngComments"
        cdcName="EngComments"
        :m="m"
        label="توضیحات"
        type="textarea"
        label-width="100px"
        :rows="5"
        class="col-12"
      />
    </FormRow>

    <safa-popup
      v-model="isShowModal"
      cdcName="isShowModal"
      :show="isShowModal"
      @hide="isShowModal = false"
      title="لیست دفاتر"
      width="900px"
      height="600px"
      :padding="false"
    >
      <SearchOffices
        :model="model"
        :title="title"
        :formKey="formKey"
        :name="name"
        :m="m"
        @selectedOffice="selectedOffice"
      />
    </safa-popup>
  </fit>
</template>

<script>
import SearchOffices from "../../../common/SearchOffices.vue"
export default {
  components: { SearchOffices },
  props: {
    model: Object,
    m: String,
    formKey: String,
    title: String
  },
  data () {
    return {
      name: "PersonalInfo",
      isShowModal: false
    }
  },
  methods: {
    selectedOffice (dataItem) {
      this.model.ClsEngineer.EngOrgan_OfficeInfo.OfficeCode =
        dataItem.OfficeCode
      this.isShowModal = false
    },
    showOffices () {
      if (this.m === "e") this.isShowModal = true
    }
  },
  beforeDestroy () {
    this.isShowModal = false
  }
}
</script>
