import re
'''
qw = 'US $1 719,57'
#search = re.search('.*?([\d| |,]*)', qw)
#search = re.search('([\d, ]+)$', qw)
search = re.search('([\d, ]+)$', qw)
qw = search.group(1)
if qw:
    print(qw)
'''

qw = 'US $1 719,57'
qw = re.sub("[^\d, ]", "", qw)    
qw = re.sub(",", ".", qw)
print(qw)   
