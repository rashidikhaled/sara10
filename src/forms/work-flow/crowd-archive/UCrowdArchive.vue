<!-- این فرم کامل نیست در حال هماهنگی با بک اند هستم -->
<template>
    <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="آرشیو جمع سپاری"
  >
  <ArchiveWrap
      :name="archiveConfig.username"
      :pass="archiveConfig.password"
      :biz-code="archiveBizCode"
    ></ArchiveWrap>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'
export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: 'آرشیو شهروندسپاری', // طی جلسه ای که داشتم با آقای خوش آیین نیازی به این آرشیو نیست اما هنوز شهر مربوطه قانع نشده که فرم تکمیل بشه  // https://trello.com/c/1mf5CUah
      formKey: '501B42CD-CCCE-4AFE-AFE9-539E51F5B1A3',
      name: 'UCrowdArchive',
      main: true,
      workflowCompatible: true,

      // var
      archiveBizCode: null
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveUGP')
    }
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      this.archiveBizCode = bizCode
    }
  }

}
</script>
