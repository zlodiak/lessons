import tkinter
import shelve

def fileOpen():
    print('start output dictonary "db"', end = '\n')
    try:  
        db = shelve.open('data', 'r')        
    except:
        print('invalid filename. try again')
    else:    
        for record_key, record_value in db.items():
            print(record_key, ':: ', end = '\n')
            print('\ttype:\t', record_value['type'], end = '\n')
            print('\tnumber:\t', record_value['number'], end = '\n')
            print('\tvideo:\t', record_value['video'], end = '\n')
            print('\taudio:\t', record_value['audio'], end = '\n')
            print('=================')
            db.close()

def recAction(event, id, **args):
    print('ID: ', id, end = '\n')
    for arg in args:
        print(arg, '---', args[arg], end = '\n')
        
    db = shelve.open('data')

    try:
        db[id] = args
    except:
        tkinter.messagebox.showerror("Error", "invalid record. try again")
    else:
        db.close()
        tkinter.messagebox.showinfo("Complete", "Record complete")

    print('OK. now output dictonary "db"')
    fileOpen()

root = tkinter.Tk()
button = tkinter.Button(root, text = 'Send', height = 20, width = 20, relief = 'raised', cursor = 'hand1', font = ('times', 14, 'bold'))
button.bind('<Button-1>', lambda event: recAction(event, '1', type = 'dvd', number = '13', video = 'srat wars', audio = 'soundtrack'))
button.pack()

root.mainloop()
