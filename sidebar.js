export default [
  {
    id: 'cdbc43a3-8aa8-41bc-b2eb-9ba8cee71727',
    name: 'kartable',
    title: 'کارتابل',
    icon: 'inbox',
    public: true
  },
  {
    id: '3C82C6CD-EAAA-4B0B-AF54-F5A02BC0D952',
    name: 'shahrsazi',
    title: 'منوی اصلی شهرسازی',
    displayTitle: 'شهرسازی',
    icon: 'img:sidebar/Shahrsazi.svg',
    parent: {
      name: 'shahrsazi',
      id: 'ACE63A06-E835-457D-A1EA-3B477DD9E69B', // appId
      title: 'شهرسازی'
    },
    nodes: [
      {
        id: '0DF0411E-1060-420F-9D19-54DA774FE5F7',
        name: 'UParvandehInfo',
        title: 'تشکیل پرونده',
        icon: 'img:subMenu/tashkil parvande.svg',
        help: 'tashkil-parvande/help.pdf',
        nodes: [
          // Done
          {
            id: '363EF55E-C6D3-44EB-88C4-F4C2450CBB22',
            name: 'UEblaghyeComision',
            title: 'ابلاغیه کمیسیون',
            link: '/parvande/eblaghye-comision',
            icon: 'payment'
          },
          // {
          //   id: '363EF55E-C6D3-44EB-88C4-F4C2450CBB22',
          //   name: 'UParvandehAmlak',
          //   title: 'sdds',
          //   link: '/work-flow/amlak-control',
          //   icon: 'payment'
          // },
          {
            // Done
            id: 'C4171DB4-E0B3-4CB9-8A00-C7E9D093326B',
            name: 'UParvandehInfo',
            title: 'اطلاعات پرونده',
            link: '/parvandeh/info',
            icon: 'source'
          },
          // {
          //   id: '501B42CD-CCCE-4AFE-AFE9-539E51F5B1A3',
          //   name: 'UCrowdArchive',
          //   title: 'آرشیو شهروندسپاری',
          //   icon: 'archive',
          //   public: true
          // },
          {
            // Done
            id: '802D6CD7-C72A-48AA-922E-0CAC3B061AF9',
            name: 'UTashkilParvandehSimple',
            title: 'اطلاعات پرونده ساده',
            link: '/parvandeh-simple/info',
            icon: 'picture_in_picture'
          },
          {
            // Done
            id: 'FD9A55FF-4DA3-40BE-B29D-F82E10EE6767',
            name: 'UTashkilParvandehAmlak',
            title: 'اطلاعات پرونده املاک',
            link: '/parvandeh-amlak/info',
            icon: 'feed'
          },
          {
            // Done
            id: 'A7DBCF63-423A-406F-AC54-3831D7A9A0E0',
            name: 'UStaffInfo',
            title: 'اطلاعات مسئولین',
            link: '/staff-info',
            icon: 'supervised_user_circle'
          },
          {
            // Done
            id: '2438F07C-F3D0-45BA-9226-EAE97BC3CC24',
            name: 'UInquiryAndSendingToState',
            title: 'استعلام و ارسال به املاک',
            link: '/inquiry-and-sending-to-state/UInquiryAndSendingToState',
            icon: 'send',
            popup: true,
            width: 750,
            height: 550,
            props: { padding: false }
          },
          {
            // Done
            id: 'DA43FBC6-DC73-439A-851B-FDEB7D24E591',
            name: 'UElameZabete',
            title: 'اعلام ضابطه',
            link: '/eleme-zabete/UElameZabete',
            icon: 'view_carousel'
          },
          {
            // Done
            id: '0DF43924-6063-4663-BD30-87167642F8D0',
            name: 'UElameZabeteBasedOnRequest',
            title: 'اعلام ضابطه بر اساس درخواست',
            link: '/eleme-zabete-based-on-request/UElameZabeteBasedOnRequest',
            icon: 'horizontal_distribute'
          },
          // Done
          {
            id: '24869D43-F24D-4D86-ACDE-11D6C8AE77C4',
            name: 'UElameZabeteCommission',
            title: 'اعلام ضابطه کمیسیون ها',
            link: '/elame-zabete-commission/UElameZabeteCommission',
            icon: 'campaign',
            popup: true,
            width: '900px',
            height: '700px'
          },
          {
            // Done
            id: '990504D7-CF02-4CC9-B20B-4FB6FC5C64D1',
            name: 'OwnerShipInfo',
            title: 'پیش فروش آپارتمان',
            link: '/ownership-info',
            icon: 'equalizer'
          },
          {
            // Done
            id: '04AFBB57-661D-469C-9E35-39DFA2323C0B',
            name: 'URefreshCodeTransfer',
            title: 'انتقال کد نوسازی',
            link: '/parvandeh/refresh-code-transfer',
            icon: 'library_books'
          },
          {
            // Done
            id: '1fe00ca0-22a8-4cf1-a0b2-bc31a51ae92f',
            name: 'UBaroKafTabs',
            title: 'بروکف',
            link: '/parvandeh/barokaf',
            icon: 'tab_unselected'
          },
          {
            // No
            id: '05116a6f-1bba-4ff0-90ed-81c6b4cfc256',
            name: 'UServey',
            title: 'نقشه برداری',
            link: '/parvandeh/UServey',
            icon: 'map'
          },
          {
            // Done
            id: '115C736D-7FB4-4281-8C4D-5D6CCE647BBA',
            name: 'UBedehkariBestankari',
            title: 'بدهکاری/بستانکاری',
            link: '/parvande/bedehkari-bestankari',
            icon: 'surround_sound'
          },
          // Done
          {
            id: '5f50fe08-92ca-4c35-99d2-d6524073aad2', // سکیوریتی
            // id: 'E1F121CC-9471-41F4-BC7F-839810A4D05C', // ارسالی بک اند
            name: 'Payankar',
            title: 'پایانکار',
            link: '/payankar',
            icon: 'view_agenda'
          },
          // Not in
          // {
          //   id: '5f50fe08-92wa-4c35-99d2-d6524073aad2',
          //   name: 'Parvaneh',
          //   title: 'پروانه',
          //   link: '/parvaneh',
          //   icon: 'view_array',
          //   checkPermission: false
          // },
          // so so
          {
            // id: 'E5B0D2CA-419E-4EA7-A648-69E2C84C172E', // ارسالی بک اند
            // id: 'BB3118CD-5DE1-4044-A4BD-4B67C1412570', // ارسالی بک اند
            id: 'a2253dce-e1f4-41c6-a101-13d2672ce65f', // سکیوریتی
            name: 'UAgreementTabs',
            title: 'توافقنامه',
            link: '/shahrsazi/agreement',
            icon: 'import_contacts'
          },
          // Done
          {
            id: 'BEED56A7-6CB0-4C51-8950-12388CA99289',
            name: 'UTaahodat',
            title: 'تعهدات',
            icon: 'rule'
          },
          // No
          {
            id: '5414ee47-c398-4a33-985f-883caaec6dd5', // سکیوریتی
            name: 'UploadCommitment',
            title: 'آپلود فایل تعهدات',
            icon: 'upload_file'
          },
          // {
          //   // Do mistake
          //   id: 'BEED56A7-6CB0-4C51-8950-12388CA99289',
          //   name: 'UTaahodat',
          //   title: 'تعهد و رضایت',
          //   link: '/commitment/by-selected-request',
          //   icon: 'pan_tool'
          // },
          // Done
          {
            id: '95df568c-77f6-4375-992c-776ff9708d55', // سکیوریتی
            // id: '9F029CB1-1477-4E2D-9D70-70A83B221513', // ارسالی بک اند
            name: 'UCommitmentByNosaziCode',
            title: 'تعهد و رضایت براساس کدنوسازی',
            link: '/commitment/by-nosazi-code',
            icon: 'folder_shared'
          },
          // Done
          {
            id: 'C1C1E026-A9CC-4224-BF4F-A78ACFEF2625',
            name: 'UMokatebatConfirm',
            title: 'تایید مکاتبات',
            link: '/mokatebat/confirm',
            icon: 'spellcheck',
            popup: true,
            width: 1000,
            height: 600
          },
          // Done
          {
            id: '77D7602C-2C6B-4ED4-B49F-EF83F3098763',
            name: 'ApprovalManager',
            title: 'تأیید مدیران',
            link: '/approval-manager',
            icon: 'visibility'
          },
          // Done
          {
            id: '3FF009CF-5ED7-4CA0-A5F6-05038844371F',
            name: 'TajmiArseDastgah',
            title: 'تجمیع عرصه - دستگاه',
            link: '/tajmi-arse-dastgah',
            icon: 'view_week',
            minWidth: 400,
            width: 700,
            minHeight: 300,
            height: 500
          },
          // Done
          {
            id: 'B4DAEC20-0FF4-4311-B708-21596CBF1346',
            name: 'Tajmi',
            title: 'تاریخچه تجمیع',
            link: '/tajmi',
            icon: 'youtube_searched_for'
          },
          // Done
          {
            id: '6ABB0ED3-F060-4156-A490-C7FFB1213C5F',
            name: 'TajmiBasedOnRequest',
            title: 'تاریخچه تجمیع بر اساس درخواست',
            link: '/tajmi-request',
            icon: 'youtube_searched_for'
          },
          // Done
          {
            id: 'DC6E1072-A04D-41b6-93C6-286CCCCA878F',
            name: 'TafkikArse',
            title: 'تفکیک عرصه',
            link: '/tafkik-arse',
            icon: 'add_to_queue'
          },
          // Done
          {
            id: '13B624C3-FF27-4259-A27E-596D457B955B',
            name: 'UChangeRefreshCode',
            title: 'تغییر کد نوسازی',
            icon: 'change_circle',
            link: '/parvandeh/change-refresh-code'
          },
          // Done
          {
            // id: '1aa63d2a-6d5f-4318-be15-a9eec7f679d3',
            id: '6DADCE90-A2D3-4F30-824D-0C0FBCAED318', // ارسالی بک اند و سکیوریتی
            name: 'CommissionFine',
            title: 'جریمه / لایحه کمیسیون',
            link: '/commission/commission-fine',
            icon: 'folder_shared'
          },
          // Done
          {
            id: 'BFD6CBAB-45D5-4389-B895-17410633ED84',
            name: 'UChangeRefreshCodeInBlock',
            title: 'تغییر کد نوسازی در بلوک',
            link: '/parvandeh/change-refresh-code-in-block',
            icon: 'fiber_smart_record'
          },
          // Done
          {
            id: '614CA677-D9C8-4FEA-825B-5FD5C648D65A',
            name: 'UConvertApartmentToArse',
            title: 'تبدیل آپارتمان به عرصه',
            link: '/parvandeh/convert-apartment-to-arse',
            icon: 'featured_video'
          },
          // Done
          {
            id: '7D7E6BCD-C26D-4C8F-9E3D-74336CD2B849',
            name: 'UConvertArseToApartment',
            title: 'تبدیل عرصه به آپارتمان',
            link: '/parvandeh/convert-arse-to-apartment',
            icon: 'movie'
          },
          // Done
          {
            id: '12E7002B-45D9-4F93-B7BC-26A20941F596',
            name: 'UConvertDeviceToBuilding',
            title: 'تبدیل دستگاه به ساختمان',
            link: '/parvandeh/convert-device-to-building',
            icon: 'branding_watermark'
          },
          // Done
          {
            id: 'DB47D010-CD6D-4959-9075-54DBAF4C1F23',
            name: 'UConvertBuildingToDevice',
            title: 'تبدیل ساختمان به دستگاه',
            link: '/parvandeh/convert-building-to-device',
            icon: 'call_to_action'
          },
          // Done
          {
            id: '35C784D3-CC88-47FA-A72C-187126284BE8',
            name: 'UConvertArseToDevice',
            title: 'تبدیل عرصه به دستگاه',
            link: '/parvandeh/convert-arse-to-device',
            icon: 'featured_video'
          },
          // Done

          // Done
          {
            id: 'A9F7F491-E1E1-44F6-AFCF-2E6F5032C03F',
            name: 'UDiscountsTabs',
            title: 'تخفیفات',
            link: '/parvandeh/discounts',
            icon: 'repeat'
          },
          // Done
          {
            id: 'D39B72E3-054E-4F88-91CF-B6B6AC4B5D53',
            name: 'UDiscountWithNationalCode',
            title: 'تخفیفات با کد ملی',
            link: '/parvande/discount-with-national-code',
            icon: 'call_merge'
          },
          // Done
          {
            id: 'b8b38685-e29d-48d4-8c4f-b0d13f22cad9', // سکیوریتی
            // id: '51908F45-6B57-4649-B7F1-5CAA2F852DA7', // ارسالی بک اند
            name: 'UAnalysisMissFoul',
            title: 'تحلیل تعیین خلاف ساختمان',
            link: '/analysis/miss-foul',
            icon: 'contact_mail'
          },
          // Done
          {
            // id: 'f2423368-6206-45e0-b369-f2c83c41de49',
            id: '6A371FC7-570A-4F9C-A83E-EACA0685A826', // ارسالی بک اند
            name: 'UAnalysisParvaneh',
            title: 'تحلیل پروانه ساختمان',
            link: '/analysis/parvaneh',
            icon: 'contacts'
          },
          // Done
          // {
          //   // id: '3edd7723-d603-4036-8dc1-9b4fb5ab9141',
          //   // id: 'a240b8b4-0ad3-4956-b8ce-c0ab021c826c', //  نمایش خود فرم
          //   id: '4904923D-0110-4FB0-A12F-8AD93CDDB926', // ارسالی بک اند
          //   // id: '8e7e4255-abd0-4215-b150-a1c166e9f384', // سکیوریتی جزئیات تحلیل موافقت اصولی
          //   name: 'UAnalysisMovafeghatOsooli',
          //   title: 'تحلیل موافقت اصولی ساختمان',
          //   link: '/analysis/movafeghat-osooli',
          //   icon: 'contact_phone'
          // },
          // {
          //   // Cor
          //   // Done is complete
          //   id: 'cafc77a3-57be-4cb9-9a3b-a2eab804e4c7',
          //   name: 'RequestSubmission2',
          //   title: 'ثبت درخواست',
          //   link: '/request-submission',
          //   icon: 'touch_app'
          // },
          // Done
          {
            id: '243B3099-F29E-4F8E-84EA-A5DCC79D2C94',
            name: 'RequestSubmission',
            title: 'ثبت درخواست جدید',
            link: '/request-submission',
            icon: 'touch_app'
          },
          // Done
          {
            id: 'C0CF3903-2FDD-4C0F-A4FE-B4ABEBCEFBE1',
            name: 'RequestSubmissionPolice',
            title: 'ثبت درخواست پلیس ساختمان',
            link: '/request-submission-police',
            icon: 'view_quilt'
          },
          // Done
          {
            id: 'ED7C0650-1AE6-412A-A64F-C3C7192389D3',
            name: 'UFirePeygiri',
            title: 'ثبت و پیگیری پرونده نظارت آتش نشانی',
            link: '/parvande/fire-peygiri',
            icon: 'video_call'
          },
          // Done
          {
            id: '9A84721F-6B52-42FC-8679-468E4AE120E8',
            name: 'UMapCommandTabs',
            title: 'دستور نقشه',
            link: '/parvandeh/map-command',
            icon: 'work'
          },
          // Done
          {
            id: '216837DB-FA13-4265-B0DF-9255C4EB4833',
            name: 'RevokedRequest',
            title: 'درخواست های ابطال شده',
            link: '/revoked-request',
            icon: 'visibility_off'
          },
          // Done
          // {
          //   id: '1E0F7073-B4C6-4EB9-82CE-891D6EB4D3B1',
          //   name: 'UParvandeHelp',
          //   title: 'راهنمای تشکیل پرونده',
          //   link: '/parvande/parvande-help',
          //   icon: 'subscriptions'
          // },
          // Done
          {
            id: 'dde2ddf5-ef90-47a3-b263-27b5c1f1e9e6', // سکیوریتی
            // id: 'DD381B19-DEF5-4957-BA5A-A6499828A90D', // ارسالی بک اند
            name: 'UTechnicalId',
            title: 'شناسنامه فنی',
            link: '/parvandeh/technical-id',
            icon: 'view_module'
          },
          // Done
          {
            id: '01B12921-CCC2-4845-BDE0-8BE6F1260B6B',
            name: 'UCityAndHouse',
            title: 'شهر و خانه',
            link: '/parvande/city-and-house',
            icon: 'business'
          },
          // Done
          {
            // id: '5f50fe08-92ca-4c35-99d2-d6524073aad2',
            id: '40683478-0A07-4C78-B4F3-DA2232DB5EFC',
            name: 'TarheTafsili',
            title: 'طرح تفصیلی',
            link: '/tarhe-tafsili',
            icon: 'vertical_split'
          },
          // Done
          {
            id: 'E824F8D6-D480-4481-A1A9-83B306D99A51',
            name: 'Patterns',
            title: 'طرح ها',
            link: '/patterns',
            icon: 'featured_play_list'
          },
          // Done
          {
            id: 'A715FED7-7A69-4838-BF02-22CB07E074F3',
            name: 'UnsubscribeFinancialSystem',
            title: 'فیش های ارسال نشده به سیستم مالی',
            link: '/unsubscribe-financial-system',
            icon: 'explicit'
          },
          {
            id: 'EA8A2707-7F7E-4B42-9277-AAEE84F3B3FE',
            name: 'FinancialIntermediaries',
            title: 'واسط های مالی',
            icon: 'explicit'
          },
          {
            id: '52843101-650D-4956-A6AF-CDE1C9E425B9',
            name: 'UJariWithMomayezi',
            title: "تطبیق کد نوسازی جاری با ممیزی",
            link: '/parvandeh/jari-with-momayezi',
            icon: 'repeat_one'
          },
          // Done
          {
            id: '512303B2-394D-4981-8821-DB515C3588C8',
            name: 'UCopyAuditToParvandeh',
            title: 'کپی اطلاعات ممیزی به تشکیل پرونده',
            link: '/copy-audit-to-parvandeh',
            icon: 'polymer'
          },
          // Done
          {
            id: '11B82007-5214-4087-BAEE-4D7A1B72D944',
            name: 'UMapControlTabs',
            title: 'کنترل نقشه',
            link: '/parvandeh/map-control',
            icon: 'gps_fixed'
          },
          // Done
          {
            id: 'D811D60B-B05D-4845-806A-CBB98931360E',
            name: 'copyMapControl',
            title: 'کپی کنترل نقشه و تشکیل پرونده',
            link: '/parvandeh/copy-map-control',
            icon: 'queue_play_next'
          },
          // Done
          {
            id: '226CC47B-A0EA-468D-A0C0-5B8579C9FAD1',
            name: 'UkomiteyeFanny',
            title: 'کمیته فنی',
            link: '/parvande/komiteye-fanny',
            icon: 'subtitles'
          },
          // Done
          {
            id: 'E0B9C4D8-E45D-42A0-B56F-659BE1A9E047',
            name: 'IncomeInsuranceReport',
            title: 'گزارش بیمه درآمد',
            link: '/income-insurance-report',
            icon: 'art_track'
          },
          // {
          //   // Cor
          //   id: '5f50ge08-92wa-4c35-99d2-d6524073aa87',
          //   name: 'CertificateOfContrary',
          //   title: 'گواهی عدم خلاف',
          //   link: '/certificate-contrary',
          //   icon: 'view_day'
          // },
          // Done
          {
            // id: '8a5bde21-9221-43f4-9d16-ace2a8e41c1f',
            id: 'DCF56755-EC1F-452B-9A51-5B6A1103425A', // ارسالی بک اند
            name: 'UMovafeghatOsooliListTabs',
            title: 'لیست موافقت اصولی',
            link: '/shahrsazi/movafeghat-osooli-list',
            icon: 'payment'
          },
          // Done
          {
            id: '0BD640BC-634F-4029-BD59-B8ED417394A0',
            name: 'UTashkilParvandehAudit',
            title: 'ممیزی',
            link: '/audit/info',
            icon: 'folder_shared'
          },
          // Done
          {
            id: '1A7F6340-925F-47E5-AA52-4778A74918D6',
            name: 'UBuildingDifferences',
            title: 'مغایرت های ساختمان',
            link: '/parvandeh/building-differences',
            icon: 'folder_shared'
          },
          // Done
          {
            id: 'D65141C0-CC1B-4B81-81FA-624E11AA4EE3',
            name: 'LettersByNosaziCode',
            title: 'مکاتبات براساس کد نوسازی',
            link: '/letters/by-nosazi-code',
            icon: 'connect_without_contact'
          },
          // Done
          {
            id: '6B462A88-8E97-4B06-A17C-95FA7E278669',
            name: 'LettersBySelectedRequest',
            title: 'مکاتبات',
            link: '/letters/by-selected-request',
            icon: 'settings_remote'
          },
          // Done
          {
            // id: '4b18a2d1-77f2-4a82-ba91-d291f57347bc', // قبلی
            // id: 'BB3118CD-5DE1-4044-A4BD-4B67C1412570', // ارسالیه بک اند
            id: 'E5B0D2CA-419E-4EA7-A648-69E2C84C172E', // ارسالیه بک اند
            name: 'PrincipalAgreement',
            title: 'موافقت اصولی',
            link: '/principal-agreement',
            icon: 'view_column'
          },
          // Done
          {
            id: 'd6cacb18-a9d8-4a83-b074-e36726ebf948', // سکیوریتی
            name: 'Mafasa',
            title: 'مفاصا',
            link: '/mafasa',
            icon: 'view_headline'
          },
          // Done
          {
            id: '680AD665-6BA4-4AA4-98F5-DEDCDE4C6CAA',
            name: 'ElevatorSpecification',
            title: 'مشخصات آسانسورها',
            link: '/elevator-specification',
            icon: 'games'
          },
          {
            // Cor
            // Done is complete
            id: '168A1519-A480-4032-B315-4AFBF9DD6C7B',
            name: 'UExportLetters',
            title: 'نامه های صادره',
            link: '/export-letters',
            icon: 'folder_shared'
          },
          // Done
          {
            id: 'CDD64869-CF28-4378-B3EE-E2244CB40F33',
            name: 'UBuildingInternalMaps',
            title: 'نقشه های داخلی ساختمان',
            link: '/parvande/building-inhternal-maps',
            icon: 'maps_home_work'
          },
          // Done
          {
            // id: '9243c1a2-8232-4077-962a-faeb241504c2',
            id: '016892EA-D565-490f-BCFA-E7773FD73F19', //  ارسالی بک اند
            name: 'UHowToSeperateArse',
            title: 'نحوه تفکیک عرصه',
            link: '/parvande/how-to-seperate-arse',
            icon: 'payment'
          },
          // Done
          {
            id: '43DDD119-30B5-4DBB-98A2-6E564936B5A4',
            name: 'EditRequestInfo',
            title: 'ویرایش اطلاعات درخواست',
            link: '/edit-request-info',
            icon: 'view_stream'
          },
          // Done
          {
            id: 'a2c35b19-2e1a-420f-800d-fe8eeb067c95', // سکیوریتی
            // id: 'af2914bc-5de3-4de1-9093-8c2ab17aa547', // ارسالی بک اند
            name: 'UPeace',
            title: 'صلحنامه',
            link: '/peace/UPeace',
            icon: 'gavel'
          },
          {
            id: 'D5B9A620-1E7E-40A1-87E6-27EE400EE75A',
            name: 'UCommitmentsCheckList',
            title: 'چک لیست',
            link: '/check-list/UCommitmentsCheckList',
            icon: 'checklist'
          },
          {
            id: '8AC09CF2-ED54-432E-B14A-B94023C3C8FB',
            name: 'OfficeCheckList',
            title: 'چک لیست ادارات',
            link: '/office-check-list/OfficeCheckList',
            icon: 'credit_score'
          },
          {
            id: '49B4C031-EA83-459E-9C7C-BACF4AD71710',
            name: 'UTechnicalstaff',
            title: 'هیئت فنی',
            link: '/technical-staff/UTechnicalstaff',
            icon: 'view_stream'
          },
          // Done
          {
            // id: '35dd3d88-3e56-4dba-a051-cb9fed97cc89',
            id: '02767BFF-82E0-4F5F-8CAC-41080F0E9E77', // ارسالی بک اند
            name: 'UMoshakhasatCommission',
            title: 'مشخصات کمیسیون',
            link: '/moshakhasat-commission/UMoshakhasatCommission',
            icon: 'quiz'
          },
          // Done
          {
            // id: '9CD393C1-1DE8-4959-BCDF-96C99C21C013',
            id: 'BAA66332-EA48-4C4B-BBD0-EF37867F7170', // ارسالی بک اند
            name: 'CommissionDraft',
            title: 'پیش نویس کمیسیون',
            link: '/commission/CommissionDraft',
            icon: 'drive_file_rename_outline'
          },
          {
            id: 'C62D919B-71AD-428A-B884-E24621AF124D',
            name: 'UrbanViewPerspective',
            title: 'نما و منظر شهری',
            // link: '/urbanView/UurbanView',
            icon: 'apartment'
          },
          {
            id: '13164031-0AEB-4F16-A126-C13547DF9E96',
            name: 'UurbanView',
            title: 'نمای شهری',
            link: '/urbanView/UurbanView',
            icon: 'apartment'
          },
          {
            id: '6268058E-50C4-4C43-8E05-DD5ECF308AC8',
            name: 'UmozahematMosherfiat',
            title: 'مزاحمت مشرفیت',
            link: '/mozahematMosherfiat/UmozahematMosherfiat',
            icon: 'view_stream'
          },
          {
            id: '77C91D80-8F08-4EE5-AF31-E06FD9F823CA',
            name: 'UAnalysisSide',
            title: 'آنالیز جهات',
            link: '/analysis-sides/UAnalysisSide',
            icon: 'open_with'
          },
          // Done
          {
            // id: 'd8155db8-b213-4a27-9737-e8e120e47c9f',
            id: 'BD13C179-7B93-47EE-8D32-00567A99C6EF', // ارسالی بک اند
            name: 'GreenSpace',
            title: 'فضای سبز',
            icon: 'water_drop',
            popup: true,
            width: '900px',
            height: '700px'
          },
          // No
          {
            id: '69e0b07c-bf67-488e-b4f8-355cbe343267', // سکیوریتی سرا10
            name: 'ManMailFormControl',
            title: 'فرم کنترلی من میل',
            link: '/tashkil-parvandeh/ManMailFormControl',
            icon: 'receipt_long'
          },
          // Done
          {
            id: 'ec9d9332-00d5-4f66-9810-93baee33405f', // سکیوریتی سرا10
            // id: 'C1C1E026-A9CC-4224-BF4F-A78ACFEF2625', // ارسالی بک اند
            name: 'MokatebatGavahi',
            title: 'مکاتبات گواهی',
            link: '/tashkil-parvandeh/MokatebatGavahi',
            icon: 'history_edu'
          }
          // {
          //   id: '997b735a-94c4-4026-951c-e81e1e1176bb',
          //   name: 'Commission77VoteResult',
          //   title: 'نتیجه رای کمیسیون 77',
          //   icon: 'history_edu'
          // }
        ]
      },
      {
        id: '086257A6-9231-4d76-AEDF-E7B51734D93E',
        name: 'RevisitMenu',
        title: 'بازدید',
        icon: 'img:subMenu/bazdid.svg',
        help: 'revisit/help.pdf',
        nodes: [
          {
            id: 'BA4EAC75-B621-4FCB-B673-39EEB7CAA4C2',
            name: 'URevisitInfo',
            title: 'اطلاعات بازدید',
            link: '/revisit/info',
            icon: 'calendar_today',
            height: '640px',
            width: '1400px'
          },
          {
            // id: 'e5608c96-d9af-48a5-b832-710814cef24c',
            id: '993797F7-6DD8-41AC-BEB9-5B0F40652734', // ارسالی بک اند
            name: 'ArchiveTablet',
            title: 'اطلاعات عکس تبلت بازدید',
            link: '/archive/ArchiveTablet',
            icon: 'tablet'
          },
          {
            id: '050A4F16-C6CC-41D0-BCED-61F895BDFDB1',
            name: 'URevisitAgentAssign',
            title: 'اعلام مامور بازدید',
            link: '/revisit-agents/assign',
            icon: 'campaign'
          },
          {
            id: 'D7C544DC-4C8C-4380-BEA7-5CFE3B59DCEC',
            name: 'URevisitAgentVacations',
            title: 'تعطیلی کارشناس بازدید',
            link: '/revisit-agents/vacations',
            icon: 'event_busy'
          },
          {
            id: '508371CE-09CF-4F62-82B7-CB0BEB8ACF0D',
            name: 'URevisitAgentCalendar',
            title: 'تقویم مامور بازدید',
            link: '/revisit-agents/calendar',
            icon: 'event_note'
          },
          {
            id: '17F4DC30-E76E-4E54-BE09-76FA25420F45',
            name: 'URevisitTashkilParvandehDarkhast',
            title: 'تشکیل پرونده درخواست',
            link: '/revisit/tashkil-parvandeh-darkhast',
            icon: 'insert_drive_file'
          },
          // {
          //   id: '803C16A6-71EA-4D76-8793-8E7CD5A216EB',
          //   name: 'URevisitHelp',
          //   title: 'راهنمای بازدید',
          //   link: '/revisit/revisit-help',
          //   icon: 'help'
          // },
          // {
          //   id: 'e9375404-1258-44c9-846a-5fc5f5df6119',
          //   name: 'InfoJarsaghil',
          //   title: 'اطلاعات جرثقیل',
          //   link: '/revisit/Jarsaghil-Information',
          //   icon: 'folder_shared'
          // },
          {
            id: '1B4ED7D3-7952-42C7-A551-1DCC64CBCE82',
            name: 'URevisitAgentReport',
            title: 'گزارش مامورین بازدید',
            link: '/revisit-agents/report',
            icon: 'report'
          },
          {
            id: '5551048C-1331-448F-A6A8-A00CF072425A',
            name: 'URevisitAgents',
            title: 'مامورین بازدید',
            link: '/revisit-agents',
            icon: 'groups'
          },
          {
            id: 'F449751C-B248-43C1-AF9E-0CE6016B3DB6',
            name: 'UTaskMobileForInvalidImages',
            title: 'تبلت بازدید برای عکسبرداری مجدد',
            link: '/revisit/task-mobile-for-invalid-images',
            icon: 'tablet_android'
          }
        ]
      },
      {
        id: '7E4B1735-ECAB-4C53-92DC-43495F7FC6CF',
        name: '‌BlackList',
        title: 'لیست سیاه',
        icon: 'img:subMenu/blackList.svg',
        help: 'black-list/help.pdf',
        nodes: [

          {
            id: '913DBD99-B9E5-44E1-9F5B-54CB21EAAF8F',
            name: 'SendBlackListRequestsubmission',
            title: 'ارسال به لیست سیاه ثبت درخواست',
            icon: 'folder_shared'
          },
          {
            id: 'AD4A254F-0211-424B-AC05-5C67AE50B172',
            name: 'SendGroupToBalckList',
            title: 'ارسال گروهی به لیست سیاه',
            link: '/black-list/SendGroupToBalckList',
            icon: 'present_to_all'
          },
          {
            id: 'D3094A31-E79B-4185-80E9-F83286236295',
            name: 'SendToBlackList',
            title: 'ارسال به لیست سیاه',
            link: '/black-list/SendToBlackList',
            icon: 'block'
          },
          {
            id: '21872E3E-939D-4CBE-AC1E-9799C207EF78',
            name: 'SendBlackListNationalCode',
            title: 'ارسال به لیست سیاه با کد ملی',
            link: '/black-list/SendBlackListNationalCode',
            icon: 'app_blocking',
            width: '900px',
            height: '600px'
          },
          {
            id: '5C94C341-61FC-4674-AF03-13C74E959E8D',
            name: 'ExitBlackListNationalCode',
            title: 'خروج از لیست سیاه با کد ملی',
            link: '/black-list/ExitBlackListNationalCode',
            icon: 'low_priority'
          },

          {
            id: 'C6997B57-7FEE-4A96-B624-F6F99DA93C03',
            name: 'ExitBlackListRequestSubmission',
            title: 'خروج از لیست سیاه ثبت درخواست',
            link: '/black-list/ExitBlackListRequestSubmission',
            icon: 'lock_open'
          },
          // {
          //   id: 'B22458DA-E996-47CD-9B5E-68652A8A7DC0',
          //   name: 'UBlackListHelp',
          //   title: 'راهنمای لیست سیاه',
          //   link: '/black-list/black-list-help',
          //   icon: 'help_center'
          // },
          {
            id: '947B7EAE-E271-425A-B22E-4B79B6973E98',
            name: 'BlackList',
            title: 'لیست سیاه',
            link: '/black-list/BlackList',
            icon: 'img:subMenu/blackList.svg'
          },
          {
            id: '1A11DA42-2E80-470F-8CA0-16AA17E01A8A',
            name: 'BlackListBasedOnNationalCode',
            title: 'لیست سیاه بر اساس کد ملی',
            link: '/black-list/BlackListBasedOnNationalCode',
            icon: 'phonelink_lock'
          }
        ]
      },
      {
        id: '5FD11FA1-547E-4560-AA59-E242910B69A5',
        name: 'BlackList',
        title: 'آرشیو و بایگانی',
        icon: 'img:sidebar/Convert.svg',
        help: 'archive/help.pdf',
        nodes: [
          {
            id: 'D3FDFC63-724A-44D1-9832-0CD12E3B468D',
            name: 'SendToTempArchive',
            title: 'ارسال به بایگانی موقت',
            link: '/archive/send-temporary-archive',
            icon: 'send',
            width: '600px',
            height: '500px',
            popup: true
          },
          {
            id: '2E132C1A-DF76-40BC-9DC9-D602D2688E24',
            name: 'SendToTempArchiveShahrsazi',
            title: 'ارسال به بایگانی موقت در شهرسازی',
            link: '/archive/send-tempArchive-shahrsazi',
            icon: 'send_and_archive'
          },
          {
            id: 'EEDCC4DB-6A5A-4B0A-ACC0-EEB29C89E48E',
            name: 'PermanentArchive',
            title: 'بایگانی دائم',
            link: '/archive/permanent-archive',
            icon: 'unarchive'
          },
          {
            id: 'D7126429-7FDF-4F37-BC0D-F28D0E2BC4DC',
            name: 'ArchiveAndNosaziCodeRelationship',
            title: 'ارتباط آرشیو و کدنوسازی',
            link: '/archive/Archive-NosaziCode-Relationship',
            icon: 'account_tree'
          },
          {
            id: '83A54A11-105D-41C8-A519-081A51185E91',
            name: 'TemporaryArchive',
            title: 'بایگانی موقت',
            link: '/archive/temporary-archive',
            icon: 'archive'
          },
          // {
          //   id: '67F7A4E9-A2B2-4545-BFF8-37C4403B117F',
          //   name: 'ArchiveHelp',
          //   title: 'راهنمای آرشیو و بایگانی',
          //   link: '/archive/archive-help',
          //   icon: 'help_center'
          // },
          // {
          //   id: '67F7A4E9-A2B2-4545-BFF8-37C4403B117F',
          //   name: 'UGeneralArchive',
          //   title: 'آرشیو جامع',
          //   icon: 'help_center'
          // },
          {
            id: 'A9C0DE5E-23F4-4177-A612-EBF09B87A2EF',
            name: 'ChangeSecNumber',
            title: 'تغییر شماره دبیرخانه',
            link: '/archive/change-number',
            icon: 'published_with_changes'
          },
          {
            id: '479ECD0F-F985-4A4A-897A-20EAB1392C88',
            name: 'DocumentPhysicReq',
            title: 'درخواست فیزیک پرونده',
            link: '/archive/document-request',
            icon: 'folder_shared'
          },
          {
            id: '376666C7-F9C3-435F-A213-C5719E98040C',
            name: 'ExitTempArchiveShahrsazi',
            title: 'خروج از بایگانی موقت در شهرسازی',
            link: '/archive/exit-tempArchive-shahrsazi',
            icon: 'exit_to_app'
          },
          {
            id: '1CFC989B-A1B9-4C38-993D-873BDE92F952',
            name: 'LettersKartabl',
            title: 'کارتابل نامه ها',
            link: '/archive/letter-kartabl',
            icon: 'markunread_mailbox'
          },
          {
            id: 'F0E401C4-C0E9-4863-BC90-048D66F8177B',
            name: 'Letters',
            title: 'نامه ها',
            link: '/archive/letters',
            icon: 'markunread'
          },
          // Done
          {
            id: '7CD5F300-DE95-4003-B2CD-4726C2530629', // سکیوریتی
            // id: '23942F6A-47A1-4FCB-A45E-9D79806C9015', // ارسالی بک اند
            name: 'ArchivElectronic',
            title: 'آرشیو الکترونیک',
            link: '/archive/ArchivElectronic',
            icon: 'class'
          },
          // No
          {
            id: 'd17aef43-57a8-4b32-8b5d-77b52d0910ea', // سکیوریتی سرا10
            name: 'ArchivElectronicBazdid',
            title: 'آرشیو الکترونیک بازدید',
            link: '/archive/ArchivElectronicBazdid',
            icon: 'door_front'
          },
          {
            id: 'B0897C6A-70AB-4940-9D21-F593660A74EE',
            name: 'ArchivElectronicWithTree',
            title: 'آرشیو الکترونیکی (با درختواره)',
            link: '/archive/ArchivElectronicWithTree',
            icon: 'photo_album'
          },
          // Done
          {
            // id: 'b9c9a42a-6a72-4df0-bb6f-4aae3a4f0a0c',
            id: '5747D1CE-480E-4352-967A-AD8879ED951E', // ارسالی بک اند
            name: 'ArchiveAmlak',
            title: 'آرشیو ملک',
            link: '/archive/ArchiveAmlak',
            icon: 'meeting_room'
          },
          {
            id: '1935B02A-F771-4144-9B3B-E40F70C658E0',
            name: 'DocAuthenticityVerification',
            title: "تایید اصالت اسناد",
            link: '/archive/DocAuthenticityVerification',
            icon: 'meeting_room'
          },
          // Done
          // {
          //   // id: 'e5608c96-d9af-48a5-b832-710814cef24c',
          //   id: '993797F7-6DD8-41AC-BEB9-5B0F40652734', // ارسالی بک اند
          //   name: 'ArchiveTablet',
          //   title: 'آرشیو تبلت',
          //   link: '/archive/ArchiveTablet',
          //   icon: 'tablet'
          // },
          {
            id: '5282C346-53DF-423A-AA8E-52EE0B32B5BB',
            name: 'MergeTwoArchiveCode',
            title: 'ادغام دو کلید آرشیو',
            link: '/archive/MergeTwoArchiveCode',
            icon: 'merge_type'
          }
        ]
      },
      {
        id: '077A08A4-E8AA-416B-9631-AA7CE9F4D7D1',
        name: 'ResposibleForm',
        title: 'تاریخچه و جستجو',
        icon: 'img:subMenu/history.svg',
        help: 'history-and-search/help.pdf',
        nodes: [
          {
            id: 'D15D9730-8046-4F82-9E95-B5234AF67033',
            name: 'UCodeHistory',
            title: 'بازبینی پرونده',
            link: '/history-and-search/nosazi-code',
            icon: 'rate_review'
          },
          // No
          {
            id: 'A4E3D092-04ED-4A3E-9A41-047E14D75AA2',
            name: 'UHistoryAndChangeNosaziCode',
            title: 'تاریخچه و انتقال کد نوسازی',
            link: '/history-search/history-change-nosazi',
            icon: 'youtube_searched_for'
          },
          {
            id: '320655BE-DFBA-4FF5-ABE0-B2F5F90550E3',
            name: 'UNosaziCodeSearchMain',
            title: 'جستجوی ملک',
            link: '/history-and-search/nosazi-code-search',
            icon: 'travel_explore'
          },
          // {
          //   id: 'AD85356A-E66C-452C-B5DE-D76FE2CE7580',
          //   name: 'UHistoryAndSearchHelp',
          //   title: 'راهنمای تاریخچه و جستجو',
          //   link: '/history-and-search/help',
          //   icon: 'help_center'
          // },
          {
            id: 'A4511368-0170-462D-811D-F12E3A7BBE29',
            name: 'UOfficeHistory',
            title: 'سوابق اطلاعات درخواست اداره کل توسعه شهری',
            link: '/history-and-search/office-history',
            icon: 'receipt_long'
          },
          {
            id: '76536141-060D-40BF-9DC9-2D62D3B15B60',
            name: 'UResponder',
            title: 'فرم پاسخگو',
            link: '/responsible-form/ResposibleForm',
            icon: 'feed',
            popup: false,
            mode: 'half'
          },
          {
            id: '742EBD35-A704-4997-9082-BF3CCDF7526A',
            name: 'UResponderOffice',
            title: 'فرم پاسخگو دفاتر',
            link: '/responsible-form-office/UResponderOffice',
            icon: 'subtitles',
            popup: false
          },
          // Done
          {
            // id: '1409f415-bd4e-410a-868a-593a4ed45af5',
            id: 'DB550DD7-B224-48A2-AAC9-86316914FD34', // ارسالی بک اند
            name: 'UResponderRevisit',
            title: 'فرم پاسخگو بازدید',
            link: '/responsible-form-revisit/UResponderRevisit',
            icon: 'pageview',
            popup: false
          },
          // No
          {
            id: '521ca3d4-b60f-4af6-99fc-cdbfad8a2da8', //  سکیوریتی سرا10
            name: 'UResponderNidAgentRevisit',
            title: 'فرم پاسخگو بازدید براساس کدارجاع',
            link: '/responder-form-NidAgentRevisit/UResponderNidAgentRevisit',
            icon: 'pageview',
            popup: false
          }
        ]
      },
      {
        id: 'DC6403BC-FF26-41CB-BAF4-CDA598DA1735',
        name: 'crowdsourcing',
        title: 'جمع سپاری',
        icon: 'img:subMenu/history.svg',
        nodes: [
          // {
          //   id: '1BB73EEA-70FC-4FBE-959E-4BCA3AAE0438',
          //   name: 'OwnerSelfReported',
          //   title: 'لیست جمع سپاری',
          //   link: '',
          //   icon: 'rate_review'
          // },
          // {
          //   id: '7766A9E8-4D28-4D2B-A2BA-84D814F03025',
          //   name: 'UHelpCrowdSourcing',
          //   title: 'راهنمای جمع سپاری',
          //   link: '',
          //   icon: 'youtube_searched_for'
          // },
          // {

          //   id: '5B17E4FC-85F3-4C9C-A088-3CFB52BF529C',
          //   name: 'ShenasnameConfirmation',
          //   title: 'شناسنامه وضع موجود',
          //   link: '',
          //   icon: 'travel_explore'
          // },
          {
            id: 'B666B032-2C75-4FC6-9722-AB9E2C8255DA',
            name: 'ZabetehConfirmation',
            title: 'تغییرات ضابطه',
            link: '',
            icon: 'help_center'
          },
          {
            id: 'F6B062F8-9D4D-4A57-A84A-E168D41B74EB',
            name: 'UNewCodeRequest',
            title: 'وضعیت درخواست کد جدید',
            icon: 'receipt_long'
          },
          // {
          //   id: '092F0C23-85CC-4BF4-86EA-D3EDC94C3730',
          //   name: 'UNewCodeRequest',
          //   title: 'تغییر کد نوسازی ',
          //   link: '',
          //   icon: 'feed'
          // },
          {
            id: '20B003B6-5645-4D53-84EB-2633103FA508',
            name: 'UNewNosaziCodeFollowUp',
            title: 'پیگیری کد نوسازی جدید',
            link: '',
            icon: 'feed'
          }
        ]
      },
      {
        id: '2E58E1A5-5B11-49D7-87EB-EA049EBA0B50',
        name: 'engineer',
        title: 'مهندسین ناظر',
        icon: 'engineering',
        help: 'engineer/help.pdf',
        nodes: [
          {
            id: '7721D24C-FC87-4A8B-B03D-C0A7A66289EF',
            name: 'UEngineers',
            title: 'مهندسین ناظر',
            icon: 'social_distance',
            popup: true,
            width: '1300px'
          }
        ]
      },
      // {
      //   id: '9704c446-6e48-4fea-9a58-22dcd9ec563f',
      //   name: 'HistoryAndSearchMenu',
      //   title: 'تاریخچه و جستجو',
      //   icon: 'history',
      //   nodes: [
      //     {
      //       id: '736b5bc8-3663-4a75-ba3e-47aaf854e537',
      //       name: 'UCodeHistory',
      //       title: 'بازبینی پرونده',
      //       icon: 'rate_review',
      //       link: '/history-and-search/nosazi-code'
      //     },
      //     {
      //       id: '6a27ca71-9bfe-4f1e-928d-a4b97344505e',
      //       name: 'UHistoryAndChangeNosaziCode',
      //       title: 'تاریخچه و انتقال کد نوسازی',
      //       icon: 'youtube_searched_for',
      //       link: '/history-search/history-change-nosazi'
      //     },
      //     {
      //       id: 'e0d7872f-155d-42a8-8cdc-65e5ffa3ca26',
      //       name: 'UNosaziCodeSearch',
      //       title: 'جستجوی ملک',
      //       icon: 'travel_explore',
      //       link: '/history-and-search/nosazi-code-search'
      //     },
      //     {
      //       id: '346ce8f6-b5a3-49a9-9ec9-60016f6935c7',
      //       name: 'UHistoryAndSearchHelp',
      //       title: 'راهنمای تاریخچه و جستجو',
      //       icon: 'help_center',
      //       link: '/history-and-search/help'
      //     },
      //     {
      //       id: 'b8874c2b-6116-4095-83a1-b9cb490739ec',
      //       name: 'UOfficeHistory',
      //       title: 'سوابق اطلاعات درخواست اداره کل توسعه شهری',
      //       icon: 'receipt_long',
      //       link: '/history-and-search/office-history'
      //     },
      //     {
      //       id: '8361f8a1-c799-4967-be4f-afa7d1cc5ed1',
      //       name: 'UResponder',
      //       title: 'فرم پاسخگو',
      //       icon: 'feed',
      //       link: '/history-and-search/responder'
      //     }
      //   ]
      // },
      {
        id: '82AC1B77-CC1E-452D-84A7-E8E96706A1C5',
        name: 'SettingsMenu',
        title: 'تنظیمات',
        icon: 'settings',
        help: 'settings/help.pdf',
        nodes: [
          {
            id: '61723D95-B80D-4066-BA2A-0406BD31CA78',
            name: 'UPersonalSettingsTabs',
            title: 'تنظیمات شخصی',
            link: '/settings/personal-settings',
            icon: 'manage_accounts',
            popup: true,
            width: '600px',
            height: '400px'
          },
          {
            id: '43422777-FE8B-438D-94BF-88EB48815030',
            name: 'UBuildingSettingsTabs',
            title: 'تنظیمات شهرسازی',
            link: '/settings/building-city-settings',
            icon: 'room_preferences',
            popup: true,
            width: '600px',
            height: '600px'
          },
          {
            id: '30F6B297-A5DB-4C44-841C-CCC627A4AE66',
            name: 'USendSmsTabs',
            title: 'ارسال پیامک',
            link: '/settings/send-sms-settings',
            icon: 'send'
          },
          {
            id: '0952dfff-0714-447d-b66a-a36ed80cd4bd',
            name: 'USendMessage',
            title: 'ارسال پیامک بر اساس درخواست',
            icon: 'message'
          },
          {
            id: 'E8ACEEB9-6241-4951-A14B-C248BEF4DF87',
            name: 'UWorkFlowSettings',
            title: 'درخواست ها و گردش کارها',
            link: '/settings/workflow-settings',
            icon: 'receipt_long'
          },
          // {
          //   id: '52D686D5-586A-401A-A1B1-BD18CC2A959B',
          //   name: 'USettingsHelp',
          //   title: 'راهنمای تنظیمات',
          //   link: '/settings/help',
          //   icon: 'help_center'
          // },
          {
            id: 'CFE5B0CF-210C-40E7-853F-379F25422B54',
            name: 'UBlockAreaStatus',
            title: 'وضعیت املاک محدوده بلوک',
            link: '/settings/UBlockAreaStatus',
            icon: 'maps_home_work'
          },
          {
            id: '30232d1f-5ce3-41eb-83d7-ed9187474763',
            name: 'UNosaziMonitoring',
            title: 'مانیتورینگ نوسازی',
            icon: 'settings_remote'
            // popup: true,
            // width: '900px',
            // height: '600px'
          }
        ]
      },
      {
        id: '99ECFEC5-0577-4C66-9E5D-3185C076FB91',
        name: 'CrossRequestMenu',
        title: 'اداره کل توسعه شهری (شورای معابر)',
        icon: 'maps_home_work',
        nodes: [
          {
            id: "8AA30169-FF4A-449D-B46D-B941BDECF445",
            name: 'UCrossRequest',
            title: "ثبت درخواست اداره کل توسعه شهری",
            icon: 'add_road'
          },
          {
            id: "35ABA874-225E-4DCB-A8E6-9761A562B1B2",
            name: 'UEditCrossRequest',
            title: "ویرایش اطلاعات درخواست اداره کل توسعه شهری",
            icon: 'edit_road'
          }
        ]
      },
      {
        // id: '3ac2f99d-1ea6-4e5b-a8fd-7581627e903e', // سکیوریتی
        id: '931B86AC-BE68-4B95-9312-BA2892AD5CAE', // زمل
        name: 'Commission77',
        title: 'کمیسیون ماده 77',
        icon: 'folder_shared',
        nodes: [
          {
            id: '315e8676-33ec-4768-ac3a-99b9ef07b9d8',
            name: 'SendBlackListCommission',
            title: 'ارسال به لیست سیاه کمیسیون 77',
            link: '/commission77/send-blacklist-commission',
            icon: 'block'
          },
          {
            id: '87917171-9369-4eda-8ba5-bf3ecd04c437',
            name: 'ExitBlackListCommission',
            title: 'خروج از لیست سیاه کمیسیون 77',
            link: '/commission77/exit-blacklist-commission',
            icon: 'lock_open'
          }
        ]
      }
      /* {
        id: '37ffa035-4e2e-4220-a1eb-cd1de3995186',
        name: 'WorkFlow',
        title: 'گردش کار',
        icon: 'account_tree',
        nodes: [
          {
            id: '257c574e-c526-65ee-87bf-ffe59ba0e62m',
            name: 'CommissionExecVote',
            title: 'اجرای احکام',
            link: '/CommissionExecuteVote',
            icon: 'playlist_add_circle'
          },
          {
            id: '923077e0-c841-45dc-aa5b-4f6672d6699a',
            name: 'InquiryAnswer',
            title: 'پاسخ استعلام',
            link: '/InquiryAnswer',
            icon: 'question_answer'
          },
          {
            // Done is complete
            id: '3d6678d2-2ea9-4595-a19c-b90d7b7d79b8',
            name: 'DutyCodes',
            title: 'تعیین کدهای عوارضی',
            link: '/DutyCodes',
            icon: 'folder_shared'
          },
          {
            id: '257c5l4e-c526-65ee-87bf-ffe59ba0e62m',
            name: 'ParkingStaff',
            title: 'هیأت پارکینگ',
            link: '/ParkingStaff',
            icon: 'local_parking'
          }
        ]
      }, */
      // {
      //   id: '4d906651-9bdb-4bba-a51f-a99e340ed53d',
      //   name: 'SettingsMenu',
      //   title: 'مهندسین ناظر',
      //   icon: 'engineering',
      //   nodes: [
      // {
      //   // Done is complete
      //   id: '7721D24C-FC87-4A8B-B03D-C0A7A66289EF',
      //   name: 'USupervisorTabs',
      //   title: 'مهندسین ناظر',
      //   icon: 'engineering',
      //   link: '/supervisor-engineers/supervisor-engineers'
      // },
      // {
      //   // Done is complete
      //   id: '6ffdcdba-4f05-4175-b116-6db4c1c595b9',
      //   name: 'UReferenceParvandehHaghighi',
      //   title: 'ارجاع پرونده به شخص حقیقی',
      //   icon: 'reply_all',
      //   link: '/supervisor-engineers/ReferenceParvandehHaghighi'
      // },
      // { id: '89883d08-3c21-4a32-8832-29ad4a9b5b63',
      //   name: 'ReferFileToOffice',
      //   title: 'ارجاع پرونده به دفتر',
      //   icon: 'markunread_mailbox',
      //   link: '/refer-file-office/UReferFileToOffice'
      // },
      // Done is complete
      // { id: '3cb1869b-ae17-4a42-bca9-ac1221cb4d05',
      //   name: 'UReferFileToEngineer',
      //   title: 'ارجاع پرونده به مهندس',
      //   icon: 'send',
      //   link: '/refer-file-to-engineer/refer-file-to-engineer'
      // },
      // {
      //   id: '502a2f77-dbb4-4731-ba15-2f19e2022539',
      //   name: 'UDynamicReferWork',
      //   title: 'ارجاع کار پویا',
      //   icon: 'reply_all',
      //   link: '/engineering/UDynamicReferWork'
      // },
      // {
      //   id: 'd65d4cb0-9d33-4f08-bcf0-9a9da5c41d3b',
      //   name: 'UDabirkhaneEngineer',
      //   title: 'دبیرخانه مهندسین',
      //   icon: 'group',
      //   link: '/supervisor-engineers/Engineers-Dabirkhane'
      // }
      //     ]
      //   },
      //   {
      //     id: '5af0449d-fc58-4a2f-a0b3-2557794b936e',
      //     name: 'SettingsMenu',
      //     title: 'امور مهندسی ناظر',
      //     icon: 'engineering',
      //     nodes: [
      //       {
      //         // Done is complete
      //         id: '3cb1869b-ae17-4a42-bca9-ac1221cb4d05',
      //         name: 'UReferFileToEngineer',
      //         title: 'ارجاع پرونده به مهندس',
      //         icon: 'send',
      //         link: '/engineering/urefer-file-engineer'
      //       },
      //       {
      //         // Done is complete
      //         id: '3cb1869b-ae17-4a42-bca9-ac1221cb4d05',
      //         name: 'UDabirkhaneEngineer',
      //         title: 'دبیرخانه مهندسین',
      //         icon: 'group',
      //         link: '/engineering/urefer-file-engineer'
      //       }

      //     ]
      //   }
    ]
  },
  {
    id: '5159ec42-40b3-4a97-a3c4-653d3ba204ab',
    name: 'nosazi',
    title: 'نوسازی',
    icon: 'img:sidebar/Nosazi.svg',
    type: 'sidebar',
    // parent: {
    //   name: 'nosazi',
    //   id: '5159EC42-40B3-4A97-A3C4-653D3BA204AB',
    //   title: 'نوسازی'
    // },
    nodes: [
      {
        // id: 'dac74201-4ea8-4d18-9810-a1c9c17f0616',
        id: '389E9635-3E7B-4989-B74E-9D9BEE6645A2',
        name: 'NosaziAvarez',
        title: 'عوارض نوسازی',
        icon: 'img:subMenu/avarez nosazi.svg',
        help: 'avarez-nosazi/help.pdf',
        nodes: [
          {
            id: '55fb88f2-c736-4ff5-9f67-a7e337e8079e',
            name: 'UNosaziDashboard',
            title: 'داشبورد نوسازی',
            icon: 'dashboard',
            link: '/nosazi/dashboard'
          },
          {
            id: 'F7FD1FFE-E68D-4C6F-BEF5-67E39C7B6A6E',
            name: 'UNosaziTransferFish',
            title: 'انتقال فیش نوسازی',
            icon: 'receipt',
            link: '/nosazi-avarez/nosazi-transform-fish'
          },
          {
            id: '9C2FA62F-1DDC-40BF-B58A-22459631DCEF',
            name: 'UCheckUnconfirmationFishesTabs',
            title: 'بررسی فیش های تایید نشده از فایل بانکی',
            icon: 'account_balance',
            link: '/nosazi-avarez/check-uncorfirmation-fishes'
          },
          {
            id: 'CF18FC91-5C52-4BC0-8144-CE1DBC03EBED',
            name: 'UTransferNosaziFishHistory',
            title: 'تاریخچه انتقال فیش نوسازی',
            icon: 'history',
            link: '/nosazi-avarez/transfer-nosazi-fish-history'
          },
          {
            id: 'FF6F4FB4-7253-48A9-8109-25EE6BE18B12',
            name: 'UConfirmationNosaziFileBank',
            title: 'تایید فیش از فایل',
            icon: 'folder',
            link: '/nosazi-avarez/UConfirmationNosaziFileBank'
          },
          {
            id: '26D9FABC-1A29-4C0D-9868-8401C5318A02',
            name: 'UConfirmationNosaziFromNewFile',
            title: 'تایید فیش از فایل جدید',
            icon: 'create_new_folder',
            link: '/nosazi-avarez/from-new-file'
          },
          {
            id: '2EFC90A1-FD75-47CC-8004-49C89AD04258',
            name: 'UShiferiyeHistory',
            title: 'تاریخچه شیفریه',
            icon: 'history',
            link: '/nosazi-avarez/shiferiye-history'
          },
          {
            id: '396ED5ED-9CA6-44A3-8F9E-E52F688437DC',
            name: 'UConfirmationNosaziFishByBankService',
            title: 'تایید فیش نوسازی از طریق وب سرویس بانک',
            icon: 'account_balance_wallet',
            link: '/nosazi-avarez/nosazi-web-service'
          },
          {
            id: 'D21DDD84-41B1-4E28-8D60-947594BE8A1A',
            name: 'UNosaziConfirmationFish',
            title: 'تایید فیش',
            icon: 'credit_score',
            popup: true,
            width: '600px',
            height: '500px'
          },
          {
            id: '4E7C1043-7DF3-4045-965E-43C156FF52A2',
            name: 'UPosSettings',
            title: 'تنظیمات پوز',
            icon: 'settings',
            link: '/nosazi-avarez/pos-settings',
            popup: true,
            width: 500,
            height: 400
          },
          {
            id: 'A93633B9-3883-4A10-8F30-95EDF13E8DFD',
            name: 'UPosUsersSettings',
            title: 'تنظیمات پوز کاربران',
            icon: 'manage_accounts',
            link: 'nosazi-avarez/pos-users-settings',
            popup: true,
            width: 400,
            height: 450
          },
          {
            id: '96506BAB-B1F1-4325-B162-8DA4A7A083A3',
            name: 'UNosaziSettingsTabs',
            title: 'تنظیمات نوسازی',
            icon: 'settings_applications',
            link: '/nosazi-avarez/nosazi-settings',
            popup: true,
            width: '450px',
            height: '600px'
          },
          {
            id: 'FEDB9130-A846-49AA-8358-A51D49AEC718',
            name: 'UMoafyatDiscount',
            title: 'تعریف معافیت-تخفیف',
            icon: 'local_offer',
            link: '/nosazi-avarez/moafiyat-discount'
          },
          {
            id: '6A5506C3-B76A-4934-A38B-A7B37D12F845',
            name: 'UFishAggregatePrint',
            title: 'چاپ جمعی فیش',
            icon: 'print',
            link: '/nosazi-avarez/fish-aggregate-print'
          },
          // {
          //   id: '6E20E8DD-ED46-4076-945E-14E8D047A14C',
          //   name: 'UNosaziHelp',
          //   title: 'راهنما',
          //   icon: 'help_center',
          //   link: '/nosazi-avarez/nosazi-help'
          // },
          {
            id: '24A8F489-6977-4464-9B40-F0BEE244D7C3',
            name: 'UMoafyatOrDiscount',
            title: 'عملیات قوانین تخفیف یا معافیت-موارد حذف شده',
            icon: 'delete_forever',
            link: '/nosazi-avarez/moafiyat-or-discount'
          },
          {
            id: '1ADF56D7-DB8E-49DA-B07C-1EA4716D9435',
            name: 'UDeletedMoafiyat',
            title: 'عملیات معافیت/تخفیف-موارد حذف شده',
            icon: 'delete_sweep',
            link: '/nosazi-avarez/deleted-moafiyat'
          },
          {
            id: '29393232-BF65-42F4-BA19-FB9A2E7D5268',
            name: 'UMoafyatRulesNosazi',
            title: 'قوانین تخفیف-معافیت',
            icon: 'rate_review',
            link: '/nosazi-avarez/moafiyat-rules'
          },
          {
            id: '1F8BD89E-7E21-4411-BCF4-397E36C499F3',
            name: 'UMoafiyatAvarezi',
            title: 'معافیت عوارضی',
            icon: 'toll',
            link: '/nosazi-avarez/moafiyat-avarezy'
          },
          {
            id: 'D0ADC9CE-458C-4F94-A64A-6DA606E833D8',
            name: 'DutyMain',
            title: 'نوسازی موردی',
            icon: 'domain',
            link: '/duty/DutyMain'
          }
        ]
      },
      {
        // id: '183fbbd6-0b85-4800-8f72-979b5ae91d54',
        id: '8396D1B9-BA0D-438B-9A9D-376F122D238A',
        name: 'URegionPiceArrow',
        title: 'قیمت و تنظیمات',
        icon: 'attach_money',
        nodes: [
          {
            id: 'B0F0F7DD-EFDD-4457-A0D6-AD4A35EC0DF8',
            name: 'URegionPiceArrow',
            title: 'قیمت منطقه ای بر اساس جهات',
            icon: 'price_check',
            link: '/price-settings/region-price-arrow'
          },
          {
            id: '661AB666-3487-46E9-8206-DBC1E6DB1FE8',
            name: 'UAggregatePriceArrow',
            title: 'قیمت جمعی منطقه ای بر اساس جهات',
            icon: 'payments',
            link: '/price-settings/aggregate-price-arrow'
          },
          {
            id: '589018F2-2A20-4B31-9288-2A8B63D0CD91',
            name: 'URegionPiceNosazi',
            title: 'قیمت منطقه ای بر اساس کد نوسازی',
            icon: 'attach_money',
            link: '/price-settings/region-price-nosazi'
          },
          {
            id: 'A2B5C43A-FA1C-42A1-8426-B68661592050',
            name: 'UAggregatePriceNosazi',
            title: 'قیمت جمعی منطقه ای بر اساس کد نوسازی',
            icon: 'paid',
            link: '/price-settings/aggregate-price-nosazi'
          },
          {
            id: '47BDF1F3-1B0C-4895-9F9A-A1B5439B8F64',
            name: 'UTaxPrice',
            title: 'قیمت دارایی',
            icon: 'account_balance',
            link: '/price-settings/tax-price'
          },
          {
            id: '19E56D6B-5399-45B8-BB01-8B7AED1EE46F',
            name: 'UPricing',
            title: 'قیمت گذاری',
            icon: 'monetization_on',
            link: '/price-settings/pricing'
          },
          {
            id: '013CC4D5-46E5-4FA1-A3EA-07B46A0A8B18',
            name: 'UUncorfirmationPriceNosazi',
            title: 'قیمت منطقه ای تایید نشده بر اساس کد نوسازی',
            icon: 'credit_card',
            link: '/price-settings/unconfirmation-price-nosazi'
          },
          {
            id: '45CA05B7-02FA-47D6-AB2B-820E7E76E7E2',
            name: 'UPriceFromMapTabs',
            title: 'قیمت منطقه ای از روی نقشه',
            icon: 'local_atm',
            link: '/price-settings/price-from-map'
          }
        ]
      },
      {
        // id: '69d42259-777d-466e-bfe5-5d07e8e6295b',
        id: 'CE966BBB-6A38-48E2-846F-369315704E21',
        name: 'UMelkHistory',
        title: 'سوابق',
        icon: 'img:subMenu/savabegh.svg',
        nodes: [
          {
            id: 'CFC1F487-F594-4547-9ED0-EF6FCAEE73C2',
            name: 'UEffectDateHistoryTabs',
            title: 'تاریخچه تاریخ اثر',
            icon: 'manage_search',
            link: '/nosdazi-history/effect-date-history-tabs'
          },
          {
            id: 'CF735D33-0D3B-4096-AFC5-8A74AC8CDCA3',
            name: 'UMelkHistory',
            title: 'سوابق ملک',
            icon: 'history_edu',
            link: '/nosazi-history/melk-hsitory'
          },
          {
            id: '3916BA26-1E75-4372-8F49-17D4C3737AFB',
            name: 'UBuildingHistory',
            title: 'سوابق ساختمان',
            icon: 'restore',
            link: '/nosazi-history/building-history'
          },
          {
            id: '41E7EB75-EF49-421E-A59B-C02789D737CB',
            name: 'UapartmentHistory',
            title: 'سوابق آپارتمان',
            icon: 'youtube_searched_for',
            link: '/nosazi-history/apartment-history'
          },
          {
            id: '0489F96A-C321-4338-8AC8-A6A80E389AF0',
            name: 'UJahateArbaeHistory',
            title: 'سوابق جهات اربعه',
            icon: 'history_toggle_off',
            link: '/nosazi-history/jahate-arbae-history'
          },
          {
            id: '21195CD6-AF71-41D3-AD7E-D2C22D0D685A',
            name: 'UNosaziHistoryTabs',
            title: 'سوابق',
            icon: 'history',
            link: '/nosazi-history/nosazi-history'
          }
        ]
      }
    ]
  },
  {
    id: 'd3aa02cd-dc84-40b4-a8ad-7b881dbb54c4', // درآمد
    name: 'daramad',
    title: 'منوی اصلی درآمد',
    displayTitle: 'درآمد',
    icon: 'img:sidebar/Daramad.svg',
    parent: {
      name: 'income',
      id: '714C366C-1705-433D-970C-E04F6D62BD7D',
      title: 'درآمد'
    },
    help: 'income/help.pdf',
    nodes: [
      {
        id: '352686EB-6D7C-4357-8862-B8FFA0332CF5',
        name: 'UIncomeDashboard',
        title: 'درآمد',
        icon: 'img:subMenu/Daramad.svg',
        nodes: [
          {
            id: '02F958EE-19CE-4A43-9B55-1E82D3C00799',
            name: 'UIncomeKartabl',
            title: 'کارتابل درآمد',
            icon: 'update'
          },
          {
            // Do mistake
            id: '771F1C21-10EF-4085-8234-D53B7F940674',
            name: 'UUpdateChecksStatus',
            title: 'به روز رسانی وضعیت چک ها',
            icon: 'update',
            link: '/income/update-checks-status'
          },
          {
            // Do mistake
            // id: '9d78e60c-b611-41fb-b92f-6bd33f437dd8',
            id: '7EC28E94-8FE3-4B83-A702-59F84C4DA755',
            name: 'UDiscountDefaults',
            title: 'پیش فرض تخفیفات',
            icon: 'local_offer',
            link: '/income/discount-defaults'
          },

          {
            // Do mistake
            id: '87EAB856-73EF-4152-A583-F10577BED81E',
            name: 'UConfirmationIncomeFish',
            title: 'تائيد فيش',
            icon: 'credit_score',
            link: '/income/confirmation-income-fish'
          },
          {
            // Do mistake
            id: '1901BECC-F0E4-4CFB-9C9E-0B5E6CB2F6D4',
            name: 'UConfirmationIncomeFromFile',
            title: 'تایید از فایل درآمد',
            icon: 'folder',
            link: '/income-confirm-from-file/UConfirmationIncomeFromFile'
          },
          {
            // Do mistake
            id: 'A20AE0AB-5C48-4FAE-9C60-99525CE0EB09',
            name: 'UConfirmationIncomeFishByBankService',
            title: 'تائيد فیش از طریق وب سرویس بانک',
            icon: 'account_balance_wallet',
            link: '/income/confirmation-income-fish-by-bank-service'
          },
          {
            // Do mistake
            // id: '7b0f3071-0f3d-4645-9b8c-ac118c1bd65b',
            id: '7F85B5CE-0107-47C9-AC07-58EF94DEE390',
            name: 'UIncomeCalculatesSettings',
            title: 'تنظیمات محاسبات درآمد',
            icon: 'settings',
            link: '/income/income-calculates-settings',
            popup: true,
            width: 700,
            height: 600
          },
          {
            // Do mistake
            id: '4C168ADF-7B85-472E-BBE0-7811808360CB',
            name: 'UPersonalSettings',
            title: 'تنظیمات شخصی درآمد',
            icon: 'manage_accounts',
            link: '/income/income-personal-settings',
            popup: true,
            width: 500,
            height: 400
          },
          {
            // Do mistake
            id: 'EB9A5DE3-EAF5-4252-BF75-E6BC4D365075',
            name: 'users-pos-settings',
            title: 'تنظیمات پوز کاربران',
            icon: 'manage_accounts',
            link: '/income/users-pos-settings',
            popup: true,
            width: 400,
            height: 450
          },
          {
            // Do mistake
            id: 'F60898A5-8198-4DBD-B328-241BE3BC4403',
            name: 'UIncomeInstallment',
            title: 'تقسیط درآمد',
            icon: 'attach_money',
            link: '/income/income-installment'
          },
          {
            // Do mistake
            id: 'F7BB4943-2C95-4741-A61B-B53FD568541C',
            name: 'UCheckSearch',
            title: 'جستجوی چک',
            icon: 'find_in_page',
            link: '/income/search-check'
          },
          {
            // Do mistake
            id: '0F388E18-4CF2-4DB7-B28F-BF8825D367DD',
            name: 'UIncome',
            title: 'درآمد',
            icon: 'img:subMenu/Daramad.svg',
            link: '/income/income'
          },
          // {
          //   // Do mistake
          //   id: '1219DFCD-0B85-45DB-80B5-BFDC1DF7CDE1',
          //   name: 'UIncomeHelp',
          //   title: 'راهنما',
          //   icon: 'help_center',
          //   link: '/income/help'
          // },
          {
            // Do mistake
            id: '19C5A4D3-CA41-4D89-AD9D-C5BCE8BD4822',
            name: 'UIncomeCalculatorTabs',
            title: 'ماشین حساب درآمد',
            icon: 'calculate',
            link: '/income/income-calculator'
          },
          {
            // Do mistake
            id: 'c6933323-7629-4ac9-ad65-4aca3187ab0c',
            name: 'RefundIncome',
            title: 'برگشت از درآمد',
            icon: 'calculate'
          }
          // {
          //   id: 'f774352f-97b6-4e76-b734-038e638edade',
          //   name: 'income-installment',
          //   title: 'تقسیط درآمد',
          //   icon: 'attach_money',
          //   link: '/income/income-installment'
          // },
        ]
      },
      // {
      //   id: '352686EB-6D7C-4357-8862-B8FFA0332CF5',
      //   name: 'UInsuranceDashboard',
      //   title: 'بیمه',
      //   icon: 'attach_money',
      //   nodes: [
      //     {
      //       id: 'C54E1C4A-9711-4BC6-9A0A-CAE66297A321',
      //       name: 'UInsuranceSendToInsurance',
      //       title: 'ارسال به بیمه',
      //       icon: 'attach_money',
      //       link: '/insurance/insurance-send-to-insurance',
      //       width: '450px',
      //       height: '400px',
      //       popup: true
      //     },
      //     {
      //       id: '2C74AC9A-5C37-46B5-87F7-2DDA3F912F49',
      //       name: 'UInsuranceIncome',
      //       title: 'بیمه درآمد',
      //       icon: 'attach_money',
      //       link: '/insurance/insurance-income',
      //       width: 1400,
      //       height: 700
      //     },
      //     {
      //       id: '95ED038E-2D9F-476A-AE00-815B124E6077',
      //       name: 'UArchivingAndCancellation',
      //       title: 'بایگانی و ابطال',
      //       icon: 'attach_money',
      //       link: '/insurance/archiving-and-cancellation',
      //       width: 1400,
      //       height: 700
      //     }
      //   ]
      // },
      {
        // Do mistake
        id: 'CF189DA6-D20E-4ACA-B5BB-5611A27615CB',
        name: 'UIncomeSendToBlackList',
        title: 'لیست سیاه',
        icon: 'img:subMenu/blackList.svg',
        nodes: [
          {
            // Do mistake
            id: '38284833-EDD8-4C43-AC7D-635863120380',
            name: 'UIncomeSendToBlackList',
            title: 'ارسال به لیست سیاه',
            icon: 'block',
            link: '/income-black-list/UIncomeSendToBlackList'
          },
          {
            // Do mistake
            id: '975EAACA-8245-4AFA-9603-C5D2954E03C3',
            name: 'UIncomeBlckList',
            title: 'لیست سیاه',
            icon: 'img:subMenu/blackList.svg',
            link: '/income-black-list/UIncomeBlckList'
          }
        ]
      }
    ]
  },
  {
    id: '4e4c0133-a224-4e34-ab34-a27a464e51dc',
    name: 'senfi',
    title: 'عوارض صنفی',
    icon: 'img:sidebar/Avarezsenfi.svg',
    // parent: {
    //   name: 'senfi',
    //   id: 'B1C21C73-12B2-45FB-9252-682B47F48EE4',
    //   title: 'عوارض صنفی'
    // },
    help: 'avareze-senfi/help.pdf',
    nodes: [
      {
        id: '8FEFA382-90F7-4F9A-89A3-25943F722CB4',
        name: 'senfi-transform-fish',
        title: 'انتقال فیش صنفی',
        icon: 'receipt',
        link: '/avareze-senfi/senfi-transform-fish',
        width: '1100px',
        height: '700px'
      },
      {
        id: '427B2744-498A-4294-ABF4-F2ADD3720E01',
        name: 'UCheckUnconfirmSenfiFishesTabs',
        title: 'بررسی فیش های تایید نشده از فایل بانکی',
        icon: 'account_balance',
        link: '/avareze-senfi/check-uncorfirm-senfi-fishes'
      },
      {
        id: '34F008F0-C708-4CDC-B343-97A5065C2650',
        name: 'UFishConfirmationSenfi',
        title: 'تایید فیش',
        icon: 'credit_score',
        link: '/avareze-senfi/fish-confirmation'
      },
      {
        id: 'E2BD67E9-D7E2-464C-8B87-77675BA0AE00',
        name: 'UConfirmSenfiFishFromFile',
        title: 'تایید فیش صنفی از فایل',
        icon: 'folder',
        link: '/avareze-senfi/confirm-senfi-fish-from-file'
      },
      {
        id: '192B1F93-49F9-4302-8893-B9FDFC6A16BA',
        name: 'UConfirmSenfiFishFromNewFile',
        title: 'تایید فیش صنفی از فایل جدید',
        icon: 'create_new_folder',
        link: '/avareze-senfi/confirm-senfi-fish-from-new-file'
      },
      {
        id: '06899DAC-9C54-41A5-9BB5-F1163B85C575',
        name: 'UShiferiyeHistorySenfi',
        title: 'تاریخچه شیفریه',
        icon: 'history',
        link: '/avareze-senfi/shiferiye-history-senfi'
      },
      {
        id: '5A280109-CF92-4B82-B68F-3EE6912178F8',
        name: 'UConfirmSenfiFishFromBankService',
        title: 'تایید فیش بانکی از وب سرویس بانک',
        icon: 'account_balance_wallet',
        link: '/avareze-senfi/confirm-senfi-fish-from-bank-service'
      },
      {
        id: 'EF0BD93B-78C0-4FD5-B7A8-758182EE8F97',
        name: 'USenfiSettingsTabs',
        title: 'تنظیمات صنفی',
        icon: 'room_preferences',
        width: '400px',
        height: '650px',
        popup: true
      },
      {
        id: 'B9C47AB4-DCD1-4B24-8365-310AD3CEC73C',
        name: 'UPosSettingsForSenfi',
        title: 'تنظیمات پوز',
        icon: 'settings',
        link: '/avareze-senfi/pos-settings-for-senfi',
        width: 500,
        height: 400,
        popup: true
      },
      {
        id: 'CE8289A9-CAAE-4D33-B0E8-E203AA1710BA',
        name: 'UUserPosSettingsForSenfi',
        title: 'تنظیمات پوز کاربران',
        icon: 'manage_accounts',
        link: '/avareze-senfi/pos-users-settings-for-senfi',
        width: 400,
        height: 450,
        popup: true
      },
      // {
      //   id: 'A395D73C-5996-45BB-B930-91C3CEBCA9B2',
      //   name: 'USenfiHelp',
      //   title: 'راهنما',
      //   icon: 'help_center',
      //   link: '/avareze-senfi/senfi-help'
      // },
      {
        id: '4C39D37B-42A1-4CD5-AF59-EF85F890E069',
        name: 'USenfiMorediTabs', // USenfiMoredi
        title: 'صنفی موردی',
        icon: 'settings_applications',
        link: '/avareze-senfi/senfi-moredi'
      },
      {
        id: '7a667c57-5c13-41eb-ab50-d6340534b300',
        name: 'UMoafyatOrDiscountSenfi',
        title: 'عملیات قوانین تخفیف یا معافیت-موارد حذف شده',
        icon: 'delete_forever',
        link: '/nosazi-avarez/moafiyat-or-discount'
      },
      {
        id: 'db143c30-1009-47b3-b7d5-65f5355b11ef',
        name: 'UDeletedMoafiyatSenfi',
        title: 'عملیات معافیت/تخفیف-موارد حذف شده',
        icon: 'delete_sweep',
        link: '/nosazi-avarez/deleted-moafiyat'
      },
      {
        id: 'a6cc9eeb-1b38-4c75-aef9-db88409fb3c3',
        name: 'UMoafyatRulesSenfi',
        title: 'قوانین تخفیف-معافیت',
        icon: 'rate_review',
        link: '/nosazi-avarez/moafiyat-rules'
      },
      {
        id: '07d623e5-1fb8-41bc-b23f-7bb6c92e9649',
        name: 'UMoafiyatAvareziSenfi',
        title: 'معافیت عوارضی',
        icon: 'toll',
        link: '/nosazi-avarez/moafiyat-avarezy'
      }
    ]
  },
  {
    id: '20c96248-c0c2-4da0-bb07-9480b0c95dce',
    name: 'supervisorEng',
    title: 'امور مهندسين ناظر',
    icon: 'engineering',
    // parent: {
    //   name: 'supervisorEng',
    //   id: '20C96248-C0C2-4DA0-BB07-9480B0C95DCE',
    //   title: 'امور مهندسين ناظر'
    // },
    nodes: [
      {
        id: 'C3354C46-5BEA-48B4-A355-EE757099D432', // سکیوریتی سرا10
        name: 'EngineerKartable',
        title: 'کارتابل پاسخگو',
        icon: 'list_alt',
        public: false,
        popup: false,
        props: { padding: false }
      },
      {
        id: '60b20031-23f6-4872-b06b-4620e8bf9f99',
        name: 'AcceptBuildingExeReport',
        title: 'کارتابل گزارشات مرحله ای',
        icon: 'list_alt',
        props: { padding: false }
      },
      {
        id: '92404D00-D287-4A09-9596-29FCC9BC9DB9',
        name: 'Engineers',
        title: 'مهندسین',
        icon: 'engineering',
        nodes: [
          // {
          //   // Done is complete
          //   id: '3cb1869b-ae17-4a42-bca9-ac1221cb4d05',
          //   name: 'UReferFileToEngineer',
          //   title: 'ارجاع پرونده به مهندس',
          //   icon: 'send',
          //   link: '/engineering/urefer-file-engineer'
          // },
          {
            id: 'A38337AC-8E07-436E-846A-0EAB6F8F0E40',
            name: 'EngineerInfo',
            title: 'اطلاعات مهندس',
            icon: 'person',
            width: '1000px',
            height: '700px'
          },
          {
            id: 'C46B2166-C853-4AAE-A18F-20D92BE5B420',
            name: 'EngineerInfoSystem',
            title: 'اطلاعات مهندس - نظام مهندسی',
            icon: 'language'
          },
          {
            id: 'EBA216F1-BFA5-4095-A150-7D52A226B972',
            name: 'KhodEzhar',
            title: 'بررسی اطلاعات خود اظهار',
            icon: 'camera_front',
            width: '1200px',
            height: '800px'
          },
          // {
          //   id: 'eba216f1-bfa5-4095-a150-7d52a226b972',
          //   name: 'UEngineersInfoUpdated',
          //   title: 'بررسی اطلاعات خوداظهار',
          //   link: '/engineers/engineer-info-updated/UEngineersInfoUpdated'
          // },
          {
            id: 'C8E962F3-17D3-4FA4-97DE-985023A5AA85',
            name: 'EngCapacityReq',
            title: 'بررسی درخواست ظرفیت سالانه',
            icon: 'reduce_capacity',
            width: '1200px',
            height: '800px'
          },
          {
            id: 'FD4AFA13-A0CB-4A6E-856C-7E74C7400BFF',
            name: 'UEngineersRequestQta',
            title: 'بررسی اطلاعات درخواست ارجاع کار',
            icon: 'work_off'
          },
          {
            id: '375EC3C2-B79D-4978-8482-5A7C73DC3492',
            name: 'UEngineerHolidays',
            title: 'تعطیلات مهندس',
            icon: 'holiday_village'
          },
          {
            id: 'DC398A15-679C-4C33-AA38-AD0509565131',
            name: 'ChangeEngCode',
            title: 'تغییر کد عضویت',
            icon: 'qr_code_scanner',
            width: '400px',
            height: '200px',
            popup: true
          },
          {
            id: 'cc44608b-3e80-4ac8-91b1-2c37ed6a0dc1',
            name: 'UConstructionGroup',
            title: 'گروه ساختمانی',
            icon: 'domain',
            width: '900px',
            height: '700px'
          }
        ]
      },
      {
        id: '1C71BF2B-0D88-416F-B4F8-40CC27F1137A',
        name: 'Capacity',
        title: 'ظرفیت',
        icon: 'reduce_capacity',
        nodes: [
          {
            id: 'A47A7F3B-977F-4EE9-A810-21F818566E60',
            name: 'UGroupCapacity',
            title: 'ظرفیت گروهی',
            icon: 'groups'
          },
          {
            id: 'C2ABD9B0-9BFC-4D06-B785-69E1F1F621F4',
            name: 'CapacityKartabl',
            title: 'کارتابل ظرفیت',
            icon: 'group_work'
          },
          {
            id: 'A99E7644-D071-4B63-8CDB-B9FF9A204416',
            name: 'UFirstQuota',
            title: 'سهمیه اول دوره',
            icon: 'check'
          },
          {
            id: 'FA1C509C-9E10-4A84-A564-B2DF0657F8D6',
            name: 'UGroupCapacityFirst',
            title: 'سهمیه اول دوره گروهی',
            icon: 'done_all'
          }
        ]
      },
      {
        id: '1734FFC2-485C-4657-B104-FBF767557F78',
        name: 'apartment',
        title: 'دفاتر',
        icon: 'apartment',
        nodes: [
          {
            id: 'C778F511-FE62-4060-806F-9C30311105D6',
            name: 'UEngOffice',
            title: 'دفتر مهندسی',
            icon: 'apartment',
            width: '900px',
            height: '600px'
          },
          {
            id: '4B9B76DD-4B9D-42F2-B72D-72B3B23FFD30',
            name: 'UJoinInOffice', // 'Umembership',
            title: 'عضویت در دفتر',
            icon: 'input',
            width: '900px',
            height: '600px'
          },
          {
            id: '327289f5-9628-4c1c-9f1d-0eeaee727779',
            name: 'UEngOrganOffices',
            title: 'دفاتر نظام مهندسی',
            icon: 'maps_home_work',
            width: '900px',
            height: '600px'
          }
        ]
      },
      {
        id: '1E2A1287-5951-49DC-9D97-54DB0D8E6323',
        name: 'EngAffairs',
        title: 'امور مهندسین',
        icon: 'record_voice_over',
        nodes: [
          {
            id: 'D65D4CB0-9D33-4F08-BCF0-9A9DA5C41D3B',
            name: 'UDabirkhaneEngineer',
            title: 'دبیرخانه مهندسین',
            icon: 'group'
          },
          {
            id: '3CB1869B-AE17-4A42-BCA9-AC1221CB4D05',
            name: 'UReferFileToEngineer',
            title: 'ارجاع پرونده به مهندس',
            icon: 'send'
          },
          {
            id: '995A28A0-5677-4243-996D-37AA9D920BFE',
            name: 'UCanceledRefrences',
            title: 'ارجاعات انصراف داده شده',
            icon: 'cancel_schedule_send',
            width: '1000px',
            height: '600px'
          },
          {
            id: '502A2F77-DBB4-4731-BA15-2F19E2022539',
            name: 'UDynamicReferWork',
            title: 'ارجاع کار پویا',
            icon: 'reply_all',
            popup: true
          },
          {
            id: '89883D08-3C21-4A32-8832-29AD4A9B5B63',
            name: 'UReferFileToOffice',
            title: 'ارجاع پرونده به دفتر',
            icon: 'markunread_mailbox'
          },
          {
            id: '23FE4A8A-BD5E-422F-9216-8125DC26B09E',
            name: 'UBlackList',
            title: 'لیست سیاه',
            icon: 'img:subMenu/blackList.svg',
            link: '/engineers-affairs/UBlackList'
          },
          {
            id: '320C4872-8B3B-4396-9A6E-2FB49CCAE7B5',
            name: 'UFreeCapacity',
            title: 'آزادسازی ظرفیت',
            icon: 'new_releases'
          },
          {
            id: '2FED2E89-B0F7-4B5F-95B2-BFEB0680ABC9',
            name: 'EngArchive',
            title: 'آرشیو',
            icon: 'archive'
          },
          {
            id: '3F99772D-3BB4-4DD8-9E6F-6F59F00C17A6',
            name: 'UCoordinatingEngineers',
            title: 'مهندسین هماهنگ کننده',
            icon: 'home',
            width: '1000px',
            height: '600px'
          },
          {
            id: 'db56a545-11d7-4a1f-b0c6-9d1a81f4d4bb',
            name: 'USendMessageToEngineer',
            title: 'ارسال پیام به مهندسین',
            icon: 'message',
            width: '900px',
            height: '800px',
            popup: true
          },
          {
            id: '9C83FB3C-A233-436D-B5C3-3184AF41CA90',
            name: 'UReviewEngineersAffairs',
            title: 'بازبینی امور مهندسین',
            width: '1000px',
            height: '600px'
          },
          // {
          //   id: '0298097f-278e-461e-a939-a65c1fcbc86e',
          //   name: 'URequestToAnother',
          //   title: 'پیوست مهندس ها از یک درخواست به درخواست دیگر',
          // },
          // {
          {
            id: '932A0B38-6B03-4CCB-A75B-E0882B5F5407',
            name: 'URevisitMohandesin',
            title: 'بازدید',
            icon: 'img:subMenu/bazdid.svg'
          },
          {
            id: 'CE774ADA-9E62-493D-BEA3-789A3C8A2308',
            name: 'USendSmsOnRequest',
            title: 'ارسال پیامک بر اساس درخواست',
            icon: 'message'
          },
          {
            id: '0298097F-278E-461E-A939-A65C1FCBC86E',
            name: 'UAttachedEngineersFromRequest',
            title: 'پیوست مهندس ها از یک درخواست به درخواست دیگر',
            icon: 'attach_email'
          },
          {
            id: 'C8E5F593-8FA3-4754-8156-E06B2F8F5BFA',
            name: 'USendSMS',
            title: 'ارسال پیامک',
            icon: 'send'
          },
          {
            id: 'BAC19DA5-130E-44CA-9089-7C29F58A5184',
            name: 'UBuildingExecRepReview',
            title: 'سوابق گزارشات مرحله ای',
            icon: 'summarize'
          },
          {
            id: 'C53B4DC3-CB99-462C-BEBB-E014AB952527',
            name: 'UWaitingList',
            title: 'لیست انتظار ارسال به بازبین',
            icon: 'featured_play_list'
          }
        ]
      },
      {
        id: '5EDED745-2042-4435-B6F5-994B4C2BA615',
        name: 'BaseInformation',
        title: 'اطلاعات پایه',
        icon: 'help',
        nodes: [
          {
            id: '8B1A8554-3F78-454E-ABF1-B5AE5B8335B0',
            name: 'UCompetentConstructionGroups',
            title: 'گروه های ساختمانی ذیصلاح',
            icon: 'holiday_village'
          },
          {
            // id: '11B82007-5214-4087-BAEE-4D7A1B72D944', // با شهرسازی یکیه
            id: 'C56A4180-65AA-42EC-A945-5FD21DEC0539',
            name: 'UMapControl',
            title: 'کنترل نقشه',
            icon: 'gps_fixed',
            link: '/base-information/UMapControl',
            width: 1300
          },
          {
            id: 'B5DCA8CA-B7C8-49ED-A851-CF0DC580629A',
            name: 'URequestSara',
            title: 'ارسال به شهرسازی',
            icon: 'send',
            width: '400px',
            height: '300px',
            popup: true
          },
          {
            id: '7E609374-9521-40D0-AA98-88EA58280F7A',
            name: 'EngSetting',
            title: 'تنظیمات',
            icon: 'settings',
            width: '400px',
            height: '300px',
            popup: true
          },
          {
            id: 'B5906C1E-1B07-47CF-AEEF-C2933A952CC1',
            name: 'URelapseHistory',
            title: 'تاریخچه عودت',
            icon: 'history',
            width: '850px',
            height: '550px',
            popup: true
          },
          {
            id: 'F5FCEEBC-2A27-4F9F-8E90-C941C159945E',
            name: 'UChangeNosaziCode',
            title: 'تغییر کد نوسازی',
            icon: 'change_circle',
            width: '435px',
            height: '190px',
            popup: true
          },
          {
            id: 'C7211BE1-C418-449B-BE63-0F84C9A5C16B',
            name: 'UChangefiloperation',
            title: 'تغییر تاریخ شروع عملیات',
            icon: 'history_toggle_off',
            width: '520px',
            height: '200px',
            popup: true
          },
          {
            id: 'A8A0BB2A-8742-4246-8898-B5F982FB307B',
            name: 'UWFSettings',
            title: 'تنظیمات گردش کار',
            icon: 'settings_applications'
          }
          // {
          //   id: 'c20e0fb1-3315-413e-806b-cc345c10127d',
          //   name: 'kartable-pasokhgo',
          //   title: 'کارتابل پاسخگو',
          //   link: '/kartable-pasokhgo'
          // }
        ]
      },
      {
        id: '05734007-5DC2-4B50-A164-B05BA4909BB5',
        name: 'Reports', // Reports
        title: 'گزارشات',
        icon: 'report',
        nodes: [
          {
            id: '9FEB1921-AAC5-4359-8E97-947548A9C3B4',
            name: 'UEngineerPerformance',
            title: 'عملکرد مهندس',
            icon: 'equalizer',
            width: '1000px',
            height: '700px'
          },
          {
            id: 'CCADC178-4D53-442C-8C73-51BED3F2FB29',
            name: 'UOfficePerformance',
            title: 'عملکرد دفتر',
            icon: 'poll',
            width: '1000px',
            height: '700px'
          },
          // {
          //   id: 'e1e0c680-c673-4989-9ed3-7540a510f140',
          //   name: '',
          //   title: 'گزارش تحلیلی عملکرد دفتر',
          //   link: '/'
          // },
          {
            id: 'F3C7083F-5D11-4D4D-AEE2-521B1908CF84',
            name: 'UEngineerInfoReport',
            title: 'گزارش اطلاعات مهندس',
            icon: 'summarize',
            width: '800px',
            height: '600px'
          },
          {
            id: '8ED2809B-8BBB-4664-83BB-DF4C46C63DBB',
            name: 'PerformanceReport',
            title: 'گزارش کارکرد',
            icon: 'manage_search'
          },
          // {
          //   id: '0b4f37e5-e66e-48ed-97a7-9cf7d1305b77',
          //   name: '',
          //   title: 'گزارش تحلیلی درخواست های صادره',
          //   link: '/'
          // },
          {
            id: '74FB01C8-55B6-4D56-B9CE-86C796785E76',
            name: 'UBlackListReport',
            title: 'گزارش لیست سیاه',
            link: '/'
          },
          {
            id: 'E097E672-48E7-43C0-A178-5C5F7311A9D2',
            name: 'EngineerMembership',
            title: 'سابقه عضویت مهندس در دفتر',
            icon: 'history_toggle_off',
            link: '/'
          },
          {
            id: 'FE64A441-6079-4CC6-8FF7-5E0BAC678FFC',
            name: 'ReceiptsReceived',
            title: 'فیش های وصول شده',
            icon: 'credit_score',
            link: '/'
          },
          {
            id: '63FC5B29-2EFD-4ABD-BADF-B0118D68455B',
            name: 'UTopRateEngs',
            title: 'لیست مهندسین دارای بالاترین امتیاز',
            icon: 'sports_score',
            link: '/'
          },
          {
            id: 'f3f15ef8-64aa-48ff-80fb-cbaf9055ba0f',
            name: 'UMonitoringReferToEngineer',
            title: 'مانیتور مهندسین ارجاع شده',
            icon: 'device_hub',
            width: '850px',
            height: '550px',
            popup: true
          },
          {
            id: '3e02511b-490c-489a-8e48-ea2e1ab9f7df',
            name: 'UMonitoringReservedEngineer',
            title: 'مانیتور مهندسین رزرو شده',
            icon: 'legend_toggle'
          }
        ]
      },
      {
        id: '5B2852EF-78C2-4C16-9123-04D8CE995B90',
        name: 'Income',
        title: 'درآمد',
        icon: 'img:subMenu/Daramad.svg',
        nodes: [
          {
            id: '8655A2CF-140D-4702-BDA8-F261D231F7C4',
            name: 'IncomeDocument',
            title: 'سند درآمد',
            icon: 'receipt'
          },
          {
            id: '53b14b97-f428-4ec1-afd8-e2a8ea0d5255',
            name: 'URegisterBankReceipt',
            title: 'ثبت اطلاعات فیش از بانک',
            icon: 'account_balance_wallet'
          },
          {
            id: '9587DBE6-F0BD-42DC-B3F6-3B9E400AC449',
            name: 'UIncomeTariffs',
            title: 'تعرفه های درآمدی',
            icon: 'payments',
            width: '800px',
            height: '600px'
          },
          {
            id: 'C6FF8647-A332-428D-ACDE-4821888ADBBE',
            name: 'UIncomeSymptoms',
            title: 'عوارض درآمدی',
            icon: 'money_off',
            width: '800px',
            height: '600px'
          },
          {
            id: '7385758A-2F9A-45BB-A574-3E5D17BE746B',
            name: 'USearchIncomingDocuments',
            title: 'جستجو در اسناد دریافتی',
            icon: 'find_in_page',
            width: '900px',
            height: '700px'
          },
          {
            id: '9ACCB36E-6C4E-4B67-9F1D-D414E35B9CC8',
            name: 'UFilIncomeSymptoms',
            title: 'عوارض پرونده',
            icon: 'developer_board_off'
          },
          // {
          //   id: '3c12d4b2-a334-4d46-9d93-807f41f50415',
          //   name: '',
          //   title: 'عوارض پرونده - مشهد',
          //   link: '/'
          // },
          {
            id: '462DC90C-6D42-4F18-8375-824838272D38',
            name: 'UAvarezParvandehReport',
            title: 'گزارش عوارض پرونده',
            icon: 'summarize'
          },
          // {
          //   id: 'B6A629A4-5F0C-4277-B558-BC15CEB4B084',
          //   name: 'EngConfirmFiche',
          //   title: 'تأیید فیش',
          //   icon: 'folder',
          //   popup: true,
          //   width: '600px',
          //   height: '500px'
          // },
          {
            id: '8AE3438F-2BB5-4BCD-93B1-3825F7388ADA',
            name: 'UAvarezEngineer',
            title: 'عوارض مهندس',
            icon: 'person_off',
            width: '800px',
            height: '600px'
          },
          {
            id: '30AD827D-13A3-403F-91E5-6B9DD6C8F1B7',
            name: 'UConfirmationBankingService',
            title: 'تأیید فیش از طریق وب سرویس بانک',
            icon: 'account_balance_wallet',
            width: '800px',
            height: '600px'
          }
        ]
      }
      // {
      //   id: '48486bab-5f45-42be-8ff7-8da670cd1311',
      //   name: 'Help',
      //   title: 'راهنما',
      //   icon: 'help_center',
      //   nodes: [
      //     {
      //       id: '23d1bde7-9017-4af6-b076-e4dc2a45b693',
      //       name: '',
      //       title: 'راهنما',
      //       link: '/'
      //     }
      //   ]
      // }
    ]
  },
  {
    id: '7B72DB32-6690-4ECE-9EA4-9F234CF42830', // سکیوریتی سرا8 و 10
    // id: '96209B12-A716-45A5-AB35-22C5C8E8FD4D', // زمل
    name: 'supervisorOperationEng',
    title: 'عملکرد مهندسین ناظر',
    parent: {
      name: 'EngineeringSupervisor',
      id: '90bba2fe-5569-45b3-9a7b-eb92b3b19ca1', // appId
      title: 'عملکرد مهندسين ناظر'
    },
    icon: 'manage_accounts',
    nodes: [
      {
        id: 'ecf3ca9e-acc7-49d3-bbe5-1e246c9dfb7a',
        name: 'UKartableReferences',
        title: 'کارتابل ارجاعات',
        icon: 'list_alt',
        popup: false,
        props: { padding: false }
      },
      {
        icon: 'account_tree',
        id: 'E949BF7D-D86A-4E33-9961-7C53D453F623',
        name: 'UReportWorkOff',
        title: 'گزارش کارکرد دفتر',
        width: '1000px',
        height: '700px',
        popup: true
      },
      {
        icon: 'gps_fixed',
        id: '194AF661-F90D-4D49-8822-2982B1E05EBC',
        name: 'UMapControl',
        title: 'کنترل نقشه',
        link: '/base-information/UMapControl',
        width: 1300
      },
      {
        id: 'E860DAFD-DD1E-4D17-9276-98B7DD8ACCCF',
        name: 'KhodEzhari',
        title: 'خود اظهاری',
        icon: 'camera_front',
        width: 1000
      },
      {
        id: 'CBC55F04-6F57-40BC-8D5F-6A3C20DEA773',
        name: 'UOperationReport',
        title: 'گزارش عملکرد',
        icon: 'pivot_table_chart'
      },
      {
        id: 'B608D2FE-EFDF-4681-84FC-15597C519465',
        name: 'ULicenseInfrastructureInfo',
        title: 'اطلاعات زیربنای پروانه',
        icon: 'pivot_table_chart'
      },
      {
        id: '8EF0363A-D0D9-4A99-A0F7-3DD771675A52',
        name: 'UCoordinator',
        title: 'اعلام ناظر هماهنگ کننده',
        icon: 'camera_front',
        width: 1000
      },
      {
        id: '30437EFF-0606-4721-AD12-7B8B320CA0AA',
        name: 'USecretariatOfEngineers',
        title: 'دبیرخانه مهندسین',
        icon: 'group',
        width: '940px',
        height: '600px',
        popup: true
      },
      {
        id: '87E86B5B-637E-4A11-9E5B-9260E9C128CA',
        name: 'UReturnedCheckers',
        title: 'بازبینی های برگشت خورده',
        icon: 'pivot_table_chart'
      },
      {
        id: '78EBEA4F-ABB8-4ACA-A18B-1BDFAD400FCF',
        name: 'UEngineerDutySelfDeclaration',
        title: 'خوداظهاری ارجاع پویا',
        icon: 'pivot_table_chart'
      },
      {
        id: 'b7b54f39-3d69-4a55-905b-0a3db15f174a',
        name: 'UDashboardEengineerReference',
        title: 'داشبورد عملکرد',
        icon: 'pivot_table_chart'
      },
      {
        id: '315E26CF-13E2-42B9-961E-F7B3238D8EA8',
        name: 'UBuildingExeReport',
        title: 'گزارشات مرحله ای',
        icon: 'camera_front',
        width: 1000
      },
      {
        id: '5845D691-6730-4B5F-896B-965383A3B1DD',
        name: 'UAcceptBuildingExeReport',
        title: 'کارتابل گزارشات مرحله ای',
        icon: 'pivot_table_chart'
      },
      // {
      //   id: '7ba0789d-cd9e-4cf0-ba11-79500d4ecc3d',
      //   name: 'UOperationBuildingArea',
      //   title: 'گزارش ابعاد و محدوده سقفهای ساختمان',
      //   icon: 'pivot_table_chart',
      //   popup: true,
      //   width: '1266px',
      //   height: '470px',
      //   public: true
      // },
      {
        id: '1d7f3421-7bb4-4492-91d1-efffd2b4bb51',
        name: 'UKartableDynamicRef',
        title: 'کارتابل ارجاع پویا',
        icon: 'folder_shared'
      },
      {
        id: 'BE4435F5-E6BB-4667-90A6-F94B42C39F72',
        name: 'UEngineerReferCancel',
        title: 'انصراف از ارجاع کار',
        icon: 'group',
        width: '850px',
        height: '470px',
        popup: true
      },
      {
        id: '455A519B-0B69-4B44-A1BA-5AE731FCEE2A',
        name: 'UEngineerDuty',
        title: 'عوارض مهندس',
        icon: 'pivot_table_chart'
      },
      {
        id: '885E26CF-13E2-42B9-961E-F7B3238D8E69',
        name: 'UBarokafCommitment',
        title: 'تعهدات بروکف',
        icon: 'rule',
        width: '900px',
        height: '400px',
        popup: true
      },
      {
        id: '78DAF322-E95E-455F-89CE-1AF92D3115A5',
        name: 'UEngineerReferList',
        title: 'ارجاعات پرونده',
        icon: 'reply_all'
      },
      {
        id: 'D4FEBA33-BDDF-4408-A779-07269A436A78',
        name: 'UEngineerVacation',
        title: 'تعطیلات مهندس',
        icon: 'holiday_village'
      },
      {
        id: '6B39B1B1-CB63-44F1-A41E-3BA8798846BD',
        name: 'UEngineeringCapacity',
        title: 'درخواست ظرفیت سالانه',
        icon: 'reduce_capacity'
      },
      {
        id: 'BA4DE235-3EDC-45EC-99BF-86D76D3228F1',
        name: 'UEngineerReferRequest',
        title: 'درخواست ارجاع کار',
        icon: 'pivot_table_chart'
      },
      {
        id: 'C46BF80E-0D85-4F32-8F49-4F2D1A7B9115',
        name: 'UConstruction',
        title: 'شروع عملیات ساختمانی',
        icon: 'pivot_table_chart'
      },
      {
        id: 'F6FFAF42-D7D1-4008-A472-7A1AC7EA376C',
        name: 'UCheckingInfoCalculator',
        title: 'اطلاعات بازبین محاسب',
        icon: 'pivot_table_chart',
        popup: true
      },
      {
        id: '36E9E13E-7E6B-4145-BF15-440F95CD4FAC',
        name: 'UCheckingInfo',
        title: 'اطلاعات بازبین',
        icon: 'pivot_table_chart',
        popup: true
      },
      {
        id: '7cfea8ad-9da1-4ef9-9d80-225e3cabfee1',
        name: 'UOperationBuildingForm',
        title: 'گزارش جدولی',
        icon: 'pivot_table_chart',
        popup: true,
        width: '1200px',
        height: '800px'
      },
      {
        id: '7BA0789D-CD9E-4CF0-BA11-79500D4ECC3D',
        name: 'UBuildingRoofAreaReport',
        title: 'گزارش ابعاد و محدوده سقفهای ساختمان',
        icon: 'pivot_table_chart'
      },
      {
        id: '01D5DE15-E75B-459F-8F6D-8CA1019FC3BF',
        name: 'UBuildingPlan',
        title: 'نقشه های داخلی ساختمان',
        icon: 'queue_play_next',
        width: '850px',
        height: '450px',
        popup: true
      },
      {
        id: '68818180-C195-489B-8150-EED25863BAF3',
        name: 'EngineersOperationArchive',
        title: 'آرشیو',
        icon: 'pivot_table_chart',
        popup: true
      },
      {
        id: '5DD81B7D-098B-4A04-B650-3DE343E6F417',
        name: 'UAcceptFrame',
        title: 'تایید سفتکاری/پایانکار',
        icon: 'pivot_table_chart'
      },
      {
        id: 'CAEE4E1B-D590-4C95-A740-BC420DAD75D9',
        name: 'UReportAbuse',
        title: 'گزارش تخلف',
        icon: 'pivot_table_chart'
      }
      // { //http://task.safarayaneh.com:8080/browse/SARA10-665  طبق درخوات تسک  و گقته های اقای صالحی دررابطه به اینکه این فرم نباید از سایدبار باز بشه
      //   id: '289AC10A-1EF6-46D3-B297-EC6CFFCE4CDF',
      //   name: 'USaveMissionStart',
      //   title: 'ثبت تاریخ شروع عملیات',
      //   icon: 'pivot_table_chart'
      // }
    ]
  },
  {
    id: 'badbf938-ee27-414f-8df4-6fa440f8fa70',
    name: 'commission',
    title: 'دبیرخانه کمیسیون های ماده 100',
    icon: 'img:sidebar/Commision.svg',
    // parent: {
    //   name: 'commission',
    //   id: 'badbf938-ee27-414f-8df4-6fa440f8fa70', // appId
    //   title: 'دبیر خانه کمیسیون های ماده 100'
    // },
    help: 'commission-100/help.pdf',
    nodes: [
      {
        id: '1DC491C8-26B9-45CA-9E56-D8E2DE6FA0BD',
        name: 'UKartableCommission',
        title: 'کارتابل کمیسیون',
        icon: 'markunread_mailbox',
        public: false,
        popup: false,
        props: { padding: false }
      },

      {
        id: 'F2C30863-551E-4FB0-924F-2DDFA86353B9',
        name: 'UCommissionKartablePasokhgo',
        title: 'کارتابل پاسخگو کمیسیون',
        icon: 'list_alt',
        public: false,
        popup: false,
        props: { padding: false }
      },
      {
        icon: 'info',
        id: '35A72A90-B3F3-45F8-8170-47594237601C',
        name: 'UCommissionInformation',
        title: 'اطلاعات کمیسیون',
        nodes: [
          {
            id: '0768EF23-ACEB-4034-A50E-FAB72F409F32',
            name: 'UDeterminationCommission',
            // name: 'URandomCommission',
            title: 'کمسیون بندی تصادفی',
            icon: 'list_alt'
          },
          {
            id: 'A3BBDE85-75C5-4172-9195-979281179C14',
            name: 'URandomSend',
            title: 'ارسال تصادفی',
            icon: 'shuffle_on',
            width: '900px',
            height: '700px'
          },
          {
            id: 'AD8FB4D1-8045-4EA7-A26F-B0BB41320CDB',
            name: 'UVoting',
            title: 'فرم صدور رای',
            icon: 'how_to_vote',
            public: false,
            popup: false,
            props: { padding: false }
          },
          {
            id: '8C717418-509C-4424-B714-6B693F4A5EE8',
            name: 'Ukarshenasi',
            title: 'کارشناسی',
            icon: 'grading',
            public: false,
            popup: false,
            props: { padding: false }
          },
          {
            id: 'EB1ECDB5-5D2B-4056-92DF-F35AD2255754',
            name: 'UCommissionVoteDeleteLog',
            title: 'سوابق رای های حذف شده',
            icon: 'history_edu',
            public: false,
            popup: true,
            width: '1100px',
            height: '620px'
          },
          {
            id: 'A04EBD0E-5913-40CC-BF9F-5D741A08491E',
            name: 'UUrbanPlanningInfo',
            title: 'اطلاعات شهرسازی',
            icon: 'source',
            width: '900px',
            height: '600px'
          },
          {
            id: '39F9FEE2-EE37-4F8D-B903-1A09F6066489',
            name: 'UReferences',
            title: 'ارجاعات',
            icon: 'reply_all',
            width: '900px',
            height: '600px'
          },
          {
            id: 'A4F8259B-5638-49E0-812D-799513E2AFAD',
            name: 'UDeterminationCommission',
            title: 'تعیین کمیسیون',
            icon: 'fact_check'
          },
          {
            id: '0D968B6E-F77E-4074-8A68-F6F7658A3542',
            name: 'UDataEntry',
            title: 'ورود اطلاعات',
            icon: 'description',
            width: '900px',
            height: '600px'
          },
          {
            id: 'B87D1EC7-4A0E-4EFD-9F2D-97AF1D1E52EF',
            name: 'UTrepasses',
            title: 'ویرایش تخلفات',
            icon: 'border_color',
            width: '1200px',
            height: '800px'
          },
          {
            id: 'E1E76572-6A93-47A8-968A-82ADC44F521C',
            name: 'UCommissionProclamation',
            title: 'ابلاغیه کمیسیون',
            icon: 'payment',
            width: '900px',
            height: '600px'
          },
          {
            id: 'FD6C3E97-04CF-4F34-AE14-6EC12F1DE04B',
            name: 'UCommissionAppointment',
            title: 'قرار کمیسیون',
            icon: 'subtitles',
            width: '600px',
            height: '400px'
          },
          {
            id: '5E9B5BB1-7ABE-41CD-9026-D923D6318DF6',
            name: 'USendMessage',
            title: 'ارسال پیامک بر اساس درخواست',
            icon: 'message',
            width: '800px',
            height: '500px'
          },
          {
            id: '681CC636-7FD9-49A5-A9B1-3DC680635402',
            name: 'UBarasiHoghoghi',
            title: 'بررسی حقوقی',
            icon: 'grading',
            width: '800px',
            height: '500px'
          },
          {
            id: '3BBA1B7C-30A3-4F23-8DC6-E920B7B2274D',
            name: 'UCommissionVoteTrepasses',
            title: 'کسر از آمار',
            icon: 'free_cancellation',
            width: '1000px',
            height: '700px'
          },
          {
            id: '0CFF0F6A-D411-404F-8CA7-7D5CD807711E',
            name: 'USaveRulings',
            title: 'ثبت احکام',
            icon: 'playlist_add_circle',
            width: '800px',
            height: '400px'
          },
          {
            id: '56E7876C-210C-4D2D-93EF-16DEA5DA4999',
            name: 'URequestJudicialRepresentation',
            title: 'تقاضای نیابت قضایی',
            icon: 'privacy_tip',
            width: '900px',
            height: '700px'
          },
          {
            id: '1563FA6A-9A5A-4805-B13D-BB4B3D7D83DD',
            name: 'ULegalProxyExecutionOrder',
            title: 'دستور نیابت قضایی',
            icon: 'privacy_tip',
            width: '900px',
            height: '700px'
          },
          {
            id: '0F98C7E0-31BA-4B5D-B354-1FA2785A1131',
            name: 'ULegalProxyExtension',
            title: 'تمدید نیابت قضایی',
            icon: 'privacy_tip'
          },
          {
            id: '33E7876C-210C-4D2D-93EF-16DEA5DA3333',
            name: 'UTaeeTamdidDastorGhazaee',
            title: 'تایید تمدید دستور نائب قضایی',
            icon: 'gavel',
            width: 600,
            height: 300
          },
          {
            id: '23E7876C-210C-4D2D-93EF-16DEA5DA1111',
            name: 'UDastorHookVorodGhazaee',
            title: 'دستور حکم ورود و نیابت قضایی',
            icon: 'admin_panel_settings',
            width: 1200,
            height: 750
          },
          {
            id: '66E7866C-210C-4D2D-93EF-16DEA5DA4169',
            name: 'URequestsReferredToLegalExpert',
            title: 'درخواست های ارجاع شده به کارشناس حقوقی',
            icon: 'reply_all',
            width: '900px',
            height: '600px'
          },
          {
            id: '4A200C08-83DD-4F92-AFA9-F16E90CE5FB1',
            name: 'ULetters',
            title: 'مکاتبات',
            icon: 'settings_remote',
            width: '900px',
            height: '600px'
          },
          {
            id: '74B751D5-A537-4E86-BF94-47990ADAA6AC',
            name: 'UCommissionBlackList',
            title: 'لیست سیاه',
            icon: 'img:subMenu/blackList.svg',
            width: '900px',
            height: '600px'
          },
          {
            id: '56e7876c-210c-4d2d-93ef-16de88788878',
            // 'cc8d9492-0706-465a-a23b-2454273dcf5c',
            name: 'UTemporaryArchive',
            title: 'بایگانی موقت',
            icon: 'archive',
            width: '900px',
            height: '600px'
          }
        ]
      },
      {
        id: '135952F4-A676-4BD0-856E-F20DA78550DE',
        name: 'CommissionReports',
        title: 'گزارشات',
        icon: 'report',
        nodes: [
          {
            id: '054CB500-20BE-4357-8C65-71789218F555',
            name: 'UAnalyticalReports',
            title: 'گزارشات تحلیلی',
            icon: 'summarize',
            public: false,
            popup: false,
            props: { padding: false }
          },
          {
            id: '253177F3-B544-40D2-9BFA-16B48C17843C',
            name: 'UUrbanPlanningSystemReports',
            title: 'گزارشات سیستم شهرسازی',
            icon: 'sync_alt',
            width: '600px',
            height: '350px'
          },
          {
            id: '8AFC6975-C373-4BD5-A199-4E74F2EA7953',
            name: 'CommisionGraph',
            title: 'گراف عملکرد کمیسیون ها',
            icon: 'donut_small',
            width: '800px',
            height: '500px'
          }
        ]
      },
      {
        id: 'D4576834-8390-4B38-A702-7A77ABE7EFB3',
        name: 'RepresentativeManagement',
        title: 'مدیریت نماینده ها',
        icon: 'manage_accounts',
        nodes: [
          {
            id: '463E4761-850D-4060-979F-72A19B947073',
            name: 'UInsertNewRepresentative',
            title: 'درج نماینده جدید',
            icon: 'person_add',
            popup: true,
            width: '600px',
            height: '590px'
          },
          {
            id: '8A758820-0B54-413E-B70E-FFBFA6AED2B5',
            name: 'URepresentativeManagement',
            title: 'مدیریت نماینده ها',
            icon: 'manage_accounts',
            width: '1000px',
            height: '700px'
          },
          {
            id: '5FDEBB31-BA1D-4AF7-8ACE-727C1786E862',
            name: 'UEperts',
            title: 'کارشناسان',
            icon: 'group',
            width: '900px',
            height: '600px'
          }
        ]
      },
      {
        id: '31A9DAAA-B3B5-4A92-A113-0D540665A5D5',
        name: 'Setting',
        title: 'تنظیمات',
        icon: 'settings',
        nodes: [
          {
            id: 'B00F4FFD-08B3-43D9-B68A-C82977071425',
            name: 'UWorkflowManagement',
            title: 'مديريت گردش کار',
            icon: 'tune',
            width: '900px',
            height: '600px'
          },
          {
            id: '1382a3f3-cf71-4797-bc14-3751cd899f60',
            name: 'UCommissionSettings',
            title: 'تنظیمات کمیسیون',
            icon: 'settings_applications',
            width: '450px',
            height: '600px',
            popup: true
          }
        ]
      },
      {
        id: '0CFA7C04-F089-4C96-8F5C-9A52AED212E5',
        name: 'UMainInformation',
        title: 'اطلاعات پایه',
        icon: 'info',
        nodes: [
          {
            id: 'cf8f5d3c-8edd-4b66-b002-e5eb29284d6d',
            name: 'UHolidayCommission',
            title: 'تعطیلات کمسیونها',
            icon: 'holiday_village',
            width: '900px',
            height: '600px'
          },
          {
            id: '1CF53820-677D-433C-9343-17C2D1CEE9C6',
            name: 'UCodingVotes',
            title: 'کدینگ رای',
            icon: 'how_to_vote',
            width: '900px',
            height: '600px'
          },
          // {
          // این فرم فقط از گردشکار باز میشود، جهت تست اینجا قرارداده شده.
          //   id: '71826ABA-3F38-4FD7-B622-6FCF5536C437',
          //   name: 'UNotificationVote',
          //   title: 'ابلاغ رای',
          //   icon: 'how_to_vote',
          //   public: true
          // },
          {
            id: '1D3C1117-F79C-43D8-BD28-3E429A30A1DF',
            name: 'UrbanPlanningArchive',
            title: 'آرشیو شهرسازی',
            icon: 'archive',
            width: '900px',
            height: '600px'
          }
        ]
      }
      // {
      //   id: '61A6F424-4CED-48E2-A0AB-B429AB5A5AB0',
      //   name: 'UHelpCommission100',
      //   title: 'راهنما',
      //   icon: 'help_center',
      //   nodes: [
      //     {
      //       id: '79BD1AA4-D234-452D-B9A2-2345A2BFAFE3',
      //       name: 'UHelpCommission100',
      //       title: 'راهنما',
      //       icon: 'help_center',
      //       link: '/commission-menu/HelpCommission'
      //     }
      //   ]
      // }
    ]
  },
  {
    id: 'b65fe692-0000-40c9-0014-66b8eb0e9e77',
    name: 'userInformation',
    title: 'اطلاعات کاربر',
    icon: 'assignment_ind',
    // parent: {
    //   name: 'userInformation',
    //   id: 'badbf938-ee27-414f-8df4-6fa440f8fa70', // appId
    //   title: 'اطلاعات کاربر'
    // },
    nodes: [
      {
        id: 'B65FE692-36EA-0001-0014-66B8EB0E9E77',
        name: 'URequestToCreateNewUser',
        title: 'درخواست کاربر جدید',
        icon: 'person_add'
      },
      // {
      //   id: "60235305-c2e2-484a-abcd-995920c6837e",
      //   name: "UUserInfo",
      //   title: "اطلاعات کاربر",
      //   icon: "person_add",
      //   public: true
      // },
      {
        id: 'B65FE692-36EA-0001-0015-66B8EB0E9E77',
        name: 'URequestOfficeUser',
        title: 'درخواست تعریف کاربر دفاتر',
        icon: 'person_add'
        // public: true
        // width: '900px',
        // height: '500px',
        // popup: true
      },
      {
        id: 'B65FE692-36EA-0001-0016-66B8EB0E9E77',
        name: 'UInsertSource',
        title: 'ایجاد منابع جدید',
        icon: 'list_alt'
      },
      {
        id: 'B65FE692-36EA-0001-0017-66B8EB0E9E77',
        name: 'UDutyPlace',
        title: 'محل خدمت',
        icon: 'list_alt'
      },
      {
        id: 'B65FE692-36EA-0001-0018-66B8EB0E9E77',
        name: 'UTokenAllocation',
        title: 'اختصاص توکن',
        icon: 'list_alt'
      },
      {
        id: 'b65fe692-36ea-0001-0028-66b8eb0e9e77',
        name: 'officeViolationResponse',
        title: 'پاسخگوی تخلفات دفاتر',
        icon: 'list_alt'
      },
      // {
      //   id: 'b65fe692-36ea-0001-0015-66b8eb0e9e77',
      //   name: '',
      //   title: 'درخواست کاربر دفاتر',
      //   icon: 'list_alt',
      // },
      {
        id: 'B65FE692-36EA-0001-0026-66B8EB0E9E77',
        name: 'UCheckEfficiencyOffices',
        title: 'بررسی عملکرد دفاتر',
        icon: 'list_alt'
      },
      {
        id: 'B65FE692-36EA-0001-0027-66B8EB0E9E77',
        name: 'UIssuingOfficeViolations',
        title: 'صدور رای تخلفات دفاتر',
        icon: 'list_alt'
      },
      {
        id: 'B65FE692-36EA-0001-0029-66B8EB0E9E77',
        name: 'UDissociateCenter',
        title: 'قطع همکاری ستاد',
        icon: 'list_alt'
      },
      {
        id: 'B65FE692-36EA-0001-0020-66B8EB0E9E77',
        name: 'UPersonelCut',
        title: 'قطع همکاری کاربر',
        icon: 'list_alt',
        public: true
      },
      // {
      //   id: 'B65FE692-36EA-0001-0030-66B8EB0E9E77',
      //   name: '',
      //   title: 'لیست درخواست ها',
      //   icon: 'list_alt',
      // },
      {
        id: 'B65FE692-36EA-0001-0025-66B8EB0E9E77',
        name: 'UVotingMembers',
        title: 'ثبت اعضاء صدور رای',
        icon: 'list_alt',
        width: '480px',
        height: '300px',
        popup: true
      },
      // {
      //   id: 'b65fe692-36ea-0001-0026-66b8eb0e9e77',
      //   name: '',
      //   title: 'ثبت درخواست تخلفات دفاتر',
      //   icon: 'list_alt',
      // },
      {
        id: 'B65FE692-36EA-0001-0019-66B8EB0E9E77',
        name: 'UUserSelfStatement',
        title: 'خود اظهاری کاربر',
        icon: 'list_alt'
      }
    ]
  },

  {
    id: 'f57023ab-297d-45e7-b10c-263b561038dd',
    name: 'fireFighting',
    title: 'آتش نشانی',
    icon: 'img:sidebar/FireHydrant.svg',
    parent: {
      name: 'fireFighting',
      id: '5fb05a4f-da31-4202-83d1-d7558d5e965a', // appId
      title: 'آتش نشانی'
    },
    nodes: [
      {
        id: 'cb798ad1-e798-4b84-b4e9-529e05db07d4',
        name: 'DocInfo',
        title: 'اطلاعات پرونده',
        icon: 'source',
        nodes: [
          {
            id: '2d89cc27-14b5-43eb-8adb-3a04cc0f4746',
            name: 'UFireRequestSubmission',
            title: 'ثبت درخواست',
            icon: 'touch_app'
          },
          {
            id: 'ba56639d-a81f-4fa5-9b48-61326376e940',
            name: 'UFireParvandehInfo',
            title: 'اطلاعات پرونده',
            icon: 'source'
          }
        ]
      },
      {
        id: '1d63be6b-e19b-4de8-a069-c43bd321126b',
        name: 'revisit',
        title: 'بازدید',
        icon: 'img:subMenu/bazdid.svg',
        nodes: [
          {
            id: '5c90410d-9822-4446-a533-82a824314b41',
            name: 'FireRevisitAgentAssign',
            title: 'اعلام مامور بازدید',
            icon: 'campaign'
          },
          {
            id: '5f425c44-5005-4ef4-96cd-ade4543ef49e',
            name: 'UFireRevisit',
            title: 'بازدید',
            icon: 'img:subMenu/bazdid.svg'
          }
        ]
      },
      {
        id: '0e668957-abc3-42d1-bb43-46ee1a486117',
        name: 'fireBaseInfo',
        title: 'اطلاعات پایه',
        icon: 'help',
        nodes: [
          {
            id: '3fbe1043-ee1c-4e80-85ea-a336dcd7f6bc',
            name: 'UFireArchive',
            title: 'آرشیو',
            icon: 'archive'
          },
          {
            // id: '2de28764-d1fb-45f3-a622-221be6304219',
            id: '052c8ddd-1e9a-46e8-9282-926d366171bd',
            name: 'UFireSetting',
            title: 'تنظیمات',
            icon: 'settings',
            width: '380px',
            height: '300px',
            popup: true
          },
          {
            // id: '1bf04b5c-8a20-4f11-949-449184a790e4',
            id: '01390a01-37dc-486c-9565-7d4523c4b285',
            name: 'UFireRevisitSetting',
            title: 'تنظیمات بازدید',
            icon: 'settings_applications',
            width: '600px',
            height: '500px',
            popup: true
          },
          {
            // id: 'ceb03b2c-1967-443d-914d-9598371136d3',
            id: '3a548c05-402b-45df-8046-c4887a2c2307',
            name: 'UFireVisitingAgents',
            title: 'مامورین بازدید',
            icon: 'groups',
            width: '700px',
            height: '500px',
            popup: true
          },
          {
            // id: '9d6d4848-75ee-455f-80fd-cb2ca5866bd0',
            id: 'c43ac2f0-f589-48e8-b03b-78edd6f46bae',
            name: 'UFirePaymentSettings',
            title: 'تنظیمات پرداخت',
            icon: 'tune',
            width: '700px',
            height: '500px',
            popup: true
          }
        ]
      }
      // {
      //   id: '55eb6a37-206b-48c5-bf65-a7351f6b8d0e',
      //   // id: '0e668957-abc3-42d1-bb43-46ee1a486117',
      //   name: 'fireBaseHelp',
      //   title: 'راهنمای آتش نشانی',
      //   icon: 'help_center',
      //   nodes: [
      //     {
      //       id: '8f7fcfbb-067e-495d-ae77-90e175c2ed79',
      //       // id: '3fbe1043-ee1c-4e80-85ea-a336dcd7f6bc',
      //       name: 'UFireHelp',
      //       title: 'راهنما',
      //       icon: 'help_center',
      //     },
      //   ],
      // },
    ]
  },
  {
    id: 'fd8bc45a-7f1f-4b89-9618-9529873d47cc', // بیمه
    name: 'insurance',
    title: 'بیمه',
    icon: 'img:sidebar/Insurance.svg',
    parent: {
      name: 'maininsurance',
      id: 'ae980dcf-08ef-4ff0-be47-30e18a8dcb6e',
      title: 'بیمه'
    },
    nodes: [
      {
        id: '9A0639DF-95E0-466E-8A84-5F7A925185DC',
        name: 'USendToInsurance',
        title: 'ارسال به بیمه',
        icon: 'send',
        width: '450px',
        height: '400px',
        popup: true,
        closable: false,
        minimizeButton: false,
        maximizeButton: false,
        resizable: false
      },
      {
        id: 'D0D275DC-7339-4019-9E90-596183712A9D',
        name: 'UInsuranceIncome',
        title: 'بیمه درآمد',
        icon: 'attach_money'
      },
      {
        id: 'E5FA61A9-025E-4550-BC0B-67235C35405A',
        name: 'UArchivingAndCancellation',
        title: 'بایگانی و ابطال',
        icon: 'archive'
      }
      // {
      //   id: "5e188330-fd05-4e37-99ed-96d59a5ea8d2",
      //   name: "UInsuranceSetting", // UInsuranceSetting
      //   title: "تنظیمات بیمه",
      //   icon: "settings"
      // }
    ]
  },
  {
    id: '1b6d2fe8-c6bc-46b1-954f-514651d4e482',
    name: 'convert',
    title: 'کانورت', // 'کانورت',
    icon: 'img:sidebar/Convert.svg',
    parent: {
      name: 'convert',
      id: '1887A97D-54FA-4B00-9C89-47127AC6FC99',
      title: 'کانورت'
    },
    nodes: [
      {
        id: 'bc735273-db82-4fa4-a13f-0f1702e73193',
        name: 'ChangeProcInitiator',
        title: 'تغییر کاربر ایجاد کننده درخواست',
        icon: 'social_distance'
      },
      {
        id: 'fed73fe3-aef4-4e39-87ba-aeb66c93ca7f',
        name: 'UChangeProcInitiatorGroup',
        title: 'تغییر گروهی کاربر ایجاد کننده درخواست',
        icon: 'connect_without_contact'
      },
      {
        id: 'ababbd42-3f37-4161-82a3-7e02cb7ed979',
        name: 'UGroupConvertKartable',
        title: 'کانورت گروهی کارتابل کاربر',
        icon: 'published_with_changes'
      },
      {
        id: '01e67a96-a2d4-4146-a904-0dc86f5afe55',
        name: 'UGroupConvertByJobLocation',
        title: 'تغییر گروهی کاربر ایجاد کننده درخواست براساس محل خدمت',
        icon: 'checklist'
      },
      {
        id: '7e1522d9-2890-47fb-b457-4d6ba600a161',
        name: 'UConvertList',
        title: 'لیست درخواست های کانورت',
        icon: 'attach_money'
      },
      {
        id: 'FC286361-0BF4-472E-BC49-37E7280280D6',
        name: 'UConvertHistory',
        title: 'تاریخچه کانورت',
        icon: 'history'
      },
      {
        id: '8f143551-8a17-45f6-853f-8e6af87f352e',
        name: 'UConvertArchive',
        title: 'آرشیو',
        icon: 'archive'
      }
    ]
  },
  {
    id: 'bea0de7d-9883-48e2-8a7b-9a30d8525255',
    name: 'estate',
    title: 'املاک و مستغلات',
    icon: 'img:sidebar/Estate.svg',
    // parent: {
    //   name: 'estate',
    //   id: 'bea0de7d-9883-48e2-8a7b-9a30d8525255',
    //   title: 'املاک و مستغلات'
    // },
    help: 'estate/help.pdf',
    nodes: [
      {
        id: '0E253395-B00E-40D3-8148-AE91C12A22EC',
        name: 'File',
        title: 'پرونده',
        icon: 'feed',
        nodes: [
          {
            id: 'DE7014AD-A72A-49A1-862F-1712DD44C166',
            name: 'USubmitRequest',
            title: 'ثبت درخواست ',
            icon: 'touch_app'
          },
          {
            id: 'A3FF3C0E-76AD-4FB3-9966-125728C34828',
            name: 'URequestSara8',
            title: 'ثبت درخواست در شهرسازی',
            icon: 'touch_app'
          },
          {
            id: 'C7AB9DF7-C62B-414E-9D66-5555722FD9D6',
            name: 'UEditRequest8',
            title: 'ویرایش درخواست در شهرسازی',
            icon: 'border_color'
          },
          {
            id: '3BD8A938-C6EA-4BD2-BADF-D4FD32E84C7C',
            name: 'UFileList',
            title: 'اطلاعات پرونده',
            icon: 'source'
            // popup: true,
            // width: 1300,
            // height: 750
          },
          {
            id: '0FCA7E42-F621-4819-9B1C-05981CE80EF2',
            name: 'UFileListHistory',
            title: 'سوابق اطلاعات ',
            icon: 'touch_app'
            // public: true
          },
          {
            id: '610E0A38-A01C-438A-B89D-5C51496C97B3',
            name: 'UArchiveEstate',
            title: 'آرشیو',
            icon: 'touch_app'
          },
          {
            id: 'F5C7ADBE-033D-4436-872F-B91D0B4AC832',
            name: 'ULegal',
            title: 'مشخصات حقوقی',
            icon: 'touch_app'
          },
          {
            id: 'D9E8F6D8-FE40-4058-96BB-B38EF712DE22',
            name: 'UOwned',
            title: 'اطلاعات تملک',
            icon: 'touch_app'
          },
          {
            id: '654014EF-FE54-4FB0-B176-957DFE474C86',
            name: 'UDickerDebitInfo',
            title: 'اطلاعات املاک حاصل از تهاتر با بدهی مودیان',
            icon: 'touch_app'
          },
          {
            id: 'D2DAEBB6-3594-4BF9-BFFF-893C4C545273',
            name: 'USaleRemainInfo',
            title: 'اطلاعات فروش املاک باقی مانده به پلاک مجاور',
            icon: 'touch_app'
          },
          {
            id: '2037A570-A3AC-48EE-848A-613DDED25C88',
            name: 'UDocInfo',
            title: 'اطلاعات املاک و اسناد',
            icon: 'touch_app'
          },
          {
            id: '038A6D80-1DB8-4C3E-B325-613D1DD3F61D',
            name: 'USearchDocInfo',
            title: 'جستجوی اطلاعات املاک و اسناد',
            icon: 'touch_app'
          },
          {
            id: 'F039AB58-97F9-40E4-80B9-2BE73A1612BF',
            name: 'UDebitCreditList',
            title: 'بدهکاری/بستانکاری',
            icon: 'touch_app'
          },
          {
            id: 'B19C9D2E-D032-4ABB-8461-FC067277A8BA',
            name: 'UContractBuyList3',
            title: 'تایید واگذاری',
            icon: 'touch_app'
          },
          {
            id: '582E5E26-C072-480D-9AB2-55C1B3E3F7DA',
            name: 'UChangeCode',
            title: 'تغییر کد نوسازی',
            icon: 'change_circle',
            width: '435px',
            height: '190px',
            popup: true
          },
          {
            id: '7C54B279-B853-4E23-8158-03448FFC1B75',
            name: 'UCreateClasse',
            title: 'ایجاد کلاسه بایگانی',
            icon: 'touch_app',
            width: '500px',
            height: '300px',
            popup: true
          },
          {
            id: 'E81F0800-0844-4E7B-BABC-C210CC6D6607',
            name: 'USessionList',
            title: 'جلسات',
            icon: 'touch_app'
          },
          {
            id: '9B185030-0C56-4368-9F69-C41512147385',
            name: 'UManagementConfirm',
            title: 'تایید مدیران',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: 'D28A3613-7AC8-4676-9AFD-16F3B9D72757',
        name: 'Revisit',
        title: 'بازدید',
        icon: 'feed',
        nodes: [
          {
            id: 'C0BA5186-281F-4F14-9F00-260F35F2B45D',
            name: 'URevisitAgent',
            title: 'مامورین بازدید',
            icon: 'touch_app'
          },
          {
            id: '74C572DF-8C4B-4E7F-8D2D-F4FE2EFFEB0E',
            name: 'UAgentsCalender',
            title: 'تقویم مامورین بازدید',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: 'BEA0DE7D-9883-48E2-8A7B-9A30D8525259',
        name: 'PlanProject',
        title: 'طرح و پروژه',
        icon: 'feed',
        nodes: [
          {
            id: '6A37C8DA-A5FB-4020-885C-39634EFBEF1C',
            name: 'UInsertBudgetRows',
            title: 'وارد کردن ردیف بودجه',
            icon: 'touch_app',
            popup: true,
            width: '400px',
            height: '600px'
          },
          {
            id: 'FED4FA31-911E-49CB-9AE2-C66D89BCB628',
            name: 'UBudget',
            title: 'اطلاعات بودجه',
            icon: 'touch_app'
          },
          {
            id: '9FBE8528-0ACF-40F4-8756-091575EBCBB4',
            name: 'USupplySourcesList',
            title: 'منابع تامین',
            icon: 'touch_app'
          },
          {
            id: 'A2551A1D-DE87-4D1B-B854-A31A57960240',
            name: 'UPlansprojectsProposal',
            title: 'طرح و پروژه-پیشنهادی',
            icon: 'touch_app'
          },
          // {
          //   id: "90A963DC-1256-4DDC-9325-D2BF0D81A08C",
          //   name: "UPlansprojects",
          //   title: "طرح و پروژه-مصوب",
          //   icon: 'touch_app'
          // },
          {
            id: '2B3337F6-B4E7-4291-B774-9BBB942C239C',
            name: 'UPlansprojects2',
            title: 'طرح و پروژه-مصوب',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: 'F1987C80-EE67-4E6C-BAD3-CEFFAD67FB29',
        name: 'Contracts',
        title: 'قراردادها',
        icon: 'feed',
        nodes: [
          {
            id: '53A1BEC4-CD02-4BD6-8CAD-A4315D11E720',
            name: 'UContractBuyList',
            title: 'صلح نامه خرید',
            icon: 'touch_app'
          },
          {
            id: '06449850-B222-4261-A7DD-B78C6F55F33E',
            name: 'UContractSaleList',
            title: 'صلح نامه فروش',
            icon: 'touch_app'
          },
          {
            id: 'BE1B12B1-5612-4ED7-8D09-797C860BC2A9',
            name: 'UContractRentList',
            title: 'قرارداد اجاره استیجاره',
            icon: 'touch_app'
          },
          {
            id: '4CC121A7-24EE-47B1-BA62-F9B32DEFDD3D',
            name: 'UTransferMainList',
            title: 'تحویل',
            icon: 'touch_app'
          },
          {
            id: '52889A1C-052F-47C0-AE28-0E1C7C46CCF7',
            name: 'UTransferDocList',
            title: 'انتقال سند',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: 'D3CE510A-B94D-489A-B906-9930DF8E6CA8',
        name: 'BlackList',
        title: 'لیست سیاه',
        icon: 'feed',
        nodes: [
          {
            id: '36C4810C-70F6-4929-9029-A3D2B8C8FCC1',
            name: 'UBlackListRealEstate',
            title: 'لیست سیاه',
            icon: 'touch_app'
          },
          {
            id: '30A1A7A5-D5A5-40B3-9202-986EA4E463FF',
            name: 'SendToBlackListEstate',
            title: 'ارسال به لیست سیاه',
            icon: 'feed'
          }
        ]
      },
      {
        id: '1734FFC2-485C-4657-B104-FBF767557F76',
        name: 'Archive',
        title: 'بایگانی',
        icon: 'feed',
        nodes: [
          {
            id: 'FB0FCB7D-4F98-4F9F-96FA-551F5F0A7546',
            name: 'UFinalArchive',
            title: 'بایگانی موقت پرونده',
            icon: 'touch_app',
            popup: true,
            width: '600px',
            height: '300px'
          },
          {
            id: 'DE48E77B-C9F6-4DB5-A65F-A9CC57849FF8',
            name: 'UFinalArchive1',
            title: 'بایگانی دائم پرونده',
            icon: 'touch_app',
            popup: true,
            width: '600px',
            height: '300px'
          },
          {
            id: '7FAAA676-5406-4F3C-8D29-9F19EE6ACBA4',
            name: 'UFinalArchive2',
            title: 'عودت پرونده به شهرسازی',
            icon: 'touch_app',
            popup: true,
            width: '600px',
            height: '300px'
          },
          {
            id: '15379A00-A473-4177-8FA3-1FEBFC8A63E9',
            name: 'UShowRelapse',
            title: 'تاریخچه عودت',
            icon: 'touch_app'
          },
          {
            id: 'CAE85D25-589C-40F4-AE54-F8D785D80230',
            name: 'UHouseCollapseHistory',
            title: 'تاریخچه تجمیع',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: '19E6CF16-0A77-4D2C-B527-4685C202784F',
        name: 'BaseInfo',
        title: 'اطلاعات پایه',
        icon: 'feed',
        nodes: [
          {
            id: '9E170E98-30A5-4DE6-81FF-B6C6276308FF',
            name: 'ULetterList',
            title: 'مکاتبات',
            icon: 'touch_app'
          },
          {
            id: 'E253A1B6-5739-4445-80E9-488F9385BC9B',
            name: 'UInsertEvaluationTechnicianName',
            title: 'وارد کردن اطلاعات کارشناس',
            icon: 'touch_app',
            popup: true,
            width: '600px',
            height: '700px'
          },
          {
            id: '8011A5B7-2263-45D5-B632-A9FB12FC2422',
            name: 'UFiscalYear',
            title: 'سال مالی',
            icon: 'touch_app'
          },
          {
            id: 'E00B18A7-6682-4456-A8C4-4554A466D6BB',
            name: 'USettingEstate',
            title: 'تنظیمات',
            icon: 'touch_app',
            width: '400px',
            height: '300px',
            popup: true
          }
          // {
          //   id: '26095E6D-C582-4B17-A62D-22D5A4E282C1',
          //   name: 'UEstateHelp',
          //   title: 'راهنما',
          //   icon: 'touch_app'
          // }
          // {
          //   id: "93608474-E007-456D-B4C6-9F8BECB9F010",
          //   name: "USMS",
          //   title: "ارسال پیامک"
          // }
        ]
      },
      {
        id: 'A4A3EA63-9E66-4622-9E11-F1F199A77226',
        name: 'Reports',
        title: 'گزارشات',
        icon: 'feed',
        nodes: [
          {
            id: '5E8BE857-A8EB-4585-B84C-5AA6613CDE7B',
            name: 'UAnalyticReport',
            title: 'گزارشات تحلیلی',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: '8EA67A6F-FDD3-4A24-84E2-3BDD89A33FB9',
        name: 'search',
        title: 'جستجو',
        icon: 'feed',
        nodes: [
          {
            id: '90FBACB6-61FD-4F5E-BFA7-B744FD91D608',
            name: 'URequests_Archive',
            title: 'کارتابل بایگانی املاک و مستغلات',
            icon: 'touch_app'
          },
          {
            id: 'DBA9C835-BCF2-4BBC-8AC9-6D1CE689E033',
            name: 'UKartableEstate',
            title: 'کارتابل پاسخگو املاک و مستغلات',
            icon: 'touch_app'
          },
          {
            id: 'D61D1C12-A55B-42F4-8513-4DDB2669390A',
            name: 'USearchEstate',
            title: 'جستجو املاک و مستغلات',
            icon: 'touch_app'
          }
        ]
      }

    ]
  },

  {
    id: '375C0F92-A167-4AA4-BFD4-FD32D9A93902',
    name: 'Excavation',
    title: 'سیستم صدور مجوزهای حفاری',
    icon: 'img:sidebar/Dig.svg',
    // parent: {
    //   name: 'Excavation',
    //   id: '375C0F92-A167-4AA4-BFD4-FD32D9A93902',
    //   title: 'سیستم صدور مجوزهای حفاری'
    // },
    help: 'dig/help.pdf',
    nodes: [
      // {
      //   id: 'a3a9bc59-150f-4a62-b6a3-a17342a963e9',
      //   name: 'URequestEventsExportLicense',
      //   title: 'صدور مجوز حفاری اتفاقات',
      //   icon: 'folder_shared'
      // },
      {
        id: '92404D00-D287-4A09-9596-29FCC9BC1DB3',
        name: 'UExcavationRequest',
        title: 'ثبت درخواست',
        icon: 'touch_app',
        nodes: [
          // -------------------- شروع فرم های گردش کار حفاری  ---------------------------
          // {
          //   id: "2B6F3277-36DB-47C2-AA6E-C45802C31458",
          //   name: "UAsphaltLabLevel1",
          //   title: "آزمایشگاه آسفالت مرحله یک",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "2B6F6677-36DB-47C2-AA6E-C49878C31458",
          //   name: "UAsphaltLabLevel2",
          //   title: "آزمایشگاه آسفالت مرحله دو",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "1FB50776-CACD-4A9C-9B6A-8CCE2E562528",
          //   name: "URequestServiceProjectRenewalInfo",
          //   title: "مشخصات تمديد پروژه طرح توسعه",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "67E8C2DA-49F3-42EA-8AF1-F989927FD8DD",
          //   name: "URequestProjectRenewalInfo",
          //   title: "مشخصات تمديد پروژه انشعاب شخصي",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "9A74D19A-47BC-4F04-987E-29C6AA348F64",
          //   title: "بررسی و بازدید انشعابات شخصی",
          //   name: "URequestVisit",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "0b678216-4665-4db5-a87d-6a7d77647dba",
          //   title: "ثبت درخواست تحویل موقت انشعابات",
          //   name: "URequestDelivery",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "9862000c-fad7-47ad-bdc6-5cf7bc25a12e",
          //   title: "ثبت درخواست تحویل موقت اتفاقات",
          //   name: "URequestEventsDelivery",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "38b783eb-6cdb-4814-a5d7-4e8ecb7029f1",
          //   title: "ثبت درخواست تحویل موقت طرح های توسعه",
          //   name: "URequestServiceDelivery",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "a03992fb-13f1-45d5-93d8-30eff0d4d981",
          //   name: "URequestLicense",
          //   title: "محاسبه و صدور فیش انشعابات شخصی",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "11d6a744-6433-4132-8e33-6ca5b92a6fb3",
          //   name: "URequestEventsLicense",
          //   title: "محاسبه و صدور فیش  اتفاقات",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "0cea3e3f-6194-4f5f-8004-a15031e55d16",
          //   name: "URequestServiceLicense",
          //   title: "محاسبه و صدور فیش  طرح های توسعه",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "04821744-ADB0-4274-8306-6D82B9B8D70B",
          //   name: "URequestServiceRenewalLicense",
          //   title: "صدور فیش تمدید طرح های توسعه",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "dde84faf-cbef-4a3d-a3cc-1b668a9c0da8",
          //   name: "UPosSetting",
          //   title: "تنظیمات پوز",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "d9386048-22b0-4110-89bf-0de94d892f1b",
          //   name: "URequestRevisitDelivery",
          //   title: "بازدید تحویل موقت انشعابات",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "db5788cd-0e64-400c-971c-549bbfd74594",
          //   name: "URequestEventsRevisitDelivery",
          //   title: "بازدید تحویل موقت اتفاقات",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "c3c511f6-79ce-4e84-adca-f4f0cecf169f",
          //   name: "URequestServiceRevisitDelivery",
          //   title: "بازدید تحویل موقت طرح های توسعه",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "dad0ddcf-b248-466e-a8f6-0501d883ba6a",
          //   name: "URequestEventsRunMonitoring", // "URequestEvents_RunMonitoring"
          //   title: "اجرا و نظارت اتفاقات",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "b5a18ddd-37cd-408c-8b6e-2dabf8ab55b8",
          //   title: "مشخصات پروژه اتفاقات",
          //   name: "UReviewEveRevisitRequestEvents",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   name: "UCancelRenewal",
          //   title: "ابطال تمدید",
          //   formKey: "208D9492-0706-465A-A23B-2454273DCFDD",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "9DA59093-1393-47B9-A9DC-4EDDCE003308",
          //   name: "URenewalRequestService",
          //   title: "تمدید طرح های توسعه",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "3090C460-8777-492D-92E9-574ED3DAC7CB",
          //   name: "URenewalRequest",
          //   title: "تمدید انشعابات شخصی",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // {
          //   id: "79F4261D-450D-4B35-9311-DFA53E699AEA",
          //   name: "ULicenseSafetyCommittee",
          //   title: "مجوز عملیات حفاری بدون طرح در کمیته ایمنی",
          //   icon: 'list_alt',
          //   public: true // این فرم مربوط به گردشکار است باید از ساید بار حذف شود
          // },
          // -------------------- پایان فرم های گردش کار حفاری  ---------------------------
          {
            id: '2a5a6224-9573-42d6-a2de-253196a447d7',
            name: 'URequest',
            title: 'ثبت درخواست انشعابات شخصی',
            icon: 'folder_shared'
          },
          {
            id: '98DAAEF7-0AEA-4693-96D2-77D4F787ACA2',
            name: 'URequestDevelopmentPlans',
            title: 'ثبت درخواست طرح های توسعه',
            icon: 'list_alt'
          },
          {
            id: '96960f1c-3e6c-489e-b135-27932fdd1c89',
            name: 'URequestEvents',
            title: 'ثبت درخواست اتفاقات',
            icon: 'credit_score'
          },
          {
            id: 'A9B628D7-7E37-4CDA-B9ED-5D96F44BF194',
            name: 'UInquiry',
            title: 'استعلام',
            icon: 'credit_score'
          },
          {
            id: '16B31A86-B5E4-41E1-B122-32F591217B75',
            name: 'UExportRenewalReport',
            title: 'درخواست تمدید یا تحویل طرح توسعه',
            icon: 'credit_score'
          },
          {
            id: '1634eb97-b858-4d7d-8143-4f9f74acdb86',
            name: 'UExportRenewalReportRequest',
            title: 'درخواست تمدید یا تحویل انشعابات',
            icon: 'credit_score'
          },
          {
            id: 'f93fb51e-6f97-4be9-b5ce-fc0604a2b778',
            name: 'UDigTemporaryArchive',
            title: 'بایگانی موقت',
            icon: 'credit_score'
          },
          {
            id: '6C68F555-2AA0-4F9B-B3AF-F8D8F5EC5C18',
            name: 'CancellationOfTheRequest',
            title: 'انصراف از درخواست تمدید یا تحویل',
            icon: 'credit_score',
            popup: true,
            width: '600px',
            height: '600px'
          },
          {
            id: 'dabddd77-53c7-4d0a-a699-1a81a8370989',
            name: 'CancelRequestin',
            title: 'ابطال درخواست مجوز',
            icon: 'credit_score',
            popup: true,
            width: '300px',
            height: '200px'
          }
          // طبق صحبت با آقای صالحی این فرم در هیچ شهری استفاده نمی شود
          // {
          //   id: 'A0D3F856-EB76-4B09-907F-609F41892BAA',
          //   name: 'RenewalExpiredQueries',
          //   title: 'تجدید استعلامات منقضی شده',
          //   icon: 'credit_score'
          // }
        ]
      },
      {
        id: '6c6efc84-a2b6-43fe-aeaf-6fd683c78245',
        name: 'UExcavationReports',
        title: 'گزارشات',
        icon: 'report',
        nodes: [
          {
            id: 'D798A39D-F3FD-4168-A34D-18BB966B408D',
            name: 'URequestAnalyticalReport',
            title: 'گزارش تحلیلی درخواست ها',
            icon: 'report'
          },
          {
            id: 'CA7269AC-2EA6-4A32-BCD9-947B4D0F810E',
            name: 'UExportLicenseReport',
            title: 'گزارش صدور مجوز',
            icon: 'report'
          },
          {
            id: 'AC6B5199-26A9-47DA-BFC7-3B1FAC36C4A8',
            name: 'UInquiryReport',
            title: 'گزارش استعلام',
            icon: 'report'
          },
          {
            id: '7723837B-74BF-4D1B-91ED-C097BC56B8CD',
            name: 'UInquiryRenewedReport',
            title: 'گزارش استعلام مجدد',
            icon: 'report'
          },
          {
            id: '1A92FF6C-EC36-49FA-B825-2DF912CA6E9E',
            name: 'UInActiveInquiry',
            title: 'تایید پاسخ استعلام',
            icon: 'report'
          },
          {
            id: '95aa6917-746c-41cf-86fa-d52a83665213',
            name: 'UExcavationIncomeFich',
            title: 'گزارش فیش درآمدی',
            icon: 'report'
          },
          {
            id: "79F4261D-450D-4B35-9311-DFA53E699AEA",
            name: 'ULicenseSafetyCommittee',
            title: "مجوز عملیات حفاری بدون طرح در کمیته ایمنی",
            icon: 'report'
            // public: true
          }
        ]
      },
      {
        id: 'D5E7C9FC-DD49-4E63-AAB1-CD58DEC9CFFA',
        name: 'Uview',
        title: 'نظارت',
        icon: 'rate_review',
        nodes: [
          {
            id: '376a35de-c026-4e17-8ae2-da4c355e7d53',
            name: 'URequestRunMonitoring',
            title: 'اجرا و نظارت انشعابات شخصی',
            icon: 'rate_review'
          },
          {
            id: '36F51981-EFDD-4309-8A9B-36C084C8D365',
            name: 'URequestService_RunMonitoring',
            title: 'اجرا و نظارت طرح های توسعه',
            icon: 'rate_review'
          },
          {
            id: '45668E4F-1E22-4358-82C7-5E5EADF78A9A',
            name: 'URunMonitoringKartabl',
            title: 'کارتابل نظارت',
            icon: 'list_alt'
          }
        ]
      },
      {
        id: '92404D00-D287-4A09-9596-29FCC9BC1DB8',
        name: 'UExcavationBaseInfo',
        title: 'اطلاعات پایه',
        icon: 'touch_app',
        nodes: [
          {
            id: 'F0A85890-2543-4421-BE92-8DA056A42AC3',
            name: 'UControlListDig',
            title: 'لیست کنترلی',
            icon: 'folder_shared'
          },
          {
            id: '798B7256-BE74-46EE-882E-EEA35C2B50BD',
            name: 'USearchInBlackList',
            title: 'جستجو در لیست کنترلی',
            icon: 'folder_shared'
          },
          {
            id: '5317529F-7798-4263-B480-2DA9BB436806',
            name: 'UBaseInfo',
            title: 'مدیریت اطلاعات پایه',
            icon: 'settings',
            popup: true,
            width: 900,
            height: 600
          },
          {
            id: 'A4911D38-EBC9-44AF-B2E1-11D891978BE5',
            name: 'USettingDig',
            title: 'تنظیمات حفاری',
            icon: 'settings',
            popup: true,
            width: "425px",
            height: "600px"
          },
          {
            id: 'EB9A5DE3-EAF5-4252-BF75-E6BC4D365085',
            name: 'UDigPosSettings',
            title: 'تنظیمات پوز',
            icon: 'settings',
            popup: true,
            width: 500,
            height: 400
          },
          {
            id: '7E0050EC-951A-43DB-A9E2-5E70746B1B6A',
            name: 'UserSetting',
            title: 'تنظیمات کاربر',
            icon: 'folder_shared',
            popup: true,
            width: "750px",
            height: "700px"
          },
          {
            id: '17108ea7-fd31-441e-83bd-04cc6a1239c0',
            name: 'UArchiveDig',
            title: 'آرشیو',
            icon: 'folder_shared'
          },
          {
            id: '0FE5234E-1F44-49F9-954F-B66D3AEAFF59',
            name: 'USearchPanel',
            title: 'کارتابل پاسخگو',
            icon: 'folder_shared'
          }
        ]
      },
      {
        id: '92404D00-D287-4A09-9596-29FCC9BC1DB9',
        name: 'UExcavationReceipt',
        title: 'فیش',
        icon: 'touch_app',
        nodes: [
          {
            id: '6063A948-B6A5-4D6A-A970-724F631D246F',
            name: 'UFishConfirmationDig',
            title: 'تایید فیش',
            icon: 'account_balance_wallet',
            popup: true,
            width: '700px',
            height: '600px'
          },
          {
            id: 'AE967B6C-54A2-4964-9663-5B650BBAF9EC',
            name: 'UConfirmationServiDig',
            title: 'تأیید فیش از طریق وب سرویس',
            icon: 'folder_shared'
          },
          {
            id: '7dd6f384-3189-4f78-83a4-aca3457b9b3c',
            name: 'UConfirmFishFromBankFile',
            title: 'تأیید فیش از فایل بانکی',
            icon: 'account_balance_wallet'
          },
          {
            id: '7195fa11-b0e9-42fe-8de5-fe005bc14a38',
            name: 'UAccountingDocNotSent',
            title: 'فیش های ارسال نشده به سیستم مالی',
            icon: 'account_balance_wallet'
          }
        ]
      },
      {
        id: '7C5B8BA6-7288-4618-BECF-8F97910C2B09',
        name: 'UDigFiles',
        title: 'مدیریت فایلهای نقشه حفاری',
        icon: 'create_new_folder',
        nodes: [
          {
            id: '9DCAD301-A253-469F-BFC2-5E3EE5A64DCB',
            name: 'UFilesDig',
            title: 'فایلهای نقشه حفاری',
            icon: 'create_new_folder'
          }
        ]
      }
      // {
      //   id: '99460A0D-DC9B-4282-ADCF-4A0B92128E9F',
      //   name: 'UDigHelp',
      //   title: 'راهنمای حفاری',
      //   icon: 'subscriptions',
      //   nodes: [
      //     {
      //       id: '32D8619D-8DD4-42F6-B47F-476127EAE231',
      //       name: 'UHelpDig',
      //       title: 'راهنما',
      //       icon: 'subscriptions'
      //     }
      //   ]
      // }
    ]
  },
  {
    id: '7eddcc78-5bf6-412a-8c2c-8b13cc51f975',
    name: 'SO',
    title: 'ممیزی',
    icon: 'img:sidebar/Audit.svg',
    nodes: [
      {
        id: '1327435F-8A37-441C-B8E1-B0B7849FFAC5',
        name: 'SO',
        title: 'ممیزی',
        icon: 'feed',
        nodes: [
          {
            id: '37EA1BC4-F5ED-4739-B6B1-E2B57C014E8E',
            name: 'USurveyAnalysis',
            title: 'آنالیز اطلاعات ملک',
            icon: 'touch_app'
          },
          {
            id: '37EA1BC4-F5ED-8739-B6B1-E2B57C014E8E',
            name: 'USearch',
            title: 'جستجو',
            icon: 'touch_app'
          },
          {
            id: '20D9C875-A02C-4897-B737-E613EC6D2FE6',
            name: 'USurveyors',
            title: 'ممیزان',
            icon: 'touch_app',
            popup: true,
            width: 920,
            height: 600
          },
          {
            id: 'A8023CE7-1CF9-4210-B73E-5CD47E86433F',
            name: 'UTabletSettings',
            title: 'تنظیمات دستگاه همراه',
            icon: 'touch_app',
            popup: true,
            width: '400px',
            height: '450px'
          },
          {
            id: '7B2A033E-7419-40B6-A5FC-1E4A5B233BFF',
            name: 'UFirstConfirmations',
            title: 'تاییدات اول',
            icon: 'touch_app'
          },
          {
            id: 'C7F245F5-A261-4158-8EFE-E4C3E114653C',
            name: 'USecondConfirmations',
            title: 'تاییدات دوم',
            icon: 'touch_app'
          },
          {
            id: 'DEDEC311-5742-4132-866A-3754F5BDB465',
            name: 'UAuditorReferences',
            title: 'ارجاعات ممیز',
            icon: 'touch_app'
          },
          {
            id: 'F6111442-C9AE-4E41-BAE5-22D273DAE0E4',
            name: 'URevisitAgains',
            title: 'بازدیدهای مجدد',
            icon: 'touch_app'
          },
          {
            id: 'F6111462-C9AE-4E41-BAE5-22D273DAE0E4',
            name: 'UComplainList',
            title: 'اعتراضات',
            icon: 'touch_app'
          }

          // {
          //   id: "90DE710F-2A78-4439-8287-008BB3170C50",
          //   name: 'UCheckInformation',
          //   title: " بررسی اطلاعات",
          //   icon: 'touch_app'
          // }
        ]
      }
    ]
  },
  {
    id: '3c1cad2c-bc81-4568-b146-501ed62ffa23',
    name: 'Garbage',
    title: 'عوارض پسماند',
    icon: 'img:sidebar/Audit.svg',
    help: 'garbage/help.pdf',
    nodes: [
      {
        id: 'dc7cfc5c-7bb9-4483-a8b9-97b3ad5be200',
        name: 'UGarbageMain',
        title: 'پسماند موردی',
        icon: 'touch_app'
      },
      {
        id: 'bbcf9392-e608-419a-a26a-538a3ee2d1d8',
        name: 'UGarbageConfirmFiche',
        title: 'تایید فیش',
        icon: 'credit_score',
        popup: true,
        width: '600px',
        height: '500px'
      },
      {
        id: 'ef9770d9-be30-484e-924b-c8dbb4687828',
        name: 'UTransferJobGarbageFiche',
        title: 'انتقال فیش پسماند',
        icon: 'touch_app',
        popup: true,
        width: '900px',
        height: '700px'
      },
      {
        id: '182a5237-7484-4934-8ef3-60d8a0d34407',
        name: 'UGarbageBankConfirmFiche',
        title: 'تایید فیش پسماند از فایل',
        icon: 'touch_app'
      },
      {
        id: '4e01f517-3240-4570-9fa3-7b6cf6485de0',
        name: 'UDutySetting',
        title: 'تنظیمات پسماند',
        icon: 'touch_app',
        width: '600px',
        height: '500px',
        popup: true
      }
      // {
      //   id: 'a15944e5-cd28-44d6-a090-261b248f26e0',
      //   name: 'UHelpGarbage',
      //   title: 'راهنما',
      //   icon: 'touch_app'
      // }
    ]
  },
  {
    id: 'c254f209-304e-41f0-a95a-174cf1279618',
    name: 'IncomePublic',
    title: 'درآمدهای عمومی',
    icon: 'img:sidebar/GeneralIncome.svg',
    // parent: {
    //   name: 'IncomePublic',
    //   id: 'c254f209-304e-41f0-a95a-174cf1279618',
    //   title: 'درآمدهای عمومی'
    // },
    nodes: [
      {
        id: '6EE476C1-1D23-4D42-9D9F-D3019D51C907',
        name: 'USaveRequest',
        title: 'ثبت درخواست',
        icon: 'folder_shared'
      },
      {
        id: '66D3C62B-9A1E-40D6-8D14-7E8B4F16A570',
        name: 'UGeneralIncomeFiches',
        title: 'صدور فیش',
        icon: 'list_alt'
      },
      // {
      //   id: "D14E4AC9-63DF-40AE-A9CD-34ACB575F028",
      //   name: "USearchGeneralIncomeFiches",
      //   title: "جستجوی فیش",
      //   icon: "travel_explore"
      // },
      {
        id: '1DB1D2A9-B53D-4F96-93FB-EB139BFB7F4D',
        name: 'UConfirmFiche',
        title: 'تایید فیش درآمدهای عمومی',
        icon: 'credit_score'
        // popup: true,
        // width: '800px',
        // height: '400px'
      },
      {
        id: 'BAC891AB-DD3F-4FF7-BDC3-03555460E715',
        name: 'UConfirmBankFile',
        title: 'تایید فایل بانکی',
        icon: 'credit_score'
      },
      {
        id: '2D78EBFF-1C64-4E34-B46D-7B72F5C5BE4D',
        name: 'UPublicIncomePosSettings',
        title: 'تنظیمات پوز',
        icon: 'settings',
        popup: true,
        width: 500,
        height: 400
      },
      {
        id: 'a5ed30b3-5e71-444e-b4fd-6e5fdf9356b1',
        name: 'UUsersPosSettings',
        title: 'تنظیمات پوز کاربران',
        icon: 'settings',
        popup: true,
        width: 500,
        height: 400
      }
    ]
  },
  {
    id: 'CBBFCDBE-0FF8-443F-BC81-780B5798A8A2', // 'پلیس ساختمان'
    name: 'BuildingPoliceMenu',
    title: 'پلیس ساختمان',
    icon: 'img:sidebar/Police.svg',
    parent: {
      name: 'BuildingPolice',
      id: '58819065-F293-4972-A718-E79C4E50D277', // appId
      title: 'پلیس ساختمان'
    },
    nodes: [
      {
        id: 'D1863CB5-9CAB-4509-A6DD-2F21627889EC',
        name: 'UBuildingPoliceWarning',
        title: 'ثبت اخطار',
        icon: 'folder_shared'
      },
      // {
      //   id: "d229abc7-815a-40bd-98f5-d039dd705519",
      //   name: 'UEntryOrder',
      //   title: 'دستور حکم ورود',
      //   icon: 'admin_panel_settings',
      //   public: true
      // },
      {
        id: 'ABF72D7B-49B4-41D5-99DD-BECC7472FF44',
        name: 'UBuildingPoliceRequest',
        title: 'ثبت درخواست',
        icon: 'folder_shared'
      },
      {
        id: 'D55B3CB0-6B33-4F9A-9772-C9A8698AECDC',
        name: 'UAllWarningList',
        title: 'لیست اخطارها',
        icon: 'folder_shared'
      },
      {
        id: 'C70FC253-832D-4E3B-BB36-490F6E3704AF',
        name: 'UBuildingPoliceAllSealed',
        title: 'ملک های پلمپ شده',
        icon: 'folder_shared'
      },
      {
        id: '0709EADC-7A27-4D9E-93FA-5DF3A78706D8',
        name: 'UBuildingPoliceRevisit',
        title: 'بازدید',
        icon: 'folder_shared'
      },
      {
        id: 'DA19CC67-4C0C-498D-BFC1-79C797450FC6',
        name: 'UBuildingPoliceReview', // UBuildingPoliceReview
        title: 'بازبینی پرونده',
        icon: 'folder_shared'
      },
      {
        id: 'EDACF330-76A2-43BD-9936-BC79A3AE0B24',
        name: 'UBuildingPoliceArchive',
        title: 'آرشیو',
        icon: 'folder_shared'
      },
      {
        id: 'DC78A6C9-7947-4182-94D0-6529D21B6665',
        name: 'UPolompNotComission',
        title: 'پلمپ های بدون کمیسیون',
        icon: 'folder_shared'
      },

      {
        id: '017B2960-56DA-44C4-9EDF-6CB08621CF87',
        name: 'UPhysicalProgress',
        title: 'پیشرفت فیزیکی',
        icon: 'folder_shared'
      },
      {
        id: 'D67810AA-4EB2-4B7E-A4DD-BAE1C4EC4316',
        name: 'UViolationFixList',
        title: 'لیست رفع تخلف',
        icon: 'folder_shared'
      },
      {
        id: 'DC78A6C9-7947-4182-1111-6529D21B6665',
        name: 'UBuildingPoliceHistory',
        title: 'تاریخچه اقدامات',
        icon: 'folder_shared'
      },
      {
        id: '5C1090F0-3964-44C6-B52E-F4109B88F918',
        name: 'UEntryPermission', // UWarrant
        title: 'لیست حکم ورود',
        icon: 'folder_shared'
      },
      {
        id: '392B0809-14A9-4A1C-8BA6-CD20C8F8FB4C',
        name: 'UOperationByCode',
        title: 'تاریخچه عملیات روی ملک',
        icon: 'folder_shared'
      },
      {
        id: '3C09AE8B-32F6-4B9E-AA95-3E78ECB2DD8A',
        name: 'UJudge',
        title: 'لیست قضات',
        icon: 'folder_shared'
      },
      {
        id: '725B7570-00C3-40CE-A5E1-1113A07106D1',
        name: 'ULegalInterface',
        title: 'رابط های حقوقی مناطق',
        icon: 'folder_shared'
      },
      {
        id: '27BAD9CE-1221-43E2-8F88-6A6091EE22B6',
        name: 'UControlList',
        title: 'لیست کنترلی',
        icon: 'folder_shared'
      },
      {
        id: 'B6005A1D-D75E-419B-8AA8-06C7A41E0EB8',
        name: 'USealedOperationNotOrder',
        title: 'درخواست های بدون ارجاع',
        icon: 'folder_shared'
      },
      // {
      //   id: 'B6005A1D-D75E-419B-8AA8-06C7A41E0EB8',
      //   name: 'UPermanentRemoveSealedOrder',
      //   title: 'دستور رفع پلمب دائم',
      //   icon: 'folder_shared',
      //   public: true
      // },
      {
        id: '1743F529-564C-45A6-BE22-F7C43B0E6026',
        name: 'RequestRemoveSealed',
        title: 'تقاضای رفع پلمپ',
        icon: 'folder_shared'
        // public:true
      }
      // {
      //   id: "d229abc7-815a-40bd-98f5-d039dd705519",
      //   name: "SealedOrder",
      //   title: "دستور پلمپ",
      //   icon: "folder_shared"
      //   // public: true
      // },
      // {
      //   id: "58e4c9b2-b2f6-4b5d-8bd4-1e4b434834ea",
      //   name: "UOrderOfEntry",
      //   title: "دستور حکم ورود",
      //   icon: "folder_shared",
      //   public: true
      // }
    ]
  },
  {
    id: '3AC2F99D-1EA6-4E5B-A8FD-7581627E903E', // 'دبیرخانه کمیسیون ماده 77'
    name: 'DabirkhaneCommission77',
    title: 'دبیرخانه کمیسیون ماده 77',
    icon: 'img:sidebar/Commision.svg',
    parent: {
      name: 'DabirkhaneCommission77',
      id: '1863ff32-46d4-412f-8175-6fd0cdc37797', // appId
      title: 'دبیرخانه کمیسیون ماده 77'
    },
    nodes: [
      {
        id: '9FDCF0D9-F918-42DF-B74A-390DC5D3580B',
        name: 'Parvande',
        title: 'پرونده',
        icon: 'source',
        nodes: [
          {
            id: '60F831A5-247C-4023-B592-B1BF702BB70A',
            name: 'UKartableCommission77',
            title: 'کارتابل کمیسیون77',
            icon: 'list_alt',
            popup: false,
            props: { padding: false }
          },
          {
            id: 'DCBD7679-13A1-42EE-B899-392CFC00EB70',
            name: 'URequestRenovationDuty',
            title: 'ثبت درخواست بدهی نوسازی',
            icon: 'touch_app'
          },
          {
            id: '4CAFB887-0EE2-4D8A-BD42-67DF08265C87',
            name: 'URequestJobDuty',
            title: 'ثبت درخواست بدهی صنفی',
            icon: 'source'
          },
          {
            id: 'EAA1D65F-4985-4D23-B25E-8C7FF36D9170',
            name: 'URequestGarbageDuty',
            title: 'ثبت درخواست بدهی پسماند',
            icon: 'touch_app'
          },
          {
            id: '99C759D0-B021-43FB-B431-08D0B98E929F',
            name: 'URequestIncome',
            title: 'ثبت درخواست درآمد',
            icon: 'touch_app'
          },
          {
            id: '8D6DDC13-30CF-43A1-A4E1-D66AA83FC7DC',
            name: 'USubmitComplaint',
            title: 'ثبت شکایت موعدی از شهرداری',
            icon: 'touch_app'
          },
          {
            id: '6A6DDC13-30CF-99A1-A4E1-D66AA83FC7FF',
            name: 'UDecision', // UIssueDecision
            title: 'صدور تصمیم',
            icon: 'touch_app'
          },
          {
            id: '414DB69F-5782-4758-BBED-48DB6555863D',
            name: 'UAlert',
            title: 'اخطاریه (پیش آگهی)',
            icon: 'touch_app'
          },
          {
            id: '2AF10414-CD37-48F5-8E09-E55021697D6D',
            name: 'UProclamation',
            title: 'ابلاغیه کمیسیون(دعوت به کمیسیون)',
            icon: 'touch_app'
          },
          {
            id: 'EE456B47-5C95-45D4-AC03-BEDEBC3F88D0',
            name: 'UExpert',
            title: 'کارشناسی',
            icon: 'touch_app'
          },
          {
            id: '9BC34F2B-F8CB-4336-A5E5-F8D40AF62D88',
            name: 'URandomCommission',
            title: 'کمیسیون بندی تصادفی',
            icon: 'touch_app'
          },
          {
            id: 'F9FB44E4-B43F-41AD-980B-99C95342584D',
            name: 'UCommissionVote',
            title: 'صدور رای',
            icon: 'how_to_vote'
          },
          // {
          //   id: '666AAC13-30CF-91A1-A4E1-D66AA83FC7DD',
          //   name: 'UPublicIncome',
          //   title: 'درامد های عمومی',
          //   icon: 'touch_app'
          // },
          {
            id: 'F3BB52F1-6428-488F-8729-6BAE7B9A8285',
            name: 'UDelivery',
            title: 'ثبت تحویل',
            icon: 'touch_app'
          },
          {
            id: 'FFB91FDD-EDA3-414D-9E02-BBBC43B8F5DF',
            name: 'UCommissionArchive77',
            title: 'آرشیو',
            icon: 'touch_app'
          },
          {
            id: '2C6A6CA4-528C-4DAE-BAF4-AD76225E0B1B',
            name: 'UArchiveSara',
            title: 'آرشیو شهرسازی',
            icon: 'touch_app'
          }
        ]
      },
      {
        id: '8B62C739-43BB-42DC-949F-D0BBAE09486D',
        name: 'Commission77BaseInfo',
        title: 'اطلاعات پایه',
        icon: 'help',
        nodes: [
          {
            id: '6A8A605F-53B2-4BF8-9E4F-BD8EB1511A40',
            name: 'USetting',
            title: 'تنظیمات',
            icon: 'settings',
            width: '380px',
            height: '300px',
            popup: true
          },
          {
            id: '1E7FA404-3A2C-4D80-910A-D32A6C8B6C00',
            name: 'UCapacityCommission',
            title: 'ظرفیت کمیسیون',
            icon: 'settings_applications',
            popup: true,
            width: '800px',
            height: '600px'
          },
          {
            id: '5E797731-9D80-4D6D-812E-CDBC7C0ADA16',
            name: 'UCancelRequest',
            title: 'ابطال درخواست',
            icon: 'groups',
            width: '600px',
            height: '400px',
            popup: true
          },
          {
            id: 'D1F20356-A39F-4CA0-8327-6FECBC5788E6',
            name: 'UBaygani',
            title: 'بایگانی درخواست',
            icon: 'archive',
            width: '600px',
            height: '400px',
            popup: true
          },
          {
            id: 'C95DAF7C-F927-4FA9-B3EF-AE29850813EA',
            name: 'URepresentative',
            title: 'اطلاعات نماینده ها',
            icon: 'tune',
            width: '900px',
            height: '500px',
            popup: true
          }
        ]
      },
      {
        id: '17EBBBDA-129E-4933-8FA4-0B12CB583B22',
        name: 'Commission77Reports',
        title: 'گزارشات',
        icon: 'report',
        nodes: [
          {
            id: '790FBC2A-45C7-4A98-BB69-C180299A0639',
            name: 'UChartRequest',
            title: 'گزارشات تحلیلی',
            icon: 'settings'
          },
          {
            id: 'FC8F11B1-E38F-41DA-BAA1-DD50E50CF94D',
            name: 'UReportCommissions',
            title: 'گزارش برگزاری کمیسیون',
            icon: 'settings_applications'
          }
        ]
      }
    ]
  },
  {
    id: '08e02bc8-9f87-4f78-a86e-6d1a8806438b', // 'دبیرخانه کمیسیون ماده 5'
    name: 'DabirkhaneCommission5',
    title: 'دبیرخانه کمیسیون ماده 5',
    icon: 'img:sidebar/Commision.svg',
    parent: {
      name: 'DabirkhaneCommission5',
      id: '2FB6680F-0B19-4779-B6F6-0FA47D7EF156', // appId
      title: 'دبیرخانه کمیسیون ماده 5'
    },
    nodes: [
      {
        id: '0821DC7F-8691-4BAC-8797-44BD8369B9A5', // گروه پرونده
        name: 'Parvande',
        title: 'پرونده',
        icon: 'source',
        nodes: [
          {
            id: '07064061-DCE6-4B91-B387-0CE006274DD6',
            name: 'URequestInfo',
            title: 'درخواست از کمیسیون ماده 5',
            icon: 'folder_shared'
            // popup: true,
            // width: "1000px",
            // height: "600px"
          },
          {
            id: '017981E1-C088-43D1-9318-C5B16146D11D',
            name: 'UExperte',
            title: 'کمیته کار',
            icon: 'exit_to_app'
          },
          {
            id: 'B60CF4D3-5DCF-4EB3-AFC7-1BBF96A8BFAE',
            name: 'UTheoryCommission',
            title: 'نظریه کمیسیون ماده 5',
            icon: 'folder_shared'
          },
          {
            id: '7762b0c2-97e2-4b76-9cac-af8feabeb7cd',
            name: 'UCommisionVote',
            title: 'رأی کمیسیون ماده 5',
            icon: 'touch_app'
          }
          // #region todo ↓
          // {
          //   id: '985B0354-1C96-43C8-A171-666F747162D8',
          //   name: 'UCommissionDraft',
          //   title: 'پیش نویس کمیسیون',
          //   icon: 'drive_file_rename_outline'
          // },
          // {
          //   id: 'DEA1EA1C-E171-401E-9F55-6961066B5119',
          //   name: 'UCommissionDetails',
          //   title: 'مشخصات کمیسیون',
          //   icon: 'quiz'
          // },
          // {
          //   id: 'F9AB888D-412D-4157-9D88-95772638054A',
          //   name: 'UArchive',
          //   title: 'آرشیو',
          //   icon: 'archive'
          // },
          // {
          //   id: '59D91D16-52B5-4842-B643-C19F48A67107',
          //   name: 'UArchiveSara',
          //   title: 'آرشیو شهرسازی',
          //   icon: 'touch_app'
          // },
          // #endregion todo ↑
        ]
      }
      // #region todo ↓
      // {
      //   id: "837BFF2E-3C07-4930-B5CB-457A8D76860B", // گروه بایگانی
      //   name: "Archive",
      //   title: "بایگانی",
      //   icon: "source",
      //   nodes: [
      //     {
      //       id: "77B1167E-CFBB-490C-A4B3-4BF9547A0A0C",
      //       name: "UFinalArchive",
      //       title: "بایگانی دائم پرونده",
      //       icon: "touch_app"
      //     }
      //   ]
      // }
      // #endregion todo ↑
    ]
  },
  {
    id: '86FCC7AA-E0DD-4A55-ADEB-DE7FCF8DDE62',
    name: 'StatisticReports',
    displayTitle: 'گزارشات آماری',
    title: 'منوی گزارشات آماری',
    icon: 'print'
  },
  /* {
    id: '86fcc7aa-e0dd-4a55-adeb-de7fcf8dde62',
    name: 'StatisticReport',
    title: 'گزارشات مدیریتی',
    icon: 'print',
    nodes: [
      {
        id: 'eca6c0b2-a793-436d-855b-ce688e449663', // آیدی که داخل سکوریتی قدیم تهران مشخص شده
        name: 'StatisticReports',
        title: 'گزارشات آماری',
        icon: 'print'
      }
    ]
  }, */
  {
    id: 'f335fdcd-d000-4877-9c5b-a28685bf2bba',
    name: 'MapDetails',
    title: 'اطلاعات نقشه',
    icon: 'travel_explore',
    popup: true,
    width: '1000px',
    height: '600px'
  }
  /* {
    id: 'f0bca6ac-addd-44bf-83c5-ac7f708f1d83',
    name: 'profile',
    title: 'پروفایل',
    icon: 'account_box',
    public: true
  },
  {
    id: 'c7b4cec6-f289-4d63-86bb-4597cb5e6c52',
    name: 'logout',
    title: 'خروج',
    icon: 'exit_to_app',
    public: true
  } */
]
