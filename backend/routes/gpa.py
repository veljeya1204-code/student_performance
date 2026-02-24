# # import pandas as pd

# # # --- Grade to Points mapping ---
# # GRADE_POINTS = {
# #     'O': 10.0, 'A+': 9.0, 'A': 8.0,
# #     'B+': 7.0, 'B': 6.0, 'C': 5.0,
# #     'F': 0.0, 'SA': 0.0, 'W': 0.0, 'U': 0.0, 'RA': 0.0
# # }

# # # --- Read Excel to get subject credits ---
# # file_path = "credits_sheet.xlsx"  # replace with your actual file path
# # df = pd.read_excel(file_path)  # make sure openpyxl is installed
# # subject_credits = dict(zip(df['s_code'], df['CREDITS']))

# # # --- Example input dictionary ---
# # input_marks = {
# #     "hs3152": "A",
# #     "cs3351": "O",
# #     "cs3451": "B+"
# # }

# # # --- Convert input_marks to proper structure with credits ---
# # marks = {}
# # for s_code, grade in input_marks.items():
# #     grade = grade.upper()
# #     s_code=s_code.upper()
# #     if s_code not in subject_credits:
# #         print(f"Warning: {s_code} not found in credit sheet. Skipping.")
# #         continue
# #     if grade not in GRADE_POINTS:
# #         print(f"Warning: Invalid grade '{grade}' for {s_code}. Skipping.")
# #         continue
# #     marks[s_code] = (grade, subject_credits[s_code])

# # print("Prepared Marks Dictionary with Credits:")
# # print(marks)

# # # --- Now you can calculate CGPA ---
# # # For first semester, prev_gpa and prev_credits are empty
# # prev_gpa = [3.5, 3.8, 3.2]
# # prev_credits = [20, 18, 22]

# # # Function from earlier
# # def calculate_gpa(grade, credits):
# #     return GRADE_POINTS[grade] * credits

# # def calculate_cgpa(prev_gpa_list=None, prev_credit_list=None, current_marks=None):
# #     prev_gpa_list = prev_gpa_list or []
# #     prev_credit_list = prev_credit_list or []

# #     total_points = sum(g*cr for g, cr in zip(prev_gpa_list, prev_credit_list))
# #     total_credits = sum(prev_credit_list)

# #     current_gpa_list = []
# #     current_credit_list = []

# #     if current_marks:
# #         semester_points = 0
# #         semester_credits = 0
# #         for subj, (grade, credits) in current_marks.items():
# #             points = calculate_gpa(grade, credits)
# #             semester_points += points
# #             semester_credits += credits
# #         current_gpa = semester_points / semester_credits if semester_credits else 0

# #         current_gpa_list.append(round(current_gpa,2))
# #         current_credit_list.append(semester_credits)

# #         total_points += semester_points
# #         total_credits += semester_credits
# #     else:
# #         current_gpa = None

# #     updated_cgpa = total_points / total_credits if total_credits else 0

# #     return {
# #         "current_gpa_list": current_gpa_list,
# #         "current_credit_list": current_credit_list,
# #         "total_points": round(total_points,2),
# #         "total_credits": total_credits,
# #         "cgpa": round(updated_cgpa,2)
# #     }

# # # --- Calculate CGPA ---
# # result = calculate_cgpa(prev_gpa, prev_credits, marks)

# # print("\n--- CGPA Result ---")
# # print("Current Semester GPA List:", result["current_gpa_list"])
# # print("Current Semester Credit List:", result["current_credit_list"])
# # print("Total Points:", result["total_points"])
# # print("Total Credits:", result["total_credits"])
# # print("Updated CGPA:", result["cgpa"])








# # from flask import Flask, request, jsonify
# # import pandas as pd

# # app = Flask(__name__)

# # # --- Grade Points ---
# # GRADE_POINTS = {
# #     'O': 10.0, 'A+': 9.0, 'A': 8.0,
# #     'B+': 7.0, 'B': 6.0, 'C': 5.0,
# #     'F': 0.0, 'SA': 0.0, 'W': 0.0, 'U': 0.0, 'RA': 0.0
# # }

# # # --- Load subject credits from Excel ---
# # file_path = "credits_sheet.xlsx"  # replace with your actual file path
# # df = pd.read_excel(file_path)
# # subject_credits = dict(zip(df['s_code'].str.upper(), df['CREDITS']))

# # # --- Dummy backend storage for previous GPA/credits ---
# # # In a real app, this would be stored in a database per student
# # STUDENT_HISTORY = {
# #     # student_id : {"prev_gpa": [...], "prev_credits": [...]}
# #     1: {"prev_gpa": [3.5, 3.8, 3.2], "prev_credits": [20, 18, 22]},
# #     # Add more students as needed
# # }

# # # --- GPA calculation function ---
# # def calculate_gpa(grade, credits):
# #     return GRADE_POINTS[grade] * credits

# # def calculate_cgpa(prev_gpa_list=None, prev_credit_list=None, current_marks=None):
# #     prev_gpa_list = prev_gpa_list or []
# #     prev_credit_list = prev_credit_list or []

# #     total_points = sum(g*cr for g, cr in zip(prev_gpa_list, prev_credit_list))
# #     total_credits = sum(prev_credit_list)

# #     current_gpa_list = []
# #     current_credit_list = []

# #     if current_marks:
# #         semester_points = 0
# #         semester_credits = 0
# #         for subj, (grade, credits) in current_marks.items():
# #             points = calculate_gpa(grade, credits)
# #             semester_points += points
# #             semester_credits += credits
# #         current_gpa = semester_points / semester_credits if semester_credits else 0

# #         current_gpa_list.append(round(current_gpa,2))
# #         current_credit_list.append(semester_credits)

# #         total_points += semester_points
# #         total_credits += semester_credits
# #     else:
# #         current_gpa = None

# #     updated_cgpa = total_points / total_credits if total_credits else 0

# #     return {
# #         "current_gpa_list": current_gpa_list,
# #         "current_credit_list": current_credit_list,
# #         "total_points": round(total_points,2),
# #         "total_credits": total_credits,
# #         "cgpa": round(updated_cgpa,2)
# #     }

# # # --- Flask route ---
# # @app.route("/calculate-cgpa", methods=["POST"])
# # def calculate_cgpa_endpoint():
# #     data = request.json

# #     student_id = data.get("student_id")
# #     input_marks = data.get("marks")  # {"HS3152": "A", "CS3351": "O", ...}

# #     if not student_id or not input_marks:
# #         return jsonify({"error": "student_id and marks required"}), 400

# #     # Convert input_marks to include credits
# #     marks = {}
# #     for s_code, grade in input_marks.items():
# #         s_code = s_code.upper()
# #         grade = grade.upper()
# #         if s_code not in subject_credits:
# #             continue  # skip invalid subjects
# #         if grade not in GRADE_POINTS:
# #             continue  # skip invalid grades
# #         marks[s_code] = (grade, subject_credits[s_code])

# #     # Get previous GPA/credits from backend storage
# #     history = STUDENT_HISTORY.get(student_id, {})
# #     prev_gpa = history.get("prev_gpa", [])
# #     prev_credits = history.get("prev_credits", [])

# #     # Calculate CGPA
# #     result = calculate_cgpa(prev_gpa, prev_credits, marks)

# #     return jsonify(result)

# # # --- Run Flask app ---
# # if __name__ == "__main__":
# #     app.run(debug=True)

# import psycopg2
# import pandas as pd

# # --- GRADE_POINTS & Excel read ---
# GRADE_POINTS = {
#     'O': 10.0, 'A+': 9.0, 'A': 8.0,
#     'B+': 7.0, 'B': 6.0, 'C': 5.0,
#     'F': 0.0, 'SA': 0.0, 'W': 0.0, 'U': 0.0, 'RA': 0.0
# }

# df = pd.read_excel("credits_sheet.xlsx")
# subject_credits = dict(zip(df['s_code'].str.upper(), df['CREDITS']))

# # --- Example input ---
# input_marks = {
#     "hs3152": "A",
#     "cs3351": "O",
#     "cs3451": "B+"
# }

# marks = {}
# for s_code, grade in input_marks.items():
#     grade = grade.upper()
#     s_code = s_code.upper()
#     if s_code not in subject_credits or grade not in GRADE_POINTS:
#         continue
#     marks[s_code] = (grade, subject_credits[s_code])

# # --- Previous GPA & Credits from DB or example ---
# prev_gpa = [4.5, 3.8, 3.2]
# prev_credits = [20, 18, 22]

# # --- GPA & CGPA calculation functions ---
# def calculate_gpa(grade, credits):
#     return GRADE_POINTS[grade] * credits

# def calculate_cgpa(prev_gpa_list=None, prev_credit_list=None, current_marks=None):
#     prev_gpa_list = prev_gpa_list or []
#     prev_credit_list = prev_credit_list or []

#     total_points = sum(g*cr for g, cr in zip(prev_gpa_list, prev_credit_list))
#     total_credits = sum(prev_credit_list)

#     current_gpa_list = []
#     current_credit_list = []

#     if current_marks:
#         semester_points = 0
#         semester_credits = 0
#         for subj, (grade, credits) in current_marks.items():
#             points = calculate_gpa(grade, credits)
#             semester_points += points
#             semester_credits += credits
#         current_gpa = semester_points / semester_credits if semester_credits else 0

#         current_gpa_list.append(round(current_gpa,2))
#         current_credit_list.append(semester_credits)

#         total_points += semester_points
#         total_credits += semester_credits
#     else:
#         current_gpa = None

#     updated_cgpa = total_points / total_credits if total_credits else 0

#     return {
#         "current_gpa_list": current_gpa_list,
#         "current_credit_list": current_credit_list,
#         "total_points": round(total_points,2),
#         "total_credits": total_credits,
#         "cgpa": round(updated_cgpa,2)
#     }

# # --- Calculate CGPA ---
# result = calculate_cgpa(prev_gpa, prev_credits, marks)

# # --- Combine old & new GPA/credits ---
# all_gpa = prev_gpa + result["current_gpa_list"]
# all_credits = prev_credits + result["current_credit_list"]

# # --- Database connection ---
# conn = psycopg2.connect(
#                 host="localhost",
#                 database="postgres",
#                 user="postgres",
#                 password="120405",
#                 port="5432"
#             )
# cursor = conn.cursor()

# # --- Insert or Update Student Data ---
# student_id = 22
# cgpa = result["cgpa"]

# query = """
# INSERT INTO cgpa (student_id, prev_gpa, prev_credits, cgpa, created_at)
# VALUES (%s, %s, %s, %s, NOW())
# ON CONFLICT (student_id)
# DO UPDATE SET prev_gpa=%s, prev_credits=%s, cgpa=%s, created_at=NOW();
# """

# cursor.execute(query, (
#     student_id,
#     str(all_gpa),            # store as string array like '[3.5,3.8,3.2, ...]'
#     str(all_credits),        # same for credits
#     cgpa,
#     str(all_gpa),
#     str(all_credits),
#     cgpa
# ))

# conn.commit()
# cursor.close()
# conn.close()

# print(f"Student {student_id} data saved/updated successfully!")
# # import pdfplumber

# # text = ""
# # with pdfplumber.open("doc (1).pdf") as pdf:
# #     for page in pdf.pages:
# #         text += page.extract_text() + "\n"

# # print(text[:2000])  # preview

# # import re

# # pattern = r"(\d{12})\s+([A-Z .]+?)\s+((?:[A-Z][A+U]*\s*)+)"
# # rows = []

# # for line in text.split("\n"):
# #     match = re.match(pattern, line)
# #     if match:
# #         reg_no = match.group(1)
# #         name = match.group(2).strip()
# #         grades = match.group(3).split()
# #         rows.append([reg_no, name] + grades)

# # rows[:5]

# # import pandas as pd

# # max_grades = max(len(r) - 2 for r in rows)
# # columns = ["Register No", "Name"] + [f"Subject {i+1}" for i in range(max_grades)]

# # df = pd.DataFrame([r + [""]*(max_grades - (len(r)-2)) for r in rows],
# #                   columns=columns)

# # df.head()

# # df.to_excel("anna_university_results.xlsx", index=False)


from flask import Blueprint, request, jsonify
import psycopg2
import pandas as pd
import json

cgpa_bp = Blueprint("cgpa", __name__)

# --- Grade Points ---
GRADE_POINTS = {
    'O': 10.0, 'A+': 9.0, 'A': 8.0,
    'B+': 7.0, 'B': 6.0, 'C': 5.0,
    'F': 0.0, 'SA': 0.0, 'W': 0.0, 'U': 0.0, 'RA': 0.0
}

# --- Load Credits Once ---
df = pd.read_excel("credits_sheet.xlsx")
subject_credits = dict(zip(df['s_code'].str.upper(), df['CREDITS']))


def calculate_cgpa(prev_gpa_list, prev_credit_list, current_marks):
    total_points = sum(g * cr for g, cr in zip(prev_gpa_list, prev_credit_list))
    total_credits = sum(prev_credit_list)

    semester_points = 0
    semester_credits = 0

    for subj, grade in current_marks.items():
        subj = subj.upper()
        grade = grade.upper()

        if subj not in subject_credits or grade not in GRADE_POINTS:
            continue

        credits = subject_credits[subj]
        semester_points += GRADE_POINTS[grade] * credits
        semester_credits += credits

    if semester_credits == 0:
        return None

    current_gpa = semester_points / semester_credits

    total_points += semester_points
    total_credits += semester_credits

    updated_cgpa = total_points / total_credits

    return {
        "current_gpa": round(current_gpa, 2),
        "semester_credits": semester_credits,
        "cgpa": round(updated_cgpa, 2),
        "updated_gpa_list": prev_gpa_list + [round(current_gpa, 2)],
        "updated_credit_list": prev_credit_list + [semester_credits]
    }


@cgpa_bp.route("/api/student/calculate-cgpa", methods=["POST"])
def calculate_student_cgpa():
    data = request.json
    student_id = data.get("student_id")
    marks = data.get("marks", {})

    if not student_id:
        return jsonify({"error": "student_id required"}), 400

    conn = psycopg2.connect(
        host="localhost",
        database="postgres",
        user="postgres",
        password="120405",
        port="5432"
    )
    cursor = conn.cursor()

    # --- Fetch Previous ---
    cursor.execute(
        "SELECT prev_gpa, prev_credits FROM cgpa WHERE student_id=%s",
        (student_id,)
    )
    row = cursor.fetchone()

    if row:
        prev_gpa = json.loads(row[0])
        prev_credits = json.loads(row[1])
    else:
        prev_gpa = []
        prev_credits = []

    result = calculate_cgpa(prev_gpa, prev_credits, marks)

    if not result:
        return jsonify({"error": "Invalid marks"}), 400

    # --- Insert or Update ---
    query = """
    INSERT INTO cgpa (student_id, prev_gpa, prev_credits, cgpa, created_at)
    VALUES (%s, %s, %s, %s, NOW())
    ON CONFLICT (student_id)
    DO UPDATE SET
        prev_gpa=%s,
        prev_credits=%s,
        cgpa=%s,
        created_at=NOW();
    """

    cursor.execute(query, (
        student_id,
        json.dumps(result["updated_gpa_list"]),
        json.dumps(result["updated_credit_list"]),
        result["cgpa"],
        json.dumps(result["updated_gpa_list"]),
        json.dumps(result["updated_credit_list"]),
        result["cgpa"]
    ))

    conn.commit()
    cursor.close()
    conn.close()

    return jsonify(result), 200