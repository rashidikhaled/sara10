<template>
  <safa-form :id="formKey" :caption="title" app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <form-wrapper :title="title">
      <template #header>
        <!-- <safa-status :result="generalArchiveResult" /> -->
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          @fetched="fetched"
        />
      </template>
      <fit>
        <!-- <FormRow>
          <FormControl>
            <safa-text
              label="نام مالک"
              label-width="50px"
              class="col-12 col-md-2"
              v-model="model.fullname"
              dir="rtl"
              m="r"
              cdcName="fullname"
            ></safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label-width="50px"
              label="آدرس"
              class="col-12 col-md-12"
              v-model="model.address"
              dir="rtl"
              m="r"
              cdcName="address"
            ></safa-text>
          </FormControl>
          <FormControl>
            <safa-text
              label-width="50px"
              label="کد قدیم"
              class="col-12 col-md-2"
              v-model="model.oldCode"
              dir="ltr"
              m="r"
              cdcName="oldCode"
            ></safa-text>
          </FormControl>
        </FormRow> -->
        <!-- <q-seperator class="q-my-sm" /> -->
        <safa-splitter
          v-model="gridSplitter"
          :limits="splitterLimit"
          class="fit"
          vertical
        >
          <template v-slot:before>
            <fit>
              <q-tree
                ref="tree"
                :nodes="generalArchive"
                children-key="Childs"
                class="bordered"
                default-expand-all
                label-key="ArchiveGroup"
                node-key="NodeId"
                selected-color="primary"
              >
              </q-tree>
            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <ArchiveWrap
                :name="archiveConfig.username"
                :pass="archiveConfig.password"
                :biz-code="archiveBizCode"
              />
            </fit>
          </template>
        </safa-splitter>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      name: 'UGeneralArchive',
      title: 'آرشیو جامع',
      formKey: '67F7A4E9-A2B2-4545-BFF8-37C4403B117F',
      main: true,
      generalArchiveResult: [],
      splitterLimit: [20, 100],
      gridSplitter: 20,
      expansionState: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        fullname: null,
        oldCode: null,
        address: null
      },
      generalArchive: [],
      requestResult: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      archiveListResult: null,
      showArchive: true,
      archiveBizCode: ''
    }
  },
  mounted () {
    this.loadList()
  },
  methods: {
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
    },
    map (data) {
      this.model.fullname =
        data.Base_Owner[0].OwnerName + ' ' + data.Base_Owner[0].OwnerLastName
      this.model.address = data.Base_AddressInfo.MainAddress
      this.model.oldCode = data.Base_PreCodeInfo.PreCode
    },
    fetched () {
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
          IsRoot: 'false',
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo',
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)
          if (this.requestResult.success) {
            this.map(this.requestResult.data)
            this.baseLibResults = this.requestResult.data
          }
        })
        .catch((response) => {
          this.workflowListResult = this.getResponse(response)
          // console.log("error", response);
          // this.serverError();
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    loadList () {
      // this.generalArchive = [];
      // this.childTree = null;
      // this.childTree = res.data["ChildTree"] || [];
      // const isValid = !!this.childTree.length;
      // if (isValid) {
      //   this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree);
      // } else {
      //   this.showError("کد نوسازی معتبر نمیباشد");
      // }
      debugger
      this.showLoading()
      // this.baseNosaziCode = convertNosaziCodeObjectToString(
      //   this.selectedRow.NosaziCode
      // );
      const payload = {
        pNosaziCode: {
          Apartment: 2,
          Block: 76,
          Building: 1,
          CI_City: 0,
          District: 1,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: 10,
          Id: '',
          IsRoot: false,
          NidBase: '00000000-0000-0000-0000-000000000000',
          NidNosaziCode: '00000000-0000-0000-0000-000000000000',
          NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
          NidRevisit: '00000000-0000-0000-0000-000000000000',
          NidUser: '00000000-0000-0000-0000-000000000000',
          ParentId: '',
          Region: 4,
          Shop: 0,
          UserName: ''
        },
        pLoadFunc: 'Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str',
        pIsLoadDeletedNosaziCode: false
      }
      debugger
      this.$services.SA.getBaseLibInNosaziCode(payload)
        .then(({ data }) => {
          this.archiveListResult = this.getResponse(data)
          debugger
          if (this.archiveListResult.success) {
            this.generalArchive =
              this.createNosaziCodeTree(
                this.archiveListResult.data.ChildTree
              )
            debugger
          }
        })
        .catch((err) => this.showError(err))
        .finally(() => this.hideLoading())

      debugger
      // console.log(typeof this.baseNosaziCode);
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('archiveCore')
    }
  }
}
</script>
