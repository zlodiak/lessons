import tkinter
import tkinter.messagebox
import random


class Application(tkinter.Frame):
    
    def __init__(self, parent=None):
        tkinter.Frame.__init__(self, parent)
        self.config(width=700, height=500)
        self.pack_propagate(False)
        self.slides = {
            'blue': 'active',
            'red': 'active',
            'green': 'unactive',
            'orange': 'active',
            'navy': 'active'
        }
        self.make_widgets()
        self.pack()
        self.period = 1000

    def make_widgets(self):
        self.buttonState = tkinter.Button(self, text='Start', command=self.on_start)
        self.buttonState.pack()

        self.periodScale = tkinter.Scale(   self,
                                            label='Time period',
                                            orient='horizontal',
                                            from_=1,
                                            to=5
                                    )
        self.periodScale.pack()

        self.buttonsArea = tkinter.Frame(self, pady=30)
        self.buttonsArea.pack()
        
        for (i, color) in enumerate(self.slides.keys()):
            item = tkinter.Button( self.buttonsArea,
                            text=color,
                            width=20,
                            height=10,
                            relief='raised',
                            borderwidth=5,
                            bg=color
                        )
            item.bind('<Button-1>', lambda event, i=i, color=color: self.invert_value(i, color))
            item.pack(side='left')

        self.svetofor = tkinter.Canvas(self, bg='red', width=300, height=200)
        self.svetofor.pack()

    def on_start(self):
        self.loop = True
        self.buttonState.config(text='Stop', command=self.on_stop)
        self.on_timer()

    def on_stop(self):
        self.loop = False
        self.buttonState.config(text='Start', command=self.on_start)

    def on_timer(self):
        if self.loop:
            li = []
            li[:] = [c for c,s in self.slides.items() if s == 'active']
            if len(li) == 0:
                try:
                    self.on_stop()
                except NameError:
                    tkinter.messagebox.showerror('Error', 'Function call error')
                except Exception:
                    tkinter.messagebox.showerror('Error', 'System error')
                else:
                    tkinter.messagebox.showinfo('Info', 'Forced stop')
                finally:
                    self.after(self.periodScale.get() * 1000, self.on_timer)
            else:             
                self.svetofor.config(bg=random.choice(li))
                self.after(self.periodScale.get() * 1000, self.on_timer)

    def invert_value(self, i, color):
        self.slides[color] = 'active' if self.slides[color] == 'unactive' else 'unactive'      
        print(self.slides)
        
if __name__ == '__main__':
    root = tkinter.Tk()
    root.title('svetofor')
    root.geometry('700x500')
    Application(root)
    root.mainloop()
