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
        elif ext == 'docx':
            doc = Document(io.BytesIO(file_bytes))
            for para in doc.paragraphs:
                text += para.text + "\n"
        elif ext == 'doc':
            import re
            raw_text = file_bytes.decode('utf-8', errors='ignore')
            text = re.sub(r'[^\x20-\x7E\n]+', ' ', raw_text)
            text = re.sub(r'\s+', ' ', text)
        elif ext == 'txt':
            text = file_bytes.decode('utf-8')
        else:
            raise ValueError(f"Unsupported file extension: {ext}. Only PDF, DOCX, and TXT are supported.")
            
        if not text.strip():
            # If nothing extracted, it probably failed or is a scanned image
            raise ValueError("No text could be extracted from this binary file.")
            
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from {filename}: {str(e)}")
        # Fallback to UTF-8 for txt
        if ext == 'txt':
            try:
                return file_bytes.decode('utf-8', errors='ignore').strip()
            except:
                pass
        raise ValueError(f"Failed to read {ext} file: {e}")


