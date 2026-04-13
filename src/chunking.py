import json
import os

MAX_CHUNK_SIZE = 2000

def split_text(text, max_size):
    """Fallback recursive text splitter by newline and period."""
    if len(text) <= max_size:
        return [text]
        
    chunks = []
    paragraphs = text.split('\n\n')
    current_chunk = ""
    for p in paragraphs:
        if len(current_chunk) + len(p) > max_size and current_chunk:
            chunks.append(current_chunk.strip())
            current_chunk = ""
        
        if len(p) > max_size:
            # chunk by period
            sentences = p.split('. ')
            for s in sentences:
                s = s + '. '
                if len(current_chunk) + len(s) > max_size and current_chunk:
                    chunks.append(current_chunk.strip())
                    current_chunk = ""
                
                if len(s) > max_size:
                    # chunk blindly
                    for i in range(0, len(s), max_size):
                        chunks.append(s[i:i+max_size])
                else:
                    current_chunk += s
        else:
            current_chunk += p + "\n\n"
            
    if current_chunk.strip():
        chunks.append(current_chunk.strip())
        
    return chunks

def build_context_string(law, chapter, section, article):
    parts = []
    if law: parts.append(f"[Văn Bản]: {law}")
    if chapter: parts.append(f"[Chương]: {chapter}")
    if section: parts.append(f"[Mục]: {section}")
    if article: parts.append(f"[Điều]: {article}")
    return "\n".join(parts)

def create_chunks(item, metadata, context_str):
    chunks = []
    content = item.get("content", "").strip()
    
    if content:
        split_contents = split_text(content, MAX_CHUNK_SIZE)
        for part in split_contents:
            page_content = f"{context_str}\n[Nội dung]: {part}"
            chunks.append({
                "metadata": metadata.copy(),
                "content": part,
                "page_content": page_content.strip()
            })
    return chunks

def extract_chunks_from_law(law_data):
    all_chunks = []
    law_name = law_data.get("law_name", "KHÔNG RÕ TÊN LUẬT")
    
    def process_article(article, ch_name=None, sec_name=None):
        art_name = article.get("article_name", "Không rõ Điều")
        
        metadata = {
            "law_name": law_name,
            "chapter": ch_name,
            "section": sec_name,
            "article": art_name
        }
        
        context_str = build_context_string(law_name, ch_name, sec_name, art_name)
        
        # Process direct content of article
        art_chunks = create_chunks(article, metadata, context_str)
        all_chunks.extend(art_chunks)
        
        # Process clauses
        for clause in article.get("clauses", []):
            clause_id = clause.get("clause_id", "")
            clause_meta = metadata.copy()
            clause_meta["clause"] = clause_id
            
            clause_chunks = create_chunks(clause, clause_meta, context_str)
            all_chunks.extend(clause_chunks)

    # Law has chapters
    if "chapters" in law_data and law_data["chapters"]:
        for chapter in law_data["chapters"]:
            ch_name = chapter.get("chapter_name", "")
            
            # Content of chapter itself
            ch_meta = {"law_name": law_name, "chapter": ch_name}
            all_chunks.extend(create_chunks(chapter, ch_meta, build_context_string(law_name, ch_name, None, None)))
            
            for section in chapter.get("sections", []):
                sec_name = section.get("section_name", "")
                
                # Content of section itself
                sec_meta = {"law_name": law_name, "chapter": ch_name, "section": sec_name}
                all_chunks.extend(create_chunks(section, sec_meta, build_context_string(law_name, ch_name, sec_name, None)))
                
                for article in section.get("articles", []):
                    process_article(article, ch_name, sec_name)
            
            # Articles directly under chapter without sections
            for article in chapter.get("articles", []):
                process_article(article, ch_name, None)
                
    # Law has direct articles (no chapters)
    if "articles" in law_data and law_data["articles"]:
        for article in law_data.get("articles", []):
            process_article(article)
            
    return all_chunks

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_file = os.path.join(base_dir, "data", "structured_laws.json")
    output_file = os.path.join(base_dir, "data", "chunked_laws.json")
    
    with open(input_file, "r", encoding="utf-8") as f:
        data = json.load(f)
        
    all_chunks = []
    for law in data:
        chunks = extract_chunks_from_law(law)
        all_chunks.extend(chunks)
        
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(all_chunks, f, ensure_ascii=False, indent=2)
        
    print(f"Created {len(all_chunks)} logical chunks from legal documents.")
    print(f"Saved chunked data to {output_file}")

if __name__ == '__main__':
    main()
