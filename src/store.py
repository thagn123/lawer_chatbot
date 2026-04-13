import json
import os
import faiss
import numpy as np
import pickle
from sentence_transformers import SentenceTransformer

def main():
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    data_file = os.path.join(base_dir, "data", "chunked_laws.json")
    index_file = os.path.join(base_dir, "data", "law_vector_index.faiss")
    meta_file = os.path.join(base_dir, "data", "chunk_metadata.pkl")
    
    print("Loading hierarchical chunks...")
    with open(data_file, "r", encoding="utf-8") as f:
        chunks = json.load(f)
        
    print(f"Loaded {len(chunks)} chunks.")
    
    # We embed the 'page_content' which contains full semantic hierarchical structure
    texts = [chunk["page_content"] for chunk in chunks]
    
    # Load free offline local embedding model
    # paraphrase-multilingual-MiniLM-L12-v2 works extremely well for Vietnamese locally
    model_name = 'paraphrase-multilingual-MiniLM-L12-v2'
    print(f"Loading embedding model '{model_name}' (this may take a moment to download if first time)...")
    model = SentenceTransformer(model_name)
    
    print("Generating embeddings... (Running on CPU locally 100% Free)")
    # normalize_embeddings=True is required for Cosine Similarity (Inner Product)
    embeddings = model.encode(texts, show_progress_bar=True, normalize_embeddings=True)
    embeddings = np.array(embeddings).astype('float32') # FAISS requires float32 format
    
    dim = embeddings.shape[1]
    print(f"Embeddings generated with Dimension size: {dim}")
    
    print("Building FAISS index...")
    # IndexFlatIP performs inner product computations. 
    # Since embeddings are L2-normalized it is mathematically equivalent to Cosine similarity.
    index = faiss.IndexFlatIP(dim)
    index.add(embeddings)
    
    # Save the FAISS Index
    faiss.write_index(index, index_file)
    print(f"Saved FAISS index to {index_file}")
    
    # Save Metadata Dictionary
    # This maps the integer FAISS IDs to the dictionary data (chunks base context)
    chunk_dict = {i: chunks[i] for i in range(len(chunks))}
    with open(meta_file, "wb") as f:
        pickle.dump(chunk_dict, f)
    print(f"Saved metadata to {meta_file}")

if __name__ == "__main__":
    main()
