<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      vertical
      title="پیش فروش آپارتمان"
      :padding="false"
    >

      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetcheData"
          @enter="handleBaseNosaziCodeChanged2"
        />
        <safa-status :result="baseLibResult" />
        <safa-status :result="apartmentResult" />
      </template>
      <safa-tabs
        ref="safaTabs"
        v-model="activeTab"
        :padding="false"
        :bordered="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="showApartmentTab"
            label=" آپارتمان های پیش فروش شده"
          />
          <tab-menu
            name="showOwnerShipTab"
            label="اطلاعات مالکیت"
            v-show="isShowOwnershipTab"
          />
        </template>
        <tab-content
          name="showApartmentTab"
          title=" آپارتمان های پیش فروش شده"
        >
          <ApartmentInfo
            :apartmentResults="apartmentResults"
            @showOwnershipTabMethod="showOwnershipTabMethod"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="ApartmentInforef"
          />
        </tab-content>
        <tab-content
          name="showOwnerShipTab"
          v-if="isShowOwnershipTab"
          title="اطلاعات مالکیت"
        >
          <OwnershipInfoTab
            :selectedItem="selectedItem"
            v-if="isShowOwnershipTab"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
            ref="OwnershipInfoTabref"
            :m="mode"
            @saveDone="isEditable=false"
          />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>

        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          :showEditButton="activeTab!=='showApartmentTab'"
          @save="save"
        >

          <btn-default
            label="اطلاعات تشکیل پرونده عرصه"
            @click="tashkiParvandeInfo"
          />
          <btn-default
            label="ثبت خریدار"
            @click="registerOwner"
            v-if="activeTab!=='showApartmentTab'"
          />
        </FormActions>
      </template>

    </form-wrapper>
  </safa-form>
</template>
<script>
import ApartmentInfo from './partials/ApartmentInfo'
import OwnershipInfoTab from './partials/OwnershipInfoTab'
import baseFormMixin from 'src/mixins/baseFormMixin'
import loaderMixin from 'src/mixins/loaderMixin'
export default {
  route: '/ownership-info',
  mixins: [baseFormMixin, loaderMixin],
  main: true,
  data: function () {
    return {
      title: 'پیش فروش آپارتمان',
      formKey: '990504D7-CF02-4CC9-B20B-4FB6FC5C64D1',
      name: 'OwnerShipInfo',
      main: true,
      activeTab: 'showApartmentTab',
      isShowOwnershipTab: false,
      isShowModal: false,
      ownershipForm: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {},
        Sh_RequestInfo: {}
      },
      ownerName: '',
      oldNosaziCode: '',
      nosaziCode: '',
      apartmentResult: null,
      apartmentResults: {
        Sh_ApartmentEarlySold_List: [],
        NosaziCode_House: {}
      },
      parvandeHoseResult: null,
      parvandeHoseResults: {
        Base_AddressPostCode: [],
        Base_PreCodeInfo: [],
        Base_File: [],
        Base_RegisterPlack: [],
        Base_CommonEstate: {},
        Base_Owner: [],
        Base_Edge: [],
        Base_Door: [],
        Base_Wall: [],
        Base_Scuttle: [],
        Base_Bezel: [],
        Base_Neighbor: [],
        Base_GreenSpace: [],
        Base_OtherEquipment: [],
        Base_MultiBuilding: []
      },
      selectedItem: null
    }
  },
  components: {
    ApartmentInfo,
    OwnershipInfoTab
  },
  methods: {
    load () {
      this.showLoading()
      // GetSh_ApartmentEarlySold_List method
      let apartentData = {
        pNidNosaziCode_Building: this.nosaziCode,
        pNidProc: 'b5c11c05-4b79-4fe4-8eab-e01a8ea6c9a0'
      }

      this.$services.SC.getShApartmentEarlySoldList(apartentData)
        .then(async ({ data }) => {
          this.apartmentResult = this.getResponse(data)
          if (this.apartmentResult.success) {
            this.apartmentResults = this.apartmentResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.nosaziCode,
              bizCodeTitle: 'NosaziCode',
              nosaziCode: this.nosaziCode
            })
          }
        })
        .catch(er => {
          // console.log('//////////', er)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    tashkiParvandeInfo () {
      this.$refs.ApartmentInforef.tashkiParvandeInfo()
    },
    registerOwner () {
      this.$refs.OwnershipInfoTabref.register()
    },
    fetcheData (value) {
      this.nosaziCode = value._NidNosaziCode
      this.load()
    },
    showOwnershipTabMethod (value) {
      this.activeTab = 'showOwnerShipTab'
      this.selectedItem = value
      this.isShowOwnershipTab = true
    },
    save () {
      this.$refs.OwnershipInfoTabref.save()
    }
  }
}
</script>
