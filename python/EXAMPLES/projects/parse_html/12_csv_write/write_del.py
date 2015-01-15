import csv

with open('eggs.csv', 'w', newline='') as csvfile:
    spamwriter = csv.writer(csvfile, delimiter=',')
    spamwriter.writerow(['Spam'])
    spamwriter.writerow(['Spabbb'])
    spamwriter.writerow(['345345'])
    spamwriter.writerow(['wrrrr'])
