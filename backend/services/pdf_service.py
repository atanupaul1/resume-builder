try:
    from playwright.async_api import async_playwright
    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False

class PDFService:
    async def render_resume_to_pdf(self, html_content: str) -> bytes:
        if not PLAYWRIGHT_AVAILABLE:
            raise RuntimeError("Backend PDF export is not available in this environment. Please use the frontend print feature.")

        async with async_playwright() as p:
            browser = await p.chromium.launch(headless=True)
            page = await browser.new_page()
            
            # Set the HTML content
            await page.set_content(html_content, wait_until="networkidle")
            
            # Generate PDF
            pdf_bytes = await page.pdf(
                format="A4",
                print_background=True,
                margin={"top": "0in", "right": "0in", "bottom": "0in", "left": "0in"}
            )
            
            await browser.close()
            return pdf_bytes

