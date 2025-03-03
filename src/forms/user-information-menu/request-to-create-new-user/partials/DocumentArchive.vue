<template>
  <fit>
    <div
      v-if="!archiveBizCode || !archiveConfig"
      class="flex items-center full-height justify-center"
    >
      <span class="text-grey"
        >عدم یافتن تنظیمات مرتبط با آرشیو ... {{ archiveBizCode ?? "" }}</span
      >
    </div>
    <ArchiveWrap
      v-else
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
    />
    <!-- <MiniArchiveUploader
      fit
      name="bb"
      pass="123"
      showDescription="true"
      bizcode="6"
    /> -->
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {
        return {
          NidUser: null
        }
      }
    }
  },
  data () {
    return {
      name: "DocumentArchive",
      archiveBizCode: null
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("securityArchiveCore")
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // #TODO
      // https://trello.com/c/5QSjqd3I
      // این مورد موقتا ویت میشود .
      // چون نیاز هست که از سمت مشهد برای آرشیو سکوریتی  کانفیگ مربوطه رو اعلام کنن. با توجه به این که این مورد باید فقط روی اصلی انجام شود و آرشیو در تستی مشهد وجود ندارد قرار شد خانم غلامی به آقای کفیلی این مورد رو اعلام کنند که در اولویت انجام دهند.
      // موقتا کامپوننت آرشیو برای این فرم ها اضافه گردیدو بعد از اطلاع خانم غلامی ، عملکرد آرشیو مورد بررسی قرار میگیرد.

      if (!bizCode) return
      this.archiveBizCode = bizCode
    }
  },
  watch: {
    "value.NidUser": {
      handler () {
        this.updateArchiveBizCode(this.value.NidUser)
      },
      immediate: true
    }
  }
}
</script>
