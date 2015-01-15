from tkinter import Tk, Canvas, Frame, Button
from tkinter import BOTH, W, NW, SUNKEN, TOP, X, FLAT, LEFT

class Example(Frame):
    def __init__(self, parent):
        Frame.__init__(self, parent)
        self.parent = parent
        self.initUI()

    def initUI(self):
        self.parent.title("Layout Test")
        self.config(bg = '#F0F0F0')
        self.pack(fill = BOTH, expand = 1)
        
        #create canvas
        canvas1 = Canvas(self, relief = FLAT, background = "red", width = 180, height = 500)
        canvas1.pack(side = TOP, anchor = NW, padx = 10, pady = 10)
        window = canvas1.create_window(50, 10, anchor=NW)
        
        #add quit button
        button1 = Button(canvas1, text = "Quit", command = self.quit)


              

def main():
    root = Tk()
    root.geometry('800x600+10+50')
    app = Example(root)
    app.mainloop()

if __name__ == '__main__':
    main()
