<template>
  <safa-form
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
    caption="شهرسازی- کارتابل نامه ها"
  >
    <form-wrapper :hasFooter="false" title="کارتابل نامه ها" vertical>
      <fit>
        <div class="q-mb-sm">
          <div class="row q-col-gutter-md items-center">
            <div class="col-12 col-sm-4">
              <safa-combo :label-shrink="false" cdcName="Group" label="گروه"/>
            </div>
            <div class="col-auto">
              <btn-default label="بازآوری "/>
            </div>
          </div>
        </div>
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="نامه های در انتظار تأیید" name="waitLetterTab"/>
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
            <LetterKartablWait :formKey="formKey" :name="name" :title="title"/>
          </tab-content>
          <tab-content
            :padding="false"
            name="acceptedLetterTab"
            title="نامه های تایید شده توسط شما"
          >
            <LetterKartablAccept
              :formKey="formKey"
              :name="name"
              :title="title"
            />
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import LetterKartablWait from './partials/LetterKartablWait.vue'
import LetterKartablAccept from './partials/LetterKartablAccept.vue'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  route: '/archive/letter-kartabl',
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: 'شهرسازی- کارتابل نامه ها',
      // formKey: '98ce9a35-13ad-49a2-bb69-97ce8708f537',
      formKey: '52fe47eb-16f5-46c6-a510-e44350f9c137',
      name: 'LettersKartabl',
      activeTab: 'waitLetterTab',
      main: true
    }
  },
  methods: {},
  components: {
    LetterKartablWait,
    LetterKartablAccept
  }
}
</script>
