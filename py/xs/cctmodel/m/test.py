from models import Auther,Book

b1=Book()
b1.objects.create(name='shuben')#添加书
a1=Auther()
b1.objects.create(name='zuozhe')#添加作者

b1.authers.add(a1) #a1=Auther.objects.all()[0] 书添加作者
a1.book_set.add(b1) #作者添加书
a1.book_set.create(name='book1') #作者添加书，并增加一条书的记录
a1.book_set.all() #查看这个作者都出了哪些书
a1.book_set.remove(b1) #作者移除书

authers=Auther.objects.all() #查询所有作者  filter过滤 order_by排序
books=Auther.objects.all() #查询所有书籍

'''
<div>
{%for a in authers %}
<h3>{{a.name}}</h3>
    <ul>
    {% for b in auther.book_set.all %}
    <li>{{b}}</li>
    {%endfor%}
    </ul>
{%endfor%}
</div>
'''
