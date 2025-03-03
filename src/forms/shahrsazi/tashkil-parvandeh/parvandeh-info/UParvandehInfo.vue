<template>
  <safa-form
    :caption="title"
    :id="formKey"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper
      :padding="false"
      title="اطلاعات پرونده"
      vertical
    >
      <template v-slot:header>

        <safa-status :result="result" />
        <safa-status :result="getaNosaziCodeInBlackListRes" />

        <div style="display: flex">
          <form-header-by-nosazi-code
            @fetched="fetcheData"
            actions
            :from-request="fromRequest"
            v-model="baseNosaziCode"
            class="col"
          />
          <q-btn
            v-if="shallshowCloseBtn"
            @click="closeParvandeh"
            dense
            icon="cancel_presentation"
            round
            size="13px"
            unelevated
            style="color: #607598"
          />
        </div>
      </template>

      <safa-tabs
        :bordered="false"
        :padding="false"
        ref="mainTab"
        v-model="currentTab"
      >
        <template v-slot:tabs>
          <tab-menu
            label="ساختار درختی"
            name="tree_tab"
          />

          <tab-menu
            :key="name"
            :label="title"
            :name="name"
            @close="handleCloseTab(name,isEditable)"
            closable
            v-for="{ name, title, isEditable } in tabs"
          />
        </template>

        <tab-content name="tree_tab">
          <fit>
            <div class="q-pa-sm">
              <div class="row q-col-gutter-sm items-center">
                <safa-combo
                  label="دسته اطلاعاتی"
                  v-model="options.EumBaseInfoGroup"
                  domainName="CI_SaraM1"
                  ciName="CI_BaseInfoGroup"
                  @input="infoGroupSelectedItemChanged"
                  v-if="isShowBaseInfoGroupCombo"
                  class="col-12 col-sm-4 col-md-3"
                />
                <div class="col-8">
                  <button-group height="30px">
                    <btn-default
                      @click="popupState.createBlock = true"
                      label="ایجاد بلوک"
                      spCaption="ایجاد بلوک"
                      spId="8708c280-9406-445c-92bc-a865a4a85e32"
                    />

                    <btn-default
                      @click="popupState.createHouse = true"
                      label="ایجاد ملک"
                      spCaption="ایجاد ملک"
                      spId="c19c5a54-4e76-4f15-9e69-efeb4eb466a4"
                    />
                    <btn-default
                      @click="popupState.copyHouse = true"
                      label="ایجاد ملک مشابه"
                      spCaption="ایجاد ملک مشابه"
                      spId="522e8a87-1617-4a63-a837-efe37fe578d5"
                      v-if="actionState.copyHouse"
                      />
                    <btn-default
                      @click="setActionState('createBuilding')"
                      label="ایجاد ساختمان"
                      spCaption="ایجاد ساختمان"
                      spId="a8f81a7d-e7e7-4c6e-afdd-1bd7c5065a72"
                      v-if="actionState.createBuilding"
                    />

                    <btn-default
                      @click="popupState.copyBuilding = true"
                      label="ایجاد ساختمان مشابه"
                      spCaption="ایجاد ساختمان مشابه"
                      spId="b702d532-d78a-4fcf-9729-db0e0796c658"
                      v-if="actionState.copyBuilding"
                    />

                    <btn-default
                      @click="setActionState('createApartment')"
                      label="ایجاد آپارتمان"
                      spCaption="ایجاد آپارتمان"
                      spId="063fe62b-ae7a-45e8-a024-c95b05472c09"
                      v-if="actionState.createApartment"
                    />

                    <btn-default
                      @click="popupState.copyApartment = true"
                      label="ایجاد آپارتمان مشابه"
                      spCaption="ایجاد آپارتمان مشابه"
                      spId="188ce6a3-8f9d-4b61-9c0f-33a831dfc234"
                      v-if="actionState.copyApartment"
                    />

                    <btn-default
                      @click="setActionState('createHouseSharing')"
                      label="ایجاد دستگاه"
                      spCaption="ایجاد دستگاه"
                      spId="382e066e-5d81-4f88-a166-1f410fe1a920"
                      v-if="actionState.createHouseSharing"
                    />

                    <btn-default
                      @click="popupState.copyHouseSharing = true"
                      label="ایجاد دستگاه مشابه"
                      v-if="actionState.copyHouseSharing"
                    />

                    <btn-default
                      @click="setActionState('createShop')"
                      label="ایجاد صنفی"
                      spCaption="ایجاد صنفی"
                      spId="6537caa8-c961-4d9f-b885-c1ec915e39e4"
                      v-if="actionState.createShop"
                    />
                    <btn-default
                      @click="popupState.copyShop = true"
                      label="ایجاد صنفی مشابه"
                      v-if="actionState.copyShop"
                    />

                    <btn-default
                      @click="addTab('mojaaz-parvaaneh-house', 'مجاز پروانه')"
                      label="مجاز پروانه"
                      spCaption="مجاز پروانه"
                      spId="1625dcdb-0b9d-4a7d-8c3c-ba4861e8c0ee"
                      v-if="actionState.mojaazParvaneh"
                    />
                    <btn-default
                      @click="addTab('mojaaz-house', 'مجاز پایانکار')"
                      label="مجاز پایانکار"
                      spCaption="مجاز پایانکار"
                      spId="c3ede130-920c-40cf-82e6-60db6d5030a0"
                      v-if="actionState.mojaazPayanakar"
                    />
                    <btn-default
                      @click="addTab('mojaaz-building', 'مجاز پایانکار')"
                      label="مجاز پایانکار ساختمان"
                      spCaption="مجاز پایانکار"
                      spId="c3ede130-920c-40cf-82e6-60db6d5030a0"
                      v-if="actionState.mojaazPayanakarBuilding"
                    />
                    <btn-default
                      @click="addTab('mojaz-apartment', 'مجاز پایانکار')"
                      label="مجاز پایانکار آپارتمان"
                      v-if="actionState.mojaazPayanakarApartment"
                    />
                    <btn-default
                      @click="addTab('mojaz-senfi', 'مجاز پایانکار')"
                      label="مجاز پایانکار صنفی"
                      v-if="actionState.mojaazPayanakarSenfi"
                    />
                    <btn-default
                      @click="addTab('mojaz-dastgah', 'مجاز پایانکار')"
                      label="مجاز پایانکار دستگاه"
                      v-if="actionState.mojaazPayanakarDastgah"
                    />
                    <btn-default
                      @click="
                        addTab('mojaaz-dastgah-parvaneh', 'مجاز پروانه دستگاه')
                      "
                      label="مجاز پروانه دستگاه"
                      v-if="actionState.mojaazParvanehDastgah"
                    />
                    <btn-default
                      @click="addTab('movafeghat-osooli', 'مجاز موافقت اصولی')"
                      label="مجاز موافقت اصولی"
                      spCaption="مجاز موافقت اصولی"
                      spId="81110bf3-d526-489a-9041-a3a05a67d835"
                      v-if="actionState.mojaazMovafeghat"
                    />
                  </button-group>
                </div>
                <div
                  class="col flex justify-end items-center nowrap"
                  v-show="isExistInTajmi"
                >
                  <safa-notice
                    :margin="false"
                    class="q-mr-sm"
                    paddingSize="3px"
                  >
                    کد تجمیع
                  </safa-notice>
                </div>
              </div>
            </div>
            <q-separator />
            <div class="q-pa-sm">
              <q-toolbar
                :class="['items-center q-px-sm q-py-xs', $q.dark.isActive?'bg-dark':'bg-grey-3']"
                style="min-height: 34px; border-radius: 3px"
              >
                <q-toolbar-title class="text-body2">ساختار درختی
                </q-toolbar-title>
                <div class="flex q-gutter-x-sm items-center">
                  <safa-text
                    v-model="treeFilter"
                    dir="ltr"
                    class="text-right"
                    label="فیلتر"
                  ></safa-text>
                  <btn-default @click="$refs.tree.collapseAll()">جمع کردن گره ها
                  </btn-default>
                  <btn-default @click="$refs.tree.expandAll()">باز کردن گره ها
                  </btn-default>
                </div>
              </q-toolbar>
            </div>
            <div class="custom-scroll">
              <div class="q-px-sm">
                <q-tree
                  :filter="treeFilter"
                  :nodes="nosaziCodeTrees"
                  :selected.sync="selectedBaseNosaziCode "
                  @update:selected="selectedNosaziCodeChanged"
                  class="bordered"
                  default-expand-all
                  label-key="label"
                  accordion
                  node-key="key"
                  :duration="0"
                  ref="tree"
                  selected-color="primary"
                >
                  <template v-slot:default-header="{ node }">
                    <div
                      @dblclick.stop="handleTreeDblClick(node)"
                      @click="onTreeNodeClick(node)"
                      class="flex items-center tree-item"
                    >
                      <q-icon
                        :name="node.icon"
                        size="21px"
                        class="q-ml-sm"
                      />
                      <div class="q-mx-sm">{{ node.label }}</div>
                      <q-btn
                        icon="pageview"
                        class="show-when-hover"
                        size="sm"
                        color="primary"
                        dense
                        round
                        flat
                        title="مشاهده جزئیات"
                        @click="handleTreeDblClick(node)"
                      ></q-btn>
                    </div>
                  </template>
                </q-tree>
              </div>
            </div>
          </fit>
        </tab-content>

        <tab-content
          :key="tab.name"
          :name="tab.name"
          :ref="tab.name"
          v-for="tab in tabs"
        >
          <mojaaz-parvaaneh-info
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-if="tab.name.startsWith('mojaaz-parvaaneh-house')"
            v-model="tab.nosaziCodeObject"
          />
          <mojaz-parvaneh-dastgah
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('mojaaz-dastgah-parvaneh')"
            v-model="tab.nosaziCodeObject"
          />
          <mojaaz-payankar-house
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('mojaaz-house')"
            v-model="tab.nosaziCodeObject"
            :nidNosaziCode="nidNosaziCode"
          />
          <mojaaz-payankar-building
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('mojaaz-building')"
            v-model="tab.nosaziCodeObject"
            :nidNosaziCode="nidNosaziCode"
          />
          <MojazPayankarApartment
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('mojaz-apartment')"
            v-model="tab.nosaziCodeObject"
            :nidNosaziCode="nidNosaziCode"
          />
          <mojaz-payankar-senfi
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('mojaz-senfi')"
            v-model="tab.nosaziCodeObject"
            :nidNosaziCode="nidNosaziCode"
          />
          <mojaz-payankar-dastgah
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('mojaz-dastgah')"
            v-model="tab.nosaziCodeObject"
            :nidNosaziCode="nidNosaziCode"
          />
          <mojaaz-movafeghat-osooli
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.name.startsWith('movafeghat-osooli')"
            v-model="tab.nosaziCodeObject"
          />
          <base-block-parvandeh
            :formKey="formKey"
            :name="name"
            :parentBaseNosaziCode="baseNosaziCode"
            :title="title"
            v-else-if="tab.EumNosaziCodeObjType === 1"
            v-model="tab.nosaziCodeObject"
          />
          <base-house-info-parvandeh
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
            :name="name"
            :parentBaseNosaziCode="baseNosaziCode"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.EumNosaziCodeObjType === 2"
            v-model="tab.nosaziCodeObject"
          />
          <base-building-info-parvandeh
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.EumNosaziCodeObjType === 3"
            v-model="tab.nosaziCodeObject"
          />
          <base-apartment-info-parvandeh
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
            :name="name"
            :parentBaseNosaziCode="baseNosaziCode"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.EumNosaziCodeObjType === 4"
            v-model="tab.nosaziCodeObject"
          />
          <base-house-sharing-info-parvandeh
            :baseNosaziCode="baseNosaziCode"
            :formKey="formKey"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
            :name="name"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.EumNosaziCodeObjType === 5"
            v-model="tab.nosaziCodeObject"
          />
          <base-shop-info-parvandeh
            :formKey="formKey"
            :mainNosaziCodeInfo="mainNosaziCodeInfo"
            :name="name"
            :parentBaseNosaziCode="baseNosaziCode"
            :title="title"
            @changeEditMode="changeEditMode($event,tab)"
            v-else-if="tab.EumNosaziCodeObjType === 6"
            v-model="tab.nosaziCodeObject"
          />
        </tab-content>
      </safa-tabs>

    </form-wrapper>

    <safa-popup
        title="کد نوسازی بلوک"
        width="400px"
        height="180px"
        v-model="popupState.createBlock"
      >
      <create-new-block
        :nosaziCodeTemplate="selectedNosaziCodeObject"
        :formKey="formKey"
        :name="name"
        :title="title"
        @success="handleNosaziCodeSuccess"
        @hide="popupState.createBlock = false"
      />
    </safa-popup>

      <safa-popup
        title="کد نوسازی ملک"
        width="400px"
        height="180px"
        v-model="popupState.createHouse"
      >
        <create-new-house
          :formKey="formKey"
          :name="name"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="handleNosaziCodeSuccess"
          @hide="popupState.createHouse=false"
        />
      </safa-popup>
      <safa-popup
        title="ایجاد ملک های مشابه"
        width="500px"
        height="200px"
        v-model="popupState.copyHouse"
      >
        <create-copy-house
          :formKey="formKey"
          :name="name"
          :nid-base="houseNosaziCode.NidBase"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="load"
          @hide="popupState.copyHouse = false"
        />
      </safa-popup>
      <safa-popup
        title=" کد نوسازی ساختمان"
        width="400px"
        height="180px"
        v-model="popupState.createBuilding"
      >
        <create-new-building
          :formKey="formKey"
          :name="name"
          :nosazi-code-template="selectedNosaziCodeObject"
          :parent="houseNosaziCode"
          :title="title"
          @success="handleNosaziCodeSuccess"
          @hide="popupState.createBuilding = false"
        />
      </safa-popup>

      <safa-popup
        title="ایجاد ساختمان های مشابه"
        width="500px"
        height="200px"
        v-model="popupState.copyBuilding"
      >
      <create-copy-building
          :nosazi-code-template="selectedNosaziCodeObject"
          :nid-base="buildingNosaziCode.NidBase"
          :formKey="formKey"
          :name="name"
          :title="title"
          @success="load"
          @hide="popupState.copyBuilding = false"
        />
      </safa-popup>

      <safa-popup
        title=" کد نوسازی آپارتمان"
        width="400px"
        height="180px"
        v-model="popupState.createApartment"
      >
        <create-new-apartment
          :formKey="formKey"
          :name="name"
          :nid-base="selectedNosaziCodeObject.NidBase"
          :nosaziCodeTemplate="selectedNosaziCodeObject"
          :title="title"
          @success="handleNosaziCodeSuccess"
          @hide="popupState.createApartment = false"
        />
      </safa-popup>
      <safa-popup
        title=" ایجاد آپارتمان مشابه"
        width="500px"
        height="200px"
        v-model="popupState.copyApartment"
      >
        <create-copy-apartment
          :formKey="formKey"
          :name="name"
          :nid-base="selectedNosaziCodeObject.NidBase"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="load"
          @hide="popupState.copyApartment = false"
        />
      </safa-popup>
      <safa-popup
        title=" کد نوسازی دستگاه"
        width="400px"
        height="180px"
        v-model="popupState.createHouseSharing"
      >
        <create-new-house-sharing
          :formKey="formKey"
          :name="name"
          :nid-base="selectedNosaziCodeObject.NidBase"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="handleNosaziCodeSuccess"
          @hide="popupState.createHouseSharing = false"
        />
      </safa-popup>
      <safa-popup
        title="ایجاد دستگاه مشابه"
        width="500px"
        height="200px"
        v-model="popupState.copyHouseSharing"
      >
        <create-copy-house-sharing
          :formKey="formKey"
          :name="name"
          :nid-base="selectedNosaziCodeObject.NidBase"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="load"
          @hide="popupState.copyHouseSharing = false"
        />
      </safa-popup>

      <safa-popup
        title=" کد نوسازی صنفی"
        width="400px"
        height="180px"
        v-model="popupState.createShop"
      >
        <create-new-shop
          :formKey="formKey"
          :name="name"
          :nid-base="selectedNosaziCodeObject.NidBase"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="handleNosaziCodeSuccess"
          @hide="popupState.createShop = false"
        />
      </safa-popup>
      <safa-popup
        title="ایجاد صنفی های مشابه"
        width="500px"
        height="200px"
        v-model="popupState.copyShop"
      >
        <create-copy-shop
          :formKey="formKey"
          :name="name"
          :nid-base="selectedNosaziCodeObject.NidBase"
          :nosazi-code-template="selectedNosaziCodeObject"
          :title="title"
          @success="load"
          @hide="popupState.copyShop = false"
        />
      </safa-popup>
  </safa-form>
</template>

<!-- eslint-disable eqeqeq -->
<script>
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"
import BaseBlockParvandeh from '../base-block-parvandeh/BaseBlockParvandeh'
import BaseHouseInfoParvandeh from '../base-house-info-parvandeh/BaseHouseInfoParvandeh.vue'
import BaseBuildingInfoParvandeh from '../base-building-info-parvandeh/BaseBuildingInfoParvandeh.vue'
import BaseApartmentInfoParvandeh from '../base-apartment-info-parvandeh/BaseApartmentInfoParvandeh.vue'
import BaseHouseSharingInfoParvandeh from '../base-house-sharing-info-parvandeh/BaseHouseSharingInfoParvandeh.vue'
import BaseShopInfoParvandeh from '..//base-shop-info-parvandeh/BaseShopInfoParvandeh.vue'
import MojaazParvaanehInfo from '../mojaaz-parvaneh-info/MojaazParvaanehInfo.vue'
import MojaazPayankarHouse from '../mojaaz-payankar-house/MojaazPayankarHouse.vue'
import MojaazPayankarBuilding from '../mojaaz-payankar-building/MojaazPayankarBuilding.vue'
import MojazPayankarApartment from './mojaz-payankar-apartment/MojazPayankarApartment'
import MojazPayankarSenfi from './mojaz-payankar-senfi/MojazPayankarSenfi'
import MojazPayankarDastgah from './mojaz-payankar-dastgah/MojazPayankarDastgah'
import MojazParvanehDastgah from './mojaaz-parvaneh-dastgah/MojazParvanehDastgah'
import MojaazMovafeghatOsooli from '../mojaaz-movafeghat-osooli/MojaazMovafeghatOsooli'
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
import { convertNosaziCodeObjectToString, convertStringToNosaziCodeObject, bindNosaziItem } from 'src/utils/nosaziCodeOperation'
import CreateCopyShop from './partials/CreateCopyShop'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { uid } from "quasar"

export default {
  mixins: [baseFormMixin],
  components: {
    CreateCopyShop,
    MojaazMovafeghatOsooli,
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
    BaseBlockParvandeh,
    BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseHouseSharingInfoParvandeh,
    BaseShopInfoParvandeh,
    MojaazParvaanehInfo,
    MojaazPayankarHouse,
    MojaazPayankarBuilding,
    MojazPayankarApartment,
    MojazPayankarSenfi,
    MojazPayankarDastgah,
    MojazParvanehDastgah
  },
  props: {
    preferNosaziCode: {
      type: Object,
      default: null
    },
    fromRequest: {
      type: Boolean,
      default: true
    },
    parentBaseNosaziCode: Object,
    hideClose: Boolean,
    shallshowCloseBtn: {
      type: Boolean,
      default: false
    }
  },
  mounted () {
    if (this.preferNosaziCode !== null) {
      this.baseNosaziCode = { ...this.preferNosaziCode }
      this.fetcheData(this.preferNosaziCode)
    }
  },
  data () {
    return {
      title: 'شهرسازی- اطلاعات پرونده',
      formKey: 'd23f79ea-3a80-43f7-a285-8c56b414e06b',
      name: 'UParvandehInfo',
      treeFilter: '',
      main: true,
      sidebarCompatible: true,

      selectedNosaziCodeObject: {
        NidBase: null,
        District: null,
        Region: null,
        Block: null,
        House: null,
        Building: null,
        Apartment: null,
        Shop: null
      },

      showcreateHouse: false,
      isExistInTajmi: false,
      forceRerender: true,
      result: null,
      currentTab: 'tree_tab',
      BuildingSettings: {
        ShahrsaziSettingsIncome: {
          Chk_CalculateIncomeFromSettings: true,
          Chk_HasDailyDeadlineType: false,
          Chk_DonotShowUserpriceColum: false,
          Chk_MablagheSystemWithDecimal: false,
          Chk_SeparatlyIntallment: false,
          Chk_JustIncomeCalculated: false,
          Dta_DeadlineDate: "",
          DayCount: 0
        },
        ShahrsaziSettings: {
          Chk_SendSMSInBlacklist: false,
          Chk_SendSMSExitFromBlacklist: false,
          Chk_SendSMSInTemporaryArchives: false,
          Chk_SendSMSInPermanentArchives: false,
          Chk_SendSMSRegisterRequest: false,
          SMSSignature: "",
          RevisitTimeFrom: "08:00",
          RevisitTimeTo: "22:00",
          RevisitDuration: 30,
          Chk_PreventRevisitInHolidays: false,
          Chk_CalculateZabeteh: false,
          Chk_SetMaoCode: false,
          Chk_FillUnregisteredCode: false,
          Chk_MissFoulUserChecking: false,
          Chk_RevisitAgentCopyChecking: false,
          Chk_CommissionFine: false,
          Chk_CommisionVoteChecking: false,
          Chk_IsComboRequesterName: false,
          Chk_IsMultipleSendToBlackList: false,
          Chk_IsCopyShArchiveFromParvandeh: false,
          Chk_IsCurrentDateForConfirmLicence: false,
          Chk_IsCheckSabt: false,
          Chk_IsCheckSabtWCF: false,
          Chk_IsCheckSabtJson: false,
          Chk_IsCheckMapInfo: false,
          Chk_IsChecExistBlock: false,
          Chk_IsChecUserInDutyCodes: false,
          Chk_PreventCancelRequest: false,
          DontAddShopToHouse: false,
          LayerIdCommision5: "",
          UsingCount: 1,
          ArchiveParvanehEntityId: 1,
          ArchiveAnswerEstelamEntityId: 1,
          ArchivePayankarEntityId: 1,
          ArchiveMapCommandEntityId: 1,
          ArchiveCertificateOfContraryEntityId: 1,
          ArchivePrincipalAgreementEntityId: 1,
          Chk_IsCheckCommissionInExitTemporary: false,
          Chk_IsShowBaseDig: false,
          Chk_IsChangeNosaziCodeInSubSystems: false,
          Chk_DontCheckCroquisInRevisit: false,
          Chk_DontCheckPreCommissionInfo: false,
          Chk_IsSelectOnObjTypeInRevisit: false,
          Chk_AllowExitFromBlackListWithSameGroups: false,
          Chk_DontCheckRequestInConvertBuildingToHousSharing: false,
          Chk_DontCheckRequestInConvertHousSharingToBuilding: false,
          Chk_DontShowMomayeziGroup: false,
          Chk_DontValidationInBlackList: false,
          Chk_BackToStartInConvert: false,
          Chk_DontShowPenaltyGroup: false,
          Chk_GenerateDateAndConversionDateToYear: false,
          Chk_GenerateDateAndConversionDateToDate: false,
          Chk_GenerateYear: false
        }
      },
      tabs: [
        // {
        //   name: 'tree_tab',
        //   title: 'ساختار درختی',
        //   persist: true // Not closeable
        // }
      ],
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
      selectedBaseNosaziCode: '0-0-0-0-0-0-0',
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
      popupState: {
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
        mojaazPayanakarBuilding: false,
        mojaazMovafeghat: false
      },
      mainNosaziCodeInfo: { MainObj: {} },
      nidNosaziCode: "00000000-0000-0000-0000-000000000000",
      IsBlackListCheck: false,
      getaNosaziCodeInBlackListRes: null
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
    isShowBaseInfoGroupCombo () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue('infoGroupCombo').isShowBaseInfoGroupCombo
    },
    // actions () {
    //   const EumNosaziCodeObjType =
    //     this.selectedNosaziCodeObject.EumNosaziCodeObjType
    //   return {
    //     createBlock: true, // EumNosaziCodeObjType > 0,
    //     createHouse: EumNosaziCodeObjType > 0,
    //     createBuilding: EumNosaziCodeObjType === 2,
    //     createApartment:
    //       EumNosaziCodeObjType === 3 || EumNosaziCodeObjType === 5,
    //     createHouseSharing: EumNosaziCodeObjType === 2,
    //     createShop: EumNosaziCodeObjType >= 2 && EumNosaziCodeObjType <= 5,
    //     copyHouse: EumNosaziCodeObjType === 2 || EumNosaziCodeObjType === 4,
    //     copyBuilding: EumNosaziCodeObjType === 3,
    //     copyApartment: EumNosaziCodeObjType === 4,
    //     copyHouseSharing: EumNosaziCodeObjType === 5,
    //     copyShop: EumNosaziCodeObjType === 6,
    //     mojaazParvaneh: EumNosaziCodeObjType === 2,
    //     mojaazPayanakar: EumNosaziCodeObjType === 2,
    //     mojaazPayanakarBuilding: EumNosaziCodeObjType === 3,
    //     mojaazPayanakarApartment: EumNosaziCodeObjType === 4,
    //     mojaazPayanakarSenfi: EumNosaziCodeObjType === 6,
    //     mojaazPayanakarDastgah: EumNosaziCodeObjType === 5,
    //     mojaazParvanehDastgah: EumNosaziCodeObjType === 5,
    //     mojaazMovafeghat:
    //       EumNosaziCodeObjType === 2 || EumNosaziCodeObjType === 3
    //   }
    // },
    // selectedNosaziCodeObject () {
    //   // todo: این بخش باید چک بشه که چرا توی کامپیوتد هست
    //   const { NidBase } = this.getNodeByKey(this.selectedBaseNosaziCode) || {}
    //   return this.childTree.filter((x) => x.NidBase === NidBase)[0] || {}
    // },
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
    async loadFormSetting () {
      try {
        this.BuildingSettings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "BuildingSettings",
            defaultValue: this.BuildingSettings,
            nidProc: GLOBAL_SETTINGS_GUID // unique guid for global settings
          }
        )
      } catch (e) {
        this.showError("خطا در دریافت تنظیمات شهرسازی.")
      }
    },
    changeActionStateBasedOnEumNosaziCodeObjType (node) {
      this.IsBlackListCheck = false
      this.actionState.createHouse = true
      this.actionState.createBuilding = false
      this.actionState.createApartment = false
      this.actionState.copyApartment = false
      this.actionState.copyBuilding = false
      this.actionState.copyHouseSharing = false
      this.actionState.createShop = false //
      this.actionState.mojaazParvaneh = false
      this.actionState.mojaazPayanakar = false
      this.actionState.mojaazPayanakarBuilding = false
      this.actionState.mojaazMovafeghat = false
      this.actionState.createHouseSharing = false
      this.actionState.copyShop = false
      // if (node.children.length > 0 > 0)
      // {
      this.baseNosaziCode = convertStringToNosaziCodeObject(node.nosaziCodeString)
      switch (node.EumNosaziCodeObjType)
      {
        case 2:
          this.actionState.createBuilding = true
          if (this.BuildingSettings.ShahrsaziSettings.DontAddShopToHouse) {
            this.actionState.createShop = false
          }
          else {
            this.actionState.createShop = true
          }
          this.actionState.copyHouseSharing = true
          this.actionState.mojaazParvaneh = true
          this.actionState.mojaazPayanakar = true
          this.actionState.mojaazPayanakarBuilding = true
          this.actionState.mojaazMovafeghat = true
          this.actionState.createApartment = true
          this.actionState.copyHouse = true
          this.actionState.createHouseSharing = true
          break
        case 3:
          this.actionState.createApartment = true
          this.actionState.copyBuilding = true
          this.actionState.createShop = true
          this.actionState.mojaazPayanakar = true
          this.actionState.mojaazPayanakarBuilding = true
          this.actionState.mojaazMovafeghat = false
          break
        case 5:
          this.actionState.createApartment = true
          this.actionState.createShop = true
          this.actionState.mojaazPayanakar = true
          this.actionState.mojaazPayanakarBuilding = true
          this.actionState.mojaazParvaneh = true
          this.actionState.copyHouseSharing = true
          this.actionState.mojaazMovafeghat = false
          break
        case 4:
          this.actionState.copyApartment = true
          this.actionState.createShop = true
          this.actionState.mojaazPayanakar = true
          this.actionState.mojaazPayanakarBuilding = true
          this.actionState.mojaazMovafeghat = false
          break
        case 6:
          this.actionState.mojaazPayanakar = true
          this.actionState.mojaazPayanakarBuilding = true
          this.actionState.mojaazMovafeghat = false
          this.actionState.copyShop = true
          break
        // }
      }
    },

    checkSelectedNode () {
      if (!this.selectedNosaziCodeObject) return false
      return true
    },

    onTreeNodeClick (node) {
      // this.$refs.tree.setExpanded(node.key, !this.$refs.tree.isExpanded(node.key))
      this.selectedNosaziCodeObject = node
      this.changeActionStateBasedOnEumNosaziCodeObjType(node)
    },
    setActionState (key) {
      if (!this.checkSelectedNode()) return

      // در شرط زیر چک میشود که نودی که انتخاب شده قبلا در لست سیاه بودن یانبودنش چک شود
      if (!this.IsBlackListCheck) {
        this.getaNosaziCodeInBlackList(key)
      } else {
        this.btnClickMethod(key)
      }
    },
    getaNosaziCodeInBlackList (key) {
      const payload = { pNidNosaziCode: this.selectedNosaziCodeObject.NidNosaziCode }
      this.$services.SA.getaNosaziCodeInBlackList(payload, this.config)
        .then(async ({ data }) => {
          this.getaNosaziCodeInBlackListRes = this.getResponse(data)
          if (this.getaNosaziCodeInBlackListRes.success) {
            const list = this.getaNosaziCodeInBlackListRes?.data?.NosaziCodeInBlackList ?? []
            if (list.length > 0) {
              const containsEumBlackListControl = list.map(b => b.EumBlackListControl).includes(1)
              if (containsEumBlackListControl) {
                // در لیست سیاه در حالت توقف
                this.showError("این کد نوسازی در لیست سیاه قرار دارد، شما نمی توانید برای آن فرزندی ایجاد کنید")
              } else {
                // در لیست سیاه در حالت هشدار
                this.showConfirm("این کد نوسازی در لیست سیاه است. آیا از انجام عملیات مورد نظر اطمینان دارید؟").onOk(
                  () => {
                    this.btnClickMethod(key)
                    this.IsBlackListCheck = true
                  }
                )
              }
            } else {
              this.IsBlackListCheck = true
              this.btnClickMethod(key)
            }

            const strNosaziCode = convertNosaziCodeObjectToString(this.baseNosaziCode)
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: 'کد نوسازی',
              nosaziCode: strNosaziCode,
              saveDesc: `بارگذاری اطلاعات برای شماره درخواست ${strNosaziCode.split("-").reverse().join("-")} در فرم ${this.title} انجام گردید.` }
            )
          }
        })
        .catch((e) => {
          console.error(e)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    closeParvandeh () {
      this.$emit('closeParvandeh', true)
    },
    btnClickMethod (key) {
      if (!this.checkSelectedNode()) return

      switch (key) {
        case "createBuilding":
          this.popupState.createBuilding = true
          break
        case "createApartment":
          this.popupState.createApartment = true
          break
        case "createHouseSharing":
          this.popupState.createHouseSharing = true
          break
        case "createShop":
          this.popupState.createShop = true
          break

        default:
          break
      }
    },
    fetcheData (value) {
      this.nidNosaziCode = value._NidNosaziCode || value.NidNosaziCode
      this.mainNosaziCodeInfo = value
      this.load()
    },
    changeEditMode (value, tab) {
      tab.isEditable = value
      // this.isEditable = value
    },
    infoGroupSelectedItemChanged (e) {
      this.options.EumBaseInfoGroup = e
      if (this.baseNosaziCode.District !== 0) {
        this.load()
      }
    },
    addTab (newTabName, title) {
      const already = this.tabs.filter((x) => x.name.startsWith(newTabName))[0]
      const isShowedAlready = !!already
      const tabName = isShowedAlready
        ? already.name
        : newTabName + uid()
      this.currentTab = tabName

      if (isShowedAlready) {
        return
      }
      const nosaziCodeObject = this.getNodeByKey(this.selectedBaseNosaziCode) || {}
      this.tabs.push({
        isEditable: false,
        name: tabName,
        title:
          title ||
          nosaziCodeObject.name +
          ' ' +
          this.selectedBaseNosaziCode.split('-').reverse().join('-'),
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
      //  v-close-popup
    },

    handleTreeDblClick (node) {
      const nosaziCode = node.nosaziCodeString
      if (parseInt(nosaziCode)) {
        this.selectedBaseNosaziCode = nosaziCode
        this.addTab(nosaziCode)
        const lastTab = this.tabs[this.tabs.length - 1].name
        this.$refs.mainTab.changeTab(lastTab)
      }
    },
    handleCloseTab (name, isEditable) {
      if (isEditable) {
        this.showError('فرم در حالت ویرایش قرار دارد.')
      } else {
        this.tabs = this.tabs.filter((x) => x.name !== name)
        if (this.currentTab === name) {
          this.currentTab = 'tree_tab'
          this.$refs.mainTab.changeTab('tree_tab')
        }
        if (this.$refs[name] && this.$refs[name][0]) {
          this.$refs[name][0].$destroy()
        }
      }
    },
    selectedNosaziCodeChanged (e) {
      if (e) {
        this.selectedBaseNosaziCode = e
        const nosaziObj = convertStringToNosaziCodeObject(e)
        this.baseNosaziCode = {
          ...this.baseNosaziCode,
          District: nosaziObj.District,
          Region: nosaziObj.Region,
          Block: nosaziObj.Block,
          House: nosaziObj.House,
          Building: nosaziObj.Building,
          Apartment: nosaziObj.Apartment,
          Shop: nosaziObj.Shop
        }
        this.selectedNosaziCodeFallBak = e
      } else {
        this.selectedBaseNosaziCode = this.selectedNosaziCodeFallBak
      }
    },
    async load () {
      // this.tabs = [this.tabs[0]]
      this.selectedBaseNosaziCode = ''
      this.currentTab = 'tree_tab'
      this.nosaziCodeTrees = []

      if (!this.baseNosaziCode.District) {
        return this.showError('کد نوسازی بدرستی تعیین نشده است')
      }

      this.showLoading()
      await this.$services.SA.getNosaziCodeTreeChild(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            ...this.options,
            NidUser: '00000000-0000-0000-0000-000000000000',
            NidBase: '00000000-0000-0000-0000-000000000000',
            NidNosaziCode: '00000000-0000-0000-0000-000000000000',
            NidNosaziCodeParent: '00000000-0000-0000-0000-000000000000',
            NidRevisit: '00000000-0000-0000-0000-000000000000'
          }
        },
        this.config
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          this.isExistInTajmi = this.result.data.IsExistInTajmi_
          if (!this.result.data.Base_Front) {
            this.result.data.Base_Front = []
          }

          if (this.result.success !== true) {
            return this.showError('اطلاعات کد نوسازی بارگذاری نشد')
          }

          this.childTree = this.result.data['ChildTree'].map(bindNosaziItem) || []
          const isValid = !!this.childTree.length
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          )
          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: 'کد نوسازی'

            // nosaziCode: strNosaziCode,
            // nidWorkItem: ''
          })
          if (isValid) {
            const sortedChildrenTree = this.sortTree(this.childTree)
            const tmpTree = []

            sortedChildrenTree.forEach((item, _index) => {
              const isRoot = item.IsRoot // || item.EumNosaziCodeObjType == 5

              if (isRoot) {
                tmpTree.push(item)
              }

              const tmpAllChildren = this.sortTree(sortedChildrenTree)
              sortedChildrenTree.splice(sortedChildrenTree.findIndex(e => e.NidNosaziCode === item.NidNosaziCode), 1)
              this.createTreeNodeStructure(item, tmpAllChildren)

              // sortedChildrenTree.splice(_index, 1)
            })

            this.nosaziCodeTrees = tmpTree
          } else {
            this.showError('کد نوسازی معتبر نمیباشد')
          }
        })
        .catch((response) => {
          this.serverError()
          console.error('load error', response)
        })
        .finally(() => {
          this.hideLoading()
          this.$nextTick(() => {
            if (this.$refs.tree) {
              this.$refs.tree.expandAll()
            }
          })
        })
    },

    sortTree (tree) {
      return tree.sort((a, b) => {
        if (a.IsRoot === b.IsRoot) {
          if (a.House !== b.House) return a.House - b.House
          if (a.Building !== b.Building) return a.Building - b.Building
          if (a.Apartment !== b.Apartment) return a.Apartment - b.Apartment
          return a.Shop - b.Shop
        }

        return a.IsRoot ? -1 : 1
      })
    },

    createTreeNodeStructure (currentNode, allTreeNodes) {
      try {
        let tmpChildren
        const tmpNosaziCodeType = currentNode
        allTreeNodes = allTreeNodes.filter(a => a.NidBase !== tmpNosaziCodeType.NidBase)

        switch (tmpNosaziCodeType.EumNosaziCodeObjType) {
          case 1:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House > 0 && a.Building == 0 && a.Apartment == 0 && a.Shop == 0) ||
              (a.House == 0 && a.Building == 0 && a.Apartment == 0 && a.Shop > 0))
            break

          case 2:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House == tmpNosaziCodeType.House && a.Building > 0 && a.Apartment == 0 && a.Shop == 0) ||
              (a.House == tmpNosaziCodeType.House && a.Building == 0 && a.Apartment == 0 && a.Shop > 0))
            break

          case 3:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment > 0 && a.Shop == 0) ||
              (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment == 0 && a.Shop > 0))
            break

          case 4:
            tmpChildren = allTreeNodes.filter(a =>
              a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment == tmpNosaziCodeType.Apartment && a.Shop > 0)
            break

          case 5:
            tmpChildren = allTreeNodes.filter(a =>
              (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment > 0 && a.Shop == 0) ||
              (a.House == tmpNosaziCodeType.House && a.Building == tmpNosaziCodeType.Building && a.Apartment == 0 && a.Shop > 0))
            break

          default:
            tmpChildren = null
            break
        }

        if (tmpChildren && tmpChildren.length > 0) {
          tmpChildren.forEach(item => {
            const tmpCodeInfo = {
              ...item,
              children: []
            }

            if (!currentNode.children) currentNode.children = []

            currentNode.children.push(tmpCodeInfo)
            allTreeNodes.splice(allTreeNodes.findIndex(e => e.NidNosaziCode === item.NidNosaziCode), 1)
            this.createTreeNodeStructure(tmpCodeInfo, allTreeNodes)
          })
        }

        if (Array.isArray(allTreeNodes) && allTreeNodes.length > 0) {
        }
      } catch (ex) {
        console.error(ex)
      }
    }
  },

  async created () {
    await this.loadFormSetting()
  }
}
</script>
