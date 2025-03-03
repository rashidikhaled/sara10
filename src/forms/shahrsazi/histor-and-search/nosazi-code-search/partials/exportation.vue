<template>
  <div>
    <div class="row q-col-gutter-md items-center">
      <div class="col-12 col-lg">
        <div class="q-gutter-md flex items-center">
          <div>گواهی ها و مجوزات:</div>
          <safa-radio
            v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
            :val="1"
            label="پروانه"
            cdcName="parvaneh"
          />
          <safa-radio
            v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
            :val="2"
            label="پایانکار"
            cdcName="payankar"
          />
          <safa-radio
            v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
            :val="3"
            label="عدم خلاف"
            cdcName="NoViolation"
          />
          <safa-radio
            v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
            :val="4"
            label="استعلام"
            cdcName="inquiry"
          />
          <safa-radio
            v-model="Base_ShahrsaziArchive.EumShahrsaziArchiveGroup"
            :val="0"
            label="تمام گواهی ها و مجوزات"
            cdcName="authorization"
          />
        </div>
      </div>

    </div>
    <div class="row q-col-gutter-x-md q-mt-md">
      <div class="col-auto">
        <safa-text
          label="شماره مجوز:"
          v-model="Base_ShahrsaziArchive.CertificateNo"
          labelWidth="70px"
          cdcName="CertificateNo"
        />
      </div>
      <div class="col-auto">
        <safa-datepicker
          label="تاریخ مجوز:"
          v-model="Base_ShahrsaziArchive.CertificateDate"
          labelWidth="70px"
          cdcName="CertificateDate"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "subscription",

  props: {
    m: String,
    Base_ShahrsaziArchive: Object
  },

  updated () {
    this.$emit("baseShahrsaziArchive", this.Base_ShahrsaziArchive)
  }
}
</script>
