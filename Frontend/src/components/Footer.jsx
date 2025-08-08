import React from "react";

function Footer() {
  return (
    <footer className="bg-red-500 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Tri thức Lý Luận Chính Trị</h3>
            <p className="mb-4 text-sm">
              Hệ thống tài liệu, câu hỏi và bài kiểm tra cho các môn học lý luận
              chính trị
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-yellow-300">
                <i className="fab fa-facebook-f text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <i className="fab fa-youtube text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-yellow-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Liên kết nhanh</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-yellow-300">
                  Trang chủ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Tài liệu học tập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Câu hỏi ôn tập
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Bài kiểm tra
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Môn học</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Triết học Mác – Lênin
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Kinh tế chính trị
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Lịch sử Đảng
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Chủ nghĩa XH Khoa học
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-yellow-300">
                  Tư tưởng Hồ Chí Minh
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Liên hệ</h4>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start">
                <i className="fas fa-map-marker-alt mt-1 mr-2"></i>
                <span>123 Đường ABC, Quận 1, TP.HCM</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-phone-alt mr-2"></i>
                <span>0123 456 789</span>
              </li>
              <li className="flex items-center">
                <i className="fas fa-envelope mr-2"></i>
                <span>info@onlaptructuyen.edu.vn</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-red-800 pt-6 text-center">
          <p>&copy; 2025 MiiHii. Good luck with your studies!</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
