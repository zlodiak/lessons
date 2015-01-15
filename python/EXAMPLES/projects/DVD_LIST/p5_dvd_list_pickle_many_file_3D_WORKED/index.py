import pickle, glob

keys = ['id', 'type', 'number', 'video', 'audio']

def outputDB():
    print('------------------------------')
    for filename in glob.glob('*.pkl'):
        data = open(filename, 'rb')
        record = pickle.load(data)
        print(filename, '-', record)
        for item in record:
                if (type(record[item]).__name__) == 'str':
                        print(item, '\t', record[item])
                else:
                        print(item, end=':')
                        for listItem in record[item]:
                                print('\t', listItem, end='\n')
        print('\r')

while 1:
    db = dict()
    action = int(input('1 - print, 2 - write'))
    if(action == 1):
        outputDB()
    else:
        index = input('Введите index ')
        data = open(index + '.pkl', 'wb')
        temp = dict()
        for key in keys:
            print('enter value for ', key)
            value = input('enter value: ')
            if '___' in value:
                temp[key] = value.split('___')
            else:
                temp[key] = value
        pickle.dump(temp, data)
        data.close()   
print('stop')      

        

