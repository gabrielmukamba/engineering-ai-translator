import urllib.request

url = "https://flaticon.com"
headers = {'User-Agent': 'Mozilla/5.0'}
req = urllib.request.Request(url, headers=headers)

with urllib.request.urlopen(req) as response, open('static/app-logo.png', 'wb') as out_file:
    out_file.write(response.read())

print("SUCCESS! Icon downloaded successfully.")