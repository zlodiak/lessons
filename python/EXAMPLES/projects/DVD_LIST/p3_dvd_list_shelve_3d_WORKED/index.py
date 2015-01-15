import shelve

db = shelve.open('data')
keys = ['id', 'type', 'number', 'video', 'audio'];

def outputDB(db):
    print('---------------------------------------------')
    for record in db:
        print(record, ': ', db[record])
        for item in db[record]:
            if (type(db[record][item]).__name__) == 'str':
                print(item, '\t', db[record][item])
            else:
                print(item, end=':')
                for listItem in db[record][item]:
                    print('\t', listItem, end='\n')
        print('\r')

while 1:
    action = int(input('1 - print, 2 - write'))

    if(action == 1):
        outputDB(db)
    else:
        index = input('введите индекс')
        temp = dict()
        for key in keys:
            print('enter value for ', key)
            value = input('enter value: ')
            if '___' in value:
                temp[key] = value.split('___')
            else:
                temp[key] = value
        db[index] = temp
        #outputDB(db)
db.close()    
print('stop')


button = tkinter.Button(row6, text = 'Send', height = 20, width = 20, relief = 'raised', cursor = 'hand1', font = ('times', 14, 'bold'))
button.bind('<Button-1>', lambda event: recAction(  event, 1,
													type = 'dvd',
													number = 13,
													video = 'srat wars',
													audio = 'soundtrack'))
