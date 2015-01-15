import tkinter
import tkinter.messagebox
import sys
import shelve


class Application(tkinter.Frame):

    def __init__(self, parent):
        tkinter.Frame.__init__(self, parent, bg='yellow')
        self.pack(side = 'top', fill = 'x')
        self.start()

    def start(self):
        tollbarFrame=tkinter.Frame(self)
        tollbarFrame.pack(side='top', fill='x')
        tollbarFrame.config(bg='red')
        
        tool1=tkinter.Button(tollbarFrame, text='Show database', command=self.show_db)
        tool1.pack(side='left')

        tool2=tkinter.Button(tollbarFrame, text='Hidtabasee Da')
        tool2.pack(side='left')

        tool3=tkinter.Button(tollbarFrame, text='Add record', command=self.add_record)
        tool3.pack(side='left')

        tool4=tkinter.Button(tollbarFrame, text='Edit record')
        tool4.pack(side='left')

        tool5=tkinter.Button(tollbarFrame, text='Delete record')
        tool5.pack(side='left')

        tool6=tkinter.Button(tollbarFrame, text='Show record', command=self.max_id)
        tool6.pack(side='left')         

        tool7=tkinter.Button(tollbarFrame, text='Quit', command=sys.exit)
        tool7.pack(side='right')

        contentFrame=tkinter.Frame(self)
        contentFrame.pack(side='top', fill='x')
        contentFrame.config(bg='green')

        butt = tkinter.Button(contentFrame, text='qwerer')
        butt.pack()

    def add_record(self):
        self.childAdd = tkinter.Toplevel()
        self.childAdd.title='Add record'
        self.childAdd.geometry('300x200+300+300')

        frameType = tkinter.Frame(self.childAdd, width=300)
        frameType.pack(fill='x')
        labelType = tkinter.Label(frameType, text='Type')
        labelType.pack(side='left')
        entryType = tkinter.Entry(frameType, width=30)
        entryType.pack(side='right')
        entryType.focus_set()

        frameNumber = tkinter.Frame(self.childAdd, width=300)
        frameNumber.pack(fill='x')
        labelNumber = tkinter.Label(frameNumber, text='Number')
        labelNumber.pack(side='left')
        entryNumber = tkinter.Entry(frameNumber, width=30)
        entryNumber.pack(side='right')

        frameVideo = tkinter.Frame(self.childAdd, width=300)
        frameVideo.pack(fill='x')
        labelVideo = tkinter.Label(frameVideo, text='Video')
        labelVideo.pack(side='left')
        entryVideo = tkinter.Entry(frameVideo, width=30)
        entryVideo.pack(side='right')

        frameAudio = tkinter.Frame(self.childAdd, width=300)
        frameAudio.pack(fill='x')
        labelAudio = tkinter.Label(frameAudio, text='Audio')
        labelAudio.pack(side='left')
        entryAudio = tkinter.Entry(frameAudio, width=30)
        entryAudio.pack(side='right')           
        
        buttonSubmit = tkinter.Button(self.childAdd, text='Add', pady=5, padx=5, command=lambda: self.submit_add( 
                                                                                                                    entryType = entryType.get(),
                                                                                                                    entryNumber = entryNumber.get(),
                                                                                                                    entryVideo = entryVideo.get(),
                                                                                                                    entryAudio = entryAudio.get()
                                                                                                            )                                                                                                            
                                    )
        buttonSubmit.pack(side='right')

    def db_open(self):
        try:
            db = shelve.open('data')
        except Exception:
            tkinter.messagebox.showerror('Error', 'Open file error')
        else:
            return db

    def db_close(self):
        db = shelve.close('data')

    def max_id(self):
        db = self.db_open()
        idCollection = [id for id in db.keys()]
        if idCollection:
            maxId= max(idCollection)
            return maxId

    def submit_add(self, entryType, entryNumber, entryVideo, entryAudio):
        maxId = self.max_id()

        if not maxId:
            maxId = 0
        else:
            maxId = int(maxId) + 1

        try:
            db = self.db_open()
        except Exception:
            tkinter.messagebox.showerror('Error', 'Open file error')
        else:
            record = {}
            record['type'] = entryType
            record['number'] = entryNumber
            record['video'] = entryVideo
            record['audio'] = entryAudio
            db[str(maxId)] = record
            self.childAdd.destroy()
        finally:
            db.close()
            

    def show_db(self):
        db = self.db_open()
        child = tkinter.Toplevel()
        child.title='Show DB'
        boxMain = VerticalScrolledFrame(child)
        boxMain.pack()
        for record in sorted(db):
            print(record, end='\n')
            boxLabel = tkinter.Frame(boxMain.interior, bg='red')
            boxLabel.pack(side='top', fill='x')
            tkinter.Label(boxLabel, text=record, pady=5, font=('arial', 10, 'bold'), bg='yellow').pack(side='top', fill='x')
            for key, value in db[record].items():
                print('\t', key, ': ', value, end = '\n')
                boxItem = tkinter.Frame(boxMain.interior, bg='green')
                boxItem.pack(side='top', fill='x')                    
                tkinter.Label(boxItem, text=key, font=('arial', 10), bg='blue', width=15).pack(side='left')
                tkinter.Label(boxItem, text=value, font=('arial', 10), bg='cyan', width=15).pack(side='left')
                

class VerticalScrolledFrame(tkinter.Frame):
       def __init__(self, parent, *args, **kw):
           tkinter.Frame.__init__(self, parent, *args, **kw)            
   
           vscrollbar = tkinter.Scrollbar(self, orient=tkinter.VERTICAL)
           vscrollbar.pack(fill=tkinter.Y, side=tkinter.RIGHT, expand=tkinter.FALSE)
           canvas = tkinter.Canvas(self, bd=0, highlightthickness=0,
                           yscrollcommand=vscrollbar.set)
           canvas.pack(side=tkinter.LEFT, fill=tkinter.BOTH, expand=tkinter.TRUE)
           vscrollbar.config(command=canvas.yview)
   
           canvas.xview_moveto(0)
           canvas.yview_moveto(0)
           
           self.interior = interior = tkinter.Frame(canvas)
           interior_id = canvas.create_window(0, 0, window=interior,
                                              anchor=tkinter.NW)
   
           def _configure_interior(event):
               size = (interior.winfo_reqwidth(), interior.winfo_reqheight())
               canvas.config(scrollregion="0 0 %s %s" % size)
               if interior.winfo_reqwidth() != canvas.winfo_width():
                   canvas.config(width=interior.winfo_reqwidth())
           interior.bind('<Configure>', _configure_interior)
   
           def _configure_canvas(event):
               if interior.winfo_reqwidth() != canvas.winfo_width():
                   canvas.itemconfigure(interior_id, width=canvas.winfo_width())
           canvas.bind('<Configure>', _configure_canvas)
   
           return
        
if __name__ == '__main__':
    root = tkinter.Tk()
    root.title('dvd list')
    root.geometry('700x500')
    Application(root)
    root.mainloop()

