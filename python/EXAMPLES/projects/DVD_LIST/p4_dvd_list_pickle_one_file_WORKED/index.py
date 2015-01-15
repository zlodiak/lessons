import pickle

db = dict()
keys = ['id', 'type', 'number'];

def outputDB():
    data = open('data', 'rb')
    db = pickle.load(data)
    for item in db:  
        print(item, '--', db[item])
        print('-----')

while 1:
    action = int(input('1 - print, 2 - write'))

    if(action == 1):
        outputDB()
    else:
        data = open('data', 'wb')
        for key in keys:
            print('enter value for ', key)
            value = str(input('enter value: '))
            db[key] = value
        pickle.dump(db, data)
        data.close()   
print('stop')      

        

