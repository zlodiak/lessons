from tkinter import *

root = Tk()
root.geometry("500x500")

def modalReset():
     win.withdraw()

def modalShow():
     label.configure(text = ent.get())
     win.deiconify()   

ent = Entry(root)
ent.pack()

button = Button(root, text = 'open modal', command = modalShow)
button.pack()

win = Toplevel(root)
win.withdraw()

label = Label(win)
label.pack()

root.mainloop() 
