<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="شماره صورتجلسه تحویل"
          source-type="local"
          :options="itemsCombo1"
          label-width="100px"
          cdcName="txt_searchpanel"
          v-model="value.txt_searchpanel"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع انتقال"
          label-width="100px"
          domainName="Estate"
          ciName="CI_TransferDocType"
          cdcName="CI_TransferDocType"
          v-model="value.TransferDoc_Info.CI_TransferDocType"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند عرصه"
          label-width="100px"
          cdcName="LandDocNo"
          v-model="value.TransferDoc_Info.LandDocNo"
          :required="!customValidations"
          :validations="customValidations ? '' : 'required'"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند اعیان"
          label-width="100px"
          cdcName="BuildingDocNo"
          v-model="value.TransferDoc_Info.BuildingDocNo"
          :required="!customValidations"
          :validations="customValidations ? '' : 'required'"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="سهم"
          label-width="100px"
          cdcName="Impart"
          v-model="value.TransferDoc_Info.Impart"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="دانگ"
          label-width="100px"
          cdcName="Dang"
          v-model="value.TransferDoc_Info.Dang"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره دفترخانه"
          label-width="100px"
          cdcName="BureauNo"
          v-model="value.TransferDoc_Info.BureauNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ تنظیم سند"
          label-width="100px"
          cdcName="DocDate"
          v-model="value.TransferDoc_Info.DocDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره اقرارنامه"
          label-width="100px"
          cdcName="DeclarationNo"
          v-model="value.TransferDoc_Info.DeclarationNo"
          :m="m"
        />
      </FormControl>
    </FormRow>

    <safa-notice>
      منظور از شماره سند عرصه و تاریخ تنظیم سند همان شماره سند انتقالی به نام
      شهرداری می باشد
    </safa-notice>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="شماره دفتر املاک"
          label-width="100px"
          cdcName="EstateOfficeNo"
          v-model="value.TransferDoc_Info.EstateOfficeNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="صفحه دفتر املاک"
          label-width="100px"
          cdcName="EstateOfficePage"
          v-model="value.TransferDoc_Info.EstateOfficePage"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ سند مالکیت"
          label-width="100px"
          cdcName="OwnershipDocDate"
          v-model="value.TransferDoc_Info.OwnershipDocDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره چاپی سند مالکیت"
          label-width="100px"
          cdcName="OwnershipDocPrintNo"
          v-model="value.TransferDoc_Info.OwnershipDocPrintNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره سند انتقال"
          label-width="100px"
          cdcName="TransferDoctNo"
          v-model="value.TransferDoc_Info.TransferDoctNo"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="بارکد سند"
          label-width="100px"
          cdcName="Barcode"
          v-model="value.TransferDoc_Info.Barcode"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت عرصه"
          label-width="100px"
          cdcName="ArseArea"
          v-model="value.TransferDoc_Info.ArseArea"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت اعیان"
          label-width="100px"
          cdcName="AyanArea"
          v-model="value.TransferDoc_Info.AyanArea"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="پلاک ثبتی"
          label-width="100px"
          cdcName="RegisterPlack"
          v-model="value.TransferDoc_Info.RegisterPlack"
          :m="m"
        />
      </FormControl>
      <text-template
        label-width="100px"
        cdcName="TransferDocDesc"
        :rows="10"
        label="توضیحات انتقال سند"
        class="col-12"
        v-model="value.TransferDoc_Info.TransferDocDesc"
        :m="m"
      />
    </FormRow>
  </fit>
</template>

<script>
export default {
  props: {
    value: { type: Object, default: () => {} },
    m: { type: String }
  },

  data () {
    return {
      name: "SessionDetails",
      customValidations: true,
      itemsCombo1: [
        {
          ID: "1",
          Title: "خالی"
        }
      ]
    }
  },
  mounted () {
    const obj =
      window.getConfigValue("esupParams")?.ValidationCheckInTransmitter ?? null
    this.customValidations = obj
    console.log("vcustomValidations", this.customValidations)
  }
}
</script>
