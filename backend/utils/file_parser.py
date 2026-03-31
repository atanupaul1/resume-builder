import io
import PyPDF2
from docx import Document

def extract_text_from_file(file_bytes: bytes, filename: str) -> str:
    """Extracts text from PDF, DOCX, or TXT files."""
    ext = filename.split('.')[-1].lower()
    text = ""
    
    try:
        if ext == 'pdf':
            pdf = PyPDF2.PdfReader(io.BytesIO(file_bytes))
            for page in pdf.pages:
                extracted = page.extract_text()
                if extracted:
                    text += extracted + "\n"
        elif ext in ['docx', 'doc']:
            doc = Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                text += para.text + "\n"
        elif ext == 'txt':
            text = file_bytes.decode('utf-8')
        else:
            raise ValueError(f"Unsupported file extension: {ext}")
            
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from {filename}: {str(e)}")
        # Try to decode as raw text if all else fails
        try:
            return file_bytes.decode('utf-8', errors='ignore').strip()
        except:
            raise ValueError(f"Failed to read file: {e}")
