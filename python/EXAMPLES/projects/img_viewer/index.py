import os, sys
import tkinter
from PIL import ImageTk, Image

DIR_IMGS = 'imgs'
DIR_THUMBS = 'thumbs'
imgfiles = os.listdir(DIR_IMGS)
thumbfiles = os.listdir(DIR_THUMBS)

root = tkinter.Tk()
root.geometry('900x700')
links = []
linksTumbs = []


def showItem(imgfile):
    print(imgfile)
    pathImg = os.path.join(DIR_IMGS, imgfile)
    print(pathImg)
    renderImg = ImageTk.PhotoImage(file=pathImg)
    popup = tkinter.Toplevel()
    bu = tkinter.Button(popup, image=renderImg).pack()
    linksTumbs.append(renderImg)


def createThumbs():
    for imgfile in imgfiles:
        pathImg1 = os.path.join(DIR_IMGS, imgfile)
        pathImg2 = os.path.join(DIR_THUMBS, imgfile)
            
        openImg = Image.open(pathImg1)
        openImg.thumbnail((100, 100))
        openImg.save('thumbs/' + imgfile)

        
def outputButtons():
    for thumbfile in thumbfiles:
        pathImg = os.path.join(DIR_THUMBS, thumbfile)
        renderImg = ImageTk.PhotoImage(file=pathImg)
        but = tkinter.Button(root, image=renderImg)
        but.pack(side='top')
        but.bind('<Button-1>', lambda event, thumbfile=thumbfile: showItem(thumbfile))
        links.append(renderImg)


createThumbs()
outputButtons()

root.mainloop()
