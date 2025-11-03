
import React, { useState } from 'react';
import { Resource } from '../types';
import Card from './ui/Card';
import { SearchIcon, UploadIcon, DocumentDownloadIcon, FilterIcon } from './icons';

const mockResources: Resource[] = [
    { id: 1, title: '고1 국어 고전시가 완벽정리', type: '수업자료', subject: '국어', grade: '고1', uploader: '박서준 선생님', date: '2024-07-28' },
    { id: 2, title: '수행평가 결과보고서 양식', type: '행정서식', subject: '공통', grade: '공통', uploader: '이수진 선생님', date: '2024-07-27' },
    { id: 3, title: '중2 수학 피타고라스 정리 PPT', type: '수업자료', subject: '수학', grade: '중2', uploader: '최지우 선생님', date: '2024-07-27' },
    { id: 4, 'title': 'AI 활용 수업 디자인 연수 자료', type: '연수자료', subject: '정보', grade: '공통', uploader: '김민준 선생님', date: '2024-07-25' },
    { id: 5, 'title': '초6 사회 민주주의의 발전과 시민 참여', type: '수업자료', subject: '사회', grade: '초6', uploader: '정유미 선생님', date: '2024-07-24' },
    { id: 6, 'title': '체험학습 신청서 및 결과보고서 통합 양식', type: '행정서식', subject: '공통', grade: '공통', uploader: '이수진 선생님', date: '2024-07-22' },
];


const ResourceHub: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    
    const filteredResources = mockResources.filter(res => 
        res.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
        res.uploader.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="space-y-6">
             <div>
                <h1 className="text-3xl font-bold text-gray-800">자료실</h1>
                <p className="text-gray-500 mt-1">동료 교사들과의 집단 지성으로 더 나은 수업을 만들어보세요.</p>
            </div>
            
            <Card>
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-4">
                    <div className="relative w-full md:w-auto flex-1">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <SearchIcon className="h-5 w-5 text-gray-400"/>
                        </span>
                        <input
                            type="text"
                            placeholder="제목, 과목, 올린이 검색"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border rounded-md"
                        />
                    </div>
                    <div className="flex items-center gap-2">
                         <button className="flex items-center bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-50">
                            <FilterIcon className="h-5 w-5 mr-2" />
                            필터
                        </button>
                        <button className="flex items-center bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                            <UploadIcon className="h-5 w-5 mr-2" />
                            자료 올리기
                        </button>
                    </div>
                </div>
                
                <div className="overflow-x-auto">
                    <table className="min-w-full bg-white">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">제목</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">유형</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">과목</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">학년</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">올린이</th>
                                <th className="py-3 px-6 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">등록일</th>
                                <th className="py-3 px-6 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">다운로드</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200">
                            {filteredResources.map(res => (
                                <tr key={res.id} className="hover:bg-gray-50">
                                    <td className="py-4 px-6 whitespace-nowrap text-sm font-medium text-gray-900">{res.title}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{res.type}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{res.subject}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{res.grade}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{res.uploader}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-gray-500">{res.date}</td>
                                    <td className="py-4 px-6 whitespace-nowrap text-sm text-center">
                                        <button className="text-indigo-600 hover:text-indigo-900">
                                            <DocumentDownloadIcon className="h-6 w-6 mx-auto" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default ResourceHub;
