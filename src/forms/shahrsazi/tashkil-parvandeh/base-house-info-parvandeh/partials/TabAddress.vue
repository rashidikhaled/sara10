<template>
  <fit>
    <FormRow class="q-mb-sm">
      <FormControl>
        <safa-text
          label="پلاک آبی"
          :m="m"
          v-model="value.Base_CommonEstate.Plack"
          cdcName="Plack"
          type="number"
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
          :rules="[
            (x) => x.length < 12 || 'تعداد کاراکترهای وارد شده مجاز نمی باشد.',
          ]"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت وضع موجود"
          v-model="value.Base_HouseInfo.CurrentArea"
          cdcName="CurrentArea"
          label-width="100px"
          :m="m"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت پس از رعایت بر اصلاحی"
          v-model="value.Base_HouseInfo.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label-width="100px"
          :m="m"
          type="number"
        />
      </FormControl>
      <FormControl>
        <safa-text
          label="مساحت باقیمانده"
          v-model="value.Base_HouseInfo.RemainArea"
          cdcName="RemainArea"
          label-width="100px"
          :m="m"
          type="number"
        />
      </FormControl>
      <safa-text
        class="col-12"
        label="آدرس"
        :m="m"
        v-model="value.Base_AddressInfo.MainAddress"
        cdcName="MainAddress"
        label-width="100px"
      />
    </FormRow>
    <safa-splitter v-model="sp1" vartical>
      <template v-slot:before>
        <fit>
          <safa-grid
            title="کد پستی"
            v-model="value.Base_AddressPostCode"
            cdcName="Base_AddressPostCode"
            :columns="baseAddressPostCode"
            fit
            :m="m"
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
                fit
                helper="baseFile"
                :m="m"
                v-model="value.Base_File"
                cdcName="Base_File"
                title="شماره شناسایی پرونده"
                height="100%"
                max-height="100%"
                margin="0"
              />
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <!-- طبق این تسک کد قدیم باید استرینگ باشه عوض نشه لطفا  https://trello.com/c/VYxC1z7c -->
              <safa-grid
                fit
                helper="agBasePreCodeInfo"
                :m="m"
                v-model="value.Base_PreCodeInfo"
                cdcName="Base_PreCodeInfo"
                title="کد قدیم"
                height="100%"
                max-height="100%"
                margin="0"
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
  components: { UCheckPostCode },
  name: "TabAddress",
  data () {
    return {
      sp1: 30,
      sp2: 50,
      showCheckPostCodeModal: false,
      params: null,
      baseAddressPostCode: [
        {
          field: 'isSelectedNode',
          title: '',
          width: '74px',
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: 'right',
          editor: 'selection'
        },
        {
          field: "PostCode",
          title: "کدپستی",
          width: "200px",
          validatoins: "number"
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
    changeDataAfterAddressEstelam (estelam) {
      const item = this.value.Base_AddressPostCode.find(
        item => item.uniqueId === this.params.uniqueId
      )
      if (item) {
        item.NidBase = this.value._nidBase ?? null
        item.PostCode = estelam.PostCode ?? ""
      }
      this.$nextTick(() => {
        this.$refs.baseAddressPostCode.gridApi.refreshCells()
      })
      this.value.Base_AddressInfo.MainAddress = estelam.Address
      this.$forceUpdate()
      this.showCheckPostCodeModal = false
    }
  }
}
</script>
