import tkinter
import tkinter.messagebox
import sys


class TextPad(tkinter.Frame):

    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.pack(side = 'top', fill = 'x', expand = 'yes')

        self.parent = parent
        self.flagOpenArea = False
        self.flagOpenFile = False
        
        self.make_menu_bar()

    def make_menu_bar(self):
        self.menubar = tkinter.Menu(self) 
        self.parent.config(menu = self.menubar)                           

        self.file = tkinter.Menu(self.menubar, tearoff = False)
        self.file.add_command(label = 'New', accelerator = 'ctrl + n', command = lambda: self.toggle_work_area(True))
        self.file.add_command(label = 'Open...', accelerator = 'ctrl + o', command = self.open_file)
        self.file.add_command(label = 'Save...', accelerator = 'ctrl + s')
        self.file.add_command(label = 'Save as...')
        self.file.add_command(label = 'Close...', accelerator = 'ctrl + c', command = lambda: self.toggle_work_area(False))
        self.file.add_command(label = 'Quit', accelerator = 'ctrl + q')
        self.menubar.add_cascade(label = 'File', menu = self.file)

    def open_file(self):
        if self.flagOpenFile:
            print('file is open now')
        elif not self.flagOpenFile:
            try:
                self.nameFileOpen = tkinter.filedialog.askopenfilename(title = 'Open textPad file', filetypes=[("textPad files", "*.tpd")])
                self.pointerFileOpen = open(self.nameFileOpen, 'rt')
            except:
                print('exception open file')
            else:
                try:
                    self.toggle_work_area(True)
                except:
                    pass
                else:
                    while True:
                        self.line = self.pointerFileOpen.readline()
                        if len(self.line) == 0:
                            break
                        self.workarea.insert(tkinter.END, self.line)
                    self.flagOpenFile = True
            finally:
                self.pointerFileOpen.close()
            
    def toggle_work_area(self, action):
        if action:
            if self.flagOpenArea:
                print('w e')
            else:
                self.workarea = tkinter.Text(self)
                self.workarea.pack(expand = 'yes', fill = 'both')
                self.flagOpenArea = Truea
        elif not action:
            if self.flagOpenArea:
                self.workarea.destroy()
                self.flagOpenArea = False
                self.flagOpenFile = False
            else:
                print('wa not op')


if __name__ == '__main__':
    root = tkinter.Tk()
    root.geometry('800x500')
    root.title('textPad v.2')
    root.iconbitmap('images/ico.ico')
    TextPad(root)
    root.mainloop()
