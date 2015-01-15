import shelve

db = shelve.open('data')
keys = ['id', 'type', 'number'];

def outputDB(db):
    for record in db:
        print(record, ': ', db[record])
        for item in db[record]:    
            print(item, '--', db[record][item])
        print('-----')

while 1:
    action = int(input('1 - print, 2 - write'))

    if(action == 1):
        outputDB(db)
    else:
        index = input('введите индекс')
        temp = dict()
        for key in keys:
            print('enter value for ', key)
            value = str(input('enter value: '))
            temp[key] = value
        db[index] = temp
        outputDB(db)
db.close()    
print('stop')
