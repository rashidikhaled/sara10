<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :hasFooter="false" :ignoreTab="true" :title="title" vertical>
      <template #header>
        <safa-status :result="requestResult"/>
      </template>
      <FormRow class="q-mb-sm">
        <!-- <FormControl>
          <safa-combo
            source-type="local"
            :options="districts"
            label="منطقه"
            label-width="80px"
            :use-input="false"
            v-model="selectedRegion"
            cdcName="Region"
          />
        </FormControl> -->
        <FormControl>
          <safa-text
            label="شماره درخواست"
            label-width="80px"
            v-model="nidWorkItem"
            dir="ltr"
            cdcName="nidWorkItem"
          />
        </FormControl>
        <div class="col-auto">
          <btn-search label="جستجو" @click="loadData"/>
        </div>
        <div class="col-auto">
          <nosazi-code-input
            v-model="baseNosaziCode"
            @enter="loadData"
            label="کد نوسازی"
            label-width="80px"
            cdcName="baseNosaziCode"
          />
        </div>
      </FormRow>
      <safa-splitter class="fit" margin="0" horizontal v-model="splitterModel">
        <template v-slot:before>
          <safa-datatable
            title="سوابق اطلاعات درخواست"
            v-model="crossRequestResult.Sh_CrossRequestList"
            helper="officeHistory"
            cdcName="officeHistory"
            height="100%"
            max-height="100%"
            min-height="200px"
            :allowMultipleSelection="false"
            fit
            paginate
            @selectedChange="selectedChange"
          />
        </template>
        <template v-slot:after>
          <UOfficeHistoryTabs v-model="officeHistoryInfo"/>
        </template>
      </safa-splitter>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UOfficeHistoryTabs from './partials/UOfficeHistoryTabs'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: 'history-and-search/office-history',

  data () {
    return {
      title: 'سوابق اطلاعات درخواست اداره کل توسعه شهری',
      formKey: 'A4511368-0170-462D-811D-F12E3A7BBE29',
      name: 'UOfficeHistory',
      main: true,
      sidebarCompatible: true,
      splitterModel: 50,
      loadPrequest: {
        pNidWorkitem: '0',
        pCodeStr: ''
      },
      requestResult: null,
      nidWorkItem: '',
      crossRequestResult: {
        Sh_CrossRequestList: []
      },
      items: [],
      getBaseLibPrequest: {
        pNosaziCode: {
          Apartment: '6',
          Block: '3',
          Building: '5',
          CI_City: '0',
          District: '1',
          EumBaseInfoGroup: '0',
          EumNosaziCodeGroup: '0',
          EumNosaziCodeObjType: '0',
          EumRevisitGroup: '0',
          House: '4',
          Id: 'null',
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          ParentId: 'null',
          Region: '2',
          Shop: '7',
          UserName: 'null'
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: 'false'
      },
      selectedRegion: 1,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nosaziCode: {
        baseNosaziCode: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        }
      },
      officeHistoryInfo: {
        ActionDetailes: '',
        Address: '',
        CI_ActionType: 0,
        CellPhone: '',
        Code: '0',
        CreateDate: '',
        Description: null,
        District: 1,
        GUID: '',
        GlobalID: 'c3e37ddb-d525-4459-b6bc-e6c6f97fc3bf',
        KarbariMosavab: '0',
        KarbariMosavabPriority: 0,
        LayerID: 0,
        Name: '',
        NationalCode: '',
        NidProc: '18d654f5-ef22-4b56-a895-05de4932d53c',
        NidWorkitem: 0,
        NosaziCodeStr: '0-0-0-0-0-0-0',
        OBJECTID: 0,
        PostalCode: '0',
        PreMokatebat: 0,
        RequestType: '5efcf376-e94b-45e5-84d6-6a2d2e704c9a',
        RequesterName: '0'
      }
    }
  },
  mixins: [baseFormMixin],
  components: {
    UOfficeHistoryTabs
  },

  methods: {
    loadData () {
      this.showLoading()
      let payLoad = {
        pNidWorkitem: parseInt(this.nidWorkItem || 0),
        pCodeStr: convertNosaziCodeObjectToString(this.baseNosaziCode)
      }
      this.$services.SC.getCrossRequestByNidWorkitem(payLoad, {
        config: { District: this.baseNosaziCode.District }
      })
        .then(async ({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.crossRequestResult =
              this.requestResult.data
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode
            })
          }
        })
        .catch((error) => {
          console.error(error, 'error')
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (e) {
      this.nosaziCode.baseNosaziCode = this.baseNosaziCode
      this.officeHistoryInfo = e.dataItem
    }
  },
  computed: {
    districts () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('districts')
    }
  }
}
</script>
