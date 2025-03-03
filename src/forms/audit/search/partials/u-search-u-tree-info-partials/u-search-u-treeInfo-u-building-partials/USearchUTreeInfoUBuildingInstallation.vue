<template>
  <fit>
    <div class="fit q-pa-sm">
      <safa-grid
        :columns="baseInstallationColumns"
        fit
        :bordered="true"
        :suppressRowClickSelection="false"
        title="تاسیسات"
        min-height="250px"
        height="100%"
        max-height="100%"
        :m="m"
        v-model="dataContext.mainContext.Base_Installation"
        :allowMultipleSelection="false"
      />
    </div>
  </fit>
</template>

<script>
export default {
  name: "USearchUTreeInfoUBuildingInstallation",

  props: {
    m: {
      type: String,
      default: "r"
    },
    dataContext: {
      type: Object,
      required: true
    },
    isLoadedFromMenu: Boolean
  },

  data () {
    return {
      baseInstallationColumns: [
        {
          field: "CI_InstallationType",
          title: "نوع تاسیسات",
          domain: "CI_SaraM1",
          editor: "combo",
          width: 140
        },
        {
          field: "InstallationValue",
          title: "تعداد",
          editor: "numeric",
          width: "auto"
        }
      ]
    }
  }
}
</script>
