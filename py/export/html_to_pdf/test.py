import pdfkit
#path_wkthmltopdf = r'C:\Program Files\wkhtmltopdf\bin\wkhtmltopdf.exe'
#config = pdfkit.configuration(wkhtmltopdf=path_wkthmltopdf)
pdfkit.from_file('test.html', 'test.pdf')
pdfkit.from_string('Hello!', 'Hello.pdf')
pdfkit.from_url("http://hao23.com", "hao23.pdf")#, configuration=config