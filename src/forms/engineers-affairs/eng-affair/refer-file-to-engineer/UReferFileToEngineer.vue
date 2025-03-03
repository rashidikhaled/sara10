<template>
  <safa-form
    :id="formKey"
    caption="فرم ارجاع پرونده به مهندس"
    appId="20C96248-C0C2-4DA0-BB07-9480B0C95DCE"
  >
    <form-wrapper :title="title" vertical>
      <template #header>
        <safa-status :result="referFilToEngineerResult" />
        <safa-status :result="getRefToEngineerValidationResult" />
        <safa-status :result="requestResult" />
        <safa-status :result="controlResults" />
        <safa-status :result="doRefManagerDeleteEngineerResult" />
      </template>
      <fit v-if="refTEngForm">
        <safa-splitter v-model="horizontalSplitterModel" horizontal>
          <template v-slot:before>
            <fit>
              <div class="row q-mb-sm">
                <EngineerInfoBox
                  labelWidth="58px"
                  class="col-md-6 col-12"
                  v-model="identityCode"
                  @fetched="getEngineerInfo"
                  :hideSearchBtn="forceReadonly"
                  style="flex: 1"
                />
                <div
                  class="
                    bg-positive
                    flex
                    items-center
                    justify-center
                    q-pa-sm q-mr-sm
                  "
                  v-if="setgreenLabel"
                  style="color: white"
                >
                  {{ fillInfo.GreenCachetDate }}
                </div>
              </div>
              <q-separator class="q-mb-sm" />
              <FormRow class="q-mb-sm">
                <FormControl>
                  <safa-combo
                    :m="mode"
                    label="رشته تحصیلی"
                    label-width="80px"
                    source-type="local"
                    :options="studeyFieldList"
                    v-model="studyField"
                    cdcName="studyField"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    :m="mode"
                    label="صلاحیت"
                    label-width="80px"
                    source-type="local"
                    :options="abilityList"
                    v-model="selectedAbility"
                    validations="required"
                    ref="abilityRef"
                    cdcName="selectedAbility"
                  />
                </FormControl>
                <FormControl>
                  <safa-custom-text
                    m="r"
                    label="زیربنا"
                    label-width="80px"
                    v-model="fillInfo.infrastructure"
                    cdcName="infrastructure"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    m="r"
                    label="تعداد سقف"
                    label-width="80px"
                    v-model="fillInfo.Floor"
                    cdcName="Floor"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    m="r"
                    label="شهر"
                    label-width="80px"
                    ciName="CI_City"
                    domainName="engineer"
                    v-model="fillInfo.CI_City"
                    cdcName="CI_City"
                  />
                </FormControl>

                <FormControl>
                  <safa-combo
                    :m="mode"
                    label="سال"
                    label-width="80px"
                    ciName="CI_Years"
                    domainName="engineer"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                        .CI_Years
                    "
                    :sortFunc="sortCombo"
                    :validation="validations.CI_Years"
                    cdcName="CI_Years"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    m="r"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                        .DateOfRefrence
                    "
                    label="تاریخ ارجاع"
                    label-width="80px"
                    cdcName="DateOfRefrence"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    :m="mode"
                    label="درصد اعمال شده در سهمیه"
                    label-width="80px"
                    v-model="referedPercent"
                    @input="onReferedPercent"
                    cdcName="referedPercent"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    :m="mode"
                    label="تعداد کار"
                    label-width="80px"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info
                        .MaxAllowWork
                    "
                    dir="ltr"
                    cdcName="MaxAllowWork"
                  />
                </FormControl>
                <FormControl>
                  <safa-combo
                    :m="mode"
                    label="وضعیت"
                    label-width="80px"
                    ciName="CI_CancelType"
                    domainName="engineer"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                        .CI_CancelType
                    "
                    cdcName="CI_CancelType"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    :m="mode"
                    label="متراژ"
                    label-width="80px"
                    v-model="referedMeter"
                    @input="onReferedMeter"
                    cdcName="referedMeter"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    :m="mode"
                    label="شماره تعهد ناظر"
                    label-width="80px"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer
                        .CommitmentSupervisionNo
                    "
                    cdcName="CommitmentSupervisionNo"
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    :m="mode"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer
                        .CommitmentSupervisionDate
                    "
                    label="تاریخ تعهد ناظر"
                    label-width="80px"
                    cdcName="CommitmentSupervisionDate"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    :m="mode"
                    label="ساعت ارجاع"
                    label-width="80px"
                    v-model="
                      referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                        .TimeOfRefrence
                    "
                    cdcName="TimeOfRefrence"
                  />
                </FormControl>
              </FormRow>
              <div class="row q-col-gutter-x-lg">
                <safa-checkbox
                  :m="mode"
                  label="ارجاع آزاد"
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.IsFree
                  "
                  cdcName="IsFree"
                />
                <safa-checkbox
                  :m="mode"
                  label="ناظر و مالک یک نفر هستند"
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .IsEngOwner
                  "
                  cdcName="IsEngOwner"
                />
                <safa-checkbox
                  class="col-12 col-md-auto"
                  :m="mode"
                  label=" آیا ناظر مجری است"
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .IsEngExecuter
                  "
                  cdcName="IsEngExecuter"
                />
                <safa-checkbox
                  class="col-12 col-md-auto"
                  :m="mode"
                  label="تعویض مهندس "
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .IsSwitchEngineer
                  "
                  cdcName="IsSwitchEngineer"
                />
                <safa-checkbox
                  class="col-12 col-md-auto"
                  :m="mode"
                  label="هماهنگ کننده "
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .IsCoordinator
                  "
                  cdcName="IsCoordinator"
                />

                <safa-datepicker
                  v-show="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .IsSwitchEngineer
                  "
                  class="col-12 col-md-3"
                  :m="mode"
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .SwitchEngineerDate
                  "
                  label="تاریخ تعویض مهندس"
                  cdcName="SwitchEngineerDate"
                />
              </div>
              <FormRow class="q-mt-sm">
                <FormControl>
                  <safa-datepicker
                    :m="mode"
                    label="تاریخ تایید نظام"
                    label-width="80px"
                    v-model="
                      fillInfo
                        .NezamConfirmDate
                    "
                    cdcName="NezamConfirmDate"
                  />
                </FormControl>
                <FormControl>
                  <safa-text
                    :m="mode"
                    label="ساعت تایید نظام"
                    label-width="80px"
                    v-model="
                      fillInfo.NezamConfirmTime
                    "
                  />
                </FormControl>
                <FormControl>
                  <safa-datepicker
                    :m="mode"
                    label="تاریخ ریجکت نظام"
                    label-width="80px"
                    v-model="
                      fillInfo
                        .NezamRejectDate
                    "
                    cdcName="NezamRejectDate"
                  />
                </FormControl>
                    <FormControl class="col-4">
                      <safa-text
                  :m="mode"
                  v-model="
fillInfo.RejectComment
                  "
                  label="علت ریجکت "
                  label-width="80px"
                  cdcName="RejectComment"
                />
                    </FormControl>

                <FormControl>
                  <safa-text
                    :m="mode"
                    label="ساعت ریجکت نظام"
                    label-width="80px"
                    v-model="
                      fillInfo.NezamRejectTime
                    "
                  />
                </FormControl>
              </FormRow>

<FormRow>
   <div class="fit q-my-sm">
                <text-template
                  :m="mode"
                  v-model="
                    referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                      .RefComments
                  "
                  formKey="b72f39f4-c321-4c01-90df-fc99f61bb0bb"
                  class="col-12"
                  label="توضیحات ارجاع "
                  label-width="80px"
                  cdcName="RefComments"
                />
              </div>
</FormRow>

            </fit>
          </template>
          <template v-slot:after>
            <fit>
              <safa-tabs
                v-model="activeTab"
                :padding="false"
                height="100%"
                class="fit"
              >
                <template v-slot:tabs>
                  <tab-menu
                    name="showReferFileToEngineerGridTab"
                    label="ارجاعات"
                  />
                  <tab-menu
                    name="showReferFileToEngineerDeletedGridTab"
                    label="ارجاعات حذف شده"
                  />
                </template>
                <tab-content name="showReferFileToEngineerGridTab">
                  <safa-datatable
                    title=""
                    helper="referFileToEng"
                    v-model="ReferAllToEnginee"
                    allowMultipleSelection
                    min-height="200px"
                    max-height="100%"
                    height="100%"
                    @selectedChange="selectedReferredItemsHandler"
                    cdcName="ReferAllToEnginee"
                  />
                </tab-content>
                <tab-content name="showReferFileToEngineerDeletedGridTab">
                  <safa-datatable
                    title=""
                    helper="referFileToEngDeleted"
                    v-model="refDelResults"
                    min-height="200px"
                    max-height="100%"
                    height="100%"
                    cdcName="refDelResults"
                  />
                </tab-content>
              </safa-tabs>
            </fit>
          </template>
        </safa-splitter>
      </fit>

      <template v-slot:footer>
        <formActions
          :m="mode"
          @edit="isEditable = true"
          editSPId="cf7b498e-78f3-441b-81c4-e921cad7a848"
          editFormId="3CB1869B-AE17-4A42-BCA9-AC1221CB4D05"
          editSPCaption="دکمه ویرایش"
          @save="referFilToEngineer"
          @cancel="isEditable = false"
        >
          <template v-slot:after>
            <btn-edit
              label="ویرایش سوابق"
              v-show="!isEditable"
              @click="isEditable = true"
              spId="4256e5db-ba24-48e6-a5e1-ae1ccddc5287"
              spCaption="دکمه ویرایش سوابق"
            />
            <btn-edit
              label="ویرایش ارجاع"
              :disabled="!isEditable"
              @click="editRequestRefer"
              spId="17930802-6aff-48fb-8d4c-090dfcfe9906"
              spCaption="ویرایش ارجاع"
            />
            <btn-delete
              @click="deleteOneReferredEng"
              label="حذف"
              spId="7efcda8c-a81e-4692-bac1-c9da737a818b"
              spCaption="حذف ارجاع"
            />
            <btn-delete
              @click="deleteGroupsReferredEng"
              label="حذف گروهی"
              spId="e56c885c-6adb-4c19-a5b4-fcba1090ed68"
              spCaption="حذف گروهی"
            />
            <btn-default
              label="مهر سبز"
              @click="greenSign"
              spId="eee496d3-5bf6-4ca2-ac0c-a3b84f859fc2"
              spCaption="دکمه مهر سبز"
              :disable="lockGreenBTN"
            />
            <btn-default
              label="لغو مهر سبز"
              @click="revokeGreenBtnClick"
              spId="9185b062-dffc-4113-bab6-506e52625953"
              spCaption="دکمه لغو مهر سبز"
              :disable="!lockGreenBTN"
            />
            <btn-default
              label="تعهد"
              @click="referToPoliceMethod"
              spId="84ef6da8-7148-4b0e-962e-85dedc7c6bb9"
              spCaption="تعهد"
            />
            <btn-default
              label="کنترل"
              @click="control"
              spId="fb6eaeeb-9d74-49f6-bd54-8fa105d133b8"
              spCaption="دکمه کنترل"
            />
            <btn-default
              label="صدور گواهی"
              @click="certificationIssuance"
              spId="129f8a9b-203f-42fc-9367-7747df03a791"
              spCaption="صدور گواهی"
            />
            <btn-default label="گزارش" :disabled="true" />
          </template>
        </formActions>
      </template>

      <safa-popup
        title="جستجوی اطلاعات مهندس"
        v-model="shallShowSearchEngineerForm"
        vertical
      >
        <UReferFileToEngineerSearchEngineer @getSearchInfo="getSearchInfo" />
      </safa-popup>

      <safa-popup
        v-model="showDeleteModal"
        title="حذف اطلاعات"
        width="300px"
        height="310px"
      >
        <UReferFileToEngineerDeleted
          @confirmDelete="confirmDelete"
          @hide="showDeleteModal = false"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import UReferFileToEngineerDeleted from "./partials/UReferFileToEngineerDeleted.vue"
import UReferFileToEngineerSearchEngineer from "./partials/UReferFileToEngineerSearchEngineer"
import baseFormMixin from "src/mixins/baseFormMixin"
import PersianDate from "persian-date"
import { currentDate } from "src/utils/index"
import Joi from "joi"
import SafaCustomText from '../../../../components/common/text/SafaCustomText.vue'

const EmptyGuid = "00000000-0000-0000-0000-000000000000"

export default {
  mixins: [baseFormMixin],
  components: {
    UReferFileToEngineerDeleted,
    UReferFileToEngineerSearchEngineer,
    SafaCustomText
  },
  data () {
    return {
      name: "UReferFileToEngineer",
      formKey: "3CB1869B-AE17-4A42-BCA9-AC1221CB4D05",
      title: "ارجاع پرونده به مهندس",
      main: true,

      nidFil: null,

      Context: null,
      isDeleteByGroups: false,
      deleteModel: {
        releaseLetterNo: "",
        releaseLetterDate: "",
        isWithManagerConfirm: false,
        comment: null
      },
      horizontalSplitterModel: 60,
      shallShowClearSearch: false,
      referedMeter: 0,
      studyField: 0,
      referedPercent: 100,
      identityCode: "",
      currentNidFill: null,
      abilityList: [],
      studeyFieldList: [],
      requestResult: null,
      engineerInfo: {},
      engineerImg: "",
      engineerMohr: "",
      engineerSigniture: "",
      imageMode: "ProfilePic",
      shallShowEngineerImg: true,
      shallShowEngineerMohr: false,
      shallShowEngineerSigniture: false,
      lockGreenBTN: false,
      shallShowPopupInfo: true,
      shallShowSearchEngineerForm: false,
      // isEditable: false,
      referFilToEngineerResult: null,
      getRefToEngineerValidationResult: null,
      model: {
        CI_Years_Eng: 1399
      },
      fromModel: { CI_Ability: null, CI_StudyField: null },
      // mode: 'r',
      getReferToEngineerWithNidRefResult: {
        ClsRef_InfoToEngineer: { Qta_Info: {}, Ref_Info: {} }
      },
      userFullname: "",
      referEngSave: {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          ClsRef_InfoToEngineer: {
            AllRef_Info: [],
            CheckBuildingGroup: 0,
            CommitmentSupervisionDate: "",
            CommitmentSupervisionNo: 0,
            CorrectionalArea: 0,
            DontCheck: false,
            ReferedPercent: 0,
            IsCalcDutyFicheOnRefToEngineer: false,
            IsCheckAll: false,
            IsFriend: false,
            IsSuccessPayment: false,
            MetrajGodbardari: 0,
            NIdRef: "00000000-0000-0000-0000-000000000000",
            Qta_Info: {
              CI_Ability: 0,
              CI_Base: 0,
              CI_City: 0,
              CI_StudyField: 1,
              CI_Years: 1401,
              ConfirmDate: new PersianDate()
                .toLocale("en")
                .toCalendar("persian")
                .format("L"),
              DateOfRefrence: "0",
              FloorOfAbility: 0,
              LetterNo: null,
              MaxAllowWork: 1,
              MeterOfAbility: 0,
              NIdEng: "00000000-0000-0000-0000-000000000000",
              NIdQta: "00000000-0000-0000-0000-000000000000",
              NIdQta_tmp: 0,
              NIdRef: "00000000-0000-0000-0000-000000000000",
              QtaComments: "",
              SysCI_QuotaType: 1
            },
            Ref_Info: {
              ApplyPercent: 0,
              CI_Ability: 0,
              CI_Base: 0,
              CI_CancelType: 0,
              CI_Years: 0,
              DateOfRefrence: new PersianDate()
                .toLocale("en")
                .toCalendar("persian")
                .format("L"),
              IsCanceled: false,
              IsCommitment: false,
              IsConfirm: false,
              IsCoordinator: false,
              IsEngExecuter: false,
              IsEngOwner: false,
              IsFree: false,
              IsFriend: false,
              IsRelease: false,
              IsSwitchEngineer: false,
              NIdEng: "00000000-0000-0000-0000-000000000000",
              NIdFil: "00000000-0000-0000-0000-000000000000",
              NIdMem: "00000000-0000-0000-0000-000000000000",
              NIdRef: "00000000-0000-0000-0000-000000000000",
              NIdRef_tmp: 0,
              ReferedMeter: 0,
              ReferedPercent: 100,
              RefComments: "",
              SwitchEngineerDate: null,
              SysCI_ReferType: 0,
              TimeOfRefrence: null
            },
            ReferType: 0,
            isEditReferrals: false
          },
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidFil: "00000000-0000-0000-0000-000000000000",
          NidWorkitem: 0,
          CI_CancelType: 0,
          CI_ExecFloor: 0,
          CI_ExecLevel: 0,
          CI_SazeType: 0,
          CI_Year: 0,
          Floor: 0,
          Height: 0,
          Infrastructure: 0,
          IsConfirm: false,
          IsRefreshOnly: false,
          IsSendToSaraRequest: false,
          NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
          NIdDetail: "00000000-0000-0000-0000-000000000000",
          NIdRealPerson: "00000000-0000-0000-0000-000000000000",
          NidBlackList: "00000000-0000-0000-0000-000000000000",
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRefer: "00000000-0000-0000-0000-000000000000",
          NidTask: "00000000-0000-0000-0000-000000000000",
          NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
          Sara_WorkflowID: 0,
          SecretariatNo: 0,
          Skip: 0,
          StudyFiled: 0,
          SysCI_RequestStatus: 0,
          Take: 0,
          UserGUID: "",
          UserName: ""
        },
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      },
      referEng: {
        pRequest: {
          ArchitectureCode: null,
          CI_RequestType: "0",
          CI_Years: "0",
          CalcBooklet: null,
          ClsBlackList: null,
          ClsBuildingExeReport: null,
          ClsChangeNosaziCode: null,
          ClsChartRequestReport: null,
          ClsCheckIncomeFiche: null,
          ClsEngInfoReport: null,
          ClsEngInfoReport_ForEsup: null,
          ClsEngineer: null,
          ClsEngineerCapacity: null,
          ClsEngineerRequestQta: null,
          ClsEngineerTemp: null,
          ClsFil_Confirm: null,
          ClsFil_Info: null,
          ClsGetEngineers_ForSara: null,
          ClsIncomeDoc: null,
          ClsIncomeSymptoms: null,
          ClsMem_Info: null,
          ClsObjectFactory: null,
          ClsOffice: null,
          ClsQta_GroupStudyFieldQuota: null,
          ClsRefDynamicHistory: null,
          ClsRef_BuildingGroup: null,
          ClsRef_Info: null,
          ClsRef_InfoToEngineer: {
            CheckBuildingGroup: "0",
            CommitmentSupervisionDate: null,
            CommitmentSupervisionNo: null,
            CorrectionalArea: "0",
            DontCheck: "false",
            EngDutyFiche: null,
            ErrorResult: null,
            IdentityCode: null,
            IsCalcDutyFicheOnRefToEngineer: "false",
            IsCheckAll: "false",
            IsFriend: "false",
            IsSuccessPayment: "false",
            MetrajGodbardari: "0",
            NIdRef: "00000000-0000-0000-0000-000000000000",
            OldFilInfo: null,
            QtaInfoForTemporarySave: null,
            Qta_Info: null,
            RefInfoForTemporarySave: null,
            RefToEngTmp: null,
            Ref_Info: null,
            ReferType: "0",
            isEditReferrals: "true"
          },
          ClsRef_RealPerson: null,
          ClsRegisterFicheFromFil: null,
          ClsTarefe: null,
          ClsWFSettings: null,
          Comments: null,
          EngCardInfo: null,
          EngCheckerGroups: null,
          Eng_Match: null,
          Eng_SelectDynamicRef: null,
          EngineerCode: null,
          EngineersOfGroup: null,
          FilCode: null,
          Fil_Operation: null,
          Fil_OperationInfo: null,
          Income_Doc: null,
          NIdMem: null,
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidEngineer: null,
          NidFil: "00000000-0000-0000-0000-000000000000",
          NidOffice: null,
          NidWorkitem: "0",
          OfficeCode: null,
          OwnerScore: null,
          Score: null,
          AcceptDescription: null,
          CI_CancelType: "0",
          CI_ExecFloor: "0",
          CI_ExecLevel: "0",
          CI_SazeType: "0",
          CI_Year: "0",
          ClsBankWebService: null,
          ClsIncome_Payment: null,
          Eng_IncomeFish: null,
          EngineersDynamicRefer: null,
          ErrorResult: null,
          Floor: "0",
          FromYear: null,
          GraphContract: null,
          GraphRequest: null,
          Height: "0",
          Infrastructure: "0",
          IsAccept: null,
          IsConfirm: "false",
          IsRefreshOnly: "false",
          IsSendToSaraRequest: "false",
          NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
          NIdDetail: "00000000-0000-0000-0000-000000000000",
          NIdRealPerson: "00000000-0000-0000-0000-000000000000",
          NidBlackList: "00000000-0000-0000-0000-000000000000",
          NidKartablItem: null,
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRefer: "00000000-0000-0000-0000-000000000000",
          NidTask: "00000000-0000-0000-0000-000000000000",
          NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
          NosaziCode: null,
          OfficeCodeDynamic: null,
          OtherFileType: "0",
          Polygon: null,
          PredicateCondition: null,
          Ref_RealPersonLog: null,
          Sara_Requestdate: null,
          Sara_WorkflowID: "0",
          Sara_WorkflowTitle: null,
          SecretariatDate: null,
          SecretariatNo: "0",
          Skip: "0",
          SrvGetMemOffice_Info: null,
          StudyFiled: "0",
          SysCI_RequestStatus: "0",
          Take: "0",
          ToYear: null,
          UserGUID: "00000000-0000-0000-0000-000000000000",
          UserName: null
        }
      },
      referEngPopup: {
        pRequest: {
          ArchitectureCode: null,
          CI_RequestType: "0",
          CI_Years: "0",
          CalcBooklet: null,
          ClsBlackList: null,
          ClsBuildingExeReport: null,
          ClsChangeNosaziCode: null,
          ClsChartRequestReport: null,
          ClsCheckIncomeFiche: null,
          ClsEngInfoReport: null,
          ClsEngInfoReport_ForEsup: null,
          ClsEngineer: null,
          ClsEngineerCapacity: null,
          ClsEngineerRequestQta: null,
          ClsEngineerTemp: null,
          ClsFil_Confirm: null,
          ClsFil_Info: null,
          ClsGetEngineers_ForSara: null,
          ClsIncomeDoc: null,
          ClsIncomeSymptoms: null,
          ClsMem_Info: null,
          ClsObjectFactory: null,
          ClsOffice: null,
          ClsQta_GroupStudyFieldQuota: null,
          ClsRefDynamicHistory: null,
          ClsRef_BuildingGroup: null,
          ClsRef_Info: null,
          ClsRef_InfoToEngineer: {
            CheckBuildingGroup: "0",
            CommitmentSupervisionDate: null,
            CommitmentSupervisionNo: null,
            CorrectionalArea: "0",
            DontCheck: "false",
            EngDutyFiche: null,
            ErrorResult: null,
            IdentityCode: null,
            IsCalcDutyFicheOnRefToEngineer: "false",
            IsCheckAll: "false",
            IsFriend: "false",
            IsSuccessPayment: "false",
            MetrajGodbardari: "0",
            NIdRef: "00000000-0000-0000-0000-000000000000",
            OldFilInfo: null,
            QtaInfoForTemporarySave: null,
            Qta_Info: null,
            RefInfoForTemporarySave: null,
            RefToEngTmp: null,
            Ref_Info: null,
            ReferType: "0",
            isEditReferrals: "true"
          },
          ClsRef_RealPerson: null,
          ClsRegisterFicheFromFil: null,
          ClsTarefe: null,
          ClsWFSettings: null,
          Comments: null,
          EngCardInfo: null,
          EngCheckerGroups: null,
          Eng_Match: null,
          Eng_SelectDynamicRef: null,
          EngineerCode: null,
          EngineersOfGroup: null,
          FilCode: null,
          Fil_Operation: null,
          Fil_OperationInfo: null,
          Income_Doc: null,
          NIdMem: null,
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidEngineer: null,
          NidFil: "00000000-0000-0000-0000-000000000000",
          NidOffice: null,
          NidWorkitem: "0",
          OfficeCode: null,
          OwnerScore: null,
          Score: null,
          AcceptDescription: null,
          CI_CancelType: "0",
          CI_ExecFloor: "0",
          CI_ExecLevel: "0",
          CI_SazeType: "0",
          CI_Year: "0",
          ClsBankWebService: null,
          ClsIncome_Payment: null,
          Eng_IncomeFish: null,
          EngineersDynamicRefer: null,
          ErrorResult: null,
          Floor: "0",
          FromYear: null,
          GraphContract: null,
          GraphRequest: null,
          Height: "0",
          Infrastructure: "0",
          IsAccept: null,
          IsConfirm: "false",
          IsRefreshOnly: "false",
          IsSendToSaraRequest: "false",
          NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
          NIdDetail: "00000000-0000-0000-0000-000000000000",
          NIdRealPerson: "00000000-0000-0000-0000-000000000000",
          NidBlackList: "00000000-0000-0000-0000-000000000000",
          NidKartablItem: null,
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidRefer: "20a8b0b7-ec87-475c-a6c6-5e072f91ab69",
          NidTask: "00000000-0000-0000-0000-000000000000",
          NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
          NosaziCode: null,
          OfficeCodeDynamic: null,
          OtherFileType: "0",
          Polygon: null,
          PredicateCondition: null,
          Ref_RealPersonLog: null,
          Sara_Requestdate: null,
          Sara_WorkflowID: "0",
          Sara_WorkflowTitle: null,
          SecretariatDate: null,
          SecretariatNo: "0",
          Skip: "0",
          SrvGetMemOffice_Info: null,
          StudyFiled: "0",
          SysCI_RequestStatus: "0",
          Take: "0",
          ToYear: null,
          UserGUID: "00000000-0000-0000-0000-000000000000",
          UserName: null
        }
      },
      CI_StudyField: [],
      CI_Ability: [],
      engCode: null,
      showDeleteModal: false,
      refTEngForm: true,
      results: {
        AllStudyFields: [],
        EngineerAbility: [],
        EngineerLastOffice: [],
        fil_Info: {},
        ClsRef_InfoToEngineer: { Qta_Info: {}, Ref_Info: {} }
      },
      isMale: null,
      isFemale: null,
      editID: null,
      activeTab: "showReferFileToEngineerGridTab",
      NidEngineer: "",
      ReferAllToEnginee: [],
      doRefManagerDeleteEngineerResult: null,
      // ReferAllToEnginee: [
      //   {
      //     IsSelect: true,
      //     CI_CancelType: 1,
      //     IsFree: true,
      //     IsCoordinator: true,
      //     IdentityCode: 30000,
      //     EngName: 'EngbdfhName',
      //     EngFamily: 'نام   خانوادگی',
      //     MobileNo: 'شماره همراه',
      //     NIdRef: 'd4fb123a-67d2-49d5-b936-7c9ed8017d4d'
      //   },
      //   {
      //     IsSelect: true,
      //     CI_CancelType: 1,
      //     IsFree: true,
      //     IsCoordinator: true,
      //     IdentityCode: 30000,
      //     EngName: 'EngbdfhName',
      //     EngFamily: 'نام   خانوادگی',
      //     MobileNo: 'شماره همراه',
      //     NIdRef: 'd4fb123a-67d2-49d5-b936-7c9ed8017d4d'
      //   },
      //   {
      //     IsSelect: true,
      //     CI_CancelType: 1,
      //     IsFree: true,
      //     IsCoordinator: true,
      //     IdentityCode: 30000,
      //     EngName: 'EngbdfhName',
      //     EngFamily: 'نام   خانوادگی',
      //     MobileNo: 'شماره همراه',
      //     NIdRef: 'd4fb123a-67d2-49d5-b936-7c9ed8017d4d'
      //   }
      // ],
      refDelResults: [],
      selectedReferredItem: null,
      selectedReferredItems: [],
      controlResults: null,
      selectedAbility: null,
      fillInfo: {},
      selectedNidFillWithNidProc: "",
      setgreenLabel: false,

      validations: {
        CI_Years: Joi.custom(
          function (value, helper) {
            if (
              this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                .CI_Years === 0 ||
              this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info
                .CI_Years === null
            ) { return helper.message("مقدار نامشخص برای سال مجاز نمی باشد.") }
            return true
          }.bind(this)
        )
      }
    }
  },
  props: {
    engCompareResults: Object
  },
  mounted () {
    this.loadSettingData()
  },
  watch: {
    selectedAbility: {
      handler () {
        if (this.selectedAbility !== null)
        {
          this.$nextTick(() => {
            let tmpitem = this.$refs.abilityRef.selectedItem
            this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.CI_Base =
                   this.Context.EngineerAbility.find(f => f.ID === tmpitem.ID).CI_Base || 0
          })
        }
      },
      deep: true
    },
    shallShowEngineerSigniture () {
      if (this.shallShowEngineerSigniture === true) {
        this.imageMode = "Signiture"
      } else {
        this.imageMode = "ProfilePic"
      }
    },
    shallShowEngineerMohr () {
      if (this.shallShowEngineerMohr === true) {
        this.imageMode = "Mohr"
      } else {
        this.imageMode = "ProfilePic"
      }
    }
    // referedMeter(){
    //    this.referedPercent =
    //     (this.referedMeter * 100) / this.fillInfo.infrastructure;
    // }
  },
  computed: {
    selectedRequestEngineer () {
      console.debug(
        "this.taskInfo, engineer/lastRequest :>> ",
        this.taskInfo,
        this.$store.getters["engineer/lastRequest"]
      )
      if (this.taskInfo) return this.taskInfo
      return this.$store.getters["engineer/lastRequest"] || null
    },
    setCurrentDate () {
      return currentDate()
    }
    // //percent
    // changeReferedPercent() {

    //     return (this.referedPercent * this.fillInfo.infrastructure) / 100;
    // },
    // //meter
    // changeReferedMeter() {
    //   return (this.referedMeter * 100) / this.fillInfo.infrastructure;
    // }
  },
  async created () {
    const { nidfil } = await this.$store.dispatch("engineer/getNidFil", {
      key: this.selectedNidProc,
      request: this.selectedRequestEngineer
    })

    this.nidFil = nidfil || "00000000-0000-0000-0000-000000000000"
    if (this.nidFil) { // از کارتابل پاسخگو میاد
      this.loadData()
    } else {
      this.getFilInfoWithNidProc()
    }
  },

  methods: {
    async loadSettingData () {
      try {
        this.loading = true
        const settings = await this.$stKartable.dispatch(
          "formSettings/getSettings",
          {
            key: "EngSetting",
            defaultValue: this.model
          }
        )
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.CI_Years =
          settings.CI_Years_Eng
      } catch (e) {
        this.showError("خطا در سرویس توضیحات رخ داده است.")
      } finally {
        this.loading = false
      }
    },
    onReferedPercent () {
      this.referedMeter =
        (this.referedPercent * this.fillInfo.infrastructure) / 100
    },
    onReferedMeter () {
      this.referedPercent = parseFloat(
        (this.referedMeter * 100) / this.fillInfo.infrastructure
      ).toFixed(3)
    },
    async getFilInfoWithNidProc () {
      let payload = {
        pRequest: {
          NidProc: this.selectedNidProc || '00000000-0000-0000-0000-000000000000'
        }
      }
      this.$services.engineers
        .getFilInfoWithNidProc(payload)
        .then((response) => {
          const res = this.getResponse(response.data)
          // has not nidFill.
          const nidFill = res?.data?.GetFil_InfoWithNidProcResult?.fil_Info?.NIdFil ?? null

          if (nidFill === null || nidFill === "00000000-0000-0000-0000-000000000000") {
            this.showError("لطفا از طریق دبیرخانه اقدام کنید، پرونده انتخاب نشده است.")
            this.redirectToKartable()
          } else {
            this.currentNidFill = nidFill
            this.loadData()
          }
        })
        .catch((err) => {
          console.error(err)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    getEngineerInfo (val) {
      if (!val.engineerInfo.IdentityCode) return
      this.engCode = val
      this.search()
    },

    clearSearch () {
      this.engCode = null
    },
    convertToImage (buffer) {
      return (
        "data:image/jpg;base64," +
        btoa(String.fromCharCode(...new Uint8Array(buffer)))
      )
    },

    getSearchInfo (value) {
      this.engCode = value
      this.shallShowSearchEngineerForm = false
    },

    loadData () {
      const payload = {
        pRequest: {
          e: this.selectedReferredItem,
          b: this.selectedRequestEngineer,
          NidFil: this.nidFil || this.currentNidFill
        }
      }
      this.showLoading()
      this.$services.engineers
        .getReferAllToEngineer(payload)
        .then((response) => {
          debugger
          this.fillInfo = response.data.GetReferAllToEngineerResult.fil_Info
          this.ReferAllToEnginee =
            response.data.GetReferAllToEngineerResult.AllReferToEngineer
          this.refDelResults =
            response.data.GetReferAllToEngineerResult.AllReferToEngineer_Del
          this.referEng = response.data.GetReferAllToEngineerResult
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter =
            this.fillInfo.infrastructure
          if (
            this.fillInfo.GreenCachetDate !== null &&
            this.fillInfo.GreenCachetDate.trim() !== ""
          ) {
            this.setgreenLabel = true
            this.lockGreenBTN = true
          } else {
            this.setgreenLabel = false
            this.lockGreenBTN = false
          }
        })
        .catch((err) => {
          console.log(err, "err")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // End GetRefToEngineerValidation

    async referFilToEngineer () { // override bool save()
      if (!this.isValidForm()) return
      try {
        this.showLoading()
        if (
          this.results &&
          this.results.EngineerLastOffice &&
          this.engCode.NIdEng === "00000000-0000-0000-0000-000000000000"
        ) {
          this.referEngSave.pRequest.NidEng =
            this.results.EngineerLastOffice.NIdEng
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.NIdEng =
            this.results.EngineerLastOffice.NIdEng
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.NIdEng =
            this.results.EngineerLastOffice.NIdEng
        } else {
          this.referEngSave.pRequest.NidEng = this.engCode.NIdEng
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.NIdEng =
            this.engCode.NIdEng
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.NIdEng =
            this.engCode.NIdEng
        }
        if (this.Context.NIdMem != null && this.Context.NIdMem !== "00000000-0000-0000-0000-000000000000") {
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.NIdMem = this.Context.NIdMem
        }
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.CI_StudyField =
          this.studyField
        this.referEngSave.pRequest.infrastructure =
          this.fillInfo.infrastructure
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.CI_Ability =
          this.selectedAbility
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.CI_Ability =
          this.selectedAbility
        this.referEngSave.pRequest.CI_CancelType = this.results.CI_CancelType
        this.referEngSave.pRequest.Floor = this.fillInfo.Floor
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.CI_City =
          this.results.fil_Info.CI_City

        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.ReferedPercent =
          this.referedPercent
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.ReferedMeter =
          this.referedMeter
        // short tmpMaxAllowWork;
        //                       if (short.TryParse(TxtMaxAllowWork.Text, out tmpMaxAllowWork))
        //                           Context.ClsRef_InfoToEngineer.Qta_Info.MaxAllowWork = tmpMaxAllowWork;
        // Context.ClsRef_InfoToEngineer.Qta_Info.QtaComments =
        //                           string.Format(" ارجاع پرونده به شماره {0} سال {1}", Context.fil_Info.NidWorkItem,
        //                               Context.ClsRef_InfoToEngineer.Ref_Info.CI_Years);
        this.referEngSave.pRequest.NidFil = this.fillInfo.NIdFil
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.CI_Base = this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.CI_Base // fill inside watcher
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.NIdRef = this.Context.ClsRef_InfoToEngineer.Ref_Info.NIdRef || "00000000-0000-0000-0000-000000000000"
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.LetterNo = ''
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Qta_Info.SysCI_QuotaType = 1
        if (!this.Context.ClsRef_InfoToEngineer.Ref_Info.IsSwitchEngineer) {
          this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.SwitchEngineerDate = ''
        }
        this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.NIdFil = this.fillInfo.NIdFil

        this.referEngSave.pRequest.UserGUID = this.getNidUser()
        this.referEngSave.pRequest.UserName = this.getUserDisplayName()
        this.referEngSave.pDtoWorkflowData.StateName = this.nidFil === EmptyGuid && this.selectedRequest && this.selectedRequest.TaskTitel ? this.selectedRequest.TaskTitel : null
        this.referEngSave.pDtoWorkflowData.WorkflowGuid = this.nidFil === EmptyGuid && this.selectedRequest && this.selectedRequest.NidWorkflowDeff ? this.selectedRequest.NidWorkflowDeff : EmptyGuid
        this.referEngSave.pRequest.fil_Info = this.fillInfo
        let payLoad = this.referEngSave
        const { data } = await this.$services.engineers.referFilToEngineer(
          payLoad
        )
        this.referFilToEngineerResult = this.getResponse(data)
        if (this.referFilToEngineerResult.success) {
          this.showSuccess("با موفقیت ذخیره شد")
          this.isEditable = false
          this.loadData()
        }
      } catch (e) {
        this.serverError()
        console.log("error .... ", e)
      } finally {
        this.hideLoading()
      }
    },
    // End ReferFilToEngineer

    getReferToEngineerWithNidRef () {
      if (!this.isEditable) return

      if (this.selectedRequestPasokhgo !== null) {
        this.showLoading()
        this.referEng.pRequest.NidRefer = this.selectedReferredItem.NIdRef
        console.log(
          this.referEng.pRequest.NidRefer,
          "this.referEng.pRequest.NidRefer"
        )
        let data = this.referEng
        // {

        // pRequest: {
        //   NidRefer: this.selectedReferredItem.NIdRef // d4fb123a-67d2-49d5-b936-7c9ed8017d4d
        // }
        // }
        this.showLoading()
        // this.hideLoading()

        this.$services.engineers
          .getReferToEngineerWithNidRef(data)
          .then((response) => {
            this.getReferToEngineerWithNidRefResult =
              response.data.GetReferToEngineerWithNidRefResult
            // this.ReferAllToEnginee =
            //   response.data.GetReferAllToEngineerResult.AllReferToEngineer
            // this.refDelResults =
            //   response.data.GetReferAllToEngineerResult.AllReferToEngineer_Del
          })
          .catch((err) => {
            console.log(err, "err")
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      } else {
        this.showError("از کارتابل موردی را انتخاب کنید")
      }
    },
    // End getReferToEngineerWithNidRef
    search () {
      // console.log(this.selectedRequestPasokhgo)
      // if (!this.selectedRequestPasokhgo) {
      //   this.showError('از کارتابل  پاسخگوی موردی را انتخاب کنید')
      //   return
      // }
      this.showLoading()
      let data = {
        Prequest: {
          ...this.engCode.engineerInfo,
          EngineerCode: this.engCode.IdentityCode || this.identityCode
        }
      }

      this.$services.engineers
        .GetRefToEngineerWithEngCode(data)
        .then((response) => {
          this.results = response.data.GetRefToEngineerWithEngCodeResult
          this.abilityList = this.results.EngineerAbility.map((x) => {
            return {
              ID: x.ID,
              Title: `${x.Title}${" _ "}${x.Base}`
            }
          })

          if (this.abilityList.length > 0) {
            if (
              this.abilityList.filter((x) => x.Title.includes("نظارت")).length >
              0
            ) {
              this.selectedAbility = this.abilityList.filter((x) =>
                x.Title.includes("نظارت")
              )[0].ID
            } else {
              this.selectedAbility = this.abilityList[0].ID
            }
          }

          if (this.results.AllStudyFields.length > 0) {
            this.studeyFieldList = this.results.AllStudyFields.map((x) => {
              return {
                ID: x.ID,
                Title: `${x.Title}`
              }
            })
            this.results.AllStudyFields.ADPstudyFieldRel =
              this.studeyFieldList[0]
          }

          // this.results.Floor = this.selectedRequestPasokhgo.Floor
          // this.results.SInfrastructure = this.selectedRequestPasokhgo.SInfrastructure
          // this.results.infrastructure = this.selectedRequestPasokhgo.SInfrastructure

          let Result = this.results
          this.CI_StudyField = this.results.AllStudyFields

          this.results.DateOfRefrence = new PersianDate()
            .toLocale("en")
            .toCalendar("persian")
            .format("L")

          this.studyField = this.CI_StudyField[0]
            ? this.CI_StudyField[0].ID
            : 0

          this.fromModel.CI_StudyField = this.CI_StudyField[0]
            ? this.CI_StudyField[0].ID
            : null

          this.results.CI_Years = this.results.DateOfRefrence.split("/")[0]

          /** *************************** */
          // if (!this.Context.ClsRef_InfoToEngineer) { this.Context.ClsRef_InfoToEngineer = { Qta_Info:{}}
          /** *********************** */
          this.Context = Result
          if (!this.Context.ClsRef_InfoToEngineer) {
            this.Context.ClsRef_InfoToEngineer = { Qta_Info: {} }
          }
          this.Context.ClsRef_InfoToEngineer.Qta_Info.MaxAllowWork = this.Context
            .ClsRef_InfoToEngineer.Qta_Info.MaxAllowWork
            ? this.Context.ClsRef_InfoToEngineer.Qta_Info.MaxAllowWork
            : -1

          /** *********************** */
          this.Context.EngineerLastOffice = Result.EngineerLastOffice
          this.Context.EngineerAbility = Result.EngineerAbility
          this.Context.AllStudyFields = Result.AllStudyFields
          // //console.log(this.Context.ClsRef_InfoToEngineer.Qta_Info.MaxAllowWork)
          //
          if (
            this.Context.EngineerAbility !== null &&
            this.Context.EngineerAbility.length > 0
          ) {
            // let Tmpmin = this.Context.EngineerAbility.Min(f => f.CI_Base)
            // let Tmpmin = this.Context.EngineerAbility.reduce(function (prev, curr) {
            //   return prev.Cost < curr.Cost ? prev : curr
            // })
            // console.log(Tmpmin)

            if (!this.Context.ClsRef_InfoToEngineer) {
              this.Context.ClsRef_InfoToEngineer = { Ref_Info: {} }
            }
            if (!this.Context.ClsRef_InfoToEngineer.Ref_Info) {
              this.Context.ClsRef_InfoToEngineer.Ref_Info = {}
            }
            this.Context.ClsRef_InfoToEngineer.Ref_Info.CI_Base =
              this.Context.EngineerAbility[0].CI_Base

            if (this.Context.AllStudyFields.length > 0) {
              var tmpStudy = this.Context.AllStudyFields[0]

              // var tmpAbility = this.Context.EngineerAbility.Where(f => f.CI_StudyField === tmpStudy.ID).ToList()
              let tmpAbility = []
              this.Context.EngineerAbility.forEach(function (itm) {
                if (tmpStudy.ID === itm.CI_StudyField) {
                  itm.Title = itm.Title + " ( " + itm.Base + " ) "
                  tmpAbility.push(itm)
                }
              })

              // added
              if (!this.results.ClsRef_InfoToEngineer) {
                this.results.ClsRef_InfoToEngineer = { Qta_Info: {} }
              }

              if (tmpAbility !== null) {
                this.CI_Ability = tmpAbility
                // if (!this.results.AllStudyFields) {
                this.results.AllStudyFields.CI_Ability = this.CI_Ability[0].ID
                this.fromModel.CI_Ability = this.CI_Ability[0].ID
                //  }
                // this.results.AllStudyFields.CI_Ability = tmpAbility.OrderBy(f => f.ID).FirstOrDefault()
              }

              // Combo_StudyFields.ItemsSource = this.Context.AllStudyFields
              // Combo_StudyFields.SelectedItem = tmpStudy
            }
          } else {
            // Combo_StudyFields.ItemsSource = null
            // ComboAbility.ItemsSource = null
          }
          if (this.Context.EngineerLastOffice !== null && this.Context.ClsRef_InfoToEngineer.Ref_Info) {
            this.Context.ClsRef_InfoToEngineer.Ref_Info.NIdEng =
              this.Context.EngineerLastOffice.NIdEng
            this.Context.ClsRef_InfoToEngineer.Ref_Info.NIdMem =
              this.Context.EngineerLastOffice.NIdMem
            this.Context.NIdMem = this.Context.EngineerLastOffice.NIdMem
          } else {
            this.showError("اطلاعاتی با این کد یافت نشد")
          }
          /** *********************** */
          if (this.results.ClsRef_InfoToEngineer === null) {
            this.results.ClsRef_InfoToEngineer = { Qta_Info: {} }
          }
          if (this.results.fil_Info === null) {
            this.results.fil_Info = {}
          }
          if (!this.results.fil_Info) {
            this.results.fil_Info = {}
          }

          this.results.fil_Info.CI_City = 0
          this.results.CI_CancelType = 0
        })
        .catch((err) => {
          console.log(err, "err")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    updateEditStatusById (id, newStatus) {
      if (!id) return
      const data = this.gridData.slice()
      const index = data.findIndex((d) => d.ID === id)
      // override item
      data[index] = { ...data[index], inEdit: newStatus }
      // set gridview rows
      this.gridData = data
      if (newStatus) {
        this.editID = id
      }
    },
    // End updateEditStatusById
    rowClick: function (e) {
      if (this.editForm === true) {
        // set edit field's rows to FALSE
        this.updateEditStatusById(this.editID, false)
        // set edit field's clicked row to TRUE
        this.updateEditStatusById(e.dataItem.ID, true)
        this.$set(e.dataItem, "inEdit", true)
      }
    },
    // End rowClick
    itemChange: function (e) {
      // get grid rows
      const data = this.gridData.slice()
      // console.log('data', data)
      // get row index by product id
      const index = data.findIndex((d) => d.ID === e.dataItem.ID)
      // override item
      data[index] = { ...data[index], [e.field]: e.value }
      // set gridview rows
      this.gridData = data
      // console.log('data', this.gridData)
      // replace grid cell property
      this.$set(e.dataItem, e.field, e.value)
      // console.log('data', this.gridData)
    },
    onMohr () {
      this.shallShowEngineerMohr = !this.shallShowEngineerMohr
    },
    onShowSigniture () {
      this.shallShowEngineerSigniture = !this.shallShowEngineerSigniture
    },
    // End itemChange
    // End del
    referToPoliceMethod () {
      if (this.selectedReferredItem.rowNumber) {
        this.showSuccess("انجام شد")
      } else {
        this.showError("لطفا از گرید ارجاعات یک ردیف انتخاب شود.")
      }
    },
    // End referToPoliceMethod

    certificationIssuance () {
      if (this.selectedReferredItem.rowNumber) {
        this.showSuccess("انجام شد")
      } else {
        this.showError("لطفا از گرید ارجاعات یک ردیف انتخاب شود.")
      }
    },
    // End certificationIssuance
    control () {
      this.showLoading()
      this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info.NIdFil = this.fillInfo.NIdFil
      let data = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          ClsRef_InfoToEngineer: {
            AllRef_Info: [],
            Ref_Info: this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info,
            ReferType: 0,
            NIdRef: "00000000-0000-0000-0000-000000000000"
          },
          UserGUID: this.getNidUser()
        },
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.engineers
        .getRefToEngineerValidation(data)
        .then((response) => {
          this.controlResults = this.getResponse(response.data)
          this.controlResults &&
            this.controlResults.data &&
            this.controlResults.data.GetRefToEngineerValidationResult &&
            this.controlResults.data.GetRefToEngineerValidationResult
              .ClsRef_InfoToEngineer &&
            this.controlResults.data.GetRefToEngineerValidationResult.ClsRef_InfoToEngineer.AllRef_Info.map(
              (x) => {
                return {
                  ...x,
                  AllRef_Info: this.ReferAllToEnginee
                }
              }
            )
          if (this.controlResults.success) {
            this.showSuccess("کنترل انجام شد")
          } else {
            this.showError()
          }
        })
        .catch((err) => {
          console.log(err, "err")
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
      // } else this.showError("لطفا از گرید ارجاعات یک ردیف انتخاب شود.");
    },
    // End control
    greenSign () {
      this.showLoading()
      let payLoad = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          ClsRef_InfoToEngineer: {
            NIdRef: "00000000-0000-0000-0000-000000000000",
            Ref_Info: this.referEngSave.pRequest.ClsRef_InfoToEngineer.Ref_Info,
            ReferType: 0
          },
          NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
          NidEng: "00000000-0000-0000-0000-000000000000",
          NidFil: this.fillInfo.NIdFil,

          UserGUID: this.getNidUser()
        },
        pDtoWorkflowData: {
          StateName: null,
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.engineers
        .getRefToEngineerValidation(payLoad)
        .then((response) => {
          this.getRefToEngineerValidationResult = this.getResponse(response)
          if (this.getRefToEngineerValidationResult.success) {
            this.setGreenBtnClick()
          } else {
            this.showError("مهر سبز ذخیره نشد")
          }
        })
        .catch((e) => {
          this.serverError()
          console.log(e)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    setGreenBtnClick () {
      this.showLoading()
      let data = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          NidFil: this.fillInfo.NIdFil,
          IsConfirm: true
        }
      }

      this.$services.engineers
        .setGreen(data)
        .then((response) => {
          this.controlResults = response.data
          this.showSuccess("مهر سبز با موفقیت انجام شد")
          this.setgreenLabel = true
          this.lockGreenBTN = true
          this.loadData()
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // End setGreenBtnClick
    revokeGreenBtnClick () {
      this.showLoading()
      let data = {
        pRequest: {
          CI_RequestType: 0,
          CI_Years: 0,
          NidFil: this.fillInfo.NIdFil,
          IsConfirm: false
        }
      }

      this.$services.engineers
        .setGreen(data)
        .then((response) => {
          this.controlResults = response.data
          this.showSuccess("مهر سبز با موفقیت ابطال انجام شد")
          this.setgreenLabel = false
          this.lockGreenBTN = false
          this.loadData()
        })
        .catch((response) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    // End revokeGreenBtnClick
    showRefTongEContainer (val) {
      if (val) {
        this.showDeleteModal = false
        this.refTEngForm = true
      }
    },
    // End showRefTongEContainer
    editRequestRefer () {
      if (this.results.EngineerLastOffice.length === 0) {
        this.showError("موردی جستجو نشده")
        return
      }
      if (!this.selectedReferredItem.NidWorkItem) {
        this.showError("موردی از جدول ارجاعات انتخاب نشده")
        return
      }
      this.getReferToEngineerWithNidRef()
    },
    // End editRequestRefer

    deleteOneReferredEng () {
      if (this.selectedReferredItem) {
        this.isDeleteByGroups = false
        this.showDeleteModal = true
      } else {
        this.showError("لطفا سطری از جدول ارجاعات را انتخاب نمایید.")
      }
    },
    deleteGroupsReferredEng () {
      if (this.selectedReferredItems.length > 1) {
        this.isDeleteByGroups = true
        this.showDeleteModal = true
      } else {
        this.showError("لطفا برای حذف گروهی بیش از یک مورد انتخاب نمایید.")
      }
    },

    confirmDelete (val) {
      this.deleteModel = val
      this.showConfirm("آیا از حذف اطمینان دارید؟").onOk(async () => {
        if (this.isDeleteByGroups) {
          for (let i = 0; i < this.selectedReferredItems.length; i++) {
            if (i === this.selectedReferredItems.length - 1) {
              this.isDeleteByGroups = false
            }
            await this.deleteEng(this.selectedReferredItems[i])
          }
        } else await this.deleteEng(this.selectedReferredItem)
      })
    },

    async deleteEng (currentRef) {
      try {
        currentRef.ReleaseLetterNo = this.deleteModel.releaseLetterNo
        currentRef.ReleaseLetterDate = this.deleteModel.releaseLetterDate
        const payload = {
          pDto: {
            DeleteComments: this.deleteModel.comment,
            DeleteUserName: this.getUserDisplayName(),
            DeleteUserNid: this.getNidUser(),
            IsWithManagerConfirm:
              this.deleteModel.IsWithManagerConfirm || false,
            NIdRef: currentRef.NIdRef
          },
          pRequest: {
            ClsRef_InfoToEngineer: {
              ReferType: 0,
              isEditReferrals: false,
              NIdRef: currentRef.NIdRef,
              Ref_Info: currentRef
            },
            UserGUID: this.getNidUser(),
            UserName: this.getUserDisplayName()
          }
        }
        this.showLoading()
        const { data } =
          await this.$services.engineers.doRefManagerDeleteEngineer(payload)
        this.doRefManagerDeleteEngineerResult = this.getResponse(data)
        if (this.doRefManagerDeleteEngineerResult.success) {
          await this.log({
            action: this.logActions.delete,
            bizCode: currentRef.NIdRef,
            bizCodeTitle: "NIdRef"
          })
          if (!this.isDeleteByGroups) {
            this.deleteDone()
          }
        }
      } catch (err) {
        console.error(err)
        this.serverError()
      } finally {
        this.hideLoading()
      }
    },

    deleteDone () {
      this.showSuccess("حذف با موفقیت انجام شد.")
      this.showDeleteModal = false
      if (this.nidFil) {
        this.loadData()
      } else {
        this.getFilInfoWithNidProc()
      }
    },

    selectedReferredItemsHandler (e) {
      this.selectedReferredItem = e.dataItem
      this.selectedReferredItems = e.selectedItems
    },

    sortCombo (item1, item2) {
      return item2.Title - item1.Title
    }
  }
}
</script>
