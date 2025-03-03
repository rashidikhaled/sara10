<template>
  <seciont class="row">
    <safa-status :result="result" class="col-12"/>
    <safa-status :result="resultSave" class="col-12"/>

    <q-tabs
      v-model="currentTab"
      active-bg-color="primary"
      active-color="white"
      align="left"
      class="col-12 p-mb-lg"
      dense
    >
      <q-tab
        v-for="({name, title}) in tabs" :key="name"
        :label="title"
        :name="name"
      />
    </q-tabs>

    <q-tab-panels
      v-model="currentTab"
      animated
      class="col-12"
    >
      <q-tab-panel name="baseOwner">
        <TabAddressAndOwner v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseInfo">
        <TabShopInfo v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseArchive">
        <TabArchive v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseUsing">
        <TabBaseUsing v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseFront">
        <TabBaseFront v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseSubscription">
        <TabSubscription v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="baseParking">
        <TabParking v-bind="passedProps"/>
      </q-tab-panel>

      <q-tab-panel name="comments">
        <TabComment v-bind="passedProps"/>
      </q-tab-panel>

    </q-tab-panels>

    <form-actions
      v-if="!readOnly"
      :m="mode"
      class="col-12"
      @cancel="load"
      @edit="isEditable = true"
      @save="save"
    >
      <template #after>
        <q-btn
          color="primary"
          label="کپی به مجاز پایانکار"
          outline
          @click="handleCopyToMojazPayankar"
        ></q-btn>
      </template>
    </form-actions>
  </seciont>
</template>

<script>
import TabAddressAndOwner from './partials/TabAddressAndOwner'
import TabShopInfo from './partials/TabShopInfo'
import TabArchive from './partials/TabArchive'
import TabBaseUsing from './partials/TabBaseUsing'
import TabBaseFront from './partials/TabBaseFront'
import TabSubscription from './partials/TabSubscription'
import TabParking from './partials/TabParking'
import TabComment from './partials/TabComment'
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  name: 'BaseShopInfoParvandehAyani',
  mixins: [baseFormMixin],
  components: {
    TabAddressAndOwner,
    TabShopInfo,
    TabArchive,
    TabBaseUsing,
    TabBaseFront,
    TabSubscription,
    TabParking,
    TabComment
  },

  props: {
    value: Object,
    nosaziCode: Object,
    readOnly: Boolean
  },

  data () {
    return {
      result: null,
      resultSave: null,
      currentTab: 'baseOwner',
      tabs: [
        {
          name: 'baseOwner',
          title: 'آدرس و مالکین'
        },
        {
          name: 'baseInfo',
          title: 'مشخصات'
        },
        {
          name: 'baseArchive',
          title: 'سوابق'
        },
        {
          name: 'baseUsing',
          title: 'نوع استفاده'
        },
        {
          name: 'baseFront',
          title: 'پیشامدگی ها'
        },
        {
          name: 'baseSubscription',
          title: ' امتیازات و اشتراکات'
        },
        {
          name: 'baseParking',
          title: 'پارکینگ و دهانه'
        },
        {
          name: 'comments',
          title: 'توضیحات'
        }
      ]
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.nosaziCode.District
        }
      }
    },
    passedProps () {
      return { value: this.value, m: this.mode }
    }
  },

  methods: {
    handleCopyToMojazPayankar () {
      this.confirm('آیا از کپی اطلاعات به مجاز پایانکار اطمینان دارید؟')
        .onOk(() => {
          this.showSending()
          this.$services.SC.copyToMojazPayankar({
            pFromNidBase: this.nosaziCode.NidBase
          }, {
            config: {
              District: this.nosaziCode.District
            }
          })
            .then(({ data }) => {
              this.result = this.getResponse(data)
              if (this.result.success) {
                this.success('کپی به مجاز پایانکار با موفقیت انجام شد')
              } else {
                this.error('انجام نشد')
              }
            })
            .catch(response => {
              this.result = this.getResponse(response)
              this.error('انجام نشد')
            })
            .finally(() => {
              this.hideLoading()
            })
        })
    },

    async save () {
      try {
        this.showSending()

        const { data } = await this.$services.SC.saveParvandehShop({
          PObj: this.value,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: null,
            WorkflowGuid: '00000000-0000-0000-0000-000000000000'
          }
        }, this.config)
        this.resultSave = this.getResponse(data)
        if (this.resultSave.success) {
          this.success('ذخیره با موفقیت انجام شد')
          this.load()
        } else {
          this.error('انجام نشد')
        }

        // end
      } catch (e) {
        this.error('خطایی در سرویس رخ داد')
      } finally {
        this.hideLoading()
      }
    },
    load () {
      this.isEditable = false
      this.$emit('load')
    }
  }
}
</script>
