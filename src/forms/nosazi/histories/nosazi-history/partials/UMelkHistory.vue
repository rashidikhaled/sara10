<template>
  <fit>
    <safa-datatable
      v-model="value.TmpLand"
      :loadingAnimation="false"
      :m="m"
      allowNewRow=true
      cdcName="history"
      fit
      height="100%"
      helper="nosazi.history"
      max-height="100%"
      title="سوابق ملک"
    ></safa-datatable>
  </fit>
</template>

<script>
export default {
  data () {
    return {
      karbarihaItems: [],
      pishAmadegihaItems: [],
      isGoToEdit: true,
      items: [],
      savePrequest: {
        pEng: {
          EngineerInfo_List: null,
          ErrorResult: {
            BizErrors: [],
            Requirements: null
          },
          NidEng: '00000000-0000-0000-0000-000000000000'
        }
      },
      regionItems: [
        { ID: 1, Title: 1 },
        { ID: 2, Title: 2 },
        { ID: 3, Title: 3 },
        { ID: 4, Title: 4 },
        { ID: 5, Title: 5 },
        { ID: 6, Title: 6 }
      ],
      selectedRegion: 1
    }
  },
  props: {
    value: Object,
    m: String
  }
}
</script>
