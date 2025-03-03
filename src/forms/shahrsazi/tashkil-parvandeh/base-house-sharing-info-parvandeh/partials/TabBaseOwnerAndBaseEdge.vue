<template>
  <fit>
    <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <safa-grid
            title="مالکین"
            :columns="baseOwner"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            :emptyRowLimit="1"
            fit
            ref="baseOwner"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            helper="baseEdge"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            title="جهات اربعه"
            :selectable="false"
            :emptyRowLimit="1"
            fit
          />
        </fit>
      </template>
    </safa-splitter>
    <safa-popup
      title="استعلام ثبت احوال"
      v-model="showCheckSabtModal"
      width="300px"
      height="300px"
    >
      <u-check-sabteahval
        :baseNosaziCode="baseNosaziCode"
        :settingData="settingData"
        @changeDataAfterEstelam="changeDataAfterEstelam"
      />
    </safa-popup>
  </fit>
</template>

<script>
import { currentDate } from "src/utils/index"
import UCheckSabteahval from '../../check-sabteahval/UCheckSabteahval.vue'
export default {
  components: { UCheckSabteahval },
  name: "TabBaseOwnerAndBaseEdge",

  props: {
    m: String,
    baseNosaziCode: Object,
    value: {
      type: Object,
      default: () => ({})
    },
    settingData: {
      type: Object,
      default: () => ({
        Chk_IsCheckSabt: false,
        Chk_IsCheckSabtJson: false,
        Chk_IsCheckSabtWCF: false
      })
    }
  },
  data () {
    return {
      splitterModel: 50,
      showCheckSabtModal: false,
      isJson: false,
      isWCF: false,
      baseOwner: [
        {
          field: "EumOwnerCharacter",
          title: "نوع مالکیت",
          editor: "combo",
          source: [
            { ID: "1", Title: "حقیقی" },
            { ID: "2", Title: "حقوقی" },
            { ID: "3", Title: "اتباع خارجی" }
          ],
          width: "150px"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگي متصدی شغل/شخصيت حقوقی",
          width: "120px"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: "120px"
        },
        {
          field: "DateCheckSabt",
          title: "تاریخ استعلام ثبت احوال",
          editor: "date",
          width: "100px"
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر/کد سازمانی",
          width: "120px"
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه/شماره ثبت",
          width: "100px"
        },
        {
          field: "EmissionPlace",
          title: "محل صدور",
          width: "100px"
        },
        {
          field: "NationalCode",
          title: "كد ملي",
          width: "100px"
        },
        {
          field: "Telephone",
          title: "تلفن",
          width: "100px"
        },
        {
          field: "CellPhone",
          title: "شماره تلفن همراه",
          width: "100px"
        },
        {
          field: "ToftImpart",
          title: "سهم عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "OwnerDong",
          title: "دانگ عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "ToftHabeh",
          title: "حبه عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanImpart",
          title: "سهم عیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanDang",
          title: "دانگ عیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanHabeh",
          title: "حبه عیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "200px"
        },
        {
          field: "EconomicID",
          title: "شناسه اقتصادی",
          width: "100px"
        },
        {
          field: "ToftTotalImpart",
          title: "سهم کل از عرصه",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "AyanTotalImpart",
          title: "سهم کل از عیان",
          editor: "numeric",
          width: "100px"
        },
        {
          field: "DocNo",
          title: "شماره سند",
          width: "100px"
        },
        {
          field: "ActDate",
          title: "تاریخ اثر",
          editor: "date",
          width: "100px"
        },
        {
          field: "BirthDate",
          title: "تاریخ تولد مالک",
          editor: "date",
          width: "100px"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "200px"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          width: "100px"
        },
        {
          field: "PostCode",
          title: "کدپستی",
          width: "150px"
        }
      ]
    }
  },
  computed: {
    columnGenerateCheckSabt () {
      return {
        field: "",
        title: "استعلام ثبت احوال",
        editor: "action",
        width: "131px",
        btnTitle: "استعلام ثبت احوال",
        btnColor: "primary",
        btnIcon: "how_to_reg",
        cellRenderer: "agCallbackBtn",
        callback: (params) => this.showCheckSabtModalHandler(params)
      }
    }
  },
  watch: {
    settingData: {
      handler () {
        if (this.settingData.Chk_IsCheckSabt === true) {
          // if settingData.Chk_IsCheckSabt is true , we must to show columnGenerateCheckSabt col in grid
          this.addNewColToColumns(
            this.baseOwner,
            this.columnGenerateCheckSabt,
            3
          )
        }
      },
      immediate: true
    }
  },
  methods: {
    addNewColToColumns (arr = [], newObj = {}, position = 4) {
      let insertIndex = Math.min(position, arr.length)
      arr.splice(insertIndex, 0, newObj)
    },
    newGuid () {
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
        /[xy]/g,
        function (c) {
          var r = (Math.random() * 16) | 0,
            v = c === "x" ? r : (r & 0x3) | 0x8
          return v.toString(16)
        }
      )
    },
    showCheckSabtModalHandler (params) {
      if (!params.hasOwnProperty("uniqueId")) {
        for (let i = 0; i < this.value.Base_Owner.length; i++) {
          if (!this.value.Base_Owner[i].uniqueId) {
            this.value.Base_Owner[i].uniqueId = this.newGuid()
          }
        }
      }
      if (this.m === "r") {
        return this.showError("لطفا فرم را در حالت ویرایش قرار دهید.")
      }
      this.showCheckSabtModal = true
      this.params = params
    },
    changeDataAfterEstelam ({ estelamModel, typeOfServ }) {
      if (!this.isValidForm()) return
      if (!typeOfServ) {
        return this.showError(
          "لطفا کدملی و تاریخ تولد خود را جهت استعلام وارد نمایید و دکمه استعلام را بزنید."
        )
      }
      if (typeOfServ === "isJson") {
        this.isJson = true
        this.isWCF = false
      }
      if (typeOfServ === "isWCF") {
        this.isJson = false
        this.isWCF = true
      }
      if (this.isJson) {
        const res = estelamModel
        console.log("res :>> ", res)
        for (let i = 0; i < this.value.Base_Owner.length; i++) {
          if (this.value.Base_Owner[i].uniqueId === this.params.uniqueId) {
            this.value.Base_Owner[i].Name =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].PersonName =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].NationalCode = res.PersonInfo.nationalCode
            this.value.Base_Owner[i].FirstName = res.PersonInfo.name
            this.value.Base_Owner[i].LastName = res.PersonInfo.family
            this.value.Base_Owner[i].FatherName = res.PersonInfo.fatherName
            this.value.Base_Owner[i].BirthDate = res.PersonInfo.birthDate
            this.value.Base_Owner[i].BirthYear = parseInt(res.PersonInfo.birthDate.split('/')[0])
            this.value.Base_Owner[i].OfficeName = res.PersonInfo.officeName
            this.value.Base_Owner[i].ShenasnamehNo =
              res.PersonInfo.shenasnameNo

            this.value.Base_Owner[i].OwnerName = res.PersonInfo.name
            this.value.Base_Owner[i].OwnerLastName = res.PersonInfo.family
            this.value.Base_Owner[i].OwnerFatherName =
              res.PersonInfo.fatherName
            this.value.Base_Owner[i].EmissionPlace = res.PersonInfo.officeName
            this.value.Base_Owner[i].IDCardNo = res.PersonInfo.shenasnameNo
            this.value.Base_Owner[i].DateCheckSabt = currentDate()
          }
        }
      }
      if (this.isWCF) {
        const res = estelamModel
        console.log("res :>> ", res)
        for (let i = 0; i < this.value.Base_Owner.length; i++) {
          if (this.value.Base_Owner[i].uniqueId === this.params.uniqueId) {
            // OwnerName: res.PersonInfo.PersonName,
            //   NationalCode: this.estelam.NationalCode,
            this.estelam.OwnerName =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].Name =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].PersonName =
              res.PersonInfo.name + " " + res.PersonInfo.family
            this.value.Base_Owner[i].NationalCode = res.PersonInfo.nationalCode
            this.value.Base_Owner[i].FirstName = res.PersonInfo.name
            this.value.Base_Owner[i].LastName = res.PersonInfo.family
            this.value.Base_Owner[i].FatherName = res.PersonInfo.fatherName
            this.value.Base_Owner[i].BirthDate = res.PersonInfo.birthDate
            this.value.Base_Owner[i].BirthYear = parseInt(res.PersonInfo.birthDate.split('/')[0])
            this.value.Base_Owner[i].OfficeName = res.PersonInfo.officeName
            this.value.Base_Owner[i].ShenasnamehNo =
              res.PersonInfo.shenasnameNo

            this.value.Base_Owner[i].OwnerName = res.PersonInfo.name
            this.value.Base_Owner[i].OwnerLastName = res.PersonInfo.family
            this.value.Base_Owner[i].OwnerFatherName =
              res.PersonInfo.fatherName
            this.value.Base_Owner[i].EmissionPlace = res.PersonInfo.officeName
            this.value.Base_Owner[i].IDCardNo = res.PersonInfo.shenasnameNo
            this.value.Base_Owner[i].DateCheckSabt = currentDate()
          }
        }
      }
      this.$nextTick(() => {
        this.$refs.baseOwner.gridApi.refreshCells()
      })
      this.$forceUpdate()
      this.isJson = false
      this.isWCF = false
      this.showCheckSabtModal = false
    }
  }
}
</script>
