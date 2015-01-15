import tkinter

root = tkinter.Tk()

row6 = tkinter.Frame(root)
row6.pack()

button = tkinter.Button(row6, text = 'show')
button.bind('<Button-1>', lambda event: label4.pack())
button.pack()

button = tkinter.Button(row6, text = 'hide')
button.bind('<Button-1>', lambda event: label4.pack_forget())
button.pack()

label4 = tkinter.Label(row6, text = 'qwerty')
label4.pack()

root.mainloop()
