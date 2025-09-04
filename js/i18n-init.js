i18next
  .use(i18nextHttpBackend)
  .init({
    lng: "ko", // 기본 언어
    fallbackLng: "en",
    debug: false,
    backend: {
      loadPath: "./locales/{{lng}}/translation.json"
    }
  }, function(err, t) {
    jqueryI18next.init(i18next, $, { useOptionsAttr: true });
    $('body').localize();
    // option 태그 강제 번역
    $('option[data-i18n]').each(function() {
      var key = $(this).data('i18n');
      $(this).text(i18next.t(key));
    });
  });

function changeLang(lang) {
  i18next.changeLanguage(lang, () => {
    $('body').localize();
    // option 태그 강제 번역
    $('option[data-i18n]').each(function() {
      var key = $(this).data('i18n');
      $(this).text(i18next.t(key));
    });
  });
} 