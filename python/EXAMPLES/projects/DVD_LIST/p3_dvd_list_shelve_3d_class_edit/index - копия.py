import shelve

class Record:
    def __init__(self, temp):
        print('rrr')
        self.id = temp['id']
        self.type = temp['type']
        self.number = temp['number']
        self.video = temp['video']
        self.audio = temp['audio']

    def outputAttr(record, attr):
        print(record.attr)
        
    def outputRecord(record):
        print(record, ':: ', end = '\n')
        print('\tid:\t', db[record].id, end = '\n')
        print('\ttype:\t', db[record].type, end = '\n')
        print('\tnumber:\t', db[record].number, end = '\n')
        print('\tvideo:\t', db[record].video, end = '\n')
        print('\taudio:\t', db[record].audio, end = '\n')
        print('=================')        

    def outputDB():
        print('---------------------------------------------')
        for record in db:
            Record.outputRecord(record)           
        
db = shelve.open('data')
keys = ['id', 'type', 'number', 'video', 'audio'];

while 1:
    action = input('1 - print, 2 - write, 3 - edit')
    print(type(action).__name__)
    try:
        action = int(action)
    except:
        print('enter numeric chracter!')
        continue
   
    if(action == 1):
        Record.outputDB()
        break
    elif(action == 2):
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
            
    elif(action == 3):
        print('edit mode! /n')
        index = input('enter index')
        try:
            db[index]
        except:
            print('noindex')
        else:
            print('okindex')
            Record.outputRecord(index)

        record = input('enter record')
        try:
            Record.outputAttr(db[index], record)
        except:
            print('norecord')
        else:
            print('okrecord')       
    else:
        print('what??')

db.close()
print('stop')
