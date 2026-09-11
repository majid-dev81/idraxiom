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
        "At Idraxiom, we design practical and innovative AI platforms that empower businesses to grow.",
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
            "Integrating lightweight AI models to automate tasks and provide intelligent insights for your business.",
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
      badge: "Built for Interior & Defense Sectors",
      title: "Weapons Storage & Armory Security Monitoring",
      subtitle:
        "ArmLink is Idraxiom's dedicated platform for securing armories and weapons storage — giving accountable teams a single, real-time view of every asset under their protection.",
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
          title: "Tamper & Theft Alerts",
          description:
            "Automated notifications for tampering, removal, or movement of monitored items in real time.",
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
      headingLine2: "لأعمال العصر",
      subtitle:
        "في إدراكسيوم، نصمم منصات ذكاء اصطناعي عملية ومبتكرة تمكّن الشركات من النمو.",
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
          title: "حلول الذكاء الاصطناعي (مخفّفة)",
          description:
            "دمج نماذج ذكاء اصطناعي خفيفة لأتمتة المهام وتقديم رؤى ذكية لأعمالك.",
          href: "/demo-ai",
        },
        {
          title: "البيانات الضخمة والتحليلات (مخفّفة)",
          description:
            "معالجة وتحليل مجموعات بيانات كبيرة لاكتشاف الأنماط واتخاذ قرارات مبنية على البيانات.",
          href: "/demo",
        },
      ],
    },
    armlink: {
      badge: "مصمم لقطاعي الداخلية والدفاع",
      title: "مراقبة أمن تخزين الأسلحة والمستودعات",
      subtitle:
        "ArmLink هي منصة إدراكسيوم المخصصة لتأمين المستودعات ومخازن الأسلحة، وتمنح الفرق المسؤولة رؤية لحظية موحدة لكل أصل تحت حمايتها.",
      capabilities: [
        {
          title: "تتبع المخزون لحظياً",
          description:
            "رؤية مستمرة لكل قطعة سلاح وأصل داخل التخزين، وصولاً إلى مستوى الرف والحقيبة الفردية.",
        },
        {
          title: "كشف الوصول غير المصرح به",
          description:
            "تنبيهات فورية لحظة الوصول إلى مستودع أو خزانة أو منطقة تخزين مقيدة خارج البروتوكول المعتمد.",
        },
        {
          title: "تنبيهات العبث والسرقة",
          description:
            "إشعارات تلقائية عند أي عبث أو إزالة أو تحريك للعناصر الخاضعة للمراقبة، بشكل لحظي.",
        },
        {
          title: "سجلات امتثال جاهزة للتدقيق",
          description:
            "سجل زمني كامل لسلسلة العهدة، جاهز للمراجعة الداخلية أو التدقيق التنظيمي.",
        },
      ],
      cta: "اطلب إحاطة تعريفية",
    },
    warehouse: {
      badge: "أبعد من الأسلحة — رؤية كاملة للمخزون",
      title: "إدارة المستودعات والأصول",
      subtitle:
        "نفس محرك ArmLink القائم على تقنية RFID يمتد إلى ما هو أبعد من حماية الأسلحة، ليمنح المستودعات ومنافذ البيع والعمليات كثيفة الأصول رؤية لحظية دقيقة للمخزون والأصول — من الاستلام وحتى المطابقة النهائية.",
      capabilities: [
        {
          title: "مستويات المخزون لحظياً",
          description:
            "عدّ دقيق ومحدَّث الموقع لكل صنف وأصل عبر الرفوف والحوامل والمناطق — بدون عدّ يدوي.",
        },
        {
          title: "تتبع الوارد والصادر",
          description:
            "تسجيل تلقائي لكل قطعة تدخل أو تخرج من المستودع أو البوابة أو منطقة التخزين.",
        },
        {
          title: "دورة حياة الأصل وسجل التدقيق",
          description:
            "سجل زمني كامل لكل أصل — من الاستلام وحتى الاستبعاد — جاهز للمراجعة الداخلية أو التدقيق التنظيمي.",
        },
        {
          title: "تنبيهات انخفاض المخزون وإعادة الطلب",
          description:
            "تنبيهات تلقائية عند انخفاض المخزون عن الحد الأدنى، حتى لا يتأخر التزويد عن الطلب.",
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
