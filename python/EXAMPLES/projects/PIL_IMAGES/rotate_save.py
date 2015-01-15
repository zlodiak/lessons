import os, sys
import tkinter
from PIL import ImageTk, Image

main = tkinter.Tk()

catalogImg1 = 'imgs'
catalogImg2 = 'newImgs'
nameImg1 = 'n.jpg'
nameImg2 = 'cv.jpg'
pathImg1 = os.path.join(catalogImg1, nameImg1)
pathImg2 = os.path.join(catalogImg2, nameImg2)

openImg = Image.open(pathImg1)
rotImg = openImg.rotate(200)
saveImg = rotImg.save(pathImg2)

renderImg = ImageTk.PhotoImage(rotImg)
tkinter.Label(main, image=renderImg).pack()

main.mainloop()
