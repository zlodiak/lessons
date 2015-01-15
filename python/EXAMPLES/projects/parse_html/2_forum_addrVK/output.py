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
        keysDb = []
        for key in sorted(db):            
            keysDb.append(key)

        for key in sorted(keysDb):
            date = time.ctime(int(key.split('.')[0]))
            print('date: ', date, '\t path: ', db[key], '\n')
    finally:
        db.close()

        lastKey = keysDb[-1]

    return lastKey


fileName = '2018_sergey_kalinin'
output(fileName)        

