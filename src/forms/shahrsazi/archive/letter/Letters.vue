<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- نامه های صادر شده"
  >
    <form-wrapper
      :hasFooter="false"
      title="نامه ها"
      vertical
    >
      <fit>
        <div class="q-mb-sm">
          <div class="row q-col-gutter-md items-center">
            <!-- <safa-combo
            label="گروه"
            :label-shrink="false"
            ci-name="CI_OtherEquipmentGroup"
            domain-name="CI_SaraM1"
            class="col-12 col-sm-3"
          /> -->
            <safa-combo
              v-model="selectedValue"
              :label-shrink="false"
              :options="items"
              cdcName="Group"
              class="col-12 col-sm-3"
              label="گروه"
              source-type="local"
            />
            <div class="col-auto">
              <btn-default label="بازآوری "/>
            </div>
          </div>
        </div>
        <safa-tabs
          v-model="activeTab"
          height="100%"
        >
          <template v-slot:tabs>
            <tab-menu
              label="نامه های در انتظار تأیید"
              name="waitLetterTab"
            />
            <tab-menu
              label="نامه های تأیید شده توسط شما"
              name="acceptedLetterTab"
            />
          </template>
          <tab-content
            :padding="false"
            name="waitLetterTab"
            title="نامه های در انتظار تایید"
          >
            <LetterWait/>
          </tab-content>
          <tab-content
            :padding="false"
            name="acceptedLetterTab"
            title="نامه های تایید شده توسط شما"
          >
            <LetterAccept/>
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>

</template>
<script>
import LetterWait from './partials/LetterWait.vue'
import LetterAccept from './partials/LetterAccept.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/letters',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'نامه ها',
      // formKey: "F0E401C4-C0E9-4863-BC90-048D66F8177B",
      formKey: '5e0dcb67-f657-4b4e-afdd-24e9ec7fcbc8',
      name: 'Letters',
      activeTab: 'waitLetterTab',
      main: true,
      envelopeResult: [],
      items: [
        {
          ID: '0',
          Title: 'همه'
        },
        {
          ID: '1',
          Title: 'AAA'
        },
        {
          ID: '2',
          Title: 'BBB'
        },
        {
          ID: '3',
          Title: 'CCC'
        }
      ],
      selectedValue: 'همه'
    }
  },
  methods: {
    load () {
      let data = {}
      // this.showLoading()
      this.$services.ReportRule.envelope(data) // .این سرویس در سرا 8 مشکل دارد . خروجی ایکس ام ال میدهد
        .then((data) => {
          this.envelopeResult = this.getResponse(data)
          console.log(this.envelopeResult)
        })
        .catch((e) => {
          console.log(e, 'catch_Error')
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  components: {
    LetterWait,
    LetterAccept
  },
  mounted () {
    this.load()
  }
}
</script>
