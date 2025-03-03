<template>
  <div>
    <safa-status :result="saveNewVoteRes" />

    <internal-section title="جزئیات">
      <div class="row items-center q-col-gutter-x-sm q-mb-sm">
        <safa-datepicker
          label="تاریخ برگزاری کمیسیون"
          v-model="value.CommissionInfo.CommissionDate"
          label-width="130px"
          cdcName="CommissionDate"
          m="r"
          class="col-md-3"
        />
        <!-- ciName="CI_CommissionType"
          domainName="CI_SaraM1" -->
        <safa-combo
          label="نوع کمیسیون"
          label-width="90px"
          :options="commissionTypeOptions"
          source-type="local"
          v-model="value.CommissionInfo.CI_CommissionType"
          cdcName="CI_CommissionType"
          m="r"
          class="col-md-2"
          @input="updateCIPrintTypeList"
        />
        <!-- <safa-checkbox
          v-if="value.CommissionInfo.IsMeeting"
          label="حضور نماینده"
          style="min-width: 60px"
          v-model="value.CommissionInfo.IsMeeting"
          cdcName="IsMeeting"
          m="r"
        /> -->
        <safa-text
          m="e"
          v-model="AreaAfterEditValue.AreaAfterEdit"
          cdcName="AreaAfterEdit"
          label="مقدار در مسیر"
          label-width="80px"
          bgColor="green-2"
        />
        <safa-label
          v-if="showAgentPresentLabel"
          style="font-size: 15px; font-weight: Bold; color: red"
        >
          حضور نماینده
        </safa-label>
        <safa-label
          v-if="showComplainantLabel"
          style="font-size: 15px; font-weight: Bold; color: #ff4747"
        >
          دارای شاکی
        </safa-label>
        <safa-label
          v-if="showbackListLabel"
          style="font-size: 15px; font-weight: Bold; color: SaddleBrown"
        >
          *این پرونده در لیست سیاه می باشد*
        </safa-label>
        <safa-label
          v-if="showProtestDeadlineLabel"
          style="font-size: 15px; font-weight: Bold; color: red"
        >
          اتمام مهلت اعتراض
        </safa-label>
        <safa-label
          v-if="showOutOfRangeLabel"
          style="font-size: 15px; font-weight: Bold; color: #ff4747"
        >
          خارج از محدوده
        </safa-label>
        <!-- <safa-combo
          label="فراوانی کدملی مالک"
          label-width="100px"
          class="col-md-2"
        /> -->
        <!-- && (isNaN(issuedVoteModel.issuedVote.CI_VoteType) ? 'r' : 'e') -->
        <!-- <safa-combo
          ciName="CI_PrintType"
          domainName="CI_SaraM1"
          label="نوع چاپ"
          label-width="50px"
          v-model="value.CommissionInfo.CI_PrintType"
          cdcName="CI_PrintType"
          :m="comboPrintTypeMode"
          @input="$emit('checkBadviButton')"
          class="col-md-2"
        /> -->
      </div>
      <div class="flex q-gutter-x-sm q-mb-sm">
        <btn-default
          v-if="hasVoteHistory"
          label="سوابق رای"
          @click="voteHistoryDialog = true"
          icon="update"
        />
        <btn-save
          v-else
          label="سوابق رای"
          @click="voteHistoryDialog = true"
          icon="update"
        />
        <btn-default
          v-if="shallIllustrateAgentVote"
          :disable="m === 'r'"
          label="رای نماینده ها"
          @click="showAgentsVote = true"
        />
        <btn-default
          :disable="!showPrintHistory"
          label="تاریخچه چاپ"
          @click="printHistoryDialog = true"
          icon="history_edu"
        />
        <!-- ciName="CI_PrintType"
        domainName="CI_SaraM1" -->
        <safa-combo
          :options="cIPrintTypeList"
          source-type="local"
          label="نوع چاپ"
          label-width="50px"
          v-model="value.CommissionInfo.CI_PrintType"
          cdcName="CI_PrintType"
          :m="m"
          @input="$emit('checkBadviButton')"
          style="min-width: 220px"
        />
        <safa-text
          v-if="layeheMainInfo?.MosavabUsing"
          :maxlength="12"
          label="کاربری مجاز"
          label-width="90px"
          :value="layeheMainInfo?.MojazUsing"
          cdcName="MojazUsing"
          m="r"
        />
        <safa-text
          v-else
          :maxlength="12"
          label="کاربری مصوب"
          label-width="90px"
          :value="layeheMainInfo?.MosavabUsing"
          cdcName="MosavabUsing"
          m="r"
        />
        <btn-default
          v-if="showHoghoghiBtn"
          label="یادداشت گذاری"
          @click="noteDialog = true"
        />
        <btn-default
          v-if="showBarasiHoghoghiBtn"
          label="بررسی حقوقی"
          :disable="m === 'r'"
          @click="barasiHoghoghiDialog = true"
        />
        <btn-default
          v-if="showLoginBtn"
          label="ورود به سیستم"
          @click="loginToSystem = true"
          icon="person"
        />
        <q-separator vertical />
        <btn-default
          label="سوابق جلسات"
          @click="sessionHistoryDialog = true"
          icon="published_with_changes"
        />

        <!-- <safa-text
              label="کاربری مجاز"
              label-width="75px"
              m="r"
            />
          <safa-text
              label="کاربری مصوب"
              label-width="75px"
              m="r"
            /> -->
            <safa-label
        v-if="AllUrbanComments"
        style="font-size: 15px; font-weight: Bold; color: red" class="q-mt-sm"
      >
        {{ AllUrbanComments }}
      </safa-label>
      </div>
      <div
        class="row q-col-gutter-sm q-mb-sm flex no-wrap"
        v-if="IsMashhadConfigSet"
      >
        <safa-combo
          label="فراوانی کد ملی مالک"
          label-width="130px"
          m="r"
          source-type="local"
          :options="OwnerNationalCodeNosaziList"
          class="col-md-2"
        />
      </div>
      <div class="row q-col-gutter-sm q-mb-sm flex no-wrap">
        <safa-text
          class="col"
          label="توضیحات کارشناسی"
          label-width="130px"
          m="r"
          v-model="value.CommissionInfo.Comments"
          cdcName="Comments"
        />
        <div>
          <btn-default label="گزارش کارشناس" @click="expertReport" />
        </div>
      </div>
      <!-- title="GrdCommissionAppose" -->
      <div v-if="showProtestDeadlineLabel" class="q-gutter-sm q-mr-sm q-my-sm">
        <safa-datatable2
          v-model="value.Commission_Appose"
          cdcName="Commission_Appose"
          height="250px"
          min-height="100px"
          max-height="100%"
          paginate
          m="r"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
          :disableSelectionOnClick="false"
          :checkboxSelection="true"
          :columns="CommissionApposeColumns"
        />
        <!-- تاریخ قابل ویرایش نیست -->
      </div>

      <text-template
        :m="'r'"
        v-model="layeheComents"
        cdcName="layeheComents"
        :formKey="'84a2fd27-e3ec-47a9-958d-04a5be08709d'"
        class="q-my-sm"
        :rows="1"
        label="توضیحات منطقه"
        label-width="130px"
      />

      <!-- <text-template
        label="توضیحات کارشناس حقوقی"
        label-width="130px"
        m="r"
        :rows="2"
      /> -->
    </internal-section>
    <div class="q-mb-sm" style="min-height: 100px">
      <!-- <safa-datatable2
        :customButtons="[
          { onClick: btnMin, text: 'محاسبه حداقل', icon: 'calculate' },
          { onClick: btnMax, text: 'محاسبه حداکثر', icon: 'calculate' },
        ]"
        title="تخلفات"
        v-model="value.CommissionTrepasses"
        cdcName="CommissionTrepasses"
        height="250px"
        min-height="100px"
        max-height="100%"
        :m="voteTrepassesMode"
        :showSelectedCheckbox="false"
        :allowMultipleSelection="false"
        :disableSelectionOnClick="true"
        :checkboxSelection="true"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        :columns="voteTrepassesColumns"
        ref="takhalofatRef"
        class="takhalofat"
      >
        <template #head-IsSelected>
          <safa-select
            v-model="selectionValue"
            cdcName="selectionValue"
            source-type="local"
            :useInput="false"
            :hideOnDisabled="true"
            :m="selection_SelectionMode"
            :options="[
              { ID: 0, Title: 'همه' },
              { ID: 1, Title: 'هیچکدام' },
              { ID: 2, Title: 'معکوس' },
            ]"
            @input="selection_SelectionChanged"
          />
        </template>
        <template #cell-IsSelected="{ row, col, onChangeCellValue }">
          <safa-checkbox
            :m="row.IsHaveVote == true ? 'r' : 'e'"
            :value="row[col.field]"
            @input="
              onChangeCellValue({
                field: col.field,
                dataItem: row,
                value: $event,
              })
            "
          />
        </template>

        <template #cell-KCoeffiecient="{ row, col, onChangeCellValue }">
          <safa-text
            :m="KCoeffiecientMode(row, col)"
            v-model="row[col.field]"
            cdcName="]"
            @input="
              onChangeCellValue({
                field: col.field,
                dataItem: row,
                value: $event,
              })
            "
          />
        </template>

        <template #cell-VoteType_S="{ row, col }">
          <safa-combo
            ciName="CI_VoteType"
            domainName="Commission100"
            v-model="row[col.field]"
            cdcName="]"
            :m="row.editable === true ? 'e' : 'r'"
          />
        </template>
        <template #cell-CI_Commission_S="{ row, col }">
          <safa-combo
            ciName="CI_Commission"
            domainName="Commission100"
            v-model="row[col.field]"
            cdcName="]"
            :m="row.editable === true ? 'e' : 'r'"
          />
        </template>
        <template #cell-CI_CommissionType_S="{ row, col }">
          <safa-combo
            ciName="CI_CommissionType"
            domainName="Commission100"
            v-model="row[col.field]"
            cdcName="]"
            :m="row.editable === true ? 'e' : 'r'"
          />
        </template>

        <template #bottom v-if="kCoeffiecientShow">
          <div class="flex q-gutter-x-sm">
            <safa-text
              type="number"
              v-model="txtAllK"
              cdcName="txtAllK"
              @input="txtAllK_OnValueChanging"
              :validations="['number', 'required']"
            />

            <btn-default label="اعمال" @click="btnSet_Click" />

            <btn-default
              class="col-auto"
              label="محاسبه"
              @click="btn_CalculateVote_Click"
            />
            <btn-default
              class="col-auto"
              label="بازآوری اطلاعات"
              @click="reloadCommissionTrepassesGridData"
            />
          </div>
        </template>
      </safa-datatable2> -->
      <safa-grid
        title="تخلفات"
        v-model="value.CommissionTrepasses"
        cdcName="CommissionTrepasses"
        height="350px"
        min-height="100px"
        max-height="100%"
        :m="voteTrepassesMode"
        :filterable="true"
        :allowMultipleSelection="false"
        :columns="voteTrepassesColumns"
        :pinnedBottomRowData="[{}]"
        :getRowStyle="getRowStyleTakhalofat"
        :overlayLoadingTemplate="overlayLoadingTemplate"
        :groupable="false"
        @grid:ready="onGridReady"
        :add-row="false"
        :delete-row="false"
        :allow-copy="false"
        ref="takhalofatRef"
        class="takhalofat"
        id="uniqueKeyViolation"
      />
    </div>
    <internal-section
      title="توضیحات نماینده"
      class="q-mb-sm"
      v-if="expAgentsShow"
      :defaultShow="false"
    >
    <!-- helper="voteOfAgentColumns" -->
      <safa-datatable2
        title="توضیحات نماینده"
        :filterable="true"
        :columns="voteOfAgentColumns"
        v-model="value.ListCommissionVoteOfAgent"
        cdcName="ListCommissionVoteOfAgent"
        height="250px"
        min-height="100px"
        max-height="100%"
        :addRow="false"
        :deleteRow="false"
        :allowCopy="false"
        paginate
        :m="m"
        >
      <template #cell-AcceptDate="{ row, col, onChangeCellValue,errorMessage, inEdit }">
            <ValidationWrapperTemplate
            :row="row"
            :col="col"
            :onChangeCellValue="onChangeCellValue"
            :errorMessage="errorMessage"
            :inEdit="inEdit"
              :enableValidation="false"
          >
            <safa-datepicker
              m="r"
              dir="ltr"
              display-format="dddd jDD jMMMM jYYYY"
              format="jYYYY/jMM/jDD"
              label-width="auto"
              locale="fa"
              :value="row[col.field]"
              @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
            />
            </ValidationWrapperTemplate>
          </template>
          <template #cell-AcceptTime="{ row, col }">
            {{row[col.field]}}
          </template>
          <template #cell-Description="{ row, col, onChangeCellValue, errorMessage, inEdit }">
           <ValidationWrapperTemplate
            :row="row"
            :col="col"
            :onChangeCellValue="onChangeCellValue"
            :errorMessage="errorMessage"
            :inEdit="inEdit"
          >
            <safa-text
              :enableValidation="false"
              style="width: 100%;"
              label-width="auto"
              :m="row.m"
              :value="row[col.field]"
              @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
            />
            </ValidationWrapperTemplate>
          </template>
          <template #cell-UserName="{ row, col, onChangeCellValue, errorMessage, inEdit }">
           <ValidationWrapperTemplate
            :row="row"
            :col="col"
            :onChangeCellValue="onChangeCellValue"
            :errorMessage="errorMessage"
            :inEdit="inEdit"
          >
            <safa-text
              :enableValidation="false"
              m="r"
              label-width="auto"
              :value="row[col.field]"
              @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
            />
            </ValidationWrapperTemplate>
          </template>
      <template #cell-CI_AgentOpinion="{ row, col, onChangeCellValue, errorMessage }">
             <ValidationWrapperTemplate
            :row="row"
            :col="col"
            :onChangeCellValue="onChangeCellValue"
            :errorMessage="errorMessage"
            :inEdit="true"
          >
            <safa-combo2
              :m="row.m"
              class="grid-combo sf-control col full-height"
              :enableValidation="false"
              style="width: 100%"
              label-width="auto"
              ciName="CI_AgentOpinion"
              domainName="Commission100"
              :value="row[col.field]"
              @input="
                onChangeCellValue({
                  field: col.field,
                  dataItem: row,
                  value: $event,
                })
              "
            />
             </ValidationWrapperTemplate>
          </template>
      </safa-datatable2>
      <div class="flex items-center q-mt-sm">
        <btn-save @click="$emit('clsButtonSaveAgentClick')" />
         <btn-default
              v-if="showSigniture"
              label="حذف امضا"
              class="q-ml-sm"
              icon="close"
              @click="btnDeleteAgentSigniture"
            />
      </div>
    </internal-section>
    <internal-section title="اطلاعات رای">
      <IssuedVote
        :commissionsSetting="commissionsSetting"
        :formKey="formKey"
        v-model="issuedVoteModel.issuedVote"
        cdcName="issuedVote"
        :selectedCommission="selectedCommission"
        :commissionInfo="value.CommissionInfo"
        :maxVoteObj="maxVoteObj"
        :m="m"
        :showAcceptBadvi="showAcceptBadvi"
        :showRejectBadvi="showRejectBadvi"
        :isHideVoteDate="isHideVoteDate"
        :isHideVoteTime="isHideVoteTime"
        :showCmbEvaluation="showCmbEvaluation"
        :showPerformVote="showPerformVote"
        :isNewVote="isNewVote"
        @onCancelNewVote="cancel_Click"
        @saveIssuedVote="editAccept_Click"
        @onVotesCompilation="onVotesCompilation"
        @onAcceptBadvi="onAcceptBadvi"
        @onRejectBadvi="onRejectBadvi"
        @onPerformVote="onPerformVote"
        @voteType_SelectionChanged="voteType_SelectionChanged"
        @comboCodeSelectionChanged="comboCodeSelectionChanged"
        ref="issuedVote"
      />
    </internal-section>

    <SideBySideGridTemplate
      class="q-mb-sm"
      :show="commTreDetail"
      @hide="commTreDetail = null"
    >
      <template #before>
        <safa-datatable
          height="300px"
          title="صدور رأی"
          paginate
          :allowMultipleSelection="false"
          :checkboxSelection="false"
          @selectedChange="selectVoteIssued"
          :columns="voteIssuedColumns"
          v-model="getGroupVoteTrepass"
          cdcName="getGroupVoteTrepass"
          @editVoteClick="btnEditvoteClick($event.dataItem)"
          ref="groupVoteTrepassRef"
          :add-row="false"
          :allow-copy="false"
          :delete-row="false"
        />
      </template>
      <template #after>
        <safa-datatable
          title="تخلفات"
          v-model="commTreDetail"
          cdcName="commTreDetail"
          height="300px"
          min-height="200px"
          max-height="100%"
          paginate
          m="r"
          :showSelectedCheckbox="false"
          :allowMultipleSelection="false"
          :disableSelectionOnClick="false"
          :checkboxSelection="true"
          :addRow="false"
          :deleteRow="false"
          :allowCopy="false"
          helper="CommTrepassColumns"
        />
      </template>
    </SideBySideGridTemplate>

    <!-- :loginHistory="loginHistory" -->
    <CommissionVoteOfAgent
      ref="CommissionVoteOfAgent"
      :commissionsSetting="commissionsSetting"
      v-show="voteOfAgentShow"
      :title="title"
      :formKey="formKey"
      :name="name"
    />

    <!-- helper="voteIssuedColumns" -->
    <!-- <safa-datatable
      title="رای های صادر شده"
      :columns="voteIssuedColumns"
      v-model="value.Commission_VoteList"
      cdcName="Commission_VoteList"
      class="q-mr-sm"
      m="r"
      height="100%"
      min-height="100px"
      max-height="100%"
      show-selected-checkbox
      :extraProps="value.CommissionTrepasses"
      allowMultipleSelection
      :addRow="false"
      :deleteRow="false"
      :allowCopy="false"
      @editVoteClick="issuedVoteHandler"
      @selectedChange="selectedVotes"
      paginate
    >
    </safa-datatable> -->
    <safa-popup
      v-model="voteHistoryDialog"
      width="1000px"
      height="500px"
      title="سوابق رای"
    >
      <VoteHistory :formKey="formKey" />
    </safa-popup>
    <safa-popup
      v-model="printHistoryDialog"
      width="600px"
      height="500px"
      title="تاریخچه چاپ"
    >
      <PrintHistory :formKey="formKey" />
    </safa-popup>
    <safa-popup
      v-model="loginToSystem"
      width="600px"
      height="500px"
      title="ورود به سیستم"
    >
      <LoginToSystem v-model="loginHistory" />
    </safa-popup>
    <safa-popup
      v-model="noteDialog"
      width="600px"
      height="500px"
      title="یادداشت"
    >
      <Note :formKey="formKey" />
    </safa-popup>
    <safa-popup
      v-model="barasiHoghoghiDialog"
      width="800px"
      height="500px"
      title="بررسی حقوقی"
    >
      <u-barasi-hoghoghi
        @accseptHoghoghi="accseptHoghoghi"
        :commission_Info="value.CommissionInfo"
        :commissionsSetting="commissionsSetting"
      />
    </safa-popup>
    <safa-popup
      v-model="showAgentsVote"
      width="800px"
      height="500px"
      title="رای نماینده ها"
    >
      <AgentsVote @onAddVoteTrepassToList="onAddVoteTrepassToList" />
    </safa-popup>
    <safa-popup
      v-model="sessionHistoryDialog"
      width="600px"
      height="500px"
      title="سوابق جلسات"
    >
      <SessionHistory :formKey="formKey" />
    </safa-popup>
    <safa-popup
      title="برگشت مرحله"
      v-model="showPrevStep"
      width="500px"
      height="310px"
    >
      <PrevStep
        @hide="showPrevStep = false"
        @done="
          showPrevStep = false
          hideSidebar('UVoting')
        "
      />
    </safa-popup>
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
    <safa-popup title="" v-model="showNextStep" width="500px" height="285px">
      <NextStep
        @hide="showNextStep = false"
        :nextStateList="nextStateList"
        :nextStephandler="nextStephandler"
      />
    </safa-popup>
    <safa-popup
      title="پیغام لیست سیاه"
      v-model="showMessageBalckList"
      cdcName="showMessageBalckList"
      width="500px"
      height="300px"
    >
      <MessageBalckList
        :clsCommission_BlankList="clsCommission_BlankList"
        @hide="showMessageBalckList = false"
      />
    </safa-popup>
    <safa-popup
      title="تایید رای بدوی"
      v-model="showMultiBadvi"
      cdcName="showMultiBadvi"
      width="1300px"
      height="550px"
    >
      <MultiBadvi
        ref="multiBadvi"
        :multiBadviModel="multiBadviModel"
        @onMultiBadvi="onMultiBadvi"
        @hide="showMultiBadvi = false"
      />
    </safa-popup>
  </div>
</template>

<!-- eslint-disable vue/no-unused-components -->
<!-- eslint-disable eqeqeq -->
<script>
// Mixins
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

// Utils
import PersianDate from "persian-date"

// Components
import VoteHistory from "./VoteHistory"
import PrintHistory from "./PrintHistory"
import LoginToSystem from "./LoginToSystem"
import Note from "../../kartable-commission/partials/Note"
import SessionHistory from "./SessionHistory"
import PrevStep from "../../kartable-commission/partials/PrevStep.vue"
import NextStep from "../../kartable-commission/partials/NextStep.vue"
import SendDescription from "../../kartable-commission/partials/SendDescription.vue"
import MessageBalckList from "../../kartable-commission/partials/MessageBalckList.vue"
import IssuedVote from "./IssuedVote.vue"
import AgentsVote from "./AgentsVote.vue"
import UBarasiHoghoghi from "../../barrasi-hoghoghi/UBarasiHoghoghi.vue"
import MultiBadvi from "./MultiBadvi.vue"
import CommissionVoteOfAgent from "./CommissionVoteOfAgent.vue"
// Ag-Grid Compoennts
import AgIsSelected from "./voting-ag-templates/AgIsSelected.vue"
import AgIsSelectedHead from "./voting-ag-templates/AgIsSelectedHead.vue"
import AgKCoeffiecient from "./voting-ag-templates/AgKCoeffiecient.vue"
import AgVoteTypeS from "./voting-ag-templates/AgVoteTypeS.vue"
import AgCICommissionS from "./voting-ag-templates/AgCICommissionS.vue"
import AgCICommissionTypeS from "./voting-ag-templates/AgCICommissionTypeS.vue"
import AgBtnMinPenalty from "./voting-ag-templates/AgBtnMinPenalty.vue"
import AgBtnMaxPenalty from "./voting-ag-templates/AgBtnMaxPenalty.vue"
import AgTrepassValue from "./voting-ag-templates/AgTrepassValue.vue"
import AgSystemSuggestion from "./voting-ag-templates/AgSystemSuggestion.vue"
import AgKCoeffiecientFooter from "./voting-ag-templates/AgKCoeffiecientFooter.vue"
import AgTrepassStatus from "./voting-ag-templates/AgTrepassStatus.vue"
import SimpleTimeInput from "./voting-ag-templates/SimpleTimeInput.vue"
// Grid Column Models
import voteIssuedColumnsBaseModel from "../models/voteIssuedColumnsBaseModel"

const defaultIssuedVoteModel = {
  AgentComment: null,
  CI_Evaluation: 0,
  CI_Note: 0,
  CI_VoteType: 0,
  CI_VoteTypeDetail: 0,
  DeadlineGhararVote: 0,
  DigitalSignature: null,
  Iscomplainant: false,
  IsNote7Action: false,
  NidAgent: "00000000-0000-0000-0000-000000000000",
  NidCommission: "00000000-0000-0000-0000-000000000000",
  NidVote: "00000000-0000-0000-0000-000000000000",
  NoteComment: null,
  TechnicalValue: 0,
  TmpNidVote: null,
  VoteDate: null,
  VoteNo: null,
  VotePriority: 1,
  VoteTime: null,
  VoteValue: 0,
  VoteValueAmar: 0,
  Vote_Comments: null
}

export default {
  mixins: [baseFormMixin, kartableCommissionMixin],
  components: {
    VoteHistory,
    PrintHistory,
    LoginToSystem,
    Note,
    SessionHistory,
    PrevStep,
    NextStep,
    SendDescription,
    MessageBalckList,
    IssuedVote,
    UBarasiHoghoghi,
    AgentsVote,
    MultiBadvi,
    CommissionVoteOfAgent,

    // Ag-Grid
    AgIsSelected,
    AgIsSelectedHead,
    AgKCoeffiecient,
    AgVoteTypeS,
    AgCICommissionS,
    AgCICommissionTypeS,
    AgBtnMinPenalty,
    AgBtnMaxPenalty,
    AgTrepassValue,
    AgSystemSuggestion,
    AgKCoeffiecientFooter,
    SimpleTimeInput,
    AgTrepassStatus
  },

  props: {
    title: String,
    formKey: String,
    isUVotingFormEditable: { type: Boolean, default: false },
    showPrintHistory: { type: Boolean, default: false },
    showAcceptBadvi: { type: Boolean, default: false },
    showRejectBadvi: { type: Boolean, default: false },
    showCmbEvaluation: { type: Boolean, default: false },
    showPerformVote: { type: Boolean, default: false },
    m: {
      type: String,
      default: "r"
    },
    value: Object,
    layeheMainInfo: Object,
    maxVoteObj: Object,
    checkTokens: {
      type: Function,
      default: null
    },
    clsCommission_BlankList: Object,
    ischeckTrepass: { type: Boolean, default: false },
    voteTrepasses: Object,
    GroupVoteTrepass: Array,
    commissionsSetting: Object,
    isSave: Boolean,
    AreaAfterEditValue: Object,
    layeheComents: String,
    statusOkAgent: Boolean

    // allCommissionDetail: Object,
  },
  computed: {
    showSigniture () {
      return (this.getApplicationParam.hasOwnProperty("DeleteSignitureAgent") && this.getApplicationParam.DeleteSignitureAgent)
    },
    AllUrbanComments () {
      return this.value?.CommissionInfos[0]?.AllUrbanComments ?? ''
    },
    voteTrepassesColumns () {
      return this.voteTrepassesColumnsBase.filter(
        (x) => !x.hasOwnProperty("isHidden") || !x.isHidden
      )
    },
    voteIssuedColumns () {
      return this.voteIssuedColumnsBase.filter(
        (x) => !x.hasOwnProperty("isHidden") || !x.isHidden
      )
    },
    // commissionVoteTrepasses () {
    //   // return this.extraProps.filter(x=>x.NidVote===this.dataItem.NidVote)
    // },
    // IsHaveNotVote(){
    //   if (IsHaveVote)
    //                 IsSelected = false;
    //     return !IsHaveVote
    // },
    selection_SelectionMode () {
      // return this.value.CommissionTrepasses.some(f => !f.IsHaveVote)
      //   ? "e"
      //   : "r";
      return "e"
    },

    calculationPriceIsEditable () {
      return (
        (this.getApplicationParam.hasOwnProperty("hamedanCalculateVoteValue") &&
          this.getApplicationParam.hamedanCalculateVoteValue) ||
        false
      )
    }
  },
  data () {
    return {
      name: "Voting",
      voteTrepassesMode: "e",
      comboPrintTypeMode: "r",
      hasVoteHistory: false,
      voteHistoryDialog: false,
      showBarasiHoghoghiBtn: false,
      showLoginBtn: false,
      showHoghoghiBtn: false,
      isHideVoteTime: false,
      isHideVoteDate: false,
      showAgentsVote: false,
      showMultiBadvi: false,
      shallIllustrateAgentVote: false,
      showOutOfRangeLabel: false,
      showMore: false,
      showComplainantLabel: false,
      showProtestDeadlineLabel: false,
      showAgentPresentLabel: false,
      showbackListLabel: false,
      loginToSystem: false,
      printHistoryDialog: false,
      noteDialog: false,
      barasiHoghoghiDialog: false,
      sessionHistoryDialog: false,
      showPrevStep: false,
      isNewVote: true,
      OwnerNationalCodeNosaziList: [],
      selectionValue: 0,
      statusAnshaeVote: false,
      useEditVoteLimit: false,
      stausCalculateVote: false,
      kCoeffiecientShow: false,
      isDoneCoefficient: false,
      isDoneCoefficientNote3: false,
      voteType: 0,
      commTreDetail: null,
      getGroupVoteTrepass: [],
      expAgentsShow: true,
      kAllvalue: 0,
      kAllvalueNote3: 0,
      txtAllK: null,
      gridApi: null,
      gridColumnApi: null,
      overlayLoadingTemplate: null,
      // comboPrintTypeIsEnabled: true,
      permissionPrintTypeForVote: 0,
      PermissionVoteValue: 0,
      VoteValue: true,
      gridOptions: {},
      voteTrepassesColumnsBase: [
        {
          field: "RowId",
          title: "ردیف",
          width: "82px",
          isHidden: false,
          align: "center",
          headerAlign: "center",
          pinned: "right",
          lockPosition: true
        },
        {
          field: "IsSelected",
          title: "",
          width: 70,
          isEditable: false,
          isHidden: false,
          filter: false,
          filterable: false,
          resizable: false,
          headerComponent: "AgIsSelectedHead",
          headerComponentParams: {
            // selection_SelectionMode: this.selection_SelectionMode,
            selection_SelectionMode: "e",
            selection_SelectionChanged: this.selection_SelectionChanged
          },
          cellRenderer: "AgIsSelected",
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          headerClass: "IsSelectedHeader",
          pinned: "right"
        },
        {
          field: "Floor",
          title: "طبقه",
          width: "95px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "Note",
          title: "تبصره",
          width: "215px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "CI_TrepassType_Group",
          title: "گروه تخلف",
          editor: "ci",
          domain: "Commission100",
          ciName: "CI_TrepassType_Group",
          width: "155px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "Id",
          title: "نوع تخلف",
          editor: "ci",
          domain: "Commission100",
          ciName: "CI_TrepassType",
          width: "180px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          ignoreDefaultCol: true,
          // eslint-disable-next-line no-return-assign
          comboSort: (a, b) => a.ID = b.ID
        },
        {
          field: "UsingGroupTitle",
          title: "گروه کاربری اصلی موجود",
          width: "170px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "UsingTitle",
          title: "گروه کاربری فرعی",
          width: "155px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "CI_Years",
          title: "سال تخلف",
          width: "95px",
          editable: false,
          editor: "combo",
          domain: "Commission100",
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "TrepassValue",
          title: "مقدار تخلف",
          width: "105px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellClass: "custom-pinned-row"
        },
        {
          field: "TrepassStatus",
          title: "وضعیت تخلف",
          width: "125px",
          editor: "combo",
          domain: "CI_SaraM1",
          ciName: "CI_TrepassStatus",
          editable: false,
          filter: "agMultiColumnFilter",
          isHidden: false
          // cellRendererSelector: (params) =>
          //   this.voteTrepassesCellRendererSelector(params),
          // cellRenderer: "AgTrepassStatus",
          // cellStyle: {
          //   padding: "0"
          // }
        },
        {
          field: "UrbanIdia",
          title: "تقاضای شهردار",
          width: "115px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "MinPenalty",
          title: "حداقل جریمه",
          width: "115px",
          editor: "money",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellStyle: (params) => this.voteTrepassesCellStyle(params),
          cellClass: "custom-pinned-row"
        },
        {
          field: "MaxPenalty",
          title: "حداکثر جریمه",
          width: "115px",
          editor: "money",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellStyle: (params) => this.voteTrepassesCellStyle(params),
          cellClass: "custom-pinned-row"
        },
        {
          field: "CalculationPrice",
          title: "قیمت محاسباتی",
          width: "135px",
          editable: this.calculationPriceIsEditable,
          filter: "agMultiColumnFilter",
          isEditable: this.calculationPriceIsEditable,
          isHidden: false,
          editor: "money"
        },
        {
          field: "KCoeffiecient",
          title: "ضریب ارزش معاملاتی طبق تبصره 11 ماده صد(k)",
          width: "280px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          cellRenderer: "AgKCoeffiecient",
          cell: "AgKCoeffiecient",
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellEditorSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellStyle: (params) => {
            if (params.node.rowPinned === "bottom") {
              return {
                padding: "0",
                lineHeight: 0
              }
            } else {
              return {
                padding: "0"
              }
            }
          },
          cellClass: "custom-pinned-row",
          callback: this.inlineDoCalculateVoteValue
        },
        {
          field: "SystemSuggestion",
          title: "مبلغ رای",
          width: "125px",
          editable: false,
          filter: "agMultiColumnFilter",
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params),
          cellClass: "custom-pinned-row",
          isEditable: false,
          isHidden: true,
          editor: "money"
        },
        {
          field: "VoteType_S",
          title: "نوع رای (سوابق)",
          width: "125px",
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_VoteType",
          editable: false,
          filter: "agMultiColumnFilter",
          isHidden: false
          // cellRenderer: "AgVoteTypeS",
          // cellRendererSelector: (params) =>
          //   this.voteTrepassesCellRendererSelector(params),
          // cellStyle: {
          //   padding: "0"
          // }
        },
        {
          field: "K",
          title: "ارزش معاملاتی / ارزش سرقفلی (k)",
          width: "280px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "KC_S",
          title: "ضریب ارزش معاملاتی طبق تبصره 11 ماده صد(k) (سوابق)",
          width: "325px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "VoteValue_S",
          title: "مبلغ رای (سوابق)",
          width: "135px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          editor: "money"
        },
        {
          field: "CI_CommissionType_S",
          title: "نوع کمیسیون (سوابق)",
          width: "175px",
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_CommissionType",
          editable: false,
          filter: "agMultiColumnFilter",
          isHidden: false
          // cellRenderer: "AgCICommissionTypeS",
          // cellRendererSelector: (params) =>
          //   this.voteTrepassesCellRendererSelector(params),
          // cellStyle: {
          //   padding: "0"
          // }
        },
        {
          field: "CI_Commission_S",
          title: "شماره کمیسیون (سوابق)",
          width: "175px",
          editor: "combo",
          domain: "Commission100",
          ciName: "CI_Commission",
          editable: false,
          filter: "agMultiColumnFilter",
          isHidden: false
          // cellRenderer: "AgCICommissionS",
          // cellRendererSelector: (params) =>
          //   this.voteTrepassesCellRendererSelector(params),
          // cellStyle: {
          //   padding: "0"
          // }
        },
        {
          field: "KCoeffiecientNote3",
          title: "ضریب ارزش سرقفلی تجاری طبق تبصره 3 ذیل ماده صد(k)",
          width: "335px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "TrespassDateInMunicipality",
          title: "تاریخ وقوع تخلف از نظر شهرداری",
          width: "210px",
          editor: "date",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "TrespassDateInEngineer",
          title: "تاریخ وقوع تخلف از نظر مهندس ناظر",
          width: "230px",
          editor: "date",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "IncomeArea",
          title: "حوزه درآمدی",
          width: "115px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "CI_VahdatRavieh",
          title: "وحدت رویه",
          editor: "ci",
          domain: "CI_SaraM1",
          width: "115px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "ZaribVahdatRavieh",
          title: "ضریب وحدت رویه",
          width: "140px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "SuggestionCause",
          title: "علت پیشنهاد",
          width: "135px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "P",
          title: "P",
          width: "95px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "IdCode",
          title: "كد تخلف",
          width: "95px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },

        {
          field: "Trepass_Comments",
          title: "توضیحات",
          width: "215px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "UsingID",
          title: "کد گروه کاربری فرعی",
          width: "155px",
          editor: "combo",
          domain: "Commission100",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },

        {
          field: "TrespassDateHappendNotMelak",
          title: "تاریخ وقوع خلاف ملاک عمل",
          width: "195px",
          editor: "date",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "CI_UsingTypeGroupMojaz",
          title: "گروه کاربری اصلی مجاز",
          editor: "combo",
          domain: "Commission100",
          width: "150px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "VahedCountMosavab",
          title: "تعداد واحد موجود",
          width: "140px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "VahedCountMojaz",
          title: "تعداد واحد مجاز",
          width: "140px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "AreaMojod",
          title: "متراژ موجود",
          width: "115px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "AreaMojaz",
          title: "متراژ مجاز",
          width: "115px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "IsComplainant",
          title: "شاکی دارد/ندارد",
          width: "140px",
          editor: "checkbox",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params)
        },
        {
          field: "IsRightsBystanders",
          title: "عدم رعایت حقوق مجاورین",
          width: "180px",
          editor: "checkbox",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false,
          cellRendererSelector: (params) =>
            this.voteTrepassesCellRendererSelector(params)
        },
        {
          field: "TrepassValueAmar",
          title: "متراژ کسر ازآمار",
          width: "130px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "K_S",
          title: "ضریب ارزش معاملاتی / ضریب ارزش سرقفلی",
          width: "310px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },

        {
          field: "VoteNo_S",
          title: "شماره رای (سوابق)",
          width: "140px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "CommissionSarghofliValue",
          title: "ارزش سرقفلی",
          width: "140px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },
        {
          field: "SystemSuggestion",
          title: "مقدار رای ",
          width: "140px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        },

        {
          field: "CommissionSarghofliValue",
          title: "ارزش سرقفلی",
          width: "135px",
          editable: false,
          filter: "agMultiColumnFilter",
          isEditable: false,
          isHidden: false
        }
        // {
        //   field: "SystemSuggestion",
        //   title: "پیشنهاد سیستم",
        //   width: "135px",
        //   isEditable: false,
        //   isHidden: false
        // },

        // {
        //   field: "MojazUsingTitle",
        //   title: "گروه کاربری فرعی مجاز",
        //   width: "150px",
        //   editable: false,
        // filter: 'agMultiColumnFilter',
        //   isEditable: false,
        //   isHidden: false
        // },
        // {
        //   field: "Title",
        //   title: "تخلف",
        //   width: "150px",
        //   editable: false,
        // filter: 'agMultiColumnFilter',
        //   isEditable: false,
        //   isHidden: false
        // }
      ],
      voteIssuedColumnsBase: [...voteIssuedColumnsBaseModel],
      selectedEdit: {},
      selectedVote: {},
      // CF
      complete: null,
      completeSave: null,

      // Response
      saveNewVoteRes: null,

      voteOfAgentShow: false,
      commissionTypeOptions: [
        { ID: 0, Title: "نامشخص" },
        { ID: 1, Title: "بدوي" },
        { ID: 2, Title: "تجديد نظر" },
        { ID: 3, Title: "فرم قرار" },
        { ID: 4, Title: "ديوان عدالت" },
        { ID: 5, Title: "استنكافي" },
        { ID: 6, Title: "استفساريه" },
        { ID: 7, Title: "اصلاحي" },
        { ID: 8, Title: "داراي نامه" },
        { ID: 9, Title: "تخلف مجدد" }
      ],

      issuedVoteModel: { issuedVote: { ...defaultIssuedVoteModel } },
      // Columns
      voteOfAgentColumns: [
        {
          "field": "UserName",
          "title": "نماینده",
          "width": "200px"
        },
        {
          "field": "Description",
          "title": "توضیحات",
          "width": "800px"
        },
        {
          "field": "AcceptDate",
          "title": "تاریخ تایید",
          "width": "100px",
          "editor": "date"
        },
        {
          "field": "AcceptTime",
          "title": "ساعت تایید",
          "width": "100px",
          "editor": "time"
        },
        {
          "field": "CI_AgentOpinion",
          "title": "نظر نماینده",
          "width": "200px",
          "editor": "combo",
          "domain": "Commission100"
        }
      ],
      CommissionApposeColumns: [
        {
          field: "SecretariatApposeNo",
          title: "شماره دبیرخانه اعتراض",
          width: "100px"
        },
        {
          field: "ApposeDate",
          title: "تاریخ اعتراض",
          width: "80px"
        },
        {
          field: "ApposePersonName",
          title: "نام اعتراض کننده",
          width: "80px"
        },
        {
          field: "CI_CommissionApposePerson",
          title: "اعتراض کننده",
          width: "80px",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_CommissionApposeType",
          title: "نوع اعتراض",
          width: "80px",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "CI_CommissionAttachment",
          title: "پیوست",
          width: "80px",
          editor: "combo",
          domain: "CI_SaraM1"
        },
        {
          field: "VoteNo",
          title: "شماره رای",
          width: "100px"
        },
        {
          field: "VoteDate",
          title: "تاریخ رای",
          width: "100px"
        },
        {
          field: "Comments",
          title: "شرح اعتراض",
          width: "100px"
        }
      ],
      selectedRows: null,
      multiBadviModel: {
        grid_vote: [],
        q: {},
        tmpv: {}
      },
      loginHistory: [],

      // eslint-disable-next-line no-undef
      IsMashhadConfigSet: false,
      optionsComboListOfCI_PrintType: [],
      cIPrintTypeList: [],
      getCICommissionGridSettingResult: null
    }
  },
  async created () {
    await this.getCIPrintType()
  },
  mounted () {
    this.onLoadForm()
    this.IsMashhadConfigSet =
      this.getApplicationParam.hasOwnProperty("IsMashhad") &&
      this.getApplicationParam.IsMashhad
    // this.overlayLoadingTemplate =
    //   '<div aria-live="polite" aria-atomic="true" style="position:absolute;top:0;left:0;right:0; bottom:0; color: black; background: #beb9b9 center no-repeat" aria-label="loading"></div>'
    this.overlayLoadingTemplate =
         '<span class="ag-overlay-loading-center"><span id="js-overlay-text">لطفا منتظر بمانید ...</span></span>'
  },

  methods: {
    btnDeleteAgentSigniture () {
      this.showConfirm("آیا از حذف امضاهای مورد نظر اطمینان دارید؟").onOk(() => {
        this.$emit('deleteAgentSigniture')
      })
    },
    updateCIPrintTypeList () {
      let selectedCICommissionType = this.value.CommissionInfo.CI_CommissionType
      if (this.commissionsSetting.CommissionComboPrint.length > 0) {
        let filterdcIPrintTypeList = this.commissionsSetting.CommissionComboPrint.filter(x => x.CI_CommissionType === selectedCICommissionType)
        this.cIPrintTypeList = this.cIPrintTypeList.filter(x => filterdcIPrintTypeList.some(y => x.ID === y.CI_PrintType)) || []
      }
    },
    async getCIPrintType () {
      try {
        const { data } = await this.$services.CiSrvSara.getCI({
          ciName: "CI_PrintType",
          domainName: "CI_SaraM1"
        })
        this.getCICommissionGridSettingResult = this.getResponse(data)
        if (this.getCICommissionGridSettingResult.success) {
          this.cIPrintTypeList = this.getCICommissionGridSettingResult.data?.data?.list ?? [] // تست
        }
      } catch (e) {
        console.error(e)
      }
    },
    onGridReady (params) {
      this.gridApi = params.api
      this.gridColumnApi = params.columnApi
    },
    voteTrepassesCellRendererSelector (params) {
      if (params.node.rowPinned === "bottom") {
        switch (params.column.colId) {
          case "MinPenalty":
            if (!this.getApplicationParam.hasOwnProperty("ShowVotingMaxMinPenaltyBtn") || this.getApplicationParam.ShowVotingMaxMinPenaltyBtn === true) {
              return {
                component: "AgBtnMinPenalty",
                params: {
                  btnMinClicked: this.btnMinClicked
                }
              }
            } else {
              return {
                component: "AgSystemSuggestion",
                params: {
                  totalValue: () => {
                    let total = 0
                    try {
                      total = this.value.CommissionTrepasses.reduce(
                        (a, { MinPenalty: b = 0 }) => a + parseFloat(b),
                        0
                      ).toFixed(2)
                    } catch (ex) {
                      total = 0
                    }
                    return Number(total)?.toNumberWithCommas()
                  }
                }
              }
            }
          case "MaxPenalty":
            if (!this.getApplicationParam.hasOwnProperty("ShowVotingMaxMinPenaltyBtn") || this.getApplicationParam.ShowVotingMaxMinPenaltyBtn === true) {
              return {
                component: "AgBtnMaxPenalty",
                params: {
                  btnMaxClicked: this.btnMaxClicked
                }
              }
            } else {
              return {
                component: "AgSystemSuggestion",
                params: {
                  totalValue: () => {
                    let total = 0
                    try {
                      total = this.value.CommissionTrepasses.reduce(
                        (a, { MaxPenalty: b = 0 }) => a + parseFloat(b),
                        0
                      ).toFixed(2)
                    } catch (ex) {
                      total = 0
                    }
                    return Number(total)?.toNumberWithCommas()
                  }
                }
              }
            }
          case "KCoeffiecient":
            return {
              component: "AgKCoeffiecientFooter",
              params: {
                kCoeffiecientShow: this.kCoeffiecientShow,
                data: {
                  txtAllK: this.txtAllK
                },
                txtAllK_OnValueChanging: this.txtAllK_OnValueChanging,
                btnSet_Click: this.btnSet_Click,
                btn_CalculateVote_Click: this.btn_CalculateVote_Click
              }
            }
          case "TrepassValue": {
            return {
              component: "AgTrepassValue",
              params: {
                totalValue: () => {
                  let total = 0
                  try {
                    // total = this.value.CommissionTrepasses.map(col => col.TrepassValue).reduce((a, b) => a + parseFloat(b), 0).toFixed(2)
                    total = this.value.CommissionTrepasses.reduce(
                      (a, { TrepassValue: b }) => a + parseFloat(b),
                      0
                    ).toFixed(2)
                  } catch (ex) {
                    total = 0
                  }
                  return `جمع کل : ${Number(total)?.toNumberWithCommas()}`
                }
              }
            }
          }
          case "SystemSuggestion": {
            return {
              component: "AgSystemSuggestion",
              params: {
                totalValue: () => {
                  let total = 0
                  try {
                    total = this.value.CommissionTrepasses.reduce(
                      (a, { SystemSuggestion: b }) => a + parseFloat(b || 0),
                      0
                    ).toFixed(2)
                  } catch (ex) {
                    total = 0
                  }
                  return `جمع کل : ${Number(total)?.toNumberWithCommas()}`
                }
              }
            }
          }
          default:
            return {
              component: undefined
            }
        }
      }
      return undefined
    },
    voteTrepassesCellStyle (params) {
      if (params.node.rowPinned === "bottom") {
        const voteTrepassesCellActions =
          window.getConfigValue("esupParams")?.VoteTrepassesCellActions ?? true
        const display =
          voteTrepassesCellActions === false ? "none" : "inline-block"
        return {
          padding: "0",
          lineHeight: 0,
          display
        }
      }
    },
    btnSet_Click () {
      if (
        this.commissionsSetting.hasOwnProperty(
          "AllKCoeffiecientHasValidation"
        ) &&
        this.commissionsSetting.AllKCoeffiecientHasValidation === false
      ) {
        if (!this.txtAllK) {
          this.showError(
            this.commissionsSetting.AllKCoeffiecientHasValidationMessage ||
              "مقدار ضریب نمیتواند خالی باشد!"
          )
          return false
        }
      }
      if (this.kAllvalue) {
        this.$nextTick(() => {
          this.value.CommissionTrepasses.filter(
            (f) => f.IsSelected === true && !f.IsHaveVote
          ).forEach((i) => {
            i.KCoeffiecient = this.kAllvalue
            // let rowNode = this.$refs.takhalofatRef.gridApi.getRowNode('KCoeffiecient')
            // rowNode.setDataValue('KCoeffiecient', this.kAllvalue)
          })

          this.isDoneCoefficient = true
          this.stausCalculateVote = false
        })
      }
    },

    async btn_CalculateVote_Click (status = false, params) {
      if (
        this.value.CommissionTrepasses &&
        this.value.CommissionTrepasses.length > 0 &&
        this.kAllvalue === 0
      ) {
        const arr = this.value.CommissionTrepasses.map((x) => x.MaxPenalty)
        this.kAllvalue = Math.max(...arr)
      }
      if (this.kAllvalue) {
        if (this.IsMashhadConfigSet) {
          if (status && params) {
            if (!params.IsHaveVote && params.KCoeffiecient > 0) {
              if (
                params.KCoeffiecient > params.MaxPenalty ||
                params.KCoeffiecient < params.MinPenalty
              ) {
                params.KCoeffiecient = params.MaxPenalty
              }
            }
          } else if (!status) {
            this.value.CommissionTrepasses.filter(
              (f) =>
                f.IsSelected === true && !f.IsHaveVote && f.KCoeffiecient > 0
            ).forEach((i) => {
              if (
                i.KCoeffiecient > i.MaxPenalty ||
                i.KCoeffiecient < i.MinPenalty
              ) {
                i.KCoeffiecient = i.MaxPenalty
              }
              //  else {
              //   i.KCoeffiecient = i.KCoeffiecient;
              // }
              // if (i.MaxPenalty > 0) {
              //   i.KCoeffiecient = i.MaxPenalty;
              // } else {
              //   i.KCoeffiecient = this.kAllvalue;
              // }
            })
          }
        }

        if (this.IsMashhadConfigSet) {
          if (status && params) {
            if (
              !params.IsHaveVote &&
              (params.KCoeffiecient == 0 || params.KCoeffiecient == null)
            ) {
              params.KCoeffiecient = params.MaxPenalty
            }
          } else if (!status) {
            this.value.CommissionTrepasses.filter(
              (f) =>
                f.IsSelected === true &&
                !f.IsHaveVote &&
                (f.KCoeffiecient == 0 || f.KCoeffiecient == null)
            ).forEach((i) => {
              i.KCoeffiecient = i.MaxPenalty
            })
          }
        }
      }

      this.stausCalculateVote = true

      if (status && params) {
        await this.calculate(false, false, false, status, params)
      } else if (
        this.issuedVoteModel.issuedVote.CI_VoteType == 1 &&
        this.txtAllK != null &&
        !status
      ) {
        if (this.commissionsSetting.HideElamConfirm) {
          await this.calculate(false, false, false, status)
        } else {
          if (
            this.value.CommissionTrepasses.filter(
              (f) => f.IsSelected === true && !f.IsHaveVote
            ).some((f) => f.KCoeffiecient != this.txtAllK)
          ) {
            this.showConfirm(
              "مقدار اعمال مغایرت دارد آیا قبل از محاسبه اعمال صورت گیرد؟"
            ).onOk(async () => {
              this.btnSet_Click(null, null)
              await this.calculate(false, false, false, status)
            })
          } else {
            await this.calculate(false, false, false, status)
          }
        }
      }
    },
    setColumnField (
      fieldName,
      modifyOptions = {},
      grid = this.voteTrepassesColumnsBase
    ) {
      if (
        !fieldName ||
        typeof fieldName !== "string" ||
        typeof modifyOptions !== "object" ||
        !Array.isArray(grid)
      ) {
        return false
      }

      try {
        // this.showLoading()

        Object.assign(
          grid.find((f) => f.field == fieldName),
          modifyOptions
        )
        // setTimeout(() => {
        //   // this.$q.loading.hide()
        //   this.hideLoading()
        // }, 1000)
        // this.$nextTick(() => {
        //   this.$refs.takhalofatRef.initialColumns();
        //   this.$refs.takhalofatRef.initialGridRows();
        // });
      } catch (ex) {
        // console.error(ex);
      }
    },
    fetchCommissionComments () {
      let comments = ""
      this.$nextTick(() => {
        comments = this.$refs.issuedVote.CommissionComments
      })
      return comments
    },
    onLoadForm () {
      if (
        this.getApplicationParam.hasOwnProperty("IsHideVoteDate") &&
        this.getApplicationParam.IsHideVoteDate
      ) {
        this.isHideVoteDate = true
      }
      if (
        this.getApplicationParam.hasOwnProperty("IsHideVoteTime") &&
        this.getApplicationParam.IsHideVoteTime
      ) {
        this.isHideVoteTime = true
      }
      if (
        this.getApplicationParam.hasOwnProperty("ShowHoghoghiButton") &&
        this.getApplicationParam.ShowHoghoghiButton
      ) {
        this.showLoginBtn = true
        this.showHoghoghiBtn = true
        this.showBarasiHoghoghiBtn = true
      }

      if (
        this.getApplicationParam.hasOwnProperty("AgentDefineDraft") &&
        this.getApplicationParam.AgentDefineDraft
      ) {
        this.shallIllustrateAgentVote = true
      }

      if (
        this.getApplicationParam.hasOwnProperty("hamedanCalculateVoteValue") &&
        this.getApplicationParam.hamedanCalculateVoteValue
      ) {
        this.setColumnField("SystemSuggestion", {
          isHidden: false
        })
      }

      // this.checkSecurityForPrintVoteType()  این بخش زملش هم اشتباهه با آقای صفری مشورت کردم گفتن وابسته به دکمه ویرایش باشه
      this.onLoadWarnLabel()
      if (
        this.IsMashhadConfigSet &&
        this.value.OwnerNationalCodeCommissionList !== null &&
        this.value.OwnerNationalCodeCommissionList.length > 0
      ) {
        this.OwnerNationalCodeNosaziList =
          this.value.OwnerNationalCodeCommissionList.map((x) => {
            return {
              ID: x.CodeString,
              Title: x.CodeString
            }
          })
      }

      this.setGroupVoteTrepass()
    },
    onLoadWarnLabel () {
      if (this.selectedCommission?.IsMeeting) {
        this.showAgentPresentLabel = true
      } else {
        this.showAgentPresentLabel = false
      }
      if (
        this.clsCommission_BlankList != null &&
        this.clsCommission_BlankList.Commission_BlackList != null
      ) {
        this.showbackListLabel = true
      } else {
        this.showbackListLabel = false
      }
      if (
        this.value.CommissionTrepasses &&
        this.value.CommissionTrepasses.length > 0 &&
        this.value.CommissionTrepasses.some((x) => x.IsComplainant == true)
      ) {
        this.showComplainantLabel = true
      } else {
        this.showComplainantLabel = false
      }
      if (
        this.value.Commission_Appose &&
        this.value.Commission_Appose.length > 0
      ) {
        this.showProtestDeadlineLabel = true
      } else {
        this.showProtestDeadlineLabel = false
      }
      if (
        // eslint-disable-next-line no-undef
        window.getConfigValue("OutOfRangeCI_BoundCodes") &&
        this.selectedCommission.CI_BoundCode > 0
      ) {
        this.showOutOfRangeLabel = true
      } else {
        this.showOutOfRangeLabel = false
      }
    },
    updateExpandable ({ row, status }) {
      /// implement
      row.isExpanded = status
    },
    // updateSelected({ row, value }) {
    //   const index = this.value.Commission_VoteList.findIndex(
    //     (x) => x.NidCommission == row.NidCommission
    //   );
    //   this.value.Commission_VoteList.splice(
    //     index,
    //     1,
    //     Object.freeze({
    //       ...this.value.Commission_VoteList[index],
    //       IsSelected: value,
    //     })
    //   );

    // },
    btnMinClicked () {
      try {
        if (
          this.value.CommissionTrepasses &&
          this.value.CommissionTrepasses.length > 0
        ) {
          if (this.IsMashhadConfigSet) {
            const arr = this.value.CommissionTrepasses.map((x) => x.MaxPenalty)
            this.kAllvalue = Math.min(...arr)
          } else {
            const arr = this.value.CommissionTrepasses.map(
              (x) => x.KCoeffiecient
            )
            this.kAllvalue = Math.min(...arr)
          }
        }

        this.value.CommissionTrepasses.filter(
          (f) => f.IsSelected == true && !f.IsHaveVote
        ).forEach((i) => {
          i.KCoeffiecient = this.kAllvalue
        })
        this.calculateVoteValue(null, false)
      } catch (ex) {
        console.error(ex)
        // this.serverError() // test serverError
      }
    },
    btnMaxClicked () {
      try {
        if (
          this.value.CommissionTrepasses &&
          this.value.CommissionTrepasses.length > 0
        ) {
          if (this.IsMashhadConfigSet) {
            const arr = this.value.CommissionTrepasses.map((x) => x.MaxPenalty)
            this.kAllvalue = Math.max(...arr)
          } else {
            const arr = this.value.CommissionTrepasses.map(
              (x) => x.KCoeffiecient
            )
            this.kAllvalue = Math.max(...arr)
          }
          this.value.CommissionTrepasses.filter(
            (f) => f.IsSelected === true && !f.IsHaveVote
          ).forEach((i) => {
            i.KCoeffiecient = this.kAllvalue
          })
        }
        this.calculateVoteValue(false, false)
      } catch (ex) {
        console.error(ex)
        // this.serverError() // test serverError
      }
    },
    isCheckSelectedTrepass () {
      return this.value.CommissionTrepasses.some((f) => f.IsSelected == true)
    },

    async calculate (
      pCallFromNote3 = false,
      isBeforeAcceptVote = false,
      isBeforeAcceptBadviVote = false,
      status,
      selectedTrepassNode
    ) {
      if (
        this.getApplicationParam.hasOwnProperty(
          "IsPerformKCoefficientInVote"
        ) &&
        this.getApplicationParam.IsPerformKCoefficientInVote == false
      ) {
        await this.calculateVoteValue(
          true,
          false,
          pCallFromNote3,
          isBeforeAcceptVote,
          isBeforeAcceptBadviVote,
          status,
          selectedTrepassNode
        )
      } else if (this.isDoneCoefficient) {
        await this.calculateVoteValue(
          true,
          false,
          pCallFromNote3,
          isBeforeAcceptVote,
          isBeforeAcceptBadviVote,
          status,
          selectedTrepassNode
        )
      } else {
        this.stausCalculateVote = false
        this.showError("لطفا ابتدا ضریب را اعمال نمایید.")
      }
    },
    async calculateVoteValue (
      pIsKValue,
      pAcceptVote,
      pCallFromNote3 = false,
      IsBeforeAcceptVote = false,
      IsBeforeAcceptBadviVote = false,
      status,
      selectedTrepassNode
    ) {
      this.issuedVoteModel.issuedVote.VoteValue = 0
      if (this.isCheckSelectedTrepass()) {
        await this.calculateVote(
          pIsKValue,
          pAcceptVote,
          pCallFromNote3,
          IsBeforeAcceptVote,
          IsBeforeAcceptBadviVote,
          status,
          selectedTrepassNode
        )
      } else {
        this.stausCalculateVote = false
        this.showError("برای محاسبه مقدار رای،انتخاب حداقل یک تخلف الزامی است")
      }
    },
    async calculateVote (
      pIsKValue,
      pAcceptVote,
      pCallFromNote3 = false,
      isBeforeAcceptVote = false,
      isBeforeAcceptBadviVote = false,
      status,
      selectedTrepassNode
    ) {
      let tmpSelectedList = []

      if (status && selectedTrepassNode) {
        tmpSelectedList.push({ ...selectedTrepassNode })
      } else {
        tmpSelectedList = this.value.CommissionTrepasses.filter(
          (f) => f.IsSelected == true && !f.IsHaveVote
        )
      }
      let result = await this.doCalculateVoteValue(
        this.selectedCommission.NidProc,
        this.selectedCommission.NidCommission,
        tmpSelectedList,
        this.issuedVoteModel.issuedVote.TechnicalValue == null
          ? 0
          : this.issuedVoteModel.issuedVote.TechnicalValue,
        {
          UserGuid: this.getNidUser(),
          UserName: this.currentUser.FullName,
          JobLocationGuid: this.currentUser.JobLocationGuid,
          JobLocationName: this.currentUser.JobLocationName
        },
        {
          StateName: "",
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        "",
        pCallFromNote3
      )
      if (result) {
        if (result?.ErrorResult?.BizErrors?.length > 0) {
          this.showError(result.ErrorResult.BizErrors[0].ErrorTitel)
          return
        }
        let tmpValue = result.CalculateVoteValue
        this.stausCalculateVote = true

        if (status && selectedTrepassNode) {
          // selectedTrepassNode.SystemSuggestion = parseFloat(tmpValue)
          // this.$refs.takhalofatRef.gridApi.refreshCells()
          // در این بخش دو خط کد بالا باعث میشد که کل گرید رفرش شود و دیتای سطرهای غیر از سطری که کلیک شده در ستون مبلغ رای ازبین برود که با توجه به کد زیر فقط مبلغ رای در سطر انتخاب شده بروزرسانی میشود.
          this.$refs.takhalofatRef.gridApi.forEachRowNode(rowNode => {
            if (rowNode.data.NidTrepass == selectedTrepassNode.NidTrepass) {
              const updated = rowNode.data
              updated.SystemSuggestion = parseInt(tmpValue)
              rowNode.updateData(updated)
            }
          })
        } else {
          this.issuedVoteModel.issuedVote.VoteValue = parseInt(tmpValue)
        }

        if (isBeforeAcceptVote) {
          this.voteEssay()
        }
        if (isBeforeAcceptBadviVote) {
          this.badviVoteEssay()
        }
        tmpSelectedList.forEach((element) => {
          this.value.CommissionTrepasses.find(
            (f) => f.NidTrepass == element.NidTrepass
          ).K = element.K
        })
        // eslint-disable-next-line no-unused-expressions
        if (!status) {
          result.SelectedTrepass?.forEach((item) => {
            this.value.CommissionTrepasses.find(
              (f) => f.NidTrepass == item.NidTrepass
            ).KCoeffiecient = item.KCoeffiecient
            this.value.CommissionTrepasses.find(
              (f) => f.NidTrepass == item.NidTrepass
            ).KCoeffiecientNote3 = item.KCoeffiecientNote3
          })

          if (pAcceptVote == true) {
            this.acceptVote()
          }

          if (
            this.getApplicationParam.hasOwnProperty(
              "IsClearCalculateTextBox"
            ) &&
            this.getApplicationParam.IsClearCalculateTextBox
          ) {
            if (this.txtAllK != null) {
              this.txtAllK = 0
            }
          }
        }
        if (this.value.CommissionTrepasses.length > 0) {
          if (result.SelectedTrepass.length > 0) {
            result.SelectedTrepass?.forEach((item) => {
              this.value.CommissionTrepasses.find(
                (f) => f.NidTrepass == item.NidTrepass
              ).SystemSuggestion = item.SystemSuggestion
              this.value.CommissionTrepasses.find(
                (f) => f.NidTrepass == item.NidTrepass
              ).CommissionSarghofliValue = item.CommissionSarghofliValue
            })
          }
        }
      }
    },
    async showPrevStepHandler () {
      if (
        !(await this.canOpenWindow("", { closeForm: false, redirect: false }))
      ) {
        return false
      }

      // if (
      //   this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
      //   !this.getApplicationParam.IsCheckBalckList
      // ) {
      // }

      if (!this.chk_BlackList(false)) {
        if (this.isSave) {
          this.showError(
            "فرم درحالت ویرایش می باشد.لطفا دکمه ذخیره/انصراف را بزنید"
          )
          return false
        }

        if (
          this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
          !this.getApplicationParam.IsCheckBalckList
        ) {
          this.showPrevStep = true
        } else if (!this.isBlackList) this.showPrevStep = true
      }
    },

    showNextStepHandler () {
      try {
        this.showLoading()
        if (!this.chk_BlackList(true)) {
          if (this.isSave) {
            this.showError(
              "فرم درحالت ویرایش می باشد.لطفا دکمه ذخیره/انصراف را بزنید"
            )
            this.hideLoading()
            return false
          }
          if (
            this.value.CommissionInfo.CI_PrintType == null ||
            this.value.CommissionInfo.CI_PrintType == 0
          ) {
            this.showError(
              "به دلیل نامشخص بودن  نوع چاپ امکان ارسال درخواست وجود ندارد."
            )
            this.hideLoading()
            return false
          }

          if (
            this.getApplicationParam.hasOwnProperty("IsCheckBalckList") &&
            !this.getApplicationParam.IsCheckBalckList
          ) {
            this.showLoading()
            this.sendMethod(false, "")
          } else if (!this.isBlackList) {
            this.showLoading()
            this.sendMethod(false, "")
          }
        } else {
          throw new Error("BlackList")
        }
      } catch {
        this.hideLoading()
      }
    },

    accseptHoghoghi (val) {
      this.$emit("accseptHoghoghi", val)
    },
    async doCalculateVoteValue (
      pNidProc,
      pNidCommission,
      pSelectedTrepass,
      pExpertValue,
      pUser,
      pDtoWorkflowData,
      pClsAcceptVote,
      pCallFromNote3
    ) {
      const payload = {
        pNidProc,
        pNidCommission,
        pSelectedTrepass,
        pExpertValue,
        pUser,
        pDtoWorkflowData,
        pClsAcceptVote,
        pCallFromNote3
      }
      this.showLoading()
      try {
        const { data } = await this.$services.commissions.doCalculateVoteValue(
          payload
        )
        const res = this.getResponse(data)
        const requestResult = res.data.DoCalculateVoteValueResult
        if (res.success) {
          let tmpValue = requestResult.CalculateVoteValue
          let textPrice = this.convertNumberToPersianWords(Math.floor(tmpValue))
          this.issuedVoteModel.issuedVote.Vote_Comments = this.issuedVoteModel.issuedVote.Vote_Comments.replace('A', new Intl.NumberFormat().format(tmpValue) + '(' + textPrice + ')')
          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
          return requestResult
        } else {
          let htmlMsg = ""
          res.errors.forEach((error) => {
            htmlMsg += `<li>${error.text}</li>`
          })
          this.showError(htmlMsg)
          return false
        }
      } catch (error) {
        console.log(error)
        // this.serverError() // test serverError
      } finally {
        this.hideLoading()
      }
      // this.$services.commissions
      //   .doCalculateVoteValue(payload)
      //   .then(({ data }) => {
      //     const res = this.getResponse(data);
      //     const requestResult=res.data.DoCalculateVoteValueResult
      //     if (res.success) {
      //       // res.data.SaveNewVoteResult;
      //       return requestResult
      //     } else {
      //        let htmlMsg = ''
      //         res.errors.forEach(error => {
      //           htmlMsg += `<li>${error.text}</li>`
      //         });
      //         this.showError(htmlMsg);
      //     }
      //   })
      //   .catch((error) => {
      //     console.error(error);
      //     // this.serverError() // test serverError;
      //     this.hideLoading();
      //   })
      //   .finally(() => {
      //     this.hideLoading();
      //   });
    },
    convertNumberToPersianWords (number) {
      const words = [
        'صفر', 'یک', 'دو', 'سه', 'چهار', 'پنج', 'شش', 'هفت', 'هشت', 'نه',
        'ده', 'یازده', 'دوازده', 'سیزده', 'چهارده', 'پانزده', 'شانزده', 'هفده', 'هجده', 'نوزده',
        'بیست', 'بیست و یک', 'بیست و دو', 'بیست و سه', 'بیست و چهار', 'بیست و پنج', 'بیست و شش', 'بیست و هفت', 'بیست و هشت', 'بیست و نه',
        'سی', 'سی و یک', 'سی و دو', 'سی و سه', 'سی و چهار', 'سی و پنج', 'سی و شش', 'سی و هفت', 'سی و هشت', 'سی و نه',
        'چهل', 'چهل و یک', 'چهل و دو', 'چهل و سه', 'چهل و چهار', 'چهل و پنج', 'چهل و شش', 'چهل و هفت', 'چهل و هشت', 'چهل و نه',
        'پنجاه', 'پنجاه و یک', 'پنجاه و دو', 'پنجاه و سه', 'پنجاه و چهار', 'پنجاه و پنج', 'پنجاه و شش', 'پنجاه و هفت', 'پنجاه و هشت', 'پنجاه و نه',
        'شصت', 'شصت و یک', 'شصت و دو', 'شصت و سه', 'شصت و چهار', 'شصت و پنج', 'شصت و شش', 'شصت و هفت', 'شصت و هشت', 'شصت و نه',
        'هفتاد', 'هفتاد و یک', 'هفتاد و دو', 'هفتاد و سه', 'هفتاد و چهار', 'هفتاد و پنج', 'هفتاد و شش', 'هفتاد و هفت', 'هفتاد و هشت', 'هفتاد و نه',
        'هشتاد', 'هشتاد و یک', 'هشتاد و دو', 'هشتاد و سه', 'هشتاد و چهار', 'هشتاد و پنج', 'هشتاد و شش', 'هشتاد و هفت', 'هشتاد و هشت', 'هشتاد و نه',
        'نود', 'نود و یک', 'نود و دو', 'نود و سه', 'نود و چهار', 'نود و پنج', 'نود و شش', 'نود و هفت', 'نود و هشت', 'نود و نه'
      ]

      const hundredsWords = ['', 'یکصد', 'دویست', 'سیصد', 'چهارصد', 'پانصد', 'ششصد', 'هفتصد', 'هشتصد', 'نهصد']

      let str = ''
      if (number < 100) {
        str = words[number]
      } else if (number < 1000) {
        let hundreds = Math.floor(number / 100)
        let remainder = number % 100
        str = hundredsWords[hundreds]
        if (remainder > 0) {
          str += ' و ' + this.convertNumberToPersianWords(remainder)
        }
      } else if (number < 1000000) {
        let thousands = Math.floor(number / 1000)
        let remainder = number % 1000
        str = this.convertNumberToPersianWords(thousands) + ' هزار'
        if (remainder > 0) {
          str += ' و ' + this.convertNumberToPersianWords(remainder)
        }
      } else if (number < 1000000000) {
        let millions = Math.floor(number / 1000000)
        let remainder = number % 1000000
        str = this.convertNumberToPersianWords(millions) + ' میلیون'
        if (remainder > 0) {
          str += ' و ' + this.convertNumberToPersianWords(remainder)
        }
      } else if (number < 1000000000000) {
        let milliards = Math.floor(number / 1000000000)
        let remainder = number % 1000000000
        str = this.convertNumberToPersianWords(milliards) + ' میلیارد'
        if (remainder > 0) {
          str += ' و ' + this.convertNumberToPersianWords(remainder)
        }
      }
      return str
    },

    async inlineDoCalculateVoteValue ($event) {
      if (
        this.getApplicationParam.hasOwnProperty("hamedanCalculateVoteValue") &&
        this.getApplicationParam.hamedanCalculateVoteValue
      ) {
        this.btn_CalculateVote_Click(true, $event)
      }
    },

    editVote (selecteditem) {
      // _VoteCommentChangeCount = 0;
      if (selecteditem) {
        let tmpSelected = { ...selecteditem }

        if (
          this.getApplicationParam.hasOwnProperty("CheckDeleteHoghoghi") &&
          this.getApplicationParam.CheckDeleteHoghoghi
        ) {
          if (tmpSelected.Comm_Vote.AgentComment == "-100") {
            this.showError(
              "به دلیل بررسی حقوقی ویرایش این رای امکان پذیر نمی باشد."
            )
            return false
          }
        }

        let tmpcontext = tmpSelected.Comm_Vote
        this.selectedEdit = selecteditem

        this.isNewVote = false
        this.issuedVoteModel.issuedVote.CI_VoteType = tmpcontext.CI_VoteType
        this.issuedVoteModel.issuedVote.CI_VoteTypeDetail =
          tmpcontext.CI_VoteTypeDetail
        this.issuedVoteModel.issuedVote.NidCommission = tmpcontext.NidCommission
        this.issuedVoteModel.issuedVote.NidVote = tmpcontext.NidVote
        this.issuedVoteModel.issuedVote.VoteDate = tmpcontext.VoteDate
        this.issuedVoteModel.issuedVote.VoteNo = tmpcontext.VoteNo
        this.issuedVoteModel.issuedVote.CI_Evaluation =
          tmpcontext.CI_Evaluation == null ? 0 : tmpcontext.CI_Evaluation
        this.issuedVoteModel.issuedVote.DeadlineGhararVote =
          tmpcontext.DeadlineGhararVote

        this.voteType = this.issuedVoteModel.issuedVote.CI_VoteType

        this.selectedVote = tmpSelected
        this.loadCodeVote(tmpSelected.Comm_Vote.CI_VoteType, 0)

        this.issuedVoteModel.issuedVote.VoteValue = tmpcontext.VoteValue

        this.issuedVoteModel.issuedVote.Vote_Comments = tmpcontext.Vote_Comments
        this.issuedVoteModel.issuedVote.AgentComment = tmpcontext.AgentComment
        this.issuedVoteModel.issuedVote.NidAgent = tmpcontext.NidAgent
        this.issuedVoteModel.issuedVote.IsNote7Action = tmpcontext.IsNote7Action
        // this.issuedVoteModel.issuedVote.Iscomplainant =
        //   tmpcontext.Iscomplainant;

        this.issuedVoteModel.issuedVote.TechnicalValue =
          tmpcontext.TechnicalValue

        this.value.CommissionTrepasses.forEach((x) => {
          x.IsSelected = false
        })

        // this.value.CommissionTrepasses.forEach((item) => {
        //   let TmpTrepass = tmpSelected.Comm_Trepass.find(
        //     (f) => f.NidTrepass == item.NidTrepass
        //   )
        //   if (TmpTrepass !== null) item.IsSelected = true
        // })

        this.value.CommissionTrepasses.forEach((item) => {
          var TmpTrepass = tmpSelected.Comm_Trepass.find(
            (f) => f.NidTrepass == item.NidTrepass
          )
          if (TmpTrepass != null) {
            item.IsHaveVote = false
            item.IsSelected = true
            // # todo
            // this.countchekCommissionTrepasses += 1;
          } else {
            item.IsSelected = false
          }
        })

        this.stausCalculateVote = false
        // # todo
        // this.CountchekCommissionTrepasses = this.CommissionTrepasses.filter(i => i.IsSelected == true).length;

        // Txt_description.Text = tmpcontext.Vote_Comments;
      } else {
        this.showError("لطفا رای مورد نظر را انتخاب نمایید.")
      }
    },

    btnEditvoteClick (row) {
      // # todo
      // _VoteEditMode = true;
      // Btn_AcceptBadvi.IsEnabled = false;
      if (this.isUVotingFormEditable) {
        if (this.checkTokens()) {
          if (row != null) {
            var tmpselected = { ...row }
            if (this.statusAnshaeVote) {
              this.GroupVoteTrepass = this.GroupVoteTrepass.filter(
                (x) => x.uniqueID != row.uniqueID
              )
              this.statusAnshaeVote = false
            }
            this.editVote(tmpselected)
          } else {
            this.showError("ردیفی جهت ویرایش انتخاب نشده است")
          }
        } else {
          this.showError("برای ویرایش رای نیاز به شناسه دارید")
        }
      } else {
        this.showError("فرم در حالت ویرایش نمی باشد")
      }
    },

    cancel_Click () {
      if (this.m == "e") {
        this.cancelMethod()

        this.value.CommissionTrepasses.forEach((x) => {
          x.IsSelected = false
        })
        // this.isNewVote = true;
        // this.issuedVoteModel = { issuedVote: { ...defaultIssuedVoteModel } };
        // this.issuedVoteModel.issuedVote.VoteTime = this.getTime();
        // this.issuedVoteModel.issuedVote.VoteDate = this.updateToday();
      } else {
        this.showError("فرم درحالت ویرایش نمی باشد.")
      }
    },

    editAccept_Click () {
      this.commTreDetail = null
      if (this.value.CommissionTrepasses.length > 0) {
        const arr = this.value.CommissionTrepasses.map((x) => x.MaxPenalty)
        this.kAllvalue = Math.max(...arr)
      }

      if (this.kAllvalue) {
        if (this.IsMashhad) {
          this.value.CommissionTrepasses.filter(
            (f) =>
              f.IsSelected &&
              !f.IsHaveVote &&
              (f.KCoeffiecient > 0)
          ).forEach((i) => {
            if (i.KCoeffiecient > i.MaxPenalty || i.KCoeffiecient < i.MinPenalty) {
              i.KCoeffiecient = i.MaxPenalty
            }
          })

          this.value.CommissionTrepasses.filter(
            (f) =>
              f.IsSelected &&
              !f.IsHaveVote &&
              (f.KCoeffiecient == 0 || f.KCoeffiecient == null)
          ).forEach((i) => {
            if (i.KCoeffiecient > i.MaxPenalty || i.KCoeffiecient < i.MinPenalty) {
              i.KCoeffiecient = i.MaxPenalty
            }
          })
        }
      }
      this.stausCalculateVote = true

      if (
        this.getApplicationParam.hasOwnProperty("CalculateBeforeAcceptVote") &&
        this.getApplicationParam.CalculateBeforeAcceptVote &&
        this.issuedVoteModel.issuedVote?.CI_VoteType == 1
      ) {
        if (this.value.CommissionTrepasses.length > 0) {
          const arr = this.value.CommissionTrepasses.map((x) => x.MaxPenalty)

          this.kAllvalue = Math.max(...arr)
        }
        if (this.kAllvalue) {
          this.value.CommissionTrepasses.filter(
            (f) =>
              f.IsSelected &&
              !f.IsHaveVote &&
              (f.KCoeffiecient == 0 || f.KCoeffiecient == null)
          ).forEach((i) => {
            i.KCoeffiecient = i.MaxPenalty
          })
          this.isDoneCoefficient = true
          this.stausCalculateVote = false
        }
        this.calculate(false, false, true)
      } else {
        this.badviVoteEssay()
      }
    },

    async onVotesCompilation () {
      const trepasses = this.value?.CommissionTrepasses ?? []
      if (trepasses.length > 0) {
        const allPenalties = trepasses.map((x) => x.MaxPenalty)
        this.kAllvalue = Math.max(...allPenalties)
      }
      if (this.kAllvalue != null && this.IsMashhadConfigSet) {
        trepasses.forEach((row) => {
          if (
            row.IsSelected == true &&
            !row.IsHaveVote &&
            row.KCoeffiecient > 0
          ) {
            row.KCoeffiecient = Math.min(
              row.MaxPenalty,
              Math.max(row.MinPenalty, row.KCoeffiecient)
            )
          } else if (
            row.IsSelected == true &&
            !row.IsHaveVote &&
            !row.KCoeffiecient
          ) {
            row.KCoeffiecient = row.MaxPenalty
          }
        })
      }
      this.stausCalculateVote = true
      this.value.CommissionTrepasses = trepasses

      if (
        this.issuedVoteModel.issuedVote?.CI_VoteType == 1 &&
        this.txtAllK != null
      ) {
        if (this.commissionsSetting.HideElamConfirm) {
          await this.calculate()
        } else {
          const needToConfirm = trepasses.some(
            (row) =>
              !row.IsHaveVote &&
              row.IsSelected &&
              row.KCoeffiecient !== this.txtAllK
          )
          if (needToConfirm) {
            this.showConfirm(
              "مقدار اعمال مغایرت دارد آیا قبل از محاسبه اعمال صورت گیرد؟"
            ).onOk(async () => {
              this.btnSet_Click(null, null)
              await this.calculate()
            })
          } else {
            await this.calculate()
          }
        }
      }

      if (
        this.getApplicationParam.hasOwnProperty("CalculateBeforeAcceptVote") &&
        this.getApplicationParam.CalculateBeforeAcceptVote &&
        this.issuedVoteModel.issuedVote?.CI_VoteType == 1
      ) {
        if (trepasses.length > 0 && this.kAllvalue === 0) {
          const arr = trepasses.map((x) => x.MaxPenalty)

          this.kAllvalue = Math.max(...arr)
        }
        if (this.kAllvalue) {
          if (this.IsMashhadConfigSet) {
            trepasses
              .filter(
                (f) =>
                  f.IsSelected &&
                  !f.IsHaveVote &&
                  (f.KCoeffiecient == 0 || f.KCoeffiecient == null)
              )
              .forEach((i) => {
                i.KCoeffiecient = i.MaxPenalty
              })
          }

          this.isDoneCoefficient = true
          this.stausCalculateVote = false
        }
        this.calculate(false, true, false)
      } else {
        this.voteEssay()
      }
    },

    async loadObj () {
      this.getCommissionInfo()
      this.onAcceptBadvi()

      if (
        this.getApplicationParam.hasOwnProperty("HideRejectBadvi") &&
        !this.getApplicationParam.HideRejectBadvi
      ) {
        this.showRejectBadvi = true
      } else {
        this.showRejectBadvi = false
      }

      if (
        this.getApplicationParam.hasOwnProperty("ISShowCombo_Evaluatione") &&
        this.getApplicationParam.ISShowCombo_Evaluatione
      ) {
        this.showCmbEvaluation = true
      } else {
        this.showCmbEvaluation = false
      }

      await this.$store.dispatch("commission/fetchKartableRows")
    },

    clearForm () {
      if (this.value != null) {
        this.value.Commission_Archive = null
      }
      this.value.CommissionTrepasses = []
      this.value.CommissionInfo.CommissionDate = ""
      this.$refs.issuedVote.CommissionComments = ""
      this.issuedVoteModel.issuedVote.Vote_Comments = ""
      this.issuedVoteModel.issuedVote.CI_Evaluation = null
      this.issuedVoteModel.issuedVote.IsNote7Action = false
    },

    expertReport () {
      this.selectedRows = this.value.CommissionTrepasses.filter(
        (item) => item.IsSelected
      )
      if (this.selectedRows.length == 0) {
        return this.showError("سطری از لیست تخلفات را انتخاب نمایید.")
      } else {
        this.printKarshenasiReport()
      }
    },
    printKarshenasiReport () {
      const reportPath = "RptExpert"
      const queryParams = {
        NidTrepass: this.selectedRows[this.selectedRows.length - 1].NidTrepass,
        NidUser: this.getNidUser()
      }
      this.showReport(reportPath, queryParams)
    },
    getTime () {
      let today = new Date()
      let h = today.getHours()
      let m = today.getMinutes()
      let s = today.getSeconds()
      h = h < 10 ? "0" + h : h
      m = m < 10 ? "0" + m : m
      s = s < 10 ? "0" + s : s
      let time = h + ":" + m + ":" + s
      return time
    },
    updateToday () {
      PersianDate.toCalendar("persian")
      return new PersianDate().toLocale("en").format("L")
    },
    reset () {
      this.issuedVoteModel = { issuedVote: { defaultIssuedVoteModel } }
    },

    onVoteTrepassRow (row) {
      if (this.m == "e") {
        const list = this.value.CommissionTrepasses
        for (let i = 0; i < list.length; i++) {
          if (row.NidTrepass == list[i].NidTrepass) {
            list[i].IsSelected
              ? (list[i].IsSelected = false)
              : (list[i].IsSelected = true)
          }
        }

        this.selectedVoteTrepass = this.value.CommissionTrepasses.filter(
          (item) => item.IsSelected
        )
      }
    },

    async getCommissionInfo () {
      this.statusOkAgent = false

      this.log({
        action: this.logActions.view,
        bizCode: this.selectedNidCommission,
        bizCodeTitle: "NidCommission"
      })

      if (
        this.getApplicationParam.hasOwnProperty("ShowVoteType") &&
        this.getApplicationParam.ShowVoteType
      ) {
        this.setColumnField(
          "CI_VoteTypeDetail",
          {
            isHidden: false
          },
          this.voteIssuedColumnsBase
        )
      }

      if (this.commissionsSetting.CommissionGridSetting != null) {
        Object.entries(this.commissionsSetting.CommissionGridSetting).forEach(
          (setting) => {
            try {
              this.setColumnField(setting[0], {
                isHidden: !setting[1]
              })
            } catch {}
          }
        )

        this.setColumnField("KCoeffiecient", {
          isEditable: false
        })

        this.kCoeffiecientShow = false
      }

      if (this.commissionsSetting.LockVoteDate) {
        this.$refs.issuedVote.voteNoMode = "r"
        this.$refs.issuedVote.voteDateMode = "r"
        this.$refs.issuedVote.voteValueEnable = false
      }
      if (this.commissionsSetting.IsEnableEditeVoteNo) {
        this.$refs.issuedVote.voteNoMode = "e"
      } else {
        this.$refs.issuedVote.voteNoMode = "r"
      }

      if (this.commissionsSetting.HideAgnetComments) {
        this.expAgentsShow = false
      }

      if (this.txtAllK != null) {
        this.txtAllK = ""
        this.kAllvalue = 0
      }

      if (this.commissionsSetting.IsNotEditableVoteValue) {
        this.$refs.issuedVote.voteValueMode = "r"
      }

      if (this.commissionsSetting.HideIscomplainant) {
        this.$refs.issuedVote.isComplainantShow = false
      }

      // # todo
      // if (this.commissionsSetting.IsNote)
      // {
      //     Txt_NoteComment.Visibility = Visibility.Visible;
      // }
      // else
      //     Txt_NoteComment.Visibility = Visibility.Collapsed;

      if (this.commissionsSetting.Instruction) {
        this.$refs.issuedVote.btnInstructionShow = true
      } else {
        this.$refs.issuedVote.btnInstructionShow = false
      }

      // TxtMessageArchive.Text = string.Empty;

      // if (this.commissionsSetting.ScrollTrepassPanel)
      // {
      //     RowTrepass.Height = new GridLength(0, GridUnitType.Auto);
      //     RowTrepass.MaxHeight = 0;
      // }
      // else
      // {
      //     RowTrepass.Height = new GridLength(250);
      //     RowTrepass.MaxHeight = 250;
      // }

      this.$refs.issuedVote.voteValueEnable = false
      this.$refs.issuedVote.technicalValueMode = "r"
      this.issuedVoteModel.issuedVote.Iscomplainant = false

      this.$refs.issuedVote.CommissionComments = ""

      this.showLoading()
      this.$emit("getAllCommissionDetails")

      // TxtStatus.Visibility = Visibility.Collapsed;
    },

    cancelMethod () {
      this.isNewVote = true

      this.issuedVoteModel.issuedVote.VoteDate = this.value.PersianDateServer
      this.issuedVoteModel.issuedVote.NidAgent = null
      // this.issuedVoteModel.issuedVote.CI_VoteType = 0 /// این قسمت در زمل هم تغییر کرد و مقدارش عوض نمیشه
      this.issuedVoteModel.issuedVote.CI_VoteTypeDetail = null
      this.issuedVoteModel.issuedVote.DigitalSignature = null
      this.issuedVoteModel.issuedVote.IsHave = null
      this.issuedVoteModel.issuedVote.Vote_Comments = null
      this.issuedVoteModel.issuedVote.VoteValue = null
      this.issuedVoteModel.issuedVote.TechnicalValue = 0
      this.issuedVoteModel.issuedVote.AgentComment = null
      this.issuedVoteModel.issuedVote.VoteNo = null
      this.issuedVoteModel.issuedVote.IsNote7Action = false
      // this.issuedVoteModel.issuedVote.Iscomplainant = false;

      this.$refs.issuedVote.getVoteNoFormat()
    },
    onAddVoteTrepassToList (selectedGroupVoteTrepass) {
      selectedGroupVoteTrepass.forEach((e) =>
        this.$emit("addVoteTrepassToList", e.Comm_Vote, e.Comm_Trepass)
      )
      this.showAgentsVote = false
    },

    badviVoteEssay () {
      let tmpselected = { ...this.selectedEdit }

      if (
        this.useEditVoteLimit &&
        (tmpselected.Comm_Vote.VoteDate !==
          this.issuedVoteModel.issuedVote.VoteDate ||
          tmpselected.Comm_Vote.VoteNo !==
            this.issuedVoteModel.issuedVote.VoteNo)
      ) {
        tmpselected.Comm_Vote.VoteDate = this.issuedVoteModel.issuedVote
        tmpselected.Comm_Vote.VoteNo = this.issuedVoteModel.issuedVote.VoteNo

        this.GroupVoteTrepass = this.GroupVoteTrepass.filter(
          (x) => x.uniqueID != tmpselected.uniqueID
        )
        this.GroupVoteTrepass.push(tmpselected)
        this.cancelMethod()

        this.issuedVoteModel.issuedVote.VoteValue = 0
        this.issuedVoteModel.issuedVote.TechnicalValue = 0

        this.issuedVoteModel.issuedVote.VoteNo = ""
        return false
      }

      if (
        !this.commissionsSetting.IsCheckEmptyVoteTypeDetail &&
        this.issuedVoteModel.issuedVote.CI_VoteTypeDetail == null
      ) {
        this.showError("کد رای نباید خالی باشد.")
        return false
      }
      if (
        !this.stausCalculateVote &&
        this.issuedVoteModel.issuedVote.CI_VoteType == 1 &&
        this.commissionsSetting.NoAgainCalcForEditVote == false
      ) {
        this.showError("به دلیل تغییر ضریب رای لطفا محاسبه را انتخاب نمایید.")
        return false
      }
      if (
        (this.kAllvalue > 0 || this.kAllvalueNote3 > 0) &&
        this.stausCalculateVote == false &&
        this.issuedVoteModel.issuedVote.CI_VoteType == 1
        // && ((this.getApplicationParam.hasOwnProperty(
        //   "CalculateBeforeAcceptVote"
        // ) &&
        //   this.getApplicationParam.CalculateBeforeAcceptVote == false) ||
        //   this.issuedVoteModel.issuedVote.CI_VoteType != 1)
      ) {
        this.showError("< به دلیل تغییر ضریب رای لطفا محاسبه را انتخاب نمایید")
        return false
      }

      if (
        this.voteType == 1 &&
        // countchekCommissionTrepasses !== context.CommissionTrepasses.Where(i => i.IsSelected == true).Count() &&
        // ignorable....
        !this.stausCalculateVote
      ) {
        this.showError(
          "به علت  تغییر  تخلفات یا نوع رای لطفا کلید محاسبه را انتخاب کنید و بعد کلید تایید را بزنید."
        )
        return false
      } else {
        if (
          this.getApplicationParam.hasOwnProperty("CheckK") &&
          this.getApplicationParam.CheckK &&
          this.issuedVoteModel.issuedVote.CI_VoteType == 1 &&
          !this.issuedVoteModel.issuedVote.VoteValue
        ) {
          this.showError("لطفا مقدار جریمه را وارد نمایید...")
          return false
        }
        this.stausCalculateVote = false
        let TmpSelected = { ...this.selectedEdit }

        if (this.checkEdit(TmpSelected.Comm_Vote.NidVote) == false) {
          this.isNewVote = true
          // Btn_Accept.Visibility = Visibility.Visible;

          let tmpcontext = TmpSelected.Comm_Vote
          TmpSelected.Comm_Trepass = []
          let tmpTrepass = this.value.CommissionTrepasses.filter(
            (f) => f.IsSelected
          )
          tmpTrepass.forEach((i) => {
            TmpSelected.Comm_Trepass.push({
              NidTrepass: i.NidTrepass,
              MaxPenalty: i.MaxPenalty,
              MinPenalty: i.MinPenalty,

              PenaltyFormula: i.PenaltyFormula,
              CalculationPrice: i.CalculationPrice,

              Trepass_Comments: i.Trepass_Comments,
              TrepassValue: i.TrepassValue,
              NidCommission: i.NidCommission,
              CI_Years: i.CI_Years,

              Id: i.Id,
              Title: i.Title,
              IdOld: i.IdOld,
              TitleOld: i.TitleOld,

              UsingID: i.UsingID,
              UsingTitle: i.UsingTitle,
              UsingGroupID: i.UsingGroupID,
              UsingGroupTitle: i.UsingGroupTitle,

              Floor: i.Floor,
              K: i.K,
              P: i.P,
              KCoeffiecient: i.KCoeffiecient,

              AreaMojaz: i.AreaMojaz,
              AreaMojod: i.AreaMojod,
              CI_UsingTypeMojaz: i.CI_UsingTypeMojaz,
              CI_UsingTypeGroupMojaz: i.CI_UsingTypeGroupMojaz,
              FloorCountMosavab: i.FloorCountMosavab,
              Note: i.Note
            })
          })
          this.$emit("changeColorTrepassRow")

          // let grdVote = (Commission_Vote)grid_body.DataContext; // ignorable..... we dont need body grid! use 'this.issuedVoteModel.issuedVote'
          tmpcontext.CI_VoteType = this.issuedVoteModel.issuedVote.CI_VoteType
          tmpcontext.NidCommission =
            this.issuedVoteModel.issuedVote.NidCommission
          tmpcontext.NidVote = this.issuedVoteModel.issuedVote.NidVote
          tmpcontext.IsNote7Action =
            this.issuedVoteModel.issuedVote.IsNote7Action
          // tmpcontext.Iscomplainant = this.issuedVoteModel.issuedVote.Iscomplainant;

          tmpcontext.Vote_Comments =
            this.issuedVoteModel.issuedVote.Vote_Comments

          // tmpcontext.DeadlineGhararVote = byte.Parse(txt_DeadlineGhararVote.Value == null ? "0" : txt_DeadlineGhararVote.Value); // i dont know what is this

          tmpcontext.CI_Evaluation =
            this.issuedVoteModel.issuedVote.CI_Evaluation == null
              ? 0
              : this.issuedVoteModel.issuedVote.CI_Evaluation
          tmpcontext.VoteDate = this.issuedVoteModel.issuedVote.VoteDate
          tmpcontext.CI_VoteTypeDetail =
            this.issuedVoteModel.issuedVote.CI_VoteTypeDetail
          tmpcontext.CI_VoteType = this.issuedVoteModel.issuedVote.CI_VoteType
          tmpcontext.VoteNo = this.issuedVoteModel.issuedVote.VoteNo

          tmpcontext.VoteValue = this.issuedVoteModel.issuedVote.VoteValue

          tmpcontext.TechnicalValue =
            this.issuedVoteModel.issuedVote.TechnicalValue

          tmpcontext.AgentComment = this.issuedVoteModel.issuedVote.AgentComment
          let newGroupVoteTrepass = this.GroupVoteTrepass.filter(
            (x) => !(x.Comm_Vote.NidVote === TmpSelected.Comm_Vote.NidVote)
          )
          if (newGroupVoteTrepass) {
            newGroupVoteTrepass.push(TmpSelected)
            this.$emit("updateGroupVoteTrepass", newGroupVoteTrepass)
            this.setGroupVoteTrepass()
          }
          this.cancelMethod()

          this.issuedVoteModel.issuedVote.VoteValue = 0
          this.issuedVoteModel.issuedVote.TechnicalValue = 0
        } else {
          this.showError("برای چنین تخلفی رای صادر شده است.")
        }
      }
    },

    async voteEssay () {
      this.statusAnshaeVote = true

      if (
        this.ischeckTrepass &&
        this.value.CommissionTrepasses.every((i) => i.IsHaveVote)
      ) {
        this.showError(
          "زمانی که از تایید رای بدوی استفاده کرده اید امکان انشاء رای وجود ندارد."
        )
        return false
      }

      if (!this.issuedVoteModel.issuedVote.CI_VoteTypeDetail) {
        this.showError("لطفا کد رای را انتخاب نمایید.")
        return false
      }

      if (this.checkTokens()) {
        if (this.commissionsSetting.Coding) {
          let tmpCommissionVote = this.issuedVoteModel.issuedVote

          let TmpGroup2 = this.value.CommissionTrepasses.filter(
            (f) => f.IsSelected === true && f.CI_TrepassType_Group == 2
          )

          if (TmpGroup2.length > 0) {
            tmpCommissionVote.NidCommission =
              this.value.CommissionInfo.NidCommission

            tmpCommissionVote.NidVote = "00000000-0000-0000-0000-000000000000"

            tmpCommissionVote.VoteValue =
              this.issuedVoteModel.issuedVote.VoteValue

            tmpCommissionVote.TechnicalValue =
              this.issuedVoteModel.issuedVote.TechnicalValue

            this.$emit("contextAddVoteTrepassToList", tmpCommissionVote)

            if (this.commissionsSetting.SetCommissionPrintTypeGharar) {
              // nothing       = 0,
              // Badvi         = 1,
              // TajdidNazar   = 2,
              // FormeGharar   = 3,
              // DivalEdalat   = 4,
              // Estenkafi     = 5,
              // Estefsariyeh  = 6,
              // Eslahi        = 7,
              // DarayeNameh   = 8 ,
              // TakhalofAgain = 9

              if (tmpCommissionVote.CI_VoteType == 3) {
                // this.value.CommissionInfo.CI_PrintType = (byte)Biz.Commission.ClsEnum.CommissionType.FormeGharar;
                this.value.CommissionInfo.CI_PrintType = 3
              } else if (this.value.CommissionInfo.CI_CommissionType == 2) {
                this.value.CommissionInfo.CI_PrintType = 2
              }
            } else {
              if (tmpCommissionVote.CI_VoteType == 5) {
                // this.value.CommissionInfo.CI_PrintType = (byte)Biz.Commission.ClsEnum.CommissionType.FormeGharar;
                this.value.CommissionInfo.CI_PrintType = 3
              }
            }

            TmpGroup2.forEach((i) => (i.IsSelected = false))
          }

          const getCoding = await this.getCoding()

          let tmpt = this.value.CommissionTrepasses.filter(
            (f) => f.IsSelected === true && f.CI_TrepassType_Group !== 2
          )

          tmpt
            .groupBy((f) => {
              return {
                UsingGroupID: f.UsingGroupID,
                CI_TrepassType_Group: f.CI_TrepassType_Group
              }
            })
            .every((i) => {
              let code = getCoding.ADP_VoteTypeDetail.filter(
                (a) =>
                  a.CI_VoteType == tmpCommissionVote.CI_VoteType &&
                  a.CI_TrepassType_Group == i["key"].CI_TrepassType_Group &&
                  a.UsingGroupID == i["key"].UsingGroupID
              ).find((e) => e)

              if (
                this.commissionsSetting.CheckDuplicateTrepassVote == true &&
                this.checkDulicateVote()
              ) {
                this.showError("برای چنین تخلفی رای صادر شده است.")
                return false
              }

              if (this.issuedVoteModel.issuedVote.CI_VoteType !== 20) {
                if (
                  this.getApplicationParam.hasOwnProperty("CheckK") &&
                  this.getApplicationParam.CheckK &&
                  this.issuedVoteModel.issuedVote.CI_VoteType == 1 &&
                  parseFloat(this.issuedVoteModel.issuedVote.VoteValue) == 0
                ) {
                  this.showError("لطفا مقدار جریمه را وارد نمایید.")
                  return false
                }

                try {
                  tmpCommissionVote.CI_VoteTypeDetail = code.CI_VoteTypeDetail
                } catch (err) {
                  let str = `در جدول ADP_VoteTypeDetail ردیفی با مشخصات زیر وجود ندارد:<br>
                    CI_VoteType= ${tmpCommissionVote.CI_VoteType}<br>
                    CI_TrepassType_Group= ${i["key"].CI_TrepassType_Group}<br>
                    UsingGroupID= ${i["key"].UsingGroupID}`

                  this.showError(str)
                  return false
                }
                tmpCommissionVote.CI_VoteTypeDetail = code?.CI_VoteTypeDetail

                let Tmptext = this.$refs.issuedVote.ciVoteTypeDetail.find(
                  (a) => a.ID == code?.CI_VoteTypeDetail
                )
                if (Tmptext) tmpCommissionVote.Vote_Comments = Tmptext.Title
                // tmpCommissionVote.Vote_Comments = this.issuedVoteModel.issuedVote.Vote_Comments;
              }
              tmpCommissionVote.NidCommission =
                this.value.CommissionInfo.NidCommission

              tmpCommissionVote.NidVote = "00000000-0000-0000-0000-000000000000"

              tmpCommissionVote.VoteValue =
                this.issuedVoteModel.issuedVote.VoteValue

              tmpCommissionVote.TechnicalValue =
                this.issuedVoteModel.issuedVote.TechnicalValue

              if (this.issuedVoteModel.issuedVote.CI_Evaluation) {
                tmpCommissionVote.CI_Evaluation =
                  this.issuedVoteModel.issuedVote.CI_Evaluation.toString()
              } else {
                tmpCommissionVote.CI_Evaluation = 0
              }

              tmpCommissionVote.IsNote7Action =
                this.issuedVoteModel.issuedVote.IsNote7Action ?? false
              // tmpCommissionVote.Iscomplainant =
              //   this.issuedVoteModel.issuedVote.Iscomplainant ?? false;

              this.$emit("contextAddVoteTrepassToList", tmpCommissionVote, [
                ...i
              ])
            })

          this.$emit("changeColorTrepassRow")

          this.issuedVoteModel.issuedVote.VoteValue = 0
          this.issuedVoteModel.issuedVote.TechnicalValue = 0

          if (
            this.getApplicationParam.hasOwnProperty(
              "IsClearCalculateTextBox"
            ) &&
            this.getApplicationParam.IsClearCalculateTextBox
          ) {
            if (this.txtAllK != null) {
              this.txtAllK = 0
              this.kAllvalue = 0
            }
          }

          this.cancelMethod()
        } else {
          this.acceptVote()
        }
      } else {
        this.showError("برای صدور رای نیاز به شناسه دارید.")
      }
    },

    onAcceptBadvi () {
      this.ischeckTrepass = true

      if (this.value.CommissionTrepasses.every((e) => e.IsHaveVote)) {
        this.showError("برای همه تخلفات رای صادر شده است.")
        return
      }

      this.showLoading()
      const payload = {
        PRequest: {
          NosaziCode: this.value.CommissionInfo.CodeString,
          NIDCommission: "00000000-0000-0000-0000-000000000000"
        }
      }

      this.$services.commissions
        .getHistoryVotes(payload)
        .then(({ data }) => {
          const acceptBadviRes = this.getResponse(data)

          if (
            acceptBadviRes.success &&
            acceptBadviRes.data.GetHistoryVotesResult.Commission_VoteTrepasses
          ) {
            if (
              acceptBadviRes.data.GetHistoryVotesResult
                .Commission_VoteTrepasses !== null &&
              acceptBadviRes.data.GetHistoryVotesResult.Commission_VoteTrepasses
                .length > 0
            ) {
              this.hasVoteHistory = true
              const arr =
                acceptBadviRes.data.GetHistoryVotesResult.Commission_VoteTrepasses.map(
                  (f) => f.VoteDate
                )

              // دریافت بالاترین مقدار VoteDate در آرایه
              const tmpMaxVoteDate = arr.reduce((prev, current) => {
                if (!prev) return current

                return new PersianDate(current)
                  .toLocale("en")
                  .diff(new PersianDate(prev).toLocale("en"), "days") > 0
                  ? current
                  : prev
              }, null)

              this.multiBadviModel.q =
                acceptBadviRes.data.GetHistoryVotesResult.Commission_VoteTrepasses.filter(
                  (f) =>
                    f.UrbanNidKartablItem ===
                      this.value.CommissionInfo.UrbanNidKartablItem &&
                    // f.CI_PrintType == 1 && // داخل زمل هست اما با عملکرد سرا8 مغایرت داره
                    f.VoteDate == tmpMaxVoteDate
                )
              if (
                this.getApplicationParam.hasOwnProperty("CheckBadviVoteDate") &&
                this.getApplicationParam.CheckBadviVoteDate
              ) {
                this.multiBadviModel.q =
                  acceptBadviRes.data.GetHistoryVotesResult.Commission_VoteTrepasses.filter(
                    (f) =>
                      f.UrbanNidKartablItem ===
                        this.value.CommissionInfo.UrbanNidKartablItem &&
                      f.CI_PrintType == 1
                  )
              }

              const Tmpgroup = this.multiBadviModel.q.groupBy(
                (f) => f.NidTrepass
              )

              if (Tmpgroup.length !== this.value.CommissionTrepasses.length) {
                this.showError(
                  `تایید رای بدوی امکان پذیر نمی باشد! تعداد رأی(${Tmpgroup.length}) با تعداد تخلفات(${this.value.CommissionTrepasses.length})برابر نمی باشد`
                )
              } else {
                // foreach (var i in context.CommissionTrepasses)
                this.value.CommissionTrepasses.forEach((i) => {
                  if (!i.IsHaveVote) {
                    let tmpcheck = this.multiBadviModel.q.find(
                      (f) =>
                        f.IdOld == i.IdOld &&
                        f.K == i.K &&
                        f.UsingGroupID == i.UsingGroupID &&
                        f.UsingID == i.UsingID &&
                        f.TrepassValue == i.TrepassValue &&
                        f.Floor == i.Floor
                    )
                    if (!tmpcheck) {
                      this.showError(
                        `تایید رای بدوی امکان پذیر نمی باشد! برای تخلف (${i.Title}) رأی صادر نشده است.`
                      )
                    }
                  }
                })

                // var tmpv = q.FirstOrDefault();
                this.multiBadviModel.tmpv = this.multiBadviModel.q.find(
                  (e) => e
                )

                let tmpVote = this.multiBadviModel.q
                  .filter(
                    (f) =>
                      f.NidCommission ===
                      this.multiBadviModel.tmpv.NidCommission
                  )
                  .groupBy((f) => f.NidVote)
                // .select(i => i.first());

                if (tmpVote.length == 1) {
                  tmpVote.forEach((item) => {
                    let qVote = this.multiBadviModel.q.find(
                      (f) => f.NidVote == item["key"]
                    )
                    let tmpTrepasses = item
                    tmpTrepasses.forEach((tmptre) => {
                      let tmptrepass = this.value.CommissionTrepasses.find(
                        (f) =>
                          f.IdOld == tmptre.IdOld &&
                          f.K == tmptre.K &&
                          f.UsingGroupID == tmptre.UsingGroupID &&
                          f.UsingID == tmptre.UsingID &&
                          f.TrepassValue == tmptre.TrepassValue &&
                          f.Floor == tmptre.Floor
                      )
                      if (tmptrepass !== null) {
                        tmptre.NidTrepass = tmptrepass.NidTrepass
                      }
                    })

                    let cc = this.GroupVoteTrepass.find(
                      (f) =>
                        f.Comm_Vote.NidVote == qVote.NidVote ||
                        qVote.IsHave == 1
                    )

                    if (cc == null) {
                      qVote.IsHave = 1
                      this.$emit("addVoteTrepassToList", qVote, tmpTrepasses)
                    } else {
                      this.showError("رای بدوی تایید شده است.")
                    }
                  })
                } else {
                  let tmpmulti = []

                  tmpVote.forEach((item) => {
                    let qVote = this.multiBadviModel.q.find(
                      (f) => f.NidVote == item["key"]
                    )

                    if (qVote) {
                      this.value.CommissionTrepasses.forEach((sts, _index) => {
                        if (sts.IsHaveVote == false) {
                          item[0] = {
                            ...item[0],
                            IdOld: sts.IdOld,
                            UsingGroupID: sts.UsingGroupID,
                            UsingID: sts.UsingID,
                            CI_Years: sts.CI_Years,
                            Floor: sts.Floor
                          }
                        }
                      })

                      tmpmulti.push({
                        Comm_Vote: { ...qVote },
                        Comm_Trepass: [...item],
                        IsSelected: true,
                        isExpanded: false
                      })
                    }
                  })

                  let tmpselect = []
                  this.value.CommissionTrepasses.forEach((sts, _index) => {
                    if (sts.IsHaveVote == false) {
                      tmpselect.push({
                        ...tmpmulti[_index]
                      })
                    }
                  })

                  this.multiBadviModel.grid_vote = [...tmpselect]

                  this.showMultiBadvi = true
                }
              }
            } else {
              this.hasVoteHistory = false
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

    onMultiBadvi () {
      let tmpselected = this.multiBadviModel.grid_vote.filter(
        (f) => f.IsSelected
      )

      let tmpAllse = this.multiBadviModel.q
        .filter((f) => {
          return (
            f.NidCommission == this.multiBadviModel.tmpv.NidCommission &&
            tmpselected.some((i) =>
              i.Comm_Trepass.some((e) => e.NidVote == f.NidVote)
            )
          )
        })
        .groupBy((f) => f.NidVote)

      tmpAllse.forEach((item) => {
        let qVote = this.multiBadviModel.q.find((f) => f.NidVote == item["key"])

        let tmpTrepasses = [...item]

        tmpTrepasses.forEach((tmptre) => {
          let tmptrepass = this.value.CommissionTrepasses.find(
            (f) =>
              f.IdOld == tmptre.IdOld &&
              f.K == tmptre.K &&
              f.UsingGroupID == tmptre.UsingGroupID &&
              f.UsingID == tmptre.UsingID &&
              f.TrepassValue == tmptre.TrepassValue &&
              f.Floor == tmptre.Floor
          )
          if (tmptrepass) {
            tmptre.NidTrepass = tmptrepass.NidTrepass
            tmptrepass.IsHaveVote = true
          }
        })

        let cc = this.GroupVoteTrepass.find(
          (f) => f.Comm_Vote.NidVote == qVote.NidVote || qVote.IsHave == 1
        )
        if (cc == null) {
          qVote.IsHave = 1
          this.$emit("addVoteTrepassToList", qVote, tmpTrepasses)
        } else {
          this.showError("رای بدوی تایید شده است.")
        }
      })

      // this.$emit("changeColorTrepassRow");
      this.showMultiBadvi = false
    },

    onRejectBadvi () {
      let rejectMsg =
        "با عنایت به لایحه تجدید نظر خواه، تجدید نظر خواهی وارد است, بدین وسیله رای بدوی نقض و "

      this.issuedVoteModel.issuedVote.Vote_Comments = this.issuedVoteModel
        .issuedVote.Vote_Comments
        ? (this.issuedVoteModel.issuedVote.Vote_Comments += rejectMsg)
        : rejectMsg
    },

    onPerformVote ({ TxtNamehNo, TxtVoteNo }) {
      let message = `بدینوسیله با توجه به گزارش شهرداری در نامه شماره ${TxtNamehNo} و با استفاده از وحدت ملاک از ماده 309 قانون آئین دادرسی دادگاه های عمومی و انقلاب در امور مدنی رای شماره ${TxtVoteNo} به شرح ذیل اصلاح می گردد.ضمنا تسلیم رونوشت رای اصلی بدون رونوشت رای تصحیحی ممنوع است.`

      this.issuedVoteModel.issuedVote.Vote_Comments = this.issuedVoteModel
        .issuedVote.Vote_Comments
        ? (message += this.issuedVoteModel.issuedVote.Vote_Comments)
        : message
    },

    acceptVote () {
      if (this.isCheckSelectedTrepass()) {
        let tmpCommissionVote = this.issuedVoteModel.issuedVote
        this.ischeckTrepass = false

        if (
          this.commissionsSetting.CheckDuplicateTrepassVote == true &&
          this.checkDulicateVote()
        ) {
          this.showError("برای چنین تخلفی رای صادر شده است.")
          return false
        }

        let tmpSelectedcombo = this.issuedVoteModel.issuedVote.CI_VoteTypeDetail
        if (this.issuedVoteModel.issuedVote.CI_VoteType !== 20) {
          if (!tmpSelectedcombo) {
            this.showError("لطفا اطلاعات را کامل وارد نمایید.")
            return false
          }

          if (
            this.getApplicationParam.hasOwnProperty("CheckK") &&
            this.getApplicationParam.CheckK &&
            this.issuedVoteModel.issuedVote.CI_VoteType == 1 &&
            parseFloat(this.issuedVoteModel.issuedVote.VoteValue) == 0
          ) {
            this.showError("لطفا مقدار جریمه را وارد نمایید..")
            return false
          }

          tmpCommissionVote.CI_VoteTypeDetail = tmpSelectedcombo
          tmpCommissionVote.Vote_Comments =
            this.issuedVoteModel.issuedVote.Vote_Comments
        }

        tmpCommissionVote.NidCommission =
          this.value.CommissionInfo.NidCommission

        tmpCommissionVote.IsNote7Action =
          this.issuedVoteModel.issuedVote.IsNote7Action ?? false
        // tmpCommissionVote.Iscomplainant =
        //   this.issuedVoteModel.issuedVote.Iscomplainant ?? false;

        tmpCommissionVote.NidVote = "00000000-0000-0000-0000-000000000000"

        if (this.issuedVoteModel.issuedVote.CI_Evaluation) {
          tmpCommissionVote.CI_Evaluation =
            this.issuedVoteModel.issuedVote.CI_Evaluation
        } else {
          tmpCommissionVote.CI_Evaluation = 0
        }
        tmpCommissionVote.VoteValue = this.issuedVoteModel.issuedVote.VoteValue

        tmpCommissionVote.TechnicalValue =
          this.issuedVoteModel.issuedVote.TechnicalValue

        this.$emit("contextAddVoteTrepassToList", tmpCommissionVote)

        this.cancelMethod()

        if (this.commissionsSetting.SetCommissionPrintTypeGharar) {
          // nothing       = 0,
          // Badvi         = 1,
          // TajdidNazar   = 2,
          // FormeGharar   = 3,
          // DivalEdalat   = 4,
          // Estenkafi     = 5,
          // Estefsariyeh  = 6,
          // Eslahi        = 7,
          // DarayeNameh   = 8 ,
          // TakhalofAgain = 9

          if (tmpCommissionVote.CI_VoteType == 3) {
            // context.CommissionInfo.CI_PrintType = (byte)Biz.Commission.ClsEnum.CommissionType.FormeGharar;
            this.value.CommissionInfo.CI_PrintType = 3
          } else if (this.value.CommissionInfo.CI_CommissionType == 2) {
            // context.CommissionInfo.CI_PrintType = (byte)Biz.Commission.ClsEnum.CommissionType.TajdidNazar;
            this.value.CommissionInfo.CI_PrintType = 2
          }
        } else {
          if (tmpCommissionVote.CI_VoteType == 5) {
            // context.CommissionInfo.CI_PrintType = (byte)Biz.Commission.ClsEnum.CommissionType.FormeGharar;
            this.value.CommissionInfo.CI_PrintType = 3
          }
        }

        this.$emit("changeColorTrepassRow")

        this.issuedVoteModel.issuedVote.VoteValue = 0
        this.issuedVoteModel.issuedVote.TechnicalValue = 0

        if (
          this.getApplicationParam.hasOwnProperty("IsClearCalculateTextBox") &&
          this.getApplicationParam.IsClearCalculateTextBox
        ) {
          if (this.txtAllK != null) {
            this.txtAllK = 0
            this.kAllvalue = 0
          }
        }
      } else {
        this.showError("برای صدور رای انتخاب حداقل یک تخلف الزامی است.")
      }
    },

    async getCoding () {
      let coding = null
      try {
        const { data } = await this.$services.commissions.getADPVoteTypeDetail()
        const res = this.getResponse(data)
        if (res.success) {
          coding = res.data.GetADP_VoteTypeDetailResult
          await this.log({
            action: this.logActions.view,
            bizCode: '',
            bizCodeTitle: '',
            saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
          })
        }
      } catch (error) {
        console.error(error)
        // this.serverError() // test serverError
      }

      return coding
    },

    checkDulicateVote () {
      let tmp = []
      let ret = false
      this.value.CommissionTrepasses.forEach((i) => {
        if (i.IsHaveVote == false && i.IsSelected == true) tmp.push(i)
      })

      tmp.forEach((i) => {
        let q = this.GroupVoteTrepass.find((f) =>
          f.Comm_Trepass.some((a) => a.NidTrepass == i.NidTrepass)
        )
        if (q != null) {
          ret = true
          return false
        }
      })

      return ret
    },

    selection_SelectionChanged ($event) {
      this.value.CommissionTrepasses.forEach((f) => {
        if (!f.IsHaveVote) {
          if (Number($event) == 0) {
            f.IsSelected = true
          } else if (Number($event) == 1) {
            f.IsSelected = false
          } else if (Number($event) == 2) {
            f.IsSelected = !f.IsSelected
          }
        }
      })
    },

    checkEdit (nidVote) {
      let ret = false
      let tmpSelect = this.value.CommissionTrepasses.filter((f) => f.IsSelected)
      if (tmpSelect && tmpSelect.length > 0) {
        tmpSelect.forEach((i) => {
          let Q = this.GroupVoteTrepass.filter(
            (f) => f.Comm_Vote.NidVote != nidVote
          ).find((f) =>
            f.Comm_Trepass.some((a) => a.NidTrepass == i.NidTrepass)
          )
          console.log("%%%%%Q:", Q, typeof Q)
          if (Q) ret = true
        })
      }
      return ret
    },

    selectVoteIssued ({ dataItem }) {
      this.commTreDetail = dataItem.Comm_Trepass
    },

    setGroupVoteTrepass () {
      this.$nextTick(() => {
        this.getGroupVoteTrepass = this.GroupVoteTrepass.map((f) => {
          return {
            ...f.Comm_Vote,
            Comm_Vote: f.Comm_Vote,
            Comm_Trepass: f.Comm_Trepass
          }
        })

        this.$refs?.takhalofatRef?.gridApi?.redrawRows()
      })
    },

    voteType_SelectionChanged () {
      this.gridApi.showLoadingOverlay()
      this.gridApi.columnModel.setColumnsVisible(this.voteTrepassesColumnsBase.map(e => e.field), false)
      setTimeout(async () => {
        await this.gridApi.columnModel.setColumnsVisible(this.voteTrepassesColumnsBase.map(e => e.field), true)
        this.gridApi.hideOverlay()
      }, 800)

      // group.children.forEach(child => this.columnApi.setColumnsVisible(child, true))
      if (
        this.getApplicationParam.hasOwnProperty("IsClearCalculateTextBox") &&
        this.getApplicationParam.IsClearCalculateTextBox
      ) {
        if (this.txtAllK != null) {
          this.txtAllK = 0
        }
      }

      // if (Grd_trepass.Columns["KEdit"] !== null)//12
      //     Grd_trepass.Columns["KEdit"].IsVisible = false;

      this.$refs.issuedVote.voteValueEnable = false
      this.$refs.issuedVote.technicalValueMode = "r"

      this.setColumnField("KCoeffiecient", {
        isEditable: false
      })

      // if (Grd_trepass.Columns["KReadOnly"] !== null)//11
      //     Grd_trepass.Columns["KReadOnly"].IsVisible = true;

      this.kCoeffiecientShow = false
      this.isDoneCoefficient = false
      if (this.issuedVoteModel.issuedVote.CI_VoteType) {
        if (
          this.issuedVoteModel.issuedVote.CI_VoteType == 3 &&
          this.getApplicationParam.hasOwnProperty("ResetKCoeffiecient") &&
          this.getApplicationParam.ResetKCoeffiecient
        ) {
          this.value.CommissionTrepasses.filter((f) => !f.IsHaveVote).forEach(
            (i) => {
              i.KCoeffiecient = 0
            }
          )
        }

        if (
          (this.m == "e" && this.issuedVoteModel.issuedVote.CI_VoteType == 1) ||
          (this.commissionsSetting.InputValueForGhal &&
            this.issuedVoteModel.issuedVote.CI_VoteType == 3)
        ) {
          // if (Grd_trepass.Columns["KEdit"] !== null)
          // {
          //     Grd_trepass.Columns["KEdit"].IsVisible = true;
          //     Grd_trepass.Columns["KEdit"].DisplayIndex = Grd_trepass.Columns["KReadOnly"].DisplayIndex + 1;
          // }

          this.kCoeffiecientShow = true
          this.$refs.issuedVote.voteValueEnable = true
          this.$refs.issuedVote.technicalValueMode = "e"

          // this.showLoading()
          setTimeout(() => {
            this.setColumnField("KCoeffiecient", {
              isEditable: true
            })
          }, 500)
        } else {
          this.issuedVoteModel.issuedVote.VoteValue = 0
          this.issuedVoteModel.issuedVote.TechnicalValue = 0
          this.kCoeffiecientShow = false
          // this.showLoading()
          setTimeout(() => {
            this.setColumnField("KCoeffiecient", {
              isEditable: false
            })
          }, 500)
          // if (Grd_trepass.Columns["KReadOnly"] !== null)
          //     Grd_trepass.Columns["KReadOnly"].IsVisible = true;
        }

        // try {
        if (this.value.CommissionTrepasses != null) {
          // فیلتر کردن کد رای بر اساس نوع رای{
          // this.loadCodeVote(
          //   this.issuedVoteModel.issuedVote.CI_VoteType.toString(),
          //   this.value.CommissionTrepasses.filter(
          //     (f) => f.IsSelected == true
          //   ) || null
          //     ? this.value.CommissionTrepasses.filter(
          //       (f) => f.IsSelected == true
          //     ).find((e) => e).CI_TrepassType_Group
          //     : 0
          // )

          this.loadCodeVote(
            this.issuedVoteModel.issuedVote.CI_VoteType,
            this.value.CommissionTrepasses.filter((f) => f.IsSelected == true)
              ?.length > 0
              ? this.value.CommissionTrepasses.filter(
                (f) => f.IsSelected == true
              ).find((e) => e).CI_TrepassType_Group
              : 0
          )
        }
        // } catch {}
      }
      // VoteType = Convert.ToByte(Combo_VoteType.SelectedValue.ToString());

      if (
        this.commissionsSetting.SetCommissionPrintTypeGharar &&
        this.issuedVoteModel.issuedVote.CI_VoteType !== 0
      ) {
        if (this.issuedVoteModel.issuedVote.CI_VoteType == 3) {
          this.value.CommissionInfo.CI_PrintType = 3
        } else {
          if (this.issuedVoteModel.issuedVote.CI_VoteType == 3) {
            // eslint-disable-next-line camelcase, no-undef
            this.value.CommissionInfo.CI_PrintType = Tmp_CiPrintType || 0
          }
          // else
          // this.value.CommissionInfo.CI_PrintType = byte.Parse(Combo_CommissionType.SelectedValue.ToString());
        }
      }
    },

    comboCodeSelectionChanged () {
      this.$nextTick(function () {
        if (this.$refs.issuedVote.$refs.comboCode.selectedItem != null) {
          this.issuedVoteModel.issuedVote.Vote_Comments =
            this.$refs.issuedVote.$refs.comboCode.selectedItem.Title

          var tmpVoteID =
            this.$refs.issuedVote.$refs.comboVoteType.selectedItem.ID
          if (
            (this.$refs.issuedVote.$refs.comboCode.selectedItem.ID != 400 &&
              this.$refs.issuedVote.$refs.comboCode.selectedItem.ID != 401 &&
              tmpVoteID == 5) ||
            (tmpVoteID == 4 &&
              this.$refs.issuedVote.$refs.comboCode.selectedItem.ID == 32)
          ) {
            // # todo
            // txt_SubjectDeadlineGhararVote.Visibility = true;
            // txt_DeadlineGhararVote.Value = "10";
          } else {
            // # todo
            // txt_SubjectDeadlineGhararVote.Visibility = Visibility.Collapsed;
          }
        }
      })
    },

    removeDuplicateObjectFromArray (array, key) {
      let check = {}
      let res = []
      for (let i = 0; i < array.length; i++) {
        if (!check[array[i][key]]) {
          check[array[i][key]] = true
          res.push(array[i])
        }
      }
      return res
    },

    KCoeffiecientMode (row, col) {
      if (row.IsHaveVote) return "r"
      if (col.editable) return "e"
      return "r"
    },
    txtAllK_OnValueChanging ($event) {
      this.txtAllK = parseFloat($event)
      this.kAllvalue =
        this.txtAllK != null && !isNaN(parseFloat(this.txtAllK))
          ? parseFloat(this.txtAllK)
          : 0
      this.$nextTick(() => {
        this.$refs.takhalofatRef.gridApi.refreshCells()
      })
    },
    // async sendCompleted (val) {
    //   this.hideLoading()
    //   if (val) {
    //     this.showSendDescription = false
    //     this.hideSidebar("UVoting")
    //     await this.$store.dispatch("commission/fetchKartableRows")
    //     this.redirectToCommissionKartable()
    //   }
    // },
    updateLoginHistory (list) {
      this.loginHistory = list
    },

    // eslint-disable-next-line camelcase
    async loadCodeVote (pCi_VoteType, CI_TrepassType_Group, callback = null) {
      try {
        const payload = {
          pCI_VoteType: pCi_VoteType,
          // eslint-disable-next-line camelcase
          pCI_UsingGroup: CI_TrepassType_Group || 0
        }
        await this.$services.commissions
          .getCIVoteTypeDetailFromCIVoteType(payload)
          .then(async ({ data }) => {
            const result = this.getResponse(data)

            if (
              result.data.GetCI_VoteTypeDetail_FromCI_VoteTypeResult.ErrorResult
                ?.BizErrors.length > 0
            ) {
              this.showError(
                result.data.GetCI_VoteTypeDetail_FromCI_VoteTypeResult
                  .ErrorResult.BizErrors[0].ErrorTitel
              )
              // return false
            }

            if (
              result.data.GetCI_VoteTypeDetail_FromCI_VoteTypeResult.ErrorResult.BizErrors.every(
                (a) => a.ErrorAction != 0
              )
            ) {
              let pCIVoteTypeDetail =
                this.removeDuplicateObjectFromArray(
                  result.data.GetCI_VoteTypeDetail_FromCI_VoteTypeResult
                    .CI_VoteTypeDetail_FromCI_VoteType,
                  "ID"
                ) || []
              pCIVoteTypeDetail = pCIVoteTypeDetail.map((e) => {
                return {
                  ...e,
                  TitleField: `${e.Title}`
                }
              })
              this.$refs.issuedVote.ciVoteTypeDetail = pCIVoteTypeDetail
              let item = pCIVoteTypeDetail.find(
                (f) => f.ID == this.selectedVote?.Comm_Vote?.CI_VoteTypeDetail
              )
              this.issuedVoteModel.issuedVote.CI_VoteTypeDetail =
                item?.ID || null
            }

            if (callback != null) callback()
            await this.log({
              action: this.logActions.view,
              bizCode: '',
              bizCodeTitle: '',
              saveDesc: `بارگذاری اطلاعات در فرم ${this.title} انجام گردید.`
            })
          })
      } catch (error) {
        console.error(error)
        // this.serverError() // test serverError
      }
    },
    reloadCommissionTrepassesGridData () {
      this.$emit("getCommissionTrepasses")
    },
    getRowStyleTakhalofat ({ data: row }) {
      if (!row.IsHaveVote && row.IsSelected) {
        return {
          backgroundColor: "#d3d3d3"
        }
      } else if (row.IsHaveVote) {
        return {
          backgroundColor: "#d1fbfb"
        }
      } else {
        return {
          backgroundColor: "unset"
        }
      }
    }
  },
  watch: {
    // "issuedVoteModel.issuedVote.CI_VoteType":{
    //   handler(){
    //     if(this.issuedVoteModel.issuedVote.CI_VoteType===1){
    //       this.voteTrepassesMode="e"
    //     }else{
    //       this.voteTrepassesMode="r"
    //     }
    //   },deep:true
    // },
    sessionHistoryDialog: {
      handler (oldVal, newVal) {
        if (newVal == true && oldVal == false) {
          this.showConfirm(
            "آیا نظرات کارشناسان با یکدیگر مشابه هستید؟ در صورت انتخاب گزینه 'خیر' پرونده به مرحله قبل عودت داده می شود."
          )
            .onOk()
            .onCancel(() => {
              this.showPrevStep = true
            })
        }
      }
    },
    value: {
      handler () {
        this.$nextTick(() => {
          this.onLoadWarnLabel()
        })
      },
      deep: true
    },
    "value.CommissionInfo.CI_CommissionType": {
      handler () {
        this.updateCIPrintTypeList()
      },
      deep: true
    },
    m () {
      if (
        this.m == "e" &&
        (this.issuedVoteModel.issuedVote.VoteTime == "" ||
          this.issuedVoteModel.issuedVote.VoteTime == null)
      ) {
        this.issuedVoteModel.issuedVote.VoteTime = this.getTime()
        this.showMore = true
      } else {
        this.issuedVoteModel.issuedVote.VoteTime = null
      }
      if (
        this.m == "e" &&
        (this.issuedVoteModel.issuedVote.VoteDate == "" ||
          this.issuedVoteModel.issuedVote.VoteDate == null)
      ) {
        this.issuedVoteModel.issuedVote.VoteDate = this.updateToday()
      } else {
        this.showMore = false
        this.issuedVoteModel.issuedVote.VoteDate = null
      }
    }
  }
}
</script>

<style lang="scss">
#vote-grid {
  margin: 10px;
  border-radius: 10px;
  display: flex;
  height: 100%;
  flex-direction: column;
  background-color: #fff;
  box-shadow: 2px 2px 12px rgba(0, 0, 0, 0.2);

  .vote-header-clipper {
    height: calc(48px - 8px);
    overflow: hidden;
    border-bottom: 1px solid #eee;

    .vote-header {
      white-space: nowrap;
      height: 40px;
      align-items: center;

      .vot__col {
        display: inline-block;
        white-space: nowrap;
        font-size: 10px;
        padding: 0 8px;
        color: #202020;
        cursor: default;
        position: relative;
        text-align: center;

        &:after {
          content: "";
          width: 1px;
          height: 12px;
          background-color: rgba(0, 0, 0, 0.1);
          align-self: stretch;
          display: inline-block;
          position: absolute;
          right: 0;
          top: 50%;
          transform: translateY(-50%);
          margin: 0;
          padding: 0;
        }
      }
    }
  }

  .vote-body {
    min-height: 0;
    height: 0;
    flex-grow: 1;
    overflow: auto;
    scroll-behavior: smooth;
    will-change: scroll-position;

    .ckrow_wrap {
      min-height: 36px;

      &:not(:last-child) {
        border-bottom: 1px solid rgba(0, 0, 0, 0.07);
      }
    }
  }

  .vote-footer {
    height: 34px;
  }
}

.ag-cell {
  &.custom-pinned-row {
    &.ag-cell-focus {
      &:not(.ag-cell-range-selected) {
        &:focus-within {
          border-width: 1px;
          border-color: transparent !important;
        }
      }
    }
  }
}

.IsSelectedHeader {
  padding: 0 1px;
}

.takhalofat {
  .grid-root-wrapper .grid-cell {
    font-size: 10px;
  }
}
</style>
