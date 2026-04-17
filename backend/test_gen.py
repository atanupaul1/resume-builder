import PyPDF2  
from reportlab.pdfgen import canvas  
c = canvas.Canvas('test_real.pdf')  
c.drawString(100, 750, 'John Doe')  
c.drawString(100, 730, 'Software Engineer')  
c.drawString(100, 710, 'Email: john.doe@example.com')  
c.drawString(100, 690, 'Phone: (555) 123-4567')  
c.drawString(100, 670, 'Experience')  
c.drawString(100, 650, 'Tech Corp')  
c.save()  
