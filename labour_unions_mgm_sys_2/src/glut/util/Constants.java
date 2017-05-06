package glut.util;

public class Constants {
	public static final String JSON_SUCCESS = "{success:true}";
	public static final String JSON_FAILURE = "{success:false}";

	public static final String JSON_LOGIN_FAILURE = "{success:false,msg:'用户名或密码错误!'}";
	public static final String JSON_ADD_ACT_FAILURE = "{success:false,msg:'对不起，报名人数已满!'}";
	public static final String JSON_ADD_ACT_FAILURE2 = "{success:false,msg:'对不起，该活动有性别限制!'}";
	public static final String JSON_ADD_ACT_FAILURE3 = "{success:false,msg:'对不起，参加的同一分组活动数目超出了限制!'}";
	public static final String JSON_ADD_ACT_FAILURE4 = "{success:false,msg:'对不起，报名已截止!'}";
	public static final String USER_TYPE_MEMBER = "个人";
	public static final String USER_TYPE_CHIEF = "集体";

	public static final String SESSION_ATTR_USERINFO = "LOGIN_USER";

	public static final String[] EXCEL_MB_COL_NAME = { "姓名", "新身份证号码", "编号",
			"聘用形式", "入编情况", "部门(简)", "分工会", "部门(详)", "职务", "任职时间", "级别", "定级时间", "籍贯",
			"性别", "民族", "出生日期", "最高学历", "最高学位", "党派", "加入时间", "工作时间", "职称",
			"职称级别", "首次聘用岗位", "首次聘用岗位的类别", "毕业学校", "最高学历时间", "最高学位时间", "所学专业",
			"学科", "来校时间" };

	public static final String[] EXCEL_ACT_COL_NAME = { "活动序号", "活动名称", "报名人数",
			"人数上限", "活动日期", "自定义活动时间" };
	public static final String[] EXCEL_ACT_PLAYER_COL_NAME = { "序号", "参加者姓名",
			"单位", "分工会", "电话", "备注", "报名表" };

	/*提案回复分割符*/
	public static final String SEPERATOR_PPS_REPLY="\n\n";
	/*新回复标志*/
	public static final String NEWREPLY_PPS_REPLY="new_reply";
	/*审核后新回复标志*/
	public static final String NEW_PASSED_REPLY_PPS="new_passed_reply";	
	/**
	 * @author xupk 20151221
	 * */
	public static final String[] EXCEL_PPS_COL_NAME = { "编号", "时间", "单位", "姓名",
			"电话", "附议人1姓名", "附议人2姓名", "提案类别", "题目", "案由", "建议或措施", "提案委员会意见",
			"主办单位", "协办单位" };
	/*目录路径设置*/
	private static String dirUpload;
	private static String dirUploadVirtual;
	public static String getDirUploadVirtual() {
		return dirUploadVirtual;
	}
	public void setDirUploadVirtual(String dirUploadVirtual) {
		Constants.dirUploadVirtual = dirUploadVirtual;
	}
	public static String getDirUpload() {
		return dirUpload;
	}
	public void setDirUpload(String dirUpload) {
		Constants.dirUpload = dirUpload;
	}

}
