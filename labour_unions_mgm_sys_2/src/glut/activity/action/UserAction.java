package glut.activity.action;

import glut.action.BaseAction;
import glut.activity.jsonvo.UserActResultVO;
import glut.activity.service.UserService;
import glut.db.auto.Activity;
import glut.db.auto.ActivitySignUp;
import glut.db.auto.Member;
import glut.db.auto.Users;
import glut.util.BeanTool;
import glut.util.Constants;
import glut.util.JSONFormat;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.log4j.Logger;
import org.apache.struts2.ServletActionContext;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;

@Controller("userAction_act")
@Scope("prototype")
public class UserAction extends BaseAction {
	private Member member;
	private Activity activity;
	private ActivitySignUp signUp;
	private UserService userService;

	private String role;
	private String sex;
	private static Logger logger = Logger.getLogger(UserAction.class);

	private String keyWord_name;
	private String keyWord_status;

	// 报名模板文件名
	private String tempName;
	// 上传文件的参数
	private File file; // 具体上传文件的 引用 , 指向临时目录中的临时文件
	private String fileFileName; // 上传文件的名字 ,FileName 固定的写法
	private String fileContentType; // 上传文件的类型， ContentType 固定的写法
	// 参加活动的参数
	private String actId;
	private String phone;
	private String account;
	private String notes;

	//获取文件后缀
	private static String getExtention(String fileName) {  
        int pos = fileName.lastIndexOf(".");  
        return fileName.substring(pos);  
    } 
	
	public String joinActivity() throws Exception {
		logger.debug("个人活动报名信息：" + actId + "," + account + "," + phone + ","
				+ notes);
		Users user = (Users) ServletActionContext.getRequest().getSession().getAttribute(
				Constants.SESSION_ATTR_USERINFO);
		sex = user.getMember().getSex();
		int status=0;//添加活动处理状态：0-成功；1-人满；2-性别不符；3-参加的同一分组活动数目超出了限制
		// 没有报名附件
		if (fileFileName == null) {
			try {
				status=userService.joinActivity(actId, account, phone, notes,fileFileName,sex);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				// 捕获报名失败的异常
				sendMsg2Client(Constants.JSON_FAILURE);
				return null;
			}
		} else {
			try {
/*				File files = new File(ServletActionContext.getRequest().getRealPath(
						"/sys_act" + "/signup_doc/"+ actId ));*/
				/*modified by yattie: 上传文件独立目录存储，方便维护*/
				String strDir=Constants.getDirUpload()+"/sys_act" + "/signup_doc/"+ actId;
				File files = new File(strDir);
				if(!files.exists()){//创建上传目录
					files.mkdirs();
				}
				// 获取文件存储路径
				//String path =strDir+ actId;
				
				// 定义时间戳
				Date now = Calendar.getInstance().getTime();
				SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmm");
				
				// 对上传文件进行重命名，规则为act_tpl_+时间戳（当前时间的整型值）
				String fileFileName2 = actId + "_" + account + "_"
						+ sdf.format(now) + getExtention(this.getFileFileName());
				// 输出流
				File file2 = new File(strDir, fileFileName2);

/*				if (!file2.getParentFile().exists()) {
					file2.mkdirs();
				}*/

				OutputStream os = new FileOutputStream(file2);
				// 输入流
				InputStream is = new FileInputStream(file);

				byte[] buf = new byte[1024];
				int length = 0;

				while (-1 != (length = is.read(buf))) {
					os.write(buf, 0, length);
				}
				is.close();
				os.close();

				status=userService.joinActivity(actId, account, phone, notes, fileFileName2,sex);
			} catch (Exception e) {
				e.printStackTrace();
				sendMsg2Client(Constants.JSON_FAILURE);
			}
		}

		if (status==0){
			sendMsg2Client(Constants.JSON_SUCCESS);
		}else if(status==1){//人满
			sendMsg2Client(Constants.JSON_ADD_ACT_FAILURE);	
		}else if(status==2){//性别不符
			sendMsg2Client(Constants.JSON_ADD_ACT_FAILURE2);	
		}else if(status==3){//参加的同一分组活动数目超出了限制
			sendMsg2Client(Constants.JSON_ADD_ACT_FAILURE3);	
		}else if(status==4){//超过截止时间，停止报名
			sendMsg2Client(Constants.JSON_ADD_ACT_FAILURE4);	
		}

		return null;
	}

	public String getActivities() throws Exception {
		// 通过客户端选择的字段来查询会员信息

		List<Activity> activities = new ArrayList<Activity>();

		logger.debug("这里是用户角色信息" + role);

		try {
			if ("member".equals(role)) {
				activities = userService.getActivity("报名中", "个人", account);
			} else {
				activities = userService.getActivity("报名中", "集体", account);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 捕获异常
			sendMsg2Client(Constants.JSON_FAILURE);
			return null;
		}

		String json = JSONFormat.covert2ExtjsGrid(activities);

		logger.debug("这里是可用的活动信息" + json);

		sendMsg2Client(json);

		return null;
	}

	public String getResults() throws Exception {
		// 通过客户端选择的字段来查询会员信息

		List<Activity> activities = new ArrayList<Activity>();
		String json = "";
		try {
			json = userService.getResults(account);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 捕获异常
			sendMsg2Client(Constants.JSON_FAILURE);
			return null;
		}

		logger.debug("这里是活动结果信息:" + json);

		sendMsg2Client(json);

		return null;
	}

	private void joinActivityByUserType(String userType) {
		try {
			// userService.joinActivity(activity, signUp, userType);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			// 捕获报名失败的异常
			sendMsg2Client(Constants.JSON_FAILURE);
		} finally {
			sendMsg2Client(Constants.JSON_SUCCESS);
		}
	}

	/**
	 * 需求修改V1.0 查看报名结果，可以按照名称查询，可以设置查询结果是否包含无效活动 add by xupk
	 * */
	public String getSpecifiedResults() throws Exception {

		List<ActivitySignUp> list;
		List<UserActResultVO> listvo=new ArrayList<UserActResultVO>();
		keyWord_name = URLDecoder.decode(keyWord_name, "UTF-8");
		try {
			list = (List<ActivitySignUp>) userService.findSpecifiedResults(account, keyWord_status,
					keyWord_name);
			for(ActivitySignUp eachone:list){
				//所有的活动属性
				UserActResultVO vo=new UserActResultVO();
				BeanTool.copyPropertiesIgnoreNull2Filtered(eachone.getActivity(),vo, vo.getFiltered());
				//报名结果属性
				vo.setResult(eachone.getResult());
				listvo.add(vo);
			}
			String json = JSONFormat.covert2ExtjsGrid(listvo);


			sendMsg2Client(json);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}

		return null;
	}

	/**
	 * 需求变更v1.0 1.1：下载报名表模板 add by xupk
	 * */
	public String downloadTemp() throws Exception {
		/*m by yattie 加上虚拟路径前缀*/
		String folderName = Constants.getDirUploadVirtual()+"sys_act/template";
		try {
			sendMsg2Client(folderName + "/" + tempName);
		} catch (Exception e) {
			e.printStackTrace();
			sendMsg2Client(Constants.JSON_FAILURE);
		}
		return null;
	}

	// *************getter setter***********
	public Member getMember() {
		return member;
	}

	public void setMember(Member member) {
		this.member = member;
	}

	public UserService getUserService() {
		return userService;
	}

	@Resource
	public void setUserService(UserService userService) {
		this.userService = userService;
	}

	public Activity getActivity() {
		return activity;
	}

	public void setActivity(Activity activity) {
		this.activity = activity;
	}

	public ActivitySignUp getSignUp() {
		return signUp;
	}

	public void setSignUp(ActivitySignUp signUp) {
		this.signUp = signUp;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getAccount() {
		return account;
	}

	public void setAccount(String account) {
		this.account = account;
	}

	public String getActId() {
		return actId;
	}

	public void setActId(String actId) {
		this.actId = actId;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}

	public String getKeyWord_name() {
		return keyWord_name;
	}

	public void setKeyWord_name(String keyWord_name) {
		this.keyWord_name = keyWord_name;
	}

	public String getKeyWord_status() {
		return keyWord_status;
	}

	public void setKeyWord_status(String keyWord_status) {
		this.keyWord_status = keyWord_status;
	}

	public String getTempName() {
		return tempName;
	}

	public void setTempName(String tempName) {
		this.tempName = tempName;
	}

	public File getFile() {
		return file;
	}

	public void setFile(File file) {
		this.file = file;
	}

	public String getFileFileName() {
		return fileFileName;
	}

	public void setFileFileName(String fileFileName) {
		this.fileFileName = fileFileName;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

}
