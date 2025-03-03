<template>
  <safa-form
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="loadRequestInfoRes" />
        <safa-status :result="saveRequestInfoRes" />
        <safa-status :result="updateLastRequestStateRes" />
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          cdcName="baseNosaziCode"
          m="r"
        />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-text
              label="نوع درخواست"
              label-width="100px"
              v-model="model.Info.WorkflowTitel"
              cdcName="WorkflowTitel"
              m="r"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="عنوان درخواست"
              label-width="100px"
              v-model="model.Info.WorkflowTitel"
              cdcName="WorkflowTitel"
              m="r"
            />
          </FormControl>
        </FormRow>
        <FormRow class="q-mb-sm">
          <FormControl>
            <safa-combo
              label="نوع متقاضی"
              label-width="100px"
              ciName="CI_Requester"
              domainName="CI_SaraM1"
              v-model="model.Info.CI_Requester"
              cdcName="CI_Requester"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="نام متقاضی"
              label-width="100px"
              v-model="model.Info.RequesterName"
              cdcName="RequesterName"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره ملی متقاضی "
              label-width="100px"
              v-model="model.Info.RequesterNationalCode"
              cdcName="RequesterNationalCode"
              :m="mode"
              mask="##########"
              dir="ltr"
            />
          </FormControl>
          <safa-text
            label="آدرس"
            label-width="100px"
            type="textarea"
            v-model="model.Info.RequesterAddress"
            cdcName="RequesterAddress"
            :m="mode"
            :rows="2"
            class="col-12"
          />
          <FormControl>
            <safa-text
              label="شماره تلفن"
              label-width="100px"
              v-model="model.Info.TelephoneNo"
              cdcName="TelephoneNo"
              :m="mode"
              dir="ltr"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره همراه"
              label-width="100px"
              :m="mode"
              v-model="model.Info.Cellphone"
              cdcName="Cellphone"
              dir="ltr"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="کد پستی "
              label-width="100px"
              v-model="model.Info.PostCode"
              cdcName="PostCode"
              mask="##########"
              :maxlength="10"
              :m="mode"
              dir="ltr"
            />
          </FormControl>
          <!--
        <FormControl>
          <safa-text
            label="نام خریدار"
            label-width="100px"
            v-model="model.Info.BuyerName"
            cdcName="BuyerName"
            :m="mode"
          />
        </FormControl>
        -->
          <FormControl>
            <safa-text
              label="شماره نامه"
              label-width="100px"
              v-model="model.Info.MainRequesterNo"
              cdcName="MainRequesterNo"
              :m="mode"
              dir="ltr"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ نامه"
              label-width="100px"
              v-model="model.Info.MainRequesterDate"
              cdcName="MainRequesterDate"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="مرجع صدور نامه"
              label-width="100px"
              :m="mode"
              v-model="model.Info.MainRequesterName"
              cdcName="MainRequesterName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="دانگ مورد انتقال "
              :m="mode"
              v-model="model.Info.TransferDang"
              cdcName="TransferDang"
              label-width="100px"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label=" شماره دبیرخانه"
              label-width="100px"
              v-model="model.Info.SecretariatNo"
              cdcName="SecretariatNo"
              :m="mode"
              dir="ltr"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ دبیرخانه"
              label-width="100px"
              v-model="model.Info.SecretariatDate"
              cdcName="SecretariatDate"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-datepicker
              label="تاریخ وکالت نامه"
              label-width="100px"
              v-model="model.Info.MandateDate"
              cdcName="MandateDate"
              :m="mode"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label="شماره وکالت نامه"
              label-width="100px"
              v-model="model.Info.MandateNo"
              cdcName="MandateNo"
              :m="mode"
              dir="ltr"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="نوع درخواست دفترخانه"
              label-width="100px"
              ciName="CI_RequestInquiryKind"
              domainName="CI_SaraM1"
              v-model="model.Info.CI_RequestInquiryKind"
              cdcName="CI_RequestInquiryKind"
              :m="mode"
            />
          </FormControl>
          <!--
        <FormControl>
          <safa-text
          label="کدملی خریدار"
          label-width="100px"
          v-model="model.Info.BuyerNationalCode"
          cdcName="BuyerNationalCode"
          :m="mode"
          :maxlength="10"
          dir="ltr"
        />
        </FormControl>
        -->
          <FormControl>
            <safa-text
              label="پست الکترونیکی"
              label-width="100px"
              v-model="model.Info.EMail"
              cdcName="EMail"
              :m="mode"
            />
          </FormControl>
          <!--
        <FormControl>
          <safa-text
            label="شماره همراه خریدار"
            label-width="100px"
            :m="mode"
            v-model="model.Info.BuyerCellphone"
            cdcName="BuyerCellphone"
            dir="ltr"
          />
        </FormControl>
          -->
          <text-template
            label="توضیحات"
            label-width="100px"
            v-model="model.Info.Comment"
            cdcName="Comment"
            formKey="43DDD119-30B5-4DBB-98A2-6E564936B5A4"
            :m="mode"
            :rows="2"
            class="col-12"
          />
        </FormRow>
        <safa-datatable
          title="خریداران"
          helper="shTransferRequestBuyers"
          v-model="model.Sh_TransferRequestBuyers"
          cdcName="Sh_TransferRequestBuyers"
          height="100%"
          max-height="100%"
          fit
          :m="mode"
        />
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="cancelObj"
          editSPId="0109df1f-f822-4fed-a0a1-b1a3d5ab4ccf"
          editFormId="2bafcef6-6882-4997-b046-7fa6685588f2"
        />
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      title: "ویرایش اطلاعات درخواست",
      formKey: "2bafcef6-6882-4997-b046-7fa6685588f2",
      name: "EditRequestInfo",
      main: true,
      sidebarCompatible: true,
      workflowCompatible: true,

      isView: false,
      loadRequestInfoRes: null,
      saveRequestInfoRes: null,
      updateLastRequestStateRes: null,

      model: {
        Info: {
          RequesterNationalCode: "",
          MainRequesterNo: "",
          MandateNo: "",
          SecretariatNo: "",
          EMail: "",
          CI_Requester: 0,
          CI_RequestInquiryKind: 0,
          MainRequesterDate: "",
          MandateDate: "",
          SecretariatDate: "",
          RequesterName: "",
          Cellphone: "",
          PostCode: "",
          MainRequesterName: "",
          TransferDang: "",
          RequesterAddress: "",
          Comment: ""
        },
        Sh_TransferRequestBuyers: []
      },
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },

  computed: {
    config () {
      return {
        config: { District: this.selectedDistrict }
      }
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
        const nidProc = this.selectedRequest.NidProc
        this.showLoading()
        const { data } = await this.$services.SC.loadRequestInfo(
          { PNidProc: nidProc },
          this.config
        )
        this.loadRequestInfoRes = this.getResponse(data)
        if (this.loadRequestInfoRes.success) {
          this.model = this.loadRequestInfoRes.data
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: nidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `بارگذاری اطلاعات درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
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
    async saveObj () {
      try {
        this.model.Sh_TransferRequestBuyers =
          this.normalizeTransferRequestBuyers()
        const payload = {
          PInfo: {
            ActiveNidRevisit: "00000000-0000-0000-0000-000000000000",
            HasNidProc: false,
            Info: this.model.Info,
            IsHadNegar: false,
            Sh_TransferRequestBuyers: this.model.Sh_TransferRequestBuyers
          },
          pUser: this.currentUser,
          pDtoWorkflowData: {
            WorkflowGuid: "00000000-0000-0000-0000-000000000000"
          },
          PFormName: "EditRequest"
        }
        this.showLoading()
        const { data } = await this.$services.SC.saveRequestInfo(
          payload,
          this.config
        )
        this.saveRequestInfoRes = this.getResponse(data)
        if (this.saveRequestInfoRes.success) {
          this.showSuccess("درخواست با موفقیت ویرایش گردید.")
          await this.log({
            action: this.logActions.update,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `بروزرسانی اطلاعات درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`
          })
          await this.update()
          await this.loadObj()
          this.isEditable = false
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    async update () {
      try {
        const payload = {
          pNidProc: this.selectedRequest.NidProc,
          pLastRequestState: "درخواست ویرایش شد."
        }
        this.showLoading()
        const { data } = await this.$services.SC.updateLastRequestState(
          payload,
          this.config
        )
        this.updateLastRequestStateRes = this.getResponse(data)
        if (this.updateLastRequestStateRes.success) {
        }
      } catch (e) {
        console.error(e)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },
    normalizeTransferRequestBuyers () {
      return (
        this.model.Sh_TransferRequestBuyers.map((m) => {
          return {
            ...m,
            BuyerOwnershipAmount: m.BuyerOwnershipAmount || 0,
            CI_BuyerOwnershipType: m.CI_BuyerOwnershipType || null
          }
        }) ?? []
      )
    },
    cancelObj () {
      this.loadObj()
      this.isEditable = false
    }
  }
}
</script>
