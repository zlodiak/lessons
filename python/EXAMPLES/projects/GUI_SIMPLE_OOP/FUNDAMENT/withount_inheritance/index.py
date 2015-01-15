import tkinter

 
class But_print():
     def __init__(self, parent):
          self.but = tkinter.Button(parent, text = 'press me', command = lambda: self.press(parent))
          self.but.pack()
          
     def press(self, parent):
          parent.destroy()
 
root = tkinter.Tk()
root2 = tkinter.Tk()
obj = But_print(root)
obj2 = But_print(root2)
root.mainloop()
