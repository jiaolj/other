#!/usr/bin/env python
import subprocess
import time
from reportlab.pdfgen import canvas
from reportlab.lib.units import inch
def disk_report():
    p = subprocess.Popen("df -h", shell=True, stdout=subprocess.PIPE)
#   print p.stdout.readlines()
    return p.stdout.readlines()
def create_pdf(input, output="disk_report.pdf"):
    today = time.strftime('%Y-%m-%d %H:%M:%S',time.localtime(time.time()))
    c = canvas.Canvas(output)
    textobject = c.beginText()
    textobject.setTextOrigin(inch, 11*inch)
    textobject.textLines('''Disk Capcity Report: %s''' %today)
    for line in input:
        textobject.textLine(line.strip())
    c.drawText(textobject)
    c.showPage()
    c.save()
report = disk_report()
create_pdf(report)