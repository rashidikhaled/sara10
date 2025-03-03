<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
    <form-wrapper :padding="false" vertical :title="title">
      <template #header>
        <safa-status :result="checkIsConfirmOutputRes" />
        <safa-status :result="loadPayankarRes" />
        <safa-status :result="loadReqSecRes" />
        <safa-status :result="saveReqSecRes" />
        <safa-status :result="confirmOutputRes" />
        <safa-status :result="revokeOutputRes" />
        <safa-status :result="saveObjRes" />
      </template>
      <!-- <formHeader :task-info="taskInfo" /> -->

      <ArchiveWrap
        :name="archiveConfig.username"
        :pass="archiveConfig.password"
        :biz-code="archiveBizCode"
        v-if="hasSodor"
      />

      <safa-tabs v-else v-model="activeTab" :bordered="false" fix>
        <template v-slot:tabs>
          <tab-menu name="showjahatTab" label="جهات اربعه و مجوزها" />
          <tab-menu name="showUserTab" label="کاربری ها و پیش آمدگی ها" />
          <tab-menu name="showSpecificTab" label="مشخصات" />
          <tab-menu name="showOtherSpecificTab" label=" سایر مشخصات" />
          <tab-menu name="showTarhTab" label="طرح تفصیلی و کروکی" />
          <tab-menu name="showCommentTab" label="توضیحات" />
        </template>
        <tab-content name="showjahatTab">
          <PayankarJahat
            ref="payankarSpecificationRef"
            v-model="model"
            :m="mode"
          />
        </tab-content>
        <tab-content name="showUserTab" :padding="false">
          <PayankarUser v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="showSpecificTab">
          <PayankarSpecification v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="showOtherSpecificTab" :padding="false">
          <PayankarOtherSpecification
          :selectedDistrict="selectedDistrict"
            v-model="model"
            :m="mode"
            :formKey="formKey"
            :title="title"
            :name="name"
          />
        </tab-content>
        <tab-content name="showTarhTab" :padding="false">
          <PayankarTarh v-model="model" :m="mode" />
        </tab-content>
        <tab-content name="showCommentTab">
          <PayankarComment v-model="model" :m="mode" />
        </tab-content>
      </safa-tabs>
      <template v-slot:footer>
        <form-actions
          :showEditButton="!hasSodor"
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="isEditable = false"
        >
          <template #after>
            <btn-default
              @click="saveRequestSec"
              label="ثبت دبیرخانه"
              v-show="!hasSodor"
            />
            <btn-default
              @click="certificatIssuance"
              label=" صدور گواهی"
              v-show="!hasSodor & (isEditable == false)"
            />
            <btn-default
              @click="print"
              label=" چاپ پیش نویس"
              v-show="!hasSodor & (isEditable == false)"
            />

            <btn-default
              label="ابطال گواهی"
              @click="revokeCertificat"
              v-show="hasSodor"
            />
            <btn-default label="چاپ" @click="print" v-show="hasSodor" />
          </template>
        </form-actions>
      </template>

      <safa-popup
        v-model="showRevokeReason"
        width="500px"
        height="280px"
        title="توضیحات ابطال"
      >
        <fit>
          <text-template
            class="fit q-pa-sm"
            label="دلیل ابطال"
            v-model="canceledComment"
          />
          <div class="q-gutter-sm q-pa-sm">
            <btn-default label="ابطال" @click="confirmRevoke" />
            <btn-default label="انصراف" @click="showRevokeReason = false" />
          </div>
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>
<script>
import PayankarJahat from "./partials/PayankarJahat.vue";
import PayankarUser from "./partials/PayankarUser.vue";
import PayankarSpecification from "./partials/PayankarSpecification.vue";
import PayankarOtherSpecification from "./partials/PayankarOtherSpecification.vue";
import PayankarTarh from "./partials/PayankarTarh.vue";
import PayankarComment from "./partials/PayankarComment.vue";
import baseFormMixin from "src/mixins/baseFormMixin";
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation";
import PersianDate from "persian-date";
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs";
import { ClsEnumEumSecNoGroup } from "src/forms/shahrsazi/config/enums.js";

export default {
  mixins: [baseFormMixin],

  components: {
    PayankarJahat,
    PayankarUser,
    PayankarSpecification,
    PayankarOtherSpecification,
    PayankarTarh,
    PayankarComment,
  },

  data() {
    return {
      title: "پایانکار",
      name: "Payankar",
      formKey: "306e8e32-36d2-4a0c-8ddb-ba582d540dc2",
      main: true,
      workflowCompatible: true,

      // #region variables
      activeTab: "showjahatTab",
      hasSodor: false,
      model: {
        Sh_ExportPayankar: {
          CertificateNo: null,
          SerialNo: null,
          CertificateDate: null,
          Comments: null,
          CertificateNo: null,
          SerialNo: null,
          CertificateDate: null,
        },
        Base_ShahrsaziArchive: [],
        Base_Edge: [],
        Base_Using: [],
        canceledComment: "",
        showRevokeReason: false,
        Base_Front: [],
        Sh_BaroKaf: {
          CI_Criterion: null,
          PathValue: null,
          BarKafComments: null
        },
        Base_BuildingInfo: {
          CI_RoofType: null,
          BusyArea: null,
          AllowableDensityLicence: null,
          StartDate: null,
          EndDate: null,
        },
        Base_HouseInfo: {
          CI_ParvanehType: null,
          CI_GeoStatus: null,
          DocArea: null,
          AreaAfterEdit: null,
          CurrentArea: null,
          CI_HouseStatus: null,
        },
        Base_CommonEstate: {
          CI_ViewCode: null,
          CI_DocStatus: null,
          RegisterSection: null,
        },
        Base_CommonEstate_Optional: {
          CI_OwnerType: null,
        },
        Base_RegisterPlack: [],
        Base_Door: [],
        Base_ControllerInfo: [],
        Base_ControllerInfo_EngineerSubSys: [],
        Base_SupplyParking: [],
        Base_Commitment: [],
        Base_PlanMosavab: [],
        Base_PlanMojaz: [],
        Base_PlanForWork: [],
        Base_Letter: [],
      },
      result: null,
      OtherResult: null,
      canceledComment: "",
      showRevokeReason: false,
      checkIsConfirmOutputResult: null,
      buildingSettings: {},
      Confimresult: null,
      archiveBizCode: "",
      isView: false,

      // #region services
      checkIsConfirmOutputRes: null,
      loadPayankarRes: null,
      loadReqSecRes: null,
      saveReqSecRes: null,
      confirmOutputRes: null,
      revokeOutputRes: null,
      saveObjRes: null,
    };
  },

  computed: {
    archiveConfig() {
      return window.getConfigValue("archiveCore").district.ApprovalCertificate;
    },
    config() {
      return { config: { District: this.selectedDistrict } };
    },
    pEntityId() {
      if (!this.buildingSettings || !this.buildingSettings.ShahrsaziSettings) {
        return -1;
      }
      return this.buildingSettings.ShahrsaziSettings.ArchivePayankarEntityId;
    },
  },

  methods: {
    checkIsConfirmOutput() {
      this.$services.SC.checkIsConfirmOutput(
        {
          pNidProc: this.selectedRequest.NidProc,
          pOutputEngTitle: "Output_Payankar",
        },
        this.config
      )
        .then(({ data }) => {
          this.checkIsConfirmOutputRes = this.getResponse(data);
          if (this.checkIsConfirmOutputRes.success) {
            this.checkIsConfirmOutputResult = this.checkIsConfirmOutputRes.data;
            if (this.checkIsConfirmOutputResult.Sh_Output !== null) {
              this.hasSodor = true;
              this.updateArchiveBizCode(
                this.checkIsConfirmOutputResult.Sh_Output.ArchiveBizCode
              );
            } else {
              this.hasSodor = false;
              this.loadObj();
            }
          }
        })
        .catch((e) => {
          console.error(e);
          this.serverError();
        })
        .finally(() => {
          this.hideLoading();
        });
    },
    loadObj() {
      this.$services.SC.loadPayankar(
        {
          pNidProc: this.selectedRequest.NidProc,
          pIsLoadDeletedNosaziCode: false,
        },
        this.config
      )
        .then(async ({ data }) => {
          this.loadPayankarRes = this.getResponse(data);
          if (this.loadPayankarRes.success) {
            this.model = this.loadPayankarRes.data;
            this.loadRequestSec();
            if (!this.isView) {
              await this.log({
                action: this.logActions.view,
                bizCode: this.selectedRequest.NidProc,
                bizCodeTitle: "NidProc",
                nosaziCode: this.selectedRequest.BizCode,
                nidWorkItem: this.selectedRequest.NidWorkItem,
                saveDesc: `بارگذاری اطلاعات ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`,
              });
              this.isView = true;
            }
          }
        })
        .catch((e) => {
          console.error(e);
          this.serverError();
        })
        .finally(() => {
          this.hideLoading();
        });
    },
    async loadRequestSec() {
      try {
        this.showLoading();
        const { data } = await this.$services.SI.loadRequestSec(
          {
            pNidProc: this.selectedRequest.NidProc,
            pEumSecNoGroup: ClsEnumEumSecNoGroup.Payankar.value,
          },
          this.config
        );
        this.loadReqSecRes = this.getResponse(data);
        if (this.loadReqSecRes.success) {
          this.$nextTick(() => {
            this.$refs.payankarSpecificationRef.requestSecList =
              this.loadReqSecRes.data?.Sh_RequestSec_List?.map((x, i) => {
                return {
                  ...x,
                  ID: i, // cboSec.SelectedIndex = 0;
                  Title: `تاریخ : ${x.SecDate} شماره: ${x.SecNo}`,
                };
              }) ?? [];
          });
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    async saveRequestSec() {
      this.showLoading();
      const payload = {
        pRequestSec: {
          EumSecNoGroup: ClsEnumEumSecNoGroup.Payankar.value,
          NidProc: this.selectedRequest.NidProc,
          SecretariatReceiver: null,
          SecretariatSummary: null,
          SecretariatTypeDesc: null,
          Sh_RequestSec: {
            EumSecNoGroup: ClsEnumEumSecNoGroup.Payankar.value,
            NidProc: this.selectedRequest.NidProc,
            NidSec: "00000000-0000-0000-0000-000000000000",
            ReportPath: "/Sara8Reports/RptPayankar",
            SecDate: null,
            SecNo: null
          },
          Sh_RequestSec_List: null
          // Sh_RequestSec_List: this.loadReqSecRes?.data?.Sh_RequestSec_List ?? null
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff,
        },
      };
      try {
        const { data } = await this.$services.SI.saveRequestSec(payload,{ config: { District: this.selectedDistrict } });
        this.saveReqSecRes = this.getResponse(data);
        if (this.saveReqSecRes.success) {
          this.showSuccess("ثبت دبیرخانه انجام شد");
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ثبت دبیرخانه اطلاعات ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`,
          });
          await this.loadRequestSec();
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    certificatIssuance() {
      this.showLoading();
      const nosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      );
      let data = {
        pDtoOut: {
          ExportNidUser: this.getNidUser(),
          ExportUserName: this.getUserDisplayName(),
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_Payankar",
          OutputPerTitle: "پایانکار",
          OutputDate: new PersianDate().toLocale("en").format("L"),
          OutputNo: this.model.Sh_ExportPayankar.CertificateNo,
          ReportName: "/Sara8Reports/RptPayankar",
        },
        pNosaziCode: {
          Apartment: nosaziCode.Apartment,
          Block: nosaziCode.Block,
          Building: nosaziCode.Building,
          CI_City: 0,
          District: nosaziCode.District,
          EumBaseInfoGroup: 0,
          EumNosaziCodeGroup: 0,
          EumNosaziCodeObjType: 0,
          EumRevisitGroup: 0,
          House: nosaziCode.House,
          IsRoot: false,
          NidBase: "00000000-0000-0000-0000-000000000000",
          NidNosaziCode: "00000000-0000-0000-0000-000000000000",
          NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
          NidRevisit: "00000000-0000-0000-0000-000000000000",
          NidUser: "00000000-0000-0000-0000-000000000000",
          Region: nosaziCode.Region,
          Shop: nosaziCode.Shop,
        },
        pReportPath: "/Sara8Reports/RptPayankar",
        pArchiveDomain: nosaziCode.District,
        pReportDomain: nosaziCode.District,
        pEntityId: this.pEntityId,
        pCurrentDate: false,
      };
      this.$services.SC.confirmOutput(data, this.config)
        .then(async ({ data }) => {
          this.confirmOutputRes = this.getResponse(data);
          if (this.confirmOutputRes.success) {
            this.hasSodor = true;
            this.showSuccess("صدور گواهی با موفقیت انجام شد.");
            this.checkIsConfirmOutput();
            await this.log({
              action: this.logActions.certificateExport,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `صدور گواهی برای ${this.selectedRequest.NidWorkItem} انجام گردید`,
            });
          }
        })
        .catch((e) => {
          console.error(e);
          this.serverError();
        })
        .finally(() => {
          this.hideLoading();
        });
    },
    revokeCertificat() {
      this.showConfirm("آیا از ابطال گواهی اطمینان دارید؟").onOk(() => {
        this.showRevokeReason = true;
      });
    },
    confirmRevoke() {
      this.showLoading();
      const payload = {
        pDtoOut: {
          NidOutput: "00000000-0000-0000-0000-000000000000",
          NidProc: this.selectedRequest.NidProc,
          OutputEngTitle: "Output_Payankar",
          OutputNo: null,
          OutputPerTitle: "پایانکار",
          ReportName: "/Sara8Reports/RptPayankar",
          RevokeDate: new PersianDate().toLocale("en").format("L"),
          RevokeNidUser: this.currentUser.NidUser,
          RevokeUserName: this.getUserDisplayName(),
        },
        pDomain: this.selectedDistrict,
      };
      this.$services.SC.revokeOutput(payload, this.config)
        .then(async ({ data }) => {
          this.revokeOutputRes = this.getResponse(data);
          if (this.revokeOutputRes.success) {
            this.showSuccess("ابطال گواهی با موفقیت انجام شد.");
            await this.log({
              action: this.logActions.revokeCertificate,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "NidProc",
              nosaziCode: this.selectedRequest.BizCode,
              nidWorkItem: this.selectedRequest.NidWorkItem,
              saveDesc: `ابطال گواهی روی شماره درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`,
            });
            this.showRevokeReason = false;
            this.checkIsConfirmOutput();
          }
        })
        .catch((e) => {
          console.error(e);
          this.serverError();
        })
        .finally(() => {
          this.hideLoading();
        });
    },
    async print() {
      const reportPath = "/Sara8Reports/RptPayankar_Pishnevis";
      const queryParams = {
        NIdUser: this.getNidUser(),
        NidProc: this.selectedRequest.NidProc,
        RptDomain: "1@2@3@4@5@6@7@8@9@10@11@12@80",
        District: convertStringToNosaziCodeObject(this.selectedRequest.BizCode)
          .District,
        TokenKey: "HTTP/1.1",
      };
      this.showReport(reportPath, queryParams);
      await this.log({
        action: this.logActions.printReport,
        bizCode: "RptPayankar_Pishnevis",
        bizCodeTitle: "گزارش",
        nosaziCode: this.selectedRequest.BizCode,
        nidWorkItem: this.selectedRequest.NidWorkItem,
        saveDesc: `چاپ گزارش ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`,
      });
    },
    async saveObj() {
      this.showLoading();
      const payload = {
        pPayankar: this.model,
        pUser: this.currentUser,
        pDtoWorkflowData: {
          StateName: this.selectedRequest.WorkflowTitel,
          WorkflowGuid: this.selectedRequest.NidWorkflowDeff,
        },

        pNidProc: this.selectedRequest.NidProc,
      };
      try {
        const { data } = await this.$services.SC.savePayankar(
          payload,
          this.config
        );
        this.saveObjRes = this.getResponse(data);
        if (this.saveObjRes.success) {
          // this.model = this.result.data
          this.isEditable = false;

          this.showSuccess("ذخیره با موفقیت انجام شد.");
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode,
            nosaziCode: this.selectedRequest.BizCode,
            nidWorkItem: this.selectedRequest.NidWorkItem,
            saveDesc: `ذخیره اطلاعات ${this.title} برای درخواست ${this.selectedRequest.NidWorkItem} انجام گردید.`,
          });
          this.loadObj();
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    updateArchiveBizCode(bizCode) {
      this.archiveBizCode = bizCode ?? "";
    },
  },

  async mounted () {
    if (this.isSelectedRequest()) {
      this.buildingSettings = await this.$stKartable.dispatch(
        "formSettings/getSettings",
        {
          key: "BuildingSettings",
          nidProc: GLOBAL_SETTINGS_GUID,
        }
      );
      this.checkIsConfirmOutput();
    } else this.hideSidebar(this.name);
  },
};
</script>
