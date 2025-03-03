<template>
  <safa-form app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b" :id="formKey" :caption="title">
    <!-- <div> -->
    <form-wrapper :title="title">
      <template #header>
        <form-header-by-nosazi-code v-model="baseNosaziCode" @fetched="fetchedData" />
        <safa-status :result="baseLibResult" />
        <safa-status :result="result" />
        <safa-status :result="childTreeResult"></safa-status>
      </template>
      <fit>

        <safa-splitter
          v-model="verticalSplitter"
          :horizontal="$q.screen.lt.lg"
          :limits="[36, 50]"
          class="fit"
        >
        <template v-slot:before>
              <fit>
                <div class="q-pa-sm">
                  <q-toolbar :class="[
                      'items-center q-px-sm q-py-xs',
                      $q.dark.isActive ? 'bg-dark' : 'bg-grey-3',
                    ]" style="min-height: 34px; border-radius: 3px">
                    <q-toolbar-title class="text-body2">ساختار درختی
                    </q-toolbar-title>
                    <div class="flex q-gutter-x-sm items-center">
                      <safa-text v-model="treeFilter" dir="ltr" class="text-right" label="فیلتر"></safa-text>
                      <btn-default @click="$refs.tree.collapseAll()">جمع کردن گره ها
                      </btn-default>
                      <btn-default @click="$refs.tree.expandAll()">باز کردن گره ها
                      </btn-default>
                    </div>
                  </q-toolbar>
                </div>
                <div class="">
                  <div class="q-px-sm">
                    <q-tree ref="tree" :nodes="nosaziCodeTrees" :selected.sync="selectedNosaziCode" default-expand-all
                      fit height="100%" label-key="nosaziCodeString" max-height="100%" min-height="100px"
                      node-key="nosaziCodeString" selected-color="primary" @update:selected="handleNosaziCodeSelected">
                    </q-tree>
                  </div>
                </div>
              </fit>
            <!-- <internal-section class="full-height"> -->
            </template>
      <template v-slot:after>
            <fit>
              <internal-section>
                <div class="q-col-gutter-sm">
                  <safa-combo v-model="entryCause" :label-shrink="false" cdcName="entryCause" ciName="CI_BlackListCause"
                    domainName="CI_SaraM1" label="علت ورود به لیست سیاه" label-width="142px"></safa-combo>
                  <safa-combo v-model="selectedStatus" :label-shrink="false" :options="statusList"
                    cdcName="selectedStatus" label="نوع کنترل" label-width="142px" sourceType="local"></safa-combo>
                  <text-template v-model="comments" :fit="false" :label-shrink="false" :rows="3" cdcName="comments"
                    formKey="AD4A254F-0211-424B-AC05-5C67AE50B172" label="توضیحات خروج از لیست سیاه"
                    labelWidth="142px" />
                </div>
              </internal-section>
              <safa-datatable ref="grid2" v-model="gridResults.Sh_WorkflowList" :allowMultipleSelection="true"
                :allowNewRow="false" :allowReload="false" :allowRemoveRow="false" :allow-copy="false"
                :hide-header="true" :paginate="false" :show-selected-checkbox="true" cdcName="sendGroupBlackList" fit
                height="100%" helper="sendGroupBlackList" margin="0" max-height="100%" min-height="100px"
                title="درخواست های مجاز" @selectedChange="selectedChange">
              </safa-datatable>
            </fit>
          </template>
        </safa-splitter>
      </fit>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-default label="ارسال" @click="getNosaziCodeInBlackList">
          </btn-default>
          <btn-cancel label=" انصراف" @click="cancle" />
        </div>
      </template>
    </form-wrapper>
  </safa-form>
  <!-- </div> -->
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  route: "/black-list/SendGroupToBalckList",
  mixins: [baseFormMixin],
  data: function () {
    return {
      title: "ارسال گروهی به لیست سیاه",
      formKey: "AD4A254F-0211-424B-AC05-5C67AE50B172",
      name: "SendGroupToBalckList",
      main: true,
      sidebarCompatible: true,
      entryCause: 0,
      verticalSplitter: 30,
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
      ownerName: "",
      oldNosaziCode: "",
      result: null,
      results: {},
      tabs: [
        {
          name: "tree",
          label: "ساختار درختی",
          persist: true
        }
      ],
      currentTab: "tree",
      statusList: [
        { ID: 0, Title: "هشدار" },
        { ID: 1, Title: "توقف" },
        { ID: 2, Title: "توقف صدور" }
      ],
      selectedStatus: 0,
      gridResult: null,
      gridResults: { Sh_WorkflowList: [] },
      childTreeResult: null,
      childTreeResults: { ChildTree: [] },
      nosaziCodeTrees: [],
      // selectedNosaziCode: '',
      selectedNosaziCodeObject: { children: [] },
      nosaziCodeGuidArray: [],
      nosaziCodeResults: { NosaziCodeInBlackList: [] },
      nosaziCodeResult: null,
      selectedRow: {},
      selectedRows: [],
      shBlackListArray: [],
      comments: "",
      test: [],
      ticked: []
    }
  },
  computed: {
    shBlackList () {
      let shBlackListObj = {}
      for (var i = 0; i < this.selectedNosaziCodeObject.children.length; i++) {
        shBlackListObj = {
          CI_BlackListCause: this.entryCause,
          Domain: "Sara8",
          EnterComments: this.comments,
          EnterDate: "",
          EnterTime: "",
          EumBlackListControl: this.selectedStatus,
          EumBlackListStatus: 0,
          ExitComments: "",
          ExitDate: "",
          ExitTime: "",
          NidBlack: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode:
            this.selectedNosaziCodeObject.children[i].NidNosaziCode,
          NidUserEnter: this.getNidUser(),
          NidUserExit: "00000000-0000-0000-0000-000000000000",
          UserEnter: this.getUserDisplayName(),
          UserExit: ""
        }
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.shBlackListArray.push(shBlackListObj)
      }
      return this.shBlackListArray
    }
  },
  methods: {
    fetchedData (value) {
      this.nosaziCode = value._NidNosaziCode
      this.loadWorkFlow()
    },

    loadWorkFlow () {
      this.$services.SA.loadWorkflowList({})
        .then(async ({ data }) => {
          this.gridResult = this.getResponse(data)
          if (this.gridResult.success) {
            this.gridResults = this.gridResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          this.gridResult = this.getResponse(response)
          this.showError(" انجام نشد")
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getChildTree () {
      this.isEditable = true
      let self = this
      let payload = {
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
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc: "ChildTree",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(payload)
        .then(async ({ data }) => {
          self.childTreeResult = this.getResponse(data)

          if (self.childTreeResult.success) {
            self.childTreeResults = self.childTreeResult.data
            this.nosaziCodeTrees =
              this.createNosaziCodeTree(this.childTreeResults.ChildTree) ?? []

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })
          }
        })
        .catch((response) => {
          self.childTreeResult = this.getResponse(response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
          this.$refs.tree.expandAll()
        })
    },
    handleNosaziCodeSelected () {
      // console.log('selectedNosaziCode', this.selectedNosaziCode)
      this.selectedNosaziCodeObject = this.getNodeByKey(
        this.selectedNosaziCode
      )
    },
    cancle () {
      this.exitBlackList = true
      this.$emit("backToBlackListForm", this.exitBlackList)
    },
    getNodeByKey (key) {
      return this.$refs.tree && this.$refs.tree.getNodeByKey(key)
    },
    getNosaziCodeInBlackList () {
      this.test = this.shBlackListArray
      for (var i = 0; i < this.selectedNosaziCodeObject.children.length; i++) {
        this.nosaziCodeGuidArray.push(
          this.selectedNosaziCodeObject.children[i].NidNosaziCode
        )
      }
      let payload = { pNidNosaziCode: this.nosaziCodeGuidArray }
      this.$services.SA.getNosaziCodeListInBlackList(payload)
        .then(async ({ data }) => {
          this.nosaziCodeResult = this.getResponse(data)
          if (this.nosaziCodeResult.success) {
            this.nosaziCodeResults = this.nosaziCodeResult.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی"
            })

            if (this.nosaziCodeResults.NosaziCodeInBlackList.length > 0) {
              this.showError("یکی ار کدهای نوسازی در لیست سیاه وجود دارد.")
            } else {
              this.sendToBlackList()
            }
          }
        })
        .catch((response) => {
          this.nosaziCodeResult = this.getResponse(response)
          this.showError(" انجام نشد")
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    sendToBlackList () {
      let payload = {
        pBlack: this.shBlackList,
        pBlackWorkflow: this.selectedRows
      }
      this.$services.SA.sendGroupToBlackList(payload)
        .then(async ({ data }) => {
          this.sendResult = this.getResponse(data)
          if (this.sendResult.success) {
            this.sendResults = this.sendResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: "کد نوسازی"
            })
            this.showSuccess("کد نوسازی با موفقیت به لیست سیاه افزوده شد.")
            this.redirectToKartable()
          }
        })
        .catch((response) => {
          this.sendResult = this.getResponse(response)
          this.showError(" انجام نشد")
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    selectedChange (selectedItems) {
      this.selectedRows = selectedItems.selectedItems
    }
  },
  mounted () { }
}
</script>
