# server/resume_parser.py

import sys
import json
import fitz
import os
import re
import spacy

def parse_resume(file_path):
    data = {
        "name": None, "email": None, "mobile_number": None,
        "summary": None,
        "skills_categorized": {},
        "experience": [],
        "projects": [],
        "certifications": [],
        "education": []
    }

    try:
        nlp = spacy.load('en_core_web_sm')
        pdf_document = fitz.open(file_path)
        raw_text = "".join([page.get_text() for page in pdf_document])
        pdf_document.close()
        
        lines = [line.strip() for line in raw_text.split('\n') if line.strip()]
        if lines: data['name'] = lines[0]
        data['email'] = re.search(r'[\w\.-]+@[\w\.-]+', raw_text).group(0) if re.search(r'[\w\.-]+@[\w\.-]+', raw_text) else None
        data['mobile_number'] = re.search(r'(\d{10})', raw_text).group(0) if re.search(r'(\d{10})', raw_text) else None
        
        SKILLS_DB = {
            'Languages': ['python', 'java', 'javascript', 'c++', 'c#', 'go', 'kotlin', 'sql'],
            'Frameworks/Libraries': ['react', 'node.js', 'django', 'flask', 'pandas', 'flutter', '.net'],
            'Tools/Platforms': ['docker', 'aws', 'github', 'firebase', 'postman', 'git', 'kubernetes']
        }
        for category, skills_list in SKILLS_DB.items():
            found_skills = [skill for skill in skills_list if re.search(r'\b' + re.escape(skill) + r'\b', raw_text, re.IGNORECASE)]
            if found_skills:
                data['skills_categorized'][category] = found_skills

        content_lines = raw_text.split('\n')
        section_headers = {
            'summary': ['summary', 'objective', 'professional summary'],
            'experience': ['experience', 'work history', 'employment'],
            'projects': ['projects', 'personal projects', 'academic projects'], # <-- ADDED MORE KEYWORDS
            'certifications': ['certifications', 'licenses & certifications'],
            'education': ['education', 'academic background'],
            'skills': ['skills', 'technical skills']
        }
        
        header_positions = {}
        for i, line in enumerate(content_lines):
            line_lower = line.lower()
            for section, keywords in section_headers.items():
                if any(keyword in line_lower for keyword in keywords):
                    header_positions[section] = i
                    break
        
        sorted_sections = sorted(header_positions.items(), key=lambda item: item[1])

        for i in range(len(sorted_sections)):
            current_section, start_line = sorted_sections[i]
            end_line = sorted_sections[i+1][1] if i + 1 < len(sorted_sections) else len(content_lines)
            
            section_content_raw = [line.strip() for line in content_lines[start_line + 1 : end_line] if line.strip()]
            
            if current_section in ['summary', 'education', 'certifications']:
                data[current_section] = section_content_raw
            elif current_section in ['experience', 'projects']:
                items = []
                current_item = None
                for line in section_content_raw:
                    # --- SMARTER TITLE vs DATE LOGIC ---
                    is_date_line = re.search(r'\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b', line, re.IGNORECASE)
                    
                    # Assume a line that is NOT a date and is short/capitalized is a title
                    if not is_date_line and len(line) < 70:
                        if current_item: items.append(current_item) # Save the previous item
                        current_item = {'title': line, 'date': None, 'description': ''}
                    elif is_date_line and current_item and not current_item['date']:
                        current_item['date'] = line
                    elif current_item:
                        current_item['description'] += line + '\n'
                if current_item: items.append(current_item)
                data[current_section] = items

    except Exception as e:
        data = {"error": str(e), "details": "Error during final Python script execution."}

    return data

if __name__ == '__main__':
    resume_file_path = sys.argv[1]
    parsed_data = parse_resume(resume_file_path)
    print(json.dumps(parsed_data, indent=4))