import re

def change_date_format(js_file_path):
    with open(js_file_path, 'r') as file:
        content = file.read()

    pattern = r'\"Date\":\s*\"(\d{2}-\d{2}-\d{4})\"'

    modified_content = re.sub(pattern, lambda match: f'"Date": "{match.group(1)[6:10]}-{match.group(1)[3:5]}-{match.group(1)[0:2]}"', content)

    with open(js_file_path, 'w') as file:
        file.write(modified_content)

js_file_path = './data/monthlyGoldCosts.js'
change_date_format(js_file_path)
