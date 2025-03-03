<template>
  <fit>
    <fit>
      <safa-status :result="result" />
      <internal-section
        v-model="internalSectionState"
        default-open
        title="اطلاعات"
      >
        <div class="q-mb-sm">
          <nosazi-code-input
            v-model="value.ClsRequest_Info.Request_Info.NosaziCode"
            cdcName="NosaziCode"
            label="کد نوسازی"
            label-width="100px"
            :disabled="true"
          />
        </div>
        <FormRow>
          <FormControl>
            <safa-datepicker
              label="تاریخ برگزاری"
              label-width="100px"
              v-model="value.ClsRequest_Info.ProclamationList[0].HoldingDate"
              cdcName="HoldingDate"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="زمان برگزاری"
              label-width="100px"
              v-model="value.ClsRequest_Info.ProclamationList[0].HoldingTime"
              cdcName="HoldingTime"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="value.Txt_Requesttype"
              cdcName="Txt_Requesttype"
              label="نوع درخواست"
              label-width="100px"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              v-model="value.ClsRequest_Info.Request_Info.NidWorkItem"
              cdcName="NidWorkItem"
              label="شماره درخواست"
              label-width="100px"
              m="r"
            />
          </FormControl>
        </FormRow>
      </internal-section>
      <internal-section
        v-model="internalSectionState2"
        default-open
        title="کارشناسی"
      >
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="شماره دبیرخانه"
              label-width="100px"
              v-model="value.ClsRequest_Info.Request_Info.SecretariatNo"
              cdcName="SecretariatNo"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              ciName="CI_Commission"
              domainName="Commission77"
              v-model="value.ClsRequest_Info.Request_Info.CI_Commission"
              cdcName="CI_Commission"
              label="شماره کمیسیون"
              label-width="100px"
             :m="m"
            />
          </FormControl>
        </FormRow>
        <div class="q-mt-sm">
          <text-template
            label="نظر کاربر"
            label-width="100px"
            v-model="value.ClsRequest_Info.Request_Info.UserDescription"
            cdcName="UserDescription"
           :m="m"
            class="col-12"
              formKey="A082ED95-B6A1-448E-818F-BEE059C07744"
          />
        </div>
        <div class="q-mt-sm">
          <text-template
            label="توضیحات"
            label-width="100px"
            v-model="value.ClsRequest_Info.Request_Info.Description"
            cdcName="Description"
           :m="m"
            class="col-12"
              formKey="0035978D-8A74-4B87-9BF9-DA79D26E6652"
          />
        </div>
      </internal-section>
    </fit>

  </fit>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      result: null,
      model: {
        ClsExpert: {
          CI_Commission: 1,
          Description: "",
          SecretariatNo: "",
          UserDescription: ""
        },
        disableMode: true
      },
      internalSectionState: false,
      internalSectionState2: false,
      requestInfo: []
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
