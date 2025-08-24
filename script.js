// Inisialisasi variabel
    let currentToken = localStorage.getItem('anbkToken') || "....";
    let sessionName = localStorage.getItem('sessionName') || "Sesi 1";
    let participantCount = parseInt(localStorage.getItem('participantCount')) || 25;

    // Fungsi update token
    function updateToken() {
      const tokenDisplay = document.getElementById('tokenDisplay');
      tokenDisplay.textContent = '';
      
      // Efek ketik
      let i = 0;
      const text = currentToken;
      tokenDisplay.classList.add('typing');
      
      const typing = setInterval(() => {
        if (i < text.length) {
          tokenDisplay.textContent += text.charAt(i);
          i++;
        } else {
          clearInterval(typing);
          tokenDisplay.classList.remove('typing');
        }
      }, 100);

      // Simpan ke localStorage
      localStorage.setItem('anbkToken', currentToken);
    }

    // Fungsi update tags
    function updateTags() {
      document.getElementById('sessionTag').textContent = sessionName;
      document.getElementById('participantCount').textContent = participantCount;
    }

    // Fungsi buka modal
    function openAddModal() {
      document.getElementById('addModal').style.display = 'flex';
      document.getElementById('newTokenInput').value = '';
      setTimeout(() => document.getElementById('newTokenInput').focus(), 300);
    }

    // Fungsi tutup modal
    function closeAddModal() {
      document.getElementById('addModal').style.display = 'none';
    }

    // Fungsi simpan token
    function saveToken() {
      const newToken = document.getElementById('newTokenInput').value.trim().toUpperCase();
      
      // Validasi input
      if (!newToken) {
        alert("Token tidak boleh kosong!");
        return;
      }
      
      if (newToken.length < 4 || newToken.length > 10) {
        alert("Token harus 4-10 karakter!");
        return;
      }
      
      if (!/^[A-Z0-9]+$/.test(newToken)) {
        alert("Token hanya boleh huruf besar dan angka!");
        return;
      }

      currentToken = newToken;
      updateToken();
      closeAddModal();
    }

    // Fungsi tampilkan konfirmasi reset
    function showConfirmReset() {
      document.getElementById('confirmModal').style.display = 'flex';
    }

    // Fungsi tutup konfirmasi
    function closeConfirmModal() {
      document.getElementById('confirmModal').style.display = 'none';
    }

    // Fungsi reset token
    function resetToken() {
      currentToken = "....";
      updateToken();
      closeConfirmModal();
    }

    // Fungsi set tanggal Indonesia
    function setIndonesianDate() {
      const hari = ["Minggu","Senin","Selasa","Rabu","Kamis","Jumat","Sabtu"];
      const bulan = [
        "Januari","Februari","Maret","April","Mei","Juni",
        "Juli","Agustus","September","Oktober","November","Desember"
      ];
      
      function updateClock() {
        const now = new Date();
        const tgl = `${hari[now.getDay()]}, ${now.getDate()} ${bulan[now.getMonth()]} ${now.getFullYear()} | Jam ${String(now.getHours()).padStart(2, '0')}.${String(now.getMinutes()).padStart(2, '0')}.${String(now.getSeconds()).padStart(2, '0')}`;
        document.getElementById('dateDisplay').textContent = tgl;
      }
      
      updateClock();
      setInterval(updateClock, 1000);
    }

    // Fungsi fullscreen
    function toggleFullscreen() {
      const btn = document.getElementById('fullscreenBtn');
      const icon = btn.querySelector('i');
      
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        icon.classList.remove('fa-expand');
        icon.classList.add('fa-compress');
        document.body.classList.add('fullscreen');
      } else {
        document.exitFullscreen();
        icon.classList.remove('fa-compress');
        icon.classList.add('fa-expand');
        document.body.classList.remove('fullscreen');
      }
    }

    // Fungsi salin token
    function copyToken() {
      if (currentToken === "....") {
        alert("Belum ada token untuk disalin!");
        return;
      }
      
      navigator.clipboard.writeText(currentToken).then(() => {
        const btn = document.getElementById('copyTokenBtn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-check"></i> Disalin!';
        
        setTimeout(() => {
          btn.innerHTML = originalText;
        }, 2000);
      }).catch(err => {
        console.error('Gagal menyalin: ', err);
        alert('Gagal menyalin ke clipboard');
      });
    }

    // Modal logic
    function openEditTagsModal() {
      document.getElementById('editSessionInput').value = sessionName;
      document.getElementById('editParticipantInput').value = participantCount;
      document.getElementById('editTagsModal').style.display = 'flex';
    }
    function closeEditTagsModal() {
      document.getElementById('editTagsModal').style.display = 'none';
    }
    function saveTags() {
      sessionName = document.getElementById('editSessionInput').value.trim() || "Sesi 1";
      participantCount = parseInt(document.getElementById('editParticipantInput').value) || 1;
      localStorage.setItem('sessionName', sessionName);
      localStorage.setItem('participantCount', participantCount);
      updateTags();
      closeEditTagsModal();
    }

    // Event listeners
    document.getElementById('fullscreenBtn').addEventListener('click', toggleFullscreen);
    document.getElementById('copyTokenBtn').addEventListener('click', copyToken);
    document.getElementById('editTagsBtn').onclick = openEditTagsModal;

    // Tutup modal saat klik di luar
    window.onclick = function(event) {
      const addModal = document.getElementById('addModal');
      const confirmModal = document.getElementById('confirmModal');
      const editTagsModal = document.getElementById('editTagsModal');
      if (event.target === addModal) closeAddModal();
      if (event.target === confirmModal) closeConfirmModal();
      if (event.target === editTagsModal) closeEditTagsModal();
    };

    // Keyboard support
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        closeAddModal();
        closeConfirmModal();
        closeEditTagsModal();
      }
      
      if (e.key === 'Enter' && document.getElementById('addModal').style.display === 'flex') {
        saveToken();
      }
    });

    // Inisialisasi
    setIndonesianDate();
    updateToken();
    updateTags();

    // Detect fullscreen change
    document.addEventListener('fullscreenchange', () => {
      if (document.fullscreenElement) {
        document.body.classList.add('fullscreen');
      } else {
        document.body.classList.remove('fullscreen');
      }
    });