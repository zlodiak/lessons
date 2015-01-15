import tkinter
import tkinter.messagebox
import random
from PIL import Image, ImageTk # <---

root = tkinter.Tk()
color = 'white'

item = tkinter.Button(root,
                text=color,
                width=20,
                height=10,
                relief='raised',
                borderwidth=5,
                bg=color
            )

original = Image.open('images/img1.png')
ph_im = ImageTk.PhotoImage(original) # <----------
item.config(image=ph_im)
item.pack(side='left')
root.mainloop()
