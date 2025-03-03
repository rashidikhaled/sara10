<template>
  <safa-form
    :caption="title"
    :id="formKey"
    app-id="58819065-F293-4972-A718-E79C4E50D277"
  >
    <form-wrapper :tilte="title">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetched"
          cdcName="baseNosaziCode"
        />
      </template>
      <fit>
        <safa-tabs v-model="activeTab" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="tree_tab" label="ساختار درختی" />
            <tab-menu name="requestsList" label="لیست درخواست ها" />
            <tab-menu name="electronicArchive" label="آرشیو الکترونیکی" />
          </template>
          <tab-content name="tree_tab">
            <fit>
              <div class="q-pa-sm">
                <q-toolbar
                  :class="[
                    'items-center q-px-sm q-py-xs',
                    $q.dark.isActive ? 'bg-dark' : 'bg-grey-3',
                  ]"
                  style="min-height: 34px; border-radius: 3px"
                >
                  <q-toolbar-title class="text-body2"
                    >ساختار درختی
                  </q-toolbar-title>
                  <div class="flex q-gutter-x-sm items-center">
                    <safa-text
                      v-model="treeFilter"
                      dir="ltr"
                      class="text-right"
                      label="فیلتر"
                    />
                    <btn-default
                      label="جمع کردن گره ها"
                      @click="$refs.tree.collapseAll()"
                    />
                    <btn-default
                      label="باز کردن گره ها"
                      @click="$refs.tree.expandAll()"
                    />
                  </div>
                </q-toolbar>
              </div>
              <q-tree
                :filter="treeFilter"
                :nodes="nosaziCodeTrees"
                class="bordered"
                default-expand-all
                label-key="label"
                accordion
                node-key="nosaziCodeString"
                :duration="0"
                ref="tree"
                selected-color="primary"
              >
                <template v-slot:default-header="{ node }">
                  <div class="flex items-center tree-item">
                    <q-icon :name="node.icon" size="21px" class="q-ml-sm" />
                    <div
                      class="q-mx-sm cursor-pointer"
                      @click="selectedNosaziCodeChanged(node)"
                    >
                      {{ node.label }}
                    </div>
                    <q-btn
                      icon="pageview"
                      class="show-when-hover"
                      size="sm"
                      color="primary"
                      dense
                      round
                      flat
                      title="مشاهده جزئیات"
                      @click="showDetailOfNosazoCodeOnTree(node)"
                    ></q-btn>
                  </div>
                </template>
              </q-tree>
            </fit>
          </tab-content>

          <tab-content
            name="requestsList"
            @changeTreeTab="activeTab = 'tree_tab'"
          >
            <fit>
              <ControlList
                v-model="responserKartable"
                :baseNosaziCode="baseNosaziCode"
                :formKey="formKey"
                :name="name"
                :title="title"
                @selectRequestFromRequestList="selectRequestFromRequestList"
              />
            </fit>
          </tab-content>
          <tab-content name="electronicArchive">
            <fit>
              <ArchiveWrap
                :name="archiveConfig.username"
                :pass="archiveConfig.password"
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseLibInNosaziCodeModel from "./models/baseLibInNosaziCode"
import ControlList from "./partials/ControlList"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  components: {
    ControlList
  },

  data () {
    return {
      name: "UBuildingPoliceReview",
      title: "بازبینی پرونده",
      formKey: "DA19CC67-4C0C-498D-BFC1-79C797450FC6",
      main: true,
      activeTab: "tree_tab",
      treeFilter: "",
      nosaziCodeTrees: [],
      baseLibInNosaziCode: { ...baseLibInNosaziCodeModel },
      model: {
        ownerName: "",
        address: "",
        oldCode: ""
      },
      selectedNosazi: "",
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      options: {
        CI_City: 0,
        EumRevisitGroup: 0,
        EumBaseInfoGroup: 0,
        EumNosaziCodeGroup: 0,
        IsRoot: false
      },
      selectNosaziCode: null,
      skip: 0,
      take: 1000,
      responserKartable: [],
      selectedRequestFromRequestList: null
    }
  },
  methods: {
    fetched (val) {
      this.activeTab = "tree_tab"
      this.baseLibInNosaziCode = val
      this.loadObj()
    },
    loadObj () {
      this.selectedNosazi = ""
      this.activeTab = "tree_tab"
      this.nosaziCodeTrees = []
      this.childTree = null
      if (!this.baseNosaziCode.District) {
        return this.showError("کد نوسازی به درستی تعیین نشده است.")
      }
      this.showLoading()
      this.$services.SA.getNosaziCodeTreeChild(
        {
          pNosaziCode: {
            ...this.baseNosaziCode,
            ...this.options,
            NidUser: "00000000-0000-0000-0000-000000000000",
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000"
          }
        },
        this.config
      )
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (!res.data.Base_Front) res.data.Base_Front = []
          if (res.success !== true) {
            return this.showError("اطلاعات کد نوسازی بارگذاری نشد")
          }
          await this.log({
            action: this.logActions.view,
            bizCode: this.selectedRow.NosaziCode,
            bizCodeTitle: "کدنوسازی",
            nosaziCode: this.selectedRow.NosaziCode,
            saveDesc: `بازبینی پرونده برای کد نوسازی ${this.selectedRow.NosaziCode} انجام گردید.`
          })
          this.childTree = res.data["ChildTree"] || []
          const isValid = !!this.childTree.length
          if (isValid) {
            this.nosaziCodeTrees = this.createNosaziCodeTree(this.childTree)
          } else {
            this.showError("not correct")
          }
        })
        .catch((response) => {
          this.serverError()
          console.error("load error", response)
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
    selectedNosaziCodeChanged (e) {
      if (e) {
        this.selectNosaziCode = e
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          e.nosaziCodeString
        )
        this.getResponserKartabl()
        this.activeTab = "requestsList"
      }
    },
    getResponserKartabl () {
      this.showLoading()
      this.$services.SC.getResponserKartabl(
        {
          pFromRow: this.skip,
          pToRow: this.skip + this.take,
          pWhere: this.query
        },
        this.config
      )
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            if (!res.data.ResponserKartabl) return
            this.responserKartable = res.data.ResponserKartabl
            for (let i = 0; i < this.responserKartable.length; i++) {
              if (this.responserKartable[i].NidProc === "") {
                this.responserKartable[i].NidProc =
                  "00000000-0000-0000-0000-000000000000"
              }
            }
            this.selectedRequestFromRequestList = null
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectNosaziCode.nosaziCodeString,
              bizCodeTitle: "NidNosaziCode",
              saveDesc: `لیست درخواست ها ${this.selectNosaziCode.nosaziCodeString} در فرم بازبینی پرونده بارگذاری شد.`
            })
          } else {
            return this.showError("لیست درخواست ها بارگذاری نشد")
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
    selectRequestFromRequestList (val) {
      this.selectedRequestFromRequestList = val
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
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    },
    query () {
      const sql = [];
      // NosaziCode fields
      ["District", "Region", "Block", "House", "Building", "Apartment", "Shop"]
        .filter((field) => this.baseNosaziCode[field] !== 0)
        .forEach((field) => {
          sql.push(`BN.${field} = ${this.baseNosaziCode[field]}`)
        })
      sql.push("**")
      return " WHERE " + sql.join(" AND ")
    }
  },
  watch: {
    activeTab () {
      if (this.activeTab === "requestsList" && this.selectNosaziCode === null) {
        this.activeTab = "tree_tab"
        this.showError("لطفا کد نوسازی را انتخاب نمایید.")
      }
    }
  }
}
</script>
