<template>
  <FormWrapper :hideTitle="hideTitle" :title="title">
    <fit>
      <safa-splitter v-model="splitterModel">
        <template v-slot:before>
          <fit>
            <div>
              ساختار درختی اطلاعات
            </div>
            <div class="custom-scroll">
              <q-tree
                default-expand-all
                :nodes="infoNodes"
                node-key="Id"
                label-key="Title"
                tick-strategy="leaf"
                :ticked.sync="ticked"
              />
            </div>
          </fit>
        </template>
        <template v-slot:after>
          <safa-tabs
            :padding="false"
            v-model="activeTab"
            class="fit"
          >
            <template v-slot:tabs>
              <tab-menu
                name="momayezi"
                label="اطلاعات ممیزی"
              />
              <tab-menu
                name="parvandeh"
                label="اطلاعات پرونده"
              />

            </template>
            <tab-content name="momayezi">
              <base-house-info-audit
                v-if="selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 2"
                v-model="selectedNosaziCodeAuditObject"
                read-only
                :title="title"
                :formKey="formKey"
                :baseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
              <base-building-info-audit
                v-else-if="selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 3"
                v-model="selectedNosaziCodeAuditObject"
                read-only
                :title="title"
                :formKey="formKey"
                :name="name"
                :baseNosaziCode="baseNosaziCodeAudit"
              />
              <base-apartment-info-audit
                v-else-if="selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 4"
                v-model="selectedNosaziCodeAuditObject"
                read-only
                :title="title"
                :formKey="formKey"
                :baseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
              <base-shop-info-audit
                v-else-if="selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 6"
                v-model="selectedNosaziCodeAuditObject"
                read-only
                :title="title"
                :formKey="formKey"
                :baseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
            </tab-content>
            <tab-content name="parvandeh">
              <base-house-info-parvandeh
                v-if="selectedNosaziCodeParvandehObject.EumNosaziCodeObjType === 2"
                v-model="selectedNosaziCodeParvandehObject"
                read-only
                :title="title"
                :formKey="formKey"
                :baseNosaziCode="baseNosaziCodeAudit"
                :parentBaseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
              <base-building-info-parvandeh
                v-else-if="selectedNosaziCodeParvandehObject.EumNosaziCodeObjType === 3"
                v-model="selectedNosaziCodeParvandehObject"
                read-only
                :title="title"
                :formKey="formKey"
                :baseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
              <base-apartment-info-parvandeh
                v-else-if="selectedNosaziCodeParvandehObject.EumNosaziCodeObjType === 4"
                v-model="selectedNosaziCodeParvandehObject"
                read-only
                :title="title"
                :formKey="formKey"
                :baseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
              <base-shop-info-parvandeh
                v-else-if="selectedNosaziCodeParvandehObject.EumNosaziCodeObjType === 6"
                v-model="selectedNosaziCodeParvandehObject"
                read-only
                :title="title"
                :formKey="formKey"
                :parentBaseNosaziCode="baseNosaziCodeAudit"
                :name="name"
              />
            </tab-content>
          </safa-tabs>
        </template>
      </safa-splitter>
    </fit>
    <template v-slot:footer>
      <div class="row q-gutter-sm">
        <btn-default
          label="کپی اطلاعات"
          @click="handleCopy"
        />
      </div>
    </template>
  </FormWrapper>
</template>

<script>
import infoGroups from '../models/infoGroups'
import BaseHouseInfoParvandeh from '../../base-house-info-parvandeh/BaseHouseInfoParvandeh.vue'
import BaseBuildingInfoParvandeh from '../../base-building-info-parvandeh/BaseBuildingInfoParvandeh.vue'
import BaseApartmentInfoParvandeh from '../../base-apartment-info-parvandeh/BaseApartmentInfoParvandeh.vue'

import BaseShopInfoParvandeh from '../../base-shop-info-parvandeh/BaseShopInfoParvandeh.vue'

import BaseHouseInfoAudit from '../../tashkil-parvandeh-audit/BaseHouseInfoAudit/BaseHouseInfoAudit'
import BaseBuildingInfoAudit from '../../tashkil-parvandeh-audit/BaseBuildingInfoAudit/BaseBuildingInfoAudit'
import BaseApartmentInfoAudit from '../../tashkil-parvandeh-audit/BaseApartmentInfoAudit/BaseApartmentInfoAudit'

import BaseShopInfoAudit from '../../tashkil-parvandeh-audit/BaseShopInfoAudit/BaseShopInfoAudit'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  name: 'CopyInformation',

  components: {
    BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseShopInfoParvandeh,
    BaseHouseInfoAudit,
    BaseBuildingInfoAudit,
    BaseApartmentInfoAudit,
    BaseShopInfoAudit
  },
  mixins: [baseFormMixin],
  props: {
    baseLibInNosaziCodeAudit: Object,
    baseLibInNosaziCodeParvandeh: Object,
    hideTitle: Boolean,
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
      result2: null,
      result3: null,
      infoSplitter: 50,
      splitterModel: 20,
      ticked: [],
      infoGroups,
      activeTab: 'momayezi'
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedNosaziCodeAuditObject.District
        }
      }
    },
    infoNodes () {
      return (
        (this.infoGroups &&
          this.infoGroups[this.selectedNosaziCodeAuditObject.EumNosaziCodeObjType]) ||
        []
      )
    },
    selectedNosaziCodeAuditObject () {
      return (
        (this.baseLibInNosaziCodeAudit &&
          this.baseLibInNosaziCodeAudit['MainObj']) ||
        {}
      )
    },
    selectedNosaziCodeParvandehObject () {
      return (
        (this.baseLibInNosaziCodeParvandeh &&
          this.baseLibInNosaziCodeParvandeh['MainObj']) ||
        {}
      )
    },
    isLoadingParvandeh () {
      return (
        this.selectedNosaziCodeAuditObject.EumNosaziCodeObjType &&
        !this.selectedNosaziCodeParvandehObject.EumNosaziCodeObjType
      )
    }
  },
  methods: {
    handleCopy () {
      if (!this.ticked || !this.ticked.length) {
        this.showError('لطفا ساختار درختی اطلاعات را مشخص نمایید')
        return
      }
      this.showConfirm('آیا از کپی اطلاعات اطمینان دارید؟').onOk(() => {
        this.showLoading()
        this.$services.SC.copyMomayeziBaseInfoToParvandeh(
          {
            pNidBaseFrom: this.selectedNosaziCodeAuditObject.NidBase,
            pNidBaseTo: this.selectedNosaziCodeParvandehObject.NidBase,
            pNidNosaziCodeTo: this.selectedNosaziCodeAuditObject.NidNosaziCode,
            pEumBaseInfoGroupTo: 0,
            pEumRevisitGroupTo: 0,
            pNidRevisitTo: '00000000-0000-0000-0000-000000000000',
            pTableNames: this.ticked.join(',')
          },
          this.config
        )
          .then(async ({ data }) => {
            const result = this.getResponse(data)
            if (result.success) {
              this.showSuccess('عملیات با موفقیت انجام شد')

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: 'کد نوسازی',
                nosaziCode: strNosaziCode
              })
            } else {
              this.showError('عملیات ناموفق بود')
            }
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
