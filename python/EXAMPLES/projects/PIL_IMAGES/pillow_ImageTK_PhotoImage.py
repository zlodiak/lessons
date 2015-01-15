import tkinter
from PIL import Image, ImageTk

root = tkinter.Tk()

nameImage = Image.open('images/img1.png')
pointerImage = ImageTk.PhotoImage(nameImage)
item = tkinter.Button(root,
                width=200,
                height=200,
                relief='raised',
                image=pointerImage,
                borderwidth=5
            )
item.pack()

root.mainloop()
