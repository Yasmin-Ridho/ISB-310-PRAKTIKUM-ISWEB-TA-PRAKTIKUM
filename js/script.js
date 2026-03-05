// =====================================================
// GirlCult Store - script.js
// Fitur: Dark Mode (localStorage), Wishlist (sessionStorage),
//        Beli / Kurangi Stok, Form Validation
// =====================================================


// -----------------------------------------------
// 1. DARK MODE (localStorage)
// -----------------------------------------------

const btnDarkMode  = document.getElementById("btnDarkMode");
const darkModeIcon = document.getElementById("darkModeIcon");
const darkModeText = document.getElementById("darkModeText");

// Terapkan tema yang tersimpan saat halaman pertama kali dimuat
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
    applyDarkMode();
}

// Event klik untuk toggle dark/light mode
btnDarkMode.addEventListener("click", () => {
    if (document.body.classList.contains("dark-mode")) {
        applyLightMode();
        localStorage.setItem("theme", "light");
    } else {
        applyDarkMode();
        localStorage.setItem("theme", "dark");
    }
});

// Fungsi mengaktifkan dark mode
function applyDarkMode() {
    document.body.classList.add("dark-mode");
    darkModeIcon.className = "bi bi-sun-fill";
    darkModeText.textContent = "Light Mode";
}

// Fungsi menonaktifkan dark mode (kembali ke light)
function applyLightMode() {
    document.body.classList.remove("dark-mode");
    darkModeIcon.className = "bi bi-moon-fill";
    darkModeText.textContent = "Dark Mode";
}


// -----------------------------------------------
// 2. FITUR BELI - Kurangi Stok (Event & Logic)
// -----------------------------------------------

// Ambil semua tombol Beli
const tombolBeli = document.querySelectorAll(".btn-beli");

tombolBeli.forEach((tombol) => {
    tombol.addEventListener("click", () => {
        const stokId   = tombol.dataset.id;          // id elemen stok, mis. "stok-1"
        const namaProd = tombol.dataset.nama;         // nama produk dari data attribute
        const stokEl   = document.getElementById(stokId);
        let stokSaat   = parseInt(stokEl.textContent);

        // Cek apakah stok masih tersedia
        if (stokSaat <= 0) {
            alert(`Sorry, this ${namaProd} is sold out!`);
            return;
        }

        // Konfirmasi pembelian
        const konfirmasi = confirm(`Buy "${namaProd}"?\nAvailable stock: ${stokSaat - 1}`);
        if (!konfirmasi) return;

        // Kurangi stok di tampilan
        stokSaat -= 1;
        stokEl.textContent = stokSaat;

        // Nonaktifkan tombol bila stok habis
        if (stokSaat === 0) {
            tombol.disabled = true;
            tombol.textContent = "Sold Out";
        }

        alert(`✅ Successfully bought "${namaProd}"!`);
    });
});


// -----------------------------------------------
// 3. WISHLIST (sessionStorage + Modal + Badge)
// -----------------------------------------------

const wishlistBadge       = document.getElementById("wishlistBadge");
const wishlistItemsEl     = document.getElementById("wishlistItems");
const btnKosongkan        = document.getElementById("btnKosongkanWishlist");

// Ambil wishlist dari sessionStorage (array nama produk)
function getWishlist() {
    const data = sessionStorage.getItem("wishlist");
    return data ? JSON.parse(data) : [];
}

// Simpan array wishlist ke sessionStorage
function saveWishlist(arr) {
    sessionStorage.setItem("wishlist", JSON.stringify(arr));
}

// Perbarui badge angka di navbar
function updateBadge() {
    const total = getWishlist().length;
    wishlistBadge.textContent = total;
}

// Render ulang daftar item di dalam modal wishlist
function renderModalWishlist() {
    const wishlist = getWishlist();

    // Kosongkan isi ul terlebih dahulu
    wishlistItemsEl.innerHTML = "";

    if (wishlist.length === 0) {
        // Buat li kosong tanpa string concatenation panjang
        const liKosong = document.createElement("li");
        liKosong.className = "list-group-item text-muted";
        liKosong.textContent = "Your wishlist is empty.";
        wishlistItemsEl.appendChild(liKosong);
        return;
    }

    // Buat satu li per item (BONUS: tombol hapus per item)
    wishlist.forEach((namaItem, index) => {
        const li         = document.createElement("li");
        li.className     = "list-group-item d-flex justify-content-between align-items-center";

        const spanNama   = document.createElement("span");
        spanNama.textContent = namaItem;

        const btnHapus   = document.createElement("button");
        btnHapus.className   = "btn btn-sm btn-outline-danger";
        btnHapus.textContent = "Remove";

        // Event hapus item spesifik (fitur bonus)
        btnHapus.addEventListener("click", () => {
            hapusItemWishlist(index);
        });

        li.appendChild(spanNama);
        li.appendChild(btnHapus);
        wishlistItemsEl.appendChild(li);
    });
}

// Hapus satu item berdasarkan index (BONUS)
function hapusItemWishlist(index) {
    const wishlist = getWishlist();
    wishlist.splice(index, 1);
    saveWishlist(wishlist);
    renderModalWishlist();
    updateBadge();
}

// Event tombol Tambah ke Wishlist di setiap card
const tombolWishlist = document.querySelectorAll(".btn-wishlist");

tombolWishlist.forEach((tombol) => {
    tombol.addEventListener("click", () => {
        const namaItem = tombol.dataset.nama;
        const wishlist = getWishlist();

        // Cek apakah item sudah ada di wishlist
        if (wishlist.includes(namaItem)) {
            alert(`"${namaItem}" already exists in your wishlist.`);
            return;
        }

        // Tambahkan item ke wishlist dan simpan
        wishlist.push(namaItem);
        saveWishlist(wishlist);
        updateBadge();
        alert(`❤️ "${namaItem}" Succesfully added to your wishlist!`);
    });
});

// Event tombol Kosongkan semua wishlist
btnKosongkan.addEventListener("click", () => {
    sessionStorage.removeItem("wishlist");
    renderModalWishlist();
    updateBadge();
});

// Render ulang modal setiap kali modal dibuka
const modalWishlistEl = document.getElementById("modalWishlist");
modalWishlistEl.addEventListener("show.bs.modal", () => {
    renderModalWishlist();
});

// Inisialisasi badge saat halaman dimuat
updateBadge();

