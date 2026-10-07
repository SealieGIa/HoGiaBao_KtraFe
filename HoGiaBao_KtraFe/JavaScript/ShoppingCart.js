function dinhDangTien(n) {
    return n.toFixed(2);
}

function tinhGiaTriMatHang(item) {
    var donGia = parseFloat(item.getAttribute('data-price'));
    var soLuong = parseInt(item.querySelector('.q').textContent, 10);
    var thanhTien = donGia * soLuong;
    item.querySelector('.line-total').textContent = dinhDangTien(thanhTien);
    return { soLuong: soLuong, thanhTien: thanhTien };
}

// 2) Cập nhật giỏ hàng
function capNhatGioHang() {
    var tongTrongGio = 0;   
    var soLuongChon = 0;   
    var tienChon = 0;

    var items = document.querySelectorAll('.cart .item');
    for (var i = 0; i < items.length; i++) {
        var kq = tinhGiaTriMatHang(items[i]);
        tongTrongGio += kq.soLuong;
        if (items[i].querySelector('.chk').checked) {
            soLuongChon += kq.soLuong;
            tienChon += kq.thanhTien;
        }
    }

    document.getElementById('cart-count').textContent = tongTrongGio;
    document.getElementById('sub-qty').textContent = soLuongChon;
    document.getElementById('side-qty').textContent = soLuongChon;
    document.getElementById('sub-total').textContent = dinhDangTien(tienChon);
    document.getElementById('side-total').textContent = dinhDangTien(tienChon);

    document.querySelector('.checkout').disabled = (soLuongChon === 0);

    var tatCa = document.querySelectorAll('.chk');
    var daChon = document.querySelectorAll('.chk:checked');
    document.getElementById('chk-all').checked = (tatCa.length === daChon.length);
}

document.addEventListener('click', function (e) {
    var btn = e.target.closest('button');
    if (!btn) return;
    var item = btn.closest('.item');
    if (!item) return;
    var q = item.querySelector('.q');
    var n = parseInt(q.textContent, 10);

    if (btn.classList.contains('plus')) {
        q.textContent = n + 1;
    } else if (btn.classList.contains('minus') && n > 1) {
        q.textContent = n - 1;
    } else {
        return;
    }
    capNhatGioHang();
});

document.addEventListener('change', function (e) {
    if (e.target.id === 'chk-all') {
        var ds = document.querySelectorAll('.chk');
        for (var i = 0; i < ds.length; i++) ds[i].checked = e.target.checked;
        capNhatGioHang();
    } else if (e.target.classList.contains('chk')) {
        capNhatGioHang();
    }
});

capNhatGioHang();