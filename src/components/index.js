// common
import SafaMapMeasure from './common/safa-map-measure/SafaMapMeasure.vue'
import SafaList from './common/safa-list/SafaList.vue'
import SafaFileUploader from './common/safa-file-uploader/SafaFileUploader.vue'
import SafaTree from './common/safa-tree/SafaTree.vue'
import SafaCustomText from './common/text/SafaCustomText.vue'
import VerticalButtons from './common/buttons/vertical-buttons/VerticalButtons.vue'
import VerticalButton from './common/buttons/vertical-buttons/VerticalButton.vue'
import BtnSave from './common/buttons/BtnSave.vue'
import BtnBack from './common/buttons/BtnBack.vue'
import BtnNew from './common/buttons/BtnNew.vue'
import BtnCancel from './common/buttons/BtnCancel.vue'
import BtnEdit from './common/buttons/BtnEdit.vue'
import BtnDelete from './common/buttons/BtnDelete.vue'
import BtnDefault from './common/buttons/BtnDefault.vue'
import BtnSearch from './common/buttons/BtnSearch.vue'
import FormWrapper from './common/FormWrapper'
import VoteStatusTemplate from './commission/VoteStatusTemplate.vue'
import SideBySideGridTemplate from './commission/SideBySideGridTemplate.vue'
import safaPhoneCode from './common/validations/SafaPhoneCode'
import Sidebar from './common/Sidebar'
import Header from './common/Header'
// import InternalSection from './common/InternalSection'
import SafaStepper from './common/safa-stepper/SafaStepper.vue'
import DropdownWithIcon from './common/dropdown/DropdownWithIcon.vue'
import SafaNotice from './common/SafaNotice.vue'
import ImageCropper from '../components/ImageCropper.vue'
import ImageUploader from '../components/ImageUploader.vue'
import HelpDialog from './common/help-dialog/HelpDialog.vue'
import PosHelpDialog from './common/pos-help-dialog/PosHelpDialog.vue'

// specials
import GridActions from '../components/GridActions.vue'
import gridDatepicker from '../components/gridDatepicker.vue'
import GridCheckbox from '../components/GridCheckbox.vue'
import TimeStamp from '../components/TimeStamp.vue'
import SectionTitle from '../components/SectionTitle'
import FormActions from '../components/FormActions'
import FormStatus from '../components/FormStatus.vue'
// import ImageCropper from '../components/ImageCropper.vue'
import gridImage from '../components/gridImage.vue'
import ShowModal from '../components/ShowModal'
import GridStatus from '../components/GridStatus'
import GridProgressLine from '../components/GridProgressLine'
// import NosaziCodeInput from './NosaziCodeInputRefactor'
import NosaziCodeInput from './nosazi/NosaziCodeEditable'
import ClasseParvandeh from './ClasseParvandeh'
// import NosaziCodeInput from './NosaziCodeInput'
import FormHeaderByNosaziCode from './nosazi/NosaziCodeFormHeader'
import FormHeader from './FormHeader'
import EngineerSearchBox from './EngineerSearchBox'
import EngineerInfoBox from './EngineerInfoBox'
import OfficeInfoBox from './OfficeInfoBox'
import MemberOfficeAction from './MemberOfficeAction'

import EumAccountingDocumentingCause from './EumAccountingDocumentingCause'
import EumManagerConfirmLicence from './EumManagerConfirmLicence'
import EumObjonPriceTemplate from './EumObjonPriceTemplate'
import EumObjonPriceComboTemplate from './EumObjonPriceComboTemplate'
import EumOddmentTypeComboTemplate from './EumOddmentTypeComboTemplate'
// import RefreshCode from './RefreshCode' // manual append to forms
import SearchOffices from './SearchOffices'
import SearchEngineer from './SearchEngineer'
import EngineerActions from './EngineerActions'
import EstateActions from './EstateActions'
import OfficeActoins from './OfficeActoins'
import SafaTimePicker from './SafaTimePicker'
import ReleaseButtonTemplate from './ReleaseButtonTemplate'
import GridCombo from './GridCombo'
import GridEnum from './GridEnum'
import SafaComboEnum from './SafaComboEnum'

// AgGrid
import RegionTemplate from './grid-templates/ag-templates/RegionTemplate.vue'
import AgPriorityTemplate from './grid-templates/ag-templates/AgPriorityTemplate.vue'
import AgAggregateFotterTemplate from './grid-templates/ag-templates/AgAggregateFotterTemplate.vue'
import AgRelapseTemplate from './grid-templates/ag-templates/AgRelapseTemplate.vue'
import AgPastTemplate from './grid-templates/ag-templates/AgPastTemplate.vue'
import AgKarbariTemplate from './grid-templates/ag-templates/AgKarbariTemplate.vue'
import AgTasmimTemplate from './grid-templates/ag-templates/AgTasmimTemplate.vue'
import AgMeetingTemplate from './grid-templates/ag-templates/AgMeetingTemplate.vue'
import AgAgentCountTemplate from './grid-templates/ag-templates/AgAgentCountTemplate.vue'
import AgAgentNameCellRenderer from './grid-templates/ag-templates/AgAgentNameCellRenderer.vue'
import AgCKDotAgentColor from './grid-templates/ag-templates/AgCKDotAgentColor.vue'
import AgInlinePercentageCellRenderer from './grid-templates/ag-templates/AgInlinePercentageCellRenderer.vue'
import AgNoteAndLaterTimeCellRenderer from './grid-templates/ag-templates/AgNoteAndLaterTimeCellRenderer.vue'
import AgDifferenceDayCellRenderer from './grid-templates/ag-templates/AgDifferenceDayCellRenderer.vue'
import AgArchiveCellRenderer from './grid-templates/ag-templates/AgArchiveCellRenderer.vue'
import AgReportCellRenderer from './grid-templates/ag-templates/AgReportCellRenderer.vue'
import AgDescriptionReportCellRenderer from './grid-templates/ag-templates/AgDescriptionReportCellRenderer.vue'
import AgGridBlackListControlTemplate from './grid-templates/ag-templates/AgGridBlackListControlTemplate.vue'
import AgBlackListStatusTemplate from './grid-templates/ag-templates/AgBlackListStatusTemplate.vue'

// Responder Kartabl Grid Templates
import AgIsOthersReqAttached from './grid-templates/ag-templates/responder/AgIsOthersReqAttached.vue'
import AgCallbackBtn from './grid-templates/ag-templates/responder/AgCallbackBtn.vue'
import AgCallbackBtnCustomLabel from './grid-templates/ag-templates/responder/AgCallbackBtnCustomLabel.vue'
import AgIsInBlackList from './grid-templates/ag-templates/responder/AgIsInBlackList.vue'

// Audit
import USearchUParvandeh from 'src/forms/audit/search/partials/USearchUParvandeh.vue'

// grid-templates
import AgCompanyCallbackBtn from './grid-templates/ag-templates/AgCompanyCallbackBtn.vue'
import GridBlackListControl from './grid-templates/GridBlackListControl.vue'
import GridBlackListStatus from './grid-templates/GridBlackListStatus.vue'
import PictureTemplate from './grid-templates/PictureTemplate.vue'
import NationalCodeTemplate from './grid-templates/NationalCodeTemplate.vue'
import PhoneNumberTemplate from './grid-templates/PhoneNumberTemplate.vue'
import EconomicCodeTemplate from './grid-templates/EconomicCodeTemplate.vue'
import GridMoneyFormat from './grid-templates/GridMoneyFormat.vue'
import GridAreaFormat from './grid-templates/GridAreaFormat.vue'
import UsingGroupTemplate from './grid-templates/adp/UsingGroupTemplate'
import UsingTrepassTypeGroupTemplate from './grid-templates/adp/UsingTrepassTypeGroupTemplate'
import UsingGroupTemplate2 from './grid-templates/adp/UsingGroupTemplate2'
import UsingMojudTemplate from './grid-templates/adp/UsingMojudTemplate'
import ActivityTypeTemplate from './grid-templates/adp/ActivityTypeTemplate'
import TechnicalStaffTemplate from './grid-templates/adp/TechnicalStaffTemplate'
import ImpositionTypeTemplate from './grid-templates/adp/ImpositionTypeTemplate'
import UsingMojazTemplate from './grid-templates/adp/UsingMojazTemplate'
import OtherEquipmentGroupTemplate from './grid-templates/adp/OtherEquipmentGroupTemplate'
import ShahrsaziArchiveGroupTemplate from './grid-templates/adp/ShahrsaziArchiveGroupTemplate'
import UrbanViewTemplate from './grid-templates/adp/UrbanViewTemplate'
import PenaltyGroupTemplate from './grid-templates/adp/PenaltyGroupTemplate'
import UsingRequirementTemplate from './grid-templates/adp/UsingRequirementTemplate'
import UsingMosavabTemplate from './grid-templates/adp/UsingMosavabTemplate'
import ADPGridTemplate from './grid-templates/adp/ADPGridTemplate'
import FishStatusGridCombo from './grid-templates/FishStatusGridCombo'
import ComboRemoteList from './grid-templates/ComboRemoteList'
import DayOfWeekFormat from './grid-templates/DayOfWeekFormat'
import GridComment from './grid-templates/GridComment'
import GridExpandable from './grid-templates/GridExpandable'
import IsInBlackList from './grid-templates/IsInBlackList'
import CheckboxTextbox from './grid-templates/CheckboxTextbox'
import IsAttached from './grid-templates/IsAttached'
import IsOthersReqAttached from './grid-templates/IsOthersReqAttached'
import RequestTablet from './grid-templates/RequestTablet.vue'
import AgentStatus from './grid-templates/AgentStatus.vue'
// import GridMasterDetails from './grid-templates/GridMasterDetails'
import IsHoliday from './grid-templates/IsHoliday'
import LockableTextBox from './grid-templates/LockableTextBox'
import PaymentTypeGridCombo from './grid-templates/PaymentTypeGridCombo'
import RequestStatus from './grid-templates/RequestStatus'
import FileUploader from './grid-templates/FileUploader'
import ThreeEquipmentCombo from './grid-templates/ThreeEquipmentCombo'
import TextTemplate from './TextTemplate'
import ExpantionSection from './ExpantionSection'
import ArchiveWrap from './common/ArchiveWrap.vue'
import BulletinBoardContainer from './common/bulletin/BulletinBoardContainer'
import ValidationWrapperTemplate from './grid-templates/ValidationWrapperTemplate.vue'

export default {
  install (Vue) {
    // common
    Vue.component('ValidationWrapperTemplate', ValidationWrapperTemplate)
    Vue.component('ArchiveWrap', ArchiveWrap)
    Vue.component('BulletinBoardContainer', BulletinBoardContainer)
    Vue.component('safa-stepper', SafaStepper)
    Vue.component('safa-map-measure', SafaMapMeasure)
    Vue.component('safa-list', SafaList)
    Vue.component('safa-file-uploader', SafaFileUploader)
    Vue.component('safa-tree', SafaTree)
    Vue.component('btn-back', BtnBack)
    Vue.component('safa-custom-text', SafaCustomText)
    Vue.component('dropdown-with-icon', DropdownWithIcon)
    Vue.component('VoteStatusTemplate', VoteStatusTemplate)
    Vue.component('SideBySideGridTemplate', SideBySideGridTemplate)
    Vue.component('btn-save', BtnSave)
    Vue.component('BtnVerticals', VerticalButtons)
    Vue.component('BtnVertical', VerticalButton)
    Vue.component('btn-new', BtnNew)
    Vue.component('btn-cancel', BtnCancel)
    Vue.component('btn-edit', BtnEdit)
    Vue.component('btn-delete', BtnDelete)
    Vue.component('btn-default', BtnDefault)
    Vue.component('btn-search', BtnSearch)
    Vue.component('FormWrapper', FormWrapper)
    Vue.component('SafaPhoneCode', safaPhoneCode)
    Vue.component('LayoutSidebar', Sidebar)
    Vue.component('LayoutHeader', Header)
    Vue.component('SafaNotice', SafaNotice)
    // Vue.component('internal-section', InternalSection)
    Vue.component('image-cropper', ImageCropper)
    Vue.component('ImageUploader', ImageUploader)
    Vue.component('HelpDialog', HelpDialog)
    Vue.component('PosHelpDialog', PosHelpDialog)

    // specials
    Vue.component('TechnicalStaffTemplate', TechnicalStaffTemplate)
    Vue.component('FormActions', FormActions)
    Vue.component('FormStatus', FormStatus)
    Vue.component('GridStatus', GridStatus)
    Vue.component('GridTemplate', GridActions)
    Vue.component('GridCheckbox', GridCheckbox)
    Vue.component('TimeStamp', TimeStamp)
    Vue.component('GridDatepicker', gridDatepicker)
    Vue.component('SectionTitle', SectionTitle)
    Vue.component('GridImage', gridImage)
    Vue.component('GridProgressLine', GridProgressLine)
    Vue.component('ShowModal', ShowModal)
    Vue.component('SafaTimePicker', SafaTimePicker)
    Vue.component('NosaziCodeInput', NosaziCodeInput)
    Vue.component('ClasseParvandeh', ClasseParvandeh)
    Vue.component('FormHeaderByNosaziCode', FormHeaderByNosaziCode)
    Vue.component('EngineerSearchBox', EngineerSearchBox)
    Vue.component('EngineerInfoBox', EngineerInfoBox)
    Vue.component('MemberOfficeAction', MemberOfficeAction)
    Vue.component('OfficeInfoBox', OfficeInfoBox)
    Vue.component('OfficeActoins', OfficeActoins)
    Vue.component('EngineerActions', EngineerActions)
    Vue.component('EstateActions', EstateActions)
    Vue.component('SearchEngineer', SearchEngineer)
    Vue.component('FormHeader', FormHeader)
    Vue.component('EumAccountingDocumentingCause', EumAccountingDocumentingCause)
    Vue.component('EumManagerConfirmLicence', EumManagerConfirmLicence)
    Vue.component('EumObjonPriceComboTemplate', EumObjonPriceComboTemplate)
    Vue.component('EumObjonPriceTemplate', EumObjonPriceTemplate)
    Vue.component('EumOddmentTypeComboTemplate', EumOddmentTypeComboTemplate)
    Vue.component('SearchOffices', SearchOffices)
    Vue.component('ReleaseButtonTemplate', ReleaseButtonTemplate)
    Vue.component('GridCombo', GridCombo)
    Vue.component('GridEnum', GridEnum)
    Vue.component('SafaComboEnum', SafaComboEnum)
    Vue.component('UsingMojudTemplate', UsingMojudTemplate)
    Vue.component('UsingGroupTemplate', UsingGroupTemplate)
    Vue.component('UsingGroupTemplate2', UsingGroupTemplate2)
    Vue.component('UsingTrepassTypeGroupTemplate', UsingTrepassTypeGroupTemplate)
    Vue.component('ImpositionTypeTemplate', ImpositionTypeTemplate)
    Vue.component('OtherEquipmentGroupTemplate', OtherEquipmentGroupTemplate)
    Vue.component('ShahrsaziArchiveGroupTemplate', ShahrsaziArchiveGroupTemplate)
    Vue.component('UrbanViewTemplate', UrbanViewTemplate)
    Vue.component('UsingMojazTemplate', UsingMojazTemplate)
    Vue.component('PenaltyGroupTemplate', PenaltyGroupTemplate)
    Vue.component('UsingRequirementTemplate', UsingRequirementTemplate)
    Vue.component('UsingMosavabTemplate', UsingMosavabTemplate)
    Vue.component('ADPGridTemplate', ADPGridTemplate)
    Vue.component('ActivityTypeTemplate', ActivityTypeTemplate)
    Vue.component('FishStatusGridCombo', FishStatusGridCombo)
    Vue.component('ComboRemoteList', ComboRemoteList)
    Vue.component('DayOfWeekFormat', DayOfWeekFormat)
    Vue.component('grid-money-format', GridMoneyFormat)
    Vue.component('grid-area-format', GridAreaFormat)
    Vue.component('GridComment', GridComment)
    Vue.component('GridExpandable', GridExpandable)
    Vue.component('IsInBlackList', IsInBlackList)
    Vue.component('request-tablet-tempelate', RequestTablet)
    Vue.component('CheckboxTextbox', CheckboxTextbox)
    Vue.component('PictureTemplate', PictureTemplate)
    Vue.component('GridBlackListControl', GridBlackListControl)
    Vue.component('GridBlackListStatus', GridBlackListStatus)
    Vue.component('NationalCodeTemplate', NationalCodeTemplate)
    Vue.component('PhoneNumberTemplate', PhoneNumberTemplate)
    Vue.component('EconomicCodeTemplate', EconomicCodeTemplate)
    Vue.component('IsAttached', IsAttached)
    Vue.component('IsOthersReqAttached', IsOthersReqAttached)
    Vue.component('IsHoliday', IsHoliday)
    Vue.component('LockableTextBox', LockableTextBox)
    Vue.component('PaymentTypeGridCombo', PaymentTypeGridCombo)
    Vue.component('RequestStatus', RequestStatus)
    Vue.component('ThreeEquipmentCombo', ThreeEquipmentCombo)
    Vue.component('TextTemplate', TextTemplate)
    Vue.component('ExpantionSection', ExpantionSection)
    Vue.component('AgentStatus', AgentStatus)
    Vue.component('FileUploader', FileUploader)

    // ag-Grid
    Vue.component('agRegionTemplate', RegionTemplate)
    Vue.component('agPriorityTemplate', AgPriorityTemplate)
    Vue.component('agAggregateFotterTemplate', AgAggregateFotterTemplate)
    Vue.component('agRelapseTemplate', AgRelapseTemplate)
    Vue.component('agPastTemplate', AgPastTemplate)
    Vue.component('agKarbariTemplate', AgKarbariTemplate)
    Vue.component('agTasmimTemplate', AgTasmimTemplate)
    Vue.component('agMeetingTemplate', AgMeetingTemplate)
    Vue.component('agAgentCountTemplate', AgAgentCountTemplate)
    Vue.component('agAgentNameCellRenderer', AgAgentNameCellRenderer)
    Vue.component('AgCKDotAgentColor', AgCKDotAgentColor)
    Vue.component('agInlinePercentageCellRenderer', AgInlinePercentageCellRenderer)
    Vue.component('agNoteAndLaterTimeCellRenderer', AgNoteAndLaterTimeCellRenderer)
    Vue.component('agDifferenceDayCellRenderer', AgDifferenceDayCellRenderer)
    Vue.component('agDescriptionReportCellRenderer', AgDescriptionReportCellRenderer)
    Vue.component('agGridBlackListControlTemplate', AgGridBlackListControlTemplate)
    Vue.component('agBlackListStatusTemplate', AgBlackListStatusTemplate)
    Vue.component('agReportCellRenderer', AgReportCellRenderer)
    Vue.component('agArchiveCellRenderer', AgArchiveCellRenderer)
    Vue.component('agCompanyCallbackBtn', AgCompanyCallbackBtn)

    // Responder Kartabl Grid Templates
    Vue.component('agIsOthersReqAttached', AgIsOthersReqAttached)
    Vue.component('agCallbackBtn', AgCallbackBtn)
    Vue.component('AgCallbackBtnCustomLabel', AgCallbackBtnCustomLabel)
    Vue.component('agIsInBlackList', AgIsInBlackList)

    // Audit
    Vue.component('USearchUParvandeh', USearchUParvandeh)
  }
}
