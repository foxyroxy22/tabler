/** 오우이_JS 210806 **/
jQuery(document).ready(function () {
  /* 메인 상품 슬라이드 */
  var special_slide = new Swiper(".special_slide", {
    slidesPerView: "auto",
    spaceBetween: 20,
    observer: true,
    observeParents: true,
    speed: 700,
    watchOverflow: "true",
    preloadImages: false,
    lazy: {
      loadPrevNext: true,
    },
    scrollbar: {
      el: ".swiper-scrollbar",
      hide: false,
      draggable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next-special_slide",
      prevEl: ".swiper-button-prev-special_slide",
    },
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    breakpoints: {
      768: {
        slidesPerView: "auto",
        spaceBetween: 10,
      },
    },
  });

  /* 메인 탭카테고리 */
  jQuery(".main_product_tab li").bind("click", function () {
    jQuery(this).parent().find("li button").removeClass("active");
    jQuery(this)
      .parents(".main_product_category")
      .find(".content_list .tabcontent")
      .removeClass("active");
    jQuery("button", this).addClass("active");
    var activeTab = jQuery("button", this).attr("data-id");
    jQuery(this)
      .parents(".main_product_category")
      .find(".content_list .tabcontent" + "#" + activeTab)
      .addClass("active");
  });
  jQuery(
    ".main_product_category .main_product_inner .main_product_tab li button, .content_list .tabcontent"
  ).removeClass("active"); // 나머지 탭 숨김
  jQuery(
    ".main_product_category .main_product_inner .main_product_tab li:first-child button, .content_list .tabcontent:first-child"
  ).addClass("active"); // 첫번째 탭 오픈

  /* 메인 텍스트배너 링크 없을시 영역삭제 */
  jQuery(".main_text_link").each(function () {
    var text_none = jQuery("a", this).text();
    if (text_none == "") {
      jQuery(this).hide();
    }
  });

  EZST.register("image-gallery/2", function () {
    return {
      connect: connect,
      change: change,
    };

    /**
     * 섹션이 추가되는 경우 / 페이지로딩시 검색되는 섹션도 개념상 추가로 간주
     * @param  {HTMLElement} section 섹션 최상위 요소
     * @param  {string} type 타입
     * @returns void
     */
    function connect(section, type) {
      _reset(section, type);
    }

    /**
     * 섹션 설정 변경 하위 추가 또는 삭제등의 변경사항이 생긴 경우
     * @param  {HTMLElement} section 섹션 최상위 요소
     * @param  {string} type 타입
     * @returns void
     */
    function change(section, type) {
      _reset(section, type);
    }

    /**
     * 각 섹션 최상위 요소(.section)를 기준으로 기능을 재 초기화 합니다.
     * @param  {HTMLElement} section 섹션 최상위 요소
     * @param  {string} type 타입
     * @returns void
     */
    function _reset(section, type) {
      // 섹션 초기화 처리
      /* 메인 텍스트갤러리배너 노출설정보다 배너가 적을때 중앙정렬 */
      jQuery(section)
        .find(".main_3dan_banner ul")
        .each(function () {
          var grid_num = parseInt(
            jQuery(section).find("[data-ez-column]").attr("data-ez-column"),
            10
          ); //설정한 노출개수
          var li_num = parseInt(
            jQuery(section).attr("data-ez-item-length"),
            10
          ); //등록된 아이템 개수

          if (
            !document.documentElement.classList.contains(
              "ez-view-type-mobile"
            ) &&
            grid_num > li_num
          ) {
            // 모바일일때
            jQuery(this).css("justify-content", "center");
            jQuery("li", this).css("flex", "1");
          } else {
            jQuery(this).css("justify-content", "");
            jQuery("li", this).css("flex", "");
          }

          if (grid_num == "4") {
            // 설정한 노출 개수가 4개일때
            if (li_num >= grid_num) {
              // 등록한 아이템 개수가 노출개수보다 많을때
              jQuery(this).addClass("fs_medium");
            }
          }

          if (grid_num == "5") {
            // 설정한 노출 개수가 5개일때
            if (li_num >= grid_num) {
              // 등록한 아이템 개수가 노출개수보다 많을때
              jQuery(this).addClass("fs_small");
            } else if (li_num == "4") {
              jQuery(this).addClass("fs_medium");
            }
          }

          if (li_num < "4") {
            // 배너가 4개 미만이면 더보기 버튼 숨김
            jQuery(this)
              .parent(".main_3dan_banner")
              .find(".main_image_text_gallery_more")
              .hide();
          }
          if (li_num == "1") {
            // 배너가 1장일때
            jQuery("li a picture img", this).css("width", "100%");
            jQuery("li", this).css("width", "100%");
          }
        });
      /* 메인 텍스트갤러리배너 더보기 */
      jQuery(section)
        .find(".main_image_text_gallery_more_btn")
        .on("click", function (event) {
          jQuery(section).find("ul li").show().animate({ opacity: 1 });
          jQuery(this).parent().hide();
        });
    }
  });

  //custom js
  // 변수 설정
  var $productItems = $(".hero-prds ul li");
  var $shadowItems = $(".hero-shadow li");
  var $tabButtons = $(".hero-tab ul li");
  var bgColors = ["#ff5001", "#00A0EA", "#E70012", "#FFD202"];
  var $tablerHero = $("#tabler-hero");

  // 애니메이션 시간 설정
  var ANIMATION_DURATION = 1500;
  var cleanupTimer = null; // 정리 타이머 저장

  // 1. 초기 제품 상태 설정 - 모든 제품 명시적 초기화
  $productItems.each(function () {
    $(this).css({
      display: "none",
      opacity: 0,
      transform: "translate(100vw, 50vh) scale(0.8)",
    });
    $(this).find(".prds-img").css({
      transform: "translate(0, 0) scale(1)",
    });
    $(this).find(".prds-txt").css("opacity", 0);
  });

  // 첫 번째 제품만 활성화
  $productItems
    .eq(0)
    .css({
      display: "block",
      opacity: 1,
      transform: "translate(-50%, 80px) scale(1)",
    })
    .addClass("active");

  $productItems.eq(0).find(".prds-txt").css("opacity", 1);
  $shadowItems.hide().eq(0).fadeIn();
  $tabButtons.eq(0).find("span").css("border", "2px solid #000");

  // 섀도우 배경색 설정
  $shadowItems.eq(0).css("background", "#E24500");
  $shadowItems.eq(1).css("background", "#0084C0");
  $shadowItems.eq(2).css("background", "#C90010");
  $shadowItems.eq(3).css("background", "#E5BD02");

  // 탭 클릭 이벤트
  $tabButtons.click(function () {
    var $this = $(this);
    var index = $this.index();
    var $currentProduct = $productItems.filter(".active");
    var $nextProduct = $productItems.eq(index);

    // 1. 같은 탭 클릭 시 무시
    if ($currentProduct.is($nextProduct)) return;

    // ⭐ 2. 이전 정리 타이머가 있으면 취소하고 즉시 정리
    if (cleanupTimer) {
      clearTimeout(cleanupTimer);
      // 모든 out-left 요소 즉시 정리
      $productItems.filter(".out-left").each(function () {
        $(this).removeClass("out-left active").hide();
        $(this).attr("style", "");
        $(this).css({
          display: "none",
          opacity: "0",
          transform: "translate(100vw, 50vh) scale(0.8)",
        });
        $(this).find(".prds-img").attr("style", "");
        $(this).find(".prds-img").css({
          transform: "translate(0, 0) scale(1)",
        });
      });
    }

    // --- 비주얼 전환 로직 ---
    $tabButtons.find("span").css("border", "none");
    $this.find("span").css("border", "2px solid #000");
    $tablerHero.css("background-color", bgColors[index]);

    // 섀도우 전환
    $shadowItems.stop(true, false).fadeOut(300, function () {
      $shadowItems.eq(index).fadeIn(400);
    });

    // 3. --- OUT 애니메이션 (기존 제품) - requestAnimationFrame으로 즉시 시작 ---
    $currentProduct.removeClass("active");
    $currentProduct.find(".prds-txt").css("opacity", 0);

    // ⭐ transition을 none으로 초기화
    $currentProduct.find(".prds-img").css({
      transition: "none",
      transform: "translate(0, 0) scale(1)",
    });

    // ⭐ requestAnimationFrame으로 브라우저 다음 프레임에 실행
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $currentProduct.find(".prds-img").css({
          transition: "transform 0.9s cubic-bezier(0.65, 0, 0.35, 1)",
          transform: "translate(-150vw, 50vh) scale(0.8)",
        });
      });
    });

    $currentProduct.addClass("out-left");

    // 4. --- IN 애니메이션 (새 제품) ---

    // A. 새 li 컨테이너 초기 위치 설정
    $nextProduct.css({
      display: "block",
      transition: "none",
      opacity: 0,
      transform: "translate(100vw, 50vh) scale(0.8)",
    });

    // B. 새 이미지의 초기 상태 설정
    $nextProduct.find(".prds-img").css({
      transition: "none",
      transform: "translate(0, 0) scale(1)",
    });

    // C. 텍스트 초기 상태 설정
    $nextProduct.find(".prds-txt").css("opacity", 0);

    // D. requestAnimationFrame으로 IN 애니메이션도 동기화
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        $nextProduct.css({
          transition: "opacity 0.4s, transform 0.4s",
          opacity: 1,
          transform: "translate(-50%, 80px) scale(1)",
        });

        $nextProduct
          .find(".prds-img")
          .css("transition", "transform 1.5s cubic-bezier(0.65, 0, 0.35, 1)");
      });
    });

    $nextProduct.addClass("active");

    // E. 텍스트 Fade In
    setTimeout(function () {
      $nextProduct.find(".prds-txt").css("opacity", 1);
    }, 400);

    // 5. --- 애니메이션 완료 후 정리 ---
    cleanupTimer = setTimeout(function () {
      // 나간 요소 완전 초기화
      $currentProduct.removeClass("out-left active").hide();

      $currentProduct.attr("style", "");
      $currentProduct.css({
        display: "none",
        opacity: "0",
        transform: "translate(100vw, 50vh) scale(0.8)",
      });

      $currentProduct.find(".prds-img").attr("style", "");
      $currentProduct.find(".prds-img").css({
        transform: "translate(0, 0) scale(1)",
      });

      cleanupTimer = null;
    }, ANIMATION_DURATION + 100);
  });

  /* --- BG Text Wipe Up Animation --- */
  var $bgTxtImgs = $(".bg-txt img");

  // 텍스트 이미지 Wipe Up 애니메이션 실행
  $bgTxtImgs.each(function (index) {
    // 텍스트 순서대로 200ms 간격으로 애니메이션 시작
    // bind(this) 대신 화살표 함수와 $()를 사용하여 this 참조 오류를 방지합니다.
    var $img = $(this);
    setTimeout(function () {
      $img.addClass("show-up");
    }, index * 350 + 0);
  });
});
