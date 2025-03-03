<template>
  <div class="form-action">
    <button-group
      height="30px"
      ref="bgroups"
    >
      <slot name="before"></slot>
      <div
        v-for="btn in buttons"
        :key="btn.name"
      >
        <btn-default
          :name="btn.name"
          :title="btn.title"
          :label="btn.label"
          :icon="btn.icon"
          @click="onClick($event, btn)"
          :disable="btn.disable"
        />
      </div>
      <slot name="after"></slot>
    </button-group>
  </div>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    m: {
      type: String,
      default: "r"
    },
    disable: {
      type: Boolean,
      default: true
    },
    hideEngineerInfo: Boolean, // اطلاعات مهندس
    hideEngineerInfoSystem: Boolean, // اطلاعات مهندس - نظام مهندسی
    hideCapacityKartabl: Boolean, // کارتابل ظرفیت
    hideUBlackList: Boolean, // لیست سیاه
    hideEngineerArchive: Boolean, // آرشیو
    hidePerformanceReport: Boolean, // گزارش کارکرد
    hideEngineerMembership: Boolean, // سابقه عضویت مهندس در دفتر
    hideReceiptsReceived: Boolean, // فیش های وصول شده
    hideIncomeDocument: Boolean, // سند درآمد
    hideAvarezParvandehReport: Boolean, // گزارش عوارض پرونده
    hideEngineerComplications: Boolean, // عوارض مهندس
    hideConfirmationBankingService: Boolean, // تایید فیش از طریق وب سرویس بانک
    hideShowOnMap: Boolean // نمایش بر روی نقشه
  },

  data () {
    return {
      name: "EngineerActions",
      btns: [
        {
          key: "engineerInfo",
          name: "EngineerInfo",
          title: "اطلاعات مهندس",
          label: "",
          icon: "engineering",
          disable: true
        },
        {
          key: "engineerInfoSystem",
          name: "EngineerInfoSystem",
          title: "اطلاعات مهندس - نظام مهندسی",
          label: "",
          icon: "engineering",
          disable: true
        },
        {
          key: "capacityKartabl",
          name: "CapacityKartabl",
          title: "کارتابل ظرفیت",
          label: "",
          icon: "rule_folder",
          disable: true
        },
        {
          key: "blackList",
          name: "UBlackList",
          title: "لیست سیاه",
          label: "",
          icon: "receipt_long",
          disable: true
        },
        {
          key: "engineerArchive",
          name: "EngineerArchive",
          title: "آرشیو",
          label: "",
          icon: "attach_email",
          disable: true
        },
        {
          key: "performanceReport",
          name: "PerformanceReport",
          title: "گزارش کارکرد",
          label: "",
          icon: "analytics",
          disable: true
        },
        {
          key: "engineerMembership",
          name: "EngineerMembership",
          title: "سابقه عضویت مهندس در دفتر",
          label: "",
          icon: "contact_page",
          disable: true
        },
        {
          key: "receiptsReceived",
          name: "ReceiptsReceived",
          title: "فیش های وصول شده",
          label: "",
          icon: "exit_to_app",
          disable: true
        },
        {
          key: "incomeDocument",
          name: "IncomeDocument",
          title: "سند درآمد",
          label: "",
          icon: "receipt",
          disable: true
        },
        {
          key: "avarezParvandehReport",
          name: "UAvarezParvandehReport",
          title: "گزارش عوارض پرونده",
          label: "",
          icon: "calculate",
          disable: true
        },
        {
          key: "avarezEngineer",
          name: "UAvarezEngineer",
          title: "عوارض مهندس",
          label: "",
          icon: "history_edu",
          disable: true
        },
        {
          key: "confirmationBankingService",
          name: "UConfirmationBankingService",
          title: "تایید فیش از طریق وب سرویس بانک",
          label: "",
          icon: "history_edu",
          disable: true
        },
        {
          key: "showOnMap",
          name: "ShowOnMap",
          title: "نمایش بر روی نقشه",
          label: "",
          icon: "map",
          disable: true
        }
      ]
    }
  },

  computed: {
    buttons () {
      return this.btns
        .filter((btn) => {
          if (btn.key === "engineerInfo") {
            return !this.hideEngineerInfo
          } else if (btn.key === "engineerInfoSystem") {
            return !this.hideEngineerInfoSystem
          } else if (btn.key === "capacityKartabl") {
            return !this.hideCapacityKartabl
          } else if (btn.key === "blackList") {
            return !this.hideUBlackList
          } else if (btn.key === "engineerArchive") {
            return !this.hideEngineerArchive
          } else if (btn.key === "performanceReport") {
            return !this.hidePerformanceReport
          } else if (btn.key === "engineerMembership") {
            return !this.hideEngineerMembership
          } else if (btn.key === "receiptsReceived") {
            return !this.hideReceiptsReceived
          } else if (btn.key === "incomeDocument") {
            return !this.hideIncomeDocument
          } else if (btn.key === "avarezParvandehReport") {
            return !this.hideAvarezParvandehReport
          } else if (btn.key === "engineerComplications") {
            return !this.hideEngineerComplications
          } else if (btn.key === "confirmationBankingService") {
            return !this.hideConfirmationBankingService
          } else if (btn.key === "showOnMap") {
            return !this.hideShowOnMap
          } else if (btn.key === "avarezEngineer") {
            return !this.hideAvarezEngineer
          }
          return true
        })
        .map((btn) => {
          return {
            ...btn,
            disable: this.disable
          }
        })
    }
  },

  methods: {
    onClick ($event, btn) {
      this.$window.open({
        component: btn.name,
        keepAlive: false,
        padding: false,
        width: '900px',
        height: '600px',
        componentProps: {
          value: this.value,
          ...this.$attrs
        }
      })
    }
  }
}
</script>
