
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateLessonPlan = async (topic: string, grade: string, duration: string): Promise<string> => {
  const prompt = `
    다음 정보를 바탕으로 초중고 교사를 위한 상세한 수업 지도안을 작성해 주세요. 전문적이고 체계적인 형식으로, 창의적인 활동을 포함해 주세요. 출력은 마크다운 형식으로 보기 좋게 정리해 주세요.

    - 수업 주제: ${topic}
    - 대상 학년: ${grade}
    - 수업 시간: ${duration}

    포함할 내용:
    1.  **수업 목표 (학습 목표)**: 학생들이 이 수업을 통해 무엇을 배우고 할 수 있게 될 것인지 명확하게 제시 (3가지 이상)
    2.  **준비물**: 교사 및 학생 준비물 목록
    3.  **수업 단계별 활동**:
        *   **도입 (Introduction)**: 학생들의 흥미를 유발하고 학습 동기를 부여하는 활동 (예: 질문, 영상, 간단한 퀴즈)
        *   **전개 (Development)**: 핵심 개념 설명, 탐구 활동, 모둠 활동, 토론 등 구체적인 활동 내용과 예상 소요 시간 포함
        *   **정리 (Wrap-up)**: 학습 내용 정리 및 확인, 과제 제시, 차시 예고 등
    4.  **평가 계획**: 수업 중 학생들의 이해도를 파악할 수 있는 형성 평가 방법
    5.  **판서 계획 (선택 사항)**: 칠판이나 슬라이드에 기록할 핵심 내용 요약
    `;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating lesson plan:", error);
    return "수업 지도안 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};

export const generateQuiz = async (topic: string, numQuestions: number, questionType: string): Promise<string> => {
  const prompt = `
    다음 주제에 대한 ${questionType} 퀴즈를 ${numQuestions}문제 만들어 주세요. 정답과 간단한 해설을 포함해 주세요. 학생들의 사고력을 자극할 수 있는 다양한 난이도의 문제를 포함해 주세요. 출력은 마크다운 형식으로 보기 좋게 정리해 주세요.

    - 주제: ${topic}
    - 문항 수: ${numQuestions}
    - 문제 유형: ${questionType}

    형식 예시:
    **1번 문제.** [문제 내용]
    1. 보기 1
    2. 보기 2
    3. 보기 3
    4. 보기 4

    - **정답**: 3
    - **해설**: [간단한 해설]
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating quiz:", error);
    return "퀴즈 생성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};

export const draftParentCommunication = async (studentName: string, context: string, tone: string): Promise<string> => {
  const prompt = `
    초중고 교사로서 학부모에게 보낼 가정통신문 또는 알림장 메시지의 초안을 작성해 주세요. 정중하고 전문적인 표현을 사용하되, 선택한 톤을 반영해 주세요.

    - 학생 이름: ${studentName}
    - 전달할 내용: ${context}
    - 메시지 톤: ${tone}

    요구사항:
    - 명확하고 간결하게 작성
    - 긍정적이고 협력적인 관계를 유지하는 표현 사용
    - 학부모님이 궁금해할 만한 사항을 예측하여 선제적으로 안내
    - 마무리 인사 포함
    `;
    
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error drafting parent communication:", error);
    return "가정통신문 초안 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};

export const draftReport = async (reportType: string, keyPoints: string): Promise<string> => {
  const prompt = `
    초중고 교사를 위한 공식 행정 문서 초안을 작성해 주세요. 개조식으로 명확하게, 전문 용어를 적절히 사용하여 작성해 주세요.

    - 문서 종류: ${reportType} (예: 학교 행사 결과 보고서, 동아리 활동 보고서, 연수 결과 보고서)
    - 포함될 핵심 내용: ${keyPoints}

    작성 형식:
    1.  **개요**
        - 목적
        - 기간 및 장소
        - 참여 대상
    2.  **주요 내용**
        - (핵심 내용을 바탕으로 세부 항목 구성)
    3.  **결과 및 성과**
        - (정량적, 정성적 성과 기술)
    4.  **제언 및 개선 방안**
        - (향후 활동을 위한 제언)
    `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error drafting report:", error);
    return "보고서 초안 작성 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.";
  }
};
