<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper
      title="تعهد و رضایت"
      vertical
      :padding="false"
      @load="$emit('load')"
    >
      <template #header>
        <form-header-by-nosazi-code
          actions
          v-model="baseNosaziCode"
        />
        <safa-status :result="result" />
        <safa-status :result="saveResult" />
      </template>

      <safa-splitter
        v-model="gridSplitter"
        class="fit"
        horizontal
        style="min-height:250px"
      >
        <template v-slot:before>
          <fit>
            <safa-datatable
              helper="commitment"
              v-model="loadCommitment.Sh_CommitmentCitizen"
              :m="mode"
              @row-click="click"
              :deleteRow="true"
              height="100%"
              max-height="100%"
              title="تعهد"
              @downloadFileClick="downloadFileClick"
            />
          </fit>
        </template>
        <template v-slot:after>
          <fit>
            <safa-datatable
              helper="baseCommitment"
              v-model="loadCommitment.Base_Commitment"
              :m="mode"
              class="fit"
              margin="0"
              height="100%"
              max-height="100%"
              title="تعهد و رضایت"
            />
          </fit>
        </template>
      </safa-splitter>
      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="handleSaveAction"
          @cancel="load"
        >
          <template #after>
            <btn-save
              label="تأیید"
              @click="accept"
            />
          </template>
        </form-actions>

      </template>
    </form-wrapper>
  </safa-form>
</template>
<script>
// import loadCommitmentModel from './models/loadCommitment'
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
import baseFormMixin from "src/mixins/baseFormMixin"
import fileHelper from "src/mixins/fileHelper"

export default {
  route: "/commitment/by-selected-request",
  mixins: [baseFormMixin, fileHelper],
  data () {
    return {
      gridSplitter: 50,
      title: "تعهد و رضایت",
      formKey: "6B462A88-8E97-4B06-A17C-95FA7E278669",
      name: "UTaahodat",
      main: true,
      sidebarCompatible: true,
      result: null,
      letters: [],
      loadCommitment: { Sh_CommitmentCitizen: [], Base_Commitment: [] },
      selectedRow: null,
      saveResult: null,
      uploadComment: "",
      resultResult: null
    }
  },

  computed: {
    config () {
      if (!this.selectedRequest) {
        return {}
      }
      return {
        config: {
          District: convertStringToNosaziCodeObject(
            this.selectedRequest.BizCode
          ).District
        }
      }
    }
  },

  methods: {
    async downloadFileClick (e) {
      await this.getCICommitmentCitizenById(e.dataItem.CI_CommitmentCitizen)
    },

    async getCICommitmentCitizenById (cICommitmentCitizen) {
      this.showLoading()
      try {
        let payLoad = {
          id: cICommitmentCitizen
        }
        const { data } = await this.$services.SC.getCICommitmentCitizenById(
          payLoad
        )
        this.resultResult = this.getResponse(data)
        if (this.resultResult.success) {
          let convertedFile = await this.dataURLtoFile(
            this.resultResult.data.CI_CommitmentCitizenById.TemplateFile,
            this.resultResult.data.CI_CommitmentCitizenById.Title
          )
          await this.downloadFile(convertedFile)
        }
      } catch (e) {
        console.log("save error", e)
      } finally {
        this.hideLoading()
      }
    },
    async load () {
      this.isEditable = false
      try {
        this.showLoading()

        // Fetch letters
        const { data } = await this.$services.SC.loadCommitment(
          {
            pNidProc: this.selectedRequest.NidProc
          },
          this.config
        )
        this.result = this.getResponse(data)

        await this.log({
          action: this.logActions.view,
          bizCode: this.selectedRequest.NidProc,
          bizCodeTitle: "NidProc",
          nosaziCode: this.selectedRequest.BizCode
        })

        if (!this.result.success || !this.result.data["Base_Commitment"]) {
          this.showError("اطلاعات بارگذاری نشد")
          return
        }
        this.loadCommitment = this.result.data

        this.loadCommitment.Sh_CommitmentCitizen.map(x => {
          if (x.IsFromFormul) {
            x.readonly = true
            x.class = "is-from-formul"
          }
        })
      } catch (response) {
        this.serverError()
        console.log("load error", response)
      } finally {
        this.hideLoading()
      }
    },
    normalizeCommitmentCitizen () {
      return this.loadCommitment.Sh_CommitmentCitizen.map(m => {
        return {
          ...m,
          CitizenNationalCode: m.CitizenNationalCode || null,
          IsConfirmByCitizen: m.IsConfirmByCitizen || null,
          IsConfirmByUrbanPlanner: m.IsConfirmByUrbanPlanner || null,
          NidUserUrbanPlanner:
            m.NidUserUrbanPlanner || "00000000-0000-0000-0000-000000000000",
          TmpNidUser: m.TmpNidUser || null,
          NidUserCitizen: m.NidUserCitizen || null,
          IsFromFormul: m.IsFromFormul || null,
          CommitmentNo: m.CommitmentNo || null,
          CreatorNidUser: m.CreatorNidUser || null
        }
      })
    },
    normalizeBaseCommitment () {
      return this.loadCommitment.Base_Commitment.map(m => {
        return {
          ...m,
          CI_CommitmentType: m.CI_CommitmentType || 0,
          CI_Suggest: m.CI_Suggest || 0,
          CommitmentNo: m.CommitmentNo || null,
          IsDoneCommitment: m.IsDoneCommitment || null
        }
      })
    },
    async handleSaveAction () {
      this.showLoading()
      this.loadCommitment.Sh_CommitmentCitizen = this.normalizeCommitmentCitizen()
      this.loadCommitment.Base_Commitment = this.normalizeBaseCommitment()

      await this.$services.SC.saveCommitment(
        {
          pCommitment: this.loadCommitment,
          pUser: this.currentUser,
          pDtoWorkflowData: {
            StateName: "baea57df-4bb2-4ba2-956b-1617ba73a85d",
            WorkflowGuid: "5ca8477d-2a3a-4962-9c63-a8690ff8975c"
          }
        },
        this.config
      )
        .then(async ({ data }) => {
          this.result = this.getResponse(data)
          if (!this.result.success) {
            this.showError("اطلاعات ذخیره نشد")
            return
          }
          this.showSuccess("اطلاعات باموفقیت ذخیره شد")
          this.selectedRow = null
          await this.log({
            action: this.logActions.save,
            bizCode: this.selectedRequest.NidProc,
            bizCodeTitle: "NidProc",
            nosaziCode: this.selectedRequest.BizCode
          })

          this.load()
        })
        .catch(response => {
          console.log("save error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },

    click (row) {
      this.selectedRow = row
    },

    accept () {
      if (this.selectedRow) {
        this.showConfirm("آیا از تأیید ردیف مطمئن هستید؟").onOk(() => {
          this.showLoading()

          let payload = {
            pNidCommitmentCitizen: this.selectedRow.NidCommitmentCitizen,
            pUser: {
              JobLocationGuid: "00000000-0000-0000-0000-000000000000",
              UserGuid: this.getNidUser(),
              UserName: this.getUserDisplayName()
            }
          }

          this.$services.SC.confirmShCommitmentCitizen(payload)
            .then(async ({ data }) => {
              this.saveResult = this.getResponse(data)

              if (this.saveResult.success) {
                this.showSuccess("تأیید موفقیت انجام شد.")
                await this.log({
                  action: this.logActions.confirm,
                  bizCode: this.selectedRequest.NidProc,
                  bizCodeTitle: "NidProc",
                  nosaziCode: this.selectedRequest.BizCode
                })
                this.load()
              }
            })
            .catch(response => {
              this.serverError()
            })
            .finally(() => {
              this.hideLoading()
            })
        })
      } else {
        this.showError("لطفا یک ردیف از جدول تعهد انتخاب نمایید.")
      }
    }
  },

  mounted () {
    if (this.selectedRequest) {
      this.load()
    } else {
      this.showError("لطفا یک ردیف از کارتابل انتخاب نمایید.")
    }
  }
}
</script>
