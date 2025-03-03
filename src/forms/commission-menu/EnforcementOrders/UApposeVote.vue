<template>
    <safa-form
    :id="formKey"
    :caption="title"
    app-id="badbf938-ee27-414f-8df4-6fa440f8fa70"
  >
    <form-wrapper :title="title" vertical>
      <FormRow class="q-mb-sm" :lg="4" :xl="4" :md="3" :sm="3">
        <FormControl>
          <safa-text
            label="شماره دبیرخانه"
            label-width="70px"
            v-model="model.CommissionInfo.SecretariatNo"
            cdcName="SecretariatNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ارجاع"
            label-width="70px"
            v-model="model.CommissionInfo.UrbanNidKartablItem"
            cdcName="UrbanNidKartablItem"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="70px"
            v-model="model.CommissionInfo.OwnerName"
            cdcName="OwnerName"
            m="r"
          />
        </FormControl>
        <FormControl>
          <nosazi-code-input
            label="کد نوسازی"
            v-model="baseNosaziCode"
            cdcName="baseNosaziCode"
            style="margin-right: 70px"
            m="r"
          >
          </nosazi-code-input>
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره ابلاغ"
            label-width="70px"
            v-model="model.ClsCommission_Impart.Commission_Impart.ImpartNo"
            cdcName="ImpartNo"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ ابلاغ"
            label-width="70px"
            v-model="model.ClsCommission_Impart.Commission_Impart.ImpartDate"
            cdcName="ImpartDate"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-text label="شماره رای" label-width="70px" m="r" />
        </FormControl>
        <FormControl>
          <safa-datepicker label="تاریخ رای " label-width="70px" m="r" />
        </FormControl>
        <FormControl>
          <safa-text
            label="شماره اعتراض"
            label-width="70px"
            v-model="
              model.ClsCommission_ApposeVote.Commission_ApposeVote.ApposeVoteNo
            "
            cdcName="ApposeVoteNo"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ اعتراض"
            label-width="70px"
            v-model="
              model.ClsCommission_ApposeVote.Commission_ApposeVote
                .ApposeVoteDate
            "
            cdcName="ApposeVoteDate"
            :m="mode"
          />
        </FormControl>
        <safa-securityPanel
          id="116b4bf2-a064-4a62-910b-e28df98173ab"
          caption="اعتراض در خارج از مهلت مقرر"
        >
          <FormControl>
            <safa-text
              label="اعتراض در خارج از مهلت مقرر"
              label-width="70px"
              v-model="
                model.ClsCommission_ApposeVote.Commission_ApposeVote
                  .ApposeOutsideDeadline
              "
              cdcName="ApposeOutsideDeadline"
              m="r"
            />
          </FormControl>
        </safa-securityPanel>
      </FormRow>
      <div class="row">
        <safa-text
          label="آدرس"
          label-width="70px"
          v-model="model.CommissionInfo.Address"
          cdcName="Address"
          class="col-12 q-mb-sm"
          type="textarea"
          rows="2"
          m="r"
        />
        <text-template
          label="توضیحات"
          v-model="
            model.ClsCommission_ApposeVote.Commission_ApposeVote.ApposeVoteDesc
          "
          cdcName="ApposeVoteDesc"
          :rows="3"
          class="col-12"
          label-width="70px"
          :m="mode"
        />
      </div>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveData"
        >
          <template #after>
            <div>
              <!-- <safa-uploader
                label="بارگذاری فایل"
                @change="selectFile"
                class="col-12 col-sm-5 col-md-3 col-lg-3"
              /> -->
              <safa-file-uploader
                label="بارگذاری فایل"
                label-width="90px"
                cdcName="File"
                :max-size="5"
                type=".WRD,.TXT,.DAT"
                @change="changeFile"
                required
                validations="required"
                class="col-12 col-sm-5 col-md-3 col-lg-3"
              />
            </div>
          </template>
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import kartableCommissionMixin from "src/forms/commission-menu/mixins/kartableCommissionMixin.js"

export default {
  components: {},
  mixins: [baseFormMixin, kartableCommissionMixin],
  props: {},
  data () {
    return {
      title: "ثبت اعتراض به رای",
      formKey: "42A54D19-7FEE-491D-81EC-012E8DF2602F",
      name: "UApposeVote",
      main: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      model: {
        CommissionInfo: {
          SecretariatNo: "",
          UrbanNidKartablItem: 0,
          OwnerName: "",
          Address: ""
        },
        ClsCommission_Impart: {
          Commission_Impart: {
            ImpartNo: "",
            ImpartDate: ""
          }
        },
        ClsCommission_ApposeVote: {
          Commission_ApposeVote: {
            ApposeVoteNo: 0,
            ApposeVoteDate: "",
            ApposeOutsideDeadline: "",
            ApposeVoteDesc: ""
          }
        }
      },
      files: [],
      fileContent: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      try {
        this.showLoading()
        let payLoad = {
          PRequest: {
            NIDCommission: this.selectedNidCommission
              ? this.selectedNidCommission
              : "00000000-0000-0000-0000-000000000000",
            // NIDCommission: "aa97d806-8422-4530-8ee3-272dc26f868f",
            NIDVote: "00000000-0000-0000-0000-000000000000",
            NidProc: "00000000-0000-0000-0000-000000000000",
            ISRelapse: false,
            IsRegion: false,
            IsdeleteArchive: false,
            NidAgent: "00000000-0000-0000-0000-000000000000",
            NidTaskState: "00000000-0000-0000-0000-000000000000",
            NidUser: "00000000-0000-0000-0000-000000000000"
          }
        }
        const { data } =
          await this.$services.commissions.getAllCommissionDetails(payLoad)
        this.result = this.getResponse(data)
        if (
          this.result.success &&
          this.result.data.GetAllCommissionDetailsResult
        ) {
          this.model = { ...this.result.data.GetAllCommissionDetailsResult }
          await this.log({
            action: this.logActions.view,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `بارگذاری اطلاعات  ${this.title} انجام گردید.`
          })
        }
      } catch (error) {
        console.error("load error", error)
      } finally {
        this.hideLoading()
      }
    },
    async saveData () {
      try {
        this.showLoading()
        let payLoad = {
          PRequest: {
            ...this.model
          }
        }
        const { data } =
          await this.$services.commissions.saveCommissioApposeVote(payLoad)
        this.result = this.getResponse(data)
        if (this.result.success) {
          this.showSuccess("ذخیره با موفقیت انجام شد.")
          await this.log({
            action: this.logActions.save,
            bizCode: "",
            bizCodeTitle: "",
            saveDesc: `ذخیره اطلاعات  ${this.title} انجام گردید.`
          })
        }
      } catch (error) {
        console.error("load error", error)
      } finally {
        this.hideLoading()
      }
    },
    readFile (event) {
      this.fileContent = event.target.result.split('\r\n')
    },
    changeFile (file) {
      var reader = new FileReader()
      reader.addEventListener("load", this.readFile)
      reader.readAsText(file)
      this.files = file
    }
  }
}
</script>
