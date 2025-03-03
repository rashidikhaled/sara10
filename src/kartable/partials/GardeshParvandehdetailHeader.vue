<template>
  <div class="flex  q-pa-sm q-gutter-sm">
    <div>
      <q-btn
        flat
        dense
        padding="2px 8px"
        size="12px"
        color="primary"
        icon="arrow_forward"
        label="بازگشت به گردش پرونده"
        @click="$emit('back')"
      />
    </div>
    <div class="q-px-lg"></div>
    <safa-text
      label="نوع فرآیند"
      label-width="70px"
      v-model="taskInfo.WorkflowTitel"
      m="r"
    />
    <safa-text
      dir="ltr"
      label="شماره فرآیند"
      label-width="70px"
      type="number"
      v-model="taskInfo.NidWorkItem"
      m="r"
    />
    <safa-text
      label="نام متقاضی"
      label-width="70px"
      v-model="taskInfo.ProcRequester"
      m="r"
    />
    <safa-text label="کد" label-width="70px" v-model="taskInfo.BizCode" m="r"/>
    <safa-text
      label="مرحله"
      label-width="70px"
      v-model="taskInfo.TaskTitel"
      m="r"
    />
  </div>
</template>

<script>
export default {
  props: {
    taskInfo: {
      type: Object,
      default: () => {
      }
    }
  }
}
</script>
