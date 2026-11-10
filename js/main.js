/**
 * landing_page/js/main.js - تفاعلية صفحة الهبوط
 */

document.addEventListener('DOMContentLoaded', () => {
  // ── 1. تبديل لقطات الشاشة (Screenshots Switcher) ───────────────────────
  const tabBtns = document.querySelectorAll('.tab-btn');
  const screenImgs = document.querySelectorAll('.screen-img');
  const screenCaption = document.getElementById('screenCaption');

  const captions = {
    '1': 'الواجهة الرئيسية: تحميل فيديو مفرد مع استعراض الجودات المتاحة وخيارات الترجمة التلقائية',
    '2': 'إدارة قوائم التشغيل (Playlist): فحص عناصر القائمة وتحديد وسائط متعددة للتنزيل دفعة واحدة'
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      screenImgs.forEach(img => img.classList.remove('active'));

      btn.classList.add('active');
      const screenId = btn.getAttribute('data-screen');
      const targetImg = document.getElementById(`screen-${screenId}`);

      if (targetImg) {
        targetImg.classList.add('active');
      }

      if (screenCaption && captions[screenId]) {
        screenCaption.textContent = captions[screenId];
      }
    });
  });

  // ── 2. نافذة التنبيه لروابط التحميل (Download Placeholders Modal) ──────
  const downloadBtns = document.querySelectorAll('.js-download-btn');
  const modalOverlay = document.getElementById('downloadModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalPlatform = document.getElementById('modalPlatform');

  downloadBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const href = btn.getAttribute('href');
      // إذا كان الرابط مؤقتاً (# أو لم يتم رفعه بعد)
      if (!href || href === '#' || href.startsWith('javascript')) {
        e.preventDefault();
        const platform = btn.getAttribute('data-platform') || 'البرنامج';
        if (modalPlatform) {
          modalPlatform.textContent = platform;
        }
        if (modalOverlay) {
          modalOverlay.classList.add('active');
        }
      }
    });
  });

  if (modalCloseBtn && modalOverlay) {
    modalCloseBtn.addEventListener('click', () => {
      modalOverlay.classList.remove('active');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('active');
      }
    });
  }

  // إغلاق المودال بزر Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
      modalOverlay.classList.remove('active');
    }
  });
});

