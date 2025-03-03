<template>
  <fit>
    <FormRow :sm="1" :md="4" :lg="4" :xl="4" class="q-mb-sm">
      <FormControl>
        <nosazi-code-input
          v-model="baseNosaziCode"
          label="کد نوسازی"
          label-width="100px"
          m="r"
        />
      </FormControl>
    </FormRow>
    <safa-grid
      title="شکایت موعدی"
      m="r"
      v-model="value.ClsComplaint.ComplaintList"
      helper="complaintList"
      cdcName="ComplaintList"
      height="100%"
      max-height="100%"
      min-height="200px"
      fit
      @row:click="grdComplaintListSelectionChanged"
    />
    <internal-section class="q-my-sm" title="مشخصات موعدی">
      <FormRow :sm="1" :md="4" :lg="4" :xl="4" class="q-mt-sm">
        <FormControl>
          <safa-combo
            label="شخصیت"
            cdcName="character"
            m="r"
            v-model="issueDecision77.CI_Character"
            domainName="Commission77"
            ciName="CI_Character"
            label-width="90px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام"
            cdcName="firstName"
            label-width="90px"
            m="r"
            v-model="issueDecision77.FirstName"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام خانوادگی"
            cdcName="lastName"
            label-width="90px"
            m="r"
            v-model="issueDecision77.LastName"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="جنسیت"
            cdcName="gender"
            m="r"
            v-model="issueDecision77.CI_Gender"
            domainName="Commission77"
            ciName="CI_Gender"
            label-width="90px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام پدر"
            cdcName="fatherName"
            m="r"
            v-model="issueDecision77.FatherName"
            label-width="90px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد ملی"
            type="number"
            cdcName="nationalCode"
            m="r"
            v-model="issueDecision77.NaturalCode"
            label-width="90px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره تماس"
            type="number"
            cdcName="phoneNumber"
            m="r"
            v-model="issueDecision77.PhoneNumber"
            label-width="90px"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="خوانده متشاکی"
            cdcName="plaintiffReader"
            m="r"
            v-model="issueDecision77.Wicked"
            label-width="90px"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="نوع شکایت"
            cdcName="complaintType"
            m="r"
            v-model="issueDecision77.CI_ComplaintType"
            label-width="90px"
            ciName="CI_ComplaintType"
            domainName="Commission77"
          />
        </FormControl>
      </FormRow>
      <div class="row q-my-sm">
        <safa-text
          label="آدرس"
          cdcName="address"
          m="r"
          v-model="issueDecision77.Address"
          label-width="90px"
          type="textarea"
          class="col-12"
        />
      </div>
    </internal-section>
    <internal-section class="q-my-sm" title="توضیحات شکایت">
      <FormRow class="q-mt-sm">
        <safa-text
          cdcName="tozihatShekayat"
          m="r"
          v-model="issueDecision77.Description"
          style="min-width: 100px"
          :rows="1"
          type="textarea"
          label-width="90px"
          class="col-12"
        />
      </FormRow>
    </internal-section>
    <internal-section class="q-my-sm" title="توضیحات تصمیم">
      <FormRow>
        <safa-text
          cdcName="tozihatTasmim"
          :m="m"
          v-model="txtDescriptionDecision"
          style="min-width: 100px"
          :rows="1"
          type="textarea"
          label-width="90px"
          class="col-12"
        />
      </FormRow>
    </internal-section>
  </fit>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    baseNosaziCode: Object,
    issueDecision77: Object,
    value: Object,
    m: String
  },

  data () {
    return {
      txtDescriptionDecision: ""
    }
  },

  watch: {
    txtDescriptionDecision () {
      this.$emit("txtDescriptionDecisionHandler", this.txtDescriptionDecision)
    }
  },
  methods: {
    grdComplaintListSelectionChanged (row) {
      this.$emit("grdComplaintListSelectionChanged", row.data)
    }
  }
}
</script>
