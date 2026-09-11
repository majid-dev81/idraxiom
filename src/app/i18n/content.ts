// src/app/i18n/content.ts
// Bilingual (EN/AR) copy for the Idraxiom marketing site.

export type Lang = "en" | "ar";

export const content = {
  en: {
    common: {
      seeMore: "See More",
    },
    nav: {
      home: "Home",
      about: "About",
      technologies: "Technologies",
      services: "Services",
      armlink: "ArmLink",
      warehouse: "Warehouse",
      contact: "Contact",
    },
    hero: {
      headingLine1: "AI-Powered Solutions for",
      headingLine2: "Modern Businesses",
      subtitle:
        "At Idraxiom, we build practical, innovative AI solutions that help businesses grow.",
      cta: "Contact Us",
    },
    about: {
      title: "About Idraxiom Establishment",
      body: "Idraxiom Establishment is a Saudi-registered establishment specializing in Artificial Intelligence, Computer Vision, and SaaS solutions. We focus on delivering innovative and practical products that empower businesses to grow.",
    },
    technologies: {
      title: "Technologies We Master",
      items: [
        { name: "AI Vision", href: "/demo-vision" },
        { name: "People & Flow Analytics", href: "/demo-flow" },
        { name: "Queue & Service Monitoring", href: "/demo-queue" },
        { name: "Conversion Insights", href: "/demo-conversion" },
      ],
    },
    services: {
      title: "Our Services",
      items: [
        {
          title: "UI/UX Design",
          description:
            "Crafting intuitive and beautiful user interfaces that enhance user experience and engagement.",
          href: "/demo-uiux",
        },
        {
          title: "System Analysis",
          description:
            "Analyzing and defining system requirements to build robust and scalable software architecture.",
          href: "/demo-system",
        },
        {
          title: "AI Solutions (Lite)",
          description:
            "Integrating simplified AI models to automate tasks and deliver intelligent insights for your business.",
          href: "/demo-ai",
        },
        {
          title: "Big Data & Analytics (Lite)",
          description:
            "Processing and analyzing large datasets to uncover trends and drive data-informed decisions.",
          href: "/demo",
        },
      ],
    },
    armlink: {
      title: "ArmLink",
      subtitle: "For Military Sectors",
      capabilities: [
        {
          title: "Real-Time Inventory Tracking",
          description:
            "Continuous visibility into every weapon and asset in storage, down to individual rack and case level.",
        },
        {
          title: "Unauthorized Access Detection",
          description:
            "Instant alerts the moment a restricted armory, cabinet, or storage zone is accessed outside protocol.",
        },
        {
          title: "Audit-Ready Compliance Logs",
          description:
            "A complete, timestamped chain-of-custody record ready for internal review or regulatory audit.",
        },
      ],
      cta: "Request a Briefing",
    },
    warehouse: {
      badge: "Beyond Armories — Full Inventory Visibility",
      title: "Warehouse & Asset Management",
      subtitle:
        "The same ArmLink RFID engine extends beyond weapons security to give warehouses, retail floors, and asset-heavy operations real-time stock and asset visibility — from receiving to reconciliation.",
      capabilities: [
        {
          title: "Real-Time Stock Levels",
          description:
            "Live, location-accurate counts for every SKU and asset across shelves, racks, and zones — no manual counting.",
        },
        {
          title: "Inbound & Outbound Tracking",
          description:
            "Automatic logging of every item entering or leaving a warehouse, gate, or storage zone.",
        },
        {
          title: "Asset Lifecycle & Audit Trail",
          description:
            "A complete timestamped history of every asset — from intake to disposal — ready for internal or regulatory audit.",
        },
        {
          title: "Low-Stock & Reorder Alerts",
          description:
            "Automated notifications when stock drops below threshold, so replenishment never lags behind demand.",
        },
      ],
      cta: "Request a Demo",
    },
    contact: {
      title: "Get in Touch",
      intro:
        "Have a question or want to work together? Send us a message, and we'll get back to you as soon as possible.",
      officialName: "Official Business Name: Idraxiom Establishment",
      form: {
        name: "Name",
        email: "Email",
        message: "Message",
        submit: "Send Message",
        success: "✅ Your message has been sent successfully",
        error: "❌ Failed to send message, please try again later",
      },
    },
    footer: {
      rights: (year: number) => `© ${year} Idraxiom Establishment. All rights reserved.`,
    },
  },
  ar: {
    common: {
      seeMore: "المزيد",
    },
    nav: {
      home: "الرئيسية",
      about: "من نحن",
      technologies: "التقنيات",
      services: "خدماتنا",
      armlink: "ArmLink",
      warehouse: "المستودعات",
      contact: "تواصل معنا",
    },
    hero: {
      headingLine1: "حلول ذكاء اصطناعي",
      headingLine2: "للشركات الحديثة",
      subtitle:
        "في إدراكسيوم، نطوّر حلول ذكاء اصطناعي عملية ومبتكرة تساعد الشركات على النمو.",
      cta: "تواصل معنا",
    },
    about: {
      title: "عن مؤسسة إدراكسيوم",
      body: "مؤسسة إدراكسيوم مؤسسة سعودية مسجَّلة متخصصة في الذكاء الاصطناعي ورؤية الحاسوب وحلول البرمجيات كخدمة (SaaS). نركّز على تقديم منتجات مبتكرة وعملية تمكّن الشركات من النمو.",
    },
    technologies: {
      title: "التقنيات التي نتقنها",
      items: [
        { name: "الرؤية بالذكاء الاصطناعي", href: "/demo-vision" },
        { name: "تحليلات حركة الأشخاص", href: "/demo-flow" },
        { name: "مراقبة الطوابير والخدمة", href: "/demo-queue" },
        { name: "تحليلات معدلات التحويل", href: "/demo-conversion" },
      ],
    },
    services: {
      title: "خدماتنا",
      items: [
        {
          title: "تصميم واجهات وتجربة المستخدم",
          description:
            "تصميم واجهات مستخدم بديهية وجذابة تعزز تجربة المستخدم والتفاعل مع المنتج.",
          href: "/demo-uiux",
        },
        {
          title: "تحليل الأنظمة",
          description:
            "تحليل وتحديد متطلبات الأنظمة لبناء بنية برمجية قوية وقابلة للتوسع.",
          href: "/demo-system",
        },
        {
          title: "حلول الذكاء الاصطناعي (المبسّطة)",
          description:
            "دمج نماذج ذكاء اصطناعي مبسّطة لأتمتة المهام وتقديم رؤى ذكية تخدم أعمالك.",
          href: "/demo-ai",
        },
        {
          title: "البيانات الضخمة والتحليلات (المبسّطة)",
          description:
            "معالجة وتحليل مجموعات بيانات كبيرة لاكتشاف الأنماط واتخاذ قرارات مبنية على البيانات.",
          href: "/demo",
        },
      ],
    },
    armlink: {
      title: "ArmLink",
      subtitle: "للقطاعات العسكرية",
      capabilities: [
        {
          title: "تتبع المخزون لحظياً",
          description:
            "متابعة لحظية مستمرة لكل قطعة سلاح وأصل داخل التخزين، حتى مستوى الرف والخزانة الواحدة.",
        },
        {
          title: "كشف الوصول غير المصرح به",
          description:
            "تنبيه فوري عند أي دخول إلى مستودع أو خزانة أو منطقة مقيّدة خارج الإجراءات المعتمدة.",
        },
        {
          title: "سجلات امتثال جاهزة للتدقيق",
          description:
            "سجل زمني كامل وموثّق لكل عملية، جاهز للمراجعة الداخلية أو التدقيق الرسمي.",
        },
      ],
      cta: "اطلب إحاطة تعريفية",
    },
    warehouse: {
      badge: "أبعد من الأسلحة — رؤية كاملة للمخزون",
      title: "إدارة المستودعات والأصول",
      subtitle:
        "يمتد محرك ArmLink القائم على تقنية RFID إلى ما هو أبعد من حماية الأسلحة، ليمنح المستودعات ومنافذ البيع والمنشآت ذات الأصول الكثيفة رؤية لحظية ودقيقة للمخزون — من لحظة الاستلام وحتى الجرد النهائي.",
      capabilities: [
        {
          title: "مستويات المخزون لحظياً",
          description:
            "عدّ دقيق ولحظي لكل صنف وأصل، مع تحديد موقعه بدقة عبر الرفوف والحوامل والمناطق، دون أي حاجة للعدّ اليدوي.",
        },
        {
          title: "تتبع الوارد والصادر",
          description:
            "تسجيل تلقائي لكل قطعة عند دخولها أو خروجها من المستودع أو البوابة أو منطقة التخزين.",
        },
        {
          title: "دورة حياة الأصل وسجل التدقيق",
          description:
            "سجل زمني كامل لكل أصل، من الاستلام وحتى الاستبعاد، جاهز للمراجعة الداخلية أو التدقيق الرسمي.",
        },
        {
          title: "تنبيهات انخفاض المخزون وإعادة الطلب",
          description:
            "تنبيه تلقائي عند وصول المخزون إلى الحد الأدنى، لضمان تجديد التوريد في الوقت المناسب.",
        },
      ],
      cta: "اطلب عرضاً توضيحياً",
    },
    contact: {
      title: "تواصل معنا",
      intro:
        "لديك سؤال أو ترغب بالعمل معنا؟ أرسل لنا رسالة وسنعاود التواصل معك في أقرب وقت ممكن.",
      officialName: "الاسم التجاري الرسمي: مؤسسة إدراكسيوم",
      form: {
        name: "الاسم",
        email: "البريد الإلكتروني",
        message: "الرسالة",
        submit: "إرسال الرسالة",
        success: "✅ تم إرسال رسالتك بنجاح",
        error: "❌ تعذر إرسال الرسالة، حاول مرة أخرى لاحقاً",
      },
    },
    footer: {
      rights: (year: number) => `© ${year} مؤسسة إدراكسيوم. جميع الحقوق محفوظة.`,
    },
  },
};

export type Dictionary = typeof content["en"];
