import docx

doc = docx.Document(r'd:\lawer_chatbot\craw_data\91_2015_QH13_296215.docx')

for i, p in enumerate(doc.paragraphs[:100]):
    text = p.text.strip()
    if not text: continue
    
    # Check bold formatting
    is_bold = False
    if p.runs:
        is_bold = any(r.bold for r in p.runs)
        
    print(f"[{i}] BOLD: {is_bold} | TEXT: {text}")
