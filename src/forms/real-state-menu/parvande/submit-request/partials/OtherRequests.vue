<template>
  <safa-grid
    title="سایر درخواست ها"
    v-model="otherReq.Requester"
    cdcName="otherRequestList"
    helper="otherRequestColumns"
    :bordered="false"
    fit
    m="r"
    paginate
  />
</template>

<script>
export default {
  props: {
    otherReq: {
      type: Object,
      default: () => {}
    }
  }
}
</script>
