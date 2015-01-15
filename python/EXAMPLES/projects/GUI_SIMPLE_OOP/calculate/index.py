#!/usr/bin/env python 
from tkinter import *

class Application(Frame): 
    def __init__(self, master=None):
        Frame.__init__(self, master) 
        self.grid() 
        self.createWidgets()

    def createWidgets(self):
        self.label1 = Label(self, text = "Число 1", bg = "red", fg = "white")
        self.label1.pack(side = LEFT, anchor=NW)

        self.input1 = Entry(self, width = 20, bd = 3)
        self.input1.pack(side = LEFT, anchor=NW)

        self.label2 = Label(self, text = "Число 2", bg = "red", fg = "white")
        self.label2.pack(side = LEFT, anchor=NW)

        self.input2 = Entry(self, width = 20, bd = 3)
        self.input2.pack(side = LEFT, anchor=NW)

        self.var=IntVar()
        self.var.set(1)
        
        self.rad0 = Radiobutton(self,text="сложить", variable=self.var,value=0)
        self.rad1 = Radiobutton(self,text="вычесть", variable=self.var,value=1)
        self.rad2 = Radiobutton(self,text="умножить", variable=self.var,value=2) 
        self.rad3 = Radiobutton(self,text="поделить", variable=self.var,value=3)

        self.rad0.pack()
        self.rad1.pack()
        self.rad2.pack()
        self.rad3.pack()

     
        self.button = Button(self, text = 'выполнить действие', command = self.calculate)
        self.button.pack()

        self.result = Label(self, text = 'result', fg = 'red')
        self.result.pack()

        self.quitButton = Button(self, text='Quit', command = self.remApp) 
        self.quitButton.pack(side = BOTTOM)

    def remApp(self):
        self.master.destroy()

    def calculate(self):
        i1 = int(self.input1.get())
        i2 = int(self.input2.get())
        operation = self.var.get()

        if operation == 0:
            resultat = i1 + i2
        elif operation == 1:
            resultat = i1 -i2
        elif operation == 2:
            resultat = i1 * i2
        else:
            resultat = i1 / i2

        self.result.configure(text = resultat, fg = 'blue')

app = Application() 
app.master.title('Sample application') 
app.mainloop()
