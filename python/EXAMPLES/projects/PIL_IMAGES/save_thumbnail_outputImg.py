import os, sys
import tkinter
from PIL.ImageTk import PhotoImage, Image

main = tkinter.Tk()


catalog1 = 'imgs'
catalog2 = 'newImgs'
file1 = 'n.jpg'
ima1 = os.path.join(catalog1, file1)

objImg = Image.open(ima1)
print(objImg)
renderImg = PhotoImage(file=ima1)
tkinter.Label(main, image=renderImg).pack()
print(renderImg)

objImg.thumbnail((500, 200), Image.ANTIALIAS)

try:
    objImg.save(catalog2 + '/' + 'cv.jpg')
except:
    print('im err')
else:
    print('jr')
    
main.mainloop()
