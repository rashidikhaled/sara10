<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper vertical :title="title" :padding="false">
      <template v-slot:header>
        <form-header-by-nosazi-code
          :actions="false"
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
        />
        <safa-status :result="loadObjRes" />
        <safa-status :result="getCIRes" />
        <safa-status :result="updateRes" />
        <safa-status :result="saveResult" />
      </template>
      <fit>
        <safa-datatable
          title="تایید مدیران"
          helper="approvalManager"
          v-model="managerConfirmList"
          cdcName="managerConfirmList"
          m="r"
          fit
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
        />
        <div v-if="isEditable" class="q-pa-sm">
          <FormRow>
            <FormControl>
              <safa-combo-enum
                label="نوع مجوز"
                label-width="90px"
                enum-name="EumManagerConfirmLicence"
                v-model="selectedLicenceType"
                cdcName="selectedLicenceType"
                :m="mode"
              />
            </FormControl>
            <FormControl>
              <safa-combo
                label="منبع تایید"
                label-width="90px"
                :options="manageConfirmComboItems"
                source-type="local"
                v-model="resourceManageConfirm"
                cdcName="resourceManageConfirm"
                :m="mode"
              />
            </FormControl>
            <!-- <FormControl>
              <safa-combo
                label="جزئیات منبع تایید"
                label-width="90px"
                ciName="CI_ResourceManagerConfirmDetails"
                domainName="CI_SaraM1"
                v-model="resourceManageConfirmDetails"
                cdcName="resourceManageConfirmDetails"
                :m="mode"
              />
            </FormControl> -->
            <FormControl>
              <safa-combo
                label="جزئیات منبع تایید"
                label-width="90px"
                v-model="resourceManageConfirmDetails"
                cdcName="resourceManageConfirmDetails"
                :options="ciResourceManagerConfirmDetailOptions"
                source-type="local"
                :m="mode"
              />
            </FormControl>
            <text-template
              label="توضیحات تایید مدیران"
              label-width="90px"
              formKey="e7820edf-52c3-4826-9693-ff15c2a0cc50"
              type="textarea"
              v-model="comment"
              cdcName="comment"
              :m="mode"
              :rows="8"
            />
          </FormRow>
        </div>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
          editSPId="b6450e31-8a74-48cf-bc38-8bee1f4edbdb"
          editFormId="6cdeb917-c0d9-4d4c-a467-f452fb882aea"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import manageConfirmComboListMixin from "./manageConfirmComboListMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin, manageConfirmComboListMixin],
  data () {
    return {
      title: "تایید مدیران",
      formKey: "6cdeb917-c0d9-4d4c-a467-f452fb882aea",
      name: "ApprovalManager",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      // #variables
      isView: false,
      selectedLicenceType: 0,
      resourceManageConfirm: 0,
      resourceManageConfirmDetails: 0,
      comment: "",
      clickRow: true,
      model: { Sh_ManagerConfirm_List: [] },
      managerConfirmList: [],
      ciResourceManagerConfirmDetailOptions: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      saveResults: {},

      // #services
      loadObjRes: null,
      getCIRes: null,
      updateRes: null,
      saveResult: null
    }
  },

  computed: {
    config () {
      return { config: { District: this.baseNosaziCode.District } }
    }
  },

  mounted () {
    if (this.isSelectedRequest()) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadObj()
    } else this.hideSidebar(this.name)
  },

  methods: {
    async loadObj () {
      try {
        this.showLoading()
        const payload = { pNidProc: this.selectedRequest.NidProc }
        const { data } = await this.$services.SC.loadManagerConfirm(
          payload,
          this.config
        )
        this.loadObjRes = this.getResponse(data)
        if (this.loadObjRes.success) {
          this.managerConfirmList =
            this.loadObjRes.data?.Sh_ManagerConfirm_List ?? []
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.selectedRequest.NidWorkItem,
              bizCodeTitle: "شماره درخواست",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات فرم تایید مدیران برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
            })
          }
          this.isView = true
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async getCiResourceManagerConfirmDetails () {
      try {
        this.showLoading()
        const { data } =
          await this.$services.SC.getCiResourceManagerConfirmDetailsFromCiResourceManagerConfirm(
            { pCI_ResourceManagerConfirm: this.resourceManageConfirm },
            this.config
          )
        this.getCIRes = this.getResponse(data)
        if (this.getCIRes.success) {
          this.ciResourceManagerConfirmDetailOptions =
            [
              ...this.getCIRes.data?.CI_ResourceManagerConfirmDetails_FromCI_ResourceManagerConfirm?.map(
                ({ ID, Title }) => {
                  return { ID, Title }
                }
              )
            ] ?? []

          this.resourceManageConfirmDetails =
            this.ciResourceManagerConfirmDetailOptions[0]?.ID ?? null
        }
      } catch (e) {
        console.error()
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    async updateRequestState () {
      try {
        const { data } = await this.$services.SC.updateLastRequestState(
          {
            pNidProc: this.selectedRequest.NidProc,
            pLastRequestState: "ذخیره تایید مدیران انجام شد."
          },
          this.config
        )
        this.updateRes = this.getResponse(data)
        if (this.updateRes.success) {}
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    saveObj () {
      this.showConfirm("آیا از تایید اطمینان دارید؟").onOk(() => {
        this.saveManagerConfirm()
      })
    },

    async saveManagerConfirm () {
      try {
        this.showLoading()
        const payload = {
          pManagerConfirm: {
            NidProc: this.selectedRequest.NidProc,
            Sh_ManagerConfirm: {
              CI_ResourceManagerConfirm: this.resourceManageConfirm,
              CI_ResourceManagerConfirmDetails:
                this.resourceManageConfirmDetails,
              Comments: this.comment,
              ConfirmationDate: null,
              ConfirmationTime: null,
              EumManagerConfirmLicence: this.selectedLicenceType,
              NidManagerConfirm: "00000000-0000-0000-0000-000000000000",
              NidProc: this.selectedRequest.NidProc,
              NidUser: this.getNidUser(),
              UserName: this.getUserDisplayName()
            },
            Sh_ManagerConfirm_List: this.managerConfirmList,
            ErrorResult: {
              BizErrors: [],
              Requirements: null
            }
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } = await this.$services.SC.saveManagerConfirm(
          payload,
          this.config
        )
        this.saveResult = this.getResponse(data)
        if (this.saveResult.success) {
          this.saveResults = this.saveResult.data
          this.isEditable = false
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره تایید مدیران برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.updateRequestState()
          await this.loadObj()
          await this.getCiResourceManagerConfirmDetails()
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    }
  },

  watch: {
    resourceManageConfirm () {
      this.getCiResourceManagerConfirmDetails()
    }
  }
}
</script>
