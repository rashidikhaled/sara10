<template>
  <safa-form
    id="8C717418-509C-4424-B714-6B693F4A5EE8"
    caption="کمیسیون - کارشناسی - نظرات کارشناس"
  >
    <div>
      <SafaNotice v-if="showbackListLabel"
        >*این پرونده در لیست سیاه می باشد*
      </SafaNotice>
      <FormRow :lg="3" :xl="3" :sm="3" :md="3" :xs="3" class="q-my-sm">
        <!-- <div class="flex"> -->
        <!-- <safa-combo
          label="اولویت پرونده"
          ciName="CI_CommissionPriority"
          domainName="Commission100"
          label-width="110px"
          :m="controlMode"
          v-model="value.CI_CommissionPriority"
          style="flex: 1"
        /> -->
        <!-- <safa-checkbox label="False" /> -->
        <!-- </div> -->
        <FormControl>
          <safa-datepicker
            locale="fa"
            label="تاریخ ارجاع کمیسیون"
            :m="
              controlMode === 'e' && commissionDateEnabled === true ? 'e' : 'r'
            "
            label-width="110px"
            dir="ltr"
            format="jYYYY/jMM/jDD"
            display-format="dddd jDD jMMMM jYYYY"
            v-model="value.CommissionDate"
            cdcName="CommissionDate"
          />
        </FormControl>
        <!-- </FormRow>
      <FormRow :lg="3" :xl="3" :sm="3" :md="3" :xs="3" class="q-my-sm"> -->

        <FormControl>
          <safa-combo
            label="نوع کمیسیون"
            ciName="CI_CommissionType"
            domainName="Commission100"
            label-width="110px"
            :m="
              controlMode === 'e' && commissionTypeEnabled === true ? 'e' : 'r'
            "
            v-model="value.CI_CommissionType"
            cdcName="CI_CommissionType"
          />
        </FormControl>

        <FormControl>
          <!--ToDo  source-type="local"
          :options="comboPrintOptions"  از تنظیمات پر می شود طبق زمل که تنظیمات برای این بخش خالی هست -->
          <safa-combo
            label="نوع چاپ رأی"
            ciName="CI_CommissionType"
            domainName="Commission100"
            label-width="110px"
            :m="
              controlMode === 'e' && comboPrintTypeEnabled === true ? 'e' : 'r'
            "
            v-model="value.CI_PrintType"
            cdcName="CI_PrintType"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            label="کمیسیون قبلی"
            ciName="CI_Commission"
            label-width="110px"
            domainName="Commission100"
            :m="
              controlMode === 'e' && comboCodeOldCommissionEnabled === true
                ? 'e'
                : 'r'
            "
            v-model="value.CI_CommissionOld"
            cdcName="CI_CommissionOld"
          />
        </FormControl>
        <FormControl>
          <safa-securityPanel
            caption="کمیسیون جاری"
            id="52365FB0-FAFF-49BD-9032-789E1DD5D0CB"
          >
            <safa-combo
              label="کمیسیون جاری"
              ciName="CI_Commission"
              label-width="110px"
              domainName="Commission100"
              :m="
                controlMode === 'e' && comboCICommissionCurrentEnabled === true
                  ? 'e'
                  : 'r'
              "
              v-model="value.CI_Commission"
              cdcName="CI_Commission"
            />
          </safa-securityPanel>
          <safa-securityPanel
            caption="کمیسیون جاری"
            id="52365FB0-FAFF-49BD-9032-789E1DD5D0CB"
            v-sp-else
          >
            <safa-combo
              label="کمیسیون جاری"
              ciName="CI_Commission"
              label-width="110px"
              domainName="Commission100"
              m="r"
              v-model="value.CI_Commission"
              cdcName="CI_Commission"
            />
          </safa-securityPanel>
        </FormControl>
        <FormControl>
          <safa-text
            m="e"
            v-model="AreaAfterEditValue.AreaAfterEdit"
            cdcName="AreaAfterEdit"
            label="مقدار در مسیر"
            label-width="110px"
            bgColor="green-2"
          />
        </FormControl>
      </FormRow>
      <FormRow>
        <FormControl class="flex items-center q-my-xs">
          <safa-radio
            :m="rdCommissionMode"
            label="پرونده قابل طرح"
            :val="true"
            v-model="isVotable"
            style="min-width: 150px"
          />
          <safa-radio
            :m="rdRelapseMode"
            label="پرونده عودت داده می شود."
            v-model="isVotable"
            :val="false"
          />
        </FormControl>
        <FormControl>
          <safa-combo
            v-if="!isVotable"
            label="کد عودت"
            label-width="110px"
            domainName="Commission100"
            ciName="CI_RelapseType"
            :m="
              controlMode === 'e' && comboRelapseTypeEnabled === true
                ? 'e'
                : 'r'
            "
            v-model="value.CI_RelapseType"
            cdcName="CI_RelapseType"
          />
        </FormControl>

        <!-- <safa-securityPanel
          id="cd556b84-7681-46e6-8f4a-031fad03110a"
          :caption="titleMeetinginExpert"
      > -->
        <FormControl>
          <safa-checkbox
            :label="titleMeetinginExpert"
            :m="controlMode"
            v-model="value.IsMeeting"
            cdcName="IsMeeting"
          />
        </FormControl>
        <!-- </safa-securityPanel> -->
      </FormRow>

      <div class="row q-col-gutter-x-sm">
        <div class="col">
          <safa-datatable
            height="300px"
            title="سوابق رأی"
            :allowMultipleSelection="false"
            :checkboxSelection="false"
            @selectedChange="selectVoteIssued"
            :columns="voteIssuedColumns"
            v-model="GroupVoteTrepass"
            cdcName="GroupVoteTrepass"
          />
        </div>
        <div class="col-auto" v-show="commTreDetail">
          <div
            @click="commTreDetail = null"
            class="fit cursor-pointer bg-grey-2 flex items-center justify-center"
            style="min-width: 12px; height: 300px; border: 1px solid #ededed"
          >
            <q-icon name="chevron_left" size="sm" />
          </div>
        </div>
        <div class="col-7" v-if="commTreDetail">
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
            helper="Comm_TrepassColumns"
          />
        </div>
      </div>

      <text-template
        label="نظر کاربر منطقه"
        label-width="110px"
        class="q-my-sm"
        :rows="1"
        :m="controlMode"
        formKey="50110ed5-67bb-4401-a5bb-1ed4186496f5"
        v-model="value.UrbanComments"
          cdcName="UrbanComments"
      />
      <text-template
        :m="'r'"
        :formKey="'84a2fd27-e3ec-47a9-958d-04a5be08705d'"
        v-model="layeheComents"
        cdcName="layeheComents"
        class="q-my-sm"
        :rows="1"
        label="توضیحات منطقه"
        label-width="110px"
      />
      <text-template
        label="توضیحات"
        label-width="110px"
        class="q-mb-sm"
        :rows="1"
        formKey="41f636df-a44d-467c-982c-a08e7626f5d0"
        :m="controlMode"
        v-model="value.Comments"
          cdcName="Comments"
      />
      <text-template
        v-if="!isVotable"
        label="توضیحات علت عودت"
        label-width="110px"
        :rows="1"
        formKey="61f636df-a44d-467c-982c-a08e7626f5d1"
        :m="controlMode"
        v-model="value.RelapseComments"
          cdcName="RelapseComments"
      />
      <!-- <q-separator class="q-my-sm" /> -->
      <!-- <safa-checkbox
      label="ارجاع به کارشناس حقوقی"
      class="q-mb-sm"
      label-width="110px"
      v-model="value.HasLegalExpert"
      :m="controlMode"
    /> -->
      <!-- <text-template
      label="توضیحات کارشناس حقوقی"
      label-width="110px"
      :rows="5"
      :m="controlMode"
      formKey="1c0df364-ac62-46c3-a05a-53eababdf5ac"
      v-model="value.LegalExpertComments"
    /> -->
    </div>
  </safa-form>
</template>
<script>
import baseFormMixin from "src/mixins/baseFormMixin"
// import NazaratKarshenasGridTemplate from './NazaratKarshenasGridTemplate.vue'

export default {
  mixins: [baseFormMixin],

  // components: {
  //   NazaratKarshenasGridTemplate
  // },
  props: {
    GroupVoteTrepass: Array,
    controlMode: String,
    value: Object,
    AreaAfterEditValue: Object,
    layeheComents: String
  },
  data () {
    return {
      HasLegalExpert: false,
      showbackListLabel: false,
      isVotable: null,
      rdRelapseMode: "r", // پرونده عودت
      rdCommissionMode: "r", // پرونده قابل طرح
      commissionTypeEnabled: false,
      comboPrintTypeEnabled: false,
      comboCICommissionCurrentEnabled: false,
      comboCodeOldCommissionEnabled: false,
      commissionDateEnabled: false,
      titleMeetinginExpert: "با حضور نماینده",
      rdRelapse: null,
      commissionPriority: null,
      comboPrintOptions: [],
      comboRelapseTypeEnabled: false, // این برای کمبوی کد عودت هست که هنوز مشخص نیست چجوری نشون داده میشه اصلا
      voteIssuedColumns: [
        { field: "VotePriority", title: "ترتیب صدور", width: "100px" },
        {
          field: "CI_VoteType",
          title: "1 نوع رای",
          editor: "combo",
          domain: "Commission100",
          width: "150px"
        },
        { field: "VoteValue", title: "مقدار رای", width: "200px" },
        { field: "UrbanNidKartablItem", title: "شماره ارجاع", width: "150px" },
        { field: "VoteNo", title: "شماره رای", width: "150px" },
        {
          field: "CI_Commission",
          title: "شماره کمیسیون",
          editor: "combo",
          domain: "Commission100",
          width: "150px"
        },
        {
          field: "CI_CommissionType",
          title: "نوع کمیسیون",
          editor: "combo",
          domain: "Commission100",
          width: "150px"
        },
        { field: "VoteDate", title: "تاریخ رای", width: "100px" },
        { field: "CommissionDate", title: "تاریخ کمیسیون", width: "100px" },
        { field: "Vote_Comments", title: "شرح رای", width: "400px" }
      ],
      commTreDetail: null
    }
  },
  methods: {
    selectVoteIssued ({ dataItem }) {
      console.log(dataItem)
      this.commTreDetail = dataItem.Comm_Trepass
    }
  },
  watch: {
    // "value.IsVotable":{
    //   handler(){
    //     if(this.value.IsVotable===true)
    //     {
    //       debugger
    //        this.isRelapse=false
    //     }
    //   }
    // },
    // isRelapse:{
    //   handler(){
    //     if(this.isRelapse===true)
    //     {
    //       debugger
    //        this.value.IsVotable=false
    //     }
    //   }
    // }
  }
}
</script>
