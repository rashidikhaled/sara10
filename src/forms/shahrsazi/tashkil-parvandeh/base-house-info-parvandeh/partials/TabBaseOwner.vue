<template>
  <fit>
    <safa-splitter v-model="splitterModel" horizontal class="fit" margin="0">
      <template v-slot:before>
        <fit>
          <!-- helper="agBaseOwner" -->
          <safa-grid
            :columns="agBaseOwner"
            :m="m"
            v-model="value.Base_Owner"
            cdcName="Base_Owner"
            title="مالکین"
            id="0e42cd08-69c7-4c6f-8735-2c572fbb035c"
            :allowCopy="true"
            :copyWithCount="true"
            :deleteRow="true"
            height="100%"
            min-height="100px"
            :bordered="false"
            fit
            ref="baseOwner"
          />
        </fit>
      </template>
      <template v-slot:after>
        <fit>
          <safa-grid
            helper="baseEdgeHouseInfo"
            :m="m"
            v-model="value.Base_Edge"
            cdcName="Base_Edge"
            title="جهات اربعه"
            id="0e42cd08-69c7-4c6f-8735-2c572fbb045a"
            height="100%"
            min-height="100px"
            :bordered="false"
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
  name: "TabBaseOwner",
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

      // این آرایه مربوط به ستون های گرید باید در دیتا وجود داشته باشد و به هلپر منتقل نشود ، چون روی ستون های آن با توجه به بیزینس تغییرات اعمال میشود.
      agBaseOwner: [
        {
          field: "isSelectedNode",
          title: "",
          width: "74px",
          filterable: true,
          headerCheckboxSelection: true,
          lockPosition: true,
          pinned: "right",
          editor: "selection"
        },
        {
          field: "EumOwnerCharacter",
          title: "شخصیت",
          editor: "combo",
          source: [
            {
              ID: 1,
              Title: "حقیقی"
            },
            {
              ID: 2,
              Title: "حقوقی"
            }
          ],
          width: "116px"
        },
        {
          field: "OwnerLastName",
          title: "نام خانوادگی/شخصیت حقوقی",
          width: "168px"
        },
        {
          field: "OwnerName",
          title: "نام مالک",
          width: "110px"
        },
        // {
        //   field: "",
        //   title: "استعلام ثبت احوال",
        //   editor: "action",
        //   width: "131px",
        //   btnTitle: "استعلام ثبت احوال",
        //   btnColor: "primary",
        //   btnIcon: "how_to_reg",
        //   cellRenderer: "agCallbackBtn",
        //   callback: (params) => this.showCheckSabtModalHandler(params)
        // },
        {
          field: "DateCheckSabt",
          title: "تاریخ استعلام ثبت احوال",
          width: "140px",
          editor: "date",
          editable: false
        },
        {
          field: "NationalCode",
          title: "کد ملی/کد اقتصادی",
          width: "120px"
        },
        {
          field: "OwnerFatherName",
          title: "نام پدر /کد سازمانی",
          width: "122px"
        },
        {
          field: "IDCardNo",
          title: "شماره شناسنامه/شماره ثبت",
          width: "150px",
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          }
        },
        {
          field: "Telephone",
          title: "تلفن",
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          },
          width: "110px"
        },
        {
          field: "ToftImpart",
          title: "سهم عرصه",
          editor: "numeric",
          width: "75px"
        },
        {
          field: "ToftDang",
          title: "دانگ عرصه",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "ToftHabeh",
          title: "حبه عرصه",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "AyanImpart",
          title: "سهم اعیان",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "AyanDang",
          title: "دانگ اعیان",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "AyanHabeh",
          title: "حبه اعیان",
          editor: "numeric",
          width: "70px"
        },
        {
          field: "Address",
          title: "آدرس",
          width: "140px"
        },
        {
          field: "EconomicID",
          title: " شناسه ملی",
          width: "105px",
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          }
        },
        {
          field: "EmissionPlace",
          title: "محل صدور/محل ثبت",
          width: "120px"
        },
        {
          field: "ToftTotalImpart",
          title: "سهم کل از عرصه",
          width: "102px",
          editor: "numeric"
        },
        {
          field: "AyanTotalImpart",
          title: " سهم کل از اعیان",
          width: "96px",
          editor: "numeric"
        },
        {
          field: "CellPhone",
          title: "شماره تلفن همراه",
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          },
          width: "180px"
        },
        {
          field: "DocNo",
          title: "شماره سند",
          width: "82px",
          params: {
            pattern: ["[0-9]", "فقط عدد قابل قبول میباشد"],
            type: "numeric"
          }
        },
        {
          field: "ActDate",
          title: "تاریخ اثر",
          editor: "date",
          width: "112px"
        },
        {
          field: "BirthDate",
          title: "تاریخ تولد مالک",
          editor: "date",
          width: "110px"
        },
        {
          field: "BuildingNo",
          title: "شماره ساختمان",
          editor: "numeric",
          width: "110px"
        },
        {
          field: "PostCode",
          title: "کد پستی",
          width: "110px",
          editor: "numeric"
        },
        {
          field: "Comments",
          title: "توضیحات",
          width: "140px"
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
            this.agBaseOwner,
            this.columnGenerateCheckSabt,
            4
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
