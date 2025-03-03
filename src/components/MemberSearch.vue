<template>
  <MemberSearch
    title="کد دفتر"
    buttonColor="primary"
    buttonIcon="search"
    buttonText="جستجو"
    inputType="number"
    >
      <search-offices />
  </MemberSearch>
</template>
<script>
import MemberSearch from "src/components/MemberSearch";
import ShowModal from "src/components/ShowModal";
import search-offices from "./search-offices";
export default {
  name: "MemberSearch",
  data: function() {
    return {
      type: {
        Id: "0",
        Title: "نامشخص"
      },
      isShowModal: false,
      identityCodeData: 0,
      pRequest: {
        CI_RequestType: "0",
        CI_Years: "0",
        EngineerCode: "30020",
        NidCheckerGroup: "00000000-0000-0000-0000-000000000000",
        NidEng: "00000000-0000-0000-0000-000000000000",
        NidFil: "00000000-0000-0000-0000-000000000000",
        NidWorkitem: "0",
        CI_CancelType: "0",
        CI_ExecFloor: "0",
        CI_ExecLevel: "0",
        CI_SazeType: "0",
        CI_Year: "0",
        Floor: "0",
        Height: "0",
        Infrastructure: "0",
        IsConfirm: "false",
        IsRefreshOnly: "false",
        IsSendToSaraRequest: "false",
        NIdBuildingGroup: "00000000-0000-0000-0000-000000000000",
        NIdDetail: "00000000-0000-0000-0000-000000000000",
        NIdRealPerson: "00000000-0000-0000-0000-000000000000",
        NidBlackList: "00000000-0000-0000-0000-000000000000",
        NidProc: "00000000-0000-0000-0000-000000000000",
        NidRefer: "00000000-0000-0000-0000-000000000000",
        NidTask: "00000000-0000-0000-0000-000000000000",
        NidWorkFlowDeff: "00000000-0000-0000-0000-000000000000",
        OtherFileType: "0",
        Sara_WorkflowID: "0",
        SecretariatNo: "0",
        Skip: "0",
        StudyFiled: "0",
        SysCI_RequestStatus: "0",
        Take: "0",
        UserGUID: "00000000-0000-0000-0000-000000000000"
      }
    };
  },
  props: {
    identityCode: Number,
    isComboTypeVisible: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    initiateIdentityCode(e) {
      this.identityCodeData = e;

      this.identityCode = e;
    },
    getIdentityCode(e) {
      this.identityCodeData = e.IdentityCode;

      this.identityCode = e.IdentityCode;

      this.isShowModal = false;
    },
    closeModal(e) {
      this.isShowModal = e;
    },
    load() {
      if (this.type.Id) {
        if (this.type.Id === "0") {
          this.$q.dialog({
            title: "انتخاب نوع",
            message: "لطفا نوع را انتخاب کنید"
          });

          return;
        }
      } else if (!this.type.Id) {
        if (this.type === 0) {
          this.$q.dialog({
            title: "انتخاب نوع",
            message: "لطفا نوع را انتخاب کنید"
          });

          return;
        }
      }

      if (this.identityCodeData === 0 || this.identityCodeData === "0") {
        this.$q.dialog({
          title: "کد عضویت",
          message: "کد عضویت نمی تواند صفر باشد"
        });

        return;
      } else if (this.identityCodeData === "") {
        this.$q.dialog({
          title: "کد عضویت",
          message: "لطفا مقدار کد عضویت را وارد نمایید"
        });
        return;
      }

      this.pRequest.EngineerCode = this.identityCodeData;

      let pRequest = this.pRequest;

      let data = { pRequest };

      // data = this.pRequestForBlackList

      this.$q.loading.show();
      this.$services.engActivity
        .GetBlackListWitCode(data)
        .then(response => {
          this.$q.loading.hide();

          this.$emit("afterSearchComplete", response);
        })
        .catch(e => {
          this.$q.dialog({
            title: "خطا در سرور",
            // message: 'متاسفانه مشکلی در سیستم رخ داده است.'
            message: e.message
          });
        });
    }
  },
  components: {
    Search,
    ShowModal,
    SearchEngineer
  }
};
</script>

<style scoped></style>
