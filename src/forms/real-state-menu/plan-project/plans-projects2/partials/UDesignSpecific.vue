<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="کد طرح"
          label-width="100px"
          v-model="value.Plansprojects_Info.PlansprojectsCode"
          cdcName="PlansprojectsCode"
          :m="m"
          required
          validations="required"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label=" نام طرح"
          label-width="100px"
          v-model="value.Plansprojects_Info.PlansprojectsName"
          cdcName="PlansprojectsName"
          :m="m"
          required
          validations="required"
        >
        </safa-text>
      </FormControl>
    </FormRow>

    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-combo
          label="اولویت"
          v-model="value.Plansprojects_Info.CI_PlanPriority"
          cdcName="CI_PlanPriority"
          :m="m"
          domainName="Estate"
          ciName="CI_PlanPriority"
          label-width="100px"
        >
        </safa-combo>
      </FormControl>
      <FormControl>
        <safa-combo
          label="نوع مجوز"
          v-model="value.Plansprojects_Info.CI_PlanLicenseType"
          cdcName="CI_PlanLicenseType"
          :m="m"
          domainName="Estate"
          ciName="CI_PlanLicenseType"
          label-width="100px"
        >
        </safa-combo>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره نقشه"
          label-width="100px"
          v-model="value.Plansprojects_Info.MapNo"
          cdcName="MapNo"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ شروع تخمینی"
          label-width="100px"
          v-model="value.Plansprojects_Info.EstimateStartDate"
          cdcName="EstimateStartDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ اجرا"
          label-width="100px"
          v-model="value.Plansprojects_Info.RunningDate"
          cdcName="RunningDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ ارزیابی"
          label-width="100px"
          v-model="value.Plansprojects_Info.AssessmentDate"
          cdcName="AssessmentDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="عرض از معبر جدید"
          label-width="100px"
          v-model="value.Plansprojects_Info.WidthOfNewCrossing"
          cdcName="WidthOfNewCrossing"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت اجرایی"
          label-width="100px"
          v-model="value.Plansprojects_Info.ExecutiveArea"
          cdcName="ExecutiveArea"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت واقعی"
          label-width="100px"
          v-model="value.Plansprojects_Info.ActualArea"
          cdcName="ActualArea"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="شماره دستور اجرا"
          label-width="100px"
          v-model="value.Plansprojects_Info.OrderRunningNo"
          cdcName="OrderRunningNo"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-datepicker
          label="تاریخ دستور اجرا"
          label-width="100px"
          v-model="value.Plansprojects_Info.OrderRunningDate"
          cdcName="OrderRunningDate"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label=" برآورد هزینه"
          label-width="100px"
          v-model="value.Plansprojects_Info.EstimateCost"
          cdcName="EstimateCost"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت معابر واقع در طرح"
          label-width="100px"
          v-model="value.Plansprojects_Info.CrossingAreaInPlan"
          cdcName="CrossingAreaInPlan"
          :m="m"
        >
        </safa-text>
      </FormControl>
      <FormControl>
        <safa-combo
          label="کد نقشه"
          label-width="100px"
          v-model="value.Plansprojects_Info.CI_MapNo"
          cdcName="CI_MapNo"
          :m="m"
          domainName="Estate"
          ciName="CI_MapNo"
        >
        </safa-combo>
      </FormControl>
    </FormRow>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="comment" label="توضیحات" />
        <tab-menu name="other" label="سایر اطلاعات" />
      </template>
      <tab-content name="comment">
        <fit>
          <text-template
            label="توضیحات"
            label-width="90px"
            :rows="3"
            formKey="33DE4A25-99E1-45A0-90F4-4365726B2129"
            v-model="value.Plansprojects_Info.Description"
            :m="m"
            cdcName="Description"
            fit
          />
        </fit>
      </tab-content>
      <tab-content name="other" :padding="false">
        <fit>
          <safa-grid
            v-model="value.Plansprojects_Other"
            cdcName="Plansprojects_Other"
            :m="m"
            fit
            max-height="100%"
            height="100%"
            minHeight="100%"
            paginate
            :addRow="true"
            :deleteRow="true"
            :allowCopy="true"
            :columns="plansprojectsOtherColumns"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
export default {
  props: {
    value: Object,
    m: String
  },
  data () {
    return {
      activeTab: "comment",
      plansprojectsOtherColumns: [
        {
          field: "CI_Plansprojects_Other",
          title: "نوع",
          domain: "Estate",
          editor: "combo"
        },
        { field: "Value", title: "مقدار" },
        { field: "Description", title: "توضیحات" }
      ]
    }
  }
}
</script>
