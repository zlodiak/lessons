import tkinter
import shelve
import re

db = shelve.open('data')

flagSubmit2 = False
flagSubmit3 = False

def fileOpen():
    fileName = tkinter.filedialog.askopenfilename()
    str = fileName.split('/')[-1]

    flagOpen = False
    
    if str.endswith('.bak'):
        flagOpen = True
    elif str.endswith('.dir'):
        flagOpen = True
    elif str.endswith('.dat'):
        flagOpen = True
       
    fileNameClean =str.split('.')[0:-1]

  
    for record_key, record_value in db.items():
        print(record_key, ':: ', end = '\n')
        print('\ttype:\t', record_value['type'], end = '\n')
        print('\tnumber:\t', record_value['number'], end = '\n')
        print('\tvideo:\t', record_value['video'], end = '\n')
        print('\taudio:\t', record_value['audio'], end = '\n')
        print('=================')

def recAction(event, **args):
    global flagSubmit2, flagSubmit3

    if(flagSubmit2 and flagSubmit3):  
        db_keys = []
        for key in db:
            print(key, end = '\n')
            db_keys.append(key)
        new_id = int(max(db_keys)) + 1
        new_id = str(new_id)

        try:
            db[new_id] = args
        except:
            tkinter.messagebox.showerror("Error", "invalid record. try again")
        else:
            addForm.destroy()
            tkinter.messagebox.showinfo("Complete", "Record complete")
    else:
        tkinter.messagebox.showerror("Error", "invalid data. enter data again")
        return

def type_check(t, value):
    global flagSubmit2, flagSubmit3
    
    if(t == 'str'):
        flagSubmit2 = (True if re.match('[a-zA-Zа-яА-Я]', value[0]) else False)
    else:
        flagSubmit3 = (True if re.match('[^a-zA-Zа-яА-Я]', value[0]) else False)
    
def addFormOpen():
    global addForm
    global flagSubmit2, flagSubmit3
    
    addForm = tkinter.Toplevel(root)
    addForm.geometry("340x170")    
    
    title = tkinter.Label(addForm, text = 'Add record mode', relief = 'sunken', pady = 5)
    title.pack(fill = 'x')
    
    row2 = tkinter.Frame(addForm)
    row2.pack(side = 'top', fill = 'x')
    label2 = tkinter.Label(row2, text = 'Type', width = 10, anchor='e')
    label2.pack(side = 'left')
    entry2 = tkinter.Entry(row2)
    entry2.bind('<FocusOut>', lambda event: type_check('str', entry2.get()))
    entry2.pack(side = 'right', fill = 'x', expand = 'yes')

    row3 = tkinter.Frame(addForm)
    row3.pack(side = 'top', fill = 'x')
    label3 = tkinter.Label(row3, text = 'Number', width = 10, anchor='e')
    label3.pack(side = 'left')
    entry3 = tkinter.Entry(row3)
    entry3.bind('<FocusOut>', lambda event: type_check('int', entry3.get()))
    entry3.pack(side = 'right', fill = 'x', expand = 'yes')

    row4 = tkinter.Frame(addForm)
    row4.pack(side = 'top', fill = 'x')
    label4 = tkinter.Label(row4, text = 'Video', width = 10, anchor='e')
    label4.pack(side = 'left')
    entry4 = tkinter.Entry(row4)
    entry4.pack(side = 'right', fill = 'x', expand = 'yes')

    row5 = tkinter.Frame(addForm)
    row5.pack(side = 'top', fill = 'x')
    label5 = tkinter.Label(row5, text = 'Audio', width = 10, anchor='e')
    label5.pack(side = 'left')
    entry5 = tkinter.Entry(row5)
    entry5.pack(side = 'right', fill = 'x', expand = 'yes')       

    row6 = tkinter.Frame(addForm, borderwidth = 10)
    row6.pack(side = 'top', fill = 'x')
    button = tkinter.Button(row6, text = 'Send', height = 20, width = 20, relief = 'raised', cursor = 'hand1', font = ('times', 14, 'bold'))
    button.bind('<Button-1>', lambda event: recAction(  event, 
                                                        type = entry2.get(),
                                                        number = entry3.get(),
                                                        video = entry4.get(),
                                                        audio = entry5.get()))
    button.pack()
    
    addForm.grab_set()
    addForm.focus_set()
    addForm.wait_window()
        
def makeMenu(parent):
    top = tkinter.Menu(parent) 
    parent.config(menu = top)                           

    file = tkinter.Menu(top)
    file.add_command(label = 'New...')
    file.add_command(label = 'Open...', command = fileOpen, underline = 0, accelerator = 'ctrl + o')
    file.add_command(label = 'Close...')
    file.add_command(label = 'Quit', command = parent.quit)
    top.add_cascade(label = 'File', menu = file, underline = 0)

    edit = tkinter.Menu(top, tearoff = False)
    edit.add_command(label = 'Cut')
    edit.add_command(label = 'Paste')
    edit.add_command(label = 'Add', command = addFormOpen)
    edit.add_separator()
    top.add_cascade(label = 'Edit', menu = edit)

    submenu = tkinter.Menu(edit, tearoff = True)
    submenu.add_command(label = 'Spam')
    submenu.add_command(label = 'Eggs')
    edit.add_cascade(label = 'Stuff', menu = submenu)

    #parent.bind_class('Text', '<Control-Key-o>', fileOpen)

def makeWorkArea(parent):
    WorkArea = tkinter.Frame(parent)
    WorkArea.config(relief = 'sunken', width = 340, height = 170, bg = 'red')
    WorkArea.pack(expand = 'yes', fill = 'both')
    WorkArea.pack_propagate(False)
    
    msg = tkinter.Label(WorkArea, text='Window menu basics')
    msg.pack()
  
keys = ['id', 'type', 'number', 'video', 'audio'];    

root = tkinter.Tk()
root.title('Disc DataBase')
#root.geometry("340x170")

makeMenu(root)
#makeWorkArea(root)

root.mainloop()
