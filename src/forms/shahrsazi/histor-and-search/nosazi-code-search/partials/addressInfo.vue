<template>
  <safa-group label-width="85px" margin="0">
    <safa-text label="نام" v-model="Base_Owner.OwnerName" cdcName="OwnerName" />
    <safa-text
      label="نام خانوادگی"
      v-model="Base_Owner.OwnerLastName"
      cdcName="OwnerLastName"
    />
    <safa-text
      label="نام پدر"
      v-model="Base_Owner.OwnerFatherName"
      cdcName="OwnerFatherName"
    />
    <safa-text
      label="شماره ملی"
      v-model="Base_Owner.NationalCode"
      cdcName="NationalCode"
    />
    <safa-text
      label="آدرس"
      v-model="Base_AddressInfo.MainAddress"
      cdcName="MainAddress"
    />
    <safa-text
      label="تلفن"
      v-model="Base_CommonEstate.Telephone"
      cdcName="Telephone"
    />
    <safa-text
      label="کدپستی"
      v-model="Base_AddressPostCode.PostCode"
      cdcName="PostCode"
    />
    <safa-text
      label="پلاک آبی"
      v-model="Base_CommonEstate.Plack"
      cdcName="Plack"
    />
    <safa-text label="واحد" v-model="Base_CommonEstate.Vahed" cdcName="Vahed" />
    <safa-text
      label="شماره پرونده مادر"
      v-model="Base_File.FileIdMother"
      cdcName="FileIdMother"
    />
    <safa-text
      label="تلفن همراه"
      v-model="Base_Owner.CellPhone"
      cdcName="CellPhone"
    />
  </safa-group>
</template>

<script>
export default {
  name: "addressInfo",
  props: {
    m: String,
    Base_CommonEstate: Object,
    Base_AddressInfo: Object,
    Base_Owner: Object,
    Base_AddressPostCode: Object,
    Base_File: Object
  },
  updated () {
    this.$emit("baseCommonEstate", this.Base_CommonEstate)
    this.$emit("base_AddressPostCode", this.Base_AddressPostCode)
    this.$emit("baseAddressInfo", this.Base_AddressInfo)
    this.$emit("baseOwner", this.Base_Owner)
    this.$emit("base_File", this.Base_File)
  }
}
</script>
