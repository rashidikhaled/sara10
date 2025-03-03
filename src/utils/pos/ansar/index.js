import axios from 'axios'
import ApiResult from '../ApiResult'
const SEPWebWrapper = null
const _AuthorizationId = null
export default class Ansar {
  // file: MelliBankPos.js (completed)
  static async bill ({ ComPort, IpServerLan, PoseConfirmFiche }) {
    _AuthorizationId = 1
    this.comPort = ComPort
    this.ipServerLan = IpServerLan
    this.poseConfirmFiche = PoseConfirmFiche
    return new Promise((resolve, reject) => {
      SEPWebWrapper = new ActiveXObject("SEPWebWrapper")
      eval("function SEPWebWrapper::CardSwiped(sender, e) {return CardSwipedd(sender, e);}")
      eval("function SEPWebWrapper :: PosResultReceived(sender, e) {return PosResultReceivedd(sender, e);}")
      eval("function SEPWebWrapper :: ErrorReceived(sender, e) {return ErrorReceivedd(sender, e);}")
    })
  }
  CardSwipedd (sender, e) {
    // console.client.CardSwiped = function ( AuthorizationId, CardNumber, TerminalId)
    try {
      // alert("switch pos");
      var pan = e.CardNumber
      let termId = e.TerminalId
      let n = pan.length
      _AuthorizationId = e.AuthorizationId
      this.Amount(_PayablePrice)
    } catch (e) {
      console.log("CardSwipedd=" + e)
    }
  }
  Amount (Payable) {
    try {
      var s = "<?xml version=\"1.0\" encoding=\"utf-16\"?>" +
                      "<List>" +
                      "<print>" +
                      "<item>123</item>" +
                      "<value>a</value>" +
                      "<alignment>0</alignment>" +
                      "<receiptrype>0</receiptrype>" +
                      "</print>" +
                      "<print>" +
                      "<item>456</item>" +
                      "<value>c</value>" +
                      "<alignment>1</alignment>" +
                      "<receipttype>1</receipttype>" +
                      "</print>" +
                       "</List>"

      SEPWebWrapper.SendAmount(Payable, _AuthorizationId, s, 0)
    } catch (E) {
      console.log("Amount=" + E)
    }
  }

  ErrorReceivedd (sender, e) {
    this.ShowErrorResponse(e.ResponseCode)
  }

  PosResultReceivedd (sender, e) {
    if (e.IsSuccessful && e.ResponseCode == "00") {
      var Esup = document.getElementById("Esup")

      if (_ObjOnPrice == 1) {
        Esup.Content.UIncome_Details.ConfirmFicheViaPose_Ansar(e.ReturnPAN)
      } else if (_ObjOnPrice == 2) {
        Esup.Content.UDutyAllFiches_Nosazi.ConfirmFicheViaPose_Ansar(e.ReturnPAN)
      } else if (_ObjOnPrice == 3) {
        Esup.Content.UDutyAllFiches_Senfi.ConfirmFicheViaPose_PAX(e)
      } else if (_ObjOnPrice == 4) {
        Esup.Content.UDutyAllFiches_Garbage.ConfirmFicheViaPose_PAX(e)
      } else if (_ObjOnPrice == 5) {
        Esup.Content.FrmDutyPathOccupation.ConfirmFicheViaPose_PAX(e)
      } else if (_ObjOnPrice == 6) {
        Esup.Content.frmDutyCom20.ConfirmFicheViaPose_PAX(e)
      }
    } else {
      this.ShowErrorResponse(e.ResponseCode)
    }
  }

  ShowErrorResponse (ResponseCode) {
    var tmpMessage = ""

    switch (ResponseCode) {
      case "00":
        tmpMessage = "موفق : تراکنش به درستی انجام شده است"
        break
      case "02":
        tmpMessage = "اصلاحيه تراکنش قبلا انجام شده است. )در پاسخ به ارسال اصلاحيه("
        break
      case "03":
        tmpMessage = "پذيرنده کارت شناخته شده نيست. تراکنش بازکردف سازماف را انجام دهيد"
        break
      case "06":
        tmpMessage = "اشکال در سيستم مرکزی"
        break
      case "12":
        tmpMessage = "پيام نادرست است. يکی از دلايک اين خطا عدم مجوز پايانه در انجام عمليات مورد نظر می باشد"
        break
      case "13":
        tmpMessage = "مقدار ريالی غلط است )مبلغ تراکنش صحيح نمی باشد("
        break
      case "14":
        tmpMessage = "شماره کارت شناخته شده نيست )کارت در سيستم خدمات کارت نا معتبر است("
        break
      case "15":
        tmpMessage = "در پاسخ به تراکنش باز کردف سازماف : قبلا باز شده است"
        break
      case "16":
        tmpMessage = "در پاسخ به تراکنش بستن سازماف : قبلا بسته شده است"
        break
      case "19":
        tmpMessage = "در پاسخ به تراکنش تراز جاری پايانه : مجمو تراکنش های پايانه با مجمو تراکنش های مرکز برابر نيست"
        break
      case "25":
        tmpMessage = "داده ای از تراکنش ارسالی غلط است و اين داده در مرکز پيدا نشد. يکی از اين موارد شماره پايانه است()"
        break
      case "30":
        tmpMessage = "فرمت اشتباه است"
        break
      case "33":
        tmpMessage = "تاريخ انقضای کارت سپری شده است"
        break
      case "34":
        tmpMessage = "تراکنش مالی تاييد نشده است"
        break
      case "41":
        tmpMessage = "کارت به علت مفقود شدف مسدود موقت است"
        break
      case "43":
        tmpMessage = "کارت به علت دزديده شدف دايما مسدود است"
        break
      case "51":
        tmpMessage = "کارت فاقد موجودی کافی جهت انجام تراکنش مالی است"
        break
      case "55":
        tmpMessage = "رمز نامعتبر"
        break
      case "56":
        tmpMessage = "کارت نامعتبر"
        break
      case "57":
        tmpMessage = "تراکنش غير مجاز"
        break
      case "61":
        tmpMessage = "مبلغ تراکنش های اين کارت از حد مجاز گذشته است"
        break
      case "62":
        tmpMessage = "مبلغ تراکنش روز اين کارت از حد مجاز گذشته است"
        break
      case "65":
        tmpMessage = "تعداد تراکنش های مربوط به اين کارت از حد مجاز گذشته است"
        break
      case "66":
        tmpMessage = "حساب مسدود است"
        break
      case "75":
        tmpMessage = "تعداد رمز نا معتبر از حد مجاز گذشته است"
        break
      case "77":
        tmpMessage = "روز مالی صحيح نيست"
        break
      case "78":
        tmpMessage = "کارت فعال نيست"
        break
      case "79":
        tmpMessage = "حساب تعريف نشده است"
        break
      case "80":
        tmpMessage = "به دليک اشکال در حساب تراکنش پذيرفته نيست"
        break
      case "81":
        tmpMessage = "کارت قبلا باطک شده است"
        break
      case "83":
        tmpMessage = "سيستم مرکزی آماده نيست"
        break
      case "84":
        tmpMessage = "سيستم مرکزی فعال نيست"
        break
      case "85":
        tmpMessage = "خطای درونی سيستم مرکزی"
        break
      case "86":
        tmpMessage = "تراکنش روی اين دستگاه مجاز نيست"
        break
      case "87":
        tmpMessage = "خطای درونی سيستم مرکزی"
        break
      case "88":
        tmpMessage = "خطای درونی سيستم مرکزی"
        break
      case "89":
        tmpMessage = "خطای درونی سيستم مرکزی"
        break
      case "90":
        tmpMessage = "ارتباط در حين پردازش قطع شده است"
        break
      case "91":
        tmpMessage = "در مرکز و اعلام آف توسط مرکز به دستگاه Time out عدم دريافت پاسخ به علت وقوع"
        break
      case "92":
        tmpMessage = "صادر کننده نا معتبر است"
        break
      case "93":
        tmpMessage = "به علت ترافيک تراکنشها صف تراکنشها در سيستم مرکزی پر شده است"
        break
      case "94":
        tmpMessage = "شماره تراکنش تکراری است"
        break
      case "96":
        tmpMessage = "اشکال در سيستم مرکزی"
        break
      default:
        tmpMessage = "خطای نامشخص سوییچ شماره" + ErrorCode
    }
    alert(tmpMessage)

    var Esup = document.getElementById("Esup")
    if (_ObjOnPrice == 1) {
      Esup.Content.UIncome_Details.StopWaiting(tmpMessage)
    } else if (_ObjOnPrice == 2) {
      Esup.Content.UDutyAllFiches_Nosazi.StopWaiting(tmpMessage)
    } else if (_ObjOnPrice == 3) {
      Esup.Content.UDutyAllFiches_Senfi.StopWaiting(tmpMessage)
    } else if (_ObjOnPrice == 4) {
      Esup.Content.UDutyAllFiches_Garbage.StopWaiting(tmpMessage)
    } else if (_ObjOnPrice == 5) {
      Esup.Content.FrmDutyPathOccupation.StopWaiting(tmpMessage)
    } else if (_ObjOnPrice == 6) {
      Esup.Content.frmDutyCom20.StopWaiting(tmpMessage)
    }
  }
}
