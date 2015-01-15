import tkinter
import tkinter.messagebox
import sys


class Operations():
    
    def new_document(self):
        print(self.flagOpenDocument)
        
        if self.flagOpenDocument:
            tkinter.messagebox.showwarning('Warning', 'New document is already open')
        else:    
            self.newArea = WorkArea()
            self.flagOpenDocument = True
    
    def close(self):
        if not self.flagOpenDocument:
            tkinter.messagebox.showwarning('Warning', 'Document is not open yet')
        else:
            if self.question('Close confirm', 'You really want to close the document?'):
                self.newArea.destroy()  
                self.flagOpenDocument = False
            else:
                pass
    
    def open_file(self):
        global flagOpenDocument

        if flagOpenDocument:
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
                    self.new_document(root)
                    self.newArea.insert_(pointerFileOpened)
                finally:                        
                    pointerFileOpened.close()

    def question(self, title, text, *args):
        return tkinter.messagebox.askyesno(title, text)

    def quitter(self):
        ans = self.question('Verify quit', 'Are you sure you want to quit?')
        if ans:
            sys.exit()

            
class TextPadMenu(Operations, tkinter.Frame):
    
    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.pack(side = 'top', fill = 'x')
        self.parent = parent  
        self.make_menu_bar()
    
    def make_menu_bar(self):
        menubar = tkinter.Menu(self.parent) 
        self.parent.config(menu = menubar)                           

        file = tkinter.Menu(menubar, tearoff = False)
        file.add_command(label = 'New', accelerator = 'ctrl + n', command = lambda: self.new_document())
        file.add_command(label = 'Open...', accelerator = 'ctrl + o', command = lambda: self.open_file())
        file.add_command(label = 'Save...', accelerator = 'ctrl + s')
        file.add_command(label = 'Save as...')
        file.add_command(label = 'Close...', accelerator = 'ctrl + c', command = lambda: self.close())
        file.add_command(label = 'Quit', accelerator = 'ctrl + q', command = self.quitter)
        menubar.add_cascade(label = 'File', menu = file)


class WorkArea(tkinter.Text):
    
    def __init__(self):
        tkinter.Text.__init__(self)
        self.pack(expand = 'yes', fill = 'both')

    def remove_(self):    
        self.remove()
        
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
        self.pack(side = 'top', fill = 'x')
        self.parent = parent  
        self.make_tool_bar()
        
    def make_tool_bar(self):
        frame = tkinter.Frame(self.parent)
        frame.pack(side = 'top', fill = 'x')
        
        tool1 = tkinter.Button(frame, text = 'New', command = lambda: self.new_document())
        tool1.pack(side = 'left')

        tool2 = tkinter.Button(frame, text = 'Open', command = lambda: self.open_file())
        tool2.pack(side = 'left')

        tool3 = tkinter.Button(frame, text = 'Save')
        tool3.pack(side = 'left')

        tool4 = tkinter.Button(frame, text = 'Close', command = lambda: self.close())
        tool4.pack(side = 'left')

        tool5 = tkinter.Button(frame, text = 'Quit', command = self.quitter)
        tool5.pack(side = 'right')        


class TextPad(TextPadMenu, ToolBar, WorkArea):

    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.pack(side = 'top', fill = 'x', expand = 'yes')

        self.parent = parent
        self.flagOpenDocument = False
        
        self.make_elements()

    def make_elements(self):
        self.menu = TextPadMenu.__init__(self, self.parent)
        self.tools = ToolBar.__init__(self, self.parent)


TextPad(tkinter.Tk()).mainloop()
