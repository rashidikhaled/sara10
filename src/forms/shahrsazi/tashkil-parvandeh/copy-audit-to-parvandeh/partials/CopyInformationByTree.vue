<template>
  <FormWrapper :hideTitle="hideTitle" :title="title">
    <fit>
      <div class="row fit">
        <div style="flex: 1">
          <!-- class="window-height"
          unit="%" -->
          <safa-splitter horizontal v-model="horizontalSplitter">
            <template #before>
              <span> ساختار درختی کد نوسازی </span>
              <q-tree
                ref="tree"
                default-expand-all
                selected-color="primary"
                node-key="nosaziCodeString"
                :nodes="nosaziCodeTrees"
                :selected.sync="selectedNosaziCodeAudit"
              >
                <!-- @update:selected="handelSelectedTree1" -->
              </q-tree>
            </template>
            <template #after>
              <div class="q-mt-md">ساختار درختی اطلاعات</div>
              <q-tree
                default-expand-all
                :nodes="infoNodes"
                node-key="Id"
                label-key="Title"
                tick-strategy="leaf"
                :ticked.sync="ticked"
              />
            </template>
          </safa-splitter>
        </div>
        <div style="flex: 7">
          <safa-splitter v-model="infoSplitter">
            <template #before>
              <safa-tabs v-model="activemomayezTab">
                <template v-slot:tabs>
                  <tab-menu name="momayeziInformation" label="اطلاعات ممیزی" />
                </template>
                <tab-content name="momayeziInformation" title="اطلاعات ممیزی">
                  <base-house-info-audit
                  :activeTabGlobal="activeTabGlobal1"
                    @setTab="setTab"
                    v-if="
                      selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 2
                    "
                    v-model="selectedNosaziCodeAuditObject"
                    read-only
                  />
                  <base-building-info-audit
                  :activeTabGlobal="activeTabGlobal2"
                    v-else-if="
                      selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 3
                    "
                    v-model="selectedNosaziCodeAuditObject"
                    read-only
                  />
                  <base-apartment-info-audit
                  :activeTabGlobal="activeTabGlobal3"
                    v-else-if="
                      selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 4
                    "
                    v-model="selectedNosaziCodeAuditObject"
                    read-only
                  />
                  <base-shop-info-audit
                  :activeTabGlobal="activeTabGlobal4"
                    v-else-if="
                      selectedNosaziCodeAuditObject.EumNosaziCodeObjType === 6
                    "
                    v-model="selectedNosaziCodeAuditObject"
                    read-only
                  />
                </tab-content>
              </safa-tabs>
            </template>
            <template #after>
              <safa-tabs v-model="activeParvandehTab">
                <template v-slot:tabs>
                  <tab-menu
                    name="parvandehInformation"
                    label="اطلاعات تشکیل پرونده"
                  />
                </template>
                <tab-content
                  name="parvandehInformation"
                  title="اطلاعات تشکیل پرونده"
                >
                  <q-spinner v-if="isLoadingParvandeh" />
                  <base-house-info-parvandeh
                  :activeTabGlobal="activeTabGlobal1"
                    v-if="
                      selectedNosaziCodeParvandehObject.EumNosaziCodeObjType ===
                      2
                    "
                    v-model="selectedNosaziCodeParvandehObject"
                    :parentBaseNosaziCode="baseNosaziCodeAudit"
                    :baseNosaziCode="baseNosaziCodeAudit"
                    read-only
                  />
                  <base-building-info-parvandeh
                  :activeTabGlobal="activeTabGlobal2"
                    v-else-if="
                      selectedNosaziCodeParvandehObject.EumNosaziCodeObjType ===
                      3
                    "
                    v-model="selectedNosaziCodeParvandehObject"
                    :baseNosaziCode="baseNosaziCodeAudit"
                    read-only
                  />
                  <base-apartment-info-parvandeh
                  :activeTabGlobal="activeTabGlobal3"
                    v-else-if="
                      selectedNosaziCodeParvandehObject.EumNosaziCodeObjType ===
                      4
                    "
                    v-model="selectedNosaziCodeParvandehObject"
                    :baseNosaziCode="baseNosaziCodeAudit"
                    read-only
                  />
                  <base-shop-info-parvandeh
                  :activeTabGlobal="activeTabGlobal4"
                    :parentBaseNosaziCode="baseNosaziCodeAudit"
                    v-else-if="
                      selectedNosaziCodeParvandehObject.EumNosaziCodeObjType ===
                      6
                    "
                    v-model="selectedNosaziCodeParvandehObject"
                    read-only
                  />
                </tab-content>
              </safa-tabs>
            </template>
          </safa-splitter>
        </div>
        <!-- <div class="row q-gutter-md q-mt-md">
          <div class="col-auto">
            <q-btn
              label="کپی اطلاعات"
              icon="file_copy"
              color="primary"
              :disable="!selectedNosaziCodeParvandehObject"
              @click="handleCopy"
            />
          </div>
          <div class="col-auto">
            <q-btn
              label="انصراف"
              icon="close"
              v-close-popup
            />
          </div>
        </div> -->
      </div>
    </fit>
    <template v-slot:footer>
      <btn-default label="کپی اطلاعات" @click="handleCopy"
    /></template>
  </FormWrapper>
</template>

<script>
import infoGroups from "../models/infoGroups"
import BaseHouseInfoParvandeh from "../../base-house-info-parvandeh/BaseHouseInfoParvandeh.vue"
import BaseBuildingInfoParvandeh from "../../base-building-info-parvandeh/BaseBuildingInfoParvandeh.vue"
import BaseApartmentInfoParvandeh from "../../base-apartment-info-parvandeh/BaseApartmentInfoParvandeh.vue"
import BaseShopInfoParvandeh from "../../base-shop-info-parvandeh/BaseShopInfoParvandeh.vue"
import BaseHouseInfoAudit from "../../tashkil-parvandeh-audit/BaseHouseInfoAudit/BaseHouseInfoAudit"
import BaseBuildingInfoAudit from "../../tashkil-parvandeh-audit/BaseBuildingInfoAudit/BaseBuildingInfoAudit"
import BaseApartmentInfoAudit from "../../tashkil-parvandeh-audit/BaseApartmentInfoAudit/BaseApartmentInfoAudit"
import BaseShopInfoAudit from "../../tashkil-parvandeh-audit/BaseShopInfoAudit/BaseShopInfoAudit"
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  name: "CopyInformationByTree",

  components: {
    BaseHouseInfoParvandeh,
    BaseBuildingInfoParvandeh,
    BaseApartmentInfoParvandeh,
    BaseShopInfoParvandeh,
    BaseHouseInfoAudit,
    BaseBuildingInfoAudit,
    BaseApartmentInfoAudit,
    BaseShopInfoAudit
  },
  mixins: [baseFormMixin],
  props: {
    baseLibInNosaziCodeAudit: Object,
    hideTitle: Boolean,
    formKey: {
      type: String,
      default: "",
      required: true
    },
    title: {
      type: String,
      default: "",
      required: true
    },
    name: {
      type: String,
      default: "",
      required: true
    },
    baseNosaziCodeAudit: {
      type: Object,
      default () {
        return {}
      }
    }
  },

  data () {
    return {
      activeTabGlobal1: {
        currentTab: "address"
      },
      activeTabGlobal2: {
        currentTab: "buildingInfo"
      },
      activeTabGlobal3: {
        currentTab: "apartmentInfo"
      },
      activeTabGlobal4: {
        currentTab: "baseOwner"
      },
      result: null,
      result2: null,
      result3: null,
      infoSplitter: 50,
      horizontalSplitter: 50,
      activemomayezTab: "momayeziInformation",
      activeParvandehTab: "parvandehInformation",
      nosaziCodeTrees: [],
      selectedNosaziCodeAudit: null,
      baseLibInNosaziCodeParvandeh: null,
      momayeziConnectToParvandehList: null,
      ticked: [],
      infoGroups
    }
  },
  watch: {
    selectedNosaziCodeAudit () {
      this.handelSelectedTree1()
    }
  },

  computed: {
    config () {
      return {
        config: {
          District: this.selectedNosaziCodeAuditObject.District
        }
      }
    },
    infoNodes () {
      return (
        (this.infoGroups &&
          this.infoGroups[this.selectedNosaziCodeAuditObject.EumNosaziCodeObjType]) ||
        []
      )
    },
    selectedNosaziCodeAuditObject () {
      return this.getNodeByKey(this.selectedNosaziCodeAudit) || {}
    },
    selectedNosaziCodeParvandehObject () {
      return (
        (this.baseLibInNosaziCodeParvandeh &&
          this.baseLibInNosaziCodeParvandeh["MainObj"]) ||
        {}
      )
    },
    isLoadingParvandeh () {
      return (
        this.selectedNosaziCodeAuditObject.EumNosaziCodeObjType &&
        !this.selectedNosaziCodeParvandehObject.EumNosaziCodeObjType
      )
    }
  },
  methods: {
    setTab (e) {
      this.activeTabGlobal = ""
    },
    handelSelectedTree1 () {
      setTimeout(() => {
        this.handleNosaziCodeSelected()
      }, 500)
    },
    async loadTree () {
      this.showLoading()
      try {
        const { data } = await this.$services.SA.getNosaziCodeTreeChild(
          {
            pNosaziCode: {
              ...this.baseLibInNosaziCodeAudit["MainObj"],
              EumNosaziCodeGroup: 1
            }
          },
          {
            config: {
              District: this.baseNosaziCodeAudit.District
            }
          }
        )
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.nosaziCodeTrees =
            this.result.data.ChildTree.length > 0
              ? this.createNosaziCodeTree(this.result.data.ChildTree)
              : []

          const strNosaziCode = await convertNosaziCodeObjectToString(
            this.baseNosaziCodeAudit
          )

          await this.log({
            action: this.logActions.view,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: strNosaziCode
          })
        } else {
          this.showError("درختواره برای کد ممیزی بارگذاری نشد")
        }
      } catch (error) {
        this.showError("در بارگذاری درختواره خطایی رخ داده است")
        console.erroe(error)
      } finally {
        this.hideLoading()
        this.$refs.tree.expandAll()
      }
    },

    async handleNosaziCodeSelected () {
      this.ticked = []
      this.baseLibInNosaziCodeParvandeh = null
      this.momayeziConnectToParvandehList = null
      if (
        !this.selectedNosaziCodeAuditObject ||
        !this.selectedNosaziCodeAuditObject.NidNosaziCode
      ) {
        return
      }

      this.showLoading()
      const help = await this.selectedNosaziCodeAuditObject.NidNosaziCode
      const payload = {
        pFromRow: 0,
        pToRow: 1,
        pWhere: ` NidNosaziCode_Momayezi = '${help}' `
      }
      this.$services.SC.getMomayeziConnectToParvandehList(payload, this.config)
        .then(async ({ data }) => {
          this.result2 = this.getResponse(data)
          if (this.result2.success) {
            const list = this.result2.data["MomayeziConnectToParvandehList"]
            if (list && list.length) {
              this.momayeziConnectToParvandehList = list[0]
              const nosaziCodeParvandehObject = {
                District:
                  this.momayeziConnectToParvandehList.District_Parvandeh,
                Region: this.momayeziConnectToParvandehList.Region_Parvandeh,
                Block: this.momayeziConnectToParvandehList.Block_Parvandeh,
                House: this.momayeziConnectToParvandehList.House_Parvandeh,
                Building:
                  this.momayeziConnectToParvandehList.Building_Parvandeh,
                Apartment:
                  this.momayeziConnectToParvandehList.Apartment_Parvandeh,
                Shop: this.momayeziConnectToParvandehList.Shop_Parvandeh
              }

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode
              })

              return this.$services.SA.getBaseLibInNosaziCode(
                {
                  pNosaziCode: {
                    ...nosaziCodeParvandehObject,
                    EumNosaziCodeGroup: 0,
                    NidUser: this.currentUser.NidUser
                  },
                  pLoadFunc:
                    "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_AddressPostCode,Base_PreCodeInfo",
                  pIsLoadDeletedNosaziCode: false
                },
                this.config
              )
            } else {
              this.showError("کد متصل به ممیزی یافت نشد")
            }
          } else {
            this.showError("کد متصل به ممیزی بارگذاری نشد")
          }
        })
        .then(async ({ data }) => {
          this.result3 = this.getResponse(data)
          if (this.result3.success) {
            this.baseLibInNosaziCodeParvandeh = this.result3.data

            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCodeAudit
            )

            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: strNosaziCode
            })
          } else {
            this.showError("کد متصل به تشکیل پرونده بارگذاری نشد")
          }
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    handleCopy () {
      if (!this.ticked || !this.ticked.length) {
        this.showError("لطفا ساختار درختی اطلاعات را مشخص نمایید")
        return
      }
      this.showConfirm("آیا از کپی اطلاعات اطمینان دارید؟").onOk(() => {
        this.showLoading()
        this.$services.SC.copyMomayeziBaseInfoToParvandeh(
          {
            pNidBaseFrom: this.selectedNosaziCodeAuditObject.NidBase,
            pNidBaseTo: this.selectedNosaziCodeParvandehObject.NidBase,
            pNidNosaziCodeTo: this.selectedNosaziCodeAuditObject.NidNosaziCode,
            pEumBaseInfoGroupTo: 0,
            pEumRevisitGroupTo: 0,
            pNidRevisitTo: "00000000-0000-0000-0000-000000000000",
            pTableNames: this.ticked.join(",")
          },
          this.config
        )
          .then(async ({ data }) => {
            const result = this.getResponse(data)
            if (result.success) {
              this.showSuccess("عملیات با موفقیت انجام شد")

              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCodeAudit
              )

              await this.log({
                action: this.logActions.save,
                bizCode: strNosaziCode,
                bizCodeTitle: "کد نوسازی",
                nosaziCode: strNosaziCode
              })

              this.handelSelectedTree1()
            } else {
              this.showError("عملیات ناموفق بود")
            }
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    },

    getNodeByKey (key) {
      const help = this.$refs.tree && this.$refs.tree.getNodeByKey(key)
      console.log("============================>>>>>>>>>>>>>>>", help)
      return this.$refs.tree && this.$refs.tree.getNodeByKey(key)
    }
  },

  mounted () {
    this.loadTree()
  }
}
</script>
