// frontend/lib/api.ts
import axios from 'axios';
import { ResumeData, AIRequest, AIResponse, TemplateConfig } from './types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const resumeApi = {
  getTemplates: async (): Promise<TemplateConfig[]> => {
    const { data } = await api.get('/api/resume/templates');
    return data;
  },
  
  getResume: async (id: string): Promise<ResumeData> => {
    const { data } = await api.get(`/api/resume/${id}`);
    return data;
  },
  
  createResume: async (resume: ResumeData): Promise<ResumeData> => {
    const { data } = await api.post('/api/resume', resume);
    return data;
  },
  
  updateResume: async (id: string, resume: ResumeData): Promise<ResumeData> => {
    const { data } = await api.put(`/api/resume/${id}`, resume);
    return data;
  },
  
  deleteResume: async (id: string): Promise<void> => {
    await api.delete(`/api/resume/${id}`);
  },
};

export const aiApi = {
  enhance: async (request: AIRequest): Promise<AIResponse> => {
    const { data } = await api.post('/api/ai/enhance', request);
    return data;
  },
  
  generateSummary: async (resumeData: Partial<ResumeData>): Promise<string> => {
    const { data } = await api.post('/api/ai/summary', { resume_data: resumeData });
    return data.summary;
  },
  
  scoreResume: async (resumeData: Partial<ResumeData>): Promise<any> => {
    const { data } = await api.post('/api/ai/score', { resume_data: resumeData });
    return data;
  },
  
  autofill: async (jd: string, type: string): Promise<{ content: string }> => {
    const { data } = await api.post('/api/ai/autofill', { job_description: jd, section_type: type });
    return data;
  },
  
  getKeywords: async (title: string, industry: string): Promise<string[]> => {
    const { data } = await api.post('/api/ai/keywords', { job_title: title, industry });
    return data.keywords;
  },
};

export const exportApi = {
  downloadPdf: async (resumeData: ResumeData): Promise<void> => {
    const { data } = await api.post('/api/export/pdf', resumeData, {
      responseType: 'blob',
    });
    
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${resumeData.title || 'resume'}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  },
};
