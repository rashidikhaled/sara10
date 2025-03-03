export default [
  {
    id: "cdbc43a3-8aa8-41bc-b2eb-9ba8cee71727",
    name: "kartable",
    title: "کارتابل",
    icon: "inbox",
    public: true
  },
  {
    id: "3C82C6CD-EAAA-4B0B-AF54-F5A02BC0D952",
    name: "shahrsazi",
    title: "منوی اصلی شهرسازی",
    displayTitle: "شهرسازی",
    icon: "img:sidebar/Shahrsazi.svg",
    parent: {
      name: "shahrsazi",
      id: "ACE63A06-E835-457D-A1EA-3B477DD9E69B", // appId
      title: "شهرسازی"
    },
    nodes: [
      {
        id: "0DF0411E-1060-420F-9D19-54DA774FE5F7",
        name: "UParvandehInfo",
        title: "تشکیل پرونده",
        icon: "img:subMenu/tashkil parvande.svg",
        help: "tashkil-parvande/help.pdf",
        nodes: [
          // Done
          {
            id: "363EF55E-C6D3-44EB-88C4-F4C2450CBB22",
            name: "UEblaghyeComision",
            title: "ابلاغیه کمیسیون",
            link: "/parvande/eblaghye-comision",
            icon: "payment"
          },
          {
            // Done
            id: "DA43FBC6-DC73-439A-851B-FDEB7D24E591",
            name: "UElameZabete",
            title: "اعلام ضابطه",
            link: "/eleme-zabete/UElameZabete",
            icon: "view_carousel"
          },
          {
            // Done
            id: "0DF43924-6063-4663-BD30-87167642F8D0",
            name: "UElameZabeteBasedOnRequest",
            title: "اعلام ضابطه بر اساس درخواست",
            link: "/eleme-zabete-based-on-request/UElameZabeteBasedOnRequest",
            icon: "horizontal_distribute"
          },
          {
            // Done
            id: "990504D7-CF02-4CC9-B20B-4FB6FC5C64D1",
            name: "OwnerShipInfo",
            title: "پیش فروش آپارتمان",
            link: "/ownership-info",
            icon: "equalizer"
          },
          {
            // Done
            id: "04AFBB57-661D-469C-9E35-39DFA2323C0B",
            name: "URefreshCodeTransfer",
            title: "انتقال کد نوسازی",
            link: "/parvandeh/refresh-code-transfer",
            icon: "library_books"
          },
          {
            // Done
            id: "1fe00ca0-22a8-4cf1-a0b2-bc31a51ae92f",
            name: "UBaroKafTabs",
            title: "بروکف",
            link: "/parvandeh/barokaf",
            icon: "tab_unselected"
          },
          {
            // No
            id: "05116a6f-1bba-4ff0-90ed-81c6b4cfc256",
            name: "UServey",
            title: "نقشه برداری",
            link: "/parvandeh/UServey",
            icon: "map"
          },
          // Done
          {
            id: "5f50fe08-92ca-4c35-99d2-d6524073aad2", // سکیوریتی
            // id: 'E1F121CC-9471-41F4-BC7F-839810A4D05C', // ارسالی بک اند
            name: "Payankar",
            title: "پایانکار",
            link: "/payankar",
            icon: "view_agenda"
          },
          {
            // id: 'E5B0D2CA-419E-4EA7-A648-69E2C84C172E', // ارسالی بک اند
            // id: 'BB3118CD-5DE1-4044-A4BD-4B67C1412570', // ارسالی بک اند
            id: "a2253dce-e1f4-41c6-a101-13d2672ce65f", // سکیوریتی
            name: "UAgreementTabs",
            title: "توافقنامه",
            link: "/shahrsazi/agreement",
            icon: "import_contacts"
          },
          // Done
          {
            id: "BEED56A7-6CB0-4C51-8950-12388CA99289",
            name: "UTaahodat",
            title: "تعهدات",
            icon: "rule"
          },
          // Done
          {
            id: "77D7602C-2C6B-4ED4-B49F-EF83F3098763",
            name: "ApprovalManager",
            title: "تأیید مدیران",
            link: "/approval-manager",
            icon: "visibility"
          },
          // Done
          {
            id: "DC6E1072-A04D-41b6-93C6-286CCCCA878F",
            name: "TafkikArse",
            title: "تفکیک عرصه",
            link: "/tafkik-arse",
            icon: "add_to_queue"
          },
          // Done
          {
            id: "13B624C3-FF27-4259-A27E-596D457B955B",
            name: "UChangeRefreshCode",
            title: "تغییر کد نوسازی",
            icon: "change_circle",
            link: "/parvandeh/change-refresh-code"
          },
          // Done
          {
            // id: '1aa63d2a-6d5f-4318-be15-a9eec7f679d3',
            id: "6DADCE90-A2D3-4F30-824D-0C0FBCAED318", // ارسالی بک اند و سکیوریتی
            name: "CommissionFine",
            title: "جریمه / لایحه کمیسیون",
            link: "/commission/commission-fine",
            icon: "folder_shared"
          },
          // Done
          {
            id: "614CA677-D9C8-4FEA-825B-5FD5C648D65A",
            name: "UConvertApartmentToArse",
            title: "تبدیل آپارتمان به عرصه",
            link: "/parvandeh/convert-apartment-to-arse",
            icon: "featured_video"
          },
          // Done
          {
            id: "7D7E6BCD-C26D-4C8F-9E3D-74336CD2B849",
            name: "UConvertArseToApartment",
            title: "تبدیل عرصه به آپارتمان",
            link: "/parvandeh/convert-arse-to-apartment",
            icon: "movie"
          },
          // Done
          {
            id: "12E7002B-45D9-4F93-B7BC-26A20941F596",
            name: "UConvertDeviceToBuilding",
            title: "تبدیل دستگاه به ساختمان",
            link: "/parvandeh/convert-device-to-building",
            icon: "branding_watermark"
          },
          // Done
          {
            id: "DB47D010-CD6D-4959-9075-54DBAF4C1F23",
            name: "UConvertBuildingToDevice",
            title: "تبدیل ساختمان به دستگاه",
            link: "/parvandeh/convert-building-to-device",
            icon: "call_to_action"
          },
          // Done
          {
            id: "35C784D3-CC88-47FA-A72C-187126284BE8",
            name: "UConvertArseToDevice",
            title: "تبدیل عرصه به دستگاه",
            link: "/parvandeh/convert-arse-to-device",
            icon: "featured_video"
          },
          // Done

          // Done
          {
            id: "A9F7F491-E1E1-44F6-AFCF-2E6F5032C03F",
            name: "UDiscountsTabs",
            title: "تخفیفات",
            link: "/parvandeh/discounts",
            icon: "repeat"
          },
          // Done
          {
            id: "b8b38685-e29d-48d4-8c4f-b0d13f22cad9", // سکیوریتی
            // id: '51908F45-6B57-4649-B7F1-5CAA2F852DA7', // ارسالی بک اند
            name: "UAnalysisMissFoul",
            title: "تحلیل تعیین خلاف ساختمان",
            link: "/analysis/miss-foul",
            icon: "contact_mail"
          },
          // Done
          {
            // id: 'f2423368-6206-45e0-b369-f2c83c41de49',
            id: "6A371FC7-570A-4F9C-A83E-EACA0685A826", // ارسالی بک اند
            name: "UAnalysisParvaneh",
            title: "تحلیل پروانه ساختمان",
            link: "/analysis/parvaneh",
            icon: "contacts"
          },
          // Done
          {
            id: "243B3099-F29E-4F8E-84EA-A5DCC79D2C94",
            name: "RequestSubmission",
            title: "ثبت درخواست جدید",
            link: "/request-submission",
            icon: "touch_app"
          },
          // Done
          {
            id: "C0CF3903-2FDD-4C0F-A4FE-B4ABEBCEFBE1",
            name: "RequestSubmissionPolice",
            title: "ثبت درخواست پلیس ساختمان",
            link: "/request-submission-police",
            icon: "view_quilt"
          },
          // Done
          {
            id: "9A84721F-6B52-42FC-8679-468E4AE120E8",
            name: "UMapCommandTabs",
            title: "دستور نقشه",
            link: "/parvandeh/map-command",
            icon: "work"
          },
          // Done
          {
            id: "216837DB-FA13-4265-B0DF-9255C4EB4833",
            name: "RevokedRequest",
            title: "درخواست های ابطال شده",
            link: "/revoked-request",
            icon: "visibility_off"
          },
          // Done
          {
            id: "dde2ddf5-ef90-47a3-b263-27b5c1f1e9e6", // سکیوریتی
            // id: 'DD381B19-DEF5-4957-BA5A-A6499828A90D', // ارسالی بک اند
            name: "UTechnicalId",
            title: "شناسنامه فنی",
            link: "/parvandeh/technical-id",
            icon: "view_module"
          },
          // Done
          {
            // id: '5f50fe08-92ca-4c35-99d2-d6524073aad2',
            id: "40683478-0A07-4C78-B4F3-DA2232DB5EFC",
            name: "TarheTafsili",
            title: "طرح تفصیلی",
            link: "/tarhe-tafsili",
            icon: "vertical_split"
          },
          // Done
          {
            id: "E824F8D6-D480-4481-A1A9-83B306D99A51",
            name: "Patterns",
            title: "طرح ها",
            link: "/patterns",
            icon: "featured_play_list"
          },
          {
            id: "52843101-650D-4956-A6AF-CDE1C9E425B9",
            name: "UJariWithMomayezi",
            title: "تطبیق کد نوسازی جاری با ممیزی",
            link: "/parvandeh/jari-with-momayezi",
            icon: "repeat_one"
          },
          // Done
          {
            id: "512303B2-394D-4981-8821-DB515C3588C8",
            name: "UCopyAuditToParvandeh",
            title: "کپی اطلاعات ممیزی به تشکیل پرونده",
            link: "/copy-audit-to-parvandeh",
            icon: "polymer"
          },
          // Done
          {
            id: "11B82007-5214-4087-BAEE-4D7A1B72D944",
            name: "UMapControlTabs",
            title: "کنترل نقشه",
            link: "/parvandeh/map-control",
            icon: "gps_fixed"
          },
          // Done
          {
            id: "D811D60B-B05D-4845-806A-CBB98931360E",
            name: "copyMapControl",
            title: "کپی کنترل نقشه و تشکیل پرونده",
            link: "/parvandeh/copy-map-control",
            icon: "queue_play_next"
          },
          // Done
          {
            id: "226CC47B-A0EA-468D-A0C0-5B8579C9FAD1",
            name: "UkomiteyeFanny",
            title: "کمیته فنی",
            link: "/parvande/komiteye-fanny",
            icon: "subtitles"
          },
          // Done
          {
            // id: '8a5bde21-9221-43f4-9d16-ace2a8e41c1f',
            id: "DCF56755-EC1F-452B-9A51-5B6A1103425A", // ارسالی بک اند
            name: "UMovafeghatOsooliListTabs",
            title: "لیست موافقت اصولی",
            link: "/shahrsazi/movafeghat-osooli-list",
            icon: "payment"
          },
          // Done
          {
            id: "0BD640BC-634F-4029-BD59-B8ED417394A0",
            name: "UTashkilParvandehAudit",
            title: "ممیزی",
            link: "/audit/info",
            icon: "folder_shared"
          },
          // Done
          {
            id: "1A7F6340-925F-47E5-AA52-4778A74918D6",
            name: "UBuildingDifferences",
            title: "مغایرت های ساختمان",
            link: "/parvandeh/building-differences",
            icon: "folder_shared"
          },
          // Done
          {
            id: "D65141C0-CC1B-4B81-81FA-624E11AA4EE3",
            name: "LettersByNosaziCode",
            title: "مکاتبات براساس کد نوسازی",
            link: "/letters/by-nosazi-code",
            icon: "connect_without_contact"
          },
          // Done
          {
            id: "6B462A88-8E97-4B06-A17C-95FA7E278669",
            name: "LettersBySelectedRequest",
            title: "مکاتبات",
            link: "/letters/by-selected-request",
            icon: "settings_remote"
          },
          // Done
          {
            // id: '4b18a2d1-77f2-4a82-ba91-d291f57347bc', // قبلی
            // id: 'BB3118CD-5DE1-4044-A4BD-4B67C1412570', // ارسالیه بک اند
            id: "E5B0D2CA-419E-4EA7-A648-69E2C84C172E", // ارسالیه بک اند
            name: "PrincipalAgreement",
            title: "موافقت اصولی",
            link: "/principal-agreement",
            icon: "view_column"
          },
          // Done
          {
            id: "d6cacb18-a9d8-4a83-b074-e36726ebf948", // سکیوریتی
            name: "Mafasa",
            title: "مفاصا",
            link: "/mafasa",
            icon: "view_headline"
          },
          // Done
          {
            id: "680AD665-6BA4-4AA4-98F5-DEDCDE4C6CAA",
            name: "ElevatorSpecification",
            title: "مشخصات آسانسورها",
            link: "/elevator-specification",
            icon: "games"
          },
          {
            // Cor
            // Done is complete
            id: "168A1519-A480-4032-B315-4AFBF9DD6C7B",
            name: "UExportLetters",
            title: "نامه های صادره",
            link: "/export-letters",
            icon: "folder_shared"
          },
          // Done
          {
            // id: '9243c1a2-8232-4077-962a-faeb241504c2',
            id: "016892EA-D565-490f-BCFA-E7773FD73F19", //  ارسالی بک اند
            name: "UHowToSeperateArse",
            title: "نحوه تفکیک عرصه",
            link: "/parvande/how-to-seperate-arse",
            icon: "payment"
          },
          // Done
          {
            id: "43DDD119-30B5-4DBB-98A2-6E564936B5A4",
            name: "EditRequestInfo",
            title: "ویرایش اطلاعات درخواست",
            link: "/edit-request-info",
            icon: "view_stream"
          },
          // Done
          {
            id: "a2c35b19-2e1a-420f-800d-fe8eeb067c95", // سکیوریتی
            // id: 'af2914bc-5de3-4de1-9093-8c2ab17aa547', // ارسالی بک اند
            name: "UPeace",
            title: "صلحنامه",
            link: "/peace/UPeace",
            icon: "gavel"
          },
          {
            id: "D5B9A620-1E7E-40A1-87E6-27EE400EE75A",
            name: "UCommitmentsCheckList",
            title: "چک لیست",
            link: "/check-list/UCommitmentsCheckList",
            icon: "checklist"
          },
          {
            id: "8AC09CF2-ED54-432E-B14A-B94023C3C8FB",
            name: "OfficeCheckList",
            title: "چک لیست ادارات",
            link: "/office-check-list/OfficeCheckList",
            icon: "credit_score"
          },
          {
            id: "49B4C031-EA83-459E-9C7C-BACF4AD71710",
            name: "UTechnicalstaff",
            title: "هیئت فنی",
            link: "/technical-staff/UTechnicalstaff",
            icon: "view_stream"
          },
          // Done
          {
            // id: '35dd3d88-3e56-4dba-a051-cb9fed97cc89',
            id: "02767BFF-82E0-4F5F-8CAC-41080F0E9E77", // ارسالی بک اند
            name: "UMoshakhasatCommission",
            title: "مشخصات کمیسیون",
            link: "/moshakhasat-commission/UMoshakhasatCommission",
            icon: "quiz"
          },
          // Done
          {
            // id: '9CD393C1-1DE8-4959-BCDF-96C99C21C013',
            id: "BAA66332-EA48-4C4B-BBD0-EF37867F7170", // ارسالی بک اند
            name: "CommissionDraft",
            title: "پیش نویس کمیسیون",
            link: "/commission/CommissionDraft",
            icon: "drive_file_rename_outline"
          },
          {
            id: "C62D919B-71AD-428A-B884-E24621AF124D",
            name: "UrbanViewPerspective",
            title: "نما و منظر شهری",
            // link: '/urbanView/UurbanView',
            icon: "apartment"
          },
          {
            id: "13164031-0AEB-4F16-A126-C13547DF9E96",
            name: "UurbanView",
            title: "نمای شهری",
            link: "/urbanView/UurbanView",
            icon: "apartment"
          },
          {
            id: "6268058E-50C4-4C43-8E05-DD5ECF308AC8",
            name: "UmozahematMosherfiat",
            title: "مزاحمت مشرفیت",
            link: "/mozahematMosherfiat/UmozahematMosherfiat",
            icon: "view_stream"
          },
          {
            id: "77C91D80-8F08-4EE5-AF31-E06FD9F823CA",
            name: "UAnalysisSide",
            title: "آنالیز جهات",
            link: "/analysis-sides/UAnalysisSide",
            icon: "open_with"
          },
          // Done
          {
            // id: 'd8155db8-b213-4a27-9737-e8e120e47c9f',
            id: "BD13C179-7B93-47EE-8D32-00567A99C6EF", // ارسالی بک اند
            name: "GreenSpace",
            title: "فضای سبز",
            icon: "water_drop",
            popup: true,
            width: "900px",
            height: "700px"
          },
          // Done
          {
            id: "ec9d9332-00d5-4f66-9810-93baee33405f", // سکیوریتی سرا10
            // id: 'C1C1E026-A9CC-4224-BF4F-A78ACFEF2625', // ارسالی بک اند
            name: "MokatebatGavahi",
            title: "مکاتبات گواهی",
            link: "/tashkil-parvandeh/MokatebatGavahi",
            icon: "history_edu"
          }
        ]
      },
      {
        id: "086257A6-9231-4d76-AEDF-E7B51734D93E",
        name: "RevisitMenu",
        title: "بازدید",
        icon: "img:subMenu/bazdid.svg",
        help: "revisit/help.pdf",
        nodes: [
          {
            id: "BA4EAC75-B621-4FCB-B673-39EEB7CAA4C2",
            name: "URevisitInfo",
            title: "اطلاعات بازدید",
            link: "/revisit/info",
            icon: "calendar_today",
            height: "640px",
            width: "1400px"
          },
          {
            id: "050A4F16-C6CC-41D0-BCED-61F895BDFDB1",
            name: "URevisitAgentAssign",
            title: "اعلام مامور بازدید",
            link: "/revisit-agents/assign",
            icon: "campaign"
          },
          {
            id: "D7C544DC-4C8C-4380-BEA7-5CFE3B59DCEC",
            name: "URevisitAgentVacations",
            title: "تعطیلی کارشناس بازدید",
            link: "/revisit-agents/vacations",
            icon: "event_busy"
          },
          {
            id: "508371CE-09CF-4F62-82B7-CB0BEB8ACF0D",
            name: "URevisitAgentCalendar",
            title: "تقویم مامور بازدید",
            link: "/revisit-agents/calendar",
            icon: "event_note"
          },
          {
            id: "17F4DC30-E76E-4E54-BE09-76FA25420F45",
            name: "URevisitTashkilParvandehDarkhast",
            title: "تشکیل پرونده درخواست",
            link: "/revisit/tashkil-parvandeh-darkhast",
            icon: "insert_drive_file"
          },
          {
            id: "1B4ED7D3-7952-42C7-A551-1DCC64CBCE82",
            name: "URevisitAgentReport",
            title: "گزارش مامورین بازدید",
            link: "/revisit-agents/report",
            icon: "report"
          },
          {
            id: "5551048C-1331-448F-A6A8-A00CF072425A",
            name: "URevisitAgents",
            title: "مامورین بازدید",
            link: "/revisit-agents",
            icon: "groups"
          }
        ]
      },
      {
        id: "7E4B1735-ECAB-4C53-92DC-43495F7FC6CF",
        name: "BlackList",
        title: "لیست سیاه",
        icon: "img:subMenu/blackList.svg",
        help: "black-list/help.pdf",
        nodes: [
          {
            id: "913DBD99-B9E5-44E1-9F5B-54CB21EAAF8F",
            name: "SendBlackListRequestsubmission",
            title: "ارسال به لیست سیاه ثبت درخواست",
            icon: "folder_shared"
          },
          {
            id: "AD4A254F-0211-424B-AC05-5C67AE50B172",
            name: "SendGroupToBalckList",
            title: "ارسال گروهی به لیست سیاه",
            link: "/black-list/SendGroupToBalckList",
            icon: "present_to_all"
          },
          {
            id: "D3094A31-E79B-4185-80E9-F83286236295",
            name: "SendToBlackList",
            title: "ارسال به لیست سیاه",
            link: "/black-list/SendToBlackList",
            icon: "block"
          },
          {
            id: "21872E3E-939D-4CBE-AC1E-9799C207EF78",
            name: "SendBlackListNationalCode",
            title: "ارسال به لیست سیاه با کد ملی",
            link: "/black-list/SendBlackListNationalCode",
            icon: "app_blocking",
            width: "900px",
            height: "600px"
          },
          {
            id: "5C94C341-61FC-4674-AF03-13C74E959E8D",
            name: "ExitBlackListNationalCode",
            title: "خروج از لیست سیاه با کد ملی",
            link: "/black-list/ExitBlackListNationalCode",
            icon: "low_priority"
          },

          {
            id: "C6997B57-7FEE-4A96-B624-F6F99DA93C03",
            name: "ExitBlackListRequestSubmission",
            title: "خروج از لیست سیاه ثبت درخواست",
            link: "/black-list/ExitBlackListRequestSubmission",
            icon: "lock_open"
          },
          {
            id: "947B7EAE-E271-425A-B22E-4B79B6973E98",
            name: "BlackList",
            title: "لیست سیاه",
            link: "/black-list/BlackList",
            icon: "img:subMenu/blackList.svg"
          },
          {
            id: "1A11DA42-2E80-470F-8CA0-16AA17E01A8A",
            name: "BlackListBasedOnNationalCode",
            title: "لیست سیاه بر اساس کد ملی",
            link: "/black-list/BlackListBasedOnNationalCode",
            icon: "phonelink_lock"
          }

        ]
      },
      {
        id: "5FD11FA1-547E-4560-AA59-E242910B69A5",
        name: "BlackList",
        title: "آرشیو و بایگانی",
        icon: "img:sidebar/Convert.svg",
        help: "archive/help.pdf",
        nodes: [
          {
            id: "D3FDFC63-724A-44D1-9832-0CD12E3B468D",
            name: "SendToTempArchive",
            title: "ارسال به بایگانی موقت",
            link: "/archive/send-temporary-archive",
            icon: "send",
            width: "600px",
            height: "500px",
            popup: true
          },
          {
            id: "2E132C1A-DF76-40BC-9DC9-D602D2688E24",
            name: "SendToTempArchiveShahrsazi",
            title: "ارسال به بایگانی موقت در شهرسازی",
            link: "/archive/send-tempArchive-shahrsazi",
            icon: "send_and_archive"
          },
          {
            id: "EEDCC4DB-6A5A-4B0A-ACC0-EEB29C89E48E",
            name: "PermanentArchive",
            title: "بایگانی دائم",
            link: "/archive/permanent-archive",
            icon: "unarchive"
          },
          {
            id: "D7126429-7FDF-4F37-BC0D-F28D0E2BC4DC",
            name: "ArchiveAndNosaziCodeRelationship",
            title: "ارتباط آرشیو و کدنوسازی",
            link: "/archive/Archive-NosaziCode-Relationship",
            icon: "account_tree"
          },
          {
            id: "83A54A11-105D-41C8-A519-081A51185E91",
            name: "TemporaryArchive",
            title: "بایگانی موقت",
            link: "/archive/temporary-archive",
            icon: "archive"
          },
          {
            id: "A9C0DE5E-23F4-4177-A612-EBF09B87A2EF",
            name: "ChangeSecNumber",
            title: "تغییر شماره دبیرخانه",
            link: "/archive/change-number",
            icon: "published_with_changes"
          },
          {
            id: "479ECD0F-F985-4A4A-897A-20EAB1392C88",
            name: "DocumentPhysicReq",
            title: "درخواست فیزیک پرونده",
            link: "/archive/document-request",
            icon: "folder_shared"
          },
          {
            id: "376666C7-F9C3-435F-A213-C5719E98040C",
            name: "ExitTempArchiveShahrsazi",
            title: "خروج از بایگانی موقت در شهرسازی",
            link: "/archive/exit-tempArchive-shahrsazi",
            icon: "exit_to_app"
          },
          {
            id: "1CFC989B-A1B9-4C38-993D-873BDE92F952",
            name: "LettersKartabl",
            title: "کارتابل نامه ها",
            link: "/archive/letter-kartabl",
            icon: "markunread_mailbox"
          },
          {
            id: "F0E401C4-C0E9-4863-BC90-048D66F8177B",
            name: "Letters",
            title: "نامه ها",
            link: "/archive/letters",
            icon: "markunread"
          },
          // Done
          {
            id: "7CD5F300-DE95-4003-B2CD-4726C2530629", // سکیوریتی
            // id: '23942F6A-47A1-4FCB-A45E-9D79806C9015', // ارسالی بک اند
            name: "ArchivElectronic",
            title: "آرشیو الکترونیک",
            link: "/archive/ArchivElectronic",
            icon: "class"
          }
        ]
      },
      {
        id: "077A08A4-E8AA-416B-9631-AA7CE9F4D7D1",
        name: "ResposibleForm",
        title: "تاریخچه و جستجو",
        icon: "img:subMenu/history.svg",
        help: "history-and-search/help.pdf",
        nodes: [
          {
            id: "D15D9730-8046-4F82-9E95-B5234AF67033",
            name: "UCodeHistory",
            title: "بازبینی پرونده",
            link: "/history-and-search/nosazi-code",
            icon: "rate_review"
          },
          // No
          {
            id: "A4E3D092-04ED-4A3E-9A41-047E14D75AA2",
            name: "UHistoryAndChangeNosaziCode",
            title: "تاریخچه و انتقال کد نوسازی",
            link: "/history-search/history-change-nosazi",
            icon: "youtube_searched_for"
          },
          {
            id: "320655BE-DFBA-4FF5-ABE0-B2F5F90550E3",
            name: "UNosaziCodeSearchMain",
            title: "جستجوی ملک",
            link: "/history-and-search/nosazi-code-search",
            icon: "travel_explore"
          },
          {
            id: "76536141-060D-40BF-9DC9-2D62D3B15B60",
            name: "UResponder",
            title: "فرم پاسخگو",
            link: "/responsible-form/ResposibleForm",
            icon: "feed",
            popup: false,
            mode: "half"
          },
          // Done
          {
            // id: '1409f415-bd4e-410a-868a-593a4ed45af5',
            id: "DB550DD7-B224-48A2-AAC9-86316914FD34", // ارسالی بک اند
            name: "UResponderRevisit",
            title: "فرم پاسخگو بازدید",
            link: "/responsible-form-revisit/UResponderRevisit",
            icon: "pageview",
            popup: false
          },
          // No
          {
            id: "521ca3d4-b60f-4af6-99fc-cdbfad8a2da8", //  سکیوریتی سرا10
            name: "UResponderNidAgentRevisit",
            title: "فرم پاسخگو بازدید براساس کدارجاع",
            link: "/responder-form-NidAgentRevisit/UResponderNidAgentRevisit",
            icon: "pageview",
            popup: false
          }
        ]
      },
      {
        id: "2E58E1A5-5B11-49D7-87EB-EA049EBA0B50",
        name: "engineer",
        title: "مهندسین ناظر",
        icon: "sync_alt",
        nodes: [
          {
            id: "7721D24C-FC87-4A8B-B03D-C0A7A66289EF",
            name: "UEngineers",
            title: "مهندسین ناظر",
            icon: "social_distance",
            popup: true,
            width: "1300px"
          }
        ]
      },

      {
        id: "82AC1B77-CC1E-452D-84A7-E8E96706A1C5",
        name: "SettingsMenu",
        title: "تنظیمات",
        icon: "settings",
        help: "settings/help.pdf",
        nodes: [
          {
            id: "61723D95-B80D-4066-BA2A-0406BD31CA78",
            name: "UPersonalSettingsTabs",
            title: "تنظیمات شخصی",
            link: "/settings/personal-settings",
            icon: "manage_accounts",
            popup: true,
            width: "600px",
            height: "400px"
          },
          {
            id: "43422777-FE8B-438D-94BF-88EB48815030",
            name: "UBuildingSettingsTabs",
            title: "تنظیمات شهرسازی",
            link: "/settings/building-city-settings",
            icon: "room_preferences",
            popup: true,
            width: "600px",
            height: "600px"
          },
          {
            id: "30F6B297-A5DB-4C44-841C-CCC627A4AE66",
            name: "USendSmsTabs",
            title: "ارسال پیامک",
            link: "/settings/send-sms-settings",
            icon: "send"
          },
          {
            id: "0952dfff-0714-447d-b66a-a36ed80cd4bd",
            name: "USendMessage",
            title: "ارسال پیامک بر اساس درخواست",
            icon: "message"
          },
          {
            id: "E8ACEEB9-6241-4951-A14B-C248BEF4DF87",
            name: "UWorkFlowSettings",
            title: "درخواست ها و گردش کارها",
            link: "/settings/workflow-settings",
            icon: "receipt_long"
          },
          // {
          //   id: '52D686D5-586A-401A-A1B1-BD18CC2A959B',
          //   name: 'USettingsHelp',
          //   title: 'راهنمای تنظیمات',
          //   link: '/settings/help',
          //   icon: 'help_center'
          // },
          {
            id: "CFE5B0CF-210C-40E7-853F-379F25422B54",
            name: "UBlockAreaStatus",
            title: "وضعیت املاک محدوده بلوک",
            link: "/settings/UBlockAreaStatus",
            icon: "maps_home_work"
          },
          {
            id: "30232d1f-5ce3-41eb-83d7-ed9187474763",
            name: "UNosaziMonitoring",
            title: "مانیتورینگ نوسازی",
            icon: "settings_remote"
            // popup: true,
            // width: '900px',
            // height: '600px'
          }
        ]
      },
      {
        id: "99ECFEC5-0577-4C66-9E5D-3185C076FB91",
        name: "CrossRequestMenu",
        title: "اداره کل توسعه شهری (شورای معابر)",
        icon: "maps_home_work",
        nodes: [
          {
            id: "8AA30169-FF4A-449D-B46D-B941BDECF445",
            name: "UCrossRequest",
            title: "ثبت درخواست اداره کل توسعه شهری",
            icon: "add_road"
          },
          {
            id: "35ABA874-225E-4DCB-A8E6-9761A562B1B2",
            name: "UEditCrossRequest",
            title: "ویرایش اطلاعات درخواست اداره کل توسعه شهری",
            icon: "edit_road"
          }
        ]
      },
      {
        // id: '3ac2f99d-1ea6-4e5b-a8fd-7581627e903e', // سکیوریتی
        id: "931B86AC-BE68-4B95-9312-BA2892AD5CAE", // زمل
        name: "Commission77",
        title: "کمیسیون ماده 77",
        icon: "folder_shared",
        nodes: [
          {
            id: "315e8676-33ec-4768-ac3a-99b9ef07b9d8",
            name: "SendBlackListCommission",
            title: "ارسال به لیست سیاه کمیسیون 77",
            link: "/commission77/send-blacklist-commission",
            icon: "block"
          },
          {
            id: "87917171-9369-4eda-8ba5-bf3ecd04c437",
            name: "ExitBlackListCommission",
            title: "خروج از لیست سیاه کمیسیون 77",
            link: "/commission77/exit-blacklist-commission",
            icon: "lock_open"
          }
        ]
      }
    ]
  },
  {
    id: "5159ec42-40b3-4a97-a3c4-653d3ba204ab",
    name: "nosazi",
    title: "نوسازی",
    icon: "img:sidebar/Nosazi.svg",
    type: "sidebar",
    // parent: {
    //   name: 'nosazi',
    //   id: '5159EC42-40B3-4A97-A3C4-653D3BA204AB',
    //   title: 'نوسازی'
    // },
    nodes: [
      {
        // id: 'dac74201-4ea8-4d18-9810-a1c9c17f0616',
        id: "389E9635-3E7B-4989-B74E-9D9BEE6645A2",
        name: "NosaziAvarez",
        title: "عوارض نوسازی",
        icon: "img:subMenu/avarez nosazi.svg",
        help: "avarez-nosazi/help.pdf",
        nodes: [
          {
            id: "55fb88f2-c736-4ff5-9f67-a7e337e8079e",
            name: "UNosaziDashboard",
            title: "داشبورد نوسازی",
            icon: "dashboard",
            link: "/nosazi/dashboard"
          },
          {
            id: "F7FD1FFE-E68D-4C6F-BEF5-67E39C7B6A6E",
            name: "UNosaziTransferFish",
            title: "انتقال فیش نوسازی",
            icon: "receipt",
            link: "/nosazi-avarez/nosazi-transform-fish"
          },
          {
            id: "D21DDD84-41B1-4E28-8D60-947594BE8A1A",
            name: "UNosaziConfirmationFish",
            title: "تایید فیش",
            icon: "credit_score",
            popup: true,
            width: "600px",
            height: "500px"
          },
          {
            id: "96506BAB-B1F1-4325-B162-8DA4A7A083A3",
            name: "UNosaziSettingsTabs",
            title: "تنظیمات نوسازی",
            icon: "settings_applications",
            link: "/nosazi-avarez/nosazi-settings",
            popup: true,
            width: "450px",
            height: "600px"
          },
          {
            id: "FEDB9130-A846-49AA-8358-A51D49AEC718",
            name: "UMoafyatDiscount",
            title: "تعریف معافیت-تخفیف",
            icon: "local_offer",
            link: "/nosazi-avarez/moafiyat-discount"
          },
          {
            id: "1F8BD89E-7E21-4411-BCF4-397E36C499F3",
            name: "UMoafiyatAvarezi",
            title: "معافیت عوارضی",
            icon: "toll",
            link: "/nosazi-avarez/moafiyat-avarezy"
          },
          {
            id: "D0ADC9CE-458C-4F94-A64A-6DA606E833D8",
            name: "DutyMain",
            title: "نوسازی موردی",
            icon: "domain",
            link: "/duty/DutyMain"
          }
        ]
      },
      {
        // id: '183fbbd6-0b85-4800-8f72-979b5ae91d54',
        id: "8396D1B9-BA0D-438B-9A9D-376F122D238A",
        name: "URegionPiceArrow",
        title: "قیمت و تنظیمات",
        icon: "attach_money",
        nodes: [
          {
            id: "B0F0F7DD-EFDD-4457-A0D6-AD4A35EC0DF8",
            name: "URegionPiceArrow",
            title: "قیمت منطقه ای بر اساس جهات",
            icon: "price_check",
            link: "/price-settings/region-price-arrow"
          },
          {
            id: "661AB666-3487-46E9-8206-DBC1E6DB1FE8",
            name: "UAggregatePriceArrow",
            title: "قیمت جمعی منطقه ای بر اساس جهات",
            icon: "payments",
            link: "/price-settings/aggregate-price-arrow"
          },
          {
            id: "589018F2-2A20-4B31-9288-2A8B63D0CD91",
            name: "URegionPiceNosazi",
            title: "قیمت منطقه ای بر اساس کد نوسازی",
            icon: "attach_money",
            link: "/price-settings/region-price-nosazi"
          },
          {
            id: "A2B5C43A-FA1C-42A1-8426-B68661592050",
            name: "UAggregatePriceNosazi",
            title: "قیمت جمعی منطقه ای بر اساس کد نوسازی",
            icon: "paid",
            link: "/price-settings/aggregate-price-nosazi"
          },
          {
            id: "47BDF1F3-1B0C-4895-9F9A-A1B5439B8F64",
            name: "UTaxPrice",
            title: "قیمت دارایی",
            icon: "account_balance",
            link: "/price-settings/tax-price"
          },
          {
            id: "19E56D6B-5399-45B8-BB01-8B7AED1EE46F",
            name: "UPricing",
            title: "قیمت گذاری",
            icon: "monetization_on",
            link: "/price-settings/pricing"
          },
          {
            id: "013CC4D5-46E5-4FA1-A3EA-07B46A0A8B18",
            name: "UUncorfirmationPriceNosazi",
            title: "قیمت منطقه ای تایید نشده بر اساس کد نوسازی",
            icon: "credit_card",
            link: "/price-settings/unconfirmation-price-nosazi"
          },
          {
            id: "45CA05B7-02FA-47D6-AB2B-820E7E76E7E2",
            name: "UPriceFromMapTabs",
            title: "قیمت منطقه ای از روی نقشه",
            icon: "local_atm",
            link: "/price-settings/price-from-map"
          }
        ]
      },
      {
        // id: '69d42259-777d-466e-bfe5-5d07e8e6295b',
        id: "CE966BBB-6A38-48E2-846F-369315704E21",
        name: "UMelkHistory",
        title: "سوابق",
        icon: "img:subMenu/savabegh.svg",
        nodes: [
          {
            id: "CFC1F487-F594-4547-9ED0-EF6FCAEE73C2",
            name: "UEffectDateHistoryTabs",
            title: "تاریخچه تاریخ اثر",
            icon: "manage_search",
            link: "/nosdazi-history/effect-date-history-tabs"
          },
          {
            id: "CF735D33-0D3B-4096-AFC5-8A74AC8CDCA3",
            name: "UMelkHistory",
            title: "سوابق ملک",
            icon: "history_edu",
            link: "/nosazi-history/melk-hsitory"
          },
          {
            id: "3916BA26-1E75-4372-8F49-17D4C3737AFB",
            name: "UBuildingHistory",
            title: "سوابق ساختمان",
            icon: "restore",
            link: "/nosazi-history/building-history"
          },
          {
            id: "41E7EB75-EF49-421E-A59B-C02789D737CB",
            name: "UapartmentHistory",
            title: "سوابق آپارتمان",
            icon: "youtube_searched_for",
            link: "/nosazi-history/apartment-history"
          },
          {
            id: "0489F96A-C321-4338-8AC8-A6A80E389AF0",
            name: "UJahateArbaeHistory",
            title: "سوابق جهات اربعه",
            icon: "history_toggle_off",
            link: "/nosazi-history/jahate-arbae-history"
          },
          {
            id: "21195CD6-AF71-41D3-AD7E-D2C22D0D685A",
            name: "UNosaziHistoryTabs",
            title: "سوابق",
            icon: "history",
            link: "/nosazi-history/nosazi-history"
          }
        ]
      }
    ]
  },
  {
    id: "d3aa02cd-dc84-40b4-a8ad-7b881dbb54c4", // درآمد
    name: "daramad",
    title: "منوی اصلی درآمد",
    displayTitle: "درآمد",
    icon: "img:sidebar/Daramad.svg",
    parent: {
      name: "income",
      id: "714C366C-1705-433D-970C-E04F6D62BD7D",
      title: "درآمد"
    },
    help: "income/help.pdf",
    nodes: [
      {
        id: "352686EB-6D7C-4357-8862-B8FFA0332CF5",
        name: "UIncomeDashboard",
        title: "درآمد",
        icon: "img:subMenu/Daramad.svg",
        nodes: [
          {
            id: "02F958EE-19CE-4A43-9B55-1E82D3C00799",
            name: "UIncomeKartabl",
            title: "کارتابل درآمد",
            icon: "update"
          },
          {
            // Do mistake
            id: "771F1C21-10EF-4085-8234-D53B7F940674",
            name: "UUpdateChecksStatus",
            title: "به روز رسانی وضعیت چک ها",
            icon: "update",
            link: "/income/update-checks-status"
          },
          {
            // Do mistake
            // id: '9d78e60c-b611-41fb-b92f-6bd33f437dd8',
            id: "7EC28E94-8FE3-4B83-A702-59F84C4DA755",
            name: "UDiscountDefaults",
            title: "پیش فرض تخفیفات",
            icon: "local_offer",
            link: "/income/discount-defaults"
          },

          {
            // Do mistake
            id: "87EAB856-73EF-4152-A583-F10577BED81E",
            name: "UConfirmationIncomeFish",
            title: "تائيد فيش",
            icon: "credit_score",
            link: "/income/confirmation-income-fish"
          },
          {
            // Do mistake
            // id: '7b0f3071-0f3d-4645-9b8c-ac118c1bd65b',
            id: "7F85B5CE-0107-47C9-AC07-58EF94DEE390",
            name: "UIncomeCalculatesSettings",
            title: "تنظیمات محاسبات درآمد",
            icon: "settings",
            link: "/income/income-calculates-settings",
            popup: true,
            width: 700,
            height: 600
          },
          {
            // Do mistake
            id: "4C168ADF-7B85-472E-BBE0-7811808360CB",
            name: "UPersonalSettings",
            title: "تنظیمات شخصی درآمد",
            icon: "manage_accounts",
            link: "/income/income-personal-settings",
            popup: true,
            width: 500,
            height: 400
          },
          {
            // Do mistake
            id: "F60898A5-8198-4DBD-B328-241BE3BC4403",
            name: "UIncomeInstallment",
            title: "تقسیط درآمد",
            icon: "attach_money",
            link: "/income/income-installment"
          },
          {
            // Do mistake
            id: "F7BB4943-2C95-4741-A61B-B53FD568541C",
            name: "UCheckSearch",
            title: "جستجوی چک",
            icon: "find_in_page",
            link: "/income/search-check"
          },
          {
            // Do mistake
            id: "0F388E18-4CF2-4DB7-B28F-BF8825D367DD",
            name: "UIncome",
            title: "درآمد",
            icon: "img:subMenu/Daramad.svg",
            link: "/income/income"
          },
          {
            // Do mistake
            id: "19C5A4D3-CA41-4D89-AD9D-C5BCE8BD4822",
            name: "UIncomeCalculatorTabs",
            title: "ماشین حساب درآمد",
            icon: "calculate",
            link: "/income/income-calculator"
          },
          {
            // Do mistake
            id: "c6933323-7629-4ac9-ad65-4aca3187ab0c",
            name: "RefundIncome",
            title: "برگشت از درآمد",
            icon: "calculate"
          }
        ]
      },
      {
        // Do mistake
        id: "CF189DA6-D20E-4ACA-B5BB-5611A27615CB",
        name: "UIncomeSendToBlackList",
        title: "لیست سیاه",
        icon: "img:subMenu/blackList.svg",
        nodes: [
          {
            // Do mistake
            id: "38284833-EDD8-4C43-AC7D-635863120380",
            name: "UIncomeSendToBlackList",
            title: "ارسال به لیست سیاه",
            icon: "block",
            link: "/income-black-list/UIncomeSendToBlackList"
          },
          {
            // Do mistake
            id: "975EAACA-8245-4AFA-9603-C5D2954E03C3",
            name: "UIncomeBlckList",
            title: "لیست سیاه",
            icon: "img:subMenu/blackList.svg",
            link: "/income-black-list/UIncomeBlckList"
          }
        ]
      }
    ]
  },
  {
    id: "4e4c0133-a224-4e34-ab34-a27a464e51dc",
    name: "senfi",
    title: "عوارض صنفی",
    icon: "img:sidebar/Avarezsenfi.svg",
    // parent: {
    //   name: 'senfi',
    //   id: 'B1C21C73-12B2-45FB-9252-682B47F48EE4',
    //   title: 'عوارض صنفی'
    // },
    help: "avareze-senfi/help.pdf",
    nodes: [
      {
        id: "8FEFA382-90F7-4F9A-89A3-25943F722CB4",
        name: "senfi-transform-fish",
        title: "انتقال فیش صنفی",
        icon: "receipt",
        link: "/avareze-senfi/senfi-transform-fish",
        width: "1100px",
        height: "700px"
      },
      {
        id: "34F008F0-C708-4CDC-B343-97A5065C2650",
        name: "UFishConfirmationSenfi",
        title: "تایید فیش",
        icon: "credit_score",
        link: "/avareze-senfi/fish-confirmation"
      },
      {
        id: "EF0BD93B-78C0-4FD5-B7A8-758182EE8F97",
        name: "USenfiSettingsTabs",
        title: "تنظیمات صنفی",
        icon: "room_preferences",
        width: "400px",
        height: "650px",
        popup: true
      },
      {
        id: "4C39D37B-42A1-4CD5-AF59-EF85F890E069",
        name: "USenfiMorediTabs", // USenfiMoredi
        title: "صنفی موردی",
        icon: "settings_applications",
        link: "/avareze-senfi/senfi-moredi"
      }
    ]
  },
  {
    id: "20c96248-c0c2-4da0-bb07-9480b0c95dce",
    name: "supervisorEng",
    title: "امور مهندسين ناظر",
    icon: "engineering",
    // parent: {
    //   name: 'supervisorEng',
    //   id: '20C96248-C0C2-4DA0-BB07-9480B0C95DCE',
    //   title: 'امور مهندسين ناظر'
    // },
    nodes: [
      {
        id: "C3354C46-5BEA-48B4-A355-EE757099D432", // سکیوریتی سرا10
        name: "EngineerKartable",
        title: "کارتابل پاسخگو",
        icon: "list_alt",
        public: false,
        popup: false,
        props: { padding: false }
      },
      {
        id: "60b20031-23f6-4872-b06b-4620e8bf9f99",
        name: "AcceptBuildingExeReport",
        title: "کارتابل گزارشات مرحله ای",
        icon: "list_alt",
        props: { padding: false }
      },
      {
        id: "92404D00-D287-4A09-9596-29FCC9BC9DB9",
        name: "Engineers",
        title: "مهندسین",
        icon: "engineering",
        nodes: [
          {
            id: "A38337AC-8E07-436E-846A-0EAB6F8F0E40",
            name: "EngineerInfo",
            title: "اطلاعات مهندس",
            icon: "person",
            width: "1000px",
            height: "700px"
          },
          {
            id: "C46B2166-C853-4AAE-A18F-20D92BE5B420",
            name: "EngineerInfoSystem",
            title: "اطلاعات مهندس - نظام مهندسی",
            icon: "language"
          },
          {
            id: "EBA216F1-BFA5-4095-A150-7D52A226B972",
            name: "KhodEzhar",
            title: "بررسی اطلاعات خود اظهار",
            icon: "camera_front",
            width: "1200px",
            height: "800px"
          }
        ]
      },
      {
        id: "1E2A1287-5951-49DC-9D97-54DB0D8E6323",
        name: "EngAffairs",
        title: "امور مهندسین",
        icon: "record_voice_over",
        nodes: [
          {
            id: "D65D4CB0-9D33-4F08-BCF0-9A9DA5C41D3B",
            name: "UDabirkhaneEngineer",
            title: "دبیرخانه مهندسین",
            icon: "group"
          }
        ]
      }
    ]
  },
  {
    id: "badbf938-ee27-414f-8df4-6fa440f8fa70",
    name: "commission",
    title: "دبیرخانه کمیسیون های ماده 100",
    icon: "img:sidebar/Commision.svg",
    help: "commission-100/help.pdf",
    nodes: [
      {
        id: "1DC491C8-26B9-45CA-9E56-D8E2DE6FA0BD",
        name: "UKartableCommission",
        title: "کارتابل کمیسیون",
        icon: "markunread_mailbox",
        public: false,
        popup: false,
        props: { padding: false }
      },

      {
        id: "F2C30863-551E-4FB0-924F-2DDFA86353B9",
        name: "UCommissionKartablePasokhgo",
        title: "کارتابل پاسخگو کمیسیون",
        icon: "list_alt",
        public: false,
        popup: false,
        props: { padding: false }
      }
    ]
  },

  {
    id: "f57023ab-297d-45e7-b10c-263b561038dd",
    name: "fireFighting",
    title: "آتش نشانی",
    icon: "img:sidebar/FireHydrant.svg",
    parent: {
      name: "fireFighting",
      id: "5fb05a4f-da31-4202-83d1-d7558d5e965a", // appId
      title: "آتش نشانی"
    },
    nodes: [
      {
        id: "cb798ad1-e798-4b84-b4e9-529e05db07d4",
        name: "DocInfo",
        title: "اطلاعات پرونده",
        icon: "source",
        nodes: [
          {
            id: "2d89cc27-14b5-43eb-8adb-3a04cc0f4746",
            name: "UFireRequestSubmission",
            title: "ثبت درخواست",
            icon: "touch_app"
          },
          {
            id: "ba56639d-a81f-4fa5-9b48-61326376e940",
            name: "UFireParvandehInfo",
            title: "اطلاعات پرونده",
            icon: "source"
          }
        ]
      }
    ]
  },
  {
    id: "3c1cad2c-bc81-4568-b146-501ed62ffa23",
    name: "Garbage",
    title: "عوارض پسماند",
    icon: "img:sidebar/Audit.svg",
    help: "garbage/help.pdf",
    nodes: [
      {
        id: "dc7cfc5c-7bb9-4483-a8b9-97b3ad5be200",
        name: "UGarbageMain",
        title: "پسماند موردی",
        icon: "touch_app"
      },
      {
        id: "bbcf9392-e608-419a-a26a-538a3ee2d1d8",
        name: "UGarbageConfirmFiche",
        title: "تایید فیش",
        icon: "credit_score",
        popup: true,
        width: "600px",
        height: "500px"
      },
      {
        id: "ef9770d9-be30-484e-924b-c8dbb4687828",
        name: "UTransferJobGarbageFiche",
        title: "انتقال فیش پسماند",
        icon: "touch_app",
        popup: true,
        width: "900px",
        height: "700px"
      },
      {
        id: "4e01f517-3240-4570-9fa3-7b6cf6485de0",
        name: "UDutySetting",
        title: "تنظیمات پسماند",
        icon: "touch_app",
        width: "600px",
        height: "500px",
        popup: true
      }
    ]
  },
  {
    id: "c254f209-304e-41f0-a95a-174cf1279618",
    name: "IncomePublic",
    title: "درآمدهای عمومی",
    icon: "img:sidebar/GeneralIncome.svg",
    // parent: {
    //   name: 'IncomePublic',
    //   id: 'c254f209-304e-41f0-a95a-174cf1279618',
    //   title: 'درآمدهای عمومی'
    // },
    nodes: [
      {
        id: "6EE476C1-1D23-4D42-9D9F-D3019D51C907",
        name: "USaveRequest",
        title: "ثبت درخواست",
        icon: "folder_shared"
      },
      {
        id: "66D3C62B-9A1E-40D6-8D14-7E8B4F16A570",
        name: "UGeneralIncomeFiches",
        title: "صدور فیش",
        icon: "list_alt"
      },
      {
        id: "1DB1D2A9-B53D-4F96-93FB-EB139BFB7F4D",
        name: "UConfirmFiche",
        title: "تایید فیش درآمدهای عمومی",
        icon: "credit_score"
        // popup: true,
        // width: '800px',
        // height: '400px'
      }
    ]
  },
  {
    id: "f335fdcd-d000-4877-9c5b-a28685bf2bba",
    name: "MapDetails",
    title: "اطلاعات نقشه",
    icon: "travel_explore",
    popup: true,
    width: "1000px",
    height: "600px"
  }
]
