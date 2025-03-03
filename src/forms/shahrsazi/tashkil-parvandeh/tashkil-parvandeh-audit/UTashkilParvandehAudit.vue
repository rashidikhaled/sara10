<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >

    <form-wrapper
      :title="title"
      vertical
      :padding="false"
    >
      <template v-slot:header>
        <form-header-by-nosazi-code
          actions
          from-request
          v-model="baseNosaziCode"
          :EumNosaziCodeGroup="getEumNosaziCodeGroup.Momayezi.value"
          @fetched="load"
        />
      </template>
      <create-new-block
        v-model="actionState.createBlock"
        :nosazi-code-template="selectedNosaziCodeObject"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-new-house
        v-model="actionState.createHouse"
        :nosazi-code-template="selectedNosaziCodeObject"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-copy-house
        v-model="actionState.copyHouse"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="houseNosaziCode.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-new-building
        v-model="actionState.createBuilding"
        :nosazi-code-template="selectedNosaziCodeObject"
        :parent="houseNosaziCode"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-copy-building
        v-model="actionState.copyBuilding"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="buildingNosaziCode.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-new-apartment
        v-model="actionState.createApartment"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-copy-apartment
        v-model="actionState.copyApartment"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-new-house-sharing
        v-model="actionState.createHouseSharing"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-copy-house-sharing
        v-model="actionState.copyHouseSharing"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <create-new-shop
        v-model="actionState.createShop"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
        :baseNosaziCode="baseNosaziCode"
      />
      <safa-tabs
        v-model="currentTab"
        ref="mainTab"
        :padding="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="tree_tab"
            label="ساختار درختی"
          />
          <tab-menu
            v-for="{ name, title } in tabs"
            :key="name"
            :name="name"
            :label="title"
            closable
            @close="handleCloseTab(name)"
          />
        </template>
        <tab-content name="tree_tab">
          <fit>
            <div class="q-pa-sm">
              <div class="row q-col-gutter-md items-center">
                <div class="col">
                  <button-group height="30px">
                    <btn-default
                      label="ایجاد بلوک"
                      key="#1"
                      v-if="actions.createBlock"
                      @click="actionState.createBlock = !actionState.createBlock "
                    />
                    <btn-default
                      label="ایجاد ملک"
                      key="#2"
                      v-if="actions.createHouse"
                      @click="actionState.createHouse = !actionState.createHouse"
                    />
                    <btn-default
                      label="ایجاد ملک مشابه"
                      key="#3"
                      v-if="actions.copyHouse"
                      @click="actionState.copyHouse = !actionState.copyHouse"
                    />
                    <btn-default
                      label="ایجاد ساختمان"
                      key="#4"
                      v-if="actions.createBuilding"
                      @click="actionState.createBuilding = !actionState.createBuilding"
                    />
                    <btn-default
                      label="ایجاد ساختمان مشابه"
                      key="#5"
                      v-if="actions.copyBuilding"
                      @click="actionState.copyBuilding = !actionState.copyBuilding"
                    />
                    <btn-default
                      label="ایجاد آپارتمان"
                      key="#6"
                      v-if="actions.createApartment"
                      @click="actionState.createApartment = !actionState.createApartment"
                    />

                    <btn-default
                      label="ایجاد آپارتمان مشابه"
                      key="#7"
                      v-if="actions.copyApartment"
                      @click="actionState.copyApartment = !actionState.copyApartment"
                    />
                    <btn-default
                      label="ایجاد دستگاه"
                      key="#8"
                      v-if="actions.createHouseSharing"
                      @click="actionState.createHouseSharing = !actionState.createHouseSharing"
                    />
                    <btn-default
                      label="ایجاد دستگاه مشابه"
                      key="#9"
                      v-if="actions.copyHouseSharing"
                      @click="actionState.copyHouseSharing = !actionState.copyHouseSharing"
                    />
                    <btn-default
                      label="ایجاد صنفی"
                      key="#10"
                      v-if="actions.createShop"
                      @click="actionState.createShop = !actionState.createShop"
                    />
                    <btn-default
                      class="q-ml-md"
                      icon="style"
                      label="مجاز پروانه"
                      size="sm"
                      key="#11"
                      v-if="actions.mojaazParvaneh"
                      @click="addTab('mojaaz-parvaaneh', 'مجاز پروانه')"
                    />
                    <btn-default
                      label="مجاز پایانکار"
                      key="#12"
                      v-if="actions.mojaazPayanakar"
                      @click="addTab('mojaaz-payankar', 'مجاز پایانکار')"
                    />
                    <btn-default
                      label="مجاز پایانکار ساختمان"
                      key="#12"
                      v-if="actions.mojaazPayanakarBuilding"
                      @click="addTab('mojaaz-payankar-building', 'مجاز پایانکار')"
                    />
                    <btn-default
                      label="مجاز موافقت اصولی"
                      key="#13"
                      v-if="actions.mojaazMovafeghat"
                      @click="addTab('movafeghat-osooli','مجاز موافقت اصولی')"
                    />

                  </button-group>
                </div>
              </div>
            </div>
            <q-separator class="q-mb-sm"/>
            <div class="custom-scroll">
              <q-tree
                ref="tree"
                class="bordered"
                style="min-height: 200px"
                default-expand-all
                selected-color="primary"
                node-key="nosaziCodeString"
                :nodes="nosaziCodeTrees"
                :selected.sync="selectedNosaziCode"
                @dblclick.native="handleTreeDblClick"
              >
              </q-tree>
            </div>
          </fit>
        </tab-content>
        <tab-content
          v-for="tab in tabs"
          :name="tab.name"
          :key="tab.name"
          :ref="tab.name"
        >

          <base-block-audit
            v-if="tab.EumNosaziCodeObjType === 1"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />
          <base-house-info-audit
            v-if="tab.EumNosaziCodeObjType === 2"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />
          <base-building-info-audit
            v-else-if="tab.EumNosaziCodeObjType === 3"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />
          <base-apartment-info-audit
            v-else-if="tab.EumNosaziCodeObjType === 4"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />
          <base-house-sharing-info-audit
            v-else-if="tab.EumNosaziCodeObjType === 5"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />
          <base-shop-info-audit
            v-else-if="tab.EumNosaziCodeObjType === 6"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />

        </tab-content>
      </safa-tabs>

    </form-wrapper>
  </safa-form>
</template>

<script>
import BaseBlockAudit from './BaseBlockAudit/BaseBlockAudit'
import BaseHouseInfoAudit from './BaseHouseInfoAudit/BaseHouseInfoAudit'
import BaseBuildingInfoAudit from './BaseBuildingInfoAudit/BaseBuildingInfoAudit'
import BaseApartmentInfoAudit from './BaseApartmentInfoAudit/BaseApartmentInfoAudit'
import BaseHouseSharingInfoAudit from './BaseHouseSharingInfoAudit/BaseHouseSharingInfoAudit'
import BaseShopInfoAudit from './BaseShopInfoAudit/BaseShopInfoAudit'
import CreateNewBlock from './partials/CreateNewBlock'
import CreateNewHouse from './partials/CreateNewHouse'
import CreateCopyHouse from './partials/CreateCopyHouse'
import CreateNewBuilding from './partials/CreateNewBuilding'
import CreateCopyBuilding from './partials/CreateCopyBuilding'
import CreateNewHouseSharing from './partials/CreateNewHouseSharing'
import CreateCopyHouseSharing from './partials/CreateCopyHouseSharing'
import CreateNewApartment from './partials/CreateNewApartment'
import CreateCopyApartment from './partials/CreateCopyApartment'
import CreateNewShop from './partials/CreateNewShop'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { ClsEnumEumNosaziCodeGroup } from '../../../shahrsazi/config/enums.js'

export default {
  route: '/audit/info',
  mixins: [baseFormMixin],
  components: {
    CreateNewBlock,
    CreateNewHouse,
    CreateCopyHouse,
    CreateNewBuilding,
    CreateCopyBuilding,
    CreateNewHouseSharing,
    CreateCopyHouseSharing,
    CreateNewApartment,
    CreateCopyApartment,
    CreateNewShop,
    BaseBlockAudit,
    BaseHouseInfoAudit,
    BaseBuildingInfoAudit,
    BaseApartmentInfoAudit,
    BaseHouseSharingInfoAudit,
    BaseShopInfoAudit
  },

  data () {
    return {
      formKey: '5a8fb048-7b48-48ff-b378-adc4d563ca1a',
      name: 'UTashkilParvandehAudit',
      title: 'ممیزی',
      main: true,
      isView: false,
      sidebarCompatible: true,
      result: null,
      mai: true,
      currentTab: 'tree_tab',
      tabs: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      childTree: [],
      nosaziCodeTrees: [],
      selectedNosaziCode: '0-0-0-0-0-0-0',
      getEumNosaziCodeGroup: ClsEnumEumNosaziCodeGroup,
      actionState: {
        createBlock: false,
        createHouse: false,
        createBuilding: false,
        createApartment: false,
        createHouseSharing: false,
        createShop: false,
        copyHouse: false,
        copyBuilding: false,
        copyApartment: false,
        copyHouseSharing: false,
        copyShop: false,
        mojaazParvaneh: false,
        mojaazPayanakar: false,
        mojaazMovafeghat: false
      }
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.baseNosaziCode.District
        }
      }
    },
    actions () {
      const EumNosaziCodeObjType = this.selectedNosaziCodeObject
        .EumNosaziCodeObjType
      return {
        createBlock: true, // EumNosaziCodeObjType > 0,
        createHouse: true, // EumNosaziCodeObjType > 0,
        createBuilding: EumNosaziCodeObjType === 2,
        createApartment: EumNosaziCodeObjType === 3,
        createHouseSharing: EumNosaziCodeObjType === 2,
        createShop: EumNosaziCodeObjType >= 2 && EumNosaziCodeObjType <= 5,
        copyHouse: false, // EumNosaziCodeObjType === 2,
        copyBuilding: false, // EumNosaziCodeObjType === 3,
        copyApartment: EumNosaziCodeObjType === 4,
        copyHouseSharing: false, // EumNosaziCodeObjType === 5,
        copyShop: false,
        mojaazParvaneh: false, // EumNosaziCodeObjType === 2,
        mojaazPayanakar: false, // EumNosaziCodeObjType === 2,
        mojaazPayanakarBuilding: false, // EumNosaziCodeObjType === 3,
        mojaazMovafeghat: false // EumNosaziCodeObjType === 2 || EumNosaziCodeObjType === 3
      }
    },
    selectedNosaziCodeObject () {
      const { NidBase } = this.getNodeByKey(this.selectedNosaziCode) || {}
      return this.childTree.filter(x => x.NidBase === NidBase)[0] || {}
    },
    blockNosaziCode () {
      const nickName = convertNosaziCodeObjectToString({
        ...this.selectedNosaziCodeObject,
        Building: 0,
        Apartment: 0,
        Shop: 0
      })
      return this.getNodeByKey(nickName) || {}
    },
    houseNosaziCode () {
      const nickName = convertNosaziCodeObjectToString({
        ...this.selectedNosaziCodeObject,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      })
      return this.getNodeByKey(nickName) || {}
    },
    buildingNosaziCode () {
      const nickName = convertNosaziCodeObjectToString({
        ...this.selectedNosaziCodeObject,
        Apartment: 0,
        Shop: 0
      })
      return this.getNodeByKey(nickName) || {}
    }
  },

  methods: {
    addTab (newTabName, title) {
      const already = this.tabs.filter(x => x.name.startsWith(newTabName))[0]
      const isShowedAlready = !!already
      const tabName = isShowedAlready
        ? already.name
        : newTabName + new Date().toString()
      this.currentTab = tabName

      if (isShowedAlready) {
        return
      }
      const nosaziCodeObject = this.getNodeByKey(this.selectedNosaziCode) || {}
      this.tabs.push({
        name: tabName,
        title:
          title ||
          nosaziCodeObject.name +
          ' ' +
          this.selectedNosaziCode
            .split('-')
            .reverse()
            .join('-'),
        EumNosaziCodeObjType: nosaziCodeObject.EumNosaziCodeObjType,
        nosaziCodeObject: nosaziCodeObject
      })
    },
    getNodeByKey (key) {
      if (this.$refs.tree) {
        return this.$refs.tree.getNodeByKey(key)
      }
    },

    handleNosaziCodeSuccess (nosaziCode) {
      this.baseNosaziCode = { ...nosaziCode }
      this.load()
    },
    handleTreeDblClick (e) {
      const nosaziCode = e.target.innerHTML
      if (nosaziCode) {
        this.selectedNosaziCode = nosaziCode
        this.addTab(nosaziCode)
      }
    },
    handleCloseTab (name) {
      this.tabs = this.tabs.filter(x => x.name !== name)
      if (this.currentTab === name) {
        this.currentTab = 'tree_tab'
      }
      if (this.$refs[name] && this.$refs[name][0]) {
        this.$refs[name][0].$destroy()
      }
    },

    async load () {
      // this.tabs = [this.tabs[0]]
      this.selectedNosaziCode = ''
      // this.selectedNosaziCodeObject = {}
      this.currentTab = 'tree_tab'
      this.nosaziCodeTrees = []

      if (!this.baseNosaziCode.District) {
        return this.showError('کد نوسازی بدرستی تعیین نشده است')
      }

      try {
        this.showLoading()
        const { data } = await this.$services.SA.getNosaziCodeTreeChild(
          {
            pNosaziCode: {
              ...this.baseNosaziCode,
              CI_City: 0,
              EumRevisitGroup: 0, // baseOnXaml
              EumBaseInfoGroup: 0, // Parvandeh
              EumNosaziCodeGroup: this.getEumNosaziCodeGroup.Momayezi.value, // Momayezi
              IsRoot: false,
              NidUser: this.currentUser.NidUser,
              NidBase: '00000000-0000-0000-0000-000000000000',
              EumNosaziCodeObjType: 0, // Xaml
              NidNosaziCode: '00000000-0000-0000-0000-000000000000',
              NidRevisit: '00000000-0000-0000-0000-000000000000'
            }
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات کد نوسازی ممیزی بارگذاری نشد')
        }
        this.childTree = this.result.data['ChildTree'] || []
        const isValid = !!this.childTree.length
        if (isValid) {
          this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)

          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: this.strNosaziCode
            })
          }
          this.isView = true
        } else {
          this.showError('کد نوسازی ممیزی معتبر نمیباشد')
        }

        // end
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
        this.$nextTick(() => {
          if (this.$refs.tree) {
            this.$refs.tree.expandAll()
          }
        })
      }
    }
  }
}
</script>
