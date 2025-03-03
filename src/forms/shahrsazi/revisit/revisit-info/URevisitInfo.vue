<template>
  <safa-form
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title" :padding="false">
      <template #header>
        <safa-status :result="loadRequestHeaderRes" />
        <safa-status :result="getRevisitListRes" />
        <safa-status :result="getAssignRevisitInfoRes" />
        <safa-status :result="copyRevisitToRevisitRes" />
        <safa-status :result="copyParvandehToRevisitRes" />
        <safa-status :result="updateLastRequestStateRes" />
        <!-- <form-header-by-nosazi-code
          :taskInfo="taskInfo"
          enabled="0-0-0-0-0-0-0"
          v-model="baseNosaziCode"
          @fetched="fetched"
        />-->
        <div class="backButton">
          <q-btn
            v-if="placeholder !== 'default'"
            flat
            size="12px"
            color="primary"
            @click="changePlaceholder('default')"
          >
            بازگشت&nbsp;
            <q-icon name="keyboard_arrow_left" />
          </q-btn>
        </div>
      </template>

      <safa-tabs
        v-if="placeholder === 'default'"
        v-model="currentTab"
        :bordered="false"
        :padding="false"
        class="fit"
        height="100%"
      >
        <template v-slot:tabs>
          <tab-menu label="بازدید" name="tree_tab" />
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :label="title"
            :name="name"
            closable
            @close="handleCloseTab(name)"
          />
          <tab-menu
            v-if="isShowArchiveTab"
            closable
            label="آرشیو الکترونیکی"
            name="archive"
            @close="closeArchiveTab"
          />
          <tab-menu
            name="archiveTablet"
            label="آرشیو تبلت"
            v-if="isShowArchiveTabletTab"
            closable
            @close="closeArchiveTabletTab"
          />
        </template>

        <tab-content name="tree_tab">
          <fit>
            <div class="revisit-tiles-list flex items-center">
              <div
                v-for="(node, i) in nosaziCodeTrees"
                :key="i"
                class="q-px-md revisit-tile cursor-pointer q-col-gutter-x-sm q-ma-sm flex items-center no-wrap"
                :class="{
                  'is-selected':
                    selectedNosaziCodeStr === node.nosaziCodeString,
                }"
                @click="handleTreeClick(node)"
                @dblclick="handleTreeDblClick(node)"
              >
                <div class="rvs-content col">
                  <div class="rvs-label">بازدید {{ node.name }}</div>
                  <div class="rvs-nosazicode">
                    <q-icon
                      :name="`${node.icon}`"
                      size="20px"
                      style="
                        width: 26px;
                        height: 26px;
                        margin-left: 10px;
                        color: var(--q-color-primary);
                      "
                    />
                    {{ node.nosaziCodeString }}
                  </div>
                </div>
              </div>
            </div>

            <safa-datatable
              id="39d0b0ec-88a8-4819-a9bf-d4d35d6d1d1d"
              v-model="assignRevisitInfo.Revisits_AllRequest"
              class="q-pa-sm"
              fit
              height="100%"
              helper="revisitListInNosaziCode"
              max-height="100%"
              title="کارشناسانی که این ملک را بازدید کرده اند"
              @dbclick="handleGridDblClick"
              @parvandehCopyClick="handleParvandehCopy"
              @revisitCopyClick="handleRevisitCopy"
              @selectedChange="handleSelectedRevisitChangedOnGrid"
            />
          </fit>
        </tab-content>

        <tab-content
          v-for="tab in tabs"
          :key="tab.name"
          :ref="tab.name"
          :name="tab.name"
        >
          <base-house-info-revisit
            v-if="tab.EumNosaziCodeObjType === 2"
            v-model="tab.nosaziCodeObject"
            :forceReadonly="forceReadonly"
            :showEditButton="tab.showEditButton"
            :formKey="formKey"
            :name="name"
          />
          <base-building-info-revisit
           :baseNosaziCode="baseNosaziCode"
            v-if="tab.EumNosaziCodeObjType === 3"
            v-model="tab.nosaziCodeObject"
            :forceReadonly="forceReadonly"
            :showEditButton="tab.showEditButton"
            :name="name"
          />
          <base-apartment-info-revisit
            v-if="tab.EumNosaziCodeObjType === 4"
            v-model="tab.nosaziCodeObject"
            :forceReadonly="forceReadonly"
            :showEditButton="tab.showEditButton"
            :name="name"
          />

          <base-house-sharing-info-revisit
            v-if="tab.EumNosaziCodeObjType === 5"
            v-model="tab.nosaziCodeObject"
            :forceReadonly="forceReadonly"
            :showEditButton="tab.showEditButton"
            :formKey="formKey"
            :name="name"
            :title="title"
          />

          <base-shop-info-revisit
            v-if="tab.EumNosaziCodeObjType === 6"
            v-model="tab.nosaziCodeObject"
            :forceReadonly="forceReadonly"
            :showEditButton="tab.showEditButton"
            :formKey="formKey"
            :name="name"
            :title="title"
          />
        </tab-content>
        <tab-content
          v-if="isShowArchiveTab"
          name="archive"
          title="آرشیو الکترونیکی"
        >
          <ArchivElectronicRevisit
            ref="archive"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :isShowArchiveTab="isShowArchiveTab"
            :name="name"
            :title="title"
            fit
            @handleShowArchiveModal="handleShowArchiveModal"
          />
        </tab-content>
        <tab-content name="archiveTablet" title="آرشیو تبلت">
          <ArchiveTablet
            fit
            :formKey="formKey"
            :title="title"
            :name="name"
            ref="archiveTablet"
          />
        </tab-content>
      </safa-tabs>
      <div v-else-if="placeholder === 'ArchiveTablet'" class="full-height">
        <ArchiveTablet
          :assignRevisitInfo="assignRevisitInfo"
          :baseLibResults="baseLibResults"
          :selectedRevisitItem="selectedRevisitItem"
          :formKey="formKey"
          :name="name"
          :title="title"
          fit
          ref="archiveTabletRef"
        />
      </div>
      <safa-popup v-model="showArchiveAsModal" height="500px" width="700px">
        <form-wrapper>
          <ArchivElectronicRevisit
            :assignRevisitInfo="assignRevisitInfo"
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            fit
          />
        </form-wrapper>
      </safa-popup>
      <template v-slot:footer>
        <div class="row q-gutter-sm" v-if="placeholder !== 'ArchiveTablet'">
          <!-- <button-group> -->
            <safa-securityPanel
            id="2bb37133-f056-4e46-887c-cf8ae5801c56"
            caption="آرشیو"
          >
          <btn-default
           label="آرشیو"
            @click="openArchiveTab">
          </btn-default>
        </safa-securityPanel>

          <btn-default
            label="نمایش آرشیو تبلت"
            spCaption="نمایش آرشیو تبلت"
            spId="3d9c801e-2a88-4275-9efc-d308a2235446"
            @click="placeholder = 'ArchiveTablet'"
          />
        </div>
        <div class="row q-gutter-sm" v-else>
          <btn-default
            label="نمایش همه آرشیو"
            @click="$refs.archiveTabletRef.showAllArchive()"
          />
        </div>
      </template>
    </form-wrapper>

    <safa-popup v-model="showArchiveAsModal" height="500px" width="700px">
      <form-wrapper>
        <ArchivElectronicRevisit
          :assignRevisitInfo="assignRevisitInfo"
          :baseNosaziCode="baseNosaziCode"
          :formKey="formKey"
          :name="name"
          :title="title"
          fit
        />
      </form-wrapper>
    </safa-popup>
  </safa-form>
</template>

<script>
import loadRequestHeaderRequest from "./models/loadRequestHeaderRequest.js"
import getAssignedRevisitInfoRequest from "./models/getAssignedRevisitInfoRequest"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import BaseHouseInfoRevisit from "./partials/base-house-info-revisit/BaseHouseInfoRevisit"
import BaseBuildingInfoRevisit from "./partials/base-building-info-revisit/BaseBuildingInfoRevisit"
import BaseApartmentInfoRevisit from "./partials/base-apartment-info-revisit/BaseApartmentInfoRevisit.vue"
import BaseHouseSharingInfoRevisit from "./partials/base-house-sharing-info-revisit/BaseHouseSharingInfoRevisit"
import BaseShopInfoRevisit from "./partials/base-shop-info-revisit/BaseShopInfoRevisit"
import baseFormMixin from "src/mixins/baseFormMixin"
import messageMixin from "src/mixins/messageMixin"
import ArchivElectronicRevisit from "./partials/archive-electronic-revisit/ArchivElectronicRevisit"
import ArchiveTablet from "./partials/archive-tablet-revisit/ArchiveTablet"
// import ArchiveTablet from '../../archive/archive-tablet/ArchiveTablet'
export default {
  route: "/revisit/info",
  mixins: [baseFormMixin, messageMixin],
  components: {
    BaseHouseInfoRevisit,
    BaseBuildingInfoRevisit,
    BaseApartmentInfoRevisit,
    BaseHouseSharingInfoRevisit,
    BaseShopInfoRevisit,
    ArchivElectronicRevisit,
    ArchiveTablet
  },
  // props: {
  //   forceReadonly: {
  //     type: Boolean,
  //     default: true,
  //   },
  // },
  data () {
    return {
      title: "اطلاعات بازدید",
      formKey: "6B6742C1-EA0C-4111-86B0-56842623BD1A",
      name: "URevisitInfo",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // #region services
      loadRequestHeaderRes: null,
      getRevisitListRes: null,
      getAssignRevisitInfoRes: null,
      copyRevisitToRevisitRes: null,
      copyParvandehToRevisitRes: null,
      updateLastRequestStateRes: null,
      // #endregion

      // #region variables
      selectedRevisitItem: null,
      currentTab: "tree_tab",
      showArchiveAsModal: false,
      tabs: [
        // {
        //   name: 'tree_tab',
        //   title: 'بازدید',
        //   persist: true // Not closeable
        // }
      ],
      isShowArchiveTab: false,
      isShowArchiveTabletTab: false,
      bizCode: "",
      // baseNosaziCode: {},
      revisitList: [],
      requestHeader: { ...loadRequestHeaderRequest },
      assignRevisitInfo: { ...getAssignedRevisitInfoRequest },

      nosaziCodeTrees: [],
      selectedNosaziCodeStr: "",
      selectedRevisit: null,
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      placeholder: "default",
      isNew: false,
      baseLibResults: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 8
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District:
            this.baseNosaziCode.District === 0
              ? this.selectedDistrict
              : this.baseNosaziCode.District
        }
      }
    },
    selectedNosaziCodeObject () {
      const { NidBase } = this.getNodeByKey(this.selectedNosaziCodeStr) || {}
      return (
        this.revisitList.RevisitList.filter((x) => x.NidBase === NidBase)[0] ||
        {}
      )
    },
    currentTitle () {
      switch (this.placeholder) {
        case "ArchiveTablet":
          return "آرشیو تبلت"
        default:
          return "اطلاعات بازدید "
      }
    }
  },

  async created () {
    if (this.isSelectedRequest()) {
      await this.load()
    } else this.hideSidebar(this.name)
  },

  methods: {
    handleShowArchiveModal () {
      this.closeArchiveTab()
      this.placeholder = "default"
      this.showArchiveAsModal = true
    },
    fetched (value) {
      this.baseLibResults = value
    },
    openArchiveTab () {
      this.isShowArchiveTab = true
      this.currentTab = "archive"
      this.isNew = true
    },
    openArchiveTabletTab () {
      this.isShowArchiveTabletTab = true
      this.activeTab = "archiveTablet"
      this.isNew = true
    },
    closeArchiveTab () {
      if (this.isEditable) {
        this.showWarning("در حالت ویرایش امکان بستن این پنجره وجود ندارد.")
        return
      }
      this.isShowArchiveTab = false
      this.currentTab = "tree_tab"
      this.isNew = false
    },
    // closeArchiveTabletTab () {
    //   if (this.isEditable) {
    //     this.showWarning('در حالت ویرایش امکان بستن این پنجره وجود ندارد.')
    //     return
    //   }
    //   this.isShowArchiveTabletTab = false
    //   this.activeTab = 'tree_tab'
    //   this.isNew = false
    // },
    changePlaceholder (state) {
      this.placeholder = state
      this.$emit("load")
    },
    getNodeByKey (key) {
      // if (this.$refs.tree) {
      //   return this.$refs.tree.getNodeByKey(key)
      // }
      return this.nosaziCodeTrees.find((x) => x.nosaziCodeString === key)
    },
    addTab (revisitObject) {
      if (!this.selectedNosaziCodeStr) {
        return
      }
      const already = this.tabs.filter((x) =>
        x.name.startsWith(this.selectedNosaziCodeStr)
      )[0]
      const isShowedAlready = !!already
      const tabName = isShowedAlready
        ? already.name
        : this.selectedNosaziCodeStr
      this.currentTab = tabName

      if (isShowedAlready) {
        return
      }
      let NidProc = this.requestHeader.Sh_RequestInfo.NidProc
      let NidRevisit = this.requestHeader.Sh_RequestInfo.NidRevisit
      let showEditButton = true
      if (revisitObject && revisitObject.NidRevisit) {
        NidProc = revisitObject["Nidproc"] // .NidProc
        NidRevisit = revisitObject.NidRevisit

        showEditButton =
          this.requestHeader.Sh_RequestInfo.NidRevisit.toLowerCase() ===
          revisitObject.NidRevisit.toLowerCase()
      }
      const nosaziCodeObject =
        this.getNodeByKey(this.selectedNosaziCodeStr) || {}

      this.tabs.push({
        name: tabName,
        title:
          "بازدید " +
          (nosaziCodeObject.name +
            " " +
            this.selectedNosaziCodeStr.split("-").reverse().join("-")),
        EumNosaziCodeObjType: nosaziCodeObject.EumNosaziCodeObjType,
        nosaziCodeObject: {
          ...nosaziCodeObject,
          NidBase: revisitObject.NidBase,
          NidProc,
          NidRevisit
        },
        showEditButton
      })
    },
    handleTreeDblClick (node) {
      const nosaziCode = node.nosaziCodeString
      if (parseInt(nosaziCode)) {
        this.selectedNode = nosaziCode
        this.selectedNosaziCodeStr = nosaziCode
        this.addTab(node)
      }
    },
    handleTreeClick (node) {
      if (this.selectedNosaziCodeStr === node.nosaziCodeString) {
        this.selectedNosaziCodeStr = ""
      } else {
        this.selectedNosaziCodeStr = node.nosaziCodeString
      }
    },
    handleCloseTab (name) {
      this.tabs = this.tabs.filter((x) => x.name !== name)
      if (this.currentTab === name) {
        this.currentTab = "tree_tab"
      }
      if (this.$refs[name] && this.$refs[name][0]) {
        this.$refs[name][0].$destroy()
      }
    },
    handleSelectedRevisitChangedOnGrid (e) {
      const { NidRevisit } = e.dataItem || {}
      this.selectedRevisitItem = e.dataItem || {}
      this.selectedRevisit = this.assignRevisitInfo.Revisits_AllRequest.filter(
        (x) => x.NidRevisit === NidRevisit
      )[0]
    },
    handleGridDblClick (e) {
      const { NidRevisit } = e.row || {}
      this.selectedRevisit = this.assignRevisitInfo.Revisits_AllRequest.filter(
        (x) => x.NidRevisit === NidRevisit
      )[0]
      if (!this.selectedRevisit) {
        this.showError(
          "هیچ ردیفی در لیست کارشناسانی که ملک را بازدید کرده اند، انتخاب نشده است"
        )
        return
      }
      if (!this.selectedNosaziCodeStr) {
        this.showError("کدنوسازی در درختواره بازدید انتخاب نشده است")
        return
      }
      this.addTab(this.selectedRevisit)
    },
    handleRevisitCopy (e) {
      if (this.forceReadonly) {
        return
      }
      const { NidRevisit } = e.dataItem || {}
      const copy = async () => {
        try {
          this.showLoading()
          // Copy revisit to revisit
          const { data } = await this.$services.SC.copyRevisitToRevisit(
            {
              pFromNidRevisit: NidRevisit,
              pToNidRevisit: this.requestHeader.Sh_RequestInfo.NidRevisit,
              IsCopyShArchiveFromParvandeh: false,
              pTableNames: ""
            },
            this.config
          )
          this.copyRevisitToRevisitRes = this.getResponse(data)
          if (this.copyRevisitToRevisitRes.success) {
            this.showSuccess("کپی به بازدید فعال انجام شد.")
            await this.log({
              action: this.logActions.copyToRevisit,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی به بازدید فعال برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
            await this.updateLastRequestState()
          } else this.showError("کپی بازدید به بازدید انجام نشد")
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }
      this.showConfirm("آیا از کپی به بازدید فعال اطمینان دارید؟").onOk(copy)
    },
    async updateLastRequestState () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: "کپی به بازدید فعال انجام شد"
        }
        const { data } = await this.$services.SC.updateLastRequestState(
          payload,
          this.config
        )
        this.updateLastRequestStateRes = this.getResponse(data)
        if (this.updateLastRequestStateRes.success) {
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `وضعیت درخواست ${this.selectedRequest.NidWorkItem} بروزرسانی شد.`
          })
        } else this.showError("وضعیت درخواست بروز نشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    },
    handleParvandehCopy (e) {
      if (this.forceReadonly) {
        return
      }
      const { ActiveRevisit } = e.dataItem || {}
      const copy = async () => {
        try {
          this.showLoading()
          let response = await this.$services.SC.copyParvandehToRevisit(
            {
              pToNidRevisit: ActiveRevisit,
              pTableNames: ""
            },
            this.config
          )
          this.copyParvandehToRevisitRes = this.getResponse(response.data)
          if (this.copyParvandehToRevisitRes.success) {
            this.showSuccess("کپی اطلاعات پرونده به بازدید انجام شد")
            await this.log({
              action: this.logActions.copy,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `کپی اطلاعات پرونده به بازدید برای شماره درخواست ${this.selectedRequest.NidWorkItem} انجام شد.`
            })
            await this.updateLastRequestState()
          } else {
            this.showError("کپی اطلاعات پرونده به بازدید انجام نشد")
          }
        } catch (e) {
          console.error(e)
          this.serverError()
        } finally {
          this.hideLoading()
        }
      }

      this.showConfirm(
        "آیا از کپی اطلاعات پرونده به بازدید اطمینان دارید؟"
      ).onOk(copy)
    },

    async load () {
      this.showLoading()
      const { BizCode, NidProc } = this.selectedRequest
      if (BizCode) {
        this.bizCode = BizCode
      } else if (this.selectedRequest.District) {
        const o = this.selectedRequest
        this.bizCode = `${o.District}-${o.Region}-${o.Block}-${o.House}-${o.Building}-${o.Apartment}-${o.Shop}`
      } else {
        this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
        return
      }
      this.baseNosaziCode = convertStringToNosaziCodeObject(BizCode)
      // this.tabs = [this.tabs[0]]
      this.currentTab = "tree_tab"
      this.requestHeader = { ...loadRequestHeaderRequest }

      try {
        const payload = {
          pNidProc: NidProc,
          pIsLoadDeletedNosaziCode: false
        }
        const { data } = await this.$services.SA.loadRequestHeader(payload, this.config)
        this.loadRequestHeaderRes = this.getResponse(data)
        if (this.loadRequestHeaderRes.success) {
          this.requestHeader = this.loadRequestHeaderRes.data
          await this.getRevisitList()
          await this.getAssignRevisitInfo()
        }
      } catch (e) {
        console.error(e)
        this.showError("لیست بازدیدها بارگذاری نشد")
      } finally {
        this.refreshTree()
        this.hideLoading()
      }
    },
    refreshTree () {
      this.$nextTick(() => {
        if (this.$refs.tree) {
          this.$refs.tree.expandAll()
        }
      })
    },
    async getRevisitList () {
      const { data } = await this.$services.SC.getRevisitList(
        {
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false
        },
        this.config
      )
      this.getRevisitListRes = this.getResponse(data)
      if (this.getRevisitListRes.success) {
        this.revisitList = this.getRevisitListRes.data
        if (this.revisitList.RevisitList.length === 0) {
          // this.showError("لیست بازدیدها بارگذاری نشد.");
          return
        }
        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode,
          nidWorkItem: this.selectedRequest.NidWorkItem,
          saveDesc: `لیست بازدیدها برای درخواست ${this.selectedRequest.NidWorkItem} بارگذاری شد.`
        })
        this.nosaziCodeTrees = this.createRevisitTree(
          this.revisitList.RevisitList
        )
      } else {
        this.refreshTree()
        this.showError("لیست بازدیدها بارگذاری نشد.")
      }
    },
    async getAssignRevisitInfo () {
      try {
        const { data } = await this.$services.SC.getAssignRevisitInfo(
          { PNidProc: this.selectedRequest.NidProc },
          this.config
        )
        this.getAssignRevisitInfoRes = this.getResponse(data)
        if (this.getAssignRevisitInfoRes.success) {
          this.assignRevisitInfo = this.getAssignRevisitInfoRes.data
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `لیست بازدیدهای تخصیص یافته برای درخواست ${this.selectedRequest.NidWorkItem} بارگذاری شد.`
          })
        } else this.showError("لیست بازدیدهای تخصیص یافته بارگذاری نشد.")
      } catch (e) {
        console.error(e)
        this.serverError()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.backButton {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.revisit-tiles-list {
  .revisit-tile {
    width: 250px;
    max-width: 100%;
    text-align: center;
    height: 80px;
    border: 1px dashed #9a9a9a;
    border-radius: 3px;
    -webkit-transition: 0.1s all ease-out;
    -moz-transition: 0.1s all ease-out;
    -ms-transition: 0.1s all ease-out;
    -o-transition: 0.1s all ease-out;
    transition: 0.1s all ease-out;

    .rvs-label {
      font-size: 16px;
      color: var(--q-color-primary);
      font-weight: 500;
      font-weight: 500;
    }

    .rvs-nosazicode {
      direction: ltr;
      font-size: 17px;
      margin-top: 3px;
      border-radius: 3px;
      color: #2f2f2f;
      font-weight: 400;
    }

    &:hover {
      border-color: var(--q-color-primary);
      -webkit-transition: 0.1s all ease-out;
      -moz-transition: 0.1s all ease-out;
      -ms-transition: 0.1s all ease-out;
      -o-transition: 0.1s all ease-out;
      transition: 0.1s all ease-out;
    }

    &.is-selected {
      background-color: #edfcfd;
      -webkit-transition: 0.1s all ease-out;
      -moz-transition: 0.1s all ease-out;
      -ms-transition: 0.1s all ease-out;
      -o-transition: 0.1s all ease-out;
      transition: 0.1s all ease-out;
      border-color: #1dbcc7 !important;
    }
  }
}
</style>
