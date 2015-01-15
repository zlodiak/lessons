import os, sys
import tkinter
import PIL.Image
import PIL.ImageTk

main = tkinter.Tk()

catalogImg1 = 'imgs'
nameImg1 = 'n.jpg'
pathImg1 = os.path.join(catalogImg1, nameImg1)

openImg = PIL.Image.open(pathImg1)

renderImg = PIL.ImageTk.PhotoImage(openImg)
tkinter.Label(main, image=renderImg).pack()

main.mainloop()
