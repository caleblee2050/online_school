
import React, { useState } from 'react';
import Card from './ui/Card';

const Calendar: React.FC = () => {
    const [currentDate, setCurrentDate] = useState(new Date(2024, 6, 29)); // July 29, 2024

    const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = (year: number, month: number) => new Date(year, month, 1).getDay();

    const monthNames = ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"];
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const numDays = daysInMonth(year, month);
        const firstDay = firstDayOfMonth(year, month);
        
        const blanks = Array(firstDay).fill(null);
        const days = Array.from({ length: numDays }, (_, i) => i + 1);
        
        const events = {
            15: { text: '여름방학식', color: 'bg-green-500' },
            29: { text: '개학, 2학기 시작', color: 'bg-blue-500' },
            30: { text: '원격수업', color: 'bg-red-500' },
        };
        
        const allCells = [...blanks, ...days].map((day, index) => (
            <div key={index} className={`p-2 border border-gray-200 h-24 flex flex-col ${day ? 'bg-white' : 'bg-gray-50'}`}>
                {day && <span className="font-semibold">{day}</span>}
                {day && events[day] && (
                    <div className={`mt-1 text-xs text-white p-1 rounded-md ${events[day].color}`}>
                        {events[day].text}
                    </div>
                )}
            </div>
        ));
        
        return allCells;
    };

    const changeMonth = (delta: number) => {
        setCurrentDate(prev => {
            const newDate = new Date(prev);
            newDate.setMonth(newDate.getMonth() + delta);
            return newDate;
        });
    };
    
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold text-gray-800">학사일정</h1>
                <p className="text-gray-500 mt-1">월별 주요 학사일정을 확인하세요.</p>
            </div>
            <Card>
                <div className="flex justify-between items-center mb-4">
                    <button onClick={() => changeMonth(-1)} className="px-3 py-1 border rounded-md hover:bg-gray-100">&lt;</button>
                    <h2 className="text-2xl font-bold">{currentDate.getFullYear()}년 {monthNames[currentDate.getMonth()]}</h2>
                    <button onClick={() => changeMonth(1)} className="px-3 py-1 border rounded-md hover:bg-gray-100">&gt;</button>
                </div>
                <div className="grid grid-cols-7 gap-px bg-gray-200">
                    {dayNames.map(day => (
                        <div key={day} className="text-center font-bold p-2 bg-gray-100">{day}</div>
                    ))}
                    {renderCalendar()}
                </div>
            </Card>
        </div>
    );
};

export default Calendar;
