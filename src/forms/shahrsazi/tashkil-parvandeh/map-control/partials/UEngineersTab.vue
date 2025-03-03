<template>
  <fit>
    <safa-grid
      v-if="hasEngineeringSystem == 1"
      title="مشخصات مهندسین"
      v-model="value.Base_ControllerInfo_EngineerSubSys"
      cdcName="Base_ControllerInfo_EngineerSubSys"
      :columns="gvEngineersColumns"
      :addRow="false"
      :allowCopy="false"
      :deleteRow="false"
      :suppressRowClickSelection="false"
      fit
      m="r"
      ref="GrEngineers"
    />

    <safa-grid
      v-else
      title="مشخصات مهندسین"
      v-model="value.Base_ControllerInfo"
      cdcName="Base_ControllerInfo"
      :columns="gvControllerInfoColumns"
      :addRow="false"
      :allowCopy="false"
      :deleteRow="hasEngineeringSystem === 0 || hasEngineeringSystem === 2"
      :suppressRowClickSelection="false"
      fit
      :m="m"
      ref="gvControllerInfo"
    >
      <template #header v-if="m === 'e'">
        <div class="flex items-center q-gutter-x-sm q-mr-xs cursor-pointer">
          <btn-save label="انتخاب مهندسین ناظر" @click="showModal = true" />
          <q-separator vertical />
        </div>
      </template>
    </safa-grid>

    <safa-popup v-model="showModal" title="لیست مهندسین ناظر" vertical>
      <USupervisorEngineersList
        :baseNosaziCode="baseNosaziCode"
        @getSupervisorEng="getSupervisorEng"
      />
    </safa-popup>
  </fit>
</template>

<script>
import USupervisorEngineersList from "./USupervisorEngineersList.vue"

export default {
  components: { USupervisorEngineersList },

  props: {
    value: Object,
    baseNosaziCode: Object,
    m: String
  },

  computed: {
    hasEngineeringSystem () {
      return window.getConfigValue("HasEngineeringSystem", 0) // این پارامتر از کانفیگ میآید و روی نمایش لود لیست مهندسین ناظر تاثیر میگذارد
    }
  },

  data () {
    return {
      showModal: false,

      gvEngineersColumns: [
        {
          field: "IdentityCode",
          title: "کد شهرداري",
          width: "150px",
          editable: false
        },
        {
          field: "JobAgreementNo",
          title: "شماره پروانه اشتغال",
          width: "200px",
          editable: false
        },
        {
          field: "MunicipalityCode",
          title: "شماره عضويت نظام مهندسی",
          width: "200px",
          editable: false
        },
        {
          field: "EngName",
          title: "نام مهندس",
          width: "150px",
          editable: false
        },
        {
          field: "EngFamily",
          title: "نام خانوادگی مهندس",
          width: "180px",
          editable: false
        },
        {
          field: "CI_Ability",
          title: "کد نوع صلاحیت",
          width: "150px",
          domain: "CI_SaraM1",
          editor: "combo",
          editable: false
        },
        {
          field: "CI_EngStudyField",
          title: "رشته تحصیلی",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "ArchitectureCode",
          title: "كد نظام معماری",
          width: "150px",
          editable: false
        },
        {
          field: "Metraj",
          title: "ميزان زيربنای تعهد شده",
          width: "150px",
          editable: false
        },
        {
          field: "CommitmentSupervisionDate",
          title: "تاریخ تعهد نظارت",
          editor: "date",
          width: "150px",
          editable: false
        },
        {
          field: "CommitmentSupervisionNo",
          title: "شماره تعهد نظارت",
          width: "150px",
          editable: false
        }
      ],

      gvControllerInfoColumns: [
        {
          field: "UrbanityCode",
          title: "کد شهرداري",
          width: "150px",
          editable: false
        },
        {
          field: "JobAgreement",
          title: "شماره پروانه اشتغال",
          width: "150px",
          editable: false
        },
        {
          field: "MembershipNo",
          title: "شماره عضويت نظام مهندسی",
          width: "200px",
          editable: false
        },
        {
          field: "ControllerName",
          title: "نام مهندس",
          width: "150px",
          editable: false
        },
        {
          field: "ControllerFamily",
          title: "نام خانوادگی مهندس",
          width: "180px",
          editable: false
        },
        {
          field: "CI_Ability",
          title: "کد نوع صلاحیت",
          width: "150px",
          domain: "CI_SaraM1",
          editor: "combo",
          editable: false
        },
        {
          field: "CI_EngStudyField",
          title: "رشته تحصیلی",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "150px",
          editable: false
        },
        {
          field: "EngBase",
          title: "پایه مهندس",
          width: "150px",
          editable: false
        },
        {
          field: "ControllerCode",
          title: "كد نظام معماری",
          width: "150px",
          editable: false
        },
        {
          field: "CommitmentNo",
          title: "ميزان زيربنای تعهد شده",
          width: "180px",
          editable: false
        },
        {
          field: "CommitmentSupervisionDate",
          title: "تاریخ تعهد نظارت",
          editor: "date",
          width: "150px",
          editable: false
        },
        {
          field: "CommitmentSupervisionNo",
          title: "شماره تعهد نظارت",
          width: "150px",
          editable: false
        },
        {
          field: "FloorNo",
          title: "طبقه",
          width: "150px",
          editable: false
        }
      ]
    }
  },

  methods: {
    getSupervisorEng (selectedRows) {
      let list = selectedRows.map(obj => {
        // eslint-disable-next-line eqeqeq
        if (this.hasEngineeringSystem == 0) {
          if (obj.CI_Ability != null) obj.CI_Ability = obj.CI_Ability ?? null
          obj.ControllerFamily = obj.ControllerFamily ?? ''
          obj.ControllerName = obj.ControllerName ?? ''
          obj.MembershipNo = obj.MembershipNo ?? ''
          obj.UrbanityCode = obj.UrbanityCode ?? ''
          obj.ControllerCode = obj.ControllerCode ?? ''
          obj.JobAgreement = obj.JobAgreement ?? ''
          obj.CommitmentNo = obj.CommitmentNo ?? ''
          obj.EngBase = obj.EngBase ?? ''
          obj.CI_EngStudyField = obj.CI_EngStudyField ?? ''
          obj.CommitmentSupervisionNo = obj.CommitmentSupervisionNo ?? ''
          obj.CommitmentSupervisionDate = obj.CommitmentSupervisionDate ?? ''
        } else {
          if (obj.CI_Ability != null) obj.CI_Ability = obj?.CI_Ability ?? null
          obj.ControllerFamily = obj?.EngFamily ?? ''
          obj.ControllerName = obj?.EngName ?? ''
          obj.MembershipNo = obj?.MunicipalityCode ?? ''
          obj.UrbanityCode = obj?.IdentityCode ?? ''
          obj.ControllerCode = obj?.ArchitectureCode ?? ''
          if (obj.JobAgreementNo != null) obj.JobAgreement = obj?.JobAgreementNo ?? ''
          obj.CI_EngineerType = obj?.CI_EngineerType ?? null
          obj.CI_EngStudyField = obj?.CI_StudyField ?? null
          obj.EngBase = obj?.Base ?? ''
        }
        return obj
      })

      // this.value.Base_ControllerInfo.forEach(obj => {
      // طبق صحبتی که با آقای زاهد انجام شد ، روی سرا 8 یک مهندس با کدشهرداری و کد صلاحیت یکسان چنین بار میتونه در سرا 8 به لیست اضافه بشه و آقای زاهد این عملکرد را صحیح اعلام کردند
      //   list = list.filter(f => f.UrbanityCode !== obj.UrbanityCode && f.CI_Ability !== obj.CI_Ability)
      // })

      this.value.Base_ControllerInfo = this.value.Base_ControllerInfo.concat(list)
      this.showModal = false
    }
  }
}
</script>
