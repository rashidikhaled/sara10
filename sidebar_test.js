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
    title: 'شهرسازی',
    icon: 'img:sidebar/Shahrsazi.svg',
    parent: {
      name: 'shahrsazi',
      id: 'ACE63A06-E835-457D-A1EA-3B477DD9E69B', // appId
      title: 'شهرسازی'
    },
    nodes: [
      {
        id: '92404D00-D287-4A09-9596-29FCC9BC9DB9',
        name: 'UParvandehInfo',
        title: 'تشکیل پرونده',
        icon: 'img:subMenu/tashkil parvande.svg',
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
            icon: 'campaign'
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
            id: 'D411A402-E398-4DA7-BDF0-8AC25F8BC373',
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
          {
            id: '52843101-650D-4956-A6AF-CDE1C9E425B9',
            name: 'UJariWithMomayezi',
            title: 'تطبیق کد جاری با ممیزی',
            link: '/parvandeh/jari-with-momayezi',
            icon: 'repeat_one'
          },
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
          {
            id: '1E0F7073-B4C6-4EB9-82CE-891D6EB4D3B1',
            name: 'UParvandeHelp',
            title: 'راهنمای تشکیل پرونده',
            link: '/parvande/parvande-help',
            icon: 'subscriptions'
          },
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
            link: '/tashkil-parvandeh/GreenSpace',
            icon: 'water_drop',
            width: '350px',
            height: '170px'
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
        ]
      },
      {
        id: '086257A6-9231-4d76-AEDF-E7B51734D93E',
        name: 'RevisitMenu',
        title: 'بازدید',
        icon: 'img:subMenu/bazdid.svg',
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
          {
            id: '803C16A6-71EA-4D76-8793-8E7CD5A216EB',
            name: 'URevisitHelp',
            title: 'راهنمای بازدید',
            link: '/revisit/revisit-help',
            icon: 'help'
          },
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
        id: '1C71BF2B-0D88-416F-B4F8-40CC27F1137A',
        name: '‌BlackList',
        title: 'لیست سیاه',
        icon: 'img:subMenu/blackList.svg',
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
          {
            id: 'B22458DA-E996-47CD-9B5E-68652A8A7DC0',
            name: 'UBlackListHelp',
            title: 'راهنمای لیست سیاه',
            link: '/black-list/black-list-help',
            icon: 'help_center'
          },
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
        icon: 'collections_bookmark',
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
          {
            id: '67F7A4E9-A2B2-4545-BFF8-37C4403B117F',
            name: 'ArchiveHelp',
            title: 'راهنمای آرشیو و بایگانی',
            link: '/archive/archive-help',
            icon: 'help_center'
          },
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
          // Done
          {
            // id: 'e5608c96-d9af-48a5-b832-710814cef24c',
            id: '993797F7-6DD8-41AC-BEB9-5B0F40652734', // ارسالی بک اند
            name: 'ArchiveTablet',
            title: 'آرشیو تبلت',
            link: '/archive/ArchiveTablet',
            icon: 'tablet'
          },
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
          {
            id: 'AD85356A-E66C-452C-B5DE-D76FE2CE7580',
            name: 'UHistoryAndSearchHelp',
            title: 'راهنمای تاریخچه و جستجو',
            link: '/history-and-search/help',
            icon: 'help_center'
          },
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
          // {
          //   id: 'B666B032-2C75-4FC6-9722-AB9E2C8255DA',
          //   name: 'ZabetehConfirmation',
          //   title: 'تغییرات ضابطه',
          //   link: '',
          //   icon: 'help_center'
          // },
          {
            id: 'F6B062F8-9D4D-4A57-A84A-E168D41B74EB',
            name: 'UNewCodeRequest',
            title: 'وضعیت درخواست کد جدید',
            link: '',
            icon: 'receipt_long'
          },
          {
            id: '092F0C23-85CC-4BF4-86EA-D3EDC94C3730',
            name: 'UNewCodeRequest',
            title: 'تغییر کد نوسازی ',
            link: '',
            icon: 'feed'
          },
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
        icon: 'sync_alt',
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
            id: 'E8ACEEB9-6241-4951-A14B-C248BEF4DF87',
            name: 'UWorkFlowSettings',
            title: 'درخواست ها و گردش کارها',
            link: '/settings/workflow-settings',
            icon: 'receipt_long'
          },
          {
            id: '52D686D5-586A-401A-A1B1-BD18CC2A959B',
            name: 'USettingsHelp',
            title: 'راهنمای تنظیمات',
            link: '/settings/help',
            icon: 'help_center'
          },
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
