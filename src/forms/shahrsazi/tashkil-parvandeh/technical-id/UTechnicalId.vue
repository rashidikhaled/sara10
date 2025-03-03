<template>
 <safa-form
    :id="formKey"
    :caption="title"
    app-id="ace63a06-e835-457d-a1ea-3b477dd9e69b"
  >
  <form-wrapper title="شناسنامه فنی" vertical @load="$emit('load')">
    <template v-slot:header>
      <form-header />
    </template>
    <safa-form :id="formKey" :caption="title">
      <safa-status :reuslt="loadResult" />
      <safa-status :reuslt="saveResult" />
      <fit>
        <div class="q-mb-sm">
          <div class="row q-col-gutter-md">
            <div class="col-lg col-sm-4 col-12">
              <safa-combo
                ciName="CI_ViewCode"
                domainName="CI_SaraM1"
                label="نمای شمالی"
                :m="mode"
                label-width="60px"
                v-model="north"
              ></safa-combo>
            </div>

            <div class="col-lg col-sm-4 col-12">
              <safa-combo
                ciName="CI_ViewCode"
                domainName="CI_SaraM1"
                label="نمای شرقی"
                label-width="60px"
                :m="mode"
                v-model="east"
              ></safa-combo>
            </div>
            <div class="col-lg col-sm-4 col-12">
              <safa-combo
                ciName="CI_ViewCode"
                domainName="CI_SaraM1"
                label-width="60px"
                label="نمای جنوبی"
                :m="mode"
                v-model="south"
              ></safa-combo>
            </div>
            <div class="col-lg col-sm-4 col-12">
              <safa-combo
                ciName="CI_ViewCode"
                domainName="CI_SaraM1"
                label-width="60px"
                label="نمای غربی"
                :m="mode"
                v-model="west"
              ></safa-combo>
            </div>
            <div class="col-lg col-sm-4 col-12">
              <safa-combo
                ciName="CI_InstallationType"
                domainName="CI_SaraM1"
                label-width="60px"
                label="تاسیسات"
                :m="mode"
                v-model="installation"
              ></safa-combo>
            </div>
          </div>
        </div>
        <safa-datatable
          v-model="results.Sh_ShenasnameFani"
          ref="grid"
          name="grid"
          helper="technicalId"
          :m="mode"
          @row-click="click"
          :selectable="true"
          :allowMultipleSelection="false"
          fit
          height="100%"
          max-height="100%"
          :allowCopy="true"
          :copyWithCount="true"
          title="شناسنامه فنی"
        />
      </fit>
    </safa-form>
    <template v-slot:footer>
      <div>
        <FormActions
          :m="mode"
          @edit="isEditable = true"
          @cancel="loadData()"
          @save="save"
        ></FormActions>
      </div>
    </template>
  </form-wrapper>
 </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import { convertStringToNosaziCodeObject } from "src/utils/nosaziCodeOperation"
export default {
  route: "parvandeh/technical-id",

  data () {
    return {
      title: "شناسه فنی",
      formKey: "DD381B19-DEF5-4957-BA5A-A6499828A90D",
      name: "UTechnicalId",
      main: true,
      workflowCompatible: true,
      items: [],
      // loadPrequest: {
      //   pNidProc: this.selectedRequestInKartable.NidProc
      // },
      loadResult: null,
      formActionEditMode: "r",
      countCopyMode: "r",
      disableCopyBtn: true,
      count: 0,
      selectedRow: null,
      results: { Sh_ShenasnameFani: [] },
      saveResult: null,
      north: null,
      east: null,
      south: null,
      west: null,
      installation: null,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      }
    }
  },
  watch: {
    isEditable () {
      if (this.isEditable) {
        this.disableCopyBtn = false
        this.countCopyMode = "e"
      } else {
        this.disableCopyBtn = true
        this.countCopyMode = "r"
        this.count = 0
      }
    }
  },
  mixins: [baseFormMixin],
  mounted () {
    if (this.selectedRequest) {
      this.baseNosaziCode = convertStringToNosaziCodeObject(
        this.selectedRequest.BizCode
      )
      this.loadData()
    } else {
      this.showError("هیچ درخواستی در کارتابل انتخاب نشده است.")
    }
  },
  methods: {
    save () {
      this.saveShShenasnameFani()
    },
    loadData () {
      const isItemInKartablSelected = this.isSelectedRequest()
      if (isItemInKartablSelected) {
        let payLoad = { pNidProc: this.selectedRequest.NidProc }

        this.showLoading()

        this.$services.SC.getShShenasnameFani(payLoad, {
          config: {
            District: this.baseNosaziCode.District
          }
        })
          .then(async (response) => {
            this.loadResult = this.getResponse(response.data)

            if (this.loadResult.success) {
              this.results = this.loadResult.data
              if (this.results.Sh_ShenasnameFani.length > 0) {
                this.north = this.results.Sh_ShenasnameFani[0].NorthView
                this.east = this.results.Sh_ShenasnameFani[0].EastView
                this.south = this.results.Sh_ShenasnameFani[0].SouthView
                this.west = this.results.Sh_ShenasnameFani[0].WestView
                this.installation =
                  this.results.Sh_ShenasnameFani[0].CI_InstallationType
                await this.log({
                  action: this.logActions.view,
                  bizCode: payLoad,
                  bizCodeTitle: "pNidProc",
                  nosaziCode: this.selectedRequest.BizCode
                })
              }
            }

            this.hideLoading()
          })
          .catch((response) => {
            console.debug("error", response)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      }
    },
    normalizeShenasnameFani () {
      return this.results.Sh_ShenasnameFani.map((m) => {
        return {
          ...m,
          Area: m.Area || 0,
          BuildingNo: m.BuildingNo || 0,
          CI_InstallationType: m.CI_InstallationType || 0,
          CI_UsingGroup: m.CI_UsingGroup || 0,
          CI_UsingType: m.CI_UsingType || 0,
          EastView: m.EastView || 0,
          FloorNo: m.FloorNo || 0,
          JointsArea: m.JointsArea || 0,
          NorthView: m.NorthView || 0,
          ParkingArea: m.ParkingArea || 0,
          ParkingNo: m.ParkingNo || 0,
          SouthView: m.SouthView || 0,
          UnitNo: m.UnitNo || 0,
          WarehouseArea: m.WarehouseArea || 0,
          WarehouseNo: m.WarehouseNo || 0,
          WestView: m.WestView || 0
        }
      })
    },
    saveShShenasnameFani () {
      this.showSending()
      if (this.results.Sh_ShenasnameFani.length > 0) {
        this.results.Sh_ShenasnameFani[0].NorthView = this.north
        this.results.Sh_ShenasnameFani[0].EastView = this.east
        this.results.Sh_ShenasnameFani[0].SouthView = this.south
        this.results.Sh_ShenasnameFani[0].WestView = this.west
        this.results.Sh_ShenasnameFani[0].CI_InstallationType =
          this.installation
      }
      this.results.Sh_ShenasnameFani = this.normalizeShenasnameFani()
      this.results._NidProc = this.selectedRequest.NidProc
      let payLoad = {
        pClsShenasnameFani: this.results,
        pDtoWorkflowData: {
          StateName: "",
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        },
        pNidProc: this.selectedRequest.NidProc,
        pUser: this.currentUser
      }

      this.$services.SC.saveShShenasnameFani(payLoad, {
        config: {
          District: this.baseNosaziCode.District
        }
      })
        .then(async (response) => {
          this.saveResult = this.getResponse(response.data)
          if (this.saveResult.success) {
            this.showSuccess("عملیات با موفقیت انجام شد")
            this.loadData()
            this.isEditable = false
            await this.log({
              action: this.logActions.save,
              bizCode: this.selectedRequest.NidProc,
              bizCodeTitle: "pNidProc",
              nosaziCode: this.selectedRequest.BizCode
            })
          }
        })
        .catch((response) => {
          console.debug("error", response)
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    click (row) {
      this.selectedRow = row
    }
  }
}
</script>
