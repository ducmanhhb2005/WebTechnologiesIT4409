/* BÀI B — VIẾT CODE: Lọc tin và đăng tin nhanh (news.html)
   Viết code theo đặc tả.
   Không sửa news.html, không sửa css; chỉ viết JavaScript trong file này. */

// ---------- ĐÃ CHO SẴN (không sửa) ----------
// Chặn việc gửi form tìm kiếm khi nhấn Enter, để trang không bị tải lại.
document.querySelector("#searchbar form").addEventListener("submit", (e) => e.preventDefault());

// ---------- PHẦN BẠN VIẾT ----------

const oTimKiem = document.getElementById("o-tim-kiem");
const danhSachTin = document.getElementById("list");
const boDem = document.getElementById("bo-dem");
const khongThay = document.getElementById("khong-thay");
const oTieuDe = document.getElementById("tin-tieu-de");
const oNoiDung = document.getElementById("tin-noi-dung");
const nutDang = document.getElementById("nut-dang");
const baoLoi = document.getElementById("bao-loi");

// F1. Bộ đếm "Đang hiển thị x/y tin" trong #bo-dem.
function capNhatBoDem() {
	const cacTin = danhSachTin.querySelectorAll("li");
	const soHien = Array.from(cacTin).filter(tin => !tin.classList.contains("an")).length;
	boDem.textContent = `Đang hiển thị ${soHien}/${cacTin.length} tin`;
	return soHien;
}

// F2 + F3. Lọc tin khi gõ vào #o-tim-kiem (sự kiện keyup) và thông báo #khong-thay.
function locTin() {
	const tuKhoa = oTimKiem.value;
	const tuKhoaThuong = tuKhoa.toLowerCase();
	for (const tin of danhSachTin.querySelectorAll("li")) {
		const vanBan = tin.querySelector("h3").textContent + " " + tin.querySelector("p").textContent;
		const khop = vanBan.toLowerCase().includes(tuKhoaThuong);
		tin.classList.toggle("an", !khop);
	}

	const soHien = capNhatBoDem();
	khongThay.classList.toggle("an", soHien > 0);
	// Dùng textContent để từ khóa chứa thẻ HTML vẫn hiển thị nguyên văn.
	khongThay.textContent = soHien === 0 ? `Không tìm thấy tin nào cho "${tuKhoa}"` : "";
}

oTimKiem.addEventListener("keyup", locTin);

// F4. Nút "Read more >>" / "Thu gọn <<" — MỘT trình lắng nghe đặt trên #list.
danhSachTin.addEventListener("click", (e) => {
	const nut = e.target.closest("button.more");
	if (nut === null || !danhSachTin.contains(nut)) {
		return;
	}
	const tin = nut.closest("li");
	const doanVan = tin.querySelector("p");
	const dangMo = doanVan.classList.toggle("day-du");
	nut.textContent = dangMo ? "Thu gọn <<" : "Read more >>";
});

// F5. Nút #nut-dang: kiểm tra dữ liệu, tạo <li> mới, chèn vào đầu #list.
nutDang.addEventListener("click", () => {
	const tieuDe = oTieuDe.value;
	const noiDung = oNoiDung.value;
	if (tieuDe.trim() === "" || noiDung.trim() === "") {
		baoLoi.textContent = "Vui lòng nhập đủ tiêu đề và nội dung.";
		return;
	}

	const tin = document.createElement("li");
	const ngay = document.createElement("span");
	ngay.className = "time";
	ngay.textContent = homNay();
	const tenTin = document.createElement("h3");
	tenTin.textContent = tieuDe;
	const doanVan = document.createElement("p");
	doanVan.textContent = noiDung;
	const nut = document.createElement("button");
	nut.type = "button";
	nut.className = "more";
	nut.textContent = "Read more >>";
	tin.append(ngay, tenTin, doanVan, nut);
	danhSachTin.prepend(tin);

	oTieuDe.value = "";
	oNoiDung.value = "";
	baoLoi.textContent = "";
	// Áp dụng cả từ khóa hiện tại cho tin mới và cập nhật bộ đếm.
	locTin();
});

// Khởi tạo trạng thái lọc và bộ đếm ngay khi tải trang.
locTin();
