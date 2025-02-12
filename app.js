// 모달 열고 닫는 기능 + GA 이벤트 트래킹 예시
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
});
