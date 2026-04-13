import os
import re
import json
import win32com.client
import docx

def convert_doc_to_docx(doc_path, docx_path):
    print(f"Converting {doc_path} to {docx_path}")
    word = None
    try:
        word = win32com.client.Dispatch('Word.Application')
        word.Visible = False
        doc = word.Documents.Open(os.path.abspath(doc_path))
        doc.SaveAs(os.path.abspath(docx_path), 16)
        doc.Close()
    except Exception as e:
        print(f"Failed to convert {doc_path}: {e}")
    finally:
        if word:
            word.Quit()

def extract_from_docx(docx_path):
    document = docx.Document(docx_path)
    
    file_name = os.path.basename(docx_path)
    law_struct = {
        "file_name": file_name,
        "law_name": "",
        "chapters": [],
        "articles": [], # For laws without chapters
    }
    
    current_chapter = None
    current_section = None
    current_article = None
    current_clause = None
    
    chapter_pattern = re.compile(r'^(CHƯƠNG|Chương)\s+[IVXLCDMivxlcdm]+')
    section_pattern = re.compile(r'^(MỤC|Mục)\s+\d+')
    article_pattern = re.compile(r'^(Điều|ĐIỀU)\s+\d+[a-zA-Z]*\.*')
    clause_pattern = re.compile(r'^(\d+)\.\s')
    
    paragraphs = []
    for p in document.paragraphs:
        txt = p.text.strip()
        if txt:
            paragraphs.append(txt)
            
    # Try to find law name (handle multi-line titles)
    law_name_parts = []
    start_collecting = False
    for txt in paragraphs[:15]:
        upper_txt = txt.upper()
        if "CĂN CỨ" in upper_txt or "QUỐC HỘI" in upper_txt or "CHƯƠNG " in upper_txt or "ĐIỀU 1" in upper_txt:
            if start_collecting:
                break
                
        if "LUẬT" in upper_txt or "NGHỊ ĐỊNH" in upper_txt or "HIẾN PHÁP" in upper_txt:
            start_collecting = True
            
        if start_collecting:
            law_name_parts.append(txt)
            
    law_struct["law_name"] = " ".join(law_name_parts).strip()
            
    for txt in paragraphs:
        # Match Chapter
        if chapter_pattern.match(txt):
            current_chapter = {
                "chapter_name": txt,
                "sections": [],
                "articles": [],
                "content": ""
            }
            law_struct["chapters"].append(current_chapter)
            current_section = None
            current_article = None
            current_clause = None
            continue
            
        # Match Section
        if section_pattern.match(txt):
            current_section = {
                "section_name": txt,
                "articles": [],
                "content": ""
            }
            if current_chapter:
                current_chapter["sections"].append(current_section)
            current_article = None
            current_clause = None
            continue
            
        # Match Article
        if article_pattern.match(txt):
            current_article = {
                "article_name": txt,
                "clauses": [],
                "content": ""
            }
            if current_section:
                current_section["articles"].append(current_article)
            elif current_chapter:
                current_chapter["articles"].append(current_article)
            else:
                law_struct["articles"].append(current_article)
            current_clause = None
            continue
            
        # Match Clause
        m = clause_pattern.match(txt)
        if m and current_article:
            current_clause = {
                "clause_id": m.group(1),
                "content": txt
            }
            current_article["clauses"].append(current_clause)
            continue
            
        # Unmatched text: append to the deepest active scope
        if current_clause:
            current_clause["content"] += "\n" + txt
        elif current_article:
            current_article["content"] += ("\n" + txt if current_article["content"] else txt)
        elif current_section:
            current_section["content"] += ("\n" + txt if current_section["content"] else txt)
        elif current_chapter:
            current_chapter["content"] += ("\n" + txt if current_chapter["content"] else txt)

    return law_struct

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    craw_dir = os.path.join(base_dir, "craw_data")
    data_dir = os.path.join(base_dir, "data")
    
    if not os.path.exists(data_dir):
        os.makedirs(data_dir)
        
    all_laws = []
    
    for filename in os.listdir(craw_dir):
        if filename.endswith(".doc") and not filename.startswith("~"):
            doc_path = os.path.join(craw_dir, filename)
            base_name = filename[:-4]
            docx_path = os.path.join(craw_dir, base_name + ".docx")
            
            if not os.path.exists(docx_path):
                convert_doc_to_docx(doc_path, docx_path)
            else:
                print(f"Skipping conversion, {docx_path} exists.")
            
            if os.path.exists(docx_path):
                print(f"Extracting {docx_path}...")
                try:
                    legal_data = extract_from_docx(docx_path)
                    all_laws.append(legal_data)
                except Exception as e:
                    print(f"Error extracting from {docx_path}: {e}")

    out_file = os.path.join(data_dir, "structured_laws.json")
    with open(out_file, "w", encoding="utf-8") as f:
        json.dump(all_laws, f, ensure_ascii=False, indent=2)
        
    print(f"\nSuccessfully processed {len(all_laws)} documents.")
    print(f"Saved extracted data to {out_file}")

if __name__ == '__main__':
    main()
