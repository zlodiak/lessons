import pickle, glob

keys = ['id', 'type', 'number'];

def outputDB():
    for filename in glob.glob('*.pkl'):
        data = open(filename, 'rb')
        record = pickle.load(data)
        print(filename, '-', record)
    print('-----')

while 1:
    db = dict()
    action = int(input('1 - print, 2 - write'))
    if(action == 1):
        outputDB()
    else:
        index = input('Введите index ')
        data = open(index + '.pkl', 'wb')
        db[index] = dict()
        for key in keys:
            print('enter value for ', key)
            value = str(input('enter value: '))
            db[index][key] = value
        pickle.dump(db, data)
        data.close()   
print('stop')      

        

