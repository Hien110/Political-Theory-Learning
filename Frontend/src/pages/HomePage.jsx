import React from 'react'
import Header from '../components/Header'

function HomePage() {
  return (
    <div className="min-h-screen">
        {/* Marquee Section */}
      <div className="bg-yellow-500 text-red-900 py-1 overflow-hidden whitespace-nowrap fixed top-20 w-full z-0">
        <div className="animate-marquee font-medium flex space-x-12 px-4">
          <span>
            Học tập và làm theo tư tưởng, đạo đức, phong cách Hồ Chí Minh
          </span>
          <span>Nâng cao nhận thức lý luận chính trị</span>
          <span>Rèn luyện bản lĩnh chính trị vững vàng</span>
        </div>
      </div>
      <main class="container mx-auto px-4 py-16">
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 text-red-800">Các Môn Học Lý Luận Chính Trị</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div class="subject-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-2xl cursor-pointer ">
                    <div class="bg-blue-800 text-white p-4">
                        <h3 class="text-xl font-bold">Triết học Mác – Lênin</h3>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-blue-100 text-blue-800 p-3 rounded-full mr-4">
                                <i class="fas fa-brain text-2xl"></i>
                            </div>
                            <p class="text-gray-700">Nghiên cứu thế giới quan và phương pháp luận khoa học</p>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mb-4">
                            <span><i class="fas fa-book mr-1"></i> 15 chương</span>
                            <span><i class="fas fa-question mr-1"></i> 200+ câu hỏi</span>
                            <span><i class="fas fa-tasks mr-1"></i> 10 bài test</span>
                        </div>
                        <a href="#" class="block text-center bg-blue-100 hover:bg-blue-200 text-blue-800 font-medium py-2 rounded-lg transition duration-300">
                            Xem chi tiết <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
                
                <div class="subject-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                    <div class="bg-green-800 text-white p-4">
                        <h3 class="text-xl font-bold">Kinh tế chính trị Mác – Lênin</h3>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-green-100 text-green-800 p-3 rounded-full mr-4">
                                <i class="fas fa-chart-line text-2xl"></i>
                            </div>
                            <p class="text-gray-700">Nghiên cứu các quy luật kinh tế của xã hội</p>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mb-4">
                            <span><i class="fas fa-book mr-1"></i> 12 chương</span>
                            <span><i class="fas fa-question mr-1"></i> 180+ câu hỏi</span>
                            <span><i class="fas fa-tasks mr-1"></i> 8 bài test</span>
                        </div>
                        <a href="#" class="block text-center bg-green-100 hover:bg-green-200 text-green-800 font-medium py-2 rounded-lg transition duration-300">
                            Xem chi tiết <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
                
                <div class="subject-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                    <div class="bg-red-800 text-white p-4">
                        <h3 class="text-xl font-bold">Lịch sử Đảng Cộng sản Việt Nam</h3>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-red-100 text-red-800 p-3 rounded-full mr-4">
                                <i class="fas fa-history text-2xl"></i>
                            </div>
                            <p class="text-gray-700">Nghiên cứu quá trình hình thành và phát triển của Đảng</p>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mb-4">
                            <span><i class="fas fa-book mr-1"></i> 10 chương</span>
                            <span><i class="fas fa-question mr-1"></i> 150+ câu hỏi</span>
                            <span><i class="fas fa-tasks mr-1"></i> 7 bài test</span>
                        </div>
                        <a href="#" class="block text-center bg-red-100 hover:bg-red-200 text-red-800 font-medium py-2 rounded-lg transition duration-300">
                            Xem chi tiết <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
                
                <div class="subject-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                    <div class="bg-purple-800 text-white p-4">
                        <h3 class="text-xl font-bold">Chủ nghĩa Xã hội Khoa học</h3>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-purple-100 text-purple-800 p-3 rounded-full mr-4">
                                <i class="fas fa-users text-2xl"></i>
                            </div>
                            <p class="text-gray-700">Nghiên cứu về xã hội chủ nghĩa và cộng sản chủ nghĩa</p>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mb-4">
                            <span><i class="fas fa-book mr-1"></i> 8 chương</span>
                            <span><i class="fas fa-question mr-1"></i> 120+ câu hỏi</span>
                            <span><i class="fas fa-tasks mr-1"></i> 6 bài test</span>
                        </div>
                        <a href="#" class="block text-center bg-purple-100 hover:bg-purple-200 text-purple-800 font-medium py-2 rounded-lg transition duration-300">
                            Xem chi tiết <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
                
                <div class="subject-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                    <div class="bg-yellow-600 text-white p-4">
                        <h3 class="text-xl font-bold">Tư tưởng Hồ Chí Minh</h3>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-yellow-100 text-yellow-800 p-3 rounded-full mr-4">
                                <i class="fas fa-lightbulb text-2xl"></i>
                            </div>
                            <p class="text-gray-700">Nghiên cứu hệ thống tư tưởng của Chủ tịch Hồ Chí Minh</p>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mb-4">
                            <span><i class="fas fa-book mr-1"></i> 7 chương</span>
                            <span><i class="fas fa-question mr-1"></i> 100+ câu hỏi</span>
                            <span><i class="fas fa-tasks mr-1"></i> 5 bài test</span>
                        </div>
                        <a href="#" class="block text-center bg-yellow-100 hover:bg-yellow-200 text-yellow-800 font-medium py-2 rounded-lg transition duration-300">
                            Xem chi tiết <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
                
                <div class="subject-card bg-white rounded-lg shadow-md overflow-hidden transition duration-300">
                    <div class="bg-gray-800 text-white p-4">
                        <h3 class="text-xl font-bold">Tổng hợp tất cả môn học</h3>
                    </div>
                    <div class="p-6">
                        <div class="flex items-center mb-4">
                            <div class="bg-gray-100 text-gray-800 p-3 rounded-full mr-4">
                                <i class="fas fa-graduation-cap text-2xl"></i>
                            </div>
                            <p class="text-gray-700">Tài liệu tổng hợp và ôn tập tất cả các môn học</p>
                        </div>
                        <div class="flex justify-between text-sm text-gray-600 mb-4">
                            <span><i class="fas fa-book mr-1"></i> 52 chương</span>
                            <span><i class="fas fa-question mr-1"></i> 750+ câu hỏi</span>
                            <span><i class="fas fa-tasks mr-1"></i> 36 bài test</span>
                        </div>
                        <a href="#" class="block text-center bg-gray-100 hover:bg-gray-200 text-gray-800 font-medium py-2 rounded-lg transition duration-300">
                            Xem chi tiết <i class="fas fa-arrow-right ml-1"></i>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        
        <section class="mb-16">
            <h2 class="text-3xl font-bold text-center mb-12 text-red-800">Tính Năng Nổi Bật</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <div class="bg-blue-100 text-blue-800 p-4 rounded-full inline-block mb-4">
                        <i class="fas fa-book-open text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Tài liệu học tập</h3>
                    <p class="text-gray-700">Hệ thống tài liệu đầy đủ, chính xác, được biên soạn bởi các chuyên gia</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <div class="bg-green-100 text-green-800 p-4 rounded-full inline-block mb-4">
                        <i class="fas fa-question-circle text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Câu hỏi ôn tập</h3>
                    <p class="text-gray-700">Hàng trăm câu hỏi tự luận có đáp án chi tiết giúp củng cố kiến thức</p>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-md text-center">
                    <div class="bg-red-100 text-red-800 p-4 rounded-full inline-block mb-4">
                        <i class="fas fa-tasks text-3xl"></i>
                    </div>
                    <h3 class="text-xl font-bold mb-2">Bài kiểm tra</h3>
                    <p class="text-gray-700">Hệ thống bài kiểm tra trắc nghiệm đa dạng với chấm điểm tự động</p>
                </div>
            </div>
        </section>
        
        <section class="mb-16 bg-red-50 rounded-lg p-8">
            <h2 class="text-3xl font-bold text-center mb-12 text-red-800">Nhận Xét Của Người Học</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex items-center mb-4">
                        <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Người dùng" class="w-12 h-12 rounded-full mr-4"/>
                        <div>
                            <h4 class="font-bold">Nguyễn Thị Hương</h4>
                            <p class="text-gray-600 text-sm">Sinh viên Đại học KHXH&NV</p>
                        </div>
                    </div>
                    <p class="text-gray-700">"Trang web giúp mình hệ thống kiến thức rõ ràng, dễ hiểu. Các câu hỏi ôn tập rất sát với chương trình học."</p>
                    <div class="mt-3 text-yellow-500">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                    </div>
                </div>
                
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <div class="flex items-center mb-4">
                        <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Người dùng" class="w-12 h-12 rounded-full mr-4"/>
                        <div>
                            <h4 class="font-bold">Trần Văn Minh</h4>
                            <p class="text-gray-600 text-sm">Cán bộ Đoàn</p>
                        </div>
                    </div>
                    <p class="text-gray-700">"Tôi thường xuyên sử dụng trang web để ôn tập và chuẩn bị cho các kỳ thi lý luận chính trị. Giao diện thân thiện, nội dung chất lượng."</p>
                    <div class="mt-3 text-yellow-500">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                </div>
            </div>
        </section>
    </main>
    </div>
  )
}

export default HomePage
