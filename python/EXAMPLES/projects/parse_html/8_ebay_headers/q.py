import requests 
 
url = 'http://letitbit.net/'                                
 
payload = {'act':'login','login':'h1480276@rtrtr.com','password':'2DPEND9i3jvs'}
headers = {
   'User-Agent' : 'Mozilla/5.0 (Windows NT 6.1; rv:12.0) Gecko/20100101 Firefox/12.0',
   'Accept' : 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
   'Accept-Language' : 'ru-ru,ru;q=0.8,en-us;q=0.5,en;q=0.3',
   'Accept-Encoding' : 'gzip, deflate',
   'Connection' : 'keep-alive',
}
s = requests.Session()
b = s.post(url, allow_redirects=True, headers={'Referer': 'http://letitbit.net/'}, data=payload)

print(b.status_code)
print(b.headers)
print(b.text)
print(b.history)
#print(r.content)
