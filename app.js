// app.js

document.addEventListener('DOMContentLoaded', function () {
    /**
     * -----------------------------------------------------------
     * (A) 모달 열고 닫기 (필요 시 유지 or 주석 처리)
     * -----------------------------------------------------------
     */
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // 닫기 버튼 클릭 시 모달 닫기
    if (closeModalBtn && modalOverlay) {
        closeModalBtn.addEventListener('click', () => {
            modalOverlay.style.display = 'none';
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

    /**
     * -----------------------------------------------------------
     * (B) 버튼 클릭 시 alert + GA 이벤트 전송
     * -----------------------------------------------------------
     */
    // 1) 스토어 다운로드 버튼 (예: id="storeDownloadBtn")
    const storeButtons = document.querySelectorAll('.store-button');
    storeButtons.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault(); // href="#" 기본 이동 방지
            alert("개발중인 기능입니다!\n" +
                "랜딩페이지를 흥미있게 보셨다면 " +
                "아랫쪽 구글폼으로 설문해 주시면 감사하겠습니다.");
            gtag('event', 'click_download_cta', {
                event_category: 'button',
                event_label: 'Download CTA_1'
            });
        });
    });

    // 2) 앱 다운로드 버튼 (예: id="downloadCtaBtn")
    const downloadBtn = document.getElementById('downloadCtaBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function (event) {
            event.preventDefault(); // 혹시 모를 기본 동작 방지
            alert("개발중인 기능입니다!\n" +
                "랜딩페이지를 흥미있게 보셨다면 " +
                "아랫쪽 구글폼으로 설문해 주시면 감사하겠습니다.");

            // GA 이벤트 추적
            gtag('event', 'click_download_cta', {
                event_category: 'button',
                event_label: 'Download CTA_2'
            });
        });
    }

    /**
     * -----------------------------------------------------------
     * (C) 사이드바 - 현재 섹션 강조 (Intersection Observer)
     * -----------------------------------------------------------
     */
    const sections = document.querySelectorAll('section');       // hero, section-curriculum 등
    const navLinks = document.querySelectorAll('.side-nav a');  // 사이드바 링크

    const sideNavOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3 // 섹션이 30% 이상 보이면 활성화
    };

    const sideNavObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, sideNavOptions);

    sections.forEach(section => {
        sideNavObserver.observe(section);
    });

    /**
     * -----------------------------------------------------------
     * (D) 슬라이드 쇼 로직 (hero 슬라이드 등)
     * -----------------------------------------------------------
     */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('slidePrevBtn');
    const nextBtn = document.getElementById('slideNextBtn');

    if (slides.length > 0) {
        let currentIndex = 0;
        const totalSlides = slides.length;

        const changeSlide = (newIndex) => {
            // 모든 슬라이드 숨김
            slides.forEach(slide => slide.classList.remove('active'));

            // 순환 방식으로 인덱스 계산
            currentIndex = (newIndex + totalSlides) % totalSlides;

            // 현재 슬라이드만 표시
            slides[currentIndex].classList.add('active');
        };

        // 초기 표시
        changeSlide(currentIndex);

        // 화살표 클릭
        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                changeSlide(currentIndex - 1);
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                changeSlide(currentIndex + 1);
            });
        }

        // 10초마다 자동전환
        setInterval(() => {
            changeSlide(currentIndex + 1);
        }, 10000);
    }

    /**
     * -----------------------------------------------------------
     * (E) 오른쪽 하단 고정 CTA 버튼 (구글 폼 링크)
     * -----------------------------------------------------------
     */
    const floatingCta = document.getElementById('floatingCtaBtn');
    if (floatingCta) {
        floatingCta.addEventListener('click', () => {
            // 새 탭으로 구글 폼 열기
            window.open('https://forms.gle/n8t3WWwKp5VVW29U6', '_blank');

            // GA 이벤트 전송
            gtag('event', 'click_landingpage_evaluation', {
                event_category: 'cta',
                event_label: '구글 폼 이동'
            });
        });
    }

    /**
     * -----------------------------------------------------------
     * (F) 본문 1번 섹션: 체험해 보기 토글
     * -----------------------------------------------------------
     */
    const toggleBtn = document.getElementById('toggleExperienceBtn');
    const experienceContent = document.getElementById('experienceContent');

    if (toggleBtn && experienceContent) {
        toggleBtn.addEventListener('click', () => {
            if (experienceContent.style.display === 'none') {
                experienceContent.style.display = 'block';
            } else {
                experienceContent.style.display = 'none';
            }
        });
    }
});
