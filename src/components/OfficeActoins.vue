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
    hideUEngOffice: Boolean, // دفتر مهندسی
    hideUJoinInOffice: Boolean, // عضویت در دفتر
    hideUEngOrganOffices: Boolean, // دفتر نظام مهندسی
    hideBlackList: Boolean, // لیست سیاه
    hideEngineerArchive: Boolean, // آرشیو
    hidePerformanceReport: Boolean, // گزارش کارکرد
    hideShowOnMap: Boolean // نمایش بر روی نقشه
  },

  data () {
    return {
      name: "OfficeActoins",
      btns: [
        {
          key: "engOffice",
          name: "UEngOffice",
          title: "دفتر مهندسی",
          label: "",
          icon: "business",
          disable: true
        },
        {
          key: "joinInOffice",
          name: "UJoinInOffice",
          title: "عضویت در دفتر",
          label: "",
          icon: "how_to_reg",
          disable: true
        },
        {
          key: "engOrganOffices",
          name: "UEngOrganOffices",
          title: "دفاتر نظام مهندسی",
          label: "",
          icon: "apartment",
          disable: true
        },
        {
          key: "blackList",
          name: "BlackList",
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
          if (btn.key === "engOffice") {
            return !this.hideUEngOffice
          } else if (btn.key === "joinInOffice") {
            return !this.hideUJoinInOffice
          } else if (btn.key === "engOrganOffices") {
            return !this.hideUEngOrganOffices
          } else if (btn.key === "blackList") {
            return !this.hideBlackList
          } else if (btn.key === "engineerArchive") {
            return !this.hideEngineerArchive
          } else if (btn.key === "performanceReport") {
            return !this.hidePerformanceReport
          } else if (btn.key === "showOnMap") {
            return !this.hideShowOnMap
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
