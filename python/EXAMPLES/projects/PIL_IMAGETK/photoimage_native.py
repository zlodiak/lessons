import tkinter

root = tkinter.Tk()

image = tkinter.PhotoImage(file='images/img1.gif', width=60, height=60)
button = tkinter.Button(root, image=image)
button.pack()

root.mainloop()
