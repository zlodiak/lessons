import requests

#addr = requests.get('http://fh79272k.bget.ru/py_test/index.html')
addr = requests.get('http://prozaik.16mb.com/works/weekend_projects/site_himmler_homepage/index.php')
print(addr.status_code)

print(addr.text)

try:
    f2 = open("text2.txt", 'w')
except Exception:
    print('open error')
except:
    print('error')
else:
    f2.write(addr.text)
finally:    
    f2.close()

                                                  
