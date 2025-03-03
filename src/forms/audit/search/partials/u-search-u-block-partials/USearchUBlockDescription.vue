<template>
  <fit>
    <div class="q-pa-sm">
      <text-template
        v-model="dataContext.Base_BlockInfo.Comments"
        type="textarea"
        label="توضیحات پرونده بلوک :"
        label-width="120px"
        cdcName="Comment"
      />
    </div>
  </fit>
</template>

<script>
export default {
  name: "USearchUBlockDescription",

  props: {
    dataContext: {
      type: Object,
      required: true
    }
  }
}
</script>
