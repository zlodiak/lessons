import csv

l = [[1, 2, 666], [2, 3, 555], [4, 5]]

out = open('out.csv', 'w')
for row in l:
    for column in row:
        out.write('%d;' % column)
    out.write('\n')
out.close()
