import axios from 'axios';
import { TemplateConfig } from './templateTypes';
import { ResumeData } from '@/types/resume';

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

  uploadResume: async (file: File): Promise<Partial<ResumeData>> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/resume/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      let detail = `Upload failed with status ${response.status}`;
      try {
        const errorData = await response.json();
        detail = errorData.detail || errorData.error || detail;
      } catch {
        const errorText = await response.text();
        if (errorText) detail = errorText;
      }
      throw new Error(detail);
    }

    const data = await response.json();

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

export const exportApi = {
  downloadElementAsPdf: async (element: HTMLElement, filename: string): Promise<void> => {
    const iframe = document.createElement('iframe');
    iframe.style.position = 'fixed';
    iframe.style.right = '0';
    iframe.style.bottom = '0';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.setAttribute('aria-hidden', 'true');

    document.body.appendChild(iframe);

    try {
      const iframeDocument = iframe.contentDocument;
      const iframeWindow = iframe.contentWindow;

      if (!iframeDocument || !iframeWindow) {
        throw new Error('Could not open print preview.');
      }

      const clonedElement = element.cloneNode(true) as HTMLElement;
      clonedElement.style.width = '794px';
      clonedElement.style.minHeight = '1123px';
      clonedElement.style.margin = '0';
      clonedElement.style.boxShadow = 'none';
      clonedElement.style.breakInside = 'avoid';

      const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map((node) => node.outerHTML)
        .join('\n');

      iframeDocument.open();
      const pageTopMargin = 18;
      const pageBottomMargin = 12;

      iframeDocument.write(`
        <!doctype html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>${filename}</title>
            ${styles}
            <style>
              @page {
                size: A4;
                margin: ${pageTopMargin}mm 0 ${pageBottomMargin}mm 0;
              }

              @page :first {
                margin-top: 0;
              }

              html, body {
                margin: 0;
                padding: 0;
                width: 794px;
                min-height: 1123px;
                background: #ffffff;
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              body {
                overflow: hidden;
              }

              #print-root {
                width: 794px;
                min-height: 1123px;
                margin: 0;
                padding: 0;
                overflow: hidden;
              }

              #print-root * {
                -webkit-print-color-adjust: exact;
                print-color-adjust: exact;
              }

              #print-root h1,
              #print-root h2,
              #print-root h3,
              #print-root h4,
              #print-root h5,
              #print-root h6 {
                break-after: avoid-page;
                page-break-after: avoid;
              }

              #print-root h1 + *,
              #print-root h2 + *,
              #print-root h3 + *,
              #print-root h4 + *,
              #print-root h5 + *,
              #print-root h6 + * {
                break-before: avoid-page;
                page-break-before: avoid;
              }

              #print-root p,
              #print-root li {
                orphans: 3;
                widows: 3;
              }
            </style>
          </head>
          <body>
            <div id="print-root"></div>
          </body>
        </html>
      `);
      iframeDocument.close();

      const root = iframeDocument.getElementById('print-root');
      if (!root) {
        throw new Error('Could not build print document.');
      }

      root.appendChild(clonedElement);

      if (iframeDocument.fonts?.ready) {
        await iframeDocument.fonts.ready;
      }

      const images = Array.from(iframeDocument.images);
      await Promise.all(
        images.map(
          (img) =>
            new Promise<void>((resolve) => {
              if (img.complete) {
                resolve();
                return;
              }
              img.onload = () => resolve();
              img.onerror = () => resolve();
            })
        )
      );

      await new Promise((resolve) => setTimeout(resolve, 250));

      iframeWindow.focus();
      iframeWindow.print();
    } finally {
      window.setTimeout(() => {
        iframe.remove();
      }, 1000);
    }
  },

  downloadBlob: (blob: Blob, filename: string): void => {
    const url = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
