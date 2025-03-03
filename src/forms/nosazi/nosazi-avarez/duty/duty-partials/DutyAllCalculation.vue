<template>
  <!-- <form-wrapper :loading="loading"> -->
  <fit>
    <safa-status :result="calcRes" />
    <safa-status :result="setIsSureRes" />
    <safa-status :result="deleteSessionRes" />
    <safa-status :result="getNidWorkItemsRes" />
    <safa-status :result="getDutyCalculateDetailsRes" />
    <safa-status :result="calcHeadersRes" />

    <div class="row items-end q-col-gutter-lg q-mb-sm">
      <safa-combo
        ref="refDutyYear"
        v-model="dutyYear"
        :sortFunc="sortCombo"
        ciName="CI_DutyYear"
        class="col-12 col-md-3 col-sm-4"
        domainName="CI_SaraM1"
        label=" سال شروع محاسبه "
      />
      <safa-text
        v-model="NidList.length"
        class="col-12 col-md-3 col-sm-4"
        label="تعداد کل کدهای دریافت شده "
        m="r"
      />
      <template v-if="showFromSetting">
        <safa-combo
          v-if="isShowBaseInfoGroupCombo"
          v-model="selectedInfoCategory"
          :options="infoGroupOptions"
          class="col-12 col-md-3 col-sm-4"
          label="دسته اطلاعاتی"
          label-width="85px"
          sourceType="local"
          @input="infoGroupSelectedItemChanged"
        />
        <safa-combo
          ref="workItem"
          v-model="selectedNidWorkItem"
          :m="nidWorkItemMode"
          :options="workItemList"
          class="col-12 col-md-3 col-sm-4"
          label="شماره درخواست "
          sourceType="local"
        />
      </template>
    </div>
    <q-separator />
    <div class="q-my-sm q-gutter-x-sm">
      <span>
        <q-btn
          color="primary"
          label="انتخاب همه"
          rounded
          size="sm"
          @click="handleSelectAll(true)"
        />
      </span>
      <span>
        <q-btn
          color="primary"
          outline
          rounded
          size="sm"
          @click="handleSelectAll(false)"
          >عدم انتخاب همه</q-btn
        >
      </span>
      <span>|</span>
      <span>
        تعداد آیتم های انتخاب شده:&nbsp;
        <q-badge color="primary" outline>
          {{ allSelectedRowsDetailsCount }}
        </q-badge>
      </span>
      <span>|</span>
      <span>
        مجموع مبالغ: &nbsp;
        <q-badge color="primary" outline>
          {{ totalAmount }}
        </q-badge>
      </span>
      <span>|</span>
      <span>
        <q-btn
          color="primary"
          rounded
          outline
          size="sm"
          @click="handelReversAll()"
        >
          {{ reverseTxt }}
        </q-btn>
      </span>
    </div>
    <q-separator />
    <fit>
      <div
        :class="$q.dark.isActive ? 'bg-lighten4' : 'bg-grey-2'"
        class="duty-calculation-wrapper rounded-borders overflow fit"
      >
        <div
          class="duty-calculation-list full-height custom-scroll overflow-auto min-width: 300px"
          style="max-width: 100%"
          v-if="DutySessionHeaders"
        >
          <DutyCalculationHeader />
          <DutyCalculationRootItem
            v-for="(_, i) in DutySessionHeaders"
            :key="i"
            :list="DutySessionHeaders"
            :index="i"
            :district="District"
            @update:item="updateItem(i, $event)"
            @toggle:expanded="toggleExpanded(i)"
            @setSelectItem="setSelectItem(i, $event)"
            @loadDetails="loadDetails"
          />
        </div>
      </div>
    </fit>
    <safa-popup
      v-model="isShowcalcAndExportModal"
      height="320px"
      title="محاسبه و صدور"
      width="450px"
    >
      <DutyAllCalculationCalcAndExport
        :baseNosaziCode="baseNosaziCode"
        :dutyYear="dutyYear"
        :formKey="formKey"
        :name="name"
        :results="results"
        :selectedInfoCategory="selectedInfoCategory"
        :title="title"
        :nosaziSetting="nosaziSetting"
        @closeExportFichesModal="isShowcalcAndExportModal = false"
      />
    </safa-popup>
    <safa-popup
      v-model="isShowFicheModal"
      title="صدور فیش"
      width="400px"
      height="300px"
    >
      <form-wrapper>
        <DutyAllCalculationExportFiches
          :name="name"
          :title="title"
          :formKey="formKey"
          :baseNosaziCode="baseNosaziCode"
          :config="config"
          :dutyYear="dutyYear"
          :isTempFiche="isTempFiche"
          :results="results"
          :tmpSessionExceptPayyOff="allSelectedRowsDetailsItems"
          :selectedDetails="allSelectedRowsDetailsItems"
          @closeExportFichesModal="isShowFicheModal = false"
          ref="exportFiche"
        />
        <template v-slot:footer>
          <btn-save class="q-mr-sm" label="تأیید" @click="saveExportFiche" />
          <btn-cancel label="انصراف" @click="cancelExportFiche" />
        </template>
      </form-wrapper>
    </safa-popup>
    <safa-popup
      v-model="isShowManualFicheModal"
      title="صدور فیش"
      width="800px"
      height="400px"
    >
      <DutyAllCalculationManualFiche
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :name="name"
        :results="results"
        :selectedInfoCategory="selectedInfoCategory"
        :title="title"
        :tmpSessionExceptPayyOff="allSelectedRowsDetailsItems"
        @closeManualFicheModal="isShowManualFicheModal = false"
      />
    </safa-popup>
    <safa-popup v-model="isShowTempFicheModal" title="صدور فیش" width="600px">
      <DutyAllCalculationManualFiche
        :baseNosaziCode="baseNosaziCode"
        :formKey="formKey"
        :isTempFiche="isTempFiche"
        :name="name"
        :results="results"
        :title="title"
        :tmpSessionExceptPayyOff="allSelectedRowsDetailsItems"
        @closeExportFichesModal="isShowTempFicheModal = false"
      />
    </safa-popup>
  </fit>
  <!-- </form-wrapper> -->
</template>
<script>
/* eslint-disable */
import DutyAllCalculationExportFiches from "./DutyAllCalculationExportFiches.vue";
import DutyAllCalculationCalcAndExport from "./DutyAllCalculationCalcAndExport.vue";
import DutyAllCalculationManualFiche from "./DutyAllCalculationManualFiche.vue";
import DutyCalculationHeader from "src/components/duty/DutyCalculationHeader.vue";
import DutyCalculationRootItem from "src/components/duty/DutyCalculationRootItem.vue";
import baseFormMixin from "src/mixins/baseFormMixin";
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation";
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs";
import xmlConverter from "xml-js";

export default {
  name: "DutyAllCalculation",
  mixins: [baseFormMixin],
  data() {
    return {
      loading: false,
      calcRes: null,
      setIsSureRes: null,
      deleteSessionRes: null,
      getNidWorkItemsRes: null,
      getDutyCalculateDetailsRes: null,
      calcHeadersRes: null,
      EumInfoGroup: null, //  enum ClsEnumEumBaseInfoGroup //
      headerResults: {},
      workItemList: [],
      options: [],
      gridSplitter: 30,
      infoCategories: [
        { ID: 0, Title: "اطلاعات پرونده" },
        { ID: 1, Title: "بازدید" },
        { ID: 3, Title: " مجاز پایانکار " },
      ],
      nosaziSetting: null,
      isShowFicheModal: false,
      isShowcalcAndExportModal: false,
      isShowexportFichesModal: false,
      isShowTempFicheModal: false,
      isMomayezi: false,
      showFromSetting: true,
      isShowManualFicheModal: false,
      isTempFiche: null,
      isSure: true,
      dutyYear: 0,
      selectedInfoCategory: 0,
      calcDetailsResult: { DutySessionDetails: [] },
      fetchCalcDetails: null,
      selectedItem: null,
      nidWorkItemObj: { NidWorkItems: [] },
      nidWorkItemMode: "r",
      selectedNidWorkItem: null,
      // results: {},
      DutySessionHeaders: [],
      isReverse: true,
    };
  },

  computed: {
    reverseTxt() {
      return this.isReverse ? "نمایش صعودی" : "نمایش نزولی";
    },
    config() {
      return { config: { District: this.District } };
    },
    District() {
      return this.baseNosaziCode?.District ?? 1;
    },
    allSelectedRows() {
      return this.DutySessionHeaders.filter(
        (x) => x.selected || x.details.some((s) => s.selected)
      );
    },
    allSelectedRowsDetailsCount() {
      return this.DutySessionHeaders.filter(
        (x) => x.details && x.details.length > 0
      ).reduce(
        (accumulator, currentValue) =>
          accumulator + currentValue.details.filter((x) => x.selected).length,
        0
      );
    },
    allSelectedRowsDetailsItems() {
      return this.DutySessionHeaders.filter(
        (x) => x.details && x.details.length > 0
      ).reduce((accumulator, item) => {
        if (item && item.details) {
          const selectedItems = item.details.filter((x) => x.selected);
          accumulator = [...accumulator, ...selectedItems];
        }
        return accumulator;
      }, []);
    },
    allSelectedItemsInPayOffYear() {
      return this.allSelectedRows.filter(this.isPayOff);
    },
    isSelectedRowsPayOff() {
      return this.allSelectedItemsInPayOffYear.length;
    },
    isShowBaseInfoGroupCombo() {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").isShowBaseInfoGroupCombo;
    },
    infoGroupOptions() {
      // eslint-disable-next-line no-undef
      return window.getConfigValue("infoGroupCombo").infoGroupOptions;
    },
    totalAmount() {
      let price = 0;
      this.DutySessionHeaders.filter((s) => !this.isPayOff(s)).forEach((x) => {
        price += x.Price;
      });
      // console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%price .....", price.toMoney)
      return price;
    },
  },
  props: {
    NidList: Array,
    baseNosaziCode: Object,
    results: Object,
    categoryInfoMode: String,
    formKey: String,
    title: String,
    name: String,
  },
  components: {
    DutyCalculationRootItem,
    DutyCalculationHeader,
    // DutyAllCalculationSessionHeadersDetails,
    DutyAllCalculationExportFiches,
    DutyAllCalculationCalcAndExport,
    DutyAllCalculationManualFiche,
  },
  watch: {
    async selectedInfoCategory() {
      this.nidWorkItemMode = "r";
      switch (this.selectedInfoCategory) {
        case 0:
          this.nidWorkItemMode = "e";
          this.EumInfoGroup = 0; // srvSB.ClsEnumEumBaseInfoGroup.Parvandeh
          break;
        case 1:
          this.nidWorkItemMode = "e";
          await this.getNidWorkItems();
          if (
            this.nosaziSetting.AvarezSettings.isShowRevisitByLastRevisitDate ===
            true
          ) {
            this.nidWorkItemMode = "r";
          }
          if (this.workItemList.length > 0) {
            this.selectedNidWorkItem = this.workItemList[0].ID;
          }
          this.EumInfoGroup = 1; /// srvSB.ClsEnumEumBaseInfoGroup.Revisit
          break;
        case 3:
          this.nidWorkItemMode = "e";
          this.EumInfoGroup = 2; /// srvSB.ClsEnumEumBaseInfoGroup.MojazPayankar
          break;
        case 100:
          this.nidWorkItemMode = "e";
          this.EumInfoGroup = 100; // srvSB.ClsEnumEumBaseInfoGroup.IsfahanNosazi
          break;

        default:
          break;
      }
      this.$emit("sendinfoCategory", this.selectedInfoCategory);
    },
  },
  async created() {
    this.nosaziSetting = await this.loadFormSetting("nosaziSettings", {
      nidProc: GLOBAL_SETTINGS_GUID,
    });
    this.dutyYear = this.nosaziSetting?.AvarezSettings?.startYear;
    if (
      this.nosaziSetting?.AvarezSettings?.isShowRevisitByLastRevisitDate ===
      true
    ) {
      this.nidWorkItemMode = "r";
    }

    await this.getSettingData();
    //  console.log('nosaziSettings',await this.loadFormSetting('nosaziSettings'));
    //  console.log('SenfiSettings',await this.loadFormSetting('SenfiSettings'));
    //  console.log('commissionSettings',await this.loadFormSetting('commissionSettings'));
    //  console.log('BuildingSettings',await this.loadFormSetting('BuildingSettings')); // تنظیمات شهرسازی
    //  console.log('Sharsazi-PersonalSetting',await this.loadFormSetting('Sharsazi-PersonalSetting')); // تنظیمات شخصی
  },
  methods: {
    isPayOff(item) {
      return item.CI_DutyYear <= item.CI_DutyYear_Payoff;
    },
    async getSettingData() {
      try {
        const getSettingDataResult = await this.loadFormSetting(
          "Sharsazi-PersonalSetting"
        );
        if (getSettingDataResult.PersonalSettingNosazi.ChkCalculateNosazi) {
          this.showFromSetting = false;
          this.isMomayezi = true;
        } else {
          this.showFromSetting = true;
          this.isMomayezi = false;
        }
      } catch (error) {
        console.log(error);
      }
    },
    saveExportFiche() {
      this.$refs.exportFiche.save();
    },
    cancelExportFiche() {
      this.$refs.exportFiche.cancel();
    },
    handleSelectAll(isSelected) {
      this.DutySessionHeaders.forEach((item, i) => {
        this.setSelectItem(i, isSelected);
      });
    },
    fetchRootItems(NidList) {
      this.headerResults = {};
      const payload = {
        pNidList: NidList || this.NidList,
        pSysCiDutyType: 1,
      };
      this.$services.SB.getDutyCalculateHeaders(payload, this.config)
        .then(async ({ data }) => {
          this.calcHeadersRes = this.getResponse(data);
          if (this.calcHeadersRes.success) {
            this.headerResults = this.calcHeadersRes.data;
            if (this.headerResults && this.headerResults.DutySessionHeaders) {
              const dataList = this.headerResults.DutySessionHeaders;
              let i = 0;
              dataList.forEach((rootItem) => {
                rootItem.groupName =
                  this.infoGroupOptions.find(
                    (e) => e.ID === rootItem.EumDutyInfoGroup
                  )?.Title || "";

                rootItem.selected = false;
                rootItem.expanded = false;
                rootItem.loading = false;
                rootItem.details = [];
                rootItem.childrenLoaded = false;
                rootItem.rowNum = i + 1;
              });
              this.DutySessionHeaders = dataList;
            }
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            );
            await this.log({
              action: this.logActions.view,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
            });
          }
        })
        .catch((e) => {
          console.error(e);
          this.serverError();
        })
        .finally(() => {});
    },
    updateItem(index, newItem){
      this.$set(this.DutySessionHeaders, index, newItem);
    },
    async toggleExpanded(index){
      const item = this.DutySessionHeaders[index];
      await this.loadDetails(item);
      item.expanded = !item.expanded;
      this.$set(this.DutySessionHeaders, index, item);
    },
    async setSelectItem(index, selected) {
      const item = this.DutySessionHeaders[index];
      item.selected = selected;
      item.expanded = selected;
      await this.loadDetails(item);

      if (item.details) {
        item.details.forEach((detail) => {
          detail.selected = selected;
        });
      }

      this.$set(this.DutySessionHeaders, index, item);
    },
    /**
     * xml log value parser
     * @param obj
     * @param field
     * @returns {*|string}
     */
    getFieldValue(obj, field) {
      if (!obj) return "";
      try {
        if (obj.hasOwnProperty(field)) return obj[field]?._text;
      } catch (ex) {
        console.debug("getFieldValue", obj, field);
      }

      return "";
    },
    /**
     * parse xml logs to array of object
     * @param child
     */
    getChildLogDetails(child) {
      let list = [];
      try {
        const arrayOfClsLog = xmlConverter.xml2json(child.CalculateLog, {
          compact: true,
        });
        console.log("arrayOfClsLog", arrayOfClsLog);
        const clsLog = JSON.parse(arrayOfClsLog);
        console.log("clsLog", clsLog);
        const logObj = clsLog?.ArrayOfClsLog?.ClsLog;
        if (logObj && Array.isArray(logObj)) {
          list = logObj.map((x) => {
            return {
              ...x,
              Subject: this.getFieldValue(x, "Subject"),
              Value: this.getFieldValue(x, "Value"),
              Comment: this.getFieldValue(x, "Comment"),
            };
          });
        } else if (typeof logObj === "object") {
          const resultOfClsLog = {
            Subject: this.getFieldValue(logObj, "Subject"),
            Value: this.getFieldValue(logObj, "Value"),
            Comment: this.getFieldValue(logObj, "Comment"),
          };
          list.push(resultOfClsLog);
        }
      } catch (ex) {
        debugger;
        console.error(ex);
      }

      return list;
    },
    async loadDetails(item) {
      if (item.childrenLoaded) return Promise.resolve();

      try {
        item.loading = true;
        const payload = {
          pNid: item.NidFK,
          pDutyYear: item.CI_DutyYear,
          pSysCiDutyType: 1,
        };
        const { data } = await this.$services.SB.getDutyCalculateDetails(
          payload,
          this.config
        );
        this.getDutyCalculateDetailsRes = this.getResponse(data);
        debugger;
        if (this.getDutyCalculateDetailsRes.success) {
          item.details =
            this.getDutyCalculateDetailsRes.data.DutySessionDetails.map(
              (child) => {
                return {
                  ...child,
                  selected: item.selected,
                  expanded: false,
                  logDetails: this.getChildLogDetails(child),
                };
              }
            );

          debugger;
          item.childrenLoaded = true;
          this.$emit("load", item);
        }
      } catch (ex) {
        console.log(ex);
        this.serverError();
      } finally {
        item.loading = false;
      }
      return Promise.resolve();
    },

    async getNidWorkItems() {
      try {
        this.showLoading();
        this.workItemList = [];
        const payload = {
          pNidFk: this.NidList[0], // NidList.First()
          pSysCiDutyType: 1,
        };

        const { data } = await this.$services.SB.getNidWorkItems(
          payload,
          this.config
        );
        this.getNidWorkItemsRes = this.getResponse(data);
        if (this.getNidWorkItemsRes.success) {
          this.nidWorkItemObj = this.getNidWorkItemsRes.data;
          this.nidWorkItemObj.NidWorkItems.forEach((x) => {
            this.workItemList.push({
              ID: x.NidProc,
              Title: x.NidWorkItem,
              revisitID: x.NidRevisit,
            });
          });
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },

    infoGroupSelectedItemChanged(e) {
      this.$emit("infoGroupSelectedItemChanged", e);
    },
    sortCombo(item1, item2) {
      return item2.Title - item1.Title;
    },

    calculate() {
      let pRequestNidWorkItem = 0;
      let pRequestNidProc = "00000000-0000-0000-0000-000000000000";
      let pRequestNidRevisit = "00000000-0000-0000-0000-000000000000";
      if (this.selectedNidWorkItem) {
        pRequestNidWorkItem = this.$refs.workItem.selectedItem.Title;
        pRequestNidProc = this.$refs.workItem.selectedItem.ID;
        pRequestNidRevisit = this.$refs.workItem.selectedItem.revisitID;
      }
      if (!this.dutyYear) {
        this.showError("سال را مشخص نمایید ");
        return;
      }
      const payload = {
        pNidProc: pRequestNidProc,
        pNidList: this.NidList,
        pFromYear: this.dutyYear,
        pUser: this.currentUser,
        pSysCiDutyType: 1,
        pInfoGroup: this.selectedInfoCategory,
        pIsMomayezi: this.isMomayezi,
        pRevisit: pRequestNidRevisit,
        pNidWorkItem: pRequestNidWorkItem,
        pSelectedNidJob: [],
        pDoFinal: this.nosaziSetting?.AvarezSettings?.doFinal ?? false,
      };
      this.showLoading();
      this.$services.SB.calculateDuty(payload, this.config)
        .then(async ({ data }) => {
          this.calcRes = this.getResponse(data);
          if (this.calcRes.success) {
            const strNosaziCode = convertNosaziCodeObjectToString(
              this.baseNosaziCode
            );
            await this.log({
              action: this.logActions.calculate,
              bizCode: strNosaziCode,
              bizCodeTitle: "کد نوسازی",
            });
            this.showSuccess("محاسبه با موفقیت انجام پذیرفت.");
            this.fetchRootItems();
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
    fiche() {
      if (!this.calculateCanExecute()) return;

      this.isShowFicheModal = true;
      this.isTempFiche = false;
    },
    calcAndExport() {
      this.isShowcalcAndExportModal = true;
    },

    calculateCanExecute(checkPayOff) {
      const hasSelected = this.allSelectedRowsDetailsCount > 0;

      if (!hasSelected) {
        this.showError("هیچ محاسبه ای انتخاب نشده است.");
        return false;
      }
      if (checkPayOff && this.isSelectedRowsPayOff) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.");
        return false;
      }

      return true;
    },
    tempFiche() {
      if (!this.calculateCanExecute()) return;

      this.isShowTempFicheModal = true;
      this.isTempFiche = false;
    },
    async setIsSure(PIsSure) {
      if (!this.calculateCanExecute(false)) return;

      this.showLoading();
      const PNidSessionList = this.allSelectedRowsDetailsItems.map(
        (s) => s.NidSession
      );
      const payload = {
        PNidSessionList,
        PIsSure,
      };
      try {
        const { data } = await this.$services.SB.setIsSure(
          payload,
          this.config
        );
        this.setIsSureRes = this.getResponse(data);
        if (this.setIsSureRes.success) {
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          );
          if (PIsSure) {
            this.showSuccess("قطعیت محاسبات با موفقیت انجام پذیرفت.");
          } else {
            this.showSuccess("عدم قطعیت محاسبات با موفقیت انجام پذیرفت.");
          }
          await this.log({
            action: this.logActions.calculate,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
          });
          this.hideLoading();
          this.fetchRootItems();
        }
      } catch (e) {
        this.hideLoading();
        console.error(e);
      }
    },
    certainty() {
      if (!this.calculateCanExecute(false)) return;

      this.showConfirm("آیا از قطعی کردن محاسبه مطمئن هستید؟").onOk(() => {
        this.setIsSure(true);
      });
    },
    uncertainty() {
      if (!this.calculateCanExecute(false)) return;

      this.showConfirm("آیا ازعدم قطعیت محاسبه مطمئن هستید؟").onOk(() => {
        this.setIsSure(false);
      });
    },
    deleteFiche() {
      const hasSelected = this.allSelectedRowsDetailsCount > 0;

      if (!hasSelected) {
        return this.showError(
          "لطفا حداقل یک سال را برای حذف کردن انتخاب نمایید."
        );
      } else if (!this.isSelectedRowsPayOff) {
        this.showError("محاسبه های انتخاب شده در سال تسویه هستند.");
        return false;
      }

      const isNotSureItems = this.allSelectedRows.filter((s) => !s.IsSure);
      if (isNotSureItems.length === 0) {
        return this.showError("محاسبات انتخاب شده قطعی شده اند.");
      }

      this.showConfirm("آیا از حذف محاسبات انتخاب شده اطمینان دارید؟").onOk(
        async () => {
          await this.deleteSession();
        }
      );
    },
    async deleteSession() {
      try {
        const pNidSessions = this.allSelectedRowsDetailsItems.map(
          (s) => s.NidSession
        );
        const { data } = await this.$services.SB.deleteSession(
          { pNidSessions },
          this.config
        );
        this.deleteSessionRes = this.getResponse(data);
        if (this.deleteSessionRes.success) {
          this.showSuccess("محاسبات انتخاب شده با موفقیت حذف شدند.");
          const strNosaziCode = convertNosaziCodeObjectToString(
            this.baseNosaziCode
          );
          await this.log({
            action: this.logActions.delete,
            bizCode: strNosaziCode,
            bizCodeTitle: "کد نوسازی",
          });
          this.fetchRootItems();
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    handelReversAll() {
      this.DutySessionHeaders.reverse();
      this.isReverse = !this.isReverse;
    },
  },
};
</script>
