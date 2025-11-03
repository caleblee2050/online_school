
import React from 'react';
import { Page } from '../types';
import Card from './ui/Card';
import { ArrowRightIcon, CalendarIcon, SparklesIcon, DocumentTextIcon, UserGroupIcon, BellIcon } from './icons';

interface DashboardProps {
    setCurrentPage: (page: Page) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ setCurrentPage }) => {
    const quickActions = [
        {
            title: 'AI 수업자료 생성',
            description: '클릭 한 번으로 수업지도안과 퀴즈를 만드세요.',
            icon: <SparklesIcon className="h-8 w-8 text-white" />,
            color: 'bg-indigo-500',
            page: 'ai-assistant',
        },
        {
            title: '오늘의 학사일정',
            description: '교내 주요 행사와 마감일을 확인하세요.',
            icon: <CalendarIcon className="h-8 w-8 text-white" />,
            color: 'bg-green-500',
            page: 'calendar',
        },
        {
            title: '자료실 바로가기',
            description: '동료 교사들의 유용한 자료를 공유받으세요.',
            icon: <DocumentTextIcon className="h-8 w-8 text-white" />,
            color: 'bg-blue-500',
            page: 'resources',
        },
        {
            title: '최신 공지사항',
            description: '학교의 중요 소식을 놓치지 마세요.',
            icon: <BellIcon className="h-8 w-8 text-white" />,
            color: 'bg-yellow-500',
            page: 'announcements',
        }
    ] as const;

    const todaySchedule = [
        { time: '10:00 - 11:00', event: '3학년 1반 공개수업' },
        { time: '13:00 - 14:00', event: '교직원 협의회 (온라인)' },
        { time: '16:30', event: '생활기록부 마감' },
    ];

    const recentAnnouncements = [
        { title: '[긴급] 원격수업 전환 안내', date: '2024-07-29' },
        { title: '[행정] 2학기 방과후학교 신청', date: '2024-07-28' },
        { title: '[교수학습] AI 활용 연수 안내', date: '2024-07-27' },
    ];

  return (
    <div className="space-y-6">
        <div>
            <h1 className="text-2xl font-bold text-gray-800">안녕하세요, 김민준 선생님!</h1>
            <p className="text-gray-500 mt-1">오늘도 힘찬 하루 보내세요. 스마트 교무실이 함께합니다.</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map(action => (
                <div key={action.title} onClick={() => setCurrentPage(action.page)} className="cursor-pointer group">
                    <Card className="hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-start justify-between">
                            <div className={`p-3 rounded-full ${action.color}`}>
                                {action.icon}
                            </div>
                            <ArrowRightIcon className="h-6 w-6 text-gray-400 group-hover:text-indigo-600 transition-colors" />
                        </div>
                        <div className="mt-4">
                            <h3 className="text-lg font-semibold text-gray-800">{action.title}</h3>
                            <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                        </div>
                    </Card>
                </div>
            ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Today's Schedule */}
            <Card className="lg:col-span-1">
                <h3 className="text-lg font-semibold mb-4">오늘의 주요 일정</h3>
                <ul className="space-y-3">
                    {todaySchedule.map(item => (
                        <li key={item.event} className="flex items-start">
                            <div className="bg-indigo-100 text-indigo-700 text-sm font-semibold px-2 py-1 rounded-md mr-4">
                                {item.time}
                            </div>
                            <p className="text-gray-700 flex-1">{item.event}</p>
                        </li>
                    ))}
                </ul>
            </Card>

            {/* Recent Announcements */}
            <Card className="lg:col-span-2">
                <h3 className="text-lg font-semibold mb-4">최신 공지사항</h3>
                <ul className="divide-y divide-gray-200">
                    {recentAnnouncements.map(ann => (
                        <li key={ann.title} className="py-3 flex justify-between items-center">
                           <p className="text-gray-800">{ann.title}</p>
                           <span className="text-sm text-gray-400">{ann.date}</span>
                        </li>
                    ))}
                </ul>
                <div className="text-right mt-4">
                    <button onClick={() => setCurrentPage('announcements')} className="text-sm font-semibold text-indigo-600 hover:text-indigo-800">
                        더보기 &rarr;
                    </button>
                </div>
            </Card>
        </div>
    </div>
  );
};

export default Dashboard;
