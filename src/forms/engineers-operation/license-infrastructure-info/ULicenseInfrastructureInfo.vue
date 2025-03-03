<template>
  <safa-form
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
    :id="formKey"
    :caption="title"
  >
    <form-wrapper :title="title">
      <template #header>
        <safa-status :result="baseLibRes" />
        <safa-status :result="getEngConfRes" />
        <safa-status :result="saveEngConfirmRes" />
        <safa-status :result="getReqHeaderRes" />
        <safa-status :result="mapControlRes" />
        <safa-status :result="saveMapControlEngineerRes" />
      </template>
      <fit>
        <FormRow>
          <FormControl>
            <safa-text
              label="کد ارجاع"
              label-width="80px"
              v-model="dmSearch.NidWorkItem"
              cdcName="NidWorkItem"
              type="number"
              required
              validations="required"
              @keypress.enter="loadObj"
              ref="theSearchInput"
            />
          </FormControl>
          <FormControl>
            <safa-combo
              label="منطقه"
              label-width="80px"
              source-type="local"
              :options="dmSearch.districtOpt"
              v-model="dmSearch.district"
              cdcName="district"
              required
              validations="required"
            />
          </FormControl>
          <div>
            <btn-search @click="loadObj" label="جستجو" />
          </div>
        </FormRow>
        <FormRow class="q-my-sm">
          <FormControl>
            <safa-text
              label-width="80px"
              label="مالک"
              m="r"
              v-model="dmBaseInfo.ownerFullName"
              cdcName="ownerFullName"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="80px"
              label="نوع درخواست"
              m="r"
              v-model="dmBaseInfo.Sh_RequestInfo.WorkflowTitel"
              cdcName="WorkflowTitel"
            />
          </FormControl>
          <FormControl>
            <safa-text
              label-width="80px"
              label="تاریخ درخواست"
              m="r"
              v-model="dmBaseInfo.Sh_RequestInfo.RequestDate"
              cdcName="RequestDate"
            />
          </FormControl>
          <nosazi-code-input
            v-model="dmBaseInfo.codeNosaziString"
            cdcName="codeNosaziString"
            label="کد نوسازی"
            label-width="80px"
            m="r"
          />
        </FormRow>
        <safa-tabs v-model="activeTab" class="fit" :padding="false">
          <template v-slot:tabs>
            <tab-menu name="karbariha" label="کاربری ها" />
            <tab-menu name="pishAmagiha" label="پیش آمدگی ها" />
            <tab-menu name="parking" label="پارکینگ" />
            <tab-menu name="mohandesConfirm" label="تایید مهندس" />
          </template>
          <tab-content name="karbariha">
            <fit>
              <safa-grid
                title="کاربری ها"
                v-model="modal.Base_Using"
                cdcName="Base_Using"
                helper="agBaseUsingColumns"
                fit
                :m="mode"
                paginate
              />
            </fit>
          </tab-content>
          <tab-content name="pishAmagiha">
            <fit>
              <safa-grid
                title="پیش آمدگی ها"
                v-model="modal.Base_Front"
                cdcName="Base_Front"
                helper="agBaseFrontColumns"
                fit
                :m="mode"
                paginate
              />
            </fit>
          </tab-content>
          <tab-content name="parking">
            <fit>
              <safa-splitter v-model="splitterValue" class="fit" vertical>
                <template v-slot:before>
                  <fit>
                    <safa-grid
                      title="پارکینگ"
                      v-model="modal.Base_Parking"
                      cdcName="Base_Parking"
                      helper="agBaseParkingColumns"
                      fit
                      :m="mode"
                      paginate
                    />
                  </fit>
                </template>
                <template v-slot:after>
                  <fit>
                    <safa-grid
                      title="نحوه تامین پارکینگ"
                      v-model="modal.Base_SupplyParking"
                      cdcName="Base_SupplyParking"
                      helper="agBaseSupplyParkingColumns"
                      fit
                      :m="mode"
                      paginate
                    />
                  </fit>
                </template>
              </safa-splitter>
            </fit>
          </tab-content>
          <tab-content name="mohandesConfirm">
            <fit>
              <safa-grid
                title="تایید مهندس"
                v-model="dmEng.list"
                cdcName="EngConfirmList"
                helper="agEngConfirmColumns"
                fit
                m="r"
                paginate
              />
            </fit>
          </tab-content>
        </safa-tabs>
      </fit>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveObj"
          @cancel="loadObj"
        >
          <template #after>
            <btn-default
              v-if="activeTab === 'mohandesConfirm'"
              label="تایید"
              @click="showConfirmEngModal = true"
            />
          </template>
        </form-actions>
      </template>

      <safa-popup v-model="showConfirmEngModal" height="255px" width="400px">
        <fit>
          <text-template
            v-model="dmEng.Comment"
            cdcName="comments"
            label="توضیحات"
            placeholder="توضیحات تایید را وارد نمایید."
            class="fit q-pa-sm"
            required
            validation="required"
          />
          <q-separator />
          <form-actions
            class="q-px-sm q-pb-sm"
            m="e"
            @save="saveConfirm"
            @cancel="showConfirmEngModal = false"
          />
        </fit>
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin";
import kartableReferencesMixin from "../mixins/kartableReferencesMixin";
import { convertNosaziCodeObjectToString } from "src/utils/nosaziCodeOperation";

export default {
  mixins: [kartableReferencesMixin, baseFormMixin],
  data() {
    return {
      name: "ULicenseInfrastructureInfo",
      title: "اطلاعات زیربنای پروانه",
      formKey: "B608D2FE-EFDF-4681-84FC-15597C519465",
      main: true,

      // #services
      baseLibRes: null,
      getEngConfRes: null,
      getReqHeaderRes: null,
      mapControlRes: null,
      saveMapControlEngineerRes: null,
      saveEngConfirmRes: null,

      // #variables
      activeTab: "karbariha",
      isView: false,
      splitterValue: 50,
      showConfirmEngModal: false,

      dmSearch: {
        NidWorkItem: 0,
        district: 1,
        districtOpt: [],
      },
      dmBaseInfo: {
        codeNosaziString: "",
        ownerFullName: "",
        ArchiveWrapper: {},
        BuildingObj: {},
        HouseObj: {},
        MainObj: {},
        Sh_RequestInfo: {
          WorkflowTitel: "",
        },
        Sh_Workflow: {},
      },
      dmEng: {
        list: [],
        Comment: "",
      },
      modal: {
        Base_Info: {},
        Base_Using: [],
        Base_Front: [],
        Base_Parking: [],
        Base_SupplyParking: [],
      },
    };
  },

  async mounted() {
    let districts = await this.getDistricts();
    this.dmSearch.districtOpt = districts;
    if (this.selectedExecRep?.NidWorkItem) {
      this.dmSearch.district = this.selectedExecRep.CodeString.split("-")[0];
      this.dmSearch.NidWorkItem = this.selectedExecRep.NidWorkItem.toString();
    } else {
      this.dmSearch.district = this.dmSearch.districtOpt[0];
    }
    this.$nextTick(() => {
      this.$refs.theSearchInput.setFocus();
    });
  },

  methods: {
    getDistricts() {
      const inConfigs =
        window.getConfigValue("districts").map((x) => x.ID || x.Id) ?? [];
      const allowed =
        this.currentUser.JobLocation?.allowDomains?.split(",")?.map(Number) ??
        [];
      return allowed.filter((x) => inConfigs.includes(x)) ?? [];
    },
    reset() {
      this.resetValidation();
      this.isEditable = false;
      this.dmBaseInfo = {
        codeNosaziString: "",
        ownerFullName: "",
        ArchiveWrapper: {},
        BuildingObj: {},
        HouseObj: {},
        MainObj: {},
        Sh_RequestInfo: {
          WorkflowTitel: "",
        },
        Sh_Workflow: {},
      };
      this.dmEng = {
        list: [],
        Comment: "",
      };
      this.modal = {
        Base_Info: {},
        Base_Using: [],
        Base_Front: [],
        Base_Parking: [],
        Base_SupplyParking: [],
      };
    },
    loadObj() {
      this.reset();
      if (!this.dmSearch.district || this.dmSearch.NidWorkItem === 0) {
        this.showError("کد ارجاع و منطقه به درستی تنظیم نشده است.");
        return;
      }
      this.showLoading();
      this.$services.SA.getBaseLibInNidWorkItem(
        { pNidWorkItem: this.dmSearch.NidWorkItem },
        this.config
      )
        .then(async ({ data }) => {
          this.baseLibRes = this.getResponse(data);
          if (this.baseLibRes.success) {
            this.dmBaseInfo = this.baseLibRes.data;
            this.dmBaseInfo.codeNosaziString = convertNosaziCodeObjectToString(
              this.dmBaseInfo.MainObj
            );
            this.dmEng.Comment = "";

            await this.getEngineerConfirm();
            await this.loadRequestHeader();
            await this.loadMapControlEngineer();
          }
        })
        .catch((e) => {
          console.error(e);
          this.showError("کد ارجاع یا منطقه به درستی تنظیم نشده است.");
        })
        .finally(() => {
          this.hideSending();
        });
    },
    async getEngineerConfirm() {
      try {
        const { data } = await this.$services.engineers.getEngineerConfirm({
          pNidWorkItem: this.dmSearch.NidWorkItem,
          pType: "3",
        });
        this.getEngConfRes = this.getResponse(data);
        if (this.getEngConfRes.success) {
          this.dmEng.list =
            this.getEngConfRes.data?.GetEngineerConfirmResult?.EngConfirm ?? [];
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      }
    },
    async loadRequestHeader() {
      try {
        const { data } = await this.$services.SA.loadRequestHeader(
          { pNidProc: this.dmBaseInfo.Sh_RequestInfo.NidProc },
          this.config
        );
        this.getReqHeaderRes = this.getResponse(data);
        if (this.getReqHeaderRes.success) {
          this.dmBaseInfo.ownerFullName =
            this.getReqHeaderRes.data?.Base_Owner?.map(
              (x) => `${x.OwnerName} ${x.OwnerLastName} (${x.NationalCode})`
            ).join(", ") ?? "";
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      }
    },
    async loadMapControlEngineer() {
      try {
        const { data } = await this.$services.SC.loadMapControlEngineer(
          { pNidProc: this.dmBaseInfo.Sh_RequestInfo.NidProc },
          this.config
        );
        this.mapControlRes = this.getResponse(data);
        if (this.mapControlRes.success) {
          console.log("this.mapControlRes.data :>> ", this.mapControlRes.data);
          this.modal = this.mapControlRes.data;
          if (!this.isView) {
            await this.log({
              action: this.logActions.view,
              bizCode: this.dmBaseInfo.codeNosaziString,
              bizCodeTitle: "کد نوسازی",
              nosaziCode: this.dmBaseInfo.codeNosaziString,
              nidWorkItem: this.dmSearch.NidWorkItem,
              saveDesc: `نمایش اطلاعات در فرم اطلاعات زیربنای پروانه برای کد ارجاع  ${this.dmSearch.NidWorkItem} با موفقیت انجام گردید.`,
            });
          }
          this.isView = true;
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      }
    },
    async saveObj() {
      try {
        this.showLoading();
        const payload = {
          pMapControl: this.modal,
          pUser: {
            UserGuid: this.getNidUser(),
            UserName: this.getUserDisplayName(),
          },
        };
        const { data } = await this.$services.SC.saveMapControlEngineer(
          payload,
          this.config
        );
        this.saveMapControlEngineerRes = this.getResponse(data);
        if (this.saveMapControlEngineerRes.success) {
          this.showSuccess("عملیات ذخیره با موفقیت انجام شد.");
          await this.log({
            action: this.logActions.save,
            bizCode: this.dmBaseInfo.codeNosaziString,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: this.dmBaseInfo.codeNosaziString,
            nidWorkItem: this.dmSearch.NidWorkItem,
            saveDesc: `ذخیره اطلاعات در فرم اطلاعات زیربنای پروانه برای کد ارجاع  ${this.dmSearch.NidWorkItem} با موفقیت انجام گردید.`,
          });
          this.loadObj();
        }
      } catch (e) {
        console.log(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
    async saveConfirm() {
      if (!this.isValidForm()) return;
      const payload = {
        pNidEng: this.getNidUser(),
        pDescription: this.dmEng.Comment,
        pDistrict: this.dmSearch.district,
        pNidWorkItem: this.dmSearch.NidWorkItem,
        pType: "3",
      };
      try {
        const { data } = await this.$services.engineers.saveConfirm(payload);
        this.saveEngConfirmRes = this.getResponse(data);
        if (this.saveEngConfirmRes.success) {
          this.showSuccess("مهندس با موفقیت تایید شد.");
          this.dmEng.list =
            this.saveEngConfirmRes.data.SaveConfirmResult.EngConfirm;
          await this.log({
            action: this.logActions.confirm,
            bizCode: this.dmBaseInfo.codeNosaziString,
            bizCodeTitle: "کد نوسازی",
            nosaziCode: this.dmBaseInfo.codeNosaziString,
            nidWorkItem: this.dmSearch.NidWorkItem,
            saveDesc: `تایید مهندس در فرم اطلاعات زیربنای پروانه برای کد ارجاع  ${this.dmSearch.NidWorkItem} با موفقیت انجام گردید.`,
          });
          this.showConfirmEngModal = false;
        }
      } catch (e) {
        console.error(e);
        this.serverError();
      } finally {
        this.hideLoading();
      }
    },
  },
  watch: {
    "dmSearch.NidWorkItem": {
      handler() {
        if (this.dmSearch.NidWorkItem === "") {
          this.dmSearch.NidWorkItem = 0;
        }
      },
      immediate: true,
    },
  },
  computed: {
    config() {
      return { config: { District: this.dmSearch.district } };
    },
  },
};
</script>
