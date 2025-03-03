<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="پلاک آبی"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="تلفن"
          type="number"
          :m="m"
          v-model="value.Base_CommonEstate.Telephone"
          cdcName="Telephone"
          label-width="100px"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت وضع موجود"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="100px"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="100px"
          type="number"
          :m="m"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت باقیمانده"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          label-width="100px"
          type="number"
          :m="m"
        />
      </FormControl>
      <safa-text
        class="col-12"
        label="آدرس"
        m="r"
        v-model="value.Base_AddressInfo.MainAddress"
        cdcName="MainAddress"
        label-width="100px"
      />
    </FormRow>
    <safa-splitter v-model="sp1" vartical>
      <template v-slot:before>
        <fit>
          <safa-grid
            :columns="baseAddressPostCode"
            :m="m"
            v-model="value.Base_AddressPostCode"
            cdcName="Base_AddressPostCode"
            title="کد پستی"
            :selectable="false"
            :emptyRowLimit="1"
            fit
            height="100%"
            max-height="100%"
            ref="baseAddressPostCode"
            :defaultNewRow="defaultNewRow"
          />
        </fit>
      </template>
      <template v-slot:after>
        <safa-splitter v-model="sp2" vartical>
          <template v-slot:before>
            <fit>
              <safa-grid
               :checkboxSelection="true"
                rowSelection='multiple'
                helper="agBaseRegisterPlack"
                :m="m"
                v-model="value.Base_RegisterPlack"
                cdcName="Base_RegisterPlack"
                title="پلاک ثبتی"
                fit
                height="100%"
                max-height="100%"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-grid
                :columns="basePreCodeInfo"
                :m="m"
                v-model="value.Base_PreCodeInfo"
                cdcName="Base_PreCodeInfo"
                title="کد قدیم"
                fit
                height="100%"
                max-height="100%"
              />
            </fit>
          </template>
        </safa-splitter>
      </template>
    </safa-splitter>
    <safa-popup
      title="استعلام کد پستی"
      v-model="showCheckPostCodeModal"
      width="300px"
      height="260px"
    >
      <u-check-post-code
        :baseNosaziCode="baseNosaziCode"
        :settingData="settingData"
        @changeDataAfterAddressEstelam="changeDataAfterAddressEstelam"
      />
    </safa-popup>
  </fit>
</template>

<script>
import UCheckPostCode from "../../check-post-code/UCheckPostCode.vue"
export default {
  name: "TabAddressAndRegisterPlaque",
  components: { UCheckPostCode },
  data () {
    return {
      sp1: 30,
      sp2: 50,
      showCheckPostCodeModal: false,
      params: null,
      baseAddressPostCode: [
        {
          field: "PostCode",
          title: "کدپستی",
          width: "200px",
          validatoins: "number"
        }
      ],
      basePreCodeInfo: [
        {
          field: "PreCode",
          title: "کد قدیم",
          width: "auto"
        }
      ]
    }
  },

  props: {
    m: String,
    baseNosaziCode: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    settingData: {
      type: Object,
      default: () => ({
        Chk_IsCheckSabt: false
      })
    }
  },
  computed: {
    defaultNewRow () {
      return {
        NidBase: this.value._nidBase,
        NidPC: "00000000-0000-0000-0000-000000000000",
        PostCode: ""
      }
    },
    columnGenerateCheckAddress () {
      return {
        field: "",
        title: "استعلام آدرس",
        editor: "action",
        width: "115px",
        btnTitle: "استعلام کدپستی",
        btnColor: "primary",
        btnIcon: "where_to_vote",
        cellRenderer: "agCallbackBtn",
        callback: (params) => this.showCheckPostCodeHandler(params)
      }
    }
  },
  watch: {
    "value.Base_AddressPostCode": {
      handler () {
        const NidPC = this.newGuid()
        this.defaultNewRow = {
          NidBase: this.value._nidBase,
          NidPC,
          PostCode: ""
        }
      },
      deep: true
    },
    settingData: {
      handler () {
        if (this.settingData.Chk_IsCheckSabt === true) {
          // if settingData.Chk_IsCheckSabt is true , we must to show columnGenerateCheckSabt col in grid
          this.addNewColToColumns(
            this.baseAddressPostCode,
            this.columnGenerateCheckAddress,
            1
          )
        }
      },
      immediate: true
    }
  },
  methods: {
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    addNewColToColumns (arr = [], newObj = {}, position = 4) {
      let insertIndex = Math.min(position, arr.length)
      arr.splice(insertIndex, 0, newObj)
    },
    showCheckPostCodeHandler (params) {
      if (!params.hasOwnProperty("uniqueId")) {
        for (let i = 0; i < this.value.Base_AddressPostCode.length; i++) {
          if (!this.value.Base_AddressPostCode[i].uniqueId) {
            this.value.Base_AddressPostCode[i].NidBase =
              this.baseNosaziCode?.NidBase ?? null
            this.value.Base_AddressPostCode[i].uniqueId = this.newGuid()
          }
        }
      }
      if (this.m === "r") {
        return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.")
      }
      this.showCheckPostCodeModal = true
      this.params = params
    },
    changeDataAfterAddressEstelam (postCode) {
      const item = this.value.Base_AddressPostCode.find(
        item => item.uniqueId === this.params.uniqueId
      )
      if (item) {
        item.NidBase = this.value._nidBase ?? null
        item.PostCode = postCode ?? ""
      }
      this.$nextTick(() => {
        this.$refs.baseAddressPostCode.gridApi.refreshCells()
      })
      this.$forceUpdate()
      this.showCheckPostCodeModal = false
    }
  }
}
</script>
