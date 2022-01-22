

let validator = new Validation();

function getAPIData() {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayDanhSachNhanVien',
        method: 'GET',
    });

    //định nghĩa gọi api thành công:
    promise.then(function (result) {
        console.log('result', result.data);
        renderTable(result.data)

    });
    //định nghĩa gọi api thất bại:
    promise.catch(function (error) {
        console.log('error', error);
    })

}
getAPIData();

//tạo hàm hiển thị danh sách nhân viên
function renderTable(mangNhanVien) {
    var rsContent = '';
    for (let nhanVien of mangNhanVien) {
        rsContent += `
        <tr>
            <td>${nhanVien.maNhanVien}</td>
            <td>${nhanVien.tenNhanVien}</td>
            <td>${nhanVien.luongCoBan}</td>
            <td>${nhanVien.soGioLamTrongThang}</td>
            <td>${nhanVien.chucVu}</td>
            <td style="width:200px">
                <a href="#home" class="btn btn-primary" onclick="suaNhanVien('${nhanVien.maNhanVien}')">Sửa</a>
                <button class="btn btn-danger" onclick="xoaNhanVien('${nhanVien.maNhanVien}')">Xoá</button>
            </td>
        `
    }
    document.querySelector('tbody').innerHTML = rsContent;
}


//tạo chức năng thêm nhân viên:
document.querySelector("#btnThemNhanVien").onclick = function () {
    //lấy thông tin người dùng nhập vào
    let nhanVien = new NhanVien();
    nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
    nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
    nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
    nhanVien.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
    nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
    nhanVien.chucVu = infoChucVu();

    //thực hiện lệnh kiểm tra cú pháp người dùng nhập vào
    var valid = true;

    //kiểm tra người dùng có nhập vào hay không
    valid &= validator.kiemTraRong(nhanVien.maNhanVien, '#error_required_maNhanVien', 'Mã nhân viên ') & validator.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên ') & validator.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCB', 'Lương cơ bản ') & validator.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_gioLam', 'Số giờ làm ');

    //kiểm tra tính hợp lệ của dữ liệu người dùng nhập vào:

    valid &= validator.kiemTraMaNV(nhanVien.maNhanVien, '#error_number_maNhanVien', 'Mã nhân viên ') & validator.kiemTraKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên chứa ') & validator.kiemTraLuongNV(nhanVien.luongCoBan, '#error_number_luongCB', 'Lương cơ bản ') & validator.kiemTraSoGioLamNV(nhanVien.soGioLamTrongThang, '#error_number_gioLam', 'Số giờ làm');

    if (!valid) {
        return;
    }


    //dùng axios gọi API thêm nhân viên
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/ThemNhanVien',
        method: 'POST',
        data: nhanVien
    })

    //tạo thông tin  báo nếu gọi axios và thêm thành công
    promise.then(function (result) {
        console.log('result', result.data);
        getAPIData();
    })

    //tạo thông tin báo nếu gọi axios và thêm thất bại
    promise.catch(function (err) {
        console.log('error', err.response.data);
    })


}

//tạo chức năng chỉnh sửa thông tin nhân viên:

function suaNhanVien(maNhanVienClick) {

    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/LayThongTinNhanVien?maNhanVien=' + maNhanVienClick,
        method: 'GET'
    })
    //gọi api thành công
    promise.then(function (result) {
        let nhanVien = result.data;

        document.querySelector("#maNhanVien").value = nhanVien.maNhanVien;
        document.querySelector("#tenNhanVien").value = nhanVien.tenNhanVien;
        document.querySelector("#luongCoBan").value = nhanVien.luongCoBan;
        document.querySelector("#soGioLamTrongThang").value = nhanVien.soGioLamTrongThang;
        document.querySelector("#chucVu").value = nhanVien.heSoChucVu;
        document.querySelector("#maNhanVien").disable = true;
        nhanVien.chucVu = infoChucVu();
    })

    //gọi api thất bại
    promise.catch(function (err) {
        console.log('err', err.response.data);
    })

}

//tạo chức năng cập nhật nhân viên:
document.querySelector('#btnCapNhatThongTin').onclick = function () {

    let nhanVien = new NhanVien();
    //lấy thông tin cập nhật gán vào nhanVien
    nhanVien.maNhanVien = document.querySelector("#maNhanVien").value;
    nhanVien.tenNhanVien = document.querySelector("#tenNhanVien").value;
    nhanVien.luongCoBan = document.querySelector("#luongCoBan").value;
    nhanVien.soGioLamTrongThang = document.querySelector("#soGioLamTrongThang").value;
    nhanVien.heSoChucVu = document.querySelector("#chucVu").value;
    nhanVien.chucVu = infoChucVu();

    //thực hiện lệnh kiểm tra cú pháp người dùng nhập vào
    var valid = true;

    //kiểm tra người dùng có nhập vào hay không
    valid &= validator.kiemTraRong(nhanVien.tenNhanVien, '#error_required_tenNhanVien', 'Tên nhân viên ') & validator.kiemTraRong(nhanVien.luongCoBan, '#error_required_luongCB', 'Lương cơ bản ') & validator.kiemTraRong(nhanVien.soGioLamTrongThang, '#error_required_gioLam', 'Số giờ làm ');

    //kiểm tra tính hợp lệ của dữ liệu người dùng nhập vào:

    valid &= validator.kiemTraMaNV(nhanVien.maNhanVien, '#error_number_maNhanVien', 'Mã nhân viên ') & validator.kiemTraKyTu(nhanVien.tenNhanVien, '#error_allLetter_tenNhanVien', 'Tên nhân viên chứa ') & validator.kiemTraLuongNV(nhanVien.luongCoBan, '#error_number_luongCB', 'Lương cơ bản ') & validator.kiemTraSoGioLamNV(nhanVien.soGioLamTrongThang, '#error_number_gioLam', 'Số giờ làm');

    if (!valid) {
        return;
    }


    //gọi api cập nhật thông tin nhân viên
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/CapNhatThongTinNhanVien?maNhanVien=' + nhanVien.maNhanVien,
        method: 'PUT',
        data: nhanVien
    });

    //gọi thành công:
    promise.then(function (result) {
        window.location.reload();
    })

    //gọi thất bại:
    promise.catch(function (err) {
        console.log('err', err.response.data);
    })




}

//tạo chức năng xóa nhân viên:
function xoaNhanVien(maNhanVienClick) {
    var promise = axios({
        url: 'http://svcy.myclass.vn/api/QuanLyNhanVienApi/XoaNhanVien?maSinhVien=' + maNhanVienClick,
        method: 'DELETE',
    })

    //thành công:
    promise.then(function (result) {
        getAPIData();
    })

    //gọi API thất bại:
    promise.catch(function (err) {
        console.log("err", err.response.data);
    })
}


//tạo hàm lấy thông tin chức vụ
function infoChucVu() {
    let selectChucVu = document.querySelector("#chucVu");                   //tạo mảng chứa các thông tin của tag option
    let arrTagOption = selectChucVu.options;                                //lấy các thẻ option con của mảng selectChucVu
    let indexOptionSelected = selectChucVu.selectedIndex;                   //lấy index của thẻ option được chọn
    let rsChucVu = '';
    rsChucVu = arrTagOption[indexOptionSelected].innerHTML;
    return rsChucVu;
}

