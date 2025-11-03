import React, { useState, useEffect } from 'react';
import { AiTool, SavedContent } from '../types';
import * as geminiService from '../services/geminiService';
import Card from './ui/Card';
import Spinner from './ui/Spinner';
import { SparklesIcon, DocumentTextIcon, PencilAltIcon, ChatAlt2Icon, ClipboardCopyIcon, BookmarkIcon, TrashIcon } from './icons';

const AiAssistant: React.FC = () => {
  const [activeTool, setActiveTool] = useState<AiTool>(AiTool.LessonPlan);
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'generator' | 'saved'>('generator');
  const [savedContents, setSavedContents] = useState<SavedContent[]>([]);

  // Form states
  const [lessonPlanTopic, setLessonPlanTopic] = useState('조선시대의 사회와 문화');
  const [lessonPlanGrade, setLessonPlanGrade] = useState('고등학교 1학년');
  const [lessonPlanDuration, setLessonPlanDuration] = useState('50분');

  const [quizTopic, setQuizTopic] = useState('식물의 광합성');
  const [quizNumQuestions, setQuizNumQuestions] = useState(5);
  const [quizType, setQuizType] = useState('객관식 4지선다형');

  const [parentCommStudent, setParentCommStudent] = useState('김철수');
  const [parentCommContext, setParentCommContext] = useState('최근 수업 태도가 매우 좋아지고 과제 제출을 성실하게 하고 있어 칭찬하고 싶습니다.');
  const [parentCommTone, setParentCommTone] = useState('긍정적이고 격려하는 톤');

  const [reportType, setReportType] = useState('2024년 1학기 과학 동아리 활동 결과 보고서');
  const [reportKeyPoints, setReportKeyPoints] = useState('활동 목표: 과학적 탐구 능력 및 협업 능력 신장\n주요 활동: 매주 1회 실험 진행 (산염기 적정, DNA 추출 등), 과학 탐구 토론회 개최, 교내 과학 축제 부스 운영\n성과: 전국 과학 탐구 대회 동상 수상, 참여 학생들의 과학 교과 성적 평균 5점 향상');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('smartTeacherLounge-savedContent');
      if (stored) {
        setSavedContents(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load saved content from localStorage", error);
    }
  }, []);

  const handleGenerate = async () => {
    setIsLoading(true);
    setOutput('');
    let result = '';
    try {
      switch (activeTool) {
        case AiTool.LessonPlan:
          result = await geminiService.generateLessonPlan(lessonPlanTopic, lessonPlanGrade, lessonPlanDuration);
          break;
        case AiTool.QuizMaker:
          result = await geminiService.generateQuiz(quizTopic, quizNumQuestions, quizType);
          break;
        case AiTool.ParentComm:
          result = await geminiService.draftParentCommunication(parentCommStudent, parentCommContext, parentCommTone);
          break;
        case AiTool.ReportDrafter:
          result = await geminiService.draftReport(reportType, reportKeyPoints);
          break;
      }
    } catch (error) {
        result = "오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
    } finally {
        setOutput(result);
        setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  
  const handleSave = () => {
    if (!output) return;

    let inputs = {};
    switch (activeTool) {
      case AiTool.LessonPlan:
        inputs = { lessonPlanTopic, lessonPlanGrade, lessonPlanDuration };
        break;
      case AiTool.QuizMaker:
        inputs = { quizTopic, quizNumQuestions, quizType };
        break;
      case AiTool.ParentComm:
        inputs = { parentCommStudent, parentCommContext, parentCommTone };
        break;
      case AiTool.ReportDrafter:
        inputs = { reportType, reportKeyPoints };
        break;
    }

    const newContent: SavedContent = {
      id: Date.now().toString(),
      tool: activeTool,
      inputs,
      output,
      createdAt: new Date().toISOString(),
    };

    const updatedContents = [newContent, ...savedContents];
    setSavedContents(updatedContents);
    localStorage.setItem('smartTeacherLounge-savedContent', JSON.stringify(updatedContents));
    alert('성공적으로 저장되었습니다.');
  };

  const handleDelete = (id: string) => {
    if (window.confirm('정말로 삭제하시겠습니까?')) {
      const updatedContents = savedContents.filter(item => item.id !== id);
      setSavedContents(updatedContents);
      localStorage.setItem('smartTeacherLounge-savedContent', JSON.stringify(updatedContents));
    }
  };
  
  const handleLoad = (content: SavedContent) => {
    setActiveTool(content.tool);
    setOutput(content.output);

    switch (content.tool) {
      case AiTool.LessonPlan:
        setLessonPlanTopic(content.inputs.lessonPlanTopic);
        setLessonPlanGrade(content.inputs.lessonPlanGrade);
        setLessonPlanDuration(content.inputs.lessonPlanDuration);
        break;
      case AiTool.QuizMaker:
        setQuizTopic(content.inputs.quizTopic);
        setQuizNumQuestions(content.inputs.quizNumQuestions);
        setQuizType(content.inputs.quizType);
        break;
      case AiTool.ParentComm:
        setParentCommStudent(content.inputs.parentCommStudent);
        setParentCommContext(content.inputs.parentCommContext);
        setParentCommTone(content.inputs.parentCommTone);
        break;
      case AiTool.ReportDrafter:
        setReportType(content.inputs.reportType);
        setReportKeyPoints(content.inputs.reportKeyPoints);
        break;
    }
    setView('generator');
  };

  const tools = [
    { id: AiTool.LessonPlan, name: '수업 지도안 생성', icon: <DocumentTextIcon className="h-5 w-5 mr-2" />},
    { id: AiTool.QuizMaker, name: '퀴즈 문제 생성', icon: <PencilAltIcon className="h-5 w-5 mr-2" />},
    { id: AiTool.ParentComm, name: '가정통신문 작성', icon: <ChatAlt2Icon className="h-5 w-5 mr-2" />},
    { id: AiTool.ReportDrafter, name: '업무 보고서 초안', icon: <ClipboardCopyIcon className="h-5 w-5 mr-2" />},
  ];

  const getToolName = (tool: AiTool) => tools.find(t => t.id === tool)?.name || '알 수 없는 도구';

  const getTitleForSavedContent = (item: SavedContent) => {
    switch (item.tool) {
        case AiTool.LessonPlan: return item.inputs.lessonPlanTopic;
        case AiTool.QuizMaker: return item.inputs.quizTopic;
        case AiTool.ParentComm: return `${item.inputs.parentCommStudent} 학부모 대상`;
        case AiTool.ReportDrafter: return item.inputs.reportType;
        default: return '제목 없음';
    }
  };

  const renderToolForm = () => {
    switch (activeTool) {
      case AiTool.LessonPlan:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="수업 주제" value={lessonPlanTopic} onChange={e => setLessonPlanTopic(e.target.value)} className="w-full p-2 border rounded-md" />
            <input type="text" placeholder="대상 학년" value={lessonPlanGrade} onChange={e => setLessonPlanGrade(e.target.value)} className="w-full p-2 border rounded-md" />
            <input type="text" placeholder="수업 시간" value={lessonPlanDuration} onChange={e => setLessonPlanDuration(e.target.value)} className="w-full p-2 border rounded-md" />
          </div>
        );
      case AiTool.QuizMaker:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="퀴즈 주제" value={quizTopic} onChange={e => setQuizTopic(e.target.value)} className="w-full p-2 border rounded-md" />
            <div className="flex space-x-4">
                <input type="number" placeholder="문항 수" value={quizNumQuestions} onChange={e => setQuizNumQuestions(parseInt(e.target.value))} className="w-1/2 p-2 border rounded-md" />
                <select value={quizType} onChange={e => setQuizType(e.target.value)} className="w-1/2 p-2 border rounded-md bg-white">
                    <option>객관식 4지선다형</option>
                    <option>단답형</option>
                    <option>서술형</option>
                </select>
            </div>
          </div>
        );
      case AiTool.ParentComm:
        return (
          <div className="space-y-4">
            <input type="text" placeholder="학생 이름" value={parentCommStudent} onChange={e => setParentCommStudent(e.target.value)} className="w-full p-2 border rounded-md" />
            <textarea placeholder="전달할 내용" value={parentCommContext} onChange={e => setParentCommContext(e.target.value)} rows={4} className="w-full p-2 border rounded-md" />
            <select value={parentCommTone} onChange={e => setParentCommTone(e.target.value)} className="w-full p-2 border rounded-md bg-white">
                <option>긍정적이고 격려하는 톤</option>
                <option>중립적이고 정보 전달적인 톤</option>
                <option>신중하고 우려를 표현하는 톤</option>
            </select>
          </div>
        );
      case AiTool.ReportDrafter:
        return (
            <div className="space-y-4">
              <input type="text" placeholder="보고서 종류" value={reportType} onChange={e => setReportType(e.target.value)} className="w-full p-2 border rounded-md" />
              <textarea placeholder="핵심 내용 (개조식으로 작성)" value={reportKeyPoints} onChange={e => setReportKeyPoints(e.target.value)} rows={5} className="w-full p-2 border rounded-md" />
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center justify-center">
                <SparklesIcon className="h-8 w-8 text-indigo-500 mr-2" />
                AI 비서
            </h1>
            <p className="text-gray-500 mt-2">단순 반복적인 업무는 AI에게 맡기고, 선생님은 학생들에게 더 집중하세요.</p>
        </div>
        
        <div className="flex border-b">
            <button onClick={() => setView('generator')} className={`px-4 py-2 text-sm sm:text-base font-semibold transition-colors ${view === 'generator' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}>
                AI 도구
            </button>
            <button onClick={() => setView('saved')} className={`px-4 py-2 text-sm sm:text-base font-semibold transition-colors ${view === 'saved' ? 'border-b-2 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-600'}`}>
                저장된 콘텐츠 ({savedContents.length})
            </button>
        </div>

        {view === 'generator' && (
            <div className="flex flex-col lg:flex-row gap-6 animate-fade-in">
                <div className="lg:w-1/3">
                    <Card>
                        <h3 className="text-lg font-semibold mb-4">도구 선택</h3>
                        <div className="flex flex-wrap gap-2">
                            {tools.map(tool => (
                                <button
                                    key={tool.id}
                                    onClick={() => setActiveTool(tool.id)}
                                    className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${activeTool === tool.id ? 'bg-indigo-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                                >
                                    {tool.icon}
                                    {tool.name}
                                </button>
                            ))}
                        </div>
                        <hr className="my-6" />
                        {renderToolForm()}
                        <button
                            onClick={handleGenerate}
                            disabled={isLoading}
                            className="w-full mt-6 bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-indigo-300 flex items-center justify-center transition-colors"
                        >
                            {isLoading ? <Spinner /> : '생성하기'}
                        </button>
                    </Card>
                </div>
                <div className="lg:w-2/3">
                    <Card className="h-full">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-semibold">생성 결과</h3>
                            {output && (
                               <div className="flex items-center gap-2">
                                    <button onClick={handleSave} className="text-sm bg-indigo-100 text-indigo-700 px-3 py-1 rounded-md hover:bg-indigo-200 flex items-center gap-1.5 transition-colors">
                                        <BookmarkIcon className="h-4 w-4" />
                                        저장하기
                                    </button>
                                   <button onClick={handleCopy} className="text-sm bg-gray-200 px-3 py-1 rounded-md hover:bg-gray-300 transition-colors">
                                   {copied ? '복사 완료!' : '본문 복사'}
                                 </button>
                               </div>
                            )}
                        </div>
                        <div className="bg-gray-50 p-4 rounded-md h-[calc(100%-2.5rem)] overflow-y-auto prose prose-sm max-w-none">
                            {isLoading ? (
                                <div className="flex items-center justify-center h-full">
                                    <Spinner />
                                    <span className="ml-2 text-gray-500">AI가 열심히 작업 중입니다...</span>
                                </div>
                            ) : output ? (
                                <pre className="whitespace-pre-wrap text-sm text-gray-800 font-sans bg-transparent p-0 m-0">{output}</pre>
                            ) : (
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    왼쪽에 필요한 정보를 입력하고 생성하기 버튼을 눌러주세요.
                                </div>
                            )}
                        </div>
                    </Card>
                </div>
            </div>
        )}

        {view === 'saved' && (
            <div className="animate-fade-in">
                {savedContents.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedContents.map(item => (
                        <Card key={item.id} className="flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-semibold text-indigo-600 bg-indigo-100 px-2 py-1 rounded-full">{getToolName(item.tool)}</span>
                            <h4 className="font-bold text-lg mt-2 truncate">{getTitleForSavedContent(item)}</h4>
                            <p className="text-sm text-gray-500 mt-1">{new Date(item.createdAt).toLocaleString('ko-KR')}</p>
                            <p className="text-sm text-gray-600 mt-3 h-20 overflow-hidden text-ellipsis line-clamp-4">{item.output}</p>
                        </div>
                        <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                            <button onClick={() => handleLoad(item)} className="text-sm bg-gray-200 text-gray-800 px-3 py-1.5 rounded-md hover:bg-gray-300 transition-colors">불러오기</button>
                            <button onClick={() => handleDelete(item.id)} className="text-red-500 hover:text-red-700 p-1.5 rounded-md hover:bg-red-50 transition-colors" aria-label="삭제">
                                <TrashIcon className="h-5 w-5"/>
                            </button>
                        </div>
                        </Card>
                    ))}
                    </div>
                ) : (
                    <Card className="text-center py-16">
                        <h3 className="text-lg font-semibold text-gray-700">저장된 콘텐츠가 없습니다.</h3>
                        <p className="text-gray-500 text-sm mt-2">AI 도구 탭에서 생성한 결과를 저장하여<br/>언제든지 다시 사용해보세요.</p>
                    </Card>
                )}
            </div>
        )}
    </div>
  );
};

export default AiAssistant;
