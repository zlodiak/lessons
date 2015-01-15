import os, sys
import tkinter
from PIL import ImageTk, Image

main = tkinter.Tk()

catalogImg1 = 'imgs'
nameImg1 = 'n.jpg'
pathImg1 = os.path.join(catalogImg1, nameImg1)

openImg = Image.open(pathImg1)

renderImg = ImageTk.PhotoImage(openImg)
tkinter.Label(main, image=renderImg).pack()

main.mainloop()
