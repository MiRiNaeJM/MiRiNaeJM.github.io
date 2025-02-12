// 모달을 열고 닫는 간단한 예시 코드
document.addEventListener('DOMContentLoaded', function () {
    const downloadBtn = document.getElementById('downloadCtaBtn');
    const modalOverlay = document.getElementById('modalOverlay');
    const closeModalBtn = document.getElementById('closeModalBtn');

    // "앱 다운로드" 버튼 클릭 시 모달 표시
    downloadBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'flex';
    });

    // 모달 닫기 버튼 클릭 시 모달 닫기
    closeModalBtn.addEventListener('click', () => {
        modalOverlay.style.display = 'none';
    });

    // 모달 바깥 영역 클릭 시 닫기
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            modalOverlay.style.display = 'none';
        }
    });
});
