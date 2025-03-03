<template>
<safa-form
   :id="formKey"
   :caption="title"
   appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
   >
  <form-wrapper :title="title" padding fullscreen hide-title hide-close>
    <template #header>
      <safa-status :result="result"/>
      <safa-status :result="saveResult"/>
    </template>
    <fit>
      <form-row class="q-mb-sm">
        <form-control>
          <safa-text
            label="کد ارجاع"
            v-model="filterModel.NidWorkItem"
            @keyup.enter="loadData"
            label-width="120px"
          />
        </form-control>
        <form-control>
          <safa-text
            label=" کد ارجاع شهرداری"
            v-model="filterModel.UrbanNidKartablItem"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-combo2
            domainName="engineer"
            label=" نوع درخواست"
            ciName="CI_RequestType"
            v-model="tempCI_RequestType"
            @input="filterTextChanged"
            label-width="120px"
            type="Multiple"
            ref="RequestTypeRef"
          />
        </form-control>
        <form-control>
          <safa-combo2
            domainName="engineer"
            ciName="CI_FilesType"
            label=" نوع پرونده"
            v-model="tempCI_FilesType"
            @input="filterTextChanged"
            label-width="120px"
            type="Multiple"
            ref="FilesTypeRef"
          />
        </form-control>
        <form-control>
          <safa-text
            clearable
            label="شماره دبیرخانه شهرداری"
            v-model="filterModel.StrNoTownDabir"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-text
            clearable
            label="نام مالک"
            v-model="filterModel.OwnerName"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-text
            clearable
            label="پلاک ثبتی"
            v-model="filterModel.RegisterPlack"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-text
            clearable
            label="آدرس"
            v-model="filterModel.Address"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-combo2
            domainName="engineer"
            ciName="CI_Years"
            label=" سال"
            v-model="tempYears"
            label-width="120px"
            type="Multiple"
            ref="YearsRef"
          />
        </form-control>
        <form-control>
          <safa-text
            label="شماره مجوز"
            v-model="filterModel.ExportLicenseNo"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
        <form-control>
          <safa-datepicker
            label="تاریخ مجوز"
            v-model="filterModel.ExportLicenseDate"
            label-width="120px"
            @keyup.enter="loadData"
          />
        </form-control>
      </form-row>
      <div
        :class="[
          'q-pa-xs q-mb-sm',
          $q.dark.isActive ? 'bg-lighten2' : 'bg-grey-2',
        ]"
        style="border-radius: 4px"
      >
        <div class="row items-center q-gutter-x-md">
          <div class="col-auto">
            <nosazi-code-input
              @enter="filterTextChanged"
              m="e"
              v-model="filterModel.NosaziCode"
            />
          </div>
          <div class="col-auto">
            <q-separator vertical style="height: 12px" />
          </div>
          <div class="col">
            <button-group>
              <!-- <btn-default label="نمایش همه" @click="show" /> -->
              <btn-delete label="پاک کردن" @click="clearField" />
              <btn-search label="جستجو" @click="loadData" />
            </button-group>
          </div>
        </div>
      </div>
      <safa-grid
        title="کارتابل پاسخگو"
        :selectable="true"
        :allowMultipleSelection="false"
        :add-row="false"
        :allow-copy="false"
        :delete-row="false"
        :bordered="true"
        :countData="totalRow"
        :filterable="true"
        :paginate="true"
        :pageSize="20"
        :serverServe="true"
        :show-row-number="false"
        @row:click="rowClickHandler"
        height="100%"
        m="r"
        fit
        margin="0"
        maxHeight="100%"
        minHeight="300px"
        ref="kartable"
        searchable
        :columns="kartableColumns"
        max-height="100%"
        min-height="100px"
        v-model="currentData"
        :suppressRowClickSelection="false"
      />
      <!-- معادل باتن های زیر در گردش کار فعلا نیس -->
      <!-- <form-row>
        <form-control>
          <btn-default @click="btnActiveRequest" label="فعال کردن درخواست" />
        </form-control>
        <form-control>
          <btn-default @click="btnArchive" label="بایگانی کردن درخواست" />
        </form-control>
      </form-row> -->
    </fit>
  </form-wrapper>
</safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import GardeshParvandehDetails from 'src/kartable/partials/GardeshParvandehDetails'

const defaultmodel = {
  NosaziCode: {
    District: 0,
    Region: 0,
    Block: 0,
    House: 0,
    Building: 0,
    Apartment: 0,
    Shop: 0
  },
  BizCode: "",
  WorkflowTitel: "",
  ProcRequester: "",
  Apartment: "",
  Block: "",
  Building: "",
  District: "",
  House: "",
  Region: "",
  Shop: "",
  NidWorkItem: "",
  CI_FilesType: [],
  CI_Region: [],
  CI_RequestType: [],
  CI_Years: [],
  CI_FilesTypeSelected: [],
  From: 0,
  To: 50,
  CI_YearsSelected: [],
  UrbanNidKartablItem: "",
  StrNoTownDabir: "",
  RegisterPlack: "",
  OwnerName: "",
  ExportLicenseDate: "",
  ExportLicenseNo: "",
  Address: ""
}

export default {
  mixins: [baseFormMixin],
  // components: { GardeshParvandehDetails },

  data () {
    return {
      formKey: "C3354C46-5BEA-48B4-A355-EE757099D432",
      name: "EngineerKartable",
      title: "کارتابل پاسخگو",
      main: true,
      customButtons: [
        {
          icon: "restore",
          onClick: this.toggleGardeshParvandehVisible,
          text: "گردش پرونده"
        }
      ],
      splitterValue: 100,
      splitterLimit: [0, 100],
      loading: false,
      result: null,
      saveResult: null,
      selectedItem: null,
      filter: null,
      showall: false,
      gardeshParvandehDialogState: false,
      groupGuidToViewMembers: null,
      groupGuidToViewMembersDialog: false,
      filterModel: {
        ...defaultmodel
      },
      currentData: [],
      tempCI_RequestType: [],
      tempCI_FilesType: [],
      tempYears: [],
      skip: 0,
      take: 200,
      pageable: {
        buttonCount: 5,
        info: true,
        type: "numeric",
        pageSizes: [10, 50, 75, 100, 150, 200, 300, 400],
        previousNext: true
      },
      kartableColumns: [
        {
          field: "Row",
          title: "ردیف",
          width: 50
        },
        {
          field: "CodeString",
          title: "کدنوسازی",
          width: 180
        },
        {
          field: "NidWorkItem",
          title: "کد ارجاع",
          width: 140
        },

        {
          field: "UrbanNidKartablItem",
          title: "کدارجاع شهرداری",
          width: 140
        },
        {
          field: "StrNoTownDabir",
          title: "شماره دبیرخانه شهرداری",
          width: 180
        },
        {
          field: "CI_Years",
          title: "سال",
          width: 140
        },
        {
          field: "SInfrastructure",
          title: "زیربنا",
          width: 140
        },
        {
          field: "Floor",
          title: "تعداد سقف",
          width: 140
        },
        {
          field: "RequestDate",
          title: "تاریخ درخواست",
          width: 180
        },
        {
          field: "EnterDate",
          title: "تاریخ خروج از سهمیه",
          width: 180
        },
        {
          field: "GreenCachetDate",
          title: "تاریخ مهر سبز",
          width: 180
        },
        {
          field: "RequestStatus",
          title: "وضعیت پرونده"
        },

        {
          field: "TaskState",
          title: "مرحله"
        },
        {
          field: "UserName",
          title: "کاربر"
        },
        {
          field: "RegionTitle",
          title: "منطقه",
          width: 140
        },
        {
          field: "FilesType",
          title: "نوع پرونده ",
          width: 140
        },
        {
          field: "UsingType",
          title: "کاربری",
          width: 140
        },
        {
          field: "ExportLicenseNo",
          title: "شماره مجوز"
        },
        {
          field: "ExportLicenseDate",
          title: "تاریخ مجوز",
          width: 180
        },
        {
          field: "CI_RequestType",
          title: "نوع درخواست",
          editor: "combo",
          domain: "engineer",
          width: 180
        },
        {
          field: "OwnerName",
          title: "نام مالک"
        },
        {
          field: "Address",
          title: "آدرس"
        }
      ],
      workflowTitleGroups: [],
      totalRow: 0
    }
  },

  methods: {
    toggleGardeshParvandehVisible () {
      this.showGardeshParvandeh = !this.showGardeshParvandeh
    },
    showGardeshParvandeh () {
      this.splitterLimit = this.showGardeshParvandeh ? [0, Infinity] : [0, 100]
      this.splitterValue = this.showGardeshParvandeh ? 60 : 100
    },
    rowClickHandler (params) {
      this.selectedItem = params.data
      if (this.selectedItem) {
        this.$store.dispatch("engineer/selectRequest", this.selectedItem)
        this.$store.dispatch("engineer/setNidFil", this.selectedItem)
      }
    },
    btnArchive () {
      // if (Grd.SelectedItem == null)
      //             {
      //                 Dialog.ClsDialog.ShowMessage("لطفا پرونده مورد نظر را از کارتابل انتخاب نمایید");
      //                 return;
      //             }

      //             var tmpbutton = sender as RadButton;
      //             var tmpContext = Grd.SelectedItem as SrvEngineer.SrvGetSearch_Result;

      //             // if (!tmpContext.IsShowActiveRequest) return;

      //             Dialog.ClsDialog.ShowConfirm("آیا برای ادامه عملیات اطمینان دارید؟", (sConfirm, argsConfirm) =>
      //             {
      //                 if (argsConfirm.DialogResult == true)
      //                 {
      //                     if (tmpContext != null && tmpContext.NidProc != null && tmpContext.NidProc != Guid.Empty)
      //                     {
      //                         Grd.IsBusy = true;
      //                         var srvEng = Common.ClsProxyHelper.GetEngineerService();
      //                         srvEng.GetFil_InfoWithNidFilCompleted += (s1, arg1) =>
      //                           {
      //                               if (arg1.Error != null)
      //                               {
      //                                   SafaException.ShowMessage("خطا در اجرای سرویس", "توجه");
      //                                   Grd.IsBusy = false;
      //                                   return;
      //                               }
      //                               if (arg1.Result == null || arg1.Result.ErrorResult.BizErrors.Any(p => p.ErrorAction == SrvEngineer.EumErrorAction.Stop))
      //                               {
      //                                   SafaException.ShowBizError(arg1.Result.ErrorResult.BizErrors);
      //                                   Grd.IsBusy = false;
      //                                   return;
      //                               }
      //                               if (arg1.Result.fil_Info == null)
      //                               {
      //                                   SafaException.ShowMessage("درخواست مورد نظر معتبر نمی باشد", "توجه");
      //                                   Grd.IsBusy = false;
      //                                   return;
      //                               }
      //                               if (arg1.Result.fil_Info.SysCI_RequestBy != 0)
      //                               {
      //                                   SafaException.ShowMessage("فقط درخواست هایی که از طریق برنامه مهندسی ناظر ایجاد شده اند امکان بایگانی شدن دارند", "توجه");
      //                                   Grd.IsBusy = false;
      //                                   return;
      //                               }
      //                               var tmpSrv = ApplicationCommon.ClsCommon.GetTaskService();
      //                               var tmpEvent = new ApplicationCommon.TaskService.WorkflowInstanceLog
      //                               {
      //                                   NidProc = tmpContext.NidProc.Value,
      //                                   EumEventType = 3,//بایگانی
      //                                   NidUser = ApplicationCommon.ClsCommon.UserInfo.GUID,
      //                                   UserName = ApplicationCommon.ClsCommon.GetFullUserName()
      //                               };
      //                               tmpSrv.ProcEventCompleted += (sTask, argsTask) =>
      //                               {
      //                                   if (argsTask.Error == null)
      //                                   {
      //                                       Grd.IsBusy = false;
      //                                       var srv = Common.ClsProxyHelper.GetEngineerService();
      //                                       srv.changeSysCI_RequestStatusCompleted += (s, args) =>
      //                                       {
      //                                           if (args.Error == null)
      //                                               SafaException.ShowMessage("درخواست مورد نظربا موفقیت بایگانی شد", "توجه");
      //                                           else SafaException.ShowMessage("خطا در بایگانی درخواست", "توجه");
      //                                       };
      //                                       srv.changeSysCI_RequestStatusAsync(tmpContext.NIdFil, 2/*بایگانی دائم*/);
      //                                   }
      //                                   else
      //                                   {
      //                                       SafaException.ShowMessage("خطایی در بایگانی اطلاعات کارتابل رخ داده", "توجه");
      //                                       Grd.IsBusy = false;
      //                                   }
      //                               };
      //                               tmpSrv.ProcEventAsync(tmpEvent);
      //                           };
      //                         SrvEngineer.ClsRequestMessage RequestMessage = new SrvEngineer.ClsRequestMessage();
      //                         RequestMessage.NidFil = tmpContext.NIdFil;
      //                         srvEng.GetFil_InfoWithNidFilAsync(RequestMessage);
      //                     }
      //                     else
      //                     {
      //                         Dialog.ClsDialog.ShowMessage("درخواست مورد نظر معتبر نمی باشد");
      //                     }
      //                 }
      //             });
    },
    btnActiveRequest () {
      // if (this.selectedItem == null)
      //       {
      //           this.showError("لطفا پرونده مورد نظر را از کارتابل انتخاب نمایید");
      //           return;
      //       }

      //       let tmpContext = this.selectedItem;

      //       if (!tmpContext.IsShowActiveRequest) return;
      //          this.showConfirm('آیا برای ادامه عملیات اطمینان دارید؟').onOk(() => {
      //       })
      //       Dialog.ClsDialog.ShowConfirm("آیا برای ادامه عملیات اطمینان دارید؟", (sConfirm, argsConfirm) =>
      //       {
      //           if (argsConfirm.DialogResult == true)
      //           {
      //               if (tmpContext != null && tmpContext.NidProc != null && tmpContext.NidProc != Guid.Empty)
      //               {
      //                   var tmpSrv = ApplicationCommon.ClsCommon.GetTaskService();
      //                   var tmpEvent = new ApplicationCommon.TaskService.WorkflowInstanceLog
      //                   {
      //                       NidProc = tmpContext.NidProc.Value,
      //                       EumEventType = 0,
      //                       NidUser = ApplicationCommon.ClsCommon.UserInfo.GUID,
      //                       UserName = ApplicationCommon.ClsCommon.GetFullUserName()
      //                   };
      //                   tmpSrv.ProcEventCompleted += (sTask, argsTask) =>
      //                   {
      //                       if (argsTask.Error == null)
      //                       {
      //                           var srv = Common.ClsProxyHelper.GetEngineerService();
      //                           srv.ActiveRequestCompleted += (s, args) =>
      //                           {
      //                               if (args.Error == null)
      //                                   SafaException.ShowMessage("درخواست مورد نظر فعال شد", "توجه");
      //                               else SafaException.ShowMessage("خطا در فعال سازی", "توجه");
      //                           };
      //                           srv.ActiveRequestAsync(new SrvEngineer.ClsRequestMessage { NidFil = tmpContext.NIdFil });
      //                       }
      //                   };
      //                   tmpSrv.ProcEventAsync(tmpEvent);
      //               }
      //               else
      //               {
      //                   Grd.IsBusy = true;
      //                   BtnSearch.IsEnabled = false;
      //                   var srv = Common.ClsProxyHelper.GetEngineerService();
      //                   srv.DefineNewTaskCompleted += (s, args) =>
      //                   {
      //                       Grd.IsBusy = false;
      //                       BtnSearch.IsEnabled = true;
      //                       srv.CloseAsync();
      //                       if (args.Error == null)
      //                       {
      //                           if (!args.Result.ClsFil_Info.ErrorResult)
      //                           {
      //                               Dialog.ClsDialog.ShowMessage(
      //                                   string.Format("درخواست مورد نظر با کد ارجاع {0} فعال شد",
      //                                       args.Result.ClsFil_Info.Fil_Info.NidWorkItem));
      //                               //Tmpbutton.IsEnabled = false;
      //                               tmpContext.NidProc = args.Result.ClsFil_Info.Fil_Info.NidProc;
      //                               tmpContext.NidWorkItem = args.Result.ClsFil_Info.Fil_Info.NidWorkItem;
      //                               Search();
      //                           }

      //                           args.Result.ClsFil_Info.ErrorResult.ShowBizError();
      //                       }
      //                       else SafaException.ShowMessage(args.Error.Message, "خطا در متد DefineNewTask");
      //                   };
      //                   srv.DefineNewTaskAsync(new SrvEngineer.ClsRequestMessage
      //                   {
      //                       UserGUID = ApplicationCommon.ClsCommon.UserInfo.GUID,
      //                       UserName = ApplicationCommon.ClsCommon.GetFullUserName(),
      //                       NidFil = tmpContext.NIdFil
      //                   });
      //               }
      //           }
      //       });
    },
    clearField () {
      this.filterModel = { ...defaultmodel }
      this.filterModel.NosaziCode.District = 0
      this.filterModel.NosaziCode.Region = 0
      this.filterModel.NosaziCode.Building = 0
      this.filterModel.NosaziCode.Block = 0
      this.filterModel.NosaziCode.House = 0
      this.filterModel.NosaziCode.Apartment = 0
      this.filterModel.NosaziCode.Shop = 0
      this.currentData = []
      this.$refs.RequestTypeRef.deselectAllOptions()
      this.$refs.FilesTypeRef.deselectAllOptions()
      this.$refs.YearsRef.deselectAllOptions()
    },

    async filterTextChanged () {
      await this.loadData()
      if (this.currentData.length === 1) {
        this.$stKartable.dispatch("setSelectedRequest", this.currentData[0])
        // this.$router.push('/task')
        // this.$root.$emit('setForm', 'task')
        this.$root.$emit("setCommand", "form")
        this.$store.dispatch("formLauncher/removeForm", "task")
        this.$store.dispatch("formLauncher/setForm", {
          formKey: "system",
          formName: "task",
          title: "گردش کار"
        })
      }
    },

    storeCurrentState () {
      this.setKartableState({
        currentData: this.currentData,
        workflowTitleGroups: this.workflowTitleGroups,
        skip: this.skip,
        take: this.take,
        filter: this.filter,
        filterModel: this.filterModel
      })
    },
    // search() {
    //   this.showLoading();
    //   // this.pRequest.EngineerCode = searchValue
    //   // this.memberCode = searchValue
    //   // let data = { pRequest: this.pRequest }
    //   let ncode = null;
    //   if (this.filterModel.NosaziCode) {
    //     ncode = this.filterModel.NosaziCode;
    //   }
    //   if (ncode) {
    //     console.log(ncode);
    //   }
    //   let pData = {
    //     ClsSearchEngine: {
    //       // Apartment: 0,
    //       // Block: 0,
    //       // Building: 0,
    //       // District: 0,
    //       // House: 0,
    //       // Region: 0,
    //       // Shop: 0,
    //       NidWorkItem: this.filterModel.NidWorkItem,
    //       CI_FilesType: [],
    //       CI_Region: [],
    //       CI_RequestType: [],
    //       CI_Years: [],
    //       CI_FilesTypeSelected: [],
    //       From: 0,
    //       To: 20,
    //       CI_YearsSelected: [],
    //       UrbanNidKartablItem: this.filterModel.UrbanNidKartablItem,
    //       StrNoTownDabir: this.filterModel.StrNoTownDabir,
    //       RegisterPlack: this.filterModel.RegisterPlack,
    //       OwnerName: this.filterModel.OwnerName,
    //       ExportLicenseDate: this.filterModel.ExportLicenseDate,
    //       Address: this.filterModel.Address,
    //       ...this.filterModel.NosaziCode,
    //     },
    //   };
    //   this.$services.engineers
    //     .GetSearchResult(pData)
    //     .then(({ data }) => {
    //       this.hideLoading();

    //       this.requestResults = this.getResponse(data);
    //       this.currentData =
    //         this.requestResults.data.GetSearchResultResult.SearchResult;
    //     })
    //     .catch((response) => {
    //       this.hideLoading();

    //       this.serverError();
    //     })
    //     .finally(() => {
    //       this.hideLoading();
    //     });
    // },
    restoreCurrentState () {
      this.currentData = this.kartableState.currentData || []
      this.workflowTitleGroups = this.kartableState.workflowTitleGroups
      this.skip = this.kartableState.skip
      this.take = this.kartableState.take
      this.filter = this.kartableState.filter
      this.filterModel = {
        NidWorkItem: "",
        BizCode: "",
        WorkflowTitel: "",
        ...this.kartableState.filterModel
      }
    },

    show () {
      this.showall = true
      this.filter = null
      this.NosaziCode = ""
      this.skip = 0
      this.take = 50
      this.loadData()
    },
    setFilterCombo () {
      if (
        this.$refs.RequestTypeRef.datasource.length > 0 &&
        this.tempCI_RequestType !== null
      ) {
        const RequestTypefilterdResult =
          this.$refs.RequestTypeRef.datasource.filter((x) => {
            return this.tempCI_RequestType.some((y) => {
              return y === x.ID
            })
          })
        this.filterModel.CI_RequestTypeSelected = RequestTypefilterdResult
        const CIRequestTypeOptions = this.$refs.RequestTypeRef.datasource
        this.filterModel.CI_RequestType = CIRequestTypeOptions
      }
      if (
        this.$refs.FilesTypeRef.datasource.length > 0 &&
        this.tempCI_FilesType !== null
      ) {
        const FilesTypefilterdResult =
          this.$refs.FilesTypeRef.datasource.filter((x) => {
            return this.tempCI_FilesType.some((y) => {
              return y === x.ID
            })
          })
        this.filterModel.CI_FilesTypeSelected = FilesTypefilterdResult
        const CIFilesTypeOptions = this.$refs.FilesTypeRef.datasource
        this.filterModel.CI_FilesType = CIFilesTypeOptions
      }

      if (
        this.$refs.FilesTypeRef.datasource.length > 0 &&
        this.tempYears !== null
      ) {
        const YearsfilterdResult = this.$refs.YearsRef.datasource.filter(
          (x) => {
            return this.tempYears.some((y) => {
              return y === x.ID
            })
          }
        )
        this.filterModel.CI_YearsSelected = YearsfilterdResult
        const CIYearsOptions = this.$refs.YearsRef.datasource
        this.filterModel.CI_Years = CIYearsOptions
      }
    },
    loadData () {
      this.showLoading()
      this.setFilterCombo()
      let ncode = null
      if (this.filterModel.NosaziCode) {
        ncode = this.filterModel.NosaziCode
      }
      if (ncode) {
        console.log(ncode)
      }
      let pData = {}
      // if (this.showall) {
      //   pData = {
      //     ClsSearchEngine: {
      //       ...defaultmodel,
      //       ...defaultmodel.NosaziCode,
      //     },
      //   };
      // } else {
      pData = {
        ClsSearchEngine: {
          ...this.filterModel,
          ...this.filterModel.NosaziCode
        }
        // };
      }

      this.$services.engineers
        .GetSearchResult(pData)
        .then(({ data }) => {
          this.hideLoading()
          this.requestResults = this.getResponse(data)
          this.currentData =
            this.requestResults.data.GetSearchResultResult.SearchResult
        })
        .catch((response) => {
          this.hideLoading()

          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    }

    // async load() {
    //   try {
    //     this.loading = true;
    //     this.currentData = [];
    //     console.log(" engineers GetSearchResult");
    //     let ncode =this.filterModel.NosaziCode;
    //     if (ncode) {
    //       console.log(ncode);
    //     }
    //     let pData = {
    //       ClsSearchEngine:
    //       {
    //         ...this.filterModel,...this.filterModel.NosaziCode
    //       }
    //         // Apartment: 0,
    //         // Block: 0,
    //         // Building: 0,
    //         // District: 0,
    //         // House: 0,
    //         // Region: 0,
    //         // Shop: 0,
    //         // NidWorkItem: this.filterModel.NidWorkItem,
    //         // CI_FilesType: [],
    //         // CI_Region: [],
    //         // CI_RequestType: [],
    //         // CI_Years: [],
    //         // CI_FilesTypeSelected: [],
    //         // From: 0,
    //         // To: 20,
    //         // CI_YearsSelected: [],
    //         // UrbanNidKartablItem: this.filterModel.UrbanNidKartablItem,
    //         // StrNoTownDabir: this.filterModel.StrNoTownDabir,
    //         // RegisterPlack: this.filterModel.RegisterPlack,
    //         // OwnerName: this.filterModel.OwnerName,
    //         // ExportLicenseDate: this.filterModel.ExportLicenseDate,
    //         // Address: this.filterModel.Address
    //       // }
    //     };
    //     const { data } = await this.$services.engineers.GetSearchResult(pData);
    //     console.log("@@@@@@@ GetSearchResult", data);
    //     this.result = this.getResponse(data);
    //     if (!this.result.success) {
    //       this.showError("کارتابل پاسخگو بارگذاری نشد");
    //       return;
    //     }

    //     this.currentData = this.result.data;
    //     this.currentData.forEach((x, i) => {
    //       x.rowId = this.skip + (i + 1);
    //     });
    //     this.workflowTitleGroups = [];
    //     this.currentData.forEach(({ WorkflowTitel }) => {
    //       if (!this.workflowTitleGroups.includes(WorkflowTitel)) {
    //         this.workflowTitleGroups.push(WorkflowTitel);
    //       }
    //     });
    //     this.workflowTitleGroups = this.workflowTitleGroups.map(
    //       WorkflowTitel => ({
    //         ID: WorkflowTitel,
    //         Title: WorkflowTitel
    //       })
    //     );

    //     this.storeCurrentState();
    //     // end
    //   } catch (e) {
    //     console.log("eeeee", e);
    //     this.showError("خطایی در سرویس رخ داد");
    //   } finally {
    //     this.loading = false;
    //   }
    // },
    // reload() {
    //   this.loadData();
    // },
  }
  // mounted () {
  //   if (this.kartableState.currentData) {
  //     this.restoreCurrentState()
  //   }
  //   if (!this.currentData.length) {
  //     this.loadData()
  //   }
  //   if (this.filter) {
  //     this.filter = this.kartable.filter
  //   }
  // }
  // beforeUpdate () {
  //   this.filter = this.$store.state.kartable.filter
  // }
}
</script>
<style>
.kartable-grid .k-grid {
  height: 100% !important;
}
</style>
