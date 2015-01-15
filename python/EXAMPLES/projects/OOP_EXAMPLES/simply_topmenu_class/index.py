import tkinter

class TextPadMenu(tkinter.Frame):
    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent)
        self.parent = parent  
        self.makeMenuBar()
    
    def makeMenuBar(self):
        self.parent.title("My menu")
        
        menubar = tkinter.Menu(self.parent) 
        self.parent.config(menu = menubar)                           

        file = tkinter.Menu(menubar, tearoff = False)
        file.add_command(label = 'New', accelerator = 'ctrl + n')
        file.add_command(label = 'Open...', accelerator = 'ctrl + o')
        file.add_command(label = 'Save...', accelerator = 'ctrl + s')
        file.add_command(label = 'Save as...')
        file.add_command(label = 'Close...', accelerator = 'ctrl + c')
        file.add_command(label = 'Quit', accelerator = 'ctrl + q')
        menubar.add_cascade(label = 'File', menu = file)

root = tkinter.Tk()
menu = TextPadMenu(root)
root.mainloop()
