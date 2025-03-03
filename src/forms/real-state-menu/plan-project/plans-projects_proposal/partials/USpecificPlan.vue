
<template>
  <fit>
    <form-row class="q-my-sm">
      <form-control>
        <safa-text
          label="کد طرح"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.Plansprojects_ProposalCode"
          cdcName="Plansprojects_ProposalCode"
          required
          validations="required"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          label=" نام طرح"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.Plansprojects_ProposalName"
          cdcName="Plansprojects_ProposalName"
          required
          validations="required"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          label="حد فاصل از"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.ContourFromFrom"
          cdcName="ContourFromFrom"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          label="حد فاصل تا"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.ContourFromTo"
          cdcName="ContourFromTo"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          :m="m"
          label="تعداد کل ردیفهای طرح"
          label-width="100px"
          v-model="
            value.Plansprojects_Proposal_Info.CntPlansprojects_ProposalRow
          "
          cdcName="CntPlansprojects_ProposalRow"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-combo
          label="اولویت"
          :m="m"
          domainName="Estate"
          ciName="CI_PlanPriority"
          v-model="value.Plansprojects_Proposal_Info.CI_PlanPriority"
          cdcName="CI_PlanPriority"
          label-width="100px"
        >
        </safa-combo>
      </form-control>
      <form-control>
        <safa-combo
          label=" نوع مجوز"
          :m="m"
          domainName="Estate"
          ciName="CI_PlanLicenseType"
          v-model="value.Plansprojects_Proposal_Info.CI_PlanLicenseType"
          cdcName="CI_PlanLicenseType"
          label-width="100px"
        >
        </safa-combo>
      </form-control>
      <form-control>
        <safa-text
          label="شماره نقشه"
          :m="m"
          v-model="value.Plansprojects_Proposal_Info.MapNo"
          cdcName="MapNo"
          label-width="100px"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ شروع تخمینی"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.EstimateStartDate"
          cdcName="EstimateStartDate"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ اجرا"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.RunningDate"
          cdcName="RunningDate"
        />
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ ارزیابی"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.AssessmentDate"
          cdcName="ActualArea"
        />
      </form-control>
      <form-control>
        <safa-text
          label="عرض از معبر جدید"
          :m="m"
          v-model="value.Plansprojects_Proposal_Info.WidthOfNewCrossing"
          cdcName="WidthOfNewCrossing"
          label-width="100px"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          label="مساحت اجرایی"
          :m="m"
          v-model="value.Plansprojects_Proposal_Info.ExecutiveArea"
          cdcName="ExecutiveArea"
          label-width="100px"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          label="مساحت واقعی"
          :m="m"
          v-model="value.Plansprojects_Proposal_Info.ActualArea"
          cdcName="ActualArea"
          label-width="100px"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-text
          label="شماره دستور اجرا"
          :m="m"
          v-model="value.Plansprojects_Proposal_Info.OrderRunningNo"
          cdcName="OrderRunningNo"
          label-width="100px"
        >
        </safa-text>
      </form-control>
      <form-control>
        <safa-datepicker
          label="تاریخ دستور اجرا"
          :m="m"
          label-width="100px"
          v-model="value.Plansprojects_Proposal_Info.OrderRunningDate"
          cdcName="OrderRunningDate"
        />
      </form-control>
      <form-control>
        <safa-text
          label=" برآورد هزینه"
          :m="m"
          v-model="value.Plansprojects_Proposal_Info.EstimateCost"
          cdcName="EstimateCost"
          label-width="100px"
        >
        </safa-text>
      </form-control>
    </form-row>
    <safa-tabs v-model="activeTab">
      <template v-slot:tabs>
        <tab-menu name="comment" label="توضیحات" />
        <tab-menu name="other" label="سایر اطلاعات" />
      </template>
      <tab-content name="comment">
          <text-template
            label="توضیحات"
            label-width="90px"
            :m="m"
            :rows="5"
            formKey="2397553A-F7A4-4D89-A214-627ACCD0D676"
            v-model="value.Plansprojects_Proposal_Info.Description"
            cdcName="Description"
            fit
          />
      </tab-content>
      <tab-content name="other" :padding="false">
        <fit>
          <safa-grid
            v-model="value.Plansprojects_Proposal_Other"
            :m="m"
            fit
            ID="66986BD1-C493-4FA5-83B4-DCE8624E4999"
            max-height="100%"
            height="100%"
            minHeight="100%"
            paginate
            :allow-new-row="true"
            :deleteRow="true"
            :allowCopy="true"
            helper="ProposalOtherColumns"
            title="سایر مشخصات"
          />
        </fit>
      </tab-content>
    </safa-tabs>
  </fit>
</template>
<script>
export default {
  props: {
    m: String,
    baseNosaziCode: { type: Object },
    value: Object
  },
  data () {
    return {
      title: "مشخصات منبع تامین",
      name: "USupplySourceSpecific",
      activeTab: "comment"
    }
  }
}
</script>
