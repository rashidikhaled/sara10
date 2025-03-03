<template>
  <safa-form
    :id="formKey"
    :caption="title"
    app-id="ACE63A06-E835-457D-A1EA-3B477DD9E69B"
  >
    <form-wrapper vertical title="مشخصات آسانسورها" :padding="false">
      <template #header>
        <form-header-by-nosazi-code
          v-model="baseNosaziCode"
          @fetched="fetchedData"
        />
        <safa-status :result="revokeResult" />
        <safa-status :result="elevatorResult" />
        <safa-status :result="baseLibResult" />
      </template>
      <safa-datatable
        :m="mode"
        @selectedChange="selectedChange"
        v-model="elevatorResults.Base_Elevator"
        ref="grid2"
        helper="elevatorSpec"
        fit
        :bordered="false"
        max-height="100%"
        height="100%"
        minHeight="100%"
        title="مشخصات آسانسورها"
      ></safa-datatable>
      <template v-slot:footer>
        <div class="row q-gutter-sm">
          <btn-new
            label="جدید"
            @click="newElevatorClick"
            spId="0474fb70-1f3a-4fa8-a9e4-a3c3a48577df"
            spCaption="جدید"
          />
          <btn-new
            label="جدید (ورود اطلاعات توسط کاربر)"
            spId="c11d84cd-7ff7-4d13-81ab-de548bf82dd2"
            spCaption="جدید (ورود اطلاعات توسط کاربر)"
            @click="newElevatorManualClick"
          />
          <btn-default
            label="ابطال"
            @click="revoke"
            :disable="disableReokeBtn"
            spId="12aafa6c-d701-4297-9793-0beb4336a947"
            spCaption="ابطال"
          />
        </div>
      </template>
    </form-wrapper>
    <div>
      <safa-popup
        height="510px"
        v-model="newElevator"
        title="اضافه کردن آسانسور"
        :padding="false"
      >
          <ElevatorSpecificationNew
            :nidBase="nidBase"
            @backToElevatorSpecification="backToElevatorSpecification"
            :formKey="formKey"
            :title="title"
            :name="name"
            :baseNosaziCode="baseNosaziCode"
            ref="newElevatorref"
          />
      </safa-popup>

      <safa-popup
      title="اضافه کردن آسانسور"
      v-model="newElevatorManual"
       :padding="false">
        <ElevatorSpecificationManual
          :nidBase="nidBase"
          :formKey="formKey"
          :title="title"
          :name="name"
          :baseNosaziCode="baseNosaziCode"
          @closeManualAddElevatorForm="closeManualAddElevatorForm"
        />
      </safa-popup>
    </div>
  </safa-form>
</template>
<script>
import ElevatorSpecificationNew from "./partials/ElevatorSpecificationNew"
import ElevatorSpecificationManual from "./partials/ElevatorSpecificationManual"
import baseFormMixin from "src/mixins/baseFormMixin"
import loaderMixin from "src/mixins/loaderMixin"
import { convertNosaziCodeObjectToString } from "../../../../utils/nosaziCodeOperation"
export default {
  route: "/elevator-specification",
  mixins: [baseFormMixin, loaderMixin],
  main: true,
  data: function () {
    return {
      title: "شهرسازی- مشخصات آسانسورها",
      formKey: "58d7df49-a52e-42e1-a4d1-581a02245c6f",
      name: "ElevatorSpecification",
      main: true,
      sidebarCompatible: true,
      newElevator: false,
      newElevatorManual: false,
      // elevatorSpecForm: true,
      baseNosaziCode: {
        District: 0,
        Region: 0,
        Block: 0,
        House: 0,
        Building: 0,
        Apartment: 0,
        Shop: 0
      },
      baseLibResult: null,
      baseLibResults: {
        Base_AddressInfo: {},
        Base_Owner: [],
        Base_PreCodeInfo: [],
        BuildingObj: {},
        Sh_RequestInfo: {},
        MainObj: {}
      },
      ownerName: "",
      oldNosaziCode: "",
      nosaziCode: "",
      elevatorResult: null,
      elevatorResults: {
        Base_Elevator: []
      },
      nidBase: "",
      disableReokeBtn: true,
      nidElevator: "",
      revokeResult: null,
      revokeResults: {},
      fetchNidBase: "00000000-0000-0000-0000-000000000000"
    }
  },
  components: {
    ElevatorSpecificationNew,
    ElevatorSpecificationManual
  },
  methods: {
    fetchedData (value) {
      this.fetchNidBase = value.MainObj.NidBase
      if (value) {
        this.loadElevator()
      }
    },
    loadElevator () {
      let data = { pNidBase: this.fetchNidBase }
      this.showLoading()
      this.$services.SC.loadElevator(data)
        .then(async ({ data }) => {
          this.elevatorResult = this.getResponse(data)
          if (this.elevatorResult.success) {
            this.elevatorResults = this.elevatorResult.data
            await this.log({
              action: this.logActions.view,
              bizCode: this.fetchNidBase,
              bizCodeTitle: "pNidBase",
              nosaziCode: convertNosaziCodeObjectToString(this.baseNosaziCode)
            })
          }
        })
        .catch(({ data }) => {
          this.serverError()
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    newElevatorClick () {
      this.newElevator = true
      // this.elevatorSpecForm = true
      this.nidBase = this.fetchNidBase
    },
    newElevatorManualClick () {
      this.newElevatorManual = true
      this.nidBase = this.fetchNidBase
    },
    closeManualAddElevatorForm (val) {
      if (val) {
        // this.elevatorSpecForm = true
        this.newElevatorManual = false
        this.loadElevator()
      }
    },
    backToElevatorSpecification (val) {
      if (val) {
        // this.elevatorSpecForm = true
        this.newElevator = false
        this.loadElevator()
      }
    },
    selectedChange (e) {
      this.nidElevator = e.dataItem.NidElevator
      if (!e.dataItem.IsRevoke) {
        this.disableReokeBtn = false
      }
    },
    revoke () {
      this.showConfirm(" آیا از ابطال این آیتم اطمینان دارید؟").onOk(() => {
        let data = {
          pUser: this.currentUser,
          pNidElevator: this.nidElevator
        }
        this.showLoading()
        this.$services.SC.revokeElevator(data)
          .then(async ({ data }) => {
            this.revokeResult = this.getResponse(data)
            if (this.revokeResult.success) {
              this.revokeResults = this.revokeResult.data
              this.loadElevator()
              this.showSuccess("موفقیت آمیز")

              await this.log({
                action: this.logActions.cancel,
                bizCode: this.fetchNidBase,
                bizCodeTitle: "NidBase",
                nosaziCode: convertNosaziCodeObjectToString(
                  this.baseNosaziCode
                )
              })
            }
          })
          .catch(({ data }) => {
            this.revokeResult = this.getResponse(data)
            this.serverError()
          })
          .finally(() => {
            this.hideLoading()
          })
      })
    }
  }
}
</script>
