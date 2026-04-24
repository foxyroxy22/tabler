/** hero 컬러 슬라이더 **/
jQuery(document).ready(function () {
  /* ================================================
     ✏️ 여기만 수정하세요
  ================================================ */

  var PRODUCTS = [
    {
      nameEn: "Red",
      nameKr: "레드",
      emoji:
        '<img src="https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/icon_red.svg" width="28" height="28" />',
      tabColor: "#FFAFB4",
      imgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/prd_clean_red.png",
      bgColor: "#FF0026",
      bgImgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_red.png",
      bgImgSrcMo:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_red_m.png",
      textColor: "#FFFF68",
      arcColor: "#FFFF68",
    },
    {
      nameEn: "Green",
      nameKr: "그린",
      emoji:
        '<img src="https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/icon_green.svg" width="28" height="28" />',
      tabColor: "#5CCDB2",
      imgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/prd_clean_green.png",
      bgColor: "#00B38F",
      bgImgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_green.png",
      bgImgSrcMo:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_green_m.png",
      textColor: "#E1FF00",
      arcColor: "#E1FF00",
    },
    {
      nameEn: "Olive Green",
      nameKr: "올리브그린",
      emoji:
        '<img src="https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/icon_olive.svg" width="28" height="28" />',
      tabColor: "#F4FDBF",
      imgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/prd_clean_olive.png",
      bgColor: "#EDFF9E",
      bgImgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_olive.png",
      bgImgSrcMo:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_olive_m.png",
      textColor: "#FE8688",
      arcColor: "#FE8688",
    },
    {
      nameEn: "Blue",
      nameKr: "블루",
      emoji:
        '<img src="https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/icon_blue.svg" width="28" height="28" />',
      tabColor: "#99B5F7",
      imgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/prd_clean_blue.png",
      bgColor: "#0051FF",
      bgImgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_blue.png",
      bgImgSrcMo:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_blue_m.png",
      textColor: "#FFCA1C",
      arcColor: "#FFCA1C",
    },
    {
      nameEn: "Black",
      nameKr: "블랙",
      emoji:
        '<img src="https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/icon_black.svg" width="28" height="28" />',
      tabColor: "#FFAFB4",
      imgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/prd_clean_black.png",
      bgColor: "#FF748C",
      bgImgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_black.png",
      bgImgSrcMo:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_black_m.png",
      textColor: "#FFFFFF",
      arcColor: "#FF5774",
    },
    {
      nameEn: "Beige",
      nameKr: "베이지",
      emoji:
        '<img src="https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/icon_beige.svg" width="28" height="28" />',
      tabColor: "#99EEF4",
      imgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/prd_clean_beige.png",
      bgColor: "#00DFF8",
      bgImgSrc:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_beige.png",
      bgImgSrcMo:
        "https://ecimg.cafe24img.com/pg2374b18773352058/tablertabler/web/upload/images/hero_beige_m.png",
      textColor: "#FF71D4",
      arcColor: "#FF71D4",
    },
  ];

  /* ================================================
     🔧 설정값
  ================================================ */

  var AUTO_DELAY = 5000;
  var MO_BREAKPOINT = 1024;

  /* ================================================
     아래는 건드리지 마세요
  ================================================ */

  if (jQuery("#hero").length === 0) {
    return;
  }

  var current = 0;
  var autoTimer = null;
  var lastIndex = PRODUCTS.length - 1;
  var TAB_WIDTH = getTabWidth();
  var resizeTimer = null; // ✅ 추가됨
  var lastWidth = window.innerWidth; // ✅ 추가됨

  function getTabWidth() {
    var w = window.innerWidth;
    if (w <= 1024) {
      return 100;
    }
    if (w <= 1280) {
      return 110;
    }
    if (w <= 1440) {
      return 120;
    }
    return 130;
  }

  function isMobile() {
    return window.innerWidth <= MO_BREAKPOINT;
  }

  // ✅ Debounce 함수 추가됨
  function debounce(func, delay) {
    return function () {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(func, delay);
    };
  }

  // 탭 생성
  jQuery.each(PRODUCTS, function (i, p) {
    var btn = jQuery('<button type="button" class="color-tab"></button>');
    btn.html(
      '<div class="tab-icon">' +
        p.emoji +
        "</div>" +
        '<span class="tab-name-en">' +
        p.nameEn +
        "</span>" +
        '<span class="tab-name-kr">' +
        p.nameKr +
        "</span>",
    );
    btn.on("click", function () {
      resetAuto();
      switchTo(i);
    });
    jQuery("#colorTabs").append(btn);
  });

  function getOffset(index) {
    var wrapW = jQuery("#hero .color-tabs-wrapper").outerWidth() || 0;
    var totalW = PRODUCTS.length * TAB_WIDTH;
    var offset = wrapW / 2 - index * TAB_WIDTH - TAB_WIDTH / 2;
    var min = wrapW - totalW;
    return Math.min(0, Math.max(min, offset));
  }

  // ✅ changeBgImg 함수 개선됨
  function changeBgImg(src) {
    var $bg = jQuery("#bgImg");
    if ($bg.length === 0 || !$bg[0]) {
      return;
    }
    if (!src) {
      $bg.css("opacity", 0).removeClass("is-in is-out");
      return;
    }

    $bg.removeClass("is-in");
    $bg[0].offsetWidth;
    $bg.addClass("is-out");

    $bg.one("animationend webkitAnimationEnd", function () {
      if (!$bg[0]) return; // ✅ null 체크 추가
      $bg.removeClass("is-out").attr("src", src);
      $bg[0].offsetWidth;
      $bg.addClass("is-in");
    });
  }

  function updatePanelShadow() {
    var $panel = jQuery("#hero .product-panel");
    if (window.innerWidth <= 440) {
      $panel.removeClass("box-shadow-8").addClass("box-shadow-5");
    } else {
      $panel.removeClass("box-shadow-5").addClass("box-shadow-8");
    }

    var $arcText = jQuery("#hero .arc-text textPath");
    if (window.innerWidth <= 1024) {
      $arcText.removeClass("text-shadow-3").addClass("text-shadow-2");
    } else {
      $arcText.removeClass("text-shadow-2").addClass("text-shadow-3");
    }
  }

  function setArcPath() {
    var path = document.getElementById("arc");
    if (!path) {
      return;
    }
    var w = window.innerWidth;
    if (w <= 375) {
      path.setAttribute("d", "M 40,90  A 160,160 0 0,1 340,90");
    } else if (w <= 400) {
      path.setAttribute("d", "M 40,100 A 160,160 0 0,1 340,100");
    } else if (w <= 420) {
      path.setAttribute("d", "M 40,110 A 160,160 0 0,1 340,110");
    } else if (w <= 440) {
      path.setAttribute("d", "M 40,120 A 160,160 0 0,1 340,120");
    } else if (w <= 1024) {
      path.setAttribute("d", "M 40,130 A 160,160 0 0,1 340,130");
    } else if (w <= 1280) {
      path.setAttribute("d", "M 40,147 A 150,150 0 0,1 340,147");
    } else if (w <= 1440) {
      path.setAttribute("d", "M 40,130 A 130,130 0 0,1 340,130");
    } else {
      path.setAttribute("d", "M 40,117 A 100,100 0 0,1 340,117");
    }
  }

  function switchTo(index) {
    current = (index + PRODUCTS.length) % PRODUCTS.length;
    var p = PRODUCTS[current];

    jQuery("#hero").css("background-color", p.bgColor);

    // ✅ 화면 크기에 따라 배경 이미지 경로 선택
    var bgSrc = isMobile() ? p.bgImgSrcMo : p.bgImgSrc;
    changeBgImg(bgSrc);

    jQuery("#hero .hero-title").css({
      color: p.textColor,
      "-webkit-text-stroke-color": p.textColor,
    });
    jQuery("#hero .hero-sub, #hero .hero-tags").css("color", p.textColor);
    jQuery("#hero .arc-text textPath").css("fill", p.arcColor);
    jQuery("#hero .view-all").css("background-color", p.arcColor);

    jQuery("#productImg").addClass("fade");
    setTimeout(function () {
      jQuery("#productImg")
        .attr({ src: p.imgSrc, alt: p.nameEn })
        .removeClass("fade");
    }, 300);

    jQuery("#hero .color-tab").each(function (i) {
      if (i === current) {
        jQuery(this)
          .addClass("active")
          .css("background-color", PRODUCTS[i].tabColor);
      } else {
        jQuery(this).removeClass("active").css("background-color", "");
      }
    });

    var tabIndex = Math.min(current, lastIndex);
    jQuery("#colorTabs").css(
      "transform",
      "translateX(" + getOffset(tabIndex) + "px)",
    );
  }

  // ✅ onResize 함수 최적화됨
  function onResize() {
    var currentWidth = window.innerWidth;

    // ✅ 너비가 실제로 변경되지 않았으면 아무것도 안 함
    if (currentWidth === lastWidth) {
      return;
    }

    lastWidth = currentWidth;
    TAB_WIDTH = getTabWidth();
    updatePanelShadow();
    setArcPath();

    // 배경 이미지 교체 (데스크톱 ↔ 모바일 전환 시에만)
    var p = PRODUCTS[current];
    var bgSrc = isMobile() ? p.bgImgSrcMo : p.bgImgSrc;
    var $bg = jQuery("#bgImg");

    // ✅ 요소가 존재하고, 현재 src와 다를 때만 교체
    if ($bg.length > 0 && $bg[0] && $bg.attr("src") !== bgSrc) {
      $bg.removeClass("is-in is-out").attr("src", bgSrc);
      $bg[0].offsetWidth;
      $bg.addClass("is-in");
    }

    var tabIndex = Math.min(current, lastIndex);
    jQuery("#colorTabs").css(
      "transform",
      "translateX(" + getOffset(tabIndex) + "px)",
    );
  }

  function startAuto() {
    autoTimer = setInterval(function () {
      switchTo(current + 1);
    }, AUTO_DELAY);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  jQuery("#prevBtn").on("click", function () {
    resetAuto();
    switchTo(current - 1);
  });
  jQuery("#nextBtn").on("click", function () {
    resetAuto();
    switchTo(current + 1);
  });

  /* 히어로 패널 터치 스와이프 */
  var heroTouchStartX = 0;
  var heroTouchDiffX = 0;
  var heroPanel = document.querySelector("#hero .product-panel");
  if (heroPanel) {
    heroPanel.addEventListener(
      "touchstart",
      function (e) {
        heroTouchStartX = e.touches[0].clientX;
        heroTouchDiffX = 0;
      },
      { passive: true },
    );
    heroPanel.addEventListener(
      "touchmove",
      function (e) {
        heroTouchDiffX = e.touches[0].clientX - heroTouchStartX;
      },
      { passive: true },
    );
    heroPanel.addEventListener("touchend", function () {
      if (heroTouchDiffX < -40) {
        resetAuto();
        switchTo(current + 1);
      } else if (heroTouchDiffX > 40) {
        resetAuto();
        switchTo(current - 1);
      }
      heroTouchDiffX = 0;
    });
  }

  // ✅ Debounce 적용 (500ms 지연)
  window.addEventListener("resize", debounce(onResize, 500));

  updatePanelShadow();
  setArcPath();
  switchTo(0);
  startAuto();

  /* ─────────────────────────────────────────────
     설정값
  ───────────────────────────────────────────── */
  var AUTOPLAY_MS = 7000; /* autoplay 간격 (ms) */
  var SLIDE_DURATION = 400; /* 슬라이드 이동 애니메이션 (ms) */
  var SWIPE_THRESHOLD = 50; /* 스와이프 인식 최소 거리 (px) */

  /* 뷰포트 너비별 노출 카드 개수
     → JS가 카드 너비(%) 계산해서 CSS --card-width 변수로 주입 */
  function getPerView() {
    var w = $(window).width();
    if (w >= 1600) return 3;
    if (w >= 1024) return 2.4;
    if (w >= 550) return 1.8;
    return 1.2;
  }

  /* ─────────────────────────────────────────────
     배경 주입: data-bg-color / data-bg-img
  ───────────────────────────────────────────── */
  $(".main_image_text_gallery .gallery_item").each(function () {
    var $item = $(this);
    var bgColor = $item.data("bg-color") || "";
    var bgImg = $item.data("bg-img") || "";
    if (bgColor)
      $item.find(".gallery_card_bg").css("background-color", bgColor);
    if (bgImg)
      $item
        .find(".gallery_card_bg_img")
        .css("background-image", 'url("' + bgImg + '")');
  });

  /* ─────────────────────────────────────────────
     GallerySlider
  ───────────────────────────────────────────── */
  function GallerySlider($section) {
    this.$section = $section;
    this.$wrap = $section.find(".gallery_slider_wrap");
    this.$slider = $section.find(".gallery_slider");
    this.$list = $section.find(".gallery_list");
    this.$prev = $section.find(".js-gallery-prev");
    this.$next = $section.find(".js-gallery-next");

    /* 원본 아이템 저장 */
    this.$origItems = $section.find(".gallery_item").not(".is-clone");
    this.total = this.$origItems.length;

    /* 상태 */
    this.cur = 0; /* 실제 인덱스 (0 ~ total-1) */
    this.isMoving = false;
    this.dragging = false;
    this.startX = 0;
    this.diffX = 0;
    this.timer = null;

    this._buildClones();
    this._resize();
    this._bindEvents();
    this._startAutoplay();
  }

  GallerySlider.prototype = {
    /* ── 클론 생성 ──────────────────────────────
       앞에 total개, 뒤에 total개 클론을 붙여서
       무한 루프처럼 보이게 함
       클론된 상태에서 인덱스 기준:
         0 ~ total-1         : 앞 클론
         total ~ total*2-1   : 실제 아이템  ← cur 기준
         total*2 ~ total*3-1 : 뒤 클론
    ────────────────────────────────────────── */
    _buildClones: function () {
      var self = this;
      /* 기존 클론 제거 */
      this.$list.find(".is-clone").remove();

      /* 앞 클론 (원본을 역순으로 앞에 prepend) */
      var $frontClones = this.$origItems
        .clone()
        .addClass("is-clone")
        .attr("aria-hidden", "true");
      /* 뒤 클론 */
      var $backClones = this.$origItems
        .clone()
        .addClass("is-clone")
        .attr("aria-hidden", "true");

      this.$list.prepend($frontClones).append($backClones);

      /* 클론에도 배경 주입 */
      this.$list.find(".is-clone .gallery_item, .is-clone").each(function () {
        var $item = $(this);
        var bgColor = $item.data("bg-color") || "";
        var bgImg = $item.data("bg-img") || "";
        if (bgColor)
          $item.find(".gallery_card_bg").css("background-color", bgColor);
        if (bgImg)
          $item
            .find(".gallery_card_bg_img")
            .css("background-image", 'url("' + bgImg + '")');
      });

      /* 클론 포함 전체 아이템 캐시 */
      this.$allItems = this.$list.find(".gallery_item");
    },

    /* ── 카드 너비 계산 + CSS 변수 주입 ──────── */
    _getCardWidth: function () {
      var perView = getPerView();
      var wrapWidth = this.$wrap.width();
      return wrapWidth / perView; /* px */
    },

    /* ── 리사이즈 시 카드 너비 재계산 ────────── */
    _resize: function () {
      var cardPx = this._getCardWidth();
      var wrapW = this.$wrap.width();
      var cardPct = ((cardPx / wrapW) * 100).toFixed(4) + "%";

      /* CSS 변수로 주입 → .gallery_item 이 flex/width에 사용 */
      this.$section[0].style.setProperty("--card-width", cardPct);

      /* centered offset: 뷰포트 중앙에 cur 카드를 맞추기 위한 여백
         = (뷰포트 너비 - 카드 너비) / 2 */
      this.centerOffset = (wrapW - cardPx) / 2;

      /* transition 없이 위치 즉시 재계산 */
      this._setPos(false);
    },

    /* ── transform 위치 계산 ──────────────────
       실제 렌더 인덱스 = cur + total (앞 클론 offset)
    ────────────────────────────────────────── */
    _getTranslate: function (idx) {
      var cardPx = this._getCardWidth();
      /* 앞 클론만큼 오프셋 + centered offset 적용 */
      return -((idx + this.total) * cardPx) + this.centerOffset;
    },

    /* ── transform 적용 ───────────────────────
       animate: true → CSS transition on / false → off (순간이동)
    ────────────────────────────────────────── */
    _setPos: function (animate) {
      var tx = this._getTranslate(this.cur);
      if (animate) {
        this.$list.css({
          transition: "transform " + SLIDE_DURATION + "ms ease",
          transform: "translateX(" + tx + "px)",
        });
      } else {
        this.$list.css({
          transition: "none",
          transform: "translateX(" + tx + "px)",
        });
      }
      /* centered 카드(cur)에 is-active 부여 → CSS zoom in 트리거 */
      this._updateActive();
    },

    /* ── centered 카드에 is-active 클래스 관리 ── */
    _updateActive: function () {
      var self = this;
      /* 전체 아이템(클론 포함)에서 is-active 제거 */
      this.$allItems.removeClass("is-active");
      /* 실제 인덱스 기준: 앞 클론 total개 + cur */
      var activeIdx = this.total + this.cur;
      this.$allItems.eq(activeIdx).addClass("is-active");
      /* 앞뒤 클론 중 같은 위치도 동기화 */
      this.$allItems.eq(this.cur).addClass("is-active");
      this.$allItems.eq(this.total * 2 + this.cur).addClass("is-active");
    },

    /* ── 슬라이드 이동 ────────────────────────
       방향: +1(next) / -1(prev)
    ────────────────────────────────────────── */
    _go: function (dir) {
      if (this.isMoving) return;
      this.isMoving = true;

      this.cur += dir;
      this._setPos(true);

      var self = this;
      setTimeout(function () {
        /* 끝에 도달하면 무한루프: transition 없이 반대편 실제 위치로 순간이동 */
        if (self.cur >= self.total) {
          self.cur = 0;
          self._setPos(false);
        } else if (self.cur < 0) {
          self.cur = self.total - 1;
          self._setPos(false);
        }
        self.isMoving = false;
      }, SLIDE_DURATION);
    },

    /* ── autoplay ─────────────────────────── */
    _startAutoplay: function () {
      var self = this;
      self.timer = setInterval(function () {
        self._go(1);
      }, AUTOPLAY_MS);
    },

    /* ── 이벤트 바인딩 ─────────────────────── */
    _bindEvents: function () {
      var self = this;

      /* NAV 버튼 */
      self.$prev.on("click", function () {
        self._go(-1);
      });
      self.$next.on("click", function () {
        self._go(1);
      });

      /* 터치 / 마우스 스와이프 */
      self.$slider.on("touchstart mousedown", function (e) {
        if (self.isMoving) return;
        self.dragging = true;
        self.diffX = 0;
        self.startX = (
          e.originalEvent.touches ? e.originalEvent.touches[0] : e
        ).clientX;
        self.$list.css("transition", "none");
      });

      $(document).on("touchmove mousemove", function (e) {
        if (!self.dragging) return;
        self.diffX =
          (e.originalEvent.touches ? e.originalEvent.touches[0] : e).clientX -
          self.startX;
        /* 드래그 중 실시간 follow */
        var tx = self._getTranslate(self.cur) + self.diffX;
        self.$list.css("transform", "translateX(" + tx + "px)");
      });

      $(document).on("touchend mouseup", function () {
        if (!self.dragging) return;
        self.dragging = false;
        if (self.diffX < -SWIPE_THRESHOLD) self._go(1);
        else if (self.diffX > SWIPE_THRESHOLD) self._go(-1);
        else self._setPos(true); /* 제자리로 */
      });

      /* 리사이즈 */
      var resizeTimer;
      $(window).on("resize", function () {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          self._resize();
        }, 100);
      });
    },
  };

  /* ─────────────────────────────────────────────
     초기화
  ───────────────────────────────────────────── */
  $(".main_image_text_gallery").each(function () {
    new GallerySlider($(this));
  });

  (function () {
    const canvas = document.getElementById("pixelCanvas");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const COLORS = [
      "#FF0026",
      "#0051ff",
      "#00b38f",
      "#343637",
      "#B59E70",
      "#7A7555",
    ];
    const particles = [];

    function resize() {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }

    function createParticle() {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 10,
        size: 4 + Math.random() * 10,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        speed: 0.5 + Math.random() * 1.2,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 2,
      };
    }

    for (let i = 0; i < 30; i++) {
      const p = createParticle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    function animate() {
      resize();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p, i) => {
        p.y -= p.speed;
        p.rotation += p.rotSpeed;
        if (p.y < -20) particles[i] = createParticle();
        ctx.save();
        ctx.translate(p.x + p.size / 2, p.y + p.size / 2);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });
      requestAnimationFrame(animate);
    }

    animate();
  })();
});
