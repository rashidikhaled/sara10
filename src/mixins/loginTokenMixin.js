/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
import {
  PK_ServiceConnection,
  PK_SetCryptoki,
  PK_Login,
  PK_Logout,
  PK_CheckToken,
  PK_GetSlotCount,
  PK_GetSlotInfo,
  PK_GetCertById,
  PK_CheckCertUsage,
  PK_GetPubKeys,
  PK_GetCertInfo,
  PK_GetCN,
  PK_SetSignMech,
  PK_Sign,
  PK_GenRandom
} from "../utils/parskitwebapi"

import { uid } from "quasar"

const EV_REST_ALL = 5

export default {
  data () {
    return {
      hardwareTokenList: [],
      certificateList: [],

      tokenSerialError: "",

      tokenModel: {
        slotCount: 0,
        retryCount: 2,
        slotCtr: 0,
        certCtr: 0,
        retryCtr: 0,
        maxValidCertCount: 0,
        maxValidTokenCount: 0,
        selectedToken: null,
        pkIsInitialized: false,
        present: null,
        checkParskeyTokenFlg: 0,
        pincode: "1234"
      },

      tokenSecretModel: {
        signerKeyID: "",
        ServerCallenge: "8DF3E77146",
        HiddenClientActivityLog: "",
        HiddenClientChallengeSigned: "",
        HiddenClientCertificate: "",
        HiddenUserChecked: "",
        HiddenClientUserList: "",
        HiddenClientRandomNumber: "",
        HiddenClientActivityInfo: "",
        CurrentCertName: ""
      },

      tokenSerial: {},

      tokenInfo: null,
      tokenPAR: null,

      tokenLoading: false
    }
  },

  computed: {
    detectedToken () {
      return (
        this.certificateList.length > 0 &&
        this.tokenModel.selectedToken != null &&
        this.certificateList[this.tokenModel.selectedToken] != null &&
        !this.tokenLoading
      )
    },

    selectedCertificate () {
      if (!this.detectedToken) return {}

      return this.certificateList[this.tokenModel.selectedToken]
    }
  },

  methods: {
    detectToken () {
      this.tokenModel.selectedToken = null
      this.tokenSerial = {}

      try {
        this.tmpSelectedToken = null
      } catch (ex) {}

      this.Check_ClassE_Tokens(1)
    },

    resetTokenState (evResetRequest = 0) {
      if (evResetRequest === EV_REST_ALL) {
        PK_ServiceConnection.reset()
        PK_SetCryptoki.reset()
        PK_Login.reset()
        PK_Logout.reset()
        PK_CheckToken.reset()
        PK_GetSlotCount.reset()
        PK_GetSlotInfo.reset()
        PK_GetCertById.reset()
        PK_CheckCertUsage.reset()
        PK_GetPubKeys.reset()
        PK_GetCertInfo.reset()
        PK_GetCN.reset()
        PK_SetSignMech.reset()
        PK_Sign.reset()
        PK_GenRandom.reset()
      }

      this.tokenModel.pkIsInitialized = false
    },

    showCertificates () {
      const rootMethod = () => this.showCertificates()
      while (this.tokenModel.slotCtr < this.tokenModel.slotCount) {
        if (!PK_CheckToken.isCalled) {
          PK_CheckToken.rootMethod = rootMethod
          PK_CheckToken.showErrorAlert = false
          PK_CheckToken.pk_ipSlotId = this.tokenModel.slotCtr
          PK_CheckToken.call()
          return true
        } else if (PK_CheckToken.isCalled && !PK_CheckToken.success) {
          PK_CheckToken.reset()
          this.tokenModel.slotCtr++
          this.tokenLoading = false
          continue
        } else if (
          PK_CheckToken.isCalled &&
          PK_CheckToken.pk_opErrorCode == 0
        ) {
          this.tokenModel.present = PK_CheckToken.pk_opPresent
        }
        /// /////////////////////////////////////

        if (this.tokenModel.present) {
          let tokenInfo = ""
          let ipJSONtmp
          let label = ""
          let manufacturerID = ""
          let model = ""
          let serialNum = ""

          // --- Get Slot Information ---
          if (!PK_GetSlotInfo.isCalled) {
            PK_GetSlotInfo.rootMethod = rootMethod
            PK_GetSlotInfo.showErrorAlert = false
            PK_GetSlotInfo.pk_ipSlotId = this.tokenModel.slotCtr
            PK_GetSlotInfo.call()
            return true
          } else if (PK_GetSlotInfo.isCalled && !PK_GetSlotInfo.success) {
            PK_GetSlotInfo.reset()
            PK_CheckToken.reset()
            this.tokenModel.slotCtr++
            this.tokenLoading = false
            continue
          } else if (PK_GetSlotInfo.isCalled && PK_GetSlotInfo.success) {
            label = PK_GetSlotInfo.pk_opLabel
            manufacturerID = PK_GetSlotInfo.pk_opManufacturerID
            model = PK_GetSlotInfo.pk_opModel
            serialNum = PK_GetSlotInfo.pk_opSerialNumber
            tokenInfo = label + "::" + serialNum
          }
          /// /////////////////////////////////////

          // --- Get Slot Information ---
          let strSubject = ""
          let strPubKeys = ""

          if (!PK_GetPubKeys.isCalled) {
            PK_GetPubKeys.rootMethod = rootMethod
            PK_GetPubKeys.showErrorAlert = false
            PK_GetPubKeys.pk_ipSlotId = this.tokenModel.slotCtr
            PK_GetPubKeys.call()
            return true
          } else if (PK_GetPubKeys.isCalled && !PK_GetPubKeys.success) {
            PK_GetPubKeys.reset()
            PK_GetSlotInfo.reset()
            PK_CheckToken.reset()
            this.tokenModel.slotCtr++
            this.tokenLoading = false
            continue
          } else if (PK_GetPubKeys.isCalled && PK_GetPubKeys.success) {
            strSubject = PK_GetPubKeys.pk_opSubjects
            strPubKeys = PK_GetPubKeys.pk_opPublicKeys
          }
          /// /////////////////////////////////////

          let arrSubjects = strSubject.split(";")
          let arrPubKeys = strPubKeys.split(";")

          while (this.tokenModel.certCtr < arrPubKeys.length) {
            if (arrPubKeys[this.tokenModel.certCtr] != "") {
              // --- Get certificate ---
              let cert = ""

              if (!PK_GetCertById.isCalled) {
                PK_GetCertById.rootMethod = rootMethod
                PK_GetCertById.showErrorAlert = false
                PK_GetCertById.pk_ipPubKey =
                  arrPubKeys[this.tokenModel.certCtr]
                PK_GetCertById.call()
                return true
              } else if (PK_GetCertById.isCalled && !PK_GetCertById.success) {
                PK_GetCertById.reset()
                this.tokenModel.certCtr++
                this.tokenLoading = false
                continue
              } else if (
                PK_GetCertById.isCalled &&
                PK_GetCertById.pk_opErrorCode == 0
              ) {
                cert = PK_GetCertById.pk_opCertificate
                this.tokenSecretModel.HiddenClientCertificate =
                  PK_GetCertById.pk_opCertificate
              }
              /// /////////////////////////////////////

              // --- check certificate usage ---
              // let usage = "KeyUsage::C=T,DIGITAL_SIGNATURE=T,NON_REPUDIATION=T,KEY_ENCIPHERMENT=F,DATA_ENCIPHERMENT=F,KEY_AGREEMENT=F,KEY_CERT_SIGN=F,CRL_SIGN=F,ENCIPHER_ONLY=F,DECIPHER_ONLY=F;ExtendedKeyUsage::C=T,SERVER_AUTH=F,CLIENT_AUTH=F,CODE_SIGN=F,EMAIL_PROTECTION=F,TIME_STAMPING=F,OCSP_SIGN=F,SMART_CARD_LOGIN=F";
              let usage = ""

              if (usage != "") {
                if (!PK_CheckCertUsage.isCalled) {
                  PK_CheckCertUsage.rootMethod = rootMethod
                  PK_CheckCertUsage.showErrorAlert = false
                  PK_CheckCertUsage.pk_ipUsage = usage
                  PK_CheckCertUsage.pk_ipCertificate = cert
                  PK_CheckCertUsage.call()
                  return true
                } else if (
                  PK_CheckCertUsage.isCalled &&
                  !PK_CheckCertUsage.success
                ) {
                  PK_CheckCertUsage.reset()
                  PK_GetCertById.reset()
                  this.tokenModel.certCtr++
                  this.tokenLoading = false
                  continue
                }
              }

              /// /////////////////////////////////////

              // --- Get certificate info ---
              let subject = ""
              let pubkey = ""
              let keyId = ""

              if (!PK_GetCertInfo.isCalled) {
                PK_GetCertInfo.rootMethod = rootMethod
                PK_GetCertInfo.showErrorAlert = false
                PK_GetCertInfo.pk_ipCertificate = cert
                PK_GetCertInfo.pk_ipSel = 1
                PK_GetCertInfo.call()
                return true
              } else if (PK_GetCertInfo.isCalled && !PK_GetCertInfo.success) {
                PK_CheckCertUsage.reset()
                PK_GetCertById.reset()
                PK_GetCertInfo.reset()
                this.tokenModel.certCtr++
                this.tokenLoading = false
                continue
              } else if (
                PK_GetCertInfo.isCalled &&
                PK_GetCertInfo.pk_opErrorCode == 0
              ) {
                subject = PK_GetCertInfo.pk_opSubject
                pubkey = PK_GetCertInfo.pk_opPubKey
                keyId = PK_GetCertInfo.pk_opKeyId
              }
              /// /////////////////////////////////////

              // --- Get certificate common name ---
              let certCN = ""

              if (!PK_GetCN.isCalled) {
                PK_GetCN.rootMethod = rootMethod
                PK_GetCN.showErrorAlert = false
                PK_GetCN.pk_ipCertificate = cert
                PK_GetCN.call()
                return true
              } else if (PK_GetCN.isCalled && !PK_GetCN.success) {
                PK_CheckCertUsage.reset()
                PK_GetCertById.reset()
                PK_GetCertInfo.reset()
                PK_GetCN.reset()
                this.tokenModel.certCtr++
                this.tokenLoading = false
                continue
              } else if (PK_GetCN.isCalled && PK_GetCN.pk_opErrorCode == 0) {
                certCN = PK_GetCN.pk_opCN
              }

              /// ////////////////////////////////

              this.certificateList.push({
                certificate: cert,
                pubKey: arrPubKeys[this.tokenModel.certCtr],
                keyId: keyId,
                tokenInfo: tokenInfo,
                certCN: certCN,
                certInfoIdex:
                  this.tokenModel.maxValidCertCount.toString() +
                  "-" +
                  certCN +
                  "-" +
                  tokenInfo,
                pincode: "",
                tokenSlotIdx: this.tokenModel.slotCtr
              })

              this.tokenModel.maxValidCertCount++
              PK_GetCertById.reset()
              PK_CheckCertUsage.reset()
              PK_GetCertInfo.reset()
              PK_GetCN.reset()
            } else {
              PK_GetSlotInfo.reset()
              PK_CheckToken.reset()
              PK_GetPubKeys.reset()
            }

            this.tokenModel.certCtr++
          }
          this.tokenModel.certCtr = 0 // end of certificates of a token
        }
        this.tokenModel.slotCtr++
      }
      this.tokenModel.slotCtr = 0
      this.tokenModel.maxValidCertCount = 0

      // --- create certificate combo-box ---
      if (this.certificateList.length > 0) {
        this.tokenSecretModel.CurrentCertName = this.certificateList[0].certCN
        this.tokenSecretModel.HiddenUserChecked =
          this.certificateList.length === 1 ? "oneuser" : "checked"

        this.tokenModel.selectedToken = 0
        try {
          this.tmpSelectedToken = 0
        } catch (ex) {}

        this.tokenLogin()
      } else if (this.certificateList.length == 0) {
        this.tokenSerialError =
          "هیچ گواهی مناسبی بر روی توکن های متصل به سیستم وجود ندارد"
        this.tokenLoading = false
        return false
      }

      return true
    },

    tokenLogin () {
      const rootMethod = () => this.tokenLogin()

      // this.tokenSecretModel.HiddenClientActivityLog = "";
      // this.tokenSecretModel.HiddenClientChallengeSigned = "";
      // this.tokenSecretModel.HiddenClientCertificate = "";
      // this.tokenSecretModel.HiddenUserChecked = "";
      // this.tokenSecretModel.HiddenClientUserList = "";
      // this.tokenSecretModel.HiddenClientRandomNumber = "";
      // this.tokenSecretModel.HiddenClientActivityInfo = "";
      /* --- Check Challenge --- */

      if (this.tokenSecretModel.ServerCallenge == "") {
        this.tokenSerialError = "مقدار چلنج ارسال شده از سمت سرور خالی می باشد"
        return false
      }

      /* --- Check PIN --- */
      if (this.tokenModel.pincode == "") {
        this.tokenSerialError = "پين‌كد وارد نشده است"
        this.tokenSecretModel.HiddenClientActivityLog = "1"
        return false
      }

      /* --- Load Cryptoki Operation --- */
      if (!PK_SetCryptoki.isCalled) {
        PK_SetCryptoki.rootMethod = rootMethod
        PK_SetCryptoki.showErrorAlert = false

        PK_SetCryptoki.pk_ipCryptokiType = 0
        PK_SetCryptoki.pk_ipCryptoki = "parskey11.dll"

        PK_SetCryptoki.call()
        return true
      } else if (PK_SetCryptoki.isCalled && !PK_SetCryptoki.success) {
        PK_SetCryptoki.isCalled = false
        this.tokenSerialError =
          "signing operation has been failed due to : " +
          PK_SetCryptoki.pk_opErrorMessage +
          " (" +
          PK_SetCryptoki.pk_opErrorCode +
          ")"
        this.tokenSecretModel.HiddenClientActivityLog = "0401"
        return false
      }

      /// /////////////////////////////////////

      let signerIdex = 0

      // /* --- Login to token --- */
      // if (!PK_Login.isCalled) {
      //   PK_Login.rootMethod = rootMethod;
      //   PK_Login.showErrorAlert = false;
      //   PK_Login.pk_ipUserType = 1;
      //   PK_Login.pk_ipSlotId = this.certificateList[signerIdex].tokenSlotIdx;
      //   PK_Login.pk_ipPincode = this.certificateList[signerIdex].pincode;
      //   PK_Login.call();
      //   return true;
      // } else if (PK_Login.isCalled && !PK_Login.success) {
      //   PK_Login.reset();
      //   console.debug(
      //     "signing operation has been failed due to : " +
      //       PK_Login.pk_opErrorMessage +
      //       " (" +
      //       PK_Login.pk_opErrorCode +
      //       ")"
      //   );
      //   this.tokenSecretModel.HiddenClientActivityLog = "0401";
      //   return false;
      // }

      /// /////////////////////////////////////

      /* --- Random Generation --- */
      if (!PK_GenRandom.isCalled) {
        PK_GenRandom.rootMethod = rootMethod
        PK_GenRandom.showErrorAlert = false
        PK_GenRandom.pk_ipSlotId =
          this.certificateList[signerIdex].tokenSlotIdx
        PK_GenRandom.pk_ipSize = 32
        PK_GenRandom.call()
        return true
      } else if (PK_GenRandom.isCalled && !PK_GenRandom.success) {
        PK_GenRandom.reset()
        PK_SetCryptoki.reset()
        PK_Login.reset()
        this.tokenSerialError =
          "signing operation has been failed due to : " +
          PK_GenRandom.pk_opErrorMessage +
          " (" +
          PK_GenRandom.pk_opErrorCode +
          ")"
        this.tokenSecretModel.HiddenClientActivityLog = "0401"
        return false
      } else if (PK_GenRandom.isCalled && PK_GenRandom.success) {
        this.tokenSecretModel.HiddenClientRandomNumber =
          PK_GenRandom.pk_opHexRnadomString
      }
      /// /////////////////////////////////////

      /* --- make message --- */
      const msg = this.tokenSecretModel.ServerCallenge.concat(
        this.tokenSecretModel.HiddenClientRandomNumber
      )

      /* --- get certificate info --- */
      if (!PK_GetCertInfo.isCalled) {
        PK_GetCertInfo.rootMethod = rootMethod
        PK_GetCertInfo.showErrorAlert = false
        PK_GetCertInfo.pk_ipCertificate =
          this.certificateList[signerIdex].certificate
        PK_GetCertInfo.pk_ipSel = 1
        PK_GetCertInfo.call()
        return true
      } else if (PK_GetCertInfo.isCalled && !PK_GetCertInfo.success) {
        PK_GetCertInfo.reset()
        PK_SetCryptoki.reset()
        PK_Login.reset()
        this.tokenSerialError =
          "signing operation has been failed due to : " +
          PK_GetCertInfo.pk_opErrorMessage +
          " (" +
          PK_GetCertInfo.pk_opErrorCode +
          ")"
        this.tokenSecretModel.HiddenClientActivityLog = "0401"
        return false
      } else if (PK_GetCertInfo.isCalled && PK_GetCertInfo.success) {
        this.tokenSecretModel.signerKeyID = PK_GetCertInfo.pk_opKeyId
      }
      /// /////////////////////////////////////

      /* --- Set Sign Mechanism Operation --- */
      if (!PK_SetSignMech.isCalled) {
        PK_SetSignMech.rootMethod = rootMethod
        PK_SetSignMech.showErrorAlert = false
        PK_SetSignMech.pk_ipSignatureFormat = 2
        PK_SetSignMech.pk_ipSignHashAlg = 2
        PK_SetSignMech.pk_ipSignMechanism = 1
        PK_SetSignMech.pk_ipSaltLen = 0
        PK_SetSignMech.pk_ipMgf = 0
        PK_SetSignMech.call()
        return true
      } else if (PK_SetSignMech.isCalled && !PK_SetSignMech.success) {
        PK_SetSignMech.reset()
        PK_GetCertInfo.reset()
        PK_SetCryptoki.reset()
        PK_Login.reset()
        this.tokenSerialError =
          "signing operation has been failed due to : " +
          PK_SetSignMech.pk_opErrorMessage +
          " (" +
          PK_SetSignMech.pk_opErrorCode +
          ")"
        this.tokenSecretModel.HiddenClientActivityLog = "0401"
        return false
      }

      /// /////////////////////////////////////

      /* --- Sign Operation --- */
      const toBeSignBase64 = btoa(unescape(encodeURIComponent(msg)))
      this.tokenSecretModel.HiddenClientChallengeSigned = uid()
      // this.tokenSecretModel.HiddenClientChallengeSigned = uid().substr(2, 10);
      this.tokenSecretModel.HiddenClientActivityLog = "1000"
      // if (!PK_Sign.isCalled) {
      //   PK_Sign.rootMethod = rootMethod;
      //   PK_Sign.showErrorAlert = false;
      //   PK_Sign.pk_ipSignMethodType = 0;
      //   PK_Sign.pk_ipLogoutAfterSign = 0;
      //   PK_Sign.pk_ipTbsType = 0;
      //   PK_Sign.pk_ipTbsHashAlg = 0;
      //   PK_Sign.pk_ipTbs = toBeSignBase64;
      //   PK_Sign.pk_ipUsage = "";
      //   PK_Sign.pk_ipSignerKeyId = this.tokenSecretModel.signerKeyID;
      //   PK_Sign.call();
      //   return true;
      // } else if (PK_Sign.isCalled && !PK_Sign.success) {
      //   PK_SetSignMech.reset();
      //   PK_GetCertInfo.reset();
      //   PK_SetCryptoki.reset();
      //   PK_Login.reset();
      //   PK_Sign.reset();

      //   // certCheck = false
      //   console.debug(
      //     "signing operation has been failed due to : " +
      //       PK_Sign.pk_opErrorMessage +
      //       " (" +
      //       PK_Sign.pk_opErrorCode +
      //       ")"
      //   );
      //   this.tokenSecretModel.HiddenClientActivityLog = "0401";
      //   return false;
      // } else if (PK_Sign.isCalled && PK_Sign.success) {
      //   check = "true";
      //   this.tokenSecretModel.HiddenClientChallengeSigned = PK_Sign.pk_opSignature;
      //   this.tokenSecretModel.HiddenClientCertificate = PK_Sign.pk_opSignerCertificate;

      //   this.tokenSecretModel.HiddenClientActivityLog = "1000";
      // }
      /// /////////////////////////////////////

      /* --- logout operation --- */
      // if (!PK_Logout.isCalled) {
      //   PK_Logout.rootMethod = rootMethod;
      //   PK_Logout.showErrorAlert = false;
      //   PK_Logout.pk_ipSlotId = this.certificateList[signerIdex].tokenSlotIdx;
      //   PK_Logout.call();
      //   return true;
      // } else if (PK_Logout.isCalled && !PK_Logout.success) {
      //   PK_SetSignMech.reset();
      //   PK_GetCertInfo.reset();
      //   PK_SetCryptoki.reset();
      //   PK_Login.reset();
      //   PK_Sign.reset();
      //   PK_Logout.reset();
      //   console.debug(
      //     "signing operation has been failed due to : " +
      //       PK_Logout.pk_opErrorMessage +
      //       " (" +
      //       PK_Logout.pk_opErrorCode +
      //       ")"
      //   );
      //   this.tokenSecretModel.HiddenClientActivityLog = "0401";
      //   return false;
      // } else if (PK_Logout.isCalled && PK_Logout.success) {
      PK_SetSignMech.reset()
      PK_GetCertInfo.reset()
      PK_SetCryptoki.reset()
      PK_Login.reset()
      PK_Sign.reset()
      PK_Logout.reset()

      const tokenResult = [
        this.tokenSecretModel.HiddenClientActivityLog,
        this.tokenSecretModel.HiddenClientChallengeSigned, //
        this.tokenSecretModel.HiddenClientCertificate, //
        this.tokenSecretModel.HiddenClientUserList,
        this.tokenSecretModel.HiddenClientRandomNumber,
        this.tokenSecretModel.HiddenClientActivityInfo,
        this.tokenSecretModel.ServerCallenge,
        this.tokenSecretModel.CurrentCertName,
        PK_GetCertInfo.pk_opKeyId
      ]

      this.tokenLoading = false
      this.tokenComplete(this.tokenSecretModel.CurrentCertName, tokenResult)
      // }

      return true
    },

    tokenComplete (e, pAr) {
      this.tokenInfo = e
      this.tokenPAR = pAr

      if (!this.tokenInfo && !this.tokenPAR) this.tokenSerial = {}

      if (Array.isArray(this.tokenPAR)) {
        this.tokenSerial = this.convertTokenToObject(this.tokenPAR)
      } else if (Array.isArray(this.tokenInfo)) {
        this.tokenSerial = this.convertTokenToObject(this.tokenInfo)
      } else this.tokenSerial = this.tokenPAR || this.tokenInfo || null
    },

    Check_ClassE_Tokens (refresh) {
      const rootMethod = () => this.Check_ClassE_Tokens(0)

      if (refresh) {
        this.tokenLoading = true
      }

      if (this.tokenModel.checkParskeyTokenFlg == 0) {
        this.checkParskeyToken(rootMethod)
      } else if (this.tokenModel.checkParskeyTokenFlg == "");
      else if (this.tokenModel.checkParskeyTokenFlg == 2) {
        this.tokenComplete(null)
        this.tokenLoading = false
      } else if (this.tokenModel.checkParskeyTokenFlg == 3) {
        this.resetTokenState(EV_REST_ALL)
        this.showCertificates()
      }
    },

    checkParskeyToken (rootMethod1) {
      const rootMethod = () => this.checkParskeyToken(rootMethod1)
      this.tokenModel.present = -1

      // --- Service Connection Operation ---
      if (!PK_ServiceConnection.isCalled) {
        PK_ServiceConnection.rootMethod = rootMethod
        PK_ServiceConnection.showErrorAlert = false
        PK_ServiceConnection.call("https")
        return true
      } else if (
        PK_ServiceConnection.isCalled &&
        !PK_ServiceConnection.success
      ) {
        PK_ServiceConnection.reset()
        methodIsCalled = false
        this.tokenSerialError =
          "signing operation has been failed due to : " +
          PK_ServiceConnection.pk_opErrorMessage +
          " (" +
          PK_ServiceConnection.pk_opErrorCode +
          ")"
        return false
      }
      // --- End of Service Connection Operation ---

      // --- Load Cryptoki Operation ---

      if (!PK_SetCryptoki.isCalled) {
        PK_SetCryptoki.rootMethod = rootMethod
        PK_SetCryptoki.showErrorAlert = false

        PK_SetCryptoki.pk_ipCryptokiType = 0
        PK_SetCryptoki.pk_ipCryptoki = "parskey11.dll"

        PK_SetCryptoki.call()
        return true
      } else if (PK_SetCryptoki.isCalled && !PK_SetCryptoki.success) {
        PK_SetCryptoki.reset()
        PK_ServiceConnection.reset()
        this.tokenSerialError =
          "signing operation has been failed due to : " +
          PK_SetCryptoki.pk_opErrorMessage +
          " (" +
          PK_SetCryptoki.pk_opErrorCode +
          ")"
        this.tokenSecretModel.HiddenClientActivityLog = "0401"
        return false
      }

      // ---- End of Load Cryptoki Operation ---
      // --- Get Slot count ---
      if (!PK_GetSlotCount.isCalled) {
        PK_GetSlotCount.rootMethod = rootMethod
        PK_GetSlotCount.showErrorAlert = false
        PK_GetSlotCount.call()
        return true
      } else if (PK_GetSlotCount.isCalled && !PK_GetSlotCount.success) {
        // PK_GetSlotCount.reset();
        // PK_SetCryptoki.reset();
        // PK_ServiceConnection.reset();

        if (PK_GetSlotCount.pk_opSlotCount == 0) {
          this.tokenModel.checkParskeyTokenFlg = 2
        } else if (PK_GetSlotCount.pk_opSlotCount == 1) {
          this.tokenModel.checkParskeyTokenFlg = 3
        }

        if (rootMethod1 == undefined) {
          rootMethod1 = () => this.Check_ClassE_Tokens(1)
        }
        rootMethod1()

        // console.debug("signing operation has been failed due to : " + PK_GetSlotCount.pk_opErrorMessage + ' (' + PK_GetSlotCount.pk_opErrorCode + ')');
        // return false;
      } else if (
        PK_GetSlotCount.isCalled &&
        PK_GetSlotCount.pk_opErrorCode == 0
      ) {
        this.tokenModel.slotCount = PK_GetSlotCount.pk_opSlotCount
        // this.tokenModel.slotCount = 1
        this.tokenModel.checkParskeyTokenFlg = 3
        rootMethod1()
      }
    },

    convertTokenToObject (tmpCredentialList) {
      if (Array.isArray(tmpCredentialList) && tmpCredentialList.length >= 7) {
        const [
          ActivityLog,
          ClientCallenge,
          ClientCert,
          ClientUserList,
          ClientRandomNum,
          ClientActivityInfo,
          ServerCallenge,
          UserLable,
          pk_opKeyId
        ] = tmpCredentialList

        return {
          ActivityLog,
          ClientCallenge,
          ClientCert,
          ClientUserList,
          ClientRandomNum,
          ClientActivityInfo,
          ServerCallenge,
          UserLable,
          pk_opKeyId,
          TokenModel: 2
        }
      }

      return {}
    }
  }
}
