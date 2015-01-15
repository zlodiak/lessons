import csv
with open('some.csv', 'w', newline='') as f:
	writer = csv.writer(f)
	writer.writerow(['jgjh'])
	writer.writerow(['23423'])
	writer.writerow(["Name","Address","Telephone","Fax","E-mail","Others"])

	for x in range(10):
		print(x)
		writer.writerow([x])
		
	writer.writerows([["Name"],["Address"],["Telephone"]])

