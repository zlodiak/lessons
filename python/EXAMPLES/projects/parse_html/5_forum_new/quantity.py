import shelve

def quantity_posts():
    try:
        data = shelve.open('data')
    except Exception:
        print(Exception)
    else:
        for key, value in sorted(data.items()):
            print(key, ': \t', value, '\n')
    finally:
        data.close()


if __name__ == "__main__":
    print('begin')
    quantity_posts()
    print('end')
    
