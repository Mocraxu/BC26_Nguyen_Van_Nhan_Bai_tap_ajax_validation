function Validation() {

    //Chứa các phương thức kiểm tra hợp lệ
    this.kiemTraRong = function (value, selectorError, name) {
        //Xử lý không hợp lệ
        //.trim(): loại bỏ khoảng trắng đầu và cuối chuỗi
        if (value.trim() === '') {
            document.querySelector(selectorError).innerHTML = name + ' không được bỏ trống !';
            return false;
        }
        //Xử lý hợp lệ
        document.querySelector(selectorError).innerHTML = '';
        return true;
    }

    this.kiemTraKyTu = function (value, selectorError, name) {
        var regexAllLetter = /^[A-Z a-z]+$/;
        //Xử lý hợp lệ
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' tất cả phải là ký tự!';
        return false;

    }
    this.kiemTraMaNV = function (value, selectorError, name) {
        var regexAllLetter = /^[0-9]{4,6}$/;
        //Xử lý hợp lệ
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' bao gồm từ 4-6 số';
        return false;
    }

    this.kiemTraLuongNV = function (value, selectorError, name) {
        var regexAllLetter = /^(100000\d|10000[1-9]\d|1000[1-9]\d{2}|100[1-9]\d{3}|10[1-9]\d{4}|1[1-9]\d{5}|[2-9]\d{6}|1\d{7}|20000000)$/;
        //Xử lý hợp lệ
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' từ 1.000.000 tới 20.000.000';
        return false;
    }

    this.kiemTraSoGioLamNV = function (value, selectorError, name) {
        var regexAllLetter = /^(5\d|[6-9]\d|1[0-4]\d|150)$/;
        //Xử lý hợp lệ
        if (regexAllLetter.test(value)) {
            document.querySelector(selectorError).innerHTML = '';
            return true;
        }

        document.querySelector(selectorError).innerHTML = name + ' của nhân viên phải từ 50 - 150 giờ';
        return false;
    }

}