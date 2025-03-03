<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="1863ff32-46d4-412f-8175-6fd0cdc37797"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="initMaduleRes" />
        <safa-status :result="loadObjRes" />
        <safa-status :result="getAllFicheByIncomeListRes" />
        <safa-status :result="getAllFicheByIncomeListBynidWorkflowItem" />
        <safa-status :result="saveRegRequestInfoRes" />
        <safa-status :result="workItemRes" />
        <safa-status :result="dutyFicheSubResult" />
        <safa-status :result="getClalculateLogForComRes" />
      </template>
      <fit>
        <FormRow class="q-mb-sm">
          <!-- <FormControl>
            <safa-text
              label="شماره درخواست"
              label-width="100px"
              v-model="model.requestIncome.nidWorkItem"
              cdcName="nidWorkItem"
              :m="mode"
            >
              <template v-slot:append>
                <q-icon
                  class="cursor-pointer"
                  color="primary"
                  name="search"
                  size="xs"
                  style="position: relative; right: 5px"
                  title="جستجو براساس شماره درخواست"
                  @click="searchByRequestNumHandler"
                />
              </template>
            </safa-text>
          </FormControl> -->
          <nosazi-code-input
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            label="کد نوسازی"
            label-width="100px"
            :m="mode"
            :actions="false"
            @enter="getRequestList"
          />
          <FormControl>
            <safa-combo
              label="لیست درخواست ها"
              label-width="100px"
              v-model="model.requestIncome.currentRequest"
              cdcName="requestList"
              sourceType="local"
              :options="requestListOptions"
              :m="mode"
              ref="currentRequest"
            />
          </FormControl>
          <div class="q-gutter-x-sm">
            <btn-search label="جستجو" :disable="!isEditable" @click="loadObj" />
            <btn-default
              label="پاک کردن"
              :disable="!isEditable"
              @click="clearObj"
            />
          </div>
          <text-template
            label="توضیحات"
            class="col-12"
            label-width="100px"
            v-model="model.requestIncome.Desc"
            cdcName="Desc"
            :m="mode"
            :rows="1"
          />
        </FormRow>
        <!-- <safa-tabs v-model="activeTab">
          <template v-slot:tabs>
            <tab-menu
              name="fishesList"
              label="لیست فیش"
              @click="fishesList = true"
            />
          </template>
          <tab-content name="fishesList" :padding="false"> -->
        <safa-grid
          v-model="incomeFicheList"
          cdcName="incomeFicheList"
          :columns="ficheListColumns"
          fit
          m="r"
          height="100%"
          min-height="200px"
          max-height="100%"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          paginate
          :pageSize="20"
          :getRowStyle="getRowStyle"
          @grid:ready="onGridReady"
          :pinnedBottomRowData="[{}]"
          ref="gridRef"
        />
        <!-- </tab-content>
        </safa-tabs> -->
      </fit>
      <template #footer>
        <btn-save label="ثبت درخواست درآمد" @click="saveObj" />
      </template>
      <!-- طبق صحبت با آقای زاهد جزئیات در سرا8 هم وجود ندارد به همین خاطر کامنت شد -->
      <!-- <safa-popup
        v-model="showDetails"
        title="جزئیات"
        width="900px"
        height="500px"
      >
        <safa-splitter v-model="splitterModel">
          <template #before>
            <safa-datatable
              height="100%"
              max-height="100%"
              fit
              helper="subCalculate"
              m="r"
              v-model="DutyFicheSub"
              :allowMultipleSelection="false"
              title="ریز محاسات فیش"
              cdcName="DutyFicheSub"
            />
          </template>
          <template #after>
            <safa-datatable
              height="100%"
              max-height="100%"
              fit
              helper="ficheDetails"
              m="r"
              v-model="DutyFicheOtherFiled"
              :allowMultipleSelection="false"
              title="جزئیات فیش"
              cdcName="DutyFicheOtherFiled"
            />
          </template>
        </safa-splitter>
      </safa-popup> -->
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin";
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation";
import { currentDate, currentTime } from "src/utils/index";
import { uid } from "quasar";
import converter from "xml-js";

const defaultModel = {
  currentRequest: "",
  nidWorkItem: "",
  Desc: "",
};

const TextTitle = "ثبت درخواست درآمد کمیسیون ماده 77";

export default {
  mixins: [baseFormMixin],
  data() {
    return {
      title: "ثبت درخواست درآمد",
      name: "URequestIncome",
      formKey: "99C759D0-B021-43FB-B431-08D0B98E929F",
      main: true,

      // #variables
      activeTab: "fishesList",
      model: { requestIncome: { ...defaultModel } },
      requestListOptions: [],
      procInfo: null,
      incomeFicheList: [],
      DutyFicheOtherFiled: [],
      ListClsRequest_Info: [],
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0,
      },
      ciCity: 0,
      getAllRequestListResult: {
        Base_Info: {
          PostCode: "",
          NidNosaziCode: "",
          Address: "",
          NosaziCode: "",
          Distrcit: "",
          FromDate: "",
          OwnerName: "",
          Price: "",
          ToDate: "",
          CI_RequestType: 0,
          CreateDate: "",
          CreateTime: "",
          CreatorID: "",
          CreatorUserName: "",
          NidRequest: "",
          NidFiche: "",
          NidProcIncome: "",
          DescRequest: "",
          TitleRequest: "",
        },
        RequestListWithNosaziCodeType: [],
      },
      splitterModel: 50,
      showDetails: false,
      nidFiche: "00000000-0000-0000-0000-000000000000",
      result: null,
      dutyFicheSubResult: null,
      DutyFicheSub: [],
      logDetail: null,
      workItemRes: null,
      newRequestModel: null,
      nidWorkflowDeff: null,
      ficheListColumns: [
        {
          field: "isSelectedNode",
          title: "",
          width: "45px",
          lockPosition: true,
          filter: false,
          filterable: false,
          pinned: "right",
          headerCheckboxSelection: true,
          checkboxSelection: true,
          align: "center",
          headerAlign: "center",
          editor: "selection",
        },
        {
          field: "FicheNo",
          title: "شماره فیش",
          width: "200px",
        },
        {
          field: "EumFicheStatus",
          title: "وضعیت فیش",
          editor: "combo",
          source: [
            { ID: 0, Title: "صدور موقتی" },
            { ID: 1, Title: "صدور قطعی" },
            { ID: 2, Title: "چاپ فیش" },
            { ID: 3, Title: "تأیید" },
            { ID: 4, Title: "ابطال" },
            { ID: 7, Title: "تأیید انتقال" },
          ],
          width: "150px",
        },
        {
          field: "IncomeCreateDate",
          title: "تاریخ ایجاد ردیف درآمد",
          editor: "date",
          width: "100px",
        },
        {
          field: "IncomeCreateTime",
          title: "ساعت ایجاد ردیف درآمد",
          width: "100px",
        },
        {
          field: "IncomeValue",
          title: "کل عوارض",
          width: "150px",
          cellRendererSelector: (params) => this.sumHandler(params, "کل عوارض"),
          cellClass: "custom-pinned-row",
        },
        {
          field: "DiscountValue",
          title: "جمع تخفیف",
          width: "150px",
          cellRendererSelector: (params) =>
            this.sumHandler(params, "جمع تخفیف"),
          cellClass: "custom-pinned-row",
        },
        {
          field: "OddmentValue",
          title: "جمع بستانکاری",
          width: "150px",
          cellRendererSelector: (params) =>
            this.sumHandler(params, "جمع بستانکاری"),
          cellClass: "custom-pinned-row",
        },
        {
          field: "Payable",
          title: "قابل پرداخت",
          width: "150px",
          cellRendererSelector: (params) =>
            this.sumHandler(params, "قابل پرداخت"),
          cellClass: "custom-pinned-row",
        },
        {
          field: "CI_IncomeAccountGroup",
          title: "مالکیت حساب",
          editor: "combo",
          domain: "CI_SaraM1",
          width: "150px",
        },
        {
          field: "InsatllmentValue",
          title: "مبلغ تقسیط",
          width: "150px",
          cellRendererSelector: (params) =>
            this.sumHandler(params, "مبلغ تقسیط"),
          cellClass: "custom-pinned-row",
        },
        {
          field: "ExportPermanentDate",
          title: "تاریخ صدور دائمی",
          editor: "date",
          width: "100px",
        },
        {
          field: "ExportPermanentTime",
          title: "ساعت صدور دائمی",
          width: "100px",
        },
        {
          field: "UserNameExportPermanent",
          title: "کاربر صدور دائمی",
          width: "200px",
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "300px",
        },
      ],

      gridApi: null,
      columnApi: null,

      // #Services
      initMaduleRes: null,
      loadObjRes: null,
      getAllFicheByIncomeListRes: null,
      getAllFicheByIncomeListBynidWorkflowItem: null,
      saveRegRequestInfoRes: null,
      getClalculateLogForComRes: null,
    };
  },
  computed: {
    currentRequest() {
      const _cr = this.model.requestIncome.currentRequest ?? null;
      if (_cr !== "" || _cr !== null) {
        return this.requestListOptions.find((f) => f.ID === _cr);
      } else return null;
    },
  },
  created() {
    this.isEditable = true;
    this.initMadule();
  },
  methods: {
    async loadObj() {
      const _r = this.model.requestIncome.currentRequest;
      if (_r === null || _r === "")
        return this.showError("لطفا یک مورد از لیست درخواست ها انتخاب نمایید.");
      try {
        this.showLoading();
        const { data } = await this.$services.SD.getAllFicheByIncomeList(
          { pNidProc: _r },
          { config: { District: this.baseNosaziCode.District } }
        );
        this.getAllFicheByIncomeListRes = this.getResponse(data);
        if (this.getAllFicheByIncomeListRes.success) {
          const res = this.getAllFicheByIncomeListRes.data;
          const list = this.normalizedIncomeList(
            res?.All_FicheByIncomeList ?? []
          );
          this.incomeFicheList = list.map((m) => {
            return {
              ...m,
              isSelectedNode: false,
            };
          });
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    async saveObj(fiche) {
      debugger
      if (this.requestListOptions.length === 0)
        return this.showError("لطفا کدنوسازی مورد نظر را وارد نمایید.");
      const selectedRows = this.gridApi.getSelectedRows() ?? [];
      if (selectedRows.length === 0)
        return this.showError(
          "لطفا حداقل یک فیش را از لیست فیش ها انتخاب نمایید."
        );
        const obj =
        window.getConfigValue("esupParams")?.Com77NidWorkflowDeff ?? null;
        if (obj && obj.NidWorkflowDeff) {
          this.nidWorkflowDeff= obj.NidWorkflowDeff;
      } else {
        this.showError(
          "کلید گردشکارثبت درخواست درآمد تعریف نشده است . لطفا به راهبر سیستم اطلاع دهید."
        )
        return
        
      }
      try {
        this.showLoading();
        await this.addWorkItem(fiche);
        console.log("addWorkItem");
        await this.saveRequest(fiche);
        debugger
        console.log("saveRequest");
          this.showSuccess(`عملیات ${TextTitle} با شماره ${this.procInfo.NidWorkItem} با موفقیت انجام گردید.`
        
          ).onDismiss(() => {
            this.isEditable = false;
            this.hideLoading();
            // this.redirectToKartable();
          });
        await this.log({
          action: this.logActions.save,
          bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
          bizCodeTitle: "NosaziCode",
          nidWorkItem: this.procInfo.NidWorkItem,
          saveDesc: `عملیات ${TextTitle} با شماره ${this.procInfo.NidWorkItem} انجام گردید.`,
        });

      } catch (e) {
        if (this.procInfo) {
          await this.deleteRequest();
          await this.deleteProc();
        }
        this.showError(`متاسفانه عملیات ${TextTitle} متوقف شد.`);
      } finally {
        this.hideLoading();
      }
    },
    async addWorkItem (fiche) {
      debugger
      return new Promise(async (resolve, reject) => {
        this.procInfo = null
        const payload = {
          BizCode:  convertNosaziCodeObjectToString(this.baseNosaziCode),
          EumOwnerType: 0,
          NidWorkflowDeff: this.nidWorkflowDeff,
          ProcInitiator: this.getNidUser(),
          ProcRequester: fiche.OwnerName ?? this.getUserDisplayName() ?? '', // fiche.OwnerName ?? "", // این مورد باید پر شود.
          ProcInitiatorName: this.getUserDisplayName(),
          ProcArea: "کمیسیون ماده 77",
          GroupName: this.title,
          GroupTitel: this.title,
          Domain: this.baseNosaziCode?.District,
          IsSara10Request: true
        }
        const { data } = await this.$srvWorkflow.createInstance(payload)
        this.creInsRes = this.getResponse(data)
        if (this.creInsRes.success) {
          debugger
          const res = this.creInsRes.data
          if (res.status === 200 && res.success) {
            this.procInfo = res.data.ProcInfo
            return resolve()
          } else {
            return reject(this.creInsRes.msg)
          }
        } else {
          return reject(this.creInsRes.msg)
        }
      })
    },
    async saveRequest() {
      debugger
      return new Promise(async (resolve, reject) => {
        try {
          const payload = this.normalizedSavePayload();
          const { data } = await this.$services.commission77.saveRegRequestInfo(
            payload
          );
          this.saveRegRequestInfoRes = this.getResponse(data);
          if (this.saveRegRequestInfoRes.success) {
            return resolve();
          } else {
            return reject(data.errors[0].text);
          }
        } catch (e) {
          console.error(e);
          return reject(e);
        }
      });
    },
    normalizedSavePayload() {
      const selectedRows = this.gridApi.getSelectedRows();
      const NidRequest = uid();
      const Request_FicheDetail = selectedRows.map((m) => {
        return {
          CI_IncomeAccountGroup: m.CI_IncomeAccountGroup || 0,
          IncomeStatusFiche: m.EumFicheStatus || null,
          IncomeCreateDate: m.IncomeCreateDate || null,
          FicheNo: m.FicheNo || 0,
          IsVote: m.IsVote || null,
          NidFiche: m.NidFiche || null,
          NidFicheDetail: uid(),
          PriceFiche: m.Payable || 0,
          NidRequest,
        };
      });
      let totalPrice = selectedRows.reduce((n, { Payable }) => n + Payable, 0);
      const { Base_AddressPostCode, Base_Info, Base_AddressInfo, Base_Owner } =
        this.getAllRequestListResult.Base_Info;

      const Request_Info = {
        Address: Base_AddressInfo != null ? Base_AddressInfo.MainAddress : null,
        AnnouncementDate: null,
        AnnouncementNo: null,
        CI_Commission: "0",
        CI_RequestType: 4, // (byte)ClsEnum.EumRequestType.Income
        CreateDate: currentDate(),
        CreateTime: currentTime(),
        CreatorID: this.getNidUser(),
        CreatorUserName: this.getUserDisplayName(),
        DataDeliveryNotice: null,
        DateDeliveryProclamation: null,
        DateDeliveryVote: null,
        DescAnnouncemen: null,
        DescRequest: this.model.requestIncome.Desc,
        Description: null,
        Distrcit: this.baseNosaziCode.District,
        FromDate: this.getDate("min", Request_FicheDetail, "IncomeCreateDate"),
        HoldingDate: null,
        HoldingTime: null,
        IsAnnouncement: null,
        NidFiche: "00000000-0000-0000-0000-000000000000",
        NidNosaziCode: Base_Info.NidNosaziCode,
        NidProc: this.procInfo.NidProc,
        NidProcIncome:
          this.$refs.currentRequest?.selectedItem?.ID ??
          "00000000-0000-0000-0000-000000000000", // "d4b57d19-35d6-41a3-8339-4bf16a3f0f93",
        NidRequest: "00000000-0000-0000-0000-000000000000",
        NidWorkItem:this.procInfo.NidWorkItem,
        NosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
        OwnerName:
          Base_Owner.length > 0 && Base_Owner != null
            ? Base_Owner[0].OwnerName + " " + Base_Owner[0].OwnerLastName
            : null,
        PostCode:
          Base_AddressPostCode.length > 0 && Base_AddressPostCode != null
            ? Base_AddressPostCode[0].PostCode
            : null,
        Price: totalPrice,
        SecretariatNo: null,
        SysCI_RequestStatus: "0",
        TitleRequest: this.$refs.currentRequest.selectedItem.Title,
        ToDate: this.getDate("max", Request_FicheDetail, "IncomeCreateDate"),
        UserDescription: null,
        IsSara10: 1,
      };

      return {
        pRequest: {
          ClsAgent: null,
          ClsBaygani: null,
          ClsComplaint: null,
          ClsDecision: null,
          ClsDelivery: null,
          ClsExpert: null,
          ClsOtherRequestInfo: null,
          ClsOtherVote: null,
          ClsProclamation: null,
          ClsPublicIncome: null,
          ClsRandomCommission: null,
          ClsRequest_Info: null,
          ClsRequest_Notice: null,
          ClsRequest_Vote: null,
          ClsSearchRequest_info: null,
          ListClsRequest_Info: [
            {
              ErrorResult: null,
              ListFicheInVote: null,
              ListRequest_Info: null,
              ListVoteInRequest: null,
              NidFicheDetail: "00000000-0000-0000-0000-000000000000",
              NidProc: "00000000-0000-0000-0000-000000000000",
              NidRequest: "00000000-0000-0000-0000-000000000000",
              NidSubFicheDetail: "00000000-0000-0000-0000-000000000000",
              ProclamationList: null,
              Request_FicheDetail,
              Request_Info,
              SubFicheDetail: null,
            },
          ],
        },
      };
    },
    async deleteProc() {
      try {
        const { data } = await this.$srvWorkflow.deleteProc(
          { NidProc: this.procInfo.NidProc },
          this.config
        );
        if (!data.success) {
          this.showError(data.msg);
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
      }
    },
    sumHandler(params, title) {
      if (params.node.rowPinned === "bottom") {
        return {
          component: "agAggregateFotterTemplate",
          params: {
            totalValue: () => {
              let colId = params.column.colId.toString();
              let total = 0;
              try {
                total = this.incomeFicheList
                  .reduce((a, { [colId]: b }) => a + parseFloat(b), 0)
                  .toFixed(2);
              } catch (ex) {
                total = 0;
              }
              let sumTitle = title.includes("جمع") ? title : `جمع ${title}`;
              return `${sumTitle} : ${
                Number(total)?.toNumberWithCommas() ?? 0
              }`;
              // return `جمع ${title} : ${Number(total)?.toNumberWithCommas() ?? 0}`;
            },
          },
        };
      }
      return undefined;
    },
    async detailsInfo({ dataItem }) {
      this.showDetails = true;
      this.nidFiche = dataItem.NidFiche;
      await this.getDutyFicheSubs(dataItem);
      await this.getClalculateLogForCommision77(dataItem);
    },
    async getDutyFicheSubs(dataItem) {
      this.showLoading();
      const payload = { pNidFiche: dataItem.NidFiche };
      try {
        const { data } = await this.$services.SB.getDutyFicheSubs(payload);
        this.dutyFicheSubResult = this.getResponse(data);
        if (this.dutyFicheSubResult.success) {
          this.DutyFicheSub = this.dutyFicheSubResult.data?.DutyFicheSub;

          await this.log({
            action: this.logActions.view,
            bizCode: this.nidFiche,
            bizCodeTitle: "NidFiche",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.hideLoading();
      }
    },
    async getClalculateLogForCommision77(dataItem) {
      this.showLoading();
      const payload = { pNidFiche: dataItem.NidFiche };
      try {
        const { data } = await this.$services.SB.getClalculateLogForCommision77(
          payload
        );
        this.getClalculateLogForComRes = { ...data };
        if (this.getClalculateLogForComRes.success) {
          this.logDetail =
            this.getClalculateLogForComRes.data.DutyFicheOtherFiled;
          if (this.logDetail) {
            let arrayOfClsLog = converter.xml2js(this.logDetail, {
              compact: true,
              ignoreDoctype: true,
              ignoreCdata: true,
            });
            if (
              arrayOfClsLog.ArrayOfClsLog &&
              arrayOfClsLog.ArrayOfClsLog.ClsLog
            ) {
              this.DutyFicheOtherFiled = arrayOfClsLog.ArrayOfClsLog.ClsLog;
              this.DutyFicheOtherFiled = this.DutyFicheOtherFiled.map((x) => {
                return {
                  ...x,
                  Subject: x.Subject._text,
                  Value: x.Value._text,
                  Comment: x.Comment._text,
                };
              });
            }
          }

          await this.log({
            action: this.logActions.view,
            bizCode: this.nidFiche,
            bizCodeTitle: "NidFiche",
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        this.hideLoading();
      }
    },
    async initMadule() {
      try {
        this.showLoading();
        const { data } = await this.$services.commission77.initMadule();
        this.initMaduleRes = this.getResponse(data);
        if (this.initMaduleRes.success) {
          this.ciCity = this.initMaduleRes?.data?.InitMaduleResult?.CI_City ?? 0;
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    async getRequestList() {
      const { Apartment, Block, Building, District, House, Region, Shop } =
        this.baseNosaziCode;
      if (District === 0) return;
      this.requestListOptions = [];
      this.model = { requestIncome: { ...defaultModel } };
      this.incomeFicheList = [];
      this.getAllRequestListResult = {};
      try {
        const payload = {
          pNosaziCodeType: {
            Apartment,
            Block,
            Building,
            CI_City: this.ciCity,
            District,
            EumBaseInfoGroup: 0,
            EumNosaziCodeGroup: 0,
            EumNosaziCodeObjType: 0,
            EumRevisitGroup: 0,
            House,
            NidBase: "00000000-0000-0000-0000-000000000000",
            NidNosaziCode: "00000000-0000-0000-0000-000000000000",
            NidNosaziCodeParent: "00000000-0000-0000-0000-000000000000",
            NidRevisit: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000",
            Region,
            Shop,
          },
        };
        this.showLoading();
        const { data } =
          await this.$services.SD.getAllRequestListWithNosaziCodeType(payload, {
            config: { District },
          });
        this.loadObjRes = this.getResponse(data);
        if (this.loadObjRes.success) {
          this.getAllRequestListResult = this.loadObjRes.data;
          this.requestListOptions = [
            ...(this.getAllRequestListResult?.RequestListWithNosaziCodeType?.map(
              (m) => {
                return {
                  ...m,
                  ID: m.NidProc,
                  Title: `شماره درخواست ${m.NidWorkItem} .. عنوان درخواست = ${m.WorkflowTitel}`,
                };
              }
            ) ?? []),
          ];
          if (this.requestListOptions.length > 0) {
            await this.log({
              action: this.logActions.view,
              bizCode: convertNosaziCodeObjectToString(this.baseNosaziCode),
              bizCodeTitle: "کد نوسازی",
              saveDesc: `بارگذاری اطلاعات در فرم ${TextTitle} انجام گردید.`,
            });
          }
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    normalizedIncomeList(arr) {
      if (!Array.isArray(arr)) return [];
      return arr
        .filter(
          (f) =>
            f.Income_Fiche.EumFicheStatus === 2 ||
            f.Income_Fiche.EumFicheStatus === 1
        )
        .map((m) => {
          return {
            ...m,
            ...m.Income_Fiche,
            selected: false,
            class:
              m.Income_Fiche.EumFicheStatus === 2
                ? "dutyFichePrint"
                : "dutyFicheConfirm",
          };
        });
    },
    async searchByRequestNumHandler() {
      try {
        if (
          this.baseNosaziCode.District === 0 ||
          this.model.requestIncome.nidWorkItem === ""
        ) {
          this.showError(
            "در صورت جستجو با شماره درخواست کد منطقه باید وارد شود."
          );
          return;
        }
        if (this.model.requestIncome.nidWorkItem === "") {
          this.showError("لطفا شماره درخواست را وارد نمایید.");
          return;
        }
        this.showLoading();
        const { data } =
          await this.$services.commission77.getAllFicheByIncomeListBynidWorkflowItem(
            {
              pNidWorkItem: this.model.requestIncome.nidWorkItem
                ? this.model.requestIncome.nidWorkItem
                : "",
            }
          );
        this.getAllFicheByIncomeListBynidWorkflowItem = this.getResponse(data);
        if (this.getAllFicheByIncomeListBynidWorkflowItem.success) {
          this.incomeFicheList =
            this.normalizedIncomeList(
              this.getAllFicheByIncomeListBynidWorkflowItem.data
                .All_FicheByIncomeList
            ) ?? [];
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    clearObj() {
      this.baseNosaziCode = {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0,
      };
      this.model = { requestIncome: { ...defaultModel } };
      this.incomeFicheList = [];
      this.loadObj();
    },
    getDate(method, arr, val) {
      const list = arr.map((m) => Number(m[val].replaceAll("/", "")));
      let tmp = Math[method](...list).toString();
      return tmp.slice(0, 4) + "/" + tmp.slice(4, 6) + "/" + tmp.slice(6);
    },
    getRowStyle({ data }) {
      if (!data) return;
      if (data.EumFicheStatus === 0) {
        // dutyFichePermanent
        return { background: "#e9f0eb" };
      }
      if (data.EumFicheStatus === 1) {
        // dutyFicheConfirm
        return { background: "#b3eec2" };
      }
      if (data.EumFicheStatus === 2) {
        // dutyFichePrint
        return { background: "#dfb684" };
      }
      if (data.EumFicheStatus === 7) {
        // dutyFicheTempExport
        return { background: "#ffffff" };
      }
      if (data.EumFicheStatus === 3) {
        // dutyFicheConfirmBank
        return { background: "#7bceda" };
      }
      if (data.EumFicheStatus === 4) {
        // dutyFicheRevoke
        return { background: "#f1b2b2" };
      }
      if (data.EumFicheStatus === 5) {
        // dutyFicheConfirme
        return { background: "#89d1e7" };
      }
      return { background: "transparent" };
    },
    onGridReady(params) {
      this.gridApi = params.api;
      this.columnApi = params.columnApi;
    },
    getNidWorkFlowDeff() {
      
      const obj =
        window.getConfigValue("esupParams")?.Com77NidWorkflowDeff ?? null;
      if (obj && obj.NidWorkflowDeff) {
        return obj.NidWorkflowDeff;
      } else {
        this.showError(
          "کلید گردشکار ${TextTitle} تعریف نشده است . لطفا به راهبر سیستم اطلاع دهید."
        );
        return false;
      }
    },
  },
};
</script>
