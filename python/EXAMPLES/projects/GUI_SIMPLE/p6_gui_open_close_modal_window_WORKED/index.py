from tkinter import *

root = Tk()
root.geometry("500x700")

label1 = Label(root, text = "Число 1", bg = "red", fg = "white")
label1.pack(side = LEFT, anchor=NW)

input1 = Entry(root, width = 20, bd = 3)
input1.pack(side = LEFT, anchor=NW)

label2 = Label(root, text = "Число 2", bg = "red", fg = "white")
label2.pack(side = LEFT, anchor=NW)

input2 = Entry(root, width = 20, bd = 3)
input2.pack(side = LEFT, anchor=NW)

var=IntVar()
var.set(1)
rad0 = Radiobutton(root,text="сложить",
          variable=var,value=0)
rad1 = Radiobutton(root,text="вычесть",
          variable=var,value=1)
rad2 = Radiobutton(root,text="умножить",
          variable=var,value=2) 
rad3 = Radiobutton(root,text="поделить",
          variable=var,value=3)

rad0.pack()
rad1.pack()
rad2.pack()
rad3.pack()


def modalReset():
     win.withdraw()

def modalShow():
     win.deiconify()

def calculate():
     i1 = int(input1.get())
     i2 = int(input2.get())
     operation = var.get()
     
     if operation == 0:
          resultat = i1 + i2
     elif operation == 1:
          resultat = i1 - i2
     elif operation == 2:
          resultat = i1 * i2
     else:
          resultat = i1 / i2

     modalShow()
     
button = Button(root, text = 'выполнить действие', command = calculate)
button.pack()

win = Toplevel(root)
win.withdraw()

label4 = Label(win, text = 'modal')
label4.pack()

butReset = Button(win, text = 'reset', command = modalReset)
butReset.pack();


root.mainloop() 
