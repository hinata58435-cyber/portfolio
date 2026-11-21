(function () {
  var nav = document.getElementById("nav");
  var toggle = document.getElementById("navToggle");
  var page = document.body.getAttribute("data-page");

  // Highlight current page
  document.querySelectorAll(".nav__links a").forEach(function (a) {
    if (a.getAttribute("data-page") === page) a.classList.add("active");
    a.addEventListener("click", function () { closeMenu(); });
  });

  // Mobile menu
  function closeMenu() {
    nav.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }
  toggle.addEventListener("click", function () {
    var open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeMenu(); });

  // Solid nav on scroll
  function onScroll() { nav.classList.toggle("is-solid", window.scrollY > 40); }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Reveal on scroll
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("is-visible"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el, i) { el.style.transitionDelay = (i % 3) * 0.08 + "s"; io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("is-visible"); });
  }

  // Year
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  // Contact form validation
  var form = document.getElementById("contactForm");
  if (!form) return;
  var note = document.getElementById("formNote");
  var rules = {
    name: function (v) { return v.length >= 2 ? "" : "الرجاء كتابة الاسم (حرفان على الأقل)."; },
    email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? "" : "الرجاء إدخال بريد إلكتروني صحيح."; },
    subject: function (v) { return v.length >= 3 ? "" : "الرجاء كتابة عنوان للرسالة."; },
    message: function (v) { return v.length >= 10 ? "" : "الرجاء كتابة تفاصيل الرسالة (10 أحرف على الأقل)."; }
  };
  function check(field) {
    var input = form.elements[field];
    var msg = rules[field](input.value.trim());
    var wrap = input.closest(".field");
    wrap.classList.toggle("invalid", !!msg);
    wrap.querySelector(".error").textContent = msg;
    return !msg;
  }
  Object.keys(rules).forEach(function (f) {
    form.elements[f].addEventListener("blur", function () { check(f); });
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var ok = Object.keys(rules).map(check).every(Boolean);
    if (!ok) { note.textContent = ""; return; }
    note.textContent = "تم التحقق من البيانات بنجاح. ملاحظة: النموذج غير مربوط بخدمة إرسال بعد، لذلك لم تُرسل الرسالة فعلياً.";
    form.reset();
  });
})();
