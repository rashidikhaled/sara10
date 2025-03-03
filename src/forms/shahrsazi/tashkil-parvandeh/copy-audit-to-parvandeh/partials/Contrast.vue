<template>
  <fit>
    <safa-status
      :result="result"
    />
    <safa-tabs v-model="currentTab" class="fit" height="100%">
      <template v-slot:tabs>
        <tab-menu
          name="baseUsing"
          label="کاربریها"

        />
        <tab-menu
          name="baseFront"
          label="پیشامدگیها"
        />
        <tab-menu
          name="baseUsingCon"
          label="مغایرت کاربریها"
        />
        <tab-menu
          name="baseFrontCon"
          label="مغایرت پیشامدگیها"
        />
      </template>
      <tab-content name="baseUsing"   :padding="false">
        <tab-base-using v-model="currentData" />
      </tab-content>

      <tab-content name="baseFront" :padding="false">
        <tab-base-front
          v-model="currentData"
          :formKey="formKey"
          :title="title"
          :name="name"
          :baseNosaziCodeAudit="baseNosaziCodeAudit"
        />
      </tab-content>

      <tab-content name="baseUsingCon">
        <tab-base-using-contrast v-model="currentData" />
      </tab-content>

      <tab-content name="baseFrontCon">
        <tab-base-front-contrast v-model="currentData" />
      </tab-content>
    </safa-tabs>

  </fit>
</template>

<script>
import contrastRequestModel from '../models/contrastRequest'
import TabBaseUsing from './TabBaseUsing'
import TabBaseFront from './TabBaseFront'
import TabBaseUsingContrast from './TabBaseUsingContrast'
import TabBaseFrontContrast from './TabBaseFrontContrast'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'Contrast',

  components: {
    TabBaseUsing,
    TabBaseFront,
    TabBaseUsingContrast,
    TabBaseFrontContrast
  },
  mixins: [baseFormMixin],
  props: {
    baseLibInNosaziCodeAudit: Object,
    baseLibInNosaziCodeParvandeh: Object,
    formKey: {
      type: String,
      default: '',
      required: true
    },
    title: {
      type: String,
      default: '',
      required: true
    },
    name: {
      type: String,
      default: '',
      required: true
    },
    baseNosaziCodeAudit: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      result: null,
      currentData: { ...contrastRequestModel },
      currentTab: 'baseUsing'
    }
  },

  methods: {
    async load () {
      this.showLoading()

      try {
        const {
          data
        } = await this.$services.SC.getContrastMomayeziParvandehInfo({
          pNidBaseParvandeh: this.baseLibInNosaziCodeParvandeh['MainObj']
            .NidBase,
          pNidBaseMomayezi: this.baseLibInNosaziCodeAudit['MainObj'].NidBase
        })
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.currentData = this.result

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCodeAudit
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی',
            nosaziCode: strNosaziCode
          })
        } else {
          this.showError('اطلاعات مغایرت بارگذاری نشد')
        }
      } catch (e) {
        console.error(e)
        this.showError('متاسفانه خطایی رخ داده است')
      } finally {
        this.hideLoading()
      }
    }
  },
  created () {
    this.currentData = { ...contrastRequestModel }
  },
  mounted () {
    this.load()
  }
}
</script>
