<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      title="اطلاعات پرونده املاک"
      vertical
      :padding="false"
    >
      <template v-slot:header>
        <form-header-by-nosazi-code
          actions
          from-request
          v-model="baseNosaziCode"
          @fetched="fetcheData"
        /></template>
      <create-new-block
        v-model="actionState.createBlock"
        :nosazi-code-template="selectedNosaziCodeObject"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-new-house
        v-model="actionState.createHouse"
        :nosazi-code-template="selectedNosaziCodeObject"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-copy-house
        v-model="actionState.copyHouse"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="houseNosaziCode.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-new-building
        v-model="actionState.createBuilding"
        :nosazi-code-template="selectedNosaziCodeObject"
        :parent="houseNosaziCode"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-copy-building
        v-model="actionState.copyBuilding"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="buildingNosaziCode.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-new-apartment
        v-model="actionState.createApartment"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-copy-apartment
        v-model="actionState.copyApartment"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-new-house-sharing
        v-model="actionState.createHouseSharing"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />

      <create-copy-house-sharing
        v-model="actionState.copyHouseSharing"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
      />
      <create-new-shop
        v-model="actionState.createShop"
        :nosazi-code-template="selectedNosaziCodeObject"
        :nid-base="selectedNosaziCodeObject.NidBase"
        @success="handleNosaziCodeSuccess"
        :formKey="formKey"
        :title="title"
        :name="name"
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
                  <!-- فیلد دسته های اطلاعاتی در مشهد وجود ندارد -->
                <!-- <safa-combo
                  class="col-12 col-sm-4 col-md-3"
                  label="دسته های اطلاعاتی"
                  source-type="local"
                  :options="enumBaseInfoGroupItems"
                  v-model="options.EumBaseInfoGroup"
                /> -->
                <div class="col">
                  <button-group height="30px">
                    <btn-default
                      spId="71f64aa9-42b0-4994-a142-d6d297f445c1"
                      spCaption="ایجاد بلوک"
                      label="ایجاد بلوک"
                      key="#1"
                      v-if="actions.createBlock"
                      @click="actionState.createBlock = !actionState.createBlock"
                    />
                    <btn-default
                      spId="e4c74f83-ba71-4fcc-8773-22a896f30cfe"
                      spCaption="ایجاد ملک"
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
                      spId="73bb961d-b725-47a3-ad6b-d541fd3e07c0"
                      spCaption="ایجاد ساختمان"
                      label="ایجاد ساختمان"
                      key="#4"
                      v-if="actions.createBuilding"
                      @click="actionState.createBuilding = !actionState.createBuilding"
                    />
                    <btn-default
                      spId="17b84a65-9fa2-479b-8882-791e16cf72a5"
                      spCaption="ایجاد ساختمان مشابه"
                      label="ایجاد ساختمان مشابه"
                      key="#5"
                      v-if="actions.copyBuilding"
                      @click="actionState.copyBuilding = !actionState.copyBuilding"
                    />
                    <btn-default
                      spId="bccdf7df-f187-4259-84e8-b10cc1f1325c"
                      spCaption="ایجاد آپارتمان"
                      label="ایجاد آپارتمان"
                      key="#6"
                      v-if="actions.createApartment"
                      @click="
                actionState.createApartment = !actionState.createApartment
              "
                    />
                    <btn-default
                      spId="41480e96-a472-4caf-9859-41dba7942cf8"
                      spCaption="ایجاد آپارتمان مشابه"
                      label="ایجاد آپارتمان مشابه"
                      key="#7"
                      v-if="actions.copyApartment"
                      @click="actionState.copyApartment = !actionState.copyApartment"
                    />
                    <btn-default
                      spId="84c69791-05b6-40fa-937e-d4f3c5c478a3"
                      spCaption="ایجاد دستگاه"
                      label="ایجاد دستگاه"
                      key="#8"
                      v-if="actions.createHouseSharing"
                      @click="
                actionState.createHouseSharing = !actionState.createHouseSharing
              "
                    />
                    <btn-default
                      label="ایجاد دستگاه مشابه"
                      key="#9"
                      v-if="actions.copyHouseSharing"
                      @click="
              actionState.copyHouseSharing = !actionState.copyHouseSharing
            "
                    />
                    <btn-default
                      spId="5f97f928-c3cb-49b2-b431-faee6c0ff04b"
                      spCaption="ایجاد صنفی"
                      label="ایجاد صنفی"
                      key="#10"
                      v-if="actions.createShop"
                      @click="actionState.createShop = !actionState.createShop"
                    />
                    <btn-default
                      spId="5f97f928-c3cb-49b2-b431-faee6c0ff04b"
                      spCaption="مجاز پروانه"
                      label="مجاز پروانه"
                      key="#11"
                      v-if="actions.mojaazParvaneh"
                      @click="addTab('mojaaz-parvaaneh', 'مجاز پروانه')"
                    />
                    <btn-default
                      spId="1f602682-fea8-4487-9a69-f1cd85cef3bc"
                      spCaption="مجاز پایانکار"
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
                      @click="addTab('movafeghat-osooli', 'مجاز موافقت اصولی')"
                    />
                  </button-group>
                </div>
              </div>
            </div>
            <q-separator class="q-mb-sm" />
            <div class="custom-scroll">
              <q-tree
                ref="tree"
                class="bordered"
                default-expand-all
                selected-color="primary"
                node-key="nosaziCodeString"
                :nodes="nosaziCodeTrees"
                :selected.sync="selectedNosaziCode"
                @update:selected="selectedNosaziCodeChanged"
              >
                <template v-slot:default-header="{ node }">
                  <div
                    class="row items-center"
                    @dblclick.stop="handleTreeDblClick(node)"
                  >
                    <q-icon
                      :name="node.icon"
                      size="21px"
                      class="q-mr-sm"
                    />
                    <div>{{ node.label }}</div>
                  </div>
                </template>
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
          <mojaaz-parvaaneh-info
            v-if="tab.name.startsWith('mojaaz-parvaaneh')"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
          />

          <mojaaz-payankar-house
            v-else-if="tab.name.startsWith('mojaaz-payankar')"
            v-model="tab.nosaziCodeObject"
            :baseNosaziCode="baseNosaziCode"
          />
          <mojaaz-payankar-building
            v-else-if="tab.name.startsWith('mojaaz-payankar-building')"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
          />

          <mojaaz-movafeghat-osooli
            v-else-if="tab.name.startsWith('movafeghat-osooli')"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
          />

          <base-block-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 1"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
          />
          <base-house-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 2"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :parentNosaziCode="baseNosaziCode"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
          />
          <base-building-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 3"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :parentNosaziCode="baseNosaziCode"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
          />
          <base-apartment-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 4"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :parentNosaziCode="baseNosaziCode"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
          />
          <base-house-sharing-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 5"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :parentNosaziCode="baseNosaziCode"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
          />
          <base-shop-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 6"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            :parentNosaziCode="baseNosaziCode"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
          />
        </tab-content>
      </safa-tabs>

    </form-wrapper>
  </safa-form>
</template>

<script>
import BaseBlockParvandeh from './BaseBlockParvandeh/BaseBlockParvandeh'
import BaseHouseInfoParvandeh from './BaseHouseInfoParvandeh/BaseHouseInfoParvandeh'
import BaseBuildingInfoParvandeh from './BaseBuildingInfoParvandeh/BaseBuildingInfoParvandeh'
import BaseApartmentInfoParvandeh from './BaseApartmentInfoParvandeh/BaseApartmentInfoParvandeh'
import BaseHouseSharingInfoParvandeh from './BaseHouseSharingInfoParvandeh/BaseHouseSharingInfoParvandeh'
import BaseShopInfoParvandeh from './BaseShopInfoParvandeh/BaseShopInfoParvandeh'
import MojaazParvaanehInfo from './MojaazParvanehInfo/MojaazParvaanehInfo'
import MojaazPayankarHouse from './MojaazPayankarHouse/MojaazPayankarHouse'
import MojaazPayankarBuilding from './MojaazPayankarBuilding/MojaazPayankarBuilding'
import MojaazMovafeghatOsooli from './MojaazMovafeghatOsooli/MojaazMovafeghatOsooli'
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

export default {
  route: '/parvandeh-amlak/info',
  mixins: [baseFormMixin],
  components: {
    MojaazMovafeghatOsooli,
    BaseBlockParvandeh,
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
    BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseHouseSharingInfoParvandeh,
    BaseShopInfoParvandeh,
    MojaazParvaanehInfo,
    MojaazPayankarHouse,
    MojaazPayankarBuilding
  },

  data () {
    return {
      title: 'شهرسازی- اطلاعات پرونده املاک',
      formKey: '480d269b-7a2b-42b8-87b6-7748ad55cbdc',
      name: 'UTashkilParvandehAmlak',
      main: true,
      isView: false,
      result: null,
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
      selectedNosaziCodeFallBak: null,
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      enumBaseInfoGroupItems: [
        { Id: 0, Title: 'تشکیل پرونده' },
        { Id: 100, Title: 'نوسازی اصفهان' }
      ],
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
      },
      mainNosaziCodeInfo: { MainObj: {} }
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
        createBlock: true, // EumNosaziCodeObjType > 0 ,
        createHouse: EumNosaziCodeObjType > 0,
        createBuilding: EumNosaziCodeObjType === 2,
        createApartment: EumNosaziCodeObjType === 3,
        createHouseSharing: EumNosaziCodeObjType === 2,
        createShop: EumNosaziCodeObjType >= 2 && EumNosaziCodeObjType <= 5,
        copyHouse: EumNosaziCodeObjType === 2,
        copyBuilding: EumNosaziCodeObjType === 3,
        copyApartment: EumNosaziCodeObjType === 4,
        copyHouseSharing: EumNosaziCodeObjType === 5,
        copyShop: false,
        mojaazParvaneh: EumNosaziCodeObjType === 2,
        mojaazPayanakar: EumNosaziCodeObjType === 2,
        mojaazPayanakarBuilding: EumNosaziCodeObjType === 3,
        mojaazMovafeghat:
          EumNosaziCodeObjType === 2 || EumNosaziCodeObjType === 3
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
    fetcheData (value) {
      this.mainNosaziCodeInfo = value
      this.load()
    },
    selectedNosaziCodeChanged (e) {
      // console.log('///////////@@@@@@@@@@@@@@@e', e)

      if (e) {
        this.selectedNosaziCode = e
        this.selectedNosaziCodeFallBak = e
      } else {
        this.selectedNosaziCode = this.selectedNosaziCodeFallBak
      }
    },
    getNodeByKey (key) {
      if (this.$refs.tree) {
        return this.$refs.tree.getNodeByKey(key)
      }
    },
    addTab (newTabName, title) {
      debugger
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
    handleNosaziCodeSuccess (nosaziCode) {
      this.baseNosaziCode = { ...nosaziCode }
      this.load()
    },
    handleTreeDblClick (node) {
      debugger
      // console.log('/////-------node.nosaziCodeString', node.nosaziCodeString)

      const nosaziCode = node.nosaziCodeString
      if (parseInt(nosaziCode)) {
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
              ...this.options,
              NidUser: this.currentUser.NidUser
            }
          },
          this.config
        )

        this.result = this.getResponse(data)
        if (this.result.success !== true) {
          return this.showError('اطلاعات کد نوسازی بارگذاری نشد')
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
              nosaziCode: strNosaziCode
            })
          }
          this.isView = true
        } else {
          this.showError('کد نوسازی معتبر نمیباشد')
        }

        // end
      } catch (e) {
        console.error(e)
        this.showError('خطایی در سرویس رخ دارد')
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
