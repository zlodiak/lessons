import tkinter
import tkinter.messagebox


class Operations():
    
    def new(self, parent):
        global workArea

        if workArea == True:
            tkinter.messagebox.showwarning('Warning', 'New document is already open')
        else:    
            self.new = WorkArea(parent)
            workArea = True      
    
    def openFile(self):
        global workArea

        if workArea == True:
            tkinter.messagebox.showwarning('Warning', 'Close the open document')
        else:
            try:
                nameOpenFile = tkinter.filedialog.askopenfilename(title = 'Open textPad file', filetypes=[("textPad files", "*.tpd")])
            except Exception:
                pass
            else:
                try:
                    pointerFileOpened = open(nameOpenFile, 'rt')
                except Exception:
                    tkinter.messagebox.showerror('Error', 'Open file error')
                else:
                    self.new(root)
                    self.new.insert_(pointerFileOpened)
                finally:                        
                    pointerFileOpened.close()



class WorkArea(tkinter.Text):
    
    def __init__(self, parent):
        tkinter.Text.__init__(self, parent)
        parent.title("My default workarea")
        self.pack(expand = 'yes', fill = 'both')

    def insert_(self, pointerFileOpened):
        while True:
            line = pointerFileOpened.readline()
            if len(line) == 0:
                break
            else:
                self.insert(tkinter.END, line)     

     
class ToolBar(Operations, tkinter.Frame):
    
    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.parent = parent  
        self.makeToolBar()
        
    def makeToolBar(self):
        frame = tkinter.Frame(self.parent)
        frame.pack(side = 'top', fill = 'x')
        
        tool1 = tkinter.Button(frame, text = 'New', command = lambda: self.new(root))
        tool1.pack(side = 'left')

        tool2 = tkinter.Button(frame, text = 'Open', command = lambda: self.openFile())
        tool2.pack(side = 'left')


workArea = False

root = tkinter.Tk()
root.geometry('900x500+200+100')
toolBar = ToolBar(root)
root.mainloop()
