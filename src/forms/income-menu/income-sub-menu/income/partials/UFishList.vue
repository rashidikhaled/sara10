<template>
  <fit>
    <safa-grid
      title="لیست تمام فیش ها"
      helper="incomeFiche"
      v-model="value.AllFicheByIncomeList"
      cdcName="allFiches"
      :getRowStyle="getRowStyle"
      :pageSize="20"
      m="r"
      fit
      paginate
    >
      <template v-slot:header>
        <div class="flex items-center q-gutter-x-sm q-mr-xs">
          <q-icon
            style="font-size: 20px"
            @click="reload"
            color="primary"
            name="find_replace"
            title="بازآوری لیست فیش ها"
            class="cursor-pointer"
          />
          <q-separator vertical />
        </div>
      </template>
    </safa-grid>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      isSelectFromResponder: Boolean,
      default: () => {
        return {
          AllFicheByIncomeList: []
        }
      }
    }
  },
  data () {
    return {
      name: "UFishList"

    }
  },
  methods: {
    reload () {
      this.$emit("getAllFiches")
    },
    getRowStyle ({ data }) {
      if (!data) return
      if (data.EumFicheStatus === 0) {
        // dutyFichePermanent
        return { background: "#e9f0eb" }
      }
      if (data.EumFicheStatus === 1) {
        // dutyFicheConfirm
        return { background: "#b3eec2" }
      }
      if (data.EumFicheStatus === 2) {
        // dutyFichePrint
        return { background: "#dfb684" }
      }
      if (data.EumFicheStatus === 7) {
        // dutyFicheTempExport
        return { background: "#ffffff" }
      }
      if (data.EumFicheStatus === 3) {
        // dutyFicheConfirmBank
        return { background: "#7bceda" }
      }
      if (data.EumFicheStatus === 4) {
        // dutyFicheRevoke
        return { background: "#f1b2b2" }
      }
      if (data.EumFicheStatus === 5) {
        // dutyFicheConfirme
        return { background: "#89d1e7" }
      }
      return { background: "transparent" }
    }
  }
}
</script>
