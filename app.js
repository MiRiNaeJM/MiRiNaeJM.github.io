// 모달 열고 닫는 기능 + GA 이벤트 트래킹 예시
// app.js (일부 발췌 예시)

/* 기존 모달/버튼 JS 로직은 유지하되, 추가로 사이드바 로직을 포함합니다. */

document.addEventListener('DOMContentLoaded', function () {
    // ==========================================
    // 1) 기존 모달 열고 닫는 로직 (생략) ...
    // ==========================================

    // ==========================================
    // 2) 사이드바 - 현재 섹션 표시 로직
    // ==========================================

    // (1) 모든 섹션과 사이드바 링크 요소를 가져옴
    const sections = document.querySelectorAll('section'); // hero, section-curriculum, etc.
    const navLinks = document.querySelectorAll('.side-nav a');

    // Intersection Observer 옵션
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 섹션이 30% 보이면 "활성"으로 간주
    };

    // 콜백 함수
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 현재 뷰포트에 들어온 섹션의 ID
                const id = entry.target.getAttribute('id');

                // 모든 사이드바 링크에서 active 제거
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // 링크의 href="#section-id" 가 섹션 ID와 같다면 해당 링크에 active 부여
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    // (2) 각 섹션을 옵저버로 관찰
    sections.forEach(section => {
        observer.observe(section);
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadCtaBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // "앱 다운로드" 버튼 클릭 시 모달 표시 + GA 이벤트 전송
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            // 1) 모달 표시
            if (modalOverlay) {
                modalOverlay.style.display = 'flex';
            }

            // 2) Google Analytics에 'click_download_cta' 이벤트 전송
            //    GA4 스니펫이 <head>에 존재해야 gtag 함수를 호출할 수 있음
            gtag('event', 'click_download_cta', {
                event_category: 'button',
                event_label: 'Download CTA'
            });
        });
    }

    // 모달 닫기 버튼 클릭 시 모달 닫기
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
    }

    // 모달 바깥 영역 클릭 시 닫기
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.style.display = 'none';
            }
        });
    }
    // 2) 사이드바 - 현재 섹션 표시 로직
    // ==========================================

    // (1) 모든 섹션과 사이드바 링크 요소를 가져옴
    const sections = document.querySelectorAll('section'); // hero, section-curriculum, etc.
    const navLinks = document.querySelectorAll('.side-nav a');

    // Intersection Observer 옵션
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 섹션이 30% 보이면 "활성"으로 간주
    };

    // 콜백 함수
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // 현재 뷰포트에 들어온 섹션의 ID
                const id = entry.target.getAttribute('id');

                // 모든 사이드바 링크에서 active 제거
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    // 링크의 href="#section-id" 가 섹션 ID와 같다면 해당 링크에 active 부여
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, options);

    // (2) 각 섹션을 옵저버로 관찰
    sections.forEach(section => {
        observer.observe(section);
    });

});

document.addEventListener('DOMContentLoaded', function () {
    // ======================
    // (1) 기존 모달 코드 예시 (있다면 유지)
    // ======================
    /*
    const downloadBtn = document.getElementById('downloadCtaBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');
    ...
    */

    // ======================
    // (2) 슬라이드 로직 추가
    // ======================

    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('slidePrevBtn');
    const nextBtn = document.getElementById('slideNextBtn');

    let currentIndex = 0;
    const totalSlides = slides.length;
    const changeSlide = (newIndex) => {
        // 1) 모든 슬라이드 숨김
        slides.forEach(slide => slide.classList.remove('active'));

        // 2) 새 인덱스 적용 (순환되도록 모듈로)
        currentIndex = (newIndex + totalSlides) % totalSlides;

        // 3) 해당 슬라이드 표시
        slides[currentIndex].classList.add('active');
    };

    // 초기 표시
    changeSlide(currentIndex);

    // 화살표 클릭
    prevBtn.addEventListener('click', () => {
        changeSlide(currentIndex - 1);
    });
    nextBtn.addEventListener('click', () => {
        changeSlide(currentIndex + 1);
    });

    // 10초마다 자동전환
    setInterval(() => {
        changeSlide(currentIndex + 1);
    }, 10000); // 10000ms = 10초

    // ======================
    // (3) 기타 GA 이벤트 추적, etc.
    // ======================
    // 예: CTA 버튼 클릭 GA 이벤트
    const downloadCtaButton = document.getElementById('downloadCtaBtn');
    if (downloadCtaButton) {
        downloadCtaButton.addEventListener('click', () => {
            // 구글 애널리틱스 이벤트 예시
            gtag('event', 'click_download_cta', {
                event_category: 'button',
                event_label: 'Wide CTA Bottom'
            });
        });
    }
});
