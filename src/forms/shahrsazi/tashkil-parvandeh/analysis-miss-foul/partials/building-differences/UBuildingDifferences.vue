<template>
  <safa-form
    :id="formKey"
    :caption="title"
    :padding="false"
  >
    <safa-status :result="result" />
    <fit>
      <div class="q-pl-sm q-py-sm">
        <div class="row q-col-gutter-sm ">
            <safa-combo
              v-model="group1"
              cdcName="group1"
              :options="groupItems"
              label="دسته اول"
              :label-shrink="false"
              source-type="local"
              @input="load"
              class="col-12 col-sm-4 col-md-3"
            />
            <safa-combo
              v-model="group2"
              cdcName="group2"
              :options="groupItems"
              label="دسته دوم"
              :label-shrink="false"
              source-type="local"
              @input="load"
              class="col-12 col-sm-4 col-md-3"
            />
        </div>
      </div>

      <safa-tabs
        v-model="currentTab"
        height="100%"
        class="fit"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            label="کاربری ها"
            name="baseUsing"
          />
          <tab-menu
            label="پیشامدگی ها"
            name="baseFront"
          />
          <tab-menu
            label="مغایریت کاربری ها"
            name="baseUsingContrast"
          />
          <tab-menu
            label="مغایریت پیشامدگی ها"
            name="baseFrontContrast"
          />
        </template>
        <tab-content
          name="baseUsing"
          title="کاربری ها"
          :padding="false"
        >
          <tab-base-using v-model="currentData" />
        </tab-content>
        <tab-content
          name="baseFront"
          title="پیشامدگی ها"
          :padding="false"
        >
          <tab-base-front v-model="currentData" />
        </tab-content>
        <tab-content
          name="baseUsingContrast"
          title="مغایرت کاربری ها"
          :padding="false"
        >
          <tab-base-using-contrast v-model="currentData" />
        </tab-content>
        <tab-content
          name="baseFrontContrast"
          title="مغایرت پیش آمدگی ها"
          :padding="false"
        >
          <tab-base-front-contrast v-model="currentData" />
        </tab-content>
      </safa-tabs>
    </fit>
  </safa-form>
</template>
<script>
import { convertStringToNosaziCodeObject } from 'src/utils/nosaziCodeOperation'
import requestModel from './models/request'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabBaseUsingContrast from './partials/TabBaseUsingContrast'
import TabBaseFrontContrast from './partials/TabBaseFrontContrast'
import baseFormMixin from 'src/mixins/baseFormMixin'
//
export default {
  guid: '',
  mixins: [baseFormMixin],
  components: {
    TabBaseUsing,
    TabBaseFront,
    TabBaseUsingContrast,
    TabBaseFrontContrast
  },

  data () {
    return {
      title: 'مغایرت های ساختمان',
      formKey: '1A7F6340-925F-47E5-AA52-4778A74918D6',
      name: 'UBuildingDifferences',
      loading: false,
      currentTab: 'baseUsing',
      result: null,
      currentData: { ...requestModel },
      group1: null,
      group2: null,
      groupItems: [
        { Id: 0, Title: 'اطلاعات پرونده' },
        { Id: 1, Title: 'بازدید' },
        { Id: 2, Title: 'مجاز پروانه' },
        { Id: 3, Title: 'مجاز پایانکار' },
        { Id: 4, Title: 'کنترل نقشه' },
        { Id: 5, Title: 'موافقت اصولی' }
      ]
    }
  },

  methods: {
    async load () {
      if (this.loading || this.group1 == null || this.group2 == null) {
        return
      }
      if (this.selectedRequest == null) {
        this.showError('هیچ درخواستی در کارتابل انتخاب نشده است.')
        return
      }
      try {
        this.loading = true
        this.showLoading()

        const { data } = await this.$services.SC.getContrastBuilding({
          pNidProc: this.selectedRequest.NidProc,
          pNidNosaziCode: this.selectedRequest.NidNosaziCode,
          pEumBaseInfoGroup_OtherGroup1: this.group1,
          pEumBaseInfoGroup_OtherGroup2: this.group2
        }, { config: { District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode).District } })

        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          this.showError('اطلاعات بارگذاری نشد')
          return
        }
        this.currentData = this.result.data
        // end
      } catch (e) {
        this.serverError()
      } finally {
        this.hideLoading()
        this.loading = false
      }
    }
  },
  created () {
    this.currentData = { ...requestModel }
  }
}
</script>
