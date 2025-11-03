
import React, { useState } from 'react';
import { Announcement } from '../types';
import Card from './ui/Card';

const mockAnnouncements: Announcement[] = [
    { id: 1, title: '[긴급] 원격수업 전환 안내', date: '2024-07-29', category: '긴급', author: '교무부장', content: '기상 악화로 인해 내일(7/30)은 전학년 원격수업으로 전환됩니다. 각 학년별 수업 시간표는 별도 공지될 예정입니다.' },
    { id: 2, title: '[행정] 2학기 방과후학교 수강 신청 안내', date: '2024-07-28', category: '행정', author: '방과후담당', content: '2학기 방과후학교 수강 신청 기간은 8월 1일부터 8월 5일까지입니다. 자세한 내용은 가정통신문을 참고해주시기 바랍니다.' },
    { id: 3, title: '[교수학습] AI 활용 수업 디자인 직무 연수 안내', date: '2024-07-27', category: '교수학습', author: '정보부장', content: '교원 역량 강화를 위한 AI 활용 수업 디자인 연수가 8월 10일에 본교 컴퓨터실에서 진행됩니다. 희망하시는 선생님께서는 신청해주시기 바랍니다.' },
    { id: 4, title: '[행정] 교내 주차장 통제 안내 (7/31)', date: '2024-07-26', category: '행정', author: '행정실장', content: '학교 시설 공사로 인해 7월 31일(수) 하루 동안 교내 주차장 이용이 통제됩니다. 양해 부탁드립니다.' },
    { id: 5, title: '[교수학습] 2학기 교과 협의회 일정 안내', date: '2024-07-25', category: '교수학습', author: '연구부장', content: '2학기 교육과정 운영을 위한 교과 협의회가 8월 22일에 진행될 예정입니다. 상세 일정은 추후 공지하겠습니다.' },
];

const Announcements: React.FC = () => {
    const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | null>(mockAnnouncements[0]);

    const getCategoryClass = (category: '긴급' | '행정' | '교수학습') => {
        switch (category) {
            case '긴급': return 'bg-red-100 text-red-800';
            case '행정': return 'bg-blue-100 text-blue-800';
            case '교수학습': return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">공지사항</h1>
                <p className="text-gray-500 mt-1">학교의 중요한 소식을 빠짐없이 확인하세요.</p>
            </div>
            <div className="flex flex-col md:flex-row gap-6 h-[calc(100vh-12rem)]">
                <div className="md:w-1/3 h-full">
                    <Card className="h-full flex flex-col">
                        <h3 className="text-lg font-semibold mb-4">공지 목록</h3>
                        <ul className="divide-y divide-gray-200 overflow-y-auto flex-1">
                            {mockAnnouncements.map(ann => (
                                <li 
                                    key={ann.id} 
                                    onClick={() => setSelectedAnnouncement(ann)}
                                    className={`p-3 cursor-pointer rounded-md ${selectedAnnouncement?.id === ann.id ? 'bg-indigo-100' : 'hover:bg-gray-50'}`}
                                >
                                    <div className="flex justify-between items-center text-sm mb-1">
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${getCategoryClass(ann.category)}`}>{ann.category}</span>
                                        <span className="text-gray-400">{ann.date}</span>
                                    </div>
                                    <p className={`font-medium ${selectedAnnouncement?.id === ann.id ? 'text-indigo-700' : 'text-gray-800'}`}>{ann.title}</p>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>
                <div className="md:w-2/3 h-full">
                    <Card className="h-full flex flex-col">
                         {selectedAnnouncement ? (
                            <>
                                <div className="border-b pb-4 mb-4">
                                    <span className={`px-2.5 py-1 rounded-full text-sm font-semibold ${getCategoryClass(selectedAnnouncement.category)}`}>
                                        {selectedAnnouncement.category}
                                    </span>
                                    <h2 className="text-2xl font-bold mt-3">{selectedAnnouncement.title}</h2>
                                    <div className="text-sm text-gray-500 mt-2">
                                        <span>작성자: {selectedAnnouncement.author}</span> | <span>작성일: {selectedAnnouncement.date}</span>
                                    </div>
                                </div>
                                <div className="flex-1 overflow-y-auto">
                                    <p className="text-gray-700 whitespace-pre-line leading-relaxed">{selectedAnnouncement.content}</p>
                                </div>
                            </>
                         ) : (
                            <div className="flex items-center justify-center h-full text-gray-400">
                                목록에서 공지사항을 선택해주세요.
                            </div>
                         )}
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Announcements;
