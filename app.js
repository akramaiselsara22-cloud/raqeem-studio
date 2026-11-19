/**
 * منصة رَقِيم | Raqeem Studio - Core Application Logic
 * Integrates Document Formatter (Word/DOCX/VBA) and Infographic Studio with 19 Reference Frames.
 */

// Global State
const state = {
  currentMode: 'docs', // 'docs' or 'infographics'
  currentSpark: 'corporate',
  currentPreset: 'business',
  activeFrameId: 'frame-01',
  zoom: 1.0,

  sparks: {
    corporate: {
      name: 'النمط الإداري والمؤسسي الفاخر (Executive & Business Navy)',
      primary: '#1B365D',
      secondary: '#4A90E2',
      accent: '#D97706',
      lightBg: '#F0F4F8',
      borderColor: '#CBD5E1',
      zebraBg: '#F8FAFC',
      vbaPrimary: 'RGB(27, 54, 93)',
      vbaSecondary: 'RGB(74, 144, 226)',
      vbaDark: 'RGB(45, 55, 72)'
    },
    educational: {
      name: 'النمط التعليمي والدراسي التفاعلي (Interactive Educational)',
      primary: '#0284C7',
      secondary: '#10B981',
      accent: '#F97316',
      lightBg: '#F0FDF4',
      borderColor: '#BBF7D0',
      zebraBg: '#F0F9FF',
      vbaPrimary: 'RGB(2, 132, 199)',
      vbaSecondary: 'RGB(16, 185, 129)',
      vbaDark: 'RGB(30, 41, 59)'
    },
    academic: {
      name: 'النمط الأكاديمي والبحثي الرصين (Scholarly Academic)',
      primary: '#111827',
      secondary: '#2563EB',
      accent: '#991B1B',
      lightBg: '#F9FAFB',
      borderColor: '#E5E7EB',
      zebraBg: '#F3F4F6',
      vbaPrimary: 'RGB(17, 24, 39)',
      vbaSecondary: 'RGB(37, 99, 235)',
      vbaDark: 'RGB(31, 41, 55)'
    },
    minimalist: {
      name: 'النمط العصري والإبداعي الهادئ (Modern Minimalist)',
      primary: '#334155',
      secondary: '#0D9488',
      accent: '#7C3AED',
      lightBg: '#F8FAFC',
      borderColor: '#E2E8F0',
      zebraBg: '#F1F5F9',
      vbaPrimary: 'RGB(51, 65, 85)',
      vbaSecondary: 'RGB(13, 148, 136)',
      vbaDark: 'RGB(30, 41, 59)'
    }
  },

  presets: {
    study: {
      title: 'مذكرة المراجعة الشاملة وبنك الأسئلة الذكي',
      subtitle: 'الوحدة الثانية: المفاهيم الأساسية والتطبيقات التفاعلية لعام 2026',
      org: 'أكاديمية التعليم المتقدم وتطوير المهارات',
      client: 'طلاب وطالبات المسار التدريبي التخصصي',
      author: 'أ. أحمد حمدي (خبير المناهج)',
      checker: 'لجنة التوجيه التربوي',
      approver: 'قسم التدقيق العلمي',
      ref: 'EDU-NOTE-2026-U02',
      date: 'الفصل الدراسي الأول 2026',
      summary: 'تهدف هذه المذكرة إلى تبسيط أهم القواعد والمفاهيم بطريقة تفاعلية سلسة، مدعمة بأمثلة تطبيقية وجداول مقارنة سريعة الحفظ، مع بنك أسئلة واختبارات قياسية.',
      calloutTitle: '💡 قاعدة ذهبية للحفظ والتطبيق',
      calloutType: 'spec',
      calloutText: 'كل مفهوم جديد يبدأ بملاحظة وتطبيق، لا تحفظ التعريف مجرداً بل اربطه بمثاله العملي لترسيخ المعلومة في الذاكرة.',
      sec2Title: 'جدول المقارنة السريعة وتلخيص الفروق',
      sec2Intro: 'يوضح الجدول التالي أهم الفروق والمقارنات بين المفاهيم الأساسية المقررة بالدرس:',
      tableHeaders: ['المفهوم / القاعدة', 'التعريف الأساسي', 'مثال تطبيقي', 'الأثر في النتيجة', 'مستوى الأهمية'],
      tableRows: [
        ['القاعدة الأولى: المدخلات المنظمة', 'تحديد المتطلبات بدقة وبلا غموض', 'تحديد الهدف والجمهور', 'دقة وسرعة الإنجاز', '⭐⭐⭐ جوهرية'],
        ['القاعدة الثانية: التغذية الراجعة', 'فحص المخرجات وتقييم مطابقتها', 'تصحيح الأخطاء فوراً', 'تجويد مستمر', '⭐⭐ مهمة'],
        ['القاعدة الثالثة: التلخيص الهيكلي', 'تحويل الفقرات الطويلة لجداول', 'استخدام الخرائط الذهنية', 'تثبيت الفهم', '⭐⭐⭐ أساسية']
      ],
      spark: 'educational'
    },
    business: {
      title: 'التقرير الإداري السنوي وخطة تطوير الأعمال 2026',
      subtitle: 'مؤشرات الأداء الرئيسية والخطط التشغيلية المستقبلية',
      org: 'مجموعة الرواد الدولية للاستشارات والتطوير',
      client: 'مجلس الإدارة والشركاء الاستراتيجيين',
      author: 'أحمد حمدي',
      checker: 'فريق الجودة والتحرير الإداري',
      approver: 'الإدارة العامة للمشروعات',
      ref: 'DOC-2026-REP-01',
      date: 'نوفمبر 2026',
      summary: 'نستعرض في هذا المستند مخرجات العمل والنتائج المحققة خلال الفترة الماضية، مع وضع خارطة طريق متكاملة لتطوير الأداء ورفع كفاءة العمل.',
      calloutTitle: '📌 توجيه استراتيجي هام',
      calloutType: 'note',
      calloutText: 'يعد الالتزام بمؤشرات القياس الأسبوعية ومتابعة تقارير الإنجاز أولاً بأول ركيزة أساسية لضمان نجاح المسار.',
      sec2Title: 'مؤشرات الأداء وجدول مقارنة النتائج',
      sec2Intro: 'يوضح الجدول التالي توزيع الأهداف المحققة مقارنة بالمستهدف الزمني ونسبة الإنجاز الكلية:',
      tableHeaders: ['البند / المسار', 'المستهدف', 'المتحقق الفعلي', 'نسبة الإنجاز', 'حالة التقييم'],
      tableRows: [
        ['تطوير المحتوى والحقائب التدريبية', '12 وحدة', '12 وحدة', '100%', 'مكتمل ومتميز'],
        ['تدريب وتأهيل الكوادر المستهدفة', '150 متدرب', '165 متدرب', '110%', 'تجاوز المستهدف'],
        ['ضبط معايير الجودة والتوثيق', 'نسبة 95%', 'نسبة 98%', '100%', 'مطابق للمعايير']
      ],
      spark: 'corporate'
    },
    academic: {
      title: 'أثر استراتيجيات التعلم التفاعلي على الكفاءة الإدراكية',
      subtitle: 'دراسة شبه تجريبية محكمة على عينة من طلاب التعليم العالي',
      org: 'كلية الدراسات العليا والبحوث التربوية',
      client: 'لجنة التحكيم والمناقشة الأكاديمية',
      author: 'الباحث / أحمد حمدي',
      checker: 'أ.د. المشرف الأكاديمي الرئيسي',
      approver: 'عمادة البحث العلمي',
      ref: 'RES-2026-EDU-09',
      date: 'العام الجامعي 2026',
      summary: 'تهدف هذه الدراسة إلى استقصاء فاعلية دمج الاستراتيجيات التفاعلية والذكاء الاصطناعي في بيئات التعليم المعاصر.',
      calloutTitle: 'فرضية البحث الأساسية',
      calloutType: 'spec',
      calloutText: 'توجد فروق ذات دلالة إحصائية عند مستوى (α ≤ 0.05) بين متوسطي درجات المجموعتين لصالح التجريبية.',
      sec2Title: 'جدول الدلالات الإحصائية ونتائج الفحص',
      sec2Intro: 'يوضح جدول (1) المتوسطات الحسابية والانحرافات المعيارية وقيمة (T) المحسوبة لعينات البحث:',
      tableHeaders: ['المجموعة', 'حجم العينة (N)', 'المتوسط (Mean)', 'الانحراف (SD)', 'الدلالة الإحصائية'],
      tableRows: [
        ['المجموعة التجريبية (التفاعلية)', '45 طالباً', '88.4', '4.2', 'دال إحصائياً (0.01)'],
        ['المجموعة الضابطة (التقليدية)', '45 طالباً', '72.1', '6.8', '---']
      ],
      spark: 'academic'
    },
    book: {
      title: 'دليل الكاتب المحترف: أسرار الصياغة والتحرير الذكي',
      subtitle: 'من الفكرة الذهنية إلى المخطوطة الجاهزة للنشر الورقي والرقمي',
      org: 'دار النشر والتأليف الإبداعي 2026',
      client: 'مجتمع الكتاب وصناع المحتوى',
      author: 'أبو آيسل (Abo Aisel)',
      checker: 'هيئة التدقيق اللغوي والتحرير',
      approver: 'مدير قسم الإصدارات',
      ref: 'BOOK-ISBN-2026-08',
      date: 'طبعة نوفمبر 2026',
      summary: 'يقدم هذا الكتاب خلاصة الممارسات والأسرار لصناعة نصوص محكمة تأسر القارئ وتوصل الفكرة بأوضح أسلوب.',
      calloutTitle: 'اقتباس افتتاحي',
      calloutType: 'note',
      calloutText: '«الكتابة ليست مجرد صف كلمات، بل هي هندسة أفكار وتشييد جسور حية بين عقل الكاتب ووجدان القارئ.»',
      sec2Title: 'مصفوفة بناء فصول الكتاب وجدول التقدم',
      sec2Intro: 'توزيع فصول الكتاب ومحاوره الأساسية مع بيان أهداف كل فصل وعدد كلماته التقريبية:',
      tableHeaders: ['الفصل / الجزء', 'الموضوع المركزي', 'الهدف الإدراكي', 'عدد الصفحات', 'حالة الإنجاز'],
      tableRows: [
        ['الفصل 1: الشرارة والتخطيط', 'توليد الأفكار وهيكلة الفهرس', 'تحديد هوية الكتاب', '25 صفحة', 'مكتمل ومراجع'],
        ['الفصل 2: الصياغة والمحتوى', 'تقنيات الكتابة السلسة', 'صياغة الأبواب التفاعلية', '40 صفحة', 'مكتمل ومراجع']
      ],
      spark: 'minimalist'
    },
    memo: {
      title: 'مذكرة تفاهم وإطار عمل استراتيجي مشترك',
      subtitle: 'اتفاقية تعاون مؤسسي لتطوير وتأهيل الكفاءات الوطنية',
      org: 'الاتحاد العربي للتدريب والاستشارات',
      client: 'الجهات الشريكة والمستفيدة',
      author: 'المستشار القانوني والإداري',
      checker: 'لجنة الصياغة والمراجعة',
      approver: 'الأمين العام للاتحاد',
      ref: 'MOU-2026-COOP-01',
      date: '19 نوفمبر 2026',
      summary: 'تحدد هذه الوثيقة المبادئ التوجيهية وأطر الشراكة الاستراتيجية بين الطرفين لتبادل الخبرات وتنسيق البرامج التدريبية.',
      calloutTitle: 'بند الالتزام والسرية',
      calloutType: 'warning',
      calloutText: 'يلتزم الطرفان بالمحافظة على سرية البيانات والوثائق المتبادلة وعدم الإفصاح عنها دون موافقة مسبقة.',
      sec2Title: 'جدول الالتزامات والمهام المشتركة',
      sec2Intro: 'يوضح الجدول التالي توزيع المهام والمسؤوليات المنوطة بكل طرف:',
      tableHeaders: ['المسؤولية / البند', 'الطرف الأول (الاتحاد)', 'الطرف الثاني (الشريك)', 'الجدول الزمني', 'الاعتماد'],
      tableRows: [
        ['إعداد الحقائب والبرامج', 'توفير المناهج والمدربين', 'تحديد الاحتياجات التدريبية', 'خلال أسبوعين', 'معتمد'],
        ['التنظيم والخدمات اللوجستية', 'الإشراف على الجودة', 'توفير القاعات والتجهيزات', 'طوال فترة البرنامج', 'معتمد']
      ],
      spark: 'corporate'
    }
  },

  // 19 Infographic Reference Frames Catalog
  infographics: [
    {
      id: "frame-01",
      filename: "92cd810641ab70218c99f128a2fe1776.jpg",
      title: "فريم المقارنة الثنائية والبطاقات المصورة",
      category: "تعليمي - لغة عربية ومفاهيم",
      layout: "عمودان متقابلان + كروت أمثلة ثلاثية الأبعاد + شريط تذييل للملاحظات",
      promptTag: "3D claymorphic educational infographic poster, dual column comparison, clean glassmorphic cards, pastel green and soft blue color palette, 3D illustrated stationery objects"
    },
    {
      id: "frame-02",
      filename: "2967aa5300654748164af88eb776c8ce.jpg",
      title: "فريم القواعد المنقسمة والشخصيات الكرتونية",
      category: "تعليمي - أساليب ونحو",
      layout: "قسمان أفقيان + أزرار 3D ملونة مرقمة + شخصيات أطفال كرتونية",
      promptTag: "educational Arabic grammar infographic poster, two horizontal sections, 3D pill badges, cute 3D cartoon boy and girl student holding books, vibrant glossy color cards"
    },
    {
      id: "frame-03",
      filename: "3715e8da8dd8dc0bd91eef3b9d993ba7.jpg",
      title: "فريم الأعمدة الأربعة الموسمية والطبيعية",
      category: "علوم وجغرافيا ومراحل",
      layout: "4 أعمدة رأسية بمشاهد طبيعية وقياسات حرارية ونصائح ملونة",
      promptTag: "4 vertical column weather and climate comparison chart, detailed natural scenes inside pillars, temperature gauges, floating 3D icons, clean wooden header sign"
    },
    {
      id: "frame-04",
      filename: "9b31e54b24f905f170d4b5c19a97d24f.jpg",
      title: "فريم شبكة الأشرطة والبطاقات الثمانية (8-Grid)",
      category: "لغات وقواعد شاملة",
      layout: "شبكة 8 بطاقات (2 عمود × 4 صفوف) بربونات ملونة وأيقونات 3D",
      promptTag: "parts of speech language learning poster, 8 segmented cards in 2x4 grid, vibrant colored ribbon banners, cute miniature 3D icons, elegant vintage parchment frame"
    },
    {
      id: "frame-05",
      filename: "3d6810bce0bfabd32f393db98d357bb0.jpg",
      title: "فريم السرد القصصي والخط الزمني (15 محطة)",
      category: "تاريخ وسير وقصص",
      layout: "شبكة 15 بطاقة سينمائية مرقمة مع عنوان علوي واقتباس سفلي",
      promptTag: "historical narrative storyboard infographic, 15 numbered chronological cards in 5x3 grid, cinematic lighting, gold and forest green palette, elegant Islamic architecture"
    },
    {
      id: "frame-06",
      filename: "6de5b7d8fe025fe80f134d8a376051de.jpg",
      title: "فريم التفكيك المفاهيمي والخريطة الفكرية",
      category: "فكري ومجتمعي وتحليلي",
      layout: "خريطة تفكيك بألوان مظلمة ورمزية عالية وشخصية ظل في المنتصف",
      promptTag: "dramatic conceptual editorial infographic, dark textured background, shadowy central silhouette, broken chains, analytical floating text boxes, red bold Arabic title"
    },
    {
      id: "frame-07",
      filename: "746f2bfae539adb73ad02f8061b936ae.jpg",
      title: "فريم المتاهة الاستراتيجية والشطرنج الجيوسياسي",
      category: "استراتيجي وعلاقات دولية",
      layout: "متاهة مركزية، رقعة شطرنج، خيوط تشبيك، وبطاقات جانبية",
      promptTag: "geopolitical strategy maze infographic, 3D labyrinth in center with chess pieces, puppet master hands controlling strings, structured briefing cards on sides"
    },
    {
      id: "frame-08",
      filename: "763119769_991511610589156_8959979328082365615_n.jpg",
      title: "فريم بوابة الذكاء الاصطناعي (Abo Aisel)",
      category: "تكنولوجيا وذكاء اصطناعي",
      layout: "بوابة ضوئية هائلة، أسطول روبوتات، أيقونات وسائط متعددة",
      promptTag: "monumental glowing AI gateway arch, futuristic robot army, cosmic nebula lighting split in blue and gold, floating holographic icons, signature Abo Aisel watermark"
    },
    {
      id: "frame-09",
      filename: "772333319_997683019972015_3250380985453499164_n.jpg",
      title: "فريم لوحة القيادة السيبرانية ومراكز البيانات (Abo Aisel)",
      category: "سحابي وتشغيل وتقنية",
      layout: "لوحة تحكم نيون زرقاء، مجسم ذكاء اصطناعي، ومسار خطوات أفقية",
      promptTag: "futuristic cyberpunk AI operations dashboard, glowing blue holographic globe, robotic hand interacting with control panels, horizontal workflow chevron bar"
    }
  ]
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
  applyPreset('business');
  renderInfographicsGallery();
  updateInfographicPreview();
  generateAiInfographicPrompt();
});

// Mode Switching (Docs vs Infographics)
function switchStudioMode(mode) {
  state.currentMode = mode;
  
  const docsSec = document.getElementById('section-docs-studio');
  const infoSec = document.getElementById('section-infographics-studio');
  const btnDocs = document.getElementById('tab-btn-docs');
  const btnInfo = document.getElementById('tab-btn-infographics');
  const quickBtn = document.getElementById('btn-quick-export');

  if (mode === 'infographics') {
    if (docsSec) docsSec.classList.remove('active');
    if (infoSec) infoSec.classList.add('active');
    if (btnDocs) btnDocs.classList.remove('active');
    if (btnInfo) btnInfo.classList.add('active');
    if (quickBtn) quickBtn.innerHTML = '<i class="fa-solid fa-copy"></i> نسخ برومبت الصورة';
  } else {
    if (docsSec) docsSec.classList.add('active');
    if (infoSec) infoSec.classList.remove('active');
    if (btnDocs) btnDocs.classList.add('active');
    if (btnInfo) btnInfo.classList.remove('active');
    if (quickBtn) quickBtn.innerHTML = '<i class="fa-solid fa-download"></i> تصدير Word';
  }
}

function handleQuickAction() {
  if (state.currentMode === 'infographics') {
    copyAiPrompt();
  } else {
    switchDeliveryTab('docx');
    exportWordDocument();
  }
}

function scrollToInfographicBuilder() {
  const el = document.getElementById('info-builder-area');
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}

// Render 19 Infographics Reference Gallery
function renderInfographicsGallery() {
  const container = document.getElementById('infographics-gallery-grid');
  if (!container) return;

  container.innerHTML = state.infographics.map(item => `
    <div class="gallery-card ${item.id === state.activeFrameId ? 'active' : ''}" id="card-${item.id}" onclick="selectInfographicFrame('${item.id}')">
      <div class="gallery-card-thumb">
        <img src="assets/infographics/${item.filename}" alt="${item.title}" loading="lazy">
        <span class="thumb-tag"><i class="fa-solid fa-layer-group"></i> ${item.category}</span>
      </div>
      <div class="gallery-card-info">
        <h4>${item.title}</h4>
        <p>${item.layout}</p>
        <div class="gallery-card-action">
          <button class="btn-select-frame">
            ${item.id === state.activeFrameId ? '<i class="fa-solid fa-circle-check"></i> الفريم النشط' : 'اعتماد هذا الفريم'}
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// Select Infographic Frame
function selectInfographicFrame(frameId) {
  state.activeFrameId = frameId;
  const frame = state.infographics.find(f => f.id === frameId);
  if (!frame) return;

  // Update gallery cards
  document.querySelectorAll('.gallery-card').forEach(c => {
    c.classList.toggle('active', c.id === `card-${frameId}`);
    const b = c.querySelector('.btn-select-frame');
    if (b) {
      b.innerHTML = c.id === `card-${frameId}` ? '<i class="fa-solid fa-circle-check"></i> الفريم النشط' : 'اعتماد هذا الفريم';
    }
  });

  // Update active banner name
  setText('pv-frame-name', `${frame.title} (${frame.id})`);

  // Update AI Prompt
  generateAiInfographicPrompt();

  showToast(`تم اعتماد ${frame.title} كقالب مرجعي!`);
}

// Update Infographic Live Mockup
function updateInfographicPreview() {
  const getVal = (id) => document.getElementById(id)?.value || '';

  const topic = getVal('info-topic');
  const concept = getVal('info-concept');
  const s1Title = getVal('info-s1-title');
  const s1Core = getVal('info-s1-core');
  const s1Ex = getVal('info-s1-example');
  const s2Title = getVal('info-s2-title');
  const s2Core = getVal('info-s2-core');
  const s2Ex = getVal('info-s2-example');
  const note = getVal('info-note');
  const author = getVal('info-author');

  setText('pv-info-title', topic);
  setText('pv-info-subtitle', concept.substring(0, 60) + '...');
  setText('pv-info-s1-title', s1Title);
  setText('pv-info-s1-core', s1Core);
  setText('pv-info-s1-ex', s1Ex);
  setText('pv-info-s2-title', s2Title);
  setText('pv-info-s2-core', s2Core);
  setText('pv-info-s2-ex', s2Ex);
  setText('pv-info-note', note);
  setText('pv-info-author', author);

  generateAiInfographicPrompt();
}

function updateInfographicLayout() {
  const split = document.getElementById('info-split')?.value;
  const container = document.getElementById('pv-info-cards-container');
  if (!container) return;

  if (split === 'triple') {
    container.className = 'info-cards-grid';
    container.style.gridTemplateColumns = 'repeat(3, 1fr)';
  } else if (split === 'quad') {
    container.className = 'info-cards-grid';
    container.style.gridTemplateColumns = 'repeat(4, 1fr)';
  } else if (split === 'grid8') {
    container.className = 'info-cards-grid';
    container.style.gridTemplateColumns = 'repeat(2, 1fr)';
  } else {
    container.className = 'info-cards-grid dual-col';
    container.style.gridTemplateColumns = '1fr 1fr';
  }

  generateAiInfographicPrompt();
}

// Generate Structured Midjourney / Ideogram / DALL-E AI Prompt
function generateAiInfographicPrompt() {
  const frame = state.infographics.find(f => f.id === state.activeFrameId) || state.infographics[0];
  const getVal = (id) => document.getElementById(id)?.value || '';

  const topic = getVal('info-topic');
  const s1Title = getVal('info-s1-title');
  const s1Core = getVal('info-s1-core');
  const s2Title = getVal('info-s2-title');
  const s2Core = getVal('info-s2-core');
  const author = getVal('info-author');
  const style = getVal('info-style');

  let styleDescriptor = "Ultra-high quality 3D claymorphic educational infographic poster, vibrant glossy colors, smooth lighting, clean layout";
  if (style === 'analytical') {
    styleDescriptor = "Dramatic dark-themed editorial analytical infographic poster, intricate conceptual elements, cinematic lighting, deep symbolism";
  } else if (style === 'cyberpunk') {
    styleDescriptor = "Futuristic cyberpunk AI tech architecture dashboard infographic, glowing holographic screens, dark background with cyan and amber neon highlights";
  }

  const prompt = `A professional educational infographic poster inspired by reference layout [${frame.id}: ${frame.title}].

TOP HEADER:
- Large embossed 3D Arabic typography title badge at top center reading: "${topic}".
- Subtitle pill ribbon below header explaining the core concept.
- Floating decorative 3D icons (open books, pencils, graduation cap, golden lightbulb).

MAIN CONTENT & SECTIONS:
- Layout: Balanced multi-card structure matching reference frame ${frame.id} (${frame.layout}).
- Section 1 Card: Title "${s1Title}" with description "${s1Core}", featuring miniature 3D illustrative icons and example badge.
- Section 2 Card: Title "${s2Title}" with description "${s2Core}", featuring corresponding illustrative elements.
- Clean spacing, rounded borders, soft drop shadows, perfectly aligned Arabic typography.

BOTTOM SECTION & FOOTER:
- Bottom highlight callout ribbon with a glowing 3D lightbulb icon for key rules.
- Elegant footer banner badge with quill pen illustration reading: "${author}".

VISUAL STYLE & RENDERING:
- ${styleDescriptor}.
- Crisp clean typography, 8K resolution, octane render, flawless graphic design composition.
- Negative Prompt: blurry text, deformed characters, messy layout, pixelated, watermark clutter. --ar 2:3 --v 6.0`;

  const outputEl = document.getElementById('ai-infographic-prompt-output');
  if (outputEl) outputEl.textContent = prompt;
}

function copyAiPrompt() {
  const prompt = document.getElementById('ai-infographic-prompt-output')?.textContent;
  copyText(prompt, 'تم نسخ برومبت صورة الانفوجرافيك بالإنجليزية بنجاح! جاهز للصق في Midjourney أو Ideogram.');
}

// -------------------------------------------------------------
// DOCUMENT STUDIO METHODS (PRESERVED & ENHANCED)
// -------------------------------------------------------------

function applyPreset(presetKey) {
  if (!state.presets[presetKey]) return;
  state.currentPreset = presetKey;
  const data = state.presets[presetKey];

  document.querySelectorAll('.btn-preset').forEach(b => {
    b.classList.toggle('active', b.getAttribute('onclick')?.includes(presetKey));
  });

  setVal('doc-title', data.title);
  setVal('doc-subtitle', data.subtitle);
  setVal('doc-org', data.org);
  setVal('doc-client', data.client);
  setVal('doc-author', data.author);
  setVal('doc-checker', data.checker);
  setVal('doc-approver', data.approver);
  setVal('doc-ref', data.ref);
  setVal('doc-date', data.date);
  setVal('doc-summary', data.summary);
  setVal('callout-title', data.calloutTitle);
  setVal('callout-type', data.calloutType);
  setVal('callout-text', data.calloutText);
  setVal('sec2-title', data.sec2Title);

  selectSpark(data.spark);
  updatePresetTable(data);
  updateLivePreview();
}

function updatePresetTable(data) {
  const headerRow = document.getElementById('pv-table-header-row');
  if (headerRow && data.tableHeaders) {
    headerRow.innerHTML = data.tableHeaders.map(h => `<th>${h}</th>`).join('');
  }

  const tbody = document.getElementById('pv-table-body');
  if (tbody && data.tableRows) {
    tbody.innerHTML = data.tableRows.map(row => {
      const cells = row.map((cell, idx) => {
        if (idx === row.length - 1 && (cell.includes('مكتمل') || cell.includes('تجاوز') || cell.includes('معتمد') || cell.includes('دال'))) {
          return `<td><span class="status-badge status-ok">${cell}</span></td>`;
        }
        return `<td>${cell}</td>`;
      }).join('');
      return `<tr>${cells}</tr>`;
    }).join('');
  }

  setText('pv-sec2-intro', data.sec2Intro);
}

function selectSpark(sparkKey) {
  if (!state.sparks[sparkKey]) return;
  state.currentSpark = sparkKey;
  const spark = state.sparks[sparkKey];

  document.querySelectorAll('.spark-card').forEach(card => {
    if (card.dataset.spark === sparkKey) {
      card.classList.add('active');
      const btn = card.querySelector('.btn-select');
      if (btn) btn.innerHTML = '<i class="fa-solid fa-circle-check"></i> مفعّـل حالياً';
    } else {
      card.classList.remove('active');
      const btn = card.querySelector('.btn-select');
      if (btn) btn.innerHTML = 'اختر هذه الشرارة';
    }
  });

  const root = document.documentElement;
  root.style.setProperty('--primary', spark.primary);
  root.style.setProperty('--secondary', spark.secondary);
  root.style.setProperty('--accent', spark.accent);
  root.style.setProperty('--light-bg', spark.lightBg);
  root.style.setProperty('--border-color', spark.borderColor);
  root.style.setProperty('--zebra-bg', spark.zebraBg);

  generateOutputs();
}

function updateLivePreview() {
  const getVal = (id) => document.getElementById(id)?.value || '';

  const title = getVal('doc-title');
  const subtitle = getVal('doc-subtitle');
  const ref = getVal('doc-ref');
  const org = getVal('doc-org');
  const client = getVal('doc-client');
  const author = getVal('doc-author');
  const checker = getVal('doc-checker');
  const approver = getVal('doc-approver');
  const date = getVal('doc-date');
  const summary = getVal('doc-summary');
  const calloutTitle = getVal('callout-title');
  const calloutType = getVal('callout-type');
  const calloutText = getVal('callout-text');
  const sec2Title = getVal('sec2-title');

  setText('pv-org', org);
  setText('pv-title', title);
  setText('pv-subtitle', subtitle);
  setText('pv-ref', ref);
  setText('pv-client', client);
  setText('pv-author', author);
  setText('pv-checker', checker);
  setText('pv-approver', approver);
  setText('pv-date', date);
  setText('pv-summary-text', summary);
  setText('pv-table-title', title);
  setText('pv-h1-2', `2.0 ${sec2Title}`);

  setText('pv-rh-title', title);
  setText('pv-rh-ref', `${ref}`);

  const calloutBox = document.getElementById('pv-callout');
  if (calloutBox) {
    calloutBox.className = `callout-box ${calloutType}`;
    let iconPrefix = '📌 ملاحظة: ';
    if (calloutType === 'warning') iconPrefix = '⚠️ تنبيه واشتراط: ';
    if (calloutType === 'spec') iconPrefix = '💡 قاعدة وفكرة: ';
    setText('pv-callout-title', iconPrefix + calloutTitle);
    setText('pv-callout-body', calloutText);
  }

  generateOutputs();
}

function setVal(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function toggleAccordion(header) {
  const item = header.parentElement;
  item.classList.toggle('active');
}

function setZoom(scale) {
  state.zoom = scale;
  const viewport = document.getElementById('paper-viewport');
  if (viewport) {
    viewport.style.transform = `scale(${scale})`;
  }
  document.querySelectorAll('.preview-toolbar .btn-ghost').forEach(b => {
    b.classList.remove('active');
    if (b.textContent.includes(`${Math.round(scale * 100)}%`)) {
      b.classList.add('active');
    }
  });
}

function updateFont(fontFamily) {
  const viewport = document.getElementById('paper-viewport');
  if (viewport) viewport.style.fontFamily = fontFamily;
}

function updateDirection(dir) {
  const pages = document.querySelectorAll('.paper-page');
  pages.forEach(p => p.dir = dir);
}

function switchDeliveryTab(tabId) {
  document.querySelectorAll('.delivery-tab').forEach(t => {
    t.classList.toggle('active', t.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-pane').forEach(p => {
    p.classList.toggle('active', p.id === `tab-${tabId}`);
  });
}

function generateOutputs() {
  const spark = state.sparks[state.currentSpark];
  const getVal = (id) => document.getElementById(id)?.value || '';

  const title = getVal('doc-title');
  const subtitle = getVal('doc-subtitle');
  const ref = getVal('doc-ref');
  const org = getVal('doc-org');
  const author = getVal('doc-author');
  const summary = getVal('doc-summary');
  const sec2Title = getVal('sec2-title');

  // VBA
  const vbaCode = `Attribute VB_Name = "رَقِيمDocumentFormatter"
' ==============================================================================
' MODULE: Universal Word Document Formatter
' SPARK APPLIED: ${spark.name}
' ==============================================================================
Sub FormatUniversalDocument()
    Dim doc As Document: Set doc = ActiveDocument
    On Error GoTo ErrorHandler: Application.ScreenUpdating = False
    With doc.PageSetup
        .TopMargin = CentimetersToPoints(2.54): .BottomMargin = CentimetersToPoints(2.54)
        .LeftMargin = CentimetersToPoints(2.54): .RightMargin = CentimetersToPoints(2.54)
    End With
    Application.ScreenUpdating = True
    MsgBox "تم تطبيق التنسيق الشامل بنجاح وفق ${spark.name}!", vbInformation
    Exit Sub
ErrorHandler:
    Application.ScreenUpdating = True: MsgBox Err.Description, vbCritical
End Sub`;
  const vbaEl = document.getElementById('vba-code-output');
  if (vbaEl) vbaEl.textContent = vbaCode;

  // Gemini Prompt
  const geminiPrompt = `1) الدور:
أنت «المنسق الشامل لمستندات Word وصانع الانفوجرافيك الذكي».

2) المهمة:
تنسيق المستند أو توليد الانفوجرافيك وفق نمط: ${spark.name}.
عنوان المستند: "${title} - ${subtitle}"
الجهة: ${org} | الكاتب: ${author}`;
  const geminiEl = document.getElementById('gemini-prompt-output');
  if (geminiEl) geminiEl.textContent = geminiPrompt;

  // Markdown
  const presetData = state.presets[state.currentPreset];
  let mdTable = '';
  if (presetData && presetData.tableHeaders && presetData.tableRows) {
    mdTable = `| ${presetData.tableHeaders.join(' | ')} |\n| ${presetData.tableHeaders.map(() => '---').join(' | ')} |\n`;
    presetData.tableRows.forEach(row => {
      mdTable += `| ${row.join(' | ')} |\n`;
    });
  }

  const markdownText = `# ${title}\n### ${subtitle}\n\n**المؤسسة:** ${org} | **الكاتب:** ${author}\n\n## 1.0 المقدمة\n${summary}\n\n## 2.0 ${sec2Title}\n${mdTable}`;
  const mdEl = document.getElementById('markdown-output');
  if (mdEl) mdEl.textContent = markdownText;
}

function copyVbaMacro() {
  const code = document.getElementById('vba-code-output')?.textContent;
  copyText(code, 'تم نسخ كود ماكرو VBA بنجاح!');
}

function copyGeminiPrompt() {
  const prompt = document.getElementById('gemini-prompt-output')?.textContent;
  copyText(prompt, 'تم نسخ برومبت Gemini بالكامل!');
}

function copyMarkdown() {
  const md = document.getElementById('markdown-output')?.textContent;
  copyText(md, 'تم نسخ محتوى Markdown بنجاح!');
}

function copyText(text, successMsg) {
  if (!text) return;
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg);
  }).catch(() => {
    showToast('تعذر النسخ التلقائي، يُرجى التحديد والنسخ يدوياً.');
  });
}

function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'app-toast';
  toast.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${msg}`;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 50);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

function exportWordDocument() {
  const statusEl = document.getElementById('download-status');
  if (statusEl) statusEl.textContent = 'جاري تجميع وتنزيل ملف Word...';

  const getVal = (id) => document.getElementById(id)?.value || '';
  const title = getVal('doc-title');
  const org = getVal('doc-org');
  const summary = getVal('doc-summary');

  const wordContent = `
<html xmlns:w='urn:schemas-microsoft-com:office:word'>
<head><meta charset='utf-8'><title>${title}</title></head>
<body style="font-family:'Cairo',Arial;direction:rtl;">
  <h1 style="text-align:center;color:#1B365D;">${title}</h1>
  <p style="text-align:center;color:#64748B;">${org}</p>
  <hr/>
  <h2>1.0 المقدمة</h2>
  <p>${summary}</p>
</body>
</html>`;

  const blob = new Blob(['\ufeff', wordContent], { type: 'application/msword;charset=utf-8' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.download = `${title.substring(0, 30).replace(/\s+/g, '_')}.doc`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  if (statusEl) {
    statusEl.textContent = '✅ تم تنزيل الملف بنجاح!';
    setTimeout(() => statusEl.textContent = '', 5000);
  }
}
