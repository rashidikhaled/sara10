<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <form-wrapper :title="title" :padding="false">
      <safa-tabs v-model="activeTab">
        <template v-slot:tabs>
          <tab-menu name="checkList" label="لیست کنترلی" />
          <tab-menu
            v-if="isEditable"
            name="checkListinfo"
            label="اطلاعات لیست کنترلی"
          />
          <tab-menu
            v-if="showExitTab"
            name="exitTab"
            label="خروج از لیست سیاه"
          />
        </template>
        <tab-content name="checkList">
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  label="منطقه"
                  label-width="70px"
                  v-model="CI_Region"
                  cdcName="CI_Region"
                  ci-name="CI_Region"
                  domain-name="Commission100"
                />
              </FormControl>
            </FormRow>
            <safa-datatable
              fit
              :columns="commissionBlackListsColumns"
              v-model="blackLists"
              cdcName="blackLists"
              @selectedChange="selectedChange"
              m="r"
              height="100%"
              max-height="100%"
              min-height="200px"
              :show-selected-checkbox="true"
              :allowMultipleSelection="false"
              :addRow="false"
              :deleteRow="false"
              :allowCopy="false"
              paginate
            />
          </fit>
        </tab-content>
        <tab-content name="checkListinfo" v-if="isEditable">
          <fit>
            <FormRow class="q-mb-sm">
              <FormControl>
                <safa-combo
                  ciName="CI_BlackListType"
                  domainName="Commission100"
                  label="علت ورود"
                  label-width="100px"
                  v-model="model.Commission_BlackList.CI_BlackListType"
                  cdcName="CI_BlackListType"
                  :m="mode"
                  required
                  validations="required"
                />
              </FormControl>
              <nosazi-code-input
                label="کد نوسازی"
                label-width="70px"
                :actions="false"
                v-model="baseNosaziCode"
                cdcName="baseNosaziCode"
                required
                enabled="1-1-1-1-0-0-0"
                :m="activeTab === 'exitTab' ? 'r' : 'e'"
              />
              <div class="q-gutter-x-lg flex items-center">
                <safa-radio
                  label="عدم امکان ادامه عملیات"
                  :val="true"
                  v-model="model.Commission_BlackList.IsErrorStop"
                  cdcName="IsErrorStop"
                />
                <safa-radio
                  label="امکان ادامه عملیات"
                  :val="false"
                  v-model="model.Commission_BlackList.IsErrorStop"
                  cdcName="IsErrorStop"
                />
              </div>
            </FormRow>
            <safa-text
              label="توضیحات"
              label-width="70px"
              type="textarea"
              fit
              v-model="model.Commission_BlackList.DescInputBalckList"
              cdcName="DescInputBalckList"
              :m="mode"
              required
              rows="20"
              validations="required"
            />
          </fit>
        </tab-content>
        <tab-content name="exitTab" v-if="showExitTab">
          <fit>
            <!-- <FormRow class="q-mb-sm">
            <FormControl>
              <nosazi-code-input
                label="کد نوسازی"
                label-width="70px"
                :actions="false"
                v-model="baseNosaziCode"
                cdcName="baseNosaziCode"
                required
                m="r"
              />
            </FormControl>
          </FormRow> -->
            <safa-text
              label="توضیحات خروج"
              label-width="80px"
              type="textarea"
              fit
              v-model="model.Commission_BlackList.DescExitBalckList"
              cdcName="DescExitBalckList"
              required
              rows="20"
              validations="required"
            />
          </fit>
        </tab-content>
      </safa-tabs>
      <template #footer>
        <form-actions
          :m="mode"
          :showEditButton="false"
          :showNewButton="showExitTab ? false : true"
          @newInfo="newInfo"
          @edit="isEditable = true"
          @save="saveData"
          @cancel="cancel"
        >
          <template v-slot:after>
            <btn-default
              label="خروج از لیست سیاه"
              v-if="!showExitTab && !isEditable"
              @click="exitFromBlackList"
              :disable="
                selectedRow && selectedRow.NidUserExitBalckList === null
                  ? false
                  : true
              "
            />
            <btn-default
              label="حذف از لیست سیاه"
              v-if="!showExitTab && !isEditable"
              @click="removeFromBlackList"
            />
            <btn-save label="تایید خروج" v-if="showExitTab" @click="saveData" />
            <btn-default v-if="showExitTab" label="انصراف" @click="cancel" />
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import {
  convertStringToNosaziCodeObject,
  convertNosaziCodeObjectToString
} from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],

  data () {
    return {
      title: "لیست سیاه",
      name: "UCommissionBlackList",
      formKey: "74b751d5-a537-4e86-bf94-47990adaa6ac",
      main: true,

      activeTab: "checkList",
      selectedRow: null,
      showExitTab: false,
      isView: false,
      CI_Region: 0,
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
        Commission_BlackList: {
          CI_BlackListType: 0,
          IsEnable: "true",
          IsErrorStop: "false",
          NidCommission: "00000000-0000-0000-0000-000000000000",
          NidCommissionBlackList: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          NosaziCode: ""
        },
        Commission_BlackLists: [],
        ListNosaziCode: null,
        NosaziCode: null
      },

      commissionBlackLists: [],
      commissionBlackListsColumns: [
        { field: "NosaziCode", title: "کد نوسازی", width: "150px" },
        { field: "CreateDate", title: "تاریخ ورود", width: "100px" },
        { field: "CreateTime", title: "زمان ورود", width: "100px" },
        { field: "UserName", title: "کاربر ایجاد کننده", width: "150px" },
        {
          field: "CI_BlackListType",
          title: "علت",
          width: "100px",
          editor: "combo",
          domain: "Commission100"
        },
        {
          field: "IsErrorStop",
          title: "عدم امکان عملیات",
          width: "80px",
          editor: "checkbox"
        },
        {
          field: "DescInputBalckList",
          title: "توضیحات ورود به لیست سیاه",
          width: "200px"
        },
        {
          field: "UserNameExitBalckList",
          title: "کاربر خارج کننده",
          width: "150px"
        },
        { field: "ExitDate", title: "تاریخ خروج", width: "100px" },
        { field: "ExitTime", title: "زمان خروج", width: "100px" },
        { field: "OwnerName", title: "نام مالک", width: "100px" },
        {
          field: "DescExitBalckList",
          title: "توضیحات خروج از لیست",
          width: "200px"
        }
      ]
    }
  },

  mounted () {
    this.loadData()
  },

  methods: {
    loadData () {
      this.isEditable = false
      this.showLoading()
      this.$services.commissions
        .getCommissionBlankList({
          pRequest: { NIDCommission: "00000000-0000-0000-0000-000000000000" }
        })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const response =
              res.data.GetCommission_BlankListResult.ClsCommission_BlankList
                .Commission_BlackLists
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: "",
                bizCodeTitle: "",
                saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید.`
              })
            }
            this.isView = true
            if (response) {
              this.commissionBlackLists = response
                .map((item) => ({
                  ...item,
                  class: item.IsEnable ? "enter-black-list" : "exit-black-list"
                }))
                .sort((a, b) => (a.CreateDate > b.CreateDate ? -1 : 1))
            }
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      await this.$services.SA.getNosaziCodeTreeChild({
        pNosaziCode: this.baseNosaziCode
      })
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            const list = []
            for (let i = 0; i < res.data.ChildTree.length; i++) {
              list.push(convertNosaziCodeObjectToString(res.data.ChildTree[i]))
            }
            this.model.ListNosaziCode = list
            this.save()
          }
        })
        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    async save () {
      if (
        this.model.Commission_BlackList.NidCommission ===
          "00000000-0000-0000-0000-000000000000" &&
        this.model.Commission_BlackList.CI_BlackListType === 0
      ) {
        return this.showError("لطفا علت ورود به لیست سیاه را انتخاب نمایید.")
      }

      if (
        (this.model.Commission_BlackList.NosaziCode =
          convertNosaziCodeObjectToString(this.baseNosaziCode) ===
          "0-0-0-0-0-0-0")
      ) {
        return this.showError("لطفا کد نوسازی را وارد کنید.")
      }

      if (
        this.model.Commission_BlackList.NidCommission ===
        "00000000-0000-0000-0000-000000000000"
      ) {
        this.model.Commission_BlackList.NidUser = this.currentUser.NidUser
        this.model.Commission_BlackList.UserName = this.getUserDisplayName()
        this.model.Commission_BlackList.IsEnable = true
      } else {
        this.model.Commission_BlackList.NidUserExitBalckList =
          this.currentUser.NidUser
        this.model.Commission_BlackList.UserNameExitBalckList =
          this.getUserDisplayName()
        this.model.Commission_BlackList.IsEnable = false
      }
      const payload = {
        pRequest: {
          ClsCommission_BlankList: {
            Commission_BlackList: this.model.Commission_BlackList,
            Commission_BlackLists: this.blackLists,
            ListNosaziCode: this.model.ListNosaziCode,
            NosaziCode: null
          }
        }
      }

      this.showLoading()
      await this.$services.commissions
        .saveCommissionBlankList(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess("عملیات با موفقیت انجام شد.")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: "",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید.`
            })
            this.cancel()
            this.loadData()
          }
        })
        .catch((e) => {
          console.error(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    newInfo () {
      this.selectedRow = null
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
      this.model.Commission_BlackList = {
        CI_BlackListType: 0,
        IsEnable: true,
        IsErrorStop: false,
        NidCommission: "00000000-0000-0000-0000-000000000000",
        NidCommissionBlackList: "00000000-0000-0000-0000-000000000000",
        NidUser: this.currentUser.NidUser,
        NosaziCode: ""
      }
      this.isEditable = true
      this.activeTab = "checkListinfo"
      this.showExitTab = false
    },

    cancel () {
      this.isEditable = false
      this.showExitTab = false
      this.activeTab = "checkList"
    },

    exitFromBlackList () {
      this.isEditable = false
      this.activeTab = "exitTab"
      this.showExitTab = true
      this.model.Commission_BlackList = this.selectedRow
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRow.NosaziCode
      )
    },

    removeFromBlackList () {
      this.showError("امکان حذف برای شما مقدور نمی باشد.")
    },

    selectedChange (row) {
      this.selectedRow = row.dataItem
    }
  },

  computed: {
    blackLists () {
      if (this.commissionBlackLists.length === 0) return
      if (this.CI_Region === 0) return this.commissionBlackLists
      return this.commissionBlackLists.filter(
        (item) => parseInt(item.NosaziCode.slice("-", 1)) === this.CI_Region
      )
    }
  },

  watch: {
    activeTab: {
      handler (newTab, oldTab) {
        if (newTab === "checkList" && oldTab === "exitTab") this.cancel()
      },
      deep: true
    }
  }
}
</script>
