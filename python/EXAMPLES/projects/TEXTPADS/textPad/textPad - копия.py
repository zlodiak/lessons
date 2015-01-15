import tkinter
import sys


def fileNew(parent, title = 'New file(nonamed)'):
    global WorkArea

    try:
        WorkArea
    except:    
        WorkArea = tkinter.Text(parent)
        root.title(title)
        WorkArea.pack(expand = 'yes', fill = 'both')
    else:
        #tkinter.messagebox.showerror.iconbitmap('error')
        tkinter.messagebox.showerror('Error', 'File is open. Close this file for new operation')
    
def fileOpen():
    global fileOpened, openFile
    
    try:
        WorkArea 
    except:
        openFile = tkinter.filedialog.askopenfilename(title = 'Open textPad file', filetypes=[("textPad files", "*.tpd")])
        fileNew(root, openFile)

        try:
            fileOpened = open(openFile, 'rt')
        except:
            tkinter.messagebox.showerror('Error', 'Open file error')
        else:
            while True:
                line = fileOpened.readline()
                if len(line) == 0:
                    break
                WorkArea.insert(tkinter.END, line)
            fileOpened.close()
    else:
        try:
            fileOpened
        except:
            tkinter.messagebox.showerror('Error', 'Close opened file')
        else:
            tkinter.messagebox.showerror('Error', 'Close or save nonamed file')

def fileSave():
    global fileOpened, openFile, WorkArea
    try:
        WorkArea
    except:
        tkinter.messagebox.showerror('Error', 'File not open')
    else:
        try:
            fileOpened
        except:
            fileSaveAs()
        else:
            fileOpened.close() 
            text = WorkArea.get('0.0', tkinter.END)
            fileOpened = open(openFile, 'wt')
            fileOpened.write(text)
            fileOpened.close()
    
def fileSaveAs():
    global fileOpened, openFile, WorkArea
    try:
        WorkArea
    except:
        tkinter.messagebox.showerror('Error', 'File not open')
    else:
        text = WorkArea.get('0.0', tkinter.END)
        save = tkinter.filedialog.asksaveasfilename(title = 'Save textPad file', filetypes=[("textPad files", "*.tpd")], defaultextension = '.tpd')
        file = open(save, 'wt')
        file.write(text)
        file.close()
        root.title(save)

def fileClose():
    global fileOpened, WorkArea, openFile
    WorkArea.destroy()
    root.title('textPad editor')
    del WorkArea    

    try:
        openFile
    except:
        pass
    else:
        del openFile    

    try:
        fileOpened
    except:
        pass
    else:
        del fileOpened

def reset():
    #print(yesNo("Exit", "Do you want to quit?"))
    if yesNo("Exit", "Do you want to quit?"):
        sys.exit()
    else:
        print('f')

def yesNo(title, message):
    if tkinter.messagebox.askyesno(title, message):
        result = True
    else:
        result = False

    return result    

def makeMenu(parent):
    top = tkinter.Menu(parent) 
    parent.config(menu = top)                           

    file = tkinter.Menu(top, tearoff = False)
    file.add_command(label = 'New', command = lambda: fileNew(parent), accelerator = 'ctrl + n')
    file.add_command(label = 'Open...', command = fileOpen, accelerator = 'ctrl + o')
    file.add_command(label = 'Save...', command = fileSave, accelerator = 'ctrl + s')
    file.add_command(label = 'Save as...', command = fileSaveAs)
    file.add_command(label = 'Close...', command = fileClose, accelerator = 'ctrl + c')
    file.add_command(label = 'Quit', command = reset, accelerator = 'ctrl + q')
    top.add_cascade(label = 'File', menu = file)
    
root = tkinter.Tk()
root.geometry("1000x500")
root.iconbitmap('images/ico.ico')

root.bind("<Control-Key-n>", lambda event: fileNew(root))
root.bind("<Control-Key-o>", lambda event: fileOpen())
root.bind("<Control-Key-s>", lambda event: fileSave())
root.bind("<Control-Key-c>", lambda event: fileClose())
root.bind("<Control-Key-q>", lambda event: reset())

makeMenu(root)

root.mainloop()
