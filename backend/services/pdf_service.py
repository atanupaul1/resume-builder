try:
    from weasyprint import HTML
except Exception:
    HTML = None
import io

class PDFService:
    def render_resume_to_pdf(self, resume_data: dict) -> bytes:
        # Simplified HTML template for demonstration. 
        # In a real app, this would be much more complex and handle different templates.
        sections_html = ""
        for section in resume_data.get("sections", []):
            sections_html += f"""
                <div class="section">
                    <h3>{section.get('title')}</h3>
                    <div>{section.get('content')}</div>
                </div>
            """

        html_content = f"""
        <html>
            <head>
                <style>
                    body {{ font-family: {resume_data.get('theme', {{}}).get('fontFamily', 'Arial')}; }}
                    h1 {{ color: {resume_data.get('theme', {{}}).get('primaryColor', '#000')}; }}
                    .section {{ margin-bottom: 20px; }}
                </style>
            </head>
            <body>
                <h1>{resume_data.get('title')}</h1>
                {sections_html}
            </body>
        </html>
        """
        
        if HTML is None:
            raise RuntimeError("WeasyPrint is not installed or missing GTK+ dependencies. PDF export is disabled.")
        
        pdf_io = io.BytesIO()
        HTML(string=html_content).write_pdf(pdf_io)
        return pdf_io.getvalue()

