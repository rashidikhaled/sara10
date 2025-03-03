<template>
  <safa-form
    :id="formKey"
    :caption="title"
    appId="90bba2fe-5569-45b3-9a7b-eb92b3b19ca1"
  >
  <safa-status :result="saveMapResult" />
    <form-wrapper
      :title="title"
      vertical
    >
      <FormRow
        class="q-mb-sm"
        :md="3"
      >
        <FormControl>
          <safa-text
            label="کد ارجاع"
            label-width="80px"
            v-model="getBaseLibInNidWorkItemResult.Sh_RequestInfo.NidWorkItem"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="منطقه"
            label-width="80px"
            v-model="getBaseLibInNidWorkItemResult.MainObj.District"
            :m="mode"
          />
        </FormControl>
        <FormControl>
          <btn-default
            label="جستجو"
            @click="getBaseLibInNidWorkItem"
          />
        </FormControl>
      </FormRow>
      <FormRow
        class="q-mb-sm"
        :md="3"
      >
        <FormControl>
          <safa-text
            label="نام مالک"
            label-width="80px"
            m="r"
            v-model="FullName"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="کد نوسازی"
            label-width="80px"
            m="r"
            v-model="NosaziCode"
          />
        </FormControl>
        <FormControl>
          <safa-text
            label="نوع درخواست"
            label-width="80px"
            v-model="getBaseLibInNidWorkItemResult.Sh_RequestInfo.WorkflowTitel"
            m="r"
          />
        </FormControl>
        <FormControl>
          <safa-datepicker
            label="تاریخ درخواست"
            label-width="80px"
            v-model="getBaseLibInNidWorkItemResult.Sh_RequestInfo.RequestDate"
            m="r"
          />
        </FormControl>
      </FormRow>
      <safa-tabs
        v-model="currentTab"
        height="100%"
        class="fit"
        :padding="false"
      >
        <template v-slot:tabs>
          <tab-menu
            name="baseUsing"
            label="کاربری ها"
          ></tab-menu>
          <tab-menu
            name="baseFront"
            label="پیشامدگی ها"
          ></tab-menu>
          <tab-menu
            name="Parking"
            label="پارکینگ"
          ></tab-menu>
        </template>
        <tab-content
          name="baseUsing"
          title="کاربری ها"
        >
          <TabBaseUsing
            :model="loadMapControlEngineerResult"
            :m="mode"
          />
        </tab-content>
        <tab-content
          name="baseFront"
          title="پیشامدگی ها"
        >
          <TabBaseFront
            :model="loadMapControlEngineerResult"
            :m="mode"
          />
        </tab-content>
        <tab-content
          name="Parking"
          title="پارکینگ"
        >
          <TabParking
            :model="loadMapControlEngineerResult"
            :m="mode"
          />
        </tab-content>
      </safa-tabs>

      <template v-slot:footer>
        <form-actions
          :m="mode"
          @edit="isEditable = true"
          @save="saveData"
          @cancel="isEditable = false"
        >
        </form-actions>
      </template>
      <safa-popup
        title=""
        vertical
        v-model="showBuildingGroupDetails"
      >
        <UBuildingGroupsDetails
          :name="name"
          :title="title"
          :formKey="formKey"
          :model="selectedRow"
        />
      </safa-popup>
    </form-wrapper>
  </safa-form>
</template>

<script>
import baseFormMixin from "src/mixins/baseFormMixin"
import TabBaseUsing from "./partials/TabBaseUsing"
import TabBaseFront from "./partials/TabBaseFront"
import TabParking from "./partials/TabParking"
export default {
  components: { TabBaseUsing, TabBaseFront, TabParking },
  mixins: [baseFormMixin],
  props: {},
  data () {
    return {
      title: "کنترل نقشه",
      formKey: "8b1a8554-3f78-454e-abf1-b5ae5b8335b0",
      name: "UMapControl",
      main: true,
      saveMapResult: null,
      currentTab: "baseUsing",
      selectedRow: {},
      NosaziCode: "",
      getBaseLibInNidWorkItemResult: {
        MainObj: {
          District: 0,
          Region: 0,
          Block: 0,
          House: 0,
          Building: 0,
          Apartment: 0,
          Shop: 0
        },
        // RMainCodeInfo: {

        // },
        Sh_RequestInfo: {
          NidProc: "00000000-0000-0000-0000-000000000000",
          NidWorkItem: "",
          RequestDate: "",
          WorkflowTitel: ""
        },
        NidBaseGlobal: "1dec332e-4e39-4184-84c4-3516855042f9",
        NidBase_Parvandeh_HouseOrDastgah: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000"
      },
      saveModel: {},
      loadMapControlEngineerResult: {
        Base_Front: [],
        Base_Parking: [],
        Base_Using: []
      },
      loadRequestHeaderResult: null,
      showBuildingGroupDetails: false
    }
  },
  methods: {
    normalizeBaseUsing () {
      return this.loadMapControlEngineerResult.Base_Using.map((m) => {
        return {
          ...m,
          NidBase: m.NidBase || "00000000-0000-0000-0000-000000000000",
          NidUsing: m.NidUsing || "00000000-0000-0000-0000-000000000000"
        }
      })
    },
    saveData () {
      if (!this.isValidForm()) return
      this.showLoading()
      this.loadMapControlEngineerResult.Base_Using = this.normalizeBaseUsing()
      let payLoad = {
        pMapControl: {
          // ...this.getBaseLibInNidWorkItemResult,
          ...this.loadMapControlEngineerResult,
          pNidProc: this.getBaseLibInNidWorkItemResult.Sh_RequestInfo.NidProc
        },
        pUser: this.currentUser,
        pDtoWorkflowData: {
          WorkflowGuid: "00000000-0000-0000-0000-000000000000"
        }
      }
      this.$services.SC.saveMapControlEngineer(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          this.saveMapResult = response
          if (response.success) {
            this.showSuccess("عملیات با موفقیت انجام گردید.")
            await this.log({
              action: this.logActions.save,
              bizCode: "",
              bizCodeTitle: ""
            })
            this.isEditable = false
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async getBaseLibInNidWorkItem () {
      if (
        this.getBaseLibInNidWorkItemResult.Sh_RequestInfo.NidWorkItem.length ===
          0 ||
        this.getBaseLibInNidWorkItemResult.MainObj.District === 0
      ) {
        this.showError("لطفا کد ارجاع و منطقه را وارد نمایید ")
        return
      }
      this.showLoading()
      let payLoad = {
        pNidWorkItem:
          this.getBaseLibInNidWorkItemResult.Sh_RequestInfo.NidWorkItem
      }

      await this.$services.SA.getBaseLibInNidWorkItem(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.getBaseLibInNidWorkItemResult = response.data
            this.createNosaziCode()
            await this.loadMapControlEngineer()
            await this.loadRequestHeader()
            await this.log({
              action: this.logActions.view,
              bizCode: "pNidWorkItem",
              bizCodeTitle: "کد درخواست"
            })
          }
        })

        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    createNosaziCode () {
      const res =
        this.getBaseLibInNidWorkItemResult.MainObj.District.toString() +
        "-" +
        this.getBaseLibInNidWorkItemResult.MainObj.Region.toString() +
        "-" +
        this.getBaseLibInNidWorkItemResult.MainObj.Block.toString() +
        "-" +
        this.getBaseLibInNidWorkItemResult.MainObj.House.toString() +
        "-" +
        this.getBaseLibInNidWorkItemResult.MainObj.Building.toString() +
        "-" +
        this.getBaseLibInNidWorkItemResult.MainObj.Apartment.toString() +
        "-" +
        this.getBaseLibInNidWorkItemResult.MainObj.Shop.toString()
      this.NosaziCode = res
    },
    async loadMapControlEngineer () {
      this.showLoading()
      let payLoad = {
        pNidProc: this.getBaseLibInNidWorkItemResult.Sh_RequestInfo.NidProc
      }
      await this.$services.SC.loadMapControlEngineer(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.loadMapControlEngineerResult = response.data
            await this.log({
              action: this.logActions.view,
              bizCode: "pNidProc",
              bizCodeTitle: "کد درخواست"
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    },
    async loadRequestHeader () {
      this.showLoading()
      let payLoad = {
        pNidProc: this.getBaseLibInNidWorkItemResult.Sh_RequestInfo.NidProc,
        pIsLoadDeletedNosaziCode: false
      }
      await this.$services.SA.loadRequestHeader(payLoad)
        .then(async ({ data }) => {
          const response = this.getResponse(data)
          if (response.success) {
            this.loadRequestHeaderResult = response.data
            await this.log({
              action: this.logActions.view,
              bizCode: "pNidProc",
              bizCodeTitle: "کد درخواست"
            })
          }
        })
        .catch((res) => {
          console.error(res)
        })
        .finally(() => {
          this.hideLoading()
        })
    }
  },
  computed: {
    FullName () {
      if (this.loadRequestHeaderResult !== null && this.loadRequestHeaderResult.Base_Owner.length > 0) {
        return (
          this.loadRequestHeaderResult.Base_Owner[0].OwnerName + " " + this.loadRequestHeaderResult.Base_Owner[0].OwnerLastName
        )
      } else return ''
    }
  }
}
</script>
