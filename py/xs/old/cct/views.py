# -*- coding: utf-8 -*-
from django.shortcuts import render_to_response
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from admin import pubgethospital,pubgetdoctor,pubgetnews,pubgetnewsdetail
from JPage import JPage
menu={'hospital':4,'doctor':5,'knowledge':6,'news':6}
menuDir={1:'首页',2:'关于我们',3:'服务介绍',4:'合作医院',5:'试管专家',6:'试管资讯',7:'联系我们'}
pubTitle='云荷廷健康管理'

def index(req):
    seoTitle='美国试管婴儿_泰国试管婴儿_'+pubTitle
    index=1
    knlg1=pubgetnews('knowledge',f='0',l='6')
    knlg2=pubgetnews('knowledge',f='6',l='6')
    hptlist=pubgethospital('',lg='1',l=6)
    dctlist=pubgetdoctor('',l=6)
    return render_to_response('index.html',{'seoTitle':seoTitle,'index':index,'knlg1':knlg1,'knlg2':knlg2,'hptlist':hptlist,'dctlist':dctlist})

def admin(req):
    if req.session.get('uname'):return HttpResponseRedirect('/static/jadmin/index.html')
    seoTitle='后台登录'
    return render_to_response('admin/index.html',{'seoTitle':seoTitle})
def login(req):
    seoTitle='后台登录'
    uname=req.GET.get('uname')
    pwd=req.GET.get('pwd')
    if uname=='tml' and pwd=='tml':
        req.session['uname']=uname
        return HttpResponseRedirect('/static/jadmin/index.html')
    return render_to_response('admin/index.html',{'seoTitle':seoTitle})
def islogin(req):
    if req.session.get('uname'):return HttpResponse(1)
    return HttpResponse(0)
def logout(req):
    req.session.delete()
    return HttpResponseRedirect('/admin/')

def about(req):
    seoTitle='关于我们_'+pubTitle
    index=2
    return render_to_response('about/index.html',{'seoTitle':seoTitle,'index':index})
def aboutapt(req):
    seoTitle='关于我们_'+pubTitle
    index=2
    return render_to_response('about/apt.html',{'seoTitle':seoTitle,'index':index})

def service(req):
    seoTitle='服务介绍_'+pubTitle
    index=3
    return render_to_response('service/index.html',{'seoTitle':seoTitle,'index':index})

sgroup=[
'',
'''
<p>1）孕育疾病人士
</p><p>引起不孕的发病原因分为男性不孕和女性不孕，1992年被世界卫生组织在诊断和治疗不孕症最广泛应用该分类。首要的病因诊断依次是：排卵障碍、精液异常、输卵管异常、不明原因的不孕、子宫内膜异位症和其他如免疫学不孕。另外因素是宫颈因素，包括占所有宫颈因素超过5%的宫颈狭窄。女性不孕主要以排卵障碍，输卵管因素，子宫内膜容受性异常为主，男性不孕主要是生精异常及排精障碍。
</p><p>女性不孕：
</p><p>（1）输卵管性不孕输卵管在捡拾卵子和运输卵子、精子和胚胎方面发挥着重要作用；输卵管也是精子获能，精卵相遇、受精的场所。感染和手术操作极易使输卵管黏膜受损，进而纤毛消失，蠕动障碍，以及阻塞或与周围组织粘连，影响输卵管的通畅性功能。因此，输卵管阻塞或通而不畅是女性不孕的重要原因。①感染盆腔感染是导致输卵管性不孕的主要因素。感染不仅引起输卵管阻塞，且因瘢痕形成，使输卵管壁僵硬和输卵管周围粘连，改变其与卵巢的关系，影响输卵管的拾卵及运送功能。感染的病原体可由需氧和厌氧菌所致，也可由衣原体、结核杆菌、淋病双球菌、支原体等所致。②子宫内膜异位症盆腔子宫内膜异位症、卵巢子宫内膜异位症可形成腹膜粘连带，使输卵管伞端外部粘连或卵巢周围粘连，使成熟卵不能被摄入输卵管；引起的广泛粘连还可影响受精卵的运行。③输卵管结核输卵管结核在生殖器结核中最常见，表现为输卵管增粗肥大、伞端外翻如烟斗状，甚至伞端封闭；输卵管僵直、结节状，部分可见干酪样团块或腹膜有粟粒样结节。约半数输卵管结核患者同时有子宫内膜结核。④输卵管绝育术后引起输卵管积水较常见，成为输卵管复通术后影响功能的重要因素。绝育术后输卵管近端组织和细胞的病变与绝育时间长短有关，因此绝育术后时间越长，复通成功率越低。
</p><p>（2）排卵障碍导致的不孕慢性排卵障碍是很多内分泌疾病的共同表现，占妇女的20%～25%。临床表现主要为月经不规则甚至闭经，周期短于26天或长于32天提示有排卵异常。病史还可反映多毛症、男性化、溢乳及雌激素过少等内分泌病紊乱的信号。1993年世界卫生组织（WHO）制定了无排卵的分类标准，共分为三大类。WHOⅠ型（低促性腺激素性无排卵），WHOⅡ型（正常促性腺激素性无排卵），WHOⅢ型（高促性腺激素性无排卵）。WHOⅠ型：包括下丘脑闭经（压力、减重、锻炼、神经性厌食及其他）、Kallmann综合征（促性腺激素释放激素前体细胞移行异常）和促性腺激素缺陷等。典型的表现是低促性腺激素性腺功能减退：FSH低、E2低而泌乳素和甲状腺素正常。WHOⅡ型：临床上所碰到的大部分患者。即具有正常促性腺激素的卵巢功能紊乱，伴有不同程度的无排卵或月经稀发。包括：PCOS，卵泡膜细胞增生症和HAIRAN综合征（多毛，无排卵，胰岛素抵抗和黑棘皮症）。典型表现是：FSH、E2和泌乳素正常，但LH/FSH常异常升高。WHOⅢ型：患者主要是终末器官的缺陷或抵抗，表现为高促性腺激素性腺功能减退，包括卵巢早衰和性腺发育不全（卵巢抵抗）。典型表现为FSH及LH升高，低E2。这类患者的特点是对诱发排卵的反应差，卵巢功能已减退。[2]
</p><p>（3）免疫性不孕目前与不孕有关的自身抗体分两类：非器官特异性自身抗体和器官特异性自身抗体。前者指针对存在于不同组织的共同抗原的抗体，如抗磷脂抗体（APA）、抗核抗体（ANA）、抗DNA抗体等；后者指只针对某个特异性器官组织自身抗原的抗体如抗精子抗体（ASAb）、抗卵巢抗体（AOVAb）、抗子宫内膜抗体（AEMAb）和抗绒毛膜促性腺激素抗体（AhCGAb）等。目前对非器官特异性自身抗体针对的抗原性质比较了解，检测APA和ANA的技术也较为成熟和标准，临床资料丰富；而器官特异性自身抗体针对的抗原成分复杂，检测的标准化程度低，它们与不孕的关系亦因检测数据分析、统计困难而不易明确，从而影响对自身抗体阳性的不孕患者的处理。
</p><p>（4）不明原因的不孕一对不孕夫妇所检查的各项指标都正常，而不孕原因又无法解释的时候，即诊断为不明原因的不孕症。推测不明原因不孕症的病因可能有以下几方面：①不良的宫颈分泌物影响；②子宫内膜对早期胚胎的接受性较差；③输卵管的蠕动功能不良；④输卵管伞端拾卵功能缺陷；⑤黄素化不破裂综合征；⑥轻微的激素分泌欠佳，如黄体功能不足；⑦精子和卵子受精能力受损；⑧轻度子宫内膜异位症；⑨免疫因素，如抗精子抗体、抗透明带抗体或抗卵巢抗体；⑩腹膜巨噬细胞功能异常；腹腔液中抗氧化功能受损。
</p><p>男性不孕：
</p><p>（1）生殖器官等异常①先天异常：睾丸的先天性发育异常包括无睾症、曲细精管发育不全（Klinefelter）、XYY综合征、男性假两性畸形等。Klinefelter综合征染色体核型多为47，XXY；患者乳房女性化；睾丸小而硬，曲细精管玻璃样变和纤维化，精子发生完全停止或严重减少。睾丸下降异常也是男性不育的重要原因。睾丸下降异常时曲细精管内生殖细胞的数目减少，睾丸体积缩小，重量也下降。睾丸在腹壁或腹腔内的位置越高，则曲细精管的损伤越大。双侧睾丸下降异常患者如不治疗，生育的可能性很小。②输精管梗阻：输精管、精囊先天性缺如，特征是精液量少，常不足1ml，精浆无果糖；炎症性梗阻，如双侧附睾结核；射精管梗阻较少见。手术损伤或输精管结扎等；以及前列腺炎、精囊炎均可引起精液质量明显下降。③精索静脉曲张：可导致睾丸血液淤积，有效血流量减少，生精的正常微环境遭到破坏，最终使精原细胞退化、萎缩，精子生成减少，活力减弱，畸形精子增多，严重者可无精子。④雄激素靶器官病变，分两种类型：完全性如睾丸女性化；不完全性如Reifenstein综合征。
</p><p>（2）内分泌异常①主要原因是促性腺激素合成或分泌功能障碍。Kallmann综合征又称选择性促性腺功能低下型性腺功能减退症，为下丘脑GnRH脉冲式释放功能障碍，是常染色体隐性遗传病。临床特征是性成熟障碍，伴有嗅觉丧失，睾丸小、睾丸下降异常、小阴茎及尿道下裂。血清睾酮水平低，LH和FSH水平处于同年龄组正常值下限。②选择性LH缺陷症：患者血清FSH水平正常，LH和睾酮水平低下，男性化不足，乳房发育，但睾丸大小正常，精液内有少量精子，故又称“生育型”无睾综合征。③垂体瘤对LH的分泌影响最为明显，垂体瘤是高泌乳素血症的最常见原因，PRL过高可导致患者性欲减退、勃起功能障碍、乳房发育溢乳以及生精功能障碍。④肾上腺皮质增生症中常与不育相关的是21-羟化酶缺陷，皮质激素合成减少，引起ACTH增加，肾上腺皮质受到ACTH的过度刺激而合成大量睾酮，后者抑制垂体促性腺激素的分泌，从而导致不育。
</p><p>（3）性功能障碍包括性欲减退、勃起功能障碍、早泄、不射精和逆行射精等，精液不能正常射入阴道。
</p><p>（4）免疫因素分为两类，由男性产生的抗精子自身免疫和由女性产生的抗精子同种免疫。精子与免疫系统由于血睾屏障的作用而隔离，故无论对男性或女性，精子抗原为外来抗原，具有很强的抗原性。血睾屏障及精浆内免疫抑制因子等因素共同建立了一套完整的免疫耐受机制，当发生睾丸炎、附睾炎、前列腺炎、精囊炎，或行输精管结扎等手术后，上述免疫耐受机制被破坏，即可能发生抗精子免疫反应。
</p><p>（5）感染因素腮腺炎病毒可引起睾丸炎，严重者可引起永久性曲细精管破坏和萎缩而发生睾丸功能衰竭；梅毒螺旋体也可以引起睾丸炎和附睾炎；淋病、结核、丝虫病可引起输精管梗阻；精液慢性细菌感染，或支原体、衣原体感染可使精液中白细胞计数增多，精液质量降低，未成熟精子增加。
</p><p>（6）理化因素与环境污染生精上皮为快速分裂细胞，故易受理化因素损害。①热、放射线和有毒物质均可使生精上皮脱落，或影响间质细胞和支持细胞功能，妨碍生精过程。生精上皮对放射线敏感。环磷酰胺、氮芥等化疗药物直接损害生精上皮和间质细胞功能。②某些环境毒素与天然激素有类似的作用或结构，例如多氯联苯（PCB）、四氯联苯（TCDD）、二氯二苯双氯乙烷（DDT）、己烯雌酚（DES）等。这些毒素通过污染空气、水和食物链而影响人类健康，包括男性精子的数量和质量持续下降。
</p><p>（7）药物手术史鸦片类药物，抗癌药物，化疗及抗高血压药物等可直接或间接影响精子生成。既往盆腔手术史、膀胱、前列腺手术史有可能引起射精功能减退；疝修补术或睾丸固定术有可能影响精索或睾丸供血。
</p><p>（8）不明原因的不育男性不育中约31.6%的患者经过目前常用的检查方法仍不能查出确切病因。
</p><p>试管婴儿在对男女双方进行全面检查、评估男女双方的情况之后，确定不孕不育病因，再采取相应的方案进行试管婴儿操作。
</p>
''',
'''
<p>2）大龄生育人士
</p><p>生殖专家认为，女人的年龄越大，受各种疾病感染的机会就越大，就越容易出现生育难题。
</p><p>一般而言，生育能力和年龄成反比，而且生殖系统的老化在女性不孕中起着关键作用。根据美国国家卫生局在二十多年里的多项研究证明，35 岁是女性生育机能衰退最迅速的年龄。根据研究显示，35岁以上的妇女很难在一年内自然受孕，由此可以认定，35岁是女性生育能力减退的年龄界限。
</p><p>女性的更年期一般出现在50-55岁，在更年期前的10年里，卵泡逐渐减少，这与促卵泡生成素(FSH)浓度的增加有关。这些变化同时反映了卵泡处于老化状态，与此同时，月经周期也发生了很大变化。虽然女性月经周期在更年期之前数年一直保持规律，但卵泡期缩短会导致周期缩短，研究表明，月经周期时长比二十岁的时候平均缩短3-4天也是生育力衰退的一个预兆。
</p><p>生育力衰退是女性卵巢功能随年龄增长而下降的结果，每位女性出生时卵巢内储存的卵泡大约有300万个。进入生育期后，一般每个月有一个卵子成熟，卵泡从出生后即进入逐渐减少的过程，排卵只是减少的方式之一，多数卵泡会被身体所吸收。在五十岁到六十岁之间，大多数女性会耗尽出生时体内携带的全部卵泡。
</p><p>当女性的卵泡和卵子耗尽、雌激素与黄体酮停止分泌，卵巢的功能就退化了。因此，女性的生育能力在29-35 岁之间会出现明显的下降趋势，多数35 岁的女性还不会出现生育问题，但到了38或39岁，年龄就会成为不孕的重要因素。
</p><p>女性在30多岁时，每个排卵周期里有大约15%的受孕机会，在1年的尝试期间内，平均受孕机会为75%。而随着生殖能力逐渐下降，受孕机率也会不断下降，40岁左右的女性自然受孕率只有15%。更重要的是，女性一旦超过最佳生育年龄，流产的风险也会随之增加，30-34岁的流产几率是12%，35-39岁上升到18%。35岁以上的初产妇高达40%，是20多岁的初产妇的三到四倍。
</p><p>随着社会压力增大，很多人都希望能够晚一点生育，同时又因为生育条件降低，导致很多人最终需要选择试管婴儿来助孕。但是即便是试管婴儿，也需要具备以下成功的基本条件：
</p><p>1、具备健康的卵子和精子健康的精子和卵子是形成优秀胚胎的先决条件，优质胚胎的着床率非常高，试管婴儿的成功率也自然会随之增高。只有健康的胚胎才能在体外存活到第五天成为囊胚，通过PGD\PGS 的诊断、筛查可以排查掉患有染色体异常和携带家族遗传性疾病的胚胎。
</p><p>2、具备良好的子宫环境主要是子宫内膜的好坏，子宫内膜是胚胎着床的地方，子宫内膜如果厚度适中、血流丰富而且细胞分裂良好，会增加胚胎着床率。反之，如果子宫内膜较薄，早期胚胎着床会不牢固，因为囊胚得不到充足的营养很容易会造成流产，建议先做性激素六项检查，调理子宫内膜环境，平衡气血，使雌、孕激素的分泌水平趋于最佳的生理状态。以及调理好女性正常的月经周期，让子宫内膜恢复正常厚度。最终的成功关键要看技术，包括胚胎培养、PGD\PGS 诊断筛查、胚胎移植等环节，缺一不可。PGD\PGS诊断不但可以提高妊娠率，也可以保证出生后孩子的健康。
</p>
''',
'''
<p>3）优生优育选择
</p><p style="text-align:center"><img style="width:400px;height:300px;" src="/static/img/service/ysyy.jpg"/>
</p><p>第三代试管婴儿技术能排除基因缺陷，对付遗传疾病。生殖专家介绍，如果夫妇双方都携带遗传病基因，如地中海贫血，那么试管里孕育的可能就是个带病的孩子。按照之前的技术手段，只能让女方先怀孕，在怀孕7~8周和4~6个月这两个阶段，分别抽取绒毛和羊水来检测胎儿是否健康，如果不健康则选择引产。这样会对女性造成很大的伤害，有的夫妇甚至经受过数次“忍痛割爱”，仍然怀不上健康的胎儿。
</p><p>为了解决这个难题，第三代技术应运而生。这是怎样一种神奇的技术呢？专家介绍说，以地中海贫血为例，夫妻双方如果都是地贫基因携带者，那么有1/4的几率生出重症地贫的孩子，同时也有1/4的几率生出健康的孩子。此时要做的就是通过技术手段挑出这“健康的1/4”。
</p><p>正常怀孕的妇女体内只有一个胚胎，可是通过试管婴儿技术，能一次产生多个胚胎。在胚胎发育的第三天，医务人员会从每个胚胎中都挑出一个细胞来进行检测，选出健康的那个胚胎，再移植到女性的体内。因此，第三代技术也叫做胚胎移植前遗传学诊断，取得优孕效果。
</p>
''',
'''
<p>4）男女胎数选择
</p><p style="text-align:center"><img style="width:400px;height:300px;" src="/static/img/service/xingbie.jpg"/>
</p><p>生男生女对现在的准爸爸准妈妈们似乎已经不那么重要了，可是有的夫妻还是希望能生一个自己喜欢的女宝宝或是男宝宝，因此有相当多的父母根据自己的生活标准及人生规划，对孩子的性别有选择需求，还有些家庭双胞胎的愿望，这些也可以通过试管婴儿技术来解决。
</p><p>另外，随着国内计划生育政策的放开，越来越多符合政策的家庭做出了“一儿一女”的生育规划，这类家庭往往对第一胎没有性别要求，但对第二胎的性别需求就会明显增大。加之国内有第一胎与第二胎的年龄要相隔四岁的规定，因此绝大多数生育二胎的女性年龄都在三十岁及以上，甚至接近四十岁，不再是最佳生育年龄。
</p><p>女性超过最佳生育年龄可能会出现染色体问题，妊娠流产率相对也比较高，选择试管婴儿更加符合优生优育的原则。
</p>
''',
'''
<p>5）同性组建家庭
</p><p style="text-align:center"><img style="width:400px;height:300px;" style="width:300px;height:200px;" src="/static/img/service/tongxing.jpg"/>
</p><p>“想牵着伴侣的手逛街，想组个家庭，想在动手术之前能有最亲近的人签字同意，想在死掉之后能把遗产留给最在乎的人，这些都是最根本的生活要求，既不是标新立异，也没有要干扰别人。”这是著名主持人蔡康永的肺腑之言。随着时代的文化推进，同性恋的社会认同程度提高，部分发达国家还为同性恋提供了平等的法律权利，包括婚姻、领养、医疗等。同性恋逐渐被大众接受，却仍然要被无法生育下一代的问题所困扰。直到医学发展进步，随着试管婴儿技术的成熟，同性恋现在也可以生育自己的孩子。
</p><p>每个胚胎的发育都需要精子与卵子结合，受精卵形成后开始进行分裂，经过多次分裂和细胞分化后形成生物成体，随后胚胎在子宫内发育成为胎儿，直到十月分娩出生。在这个过程中，需要男性的精子、女性的卵子以及子宫。人类还并没有进化到无性繁殖，所以同性恋如果需要生育孩子，一定需要借助试管婴儿技术，以及借精或借卵。
</p><p>女同性恋可提取其中一方的卵子，借精后培育成胚胎，再植入到其中一方的子宫。男同性恋需要的环节则多一些，胚胎必须由子宫提供营养才能够发育，因此还需要寻找一位孕妈妈。试管婴儿人工生殖技术解决了精、卵结合的问题，但是目前国内做试管婴儿手术必须提供结婚证、生育许可证，因此即便国内拥有试管婴儿技术，也并未给同性恋打开一扇便利之门。而在欧美一些开放国家，已经制定了保护同性恋生育权的法律，支持为同性恋进行试管婴儿手术。
</p><p>在上世纪八十年代，美国就有一个行业随着试管婴儿技术应运而生，这个行业就是第三方植入机构。第三方植入机构可以为无法自然生育的人群，例如子宫切除的女性、子宫癌变的女性、或者没有子宫的同性恋男性提供帮助，找到愿意代为将受精卵植入子宫的育龄女性。在这个过程中，试管婴儿精子卵子提供方、受精卵植入方和第三方植入机构会签署一个三方协议，以证明婴儿出生后的抚养权归属为试管婴儿精子卵子提供方，并不会出现未来孩子归属问题的纠纷。
</p><p>提供受精卵植入子宫的女性，会通过第三方植入机构的严格筛查与挑选，一般比较常见的是25-35岁的育龄女性，而且绝大多数已经有过生育经验，懂得在孕期保护好自己和胎儿。同时也会对这名女性的学历、家庭背景、生活习惯等等做出全方位的调查与评估，还会被要求进行一项严格的心理测试，最大限度的保证胎儿在母体里的安全，以及孕母不会对孩子出生后造成未来的影响。
</p><p>我们有常年合作的第三方植入机构，因此有需求的人群并不需要自己额外去进行比对和查找，只需要挑选适合自己的生殖医疗中心，确定好手术方案，其他的问题都是很容易解决的。同性恋生育自己的孩子，无论是从技术上还是从社会包容度上，都有了很大的进步。美国做试管婴儿不需结婚证、准生证，只需要办理签证前往检查身体条件即可。而且美国保护同性恋结婚生子，从这一点上来说，是同性恋生育自己孩子的天堂。
</p>
''',
'''
<p>6）第三方助孕育
</p><p style="text-align:center"><img style="width:400px;height:300px;" src="/static/img/service/daiyun.jpg"/>
</p><p>第三方助孕即第三方辅助生殖，是在试管婴儿技术基础上，以第三方的形式达到顺利娩出健康婴儿的方式。故第三方辅助生殖是指将受精卵子植入孕母子宫，由孕母替代完成“十月怀胎”的过程。
</p><p>一般而言，第三方辅助生殖是指在需求方完全丧失生育能力的前提下，将自己的卵子或志愿方的卵子与丈夫的精子结合成受精卵，通过第三方的子宫完成整个孕育过程并顺利生产的行为。第三方辅助生殖完全采取人工授精-体外移植的方式进行操作，与需求方没有任何身体接触。
</p><p>第三方辅助生殖一般包含的内容主要有三项：供精、供卵、第三方生殖。这个行业在美国已经产业化，从第三方辅助生殖中介、第三方、心理咨询师和律师，都有专门专业的职业操作守则与合同制约，全程受到美国法律保护。合法配套的第三方辅助生殖操作流程、前端的第三方辅助生殖技术与服务，是全世界其他国家都无法比拟的。
</p>
''',
]
def servicegroup(req,num=1):
    seoTitle='服务群体_'+pubTitle
    index=3
    sgp=sgroup[int(num)]
    return render_to_response('service/group.html',{'seoTitle':seoTitle,'index':index,'sgp':sgp})
def serviceusa(req):
    seoTitle='赴美试管医疗_'+pubTitle
    index=3
    return render_to_response('service/usa.html',{'seoTitle':seoTitle,'index':index})
def servicetha(req):
    seoTitle='赴泰试管医疗_'+pubTitle
    index=3
    return render_to_response('service/tha.html',{'seoTitle':seoTitle,'index':index})
def servicepcs(req):
    seoTitle='服务流程_'+pubTitle
    index=3
    return render_to_response('service/pcs.html',{'seoTitle':seoTitle,'index':index})

def hospital(req,cid=''):
    seoTitle='合作医院_'+pubTitle
    index=4
    listall=pubgethospital(cid,lg='1')
    return render_to_response('hospital/index.html',{'seoTitle':seoTitle,'index':index,'listall':listall,'cid':cid})

def doctor(req,htp=0,hid=0,page=1):
    seoTitle='试管专家_'+pubTitle
    index,limit=5,8
    page=int(page)
    hid=int(hid)
    resultlist=pubgetdoctor(hid,htp=htp,f=(page-1)*limit,l=limit,a=1)
    listall=resultlist['list']
    listcount=resultlist['count']
    pobj=JPage(limit,page,4,3,listcount)
    hptlist=pubgethospital(1)
    hptlist2=pubgethospital(2)
    tbnm='doctor'
    return render_to_response('doctor/index.html',locals())

def knowledge(req,page=1):
    tbnm='knowledge'
    seoTitle='试管知识_'+pubTitle
    index,limit=6,8
    page=int(page)
    resultlist=pubgetnews(tbnm,f=(page-1)*limit,l=limit,a=1)
    listall=resultlist['list']
    listcount=resultlist['count']
    pobj=JPage(limit,page,4,3,listcount)
    hptlist=pubgethospital(1)
    hptlist2=pubgethospital(2)
    return render_to_response(tbnm+'/index.html',locals())

def news(req,page=1):
    tbnm='news' 
    seoTitle='试管新闻_'+pubTitle
    index,limit=6,8
    page=int(page)
    resultlist=pubgetnews(tbnm,f=(page-1)*limit,l=limit,a=1)
    listall=resultlist['list']
    listcount=resultlist['count']
    pobj=JPage(limit,page,4,3,listcount)
    hptlist=pubgethospital(1)
    hptlist2=pubgethospital(2)
    return render_to_response(tbnm+'/index.html',locals())
def cost(req):
    seoTitle='试管费用_'+pubTitle
    index=3
    return render_to_response('cost/index.html',{'seoTitle':seoTitle,'index':index})

def contact(req):
    seoTitle='联系我们_'+pubTitle
    index=7
    return render_to_response('contact/index.html',{'seoTitle':seoTitle,'index':index})

def detail(req,kwd='',did=''):
    index=menu[kwd]
    tpnm=menuDir[index]
    field='name,text,pic'
    if index == 5:
        ispre=1
    else:
        ispre=''
    m=pubgetnewsdetail(kwd,did,field)
    seoTitle=m[0].encode('utf-8')+'_'+pubTitle
    return render_to_response('detail.html',{'seoTitle':seoTitle,'index':index,'ispre':ispre,'m':m,'tpnm':tpnm})
