import shelve

class Record:
    def __init__(self, temp):
        print('rrr')
        self.id = temp['id']
        self.type = temp['type']
        self.number = temp['number']
        self.video = temp['video']
        self.audio = temp['audio']
        
db = shelve.open('data')
keys = ['id', 'type', 'number', 'video', 'audio'];

def outputDB():
    print('---------------------------------------------')
    for record in db:
        print(record, ': ', end = '\n')
        print(db[record].id, end = '\n')
        print(db[record].type, end = '\n')
        print(db[record].number, end = '\n')
        print(db[record].video, end = '\n')
        print(db[record].audio, end = '\n')
        print('=================')

while 1:
    action = int(input('1 - print, 2 - write'))

    if(action == 1):
        outputDB()
        break
    else:
        temp = {}
        for key in keys:
            print('enter value for ', key)
            value = input('enter value: ')
            if '___' in value:
                    temp[key] = value.split('___')
            else:
                    temp[key] = value			
                
        while 1:
            print('exists indexes: \n')
            keys = list(db.keys())
            print(keys)    
            index = input('enter index')
            if(index in keys):
                print('index exist')
            else:
                db[index] = Record(temp)
                break                

db.close()
print('stop')
