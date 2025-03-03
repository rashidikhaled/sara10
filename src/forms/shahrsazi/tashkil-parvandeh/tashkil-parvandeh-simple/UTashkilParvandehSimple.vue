<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >

    <form-wrapper
      title="اطلاعات پرونده ساده"
      vertical
      :padding="false"
      @load="$emit('load')"
    >
      <template v-slot:header>
        <form-header-by-nosazi-code
          actions
          from-request
          v-model="baseNosaziCode"
          @fetched="fetcheData"
        />
        <safa-status :result="result" />
        <safa-status :result="result" />
      </template>
      <safa-tabs
        v-model="currentTab"
        type="fixed"
        ref="mainTab"
        fit
        :bordered="false"
        :padding="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="tree_tab"
            label="ساختار درختی"
          />

          <tab-menu
            v-for="{ name, title} in tabs"
            :key="name"
            :name="name"
            :label="title"
            closable
            @close="handleCloseTab(name)"
          />
        </template>
        <tab-content name="tree_tab">
          <fit>
            <!-- فیلد دسته های اطلاعاتی در مشهد وجود ندارد -->
            <!-- <div class="row q-mt-sm q-ml-sm">
              <safa-combo
                class="col-12 col-sm-4 col-md-3"
                label="دسته های اطلاعاتی"
                source-type="local"
                :options="enumBaseInfoGroupItems"
                v-model="options.EumBaseInfoGroup"
                :label-shrink="false"
              />
            </div> -->
            <!-- <q-separator class="q-mt-sm" /> -->
            <div class="custom-scroll fit">
              <q-tree
                ref="tree"
                class="bordered"
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
          <base-block-simple
            v-if="tab.EumNosaziCodeObjType === 1"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            @changeEditMode="changeEditMode"
            :selectedNosaziCode="selectedNosaziCode"
          />
          <base-house-info-parvandeh
            v-if="tab.EumNosaziCodeObjType === 2"
            v-model="tab.nosaziCodeObject"
            @changeEditMode="changeEditMode"
            :selectedNosaziCode="selectedNosaziCode"
          />
          <base-building-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 3"
            v-model="tab.nosaziCodeObject"
            @changeEditMode="changeEditMode"
            :selectedNosaziCode="selectedNosaziCode"
          />
          <base-apartment-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 4"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            @changeEditMode="changeEditMode"
            :selectedNosaziCode="selectedNosaziCode"
          />
          <base-house-sharing-info-parvandeh
            v-else-if="tab.EumNosaziCodeObjType === 5"
            v-model="tab.nosaziCodeObject"
            :formKey="formKey"
            :title="title"
            :name="name"
            @changeEditMode="changeEditMode"
            :selectedNosaziCode="selectedNosaziCode"
          />
        </tab-content>
      </safa-tabs>
    </form-wrapper>
  </safa-form>
</template>

<script>
import BaseBlockSimple from './BaseBlockSimple/BaseBlockSimple'
import BaseHouseInfoParvandeh from './BaseHouseInfoParvandeh/BaseHouseInfoParvandeh'
import BaseBuildingInfoParvandeh from './BaseBuildingInfoParvandeh/BaseBuildingInfoParvandeh'
import BaseApartmentInfoParvandeh from './BaseApartmentInfoParvandeh/BaseApartmentInfoParvandeh'
import BaseHouseSharingInfoParvandeh from './BaseHouseSharingInfoParvandeh/BaseHouseSharingInfoParvandeh'
import baseFormMixin from 'src/mixins/baseFormMixin'
import { convertNosaziCodeObjectToString } from 'src/utils/nosaziCodeOperation'

export default {
  route: '/parvandeh-simple/info',
  mixins: [baseFormMixin],
  components: {
    BaseBlockSimple,
    BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseHouseSharingInfoParvandeh
  },

  data () {
    return {
      title: 'شهرسازی- اطلاعات پرونده ساده',
      formKey: 'd23f79ea-3a80-43f7-a285-8c56b414e06b',
      name: 'UTashkilParvandehSimple',
      main: true,
      sidebarCompatible: true,
      isView: false,
      result: null,
      currentTab: 'tree_tab',
      tabs: [
        // {
        // name: 'tree_tab',
        // title: 'ساختار درختی',
        // persist: true // Not closeable
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
      selectedNosaziCode: '0-0-0-0-0-0-0',
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
      ]
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
    selectedNosaziCodeObject () {
      const { NidBase } = this.getNodeByKey(this.selectedNosaziCode) || {}
      return this.childTree.filter(x => x.NidBase === NidBase)[0] || {}
    }
  },
  methods: {
    fetcheData () {
      this.load()
    },
    getNodeByKey (key) {
      if (this.$refs.tree) {
        return this.$refs.tree.getNodeByKey(key)
      }
    },
    addTab (newTabName, title) {
      const already = this.tabs.filter(x => x.name.startsWith(newTabName))[0]
      const nosaziCodeObject = this.getNodeByKey(this.selectedNosaziCode) || {}
      if (nosaziCodeObject.EumNosaziCodeObjType !== 6) {
        const isShowedAlready = !!already
        const tabName = isShowedAlready
          ? already.name
          : newTabName + new Date().toString()
        this.currentTab = tabName

        if (isShowedAlready) {
          return
        }
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
      }
    },
    changeEditMode (value) {
      this.isEditable = value
    },
    handleCloseTab (name) {
      if (this.isEditable) {
        this.showError('فرم در حالت ویرایش قرار دارد.')
      } else {
        this.tabs = this.tabs.filter(x => x.name !== name)
        this.tabs = this.tabs.filter(x => x.name !== name)
        if (this.currentTab === name) {
          this.currentTab = 'tree_tab'
        }
        if (this.$refs[name] && this.$refs[name][0]) {
          this.$refs[name][0].$destroy()
        }
      }
    },
    handleTreeDblClick (e) {
      const nosaziCode = e.target.innerHTML
      // Validate NosaziCode hack
      // If it is a correct nosazi code, it should start with a greater than 0 number
      // When user dbClick somewhere else (Icon, whitespace, ...) the e.target.innerHTML is not a valid NosaziCode
      if (parseInt(nosaziCode)) {
        this.selectedNosaziCode = nosaziCode
        this.addTab(nosaziCode)
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
