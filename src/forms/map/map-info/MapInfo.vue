<template>
  <form-wrapper vertical title="اطلاعات نقشه">
    <safa-status :result="requestResult" />
    <FormRow :xl="3" :lg="3" :md="3" :sm="3">
      <form-control>
        <safa-text
          label="پلاک آبی"
          label-width="60px"
          m="r"
          v-model="loadResult.Base_CommonEstate.Plack"
        />
      </form-control>
      <form-control>
        <safa-text
          label="تلفن"
          m="r"
          v-model="loadResult.Base_CommonEstate.Telephone"
        />
      </form-control>
      <form-control>
        <safa-text
          label="مساحت وضع موجود"
          m="r"
          v-model="loadResult.Base_HouseInfo.CurrentArea"
        />
      </form-control>
    </FormRow>
    <div class="row q-mt-sm">
      <safa-text
        label="آدرس"
        label-width="60px"
        class="col-12"
        type="textarea"
        :rows="1"
        m="r"
        v-model="loadResult.Base_AddressInfo.MainAddress"
      />
    </div>
    <safa-tabs v-model="activeTab" class="q-mt-sm" :padding="false">
      <template v-slot:tabs>
        <tab-menu name="baseEdgeTab" label="جهات اربعه" />
        <tab-menu name="baseShahrsaziArchiveTab" label="سوابق شهرسازی" />
        <tab-menu name="RegisterPlaqueTab" label="پلاک ثبتی و کد پستی" />
        <tab-menu name="baseOwnersTab" label="مالکین" />
      </template>
      <tab-content name="baseEdgeTab">
        <baseEdgeTab :model="loadResult"></baseEdgeTab>
      </tab-content>
      <tab-content name="baseShahrsaziArchiveTab">
        <baseShahrsaziArchiveTab :model="loadResult"></baseShahrsaziArchiveTab>
      </tab-content>
      <tab-content name="RegisterPlaqueTab">
        <RegisterPlaqueTab :model="loadResult"></RegisterPlaqueTab>
      </tab-content>
      <tab-content name="baseOwnersTab">
        <baseOwnersTab :model="loadResult"></baseOwnersTab>
      </tab-content>
    </safa-tabs>

    <template v-slot:footer>
      <btn-default label="گزارش نقشه" @click="report" />
    </template>
  </form-wrapper>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import baseEdgeTab from "./partials/baseEdgeTab.vue"
import baseShahrsaziArchiveTab from "./partials/baseShahrsaziArchiveTab.vue"
import RegisterPlaqueTab from "./partials/RegisterPlaqueTab.vue"
import baseOwnersTab from "./partials/baseOwnersTab.vue"
import mapMixin from "src/mixins/mapMixin"
import { debounce } from "quasar"

export default {
  route: "/parvandeh/change-refresh-code",
  mixins: [baseFormMixin, mapMixin],
  components: {
    baseEdgeTab,
    baseShahrsaziArchiveTab,
    RegisterPlaqueTab,
    baseOwnersTab
  },
  data () {
    return {
      title: "اطلاعات نقشه",
      formKey: "f335fdcd-d000-4877-9c5b-a28685bf2bba",
      name: "MapDetails",
      main: true,
      activeTab: "baseEdgeTab",
      baseNosaziCode: {
        Apartment: "0",
        Block: "0",
        Building: "0",
        CI_City: 0,
        District: "0",
        House: "0",
        Region: "0",
        Shop: "0"
      },
      loadResult: {
        Base_AddressInfo: {
          MainAddress: ""
        },
        Base_CommonEstate: {
          Telephone: "",
          Plack: ""
        },
        Base_HouseInfo: {
          CurrentArea: ""
        },
        Base_Edge: [],
        Base_Owner: [],
        Base_RegisterPlack: [],
        Base_ShahrsaziArchive: [],
        Base_AddressPostCode: []
      },
      requestResult: null
    }
  },
  computed: {
    mapSelectedCode () {
      return this.$store.getters["map/currentCode"]
    }
  },
  methods: {
    loadObj () {
      this.showLoading()
      const code = this.mapSelectedCode
      console.debug('loadobj', code)
      this.baseNosaziCode = convertStringToNosaziCodeObject(code)
      let data = {
        pNosaziCode: {
          Apartment: this.baseNosaziCode.Apartment,
          Block: this.baseNosaziCode.Block,
          Building: this.baseNosaziCode.Building,
          CI_City: 0,
          District: this.baseNosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: this.baseNosaziCode.House,
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_Owner,Base_AddressInfo,Base_Edge,Base_CommonEstate,Base_HouseInfo,Base_RegisterPlack,Base_AddressPostCode,Base_ShahrsaziArchive"
      }
      this.$services.SC.getBaseParvandehInfo(data, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.loadResult = this.requestResult.data.Base_ParvandehInfo
            await this.log({
              action: this.logActions.view,
              bizCode: this.baseNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    report () {
      const reportPath = "/Sara8Reports/RptMapPrint"
      const queryParams = {
        District: this.baseNosaziCode.District,
        NosaziCode: this.convertToNosaziCodeString(this.baseNosaziCode),
        NIdUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
    }
  },
  created () {
    this.loadObj = debounce(this.loadObj, 500)
  },
  watch: {
    mapSelectedCode: {
      handler () {
        this.loadObj()
      },
      immediate: true
    }
  }
}
</script>
