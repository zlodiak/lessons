import shelve
import pprint
import time
import math


def output(fileName):
    try:
        db = shelve.open(fileName)
    except OSError:
        print('OSError')
    except Exception:
        print(Exception)
    else:
        
        d = db
        print(d)
        keysDb = d.keys()
        pprint.pprint(keysDb)
        '''
        for key in sorted(db):
            date = time.ctime(int(key.split('.')[0]))
            print('date: ', date, '\t path: ', db[key], '\n')
        '''
    finally:
        db.close()


fileName = '2018_sergey_kalinin'
output(fileName)        

