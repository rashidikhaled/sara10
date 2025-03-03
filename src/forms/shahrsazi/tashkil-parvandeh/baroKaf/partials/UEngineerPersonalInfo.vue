<template>
  <section class="UEngineerPersonalInfo">
    <section padding>
      <h1 class="form-title text-h6 q-mb-lg"><span>مشخصات فردی</span></h1>
      <div class="row q-col-gutter-md">
        <div class="col-12 col-md">
          <div class="row q-col-gutter-md">
            <div class="col-12 col-sm-6 col-md-4">
              <safa-combo
                ciName="CI_EngineerType"
                domainName="engineer"
                :m="mode"
                input-debounce="0"
                label="نوع"
                @input="setIdOfTypeToModel"
                v-model="results.pRequest.ClsEngineer.Eng_Info.CI_EngineerType"
                cdcName="CI_EngineerType"
              ></safa-combo>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-label>وضعیت تاهل</safa-label>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMarried"
                cdcName="IsMarried"
                :disable="isElementDisabled"
                :m="mode"
                val="married"
                label="متاهل"
              ></q-radio>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMarried"
                cdcName="IsMarried"
                :disable="isElementDisabled"
                :m="mode"
                val="single"
                label="مجرد"
              ></q-radio>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-label>جنسیت</safa-label>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMale"
                cdcName="IsMale"
                :m="mode"
                val="male"
                label="مرد"
                :disable="isElementDisabled"
              ></q-radio>

              <q-radio
                v-model="results.pRequest.ClsEngineer.Eng_Info.IsMale"
                cdcName="IsMale"
                :m="mode"
                val="female"
                label="زن"
                :disable="isElementDisabled"
              ></q-radio>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="نام/نام شرکت"
                v-model="results.pRequest.ClsEngineer.Eng_Info.EngName"
                cdcName="EngName"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="نام خانوادگی"
                v-model="results.pRequest.ClsEngineer.Eng_Info.EngFamily"
                cdcName="EngFamily"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="نام پدر"
                v-model="results.pRequest.ClsEngineer.Eng_Info.FatherName"
                cdcName="FatherName"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-datepicker
                :m="mode"
                :disabled="false"
                outlined
                dense="true"
                locale="fa"
                placeholder="تاریخ تولد"
                format="jYYYY/jMM/jDD"
                display-format="dddd jDD jMMMM jYYYY"
                label="تاریخ تولد"
                v-model="results.pRequest.ClsEngineer.Eng_Info.BirthDate"
                cdcName="BirthDate"
              >
              </safa-datepicker>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="محل تولد"
                v-model="results.pRequest.ClsEngineer.Eng_Info.BirthPlace"
                cdcName="BirthPlace"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="محل صدور"
                v-model="results.pRequest.ClsEngineer.Eng_Info.IdExportPlace"
                cdcName="IdExportPlace"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="شماره شناسنامه"
                v-model="results.pRequest.ClsEngineer.Eng_Info.IdNo"
                cdcName="IdNo"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کد ملی/شماره ثبت"
                v-model="results.pRequest.ClsEngineer.Eng_Info.NationalCode"
                cdcName="NationalCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-datepicker
                v-model="results.pRequest.ClsEngineer.Eng_Info.SaveDate"
                cdcName="SaveDate"
                :m="mode"
                :disabled="false"
                outlined
                dense="true"
                locale="fa"
                placeholder="تاریخ ثبت"
                format="jYYYY/jMM/jDD"
                display-formaUset="dddd jDD jMMMM jYYYY"
                label="تاریخ ثبت"
              >
              </safa-datepicker>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کد دفتر جاری"
                v-model="results.pRequest.ClsEngineer.Eng_Info.OfficeCode"
                cdcName="OfficeCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="شماره عضویت نظام مهندسی"
                v-model="results.pRequest.ClsEngineer.Eng_Info.IdentityCode"
                cdcName="IdentityCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کد نظام معماری"
                v-model="results.pRequest.ClsEngineer.Eng_Info.ArchitectureCode"
                cdcName="ArchitectureCode"
              ></safa-text>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                m="r"
                label="دفتر نظام مهندسی"
                v-model="results.pRequest.ClsEngineer.EngOrgan_OfficeInfo.OfficeCode"
                cdcName="OfficeCode"
              ></safa-text>
            </div>

            <div class="col-1">
              <q-btn
                :m="mode"
                label="..."
                color="secondary"
                @click="isShowModal = true"
                :disable="isElementDisabled"
              ></q-btn>

              <ShowModal
                :show="isShowModal"
                @hide="isShowModal = false"
                title="لیست دفاتر"
                @onCloseModal="closeModal"
              >
                <SearchOffices @onGetDataFromGrid="getDataFromGrid" />
              </ShowModal>
            </div>

            <div class="col-3">
              <safa-combo
                domainName="engineer"
                ciName="CI_City"
                dense="true"
                outlined
                use-input
                :m="mode"
                input-debounce="0"
                label="شهر"
                v-model="results.pRequest.ClsEngineer.Eng_Info.Eng_OrganOffCity"
                cdcName="Eng_OrganOffCity"
              ></safa-combo>
            </div>

            <div class="col-12 col-sm-6 col-md-4">
              <safa-text
                :m="mode"
                label="کلمه عبور"
                v-model="results.pRequest.ClsEngineer.Eng_Info.Password"
                cdcName="Password"
              ></safa-text>
            </div>

            <div class="col-11">
              <text-template
                :m="mode"
                formKey="1765deec-7d50-4580-9959-c434ea058c54"
                label="توضیحات"
                type="textarea"
                v-model="results.pRequest.ClsEngineer.Eng_Info.EngComments"
                cdcName="EngComments"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>
</template>

<script>
// import CiItems from '../../../../components/json/items'
// import ShowModal from '../../../../components/ShowModal'
// import SearchOffices from '../../../../components/SearchOffices'
// import baseFormMixin from '../../../../mixins/baseFormMixin'

export default {
  name: 'u-engineer-personal-info'
}
</script>
