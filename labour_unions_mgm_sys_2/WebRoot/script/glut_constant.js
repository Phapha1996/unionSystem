// JavaScript Document
	/*主办单位*/
	var glut_constant_unitstore=new Array();
	glut_constant_unitstore[0]	=	"校领导"	;
	glut_constant_unitstore[1]	=	"党委办公室(校长办公室、校友工作办公室)"	;
	glut_constant_unitstore[2]	=	"党委组织部.统战部"	;
	glut_constant_unitstore[3]	=	"党委宣传部"	;
	glut_constant_unitstore[4]	=	"党委学生工作部(学校学生工作处)"	;
	glut_constant_unitstore[5]	=	"人事处(人才工作办公室、职称改革办公室)"	;
	glut_constant_unitstore[6]	=	"教务处"	;
	glut_constant_unitstore[7]	=	"发展规划与教学质量监控中心"	;
	glut_constant_unitstore[8]	=	"党委研究生工作部（研究生院）"	;
	glut_constant_unitstore[9]	=	"科技处"	;
	glut_constant_unitstore[10]	=	"离退休工作处"	;
	glut_constant_unitstore[11]	=	"党委武装工作部(保卫处)"	;
	glut_constant_unitstore[12]	=	"财务处"	;
	glut_constant_unitstore[13]	=	"基建处"	;
	glut_constant_unitstore[14]	=	"招生就业处"	;
	glut_constant_unitstore[15]	=	"资产管理处"	;
	glut_constant_unitstore[16]	=	"纪委、监察室"	;
	glut_constant_unitstore[17]	=	"审计处"	;
	glut_constant_unitstore[18]	=	"工会"	;
	glut_constant_unitstore[19]	=	"团委"	;
	glut_constant_unitstore[20]	=	"社区管理办公室(居委会)"	;
	glut_constant_unitstore[21]	=	"后勤服务集团"	;
	glut_constant_unitstore[22]	=	"地球科学学院"	;
	glut_constant_unitstore[23]	=	"环境科学与工程学院"	;
	glut_constant_unitstore[24]	=	"化学与生物工程学院"	;
	glut_constant_unitstore[25]	=	"材料科学与工程学院"	;
	glut_constant_unitstore[26]	=	"土木与建筑工程学院"	;
	glut_constant_unitstore[27]	=	"测绘地理信息学院"	;
	glut_constant_unitstore[28]	=	"机械与控制工程学院"	;
	glut_constant_unitstore[29]	=	"信息科学与工程学院"	;
	glut_constant_unitstore[30]	=	"管理学院"	;
	glut_constant_unitstore[31]	=	"旅游学院"	;
	glut_constant_unitstore[32]	=	"艺术学院"	;
	glut_constant_unitstore[33]	=	"人文社会科学学院"	;
	glut_constant_unitstore[34]	=	"马克思主义学院（思想政治理论教学部）"	;
	glut_constant_unitstore[35]	=	"外国语学院"	;
	glut_constant_unitstore[36]	=	"理学院"	;
	glut_constant_unitstore[37]	=	"南宁分校"	;
	glut_constant_unitstore[38]	=	"继续教育学院"	;
	glut_constant_unitstore[39]	=	"国际教育学院（国际交流处）、港澳台事务办公室	"	;
	glut_constant_unitstore[40]	=	"体育教学部"	;
	glut_constant_unitstore[41]	=	"现代教育技术中心"	;
	glut_constant_unitstore[42]	=	"图书馆"	;
	glut_constant_unitstore[43]	=	"附属.医院"	;
	glut_constant_unitstore[44]	=	"附属.小学"	;
	glut_constant_unitstore[45]	=	"产业.勘察院"	;
	glut_constant_unitstore[46]	=	"产业.南方监理公司"	;
	glut_constant_unitstore[47]	=	"博文管理学院"	;
	glut_constant_unitstore[48]	=	"雁山校区管理办公室"	;
	
	var glut_constant_categorystore=new Array();
	glut_constant_categorystore[0]="人才培养";
	glut_constant_categorystore[1]="教学管理";
	glut_constant_categorystore[2]="科研管理";
	glut_constant_categorystore[3]="职工福利";
	glut_constant_categorystore[4]="师资队伍";
	glut_constant_categorystore[5]="文化体育";
	glut_constant_categorystore[6]="交通运输";
	glut_constant_categorystore[7]="安全稳定";
	glut_constant_categorystore[8]="其他";

	/*协办单位的数据格式*/
	var glut_constant_datas = [
[1,	glut_constant_unitstore[0]],
[2,	glut_constant_unitstore[1]],
[3,	glut_constant_unitstore[2]],
[4,	glut_constant_unitstore[3]],
[5,	glut_constant_unitstore[4]],
[6,	glut_constant_unitstore[5]],
[7,	glut_constant_unitstore[6]],
[8,	glut_constant_unitstore[7]],
[9,	glut_constant_unitstore[8]],
[10,	glut_constant_unitstore[9]],
[11,	glut_constant_unitstore[10]],
[12,	glut_constant_unitstore[11]],
[13,	glut_constant_unitstore[12]],
[14,	glut_constant_unitstore[13]],
[15,	glut_constant_unitstore[14]],
[16,	glut_constant_unitstore[15]],
[17,	glut_constant_unitstore[16]],
[18,	glut_constant_unitstore[17]],
[19,	glut_constant_unitstore[18]],
[20,	glut_constant_unitstore[19]],
[21,	glut_constant_unitstore[20]],
[22,	glut_constant_unitstore[21]],
[23,	glut_constant_unitstore[22]],
[24,	glut_constant_unitstore[23]],
[25,	glut_constant_unitstore[24]],
[26,	glut_constant_unitstore[25]],
[27,	glut_constant_unitstore[26]],
[28,	glut_constant_unitstore[27]],
[29,	glut_constant_unitstore[28]],
[30,	glut_constant_unitstore[29]],
[31,	glut_constant_unitstore[30]],
[32,	glut_constant_unitstore[31]],
[33,	glut_constant_unitstore[32]],
[34,	glut_constant_unitstore[33]],
[35,	glut_constant_unitstore[34]],
[36,	glut_constant_unitstore[35]],
[37,	glut_constant_unitstore[36]],
[38,	glut_constant_unitstore[37]],
[39,	glut_constant_unitstore[38]],
[40,	glut_constant_unitstore[39]],
[41,	glut_constant_unitstore[40]],
[42,	glut_constant_unitstore[41]],
[43,	glut_constant_unitstore[42]],
[44,	glut_constant_unitstore[43]],
[45,	glut_constant_unitstore[44]],
[46,	glut_constant_unitstore[45]],
[47,	glut_constant_unitstore[46]],
[48,	glut_constant_unitstore[47]],
[49,	glut_constant_unitstore[48]],
	];
	
	var glut_constant_leaders=new Array();
	glut_constant_leaders[0]="张学洪";
	glut_constant_leaders[1]="解庆林";
	glut_constant_leaders[2]="王赣华";
	glut_constant_leaders[3]="孙宁";
	glut_constant_leaders[4]="肖岳峰";
	glut_constant_leaders[5]="陈学军";
	glut_constant_leaders[6]="周国清";
	glut_constant_leaders[7]="梁福沛";
	glut_constant_leaders[8]="王敦球";
	glut_constant_leaders[9]="曾繁荣";
	glut_constant_leaders[10]="张鹏";
	glut_constant_leaders[11]="张劲松";