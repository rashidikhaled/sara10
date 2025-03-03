<template>
  <safa-form
    appId="badbf938-ee27-414f-8df4-6fa440f8fa70"
    :id="formKey"
    :caption="title"
  >
    <FormWrapper :padding="false" :title="title">
      <Fit>
        <div class="q-px-md q-py-sm">
          <FormRow>
            <FormControl>
              <safa-text
                :value="selectedCommission.SecrNo"
                label="شماره دبیرخانه"
                label-width="75px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :value="selectedCommission.UrbanNidRequest"
                label="شماره ارجاع"
                label-width="75px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-text
                :value="selectedCommission.OwnerName"
                label="نام مالک"
                label-width="75px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <safa-datepicker
                :value="selectedCommission.ComEnterDate"
                label="تاریخ ورود به کمیسیون"
                label-width="75px"
                m="r"
              />
            </FormControl>
            <FormControl>
              <nosazi-code-input
                :actions="false"
                :value="selectedCommission.BizCode"
                label="کد نوسازی"
                label-width="70px"
                m="r"
              />
            </FormControl>
          </FormRow>
          <FormControl>
            <safa-text
              :value="selectedCommission.Address"
              label="آدرس"
              label-width="70px"
              m="r"
              class="q-my-sm"
              :rows="2"
            />
          </FormControl>

          <!--        <q-separator spaced/>-->
        </div>
        <safa-tabs v-model="activeTab" :bordered="false" fit>
          <template v-slot:tabs>
            <tab-menu label="لایحه" name="LayeheTab" />
            <tab-menu label="نظر کارشناس" name="NazarKarshenasTab" />

            <tab-menu label="آرشیو کمیسیون" name="ArchiveTab" />
            <tab-menu label="آرشیو شهرسازی" name="UrbanPlanningArchiveTab" />
            <tab-menu label="آرشیو تبلت بازدید" name="TabletArchiveTab" />
            <tab-menu
              label="آرشیو پلیس ساختمان"
              name="buildingPoliceArchive_tab"
              v-if="rtBuildingPoliceShow"
            />
          </template>

          <tab-content name="LayeheTab" :padding="false">
            <!-- UBillFine In Xaml -->
            <Layehe
              :name="name"
              :title="title"
              :formKey="formKey"
              ref="billFinRref"
              :m="mode"
              @getAreaAfterEditValue="getAreaAfterEditValueHandler"
            />
          </tab-content>
          <tab-content :padding="false" name="NazarKarshenasTab">
            <NazarKarshenas
              ref="nazarKarshenasRef"
              :title="title"
              :name="name"
              :formKey="formKey"
              :commissionsSetting="commissionsSetting"
              :AreaAfterEditValue="AreaAfterEditValue"
              :layeheComents="layeheComents"
              @updateArchiveDomain="setDomainToArchive"
            />
          </tab-content>
          <tab-content name="ArchiveTab">
            <ArchiveKarshenasi ref="ArchiveKarshenasi" :domain="domainCommissionArchive" />
          </tab-content>
          <tab-content name="UrbanPlanningArchiveTab">
            <KarshenasiUrbanPlanningArchive
              ref="KarshenasiUrbanPlanningArchive"
              :formKey="formKey"
            />
          </tab-content>
          <tab-content name="TabletArchiveTab">
            <TabletArchive ref="TabletArchive" />
          </tab-content>
          <tab-content name="buildingPoliceArchive_tab">
            <BuildingPoliceArchive
              :NidProc="selectedCommission.NidProc"
              :BaseNosaziCode="baseNosaziCode"
              ref="BuildingPoliceArchive"
            />
          </tab-content>
        </safa-tabs>
      </Fit>
      <template v-slot:footer>
        <FormActions
          :isFormEditable="enableEdit"
          :m="mode"
          @cancel="onCancel"
          @edit="editObj"
          @save="saveObj"
        >
          <template v-slot:before>
            <!-- @click="nextParvandeh"
            :disable="selectedCommission.rownumber >= totalKartableRows || isEditable" -->
            <!-- @click="prevParvandeh"
              :disable="selectedCommission.rownumber <= 1 || isEditable" -->
              <btn-default
              icon="arrow_forward"
              :disabled="shallHidePrevParvandeh"
              label="پرونده قبلی"
              @click="prevParvandeh"
              />
              <btn-default
              icon-right="arrow_back"
                :disabled="shallHideNextParvandeh"
                label="پرونده بعدی"
                @click="nextParvandeh"
              />
          </template>
          <template v-slot:after>
            <!-- @click="$refs.Voting.showPrevStepHandler()"
            :disable="isEditable" -->
            <btn-default
              v-if="showBtnback"
              label="برگشت"
              @click="showPrevStepHandler"
            />
            <btn-default
              spId="997a5b0e-6cd3-4e1e-aea3-2d276b07e47c"
              label="نظریه کارشناسی"
              @click="BtnExpertReport"
            />
            <!-- @click="$refs.Voting.showNextStepHandler()"
            :disable="isEditable" -->
            <btn-save
            icon-right="keyboard_double_arrow_left"
              v-if="showBtnSend"
              label="ارسال "
              @click="showNextStepHandler"
            />
            <btn-default label="بازآوری" @click="reloadParvandeh" />
            <btn-default
              v-show="activeTab === 'LayeheTab'"
              label="نمایش همه بخش ها"
              @click="$refs.billFinRref.collapseAll"
            />
            <btn-default
              v-show="activeTab === 'LayeheTab'"
              label="جمع کردن همه بخش ها"
              @click="$refs.billFinRref.expandAll"
            />
          </template>
        </FormActions>
        <safa-popup
          title="توضیحات ارسال"
          v-model="showSendDescription"
          width="500px"
          height="285px"
        >
          <SendDescription
            @hide="showSendDescription = false"
            :sendCompleted="sendCompleted"
            :showMessageBalckList="showMessageBalckList"
            :selectedNidCommission="selectedNidCommission"
            :doSend="doSend"
            :isExpertSend="isExpertSend"
            :formKey="formKey"

          />
        </safa-popup>
        <safa-popup
          title=""
          v-model="showNextStep"
          width="500px"
          height="285px"
        >
          <NextStep
            @hide="showNextStep = false"
            :nextStateList="nextStateList"
            :nextStephandler="nextStephandler"
          />
        </safa-popup>
        <safa-popup
          title="برگشت مرحله"
          v-model="showPrevStep"
          width="500px"
          height="300px"
        >
          <PrevStep @hide="showPrevStep = false" />
        </safa-popup>
        <safa-popup
          title="پیغام لیست سیاه"
          v-model="showMessageBalckList"
          width="500px"
          height="300px"
        >
          <MessageBalckList
            :clsCommission_BlankList="clsCommission_BlankList"
            @hide="showMessageBalckList = false"
          />
        </safa-popup>
      </template>
    </FormWrapper>
  </safa-form>
</template>
<script>
import NazarKarshenas from "./partials/NazarKarshenas"
import Layehe from "./partials/Layehe"
import BuildingPoliceArchive from "./partials/BuildingPoliceArchive.vue"
import ArchiveKarshenasi from "./partials/ArchiveKarshenasi"
import PrevStep from "../kartable-commission/partials/PrevStep.vue"
import NextStep from "../kartable-commission/partials/NextStep.vue"
import SendDescription from "../kartable-commission/partials/SendDescription.vue"
import KarshenasiUrbanPlanningArchive from "./partials/KarshenasiUrbanPlanningArchive"
import MessageBalckList from "../kartable-commission/partials/MessageBalckList.vue"
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"
import { currentDate, currentTime } from "src/utils/index"
import { GLOBAL_SETTINGS_GUID } from "src/config/SETTINGS_CONSTs"

import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"

export default {
  components: {
    NazarKarshenas,
    Layehe,
    ArchiveKarshenasi,
    KarshenasiUrbanPlanningArchive,
    SendDescription,
    PrevStep,
    BuildingPoliceArchive,
    NextStep,
    MessageBalckList
  },
  mixins: [baseFormMixin, kartableCommissionMixin],
  data () {
    return {
      title: "کارشناسی",
      name: "Ukarshenasi",
      formKey: "8C717418-509C-4424-B714-6B693F4A5EE8",
      main: true,
      activeTab: "NazarKarshenasTab",
      requstResultHistory: null,
      NidprocT: null,
      layeheComents: "",
      domainCommissionArchive: "",
      CI_Region: 0,
      showBtnback: false,
      showBtnSend: true,
      showNextStep: false,
      showPrevStep: false,
      enableEdit: true,
      shallHidePrevParvandeh: false,
      shallHideNextParvandeh: false,
      historyData: {},
      isArchive: false,
      rtBuildingPoliceShow: false,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      commissionsSetting: {
        IsAcceptTajdidnazar: false,
        IsShowMainKartabl: false,
        IsShowBadviParameter: false,
        HasAutomateCommissionDate: false,
        CmbCommissionDay: 0,
        ChangeMeetingName: false,
        VoteNoFormat: "0",
        InputValueForGhal: false,
        ErrorSelectHoliday: false,
        ReadOnlyExpertFormInVote: false,
        CheckDuplicateTrepassVote: false,
        ScrollTrepassPanel: false,
        CheckCommentsExperts: false,
        IsCheckEmptyVoteTypeDetail: false,
        NotAccessToArchiveInSearchPanel: false,
        NoAgainCalcForEditVote: false,
        ActiveAgentInMultiCommission: false,
        DisableGroupSend: false,
        Instruction: false,
        IsAddTabArchiveSharsazi: false,
        IsNote: false,
        IsNotEditableVoteValue: false,
        HideIscomplainant: false,
        IsShowMessegeMeetinginVote: false,
        MessegeMeetinginVote: "مالک/ذینفع درخواست حضور در جلسه را دارد؟",
        HideElamConfirm: false,
        ShowMesasgeOnEditVote: false,
        LockVoteDate: false,
        HideEditMessage: false,
        IsEnableEditCommissionVoteOfAgent: false,
        UpdateCommissionDate: false,
        ShowDefaultShahrsaziArchive: false,
        IsOrderByVoteHistory: false,
        SetCommissionPrintTypeGharar: false,
        IsEnableEditeVoteNo: false,
        ShowDefaultCommissionArchive: false,
        HideOldCommission: false,
        AddVoteToArchiveThenPrintPreview: false,
        CommissionGridSetting: {
          Id: false, // کد تخلف
          CI_Years: false, // سال تخلف
          TrepassValue: false, // مقدار تخلف
          CommissionSarghofliValue: false, // ارزش سرقفلي
          MinPenalty: false, // حداقل جريمه
          MaxPenalty: false, // حداکثر جريمه
          TrepassGroupType: false, // گروه تخلف/نوع تخلف
          K: false, // K
          Floor: false, // طبقه
          UsingID: false, // کد گروه کاربري فرعي
          UsingTitle: false, // گروه کاربري فرعي
          UsingGroupTitle: false, // گروه کاربري اصلي موجود
          TrespassDateInMunicipality: false, // تاريخ وقوع تخلف از نظر شهرداري
          TrespassDateInEngineer: false, // تاريخ وقوع تخلف از نظر مهندس ناظر
          TrespassDateHappendNotMelak: false, // تاريخ وقوع خلاف ملاک عمل
          CI_UsingTypeGroupMojaz: false, // گروه کاربري اصلي مجاز
          UrbanIdia: false, // تقاضاي شهردار
          VahedCountMosavab: false, // تعداد واحد موجود
          VahedCountMojaz: false, // تعداد واحد مجاز
          KC: false, // ضريب K
          AreaMojod: false, // متراژ موجود
          AreaMojaz: false, // متراژ مجاز
          Trepass_Comments: false, // توضيحات
          Note: false, // تبصره
          IsComplainant: false, // شاکي دارد/ندارد
          IsRightsBystanders: false, // رعايت حقوق مجاورين
          K_S: false, // K (سوابق)
          TrepassValueAmar: false, // متراژ کسر از آمار
          TrepassStatus: false, // وضعيت تخلف
          KC_S: false, // ضريب K (سوابق)
          VoteType_S: false, // نوع راي (سوابق)
          CI_Commission_S: false, // نوع کميسيون (سوابق)
          VoteNo_S: false, // شماره راي (سوابق)
          VoteValue_S: false // مبلغ راي (سوابق)
        },
        CommissionComboPrint: {}
      },
      AreaAfterEditValue: { AreaAfterEdit: '' }
    }
  },
  computed: {
    clsCommission_BlankList () {
      return (
        this?.$refs?.nazarKarshenasRef?.allCommissionDetails
          ?.ClsCommission_BlankList || null
      )
    }
  },
  async created () {
    try {
      this.showLoading()
      setTimeout(async () => {
        await this.onLoad()
        this.hideLoading()
      }, 1000)
    } catch (error) {
      console.log(error)
    }
  },
  methods: {
    async onLoad () {
      try {
        this.showLoading()
        if (await this.canOpenWindow()) {
          await this.reloadSettings()
          await this.loadObj()
          // معادل کانستراکتور UAllPageExpert
          await this.uAllPageExpertloaded()
          // await this.$refs.KarshenasiUrbanPlanningArchive.loadObj()
        }
      } catch (e) {
        console.error(e)
      } finally {
        this.hideLoading()
      }
    },
    showNextStepHandler () {
      if (!this.chkBlackList(true)) {
        if (this.mode === 'e') {
          this.showError(
            'فرم درحالت ویرایش می باشد.لطفا دکمه ذخیره/انصراف را بزنید.'
          )
          return false
        }

        if (
          this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
          false
        ) {
          this.showConfirm('آیا پرونده به شهرسازی عودت داده شود؟').onOk(() => {
            // #todo
            this.odatToSara()
          })
        } else if (
          this.$refs.nazarKarshenasRef.model.CommissionInfo.IsVotable === true
        ) {
          if (
            this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
            !this.getApplicationParam.IsCheckBalckList
          ) {
            this.sendMethod(true, '')
          } else if (!this.isBlackList) this.sendMethod(true, '')
        } else {
          this.showConfirm('آیا برای ارسال اطمینان دارید؟').onOk(() => {
            if (
              this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
              !this.getApplicationParam.IsCheckBalckList
            ) {
              this.sendMethod(true, '')
            } else if (!this.isBlackList) {
              this.sendMethod(true, '')
            }
          })
        }
      }
    },

    odatToSara () {
      if (
        this.getApplicationParam.hasOwnProperty('IsConnectToSara8') &&
        this.getApplicationParam.IsConnectToSara8
      ) {
        this.odatToSara8()
      } else this.odat()
    },

    async odatToSara8 () {
      this.showLoading()

      const payload = {
        NidCommission: this.selectedNidCommission,
        NidProc: this.$refs.nazarKarshenasRef.model.CommissionInfo.NidProc,
        DomainName: 'Commission',
        UserName: this.getUserDisplayName(),
        NidUser: this.getNidUser(),
        ProcStatus: 0,
        EumEventType: 0
      }
      await this.$srvWorkflow
        .setProcStatus(payload, {
          config: {
            District: this.selectedDistrict
          }
        })
        .then(({ data }) => {
          const res = this.getResponse(data)
          if (res.success) this.odat()
          else this.handleError(res)
        })

        .catch((error) => {
          console.error(error)
          // this.serverError() // test serverError
        })

        .finally(() => {
          this.hideLoading()
        })
    },

    async odat () {
      this.showLoading()
      const payload = {
        PNidCommission: this.selectedNidCommission,
        NidUser: this.getNidUser(),
        pNidProc: this.selectedCommission.NidProc
      }

      await this.$services.commissionsSrv
        .odatToSara(payload)
        .then(async ({ data: args }) => {
          const odatToSaraRes = this.getResponse(args)
          if (odatToSaraRes.success) {
            let tmpRequest = { PRequest: this.$refs.nazarKarshenasRef.model }
            tmpRequest.PRequest.CommissionInfo = this.$refs.nazarKarshenasRef.model.CommissionInfo

            tmpRequest.PRequest.CommissionTrepasses =
              this.$refs.nazarKarshenasRef.model.CommissionTrepasses

            await this.$srvWorkflow
              .getAllTaskByNidProc({
                NidProc: this.selectedCommission.NidProc
              })
              .then(async ({ data }) => {
                const getProcessInfoRes = this.getResponse(data)

                if (getProcessInfoRes.success) {
                  await this.log({
                    action: this.logActions.transfer,
                    bizCode: '',
                    bizCodeTitle: '',
                    saveDesc: `انتقال اطلاعات در فرم ${this.title} انجام گردید.`
                  })
                  // eslint-disable-next-line no-unused-vars
                  let nidTask =
                    getProcessInfoRes.data?.GetProcessInfoResult?.Task.find(
                      (i) => i.NidSort
                    )?.NidTask || '00000000-0000-0000-0000-000000000000'
                  this.$store.dispatch(
                    'commission/setSelectedCommission',
                    null
                  )
                  await this.$store.dispatch('commission/fetchKartableRows')
                  // # طبق فرمایشات آقای صالحی این متد کامنت شد
                  // await this.$srvWorkflow
                  //   .updateTask({
                  //     NidTask: nidTask,
                  //     TaskDesc: " عودت شده از زیر سیستم کمیسیون",
                  //   })
                  //   .then(async ({ data: Argss }) => {
                  //     const updateTaskRes = this.getResponse(Argss);

                  //     if (updateTaskRes.success) {
                  //     } else {
                  //       this.handleError(updateTaskRes);
                  //     }
                  //   })
                  //   .catch((error) => {
                  //     console.error(error, "error");
                  //   });
                } else {
                  this.handleError(getProcessInfoRes)
                }
                tmpRequest.PRequest.CommissionInfo.NidCommission =
                  this.$refs.nazarKarshenasRef.NidCommission
                tmpRequest.PRequest.NIDCommission =
                  this.$refs.nazarKarshenasRef.NidCommission
                tmpRequest.PRequest.CommissionInfo.RelapseTime = currentTime()
                tmpRequest.PRequest.NidUser = this.getNidUser()
                tmpRequest.PRequest.UserName = this.getUserDisplayName()

                await this.$services.commissions.saveCommissionRelapse(
                  tmpRequest
                )
                this.hideSidebar('Ukarshenasi')
                this.redirectToCommissionKartable()

                this.showSuccess('پرونده به شهرسازی عودت داده شد')
              })
              .catch((e) => {
                console.error(e)
                // // this.serverError() // test serverError
              })
              .finally(() => {
                this.hideLoading()
              })
          } else {
            this.handleError(odatToSaraRes)
            this.bayganiMovaghat()
          }
        })
        .catch((e) => {
          console.error(e)
          // // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    showPrevStepHandler () {
      // if (this.selectedCommission.IsVote > 0) {
      //   this.showError("برگشت پرونده به دلیل داشتن رای امکان پذیر نمی باشد.");
      // } else {
      //   this.showPrevStep = true;
      // }
      this.showPrevStep = true
    },
    // checkSecurityForCombo () { // ToDo  بخش دسترسی های کمبو
    // Action CheckAccess = new Action(() =>
    //   {
    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID.ToString().ToLower() == Common.Common.AllExpertPermisson[0].Item1))
    //       {
    //           UExpert.Combo_CommissionType.Visibility = Visibility.Visible;
    //           UExpert.txt_CommissionType.Visibility = Visibility.Collapsed;
    //       }
    //       else
    //       {
    //           if (ViewModels.ClsSetting.Settings.HideOldCommission)
    //           {
    //               UExpert.txt_CommissionType.Visibility = Visibility.Collapsed;
    //               UExpert.lblCI_CommissionType.Visibility = Visibility.Collapsed;
    //               UExpert.CC_Combo_CommissionType.Visibility = Visibility.Collapsed;
    //           }
    //           else
    //           {
    //               UExpert.Combo_CommissionType.Visibility = Visibility.Collapsed;
    //               UExpert.txt_CommissionType.Visibility = Visibility.Visible;
    //           }
    //       }
    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID.ToString().ToLower() == Common.Common.AllExpertPermisson[1].Item1))
    //       {
    //           UExpert.Combo_PrintType.Visibility = Visibility.Visible;
    //           UExpert.txt_PrintType.Visibility = Visibility.Collapsed;
    //       }
    //       else
    //       {
    //           if (ViewModels.ClsSetting.Settings.HideOldCommission)
    //           {
    //               UExpert.txt_PrintType.Visibility = Visibility.Collapsed;
    //               UExpert.lblPrintType.Visibility = Visibility.Collapsed;
    //               UExpert.CC_Combo_PrintType.Visibility = Visibility.Collapsed;
    //           }
    //           else
    //           {
    //               UExpert.Combo_PrintType.Visibility = Visibility.Collapsed;
    //               UExpert.txt_PrintType.Visibility = Visibility.Visible;
    //           }
    //       }

    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID.ToString().ToLower() == Common.Common.AllExpertPermisson[2].Item1))
    //       {
    //           UExpert.Combo_Code.Visibility = Visibility.Visible;
    //           UExpert.txt_Code.Visibility = Visibility.Collapsed;
    //       }

    //       else
    //       {
    //           //if (ViewModels.ClsSetting.Settings.HideOldCommission)
    //           //{
    //           //    UExpert.tbOldCommission.Visibility = Visibility.Collapsed;
    //           //    UExpert.CC_Combo_Code.Visibility = Visibility.Collapsed;
    //           //}
    //           //else
    //           {
    //               UExpert.Combo_Code.Visibility = Visibility.Collapsed;
    //               UExpert.txt_Code.Visibility = Visibility.Visible;
    //           }
    //       }
    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID == Guid.Parse("FCBEC4AE-6AA5-471E-B820-D8ED8B5C1178") && f.IsGranted == true))
    //       {
    //           Common.Common.PermissionPrintArchive = 2;
    //       }

    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID == Guid.Parse("FF843777-5623-46F5-B420-84AB075B19AF") && f.IsGranted == true))
    //       {
    //           Btn_Send.Visibility = Visibility.Visible;
    //       }
    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID == Guid.Parse("09C65F0D-58D4-4E5D-8B93-3764A7F6942B") && f.IsGranted == true))
    //       {
    //           Btn_Edit.Visibility = Visibility.Visible;
    //       }

    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID == Guid.Parse("EC9185F2-831E-4B05-BBC9-9EEA6FCC6268") && f.IsGranted == true))
    //       {
    //           UExpert.comboCommissionPriority.Visibility = Visibility.Visible;
    //           UExpert.txt_captionPriority.Visibility = Visibility.Visible;
    //       }
    //       if (tmpUserAccesstoResource.Any(f => f.Resource.GUID.ToString().ToLower() == Common.Common.AllExpertPermisson[3].Item1))
    //       {
    //           UExpert.ComboCICommissionCurrent.Visibility = Visibility.Visible;
    //           UExpert.txtCICommissionCurrent.Visibility = Visibility.Collapsed;
    //       }
    //       else
    //       {
    //           if (ViewModels.ClsSetting.Settings.HideOldCommission)
    //           {
    //               UExpert.txtCICommissionCurrent.Visibility = Visibility.Collapsed;
    //               UExpert.lblCurrentCommission.Visibility = Visibility.Collapsed;
    //               UExpert.CC_ComboCICommissionCurrent.Visibility = Visibility.Collapsed;
    //           }
    //           else
    //           {
    //               UExpert.ComboCICommissionCurrent.Visibility = Visibility.Collapsed;
    //               UExpert.txtCICommissionCurrent.Visibility = Visibility.Visible;
    //           }
    //       }

    //   });

    // //if (tmpUserAccesstoResource == null)
    // //{
    // var srvSecurity = ApplicationCommon.ClsCommon.GetSecurityService();
    // srvSecurity.GetUserResourcePermissionsCompleted += (s, args) =>
    // {
    //     if (args.Error == null)
    //     {
    //         tmpUserAccesstoResource = args.Result.Where(f => f.IsGranted).ToList();

    //         CheckAccess();
    //     }
    // };
    // srvSecurity.GetUserResourcePermissionsAsync(ApplicationCommon.ClsCommon.UserInfo.GUID,
    //     Guid.Parse("8C717418-509C-4424-B714-6B693F4A5EE8"), ApplicationCommon.ClsCommon.GetSignature(),
    //     false);
    // },
    uAllPageExpertloaded () {
      this.isArchive = true
      this.sendCompleted = async function (s) {
        this.showSendDescription = false
        if (s) {
          try {
            await this.$store.dispatch('commission/fetchKartableRows')
            this.$store.dispatch('commission/setSelectedCommission', null)
            this.onCloseForm()
          } catch (error) {
            console.log(error)
          } finally {
          }
          // this.nextParvandeh() درخواست اصفهان بسته شدن فرم هست که نیازی به رفتن به پرونده بعدی نیست
        }
        this.hideLoading()
      }.bind(this)
      if (
        this.getApplicationParam.hasOwnProperty('ShowBuildingPoliceTab') &&
        this.getApplicationParam.ShowBuildingPoliceTab
      ) {
        this.rtBuildingPoliceShow = true
      }
      // پر کردن این بخش برای نمایش  کامپوننت ناظر کارشناس ضروری است
      // CreateArchive();
      //   if (ViewModels.ClsSetting.Settings.IsAddTabArchiveSharsazi)
      //   {
      //       ShahrsaziArchive.Visibility = Visibility.Visible;
      //       ShahrsaziArchive.UNosaziCode.StrCode = NosaziCode.StrCode;
      //   }
      if (
        this.selectedCommission.VoteDate !== null &&
        this.selectedCommission.VoteDate.trim() !== '' &&
        this.getApplicationParam.hasOwnProperty('IsEditInExpertHasVote') &&
        this.getApplicationParam.IsEditInExpertHasVote
      ) {
        this.enableEdit = false
      } else {
        this.enableEdit = true
      }

      // this.checkSecurityForCombo()
      // CreateArchive();
    },
    async BtnExpertReport () {
      let TaskTitel = this.selectedCommission.TaskTitel
      let IsSodour = false
      let AccessExpertReportByTaskTitel = false
      try {
        if (TaskTitel.includes("کمیسیون") || TaskTitel.includes("کميسيون")) {
          IsSodour = true
        }
        AccessExpertReportByTaskTitel = this.getApplicationParam.hasOwnProperty('AccessExpertReportByTaskTitel')
        if (IsSodour && AccessExpertReportByTaskTitel) {
          this.showError("در مرحله (" + TaskTitel + ") امکان چاپ گزارش نظریه کارشناسی وجود ندارد")
        } else {
          const reportPath =
        "/CommissionReports/ComReport/RptExpertsTheory"
          const queryParams = {
            NIdCommission: this.selectedNidCommission,
            NidUser: this.getNidUser()
          }
          this.showReport(reportPath, queryParams)
          await this.log({
            action: this.logActions.printReport,
            bizCode: this.selectedNidCommission,
            bizCodeTitle: "NidCommission",
            nosaziCode: this.selectedCommission.BizCode,
            saveDesc: `چاپ گزارش در فرم ${this.title} با شماره ارجاع ${
              this.selectedCommission?.UrbanNidRequest ?? ""
            } انجام گردید.`
          })
        }
      } catch (error) {

      }
    },
    prevParvandeh () {
      this.shallHideNextParvandeh = false
      this.shallHidePrevParvandeh = false
      if (this.$refs.nazarKarshenasRef.controlMode === 'r') {
        const currentParvandeh = this.$store.getters['commission/kartableRows'].filter(
          (item) => item.rownumber === this.selectedCommission.rownumber - 1
        )
        if (currentParvandeh.length === 0) {
          this.shallHidePrevParvandeh = true
        } else {
          this.shallHidePrevParvandeh = false
          this.$store.dispatch(
            'commission/setSelectedCommission',
            currentParvandeh[0]
          )
          this.reloadParvandeh()
        }
      } else {
        this.showError('پرونده ای انتخاب نشده است')
      }
    },

    async onCancel () {
      this.isEditable = false
      this.$refs.nazarKarshenasRef.controlMode = 'r'
    },
    async reloadSettings () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          'formSettings/getSettings',
          {
            key: 'commissionSettings',
            defaultValue: this.commissionsSetting,
            nidProc: GLOBAL_SETTINGS_GUID
          }
        )
        this.commissionsSetting = require('src/utils/mergeSettings').default(
          this.commissionsSetting,
          settings
        )
      } catch (e) {
        console.log(e)
      } finally {
        this.loading = false
      }
    },
    isInternalValidation () {
      // ToDo پیاده سازی تاریخ روز تعطیل
      //  if (context.CommissionInfo.CommissionDate != null &&
      //             !string.IsNullOrWhiteSpace(context.CommissionInfo.CommissionDate) &&
      //                   ViewModels.ClsSetting.Settings.ErrorSelectHoliday &&
      //                     SilverlightPersianDatePicker.ViewModels.ClsHollyDay.Hollydays != null &&
      //                  SilverlightPersianDatePicker.ViewModels.ClsHollyDay.Hollydays.Any(f => f.Item1 == context.CommissionInfo.CommissionDate))
      //             {
      //                 ClsDialog.ShowMessage(string.Format("تاریخ انتخاب شده روز تعطیل [{0}] می باشد", SilverlightPersianDatePicker.ViewModels.ClsHollyDay.Hollydays.FirstOrDefault(f => f.Item1 == context.CommissionInfo.CommissionDate).Item2));
      //                 return false;
      //             }
      if (
        this.$refs.nazarKarshenasRef.model.CommissionInfo.CI_CommissionType ===
        null
      ) {
        this.showError('لطفا نوع کمیسیون رامشخص نمایید')
        return false
      }
      if (
        this.$refs.nazarKarshenasRef.model.CommissionInfo.HasLegalExpert ===
          true &&
        this.$refs.nazarKarshenasRef.model.CommissionInfo
          .LegalExpertComments === ''
      ) {
        this.showError('لطفا توضیحات کارشناس حقوقی را وارد نمایید')
        return false
      }
      if (
        this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
          false &&
        (this.$refs.nazarKarshenasRef.model.CommissionInfo.CI_RelapseType ===
          null ||
          this.$refs.nazarKarshenasRef.model.CommissionInfo.CI_RelapseType ===
            0)
      ) {
        this.showError('لطفا کد عودت رامشخص نمایید')
        return false
      }
      if (
        this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
          false &&
        (this.$refs.nazarKarshenasRef.model.CommissionInfo.RelapseComments ===
          null ||
          this.$refs.nazarKarshenasRef.model.CommissionInfo.RelapseComments ===
            '')
      ) {
        this.showError('لطفا توضیحات علت عودت رامشخص نمایید')
        return false
      }
      let isSave =
        (this.$refs.nazarKarshenasRef.model.CommissionInfo
          .IsManagementMustBehold == null ||
          this.$refs.nazarKarshenasRef.model.CommissionInfo
            .IsManagementMustBehold === false) &&
        (this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
          null ||
          this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
            false)
      if (isSave) {
        if (
          this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
          null
        ) {
          this.showError(
            'لطفا یکی از گزینه های عودت پرونده و یا قابل طرح بودن در کمیسیون را انتخاب کنید.'
          )
          return false
          // } else if (this.$refs.nazarKarshenasRef.model.CommissionInfo.IsManagementMustBehold === null || this.$refs.nazarKarshenasRef.model.CommissionInfo.IsManagementMustBehold === false) {
          //   this.showError('پرونده نیاز به نظر مدیریت دارد.')
        }
        // else {
        //   this.showError('لطفا اطلاعات را کامل کنید.')
        // }
        // return false
      }
      return true
    },
    saveObj () {
      if (!this.isInternalValidation()) return
      let CommissionInfo = this.$refs.nazarKarshenasRef.model.CommissionInfo
      CommissionInfo.IsRandomCom =
        this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable ===
        true
      let tmpRequest = {}
      tmpRequest.CommissionInfo = CommissionInfo
      if (
        this.selectedCommission.HasGharar &&
        this.selectedCommission.IsVote === -1
      ) {
        tmpRequest.CommissionInfo.RandomCommissionDate =
          this.$refs.nazarKarshenasRef.model.CommissionInfo.CommissionDate
      }

      if (this.$refs.nazarKarshenasRef.$refs.nazaratKarshenasRef.isVotable) {
        // غیر عودت باشه
        this.$refs.nazarKarshenasRef.model.CommissionInfo.RelapseDate = ''
        this.$refs.nazarKarshenasRef.model.CommissionInfo.RelapseTime = ''

        tmpRequest.CommissionInfo.CI_RelapseType = null
        tmpRequest.CommissionInfo.IsVotable = true
        tmpRequest.CommissionInfo.RelapseDate = ''
        tmpRequest.CommissionInfo.RelapseTime = ''
      } else {
        // عودت باشه
        tmpRequest.CommissionInfo.CI_RelapseType =
          this.$refs.nazarKarshenasRef.model.CommissionInfo.CI_RelapseType // should not be 0 or null
        tmpRequest.CommissionInfo.IsVotable = false
        tmpRequest.CommissionInfo.RelapseDate = currentDate()
        tmpRequest.CommissionInfo.RelapseTime = currentTime()
      }

      tmpRequest.CommissionInfo.NidCommission = this.selectedNidCommission
      tmpRequest.NIDCommission = this.selectedNidCommission
      tmpRequest.CommissionInfo.CommissionDateExpert =
        this.$refs.nazarKarshenasRef.model.CommissionInfo.CommissionDate
      tmpRequest.CommissionInfo.ExpertName = this.getUserDisplayName()
      let payload = {
        PRequest: { ...tmpRequest }
      }
      this.showLoading()
      this.$services.commissions
        .saveCommissionInfo(payload)
        .then(async ({ data }) => {
          const res = this.getResponse(data)
          if (res.success) {
            this.showSuccess('با موفقیت انجام شد')

            let currentSelectedCommission = this.selectedCommission
            this.$store.dispatch('commission/setSelectedCommission', null)
            currentSelectedCommission.CommissionDate =
              CommissionInfo.CommissionDate || ''
            currentSelectedCommission.CI_CommissionType =
              CommissionInfo.CI_CommissionType || 0
            this.$store.dispatch(
              'commission/setSelectedCommission',
              currentSelectedCommission
            )
            // if(this.selectedCommission.CI_VoteCorrection===1){
            //   // این سه تا باتن readonly هستند برای چی دوباره ست میشه
            //   // Ownername.ControlMode = SF.EumControlMode.ReadMode;
            //   // Address.ControlMode = SF.EumControlMode.ReadMode;
            //   // RegPluque.ControlMode = SF.EumControlMode.ReadMode;
            // }else{
            //   // این بخش هم که کلا ی فرم دیگه رو داره تغییر میده؟!
            //   // UCommissionInfo.EditTrepass.Visibility = Visibility.Collapsed;
            //   //UCommissionInfo.Grd_trepass.Visibility = Visibility.Visible;
            //   //UCommissionInfo.EditTrepass.save();
            // }
            this.$refs.nazarKarshenasRef.controlMode = 'r'
            this.isEditable = false
            await this.onLoad()
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedNidCommission,
              bizCodeTitle: 'NidCommission',
              saveDesc: `ذخیره اطلاعات در فرم ${this.title} انجام گردید.`
            })
          } else {
            let htmlMsg = ''
            res.errors.forEach((error) => {
              htmlMsg += `<li>${error.text}</li>`
            })
            this.showError(htmlMsg)
          }
        })
        .catch((err) => {
          console.error(err)
          // this.serverError() // test serverError
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    editObj () {
      // ToDoCheckForEnableDisable for UKarshenasi
      this.$nextTick(() => {
        if (!this.chkBlackList()) {
          this.editForm()
        }
      })
    },
    editForm () {
      this.isEditable = true
      // if (this.$refs.nazarKarshenasRef.model.CommissionInfo.CommissionDate === '') { // طبق زمل این خط باید باشه اما رفتار برنامه متفاوت است !
      //   this.$refs.nazarKarshenasRef.model.CommissionInfo.CommissionDate = currentDate()
      // }
      this.$refs.nazarKarshenasRef.model.CommissionInfo.CommissionDate =
        currentDate()
      this.$refs.nazarKarshenasRef.controlMode = 'e'
      this.$refs.nazarKarshenasRef.uExpertChangeControlMode()
      // UExpert.UHistoryVote.ControlMode = SF.EumControlMode.ReadMode;
    },
    chkBlackList (pIsSendMethod) {
      if (
        this.getApplicationParam.hasOwnProperty('IsCheckBalckList') &&
        this.getApplicationParam.IsCheckBalckList
      ) {
        if (
          this.$refs.nazarKarshenasRef &&
          this.$refs.nazarKarshenasRef?.allCommissionDetails
            ?.ClsCommission_BlankList?.Commission_BlackList
        ) {
          this.isBlackList = true
          // let message = subject = "پرونده با کد نوسازی  " + UExpert.context.ClsCommission_BlankList.Commission_BlackList.NosaziCode + "  با توضیحات زیر در لیست سیاه می باشد", Desc = UExpert.context.ClsCommission_BlankList.Commission_BlackList.DescInputBalckList, IsError = (bool)UExpert.context.ClsCommission_BlankList.Commission_BlackList.IsErrorStop, IsSendMethod = pIsSendMethod

          // this.showMessageBalckList = true;

          let message =
            'پرونده با کد نوسازی ' +
            this.$refs.nazarKarshenasRef?.allCommissionDetails
              ?.ClsCommission_BlankList?.NosaziCode +
            '  با توضیحات زیر در لیست سیاه می باشد' +
            this.$refs.nazarKarshenasRef.allCommissionDetails
              ?.ClsCommission_BlankList?.DescInputBalckList
          this.showError(message)
          // Dialog.ClsDialog.ShowWindow(Form, "پیغام لیست سیاه", 500, 350);

          return this.$refs.nazarKarshenasRef.allCommissionDetails
            .ClsCommission_BlankList?.Commission_BlackList?.IsErrorStop
        } else {
          this.isBlackList = false
          return false
        }
      } else {
        this.isBlackList = false
        return false
      }
    },
    nextParvandeh () {
      this.shallHideNextParvandeh = false
      this.shallHidePrevParvandeh = false

      if (
        this.$refs.nazarKarshenasRef &&
        this.$refs.nazarKarshenasRef.controlMode === 'r'
      ) {
        const currentParvandeh = this.$store.getters['commission/kartableRows'].filter(
          (item) => item.rownumber === this.selectedCommission.rownumber + 1
        )
        if (currentParvandeh.length === 0) {
          this.shallHideNextParvandeh = true
        } else {
          this.shallHideNextParvandeh = false
          this.$store.dispatch(
            'commission/setSelectedCommission',
            currentParvandeh[0]
          )
          this.reloadParvandeh()
        }
      } else {
        this.showError('فرم درحالت ویرایش می باشد')
      }
    },
    reloadParvandeh () {
      this.activeTab = 'NazarKarshenasTab'
      this.$nextTick(async () => {
        try {
          if (this.$refs.nazarKarshenasRef) {
            await this.$refs.nazarKarshenasRef.loadObj()
          }
          if (this.$refs.billFinRref) await this.$refs.billFinRref.loadObj()
        } catch (error) {
          console.log(error)
        } finally {
        }
      })
    },
    setDomainToArchive (allCommissionDetails) {
      let tmpArchiveDomain = allCommissionDetails.Commission_Archive.find(
        (f) => f.CI_ArchiveGroup === 4
      )
      if (tmpArchiveDomain == null) {
        tmpArchiveDomain = allCommissionDetails.Commission_Archive[0]
      }
      this.domainCommissionArchive = tmpArchiveDomain.Domain
      return tmpArchiveDomain
    },
    getAllData (
      pNidCommission,
      pUrbanNidKartabl,
      pDistrict,
      pNosaziCode,
      pRequestBy,
      pnidproc
    ) {
      try {
        this.isArchive = true
        if (pNidCommission !== '00000000-0000-0000-0000-000000000000') {
          if (this.selectedCommission != null) {
            this.$nextTick(async () => {
              if (this.$refs.billFinRref) {
                this.$refs.billFinRref.NidCommission = pNidCommission // Common.Common.CurrentKartabl.NidCommission;
                this.$refs.billFinRref.NidKartable =
                  pUrbanNidKartabl.toString() // Common.Common.CurrentKartabl.UrbanNidRequest.ToString();
                this.$refs.billFinRref.NidProc = pnidproc // Common.Common.CurrentKartabl.NidProc;
                this.$refs.billFinRref.NosaziCode = pNosaziCode
                this.$refs.billFinRref.Region = pDistrict
                this.$refs.billFinRref.Requestby = pRequestBy
                await this.$refs.billFinRref.loadObj()
                this.layeheComents =
                  this.$refs.billFinRref.model.ComLayehe.Comments
              }
              if (this.$refs.nazarKarshenasRef) {
                await this.$refs.nazarKarshenasRef.loadObj()
                this.$refs.nazarKarshenasRef.NidCommission = pNidCommission
              }
              this.NidprocT = pnidproc
              this.CI_Region = pDistrict
            })
            // UExpert.GetCommissionInfo();
          } else {
            this.showError('پرونده ای انتخاب نشده است')
          }
        }
      } catch (ex) {
        console.log(ex)
      }
    },
    async loadObj () {
      this.activeTab = 'NazarKarshenasTab'
      // base on xaml
      // CreateArchive(); // مربوط به آرشیو اما چون این مورد قدیمی هست نمیشه عین این کد رو پیاده کرد باید حالت بروز شده باشه
      if (this.selectedCommission !== null) {
        // if (Code.Value == null) Code.Value = "0"; وقتی کارتابل پر هست که این نمیتونه نال بشه اصلا
        await this.getAllData(
          this.selectedCommission.NidCommission,
          this.selectedCommission.UrbanNidRequest,
          this.selectedCommission.CI_Region,
          this.selectedCommission.BizCode,
          this.selectedCommission.SysCI_RequestBy,
          this.selectedCommission.NidProc
        )
        this.baseNosaziCode = convertStringToNosaziCodeObject(
          this.selectedCommission.BizCode
        )
        // }
        // else Busy.IsBusy = false;
      } else {
        this.showError('پرونده ای اتخاب نشده است')
      }
    },

    // loadBizCode (pBizCode, pDomianName) {
    //   if (pBizCode && pDomianName) {
    //     this.lastBizCode = pBizCode
    //     // this.$refs.VotingArchive.fetchedData()
    //     this.$refs.ArchiveKarshenasi.showArchive = true
    //     this.$refs.ArchiveKarshenasi.updateArchiveBizCode(
    //       pBizCode,
    //       pDomianName
    //     )
    //   }
    // },

    loadRevisitTablet (pNidProc, pDistrict) {
      this.$refs.TabletArchive.nidProc = pNidProc
      this.$refs.TabletArchive.district = pDistrict
      this.$refs.TabletArchive.loadObj()
    },
    getAreaAfterEditValueHandler (e) {
      this.AreaAfterEditValue = e
    }
  },

  watch: {
    async selectedNidCommission () {
      // این مورد جهت رندر شدن مجدد فرم صدور رای در صورتی که کاربر در کارتابل کمیسیون یا هر جایی درخواست خود را تغییر بدهد ، انجام شده است
      if (this.selectedNidCommission !== null) {
        await this.onLoad()
      }
    },
    activeTab () {
      try {
        this.$refs.ArchiveKarshenasi.showArchive = false
        this.$refs.KarshenasiUrbanPlanningArchive.showArchive = false
        this.$refs.TabletArchive.showArchive = false
        // eslint-disable-next-line eqeqeq
        if (this.activeTab == 'ArchiveTab' && this.isArchive) {
          if (
            this.$refs?.nazarKarshenasRef?.allCommissionDetails
              ?.Commission_Archive != null &&
            this.$refs?.nazarKarshenasRef?.allCommissionDetails
              ?.Commission_Archive.length > 0
          ) {
            this.$refs.ArchiveKarshenasi.comboAllBizCodeOptions =
              this.$refs?.nazarKarshenasRef.allCommissionDetails.Commission_Archive.map(
                (item, _index) => {
                  return {
                    ...item,
                    Title: item.Caption,
                    ID: _index
                  }
                }
              ) || []
            // let tmpArchive =
            //   this.$refs?.nazarKarshenasRef?.allCommissionDetails
            //     ?.Commission_Archive[0]
            // this.loadBizCode(tmpArchive.RootSubject, tmpArchive.Domain)
          }

          this.hideLoading()
        }
        // آرشیو شهرسازی
        // eslint-disable-next-line eqeqeq
        if (this.activeTab == 'UrbanPlanningArchiveTab') {
          this.$refs.KarshenasiUrbanPlanningArchive.nosaziCode =
            convertStringToNosaziCodeObject(this.currentNosaziCode)

          const tmpNosaziCode = window.getConfigValue('commission100.ShowHouseArchiveOnly', false)
            ? Array.prototype.concat.call(this.selectedCommission.BizCode.split('-').slice(0, 3), [0, 0, 0, 0]).join('-')
            : this.selectedCommission.BizCode

          this.$refs.KarshenasiUrbanPlanningArchive.getBizCode(
            1,
            tmpNosaziCode
          )
        }
        this.isArchive = true

        // ارشیو تبلت
        // eslint-disable-next-line eqeqeq
        if (this.activeTab == 'TabletArchiveTab') {
          this.loadRevisitTablet(this.NidprocT, this.CI_Region)
        }
        if (
          // eslint-disable-next-line eqeqeq
          this.activeTab == 'buildingPoliceArchive_tab'
        ) {
          this.$refs.BuildingPoliceArchive.showArchive = true
          this.$refs.BuildingPoliceArchive.fetchWrapperList()
          // this.$refs.BuildingPoliceArchive.getBizCode(
          //   convertNosaziCodeObjectToString(this.baseNosaziCode)
          // )
        }
      } catch (ex) {
        console.error(ex)
        // this.serverError() // test serverError
        this.hideLoading()
      }
    }
  }
}
</script>
