<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="BEA0DE7D-9883-48E2-8A7B-9A30D8525255"
  >
    <form-wrapper :title="title" :hideTitle="hideTitle">
      <template #header>
        <safa-status :result="loadObjRes" />
        <safa-status :result="saveObjRes" />
        <safa-status :result="deleteObjRes" />
      </template>
      <fit>
        <!-- <safa-securityPanel
          id="FA25F718-16E2-4C36-AEBB-2297729078A3"
          caption="مشخصات متصرف/متصرفین"
        > -->
        <div class="fit q-pa-sm">
          <safa-splitter v-model="splitterModel" vertical>
            <template v-slot:before>
              <fit class="q-pa-sm">
                <safa-grid
                  v-model="model.Seizin_Occupier"
                  cdcName="Seizin_Occupier"
                  title="مشخصات متصرف/مترفین"
                  helper="agSeizinOccupierColumns"
                  :suppressRowClickSelection="false"
                  min-height="200px"
                  height="100%"
                  max-height="100%"
                  fit
                  :m="mode"
                  class="q-mb-sm"
                />
              </fit>
            </template>
            <template v-slot:after>
              <fit class="q-pa-sm">
                <!-- </safa-securityPanel>
        <safa-securityPanel
          id="F901DD12-C17A-4F10-B4ED-0A83988E399C"
          caption="نوع تصرف"
        > -->
                <safa-grid
                  v-model="model.Seizin_Type"
                  cdcName="Seizin_Type"
                  title="نوع تصرف"
                  helper="agSeizinTypeColumns"
                  min-height="200px"
                  height="100%"
                  max-height="100%"
                  fit
                  :m="mode"
                />
              </fit>
            </template>
          </safa-splitter>
        </div>
        <!-- </safa-securityPanel> -->
        <FormRow class="q-mt-sm">
          <text-template
            v-model="model.Seizin_Info.Description"
            cdcName="Description"
            formKey="B548F298-76F2-4500-B799-64B795E1D1D6"
            label="توضیحات"
            class="col-12"
            :rows="1"
            :m="mode"
          />
          <safa-checkbox
            label="رفع تصرف شده است."
            v-model="model.Seizin_Info.IsStop"
            cdcName="IsStop"
            :m="mode"
          />
        </FormRow>
      </fit>
      <template #footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @cancel="isEditable = false"
          @save="saveObj"
        >
          <btn-default label="حذف" @click="deleteObj" />
        </form-actions>
      </template>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"

export default {
  mixins: [baseFormMixin],
  props: {
    hideTitle: {
      type: Boolean,
      default: false
    },
    currentObj: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      title: "تصرف",
      formKey: "DFBCD09C-A734-4424-B845-F9E33516EB06",
      name: "USeizin",
      main: true,

      loadObjRes: null,
      saveObjRes: null,
      deleteObjRes: null,
      NIdSeizin: "00000000-0000-0000-0000-000000000000",

      model: {
        Seizin_Occupier: [],
        Seizin_Type: [],
        Seizin_Info: {
          Description: null,
          IsStop: false,
          NIdCopy_tmp: 0,
          NId_tmp: 0
        }
      },
      splitterModel: 50
    }
  },

  methods: {
    loadObj () {
      this.isEditable = false
      this.showLoading()
      const payload = {
        pNIdProc:
          this.selectedRequest.NidProc ||
          "00000000-0000-0000-0000-000000000000"
      }
      this.$services.ES.getSeizinInfo(payload)
        .then(async ({ data }) => {
          this.loadObjRes = this.getResponse(data)
          if (this.loadObjRes.success) {
            const res = this.loadObjRes.data.GetSeizin_InfoResult
            this.NIdSeizin = res.Seizin_Info.NIdSeizin
            this.model = {
              ...res,
              Seizin_Occupier: res.Seizin_Occupier ?? [],
              Seizin_Type: res.Seizin_Type ?? [],
              Seizin_Info: {
                ...res.Seizin_Info,
                Description: res?.Seizin_Info?.Description ?? null,
                IsStop: res?.Seizin_Info?.IsStop ?? false
              }
            }
            await this.log({
              action: this.logActions.view,
              bizCode: payload.pNIdProc,
              bizCodeTitle: "pNIdProc",
              saveDesc: `بارگذاری اطلاعات فرم ${this.title} انجام گردید `
            })
          }
        })

        .catch((e) => {
          console.error(e)
        })

        .finally(() => {
          this.hideLoading()
        })
    },

    saveObj () {
      this.showLoading()
      this.$services.ES.saveSeizinInfo({ PObj: this.model })
        .then(async ({ data }) => {
          this.saveObjRes = this.getResponse(data)
          if (this.saveObjRes.success) {
            this.model = this.saveObjRes.data.GetSeizin_InfoResult
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.model?.Seizin_Info?.NIdSeizin ?? "",
              bizCodeTitle: "NIdSeizin",
              saveDesc: `ذخیره اطلاعات فرم ${this.title} انجام گردید `
            })
            this.showSuccess("ذخیره اطلاعات با موفقیت انجام شد")
          }
        })

        .catch((e) => {
          console.error(e)
        })

        .finally(() => {
          this.hideLoading()
        })
    },

    deleteObj () {
      this.showConfirm("آیا از حذف اطلاعات اطمینان دارید؟").onOk(() => {
        const delSeizinInfo = async () => {
          try {
            const payload = {
              PNIdSeizin:
                this.NIdSeizin || "00000000-0000-0000-0000-000000000000"
            }
            this.showLoading()
            const { data } = await this.$services.ES.delSeizinInfo(payload)
            this.deleteObjRes = this.getResponse(data)
            if (this.deleteObjRes.success) {
              this.showSuccess("حذف اطلاعات با موفقیت انجام شد")
              await this.log({
                action: this.logActions.delete,
                bizCode: this.selectedRequest.NidProc ?? "",
                bizCodeTitle: "NIdProc",
                saveDesc: `حذف اطلاعات در فرم ${this.title} با موفقیت انجام شد`
              })
              this.loadObj()
            }
          } catch (e) {
            console.error(e)
          } finally {
            this.hideLoading()
          }
        }
        delSeizinInfo()
      })
    }
  },

  mounted () {
    this.loadObj()
  }
}
</script>
