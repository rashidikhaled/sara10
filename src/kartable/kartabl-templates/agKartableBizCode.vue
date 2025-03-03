<template>
  <BizCode :code="params.data.BizCode" />
</template>

<script>
import BizCode from "../partials/BizCode.vue"
export default {
  name: "agKartableBizCode",
  components: { BizCode }
}
</script>
