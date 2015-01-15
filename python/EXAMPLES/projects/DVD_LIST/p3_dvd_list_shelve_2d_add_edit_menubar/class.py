from tkinter import*

import tkinter as tk


class Packbox(tk.Frame):
    def __init__(self, root):
        tk.Frame.__init__(self, root)


        bottomframe = Frame(root)


        bottomframe.pack( side = BOTTOM )


        # Initialize buttons redbutton, whitebutton and bluebutton



        whitebutton = Button(self, text="Red", fg="red", command=self.white_button)
        whitebutton.pack( side = LEFT)

        redbutton = Button(self, text="white", fg="white",  command=self.red_button)
        redbutton.pack( side = LEFT )



        bluebutton = Button(self, text="Blue", fg="blue", command=self.blue_button)
        bluebutton.pack( side = LEFT )

        self.white_button()
        self.red_button()
        self.blue_button()

        # Define each buttons method, for example,  white_button() is whitebutton's method, which
        # is called by command=self.white_button


    def white_button(self):

        self.top = tk.Toplevel(self)

        # Creates new button that closes the new window that is opened when one of the color buttons
        # are pressed. 
        button = tk.Button(self.top, text="Close window", command=self.top.destroy)

        # prints the text in the new window that's opened with the whitebutton is pressed

        label = tk.Label(self.top, wraplength=200,text="This prints white button txt")


        label.pack(fill="x")
        button.pack()


    def red_button(self):

        self.top = tk.Toplevel(self)
        button = tk.Button(self.top, text="Close window", command=self.top.destroy)

        label = tk.Label(self.top, wraplength=200,text="This prints red button txt")

        label.pack(fill="x")
        button.pack()




    def blue_button(self):

        self.top = tk.Toplevel(self)
        button = tk.Button(self.top, text="Close window", command=self.top.destroy)

        label = tk.Label(self.top, wraplength=200,text="This prints blue button txt")


        label.pack(fill="x")

        button.pack()



if __name__ == "__main__":
    root = tk.Tk()
    Packbox(root).pack(side="top", fill="both", expand=True)
    root.mainloop()
