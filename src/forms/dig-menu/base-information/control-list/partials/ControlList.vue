<template>
  <fit>
    <fit>
      <safa-grid
        v-model="value.VBlackList_Ifo"
        cdcName="controlList"
        :columns="controlListColumns"
        :getRowStyle="
          ({ data }) => {
            if (data.IsDisable === true) return { background: '#f317002e' };
          }
        "
        m="r"
        paginate
        fit
      >
        <template v-slot:header>
          <q-icon
            style="position: relative; right: -5px; font-size: 18px"
            @click="$emit('reload')"
            color="primary"
            name="find_replace"
            title="بازآوری"
            class="cursor-pointer"
          />
        </template>
      </safa-grid>
    </fit>
  </fit>
</template>

<script>
export default {
  props: {
    value: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      controlListColumns: [
        {
          field: "",
          title: "ویرایش",
          editor: "action",
          width: "100px",
          btnColor: "orange",
          btnIcon: "edit",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.editBlackList(params)
        },
        {
          field: "",
          title: "حذف",
          editor: "action",
          width: "100px",
          btnColor: "red",
          btnIcon: "delete_outline",
          cellRenderer: "agCallbackBtn",
          callback: (params) => this.deleteBlackList(params)
        },
        {
          field: "BlackList",
          title: "کد لیست کنترلی",
          width: "150px"
        },
        {
          field: "BlackListCode",
          title: "کد",
          width: "150px"
        },
        {
          field: "BlackListSubject",
          title: "عنوان",
          width: "150px"
        },
        {
          field: "Region",
          title: "مناطق",
          width: "150px"
        },
        {
          field: "BlackListCause",
          title: "علت ورود به لیست کنترلی",
          width: "150px"
        },
        {
          field: "BL_StartDate",
          title: "تاریخ شروع",
          width: "150px"
        },
        {
          field: "ExpireDate",
          title: "تاریخ انقضاء",
          width: "150px"
        },
        {
          field: "InBL_Date",
          title: "تاریخ ایجاد",
          width: "150px"
        },
        {
          field: "InBL_Time",
          title: "زمان ایجاد",
          width: "150px"
        },
        {
          field: "UpBL_Date",
          title: "تاریخ ویرایش",
          width: "150px"
        },
        {
          field: "OutBL_Date",
          title: "تاریخ خروج",
          width: "150px"
        },

        {
          field: "OutBL_Time",
          title: "زمان خروج",
          width: "150px"
        },
        {
          field: "InUserName",
          title: "کاربر ایجاد کننده",
          width: "150px"
        },
        {
          field: "OutUserName",
          title: "کاربر خارج کننده",
          width: "150px"
        },
        {
          field: "BL_Comments",
          title: "توضیحات",
          width: "150px"
        }
      ]
    }
  },
  methods: {
    deleteBlackList (params) {
      this.$emit("deleteBlackList", params)
    },
    editBlackList (params) {
      this.$emit("editBlackList", params)
    }
  }
}
</script>
