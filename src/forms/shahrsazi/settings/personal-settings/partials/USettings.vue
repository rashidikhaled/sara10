<template>
  <fit>
    <div class="row q-mb-sm">
      <safa-checkbox
        v-model="value.ChkShowPopupBlackList"
        :m="m"
        label="نشان دادن لیست سیاه در پنجره جدید"
      />
    </div>
    <div class="row q-my-sm">
      <safa-checkbox
        v-model="value.ChkShowPopupTemporaryArchives"
        :m="m"
        label="نشان دادن بایگانی موقت در پنجره جدید"
      />
    </div>
    <div class="row q-my-sm">
      <safa-checkbox
        v-model="value.ChkShowPopupPermanentArchives"
        :m="m"
        label="نشان دادن بایگانی دائم در پنجره جدید"
      />
    </div>
    <div class="row q-my-sm">
      <safa-checkbox
        v-model="value.ChkShowRevokedRequest"
        :m="m"
        label="نشان دادن درخواست های ابطال شده در پنجره جدید"
      />
    </div>
    <div class="row q-my-sm">
      <safa-checkbox
        v-model="value.ChkShowPopupResponder"
        :m="m"
        label="نشان دادن فرم پاسخگو در پنجره جدید"
      />
    </div>
    <div class="row q-my-sm">
      <safa-checkbox
        v-model="value.ChkShowPopupArchive"
        :m="m"
        label="نشان دادن فرم آرشیو در پنجره جدید"
      />
    </div>
    <div class="row q-mt-sm">
      <safa-checkbox
        v-model="value.ChkShowPopupLettersKartabl"
        :m="m"
        label="نشان دادن فرم کارتابل نامه ها در پنجره جدید"
      />
    </div>
  </fit>
</template>

<script>
import baseFormMixin from 'src/mixins/baseFormMixin'

export default {
  mixins: [baseFormMixin],
  data () {
    return {
      sidebarCompatible: true
      // PersonalSettingMain: {
      //   ChkShowPopupBlackList: false,
      //   ChkShowPopupTemporaryArchives: false,
      //   ChkShowPopupPermanentArchives: false,
      //   ChkShowRevokedRequest: false,
      //   ChkShowPopupResponder: false,
      //   ChkShowPopupArchive: false,
      //   ChkShowPopupLettersKartabl: false
      // }
    }
  },
  props: {
    title: String,
    formKey: String,
    name: String,
    m: String,
    isEditable: Boolean,
    value: Object

    // loadResult: {
    //   type: Object,
    //   default: () => ({
    //     _declaration: {
    //       _attributes: {
    //         version: '1.0',
    //         encoding: 'utf-16'
    //       }
    //     },
    //     ClsProfile: {
    //       _attributes: {
    //         'xmlns:xsi': 'http://www.w3.org/2001/XMLSchema-instance',
    //         'xmlns:xsd': 'http://www.w3.org/2001/XMLSchema'
    //       },
    //       ShowPopupBlackList: {
    //         _text: 'true'
    //       },
    //       ShowPopupTemporaryArchives: {
    //         _text: 'false'
    //       },
    //       ShowPopupPermanentArchives: {
    //         _text: 'false'
    //       },
    //       ShowPopupGarbageKartablList: {
    //         _text: 'false'
    //       },
    //       ShowPopupResponder: {
    //         _text: 'false'
    //       },
    //       ShowPopupArchive: {
    //         _text: 'false'
    //       },
    //       ShowPopupExportedLetters: {
    //         _text: 'false'
    //       }
    //     }
    //   })
    // }
  },
  watch: {
    isEditable () {
      if (!this.isEditable) {
        // this.$emit('SavePersonalSettingMain', this.PersonalSettingMain)
      }
    }
  }
  // mounted () {},
  // watch: {
  //   // // console.log(this.loadResult.ClsProfile.ShowPopupBlackList._text)
  //   // // console.log(this.loadResult.ClsProfile)
  //   loadResult () {
  //     if (this.m === 'r') {
  //       if (this.loadResult.ClsProfile.ShowPopupBlackList._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupBlackList._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupBlackList._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupBlackList._text = false
  //       }

  //       if (this.loadResult.ClsProfile.ShowPopupTemporaryArchives._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupTemporaryArchives._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupTemporaryArchives._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupTemporaryArchives._text = false
  //       }

  //       if (this.loadResult.ClsProfile.ShowPopupPermanentArchives._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupPermanentArchives._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupPermanentArchives._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupPermanentArchives._text = false
  //       }

  //       if (this.loadResult.ClsProfile.ShowPopupGarbageKartablList._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupGarbageKartablList._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupGarbageKartablList._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupGarbageKartablList._text = false
  //       }

  //       if (this.loadResult.ClsProfile.ShowPopupResponder._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupResponder._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupResponder._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupResponder._text = false
  //       }

  //       if (this.loadResult.ClsProfile.ShowPopupArchive._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupArchive._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupArchive._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupArchive._text = false
  //       }

  //       if (this.loadResult.ClsProfile.ShowPopupExportedLetters._text === 'true') {
  //         this.loadResult.ClsProfile.ShowPopupExportedLetters._text = true
  //       } else if (this.loadResult.ClsProfile.ShowPopupExportedLetters._text === 'false') {
  //         this.loadResult.ClsProfile.ShowPopupExportedLetters._text = false
  //       }
  //     }
  //   }
  // },
}
</script>
