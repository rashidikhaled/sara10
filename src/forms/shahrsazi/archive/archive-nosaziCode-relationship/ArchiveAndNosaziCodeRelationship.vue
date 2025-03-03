<template>
  <safa-form :id="formKey" :caption="title" app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b">
    <form-wrapper :hasFooter="false" :padding="false" :title="title" vertical>
      <fit>
        <template v-slot:header>
          <safa-status :result="result" />
          <safa-status :result="taskResult" />
          <form-header-by-nosazi-code
            v-model="baseNosaziCode"
            @fetched="handleBaseNosaziCodeChanged"
          />
        </template>
        <FormRow class="q-pa-sm">
          <FormControl>
            <safa-text
              label-width="90px"
              v-model="model.fullname"
              cdcName="fullname"
              dir="rtl"
              label="نام مالک"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="90px"
              v-model="model.oldCode"
              cdcName="oldCode"
              dir="ltr"
              label="کد قدیم"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              v-model="selectedArchiveGrp"
              cdcName="selectedArchiveGrp"
              ciName="CI_ArchiveGroup"
              dir="rtl"
              domainName="CI_SaraM1"
              label="گروه آرشیو"
              label-width="90px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="90px"
              v-model="model.baseRegisterPlackStr"
              cdcName="baseRegisterPlackStr"
              dir="rtl"
              label="پلاک ثبتی"
              m="r"
            />
          </FormControl>
          <FormControl class="col-12">
            <safa-text
              label-width="90px"
              v-model="model.address"
              cdcName="address"
              dir="rtl"
              label="آدرس"
              m="r"
            />
          </FormControl>
        </FormRow>
        <q-separator />
        <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu label="اطلاعات آرشیو" name="ArchiveInfo" />
            <tab-menu label="نمایش آرشیو" name="ArchiveIllustration" />
          </template>
          <tab-content
            name="ArchiveInfo"
            title="اطلاعات آرشیو"
            :padding="false"
          >
            <FormRow class="q-pa-sm">
              <FormControl>
                <safa-text
                  label-width="90px"
                  v-model="model.currentArchivekey"
                  cdcName="currentArchivekey"
                  dir="ltr"
                  label="کلید آرشیو موجود"
                  m="r"
                />
              </FormControl>
              <FormControl>
                <safa-text
                  label-width="90px"
                  v-model="newArchiveCode"
                  cdcName="newArchiveCode"
                  dir="ltr"
                  label="کلید آرشیو جدید"
                />
              </FormControl>
              <div class="col-auto">
                <btn-default label="کد جدید" @click="generateArchiveCode" />
              </div>
              <FormControl>
                <safa-text
                  label-width="90px"
                  v-model="model.fullname"
                  cdcName="fullname"
                  label="نام مالک"
                  m="r"
                />
              </FormControl>
              <div class="col-auto">
                <btn-search @click="search" />
              </div>
              <div class="col-auto">
                <btn-default
                  label="ایجاد ارتباط"
                  @click="mapArchiveBizCodeToNosaziCode"
                />
              </div>
              <FormControl class="col-12">
                <safa-text
                  label-width="90px"
                  v-model="model.address"
                  cdcName="address"
                  dir="rtl"
                  label="آدرس"
                  m="r"
                />
              </FormControl>
            </FormRow>
          </tab-content>
          <tab-content
            :padding="false"
            name="ArchiveIllustration"
            title="توضیحات"
          >
            <fit>
              <ArchiveWrap
                :name="archiveConfig.username"
                :pass="archiveConfig.password"
                :biz-code="archiveBizCode"
              ></ArchiveWrap>
            </fit>
          </tab-content>
        </safa-tabs>
        <ShowModal
          v-model="isShowEstateSearchModal"
          title="جستجوی ملک"
          @hide="isShowEstateSearchModal = false"
          @onCloseModal="isShowEstateSearchModal = false"
        >
          <EstateSearch />
        </ShowModal>
      </fit>
    </form-wrapper>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import loaderMixin from "src/mixins/loaderMixin"
import messageMixin from "src/mixins/messageMixin"
import BtnDefault from "../../../../components/common/buttons/BtnDefault.vue"
import EstateSearch from "./partials/EstateSearch"
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation"

export default {
  route: "/archive/Archive-NosaziCode-Relationship",
  mixins: [baseFormMixin, loaderMixin, messageMixin],
  data: function () {
    return {
      title: "ارتباط آرشیو و کدنوسازی",
      formKey: "D7126429-7FDF-4F37-BC0D-F28D0E2BC4DC",
      name: "ArchiveAndNosaziCodeRelationship",
      selectedArchiveGrp: null,
      baseLibResults: {
        ArchiveWrapper: {}
      },
      model: {
        fullname: "",
        oldCode: "",
        baseRegisterPlackStr: "",
        address: "",
        currentArchivekey: ""
      },
      newArchiveCode: "",
      requestResult: null,
      main: true,
      isShowEstateSearchModal: false,
      sidebarCompatible: true,
      activeTab: "ArchiveInfo",
      result: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      nidWorkItem: "",
      taskResult: null,
      archiveBizCode: ""
    }
  },
  components: { BtnDefault, EstateSearch },
  methods: {
    map (data) {
      this.model.fullname =
        data.Base_Owner[0].OwnerName + " " + data.Base_Owner[0].OwnerLastName
      this.model.address = data.Base_AddressInfo.MainAddress
      this.model.baseRegisterPlackStr = data.Base_RegisterPlack_Str
      this.model.oldCode = data.Base_PreCodeInfo.PreCode
      this.model.currentArchivekey = data.ArchiveWrapper.BizCode
    },
    updateArchiveBizCode (bizCode) {
      // eslint-disable-next-line no-undef
      // archiveStore.bizCode = bizCode
      this.archiveBizCode = bizCode
      this.model.currentArchivekey = bizCode
    },
    handleBaseNosaziCodeChanged () {
      // getBaseLibInNosaziCode method
      this.ownerName = ""
      this.oldNosaziCode = ""
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
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pLoadFunc:
          "Base_AddressInfo,Base_Owner,Base_RegisterPlack_Str,Base_PreCodeInfo",
        pIsLoadDeletedNosaziCode: false
      }
      this.showLoading()
      this.$services.SA.getBaseLibInNosaziCode(data)
        .then(({ data }) => {
          this.requestResult = this.getResponse(data)

          if (this.requestResult.success) {
            this.map(this.requestResult.data)
            this.baseLibResults = this.requestResult.data
            if (this.baseLibResults.ArchiveWrapper) {
              this.selectedArchiveGrp =
                this.baseLibResults.ArchiveWrapper.CI_ArchiveGroup
            }
            this.updateArchiveBizCode(
              this.baseLibResults.ArchiveWrapper.BizCode
            )
          }
        })
        .catch((response) => {
          this.workflowListResult = this.getResponse(response)
          console.log("error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      this.isEditable = true
      this.isSearch = true
    },
    async mapArchiveBizCodeToNosaziCode () {
      // getBaseLibInNosaziCode method
      this.ownerName = ""
      this.oldNosaziCode = ""
      let data = {
        pBizCode: this.newArchiveCode,
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
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.showLoading()
      try {
        let dataResult = await this.$services.SC.mapArchiveBizCodeToNosaziCode(
          data
        )
        this.requestResult = this.getResponse(dataResult)
        if (this.requestResult.success) {
          if (this.requestResult.data.data.Archive_Wrapper !== null) {
            this.updateArchiveBizCode(
              this.requestResult.data.data.Archive_Wrapper.BizCode
            )
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            )
            await this.log({
              action: this.logActions.save,
              bizCode: strNosaziCode,
              nosaziCode: strNosaziCode,
              bizCodeArchive:
                this.requestResult.data.data.Archive_Wrapper.BizCode,
              bizCodeTitle: "کد نوسازی",
              saveDesc: "ایجاد ارتباط"
            })
            this.showSuccess("عملیات با موفقیت انجام شد")
          }
        }
      } catch (error) {
        console.log(error)
        this.workflowListResult = this.getResponse(error)
        this.serverError()
      } finally {
        this.hideLoading()
      }
      this.isEditable = true
      this.isSearch = true
    },
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    generateArchiveCode () {
      this.newArchiveCode = this.newGuid()
    },
    hasArchiveBizCodeInNosaziCode () {
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
          IsRoot: "false",
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          Region: this.baseNosaziCode.Region,
          Shop: this.baseNosaziCode.Shop
        },
        pCI_ArchiveGroup: this.selectedArchiveGrp
      }
      this.showLoading()
      return this.$services.SC.hasArchiveBizCodeInNosaziCode(data)
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (this.result.success) {
            if (this.requestResult.data.Archive_Wrapper !== null) {
              this.updateArchiveBizCode(
                this.result.data.Archive_Wrapper.BizCode
              )
              const strNosaziCode = convertNosaziCodeObjectToString(
                this.baseNosaziCode
              )
              await this.log({
                action: this.logActions.view,
                bizCode: strNosaziCode,
                nosaziCode: strNosaziCode,
                bizCodeArchive: this.result.data.Archive_Wrapper.BizCode,
                bizCodeTitle: "کد نوسازی"
              })
            } else {
              this.showError("کد آرشیو یافت نشد")
            }
          } else {
            this.showError("انجام نشد")
          }
        })
        .catch((data) => {
          this.getResponse(data)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    search () {
      this.isShowEstateSearchModal = true
    }
  },
  computed: {
    archiveConfig () {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("archiveCore")
    }
  },
  watch: {
    selectedArchiveGrp () {
      this.hasArchiveBizCodeInNosaziCode()
    }
  }
}
</script>
